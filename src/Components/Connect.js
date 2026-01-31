import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Connect = () => {
  return (
    <div className="bubbling-card" style={{ justifyContent: 'center', textAlign: 'center' }}>
      <h2 className="card-title" style={{ fontSize: '1.4rem' }}>
        Let's Build Together
      </h2>
      <p style={{ color: '#555', margin: '1rem 0' }}>
        Looking for a motivated engineer with React, Redux, and Node.js skills?
      </p>
      
      <a href="mailto:simpsondjvon@yahoo.com">
        <button className="primary-btn">
          I'd love to connect!
        </button>
      </a>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
        <a href="https://github.com/dsimp" target="_blank" rel="noreferrer">
            <button className="neumorphic-inset" aria-label="GitHub">
                <FaGithub size={20} color="#555" />
            </button>
        </a>
        <a href="https://www.linkedin.com/in/djvon-simpson-9341a186/" target="_blank" rel="noreferrer">
            <button className="neumorphic-inset" aria-label="LinkedIn">
                <FaLinkedin size={20} color="#555" />
            </button>
        </a>
      </div>
    </div>
  );
};

export default Connect;
