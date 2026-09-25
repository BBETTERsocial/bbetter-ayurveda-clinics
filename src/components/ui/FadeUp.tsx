"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Variant = "up" | "fade" | "image" | "left" | "right" | "scale" | "blur";

/**
 * Cinematic scroll reveal (previous motion pass style).
 * Always becomes visible — safety timeout so nothing stays hidden.
 */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    el.classList.add("reveal-on-scroll");

    const show = () => el.classList.add("is-visible");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    // Safety: never leave content invisible
    const failSafe = window.setTimeout(show, 2800);

    return () => {
      io.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);

  const style: CSSProperties | undefined =
    delay > 0 ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal reveal-${variant} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
