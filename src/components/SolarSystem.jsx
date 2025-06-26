'use client'

import { useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Environment, Sparkles, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
// import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
import Sun from './Sun'
import Planet from './Planet'
import Orbit from './Orbit'
import SpaceBackground from './SpaceBackground'
import PlanetInfo from './ui/PlanetInfo'
import { planets } from '@/constants/planetData'
import styles from '@/styles/components/SolarSystem.module.scss'

// Simple scaling group component
const ScaledSolarSystemGroup = ({ scale, children }) => {
  return (
    <group scale={[scale, scale, scale]}>
      {children}
    </group>
  )
}

const SolarSystem = ({ onPlanetClick }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null)
  const [deviceType, setDeviceType] = useState('desktop')
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [mobileScale, setMobileScale] = useState(1)
  const controlsRef = useRef()
  const cameraRef = useRef()

  // Enhanced device detection
  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setScreenSize({ width, height })

      if (width <= 479) {
        setDeviceType('mobile-xs')
      } else if (width <= 767) {
        setDeviceType('mobile')
      } else if (width <= 1023) {
        setDeviceType('tablet')
      } else if (width <= 1279) {
        setDeviceType('laptop')
      } else if (width <= 1439) {
        setDeviceType('desktop')
      } else {
        setDeviceType('desktop-xl')
      }
    }

    updateDeviceInfo()
    window.addEventListener('resize', updateDeviceInfo)

    return () => window.removeEventListener('resize', updateDeviceInfo)
  }, [])

  // Device-specific configurations
  const getDeviceConfig = () => {
    const isMobile = deviceType.includes('mobile') || screenSize.width <= 768
    const isTablet = deviceType === 'tablet'
    const isLandscape = screenSize.width > screenSize.height
    const isMobileCarousel = isMobile && screenSize.width <= 768

    return {
      isMobile,
      isTablet,
      isLandscape,
      isMobileCarousel,
      camera: {
        position: isMobile
          ? (isLandscape ? [0, 25, 0] : [0, 35, 0])
          : isTablet
            ? [0, 28, 0]
            : [0, 30, 0],
        fov: isMobile
          ? (isLandscape ? 65 : 75)
          : isTablet
            ? 65
            : 60
      },
      controls: {
        minDistance: isMobile ? 8 : isTablet ? 6 : 5,
        maxDistance: isMobile ? 60 : isTablet ? 55 : 50,
        autoRotateSpeed: isMobileCarousel ? 0 : (isMobile ? 0.2 : isTablet ? 0.3 : 0.5),
        enableZoom: !isMobile || screenSize.width > 480,
        enablePan: false,
        autoRotate: !isMobileCarousel
      }
    }
  }

  const config = getDeviceConfig()

  // No loading needed - handled by main app

  // Update mobile scale when planet changes
  useEffect(() => {
    if (config.isMobileCarousel) {
      const currentPlanet = getCurrentPlanet()
      if (currentPlanet) {
        const newScale = calculateMobileScale(currentPlanet)
        setMobileScale(newScale)

        // Smoothly adjust camera distance for better viewing
        if (cameraRef.current && controlsRef.current) {
          const targetDistance = 30 / newScale // Inverse relationship
          controlsRef.current.minDistance = targetDistance * 0.5
          controlsRef.current.maxDistance = targetDistance * 2
        }
      } else {
        setMobileScale(1) // Default scale for sun view
      }
    }
  }, [currentPlanetIndex, config.isMobileCarousel, screenSize])




  
  const handlePlanetHover = (planet) => {
    setHoveredPlanet(planet)
  }

  const handlePlanetLeave = () => {
    setHoveredPlanet(null)
  }

  const handlePlanetClick = (planet) => {
    // Direct navigation to section
    onPlanetClick(planet.id)
  }

  const handleSunClick = () => {
    // Navigate to home
    onPlanetClick('home')
  }

  const handleLegendClick = (planetId) => {
    if (config.isMobileCarousel) {
      // In mobile carousel mode, navigate directly to the section page
      setShowMobileMenu(false)
      onPlanetClick(planetId)
    } else {
      // Direct navigation to section
      onPlanetClick(planetId)
    }
  }

  // Mobile carousel navigation
  const goToNextPlanet = () => {
    if (currentPlanetIndex < planets.length - 1) {
      setCurrentPlanetIndex(currentPlanetIndex + 1)
    } else {
      setCurrentPlanetIndex(0) // Loop back to first planet
    }
  }

  const goToPreviousPlanet = () => {
    if (currentPlanetIndex > 0) {
      setCurrentPlanetIndex(currentPlanetIndex - 1)
    } else {
      setCurrentPlanetIndex(planets.length - 1) // Loop to last planet
    }
  }

  const getCurrentPlanet = () => {
    if (currentPlanetIndex === -1) return null // Sun/home
    return planets[currentPlanetIndex]
  }

  // Calculate optimal scale for mobile to keep orbit visible
  const calculateMobileScale = (planet) => {
    if (!planet || !config.isMobileCarousel) return 1

    const maxOrbitRadius = planet.distance
    const screenWidth = screenSize.width
    const screenHeight = screenSize.height
    const minDimension = Math.min(screenWidth, screenHeight)

    // Calculate scale to fit orbit within viewport with padding
    // Use 70% of screen for very large orbits, 85% for smaller ones
    const paddingFactor = maxOrbitRadius > 20 ? 0.35 : 0.425 // More aggressive scaling for distant planets
    const targetSize = minDimension * paddingFactor
    const scale = targetSize / maxOrbitRadius

    // Clamp scale between 0.08 and 1.2 for reasonable limits
    // Allow smaller scales for very distant planets
    return Math.max(0.08, Math.min(1.2, scale))
  }

  // Touch/swipe handlers for mobile
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    if (!config.isMobileCarousel) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    if (!config.isMobileCarousel) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!config.isMobileCarousel || !touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNextPlanet()
    } else if (isRightSwipe) {
      goToPreviousPlanet()
    }
  }
  
  return (
    <motion.div
      className={styles.solarSystemContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      <Canvas
        camera={{
          position: config.camera.position,
          fov: config.camera.fov
        }}
        className={styles.canvas}
        gl={{
          antialias: !config.isMobile,
          powerPreference: config.isMobile ? "low-power" : "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true
        }}
        shadows={!config.isMobile}
        dpr={config.isMobile ? 1 : [1, 2]}
        onCreated={({ camera }) => {
          cameraRef.current = camera
        }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 100, 300]} />

        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.1} color="#1a1a2e" />
        <directionalLight
          position={[50, 50, 50]}
          intensity={0.3}
          color="#ffffff"
          castShadow={!config.isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          {/* Beautiful Space Background */}
          <SpaceBackground count={config.isMobile ? 200 : 400} />

          {/* Environment for better reflections */}
          {!config.isMobile && (
            <Environment preset="night" background={false} />
          )}

          {/* Enhanced Starfield */}
          <Stars
            radius={120}
            depth={60}
            count={config.isMobile ? 300 : 800}
            factor={config.isMobile ? 2 : 4}
            saturation={0.2}
            fade
            speed={0.3}
          />

          {/* Cosmic Sparkles */}
          {!config.isMobile && (
            <Sparkles
              count={200}
              scale={[100, 100, 100]}
              size={2}
              speed={0.3}
              opacity={0.6}
              color="#ffffff"
            />
          )}

          {/* Floating cosmic dust */}
          {!config.isMobile && (
            <Float
              speed={0.5}
              rotationIntensity={0.2}
              floatIntensity={0.3}
            >
              <Sparkles
                count={50}
                scale={[200, 200, 200]}
                size={1}
                speed={0.1}
                opacity={0.3}
                color="#4a90e2"
              />
            </Float>
          )}

          {config.isMobileCarousel ? (
            // Mobile carousel mode with responsive scaling
            <ScaledSolarSystemGroup scale={mobileScale}>
              <Sun onClick={handleSunClick} />
              {getCurrentPlanet() && (
                <group key={getCurrentPlanet().id}>
                  <Orbit
                    radius={getCurrentPlanet().distance} // Use actual planet distance
                    color={getCurrentPlanet().color}
                    opacity={0.3}
                  />
                  <Planet
                    planet={{
                      ...getCurrentPlanet(),
                      angle: Math.PI / 2 // Position to the right of sun
                    }}
                    onHover={() => {}}
                    onLeave={() => {}}
                    onClick={() => handlePlanetClick(getCurrentPlanet())}
                    isMobile={config.isMobile}
                    deviceType={deviceType}
                  />
                </group>
              )}
            </ScaledSolarSystemGroup>
          ) : (
            // Desktop mode - no scaling
            <>
              <Sun onClick={handleSunClick} />
              {/* Desktop mode - show all planets */}
              {planets.map((planet, index) => (
                <group key={planet.id}>
                  <Orbit
                    radius={planet.distance}
                    color={planet.color}
                    opacity={0.15 + index * 0.05}
                  />
                  <Planet
                    planet={planet}
                    onHover={() => !config.isMobile && handlePlanetHover(planet)}
                    onLeave={handlePlanetLeave}
                    onClick={() => handlePlanetClick(planet)}
                    isMobile={config.isMobile}
                    deviceType={deviceType}
                  />
                </group>
              ))}
            </>
          )}

          <OrbitControls
            ref={controlsRef}
            enableZoom={config.controls.enableZoom}
            minDistance={config.controls.minDistance}
            maxDistance={config.controls.maxDistance}
            enablePan={config.controls.enablePan}
            autoRotate={config.controls.autoRotate}
            autoRotateSpeed={config.controls.autoRotateSpeed}
            enableDamping={true}
            dampingFactor={0.08}
            rotateSpeed={config.isMobile ? 0.6 : 0.8}
            zoomSpeed={config.isMobile ? 0.6 : 0.8}
            touchAction="manipulation"
            maxPolarAngle={Math.PI * 0.8}
            minPolarAngle={Math.PI * 0.2}
            enabled={!config.isMobileCarousel}
          />

          {/* Post-processing effects disabled for compatibility */}
          {/* {!config.isMobile && (
            <EffectComposer>
              <Bloom
                intensity={0.3}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                blendFunction={BlendFunction.ADD}
              />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0005, 0.0012]}
              />
            </EffectComposer>
          )} */}
        </Suspense>
      </Canvas>
      
      {hoveredPlanet && !config.isMobile && (
        <PlanetInfo planet={hoveredPlanet} />
      )}

      {/* Mobile Hamburger Menu */}
      {config.isMobileCarousel && (
        <button
          className={styles.hamburgerMenu}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Mobile Menu Sidebar */}
      {config.isMobileCarousel && showMobileMenu && (
        <motion.div
          className={styles.mobileMenuSidebar}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <div className={styles.mobileMenuHeader}>
            <h3>Portfolio Sections</h3>
            <button
              className={styles.closeMenu}
              onClick={() => setShowMobileMenu(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <ul className={styles.mobileMenuList}>
            <li onClick={() => handleLegendClick('home')}>
              <span className={styles.menuDot} style={{ backgroundColor: '#ffcc00' }}></span>
              Home
            </li>
            {planets.map((planet) => (
              <li key={planet.id} onClick={() => handleLegendClick(planet.id)}>
                <span className={styles.menuDot} style={{ backgroundColor: planet.color }}></span>
                {planet.name}
              </li>
            ))}
          </ul>
        </motion.div>
      )}



      {/* Mobile Planet Info */}
      {config.isMobileCarousel && getCurrentPlanet() && (
        <motion.div
          className={styles.mobilePlanetInfo}
          key={getCurrentPlanet().id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: 0 }}>{getCurrentPlanet().name}</h3>
            <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
              {currentPlanetIndex + 1} / {planets.length}
            </span>
          </div>
          <p>Tap to explore • Swipe to navigate</p>
          <small style={{ opacity: 0.7, fontSize: '0.8em' }}>
            Distance: {getCurrentPlanet().distance.toFixed(1)} AU • Scale: {mobileScale.toFixed(2)}x
          </small>
        </motion.div>
      )}

      <div className={styles.instructions}>
        <p>
          {config.isMobileCarousel
            ? "Swipe left/right to navigate • Tap planet to explore"
            : config.isMobile
              ? "Tap planets to explore sections"
              : "Click on a planet to explore that section"
          }
        </p>
        {!config.isMobile && <p>Drag to rotate | Scroll to zoom</p>}
        {config.isMobile && !config.isMobileCarousel && <p>Pinch to zoom | Drag to rotate</p>}
      </div>

      <motion.div
        className={`${styles.title} ${config.isMobileCarousel ? styles.mobileTitle : ''}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1>Welcome to my Portfolio</h1>
        <h2>APPAJI B.</h2>
        {!config.isMobileCarousel && <p>Navigate through my professional universe</p>}
      </motion.div>

      {!config.isMobileCarousel && (
        <div className={`${styles.legend} ${config.isMobile ? styles.mobileLegend : ''}`}>
        <h3>Portfolio Sections</h3>
        <ul>
          <li
            className={styles.legendItem}
            onClick={() => handleLegendClick('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLegendClick('home')}
          >
            <span className={styles.colorDot} style={{ backgroundColor: '#ffcc00' }}></span>
            <span>Home</span>
          </li>
          {planets.map((planet) => (
            <li
              key={planet.id}
              onClick={() => handleLegendClick(planet.id)}
              className={styles.legendItem}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleLegendClick(planet.id)}
            >
              <span className={styles.colorDot} style={{ backgroundColor: planet.color }}></span>
              <span>{planet.name}</span>
            </li>
          ))}
        </ul>
        </div>
      )}

    </motion.div>
  )
}

export default SolarSystem 