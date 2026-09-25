import type { Metadata } from "next";
import { Caveat, Fraunces, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "BBETTER Ayurveda | Ayurvedic Clinics in Hyderabad",
    template: "%s | BBETTER Ayurveda",
  },
  description:
    "Ayurvedic hospitals in Kukatpally and Nallagandla. Classical therapies and personalised care by MD Ayurvedic doctors.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-intro="loading"
      className={`${fraunces.variable} ${outfit.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#F7F1E6] font-sans text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
