'use client'

import { motion } from 'framer-motion'
import styles from '@/styles/components/PlanetInfo.module.scss'

const PlanetInfo = ({ planet }) => {
  return (
    <motion.div 
      className={styles.planetInfo}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 style={{ color: planet.color }}>{planet.name}</h3>
      <p>{planet.description}</p>
      <div className={styles.clickPrompt}>
        Click to explore
      </div>
    </motion.div>
  )
}

export default PlanetInfo 