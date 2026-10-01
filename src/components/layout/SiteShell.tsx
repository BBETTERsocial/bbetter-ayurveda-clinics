import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyActions } from "@/components/layout/StickyActions";
import { getTreatments } from "@/lib/wordpress";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const treatments = await getTreatments();
  const navTreatments = treatments.map((t) => ({
    title: t.title,
    slug: t.slug,
  }));

  return (
    <>
      <SmoothScroll />
      <SiteHeader treatments={navTreatments} />
      <main className="flex-1 pt-14 sm:pt-16">{children}</main>
      <SiteFooter />
      <StickyActions />
    </>
  );
}
