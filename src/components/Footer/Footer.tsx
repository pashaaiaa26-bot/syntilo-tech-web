import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Left Side: Outfit Text Logo */}
        <div className={styles.brandRow}>
          <span className={styles.brandLogo}>Syntilo Tech</span>
          <p className={styles.copyright}>
            © 2026 Syntilo Tech. All rights reserved. Founded by Sheraz Pasha.
          </p>
        </div>

        {/* Right Side: Links */}
        <div className={styles.linksRow}>
          <Link href="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
          <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

