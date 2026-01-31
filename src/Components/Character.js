import React from "react";
import { motion } from "framer-motion";

function Character() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }} // Gentle up-down float
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        top: "20%",
        right: "10%",
        width: "200px",
        height: "200px",
        zIndex: 10,
      }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes hover {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            .character-group {
              animation: hover 3s ease-in-out infinite;
              transform-origin: center;
            }
            .outline {
              stroke: #00bfff;
              stroke-width: 2.5;
              fill: none;
              filter: url(#glow);
            }
            .skin { fill: #8d5524; }
            .beard { fill: #1a1a1a; }
            .suit { fill: #0d0d0d; }
            .details { stroke: #ffffff; stroke-width: 1.5; fill: none; stroke-linecap: round; }
            .eye { fill: #ffffff; }
          `,
            }}
          />
        </defs>
        <rect width="200" height="200" fill="white" />
        <g className="character-group">
          <g className="outline">
            <path d="M70,140 Q100,165 130,140 L135,180 L65,180 Z" />
            {/* Torso */}
            <path d="M75,60 Q75,40 100,40 Q125,40 125,60 L135,110 Q100,135 65,110 Z" />
            {/* Head + Beard */}
          </g>
          <path className="suit" d="M70,140 Q100,165 130,140 L140,190 H60 Z" />
          <path
            className="details"
            d="M85,155 L100,170 L115,155 M100,170 V190"
            opacity="0.5"
          />
          <path
            className="beard"
            d="M65,85 Q60,100 75,120 Q100,130 125,120 Q140,100 135,85 L125,80 Q125,110 75,80 Z"
          />
          <path
            className="skin"
            d="M75,70 Q75,40 100,40 Q125,40 125,70 L125,95 Q100,105 75,95 Z"
          />
          <path className="details" d="M80,110 Q100,125 120,110" />
          <circle cx="85" cy="85" r="3" className="eye" />
          <circle cx="115" cy="85" r="3" className="eye" />
          <path
            className="details"
            d="M75,135 Q100,145 125,135"
            strokeWidth="1"
          />
        </g>
      </svg>
    </motion.div>
  );
}

export default Character;
