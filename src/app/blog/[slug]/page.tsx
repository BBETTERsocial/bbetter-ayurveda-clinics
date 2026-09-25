import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/content/ContentViews";
import { SiteShell } from "@/components/layout/SiteShell";
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
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
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
