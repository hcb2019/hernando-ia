"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Camera, Smartphone, Link, Check, Loader, Download, ArrowLeft } from "lucide-react";

interface ShareButtonProps {
  title: string;
  date: string;
  tags: string[];
  excerpt?: string;
  label?: string;
}

export default function ShareButton({
  title,
  date,
  tags,
  excerpt,
  label = "Compartilhar",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageType, setImageType] = useState<"stories" | "post" | null>(null);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setImageUrl(null);
        setImageType(null);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const toggleMenu = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
    setOpen(!open);
    if (open) {
      setImageUrl(null);
      setImageType(null);
    }
  };

  const generateImage = async (type: "stories" | "post") => {
    setGenerating(true);
    setImageType(type);
    try {
      const params = new URLSearchParams({
        title: title.slice(0, 120),
        date,
        tags: tags.slice(0, 4).join(","),
        excerpt: excerpt || "",
        mode: type,
      });
      const url = `/api/og/share?${params.toString()}`;
      setImageUrl(url);
    } catch {
      // fallback
    }
    setGenerating(false);
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `hernandoia-${imageType}-${Date.now()}.png`;
    a.click();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const renderMenu = () => {
    if (!mounted) return null;
    return (
      <div
        ref={menuRef}
        className="fixed w-[280px] bg-[#0f0f1e] border border-white/10 rounded-xl p-4 shadow-2xl"
        style={{
          zIndex: 99999,
          top: `${menuStyle!.top}px`,
          left: `${menuStyle!.left}px`,
          transform: "translate(-50%, -100%)",
          maxWidth: "calc(100vw - 16px)",
        }}
      >
        <button
          onClick={() => { setOpen(false); setImageUrl(null); }}
          className="absolute top-2 right-2 text-white/30 hover:text-white/80"
        >
          <X className="w-4 h-4" />
        </button>

        {!imageUrl ? (
          <div className="space-y-2">
            <p className="text-xs text-white/40 mb-3 text-center">Compartilhar como</p>

            <button
              onClick={() => generateImage("stories")}
              disabled={generating}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
            >
              <Camera className="w-5 h-5 text-pink-400" />
              <div>
                <p className="text-sm font-medium text-white/80 group-hover:text-white">
                  Instagram Stories
                </p>
                <p className="text-xs text-white/30">Imagem 9:16 vertical</p>
              </div>
              {generating && imageType === "stories" && (
                <Loader className="ml-auto w-4 h-4 animate-spin text-white/40" />
              )}
            </button>

            <button
              onClick={() => generateImage("post")}
              disabled={generating}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
            >
              <Smartphone className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white/80 group-hover:text-white">
                  Post do Feed
                </p>
                <p className="text-xs text-white/30">Imagem 1:1 quadrada</p>
              </div>
              {generating && imageType === "post" && (
                <Loader className="ml-auto w-4 h-4 animate-spin text-white/40" />
              )}
            </button>

            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
            >
              <Link className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm font-medium text-white/80 group-hover:text-white">
                  {copied ? (
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copiado!</span>
                  ) : "Copiar link"}
                </p>
                <p className="text-xs text-white/30">Compartilhar manualmente</p>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-white/40 text-center">
              {imageType === "stories" ? "Stories" : "Post"} — Pronto!
            </p>
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full rounded-lg border border-white/10"
            />
            <div className="flex gap-2">
              <button
                onClick={downloadImage}
                className="flex-1 px-3 py-2 rounded-lg bg-accent/20 border border-accent/30 text-accent text-xs font-semibold hover:bg-accent/30 transition-colors flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                Baixar
              </button>
              <button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = imageUrl;
                  a.target = "_blank";
                  a.click();
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
              >
                <Link className="w-3.5 h-3.5" />
                Abrir
              </button>
            </div>
            <button
              onClick={() => setImageUrl(null)}
              className="w-full text-xs text-white/30 hover:text-white/50 flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Voltar
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        onClick={toggleMenu}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent/30 bg-accent/10 text-accent text-sm font-semibold hover:bg-accent/20 hover:border-accent/50 transition-all"
        aria-label="Compartilhar artigo"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {label}
      </button>

      {open && menuStyle && createPortal(renderMenu(), document.body)}
    </div>
  );
}
