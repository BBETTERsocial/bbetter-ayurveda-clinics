"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

function DoctorCard({
  doc,
  index,
}: {
  doc: (typeof site.doctors)[number];
  index: number;
}) {
  const shortName = doc.name.replace(/^Dr\.\s*/i, "");
  const initial = shortName.charAt(0).toUpperCase();
  const hasPhoto = Boolean(doc.image);

  return (
    <article className="doctors-mic__card">
      <div className="doctors-mic__portrait">
        <div className="doctors-mic__photo-frame">
          {hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={doc.image} alt={doc.name} className="doctors-mic__photo-img" />
          ) : (
            <div className="doctors-mic__wire" aria-hidden>
              <span className="doctors-mic__wire-badge">{String(index + 1).padStart(2, "0")}</span>
              <span className="doctors-mic__wire-initial font-display">{initial}</span>
              <span className="doctors-mic__wire-label">Photo</span>
            </div>
          )}
          <span className="doctors-mic__branch-tag">{doc.branch}</span>
        </div>
      </div>

      <div className="doctors-mic__body">
        <div className="doctors-mic__copy">
          <h3 className="font-display doctors-mic__name">{doc.name}</h3>
          <p className="doctors-mic__cred">{doc.credential}</p>
          <div className="doctors-mic__rule" aria-hidden />
          <dl className="doctors-mic__meta">
            <div>
              <dt>Branch</dt>
              <dd>{doc.branch}</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{doc.experience}</dd>
            </div>
          </dl>
        </div>

        <a
          href="#book"
          className="doctors-mic__cta btn-press inline-flex h-10 items-center gap-2 rounded-full bg-[#1A3D2E] pl-4 pr-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#EBE8E2] uppercase hover:bg-[#0B1F18]"
        >
          Book a Consultation
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </article>
  );
}

export function HomeDoctors() {
  return (
    <section
      id="doctors"
      className="doctors-mic relative isolate overflow-x-clip"
      aria-labelledby="doctors-heading"
    >
      <div className="doctors-mic__grid absolute inset-0" aria-hidden>
        <div className="doctors-mic__paper" />
        <div className="doctors-mic__lines" />
      </div>

      <div className="doctors-mic__decor pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="doctors-mic__anno doctors-mic__anno--tr">
          <svg className="doctors-mic__sketch" viewBox="0 0 120 90" fill="none">
            <path
              d="M18 72 C28 40 50 20 88 10 C70 28 58 50 52 72"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="M52 55 C68 40 90 28 108 24" stroke="currentColor" strokeWidth="0.9" />
          </svg>
        </div>
        <div className="doctors-mic__anno doctors-mic__anno--bl">
          <svg className="doctors-mic__sketch doctors-mic__sketch--leaf" viewBox="0 0 90 110" fill="none">
            <path
              d="M45 100 C43 70 22 52 14 20 C30 30 40 55 45 82 C50 55 64 28 80 18 C68 48 52 72 45 100 Z"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="M45 100 V24" stroke="currentColor" strokeWidth="0.85" />
          </svg>
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <FadeUp className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
            Our team
          </p>
          <div className="mx-auto mt-3 h-px w-14 bg-[#B5985A]/70" aria-hidden />
          <h2
            id="doctors-heading"
            className="font-display mt-4 text-[2.15rem] leading-[1.1] font-semibold tracking-tight text-[#0B2A22] sm:text-4xl lg:text-[2.75rem]"
          >
            Our Doctors
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#252B28] sm:text-base">
            Three MD Ayurveda doctors across our Kukatpally and Nallagandla clinics.
          </p>
        </FadeUp>

        <FadeUp className="mt-12 sm:mt-14" delay={80}>
          <ul className="doctors-mic__roster">
            {site.doctors.map((doc, i) => (
              <li key={doc.name}>
                <DoctorCard doc={doc} index={i} />
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
