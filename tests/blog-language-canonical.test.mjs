import test from "node:test"
import assert from "node:assert/strict"
import { resolveBlogPostLanguage } from "../src/lib/blog.ts"

const untranslatedSlug = "the-sequence-chat-edio-912-chris-alexiuk-da-nvidia-fala-sobre-nemotron-gpus-e-ia"

test("an unavailable language variant uses Portuguese for canonical metadata", () => {
  assert.equal(resolveBlogPostLanguage(untranslatedSlug, "es"), "pt")
})
