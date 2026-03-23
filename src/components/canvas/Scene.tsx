"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { CarModel } from "./CarModel";

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      
      {/* 1. Core Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#eeeeee" />

      <Environment preset="city" environmentIntensity={0.8} />

      <Suspense fallback={null}>
        <CarModel />
        
        <ContactShadows 
          position={[0, -0.8, 0]} 
          opacity={0.75} 
          scale={10} 
          blur={2.5} 
          far={2} 
          resolution={512}
          color="#000000"
        />
      </Suspense>
    </>
  );
}