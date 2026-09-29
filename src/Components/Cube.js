import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox, Text, useCursor, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import Skills from "../pages/Skills";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Bio from "../Components/Bio";
import Connect from "../Components/Connect";

import SoundManager from "../utils/SoundManager";

const VIDEO_URL = "/journeyvid.mp4";
const HOVER_SCALE = 1.05;

const FACE_ROTATIONS = {
  "Front": new THREE.Euler(0, 0, 0),
  "Experience": new THREE.Euler(0, Math.PI / 2, 0),
  "Skills": new THREE.Euler(0, -Math.PI / 2, 0),
  "Projects": new THREE.Euler(Math.PI / 2, 0, 0),
  "Bio": new THREE.Euler(-Math.PI / 2, 0, 0),
  "Connect": new THREE.Euler(0, Math.PI, 0),
};

const FACE_NORMALS = [
  { name: "Front", normal: new THREE.Vector3(0, 0, 1) },
  { name: "Experience", normal: new THREE.Vector3(-1, 0, 0) },
  { name: "Skills", normal: new THREE.Vector3(1, 0, 0) },
  { name: "Projects", normal: new THREE.Vector3(0, 1, 0) },
  { name: "Bio", normal: new THREE.Vector3(0, -1, 0) },
  { name: "Connect", normal: new THREE.Vector3(0, 0, -1) },
];

const FACE_CONFIG = [
  { name: "Experience",    position: [-2.8, 0, 0],  rotation: [0, -Math.PI / 2, 0] },
  { name: "Skills",        position: [2.8, 0, 0],   rotation: [0, Math.PI / 2, 0] },
  { name: "Projects",      position: [0, 2.8, 0],   rotation: [-Math.PI / 2, 0, 0] },
  { name: "Bio",           position: [0, -2.8, 0],  rotation: [Math.PI / 2, 0, 0] },
  { name: "Connect",       position: [0, 0, -2.8],  rotation: [0, Math.PI, 0] },
];

const Cube = ({ setHoveredFaceInfo, navigate, targetFace, controlsRef, onFaceDetected, onOpenResume }) => {
  const meshRef = useRef(null);
  const introTime = useRef(0);
  // Random target: 1 full spin (2PI) + random 0-180 (PI) for slower intro
  const targetRotation = useRef(Math.PI * 2 + Math.random() * Math.PI);
  const [hovered, setHovered] = useState(null);
  const [selectedFace, setSelectedFace] = useState(null);
  const [, setProjectHover] = useState(null);

  const targetQuaternion = useRef(null);
  const isTransitioning = useRef(false);
  const checkFaceTimer = useRef(0);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 14; // Higher threshold to catch split-screens/tablets

  useCursor(!!hovered, 'pointer', 'auto');

  // Gyroscope State
  const [gyro, setGyro] = useState({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handleOrientation = (event) => {
       // Beta (X axis tilt) -90 to 90
       // Gamma (Y axis tilt) -90 to 90
       const x = (event.beta || 0) / 45; // Normalize roughly -1 to 1
       const y = (event.gamma || 0) / 45;
       setGyro({ x, y });
    };

    // IOS 13+ requires permission, but standard API tries to work first
    // We can just add the listener and if it fires, great.
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

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
    SoundManager.playHover(); // Sound Effect
  };

  const handlePointerOut = () => {
    setHovered(null);
    if (setHoveredFaceInfo) setHoveredFaceInfo(null);
  };

  const handleClick = (e, faceName) => {
      e.stopPropagation();
      SoundManager.playClick(); // Sound Effect

      // Request Device Orientation Permission (iOS 13+)
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission()
              .then(permissionState => {
                  if (permissionState === 'granted') {
                      // Permission granted, logic is already handled by useEffect
                  }
              })
              .catch(console.error);
      }

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

  React.useEffect(() => {
    if (targetFace && FACE_ROTATIONS[targetFace]) {
      introTime.current = 5; // cancel intro spin if user navigates
      const targetEuler = FACE_ROTATIONS[targetFace];
      targetQuaternion.current = new THREE.Quaternion().setFromEuler(targetEuler);
      isTransitioning.current = true;
      if (targetFace !== "Front") {
        setSelectedFace(targetFace);
      } else {
        setSelectedFace(null);
      }
    }
  }, [targetFace]);

  // Dynamic Camera Movement & Rotation Loop
  useFrame((state, delta) => {
    // Handle programmatic rotation transition to selected face
    if (isTransitioning.current && targetQuaternion.current && meshRef.current) {
      meshRef.current.quaternion.slerp(targetQuaternion.current, 0.08);

      // Smoothly reset camera position to [0, 0, 18] and controls target to [0, 0, 0]
      const defaultCamPos = new THREE.Vector3(0, 0, 18);
      state.camera.position.lerp(defaultCamPos, 0.08);
      if (controlsRef && controlsRef.current) {
        controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        controlsRef.current.update();
      }

      // Check if settled
      if (
        meshRef.current.quaternion.angleTo(targetQuaternion.current) < 0.01 &&
        state.camera.position.distanceTo(defaultCamPos) < 0.1
      ) {
        meshRef.current.quaternion.copy(targetQuaternion.current);
        isTransitioning.current = false;
      }
    } else {
      // Intro Rotation Animation (5 seconds) - only when not transitioning
      if (introTime.current < 5) {
        introTime.current += delta;
        const progress = Math.min(introTime.current / 5, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        if (meshRef.current) {
          meshRef.current.rotation.y = targetRotation.current * ease;
        }
      }

      // Apply Gyroscope Tilt (Parallax Effect)
      if (meshRef.current && (gyro.x !== 0 || gyro.y !== 0)) {
          const targetX = gyro.x * 0.5; 
          const targetZ = gyro.y * 0.2;
          
          meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
          meshRef.current.rotation.z += (targetZ - meshRef.current.rotation.z) * 0.05;
      }

      // Detect which face is currently pointing at the camera (for syncing active side button)
      checkFaceTimer.current += delta;
      if (checkFaceTimer.current > 0.2 && meshRef.current && onFaceDetected) {
        checkFaceTimer.current = 0;
        const camDir = new THREE.Vector3();
        state.camera.getWorldDirection(camDir).negate(); // Vector from cube towards camera
        
        let bestFace = null;
        let bestDot = 0.75; // Threshold

        for (const face of FACE_NORMALS) {
          const worldNormal = face.normal.clone().applyQuaternion(meshRef.current.quaternion);
          const dot = worldNormal.dot(camDir);
          if (dot > bestDot) {
            bestDot = dot;
            bestFace = face.name;
          }
        }

        if (bestFace) {
          onFaceDetected(bestFace);
        }
      }
    }

    // Normal Hover Animation
    if (meshRef.current) {
        const baseScale = isMobile ? 0.6 : 1;
        const targetScale = hovered ? baseScale * HOVER_SCALE : baseScale;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  const renderFaceContent = (name) => {
      const commonProps = { setProjectHover, onOpenResume };
      switch (name) {
          case "Skills": return <Skills {...commonProps} />;
          case "Experience": return <Experience {...commonProps} />;
          case "Projects": return <Projects {...commonProps} />;
          case "Bio": return <Bio {...commonProps} />;
          case "Connect": return <Connect {...commonProps} />;
          default: return null;
      }
  };

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

            {/* 3D Pop-out View: Shown on Hover OR when Selected via Navigation */}
            {(hovered === face.name || selectedFace === face.name) && (
                <Html
                    transform
                    distanceFactor={isMobile ? 7 : 5.5}
                    zIndexRange={[100, 0]}
                    position={[0, 0, 0.5]}
                    style={{
                        width: isMobile ? '340px' : '500px',
                        background: 'transparent',
                        pointerEvents: 'none'
                    }}
                >
                    <div style={{ 
                        pointerEvents: 'auto', 
                        transform: isMobile ? 'scale(0.95)' : 'scale(1.15)', 
                        transformOrigin: 'center center',
                        position: 'relative'
                    }}>
                        {/* Quick close button to dismiss popout info card */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFace(null);
                                setHovered(null);
                            }}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: '#e0e0e0',
                                border: '1px solid rgba(0,0,0,0.15)',
                                boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
                                color: '#333',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 1000
                            }}
                            aria-label="Dismiss info card"
                            title="Close Info"
                        >
                            ×
                        </button>
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
