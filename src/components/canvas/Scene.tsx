"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import { CarModel } from "./CarModel";
import { CameraRig } from "./CameraRig";
import { FlowShader } from "./FlowShader";

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#030303"]} />
      
      <CameraRig /> 

      <FlowShader />

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

      <EffectComposer depthBuffer={false} multisampling={0}>
        <Bloom 
          luminanceThreshold={1.2}
          mipmapBlur
          intensity={1.5} 
        />
      </EffectComposer>
    </>
  );
}