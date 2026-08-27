"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";

interface HeroSectionProps {
  followers: string;
  projects: string;
  yearsXP: string;
}

export default function HeroSection({ followers, projects, yearsXP }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={reduce ? {} : { scale, opacity }}
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden"
    >
      {/* AI-generated background image */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url(/images/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Particle field — subtle acid yellow sparkles */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <SparklesCore
          background="transparent"
          minSize={0.3}
          maxSize={0.8}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#DFE104"
          speed={0.4}
        />
      </div>

      {/* Bottom fade to background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #09090B 0%, transparent 40%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[95vw] flex-col items-center px-6 pb-16 pt-28 text-center sm:px-8 md:pt-36">
        {/* Main heading — clamp-based fluid scaling */}
        <h1 className="kinetic-display text-[clamp(3rem,12vw,12rem)] leading-[0.8]">
          <span className="kinetic-accent">HERNANDO</span>
          <span className="text-[--muted-foreground]">.IA</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg uppercase tracking-[0.3em] text-[--muted-foreground] sm:text-xl md:text-2xl">
          CRIADOR DO HERNANDO.IA
        </p>

        {/* Tagline */}
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[--muted-foreground] sm:text-lg">
          Projetos, automações e conteúdo sobre inteligência artificial na prática.
        </p>

        {/* CTA Buttons — sharp rectangles, uppercase */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 bg-[--accent] text-[--accent-foreground] font-bold uppercase tracking-tighter px-8 py-4 text-sm transition-all hover:scale-105 active:scale-95 sm:text-base"
          >
            VER PROJETOS
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>

          <a
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-[--border] text-[--foreground] font-bold uppercase tracking-tighter px-8 py-4 text-sm transition-all hover:bg-[--foreground] hover:text-[--background] active:scale-95 sm:text-base"
          >
            BLOG
          </a>
        </div>

        {/* Stats row — dynamic from live-stats.json */}
        <div className="mt-20 grid w-full max-w-lg grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "SEGUIDORES", value: followers },
            { label: "PROJETOS", value: projects },
            { label: "ANOS NA TI", value: yearsXP },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center border-2 border-[--border] px-5 py-5 text-center"
            >
              <span className="text-3xl font-bold tabular-nums sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[--muted-foreground] sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
