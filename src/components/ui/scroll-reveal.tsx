"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wrapper that fades in content when it enters the viewport.
 * Content starts VISIBLE (no flash of empty space).
 * Only truly below-fold elements get animated.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is below the fold on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      // Already visible — do nothing, content is already shown
      return;
    }

    // Element is below fold — start hidden, reveal on scroll
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
