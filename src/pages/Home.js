import React, { useState } from "react"; // Line 1 - React tools, useState for hover memory.
import { Canvas } from "@react-three/fiber"; // Line 2 - 3D stage like a canvas for painting.
import { OrbitControls } from "@react-three/drei"; // Line 3 - Mouse drag tool—like a joystick for rotating.
import Cube from "../Components/Cube"; // Line 4 - Your cube recipe.
import Skills from "./Skills"; // Line 5 - Skills page.
import Experience from "./Experience"; // Line 6 - Experience.
import Projects from "./Projects"; // Line 7 - Projects.
import Bio from "../Components/Bio"; // Line 8 - Bio.
import Connect from "../Components/Connect"; // Line 9 - Connect.

const Home = () => {
  // Line 10 - Main page function.
  const [hoveredFaceInfo, setHoveredFaceInfo] = useState(null); // Line 11 - Memory for hover name.

  // Map face to route and preview component
  const faceToRoute = {
    "Right (Skills)": { route: "/skills", preview: <Skills /> },
    "Left (Experience)": { route: "/experience", preview: <Experience /> },
    "Top (Projects)": { route: "/projects", preview: <Projects /> },
    "Bottom (Bio)": { route: null, preview: <Bio /> },
    "Back (Connect)": { route: null, preview: <Connect /> },
  };

  // Show preview window for hovered face only while hovering
  const getPreview = () => {
    if (!hoveredFaceInfo || !faceToRoute[hoveredFaceInfo]) return null;
    return (
      <div
        onClick={() => {
          const route = faceToRoute[hoveredFaceInfo].route;
          if (route) window.location.hash = route;
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.05)",
          minWidth: 340,
          minHeight: 220,
          background: "rgba(255,255,255,0.85)",
          borderRadius: 24,
          boxShadow: "0 8px 40px 0 rgba(0,0,0,0.13)",
          border: "1.5px solid #eaeaea",
          padding: "2.2em 2.5em 1.5em 2.5em",
          zIndex: 10,
          cursor: faceToRoute[hoveredFaceInfo].route ? "pointer" : "default",
          transition: "box-shadow 0.2s, transform 0.2s",
          backdropFilter: "blur(6px) saturate(1.2)",
          pointerEvents: hoveredFaceInfo ? "auto" : "none",
        }}
      >
        {faceToRoute[hoveredFaceInfo].preview}
        {faceToRoute[hoveredFaceInfo].route && (
          <div
            style={{
              textAlign: "center",
              marginTop: 18,
              fontSize: "0.95em",
              color: "#888",
            }}
          >
            Click to enter
          </div>
        )}
      </div>
    );
  };

  return (
    // Line 20 - What page looks like.
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#fff",
      }}
    >
      {" "}
      // Line 21 - Full screen white bg—like bright room, cube visible.
      <Canvas camera={{ position: [7, 7, 7], fov: 50 }}>
        {" "}
        // Line 22 - 3D canvas.
        <ambientLight intensity={0.5} /> // Line 23 - Soft light—why? Even glow
        for pearl.
        <pointLight position={[10, 10, 10]} /> // Line 24 - Spot light—why?
        Shiny highlights on white bg.
        <Cube setHoveredFaceInfo={setHoveredFaceInfo} /> // Line 25 - Your cube,
        with hover setter.
        <OrbitControls enableZoom={false} /> // Line 26 - Mouse rotate/drag—why?
        User control, no zoom for minimalist.
      </Canvas>
      {getPreview()}
    </div> // Line 31
  ); // Line 32
};

export default Home; // Line 33 - Share page.
