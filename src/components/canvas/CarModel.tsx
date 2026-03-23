"use client";

import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CarModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.material = new THREE.MeshPhysicalMaterial({
        color: "#050505",
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        envMapIntensity: 2.5,
      });
    }
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow scale={0.8}>
        <torusKnotGeometry args={[1.5, 0.4, 256, 64]} />
      </mesh>
    </group>
  );
}