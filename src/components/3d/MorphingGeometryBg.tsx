"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { noise3D } from "./simplex";

const MINT_WIRE = new THREE.Color("#15FF81");

function MorphingIcosahedron({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.8, 3);
    originalPositions.current = new Float32Array(geo.attributes.position.array);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !originalPositions.current) return;
    const t = clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const orig = originalPositions.current;

    for (let i = 0; i < posAttr.count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];

      const noiseVal = noise3D(
        ox * 0.8 + t * 0.3,
        oy * 0.8 + t * 0.2,
        oz * 0.8 + t * 0.25
      );

      const displacement = noiseVal * 0.15;
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
      posAttr.array[i * 3] = ox + (ox / len) * displacement;
      posAttr.array[i * 3 + 1] = oy + (oy / len) * displacement;
      posAttr.array[i * 3 + 2] = oz + (oz / len) * displacement;
    }
    posAttr.needsUpdate = true;

    const rotSpeed = 0.15 - scrollProgress * 0.1;
    meshRef.current.rotation.y += rotSpeed * 0.01;
    meshRef.current.rotation.x += rotSpeed * 0.005;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color={MINT_WIRE}
        wireframe
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

interface MorphingGeometryBgProps {
  scrollProgress?: number;
  opacity?: number;
}

export default function MorphingGeometryBg({
  scrollProgress = 0,
  opacity = 1,
}: MorphingGeometryBgProps) {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0, opacity }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        frameloop="always"
        style={{ background: "transparent" }}
      >
        <MorphingIcosahedron scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
