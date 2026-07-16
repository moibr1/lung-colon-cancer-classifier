"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const STRAND_COUNT = 34;
const RADIUS = 1.6;
const HEIGHT = 8;
const CYAN = new THREE.Color("#22d3ee");
const MAGENTA = new THREE.Color("#c026d3");
const BLUE = new THREE.Color("#3b82f6");

function HelixGroup() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const rungs = useMemo(() => {
    return new Array(STRAND_COUNT).fill(0).map((_, i) => {
      const t = i / STRAND_COUNT;
      const angle = t * Math.PI * 6;
      const y = t * HEIGHT - HEIGHT / 2;
      const a = new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS);
      const b = new THREE.Vector3(
        Math.cos(angle + Math.PI) * RADIUS,
        y,
        Math.sin(angle + Math.PI) * RADIUS
      );
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const length = a.distanceTo(b);
      const color = i % 3 === 0 ? MAGENTA : i % 2 === 0 ? BLUE : CYAN;
      return { a, b, mid, length, angle, color };
    });
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.22;
    const targetX = mouse.y * 0.25;
    const targetZ = -mouse.x * 0.35;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      {rungs.map((rung, i) => (
        <group key={i}>
          <mesh position={rung.a}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial
              color={rung.color}
              emissive={rung.color}
              emissiveIntensity={1.4}
              roughness={0.25}
              metalness={0.4}
            />
          </mesh>
          <mesh position={rung.b}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? CYAN : BLUE}
              emissive={i % 2 === 0 ? CYAN : BLUE}
              emissiveIntensity={1.2}
              roughness={0.25}
              metalness={0.4}
            />
          </mesh>
          <mesh
            position={rung.mid}
            rotation={[0, 0, Math.PI / 2]}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              rung.b.clone().sub(rung.a).normalize()
            )}
          >
            <cylinderGeometry args={[0.02, 0.02, rung.length, 8]} />
            <meshStandardMaterial
              color={rung.color}
              emissive={rung.color}
              emissiveIntensity={0.7}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Lighting() {
  const light = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!light.current) return;
    const t = clock.getElapsedTime();
    light.current.intensity = 6 + Math.sin(t * 1.5) * 2;
  });
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={light} position={[3, 3, 4]} color="#22d3ee" intensity={7} />
      <pointLight position={[-4, -2, -3]} color="#c026d3" intensity={4} />
      <pointLight position={[0, 5, -4]} color="#3b82f6" intensity={3} />
    </>
  );
}

export function DnaHelix() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Lighting />
      <HelixGroup />
      <Sparkles count={70} scale={[9, 9, 9]} size={2.5} speed={0.35} color="#67e8f9" opacity={0.6} />
      <fog attach="fog" args={["#05080d", 8, 16]} />
    </Canvas>
  );
}
