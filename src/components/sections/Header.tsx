"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.container}`}>
        <a href="#home" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoAccent}>Syntilo</span>
          <span className={styles.logoText}>Tech</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <a href="#demo" className={styles.navLink}>Live Demos</a>
          <a href="#before-after" className={styles.navLink}>Syntilo vs Legacy</a>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#calculator" className={styles.navLink}>ROI Calculator</a>
          <a href="#faq" className={styles.navLink}>FAQ Bot</a>
        </nav>

        <div className={styles.desktopActions}>
          <Button
            onClick={() => {
              const el = document.getElementById("booking");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            rightIcon={<ArrowRight size={16} />}
            size="sm"
          >
            Book Discovery
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <nav className={styles.mobileNav}>
            <a href="#demo" className={styles.mobileNavLink} onClick={closeMenu}>
              Live Demos
            </a>
            <a href="#before-after" className={styles.mobileNavLink} onClick={closeMenu}>
              Syntilo vs Legacy
            </a>
            <a href="#services" className={styles.mobileNavLink} onClick={closeMenu}>
              Services
            </a>
            <a href="#calculator" className={styles.mobileNavLink} onClick={closeMenu}>
              ROI Calculator
            </a>
            <a href="#faq" className={styles.mobileNavLink} onClick={closeMenu}>
              FAQ Bot
            </a>
            <Button
              onClick={() => {
                closeMenu();
                const el = document.getElementById("booking");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              rightIcon={<ArrowRight size={16} />}
              className={styles.mobileCta}
            >
              Book Discovery
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
