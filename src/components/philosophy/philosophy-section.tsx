"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Pillar {
  title: string;
  description: string;
  quote: string;
  author: string;
}

const pillars: Pillar[] = [
  {
    title: "CONHECIMENTO ESPECIFICO",
    description:
      "Saber o que ninguem mais sabe. A combinacao unica de habilidades, experiencias e curiosidade que te torna impossivel de substituir. IA + engenharia de software + mercado brasileiro.",
    quote: "Specific knowledge is found by pursuing your genuine curiosity and passion.",
    author: "Naval Ravikant",
  },
  {
    title: "ALAVANCAGEM",
    description:
      "Codigo, midia e capital — ferramentas que multiplicam teu impacto sem multiplicar teu esforco. Agentes de IA, automacoes e produtos digitais sao minha alavanca.",
    quote: "Forget 10x engineers. The biggest breakthroughs come from 1000x leverage.",
    author: "Naval Ravikant",
  },
  {
    title: "RESPONSABILIDADE",
    description:
      "Colocar teu nome no que constroi. Assumir riscos com accountability real. Cada projeto que entrego carrega minha reputacao — e isso e o ativo mais valioso.",
    quote: "Embrace accountability and take business risks under your own name.",
    author: "Naval Ravikant",
  },
];

function PillarCard({
  pillar,
  index,
}: {
  pillar: Pillar;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border-2 border-[--border] p-8 sm:p-10 flex flex-col gap-5 group card-invert transition-colors duration-300">
        {/* Decorative number */}
        <span
          className="kinetic-number text-[5rem] md:text-[7rem] leading-[0.7] select-none"
          aria-hidden="true"
        >
          0{index + 1}
        </span>

        <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter card-invert-text">
          {pillar.title}
        </h3>

        <p className="text-base text-[--muted-foreground] leading-relaxed card-invert-muted max-w-2xl">
          {pillar.description}
        </p>

        <blockquote className="border-l-4 border-[--accent] pl-4 text-sm text-[--muted-foreground]/70 leading-relaxed italic card-invert-muted">
          &ldquo;{pillar.quote}&rdquo;
          <footer className="mt-2 not-italic font-medium text-[--muted-foreground]/50 uppercase tracking-tighter text-xs">
            {pillar.author}
          </footer>
        </blockquote>
      </div>
    </motion.div>
  );
}

export default function PhilosophySection() {
  return (
    <section id="filosofia" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium">
            FILOSOFIA
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mt-4 mb-6">
            OS{" "}
            <span className="text-[--accent]">TRES PILARES</span>{" "}
            QUE GUIAM TUDO
          </h2>
          <p className="text-lg text-[--muted-foreground] max-w-2xl">
            Inspirado por Naval Ravikant, aplico esses principios a cada projeto,
            investimento e decisao de carreira.
          </p>
        </div>

        {/* Vertical stack with scroll reveal */}
        <div className="flex flex-col gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
