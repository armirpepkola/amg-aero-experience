"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function CarModel() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Placeholder Mesh until we have the AMG GLB */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1, 1.5]} />
        
        {/* UPGRADED: MeshPhysicalMaterial is required for automotive clearcoat */}
        <meshPhysicalMaterial 
          color="#111111" 
          roughness={0.6} 
          metalness={0.9} 
          clearcoat={1.0} 
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}