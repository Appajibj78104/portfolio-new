'use client'

import { forwardRef } from 'react'
import styles from '@/styles/components/ui/ResponsiveContainer.module.scss'

const ResponsiveContainer = forwardRef(({ 
  children, 
  maxWidth = 'xl',
  padding = 'default',
  className = '',
  as = 'div',
  ...props 
}, ref) => {
  const Component = as
  const containerClass = `${styles.responsiveContainer} ${styles[maxWidth]} ${styles[padding]} ${className}`
  
  return (
    <Component
      ref={ref}
      className={containerClass}
      {...props}
    >
      {children}
    </Component>
  )
})

ResponsiveContainer.displayName = 'ResponsiveContainer'

export default ResponsiveContainer
