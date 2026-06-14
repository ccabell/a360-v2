"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Agent-tester fills exactly the remaining viewport height.
 * Measures the offset from the top of this container to the viewport top,
 * then sets height = 100vh - offset. Both panes scroll internally.
 */
export default function AgentTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("100vh");

  useEffect(() => {
    function measure() {
      if (ref.current) {
        const top = ref.current.getBoundingClientRect().top;
        setHeight(`calc(100vh - ${Math.round(top)}px)`);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={ref} className="overflow-hidden" style={{ height }}>
      {children}
    </div>
  );
}
