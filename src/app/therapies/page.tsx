import type { Metadata } from "next";
import { HomeBooking } from "@/components/home/HomeBooking";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { SiteShell } from "@/components/layout/SiteShell";
import { TherapiesContent } from "@/components/therapies/TherapiesContent";
import { getYtReviews } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Therapies",
  description:
    "Panchakarma, Abhyanga, Shirodhara, Nasya, Kati Basti and herbal consultations at BBETTER Ayurveda clinics in Kukatpally and Nallagandla, Hyderabad.",
};

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
