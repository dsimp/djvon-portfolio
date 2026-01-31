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
import AIChat from "./Components/AIChat";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Futuristic, minimalist name in top-left */}
      <Router>
        {/* Everything that needs Router context goes INSIDE here */}
        <AppContent />
        <AIChat />
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
