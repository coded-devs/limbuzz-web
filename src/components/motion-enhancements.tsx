"use client";

import { useEffect } from "react";

export function MotionEnhancements() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      !("animate" in Element.prototype)
    )
      return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const running = new Set<Animation>();
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    ).filter(
      (element) =>
        element.getBoundingClientRect().top >= window.innerHeight * 0.85,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0.3, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 300, easing: "cubic-bezier(.2,.7,.3,1)" },
          );
          running.add(animation);
          animation.onfinish = () => running.delete(animation);
        }
      },
      { threshold: 0.12 },
    );
    targets.forEach((element) => observer.observe(element));
    const stop = () => {
      if (preference.matches) {
        running.forEach((animation) => animation.cancel());
        running.clear();
      }
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      running.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
