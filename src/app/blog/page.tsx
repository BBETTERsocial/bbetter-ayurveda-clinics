import type { Metadata } from "next";
import { ContentCardGrid, ContentIndexHero } from "@/components/content/ContentViews";
import { SiteShell } from "@/components/layout/SiteShell";
import { getPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ayurveda insights, patient stories, and wellness guidance from BBETTER Ayurveda Clinics in Hyderabad.",
};

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <SiteShell>
      <section className="content-index relative isolate bg-[#F7F1E6]">
        <div className="content-index__lines absolute inset-0" aria-hidden />
        <div className="relative z-[1]">
          <ContentIndexHero
            eyebrow="Journal"
            title="Blog & insights"
            lead="Stories, guidance, and Ayurvedic perspectives from our doctors and clinics."
          />
          <ContentCardGrid
            items={posts}
            basePath="/blog"
            emptyLabel="Blog posts will appear here once published in WordPress."
          />
        </div>
      </section>
    </SiteShell>
  );
}
