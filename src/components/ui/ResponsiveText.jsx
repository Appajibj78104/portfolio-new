'use client'

import { forwardRef } from 'react'
import styles from '@/styles/components/ui/ResponsiveText.module.scss'

const ResponsiveText = forwardRef(({ 
  children, 
  as = 'p',
  size = 'base',
  weight = 'normal',
  color = 'light',
  align = 'left',
  className = '',
  ...props 
}, ref) => {
  const Component = as
  const textClass = `${styles.responsiveText} ${styles[size]} ${styles[weight]} ${styles[color]} ${styles[align]} ${className}`
  
  return (
    <Component
      ref={ref}
      className={textClass}
      {...props}
    >
      {children}
    </Component>
  )
})

ResponsiveText.displayName = 'ResponsiveText'

export default ResponsiveText
