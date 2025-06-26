'use client'

import { motion } from 'framer-motion'
import styles from '@/styles/components/SolarSystemLoader.module.scss'

const SolarSystemLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.solarSystem}>
        {/* Sun */}
        <motion.div 
          className={styles.sun}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Planets */}
        {[1, 2, 3].map((planet, index) => (
          <motion.div
            key={planet}
            className={`${styles.orbit} ${styles[`orbit${planet}`]}`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className={`${styles.planet} ${styles[`planet${planet}`]}`} />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className={styles.loadingText}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <h2>Loading Solar System...</h2>
        <p>Preparing your cosmic journey</p>
      </motion.div>
    </div>
  )
}

export default SolarSystemLoader
