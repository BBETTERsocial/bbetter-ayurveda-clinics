import type { Metadata } from "next";
import { Caveat, Fraunces, Outfit } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, seo, siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const home = pageMetadata(seo.home);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...home,
  title: {
    default: seo.home.title,
    template: "%s | BBETTER Ayurveda",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "best ayurveda clinic in hyderabad",
    "ayurvedic clinic kukatpally",
    "ayurvedic clinic nallagandla",
    "panchakarma hyderabad",
    "MD Ayurvedic doctors",
    "BBETTER Ayurveda",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.name,
  description: seo.home.description,
  url: siteUrl,
  image: seo.home.ogImage,
  telephone: site.phoneDisplay,
  medicalSpecialty: "Ayurvedic",
  address: site.locations.map((loc) => ({
    "@type": "PostalAddress",
    streetAddress: loc.address,
    addressLocality: loc.name,
    addressRegion: "Telangana",
    addressCountry: "IN",
  })),
  openingHours: "Mo-Su 09:00-20:00",
  sameAs: [site.whatsappHref],
  department: site.locations.map((loc) => ({
    "@type": "MedicalClinic",
    name: `${site.name} — ${loc.name}`,
    telephone: loc.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.name,
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 09:00-20:00",
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-intro="loading"
      className={`${fraunces.variable} ${outfit.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#F7F1E6] font-sans text-black">
        <JsonLd data={localBusinessLd} />
        {children}
      </body>
    </html>
  );
}
