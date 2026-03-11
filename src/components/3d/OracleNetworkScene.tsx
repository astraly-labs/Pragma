"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const MINT = new THREE.Color("#15FF81");
const MINT_DIM = new THREE.Color("#15FF81").multiplyScalar(0.3);

function generateSpherePositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.3 + Math.random() * 0.7);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function ParticleField({
  count,
  scrollProgress,
}: {
  count: number;
  scrollProgress: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateSpherePositions(count, 3.5), [count]);
  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) s[i] = 0.02 + Math.random() * 0.04;
    return s;
  }, [count]);
  const phases = useMemo(() => {
    const p = new Float32Array(count);
    for (let i = 0; i < count; i++) p[i] = Math.random() * Math.PI * 2;
    return p;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02 + scrollProgress * 0.5;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;

    const geo = pointsRef.current.geometry;
    const sizeAttr = geo.getAttribute("size") as THREE.BufferAttribute;
    if (sizeAttr) {
      for (let i = 0; i < count; i++) {
        sizeAttr.array[i] =
          sizes[i] * (0.6 + 0.4 * Math.sin(t * 0.8 + phases[i]));
      }
      sizeAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color={MINT}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines({
  positions,
  count,
}: {
  positions: Float32Array;
  count: number;
}) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const maxConnections = 80;

  const linePositions = useMemo(() => {
    const pairs: number[] = [];
    const threshold = 1.8;
    let found = 0;

    for (let i = 0; i < count && found < maxConnections; i++) {
      const ix = positions[i * 3];
      const iy = positions[i * 3 + 1];
      const iz = positions[i * 3 + 2];
      for (let j = i + 1; j < count && found < maxConnections; j++) {
        const dx = ix - positions[j * 3];
        const dy = iy - positions[j * 3 + 1];
        const dz = iz - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          pairs.push(
            ix,
            iy,
            iz,
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
          found++;
        }
      }
    }
    return new Float32Array(pairs);
  }, [positions, count]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const t = clock.getElapsedTime();
    lineRef.current.rotation.y = t * 0.02;
    lineRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;
  });

  if (linePositions.length === 0) return null;

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={MINT_DIM}
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function GlowOrb() {
  const spriteRef = useRef<THREE.Sprite>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(21, 255, 129, 0.25)");
    gradient.addColorStop(0.4, "rgba(21, 255, 129, 0.06)");
    gradient.addColorStop(1, "rgba(21, 255, 129, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame(({ clock }) => {
    if (!spriteRef.current) return;
    const t = clock.getElapsedTime();
    const scale = 3.5 + Math.sin(t * 0.4) * 0.4;
    spriteRef.current.scale.set(scale, scale, 1);
  });

  return (
    <sprite ref={spriteRef} position={[0, 0, 0]}>
      <spriteMaterial
        map={texture}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
}

function CameraRig({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 5));

  useFrame(() => {
    if (!mouse.current) return;
    const tx = mouse.current.x * 0.3;
    const ty = mouse.current.y * 0.2;
    target.current.set(tx, ty, 5);
    camera.position.lerp(target.current, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface OracleNetworkSceneProps {
  scrollProgress?: number;
}

export default function OracleNetworkScene({
  scrollProgress = 0,
}: OracleNetworkSceneProps) {
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const particleCount = isMobile ? 180 : 400;
  const positions = useMemo(
    () => generateSpherePositions(particleCount, 3.5),
    [particleCount]
  );

  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 1 }}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ParticleField count={particleCount} scrollProgress={scrollProgress} />
        <ConnectionLines positions={positions} count={particleCount} />
        <GlowOrb />
        <CameraRig mouse={mouse} />
      </Canvas>
    </div>
  );
}
