import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Hernando.ia";
    const date = searchParams.get("date") || "";
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const mode = searchParams.get("mode") || "post";
    const excerpt = searchParams.get("excerpt") || "";

    const isStories = mode === "stories";
    const width = 1080;
    const height = isStories ? 1920 : 1080;

    // Quebrar título longo em linhas
    const words = title.split(" ");
    const titleLines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + " " + word).length > 30) {
        titleLines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += " " + word;
      }
    }
    if (currentLine) titleLines.push(currentLine.trim());

    // Quebrar excerpt em linhas (2-4 linhas dependendo do modo)
    const excerptMaxChars = isStories ? 220 : 180;
    const trimmedExcerpt = excerpt.length > excerptMaxChars
      ? excerpt.slice(0, excerptMaxChars).replace(/\s+\S*$/, "") + "..."
      : excerpt;
    const excerptWords = trimmedExcerpt.split(" ");
    const excerptLines: string[] = [];
    let exLine = "";
    const exMaxLen = isStories ? 42 : 38;
    for (const word of excerptWords) {
      if ((exLine + " " + word).length > exMaxLen) {
        excerptLines.push(exLine.trim());
        exLine = word;
      } else {
        exLine += " " + word;
      }
    }
    if (exLine) excerptLines.push(exLine.trim());
    // Limitar linhas do excerpt
    const maxExcerptLines = isStories ? 4 : 2;
    const visibleExcerpt = excerptLines.slice(0, maxExcerptLines);

    // Tamanho de fonte adaptativo
    const titleFontSize = titleLines.length > 3 ? 46 : titleLines.length > 2 ? 54 : 64;
    const titleLineHeight = titleFontSize * 1.15;
    const excerptFontSize = isStories ? 26 : 22;
    const excerptLineHeight = excerptFontSize * 1.45;
    const paddingX = 80;
    const paddingY = isStories ? 100 : 70;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            background: "linear-gradient(160deg, #0a0a2e 0%, #120a3e 40%, #0d0d35 100%)",
            fontFamily: "Inter, Space Grotesk, sans-serif",
            position: "relative",
            padding: `${paddingY}px ${paddingX}px`,
          }}
        >
          {/* Grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0,255,200,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.04) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Glow orb - top right */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,255,200,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Glow orb - bottom left */}
          <div
            style={{
              position: "absolute",
              bottom: "-150px",
              left: "-150px",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(123,47,247,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Accent line top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: "linear-gradient(90deg, #00ffc8, #7b2ff7, #ff6b6b, #00ffc8)",
            }}
          />

          {/* ── Top bar: brand + date ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: isStories ? "40px" : "28px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#00ffc8",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              HERNANDO.IA
            </span>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#00ffc8",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 500,
              }}
            >
              {date}
            </span>
          </div>

          {/* ── Tags ── */}
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: isStories ? "32px" : "22px",
                flexWrap: "wrap",
              }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "14px",
                    color: "#00ffc8",
                    border: "1.5px solid rgba(0,255,200,0.25)",
                    padding: "5px 16px",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    fontWeight: 600,
                    backgroundColor: "rgba(0,255,200,0.06)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Title ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              width: "100%",
              marginBottom: isStories ? "30px" : "20px",
            }}
          >
            {titleLines.map((line, i) => (
              <h1
                key={i}
                style={{
                  fontSize: `${titleFontSize}px`,
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: titleLineHeight / titleFontSize,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  textShadow: "0 2px 40px rgba(0,255,200,0.15)",
                  margin: 0,
                }}
              >
                {line}
              </h1>
            ))}
          </div>

          {/* ── Excerpt / Resumo ── */}
          {visibleExcerpt.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                width: "100%",
                flex: 1,
              }}
            >
              {visibleExcerpt.map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: `${excerptFontSize}px`,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: excerptLineHeight / excerptFontSize,
                    margin: 0,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* ── CTA Footer ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                }}
              >
                Leia a análise completa em
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#00ffc8",
                  letterSpacing: "-0.02em",
                }}
              >
                hernandoia.com
              </span>
            </div>

            {/* Brand mark */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #00ffc8, #7b2ff7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 900,
                color: "#0a0a2e",
              }}
            >
              H
            </div>
          </div>
        </div>
      ),
      { width, height }
    );
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}
