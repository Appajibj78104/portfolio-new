'use client'

import { motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'
import styles from '@/styles/components/sections/Section.module.scss'

const Experience = ({ onBackClick }) => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.starBackground}></div>
      
      <motion.button
        className={styles.backButton}
        onClick={onBackClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <FaArrowLeft />
        Back to Solar System
      </motion.button>
      
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className={styles.title}
          style={{ color: '#33cc66' }} // Green for Experience
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience
        </motion.h1>
        
        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.messageCard}>
            <h3>Currently Building My Experience</h3>
            <p>
              I'm currently in my 3rd year of Computer Science Engineering at BMS Institute of Technology and Management.
            </p>
            <p>
              I'm actively seeking internship opportunities to apply my skills in real-world projects and gain valuable industry experience.
            </p>
            <p>
              My technical skills include full-stack web development with the MERN stack, and I'm passionate about creating user-friendly applications that solve real problems.
            </p>
            <div className={styles.openToWork}>
              <span>✓ Open to Work</span>
              <span>✓ Available for Internships</span>
              <span>✓ Eager to Collaborate on Projects</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Experience 