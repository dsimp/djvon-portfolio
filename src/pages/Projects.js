import React from "react";
import { motion } from "framer-motion";

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
        
        {/* SpiritTail */}
        <motion.div 
            className="project-card"
            variants={itemVariants}
            onMouseEnter={() => setProjectHover && setProjectHover('SpiritTail')}
            onMouseLeave={() => setProjectHover && setProjectHover(null)}
            whileHover={{ scale: 1.1, x: 20 }}
            style={{
                background: '#111',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid #0ff',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative'
            }}
            onClick={() => window.open("https://spirit-tail-1.vercel.app/", "_blank")}
        >
            <div style={{ position: 'absolute', left: '-20px', top: '50%', width: '20px', height: '2px', background: '#0ff' }}></div>
            <h4 style={{ margin: 0, color: '#fff', textShadow: '0 0 8px #0ff', letterSpacing: '1px' }}>SPIRIT TAIL</h4>
            <span style={{ fontSize: '0.75rem', color: '#ccc' }}>Cocktail Recipe Explorer</span>
        </motion.div>

        {/* Shift Cover */}
        <motion.div 
            className="project-card"
            variants={itemVariants}
            onMouseEnter={() => setProjectHover && setProjectHover('ShiftCover')}
            onMouseLeave={() => setProjectHover && setProjectHover(null)}
            whileHover={{ scale: 1.1, x: 20 }}
            style={{
                background: 'linear-gradient(135deg, #2c3e50, #4c669f)',
                padding: '12px',
                borderRadius: '12px',
                border: '2px solid #1a252f',
                boxShadow: '4px 4px 10px rgba(0,0,0,0.4)',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative'
            }}
            onClick={() => window.open("https://github.com/dsimp/shift-cover", "_blank")}
        >
            <div style={{ position: 'absolute', left: '-20px', top: '50%', width: '20px', height: '2px', background: '#4c669f' }}></div>
            <h4 style={{ margin: 0, color: '#fff', fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>SHIFT-COVER</h4>
            <span style={{ fontSize: '0.75rem', color: '#ddd' }}>Scheduling Logistics</span>
        </motion.div>

      </div>
    </motion.div>
  );
}

export default Projects;
