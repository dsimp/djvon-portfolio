import React from "react";
import { Html } from "@react-three/drei";

// Props: position, rotation, label, color, children
const CubeFace = ({ position, rotation, color = "#fff", label, children }) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={[4.5, 4.5]} />
    <meshBasicMaterial color={color} />
    {label && (
      <Html
        center
        style={{ fontSize: "2em", color: "#222", fontWeight: "bold" }}
      >
        {label}
      </Html>
    )}
    {children}
  </mesh>
);

export default CubeFace;
