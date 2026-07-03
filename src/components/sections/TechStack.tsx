"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Code, Database, Server } from "lucide-react";
import styles from "./TechStack.module.css";

type CategoryId = "models" | "orchestration" | "data" | "infra";

const CATEGORIES = [
  { id: "models", name: "Language Models", icon: <Cpu size={16} /> },
  { id: "orchestration", name: "AI Orchestration", icon: <Code size={16} /> },
  { id: "data", name: "Data & Vectors", icon: <Database size={16} /> },
  { id: "infra", name: "Infrastructure", icon: <Server size={16} /> }
];

const TECH_ITEMS = {
  models: [
    { name: "Claude 3.5 Sonnet", usage: "High-precision operational classifications and advanced structural reasoning." },
    { name: "GPT-4o", usage: "Real-time conversational agents and high-throughput vector embedding generation." },
    { name: "Llama 3", usage: "Self-hosted, cost-efficient processing pipelines for strict local data privacy compliance." },
    { name: "DeepSeek R1", usage: "Advanced mathematical reasoning and code block logic synthesis." }
  ],
  orchestration: [
    { name: "LangChain", usage: "Constructing multi-agent tool chains and LLM system context windows management." },
    { name: "LlamaIndex", usage: "RAG optimization connecting unstructured text models to corporate relational tables." },
    { name: "vLLM", usage: "Hosting open-weight models on custom hardware with optimized context length throughput." },
    { name: "Hugging Face", usage: "Tokenization matching, sentiment scoring models, and semantic categorizers." }
  ],
  data: [
    { name: "PostgreSQL", usage: "Primary relational storage for transaction logs, patient tables, and fleet routes." },
    { name: "Pinecone", usage: "High-performance vector storage supporting sub-second similarity searches." },
    { name: "Prisma ORM", usage: "Generating strict type definitions matching database layers directly to our APIs." },
    { name: "Redis", usage: "Asynchronous job caching, session tracking buffers, and webhook rate limiting." }
  ],
  infra: [
    { name: "AWS Lambda", usage: "Serverless backend workers executing scaling jobs on-demand with zero idle cost." },
    { name: "Vercel", usage: "Hosting dynamic Next.js dashboards with globally cached edge routing." },
    { name: "Docker", usage: "Standardizing environments to guarantee identical behavior between local and cloud runs." },
    { name: "GitHub Actions", usage: "Automated test suites compiling types and checking lints on every commit push." }
  ]
};

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("models");

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Capabilities Matrix</span>
          <h2 className={styles.title}>Our Enterprise Technology Stack</h2>
          <p className={styles.subtitle}>
            We build with modern, production-ready libraries and serverless cloud architectures, avoiding brittle integrations to guarantee long-term stability.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabContainer}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryId)}
              className={`${styles.tabBtn} ${activeCategory === cat.id ? styles.activeTab : ""}`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div className={styles.gridContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={styles.techGrid}
            >
              {TECH_ITEMS[activeCategory].map((item, idx) => (
                <div key={idx} className={styles.techCard}>
                  <h4 className={styles.techName}>{item.name}</h4>
                  <p className={styles.techUsage}>{item.usage}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
