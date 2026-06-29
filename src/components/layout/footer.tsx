import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-[--border]">
      {/* Accent flip section */}
      <div className="bg-[--accent] text-[--accent-foreground] py-20 px-6">
        <div className="max-w-[90vw] mx-auto">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mb-8">
            VAMOS{" "}
            <span className="text-[--background]">CONSTRUIR</span>{" "}
            JUNTOS?
          </h2>
          <p className="text-lg max-w-xl mb-8 opacity-80">
            Acompanhe meus projetos, leia o blog e receba atualizacoes sobre IA e
            empreendedorismo direto no seu email.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://instagram.com/hernando.ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[--accent-foreground] text-[--accent] font-bold uppercase tracking-tighter px-8 py-4 text-sm transition-all hover:scale-105 active:scale-95"
            >
              SEGUIR NO INSTAGRAM
            </a>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-[--accent-foreground] text-[--accent-foreground] font-bold uppercase tracking-tighter px-8 py-4 text-sm transition-all hover:bg-[--accent-foreground] hover:text-[--accent] active:scale-95"
            >
              LER O BLOG
            </a>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-[90vw] mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-bold uppercase tracking-tighter mb-4">
            <span className="text-[--accent]">HERNANDO</span>
            <span className="text-[--muted-foreground]">.IA</span>
          </h3>
          <p className="text-[--muted-foreground] text-sm leading-relaxed">
            AI Engineer &amp; Entrepreneur. Conhecimento especifico, alavancagem
            e responsabilidade — construindo o futuro com inteligencia artificial.
          </p>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-tighter mb-4 text-xs text-[--muted-foreground]">
            LINKS
          </h4>
          <div className="flex flex-col gap-2">
            <Link
              href="/blog"
              className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors uppercase tracking-tighter"
            >
              Blog
            </Link>
            <Link
              href="/patrocinio"
              className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors uppercase tracking-tighter"
            >
              Patrocínio
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors uppercase tracking-tighter"
            >
              Privacidade
            </Link>
            <a
              href="https://github.com/hcb2019"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors uppercase tracking-tighter"
            >
              GitHub
            </a>
            <a
              href="https://instagram.com/hernando.ia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors uppercase tracking-tighter"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/hernandoia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors uppercase tracking-tighter"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-tighter mb-4 text-xs text-[--muted-foreground]">
            CONTATO
          </h4>
          <a
            href="mailto:contato@hernandoia.com"
            className="text-sm text-[--muted-foreground] hover:text-[--foreground] transition-colors uppercase tracking-tighter"
          >
            contato@hernandoia.com
          </a>
          <p className="text-xs text-[--muted-foreground] mt-3">
            Aberto a colaboracoes, consultoria e projetos de IA.
          </p>
        </div>
      </div>

      <div className="max-w-[90vw] mx-auto pb-10 px-6 border-t border-[--border] pt-8 text-center text-xs text-[--muted-foreground] uppercase tracking-tighter">
        &copy; {new Date().getFullYear()} Hernando.ia — Todos os direitos reservados.
      </div>
    </footer>
  );
}
