'use client'

import { useState, forwardRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from '@/styles/components/ui/ResponsiveImage.module.scss'

const ResponsiveImage = forwardRef(({ 
  src,
  alt,
  width,
  height,
  aspectRatio = 'auto',
  objectFit = 'cover',
  borderRadius = 'md',
  loading = 'lazy',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  className = '',
  containerClassName = '',
  onLoad,
  onError,
  ...props 
}, ref) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  const containerClass = `${styles.imageContainer} ${styles[aspectRatio]} ${styles[borderRadius]} ${containerClassName}`
  const imageClass = `${styles.responsiveImage} ${styles[objectFit]} ${className}`
  
  const handleLoad = (e) => {
    setIsLoading(false)
    onLoad?.(e)
  }
  
  const handleError = (e) => {
    setIsLoading(false)
    setHasError(true)
    onError?.(e)
  }
  
  return (
    <div className={containerClass} ref={ref}>
      {!hasError ? (
        <>
          {isLoading && (
            <div className={styles.placeholder}>
              <div className={styles.skeleton} />
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={imageClass}
            loading={loading}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </>
      ) : (
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>📷</div>
          <p className={styles.errorText}>Failed to load image</p>
        </div>
      )}
    </div>
  )
})

ResponsiveImage.displayName = 'ResponsiveImage'

export default ResponsiveImage
