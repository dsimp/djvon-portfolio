import React from "react";
import { motion } from "framer-motion";

import { portfolioData } from "../Components/portfolioData";

function Projects({ setProjectHover }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      className="bubbling-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ overflow: 'visible' }}
    >
      <motion.h1 className="card-title bubbling-text" style={{ fontSize: '1.5rem', color: '#555' }} variants={itemVariants}>
        Projects
      </motion.h1>
      <motion.p className="card-subtitle" variants={itemVariants}>Architecture & Design</motion.p>

      <div className="card-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
        
        {portfolioData.projects.map((project, index) => (
            <motion.div 
                key={project.name}
                className="project-card"
                variants={itemVariants}
                onMouseEnter={() => setProjectHover && setProjectHover(project.name)}
                onMouseLeave={() => setProjectHover && setProjectHover(null)}
                whileHover={{ scale: 1.1, x: 20 }}
                style={{
                    background: index % 2 === 0 ? '#111' : 'linear-gradient(135deg, #2c3e50, #4c669f)', // Alternate styles or custom logic
                    padding: '12px',
                    borderRadius: '12px',
                    border: index % 2 === 0 ? '1px solid #0ff' : '2px solid #1a252f',
                    boxShadow: index % 2 === 0 ? '0 0 15px rgba(0, 255, 255, 0.3)' : '4px 4px 10px rgba(0,0,0,0.4)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative'
                }}
                onClick={() => window.open(project.link, "_blank")}
            >
                <div style={{ 
                    position: 'absolute', 
                    left: '-20px', 
                    top: '50%', 
                    width: '20px', 
                    height: '2px', 
                    background: index % 2 === 0 ? '#0ff' : '#4c669f' 
                }}></div>
                <h4 style={{ 
                    margin: 0, 
                    color: '#fff', 
                    textShadow: index % 2 === 0 ? '0 0 8px #0ff' : 'none', 
                    fontFamily: index % 2 !== 0 ? 'Impact, sans-serif' : 'inherit',
                    textTransform: index % 2 !== 0 ? 'uppercase' : 'none',
                    letterSpacing: '1px' 
                }}>
                    {project.name}
                </h4>
                <span style={{ fontSize: '0.75rem', color: index % 2 === 0 ? '#ccc' : '#ddd' }}>
                    {project.description}
                </span>
            </motion.div>
        ))}

      </div>
    </motion.div>
  );
}

export default Projects;
