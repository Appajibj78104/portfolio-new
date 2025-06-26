'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaCalendarAlt, FaMedal, FaArrowLeft } from 'react-icons/fa'
import styles from '@/styles/components/sections/Section.module.scss'

const Education = ({ onBackClick }) => {
  const education = [
    {
      degree: "B.E. Computer Science and Engineering",
      institution: "BMS Institute of Technology and Management",
      period: "2022 - Present",
      grade: "CGPA: 9.34/10.0",
      description: "Focusing on core computer science subjects, data structures, algorithms, and web development technologies. Actively participating in coding competitions and hackathons."
    },
    {
      degree: "Pre-University College",
      institution: "Alva's PU College",
      period: "2020 - 2022",
      grade: "Percentage: 93.6%",
      description: "Studied Physics, Chemistry, Mathematics, and Computer Science. Participated in various technical events and competitions."
    },
    {
      degree: "High School (CBSE)",
      institution: "Kendriya Vidyalaya Sangathan",
      period: "2019 - 2020",
      grade: "Percentage: 82.6%",
      description: "Completed secondary education with focus on science and mathematics. Developed interest in programming and computer science."
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
          style={{ color: '#6633cc' }} // Purple for Education
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Education
        </motion.h1>
        
        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.educationTimeline}>
            {education.map((edu, index) => (
              <motion.div 
                key={index} 
                className={styles.educationCard}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.15) }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.timelineIcon}>
                  <FaGraduationCap />
                </div>
                <div className={styles.educationContent}>
                  <h3>{edu.degree}</h3>
                  <div className={styles.educationMeta}>
                    <span><FaCalendarAlt /> {edu.period}</span>
                    <span><FaMedal /> {edu.grade}</span>
                  </div>
                  <h4>{edu.institution}</h4>
                  <p>{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Education 