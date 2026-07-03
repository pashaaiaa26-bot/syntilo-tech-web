"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, Cpu, AlertTriangle, ShieldCheck, Zap, Repeat } from "lucide-react";
import styles from "./BeforeAfter.module.css";

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  return (
    <section id="before-after" className={styles.section}>
      <div className="container">
        <div className={styles.headerArea}>
          <span className="gradient-accent-text font-bold text-sm tracking-wider uppercase">Legacy vs Syntilo Tech</span>
          <h2 className={styles.title}>The Paradigm Shift in Velocity</h2>
          <p className={styles.subtitle}>
            Traditional software engineering is broken—bloated budgets, sluggish timelines, and heavy tech debt. Syntilo Tech rewrites the rulebook using AI-driven compilation pipelines to deliver clean, production-grade systems in weeks.
          </p>
        </div>

        {/* Interactive Image Slider */}
        <div className={styles.sliderContainerOuter}>
          <div
            ref={containerRef}
            className={styles.sliderContainer}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* BEFORE LAYER (Sluggish / Legacy) */}
            <div className={styles.beforeLayer}>
              <div className={styles.layerContent}>
                <div className={styles.badgeLegacy}>BEFORE: LEGACY DEVELOPMENT</div>
                <h3 className={styles.layerTitle}>The Sluggish Status Quo</h3>
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <Clock className={styles.iconRed} />
                    <span>3 - 6 Months</span>
                    <p>Timeline</p>
                  </div>
                  <div className={styles.metricCard}>
                    <DollarSign className={styles.iconRed} />
                    <span>$80,000+</span>
                    <p>Bloated Budget</p>
                  </div>
                  <div className={styles.metricCard}>
                    <AlertTriangle className={styles.iconRed} />
                    <span>High Tech Debt</span>
                    <p>Architecture</p>
                  </div>
                </div>
                <div className={styles.codeSnippetLegacy}>
                  <p className={styles.snippetTitle}>legacy_api_spaghetti.js</p>
                  <code>
                    {`function getData(cb) {
  setTimeout(function() {
    db.query("SELECT * FROM users", function(err, rows) {
      if(err) return cb(err);
      // Callback hell commences...
      db.query("SELECT * FROM profiles WHERE user_id="+rows[0].id, function(err, profiles) {
        cb(null, {user: rows[0], profile: profiles[0]});
      });
    });
  }, 1000);
}`}
                  </code>
                </div>
              </div>
            </div>

            {/* AFTER LAYER (Syntilo Tech / Advanced AI) */}
            <div
              className={styles.afterLayer}
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <div className={styles.layerContent}>
                <div className={styles.badgeSyntilo}>AFTER: SYNTILO TECH</div>
                <h3 className={styles.layerTitle}>Next-Gen High Velocity</h3>
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <Zap className={styles.iconPurple} />
                    <span className="gradient-accent-text">2 - 4 Weeks</span>
                    <p>Timeline</p>
                  </div>
                  <div className={styles.metricCard}>
                    <DollarSign className={styles.iconPurple} />
                    <span className="gradient-accent-text">$20,000 - $35,000</span>
                    <p>Cost Engineering</p>
                  </div>
                  <div className={styles.metricCard}>
                    <ShieldCheck className={styles.iconPurple} />
                    <span className="gradient-accent-text">Strict TypeScript</span>
                    <p>Scalable Uptime</p>
                  </div>
                </div>
                <div className={styles.codeSnippetSyntilo}>
                  <p className={styles.snippetTitle}>syntilo_engine.ts</p>
                  <code>
                    {`export async function getUserProfile(userId: string): Promise<UserProfile> {
  const cacheKey = \`user:\${userId}:profile\`;
  return await cache.wrap(cacheKey, async () => {
    const [user, profile] = await Promise.all([
      db.user.findUniqueOrThrow({ where: { id: userId } }),
      db.profile.findUnique({ where: { userId } })
    ]);
    return { user, profile };
  });
}`}
                  </code>
                </div>
              </div>
            </div>

            {/* SLIDER HANDLE */}
            <div
              className={styles.sliderHandle}
              style={{ left: `${sliderPosition}%` }}
            >
              <div className={styles.handleButton}>
                <Repeat size={18} className={styles.handleIcon} />
              </div>
            </div>
          </div>
          <div className={styles.sliderHelper}>
            <span>← Drag to Reveal Difference →</span>
          </div>
        </div>

        {/* Detailed Comparison Cards */}
        <div className={styles.cardsGrid}>
          <div className={styles.comparisonCard}>
            <div className={styles.compHeader}>
              <div className={styles.compIconContainerRed}>
                <AlertTriangle size={24} className={styles.iconRed} />
              </div>
              <h3>Legacy Outsourcing Houses</h3>
            </div>
            <ul className={styles.compList}>
              <li>
                <strong>Bloated Timelines:</strong> Months spent in discovery, scoping, and manual coding loops.
              </li>
              <li>
                <strong>Technical Fragility:</strong> Lack of strict typing and automated testing results in immediate bugs post-launch.
              </li>
              <li>
                <strong>Misaligned Communication:</strong> Freelancers or agency buffers delay resolutions by days.
              </li>
              <li>
                <strong>Runaway Budgets:</strong> Added scope creep and change requests inflate costs past estimates.
              </li>
            </ul>
          </div>

          <div className={`${styles.comparisonCard} ${styles.comparisonCardSyntilo}`}>
            <div className={styles.compHeader}>
              <div className={styles.compIconContainerPurple}>
                <Zap size={24} className={styles.iconPurple} />
              </div>
              <h3>Syntilo Tech Automation Pipeline</h3>
            </div>
            <ul className={styles.compList}>
              <li>
                <strong>Deployments in Weeks:</strong> Pre-validated compiler modules construct core layers at superhuman speeds.
              </li>
              <li>
                <strong>Production TypeScript:</strong> Strict compilers audit security vulnerabilities and type definitions.
              </li>
              <li>
                <strong>Sheraz Pasha Direct Alignment:</strong> Workflows governed by the founder with real-time feedback channels.
              </li>
              <li>
                <strong>Flat Rate Cost Engineering:</strong> Transparent pricing with zero hidden fees or billing inflation.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
