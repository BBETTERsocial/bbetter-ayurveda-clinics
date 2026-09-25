import type { Metadata } from "next";
import { ContentCardGrid, ContentIndexHero } from "@/components/content/ContentViews";
import { SiteShell } from "@/components/layout/SiteShell";
import { getTreatments } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Ayurvedic treatment pages for conditions we support at BBETTER clinics in Kukatpally and Nallagandla, Hyderabad.",
};

export default async function TreatmentsIndexPage() {
  const treatments = await getTreatments();

  return (
    <SiteShell>
      <section className="content-index relative isolate bg-[#F7F1E6]">
        <div className="content-index__lines absolute inset-0" aria-hidden />
        <div className="relative z-[1]">
          <ContentIndexHero
            eyebrow="Care"
            title="Treatments we support"
            lead="Condition-focused Ayurvedic care plans — personalised by MD Ayurvedic doctors at our Hyderabad clinics."
          />
          <ContentCardGrid
            items={treatments}
            basePath="/treatments"
            emptyLabel="Treatment pages will appear here once published in WordPress."
          />
        </div>
      </section>
    </SiteShell>
  );
}
