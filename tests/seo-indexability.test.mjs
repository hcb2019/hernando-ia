import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("blog index is static while filters read query parameters only in a client component", () => {
  const page = read("src/app/blog/page.tsx");
  const index = read("src/components/blog/blog-index.tsx");
  const api = read("src/app/api/blog-index/route.ts");

  assert.match(page, /export const revalidate\s*=\s*3600/);
  assert.doesNotMatch(page, /searchParams/);
  assert.match(page, /<BlogIndex/);
  assert.match(index, /^"use client";/);
  assert.match(index, /useSearchParams/);
  assert.match(api, /export (?:async )?function GET/);
  assert.match(api, /tag\.length > 100/);
});

test("AI and RSS feeds exclude articles explicitly marked noindex", () => {
  for (const path of ["src/app/llms.txt/route.ts", "src/app/llms-full.txt/route.ts", "src/app/rss.xml/route.ts"]) {
    assert.match(read(path), /getBlogPosts\(\)\.filter\(.*!.*noindex/);
  }
});
