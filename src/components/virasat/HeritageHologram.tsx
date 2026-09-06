import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = "#67e8f9";
const AMBER = "#f6c46b";

function HologramMaterial({ color = CYAN, opacity = 0.36 }: { color?: string; opacity?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={1.8}
      metalness={0.15}
      roughness={0.35}
      transparent
      opacity={opacity}
      wireframe
    />
  );
}

function Minaret({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 2.9, 12]} />
        <HologramMaterial opacity={0.42} />
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.31, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <HologramMaterial color={AMBER} opacity={0.48} />
      </mesh>
      <mesh position={[0, 2.42, 0]}>
        <coneGeometry args={[0.06, 0.5, 8]} />
        <HologramMaterial color={AMBER} opacity={0.62} />
      </mesh>
    </group>
  );
}

function Monument() {
  const monument = useRef<THREE.Group>(null);
  const scanner = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    if (monument.current) monument.current.rotation.y += dt * 0.14;
    if (scanner.current) {
      scanner.current.position.y = -1.05 + ((clock.elapsedTime * 0.55) % 3.8);
      const material = scanner.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.35 + Math.sin(clock.elapsedTime * 4) * 0.14;
    }
  });

  return (
    <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.18}>
      <group ref={monument} position={[0, -0.65, 0]} rotation={[0.05, -0.35, 0]}>
        <mesh position={[0, -0.9, 0]}>
          <boxGeometry args={[4.7, 0.2, 2.55]} />
          <HologramMaterial color={AMBER} opacity={0.3} />
        </mesh>
        <mesh position={[0, -0.58, 0]}>
          <boxGeometry args={[3.6, 0.5, 1.72]} />
          <HologramMaterial opacity={0.4} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[2.5, 1.45, 1.18]} />
          <HologramMaterial opacity={0.42} />
        </mesh>

        {[-0.68, 0, 0.68].map((x) => (
          <group key={x} position={[x, 0.05, 0.61]}>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.42, 0.72, 0.08]} />
              <HologramMaterial color={AMBER} opacity={0.46} />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <torusGeometry args={[0.21, 0.04, 8, 20, Math.PI]} />
              <HologramMaterial color={AMBER} opacity={0.58} />
            </mesh>
          </group>
        ))}

        <mesh position={[0, 1.08, 0]}>
          <sphereGeometry args={[0.82, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <HologramMaterial color={AMBER} opacity={0.42} />
        </mesh>
        <mesh position={[0, 1.92, 0]}>
          <coneGeometry args={[0.08, 0.62, 8]} />
          <HologramMaterial color={AMBER} opacity={0.68} />
        </mesh>

        <Minaret x={-1.92} />
        <Minaret x={1.92} />

        <mesh ref={scanner} position={[0, -0.8, 0]} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.8, 2.65, 64]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.45} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(360);
    for (let i = 0; i < 120; i += 1) {
      const angle = i * 2.39996;
      const radius = 2.8 + ((i * 37) % 100) / 28;
      data[i * 3] = Math.cos(angle) * radius;
      data[i * 3 + 1] = -2.2 + ((i * 53) % 100) / 16;
      data[i * 3 + 2] = Math.sin(angle) * radius * 0.55;
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y -= Math.min(delta, 0.05) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={CYAN} size={0.035} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function OrbitLines() {
  const ring = useMemo(
    () =>
      Array.from({ length: 65 }, (_, i) => {
        const angle = (i / 64) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * 3.25, 0, Math.sin(angle) * 1.45);
      }),
    [],
  );

  return (
    <group rotation={[0.22, 0, 0.08]} position={[0, -0.15, 0]}>
      <Line points={ring} color={CYAN} transparent opacity={0.24} lineWidth={0.6} />
      <group rotation-x={Math.PI / 2.8}>
        <Line points={ring} color={AMBER} transparent opacity={0.2} lineWidth={0.5} />
      </group>
    </group>
  );
}

export function HeritageHologram() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 8.4], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      aria-label="Animated holographic Indian heritage monument"
    >
      <ambientLight intensity={0.7} color={CYAN} />
      <pointLight position={[3, 4, 4]} intensity={18} color={AMBER} distance={14} />
      <pointLight position={[-4, 0, 2]} intensity={13} color={CYAN} distance={12} />
      <Monument />
      <OrbitLines />
      <Particles />
    </Canvas>
  );
}