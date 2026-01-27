import React from "react";
import { motion } from "framer-motion";

function Skills() {
  return (
    <motion.div
      className="glass-panel"
      initial={{ opacity: 0, y: 30 }} // Starts invisible and slightly lower
      animate={{ opacity: 1, y: 0 }} // Fades in and slides up
      transition={{ duration: 0.8, ease: "easeOut" }} // 0.8 seconds, gentle
    >
      <h1>My Skills</h1>
      <ul>
        <li>JavaScript — Expert (self-taught during COVID!)</li>
        <li>React + Redux — Building interactive UIs</li>
        <li>Node.js + Express — Server-side magic</li>
        <li>TypeScript — Safer, smarter JavaScript</li>
        <li>Python — Some scripting & fun projects</li>
        <li>Ruby + Ruby on Rails — Full-stack web apps</li>
        <li>Docker — Packaging apps like containers on a spaceship</li>
        <li>PSQL (PostgreSQL) — Powerful databases</li>
        <li>RSpec — Testing like a pro</li>
      </ul>
    </motion.div>
  );
}

export default Skills;
