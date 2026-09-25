"use client";

import { useEffect, useRef } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

function LeafCluster({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 140" fill="none" aria-hidden>
      <path
        d="M58 128 C52 90 28 68 18 28 C38 42 48 72 58 102 C66 70 84 36 108 22 C88 58 72 92 58 128 Z"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M42 118 C36 88 18 70 12 40 C26 52 34 74 42 98"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M78 112 C82 82 96 60 108 38 C96 58 88 80 78 104"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M58 128 V42" stroke="currentColor" strokeWidth="0.95" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 38 C23 28 14 22 12 10 C18 14 21 24 24 32 C27 22 32 12 40 8 C34 20 28 30 24 38 Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M16 34 C15 26 10 22 8 14 C12 17 14 24 16 30"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M32 34 C33 26 38 22 40 14 C36 17 34 24 32 30"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function IconPerson() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="16" r="7" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M10 38 C12 28 16 24 24 24 C32 24 36 28 38 38"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDoctor() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="14" r="6.5" stroke="currentColor" strokeWidth="1.35" />
      <path
        d="M12 40 C13 30 16 26 24 26 C32 26 35 30 36 40"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M18 20 C14 22 12 26 12 30"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M30 20 C34 22 36 26 36 30"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="12" cy="33" r="2.4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function IconMortar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M14 28 H34 L32 38 H16 Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M12 28 H36" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path
        d="M28 12 L22 28"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M30 10 C34 12 36 16 34 20"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

const icons = [IconLeaf, IconPerson, IconDoctor, IconMortar];

export function HomeWhy() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const cards = Array.from(list.querySelectorAll<HTMLElement>(".why-mic__card"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
          } else {
            entry.target.classList.remove("is-in");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((card) => io.observe(card));

    return () => io.disconnect();
  }, []);

  return (
    <section
      id="why-bbetter"
      className="why-mic relative isolate overflow-hidden"
      aria-labelledby="why-heading"
    >
      <div className="why-mic__grid absolute inset-0" aria-hidden>
        <div className="why-mic__paper" />
        <div className="why-mic__lines" />
      </div>

      <div className="why-mic__decor pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <LeafCluster className="why-mic__botany why-mic__botany--tr hidden lg:block" />
        <p className="why-mic__script why-mic__script--tr hidden lg:block">
          Ancient Wisdom
          <br />
          Modern Care
        </p>
        <p className="why-mic__script why-mic__script--mr hidden lg:block">
          Personalised Care
          <br />
          Better Tomorrow
        </p>
        <LeafCluster className="why-mic__botany why-mic__botany--bl hidden lg:block" />
        <p className="why-mic__script why-mic__script--bl hidden lg:block">
          Healing Through
          <br />
          Nature
        </p>
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:max-w-[88rem]">
        <FadeUp className="max-w-xl" variant="blur">
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#C9A227] uppercase">
              Why Choose Us
            </p>
            <span className="h-px w-10 bg-[#C9A227]/70" aria-hidden />
          </div>
          <h2
            id="why-heading"
            className="font-display mt-4 text-[2.15rem] leading-[1.12] font-semibold tracking-tight text-[#EBE8E2] sm:text-4xl lg:text-[2.75rem]"
          >
            Medicine with the green perspective.
          </h2>
        </FadeUp>

        <ul
          ref={listRef}
          className="why-mic__cards mt-12 grid gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-12 lg:mt-16 lg:gap-x-20 lg:gap-y-14"
        >
          {site.why.map((item, i) => {
            const Icon = icons[i];
            const fromLeft = i % 2 === 0;
            return (
              <li
                key={item.title}
                className={[
                  "why-mic__card relative",
                  fromLeft ? "why-mic__card--from-left" : "why-mic__card--from-right",
                ].join(" ")}
                style={{ ["--why-delay" as string]: `${(i % 2) * 120}ms` }}
              >
                <div className="flex items-center gap-4">
                  <p className="text-[13px] font-semibold tracking-[0.14em] text-[#C9A227] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <span className="h-px max-w-[4.5rem] flex-1 bg-[#C9A227]/55" aria-hidden />
                  <span className="why-mic__icon" aria-hidden>
                    <Icon />
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-[#EBE8E2] sm:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[#EBE8E2]/68 sm:text-[15px]">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
