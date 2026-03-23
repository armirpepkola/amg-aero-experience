"use client";

import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store/useStore";

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
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
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
    });

    return () => ctx.revert();
  }, []);

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