'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, useTexture, Text, Ring } from '@react-three/drei'
import * as THREE from 'three'

const Planet = ({ planet, onHover, onLeave, onClick, isMobile, deviceType }) => {
  const { id, size, distance, speed, color, glowColor, texture, name, type, atmosphere } = planet
  const planetRef = useRef()
  const textRef = useRef()
  const atmosphereRef = useRef()
  const glowRef = useRef()
  const trailRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Load texture if available, otherwise use color
  const planetTexture = texture ? useTexture(texture) : null

  // Enhanced planet sizing based on device type
  const planetSize = useMemo(() => {
    const baseSize = size * 1.4
    switch (deviceType) {
      case 'mobile-xs':
        return baseSize * 1.8
      case 'mobile':
        return baseSize * 1.6
      case 'tablet':
        return baseSize * 1.3
      default:
        return baseSize
    }
  }, [size, deviceType])

  // Create enhanced materials
  const planetMaterial = useMemo(() => {
    if (planetTexture) {
      return new THREE.MeshPhysicalMaterial({
        map: planetTexture,
        roughness: 0.8,
        metalness: 0.1,
        clearcoat: 0.1,
        clearcoatRoughness: 0.1,
        emissive: new THREE.Color(color).multiplyScalar(hovered ? 0.3 : 0.05),
        emissiveIntensity: hovered ? 0.8 : 0.2,
      })
    } else {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness: 0.7,
        metalness: 0.2,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        emissive: new THREE.Color(color).multiplyScalar(hovered ? 0.4 : 0.1),
        emissiveIntensity: hovered ? 1.0 : 0.3,
      })
    }
  }, [planetTexture, color, hovered])

  // Create atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        opacity: { value: hovered ? 0.4 : 0.2 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float opacity;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          gl_FragColor = vec4(color, intensity * opacity * pulse);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    })
  }, [color, hovered])
  
  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime()

    // Calculate planet position in orbit with slight elliptical variation
    const angle = time * speed
    const ellipticalVariation = 1 + Math.sin(time * speed * 2) * 0.05
    const x = Math.cos(angle) * distance * ellipticalVariation
    const z = Math.sin(angle) * distance * ellipticalVariation

    if (planetRef.current) {
      planetRef.current.position.x = x
      planetRef.current.position.z = z
      // Enhanced rotation with slight wobble
      planetRef.current.rotation.y += 0.015 + Math.sin(time * 0.5) * 0.005
      planetRef.current.rotation.x = Math.sin(time * 0.3) * 0.05

      // Update atmosphere position and animation
      if (atmosphereRef.current) {
        atmosphereRef.current.position.copy(planetRef.current.position)
        atmosphereRef.current.rotation.y = time * 0.5
        atmosphereMaterial.uniforms.time.value = time
        atmosphereMaterial.uniforms.opacity.value = hovered ? 0.6 : 0.3
      }

      // Update glow effect
      if (glowRef.current) {
        glowRef.current.position.copy(planetRef.current.position)
        const glowScale = 1.3 + Math.sin(time * 2) * 0.1
        glowRef.current.scale.setScalar(glowScale * (hovered ? 1.2 : 1))
      }

      // Update text position to follow planet
      if (textRef.current) {
        textRef.current.position.x = x
        textRef.current.position.z = z
        textRef.current.position.y = planetSize + (isMobile ? 2.5 : 2) // Position text above planet

        // Make text always face camera without flipping
        textRef.current.lookAt(camera.position)
        // Remove the additional rotation that was causing the flip
      }
    }
  })
  
  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    onHover && onHover()
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHovered(false)
    onLeave && onLeave()
    document.body.style.cursor = 'auto'
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <group>
      {/* Main Planet */}
      <Sphere
        ref={planetRef}
        args={[planetSize, 64, 64]}
        position={[distance, 0, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <primitive object={planetMaterial} attach="material" />
      </Sphere>

      {/* Planet Atmosphere */}
      <Sphere
        ref={atmosphereRef}
        args={[planetSize * 1.1, 32, 32]}
        position={[distance, 0, 0]}
      >
        <primitive object={atmosphereMaterial} attach="material" />
      </Sphere>

      {/* Glow Effect */}
      <Sphere
        ref={glowRef}
        args={[planetSize * 1.3, 16, 16]}
        position={[distance, 0, 0]}
      >
        <meshBasicMaterial
          color={glowColor || color}
          transparent
          opacity={hovered ? 0.2 : 0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Selection Ring */}
      {hovered && (
        <Ring
          args={[planetSize * 1.4, planetSize * 1.6, 32]}
          position={[planetRef.current?.position.x || distance, 0, planetRef.current?.position.z || 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </Ring>
      )}

      {/* Planet Label */}
      <Text
        ref={textRef}
        position={[distance, planetSize + (isMobile ? 2.5 : 2), 0]}
        fontSize={isMobile ? 1.8 : 1.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.15}
        outlineColor="#000000"
        letterSpacing={0.02}
        fontWeight="bold"
      >
        {name}
      </Text>

      {/* Removed orbital dust effect to prevent buffer issues */}
    </group>
  )
}

export default Planet 