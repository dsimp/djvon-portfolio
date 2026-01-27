import React from "react";
import { motion } from "framer-motion"; // This lets us make things fade in like magic

function Projects() {
  return (
    <motion.div
      className="glass-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1>Projects</h1>
      <p>
        SpiritTail and Shift Cover are my proudest builds so far — more epic
        ones coming soon!
      </p>
      <p>Details and links are in the Experience section.</p>
    </motion.div>
  );
}

export default Projects;
