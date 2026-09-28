import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

const THERAPY_SLUGS: Record<string, string> = {
  Panchakarma: "panchakarma",
  Abhyanga: "abhyanga",
  Shirodhara: "shirodhara",
  Nasya: "nasya",
  "Kati Basti": "kati-basti",
  "Herbal Consultation": "herbal-consultation",
};

/** Dedicated Therapies page — mirrors live /therapies layout (text + cards). */
export function TherapiesContent() {
  return (
    <div className="therapies-page relative isolate bg-[#F7F1E6]">
      <div className="about-page__lines absolute inset-0" aria-hidden />

      <div className="relative z-[1]">
        <header className="mx-auto max-w-5xl px-5 pt-10 pb-8 text-center sm:px-8 sm:pt-14 sm:pb-10 lg:px-10">
          <FadeUp>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
              What we offer
            </p>
            <h1 className="font-display mt-3 text-[2.4rem] leading-[1.08] font-semibold tracking-tight text-[#0B1F18] sm:text-5xl lg:text-[3.1rem]">
              Therapies
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-black sm:text-base">
              The combination of nature and science — classical Ayurvedic therapies guided by MD
              Ayurvedic doctors at our Hyderabad clinics.
            </p>
          </FadeUp>
        </header>

        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10">
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {site.therapies.map((therapy, i) => {
              const slug =
                THERAPY_SLUGS[therapy.name] ??
                therapy.name.toLowerCase().replace(/\s+/g, "-");

              return (
                <li key={therapy.name}>
                  <FadeUp delay={i * 40}>
                    <article
                      id={`therapy-${slug}`}
                      className="therapies-page__card flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-[#EBE8E2] shadow-[0_14px_36px_rgba(11,31,24,0.08)]"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A3D2E]">
                        {therapy.image ? (
                          <Image
                            src={therapy.image}
                            alt={therapy.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : null}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-[#0B1F18]/55 to-transparent"
                          aria-hidden
                        />
                      </div>
                      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                        <h2 className="font-display text-[1.35rem] font-semibold tracking-tight text-[#0B1F18] sm:text-[1.45rem]">
                          {therapy.name}
                        </h2>
                        <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-black sm:text-[15px]">
                          {therapy.detail}
                        </p>
                        <Link
                          href="/#book"
                          className="btn-press mt-5 inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#0B1F18] px-5 text-[10px] font-bold tracking-[0.14em] text-[#EBE8E2] uppercase hover:bg-[#1A3D2E]"
                        >
                          Book Now
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </article>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        </div>

        <section
          className="border-t border-[#1A3D2E]/10 bg-[#EBE8E2]"
          aria-labelledby="therapies-why-heading"
        >
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
            <FadeUp className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
                Why choose us
              </p>
              <h2
                id="therapies-why-heading"
                className="font-display mt-3 text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-[#0B1F18] sm:text-[2.25rem]"
              >
                Medicine with the green perspective.
              </h2>
            </FadeUp>

            <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2">
              {site.why.map((item, i) => (
                <li key={item.title}>
                  <FadeUp delay={i * 50}>
                    <div className="h-full rounded-[1.15rem] border border-[#1A3D2E]/10 bg-[#F7F1E6] px-5 py-6 sm:px-6 sm:py-7">
                      <h3 className="font-display text-[1.15rem] font-semibold text-[#0B1F18] sm:text-[1.25rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-black sm:text-[15px]">
                        {item.text}
                      </p>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
