"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1.5;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(124, 58, 237, 0.7)";
        context.fill();
      }
    }

    // Initialize particles
    const particleCount = 65;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(mouseX, mouseY);
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic opacity based on distance
            const alpha = (100 - dist) / 100 * 0.15;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCTABooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleCTADemo = () => {
    const el = document.getElementById("demo");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={styles.heroSection}>
      <div className={`container ${styles.container}`}>
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={styles.heroContent}
        >
          <div className={styles.badge}>
            <span className={styles.badgePulse}></span>
            <span>Now Launching: Advanced AI Workflows v3.4</span>
          </div>

          <h1 className={styles.headline}>
            We Build Custom <span className="gradient-accent-text">Business Software</span> & Automations at <span className={styles.highlight}>10x Speed</span>
          </h1>

          <p className={styles.subheadline}>
            Traditional development houses take months. <strong>Syntilo Tech</strong> leverages advanced AI workflows to engineer high-performance, secure management systems and enterprise dashboards in weeks. Founded by <strong>Sheraz Pasha</strong>.
          </p>

          <div className={styles.ctaGroup}>
            <Button
              onClick={handleCTABooking}
              rightIcon={<ArrowRight size={18} />}
              size="lg"
            >
              Book Discovery Call
            </Button>
            <Button
              onClick={handleCTADemo}
              variant="outline"
              leftIcon={<Play size={16} fill="currentColor" />}
              size="lg"
            >
              Explore Our Portfolio
            </Button>
          </div>

          <div className={styles.trustFooter}>
            <p>ENGINEERED FOR MODERN ENTERPRISES & SCALE-UPS</p>
            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <span className={styles.statNum}>10x</span>
                <span className={styles.statLabel}>Velocity multiplier</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>99.8%</span>
                <span className={styles.statLabel}>Deployment uptime</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>TypeScript</span>
                <span className={styles.statLabel}>Production-grade stack</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Algorithmic Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={styles.heroVisual}
        >
          <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.nodeCanvas} />
            <div className={styles.visualCard}>
              <div className={styles.cardHeader}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
                <span className={styles.cardTitle}>algorithmic_orchestrator.ts</span>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.codeLine}><span className={styles.keyword}>const</span> <span className={styles.variable}>syntiloEngine</span> = <span className={styles.keyword}>new</span> <span className={styles.className}>AIWorkflowCompiler</span>(&#123;</p>
                <p className={styles.codeLineIndent}><span className={styles.property}>velocityMultiplier</span>: <span className={styles.number}>10</span>,</p>
                <p className={styles.codeLineIndent}><span className={styles.property}>strictTypes</span>: <span className={styles.boolean}>true</span>,</p>
                <p className={styles.codeLineIndent}><span className={styles.property}>foundedBy</span>: <span className={styles.string}>&quot;Sheraz Pasha&quot;</span></p>
                <p className={styles.codeLine}>&#125;);</p>
                <p className={styles.codeLine}><span className={styles.keyword}>await</span> <span className={styles.variable}>syntiloEngine</span>.<span className={styles.method}>deployEnterpriseDashboard</span>();</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
