import { NextResponse } from "next/server";

export async function GET() {
  const script = `     1|#!/usr/bin/env bash
     2|set -euo pipefail
     3|
     4|# ────────────────────────────────────────────────────────────
     5|# Claude Code Skills — Brazilian Developer Pack
     6|# One-command install: curl -fsSL https://hernandoia.com/install.sh | bash
     7|# or: npx @hernandoia/claude-code-skills
     8|# ────────────────────────────────────────────────────────────
     9|
    10|BOLD="\033[1m"
    11|GREEN="\033[32m"
    12|YELLOW="\033[33m"
    13|CYAN="\033[36m"
    14|RESET="\033[0m"
    15|
    16|SKILLS_DIR=""
    17|INSTALL_METHOD=""
    18|
    19|echo ""
    20|echo -e "${CYAN}${BOLD}╔══════════════════════════════════════════════════════╗${RESET}"
    21|echo -e "${CYAN}${BOLD}║   Pacote de Skills — Desenvolvedor Brasileiro       ║${RESET}"
    22|echo -e "${CYAN}${BOLD}║   Claude Code • 20 skills profissionais em PT-BR    ║${RESET}"
    23|echo -e "${CYAN}${BOLD}╚══════════════════════════════════════════════════════╝${RESET}"
    24|echo ""
    25|
    26|# ── Detect Claude Code installation ─────────────────────
    27|
    28|detect_claude_code() {
    29|    # Check global install
    30|    if [ -d "$HOME/.claude/skills" ]; then
    31|        SKILLS_DIR="$HOME/.claude/skills"
    32|        INSTALL_METHOD="global (~/.claude/skills/)"
    33|        return 0
    34|    fi
    35|
    36|    # Check if we're inside a project with Claude Code
    37|    if [ -f "./CLAUDE.md" ] || [ -f "./.claude/CLAUDE.md" ]; then
    38|        mkdir -p "./.claude/skills"
    39|        SKILLS_DIR="./.claude/skills"
    40|        INSTALL_METHOD="project (./.claude/skills/)"
    41|        return 0
    42|    fi
    43|
    44|    # Check common project patterns
    45|    if git rev-parse --git-dir >/dev/null 2>&1; then
    46|        local git_root
    47|        git_root=$(git rev-parse --show-toplevel)
    48|        if [ -f "$git_root/CLAUDE.md" ]; then
    49|            mkdir -p "$git_root/.claude/skills"
    50|            SKILLS_DIR="$git_root/.claude/skills"
    51|            INSTALL_METHOD="git project ($git_root/.claude/skills/)"
    52|            return 0
    53|        fi
    54|    fi
    55|
    56|    # Default: install globally
    57|    mkdir -p "$HOME/.claude/skills"
    58|    SKILLS_DIR="$HOME/.claude/skills"
    59|    INSTALL_METHOD="global — novo (~/.claude/skills/)"
    60|    return 0
    61|}
    62|
    63|# ── Install skills ──────────────────────────────────────
    64|
    65|install_skills() {
    66|    local source_dir
    67|    # Find skills directory relative to this script or use repo clone
    68|    if [ -d "./skills" ]; then
    69|        source_dir="./skills"
    70|    elif [ -d "$(dirname "$0")/skills" ]; then
    71|        source_dir="$(dirname "$0")/skills"
    72|    else
    73|        echo -e "${YELLOW}⚠️  Baixando skills do GitHub...${RESET}"
    74|        local tmpdir
    75|        tmpdir=$(mktemp -d)
    76|        git clone --depth 1 https://github.com/hcb2019/claude-code-skills.git "$tmpdir" 2>/dev/null || {
    77|            echo -e "${YELLOW}⚠️  git clone falhou. Baixando via curl...${RESET}"
    78|            curl -fsSL https://github.com/hcb2019/claude-code-skills/archive/main.tar.gz | tar xz -C "$tmpdir" --strip-components=1
    79|        }
    80|        source_dir="$tmpdir/skills"
    81|    fi
    82|
    83|    echo -e "${CYAN}📂 Instalando em: ${BOLD}$SKILLS_DIR${RESET} ($INSTALL_METHOD)"
    84|    echo ""
    85|
    86|    local installed=0
    87|    local skipped=0
    88|
    89|    for skill_dir in "$source_dir"/*/; do
    90|        local skill_name
    91|        skill_name=$(basename "$skill_dir")
    92|        
    93|        if [ ! -f "$skill_dir/SKILL.md" ]; then
    94|            continue
    95|        fi
    96|
    97|        if [ -d "$SKILLS_DIR/$skill_name" ]; then
    98|            echo -e "  ${YELLOW}⏭️  $skill_name — já instalado${RESET}"
    99|            ((skipped++)) || true
   100|        else
   101|            cp -r "$skill_dir" "$SKILLS_DIR/$skill_name"
   102|            echo -e "  ${GREEN}✅ $skill_name${RESET}"
   103|            ((installed++)) || true
   104|        fi
   105|    done
   106|
   107|    echo ""
   108|    echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════════════╗${RESET}"
   109|    echo -e "${GREEN}${BOLD}║  ✅ $installed skills instaladas, $skipped já existiam      ${RESET}"
   110|    echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════════════╝${RESET}"
   111|    echo ""
   112|    echo -e "${CYAN}💡 Para usar, digite no Claude Code:${RESET}"
   113|    echo -e "   ${BOLD}/diagnostico${RESET} — debugging sistemático"
   114|    echo -e "   ${BOLD}/tdd${RESET} — test-driven development"
   115|    echo -e "   ${BOLD}/modo-caverna${RESET} — modo econômico de tokens"
   116|    echo -e "   ${BOLD}/humanizador-pt-br${RESET} — remove traços de IA do português"
   117|    echo ""
   118|    echo -e "${CYAN}📖 Lista completa:${RESET} https://hernandoia.com/produtos/claude-code-skills"
   119|    echo ""
   120|}
   121|
   122|# ── Main ─────────────────────────────────────────────────
   123|
   124|detect_claude_code
   125|install_skills
   126|`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
