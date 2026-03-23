"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uVelocity;
  varying vec2 vUv;

  void main() {
    // Center coordinates
    vec2 uv = vUv * 2.0 - 1.0;
    
    // Create laminar flow lines based on sine waves and time
    // uVelocity amplifies the warp effect when the user scrolls
    float lineDistortion = sin(uv.y * 10.0 + uTime * (1.0 + uVelocity * 5.0)) * 0.1;
    float lines = sin((uv.x + lineDistortion) * 40.0 - uTime * (2.0 + uVelocity * 10.0));
    
    // Soften and fade the lines into the dark background
    lines = smoothstep(0.8, 1.0, lines);
    lines *= smoothstep(1.0, 0.2, abs(uv.y)); // Fade top and bottom
    
    // Subtle red tint for AMG branding
    vec3 color = mix(vec3(0.02), vec3(0.8, 0.1, 0.1), lines * 0.15);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function FlowShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const velocityProxy = useRef({ value: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uVelocity: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const vel = Math.abs(self.getVelocity() / 1000);
          
          gsap.killTweensOf(velocityProxy.current);
          velocityProxy.current.value = Math.min(vel, 2.0);
          gsap.to(velocityProxy.current, {
            value: 0,
            duration: 1.0,
            ease: "power2.out",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uVelocity.value = velocityProxy.current.value;
    }
  });

  return (
    <mesh position={[0, 0, -10]} scale={[40, 20, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}