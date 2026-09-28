import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/content/ContentViews";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteUrl } from "@/lib/seo";
import { getPostBySlug, getPosts } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `${siteUrl}/blog/${encodeURIComponent(post.slug)}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "BBETTER Ayurveda Clinics",
      ...(post.image ? { images: [{ url: post.image, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <section className="content-article relative isolate bg-[#F7F1E6]">
        <div className="content-index__lines absolute inset-0" aria-hidden />
        <div className="relative z-[1]">
          <ContentArticle
            title={post.title}
            date={post.date}
            readingMinutes={post.readingMinutes}
            image={post.image}
            contentHtml={post.contentHtml}
            faqs={post.faqs}
            backHref="/blog"
            backLabel="All articles"
          />
        </div>
      </section>
    </SiteShell>
  );
}
