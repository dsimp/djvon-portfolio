import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function JourneyAnimation({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      onFinish(); // Tell home page the movie is over
    }, 10000); // 10 seconds movie
  }, [onFinish]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
        zIndex: 20, // On top at start
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ color: "#00bfff", marginBottom: "20px" }}>
        My Journey Timeline
      </h2>

      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 200 }}
        transition={{ duration: 10, ease: "linear" }} // Character flies left to right
        style={{ position: "absolute", top: "30%" }}
      >
        {/* Your character SVG */}
        <svg
          width="100"
          height="100"
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
              .outline { stroke: #00bfff; stroke-width: 2.5; fill: none; filter: url(#glow); }
              .skin { fill: #8d5524; }
              .beard { fill: #1a1a1a; }
              .suit { fill: #0d0d0d; }
              .details { stroke: #ffffff; stroke-width: 1.5; fill: none; stroke-linecap: round; }
              .eye { fill: #ffffff; }
            `,
              }}
            />
          </defs>
          <g>
            <g class="outline">
              <path d="M70,140 Q100,165 130,140 L135,180 L65,180 Z" />{" "}
              {/* Torso */}
              <path d="M75,60 Q75,40 100,40 Q125,40 125,60 L135,110 Q100,135 65,110 Z" />{" "}
              {/* Head + Beard */}
            </g>
            <path class="suit" d="M70,140 Q100,165 130,140 L140,190 H60 Z" />
            <path
              class="details"
              d="M85,155 L100,170 L115,155 M100,170 V190"
              opacity="0.5"
            />
            <path
              class="beard"
              d="M65,85 Q60,100 75,120 Q100,130 125,120 Q140,100 135,85 L125,80 Q125,110 75,80 Z"
            />
            <path
              class="skin"
              d="M75,70 Q75,40 100,40 Q125,40 125,70 L125,95 Q100,105 75,95 Z"
            />
            <path class="details" d="M80,110 Q100,125 120,110" />{" "}
            {/* Big smile */}
            <circle cx="85" cy="85" r="3" class="eye" />
            <circle cx="115" cy="85" r="3" class="eye" />
            <path
              class="details"
              d="M75,135 Q100,145 125,135"
              stroke-width="1"
            />
          </g>
        </svg>
      </motion.div>

      {/* Timeline years as icons */}
      <motion.div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 2 } } }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          style={{ textAlign: "center" }}
        >
          <p>2019-2020: Self-Teaching</p>
          <svg width="50" height="50">
            <rect x="10" y="10" width="30" height="30" fill="#00bfff" />
          </svg>{" "}
          {/* Laptop icon */}
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          style={{ textAlign: "center" }}
        >
          <p>2021: SpiritTail</p>
          <svg width="50" height="50">
            <circle cx="25" cy="25" r="20" fill="#00bfff" />
          </svg>{" "}
          {/* App icon */}
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          style={{ textAlign: "center" }}
        >
          <p>2023-2026: Apprenticeship & Beyond</p>
          <svg width="50" height="50">
            <star points for badge />
          </svg>{" "}
          {/* Badge icon */}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default JourneyAnimation;
