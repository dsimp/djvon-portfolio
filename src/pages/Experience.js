import React from "react";
import { motion } from "framer-motion";

function Experience() {
  return (
    <motion.div
      className="glass-panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1>My Journey</h1>
      <p>
        During COVID quarantine I taught myself coding — started with JavaScript
        and React, then kept going because I loved it.
      </p>
      <p>
        My first real web app: <strong>SpiritTail</strong> — a cocktail recipe
        explorer
      </p>
      <p>
        → Live:{" "}
        <a href="https://spirit-tail-1.vercel.app/" target="_blank">
          spirit-tail-1.vercel.app
        </a>
      </p>
      <p>
        → GitHub:{" "}
        <a href="https://github.com/dsimp/SpiritTail-1" target="_blank">
          github.com/dsimp/SpiritTail-1
        </a>
      </p>

      <p>
        Finished Full Stack Developer Apprenticeship at Discovery Partners
        Institute
      </p>
      <p>
        Built <strong>Shift Cover</strong> — a scheduling helper app
      </p>
      <p>
        → GitHub:{" "}
        <a href="https://github.com/dsimp/shift-cover" target="_blank">
          github.com/dsimp/shift-cover
        </a>
      </p>
    </motion.div>
  );
}

export default Experience;
