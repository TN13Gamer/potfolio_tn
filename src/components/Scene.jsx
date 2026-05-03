import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function SpacePlanet() {
  const planetRef = useRef()
  const ringRef = useRef()
  const moonRef = useRef()

  useFrame((state) => {
    if (planetRef.current) {
      // Rotate the planet slowly
      planetRef.current.rotation.y += 0.002
      planetRef.current.rotation.x += 0.001
      
      // Mouse tracking for tilt
      const mouseX = (state.pointer.x * Math.PI) / 10
      const mouseY = (state.pointer.y * Math.PI) / 10
      planetRef.current.rotation.z = THREE.MathUtils.lerp(planetRef.current.rotation.z, -mouseX * 0.3, 0.05)
      planetRef.current.rotation.x = THREE.MathUtils.lerp(planetRef.current.rotation.x, mouseY * 0.3, 0.05)
      
      // Rotate rings independently
      if (ringRef.current) {
        ringRef.current.rotation.z -= 0.004
      }
      
      // Orbit moon
      if (moonRef.current) {
        moonRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.8) * 4.5
        moonRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 4.5
      }
    }
  })

  return (
    <group ref={planetRef} position={[0, 0, 0]}>
      {/* Planet Core */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial 
          color="#0a0f1d" 
          roughness={0.8} 
          metalness={0.4} 
        />
      </mesh>

      {/* Glowing Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshStandardMaterial 
          color="#00f0ff" 
          transparent={true} 
          opacity={0.15} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Rings System */}
      <group ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        {/* Inner Glowing Ring */}
        <mesh receiveShadow>
          <torusGeometry args={[2.2, 0.03, 16, 100]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
        </mesh>
        
        {/* Middle Flat Ring (Dust) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow>
          <ringGeometry args={[2.4, 3.2, 64]} />
          <meshStandardMaterial 
            color="#ff003c" 
            transparent={true} 
            opacity={0.4} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Outer Ring */}
        <mesh receiveShadow>
          <torusGeometry args={[3.4, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Debris in the ring */}
        {[...Array(40)].map((_, i) => {
          const angle = (i / 40) * Math.PI * 2
          const radius = 2.4 + Math.random() * 0.8
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 0.15]}>
              <dodecahedronGeometry args={[Math.random() * 0.06 + 0.02]} />
              <meshStandardMaterial color="#555" roughness={1} />
            </mesh>
          )
        })}
      </group>

      {/* Orbiting Moon */}
      <mesh ref={moonRef} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
      </mesh>
    </group>
  )
}

function MovingStars() {
  const starsRef = useRef()
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005
      starsRef.current.rotation.x += 0.0002
    }
  })
  return (
    <group ref={starsRef}>
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const scrollY = window.scrollY
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2 - scrollY * 0.005, 0.1)
  })
  return null
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 45 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#030712', pointerEvents: 'none' }}
    >
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 5, 20]} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ff003c" />
      
      <Suspense fallback={null}>
        <MovingStars />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <group position={[2, -0.5, -5]} scale={1.2} rotation={[0.2, -0.5, 0]}>
            <SpacePlanet />
          </group>
        </Float>
        <CameraRig />
      </Suspense>
    </Canvas>
  )
}
