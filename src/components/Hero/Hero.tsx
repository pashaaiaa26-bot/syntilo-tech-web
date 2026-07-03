"use client";

import React, { useRef, useEffect } from "react";
import styles from "./Hero.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on container bounding client rect
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Populate particles
    const particles: Particle[] = [];
    const particleCount = 75;
    const colors = ["#0d9488", "#4f46e5"]; // Teal and Indigo

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // 2. Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Blend opacity based on distance
            ctx.strokeStyle = `rgba(13, 148, 136, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Connect particles to the mouse pointer
      if (mouseRef.current.active) {
        particles.forEach((p) => {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            // Draw connection line matching pointer proximity
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.2 * (1 - dist / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse event handlers bound to container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.heroSection}>
      <canvas ref={canvasRef} className={styles.canvasBackground} />
      
      {/* Visual background gradient for light-themed premium look */}
      <div className={styles.gradientOverlay} />

      <div className={styles.contentWrapper}>
        {/* Next-Gen AI Pulse Badge */}
        <div className={styles.pulseBadge}>
          <span className={styles.pulseDot} />
          <span className={styles.badgeText}>NEXT-GEN AI ECOSYSTEMS</span>
        </div>

        {/* Hero Headlines */}
        <h1 className={styles.heroTitle}>
          Automating Enterprise Operations <br />
          <span className={styles.gradientTitleText}>With AI Ecosytems</span>
        </h1>

        <p className={styles.heroDescription}>
          Syntilo Tech engineers highly autonomous agentic workflows, custom management systems, and 
          interactive telemetry dashboards. We replace sluggish legacy processes with scalable software ecosystems 
          built at 10x velocity.
        </p>

        {/* Call to Actions */}
        <div className={styles.buttonGroup}>
          <button className={styles.primaryBtn}>
            Book Discovery Call
          </button>
          <button className={styles.secondaryBtn}>
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
};
