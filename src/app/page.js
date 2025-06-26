'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import SolarSystem from '@/components/SolarSystem'
import Loader from '@/components/ui/Loader'
import Home from '@/components/sections/Home'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Education from '@/components/sections/Education'
import Contact from '@/components/sections/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('solar-system')
  
  useEffect(() => {
    // Only show loading on first visit to the app
    const hasVisitedApp = sessionStorage.getItem('app-visited')

    if (hasVisitedApp) {
      // If user has already visited, don't show loading
      setLoading(false)
    } else {
      // First visit - show loading for 2.5 seconds
      const timer = setTimeout(() => {
        setLoading(false)
        sessionStorage.setItem('app-visited', 'true')
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [])
  
  const handlePlanetClick = (planetId) => {
    setCurrentSection(planetId)
  }
  
  const handleBackClick = () => {
    setCurrentSection('solar-system')
  }
  
  const handleExploreClick = () => {
    setCurrentSection('solar-system')
  }
  
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home onExploreClick={handleExploreClick} />
      case 'about':
        return <About onBackClick={handleBackClick} />
      case 'projects':
        return <Projects onBackClick={handleBackClick} />
      case 'skills':
        return <Skills onBackClick={handleBackClick} />
      case 'education':
        return <Education onBackClick={handleBackClick} />
      case 'contact':
        return <Contact onBackClick={handleBackClick} />
      case 'experience':
        return <Experience onBackClick={handleBackClick} />
      default:
        return <SolarSystem onPlanetClick={handlePlanetClick} />
    }
  }
  
  if (loading) {
    return <Loader />
  }
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <main>
        <AnimatePresence mode="wait">
          {currentSection === 'solar-system' ? (
            <SolarSystem key="solar-system" onPlanetClick={handlePlanetClick} />
          ) : (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderSection()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
} 