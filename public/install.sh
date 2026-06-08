#!/usr/bin/env bash
set -euo pipefail

# ────────────────────────────────────────────────────────────
# Claude Code Skills — Brazilian Developer Pack
# One-command install: curl -fsSL https://hernandoia.com/install.sh | bash
# or: npx @hernandoia/claude-code-skills
# ────────────────────────────────────────────────────────────

BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
CYAN="\033[36m"
RESET="\033[0m"

SKILLS_DIR=""
INSTALL_METHOD=""

echo ""
echo -e "${CYAN}${BOLD}╔══════════════════════════════════════════════════════╗${RESET}"
echo -e "${CYAN}${BOLD}║   Pacote de Skills — Desenvolvedor Brasileiro       ║${RESET}"
echo -e "${CYAN}${BOLD}║   Claude Code • 20 skills profissionais em PT-BR    ║${RESET}"
echo -e "${CYAN}${BOLD}╚══════════════════════════════════════════════════════╝${RESET}"
echo ""

# ── Detect Claude Code installation ─────────────────────

detect_claude_code() {
    # Check global install
    if [ -d "$HOME/.claude/skills" ]; then
        SKILLS_DIR="$HOME/.claude/skills"
        INSTALL_METHOD="global (~/.claude/skills/)"
        return 0
    fi

    # Check if we're inside a project with Claude Code
    if [ -f "./CLAUDE.md" ] || [ -f "./.claude/CLAUDE.md" ]; then
        mkdir -p "./.claude/skills"
        SKILLS_DIR="./.claude/skills"
        INSTALL_METHOD="project (./.claude/skills/)"
        return 0
    fi

    # Check common project patterns
    if git rev-parse --git-dir >/dev/null 2>&1; then
        local git_root
        git_root=$(git rev-parse --show-toplevel)
        if [ -f "$git_root/CLAUDE.md" ]; then
            mkdir -p "$git_root/.claude/skills"
            SKILLS_DIR="$git_root/.claude/skills"
            INSTALL_METHOD="git project ($git_root/.claude/skills/)"
            return 0
        fi
    fi

    # Default: install globally
    mkdir -p "$HOME/.claude/skills"
    SKILLS_DIR="$HOME/.claude/skills"
    INSTALL_METHOD="global — novo (~/.claude/skills/)"
    return 0
}

# ── Install skills ──────────────────────────────────────

install_skills() {
    local source_dir
    # Find skills directory relative to this script or use repo clone
    if [ -d "./skills" ]; then
        source_dir="./skills"
    elif [ -d "$(dirname "$0")/skills" ]; then
        source_dir="$(dirname "$0")/skills"
    else
        echo -e "${YELLOW}⚠️  Baixando skills do GitHub...${RESET}"
        local tmpdir
        tmpdir=$(mktemp -d)
        git clone --depth 1 https://github.com/hcb2019/claude-code-skills.git "$tmpdir" 2>/dev/null || {
            echo -e "${YELLOW}⚠️  git clone falhou. Baixando via curl...${RESET}"
            curl -fsSL https://github.com/hcb2019/claude-code-skills/archive/main.tar.gz | tar xz -C "$tmpdir" --strip-components=1
        }
        source_dir="$tmpdir/skills"
    fi

    echo -e "${CYAN}📂 Instalando em: ${BOLD}$SKILLS_DIR${RESET} ($INSTALL_METHOD)"
    echo ""

    local installed=0
    local skipped=0

    for skill_dir in "$source_dir"/*/; do
        local skill_name
        skill_name=$(basename "$skill_dir")
        
        if [ ! -f "$skill_dir/SKILL.md" ]; then
            continue
        fi

        if [ -d "$SKILLS_DIR/$skill_name" ]; then
            echo -e "  ${YELLOW}⏭️  $skill_name — já instalado${RESET}"
            ((skipped++)) || true
        else
            cp -r "$skill_dir" "$SKILLS_DIR/$skill_name"
            echo -e "  ${GREEN}✅ $skill_name${RESET}"
            ((installed++)) || true
        fi
    done

    echo ""
    echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════════════╗${RESET}"
    echo -e "${GREEN}${BOLD}║  ✅ $installed skills instaladas, $skipped já existiam      ${RESET}"
    echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════════════╝${RESET}"
    echo ""
    echo -e "${CYAN}💡 Para usar, digite no Claude Code:${RESET}"
    echo -e "   ${BOLD}/diagnostico${RESET} — debugging sistemático"
    echo -e "   ${BOLD}/tdd${RESET} — test-driven development"
    echo -e "   ${BOLD}/modo-caverna${RESET} — modo econômico de tokens"
    echo -e "   ${BOLD}/humanizador-pt-br${RESET} — remove traços de IA do português"
    echo ""
    echo -e "${CYAN}📖 Lista completa:${RESET} https://hernandoia.com/produtos/claude-code-skills"
    echo ""
}

# ── Main ─────────────────────────────────────────────────

detect_claude_code
install_skills
