'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import styles from '@/styles/components/ui/ResponsiveButton.module.scss'

const ResponsiveButton = forwardRef(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  ariaLabel,
  ...props 
}, ref) => {
  const buttonClass = `${styles.responsiveButton} ${styles[variant]} ${styles[size]} ${className}`
  
  const handleClick = (e) => {
    if (disabled) return
    onClick?.(e)
  }
  
  const handleKeyDown = (e) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e)
    }
  }
  
  return (
    <motion.button
      ref={ref}
      className={buttonClass}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  )
})

ResponsiveButton.displayName = 'ResponsiveButton'

export default ResponsiveButton
