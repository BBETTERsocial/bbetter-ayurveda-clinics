"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Line reveal — only runs when `active` becomes true (after intro).
 */
export function HeroLines({
  lines,
  className = "",
  active = true,
}: {
  lines: ReactNode[];
  className?: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-animating", "is-ready");
      return;
    }

    el.classList.add("is-animating");
    const t = window.setTimeout(() => el.classList.add("is-ready"), 40);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <div ref={ref} className={`hero-lines ${className}`.trim()}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="hero-line"
          style={{ ["--line-delay" as string]: `${80 + i * 140}ms` }}
        >
          <span className="hero-line__inner">{line}</span>
        </span>
      ))}
    </div>
  );
}
