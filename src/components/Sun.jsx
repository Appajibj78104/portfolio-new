'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'

const Sun = ({ onClick }) => {
  const sunRef = useRef()
  const glowRef = useRef()
  const coronaRef = useRef()
  const flareRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // Enhanced sun material with more realistic solar surface
  const sunMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      intensity: { value: hovered ? 1.3 : 1.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float intensity;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      // Enhanced noise functions for more realistic solar surface
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        // Create dynamic solar surface
        vec2 st = vUv * 8.0;

        // Multiple layers of noise for complex surface
        float n1 = fbm(st + time * 0.1);
        float n2 = fbm(st * 2.0 + time * 0.15);
        float n3 = fbm(st * 4.0 + time * 0.2);

        // Combine noise layers
        float surface = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;

        // Create solar flare hotspots
        float flares = smoothstep(0.7, 1.0, surface);

        // Color gradient from deep orange to bright yellow-white
        vec3 deepOrange = vec3(1.0, 0.3, 0.0);
        vec3 orange = vec3(1.0, 0.6, 0.1);
        vec3 yellow = vec3(1.0, 0.9, 0.3);
        vec3 white = vec3(1.0, 1.0, 0.8);

        // Mix colors based on surface noise
        vec3 color = mix(deepOrange, orange, surface);
        color = mix(color, yellow, smoothstep(0.4, 0.7, surface));
        color = mix(color, white, flares);

        // Add rim lighting effect
        float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
        color += vec3(1.0, 0.8, 0.4) * pow(rim, 2.0) * 0.5;

        // Apply intensity multiplier
        color *= intensity;

        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), [hovered])

  // Corona material for outer glow
  const coronaMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      opacity: { value: hovered ? 0.8 : 0.5 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float opacity;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        float pulse = sin(time * 1.5) * 0.2 + 0.8;

        vec3 coronaColor = vec3(1.0, 0.7, 0.2);
        gl_FragColor = vec4(coronaColor, intensity * opacity * pulse);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
  }), [hovered])
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (sunRef.current) {
      // Enhanced rotation with slight wobble
      sunRef.current.rotation.y = time * 0.08
      sunRef.current.rotation.x = Math.sin(time * 0.3) * 0.02
      sunMaterial.uniforms.time.value = time
      sunMaterial.uniforms.intensity.value = hovered ? 1.4 : 1.0
    }

    if (glowRef.current) {
      // Dynamic glow scaling
      const glowScale = 1.3 + Math.sin(time * 0.8) * 0.1 + (hovered ? 0.2 : 0)
      glowRef.current.scale.setScalar(glowScale)
      glowRef.current.rotation.y = time * 0.2
    }

    if (coronaRef.current) {
      // Corona animation
      coronaRef.current.rotation.y = -time * 0.1
      coronaRef.current.rotation.z = time * 0.05
      coronaMaterial.uniforms.time.value = time
      coronaMaterial.uniforms.opacity.value = hovered ? 0.9 : 0.6
    }

    if (flareRef.current) {
      // Solar flare rings
      flareRef.current.rotation.z = time * 0.3
      const flareScale = 1 + Math.sin(time * 2) * 0.1
      flareRef.current.scale.setScalar(flareScale)
    }
  })
  
  const handlePointerOver = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'auto'
  }

  return (
    <group>
      {/* Sun core */}
      <Sphere
        ref={sunRef}
        args={[3.5, 128, 128]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={onClick}
        castShadow
      >
        <primitive object={sunMaterial} attach="material" />
      </Sphere>

      {/* Corona layer */}
      <Sphere
        ref={coronaRef}
        args={[4.2, 64, 64]}
      >
        <primitive object={coronaMaterial} attach="material" />
      </Sphere>

      {/* Outer glow */}
      <Sphere
        ref={glowRef}
        args={[5.5, 32, 32]}
      >
        <meshBasicMaterial
          color="#ff8800"
          transparent
          opacity={hovered ? 0.25 : 0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Solar flare rings */}
      <Ring
        ref={flareRef}
        args={[6, 7, 32]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={hovered ? 0.3 : 0.1}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </Ring>

      {/* Enhanced lighting */}
      <pointLight
        position={[0, 0, 0]}
        intensity={hovered ? 3.5 : 2.5}
        color="#ffcc33"
        distance={150}
        decay={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Ambient warm light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.8}
        color="#ff6600"
        distance={80}
        decay={2}
      />
    </group>
  )
}

export default Sun 