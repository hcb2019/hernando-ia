"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Console no dev, beacon no prod
    if (process.env.NODE_ENV === "development") {
      console.log("[Web Vitals]", metric.name, metric.value, metric.rating);
      return;
    }

    // Enviar pra analytics (leve, não bloqueia)
    const body = JSON.stringify({
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      id: metric.id,
      page: window.location.pathname,
      timestamp: Date.now(),
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/vitals", body);
    }
  });

  return null;
}
