import type { DemoRunContext } from "../types";
import { getTcpState, EMPTY_TCP_STATE, type TcpRunState, type TcpPlan, type TcpRecommendation } from "@/lib/tcp/types";
import { getPricing, estimateQuantity, TCP_SETTINGS } from "@/lib/tcp/pricing";

// Shared accessors for the TCP care-plan calculator. The resolved plan lives in
// ctx.data.tcpPlan; the provider's edits (included / qty / price / discount) in
// ctx.data.tcp.

export { getTcpState, EMPTY_TCP_STATE };
export type { TcpRunState, TcpPlan };

export function getPlan(ctx: DemoRunContext): TcpPlan | null {
  return (ctx.data.tcpPlan as TcpPlan) ?? null;
}

export function getPlanPatientId(ctx: DemoRunContext): string | null {
  return (ctx.data.tcpPlanPatientId as string) ?? null;
}

type SetCtx = (updater: (c: DemoRunContext) => DemoRunContext) => void;

export function patchTcp(setCtx: SetCtx, patch: (s: TcpRunState) => TcpRunState): void {
  setCtx((c) => ({ ...c, data: { ...c.data, tcp: patch(getTcpState(c.data)) } }));
}

/** Store a freshly-resolved plan + seed line state (included + starting qty). */
export function seedPlan(setCtx: SetCtx, plan: TcpPlan, patientId: string): void {
  const included: Record<string, boolean> = {};
  const qty: Record<string, number> = {};
  for (const r of plan.recommendations) {
    included[r.id] = r.defaultAccepted;
    qty[r.id] = estimateQuantity(r.name, r.area);
  }
  setCtx((c) => ({
    ...c,
    data: {
      ...c.data,
      tcpPlan: plan,
      tcpPlanPatientId: patientId,
      tcp: {
        included,
        qty,
        priceOverride: {},
        discountPercent: TCP_SETTINGS.defaultPackageDiscount,
        paymentTermMonths: TCP_SETTINGS.defaultTerm,
      },
    },
  }));
}

// --- Line-level pricing -----------------------------------------------------

export interface PlanLine {
  rec: TcpRecommendation;
  unitType: string;
  unitPrice: number;
  qty: number;
  total: number;
  estimated: boolean;
}

export function lineFor(rec: TcpRecommendation, state: TcpRunState): PlanLine {
  const pricing = getPricing(rec.name);
  const unitPrice = state.priceOverride[rec.id] ?? pricing?.unitPrice ?? 0;
  const qty = state.qty[rec.id] ?? pricing?.defaultQuantity ?? 1;
  return {
    rec,
    unitType: pricing?.unitType ?? "session",
    unitPrice,
    qty,
    total: unitPrice * qty,
    estimated: state.priceOverride[rec.id] === undefined,
  };
}

export function includedLines(plan: TcpPlan, state: TcpRunState): PlanLine[] {
  return plan.recommendations
    .filter((r) => state.included[r.id])
    .map((r) => lineFor(r, state));
}

export interface PlanTotals {
  subtotal: number;
  discountAmount: number;
  total: number;
  monthly: number | null;
  perDay: number | null;
}

export function planTotals(plan: TcpPlan, state: TcpRunState): PlanTotals {
  const subtotal = includedLines(plan, state).reduce((s, l) => s + l.total, 0);
  const discountAmount = Math.round((subtotal * state.discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);
  const term = state.paymentTermMonths;
  const monthly = term > 1 ? Math.round(total / term) : null;
  const perDay = term > 1 ? total / (term * 30) : null;
  return { subtotal, discountAmount, total, monthly, perDay };
}

export function usd(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
