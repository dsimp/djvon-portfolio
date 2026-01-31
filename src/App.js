import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Futuristic, minimalist name in top-left */}
      <div
        style={{
          position: "fixed",
          top: 24,
          left: 32,
          zIndex: 100,
          fontFamily: "Orbitron, sans-serif",
          fontWeight: 700,
          fontSize: "1.3rem",
          letterSpacing: "0.08em",
          color: "#eaeaea",
          background: "rgba(248,245,242,0.7)",
          borderRadius: "1.2em",
          boxShadow: "0 2px 16px 0 rgba(248,245,242,0.25)",
          padding: "0.45em 1.2em",
          filter: "blur(0.5px) contrast(1.1)",
          border: "1.5px solid #ececec",
          mixBlendMode: "screen",
          userSelect: "none",
        }}
      >
        Djvon Simpson
      </div>
      <Router>
        {/* Everything that needs Router context goes INSIDE here */}
        <AppContent />
      </Router>
    </div>
  );
}

// NEW: Move the content + useLocation into its own component
function AppContent() {
  const location = useLocation(); // Now safe — we're inside <Router>

  return (
    <motion.main
      key={location.pathname} // Triggers animation on every page change
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </motion.main>
  );
}

export default App;
