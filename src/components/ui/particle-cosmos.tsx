"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  shape: "circle" | "triangle" | "diamond" | "square";
  rotation: number;
  rotSpeed: number;
}

const COLORS = [
  "rgba(223, 225, 4, 0.35)",    // Acid Yellow (accent)
  "rgba(255, 255, 255, 0.3)",    // Bone / white
  "rgba(255, 184, 41, 0.25)",    // Amber Spark
  "rgba(21, 132, 110, 0.2)",     // Lichen
];

const SHAPES: Particle["shape"][] = ["circle", "circle", "circle", "triangle", "diamond", "square"];

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    size: Math.random() * 2.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.15,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.004,
  };
}

function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  return canvas.getContext("2d");
}

function drawShape(ctx: CanvasRenderingContext2D, p: Particle) {
  const { x, y, size, rotation } = p;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  switch (p.shape) {
    case "triangle": {
      const s = size * 1.4;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "diamond": {
      const s = size * 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.6, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.6, 0);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "square": {
      const s = size * 0.9;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      break;
    }
    case "circle":
    default: {
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.restore();
}

export default function ParticleCosmos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = getContext(canvas);
    if (!ctx) return;

    const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

    ctx.clearRect(0, 0, w, h);

    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const edgeFade = Math.min(1, Math.min(p.x, w - p.x, p.y, h - p.y) / 80);
      const displayOpacity = Math.max(0, Math.min(p.opacity, edgeFade));

      ctx.globalAlpha = displayOpacity;
      ctx.fillStyle = p.color;
      drawShape(ctx, p);

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const lineOpacity = (1 - dist / 120) * 0.06 * displayOpacity;
          ctx.globalAlpha = lineOpacity;
          ctx.strokeStyle = "rgba(223, 225, 4, 0.8)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const c = getContext(canvas);
      if (!c) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      c.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // More particles on mobile too, but scaled
    const isMobile = window.innerWidth < 768;
    const count = prefersReduced
      ? 20
      : Math.min(isMobile ? 80 : 120, Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 6000 : 12000)));
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(window.innerWidth, window.innerHeight)
    );

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      const ctx = getContext(canvas);
      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const p of particlesRef.current) {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          drawShape(ctx, p);
        }
        ctx.globalAlpha = 1;
      }
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
    />
  );
}
