"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export function GlobalCanvas() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}