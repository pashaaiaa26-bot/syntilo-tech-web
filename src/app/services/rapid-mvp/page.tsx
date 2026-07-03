"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, Rocket, Shield, Cpu } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import styles from "../custom-dashboards/page.module.css"; // Reuse styling variables

export default function RapidMvp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    funding: "bootstrapped",
    launchDate: "",
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
      <header className={styles.header}>
        <div className="container">
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} />
            <span>Back to Syntilo Tech Home</span>
          </Link>
        </div>
      </header>

      <main className="container">
        <section className={styles.heroSection}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Prototyping Specifications</span>
          <h1 className={styles.mainTitle}>Rapid MVP Engineering & Prototyping</h1>
          <p className={styles.subtitle}>
            From zero to launch in 2 to 4 weeks. We compile full-stack, production-grade SaaS products so you can test features and raise capital with confidence.
          </p>
        </section>

        <div className={styles.grid}>
          {/* Details Column */}
          <div className={styles.detailsCol}>
            <div className={styles.techSection}>
              <h3>Technical Architecture Breakdown</h3>
              <p>
                Unlike generic agencies that build slow, unmaintainable prototypes, we deliver structured TypeScript repositories that are ready for immediate scaling.
              </p>
              
              <div className={styles.specCards}>
                <div className={styles.specCard}>
                  <Rocket className={styles.specIcon} />
                  <div>
                    <h4>Accelerated Boilerplate Compile</h4>
                    <p>Pre-constructed Auth, relational ORM hooks, and styling structures deploy immediately to skip configuration delays.</p>
                  </div>
                </div>
                <div className={styles.specCard}>
                  <Cpu className={styles.specIcon} />
                  <div>
                    <h4>Optimized Core Logic</h4>
                    <p>Focused development targeting only your key value features, bypassing scope bloat to meet tight launch windows.</p>
                  </div>
                </div>
                <div className={styles.specCard}>
                  <Shield className={styles.specIcon} />
                  <div>
                    <h4>Clean Code Ownership</h4>
                    <p>Clean repository transfers. You retain 100% intellectual property and full git commit history.</p>
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
                    <h4>Scoping & Base Deploy</h4>
                    <p>Defining MVP scopes, standing up empty repositories with CI/CD gates, and mapping database schemas.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W2</div>
                  <div className={styles.stepInfo}>
                    <h4>Feature Block Development</h4>
                    <p>Engineering the core interactive engine blocks (auth gates, payments, workflows).</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W3</div>
                  <div className={styles.stepInfo}>
                    <h4>Styling & UI polish</h4>
                    <p>Integrating typography, CSS modules, error triggers, and fine-tuning transitions.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W4</div>
                  <div className={styles.stepInfo}>
                    <h4>Deployment & Handoff</h4>
                    <p>Domain linking, environment variable checking, and git ownership transfer.</p>
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
                  <form key="mvp-form" onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formTitle}>Request MVP Scope</h3>
                    <p className={styles.formSubtitle}>
                      Outline your target audience and core features to get a development pipeline schedule from Sheraz Pasha.
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
                      label="Funding Stage"
                      value={formData.funding}
                      onChange={(e) => setFormData({ ...formData, funding: e.target.value })}
                      options={[
                        { label: "Bootstrapped / Pre-seed", value: "bootstrapped" },
                        { label: "Seed Funded", value: "seed" },
                        { label: "Series A / Institutional", value: "seriesA" },
                        { label: "Corporation / R&D Pilot", value: "corporate" }
                      ]}
                      disabled={isSubmitting}
                    />

                    <Input
                      label="Target Launch Date (e.g. Next Month)"
                      placeholder="Enter timeline goal"
                      value={formData.launchDate}
                      onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                      disabled={isSubmitting}
                    />

                    <div className={styles.textareaGroup}>
                      <label className={styles.label} htmlFor="brief">
                        Describe the core 1-2 features *
                      </label>
                      <textarea
                        id="brief"
                        placeholder="Detail the primary action your users must perform to validate value..."
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
                      Get MVP Proposal
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
                    <h3>MVP Scoping Proposal Request Logged</h3>
                    <p>
                      Your product specifications have been registered. <strong>Sheraz Pasha</strong> will inspect your features list and send a pipeline schedule within 24 hours.
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
