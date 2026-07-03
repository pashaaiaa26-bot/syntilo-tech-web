"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  onClick,
}) => {
  const Component = onClick ? motion.div : "div";
  const extraProps = onClick
    ? {
        whileHover: { y: -4 },
        whileTap: { scale: 0.99 },
        onClick,
        style: { cursor: "pointer" },
      }
    : {};

  return (
    <Component
      className={`${styles.card} ${hoverEffect ? styles.hover : ""} ${className}`}
      {...extraProps}
    >
      {children}
    </Component>
  );
};
