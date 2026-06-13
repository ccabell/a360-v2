import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask | A360 Evidence",
  description:
    "Grounded answers from the A360 Global Library. Every claim cited. Free.",
};

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
