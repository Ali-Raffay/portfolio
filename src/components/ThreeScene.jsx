import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MainObject = ({ mousePosition }) => {
  const torusRef = useRef(null)

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.y += 0.003
      torusRef.current.rotation.x += 0.001

      if (mousePosition.x && mousePosition.y) {
        const x = (mousePosition.y / window.innerHeight - 0.5) * 0.3
        const y = (mousePosition.x / window.innerWidth - 0.5) * -0.3
        torusRef.current.rotation.x += x * 0.01
        torusRef.current.rotation.y += y * 0.01
      }
    }
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const scale = isMobile ? 0.7 : 1

  return (
    <TorusKnot ref={torusRef} args={[1, 0.3, 200, 32]} scale={scale}>
      <meshStandardMaterial
        color="#7c3aed"
        wireframe={false}
        roughness={0.1}
        metalness={0.8}
        emissive="#3b0764"
        emissiveIntensity={0.3}
      />
    </TorusKnot>
  )
}

const ParticleSystem = () => {
  const points = useMemo(() => {
    const positions = new Float32Array(80 * 3)
    for (let i = 0; i < 80; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return positions
  }, [])

  const pointsRef = useRef(null)

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0001
    }
  })

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7c3aed"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-5, -5, -3]} intensity={0.8} color="#06b6d4" />
    </>
  )
}

const SceneContent = ({ mousePosition }) => {
  return (
    <>
      <Lights />
      <ParticleSystem />
      <MainObject mousePosition={mousePosition} />
    </>
  )
}

export const ThreeScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <SceneContent mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}

