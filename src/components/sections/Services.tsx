"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Repeat, Rocket, ArrowRight } from "lucide-react";
import styles from "./Services.module.css";

const servicesData = [
  {
    icon: <BarChart3 size={32} />,
    title: "Custom Enterprise Dashboards & SaaS",
    slug: "custom-dashboards",
    description:
      "We design and build premium corporate hubs, lab report trackers, and patient management portals. Features high-performance SVG visual analytics, responsive tab routing, and bulletproof relational structures.",
    features: [
      "Custom Analytical Graphics",
      "Dynamic Member Check-in Streams",
      "Hospitality & Map Routing API integrations",
      "Strict Light Mode HSL design layouts"
    ]
  },
  {
    icon: <Repeat size={32} />,
    title: "End-to-End Workflow & Business Automation",
    slug: "workflow-automation",
    description:
      "Eliminate repetitive overhead by automating dispatch logs, auto-billing pipelines, and calendar appointment syncs. We construct the middleware connecting your systems, reducing human error to zero.",
    features: [
      "Automated Billing Alerts",
      "Syncing booking structures to calendar APIs",
      "Smart Routing Dispatch logic",
      "Asynchronous webhook processing"
    ]
  },
  {
    icon: <Rocket size={32} />,
    title: "Rapid MVP Engineering & Prototyping",
    slug: "rapid-mvp",
    description:
      "Have a SaaS idea but traditional agencies are quoting 6 months? We compile production-grade, deployment-ready MVPs in 2 to 4 weeks. Perfect for fundraising, client pilots, and validating demand.",
    features: [
      "2-4 Week Delivery Window",
      "TypeScript + React Boilerplate architecture",
      "Vetting for SEO metadata optimization",
      "Immediate Vercel / AWS deployment pipelines"
    ]
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Our Core Competencies</span>
          <h2 className={styles.title}>Engineered for Infinite Scalability</h2>
          <p className={styles.subtitle}>
            We do not write generic scripts. We engineer modern, scalable, and beautifully designed web solutions that streamline complex corporate procedures.
          </p>
        </div>

        <div className={styles.grid}>
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.card}
            >
              <div className={styles.cardIcon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              
              <div className={styles.divider}></div>
              
              <ul className={styles.featuresList}>
                {service.features.map((feat, fIdx) => (
                  <li key={fIdx} className={styles.featureItem}>
                    <span className={styles.bullet}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href={`/services/${service.slug}`} className={styles.learnMore}>
                <span>Explore Technical Specs</span>
                <ArrowRight size={16} className={styles.arrow} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
