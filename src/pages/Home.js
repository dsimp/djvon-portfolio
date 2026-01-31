import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { FaVolumeUp, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Cube from "../Components/Cube";
import AIChat from "../Components/AIChat";

// Camera Animation Component
const IntroCamera = () => {
  const { camera } = useThree();
  
  useFrame((state, delta) => {
    // Smoothly fly camera from z=40 to z=14
    // We only want this to run at the start. 
    // Lerping continuously to 14 is fine as long as OrbitControls is aware or we stop interaction initially.
    // However, simplest "fly in" is to just lerp until close.
    if (camera.position.z > 14.1) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 14, delta * 2);
    }
  });
  return null;
};

const Home = () => {
  const [activePulsate, setActivePulsate] = useState(null);
  const navigate = useNavigate();

  const handleSpeak = () => {
    const text = "Duh-von Simp-son";
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to find a smoother voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes("David") || 
      (voice.name.includes("Male") && voice.lang.includes("en")) ||
      (voice.name.includes("Google") && voice.lang.includes("en-US"))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9; 
    utterance.pitch = 0.8; 
    utterance.volume = 1;

    // Animation Sequence
    setActivePulsate('first');
    setTimeout(() => setActivePulsate('last'), 600); // Pulse "Simpson" after ~0.6s
    setTimeout(() => setActivePulsate(null), 1200);

    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(utterance);
  };
  
  // Animation Variants removed

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#e0e0e0", 
      }}
    >
        <style>{`
            @keyframes softPulse {
                0% { transform: scale(1); filter: brightness(100%); }
                50% { transform: scale(1.1); filter: brightness(90%); text-shadow: 0 5px 15px rgba(0,0,0,0.2); }
                100% { transform: scale(1); filter: brightness(100%); }
            }
        `}</style>

      {/* Branding Overlay - Static */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '40px', 
          left: '60px', 
          zIndex: 10,
          pointerEvents: 'none', // Wrapper is none, children auto
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          lineHeight: '0.8'
        }}
      >
        <div style={{ pointerEvents: 'none' }}> 
            <h1 
                className="bubbling-text" 
                style={{ 
                    margin: 0, 
                    fontSize: '6rem',
                    animation: activePulsate === 'first' ? 'softPulse 0.5s ease-in-out' : 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                Djvon
            </h1>
            <h1 
                className="bubbling-text" 
                style={{ 
                    margin: 0, 
                    fontSize: '6rem',
                    animation: activePulsate === 'last' ? 'softPulse 0.5s ease-in-out' : 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                Simpson
            </h1>
            <h2 className="bubbling-text" style={{ margin: '1rem 0 0 0', fontSize: '2rem' }}>Engineer and AI Enthusiast</h2>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', pointerEvents: 'auto' }}>
                <a href="https://github.com/dsimp" target="_blank" rel="noreferrer">
                    <button className="neumorphic-inset" aria-label="GitHub">
                        <FaGithub size={28} color="#171515" />
                    </button>
                </a>
                <a href="https://www.linkedin.com/in/djvon-simpson-9341a186/" target="_blank" rel="noreferrer">
                    <button className="neumorphic-inset" aria-label="LinkedIn">
                        <FaLinkedin size={28} color="#0077b5" />
                    </button>
                </a>
                <button 
                    className="neumorphic-inset" 
                    onClick={handleSpeak}
                    aria-label="Pronounce Name"
                >
                    <FaVolumeUp size={24} color="#333" />
                </button>
            </div>
        </div>
        
        {/* Pronunciation Button Removed from bottom, moved inline above */}
      </div>

      <Canvas 
        camera={{ position: [0, 0, 18], fov: 45 }} 
      >
        <color attach="background" args={["#e0e0e0"]} /> 
        <Environment preset="studio" />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* <IntroCamera /> Removed to prevent fighting with controls */}
        
        <Cube navigate={navigate} />
        
        <OrbitControls 
            enableZoom={true} 
            enableDamping={true} 
            dampingFactor={0.05}
            minDistance={10}
            maxDistance={40}
            autoRotate={false}
            autoRotateSpeed={1.0}
            makeDefault 
        />
      </Canvas>
      
      <AIChat />
    </div>
  );
};

export default Home; // Line 33 - Share page.
