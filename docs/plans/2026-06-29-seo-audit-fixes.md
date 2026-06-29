# Plano de Correção SEO — hernandoia.com (78 → ~96)

> **Goal:** Elevar a nota SEO de 78 para 96+ corrigindo todos os pontos identificados na auditoria.

**Arquitetura:** 5 fases independentes. Fase 1 é crítica (schemas no `<head>`). Fases 2-5 são incrementais.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Vercel, Cloudflare

---

## 📊 Meta: Pontos a Recuperar

| Categoria | Perda Atual | Recuperável | Ações |
|---|---|---|---|
| Performance | -6 (67KB HTML, sem medição) | +3 | Otimizar RSC, medir CWV |
| GEO/AI | -5 (RSC, Content-Signal) | +5 | Schema no head, Cloudflare |
| On-Page | -3 (alt text, author) | +3 | Author page, alt text |
| Technical | -3 (sem medição CWV) | +3 | Medir + reportar |
| **Total** | **78** | **~96** | |

---

## Fase 1: Schema no `<head>` (Prioridade P0)

> **Impacto:** +5 pontos GEO/AI. Impede que crawlers percam Article/Breadcrumb/FAQ.

### Problema
Os schemas Article, BreadcrumbList e FAQPage são renderizados dentro do componente `BlogPostPage` como `<script>` tags no body. Next.js serializa isso via RSC (`self.__next_f.push`). Crawlers como Bing, DuckDuckGo e AIs menos sofisticadas podem não encontrá-los.

### Solução
Mover os 3 schemas (Article, BreadcrumbList, FAQPage) para `<head>` via `generateMetadata` + injetar como `other` metadata.

### Task 1: Adicionar suporte a JSON-LD no generateMetadata

**Arquivo:** `src/app/blog/[slug]/page.tsx`

**O que fazer:** Modificar `generateMetadata` para incluir os schemas como `other` metadata (que o Next.js renderiza no `<head>`).

```typescript
// Antes
export async function generateMetadata(...): Promise<Metadata> {
  return generateBlogPostMeta(post, lang);
}

// Depois
export async function generateMetadata(...): Promise<Metadata> {
  const base = generateBlogPostMeta(post, lang);
  const articleLD = JSONLD.article(post, lang);
  const breadcrumbLD = JSONLD.breadcrumbList([...]);
  const faqLD = JSONLD.faqPage(post);
  
  const scripts: Record<string, string> = {
    'schema-article': JSON.stringify(articleLD),
    'schema-breadcrumb': JSON.stringify(breadcrumbLD),
  };
  if (faqLD) {
    scripts['schema-faq'] = JSON.stringify(faqLD);
  }

  return {
    ...base,
    other: {
      ...Object.fromEntries(
        Object.entries(scripts).map(([id, json]) => [
          id,
          <script
            key={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
          />,
        ])
      ),
    },
  };
}
```

**Verificação:** `curl -s https://hernandoia.com/blog/<post> | grep -c '"@type":"Article"'` → deve retornar 1

### Task 2: Remover schemas duplicados do JSX do post

**Arquivo:** `src/app/blog/[slug]/page.tsx` (linhas ~68-80)

Remover as tags `<script type="application/ld+json">` que estão dentro do JSX, já que os schemas agora estarão no `<head>`. Manter APENAS a estrutura da página.

### Task 3: Deploy e verificação

```bash
cd /opt/data/hernando-ia
git add -A && git commit -m "seo: move Article/Breadcrumb/FAQ schemas to <head> via generateMetadata"
git push
```

**Verificação pós-deploy:**
```bash
curl -s https://hernandoia.com/blog/<post> | grep -c '"@type":"Article"'
# Deve retornar 1
curl -s https://hernandoia.com/blog/<post> | grep -c 'application/ld+json'
# Deve retornar 3 ou 4 (Article + Breadcrumb + FAQ + WebSite/Person do layout)
```

---

## Fase 2: Página de Autor (E-E-A-T) — Prioridade P0

> **Impacto:** +2 pontos On-Page. Essencial pro Google E-E-A-T (Expertise, Authoritativeness, Trust).

### Task 1: Criar página `/sobre`

**Novo arquivo:** `src/app/sobre/page.tsx`

```typescript
import type { Metadata } from "next";
import { generatePageMeta, JSONLD } from "@/lib/seo";
import { SITE } from "@/lib/seo";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export const metadata: Metadata = generatePageMeta({
  title: "Sobre Hernando",
  description: "AI Engineer, empreendedor e criador do Hernando.ia. Conheça minha trajetória em IA, startups e construção de produtos digitais.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-24 pb-24">
        <h1 className="text-4xl font-bold mb-8">Sobre Hernando</h1>
        
        <div className="prose-custom text-white/70 space-y-6">
          <p>
            Engenheiro de IA com 10+ anos de experiência em tecnologia.
            Construo produtos digitais, automatizo processos e escrevo sobre
            o que aprendo no caminho.
          </p>
          
          <h2>O que eu faço</h2>
          <ul>
            <li>Crio agentes de IA autônomos para negócios reais</li>
            <li>Desenvolvo e mantenho o ecossistema Hernando.ia</li>
            <li>Produzo conteúdo sobre IA, engenharia e empreendedorismo</li>
            <li>Consultoria em automação com IA para empresas</li>
          </ul>

          <h2>Projetos</h2>
          <ul>
            <li><Link href="/produtos/claude-code-skills">Claude Code Skills</Link> — 20 skills profissionais open source</li>
            <li><Link href="/produtos/arenabite">ArenaBite</Link> — Nutrição IA para atletas</li>
            <li><Link href="/produtos/hermes-agent">Hermes Agent</Link> — Agente de IA autônomo</li>
          </ul>

          <h2>Onde me encontrar</h2>
          <ul>
            <li><a href="https://instagram.com/hernando.ia">Instagram @hernando.ia</a></li>
            <li><a href="https://github.com/hcb2019">GitHub @hcb2019</a></li>
            <li><a href="https://www.linkedin.com/in/hernandoia">LinkedIn</a></li>
            <li>Email: contato@hernandoia.com</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

### Task 2: Adicionar link "Sobre" no Navbar

**Arquivo:** `src/components/layout/navbar.tsx`

Adicionar item de navegação: `<Link href="/sobre">Sobre</Link>`

### Task 3: Adicionar ao sitemap

**Arquivo:** `src/app/sitemap.ts`

Adicionar entrada:
```typescript
{
  url: `${SITE.url}/sobre`,
  lastModified: new Date(),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}
```

### Task 4: Verificação

- Acessar `https://hernandoia.com/sobre` → página carrega
- Title: "Sobre Hernando | Hernando.ia"
- `curl -s https://hernandoia.com/sitemap.xml | grep sobre` → retorna a URL

---

## Fase 3: Cloudflare Content-Signal (GEO) — Prioridade P1

> **Impacto:** +3 pontos GEO. Permite que AIs usem o conteúdo para RAG (retrieval-augmented generation).

### Problema
Cloudflare injeta `Content-Signal: ai-train=no` e não define `ai-input`. Isso bloqueia AIs de usar o conteúdo para RAG/grounding, que é justamente o que gera visibilidade em AI Overviews.

### Solução
Via Cloudflare Dashboard → Security → Bots → AI Crawlers:
- Ativar "Allow AI Crawlers to access content for search indexing" (ai-input)
- Manter "Allow AI Crawlers to use content for training" como desativado (ai-train=no)

**Nota:** Esta mudança é feita no Cloudflare Dashboard, não no código. O robots.ts já permite todos os bots relevantes.

---

## Fase 4: Core Web Vitals — Prioridade P2

> **Impacto:** +3 pontos Performance, +3 pontos Technical.

### Task 1: Adicionar Web Vitals reporting

**Novo arquivo:** `src/app/_components/web-vitals.tsx`

```typescript
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in dev, analytics in prod
    if (process.env.NODE_ENV === "development") {
      console.log(metric);
    }
    // TODO: send to Google Analytics 4
    const body = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      page: window.location.pathname,
    };
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/vitals", JSON.stringify(body));
    }
  });

  return null;
}
```

### Task 2: Adicionar ao layout

**Arquivo:** `src/app/layout.tsx`

Adicionar `<WebVitals />` dentro do `<body>`.

### Task 3: Criar endpoint de vitals (opcional)

```typescript
// src/app/api/vitals/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  console.log("[Web Vitals]", body);
  return Response.json({ ok: true });
}
```

### Task 4: Medir LCP inicial com PageSpeed Insights

Acessar https://pagespeed.web.dev/ e testar `hernandoia.com`.

**Meta esperada:**
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

---

## Fase 5: Otimização de Performance — Prioridade P3

> **Impacto:** +3 pontos Performance.

### Task 1: Adicionar `preload` para fontes críticas

**Arquivo:** `src/app/layout.tsx`

Já existe `preconnect` e `dns-prefetch`. Adicionar preload das fontes WOFF2.

### Task 2: Reduzir payload RSC da home

**Arquivo:** `src/app/page.tsx`

O `HeroSection` é `"use client"` e usa animações Framer Motion pesadas. Considerar:
- Mover `live-stats.json` para um endpoint API (evita carregar no bundle da home)
- Separar seções não-críticas em `lazy()` + `Suspense`

### Task 3: Otimizar imagem OG padrão

O `/images/og-default.png` atual pode ser convertido para AVIF/WebP com tamanho reduzido.

```bash
# Converter para WebP e AVIF
cwebp -q 80 images/og-default.png -o public/images/og-default.webp
# Atualizar referência em seo.ts
```

---

## 📋 Ordem de Execução

| Ordem | Fase | Tempo Estimado | Impacto |
|---|---|---|---|
| 1 | Fase 1 — Schema no `<head>` | 30 min | +5 GEO |
| 2 | Fase 2 — Página Autor | 20 min | +2 On-Page |
| 3 | Fase 3 — Cloudflare | 5 min (dashboard) | +3 GEO |
| 4 | Commit + Deploy | 2 min | — |
| 5 | Fase 4 — Web Vitals | 15 min | +3 Perf +3 Tech |
| 6 | Fase 5 — Performance | 30 min | +3 Perf |

**Total:** ~1h30 para 78 → ~96 pontos.

---

## ⚠️ Nota sobre os 4 pontos restantes

Alguns pontos são estruturais do Next.js App Router com RSC e não podem ser "consertados" sem refatoração pesada:
- O HTML inline do RSC (67KB) é inerente ao streaming do Next.js
- O `Content-Signal: ai-train=no` é intencional (protege contra treino não autorizado)

Estes 4 pontos são tradeoffs aceitáveis: proteção de conteúdo vs pontuação perfeita.
