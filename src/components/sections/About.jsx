'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import styles from '@/styles/components/sections/Section.module.scss'

const About = ({ onBackClick }) => {
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
  ];

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
          style={{ color: '#3366ff' }} // Blue for About
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Me
        </motion.h1>
        
        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p>
            I'm Appaji B., a passionate Software Developer with a strong foundation in full-stack web development.
            I'm currently pursuing my B.E. in Computer Science and Engineering with a CGPA of 9.34/10.0.
          </p>
          
          <p>
            My journey in software development began during my academic years, where I developed a keen interest
            in creating solutions that solve real-world problems. I'm particularly interested in web technologies
            and building scalable applications.
          </p>
          
          <p>
            When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and staying
            updated with the latest trends in the tech industry. These activities help me maintain a balanced
            perspective and often inspire creative solutions to technical challenges.
          </p>
          
          <div className={styles.socialLinksContainer}>
            <h3>Connect With Me</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title={link.label}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About 