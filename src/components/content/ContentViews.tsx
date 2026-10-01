import Image from "next/image";
import Link from "next/link";
import { ArticleFaqs } from "@/components/content/ArticleFaqs";
import { formatWpDate, type WpContentCard } from "@/lib/wordpress";
import { splitFirstImage, type WpFaq } from "@/lib/wpContent";

export function ContentIndexHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-5 pt-10 pb-2 text-center sm:px-8 sm:pt-14">
      <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
        {eyebrow}
      </p>
      <h1 className="font-display mt-3 text-[2.2rem] leading-[1.1] font-semibold tracking-tight text-[#0B1F18] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-black sm:text-base">
        {lead}
      </p>
    </header>
  );
}

export function ContentCardGrid({
  items,
  basePath,
  emptyLabel,
  hideMeta = false,
}: {
  items: WpContentCard[];
  basePath: "/blog" | "/treatments";
  emptyLabel: string;
  hideMeta?: boolean;
}) {
  if (!items.length) {
    return (
      <p className="mx-auto mt-12 max-w-lg px-5 text-center text-black">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ul className="mx-auto mt-10 grid max-w-7xl gap-6 px-5 pb-16 sm:mt-12 sm:grid-cols-2 sm:gap-7 sm:px-8 sm:pb-20 lg:grid-cols-3 lg:px-10 lg:pb-24 xl:max-w-[88rem]">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`${basePath}/${encodeURIComponent(item.slug)}`}
            className="content-card group flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-[#EBE8E2] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#1A3D2E]">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D2E] to-[#0B1F18]" />
              )}
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              {!hideMeta && (item.date || item.readingMinutes) ? (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.08em] text-[#0B1F18]/45 uppercase">
                  {item.date ? <span>{formatWpDate(item.date)}</span> : null}
                  {item.readingMinutes ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>{item.readingMinutes} min read</span>
                    </>
                  ) : null}
                </div>
              ) : null}
              <h2
                className={[
                  "font-display text-[1.2rem] leading-snug font-semibold text-[#0B1F18] transition-colors group-hover:text-[#006B56]",
                  hideMeta || !(item.date || item.readingMinutes) ? "mt-0" : "mt-2",
                ].join(" ")}
              >
                {item.title}
              </h2>
              {item.excerpt ? (
                <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-black">
                  {item.excerpt}
                </p>
              ) : null}
              <span className="mt-auto pt-4 text-[12px] font-semibold tracking-[0.12em] text-[#0B1F18] uppercase">
                {basePath === "/treatments" ? "View treatment" : "Read more"}{" "}
                <span aria-hidden>›</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Treatment detail — normal page flow, neat side image (not sticky). */
export function TreatmentPage({
  title,
  image,
  contentHtml,
  faqs = [],
}: {
  title: string;
  image?: string | null;
  contentHtml: string;
  faqs?: WpFaq[];
}) {
  const split = splitFirstImage(contentHtml);
  const sideSrc = split.imageSrc || image || null;
  const sideAlt = split.imageAlt || "";
  const beforeHtml = split.imageSrc ? split.beforeHtml : "";
  const afterHtml = split.imageSrc ? split.afterHtml : contentHtml;

  return (
    <article className="treatment-page pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-5xl px-5 pt-8 sm:px-8 sm:pt-12 lg:px-10">
        <Link
          href="/treatments"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.14em] text-[#0B1F18]/55 uppercase transition-colors hover:text-[#006B56]"
        >
          <span aria-hidden>←</span> All treatments
        </Link>

        <header className="mt-6 sm:mt-8">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#B5985A] uppercase">
            Treatment
          </p>
          <h1 className="font-display mt-3 text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-[#0B2A22] sm:text-[2.25rem] lg:text-[2.55rem]">
            {title}
          </h1>
        </header>

        {beforeHtml ? (
          <div
            className="wp-prose treatment-page__lead mt-6 sm:mt-8"
            dangerouslySetInnerHTML={{ __html: beforeHtml }}
          />
        ) : null}

        <div
          className={`wp-prose treatment-page__body ${beforeHtml ? "mt-6 sm:mt-8" : "mt-8 sm:mt-10"}`}
        >
          {sideSrc ? (
            <div className="treatment-page__media">
              <Image
                src={sideSrc}
                alt={sideAlt}
                fill
                priority
                sizes="(max-width: 768px) 70vw, 220px"
                className="object-cover"
              />
            </div>
          ) : null}
          {afterHtml ? (
            <div
              className="treatment-page__flow"
              dangerouslySetInnerHTML={{ __html: afterHtml }}
            />
          ) : null}
        </div>

        <ArticleFaqs faqs={faqs} />

        <div className="mt-12 flex flex-wrap items-center gap-4 sm:mt-14">
          <Link
            href="/#book"
            className="btn-press inline-flex h-11 items-center gap-2 rounded-full bg-[#0B1F18] pl-5 pr-2 text-[10px] font-bold tracking-[0.12em] text-[#EBE8E2] uppercase hover:bg-[#1A3D2E]"
          >
            Book a consultation
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12">
              →
            </span>
          </Link>
          <Link
            href="/treatments"
            className="text-[13px] font-semibold text-[#0B1F18]/60 underline decoration-[#0B1F18]/20 underline-offset-4 hover:text-[#006B56]"
          >
            All treatments
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ContentArticle({
  title,
  date,
  readingMinutes,
  image,
  contentHtml,
  faqs = [],
  backHref,
  backLabel,
  ctaHref = "/#book",
  ctaLabel = "Book a consultation",
  treatments = [],
  recentPosts = [],
  currentSlug,
}: {
  title: string;
  date?: string;
  readingMinutes?: number;
  image?: string | null;
  contentHtml: string;
  faqs?: WpFaq[];
  backHref: string;
  backLabel: string;
  ctaHref?: string;
  ctaLabel?: string;
  treatments?: { title: string; slug: string }[];
  recentPosts?: { title: string; slug: string; date?: string }[];
  currentSlug?: string;
}) {
  const bodyHasImage = /<img\b/i.test(contentHtml);
  const showHero = Boolean(image) && !bodyHasImage;
  const hasSidebars = treatments.length > 0 || recentPosts.length > 0;

  const articleBody = (
    <>
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.14em] text-[#0B1F18]/55 uppercase transition-colors hover:text-[#006B56]"
      >
        <span aria-hidden>←</span> {backLabel}
      </Link>

      <header className="mt-6 sm:mt-8">
        {(date || readingMinutes) && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-[0.1em] text-[#B5985A] uppercase">
            {date ? <span>{formatWpDate(date)}</span> : null}
            {readingMinutes ? (
              <>
                <span aria-hidden>·</span>
                <span>{readingMinutes} min read</span>
              </>
            ) : null}
          </div>
        )}
        <h1 className="font-display mt-3 text-[2rem] leading-[1.12] font-semibold tracking-tight text-[#0B1F18] sm:text-[2.45rem] lg:text-[2.55rem]">
          {title}
        </h1>
      </header>

      {showHero ? (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.15rem] bg-[#1A3D2E] sm:mt-10">
          <Image
            src={image!}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      ) : null}

      <div
        className="wp-prose mt-8 sm:mt-10"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <ArticleFaqs faqs={faqs} />

      <div className="mt-12 flex flex-wrap items-center gap-4 sm:mt-14">
        <Link
          href={ctaHref}
          className="btn-press inline-flex h-11 items-center gap-2 rounded-full bg-[#0B1F18] pl-5 pr-2 text-[10px] font-bold tracking-[0.12em] text-[#EBE8E2] uppercase hover:bg-[#1A3D2E]"
        >
          {ctaLabel}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12">
            →
          </span>
        </Link>
        <Link
          href={backHref}
          className="text-[13px] font-semibold text-[#0B1F18]/60 underline decoration-[#0B1F18]/20 underline-offset-4 hover:text-[#006B56]"
        >
          {backLabel}
        </Link>
      </div>
    </>
  );

  if (!hasSidebars) {
    return (
      <article className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-3xl px-5 pt-8 sm:px-8 sm:pt-12">{articleBody}</div>
      </article>
    );
  }

  return (
    <article className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[13.5rem_minmax(0,1fr)_13.5rem] lg:gap-8 lg:px-10 xl:max-w-[88rem] xl:grid-cols-[15rem_minmax(0,1fr)_15rem] xl:gap-10">
        <aside className="blog-aside order-2 lg:order-1 lg:pt-2">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#B5985A] uppercase">
            Treatments
          </p>
          <ul className="blog-aside__list mt-3">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/treatments/${encodeURIComponent(t.slug)}`}
                  className="blog-aside__link"
                >
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="order-1 min-w-0 lg:order-2">{articleBody}</div>

        <aside className="blog-aside order-3 lg:pt-2">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#B5985A] uppercase">
            Recent blogs
          </p>
          <ul className="blog-aside__list mt-3">
            {recentPosts.map((p) => {
              const active = p.slug === currentSlug;
              return (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${encodeURIComponent(p.slug)}`}
                    className={["blog-aside__link", active ? "is-active" : ""].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </article>
  );
}
