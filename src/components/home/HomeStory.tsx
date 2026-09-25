import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

const PILLARS = [
  {
    label: "Ancient Wisdom",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M16 28c0-10 8-14 8-22-6 2-8 8-8 14 0-6-2-12-8-14 0 8 8 12 8 22Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 28V10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Modern Care",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M10 14h12v2.5c0 4.5-2.5 8.5-6 8.5s-6-4-6-8.5V14Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M12 14c0-2 1.5-4 4-4s4 2 4 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M15 6.5l1.2 5.5M17.5 5.5 16.2 12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Better Tomorrows",
    icon: (
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden>
        <path
          d="M16 26c0-4 3-7 3-11-3 1.5-3 5-3 11 0-6 0-9.5-3-11 0 4 3 7 3 11Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 15c-3-1-6-1-8 1 2 1 5 1 8 0 3 1 6 1 8 0-2-2-5-2-8-1Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 26V18"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function HomeStory() {
  return (
    <section
      id="our-story"
      className="story-mic relative isolate overflow-x-clip"
      aria-labelledby="our-story-heading"
    >
      <div className="story-mic__grid absolute inset-0" aria-hidden>
        <div className="story-mic__paper" />
        <div className="story-mic__lines" />
      </div>

      {/* Decorative leaf sketches + handwritten notes */}
      <div className="story-mic__decor pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="story-mic__anno story-mic__anno--top">
          <svg className="story-mic__sketch" viewBox="0 0 120 90" fill="none">
            <path
              d="M20 70 C28 40 48 22 78 12 C62 28 52 48 48 70"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M48 55 C62 42 82 32 102 28"
              stroke="currentColor"
              strokeWidth="0.9"
            />
            <path
              d="M52 42 C68 34 86 28 104 22"
              stroke="currentColor"
              strokeWidth="0.85"
            />
          </svg>
          <p className="story-mic__script">
            Ancient Knowledge
            <br />
            Modern Life
          </p>
        </div>

        <div className="story-mic__anno story-mic__anno--bottom">
          <svg className="story-mic__sketch story-mic__sketch--sm" viewBox="0 0 100 80" fill="none">
            <path
              d="M18 62 C22 38 38 22 58 14 C48 28 42 44 40 62"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M40 48 C52 38 68 30 84 26"
              stroke="currentColor"
              strokeWidth="0.9"
            />
          </svg>
          <p className="story-mic__script">Healing Through Nature</p>
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:max-w-[88rem]">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left column */}
          <FadeUp className="flex flex-col lg:col-span-6" variant="left">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
              About BBETTER
            </p>
            <div className="mt-3 h-px w-14 bg-[#B5985A]/70" aria-hidden />
            <h2
              id="our-story-heading"
              className="font-display mt-4 text-[2.15rem] leading-[1.1] font-semibold tracking-tight text-[#0B1F18] sm:text-4xl lg:text-[2.85rem]"
            >
              {site.story.title}
            </h2>
            <p className="mt-6 max-w-xl text-[15.5px] leading-[1.8] text-[#4A4A4A] sm:text-[16.5px]">
              {site.story.body}
            </p>

            <div className="mt-8 h-px w-full max-w-xl bg-[#1A3D2E]/12" aria-hidden />

            <ul className="story-mic__pillars mt-7 flex max-w-xl flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-0">
              {PILLARS.map((item, i) => (
                <li
                  key={item.label}
                  className={[
                    "flex flex-1 items-center gap-3 sm:flex-col sm:items-start sm:gap-2.5 sm:px-4 sm:first:pl-0 sm:last:pr-0",
                    i > 0 ? "sm:border-l sm:border-[#1A3D2E]/12" : "",
                  ].join(" ")}
                >
                  <span className="text-[#0B1F18]/70">{item.icon}</span>
                  <span className="text-[10px] font-semibold tracking-[0.16em] text-[#1A1A1A]/75 uppercase sm:text-[11px] sm:tracking-[0.14em]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Right column — mission card */}
          <FadeUp
            className="relative lg:col-span-6"
            variant="right"
            delay={120}
          >
            <div className="story-mic__card-wrap relative mx-auto max-w-md lg:ml-auto lg:max-w-none">
              {/* Leaf accent behind top-right */}
              <svg
                className="story-mic__leaf-bg pointer-events-none absolute -top-6 -right-3 z-0 hidden w-28 text-[#1A3D2E]/35 sm:block lg:-right-6 lg:w-36"
                viewBox="0 0 140 160"
                fill="none"
                aria-hidden
              >
                <path
                  d="M70 150 C68 105 35 78 22 30 C48 42 62 78 70 118 C78 78 100 40 124 28 C108 78 80 112 70 150 Z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <path
                  d="M70 150 C70 100 70 60 70 22"
                  stroke="currentColor"
                  strokeWidth="0.9"
                />
              </svg>

              <aside className="story-mic__card relative z-[1] overflow-hidden rounded-[1.35rem] bg-[#0B1F18] px-7 py-9 text-[#EBE8E2] shadow-[0_24px_60px_rgba(11,31,24,0.22)] sm:px-9 sm:py-11 lg:px-10 lg:py-12">
                <p
                  className="font-display select-none text-[3.25rem] leading-none text-[#B5985A]/55"
                  aria-hidden
                >
                  “
                </p>
                <h3 className="mt-1 text-[11px] font-semibold tracking-[0.26em] text-[#E8D48B] uppercase">
                  {site.missionFull.title}
                </h3>
                <p className="story-mic__mission-copy font-display mt-5 pr-6 text-[1.15rem] leading-[1.55] font-medium text-[#F3EFE6] sm:pr-10 sm:text-[1.3rem] lg:pr-14 lg:text-[1.4rem]">
                  {site.missionFull.body}
                </p>
              </aside>

              {/* Mortar accent — bottom right corner only, clear of copy */}
              <div className="story-mic__mortar pointer-events-none absolute -right-1 -bottom-6 z-[2] w-[5.5rem] sm:-right-3 sm:-bottom-8 sm:w-[7rem] lg:-right-5 lg:w-[8.25rem]">
                <Image
                  src="/images/hero/mortar-mark.png"
                  alt=""
                  width={440}
                  height={640}
                  className="h-auto w-full drop-shadow-[0_12px_24px_rgba(11,31,24,0.28)]"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
