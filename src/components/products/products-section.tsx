import ScrollReveal from "@/components/ui/scroll-reveal";
import { Bot, BookOpen, Zap, Target, Sparkles, Rocket, Lightbulb } from "lucide-react";

const products = [
  {
    title: "GPTS & GEMS",
    description:
      "Agentes de IA personalizados para automacao, analise de dados e produtividade. Prontos para usar no ChatGPT.",
    Icon: Bot,
    status: "EM BREVE",
  },
  {
    title: "E-BOOKS TECNICOS",
    description:
      "Guias praticos sobre Agentes de IA, arquitetura de software e empreendedorismo tech no mercado brasileiro.",
    Icon: BookOpen,
    status: "EM BREVE",
  },
  {
    title: "PACKS DE PROMPTS",
    description:
      "Colecoes curadas de prompts para desenvolvimento, criacao de conteudo e analise de negocios com IA.",
    Icon: Zap,
    status: "EM BREVE",
  },
  {
    title: "EXPERIMENTOS",
    description:
      "Testes e protótipos para explorar formas práticas de usar IA em projetos e no dia a dia.",
    Icon: Target,
    status: "EM CONSTRUÇÃO",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <span className="text-xs uppercase tracking-[0.15em] text-[--muted-foreground] font-medium">
              PRODUTOS DIGITAIS
            </span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] mt-4 mb-6">
              <span className="text-[--accent]">PRODUTOS</span> EM CONSTRUCAO
            </h2>
            <p className="text-lg text-[--muted-foreground] max-w-2xl">
              Ferramentas, guias e experimentos que estou criando para explorar
              inteligência artificial na prática.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[--border]">
          {products.map((product, i) => (
            <ScrollReveal key={product.title} delay={i * 100}>
              <div className="bg-[--background] p-8 flex flex-col gap-5 group card-invert transition-colors duration-300 h-full">
                <div className="flex justify-end">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 border ${
                      product.status === "DISPONIVEL"
                        ? "border-[--accent] text-[--accent]"
                        : "border-[--border] text-[--muted-foreground]"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <product.Icon className="w-8 h-8 text-[--accent]" strokeWidth={1.5} />

                <h3 className="text-lg font-bold uppercase tracking-tighter card-invert-text">
                  {product.title}
                </h3>

                <p className="text-sm text-[--muted-foreground] leading-relaxed flex-grow card-invert-muted">
                  {product.description}
                </p>

                <div className="text-xs font-bold uppercase tracking-tighter text-[--muted-foreground] opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.status === "DISPONIVEL"
                    ? "FALAR COM HERNANDO"
                    : "ACOMPANHAR PROJETO"}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
