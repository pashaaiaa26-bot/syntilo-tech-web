"use client";

import React, { useState } from "react";
import { submitLead } from "@/app/actions/submitLead";
import styles from "./Contact.module.css";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [bottleneck, setBottleneck] = useState("Data Entry & Spreadsheets");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await submitLead({ name, company, bottleneck });
      if (result.success) {
        alert(`Thank you, ${name}! Your request regarding "${bottleneck}" has been received. We will email you shortly at hello@syntilotech.com to confirm your 15-minute slot.`);
        setName("");
        setCompany("");
        setBottleneck("Data Entry & Spreadsheets");
      } else {
        alert(`Submission failed: ${result.error || "Please try again."}`);
      }
    } catch (error: any) {
      console.error("Failed to submit form:", error);
      alert("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <div className={styles.splitGrid}>
          {/* Left Panel: Contact Details & Info */}
          <div className={styles.infoCol}>
            <span className={styles.infoSub}>GET IN TOUCH</span>
            <h2 className={styles.infoTitle}>Book a Discovery Call</h2>
            <p className={styles.infoDesc}>
              Let's audit your current workflow. In this 15-minute introductory call, we will map out 
              your operational bottlenecks and design a tailored AI-agent architecture to automate them.
            </p>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📍</span>
                <div>
                  <span className={styles.detailLabel}>Location</span>
                  <span className={styles.detailVal}>Islamabad, Pakistan</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>✉️</span>
                <div>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailVal}>hello@syntilotech.com</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>📞</span>
                <div>
                  <span className={styles.detailLabel}>Phone</span>
                  <span className={styles.detailVal}>+92 (51) 123-4567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Intake Form Card */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3 className={styles.formHeader}>Tell Us About Your Project</h3>
              <form onSubmit={handleSubmit} className={styles.intakeForm}>
                {/* Field 1: Name */}
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Sheraz Pasha"
                    className={styles.textInput}
                    required
                  />
                </div>

                {/* Field 2: Company */}
                <div className={styles.inputGroup}>
                  <label htmlFor="company" className={styles.inputLabel}>Company</label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="E.g. Syntilo Tech"
                    className={styles.textInput}
                    required
                  />
                </div>

                {/* Field 3: Dropdown Bottleneck */}
                <div className={styles.inputGroup}>
                  <label htmlFor="bottleneck" className={styles.inputLabel}>Primary Bottleneck</label>
                  <select
                    id="bottleneck"
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="Data Entry & Spreadsheets">Data Entry & Spreadsheets</option>
                    <option value="Customer Support Volume">Customer Support Volume</option>
                    <option value="Slow Software/Reporting">Slow Software/Reporting</option>
                    <option value="Need Custom Ecosystem">Need Custom Ecosystem</option>
                  </select>
                </div>

                {/* Primary Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`${styles.submitBtn} ${loading ? styles.btnLoading : ""}`}
                >
                  {loading ? "Scheduling..." : "Schedule Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
