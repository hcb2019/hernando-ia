import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function AboutSection() {
  return (
    <section id="sobre" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="border-2 border-[--border] p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 sm:gap-12 card-invert transition-colors duration-300">
            {/* Profile photo */}
            <div className="flex-shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 overflow-hidden border-2 border-[--border] relative">
                <Image
                  src="/images/profile.jpg"
                  alt="Hernando Candido"
                  width={176}
                  height={176}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium card-invert-muted">
                SOBRE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-4 uppercase tracking-tighter card-invert-text">
                <span className="text-[--accent]">HERNANDO</span> CANDIDO
              </h3>
              <p className="text-[--muted-foreground] leading-relaxed text-sm sm:text-base card-invert-muted">
                Engenheiro de Software Senior e empreendedor focado em
                Inteligencia Artificial aplicada. Construo produtos, automacoes
                e agentes de IA que resolvem problemas reais — do esporte a moda,
                da infraestrutura ao mercado brasileiro.
              </p>
              <p className="text-[--muted-foreground]/70 text-sm mt-3 card-invert-muted">
                Rio de Janeiro, Brasil
              </p>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-5 justify-center sm:justify-start">
                <a
                  href="https://instagram.com/hernando.ia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--muted-foreground] hover:text-[--foreground] transition-colors card-invert-text"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/hcb2019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--muted-foreground] hover:text-[--foreground] transition-colors card-invert-text"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.403c1.02.005 2.045.138 3 .403 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/hernandoia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--muted-foreground] hover:text-[--foreground] transition-colors card-invert-text"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <Link
                  href="/blog"
                  className="text-[--muted-foreground] hover:text-[--foreground] transition-colors card-invert-text"
                  aria-label="Blog"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
