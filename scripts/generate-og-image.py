#!/usr/bin/env python3
"""Generate OG image for hernandoia.com — cyberpunk dual-tone style."""
from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT = "/opt/data/hernando-ia/public/images/og-default.png"
W, H = 1200, 630

# Colors — matching site theme
BG = (6, 6, 9)          # #060609 — absolute black
TEAL = (0, 229, 255)    # #00e5ff — front light
PINK = (255, 45, 85)    # #ff2d55 — rim light
WHITE = (255, 255, 255)
DIM = (120, 120, 140)

# Create image
img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Try to load Inter font, fall back to default
font_paths = [
    "/usr/share/fonts/truetype/inter/Inter-Bold.ttf",
    "/usr/share/fonts/opentype/inter/Inter-Bold.otf",
    "/usr/share/fonts/truetype/inter/Inter_28pt-Bold.ttf",
]

title_font = None
body_font = None
for fp in font_paths:
    if os.path.exists(fp):
        try:
            title_font = ImageFont.truetype(fp, 72)
            body_font = ImageFont.truetype(fp, 28)
            break
        except Exception:
            continue

if not title_font:
    title_font = ImageFont.load_default()
    body_font = ImageFont.load_default()

# ── Grid pattern (subtle) ──────────────────────────────────────────
grid_spacing = 60
for x in range(0, W, grid_spacing):
    draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1)
for y in range(0, H, grid_spacing):
    draw.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)

# ── Glow bars ───────────────────────────────────────────────────────
# Teal bar (left)
for i in range(20):
    alpha = 255 - i * 12
    if alpha < 0:
        alpha = 0
    draw.rectangle([0, 0, 4, H], fill=(*TEAL[:3], alpha))  # type: ignore

# Pink bar (bottom)
for i in range(10):
    alpha = 255 - i * 25
    if alpha < 0:
        alpha = 0
    draw.rectangle([0, H - 4 - i, W, H - i], fill=(*PINK[:3], alpha))  # type: ignore

# ── Text ────────────────────────────────────────────────────────────
# Main title
title = "HERNANDO.IA"
# Center the text
bbox = draw.textbbox((0, 0), title, font=title_font)  # type: ignore
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
tx = (W - tw) // 2
ty = (H - th) // 2 - 30

# Text shadow (pink offset)
draw.text((tx + 3, ty + 3), title, fill=PINK, font=title_font)  # type: ignore
# Main text (teal)
draw.text((tx, ty), title, fill=TEAL, font=title_font)  # type: ignore

# Subtitle
sub = "AI Engineer & Entrepreneur"
bbox2 = draw.textbbox((0, 0), sub, font=body_font)  # type: ignore
sw = bbox2[2] - bbox2[0]
sx = (W - sw) // 2
sy = ty + th + 20
draw.text((sx, sy), sub, fill=DIM, font=body_font)  # type: ignore

# URL at bottom
url = "hernandoia.com"
bbox3 = draw.textbbox((0, 0), url, font=body_font)  # type: ignore
uw = bbox3[2] - bbox3[0]
ux = (W - uw) // 2
uy = H - 60
draw.text((ux, uy), url, fill=DIM, font=body_font)  # type: ignore

# Save
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
img.save(OUTPUT, "PNG", optimize=True)
print(f"OG image saved: {OUTPUT} ({os.path.getsize(OUTPUT)} bytes)")
