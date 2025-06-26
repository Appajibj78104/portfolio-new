'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa'
import styles from '@/styles/components/sections/Section.module.scss'

const Projects = ({ onBackClick }) => {
  const projects = [
      {
      title: "HOUSEWiSE—HOUSEWiFE SERViCES MARKETPLACE",
      description: "Engineered a full‑stack MERN platform connecting housewives and local customers, featuring JWT‑based role authentication, CRUD service listings, and a unified dashboard for both providers and clients. Integrated OpenStreetMap via Leaflet.js with MongoDB geospatial queries to enable radius‑based provider discovery and marker‑clustered map views, improving search relevance by 60%. Built a stateful booking workflow with real‑time WebSocket notifications for booking requests, status changes, and reminders. Architected a one‑per‑booking review rating system and aggregated average scores on provider profiles to boost trust and repeat bookings.",
      technologies: ["MERN Stack", "JWT", "Leaflet.js", "WebSockets", "React", "TailwindCSS", "MongoDB"],
      image: "/images/projects/housewise.png",
      liveLink: "https://housewise-one.vercel.app/",
      githubLink: "https://github.com/Appajibj78104/housewise"
    },
    {
      title: "NourishNow - Food Donation Platform",
      description: "Engineered a user-centric platform to streamline food donation processes, fostering collaboration between donors and NGOs to reduce waste. Implemented a robust NGO verification system, ensuring credibility and reducing fraudulent registrations by 40%. Optimized backend queries to enhance database performance, cutting data retrieval times by 50%.",
      technologies: ["MERN Stack", "Tailwind CSS"],
      image: "/images/projects/nourishnow.jpg",
      liveLink: "https://nourish-hosting-git-main-appaji-bs-projects.vercel.app/",
      githubLink: "https://github.com/Appajibj78104/nourish-hosting-"
    },
    {
      title: "EduEase - Assessment and Remedial System",
      description: "Designed an intuitive platform for teachers to create and manage assessments (posts and quizzes). Enabled students to participate in assessments seamlessly, with features to upload submissions and track deadlines in real time. Developed a teacher-specific dashboard to review, grade, and provide feedback on student submissions.",
      technologies: ["MERN Stack"],
      image: "/images/projects/edufuse.jpg",
      liveLink: "https://eduease-advanced-aatsystem.vercel.app/",
      githubLink: "https://github.com/Appajibj78104/EduEase"
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
          style={{ color: '#ff3366' }} // Red for Projects
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          My Projects
        </motion.h1>
        
        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectImageContainer}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={styles.projectImage}
                  onError={(e) => {
                    e.target.src = '/images/projects/placeholder.jpg';
                  }}
                />
              </div>
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.tags}>
                  {project.technologies.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.projectLink} ${styles.liveLink}`}
                    onClick={(e) => {
                      if (project.liveLink === '#') {
                        e.preventDefault();
                        alert('Live demo coming soon!');
                      }
                    }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.projectLink} ${styles.githubLink}`}
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Projects
