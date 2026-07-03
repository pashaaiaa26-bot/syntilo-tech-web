"use client";

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.headerContainer}>
        {/* Left Block: Outfit Text Logo */}
        <div className={styles.logoWrapper}>
          <span className={styles.logoText}>Syntilo Tech</span>
        </div>

        {/* Center Block: Navigation Links */}
        <nav className={styles.navWrapper}>
          <a href="#" className={styles.navLink}>Home</a>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#portfolio" className={styles.navLink}>Portfolio</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>

        {/* Right Block: Emerald CTA Button */}
        <div className={styles.ctaWrapper}>
          <button 
            className={styles.ctaBtn}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Book Consultation
          </button>
        </div>
      </div>
    </header>
  );
};
