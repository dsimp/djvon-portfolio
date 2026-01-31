import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import CubeFace from "./CubeFace";

const MENU_FACE_COLOR = "#ffffff";
const METALNESS = 0.5;
const ROUGHNESS = 0.4;
const VIDEO_URL = "/journeyvid.mp4";

const FACE_NAMES = [
  "Right (Skills)",
  "Left (Experience)",
  "Top (Projects)",
  "Bottom (Bio)",
  "Front (Video)",
  "Back (Connect)",
];

const Cube = ({ setHoveredFaceInfo }) => {
  const meshRef = useRef(null);

  // Setup video texture for front face
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = VIDEO_URL;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.play();
    return vid;
  });

  const videoTexture = useMemo(() => {
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [video]);

  // No longer using materials array, each face is a component

  // Mouse interaction logic
  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "grab";
  };
  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (e.faceIndex !== undefined) {
      const sideIndex = Math.floor(e.faceIndex / 2);
      const faceName = FACE_NAMES[sideIndex] || "Unknown";
      setHoveredFaceInfo(faceName);
    }
  };
  const handlePointerOut = () => {
    setHoveredFaceInfo(null);
    document.body.style.cursor = "auto";
  };
  const handlePointerDown = () => {
    document.body.style.cursor = "grabbing";
  };
  const handlePointerUp = () => {
    document.body.style.cursor = "grab";
  };
  return (
    <group ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Right (Skills) */}
      <CubeFace position={[2.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} label="Skills" color="#fff" />
      {/* Left (Experience) */}
      <CubeFace position={[-2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} label="Experience" color="#fff" />
      {/* Top (Projects) */}
      <CubeFace position={[0, 2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} label="Projects" color="#fff" />
      {/* Bottom (Bio) */}
      <CubeFace position={[0, -2.5, 0]} rotation={[Math.PI / 2, 0, 0]} label="Bio" color="#fff" />
      {/* Back (Connect) */}
      <CubeFace position={[0, 0, -2.5]} rotation={[0, Math.PI, 0]} label="Connect" color="#fff" />
      {/* Front (Video) */}
      <CubeFace position={[0, 0, 2.5]} rotation={[0, 0, 0]} color="#fff">
        {/* Video texture on front face */}
        <meshBasicMaterial attach="material" map={videoTexture} toneMapped={false} />
      </CubeFace>
    </group>
  );
  );
};

export default Cube;
