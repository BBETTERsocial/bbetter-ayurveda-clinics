import { FadeUp } from "@/components/ui/FadeUp";
import { site } from "@/lib/site";

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="about-page__list mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-snug text-[#252B28]">
          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B2A22]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Full About Us copy — text only, no images. */
export function AboutContent() {
  return (
    <div className="about-page relative isolate bg-[#F7F1E6]">
      <div className="about-page__lines absolute inset-0" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-5xl px-5 pt-10 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-10">
        <FadeUp>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
            About Us
          </p>
          <h1 className="font-display mt-3 text-[2.2rem] leading-[1.1] font-semibold tracking-tight text-[#0B2A22] sm:text-4xl lg:text-[2.75rem]">
            BBETTER Ayurveda
          </h1>
        </FadeUp>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-14">
          <FadeUp>
            <h2 className="font-display text-[1.65rem] font-semibold tracking-tight text-[#0B2A22] sm:text-[1.85rem]">
              {site.story.title}
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.8] text-[#252B28] sm:text-base">
              {site.story.body}
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.8] text-[#252B28] sm:text-base">
              {site.story.focus}
            </p>
          </FadeUp>

          <FadeUp delay={80}>
            <h2 className="font-display text-[1.65rem] font-semibold tracking-tight text-[#0B2A22] sm:text-[1.85rem]">
              {site.missionFull.title}
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.8] text-[#252B28] sm:text-base">
              {site.missionFull.body}
            </p>

            <aside className="mt-8 rounded-[1.25rem] bg-[#0B1F18] px-6 py-7 text-[#EBE8E2] sm:px-8 sm:py-8">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#E8D48B] uppercase">
                {site.aboutCallout.title}
              </p>
              <p className="font-display mt-3 text-[1.2rem] leading-snug font-medium text-[#F3EFE6] sm:text-[1.35rem]">
                {site.aboutCallout.subtitle}
              </p>
            </aside>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-10 border-t border-[#1A3D2E]/12 pt-12 sm:mt-20 sm:pt-14 md:grid-cols-3 md:gap-8 lg:gap-10">
          <FadeUp>
            <h2 className="font-display text-[1.25rem] font-semibold tracking-tight text-[#0B2A22] sm:text-[1.35rem]">
              {site.aboutApproach.title}
            </h2>
            <BulletList items={site.aboutApproach.items} />
          </FadeUp>

          <FadeUp delay={60}>
            <h2 className="font-display text-[1.25rem] font-semibold tracking-tight text-[#0B2A22] sm:text-[1.35rem]">
              {site.aboutScope.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#252B28]">
              {site.aboutScope.lead}
            </p>
            <BulletList items={site.aboutScope.items} />
          </FadeUp>

          <FadeUp delay={120}>
            <h2 className="font-display text-[1.25rem] font-semibold tracking-tight text-[#0B2A22] sm:text-[1.35rem]">
              {site.aboutPathway.title}
            </h2>
            <BulletList items={site.aboutPathway.items} />
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
