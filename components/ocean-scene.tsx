"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function OceanWaves() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position
      const time = state.clock.elapsedTime

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const z = positions.getZ(i)
        const y = Math.sin(x * 0.5 + time) * 0.3 + Math.cos(z * 0.5 + time * 0.7) * 0.3
        positions.setY(i, y)
      }

      positions.needsUpdate = true
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[50, 50, 64, 64]} />
      <meshStandardMaterial
        color="#0a2540"
        wireframe={false}
        transparent
        opacity={0.8}
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      const positions = particlesRef.current.geometry.attributes.position

      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i)
        positions.setY(i, y + Math.sin(state.clock.elapsedTime + i) * 0.002)
      }

      positions.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#65cccc" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function Caustics() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial color="#4dd4d4" transparent opacity={0.1} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />

      <ambientLight intensity={0.4} color="#0a4a6a" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#65cccc" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#4dd4d4" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#65cccc" distance={20} />

      <OceanWaves />
      <Caustics />
      <FloatingParticles />

      <fog attach="fog" args={["#020817", 5, 25]} />
    </>
  )
}

export function OceanScene() {
  return (
    <Canvas className="w-full h-full">
      <Scene />
    </Canvas>
  )
}
