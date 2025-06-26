'use client'

import { motion } from 'framer-motion'
import styles from '@/styles/components/Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <motion.div 
        className={styles.solarLoader}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={styles.sun}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2
          }}
        />
        
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className={styles.orbit}
            style={{ 
              width: `${i * 60}px`, 
              height: `${i * 60}px`,
              animationDelay: `${i * 0.2}s`
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity,
              duration: 3 + i,
              ease: "linear"
            }}
          >
            <motion.div 
              className={styles.planet}
              style={{ 
                backgroundColor: i === 1 ? '#3366ff' : i === 2 ? '#ff3366' : '#33cc66',
                width: `${10 + i * 2}px`,
                height: `${10 + i * 2}px`
              }}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={styles.loadingText}
      >
        Entering the Portfolio Universe
      </motion.h2>
    </div>
  )
}

export default Loader 