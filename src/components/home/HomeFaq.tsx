"use client";

import { useState } from "react";
import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path
        d="M3 8h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="faq-mic relative isolate overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="faq-mic__lines absolute inset-0" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-14 lg:py-16">
        <FadeUp className="mb-7 text-center sm:mb-8 sm:text-left">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-display mt-2 text-[1.85rem] font-semibold tracking-tight text-[#0B1F18] sm:text-[2.15rem]"
          >
            Common questions
          </h2>
        </FadeUp>

        <ul className="faq-mic__list">
          {site.faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;

            return (
              <li key={item.q}>
                <FadeUp delay={i * 40}>
                  <div className={`faq-mic__item${isOpen ? " is-open" : ""}`}>
                    <button
                      id={btnId}
                      type="button"
                      className="faq-mic__trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="faq-mic__num" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display faq-mic__q">{item.q}</span>
                      <span className="faq-mic__toggle" aria-hidden>
                        {isOpen ? <MinusIcon /> : <PlusIcon />}
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      hidden={!isOpen}
                      className={`faq-mic__panel${isOpen ? " is-open" : ""}`}
                    >
                      <div className="faq-mic__panel-inner">
                        <p className="faq-mic__a">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
