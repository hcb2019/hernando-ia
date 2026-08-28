import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("blog index is cacheable even though it reads search parameters", () => {
  const page = read("src/app/blog/page.tsx");
  const config = read("next.config.ts");
  assert.match(page, /export const revalidate\s*=\s*3600/);
  assert.match(config, /source:\s*"\/blog"/);
});

test("AI and RSS feeds exclude articles explicitly marked noindex", () => {
  for (const path of ["src/app/llms.txt/route.ts", "src/app/llms-full.txt/route.ts", "src/app/rss.xml/route.ts"]) {
    assert.match(read(path), /getBlogPosts\(\)\.filter\(.*!.*noindex/);
  }
});
