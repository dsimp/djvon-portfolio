import React from "react";
import { motion } from "framer-motion";

function Experience({ setProjectHover, onOpenResume }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      className="bubbling-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ overflow: 'visible' }} // Allow pop-outs
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <motion.h1 className="card-title bubbling-text" style={{ fontSize: '1.5rem', color: '#555', margin: 0 }} variants={itemVariants}>
          Experience & Work
        </motion.h1>
        <button
          className="resume-action-btn primary"
          onClick={() => (onOpenResume ? onOpenResume() : window.open("/Djvon_Simpson_Resume.pdf", "_blank"))}
          style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.8rem', pointerEvents: 'auto' }}
          title="Open Full Resume"
        >
          📄 View Full Resume
        </button>
      </div>
      
      {/* Work Experience */}
      <div className="card-section" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
        <h3 className="card-subtitle" style={{ color: '#888', margin: '0.2rem 0' }}>Professional Roles</h3>

        {/* SAP America */}
        <motion.div
          variants={itemVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 123, 255, 0.2)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <h4 style={{ margin: 0, color: '#111', fontSize: '0.95rem', fontWeight: 'bold' }}>SAP America</h4>
            <span style={{ fontSize: '0.75rem', color: '#007bff', fontWeight: '600' }}>Feb 2025 – Present</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#444', fontStyle: 'italic', margin: '2px 0 4px 0' }}>
            Intern, Services Sales · Shadowing Agentic AI Engineer & Success Plan Manager
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#555', lineHeight: '1.4' }}>
            Shadowing on LLM agentic workflows, prompt evaluation, tool patterns, and customer adoption for enterprise solutions.
          </p>
        </motion.div>

        {/* Discovery Partners Institute */}
        <motion.div
          variants={itemVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <h4 style={{ margin: 0, color: '#111', fontSize: '0.95rem', fontWeight: 'bold' }}>Discovery Partners Institute</h4>
            <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600' }}>Sep – Dec 2024</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#444', fontStyle: 'italic', margin: '2px 0 4px 0' }}>
            Software Developer Apprentice (Full-Time)
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#555', lineHeight: '1.4' }}>
            Shipped full-stack React frontends, REST APIs, and SQL models containerized with Docker on GCP; integrated LLMs into live product.
          </p>
        </motion.div>
      </div>

      {/* Featured Projects */}
      <div className="card-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '0.5rem' }}>
        <h3 className="card-subtitle" style={{ color: '#888', margin: '0.2rem 0' }}>Featured Systems</h3>
        
        {/* ghhost.io */}
        <motion.div 
            className="project-card"
            variants={itemVariants}
            onMouseEnter={() => setProjectHover && setProjectHover('ghhost')}
            onMouseLeave={() => setProjectHover && setProjectHover(null)}
            whileHover={{ scale: 1.05, x: 10 }}
            style={{
                background: 'linear-gradient(135deg, #091811, #133a29)',
                padding: '10px 12px',
                borderRadius: '12px',
                border: '1px solid #00ff88',
                boxShadow: '0 0 12px rgba(0, 255, 136, 0.3)',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative'
            }}
            onClick={() => window.open("https://ghhost.io", "_blank")}
        >
            <div style={{ position: 'absolute', left: '-15px', top: '50%', width: '15px', height: '2px', background: '#00ff88' }}></div>
            <h4 style={{ margin: 0, color: '#fff', textShadow: '0 0 8px #00ff88', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>GHHOST.IO</h4>
            <span style={{ fontSize: '0.72rem', color: '#a7f3d0' }}>Sports Analytics & Prediction Platform</span>
        </motion.div>

        {/* Shift Cover */}
        <motion.div 
            className="project-card"
            variants={itemVariants}
            onMouseEnter={() => setProjectHover && setProjectHover('ShiftCover')}
            onMouseLeave={() => setProjectHover && setProjectHover(null)}
            whileHover={{ scale: 1.05, x: 10 }}
            style={{
                background: 'linear-gradient(135deg, #2c3e50, #4c669f)',
                padding: '10px 12px',
                borderRadius: '12px',
                border: '1.5px solid #1a252f',
                boxShadow: '4px 4px 10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative'
            }}
            onClick={() => window.open("https://shift-cover-production.up.railway.app/users/sign_in", "_blank")}
        >
            <div style={{ position: 'absolute', left: '-15px', top: '50%', width: '15px', height: '2px', background: '#4c669f' }}></div>
            <h4 style={{ margin: 0, color: '#fff', fontFamily: 'Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>SHIFT-COVER</h4>
            <span style={{ fontSize: '0.72rem', color: '#ddd' }}>Scheduling Logistics & AI Workflows</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Experience;
