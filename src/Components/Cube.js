import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox, Text, useCursor, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import Skills from "../pages/Skills";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Bio from "../Components/Bio";
import Connect from "../Components/Connect";

const VIDEO_URL = "/journeyvid.mp4";
const HOVER_SCALE = 1.05; // Reverted to subtle zoom
const NORMAL_SCALE = 1;

// Map face names to their content components
const FACE_CONTENT = {
  "Skills": <Skills />,
  "Experience": <Experience />,
  "Projects": <Projects />,
  "Bio": <Bio />,
  "Connect": <Connect />
};

const FACE_CONFIG = [
  { name: "Skills",        position: [2.8, 0, 0],   rotation: [0, Math.PI / 2, 0] },
  { name: "Experience",    position: [-2.8, 0, 0],  rotation: [0, -Math.PI / 2, 0] },
  { name: "Projects",      position: [0, 2.8, 0],   rotation: [-Math.PI / 2, 0, 0] },
  { name: "Bio",           position: [0, -2.8, 0],  rotation: [Math.PI / 2, 0, 0] },
  { name: "Connect",       position: [0, 0, -2.8],  rotation: [0, Math.PI, 0] },
];

const Cube = ({ setHoveredFaceInfo, navigate }) => {
  const meshRef = useRef(null);
  const introTime = useRef(0);
  // Random target: 1 full spin (2PI) + random 0-180 (PI) for slower intro
  const targetRotation = useRef(Math.PI * 2 + Math.random() * Math.PI);
  const [hovered, setHovered] = useState(null);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 14; // Higher threshold to catch split-screens/tablets
  const responsiveScale = isMobile ? 0.5 : 1; 

  useCursor(!!hovered, 'pointer', 'auto');

  // Setup video texture
  const [videoElement] = useState(() => {
    const vid = document.createElement("video");
    vid.src = VIDEO_URL;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true; // Kept Muted as per last stable config if removed animation? 
    // Wait, User asked to "Play my video audio" in Step 556?
    // Then in Step 588: "Dont play audio of video... The faces are not retracting one by one".
    // So MUTE IT.
    vid.playsInline = true;
    vid.play().catch(e => console.warn("Video play error:", e));
    return vid;
  });

  const videoTexture = useMemo(() => {
    const texture = new THREE.VideoTexture(videoElement);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [videoElement]);

  const handlePointerOver = (e, faceName) => {
    e.stopPropagation();
    setHovered(faceName);
    if (setHoveredFaceInfo) setHoveredFaceInfo(faceName);
  };

  const handlePointerOut = () => {
    setHovered(null);
    if (setHoveredFaceInfo) setHoveredFaceInfo(null);
  };

  const handleClick = (e, faceName) => {
      e.stopPropagation();
      if (navigate) {
          const routeMap = {
             "Skills": "/skills",
             "Experience": "/experience",
             "Projects": "/projects",
             "Bio": "/bio",
             "Connect": "/connect"
          };
          const target = routeMap[faceName];
          if (target) navigate(target);
      }
  };

  const [projectHover, setProjectHover] = useState(null);

  // Dynamic Camera Movement on Project Hover
  useFrame((state, delta) => {
    // Intro Rotation Animation (5 seconds)
    if (introTime.current < 5) {
      introTime.current += delta;
      const progress = Math.min(introTime.current / 5, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      if (meshRef.current) {
        // Spin from 0 to target
        meshRef.current.rotation.y = targetRotation.current * ease;
      }
    }

    // Camera Focus Logic REMOVED to prevent fighting with user rotation
    // if (projectHover) {
    //    // Target position based on project
    //    const targetPos = new THREE.Vector3(0, 0, 16); // Zoom in closer
    //    if (projectHover === 'SpiritTail') {
    //        targetPos.set(4, 2, 14); // Angle right/up
    //    } else if (projectHover === 'ShiftCover') {
    //        targetPos.set(-4, -2, 14); // Angle left/down
    //    }
    //    state.camera.position.lerp(targetPos, delta * 2);
    // }

    // Normal Hover Animation
    if (meshRef.current) {
        const baseScale = isMobile ? 0.6 : 1;
        const targetScale = hovered ? baseScale * HOVER_SCALE : baseScale;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  const renderFaceContent = (name) => {
      const commonProps = { setProjectHover };
      switch (name) {
          case "Skills": return <Skills {...commonProps} />;
          case "Experience": return <Experience {...commonProps} />;
          case "Projects": return <Projects {...commonProps} />;
          case "Bio": return <Bio {...commonProps} />;
          case "Connect": return <Connect {...commonProps} />;
          default: return null;
      }
  };

  // ... (Lines 80-101: Material) ...

  // Common Material
  const glassMaterial = (
    <meshPhysicalMaterial
      color="#ffffff"
      roughness={0.2}
      metalness={0.1}
      clearcoat={1.0}
      transmission={0}
    />
  );

  // "Center the cube on ALL screen sizes... like it was once before"
  
  return (
    <group position={[0, 0, 0]}>
      <RoundedBox
        ref={meshRef}
        args={[5.5, 5.5, 5.5]}
        radius={0.5}
        smoothness={4}
        onPointerOut={handlePointerOut}
      >
        {glassMaterial}

        {/* Menu Faces with Text and Pop-out Preview */}
        {FACE_CONFIG.map((face) => (
          <group 
            key={face.name} 
            position={face.position} 
            rotation={face.rotation}
            onPointerOver={(e) => handlePointerOver(e, face.name)}
            onClick={(e) => handleClick(e, face.name)}
          >
            {/* Label */}
            <Text
              fontSize={0.8}
              color="#222222"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
            >
              {face.name}
            </Text>

            {/* 3D Pop-out View */}
            {hovered === face.name && (
                <Html
                    transform
                    distanceFactor={4}
                    zIndexRange={[100, 0]} // Prioritize these elements efficiently
                    position={[0, 0, 0.5]} // Float slightly off face
                    style={{
                        width: '300px',
                        background: 'transparent',
                        pointerEvents: 'none' // Wrapper none, but children need to be clickable
                    }}
                >
                    <div style={{ pointerEvents: 'auto' }}> {/* Ensure interactions work */}
                        {renderFaceContent(face.name)}
                    </div>
                </Html>
            )}
          </group>
        ))}

        {/* Front Video Face - Plane Method */}
        <mesh 
            position={[0, 0, 2.76]} 
            onPointerOver={(e) => handlePointerOver(e, "Front (Video)")}
        >
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>

      </RoundedBox>
    </group>
  );
};

export default Cube;
