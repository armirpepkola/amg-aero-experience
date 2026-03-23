import type { Metadata } from "next";
import { ReactLenis } from "lenis/react";
import { Canvas } from "@react-three/fiber";
import { GsapTickerSync } from "@/components/dom/GsapTickerSync";
import Scene from "@/components/canvas/Scene";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMG GT Black Series | Aero-Aesthetics",
  description: "An interactive exploration of aerodynamic perfection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-neutral-950 text-white selection:bg-red-600 selection:text-white">
        
        <ReactLenis root options={{ autoRaf: false }}>
          <GsapTickerSync />
          
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </ReactLenis>

        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          >
            <Scene />
          </Canvas>
        </div>

      </body>
    </html>
  );
}