"use client";

import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

function DoctorCard({
  doc,
}: {
  doc: (typeof site.doctors)[number];
}) {
  const shortName = doc.name.replace(/^Dr\.\s*/i, "").toUpperCase();
  const initial = shortName.charAt(0);

  return (
    <article className="h-full">
      <div className="doctors-mic__card-inner">
        {/* Dark portrait panel */}
        <div className="doctors-mic__portrait">
          <div className="doctors-mic__arch" aria-hidden>
            <svg className="doctors-mic__arch-leaf" viewBox="0 0 80 100" fill="none">
              <path
                d="M40 92 C38 62 18 48 12 18 C28 26 36 48 40 72 C44 48 56 24 72 16 C62 46 46 68 40 92 Z"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path d="M40 92 V20" stroke="currentColor" strokeWidth="0.85" />
            </svg>
          </div>

          <div className="doctors-mic__photo">
            {doc.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={doc.image} alt={doc.name} className="h-full w-full object-cover" />
            ) : (
              <span className="doctors-mic__initial font-display">{initial}</span>
            )}
          </div>

          <p className="doctors-mic__portrait-name">Dr. {shortName}</p>
        </div>

        {/* Cream detail panel */}
        <div className="doctors-mic__detail">
          <h3 className="font-display doctors-mic__name">{doc.name}</h3>
          <p className="doctors-mic__cred">{doc.credential}</p>
          <div className="doctors-mic__rule" aria-hidden />
          <p className="doctors-mic__study">
            <span>Study</span>
            {" · "}
            {doc.study.replace(/\s*·\s*/g, " · ")}
          </p>
          <ul className="doctors-mic__skills">
            {doc.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <p className="doctors-mic__focus font-display">{doc.focus}</p>
          <a href="#book" className="doctors-mic__cta">
            View profile
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
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

      {/* Decorative sketches */}
      <div className="doctors-mic__decor pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="doctors-mic__anno doctors-mic__anno--tr">
          <svg className="doctors-mic__sketch" viewBox="0 0 120 90" fill="none">
            <path
              d="M18 72 C28 40 50 20 88 10 C70 28 58 50 52 72"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="M52 55 C68 40 90 28 108 24" stroke="currentColor" strokeWidth="0.9" />
          </svg>
          <p className="doctors-mic__script">
            Swasthya Seva
            <br />
            Sampurna Jeevan
          </p>
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

        <div className="doctors-mic__anno doctors-mic__anno--bc">
          <svg className="doctors-mic__sketch doctors-mic__sketch--mortar" viewBox="0 0 64 72" fill="none">
            <path
              d="M16 30h32v4c0 10-6 20-16 20s-16-10-16-20v-4Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M22 30c0-4 3-8 10-8s10 4 10 8" stroke="currentColor" strokeWidth="1.1" />
            <path d="M28 14l2 12M34 12l-2 14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <p className="doctors-mic__script">
            Rooted in Ayurveda
            <br />
            Guided by Science
          </p>
        </div>
      </div>

      <div className="relative z-[2] mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:max-w-[88rem]">
        <FadeUp>
          <div className="doctors-mic__header flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
                Our team
              </p>
              <div className="mt-3 h-px w-14 bg-[#B5985A]/70" aria-hidden />
              <h2
                id="doctors-heading"
                className="font-display mt-4 text-[2.15rem] leading-[1.1] font-semibold tracking-tight text-[#0B1F18] sm:text-4xl lg:text-[2.85rem]"
              >
                Our Doctors
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#4A4A4A] sm:text-base">
                MD Ayurvedic doctors — study, skills, and care you can trust.
              </p>
            </div>

            <div className="doctors-mic__aside hidden items-center gap-4 lg:flex">
              <span className="h-12 w-px bg-[#1A3D2E]/20" aria-hidden />
              <p className="max-w-[7.5rem] text-[10px] leading-[1.45] font-semibold tracking-[0.18em] text-[#1A3D2E]/55 uppercase">
                Experience traditional healing
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="doctors-mic__track mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:gap-7">
          {site.doctors.map((doc, i) => (
            <FadeUp
              key={doc.name}
              delay={i * 100}
              variant={i % 2 === 0 ? "left" : "right"}
              className="doctors-mic__card"
            >
              <DoctorCard doc={doc} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
