"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/lib/site";

/** Hash anchors must be plain <a> — Next Link doubles #our-story#our-story. */
function AppLink({
  href,
  className,
  onClick,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  "aria-label"?: string;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

/** Quiet brand mark — does not compete with hero type. */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Non-home pages: no splash — show full nav immediately */
  useEffect(() => {
    if (pathname !== "/") {
      document.documentElement.dataset.intro = "nav";
    }
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={[
        "pointer-events-none fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-[#EBE8E2]/95 shadow-[inset_0_-1px_0_rgba(11,31,24,0.08)] backdrop-blur-md"
          : "bg-transparent",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-auto mx-auto grid h-14 w-full max-w-[92rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-10",
          scrolled ? "border-b border-transparent" : "",
        ].join(" ")}
      >
        <Link
          href="/"
          onClick={closeMenu}
          id="site-nav-logo"
          className="relative z-[1] shrink-0 justify-self-start"
          aria-label={site.name}
        >
          <Image
            src="/images/brand/bbetter-logo.png"
            alt={site.name}
            width={621}
            height={150}
            priority
            className="h-8 w-auto max-w-none object-contain sm:h-9 lg:h-10"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="site-nav-chrome hidden items-center justify-center gap-5 lg:flex lg:gap-6 xl:gap-8"
        >
          {site.nav.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className="font-display text-[0.8rem] tracking-[0.04em] text-[#1A1A1A]/70 transition-colors hover:text-[#006B56]"
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="site-nav-chrome flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-3">
          <AppLink
            href="/#book"
            className="btn-press hidden h-11 items-center gap-2.5 rounded-full bg-[#1A3D2E] pl-5 pr-2 text-[11px] font-semibold tracking-[0.08em] text-[#EBE8E2] uppercase lg:inline-flex hover:bg-[#0B1F18]"
          >
            Book a Consultation
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </AppLink>

          <AppLink
            href="/#book"
            onClick={closeMenu}
            className="btn-press inline-flex h-8 items-center rounded-full bg-[#1A3D2E] px-3 text-[9px] font-semibold tracking-[0.1em] text-[#EBE8E2] uppercase lg:hidden"
          >
            Book
          </AppLink>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[4px] rounded-full border border-[#1A3D2E]/20 lg:hidden"
          >
            <span
              className={[
                "h-[2px] w-5 bg-[#1A3D2E] transition-transform duration-200",
                menuOpen ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-[2px] w-5 bg-[#1A3D2E] transition-opacity duration-200",
                menuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-[2px] w-5 bg-[#1A3D2E] transition-transform duration-200",
                menuOpen ? "-translate-y-[7px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          aria-label="Mobile"
          className="site-nav-chrome pointer-events-auto mx-4 mt-1 max-h-[min(80svh,32rem)] overflow-y-auto rounded-2xl border border-[#1A3D2E]/10 bg-[#EBE8E2] px-5 pt-2 pb-5 shadow-lg lg:hidden"
        >
          <ul>
            {[
              ...site.nav,
              { href: "/#faq", label: "FAQ" },
            ].map((item) => (
              <li key={item.href}>
                <AppLink
                  href={item.href}
                  onClick={closeMenu}
                  className="block border-b border-[#1A3D2E]/8 py-3.5 text-[13px] font-semibold tracking-[0.14em] text-[#1A1A1A] uppercase"
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
          <AppLink
            href="/#book"
            onClick={closeMenu}
            className="btn-press mt-4 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#1A3D2E] text-[11px] font-semibold tracking-[0.1em] text-[#EBE8E2] uppercase"
          >
            Book a Consultation
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </AppLink>
          <div className="mt-3 flex gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[#1A3D2E]/25 text-[11px] font-bold tracking-[0.12em] text-[#1A3D2E] uppercase"
            >
              Call
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-[#1A3D2E]/25 text-[11px] font-bold tracking-[0.12em] text-[#1A3D2E] uppercase"
            >
              WhatsApp
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
