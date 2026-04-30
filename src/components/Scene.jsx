import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleSystem() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Slow, elegant rotation
      groupRef.current.rotation.y += 0.001
      groupRef.current.rotation.x += 0.0005
      
      // Subtle parallax based on scroll
      const scrollY = window.scrollY
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        scrollY * 0.002,
        0.1
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Dense background stars/particles */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

function AbstractCore() {
  const coreRef = useRef()

  useFrame((state) => {
    if (coreRef.current) {
      // Gentle floating and mouse tracking
      const mouseX = (state.pointer.x * Math.PI) / 10
      const mouseY = (state.pointer.y * Math.PI) / 10
      
      coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, mouseX, 0.05)
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, -mouseY, 0.05)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={coreRef} position={[-4, 1, -5]}>
        <mesh>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshStandardMaterial 
            color="#00f0ff" 
            roughness={0.1} 
            metalness={0.8}
            emissive="#00f0ff"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        <mesh scale={1.05}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshBasicMaterial 
            color="#ffffff" 
            wireframe={true} 
            transparent={true} 
            opacity={0.15} 
          />
        </mesh>
      </group>
    </Float>
  )
}

function CameraRig() {
  useFrame((state) => {
    const scrollY = window.scrollY
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -scrollY * 0.005, 0.1)
  })
  return null
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#030712', pointerEvents: 'none' }}
    >
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 5, 30]} />
      
      {/* Lights are required for MeshDistortMaterial */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff003c" />
      
      <Suspense fallback={null}>
        <ParticleSystem />
        <AbstractCore />
        <CameraRig />
      </Suspense>
    </Canvas>
  )
}
