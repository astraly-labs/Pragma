"use client";

import { Suspense, type ReactNode } from "react";

function MintShimmerFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(21,255,129,0.08)_0%,transparent_70%)] blur-2xl md:h-[600px] md:w-[600px]" />
    </div>
  );
}

export function SceneLoader({ children }: { children: ReactNode }) {
  return <Suspense fallback={<MintShimmerFallback />}>{children}</Suspense>;
}
