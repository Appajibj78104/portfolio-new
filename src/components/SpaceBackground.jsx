'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const SpaceBackground = ({ count = 3000 }) => {
  const pointsRef = useRef()
  const nebulaRef = useRef()
  
  // Simplified star generation to avoid buffer issues
  const starData = useMemo(() => {
    const stars = []
    const starCount = Math.min(count, 500) // Limit count to prevent issues

    for (let i = 0; i < starCount; i++) {
      // Create spherical distribution
      const radius = 100 + Math.random() * 200
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const position = [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ]

      // Vary star colors (white, blue, yellow, red)
      const starType = Math.random()
      let color = '#ffffff'
      if (starType < 0.7) {
        color = '#ffffff' // White stars
      } else if (starType < 0.85) {
        color = '#b3ccff' // Blue stars
      } else if (starType < 0.95) {
        color = '#ffffb3' // Yellow stars
      } else {
        color = '#ffb3b3' // Red stars
      }

      stars.push({ position, color })
    }

    return stars
  }, [count])
  
  // Create nebula material
  const nebulaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#1a0033') },
        color2: { value: new THREE.Color('#330066') },
        color3: { value: new THREE.Color('#000011') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        float noise(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        float smoothNoise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        void main() {
          vec2 st = vUv * 3.0;
          float n1 = smoothNoise(st + time * 0.01);
          float n2 = smoothNoise(st * 2.0 + time * 0.02);
          float n3 = smoothNoise(st * 4.0 + time * 0.03);
          
          float noise = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;
          
          vec3 color = mix(color1, color2, noise);
          color = mix(color, color3, smoothstep(0.3, 0.7, noise));
          
          float alpha = smoothstep(0.0, 1.0, noise) * 0.3;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    })
  }, [])
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.0005
      pointsRef.current.rotation.x = time * 0.0002
    }
    
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = time * 0.0001
      nebulaMaterial.uniforms.time.value = time
    }
  })
  
  return (
    <group>
      {/* Simplified Distant Stars */}
      <group ref={pointsRef}>
        {starData.map((star, index) => (
          <mesh key={index} position={star.position}>
            <sphereGeometry args={[0.3, 4, 4]} />
            <meshBasicMaterial
              color={star.color}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Nebula Background */}
      <Sphere ref={nebulaRef} args={[300, 32, 32]}>
        <primitive object={nebulaMaterial} attach="material" />
      </Sphere>
    </group>
  )
}

export default SpaceBackground
