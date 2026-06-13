"use client";

import dynamic from "next/dynamic";

const LPOAViewer = dynamic(
  () => import("@/components/lpoa/LPOAViewer").then((m) => m.LPOAViewer),
  { ssr: false },
);

export default function LPOAPage() {
  return <LPOAViewer />;
}
