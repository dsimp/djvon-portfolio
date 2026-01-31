import React from "react";
import Djvon from "./Images/IMG_0539.jpeg";
import Slideshow from "./Slideshow";

const Bio = () => {
  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img 
            src={Djvon} 
            alt="Djvon" 
            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
        <div>
            <h1 className="card-title" style={{ fontSize: '1.5rem' }}>Djvon Simpson</h1>
            <p className="card-subtitle">Software Engineer</p>
        </div>
      </div>
      
      <div className="card-section" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '12px', padding: '1rem', marginTop: '1rem' }}>
        <p style={{ fontSize: '1.0rem', lineHeight: '1.6', fontStyle: 'italic', color: '#333' }}>
          "The power to dream something into reality is what drives me. From the architecture of a backend to the pixel-perfect precision of a frontend, I build systems that come alive. I don't just code; I create worlds."
        </p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Slideshow />
      </div>
    </div>
  );
};

export default Bio;
