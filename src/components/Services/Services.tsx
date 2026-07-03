import React from "react";
import styles from "./Services.module.css";

interface ServiceItem {
  id: number;
  title: string;
  badge: string;
  description: string;
  features: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: "Agentic Workflows",
    badge: "AUTOMATION",
    description: "Orchestrate self-correcting autonomous processes using n8n, LangChain, and state machines.",
    features: [
      "Multi-agent coordination",
      "Dynamic decision nodes",
      "Background task queues"
    ]
  },
  {
    id: 2,
    title: "Custom AI Dashboards",
    badge: "TELEMETRY",
    description: "Track live operational data, business metrics, and AI inference latency in real-time.",
    features: [
      "WebSocket data streams",
      "Executive level KPI widgets",
      "Low-latency rendering"
    ]
  },
  {
    id: 3,
    title: "Role-Based Ecosystems",
    badge: "SAAS ARCHITECTURE",
    description: "Multi-tier platforms with complex permissions, granular administrative scopes, and secure audits.",
    features: [
      "Admin & Guest permission levels",
      "Server actions authorization",
      "Auditable access logs"
    ]
  },
  {
    id: 4,
    title: "Automated Content Pipelines",
    badge: "SCRAPING & PROCESSING",
    description: "Orchestrate high-speed web scraper engines, vector embedding, and media production assets.",
    features: [
      "Bulk visual content collection",
      "Vector database embeddings",
      "Automated media publishing"
    ]
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.servicesContainer}>
        {/* Section Heading */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSub}>WHAT WE BUILD</span>
          <h2 className={styles.sectionTitle}>
            Enterprise Solutions We Engineer
          </h2>
          <div className={styles.headerLine} />
        </div>

        {/* Bento Box Grid */}
        <div className={styles.bentoGrid}>
          {SERVICES_DATA.map((service, index) => {
            // Apply asymmetric spans on desktop for bento styling
            const cardClass = `${styles.bentoCard} ${
              index === 0 || index === 3 ? styles.cardWide : styles.cardNormal
            }`;

            return (
              <div key={service.id} className={cardClass}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardBadge}>{service.badge}</span>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                </div>
                
                <p className={styles.cardDescription}>{service.description}</p>
                
                <ul className={styles.featureList}>
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className={styles.featureItem}>
                      <span className={styles.bulletCheck}>✓</span>
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
