"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, Cpu, Shield, Repeat } from "lucide-react";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import styles from "../custom-dashboards/page.module.css"; // Reuse styling variables

export default function WorkflowAutomation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hoursSaved: "10-20",
    connectors: "",
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
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Automation Specifications</span>
          <h1 className={styles.mainTitle}>End-to-End Workflow & Business Automation</h1>
          <p className={styles.subtitle}>
            Eliminate operational drag. We compile custom middleware, queue systems, auto-billing scripts, and multi-API calendar integrations.
          </p>
        </section>

        <div className={styles.grid}>
          {/* Details Column */}
          <div className={styles.detailsCol}>
            <div className={styles.techSection}>
              <h3>Technical Architecture Breakdown</h3>
              <p>
                Our workflow automations bypass the typical fragility of simple no-code tools, delivering robust, compiled systems that never drop tasks.
              </p>
              
              <div className={styles.specCards}>
                <div className={styles.specCard}>
                  <Cpu className={styles.specIcon} />
                  <div>
                    <h4>Event-Driven Queue Brokers</h4>
                    <p>Robust jobs execution engine designed to manage webhook bursts and API rate limits cleanly.</p>
                  </div>
                </div>
                <div className={styles.specCard}>
                  <Repeat className={styles.specIcon} />
                  <div>
                    <h4>Pre-Engineered Connectors</h4>
                    <p>Compiled hooks for Stripe, Twilio, Google Calendar, SendGrid, and key relational tables.</p>
                  </div>
                </div>
                <div className={styles.specCard}>
                  <Shield className={styles.specIcon} />
                  <div>
                    <h4>Transactions Protection</h4>
                    <p>All routines execute under transactional state rollback rules—if an API fails mid-flight, database states reset cleanly.</p>
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
                    <h4>API Schema Audit & Map</h4>
                    <p>Vetting endpoint limits, validating parameters schemas, and mapping data flow triggers.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W2</div>
                  <div className={styles.stepInfo}>
                    <h4>Queue Routing & Fallback Design</h4>
                    <p>Constructing queue brokers, setup retry triggers, and testing exception protocols.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W3</div>
                  <div className={styles.stepInfo}>
                    <h4>Integrations & Webhooks Binding</h4>
                    <p>Connecting Live webhooks (Stripe payouts, CRM update listeners) and synchronizing states.</p>
                  </div>
                </div>
                <div className={styles.roadmapStep}>
                  <div className={styles.stepNum}>W4</div>
                  <div className={styles.stepInfo}>
                    <h4>Stress Testing & Rollout</h4>
                    <p>Simulating bulk burst requests, auditing logs pipelines, and going live on serverless runners.</p>
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
                  <form key="work-form" onSubmit={handleSubmit} className={styles.form}>
                    <h3 className={styles.formTitle}>Request Automation Scope</h3>
                    <p className={styles.formSubtitle}>
                      Provide your system targets to receive an architectural map and flat-rate timeline quote from Sheraz Pasha.
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
                      label="Est. Weekly Manual Hours to Save"
                      value={formData.hoursSaved}
                      onChange={(e) => setFormData({ ...formData, hoursSaved: e.target.value })}
                      options={[
                        { label: "10 - 20 hours/week", value: "10-20" },
                        { label: "20 - 40 hours/week", value: "20-40" },
                        { label: "40 - 80 hours/week", value: "40-80" },
                        { label: "80+ hours/week (Multiple headcount)", value: "80plus" }
                      ]}
                      disabled={isSubmitting}
                    />

                    <Input
                      label="Required API Connectors (e.g. Stripe, Salesforce)"
                      placeholder="List key systems to connect"
                      value={formData.connectors}
                      onChange={(e) => setFormData({ ...formData, connectors: e.target.value })}
                      disabled={isSubmitting}
                    />

                    <div className={styles.textareaGroup}>
                      <label className={styles.label} htmlFor="brief">
                        Describe the manual flow *
                      </label>
                      <textarea
                        id="brief"
                        placeholder="Explain the step-by-step process you want to automate..."
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
                      Get Automation Proposal
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
                    <h3>Automation intake registered</h3>
                    <p>
                      Your flow description has been compiled. <strong>Sheraz Pasha</strong> will model the data mappings and send an integration roadmap to you within 24 hours.
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
