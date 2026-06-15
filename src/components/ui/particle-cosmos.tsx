"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  size: number;
  opacity: number;
  color: string;
  shape: "circle" | "triangle" | "diamond";
  phase: number;
}

const COLORS = [
  "rgba(223, 225, 4, 0.55)",    // Acid Yellow
  "rgba(255, 255, 255, 0.4)",    // White
  "rgba(255, 184, 41, 0.35)",    // Amber
  "rgba(21, 132, 110, 0.25)",    // Lichen green
  "rgba(223, 225, 4, 0.25)",    // Dim yellow
  "rgba(255, 255, 255, 0.18)",   // Dim white
];

type ClusterCenter = { cx: number; cy: number; radius: number; weight: number };

function createClusters(w: number, h: number): ClusterCenter[] {
  // Create brain-like organic shape with multiple cluster centers
  const cx = w * 0.55;  // center-right positioned
  const cy = h * 0.40;
  const baseR = Math.min(w, h) * 0.22;

  return [
    // Main left hemisphere
    { cx: cx - baseR * 0.5, cy: cy - baseR * 0.15, radius: baseR * 0.7, weight: 1.0 },
    // Main right hemisphere  
    { cx: cx + baseR * 0.5, cy: cy - baseR * 0.15, radius: baseR * 0.65, weight: 0.9 },
    // Bridge / corpus callosum
    { cx: cx, cy: cy - baseR * 0.3, radius: baseR * 0.35, weight: 0.5 },
    // Brain stem / lower cluster
    { cx: cx, cy: cy + baseR * 0.7, radius: baseR * 0.4, weight: 0.6 },
    // Upper left extension
    { cx: cx - baseR * 0.8, cy: cy - baseR * 0.5, radius: baseR * 0.35, weight: 0.4 },
    // Upper right extension
    { cx: cx + baseR * 0.8, cy: cy - baseR * 0.5, radius: baseR * 0.3, weight: 0.35 },
    // Lower left
    { cx: cx - baseR * 0.4, cy: cy + baseR * 0.4, radius: baseR * 0.4, weight: 0.5 },
    // Lower right
    { cx: cx + baseR * 0.4, cy: cy + baseR * 0.4, radius: baseR * 0.35, weight: 0.4 },
    // Scattered periphery particles
    { cx: cx - baseR * 1.2, cy: cy + baseR * 0.1, radius: baseR * 0.5, weight: 0.25 },
    { cx: cx + baseR * 1.2, cy: cy + baseR * 0.1, radius: baseR * 0.45, weight: 0.2 },
    // Top accent
    { cx: cx, cy: cy - baseR * 0.8, radius: baseR * 0.3, weight: 0.3 },
    // Side accents
    { cx: cx - baseR * 1.5, cy: cy - baseR * 0.1, radius: baseR * 0.3, weight: 0.15 },
    { cx: cx + baseR * 1.5, cy: cy - baseR * 0.1, radius: baseR * 0.25, weight: 0.12 },
  ];
}

function createParticle(clusters: ClusterCenter[], w: number, h: number): Particle {
  // Pick a random cluster weighted by its weight
  const totalWeight = clusters.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * totalWeight;
  let cluster = clusters[0];
  for (const c of clusters) {
    r -= c.weight;
    if (r <= 0) { cluster = c; break; }
  }

  // Gaussian-like distribution within cluster radius
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.pow(Math.random(), 0.6) * cluster.radius;
  const x = cluster.cx + Math.cos(angle) * dist;
  const y = cluster.cy + Math.sin(angle) * dist;

  return {
    x,
    y,
    homeX: x,
    homeY: y,
    size: Math.random() * 3 + 0.8,
    opacity: Math.random() * 0.45 + 0.12,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: (["circle", "circle", "circle", "triangle", "diamond"] as const)[Math.floor(Math.random() * 5)],
    phase: Math.random() * Math.PI * 2,
  };
}

function drawShape(ctx: CanvasRenderingContext2D, p: Particle, time: number) {
  const { x, y, size } = p;
  const pulse = 1 + Math.sin(time * 0.002 + p.phase) * 0.15;
  const s = size * pulse;

  ctx.save();
  ctx.translate(x, y);

  switch (p.shape) {
    case "triangle": {
      const sz = s * 1.3;
      ctx.beginPath();
      ctx.moveTo(0, -sz);
      ctx.lineTo(sz * 0.866, sz * 0.5);
      ctx.lineTo(-sz * 0.866, sz * 0.5);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "diamond": {
      const sz = s * 1.1;
      ctx.beginPath();
      ctx.moveTo(0, -sz);
      ctx.lineTo(sz * 0.6, 0);
      ctx.lineTo(0, sz);
      ctx.lineTo(-sz * 0.6, 0);
      ctx.closePath();
      ctx.fill();
      break;
    }
    default: {
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
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
  const timeRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);
    timeRef.current += 1;

    const t = timeRef.current;
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Gentle orbital drift around home position
      const driftX = Math.sin(t * 0.0008 + p.phase) * 1.5;
      const driftY = Math.cos(t * 0.0006 + p.phase * 1.3) * 1.5;
      p.x = p.homeX + driftX;
      p.y = p.homeY + driftY;

      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      drawShape(ctx, p, t);

      // Sparse connections between very close particles
      if (i % 5 === 0) {  // Only check every 5th particle for perf
        for (let j = i + 1; j < Math.min(i + 30, particles.length); j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            const lineAlpha = (1 - dist / 60) * 0.04 * p.opacity;
            ctx.globalAlpha = lineAlpha;
            ctx.strokeStyle = "rgba(223, 225, 4, 0.5)";
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
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
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Recreate clusters and particles on resize
      const clusters = createClusters(w, h);
      const count = prefersReduced ? 200 : Math.min(800, Math.floor((w * h) / 800));
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(clusters, w, h)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const p of particlesRef.current) {
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          drawShape(ctx, p, 0);
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
