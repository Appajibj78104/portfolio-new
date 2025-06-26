'use client'

import { motion } from 'framer-motion'
import { FaCertificate, FaArrowLeft } from 'react-icons/fa'
import styles from '@/styles/components/sections/Section.module.scss'

const Skills = ({ onBackClick }) => {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["C", "C++", "JavaScript"]
    },
    {
      category: "Web Development",
      skills: ["HTML", "CSS", "React.js", "Node.js", "Express.js", "Bootstrap", "Tailwind CSS"]
    },
    {
      category: "Frameworks & Tools",
      skills: ["React", "Git", "GitHub"]
    },
    {
      category: "Database Management",
      skills: ["MongoDB", "SQL"]
    },
    {
      category: "CS Fundamentals",
      skills: ["Data Structures and Algorithms", "Operating Systems", "Computer Networks", "Problem Solving"]
    }
  ];
  
  const certifications = [
    {
      title: "Data Structures and Algorithms",
      issuer: "CodeHelp (Love Babbar)",
      year: "2024"
    },
    {
      title: "Full Stack Web Development Course",
      issuer: "100xDevs (Harkirat Singh)",
      year: "2024"
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
          style={{ color: '#ffcc33' }} // Yellow for Skills
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Skills
        </motion.h1>
        
        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.skillsContainer}>
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className={styles.skillCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                <h3>{category.category}</h3>
                <div className={styles.skillTags}>
                  {category.skills.map((skill, i) => (
                    <motion.span 
                      key={i}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: 'rgba(255, 204, 51, 0.2)',
                        color: '#ffcc33'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              className={`${styles.skillCategory} ${styles.certifications}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (skillCategories.length * 0.1) }}
            >
              <h3>Certifications</h3>
              <div className={styles.certificationsList}>
                {certifications.map((cert, index) => (
                  <motion.div 
                    key={index}
                    className={styles.certificationCard}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={styles.certIcon}>
                      <FaCertificate />
                    </div>
                    <div className={styles.certContent}>
                      <h4>{cert.title}</h4>
                      <p>{cert.issuer} <span className={styles.certYear}>• {cert.year}</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Skills 