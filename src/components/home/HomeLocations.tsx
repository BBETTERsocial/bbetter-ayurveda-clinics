import Image from "next/image";
import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 17s-5-4.6-5-8a5 5 0 0 1 10 0c0 3.4-5 8-5 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="9" r="1.7" fill="currentColor" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 6.5V10l2.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.2 4.5h2.1l1 3.2-1.3.9a9 9 0 0 0 3.4 3.4l.9-1.3 3.2 1v2.1a1.4 1.4 0 0 1-1.4 1.4A10.6 10.6 0 0 1 4.5 5.9a1.4 1.4 0 0 1 1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeLocations() {
  return (
    <section
      id="locations"
      className="loc-mic relative isolate overflow-hidden"
      aria-labelledby="locations-heading"
    >
      <div className="loc-mic__lines absolute inset-0" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <FadeUp className="max-w-xl">
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
              Visit Us
            </p>
            <span className="h-px w-10 bg-[#B5985A]/70" aria-hidden />
          </div>
          <h2
            id="locations-heading"
            className="font-display mt-3 text-[1.85rem] leading-[1.15] font-semibold tracking-tight text-[#0B1F18] sm:text-[2.15rem]"
          >
            Two clinics in Hyderabad
          </h2>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#4A4A4A] sm:text-[15px]">
            Same standard of Ayurvedic care — choose the branch that works for you.
          </p>
        </FadeUp>

        <FadeUp className="mt-8 sm:mt-10" delay={80}>
          <ul className="loc-mic__cols">
            {site.locations.map((loc, i) => (
              <li key={loc.name} id={loc.name.toLowerCase()} className="loc-mic__clinic">
                <div className="loc-mic__num flex items-center gap-3">
                  <p className="text-[12px] font-semibold tracking-[0.14em] text-[#B5985A] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <span className="h-px w-7 bg-[#B5985A]/55" aria-hidden />
                </div>

                <h3 className="font-display text-[1.55rem] font-semibold text-[#0B1F18] sm:text-[1.7rem]">
                  {loc.name}
                </h3>

                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#B5985A] uppercase">
                  Hyderabad
                </p>

                <div className="loc-mic__address flex gap-2 text-[13px] leading-snug text-[#4A4A4A]">
                  <PinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1A3D2E]" />
                  <p>{loc.address}</p>
                </div>

                <div className="loc-mic__hours flex items-center gap-2 text-[12px]">
                  <ClockIcon className="h-3.5 w-3.5 shrink-0 text-[#1A3D2E]" />
                  <p>
                    <span className="tracking-[0.12em] text-[#4A4A4A] uppercase">Open </span>
                    <span className="font-semibold text-[#0B1F18]">{loc.timings}</span>
                  </p>
                </div>

                <div className="loc-mic__photo relative aspect-[16/9] w-full overflow-hidden">
                  {loc.image ? (
                    <Image
                      src={loc.image}
                      alt={`${loc.name} clinic`}
                      fill
                      sizes="(max-width: 640px) 90vw, 400px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center bg-[#D8D2C6] text-[10px] font-semibold tracking-[0.16em] text-[#0B1F18]/35 uppercase"
                      aria-hidden
                    >
                      Clinic photo
                    </div>
                  )}
                </div>

                <div className="loc-mic__actions flex flex-nowrap items-center gap-3">
                  <a
                    href={mapsHref(loc.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#0B1F18] px-4 text-[10px] font-bold tracking-[0.14em] text-[#EBE8E2] uppercase hover:bg-[#1A3D2E]"
                  >
                    <PinIcon className="h-3.5 w-3.5 text-[#EBE8E2]" />
                    Get Directions
                    <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" aria-hidden>
                      <path
                        d="M2.5 7h9M8 3.5 11.5 7 8 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <span className="h-8 w-px shrink-0 bg-[#0B1F18]/12" aria-hidden />

                  <a
                    href={site.phoneHref}
                    className="inline-flex min-w-0 items-center gap-2 hover:opacity-80"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0 text-[#B5985A]" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[9px] font-semibold tracking-[0.16em] text-[#B5985A] uppercase">
                        Call Us
                      </span>
                      <span className="text-[13px] font-semibold text-[#0B1F18] tabular-nums">
                        {site.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
