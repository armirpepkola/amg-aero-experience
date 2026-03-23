"use client";

import { ReactLenis } from "lenis/react";
import { GsapTickerSync } from "./GsapTickerSync";

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: false }}>
      <GsapTickerSync />
      {children}
    </ReactLenis>
  );
}