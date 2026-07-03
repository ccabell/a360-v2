"use client";

import { SurfaceError } from "@/components/layout/surface-error";

export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <SurfaceError surface="Reach" {...props} />;
}
