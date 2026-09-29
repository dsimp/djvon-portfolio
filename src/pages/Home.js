import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sparkles } from "@react-three/drei";
import { FaVolumeUp, FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";
import Cube from "../Components/Cube";
import CubeNav from "../Components/CubeNav";
import ResumeModal from "../Components/ResumeModal";
import AIChat from "../Components/AIChat";
import TutorialOverlay from "../Components/TutorialOverlay";

const Home = () => {
  const [activePulsate, setActivePulsate] = useState(null);
  const [targetFace, setTargetFace] = useState(null);
  const [activeFace, setActiveFace] = useState("Front");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const controlsRef = useRef(null);
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
          lineHeight: '0.8',
          maxWidth: '40vw', // Tighter constraint (40%) to ensure center is clear
          overflow: 'visible' 
        }}
      >
        <div style={{ pointerEvents: 'none' }}> 
            <h1 
                className="bubbling-text" 
                style={{ 
                    margin: 0, 
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', // Reduced max size to prevent overlap
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
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', // Reduced max size
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
                    title="Pronounce Name"
                >
                    <FaVolumeUp size={24} color="#333" />
                </button>
                <button 
                    className="neumorphic-inset" 
                    onClick={() => setIsResumeOpen(true)}
                    aria-label="View Resume"
                    title="View & Download Resume"
                >
                    <FaFileAlt size={22} color="#171515" />
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
        {/* Particle Background - Subtle floating dust */}
        <Sparkles count={100} scale={25} size={6} speed={0.4} opacity={0.6} color="#007bff" />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Cube 
            navigate={navigate} 
            targetFace={targetFace}
            controlsRef={controlsRef}
            onFaceDetected={(face) => setActiveFace(face)}
            onOpenResume={() => setIsResumeOpen(true)}
        />
        
        <OrbitControls 
            ref={controlsRef}
            enableZoom={true} 
            enablePan={true} // Allow user to move the whole scene "free across the screen"
            enableDamping={true} 
            dampingFactor={0.05}
            minDistance={10}
            maxDistance={50}
            autoRotate={false}
            autoRotateSpeed={1.0}
            makeDefault 
        />
      </Canvas>
      
      <CubeNav 
        activeFace={activeFace}
        onSelectFace={(face) => {
          setActiveFace(face);
          setTargetFace(face);
        }}
        onOpenResume={() => setIsResumeOpen(true)}
        navigate={navigate}
      />

      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <AIChat />
      <TutorialOverlay />
    </div>
  );
};

export default Home; // Line 33 - Share page.
