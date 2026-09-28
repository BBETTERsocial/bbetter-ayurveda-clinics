import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { getPosts, getTreatments } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [treatments, posts] = await Promise.all([getTreatments(), getPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/therapies",
    "/treatments",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const treatmentRoutes: MetadataRoute.Sitemap = treatments.map((item) => ({
    url: `${siteUrl}/treatments/${encodeURIComponent(item.slug)}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((item) => ({
    url: `${siteUrl}/blog/${encodeURIComponent(item.slug)}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...blogRoutes];
}
