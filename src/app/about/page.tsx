import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { HomeBooking } from "@/components/home/HomeBooking";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { SiteShell } from "@/components/layout/SiteShell";
import { pageMetadata, seo } from "@/lib/seo";
import { getYtReviews } from "@/lib/wordpress";

export const metadata: Metadata = pageMetadata(seo.about);

export default async function AboutPage() {
  const reviews = await getYtReviews();

  return (
    <SiteShell>
      <AboutContent />
      <HomeTestimonials reviews={reviews} />
      <HomeBooking />
    </SiteShell>
  );
}
