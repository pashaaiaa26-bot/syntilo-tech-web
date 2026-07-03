import React from "react";
import styles from "./Marquee.module.css";

const TECH_STACK = [
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "Node.js",
  "Prisma",
  "Docker",
  "n8n",
  "OpenAI",
];

export const Marquee: React.FC = () => {
  // Duplicate the array to create a seamless infinite wrapping loop
  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {items.map((tech, index) => (
          <div key={index} className={styles.marqueeItem}>
            <span className={styles.techText}>{tech}</span>
            <span className={styles.techDot}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
