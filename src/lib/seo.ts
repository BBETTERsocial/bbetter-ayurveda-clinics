import type { Metadata } from "next";

/** SEO copied from https://bbetterayurvedaclinics.com/ (Yoast). */
export const siteUrl = "https://bbetterayurvedaclinics.com";

export const seo = {
  home: {
    title: "best ayurveda clinic in hyderabad | Trusted Doctors & Holistic Care Center",
    description:
      "Looking for the best ayurveda clinic in Hyderabad? Get expert treatments, personalised therapies, and natural healing plans for lasting wellness today.",
    ogImage:
      "https://bbetterayurvedaclinics.com/wp-content/uploads/2026/06/Clinic-Home-header.jpg",
    path: "/",
  },
  about: {
    title: "best ayurveda clinic in kukatpally | Expert Care & Natural Healing Hub",
    description:
      "Searching for the best ayurveda clinic in kukatpally? Experience trusted doctors, authentic therapies, and personalized wellness care for lasting relief.",
    ogImage:
      "https://bbetterayurvedaclinics.com/wp-content/uploads/2026/02/group-people-working-out-business-plan-office-scaled.jpg",
    path: "/about",
  },
  therapies: {
    title: "Therapies - BBETTER AYURVEDA CLINICS",
    description:
      "Panchakarma, Abhyanga, Shirodhara, Nasya, Kati Basti and herbal consultations at BBETTER Ayurveda clinics in Kukatpally and Nallagandla, Hyderabad.",
    ogImage:
      "https://bbetterayurvedaclinics.com/wp-content/uploads/2026/03/wmremove-transformed.png",
    path: "/therapies",
  },
  contact: {
    title:
      "ayurvedic treatment for Ayurveda contact in kukatpally hyderabad - Contact Page",
    description:
      "ayurvedic treatment for Ayurveda contact in kukatpally hyderabad. Reach our clinic, book appointments, and get guidance from expert doctors today.",
    ogImage:
      "https://bbetterayurvedaclinics.com/wp-content/uploads/2026/02/leaf-icon-1.png",
    path: "/contact",
  },
  treatments: {
    title: "Ayurveda Treatments & Care Programs | BBETTER Ayurveda",
    description:
      "Ayurvedic treatments for arthritis, knee pain, joint pain, back pain, sciatica, migraine, psoriasis and more at BBETTER clinics in Hyderabad.",
    path: "/treatments",
  },
  blog: {
    title: "Blog - BBETTER AYURVEDA CLINICS",
    description:
      "Ayurveda insights, patient stories, and wellness guidance from BBETTER Ayurveda Clinics in Hyderabad.",
    path: "/blog",
  },
} as const;

type SeoEntry = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

export function pageMetadata(entry: SeoEntry): Metadata {
  const url = `${siteUrl}${entry.path === "/" ? "" : entry.path}`;
  return {
    title: { absolute: entry.title },
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url,
      siteName: "BBETTER Ayurveda Clinics",
      locale: "en_IN",
      type: "website",
      ...(entry.ogImage
        ? { images: [{ url: entry.ogImage, alt: entry.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      ...(entry.ogImage ? { images: [entry.ogImage] } : {}),
    },
  };
}
