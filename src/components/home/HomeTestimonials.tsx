"use client";

import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import type { YtReview } from "@/lib/wordpress";

export function HomeTestimonials({ reviews }: { reviews: YtReview[] }) {
  const items = reviews.filter((r) => r.videoId).slice(0, 6);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const cards = Array.from(list.querySelectorAll<HTMLElement>(".reviews-mic__card"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
          else entry.target.classList.remove("is-in");
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <section
      id="reviews"
      className="reviews-mic relative isolate overflow-x-clip bg-[#EBE8E2]"
      aria-labelledby="reviews-heading"
    >
      <div className="reviews-mic__lines absolute inset-0" aria-hidden />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-24 lg:block" aria-hidden>
        <svg
          className="reviews-mic__botany absolute top-1/3 left-2 w-16 text-[#1A3D2E]/20"
          viewBox="0 0 80 160"
          fill="none"
        >
          <path
            d="M40 150 C36 110 18 84 10 40 C24 52 32 86 40 120 C46 84 58 48 72 32 C58 70 48 108 40 150 Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M40 150 V48" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:max-w-[88rem]">
        <FadeUp className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
            Reviews
          </p>
          <h2
            id="reviews-heading"
            className="font-display mt-4 text-[2.15rem] leading-[1.1] font-semibold tracking-tight text-[#0B1F18] sm:text-4xl lg:text-[2.75rem]"
          >
            Video testimonials
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A4A4A] sm:text-base">
            Hear experiences shared through video.
          </p>
        </FadeUp>

        {!items.length ? (
          <p className="mt-12 text-center text-[#4A4A4A]">
            Video reviews will appear here once published in WordPress.
          </p>
        ) : (
          <ul
            ref={listRef}
            className="reviews-mic__grid mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:mt-14 lg:gap-7"
          >
            {items.map((review, i) => (
              <li
                key={review.id}
                className={[
                  "reviews-mic__card",
                  i % 2 === 0 ? "reviews-mic__card--from-left" : "reviews-mic__card--from-right",
                ].join(" ")}
                style={{ ["--review-delay" as string]: `${(i % 2) * 100}ms` }}
              >
                <div className="reviews-mic__frame overflow-hidden">
                  <VideoFacade
                    videoId={review.videoId!}
                    title={review.title}
                    channel="BBETTER Ayurveda Clinic | Hyderabad"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function VideoFacade({
  videoId,
  title,
  channel,
}: {
  videoId: string;
  title: string;
  channel: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full bg-[#0B1F18]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-[#B5985A]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/45" />

          {/* Title + channel — YouTube-style top bar */}
          <span className="absolute inset-x-0 top-0 z-[1] flex items-start gap-2.5 p-3 sm:gap-3 sm:p-3.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-9 sm:w-9">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/bbetter-logo.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-[12px] leading-snug font-semibold text-white sm:text-[13px]">
                {title}
              </span>
              <span className="mt-0.5 block truncate text-[11px] leading-snug text-white/80 sm:text-[12px]">
                {channel}
              </span>
            </span>
          </span>

          <span className="absolute top-1/2 left-1/2 z-[1] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF0000] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-white sm:h-6 sm:w-6" aria-hidden>
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          </span>

          <span className="absolute right-3 bottom-3 z-[1] hidden items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white sm:inline-flex">
            Watch on YouTube
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#FF0000]" aria-hidden>
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.8 15.5v-7l6.3 3.5-6.3 3.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
