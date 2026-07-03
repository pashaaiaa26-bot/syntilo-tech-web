import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topRow}>
          {/* Logo & About */}
          <div className={styles.aboutCol}>
            <a href="#home" className={styles.logo}>
              <span className={styles.logoAccent}>Syntilo</span>
              <span className={styles.logoText}>Tech</span>
            </a>
            <p className={styles.desc}>
              Syntilo Tech leverages advanced AI workflows to engineer high-performance, secure management systems and enterprise dashboards in weeks. Founded by Sheraz Pasha.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4>Ecosystem Nodes</h4>
            <ul className={styles.linksList}>
              <li><a href="#demo">Live Demos</a></li>
              <li><a href="#before-after">Syntilo vs Legacy</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#calculator">ROI Calculator</a></li>
              <li><a href="#faq">FAQ Chatbot</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className={styles.linksCol}>
            <h4>Strategic Contact</h4>
            <ul className={styles.linksList}>
              <li>
                <span>Intake: </span>
                <a href="mailto:sheraz@syntilo.tech">sheraz@syntilo.tech</a>
              </li>
              <li>
                <span>Founder: </span>
                <span className={styles.lightText}>Sheraz Pasha</span>
              </li>
              <li>
                <span>Location: </span>
                <span className={styles.lightText}>Global / Remote operations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <p className={styles.copy}>
            &copy; {currentYear} Syntilo Tech. All rights reserved. Code compiled under strict production-grade parameters.
          </p>
          <div className={styles.legalLinks}>
            <a href="#privacy">Privacy Protocol</a>
            <span>•</span>
            <a href="#terms">Terms of Deployment</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
