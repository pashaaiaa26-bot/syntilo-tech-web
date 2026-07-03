"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, Database, Shield, LayoutGrid, Zap } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import styles from "./page.module.css";

export default function CustomDashboards() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dataSources: "postgresql",
    widgets: "",
    brief: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.brief.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className={styles.wrapper}>
      {/* Top Header */}
      <header className={styles.header}>
        <div className="container">
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} />
            <span>Back to Syntilo Tech Home</span>
          </Link>
        </div>
      </header>

      <main className="container">
        {/* Title Hero */}
        <section className={styles.heroSection}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Technical Specifications</span>
          <h1 className={styles.mainTitle}>Custom Enterprise Dashboards & SaaS</h1>
          <p className={styles.subtitle}>
            We engineer responsive, secure, and data-rich admin hubs and client portals in weeks using pre-validated TypeScript pipelines.
          </p>
        </section>

        {/* Content Columns */}
        <div className={styles.grid}>
          {/* Details Column */}
          <div className={styles.detailsCol}>
            <div className={styles.techSection}>
              <h3>Technical Architecture Breakdown</h3>
              <p>
                Our enterprise dashboards are built with a robust, production-grade stack that ensures low latency, tight security, and horizontal scalability.
              </p>
              
              <div className={styles.specCards}>
                <div className={styles.specCard}>
                  <LayoutGrid className={styles.specIcon} />
                  <div>
                    <h4>React & Next.js Router</h4>
                    <p>Sub-second routing, static asset optimization, and client-side page caching.</p>
                  </div>
                </div>
                <div className={styles.specCard}>
                  <Database className={styles.specIcon} />
                  <div>
                    <h4>Relational Data Engines</h4>
                    <p>PostgreSQL databases coupled with Prisma ORM for type-safe query compilation.</p>
                  </div>
                </div>
                <div className={styles.specCard}>
                  <Shield className={styles.specIcon} />
                  <div>
                    <h4>Enterprise Auths & Logs</h4>
                    <p>CSRF verification protocols, JWT cookie sessions, and secure route guard gates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Roadmap */}
            <div className={styles.techSection}>
              <h3>Step-by-Step Implementation Roadmap</h3>
              <div className={styles.roadmap}>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W1</div>
                  <div className={styles.stepInfo}>
                    <h4>Schema Compilation & Wireframing</h4>
                    <p>Database model construction, Prisma schema validation, and layout wireframing approval.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W2</div>
                  <div className={styles.stepInfo}>
                    <h4>API Route Engineering</h4>
                    <p>Assembling TypeScript controllers, securing data gates, and integrating core API connections.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W3</div>
                  <div className={styles.stepInfo}>
                    <h4>UI Components & Data Visuals</h4>
                    <p>Binding SVG chart modules, setting up active calendars, and testing responsive mobile states.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W4</div>
                  <div className={styles.stepInfo}>
                    <h4>UAT & Production Deployment</h4>
                    <p>Testing edge cases, optimizing queries, and deploying to AWS/Vercel serverless clusters.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form key="dash-form" onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formTitle}>Request Dashboard Quote</h3>
                    <p className={styles.formSubtitle}>
                      Outline your database connections and widget needs to receive a custom scoping breakdown from founder Sheraz Pasha.
                    </p>

                    <Input
                      label="Your Name *"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />

                    <Input
                      label="Corporate Email *"
                      placeholder="name@company.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />

                    <Select
                      label="Primary Database / Data Source"
                      value={formData.dataSources}
                      onChange={(e) => setFormData({ ...formData, dataSources: e.target.value })}
                      options={[
                        { label: "PostgreSQL", value: "postgresql" },
                        { label: "MongoDB / NoSQL", value: "mongodb" },
                        { label: "External REST APIs", value: "rest" },
                        { label: "Excel / CSV files", value: "csv" },
                        { label: "Needs design from scratch", value: "scratch" }
                      ]}
                      disabled={isSubmitting}
                    />

                    <Input
                      label="Key Widgets Needed (e.g. Booking Calendar, Charts)"
                      placeholder="List 2-3 primary visuals"
                      value={formData.widgets}
                      onChange={(e) => setFormData({ ...formData, widgets: e.target.value })}
                      disabled={isSubmitting}
                    />

                    <div className={styles.textareaGroup}>
                      <label className={styles.label} htmlFor="brief">
                        Describe User Roles & Scope *
                      </label>
                      <textarea
                        id="brief"
                        placeholder="Detail who will log in (e.g. admins, clients) and what actions they perform..."
                        value={formData.brief}
                        onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className={styles.textarea}
                      />
                    </div>

                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      rightIcon={<Send size={16} />}
                      className={styles.submitBtn}
                    >
                      Get Dashboard Proposal
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.successContainer}
                  >
                    <CheckCircle className={styles.successIcon} size={48} />
                    <h3>Dashboard Scoping Request Logged</h3>
                    <p>
                      Your dataset requirements have been registered. <strong>Sheraz Pasha</strong> will analyze your source targets and propose a schemas layout within 24 hours.
                    </p>
                    <Link href="/" className={styles.backHomeBtn}>
                      Return to Main Site
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Syntilo Tech. Founded by Sheraz Pasha.</p>
        </div>
      </footer>
    </div>
  );
}
