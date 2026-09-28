import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";
import { HomeBooking } from "@/components/home/HomeBooking";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact BBETTER Ayurveda clinics in Kukatpally and Nallagandla, Hyderabad — addresses, timings, phone numbers, and Google Maps.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactContent />
      <HomeBooking />
    </SiteShell>
  );
}
