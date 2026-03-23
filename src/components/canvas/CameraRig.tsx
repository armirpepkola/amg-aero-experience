"use client";

import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store/useStore";

// ARCHITECTURE FIX 1: Explicitly register ScrollTrigger inside the Canvas bundle
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CameraRig() {
  const { camera } = useThree();
  const setChapter = useStore((state) => state.setChapter);
  
  const cameraProxy = useRef({
    x: 0, y: 0, z: 5,
    lookAtX: 0, lookAtY: 0, lookAtZ: 0
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          // ARCHITECTURE FIX 2: Bind to the documentElement for a more reliable height read in Next.js
          trigger: document.documentElement, 
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          markers: true, // DEBUG MODE: This will draw red/green lines on your screen
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.33) {
              setChapter("Viewing the front aerodynamic splitter and Panamericana grille.");
            } else if (progress >= 0.33 && progress < 0.66) {
              setChapter("Viewing the carbon fiber hood louvers establishing laminar flow.");
            } else {
              setChapter("Viewing the massive dual-plane active rear wing.");
            }
          }
        }
      });

      // Chapter 1: The Inhale
      tl.to(cameraProxy.current, {
        x: 0, y: -0.5, z: 2.5,
        lookAtX: 0, lookAtY: 0, lookAtZ: 0,
        ease: "power1.inOut"
      }, 0); 

      // Chapter 2: The Boundary Layer
      tl.to(cameraProxy.current, {
        x: 3, y: 1.5, z: 1,
        lookAtX: 0, lookAtY: 0.5, lookAtZ: 0,
        ease: "power1.inOut"
      });

      // Chapter 3: The Downforce
      tl.to(cameraProxy.current, {
        x: -2.5, y: 1.5, z: -3.5,
        lookAtX: 0, lookAtY: 0.5, lookAtZ: -1,
        ease: "power2.inOut" 
      });
      
      // ARCHITECTURE FIX 3: Force GSAP to recalculate heights after a tiny delay
      // This ensures the Next.js DOM has fully painted its 100vh sections.
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    });

    return () => ctx.revert();
  }, []); // <-- Revert back to the empty array // Add setChapter to dependency array for strict React standards

  useFrame(() => {
    camera.position.set(
      cameraProxy.current.x,
      cameraProxy.current.y,
      cameraProxy.current.z
    );
    camera.lookAt(
      cameraProxy.current.lookAtX,
      cameraProxy.current.lookAtY,
      cameraProxy.current.lookAtZ
    );
  });

  return null;
}