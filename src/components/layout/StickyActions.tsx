"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function StickyActions() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = shown ? "sticky-actions is-shown" : "sticky-actions";

  return (
    <>
      <div
        className={`${cls} fixed inset-x-0 bottom-0 z-40 flex border-t border-[#1A3D2E]/15 bg-[#F7F1E6]/95 backdrop-blur-md md:hidden`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={site.phoneHref}
          className="flex h-14 flex-1 items-center justify-center gap-2 text-[12px] font-bold tracking-[0.12em] text-[#1A3D2E] uppercase"
        >
          Call now
        </a>
        <span className="my-3 w-px bg-[#1A3D2E]/15" aria-hidden />
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 flex-1 items-center justify-center gap-2 bg-[#1A3D2E] text-[12px] font-bold tracking-[0.12em] text-white uppercase"
        >
          WhatsApp
        </a>
      </div>

      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${cls} float-wa fixed right-6 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1A3D2E] shadow-[0_10px_30px_rgba(11,31,24,0.45)] hover:bg-[#0B1F18] md:flex`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
          <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.16L2.4 21.6l4.57-1.2A9.9 9.9 0 1 0 12.04 2Zm5.82 14.12c-.24.68-1.4 1.3-1.94 1.35-.5.04-1.13.06-1.82-.12a16.3 16.3 0 0 1-1.65-.61c-2.9-1.25-4.8-4.18-4.94-4.37-.15-.2-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.26-.29.58-.36.77-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .9 2.14.07.15.12.32.02.51-.1.2-.14.31-.29.48-.14.17-.3.38-.44.51-.14.14-.3.3-.13.58.17.29.74 1.22 1.6 1.98 1.1.98 2.02 1.29 2.31 1.43.29.15.46.12.63-.07.17-.2.72-.84.92-1.13.19-.29.38-.24.65-.14.26.1 1.68.8 1.97.94.29.15.48.22.55.34.07.12.07.68-.17 1.36Z" />
        </svg>
      </a>
    </>
  );
}
