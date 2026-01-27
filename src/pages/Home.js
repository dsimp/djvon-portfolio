import React from "react";
import { motion } from "framer-motion";

function Home() {
  const journey = [
    {
      year: "2020",
      title: "COVID Quarantine Launch",
      desc: "I taught myself JavaScript, React, Redux — turned lockdown into code adventure!",
    },
    {
      year: "2021",
      title: "First App: SpiritTail",
      desc: "Built a cocktail recipe explorer — my first real web project.",
      links: [
        { text: "Live Site", url: "https://spirit-tail-1.vercel.app/" },
        { text: "GitHub", url: "https://github.com/dsimp/SpiritTail-1" },
      ],
    },
    {
      year: "2023+",
      title: "Full Stack Apprenticeship",
      desc: "Joined Discovery Partners Institute — mastered Ruby, Rails, Docker, PSQL, RSpec. Built Shift Cover scheduling tool.",
      links: [
        {
          text: "GitHub: Shift Cover",
          url: "https://github.com/dsimp/shift-cover",
        },
      ],
    },
  ];

  return (
    <motion.div
      className="glass-panel"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1>Djvon Simpson's Sci-Fi Journey</h1>
      <p>Scroll down like flying through code space...</p>

      <div style={{ marginTop: "40px" }}>
        {journey.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            style={{
              marginBottom: "40px",
              padding: "20px",
              borderLeft: "4px solid #00bfff",
              paddingLeft: "20px",
            }}
          >
            <h2 style={{ color: "#00bfff", marginBottom: "10px" }}>
              {item.year} — {item.title}
            </h2>
            <p>{item.desc}</p>
            {item.links && (
              <div style={{ marginTop: "10px" }}>
                {item.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginRight: "15px",
                      color: "#00bfff",
                      textDecoration: "none",
                    }}
                  >
                    {link.text} →
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Placeholder for your character — we'll add the SVG next */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <p>Your character coming soon — flying through the timeline!</p>
      </div>
    </motion.div>
  );
}

export default Home;
