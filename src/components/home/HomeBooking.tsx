"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

type Status = "idle" | "sent";

function IconUser() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.5 16c1.2-3 3-4.5 5.5-4.5S14.3 13 15.5 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.2 4.5h2.1l1 3.2-1.3.9a9 9 0 0 0 3.4 3.4l.9-1.3 3.2 1v2.1a1.4 1.4 0 0 1-1.4 1.4A10.6 10.6 0 0 1 4.5 5.9a1.4 1.4 0 0 1 1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 17s-5-4.6-5-8a5 5 0 0 1 10 0c0 3.4-5 8-5 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="9" r="1.6" fill="currentColor" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6 3.5h5.5L15 7v9.5H6V3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M11.5 3.5V7H15" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 10.5h4M8 13h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconCal() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3.5" y="4.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 8h13M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 5.5h12v8H9l-3 2.5V13.5H4v-8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWa() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
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

function IconLock() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FieldShell({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="book-mic__field-shell">
      <span className="book-mic__field-icon">{icon}</span>
      {children}
    </div>
  );
}

export function HomeBooking() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const location = String(data.get("location") || "").trim();
    const problem = String(data.get("problem") || "").trim();
    const date = String(data.get("date") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      `Booking request — ${site.name}`,
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Clinic: ${location}`,
      `Problem: ${problem}`,
      date ? `Estimated date: ${date}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    const href = `${site.whatsappHref}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(href, "_blank", "noopener,noreferrer");
    setStatus("sent");
  }

  return (
    <section
      id="book"
      className="book-mic relative isolate overflow-hidden"
      aria-labelledby="book-heading"
    >
      <div className="book-mic__wash absolute inset-0" aria-hidden />

      <div className="book-mic__decor pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <svg className="book-mic__leaf-tr hidden lg:block" viewBox="0 0 120 140" fill="none">
          <path
            d="M58 128 C52 90 28 68 18 28 C38 42 48 72 58 102 C66 70 84 36 108 22 C88 58 72 92 58 128 Z"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path d="M58 128 V42" stroke="currentColor" strokeWidth="0.9" />
        </svg>
        <p className="book-mic__script book-mic__script--tr hidden lg:block">
          Healing Through
          <br />
          Nature
        </p>
      </div>

      <div className="relative z-[2] mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10 lg:px-10 lg:py-16 xl:max-w-[88rem]">
        <FadeUp className="max-w-md lg:pt-2" variant="left">
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
              Book a Consultation
            </p>
            <span className="h-px w-10 bg-[#B5985A]/70" aria-hidden />
          </div>
          <h2
            id="book-heading"
            className="font-display mt-3 text-[1.85rem] leading-[1.15] font-semibold tracking-tight text-[#0B1F18] sm:text-[2.15rem]"
          >
            Send us a message
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#4A4A4A] sm:text-[15px]">
            Tell us your concern and preferred clinic. We’ll confirm your appointment at
            Kukatpally or Nallagandla.
          </p>

          <div className="book-mic__contacts mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
            <a href={site.phoneHref} className="book-mic__contact">
              <span className="book-mic__contact-icon">
                <IconPhone />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[9px] font-semibold tracking-[0.16em] text-[#4A4A4A]/70 uppercase">
                  Call Us
                </span>
                <span className="text-[14px] font-semibold text-[#0B1F18] tabular-nums">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>

            <span className="hidden h-9 w-px bg-[#0B1F18]/12 sm:block" aria-hidden />

            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="book-mic__contact"
            >
              <span className="book-mic__contact-icon">
                <IconWa />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[9px] font-semibold tracking-[0.16em] text-[#4A4A4A]/70 uppercase">
                  WhatsApp
                </span>
                <span className="text-[14px] font-semibold text-[#0B1F18]">Chat on WhatsApp</span>
              </span>
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={90} variant="right">
          <form
            onSubmit={onSubmit}
            className="book-mic__card"
            noValidate
          >
            <div className="space-y-3.5">
              <div>
                <label htmlFor="book-name" className="book-mic__label">
                  Name <span>(required)</span>
                </label>
                <FieldShell icon={<IconUser />}>
                  <input
                    id="book-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="book-mic__input"
                  />
                </FieldShell>
              </div>

              <div>
                <label htmlFor="book-mobile" className="book-mic__label">
                  Mobile Number <span>(required)</span>
                </label>
                <FieldShell icon={<IconPhone />}>
                  <input
                    id="book-mobile"
                    name="mobile"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Enter your mobile number"
                    className="book-mic__input"
                  />
                </FieldShell>
              </div>

              <div>
                <label htmlFor="book-location" className="book-mic__label">
                  Location <span>(required)</span>
                </label>
                <FieldShell icon={<IconPin />}>
                  <select
                    id="book-location"
                    name="location"
                    required
                    defaultValue=""
                    className="book-mic__input book-mic__select"
                  >
                    <option value="" disabled>
                      Select your preferred clinic
                    </option>
                    {site.locations.map((loc) => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </FieldShell>
              </div>

              <div>
                <label htmlFor="book-problem" className="book-mic__label">
                  Problems <span>(required)</span>
                </label>
                <FieldShell icon={<IconDoc />}>
                  <select
                    id="book-problem"
                    name="problem"
                    required
                    defaultValue=""
                    className="book-mic__input book-mic__select"
                  >
                    <option value="" disabled>
                      Select your problem
                    </option>
                    {site.bookingProblems.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </FieldShell>
              </div>

              <div>
                <label htmlFor="book-date" className="book-mic__label">
                  Estimated Appointment Date
                </label>
                <FieldShell icon={<IconCal />}>
                  <input
                    id="book-date"
                    name="date"
                    type="date"
                    className="book-mic__input"
                  />
                </FieldShell>
              </div>

              <div>
                <label htmlFor="book-message" className="book-mic__label">
                  Message
                </label>
                <FieldShell icon={<IconChat />}>
                  <textarea
                    id="book-message"
                    name="message"
                    rows={3}
                    placeholder="Write your message (optional)"
                    className="book-mic__input book-mic__textarea"
                  />
                </FieldShell>
              </div>
            </div>

            <button type="submit" className="book-mic__submit btn-press">
              Book Appointment
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="book-mic__safe">
              <IconLock />
              Your details are safe with us.
            </p>

            {status === "sent" ? (
              <p className="mt-3 text-center text-sm text-[#1A3D2E]" role="status">
                Opening WhatsApp with your booking details…
              </p>
            ) : null}
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
