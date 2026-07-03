"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, Clock, HelpCircle, ArrowRight } from "lucide-react";
import { Select } from "../ui/Select";
import styles from "./Calculator.module.css";

// Hook to animate numbers ticking up/down
const useAnimatedNumber = (target: number, duration = 600) => {
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = current;
    const diff = target - startValue;

    if (diff === 0) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(startValue + diff * ease);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target]);

  return Math.round(current);
};

export const Calculator: React.FC = () => {
  const [projectType, setProjectType] = useState("saas");
  const [complexity, setComplexity] = useState(2); // 1 = MVP, 5 = enterprise
  const [urgency, setUrgency] = useState("standard"); // standard, express
  const [currency, setCurrency] = useState<"USD" | "PKR">("USD");

  const EXCHANGE_RATE = 280;
  const symbol = currency === "USD" ? "$" : "Rs. ";

  const [calcResults, setCalcResults] = useState({
    traditionalCost: 80000,
    traditionalWeeks: 20,
    syntiloCost: 25000,
    syntiloWeeks: 3,
    savingsCost: 55000,
    savingsWeeks: 17,
  });

  useEffect(() => {
    // 1. Calculate Traditional Cost
    let tradBase = 50000;
    let tradWeeksBase = 12;
    if (projectType === "portal") {
      tradBase = 40000;
      tradWeeksBase = 10;
    } else if (projectType === "automation") {
      tradBase = 30000;
      tradWeeksBase = 8;
    }

    const tradCost = tradBase * (0.5 + complexity * 0.5) * (urgency === "express" ? 1.3 : 1);
    const tradWeeks = tradWeeksBase * (0.6 + complexity * 0.4) * (urgency === "express" ? 0.75 : 1);

    // 2. Calculate Syntilo Cost
    let synBase = 22000;
    let synWeeksBase = 2.5;
    if (projectType === "portal") {
      synBase = 18000;
      synWeeksBase = 2;
    } else if (projectType === "automation") {
      synBase = 14000;
      synWeeksBase = 1.5;
    }

    const synCost = synBase * (0.7 + complexity * 0.3);
    const synWeeks = synWeeksBase * (0.8 + complexity * 0.2);

    setCalcResults({
      traditionalCost: Math.round(tradCost),
      traditionalWeeks: Math.round(tradWeeks),
      syntiloCost: Math.round(synCost),
      syntiloWeeks: Math.max(1, Math.round(synWeeks)),
      savingsCost: Math.round(tradCost - synCost),
      savingsWeeks: Math.round(tradWeeks - synWeeks),
    });
  }, [projectType, complexity, urgency]);

  const animatedTradCost = useAnimatedNumber(currency === "PKR" ? calcResults.traditionalCost * EXCHANGE_RATE : calcResults.traditionalCost);
  const animatedSynCost = useAnimatedNumber(currency === "PKR" ? calcResults.syntiloCost * EXCHANGE_RATE : calcResults.syntiloCost);
  const animatedSavings = useAnimatedNumber(currency === "PKR" ? calcResults.savingsCost * EXCHANGE_RATE : calcResults.savingsCost);
  const animatedTradWeeks = useAnimatedNumber(calcResults.traditionalWeeks);
  const animatedSynWeeks = useAnimatedNumber(calcResults.syntiloWeeks);
  const animatedSavingsWeeks = useAnimatedNumber(calcResults.savingsWeeks);

  const handleCTABooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="calculator" className={styles.section}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">ROI Calculator</span>
          <h2 className={styles.title}>Estimate Cost & Timeline Savings</h2>
          <p className={styles.subtitle}>
            Enter your project details below to see the timeline contraction and financial savings achieved by choosing Syntilo Tech over traditional software outsourcing.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Inputs Panel */}
          <div className={styles.calcInputs}>
            <h3 className={styles.panelTitle}>Project Parameters</h3>

            <Select
              label="Select Project Class"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              options={[
                { label: "Custom SaaS / Web Application", value: "saas" },
                { label: "Internal Operations Portal & ERP", value: "portal" },
                { label: "End-to-End Workflow Automation", value: "automation" }
              ]}
              className={styles.inputGroup}
            />

            <div className={styles.inputGroup}>
              <div className={styles.sliderLabelRow}>
                <label className={styles.label}>Complexity & Scope</label>
                <span className={styles.sliderValue}>
                  {complexity === 1 && "Simple MVP / Single Flow"}
                  {complexity === 2 && "Standard Commercial Scope"}
                  {complexity === 3 && "Rich Multi-role Integration"}
                  {complexity === 4 && "Enterprise Scale Database"}
                  {complexity === 5 && "Full Corporate Suite ERP"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={complexity}
                onChange={(e) => setComplexity(parseInt(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.sliderTicks}>
                <span>MVP</span>
                <span>Standard</span>
                <span>Rich</span>
                <span>Scale</span>
                <span>Enterprise</span>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Requested Development Priority</label>
              <div className={styles.radioGroup}>
                <button
                  type="button"
                  onClick={() => setUrgency("standard")}
                  className={`${styles.radioBtn} ${urgency === "standard" ? styles.activeRadio : ""}`}
                >
                  <h4>Standard Delivery</h4>
                  <p>Standard priority pipeline allocation.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency("express")}
                  className={`${styles.radioBtn} ${urgency === "express" ? styles.activeRadio : ""}`}
                >
                  <h4>Express Execution</h4>
                  <p>Accelerated priority; incurs traditional crunch fees.</p>
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className={styles.calcResults}>
            <div className={styles.panelTitleRow}>
              <h3 className={styles.panelTitle}>Syntilo Projections</h3>
              <div className={styles.currencyToggle}>
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`${styles.currencyBtn} ${currency === "USD" ? styles.activeCurrency : ""}`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("PKR")}
                  className={`${styles.currencyBtn} ${currency === "PKR" ? styles.activeCurrency : ""}`}
                >
                  PKR (Rs)
                </button>
              </div>
            </div>

            {/* Savings Banner */}
            <div className={styles.savingsHero}>
              <div className={styles.savingsBox}>
                <span className={styles.savingsTitle}>FINANCIAL SAVINGS</span>
                <span className={styles.savingsValue}>{symbol}{animatedSavings.toLocaleString()}</span>
              </div>
              <div className={styles.savingsBox}>
                <span className={styles.savingsTitle}>TIMELINE SAVED</span>
                <span className={styles.savingsValue}>{animatedSavingsWeeks} Weeks</span>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className={styles.comparisonGrid}>
              <div className={styles.statCard}>
                <h4>Traditional Outsourcing</h4>
                <div className={styles.statRow}>
                  <span className={styles.currencyCode}>{currency}</span>
                  <span>{symbol}{animatedTradCost.toLocaleString()}</span>
                </div>
                <div className={styles.statRow}>
                  <Clock size={16} />
                  <span>{animatedTradWeeks} Weeks ({Math.ceil(animatedTradWeeks / 4.3)} Mos)</span>
                </div>
              </div>

              <div className={`${styles.statCard} ${styles.statCardSyntilo}`}>
                <h4>Syntilo Tech Pipeline</h4>
                <div className={styles.statRow}>
                  <span className={`${styles.currencyCode} gradient-accent-text`}>{currency}</span>
                  <span className="gradient-accent-text">{symbol}{animatedSynCost.toLocaleString()}</span>
                </div>
                <div className={styles.statRow}>
                  <Clock size={16} className="gradient-accent-text" />
                  <span className="gradient-accent-text">{animatedSynWeeks} Weeks</span>
                </div>
              </div>
            </div>

            {/* SVG Visual comparison chart */}
            <div className={styles.chartArea}>
              <div className={styles.chartLabelRow}>
                <span>Traditional: {symbol}{animatedTradCost.toLocaleString()}</span>
                <span>Syntilo: {symbol}{animatedSynCost.toLocaleString()}</span>
              </div>
              <div className={styles.barGraphContainer}>
                {/* Traditional Bar */}
                <div className={styles.barWrapper}>
                  <div
                    className={styles.barTrad}
                    style={{ width: `${Math.round((calcResults.traditionalCost / (calcResults.traditionalCost + calcResults.syntiloCost)) * 100)}%` }}
                  ></div>
                </div>
                {/* Syntilo Bar */}
                <div className={styles.barWrapper}>
                  <div
                    className={styles.barSyn}
                    style={{ width: `${Math.round((calcResults.syntiloCost / (calcResults.traditionalCost + calcResults.syntiloCost)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <button onClick={handleCTABooking} className={styles.ctaBtn}>
              <span>Lock In Your Pricing Quote</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
