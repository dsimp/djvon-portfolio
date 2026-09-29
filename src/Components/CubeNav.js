import React from "react";
import {
  FaPlay,
  FaBriefcase,
  FaCode,
  FaRocket,
  FaUser,
  FaEnvelope,
  FaFileAlt
} from "react-icons/fa";
import SoundManager from "../utils/SoundManager";
import "./CubeNav.css";

const CUBE_FACES = [
  { name: "Front", label: "Intro", icon: FaPlay, route: null },
  { name: "Experience", label: "Experience", icon: FaBriefcase, route: "/experience" },
  { name: "Skills", label: "Skills", icon: FaCode, route: "/skills" },
  { name: "Projects", label: "Projects", icon: FaRocket, route: "/projects" },
  { name: "Bio", label: "Bio", icon: FaUser, route: "/bio" },
  { name: "Connect", label: "Connect", icon: FaEnvelope, route: "/connect" },
];

const CubeNav = ({ activeFace, onSelectFace, onOpenResume, navigate }) => {
  const handleFaceClick = (item) => {
    SoundManager.playClick();

    // If clicked when already active, navigate into the full detail page
    if (activeFace === item.name && item.route && navigate) {
      navigate(item.route);
      return;
    }

    onSelectFace(item.name);
  };

  const handleResumeClick = () => {
    SoundManager.playClick();
    if (onOpenResume) {
      onOpenResume();
    }
  };

  const handleHover = () => {
    SoundManager.playHover();
  };

  return (
    <aside className="cube-nav-container" aria-label="Cube Navigation Dock">
      {CUBE_FACES.map((item) => {
        const Icon = item.icon;
        const isActive = activeFace === item.name;

        return (
          <button
            key={item.name}
            className={`cube-nav-btn ${isActive ? "active" : ""}`}
            onClick={() => handleFaceClick(item)}
            onMouseEnter={handleHover}
            aria-label={`Rotate cube to ${item.label}`}
            title={item.label}
          >
            <Icon size={16} />
            <span className="cube-nav-tooltip">
              {item.label} {isActive && item.route ? "(Open Page)" : ""}
            </span>
          </button>
        );
      })}

      <div className="cube-nav-divider" />

      {/* Resume Button */}
      <button
        className="cube-nav-btn resume-nav-btn"
        onClick={handleResumeClick}
        onMouseEnter={handleHover}
        aria-label="View and Download Resume"
        title="Resume (View & Download)"
      >
        <FaFileAlt size={16} />
        <span className="cube-nav-tooltip">📄 Resume (View & Download)</span>
      </button>
    </aside>
  );
};

export default CubeNav;
