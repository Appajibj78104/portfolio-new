'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import ResponsiveButton from './ResponsiveButton'
import styles from '@/styles/components/ui/ResponsiveNavigation.module.scss'

const ResponsiveNavigation = ({ 
  currentSection, 
  onSectionChange, 
  sections = [],
  showBackButton = false,
  onBackClick 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Close menu when section changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [currentSection])
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, isMobile])
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId)
    setIsMenuOpen(false)
  }
  
  const handleBackClick = () => {
    onBackClick?.()
    setIsMenuOpen(false)
  }
  
  if (!isMobile && !showBackButton) {
    return null // Don't show navigation on desktop for solar system
  }
  
  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          className={styles.menuButton}
          onClick={toggleMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>
      )}
      
      {/* Back Button */}
      {showBackButton && (
        <ResponsiveButton
          className={styles.backButton}
          onClick={handleBackClick}
          variant="secondary"
          size="medium"
          ariaLabel="Back to solar system"
        >
          ← Back to Solar System
        </ResponsiveButton>
      )}
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className={styles.menuHeader}>
                <h3>Navigation</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes size={18} />
                </button>
              </div>
              
              <div className={styles.menuContent}>
                {showBackButton && (
                  <ResponsiveButton
                    onClick={handleBackClick}
                    variant="outline"
                    size="medium"
                    className={styles.menuItem}
                  >
                    ← Solar System
                  </ResponsiveButton>
                )}
                
                {sections.map((section) => (
                  <ResponsiveButton
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    variant={currentSection === section.id ? 'primary' : 'ghost'}
                    size="medium"
                    className={styles.menuItem}
                  >
                    <span 
                      className={styles.sectionDot} 
                      style={{ backgroundColor: section.color }}
                    />
                    {section.name}
                  </ResponsiveButton>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ResponsiveNavigation
