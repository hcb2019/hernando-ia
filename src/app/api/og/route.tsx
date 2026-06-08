import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Hernando.ia";
    const date = searchParams.get("date") || "";
    const tags = searchParams.get("tags")?.split(",") || [];

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
            padding: "80px 100px",
            background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0d0d35 100%)",
            fontFamily: "Inter, Space Grotesk, sans-serif",
            position: "relative",
          }}
        >
          {/* Grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0,255,200,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #00ffc8, #7b2ff7, #00ffc8)",
            }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}
            >
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "16px",
                    color: "#00ffc8",
                    border: "1px solid rgba(0,255,200,0.3)",
                    padding: "4px 14px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
              textTransform: "uppercase",
            }}
          >
            {title}
          </h1>

          {/* Date + Brand */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              marginTop: "auto",
              paddingTop: "40px",
            }}
          >
            {date && (
              <span
                style={{
                  fontSize: "22px",
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 500,
                }}
              >
                {date}
              </span>
            )}
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#00ffc8",
                letterSpacing: "-0.02em",
              }}
            >
              HERNANDO.IA
            </span>
          </div>
        </div>
      ),
      { ...size }
    );
  } catch {
    return new Response("Failed to generate image", { status: 500 });
  }
}
