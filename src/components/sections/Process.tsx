"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Database, Cpu, Rocket } from "lucide-react";
import styles from "./Process.module.css";

const steps = [
  {
    week: "WEEK 1",
    title: "AI-Driven Architecture Audit",
    desc: "We analyze your existing workflows and databases, using automation models to map logic bottlenecks and API transaction speeds.",
    icon: <Search size={24} />
  },
  {
    week: "WEEK 2",
    title: "Database Schema & Prisma Sync",
    desc: "We draft and compile strict PostgreSQL database models and Prisma ORM configurations, establishing a production-grade type-safe baseline.",
    icon: <Database size={24} />
  },
  {
    week: "WEEK 3",
    title: "LLM & Webhooks Orchestration",
    desc: "We connect Claude/GPT-4 API endpoints, configure job queues to bypass rate limits, and bind webhooks for payment (Stripe) and mail.",
    icon: <Cpu size={24} />
  },
  {
    week: "WEEK 4",
    title: "Serverless Launch & Code Handoff",
    desc: "We link your domain, deploy environment pipelines on AWS/Vercel serverless runners, and hand off full git repository ownership.",
    icon: <Rocket size={24} />
  }
];

export const Process: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Our Execution Framework</span>
          <h2 className={styles.title}>Superhuman Speed. Proven Methodology.</h2>
          <p className={styles.subtitle}>
            We combine AI-driven code compilation pipelines with strict software engineering standards to deploy enterprise platforms in 4 weeks.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={styles.stepCard}
            >
              <div className={styles.weekBadge}>{step.week}</div>
              <div className={styles.iconWrapper}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
