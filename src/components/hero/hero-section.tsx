"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

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
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden"
    >
      {/* Bottom fade to void */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, transparent 40%)",
        }}
      />

      {/* Content — left-aligned, particle constellation on right */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-6 pb-16 pt-28 text-left sm:px-10 md:pt-36 lg:flex-row lg:items-center lg:gap-20">
        {/* Left text column */}
        <div className="flex-1 lg:max-w-xl">
          {/* Main heading — clamp-based fluid scaling */}
          <h1 className="kinetic-display text-[clamp(3rem,10vw,8rem)] leading-[0.82]">
            <span className="kinetic-accent">HERNANDO</span>
            <span className="text-[--muted-foreground]">.IA</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base uppercase tracking-[0.25em] text-[--muted-foreground] sm:text-lg md:text-xl">
            AI ENGINEER &amp; ENTREPRENEUR
          </p>

          {/* Tagline */}
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[--muted-foreground] sm:text-base">
            Construindo o futuro com inteligência artificial — conhecimento
            específico, alavancagem e execução que expandem o que é possível.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
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
              className="inline-flex items-center gap-2 border border-[--border] text-[--foreground] font-bold uppercase tracking-tighter px-8 py-4 text-sm transition-all hover:bg-[--foreground] hover:text-[--background] active:scale-95 sm:text-base"
            >
              BLOG
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid w-full max-w-md grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "SEGUIDORES", value: followers },
              { label: "PROJETOS", value: projects },
              { label: "ANOS XP", value: yearsXP },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start justify-center border border-[--border] px-4 py-4"
              >
                <span className="text-2xl font-bold tabular-nums sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[--muted-foreground] sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — transparent space for particle constellation */}
        <div className="hidden lg:block flex-1" aria-hidden="true" />
      </div>
    </motion.section>
  );
}
