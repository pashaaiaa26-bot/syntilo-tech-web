"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal as TerminalIcon, FileText, ArrowRight, ShieldCheck, Mail, Database } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "./Playground.module.css";

interface LogLine {
  text: string;
  type: "system" | "router" | "success" | "warn" | "info";
}

const SCENARIOS = {
  support: {
    title: "Customer Support Routing",
    desc: "Classify sentiment, check customer value in DB, and route ticket.",
    icon: <Mail size={20} />,
    logs: [
      { text: "Trigger detected: Incoming ticket from customer-inbox-listener", type: "system" },
      { text: "Analyzing text body: 'Duplicate billing charge on invoice #9042. Request refund immediately.'", type: "info" },
      { text: "Classifying sentiment via Claude 3.5 Sonnet... sentiment: FRUSTRATED (Priority: High)", type: "router" },
      { text: "Querying customer relational database for match on 'michael@dundermifflin.com'...", type: "system" },
      { text: "Database response: MATCH FOUND. Tier: Enterprise Platinum (LTV: $45,200)", type: "success" },
      { text: "API trigger: Generating Zendesk ticket #89201 and assigning to Tier 3 Billing Team", type: "system" },
      { text: "API trigger: Sending Slack alert to customer success channel #vip-escalations", type: "system" },
      { text: "Auto-reply sent: 'Duplicate charge identified. Escalated to billing supervisor.'", type: "success" },
      { text: "Pipeline finished in 1.4s. Saved 15 minutes of manual triaging.", type: "success" }
    ]
  },
  invoice: {
    title: "Invoice Dataset Extraction",
    desc: "Scan PDF layout tables, check rates against POs, and flag deviations.",
    icon: <FileText size={20} />,
    logs: [
      { text: "Trigger detected: PDF document uploaded to invoices-dropzone", type: "system" },
      { text: "File: 'invoice_croftexplorations_8901.pdf' (Size: 421 KB)", type: "info" },
      { text: "Running OCR structure analyzer and layout page segmenter...", type: "system" },
      { text: "Extracted: 4 line items. Currency detected: EUR (Converting to USD using live API)", type: "router" },
      { text: "Querying database for active Purchase Order matching PO-9982...", type: "system" },
      { text: "Database response: MATCH FOUND. Base rate allocated: $120/hr", type: "success" },
      { text: "Verification check: Line Item 3 (Custom Consultant fee) rate deviates by +18%", type: "warn" },
      { text: "Action taken: Flagged discrepancy. Routed to Accounting approval board", type: "router" },
      { text: "Pipeline finished in 1.9s. Saved 12 minutes of manual auditing.", type: "success" }
    ]
  },
  lead: {
    title: "Lead Qualification Agent",
    desc: "Scan corporate domain details, evaluate budgets, and schedule pitches.",
    icon: <Database size={20} />,
    logs: [
      { text: "Trigger detected: New discovery form submission (ID: #8092)", type: "system" },
      { text: "Lead data: 'Bruce Wayne' - Email: 'bruce@waynecorp.com' - Budget: '$35,000+'", type: "info" },
      { text: "Vetting email domain validity and searching corporate index...", type: "system" },
      { text: "Database response: Domain verified. Company Size: 10,000+ employees (Fortune 500)", type: "success" },
      { text: "Generating custom outreach brief matching 'Enterprise SaaS Dashboard' scope...", type: "router" },
      { text: "Action: Dispatching personalized introduction email with Sheraz Pasha's calendar link", type: "success" },
      { text: "Database Update: Mark lead priority: IMMEDIATE, notify systems architects", type: "system" },
      { text: "Pipeline finished in 1.1s. Saved 20 minutes of manual research.", type: "success" }
    ]
  }
};

type ScenarioKey = keyof typeof SCENARIOS;

export const Playground: React.FC = () => {
  const [activeKey, setActiveKey] = useState<ScenarioKey>("support");
  const [runningLogs, setRunningLogs] = useState<LogLine[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const runScenario = (key: ScenarioKey) => {
    if (isExecuting) return;
    setIsExecuting(true);
    setRunningLogs([]);
    setProgress(0);

    const logsToRun = SCENARIOS[key].logs;
    let index = 0;

    const interval = setInterval(() => {
      if (index < logsToRun.length) {
        const logItem = logsToRun[index] as LogLine;
        setRunningLogs((prev) => [...prev, logItem]);
        setProgress(Math.round(((index + 1) / logsToRun.length) * 100));
        index++;
        
        // Scroll terminal
        setTimeout(() => {
          terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      } else {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 600);
  };

  useEffect(() => {
    runScenario(activeKey);
  }, [activeKey]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Interactive Sandbox</span>
          <h2 className={styles.title}>AI Workflow Automation Playground</h2>
          <p className={styles.subtitle}>
            Select a business workflow template on the left and trigger our AI compilation runtime to watch how tasks are intercepted, validated, and completed.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column Scenarios */}
          <div className={styles.scenariosCol}>
            {Object.entries(SCENARIOS).map(([key, item]) => {
              const isActive = activeKey === key;
              return (
                <div
                  key={key}
                  className={`${styles.scenarioCard} ${isActive ? styles.activeCard : ""}`}
                  onClick={() => !isExecuting && setActiveKey(key as ScenarioKey)}
                >
                  <div className={`${styles.iconBox} ${isActive ? styles.activeIcon : ""}`}>
                    {item.icon}
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className={styles.arrow} />
                </div>
              );
            })}
          </div>

          {/* Right Column Terminal Console */}
          <div className={styles.terminalContainer}>
            <div className={styles.terminalHeader}>
              <div className={styles.browserDots}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
              </div>
              <div className={styles.terminalTitle}>
                <TerminalIcon size={14} />
                <span>syntilo_runtime_compiler.sh</span>
              </div>
              <div className={styles.terminalStatus}>
                <span className={isExecuting ? styles.pulseOrange : styles.pulseGreen}></span>
                <span>{isExecuting ? "EXECUTING..." : "IDLE"}</span>
              </div>
            </div>

            <div className={styles.terminalBody}>
              <div className={styles.welcomeText}>
                <p>Syntilo Tech AI Agent Compiler (v3.4.1-stable)</p>
                <p>Establishing type-safe REST/ORM pipelines...</p>
                <p className={styles.cyanText}>Ready to run. Click a scenario to execute.</p>
              </div>

              <div className={styles.logStream}>
                <AnimatePresence>
                  {runningLogs.map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`${styles.logLine} ${styles[log.type]}`}
                    >
                      <span className={styles.timestamp}>[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                      <span className={styles.logText}>{log.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isExecuting && (
                  <div className={styles.runningIndicator}>
                    <span className={styles.spinner}>⌛</span>
                    <span className={styles.blinkingCursor}>|</span>
                  </div>
                )}
                
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Progress / Actions */}
            <div className={styles.terminalFooter}>
              <div className={styles.progressBarBg}>
                <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
              </div>
              <div className={styles.footerRow}>
                <span className={styles.progressText}>COMPILATION PROGRESS: {progress}%</span>
                <Button
                  onClick={() => runScenario(activeKey)}
                  disabled={isExecuting}
                  size="sm"
                  rightIcon={<Play size={12} fill="currentColor" />}
                >
                  Trigger Run
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
