import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Hernando.ia";
    const date = searchParams.get("date") || "";
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const mode = searchParams.get("mode") || "post"; // "stories" | "post"

    const isStories = mode === "stories";
    const width = 1080;
    const height = isStories ? 1920 : 1080;

    // Quebrar título longo
    const words = title.split(" ");
    const titleLines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + " " + word).length > 35) {
        titleLines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += " " + word;
      }
    }
    if (currentLine) titleLines.push(currentLine.trim());

    // Tamanho de fonte adaptativo
    const titleFontSize = titleLines.length > 3 ? 48 : titleLines.length > 2 ? 56 : 64;
    const paddingY = isStories ? 120 : 80;
    const paddingX = 80;
    const titleGap = titleFontSize * 1.3;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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

          {/* Top label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: isStories ? "50px" : "36px",
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

          {/* Tags */}
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: isStories ? "40px" : "28px",
                flexWrap: "wrap",
              }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "15px",
                    color: "#00ffc8",
                    border: "1.5px solid rgba(0,255,200,0.25)",
                    padding: "6px 18px",
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

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: `${titleGap * 0.15}px`,
              maxWidth: "100%",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {titleLines.map((line, i) => (
              <h1
                key={i}
                style={{
                  fontSize: `${titleFontSize}px`,
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.15,
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

          {/* CTA Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              marginTop: isStories ? "60px" : "40px",
              paddingTop: "30px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span
                style={{
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                }}
              >
                Leia a análise completa em
              </span>
              <span
                style={{
                  fontSize: "26px",
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
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #00ffc8, #7b2ff7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
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
