import React from "react";
import { motion } from "framer-motion"; // This lets us make things fade in like magic

function Home() {
  return (
    <motion.div
      className="glass-panel" // Uses the white frosted panel style we made in App.css
      initial={{ opacity: 0, y: 50 }} // Starts invisible and a bit lower on the screen
      animate={{ opacity: 1, y: 0 }} // Fades in and slides up smoothly
      transition={{ duration: 1, ease: "easeOut" }} // Takes 1 second, feels gentle like floating up in space
    >
      <h1>Hey, I'm Djvon Simpson</h1>
      <p>
        Welcome to my futuristic portfolio — a self-taught coder's adventure
        through code galaxies.
      </p>
      <p>Click around like exploring a spaceship. Let's launch!</p>
    </motion.div>
  );
}

export default Home;
