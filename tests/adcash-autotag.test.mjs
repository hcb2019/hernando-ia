import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const layout = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const consentPath = new URL("../src/components/ads/adcash-consent.tsx", import.meta.url);
const privacyPath = new URL("../src/app/politica-de-privacidade/page.tsx", import.meta.url);

test("permits only the Adcash script origin in the Content Security Policy", () => {
  assert.match(config, /script-src[^"\n]*https:\/\/acscdn\.com/);
});

test("does not place the advertising tag in the root layout before advertising consent", () => {
  assert.doesNotMatch(layout, /aclib\.runAutoTag/);
  assert.match(layout, /AdcashConsent/);
});

test("offers explicit opt-in, decline, and revocation before an Adcash tag loads", () => {
  assert.ok(existsSync(consentPath), "expected a consent component");
  const consent = readFileSync(consentPath, "utf8");
  assert.match(consent, /Aceitar publicidade/);
  assert.match(consent, /Continuar sem publicidade/);
  assert.match(consent, /runAutoTag/);
  assert.match(consent, /\/api\/consent/);
  assert.match(consent, /Gerenciar publicidade/);
});

test("documents Adcash advertising and consent choices in the privacy policy", () => {
  const policy = readFileSync(privacyPath, "utf8");
  assert.match(policy, /Adcash/);
  assert.match(policy, /publicidade/);
  assert.match(policy, /revogar/i);
});
