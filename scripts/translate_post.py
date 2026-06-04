#!/usr/bin/env python3
"""Translate a single MDX file to EN and ES using Google Gemini API."""
import sys, os, json

api_key = os.environ.get("GOOGLE_API_KEY")
if not api_key:
    print("ERROR: GOOGLE_API_KEY not set")
    sys.exit(1)

input_file = sys.argv[1]
target_lang = sys.argv[2]  # "en" or "es"
output_file = sys.argv[3]

with open(input_file, "r") as f:
    content = f.read()

lang_names = {"en": "English", "es": "Spanish"}
prompt = f"""Translate the following blog post from Portuguese to {lang_names[target_lang]}.
IMPORTANT RULES:
- Keep the frontmatter YAML exactly the same structure, but translate the values: title, excerpt
- Keep tags in English if universal (IA, LLM, etc.), or translate them
- Keep all markdown formatting intact (##, **, >, etc.)
- Keep all URLs intact
- Translate naturally — it should read like it was originally written in {lang_names[target_lang]}
- The voice should be knowledgeable, direct, and slightly bold — same as the original

Here is the post to translate:

{content}"""

import urllib.request, urllib.error

url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
body = json.dumps({
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"temperature": 0.3, "maxOutputTokens": 8192}
}).encode()

req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
        text = result["candidates"][0]["content"]["parts"][0]["text"]
        # Strip code fences if the model wrapped it
        if text.startswith("```"):
            lines = text.split("\n")
            # Remove first line (```markdown or ```) and last line (```)
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].strip() == "```":
                lines = lines[:-1]
            text = "\n".join(lines)
        with open(output_file, "w") as f:
            f.write(text)
        print(f"OK: {output_file}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.read().decode()[:500]}")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
