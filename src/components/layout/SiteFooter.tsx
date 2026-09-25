import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const explore = site.footerNav.filter((item) =>
  ["About", "Therapies", "Treatments", "Doctors", "Blog", "Reviews"].includes(item.label)
);

const visit = [
  { href: "/#locations", label: "Locations" },
  { href: "/#kukatpally", label: "Kukatpally" },
  { href: "/#nallagandla", label: "Nallagandla" },
  { href: "/#book", label: "Book" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer id="site-footer" className="foot-mic relative overflow-hidden bg-[#F7F5F0]">
      <p className="foot-mic__mark pointer-events-none select-none" aria-hidden>
        BBETTER
      </p>

      <div className="relative z-[1] mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pb-9 sm:pt-16 lg:px-10 xl:max-w-[88rem]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="foot-mic__heading">Explore</p>
            <ul className="foot-mic__links">
              {explore.map((item) => (
                <li key={item.href}>
                  {item.href.includes("#") ? (
                    <a href={item.href}>{item.label}</a>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="foot-mic__heading">Visit</p>
            <ul className="foot-mic__links">
              {visit.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="foot-mic__heading">Contact</p>
            <ul className="foot-mic__links">
              <li>
                <a href={site.phoneHref} className="foot-mic__phone">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="/#book" className="foot-mic__cta-link">
                  Book a consultation
                  <span aria-hidden>→</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="foot-mic__heading">Connect with Us</p>
            <div className="mt-3 flex items-center gap-2.5">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="foot-mic__social"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M12 2a10 10 0 0 0-8.6 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3.1-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1 0-.3-.1-.5-.2Z" />
                </svg>
              </a>
              <a href={site.phoneHref} className="foot-mic__social" aria-label="Call">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
                  <path
                    d="M8.5 4.5h3l1.4 4.2-1.7 1.1a12 12 0 0 0 4.5 4.5l1.2-1.7 4.2 1.3v2.8a1.8 1.8 0 0 1-1.9 1.8A14 14 0 0 1 5 7.2a1.8 1.8 0 0 1 1.8-1.9h1.7Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <p className="foot-mic__tagline mt-4 max-w-[12rem]">
              {site.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-[1] border-t border-black/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 xl:max-w-[88rem]">
          <Link href="/" className="foot-mic__brand inline-flex items-center gap-2.5">
            <Image
              src="/images/brand/bbetter-logo.png"
              alt=""
              width={240}
              height={44}
              className="h-5 w-auto opacity-80"
            />
            <span className="sr-only">{site.name}</span>
          </Link>

          <p className="foot-mic__legal text-[11px] text-[#8A8A8A]">
            <span>© {new Date().getFullYear()}</span>
            <span className="mx-1.5 text-black/20" aria-hidden>
              ·
            </span>
            <a href="/#faq" className="hover:text-[#0B1F18]">
              Privacy
            </a>
            <span className="mx-1.5 text-black/20" aria-hidden>
              ·
            </span>
            <a href="/#faq" className="hover:text-[#0B1F18]">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
