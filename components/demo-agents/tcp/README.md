# TCP Builder (demo-agent #2)

A clean **care-plan calculator** built on the shared demo-agent template
(`components/demo-agents/`). Recommended treatments stack into a priced, itemized
plan — quantities, per-unit prices, package discount, financing — then a
client-presentable review. Route: `app/dashboard/tcp/page.tsx`.

Presenter walkthrough: [`docs/TCP_DEMO_SCRIPT.md`](../../../docs/TCP_DEMO_SCRIPT.md).

## Flow (3 clean sections)

1. **Select patient** — shared template picker (STAGE-READY badge for Danielle).
2. **Care plan** (`careplan-step.tsx`) — recommendations as stacking line items:
   include checkbox · name + one-line rationale · quantity stepper · unit ·
   editable per-unit price · line total. Summary: subtotal → package discount →
   plan total → payment terms (pay today / 6mo / 12mo, per-day). The stacking calculator.
3. **Review** (`finalize-step.tsx`) — the itemized care-plan document + total +
   financing, copy-to-clipboard, finalize gate.

## Shape

```
components/demo-agents/tcp/
  tcp-config.tsx     DemoAgentConfig — patient + care plan + review
  careplan-step.tsx  the stacking calculator
  finalize-step.tsx  the care-plan document + finalize
  state.ts           plan accessors + line/total math

lib/tcp/
  types.ts           TcpPlan + TcpRunState (included/qty/priceOverride/discount/term)
  pricing.ts         per-unit prices + unit types (mirrored from Voice Bot Quick Quote)
  resolve.ts         resolveTcp(): cached fixture → live fallback
  fixtures/          hand-authored recommendations (danielle-brooks.ts)
app/api/tcp/resolve/ POST { patientId } → TcpPlan
```

## Pricing

`lib/tcp/pricing.ts` mirrors the Voice Bot Quick Quote model
(`Voice_Bot/app/lib/pricingContext.ts` + `components/QuickQuote/types.ts`):
per-unit price + unit type (units / syringes / vials / sessions) + default
quantity + anatomy-based quantity hints. A line = `quantity × unitPrice`.
**Synthetic / illustrative** — no real practice price data exists; labeled as such.

## Add a stage-ready patient

Author `lib/tcp/fixtures/<name>.ts` (recommendations grounded in the patient's
extraction + GL data), register it in `fixtures/index.ts`. The picker shows
STAGE-READY automatically (via `stageReadyFor`).

## Notes

- Recommendations + rationale + concern/FDA matches are real Global V3 data; the
  earlier timeline/tiers/education steps were removed for a cleaner, one-thing-well
  care plan. The fixture still carries that data if those sections return later.
- Accent: `#F5A623`.
