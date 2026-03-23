"use client";

import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export function CameraRig() {
  const { camera } = useThree();
  
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
        }
      });

      tl.to(cameraProxy.current, {
        x: 0, y: -0.5, z: 2.5,
        lookAtX: 0, lookAtY: 0, lookAtZ: 0,
        ease: "power1.inOut"
      }, 0);

      tl.to(cameraProxy.current, {
        x: 3, y: 1.5, z: 1,
        lookAtX: 0, lookAtY: 0.5, lookAtZ: 0,
        ease: "power1.inOut"
      });

      tl.to(cameraProxy.current, {
        x: -2.5, y: 1.5, z: -3.5,
        lookAtX: 0, lookAtY: 0.5, lookAtZ: -1,
        ease: "power2.inOut"
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