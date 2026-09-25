"use client";

import { useState } from "react";
import type { WpFaq } from "@/lib/wpContent";

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

export function ArticleFaqs({ faqs }: { faqs: WpFaq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!faqs.length) return null;

  return (
    <section className="article-faqs mt-12 sm:mt-14" aria-labelledby="article-faqs-heading">
      <h2
        id="article-faqs-heading"
        className="font-display text-[1.45rem] font-semibold tracking-tight text-[#0B1F18] sm:text-[1.65rem]"
      >
        Frequently asked questions
      </h2>

      <ul className="article-faqs__list mt-5">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          const panelId = `article-faq-panel-${i}`;
          const btnId = `article-faq-btn-${i}`;

          return (
            <li key={`${item.question}-${i}`} className="article-faqs__item">
              <button
                id={btnId}
                type="button"
                className="article-faqs__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-display article-faqs__q">{item.question}</span>
                <span className="article-faqs__toggle" aria-hidden>
                  {isOpen ? <MinusIcon /> : <PlusIcon />}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!isOpen}
                className={`article-faqs__panel${isOpen ? " is-open" : ""}`}
              >
                <div className="article-faqs__panel-inner">
                  <div
                    className="article-faqs__a"
                    dangerouslySetInnerHTML={{ __html: item.answerHtml }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
