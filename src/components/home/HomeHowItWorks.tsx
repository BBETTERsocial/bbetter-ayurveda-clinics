"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 48" fill="none" aria-hidden>
      <path
        d="M20 44 C19 30 8 22 5 8 C12 12 17 22 20 34 C23 22 30 10 38 6 C32 20 24 32 20 44 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M20 44 V10" stroke="currentColor" strokeWidth="0.9" />
    </svg>
  );
}

function TripleLeaf({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 28" fill="none" aria-hidden>
      <path
        d="M18 24 C17 16 10 12 8 4 C12 6 15 12 18 18 C21 12 25 5 30 3 C26 11 21 17 18 24 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M10 22 C9 16 5 13 4 7 C7 9 9 13 11 18"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path
        d="M26 22 C27 16 31 13 32 7 C29 9 27 13 25 18"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}

function MapPin({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 32" fill="none" aria-hidden>
      <path
        d="M12 30s-8-7.2-8-14a8 8 0 1 1 16 0c0 6.8-8 14-8 14Z"
        fill="currentColor"
      />
      <circle cx="12" cy="12" r="3.2" fill="#EBE8E2" />
    </svg>
  );
}

const STEPS = site.howItWorks.length;

/**
 * How it works — sticky scroll journey on all breakpoints.
 * Scroll advances steps one-by-one (rail + image + copy).
 */
export function HomeHowItWorks() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) {
      setProgress(0);
      setActive(0);
      return;
    }

    const raw = -rect.top / total;
    const p = Math.max(0, Math.min(1, raw));
    setProgress(p);
    setActive(Math.min(STEPS - 1, Math.round(p * (STEPS - 1))));

    if (pinRef.current) {
      pinRef.current.style.left = `${p * 100}%`;
    }

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (viewport && track) {
      track.style.transform = `translate3d(${-p * (STEPS - 1) * viewport.clientWidth}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      update();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const activeStep = site.howItWorks[active] ?? site.howItWorks[0];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="how-mic how-mic--journey relative isolate"
      aria-labelledby="how-heading"
    >
      <div className="how-mic__grid absolute inset-0" aria-hidden>
        <div className="how-mic__paper" />
        <div className="how-mic__lines" />
      </div>

      <div className="how-mic__sticky relative z-[2] sticky top-0 h-[100svh] overflow-hidden">
        <div className="how-mic__stage mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-5 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-6">
          <header className="how-mic__intro w-full shrink-0 text-center">
            <div className="flex items-center justify-center gap-3">
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
                Process
              </p>
              <span className="h-px w-8 bg-[#B5985A]/70" aria-hidden />
            </div>
            <h2
              id="how-heading"
              className="font-display mt-1 text-[1.5rem] leading-tight font-semibold tracking-tight text-[#0B1F18] sm:text-[1.6rem]"
            >
              How it works
            </h2>
          </header>

          <div
            className="how-mic__journey-rail relative mt-3 w-full max-w-sm shrink-0 sm:mt-4 sm:max-w-md"
            aria-hidden
          >
            <div className="how-mic__rail-line how-mic__rail-line--journey" />
            <div
              className="how-mic__rail-progress"
              style={{ width: `${progress * 100}%` }}
            />
            <TripleLeaf className="how-mic__rail-leaf how-mic__rail-leaf--1 how-mic__rail-leaf--sm" />
            <TripleLeaf className="how-mic__rail-leaf how-mic__rail-leaf--2 how-mic__rail-leaf--sm" />
            {site.howItWorks.map((_, i) => (
              <div
                key={i}
                className={["how-mic__stop", active >= i ? "is-active" : ""].join(" ")}
                style={{ left: `${(i / (STEPS - 1)) * 100}%` }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
            <div ref={pinRef} className="how-mic__traveler">
              <MapPin className="how-mic__traveler-pin" />
            </div>
          </div>

          <div
            ref={viewportRef}
            className="how-mic__viewport relative mt-3 w-full shrink-0 overflow-hidden sm:mt-4"
          >
            <div ref={trackRef} className="how-mic__track flex will-change-transform">
              {site.howItWorks.map((step, i) => (
                <div
                  key={step.title}
                  className="how-mic__slide flex w-full shrink-0 flex-col items-center"
                  aria-hidden={active !== i}
                >
                  <div className="how-mic__media-wrap how-mic__media-wrap--journey relative">
                    <div className="how-mic__arch how-mic__arch--journey relative overflow-hidden bg-[#1A3D2E]">
                      {step.image ? (
                        <Image
                          src={step.image}
                          alt=""
                          fill
                          sizes="(max-width: 1023px) 200px, 220px"
                          className="object-cover"
                          priority={i === 0}
                        />
                      ) : null}
                    </div>
                    <LeafMark className="how-mic__corner-leaf how-mic__corner-leaf--sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="how-mic__note-center mt-2 shrink-0 text-center text-[0.72rem] text-[#0B1F18]/40 sm:mt-2.5 sm:text-[0.75rem]">
            {activeStep.note?.split(" · ").join(" · ")}
          </p>

          <div className="how-mic__copy relative mt-1.5 w-full max-w-md shrink-0 px-1 text-center sm:mt-2 sm:max-w-lg">
            {site.howItWorks.map((step, i) => (
              <div
                key={step.title}
                className={["how-mic__copy-item", active === i ? "is-active" : ""].join(" ")}
                aria-hidden={active !== i}
              >
                <h3 className="font-display text-[1.15rem] font-semibold text-[#0B1F18] sm:text-[1.2rem]">
                  {step.title}
                </h3>
                <p className="mt-1 text-[13px] leading-snug text-[#4A4A4A]">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex shrink-0 flex-wrap items-center justify-center gap-4 sm:mt-4">
            <Link
              href="/#book"
              className="btn-press inline-flex h-10 items-center gap-2 rounded-full bg-[#0B1F18] pl-5 pr-2 text-[10px] font-bold tracking-[0.12em] text-[#EBE8E2] uppercase hover:bg-[#1A3D2E]"
            >
              Start with a consultation
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
