"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import type * as THREE from "three"
import type { MotionValue } from "framer-motion"

function PlasticParticle({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="#65cccc" transparent opacity={0.3} emissive="#65cccc" emissiveIntensity={0.2} />
    </mesh>
  )
}

function RoboticFish() {
  const groupRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Mesh>(null)
  const finLeftRef = useRef<THREE.Mesh>(null)
  const finRightRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Swimming motion
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 3
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    }

    // Tail animation
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.5
    }

    // Fin animations
    if (finLeftRef.current) {
      finLeftRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
    if (finRightRef.current) {
      finRightRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * -0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main body - transparent with circuits */}
      <mesh>
        <capsuleGeometry args={[0.3, 1.2, 8, 16]} />
        <meshPhysicalMaterial
          color="#1a3a4a"
          transparent
          opacity={0.6}
          metalness={0.8}
          roughness={0.2}
          transmission={0.5}
          thickness={0.5}
        />
      </mesh>

      {/* Inner circuits - glowing lines */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.25, 0.02, 8, 32]} />
        <meshStandardMaterial color="#65cccc" emissive="#65cccc" emissiveIntensity={2} />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.02, 8, 32]} />
        <meshStandardMaterial color="#4dd4d4" emissive="#4dd4d4" emissiveIntensity={2} />
      </mesh>

      {/* Head - metallic */}
      <mesh position={[0, 0, 0.8]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#2a5a6a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Eyes - glowing */}
      <mesh position={[0.15, 0.1, 1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#65cccc" emissive="#65cccc" emissiveIntensity={3} />
      </mesh>
      <mesh position={[-0.15, 0.1, 1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#65cccc" emissive="#65cccc" emissiveIntensity={3} />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0, -0.8]}>
        <coneGeometry args={[0.4, 0.6, 8]} />
        <meshPhysicalMaterial color="#1a3a4a" transparent opacity={0.7} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Fins */}
      <mesh ref={finLeftRef} position={[0.4, 0, 0.2]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.05, 0.4, 0.2]} />
        <meshStandardMaterial color="#2a5a6a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={finRightRef} position={[-0.4, 0, 0.2]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.05, 0.4, 0.2]} />
        <meshStandardMaterial color="#2a5a6a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Point light for glow effect */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#65cccc" distance={3} />
    </group>
  )
}

function Scene() {
  const particles = useMemo(() => {
    return Array.from(
      { length: 20 },
      () =>
        [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 10] as [number, number, number],
    )
  }, [])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#65cccc" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4dd4d4" />

      <RoboticFish />

      {particles.map((pos, i) => (
        <PlasticParticle key={i} position={pos} />
      ))}

      <Environment preset="night" />

      {/* Ocean floor effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.1} roughness={0.9} />
      </mesh>
    </>
  )
}

export function RoboticFishScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas className="w-full h-full">
      <Scene />
    </Canvas>
  )
}
