import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { HomeBooking } from "@/components/home/HomeBooking";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { SiteShell } from "@/components/layout/SiteShell";
import { getYtReviews } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About BBETTER Ayurveda — consultation-led Ayurveda care in Hyderabad for pain management, mobility support, and lifestyle balance.",
};

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
