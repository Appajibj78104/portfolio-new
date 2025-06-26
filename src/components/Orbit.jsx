'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'

const Orbit = ({ radius, color = '#ffffff', opacity = 0.2 }) => {
  const orbitRef = useRef()
  const particlesRef = useRef()

  // Create enhanced orbit path with more points for smoother curves
  const orbitGeometry = useMemo(() => {
    const points = []
    for (let i = 0; i <= 200; i++) {
      const angle = (i / 200) * Math.PI * 2
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ))
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [radius])

  // Simplified static particles - no dynamic updates
  const particlePositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      positions.push([
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ])
    }
    return positions
  }, [radius])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (orbitRef.current) {
      // Subtle rotation for the orbit line
      orbitRef.current.rotation.y = time * 0.02
    }

    // Remove dynamic particle animation to prevent buffer errors
  })

  return (
    <group ref={orbitRef}>
      {/* Main orbit line */}
      <line>
        <primitive object={orbitGeometry} attach="geometry" />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          linewidth={1}
        />
      </line>

      {/* Simplified orbital particles */}
      {particlePositions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity * 2}
          />
        </mesh>
      ))}

      {/* Subtle glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.5}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export default Orbit 