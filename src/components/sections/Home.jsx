'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import styles from '@/styles/components/sections/Home.module.scss'

const Home = ({ onExploreClick }) => {
  const [typedText, setTypedText] = useState('')
  const fullText = "Software Developer & Computer Science Undergraduate"
  const typingSpeed = 100
  
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      
      return () => clearTimeout(timeout)
    }
  }, [typedText])
  
  const socialLinks = [
    {
      icon: <FaLinkedin size={24} />,
      url: 'https://www.linkedin.com/in/appajibj/',
      label: 'LinkedIn'
    },
    {
      icon: <FaGithub size={24} />,
      url: 'https://github.com/Appajibj78104',
      label: 'GitHub'
    },
    {
      icon: <FaEnvelope size={24} />,
      url: 'mailto:appubj07@gmail.com',
      label: 'Email'
    }
  ]
  
  return (
    <div className={styles.homeContainer}>
      <div className={styles.starBackground}></div>
      
      <div className={styles.content}>
        <motion.div 
          className={styles.profileSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={styles.profileImageContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image 
              src="/images/profile.jpg" 
              alt="Appaji B" 
              width={250} 
              height={250} 
              className={styles.profileImage}
              priority
            />
          </motion.div>
          
          <motion.div 
            className={styles.profileInfo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1>Appaji B.</h1>
            <div className={styles.typingContainer}>
              <h2>{typedText}<span className={styles.cursor}>|</span></h2>
            </div>
            <p>
              Passionate about creating innovative web solutions and exploring new technologies.
              Currently pursuing Computer Science Engineering at BMS Institute of Technology and Management.
            </p>
            
            <div className={styles.socialLinks}>
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.exploreSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            className={styles.exploreButton}
            onClick={onExploreClick}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Universe <FaArrowRight className={styles.arrowIcon} />
          </motion.button>
          
          <div className={styles.featuredSkills}>
            <h3>Featured Skills</h3>
            <div className={styles.skillTags}>
              <span>React.js</span>
              <span>Node.js</span>
              <span>MongoDB</span>
              <span>JavaScript</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home 
