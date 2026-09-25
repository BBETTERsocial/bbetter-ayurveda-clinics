import { HomeBooking } from "@/components/home/HomeBooking";
import { HomeDoctors } from "@/components/home/HomeDoctors";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/hero/HomeHero";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeLocations } from "@/components/home/HomeLocations";
import { HomeOffer } from "@/components/home/HomeOffer";
import { HomeStory } from "@/components/home/HomeStory";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeWhy } from "@/components/home/HomeWhy";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyActions } from "@/components/layout/StickyActions";
import { getYtReviews } from "@/lib/wordpress";

export default async function Home() {
  const reviews = await getYtReviews();

  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main>
        <HomeHero />
        <HomeStory />
        <HomeDoctors />
        <HomeOffer />
        <HomeHowItWorks />
        <HomeWhy />
        <HomeTestimonials reviews={reviews} />
        <HomeLocations />
        <HomeBooking />
        <HomeFaq />
      </main>
      <SiteFooter />
      <StickyActions />
    </>
  );
}
