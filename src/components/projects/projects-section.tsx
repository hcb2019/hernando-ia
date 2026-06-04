"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

// ── Props ───────────────────────────────────────────────────────────────

interface ProjectsSectionProps {
  instagramFollowers?: number;
  instagramPosts?: number;
  instagramReach?: number;
}

// ── Projects data ───────────────────────────────────────────────────────

const projects = [
  {
    name: "UFOKKO",
    url: "https://ufokko.com.br",
    icon: "/images/projects/ufokko.png",
    iconWidth: 40,
    iconHeight: 40,
    description:
      "Marketplace que conecta clientes a videomakers profissionais. Sistema completo com pagamento escrow, chat real-time, avaliacoes e geolocalizacao.",
    tags: ["FastAPI", "React", "MongoDB", "Marketplace"],
    status: "PRODUCAO",
  },
  {
    name: "ARENABITE",
    url: "https://arenabite.lovable.app",
    icon: "/images/projects/arenabite.png",
    iconWidth: 36,
    iconHeight: 36,
    description:
      "Nutricao tatica com IA para atletas de Beach Tennis e Volei de Praia. Scanner de IA analisa refeicoes por foto e monta timeline nutricional preditiva.",
    tags: ["React", "TypeScript", "IA", "SaaS"],
    status: "EM DEV",
  },
  {
    name: "POPULARIZEI",
    url: "https://popularizei.vercel.app",
    icon: "/images/projects/popularizei.png",
    iconWidth: 120,
    iconHeight: 28,
    description:
      "Plataforma IA para crescer no Instagram. Analise de perfil, scripts palavra por palavra com gatilhos mentais, jornada Fear-to-Fame.",
    tags: ["Next.js", "TypeScript", "IA", "Growth"],
    status: "EM DEV",
  },
  {
    name: "NUTRI TALITA",
    url: "https://nutri-talita.vercel.app",
    icon: null,
    emoji: "🥗",
    description:
      "Site profissional de nutricao com Sanity CMS. Conteudo gerenciado, design responsivo e otimizado para SEO.",
    tags: ["Next.js", "Sanity", "CMS", "TypeScript"],
    status: "ATIVO",
  },
  {
    name: "VIDEOMAKERS APP",
    url: "https://github.com/hcb2019/videomakers-app-antigo",
    icon: null,
    emoji: "📱",
    description:
      "App mobile React Native para marketplace de videomakers. Versao legada — Expo + Firebase + React Navigation.",
    tags: ["React Native", "Expo", "Firebase", "Legado"],
    status: "ARQUIVADO",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0) + "K";
  }
  return String(n);
}

function formatReach(n: number): string {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1) + "M";
  }
  if (n >= 1000) {
    return Math.round(n / 1000) + "K";
  }
  return String(n);
}

// ── Component ───────────────────────────────────────────────────────────

export default function ProjectsSection({
  instagramFollowers = 1145,
  instagramPosts = 109,
  instagramReach = 292000,
}: ProjectsSectionProps) {
  return (
    <section id="projetos" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium">
              PROJETOS
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mt-4 mb-6">
              O QUE ESTOU{" "}
              <span className="text-[--accent]">CONSTRUINDO</span>
            </h2>
            <p className="text-lg text-[--muted-foreground] max-w-2xl">
              Produtos e ferramentas que aplicam IA para resolver problemas reais —
              do mercado de video a nutricao, do growth ao open source.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[--border]">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 100}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[--background] p-8 flex flex-col gap-5 group card-invert transition-colors duration-300 block h-full"
              >
                {/* Status badge */}
                <div className="flex justify-end">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 border ${
                      project.status === "PRODUCAO"
                        ? "border-[--accent] text-[--accent]"
                        : project.status === "ARQUIVADO"
                        ? "border-[--border] text-[--muted-foreground]/40"
                        : "border-[--border] text-[--muted-foreground]"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {project.icon ? (
                    <Image
                      src={project.icon}
                      alt={project.name}
                      width={project.iconWidth}
                      height={project.iconHeight}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="text-3xl">{project.emoji}</span>
                  )}
                  <h3 className="text-xl font-bold uppercase tracking-tighter card-invert-text group-hover:text-[--accent-foreground]">
                    {project.name}
                  </h3>
                </div>

                <p className="text-sm text-[--muted-foreground] leading-relaxed flex-grow card-invert-muted">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 border border-[--border] text-[--muted-foreground]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-[--muted-foreground] opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.status === "ARQUIVADO" ? "VER CODIGO →" : "VISITAR PROJETO →"}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Instagram social proof */}
        <ScrollReveal delay={300}>
          <div className="mt-16 border-2 border-[--border] p-10 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <span className="text-5xl md:text-7xl font-bold tabular-nums leading-[0.8]">
                  {formatNumber(instagramFollowers)}
                </span>
                <p className="text-xs uppercase tracking-[0.12em] text-[--muted-foreground] mt-2">
                  Seguidores
                </p>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-7xl font-bold tabular-nums leading-[0.8]">
                  {instagramPosts}
                </span>
                <p className="text-xs uppercase tracking-[0.12em] text-[--muted-foreground] mt-2">
                  Posts
                </p>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-7xl font-bold tabular-nums leading-[0.8] text-[--accent]">
                  {formatReach(instagramReach)}
                </span>
                <p className="text-xs uppercase tracking-[0.12em] text-[--muted-foreground] mt-2">
                  Alcance/30d
                </p>
              </div>
            </div>
            <a
              href="https://instagram.com/hernando.ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 border-2 border-[--border] text-[--foreground] text-sm font-bold uppercase tracking-tighter hover:bg-[--foreground] hover:text-[--background] transition-all"
            >
              SEGUIR @HERNANDO.IA
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
