"use client";

import React, { useState, useEffect } from "react";
import styles from "./Calculator.module.css";

type Currency = "USD" | "PKR";

export const Calculator: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [employeeCount, setEmployeeCount] = useState<number>(10);
  const [hoursWasted, setHoursWasted] = useState<number>(15);
  const [hourlyWage, setHourlyWage] = useState<number>(25);

  // Automatically switch default hourly wage on currency toggle
  useEffect(() => {
    if (currency === "USD") {
      setHourlyWage(25);
    } else {
      setHourlyWage(1000);
    }
  }, [currency]);

  // Calculations
  const weeksPerMonth = 4.33;
  const currentManualCost = Math.round(employeeCount * hoursWasted * hourlyWage * weeksPerMonth);
  const syntiloAgentCost = currency === "USD" ? 1500 : 250000;
  const monthlySavings = Math.max(0, currentManualCost - syntiloAgentCost);

  // Formatting helper
  const formatCurrency = (amount: number) => {
    const symbol = currency === "USD" ? "$" : "Rs. ";
    return `${symbol}${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <section id="roi-calculator" className={styles.calculatorSection}>
      <div className={styles.calculatorContainer}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionSub}>SAVINGS ESTIMATOR</span>
          <h2 className={styles.sectionTitle}>Calculate Your ROI</h2>
          <div className={styles.headerLine} />
        </div>

        <div className={styles.calcGrid}>
          {/* Inputs Section */}
          <div className={styles.inputsCard}>
            {/* Currency Switcher */}
            <div className={styles.currencyToggleContainer}>
              <span className={styles.toggleLabel}>Select Currency:</span>
              <div className={styles.togglePill}>
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`${styles.toggleBtn} ${currency === "USD" ? styles.toggleBtnActive : ""}`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("PKR")}
                  className={`${styles.toggleBtn} ${currency === "PKR" ? styles.toggleBtnActive : ""}`}
                >
                  PKR (Rs.)
                </button>
              </div>
            </div>

            {/* Range Slider 1: Employees */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabelRow}>
                <span className={styles.sliderLabel}>Employees doing manual tasks</span>
                <span className={styles.sliderVal}>{employeeCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.sliderLimits}>
                <span>1</span>
                <span>50</span>
              </div>
            </div>

            {/* Range Slider 2: Hours Wasted */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabelRow}>
                <span className={styles.sliderLabel}>Average hours wasted per week per employee</span>
                <span className={styles.sliderVal}>{hoursWasted} hrs</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={hoursWasted}
                onChange={(e) => setHoursWasted(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.sliderLimits}>
                <span>5 hrs</span>
                <span>40 hrs</span>
              </div>
            </div>

            {/* Range Slider 3: Hourly Wage */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabelRow}>
                <span className={styles.sliderLabel}>Average hourly wage</span>
                <span className={styles.sliderVal}>{formatCurrency(hourlyWage)}</span>
              </div>
              <input
                type="range"
                min={currency === "USD" ? 5 : 200}
                max={currency === "USD" ? 100 : 3000}
                step={currency === "USD" ? 1 : 50}
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div className={styles.sliderLimits}>
                <span>{currency === "USD" ? "$5" : "Rs. 200"}</span>
                <span>{currency === "USD" ? "$100" : "Rs. 3,000"}</span>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className={styles.resultsCard}>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Current Monthly Waste</span>
              <span className={styles.resultVal}>{formatCurrency(currentManualCost)}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Syntilo AI Agent Cost</span>
              <span className={styles.resultVal}>{formatCurrency(syntiloAgentCost)}</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.savingsWrapper}>
              <span className={styles.savingsLabel}>Net Monthly Savings</span>
              <span className={styles.savingsValue}>{formatCurrency(monthlySavings)}</span>
              <p className={styles.savingsDesc}>
                {monthlySavings > 0
                  ? "Deploying a Syntilo AI Agent starts saving you money on Day 1 by optimizing labor workloads."
                  : "Increase sliders to estimate potential automation savings based on scale."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
