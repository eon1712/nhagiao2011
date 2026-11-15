"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const ChalkWaterCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMobile = window.innerWidth < 768;
    let dpr = isMobile
      ? Math.min(window.devicePixelRatio || 1, 1.5)
      : Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let animId: number | null = null;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let lastFrameTime = 0;
    const targetInterval = isMobile ? 33 : 16;

    const particleCount = isMobile ? 15 : 55;
    const particles: Particle[] = [];
    const ripples: Ripple[] = [];

    const resize = () => {
      if (!canvas) return;
      isMobile = window.innerWidth < 768;
      dpr = isMobile
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2);

      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const baseAlpha = 0.15 + Math.random() * 0.35;
        particles.push({
          x: Math.random() * (width || window.innerWidth),
          y: Math.random() * (height || window.innerHeight),
          radius: 1 + Math.random() * (isMobile ? 1.5 : 2.5),
          vx: (Math.random() - 0.5) * 0.3,
          vy: 0.15 + Math.random() * 0.45,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    resize();
    initParticles();

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      if (ripples.length > 8) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        const now = performance.now();
        if (now - lastRippleTime > 120) {
          lastRippleTime = now;
          ripples.push({
            x,
            y,
            radius: 4,
            maxRadius: 45 + Math.random() * 25,
            alpha: 0.35,
          });
        }
      }
    };

    let lastRippleTime = 0;
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const render = (time: number) => {
      if (!isVisible || !isTabActive) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(render);

      if (time - lastFrameTime < targetInterval) {
        return;
      }
      lastFrameTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.8;
        r.alpha -= 0.007;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 90, 50, ${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time * 0.001 + i) * 0.15;
        p.y += p.vy;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 243, 235, ${p.alpha})`;
        ctx.fill();
      }
    };

    const startLoop = () => {
      if (!animId && isVisible && isTabActive) {
        animId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    startLoop();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0"
    />
  );
};
