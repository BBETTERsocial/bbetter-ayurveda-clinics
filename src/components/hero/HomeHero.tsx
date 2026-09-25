"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Phase = "loader" | "dock" | "zoom" | "mark" | "settle" | "text" | "done";

const SIDE_LABELS = [
  {
    n: "01",
    title: "Ayurvedic Roots",
    sub: "Traditional knowledge",
    side: "left" as const,
    y: "18%",
  },
  {
    n: "02",
    title: "Dosha Balance",
    sub: "Personalised care",
    side: "right" as const,
    y: "18%",
  },
  {
    n: "03",
    title: "Natural Therapies",
    sub: "Time-tested practices",
    side: "left" as const,
    y: "74%",
  },
  {
    n: "04",
    title: "Holistic Wellness",
    sub: "Mind · Body · Lifestyle",
    side: "right" as const,
    y: "74%",
  },
];

/**
 * BBETTER editorial hero — desktop absolute stage;
 * tablet/mobile use a dedicated vertical composition.
 * After intro: scroll parts the type, mortar recedes, meta fades.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("loader");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduce);
    document.documentElement.dataset.intro = reduce ? "nav" : "loading";

    if (reduce) {
      setPhase("done");
      document.documentElement.dataset.intro = "nav";
      return;
    }

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers = [
      /* logo in → spark → hold → dock to nav → then reveal nav links */
      window.setTimeout(() => setPhase("dock"), 1600),
      window.setTimeout(() => {
        document.documentElement.dataset.intro = "logo";
        setPhase("zoom");
      }, 2400),
      window.setTimeout(() => {
        document.documentElement.dataset.intro = "nav";
      }, 2750),
      window.setTimeout(() => setPhase("mark"), 2800),
      window.setTimeout(() => setPhase("settle"), 3300),
      window.setTimeout(() => setPhase("text"), 3650),
      window.setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = prev;
      }, 4500),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = prev;
      delete document.documentElement.dataset.intro;
    };
  }, []);

  /* FLIP: splash logo → navbar logo slot */
  useEffect(() => {
    if (phase !== "dock" || reduceMotion) return;
    const el = dockRef.current;
    const nav = document.getElementById("site-nav-logo");
    if (!el || !nav) {
      document.documentElement.dataset.intro = "nav";
      return;
    }

    const from = el.getBoundingClientRect();
    const to = nav.getBoundingClientRect();
    const fromCx = from.left + from.width / 2;
    const fromCy = from.top + from.height / 2;
    const toCx = to.left + to.width / 2;
    const toCy = to.top + to.height / 2;
    const scale = Math.min(to.width / Math.max(from.width, 1), to.height / Math.max(from.height, 1));

    el.style.setProperty("--dock-x", `${toCx - fromCx}px`);
    el.style.setProperty("--dock-y", `${toCy - fromCy}px`);
    el.style.setProperty("--dock-s", String(Math.max(0.18, scale)));
    el.classList.add("is-docking");
    document.documentElement.dataset.intro = "docking";
  }, [phase, reduceMotion]);

  const introDone = phase === "done" || reduceMotion;

  /* Scroll depart — wait until meta has faded in (is-ready kills transitions) */
  useEffect(() => {
    if (!introDone || reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    let ticking = false;
    const readyTimer = window.setTimeout(() => {
      el.classList.add("is-ready");
    }, 2600);

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const range = Math.max(window.innerHeight * 0.7, el.offsetHeight * 0.65);
      const p = Math.min(1, Math.max(0, -rect.top / range));
      el.style.setProperty("--hero-p", p.toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.classList.remove("is-ready");
      el.style.removeProperty("--hero-p");
    };
  }, [introDone, reduceMotion]);

  const showLoader = phase === "loader" || phase === "dock";
  const gridZoom =
    phase === "loader" || phase === "dock" ? "hero-grid is-pre" : "hero-grid is-zoomed";
  const showMortar = ["mark", "settle", "text", "done"].includes(phase);
  const showType = ["text", "done"].includes(phase) || reduceMotion;
  /* Soft details after main type — long fade, not a snap */
  const showMeta = ["text", "done"].includes(phase) || reduceMotion;
  const loaderLeaving = phase === "dock";

  return (
    <section
      ref={sectionRef}
      className="hero-mic relative isolate overflow-hidden bg-[#EBE8E2] text-[#006B56]"
      style={{ ["--hero-p" as string]: 0 }}
    >
      <div className={`${gridZoom} absolute inset-0`} aria-hidden>
        <div className="hero-grid__paper" />
        <div className="hero-grid__lines" />
      </div>

      <div
        className={[
          "intro-loader absolute inset-0 z-40",
          showLoader ? "is-on" : "is-off",
          loaderLeaving ? "is-leaving" : "",
          phase === "dock" ? "is-dock" : "",
        ].join(" ")}
        aria-hidden={!showLoader}
      >
        <div className="intro-loader__studio" aria-hidden />
        <div className="intro-loader__orbit" aria-hidden>
          <span className="intro-loader__ring intro-loader__ring--a" />
          <span className="intro-loader__ring intro-loader__ring--b" />
          <span className="intro-loader__glow" />
        </div>
        <div ref={dockRef} className="intro-loader__dock">
          <div className="intro-loader__wordmark">
            <Image
              src="/images/brand/bbetter-logo.png"
              alt=""
              width={621}
              height={150}
              priority
              className="intro-loader__logo"
            />
          </div>
          <span className="intro-loader__spark" aria-hidden />
        </div>
      </div>

      <div
        className={[
          "hero-mic__botanicals",
          showMeta ? "is-in" : "is-out",
        ].join(" ")}
        aria-hidden
      >
        <svg className="hero-mic__sketch hero-mic__sketch--br" viewBox="0 0 130 140" fill="none">
          <path
            d="M20 120 C35 80 55 55 95 30 C70 55 58 85 52 120"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M52 90 C70 70 95 55 118 48" stroke="currentColor" strokeWidth="0.85" />
        </svg>
      </div>

      <div className="hero-mic__stage">
        <p
          className={[
            "hero-mic__eyebrow font-display",
            showMeta ? "is-in" : "is-out",
          ].join(" ")}
        >
          <span className="hero-mic__eyebrow-line">
            Ayurveda · Reimagined for Modern Life
          </span>
        </p>

        <div className="hero-mic__core">
          <h1 className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
            BBETTER Ayurveda
          </h1>

          <p
            className={[
              "hero-mic__title-line hero-mic__title-line--1 font-display",
              showType ? "is-in" : "is-out",
            ].join(" ")}
            aria-hidden
          >
            BBETTER
          </p>

          <div
            className={[
              "hero-mic__object",
              showMortar ? "is-visible" : "",
              phase === "mark" ? "is-pop" : "",
              ["settle", "text", "done"].includes(phase) || reduceMotion
                ? "is-landed"
                : "",
            ].join(" ")}
          >
            <Image
              src="/images/hero/mortar-mark.png"
              alt=""
              width={1100}
              height={1608}
              priority
              className="hero-mic__object-img"
            />
          </div>

          <p
            className={[
              "hero-mic__title-line hero-mic__title-line--2 font-display",
              showType ? "is-in" : "is-out",
            ].join(" ")}
            aria-hidden
          >
            Ayurveda
          </p>

          <div
            className={[
              "hero-mic__notes",
              showMeta ? "is-in" : "is-out",
            ].join(" ")}
            aria-hidden
          >
            <div className="hero-mic__anno hero-mic__anno--tl">
              <p className="hero-mic__anno-stack">
                <span>Vata</span>
                <span>Pitta</span>
                <span>Kapha</span>
              </p>
              <svg className="hero-mic__anno-arrow" viewBox="0 0 64 36" fill="none">
                <path
                  d="M4 8 C22 10 40 18 58 30"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M50 24 L58 30 L52 34"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="hero-mic__anno hero-mic__anno--tr">
              <p className="hero-mic__anno-stack hero-mic__anno-stack--right">
                <span>Dinacharya</span>
                <span>Ritucharya</span>
                <span>Swasthya</span>
              </p>
              <svg
                className="hero-mic__anno-arrow hero-mic__anno-arrow--left"
                viewBox="0 0 64 36"
                fill="none"
              >
                <path
                  d="M60 8 C42 10 24 18 6 30"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M14 24 L6 30 L12 34"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <ul
          className={[
            "hero-mic__sides",
            showMeta ? "is-in" : "is-out",
          ].join(" ")}
          aria-hidden
        >
          {SIDE_LABELS.map((item) => (
            <li
              key={item.n}
              className={`hero-mic__side hero-mic__side--${item.side}`}
              data-y={item.y}
            >
              <span className="hero-mic__side-n">{item.n}</span>
              <div className="hero-mic__side-copy">
                <span className="hero-mic__side-label">{item.title}</span>
                <span className="hero-mic__side-sub">{item.sub}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="hero-mic__foot">
          <p
            className={[
              "hero-mic__credit font-display",
              showMeta ? "is-in" : "is-out",
            ].join(" ")}
          >
            <span className="hero-mic__credit-line" aria-hidden />
            Balance · Heal · Thrive
            <span className="hero-mic__credit-line" aria-hidden />
          </p>

          {introDone ? (
            <a
              href="#our-story"
              aria-label="Scroll to Our Story"
              className="hero-mic__scroll text-black/25 transition-colors hover:text-black"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
