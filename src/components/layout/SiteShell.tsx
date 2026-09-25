import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyActions } from "@/components/layout/StickyActions";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main className="flex-1 pt-14 sm:pt-16">{children}</main>
      <SiteFooter />
      <StickyActions />
    </>
  );
}
