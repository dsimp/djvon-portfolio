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
import Bio from "./Components/Bio";
import Connect from "./Components/Connect";
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

// Wrapper to center detail pages similarly to the "Zoomed In" feel
const DetailPage = ({ children }) => (
  <div style={{ 
    width: '100vw', 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
    overflow: 'hidden' // Components handle their own scroll if needed
  }}>
    <div style={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '90vh' }}>
      {children}
    </div>
  </div>
);

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
        <Route path="/skills" element={<DetailPage><Skills /></DetailPage>} />
        <Route path="/experience" element={<DetailPage><Experience /></DetailPage>} />
        <Route path="/projects" element={<DetailPage><Projects /></DetailPage>} />
        <Route path="/bio" element={<DetailPage><Bio /></DetailPage>} />
        <Route path="/connect" element={<DetailPage><Connect /></DetailPage>} />
      </Routes>
    </motion.main>
  );
}

export default App;
