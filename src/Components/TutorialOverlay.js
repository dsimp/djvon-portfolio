import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHandPointer } from 'react-icons/fa';

const TutorialOverlay = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if user has already seen the tutorial
    const hasSeenTutorial = localStorage.getItem('hasSeenRotTutorial');
    
    if (!hasSeenTutorial) {
      // Show after a short delay
      const timer = setTimeout(() => setVisible(true), 1500);
      
      // Auto-dismiss after 6 seconds
      const dismissTimer = setTimeout(() => {
        handleDismiss();
      }, 7500);

      return () => {
        clearTimeout(timer);
        clearTimeout(dismissTimer);
      };
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('hasSeenRotTutorial', 'true');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none', // Allow clicks to pass through to orbit controls
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'rgba(0,0,0,0.5)'
          }}
        >
          <motion.div
            animate={{ 
              x: [-20, 20, -20],
              rotate: [-10, 10, -10] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <FaHandPointer size={60} />
          </motion.div>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              marginTop: '1rem',
              fontSize: '1.2rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            Drag to Rotate
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TutorialOverlay;
