"use client";

import { Environment } from "@react-three/drei";

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.5} />
      <Environment preset="studio" />
      
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.8} />
      </mesh>
    </>
  );
}