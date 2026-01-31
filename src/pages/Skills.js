import React from "react";
import { motion } from "framer-motion";

function Skills() {
  const skills = [
    "JavaScript (Expert)", "React", "Redux", "Node.js", "Express",
    "TypeScript", "Python", "Ruby on Rails", "Docker", "PostgreSQL", "RSpec"
  ];

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(10, 20, 30, 0.85)', // Darker sci-fi bg
        border: '1px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        color: '#e0f7fa'
      }}
    >
      <h1 className="card-title" style={{ 
        fontFamily: "'Courier New', monospace", 
        color: '#00ffff', 
        textShadow: '0 0 10px rgba(0,255,255,0.8)',
        letterSpacing: '2px',
        borderBottom: '1px solid rgba(0,255,255,0.2)',
        paddingBottom: '0.5rem'
      }}>
        SYSTEM CAPABILITIES
      </h1>
      
      <div className="card-section" style={{ background: 'transparent' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                background: 'rgba(0, 40, 60, 0.6)',
                border: '1px solid #00aaaa',
                borderRadius: '4px',
                padding: '8px',
                fontSize: '0.75rem',
                textAlign: 'center',
                color: '#00ffff',
                boxShadow: '0 0 5px rgba(0,255,255,0.2)',
                cursor: 'default',
                fontFamily: 'monospace'
              }}
              whileHover={{ 
                scale: 1.1, 
                background: 'rgba(0, 60, 80, 0.9)', 
                boxShadow: '0 0 15px rgba(0,255,255,0.6)',
                zIndex: 10
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Skills;
