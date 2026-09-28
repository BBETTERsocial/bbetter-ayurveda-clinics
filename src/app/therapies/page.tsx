import type { Metadata } from "next";
import { HomeBooking } from "@/components/home/HomeBooking";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { SiteShell } from "@/components/layout/SiteShell";
import { TherapiesContent } from "@/components/therapies/TherapiesContent";
import { pageMetadata, seo } from "@/lib/seo";
import { getYtReviews } from "@/lib/wordpress";

export const metadata: Metadata = pageMetadata(seo.therapies);

export default async function TherapiesPage() {
  const reviews = await getYtReviews();

  return (
    <SiteShell>
      <TherapiesContent />
      <HomeTestimonials reviews={reviews} />
      <HomeBooking />
    </SiteShell>
  );
}
