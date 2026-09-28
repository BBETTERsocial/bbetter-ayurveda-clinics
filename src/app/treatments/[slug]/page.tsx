import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/content/ContentViews";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteUrl } from "@/lib/seo";
import { getTreatmentBySlug, getTreatments } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const treatments = await getTreatments();
  return treatments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return { title: "Treatment" };

  const title = treatment.seoTitle || treatment.title;
  const description = treatment.seoDescription || treatment.excerpt;
  const url = `${siteUrl}/treatments/${encodeURIComponent(treatment.slug)}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "BBETTER Ayurveda Clinics",
      ...(treatment.image ? { images: [{ url: treatment.image, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(treatment.image ? { images: [treatment.image] } : {}),
    },
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) notFound();

  return (
    <SiteShell>
      <section className="content-article relative isolate bg-[#F7F1E6]">
        <div className="content-index__lines absolute inset-0" aria-hidden />
        <div className="relative z-[1]">
          <ContentArticle
            title={treatment.title}
            date={treatment.date}
            readingMinutes={treatment.readingMinutes}
            image={treatment.image}
            contentHtml={treatment.contentHtml}
            faqs={treatment.faqs}
            backHref="/treatments"
            backLabel="All treatments"
            ctaHref="/#book"
            ctaLabel="Book a consultation"
          />
        </div>
      </section>
    </SiteShell>
  );
}
