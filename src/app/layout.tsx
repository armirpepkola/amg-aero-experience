import type { Metadata } from "next";
import { SmoothScroller } from "@/components/dom/SmoothScroller";
import { GlobalCanvas } from "@/components/canvas/GlobalCanvas";
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
        
        <SmoothScroller>
          <main className="relative z-10 w-full min-h-screen">
            {children}
          </main>
        </SmoothScroller>

        <GlobalCanvas />

      </body>
    </html>
  );
}