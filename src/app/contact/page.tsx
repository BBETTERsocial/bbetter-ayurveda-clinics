import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";
import { HomeBooking } from "@/components/home/HomeBooking";
import { SiteShell } from "@/components/layout/SiteShell";
import { pageMetadata, seo } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(seo.contact);

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactContent />
      <HomeBooking />
    </SiteShell>
  );
}
