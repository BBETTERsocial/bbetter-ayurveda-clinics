import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

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

function WaIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 3.2a6.8 6.8 0 0 0-5.9 10.2L3.5 16.5l3.2-.7A6.8 6.8 0 1 0 10 3.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M7.6 8.2c.2-.4.4-.4.6-.4h.4c.2 0 .3 0 .4.3l.5 1.2c.1.2 0 .3-.1.5l-.3.4c-.1.1 0 .3.1.4.4.6 1 1.1 1.6 1.4.2.1.3.1.4 0l.5-.4c.1-.1.3-.1.4 0l1 .6c.2.1.3.2.2.4-.1.4-.6 1-1.2 1-.3 0-.7 0-2.2-.6-1.5-.6-2.8-2.1-3.2-2.7-.2-.3-.8-1.1-.8-2 0-.8.4-1.2.6-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Contact Us — both clinics with details + embedded Google Maps. */
export function ContactContent() {
  return (
    <div className="contact-page relative isolate bg-[#F7F1E6]">
      <div className="contact-page__lines absolute inset-0" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-6xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-10">
        <FadeUp>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
            Contact Us
          </p>
          <h1 className="font-display mt-3 text-[2.2rem] leading-[1.1] font-semibold tracking-tight text-[#0B2A22] sm:text-4xl lg:text-[2.75rem]">
            Visit or reach us
          </h1>
          <p className="mt-4 max-w-xl text-[15.5px] leading-[1.8] text-[#252B28] sm:text-base">
            Two BBETTER Ayurveda clinics in Hyderabad. Call, WhatsApp, or find us on the map —
            same standard of care at both branches.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex h-11 items-center gap-2 rounded-full bg-[#0B2A22] px-5 text-[11px] font-bold tracking-[0.14em] text-[#EBE8E2] uppercase hover:bg-[#1A3D2E]"
            >
              <WaIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#0B2A22]/20 bg-white/60 px-5 text-[11px] font-bold tracking-[0.14em] text-[#0B2A22] uppercase hover:bg-white"
            >
              <PhoneIcon className="h-4 w-4 text-[#B5985A]" />
              {site.phoneDisplay}
            </a>
          </div>
        </FadeUp>

        <ul className="mt-14 grid gap-12 lg:mt-16 lg:gap-16">
          {site.locations.map((loc, i) => (
            <li key={loc.name} id={loc.name.toLowerCase()}>
              <FadeUp delay={i * 60}>
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 lg:items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-[12px] font-semibold tracking-[0.14em] text-[#B5985A] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <span className="h-px w-8 bg-[#B5985A]/55" aria-hidden />
                    </div>

                    <h2 className="font-display mt-3 text-[1.75rem] font-semibold tracking-tight text-[#0B2A22] sm:text-[2rem]">
                      {loc.name}
                    </h2>
                    <p className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-[#B5985A] uppercase">
                      Hyderabad
                    </p>

                    <div className="mt-5 flex gap-2.5 text-[14.5px] leading-snug text-[#252B28] sm:text-[15px]">
                      <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1A3D2E]" />
                      <p>{loc.address}</p>
                    </div>

                    <div className="mt-3.5 flex items-center gap-2.5 text-[13.5px]">
                      <ClockIcon className="h-4 w-4 shrink-0 text-[#1A3D2E]" />
                      <p>
                        <span className="tracking-[0.1em] text-[#252B28] uppercase">Open </span>
                        <span className="font-semibold text-[#0B2A22]">{loc.timings}</span>
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press inline-flex h-10 items-center gap-2 rounded-full bg-[#0B2A22] px-4 text-[10px] font-bold tracking-[0.14em] text-[#EBE8E2] uppercase hover:bg-[#1A3D2E]"
                      >
                        <PinIcon className="h-3.5 w-3.5" />
                        Get Directions
                      </a>

                      <a
                        href={loc.phoneHref}
                        className="inline-flex items-center gap-2 rounded-full border border-[#0B2A22]/15 bg-white/70 px-4 py-2 hover:bg-white"
                      >
                        <PhoneIcon className="h-4 w-4 shrink-0 text-[#B5985A]" />
                        <span className="flex flex-col leading-tight">
                          <span className="text-[9px] font-semibold tracking-[0.16em] text-[#B5985A] uppercase">
                            Call
                          </span>
                          <span className="text-[13px] font-semibold text-[#0B2A22] tabular-nums">
                            {loc.phoneDisplay}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className="contact-page__map overflow-hidden rounded-[1.15rem] border border-[#0B2A22]/10 bg-[#EBE8E2] shadow-[0_16px_40px_rgba(11,42,34,0.08)]">
                    <iframe
                      title={`${loc.name} clinic map`}
                      src={loc.mapEmbed}
                      className="block h-[240px] w-full border-0 sm:h-[280px] lg:h-[320px]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
