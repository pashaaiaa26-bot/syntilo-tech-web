"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Calendar, ArrowRight, Shield } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import styles from "./BookingForm.module.css";

interface FormErrors {
  name?: string;
  email?: string;
  budget?: string;
  brief?: string;
}

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    brief: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Corporate email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (
      formData.email.endsWith("@gmail.com") ||
      formData.email.endsWith("@yahoo.com") ||
      formData.email.endsWith("@hotmail.com")
    ) {
      newErrors.email = "Please use your corporate work email (e.g. name@company.com).";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select a budget tier.";
    }

    if (!formData.brief.trim()) {
      newErrors.brief = "Please provide a brief description of your project.";
    } else if (formData.brief.trim().length < 20) {
      newErrors.brief = "Please describe the scope in at least 20 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate database submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  return (
    <section id="booking" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Text */}
          <div className={styles.leftCol}>
            <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Project Intake</span>
            <h2 className={styles.title}>Book Your Solutions Discovery Call</h2>
            <p className={styles.subtitle}>
              Our pipelines are optimized for companies looking to accelerate deployment. Submit your details to review timeline fits and lock in a flat-rate estimate.
            </p>

            <div className={styles.benefitsRow}>
              <div className={styles.benefitBox}>
                <Calendar className={styles.icon} />
                <div>
                  <h4>Direct Partner Strategy</h4>
                  <p>Consult directly with our systems engineers to align architectures.</p>
                </div>
              </div>
              <div className={styles.benefitBox}>
                <Shield className={styles.icon} />
                <div>
                  <h4>Zero Obligations NDA</h4>
                  <p>All shared briefs are held under strict confidentiality pipelines.</p>
                </div>
              </div>
            </div>

            <div className={styles.founderCallout}>
              <p>
                &ldquo;Every brief is personally reviewed by me to ensure our AI compiler patterns support your scaling requirements. Let&apos;s build.&rdquo;
              </p>
              <div className={styles.founderMeta}>
                <span>Sheraz Pasha</span>
                <span>Founder, Syntilo Tech</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className={styles.formCard}>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit}
                  className={styles.form}
                  noValidate
                >
                  <h3 className={styles.formTitle}>Intake Form</h3>

                  <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    disabled={isSubmitting}
                  />

                  <Input
                    label="Corporate Email"
                    placeholder="name@company.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    disabled={isSubmitting}
                  />

                  <Select
                    label="Est. Budget Tier"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    error={errors.budget}
                    options={[
                      { label: "Select Budget Tier", value: "" },
                      { label: "$15,000 - $20,000 (Automation / Micro-SaaS)", value: "15-20" },
                      { label: "$20,000 - $35,000 (Standard Dashboard / Portal)", value: "20-35" },
                      { label: "$35,000 - $50,000 (Full Suite Enterprise SaaS)", value: "35-50" },
                      { label: "$50,000+ (Complex Custom Infrastructure)", value: "50plus" }
                    ]}
                    disabled={isSubmitting}
                  />

                  <div className={styles.textareaGroup}>
                    <label className={styles.label} htmlFor="brief">
                      Project Brief
                    </label>
                    <textarea
                      id="brief"
                      placeholder="Please outline the dashboard, calendar syncs, maps, or billing structures required..."
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      disabled={isSubmitting}
                      className={`${styles.textarea} ${errors.brief ? styles.textareaError : ""}`}
                    />
                    {errors.brief && <span className={styles.errorText}>{errors.brief}</span>}
                  </div>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    rightIcon={<Send size={16} />}
                    className={styles.submitBtn}
                  >
                    Submit Discovery Brief
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className={styles.successContainer}
                >
                  <CheckCircle className={styles.successIcon} size={64} />
                  <h3 className={styles.successTitle}>Brief Transmitted Successfully</h3>
                  <p className={styles.successDesc}>
                    Thank you. Your corporate intake brief has bypassed queue delays and entered our developer validation pipeline.
                  </p>
                  
                  <div className={styles.successCallout}>
                    <p>
                      <strong>Next Step:</strong> Founder <strong>Sheraz Pasha</strong> will audit your scope parameters and send a calendar invitation to your corporate inbox (<strong>{formData.email}</strong>) within 24 hours.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setFormData({ name: "", email: "", budget: "", brief: "" });
                      setIsSubmitted(false);
                    }}
                    rightIcon={<ArrowRight size={16} />}
                    className={styles.backBtn}
                  >
                    Submit Another Brief
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
