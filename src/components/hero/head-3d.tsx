'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Mouse tracker (shared across instances) ──────────────────────
const mousePos = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

// ─── Stylized Head Mesh ───────────────────────────────────────────
function HeadMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);

  const skinMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#D4A574', roughness: 0.5, metalness: 0.05 }),
    [],
  );
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.1, metalness: 0.3 }),
    [],
  );
  const whiteMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f0f0f0', roughness: 0.1 }),
    [],
  );
  const hairMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1a0a00', roughness: 0.7, metalness: 0.02 }),
    [],
  );
  const lipMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#B07850', roughness: 0.5 }),
    [],
  );
  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00e5ff',
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.15,
      }),
    [],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const { x: tx, y: ty } = mousePos;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, tx * 0.7, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, ty * 0.3, 0.04);
    groupRef.current.position.y = Math.sin(Date.now() * 0.0006) * 0.08;

    if (leftPupilRef.current && rightPupilRef.current) {
      const ex = THREE.MathUtils.clamp(tx * 0.06, -0.05, 0.05);
      const ey = THREE.MathUtils.clamp(ty * 0.04, -0.03, 0.03);
      leftPupilRef.current.position.set(0.22 + ex, 0.15 + ey, 0.95);
      rightPupilRef.current.position.set(-0.22 + ex, 0.15 + ey, 0.95);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh material={skinMat} castShadow>
        <sphereGeometry args={[1.0, 64, 64]} />
      </mesh>

      {/* Cyberpunk visor / glasses */}
      <mesh position={[0, 0.12, 0.88]} material={glassMat}>
        <torusGeometry args={[0.55, 0.08, 16, 64, Math.PI]} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 0.35, -0.08]} material={hairMat}>
        <sphereGeometry args={[1.02, 64, 64, 0, Math.PI * 2, 0, 0.75]} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, -0.08, 0.88]} material={skinMat} castShadow>
        <sphereGeometry args={[0.13, 32, 32]} scale={[0.6, 0.8, 0.45]} />
      </mesh>

      {/* Left eye socket */}
      <mesh position={[0.28, 0.18, 0.86]} material={darkMat}>
        <sphereGeometry args={[0.11, 32, 32]} scale={[0.9, 1.2, 0.4]} />
      </mesh>
      {/* Left eye */}
      <mesh position={[0.28, 0.18, 0.89]} material={whiteMat}>
        <sphereGeometry args={[0.09, 32, 32]} />
      </mesh>
      <mesh ref={leftPupilRef} position={[0.22, 0.15, 0.95]} material={darkMat}>
        <sphereGeometry args={[0.05, 32, 32]} />
      </mesh>

      {/* Right eye socket */}
      <mesh position={[-0.28, 0.18, 0.86]} material={darkMat}>
        <sphereGeometry args={[0.11, 32, 32]} scale={[0.9, 1.2, 0.4]} />
      </mesh>
      {/* Right eye */}
      <mesh position={[-0.28, 0.18, 0.89]} material={whiteMat}>
        <sphereGeometry args={[0.09, 32, 32]} />
      </mesh>
      <mesh ref={rightPupilRef} position={[-0.22, 0.15, 0.95]} material={darkMat}>
        <sphereGeometry args={[0.05, 32, 32]} />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[0.28, 0.36, 0.88]} rotation={[0, 0, 0.08]} material={hairMat}>
        <boxGeometry args={[0.18, 0.03, 0.03]} />
      </mesh>
      <mesh position={[-0.28, 0.36, 0.88]} rotation={[0, 0, -0.08]} material={hairMat}>
        <boxGeometry args={[0.18, 0.03, 0.03]} />
      </mesh>

      {/* Lips */}
      <mesh position={[0, -0.35, 0.85]} rotation={[0.12, 0, 0]} material={lipMat}>
        <torusGeometry args={[0.16, 0.04, 16, 32]} />
      </mesh>
      <mesh position={[0, -0.43, 0.83]} rotation={[-0.08, 0, 0]} material={lipMat}>
        <torusGeometry args={[0.14, 0.03, 16, 32]} />
      </mesh>

      {/* Ears */}
      <mesh position={[0.92, 0.0, 0]} rotation={[0, 0, 0.12]} material={skinMat}>
        <sphereGeometry args={[0.22, 32, 32]} scale={[0.35, 0.8, 0.2]} />
      </mesh>
      <mesh position={[-0.92, 0.0, 0]} rotation={[0, 0, -0.12]} material={skinMat}>
        <sphereGeometry args={[0.22, 32, 32]} scale={[0.35, 0.8, 0.2]} />
      </mesh>
    </group>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function Head3D() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0.05, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        {/* Ambient + rim lights matching teal/pink theme */}
        <ambientLight intensity={0.4} />
        {/* Key light — warm */}
        <directionalLight position={[3, 3, 4]} intensity={0.9} />
        {/* Teal rim — left */}
        <directionalLight position={[-4, 0, 1]} intensity={0.5} color="#00e5ff" />
        {/* Pink rim — right */}
        <directionalLight position={[4, 0, 1]} intensity={0.5} color="#ff2d55" />
        {/* Top highlight */}
        <spotLight position={[0, 3, 3]} intensity={0.6} angle={0.5} penumbra={0.3} />

        <HeadMesh />
      </Canvas>
    </div>
  );
}
