"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { ScrollStack, ScrollStackItem } from "@/components/ui/ScrollStack";
import { site } from "@/lib/site";

const THERAPY_SLUGS: Record<string, string> = {
  Panchakarma: "panchakarma",
  Abhyanga: "abhyanga",
  Shirodhara: "shirodhara",
  Nasya: "nasya",
  "Kati Basti": "kati-basti",
  "Herbal Consultation": "herbal-consultation",
};

const LAYERS = [
  site.therapies.slice(0, 2),
  site.therapies.slice(2, 4),
  site.therapies.slice(4, 6),
];

function TherapyCard({
  therapy,
}: {
  therapy: (typeof site.therapies)[number];
}) {
  const slug =
    THERAPY_SLUGS[therapy.name] ??
    therapy.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <a
      href="/#book"
      id={`therapy-${slug}`}
      className="therapies-svc__card group relative block overflow-hidden"
      aria-label={`${therapy.name} — book a consultation`}
    >
      <div className="therapies-svc__media relative h-full w-full">
        {therapy.image ? (
          <Image
            src={therapy.image}
            alt={therapy.name}
            fill
            sizes="(max-width: 1279px) 85vw, 50vw"
            className="therapies-svc__img object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D2E] to-[#0B1F18]" />
        )}
        <div className="therapies-svc__shade absolute inset-0" aria-hidden />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[1] flex items-end justify-between gap-3 p-4 sm:p-5">
        <h3 className="therapies-svc__name font-display pr-2 text-[1.15rem] leading-tight font-semibold sm:text-[1.25rem]">
          {therapy.name}
        </h3>
        <span className="therapies-svc__go" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

/**
 * Mobile / tablet: vertical page scroll drives cards left → right.
 * New therapies enter from the left and exit to the right.
 */
function TherapiesHorizontalRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.transform = "none";
      return;
    }

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const sticky = section.querySelector(
        ".therapies-rail__sticky"
      ) as HTMLElement | null;
      if (!sticky) return;

      const maxShift = Math.max(0, track.scrollWidth - sticky.clientWidth);
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const scrolled = Math.min(scrollable, Math.max(0, -rect.top));
      const progress = scrolled / scrollable;
      /* progress 0 → furthest left; scroll down → slide right */
      const x = -maxShift + progress * maxShift;
      track.style.transform = `translate3d(${Math.round(x)}px, 0, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Reversed so first therapy leads; as strip moves right, next enter from left */
  const railTherapies = [...site.therapies].reverse();

  return (
    <div
      ref={sectionRef}
      className="therapies-rail"
      style={{ ["--therapies-count" as string]: site.therapies.length }}
    >
      <div className="therapies-rail__sticky">
        <div ref={trackRef} className="therapies-rail__track">
          {railTherapies.map((therapy) => (
            <div key={therapy.name} className="therapies-rail__item">
              <div className="therapies-svc__layer">
                <TherapyCard therapy={therapy} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Therapies — scroll stack on desktop;
 * mobile + iPad: horizontal rail scrubbed by vertical scroll.
 */
export function HomeOffer() {
  const [dualStack, setDualStack] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const sync = () => setDualStack(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="therapies"
      className="therapies-svc relative isolate bg-[#F7F1E6] xl:overflow-x-clip"
      aria-labelledby="offer-heading"
    >
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20 xl:max-w-[88rem]">
        <FadeUp>
          <div className="therapies-svc__header grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-12">
            <div>
              <p className="text-[13px] font-medium tracking-[-0.01em] text-[#0B1F18]/70">
                <span className="text-[#B5985A]">/</span> Therapies We Offer
              </p>
              <h2
                id="offer-heading"
                className="font-display mt-3 text-[2.4rem] leading-[1.05] font-semibold tracking-tight text-[#0B1F18] sm:text-5xl lg:text-[3.35rem]"
              >
                The art of
                <br />
                Ayurvedic care
              </h2>
            </div>

            <div className="max-w-md lg:justify-self-end">
              <p className="text-[15px] leading-relaxed text-[#4A4A4A] sm:text-base">
                Time-tested therapies delivered with knowledge, precision, and intention —
                guided by MD Ayurvedic doctors at our Hyderabad clinics.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href="/#book"
                  className="therapies-svc__cta inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0B1F18] transition-colors hover:text-[#006B56]"
                >
                  Book a Consultation
                  <span aria-hidden>›</span>
                </a>
                <a
                  href={site.phoneHref}
                  className="therapies-svc__cta inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0B1F18] transition-colors hover:text-[#006B56]"
                >
                  Call For Booking
                  <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {dualStack ? (
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 xl:max-w-[88rem] xl:px-10 xl:pb-28">
          <ScrollStack
            className="therapies-svc__stack"
            itemDistance={120}
            itemStackDistance={32}
            stackPosition="16%"
            scaleEndPosition="8%"
            baseScale={0.9}
            itemScale={0.025}
            blurAmount={0.35}
          >
            {LAYERS.map((pair, layerIndex) => (
              <ScrollStackItem key={layerIndex} itemClassName="therapies-svc__layer">
                <div className="grid grid-cols-2 gap-6">
                  {pair.map((therapy) => (
                    <TherapyCard key={therapy.name} therapy={therapy} />
                  ))}
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      ) : (
        <TherapiesHorizontalRail />
      )}
    </section>
  );
}
