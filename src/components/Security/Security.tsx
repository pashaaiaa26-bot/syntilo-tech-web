import React from "react";
import { Shield, Lock, Eye } from "lucide-react";
import styles from "./Security.module.css";

interface SecurityItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SECURITY_DATA: SecurityItem[] = [
  {
    id: 1,
    title: "Role-Based Access Control (RBAC)",
    description: "Granular administration management. Custom isolated portals for Super Admins, Managers, and end-users with strict permission logic.",
    icon: <Shield size={24} />
  },
  {
    id: 2,
    title: "End-to-End Data Isolation",
    description: "Your proprietary data, API keys, and custom AI embeddings are siloed and never used to train public models.",
    icon: <Lock size={24} />
  },
  {
    id: 3,
    title: "Comprehensive Audit Logging",
    description: "Track every automated action. Complete transparency over what your AI agents and workflows execute in real-time.",
    icon: <Eye size={24} />
  }
];

export const Security: React.FC = () => {
  return (
    <section className={styles.securitySection}>
      <div className={styles.securityContainer}>
        {/* Header Block */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSub}>BANK-GRADE SECURITY</span>
          <h2 className={styles.sectionTitle}>
            Architected for Enterprise Security
          </h2>
          <p className={styles.sectionSubtitle}>
            We build isolated, role-based ecosystems where your operational data remains strictly yours.
          </p>
          <div className={styles.headerLine} />
        </div>

        {/* Security Cards Grid */}
        <div className={styles.securityGrid}>
          {SECURITY_DATA.map((item) => (
            <div key={item.id} className={styles.securityCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
