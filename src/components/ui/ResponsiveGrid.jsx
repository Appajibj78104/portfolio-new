'use client'

import { forwardRef } from 'react'
import styles from '@/styles/components/ui/ResponsiveGrid.module.scss'

const ResponsiveGrid = forwardRef(({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'default',
  className = '',
  as = 'div',
  ...props 
}, ref) => {
  const Component = as
  
  // Generate column classes based on breakpoints
  const columnClasses = Object.entries(columns)
    .map(([breakpoint, cols]) => `${styles[`${breakpoint}-${cols}`]}`)
    .join(' ')
  
  const gridClass = `${styles.responsiveGrid} ${styles[gap]} ${columnClasses} ${className}`
  
  return (
    <Component
      ref={ref}
      className={gridClass}
      {...props}
    >
      {children}
    </Component>
  )
})

ResponsiveGrid.displayName = 'ResponsiveGrid'

export default ResponsiveGrid
