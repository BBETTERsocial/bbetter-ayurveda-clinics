import { cleanWpContent } from "@/lib/wpContent";

const WP_URL =
  process.env.WORDPRESS_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "") ||
  "https://bbetterayurvedaclinics.com";

export type YtReview = {
  id: number;
  title: string;
  youtubeUrl: string;
  videoId: string | null;
};

export type WpContentCard = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string | null;
  readingMinutes?: number;
};

export type WpContentPost = WpContentCard & {
  contentHtml: string;
  faqs: { question: string; answerHtml: string }[];
  seoTitle?: string;
  seoDescription?: string;
};

type WpYtReview = {
  id: number;
  title?: { rendered?: string };
  acf?: { youtube_url?: string };
};

type WpRendered = { rendered?: string; protected?: boolean };

type WpMedia = {
  source_url?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string }>;
  };
};

type WpEmbedded = {
  "wp:featuredmedia"?: WpMedia[];
};

type WpYoast = {
  title?: string;
  description?: string;
  og_image?: Array<{ url?: string }>;
  twitter_misc?: Record<string, string>;
};

type WpEntity = {
  id: number;
  slug: string;
  date?: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  featured_media?: number;
  yoast_head_json?: WpYoast;
  _embedded?: WpEmbedded;
};

/** Extract YouTube video ID from watch / shorts / youtu.be / embed URLs. */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace(/^\//, "").split("/")[0] || null;
    }
    if (u.pathname.includes("/shorts/")) {
      return u.pathname.split("/shorts/")[1]?.split("/")[0] || null;
    }
    if (u.pathname.includes("/embed/")) {
      return u.pathname.split("/embed/")[1]?.split("/")[0] || null;
    }
    const v = u.searchParams.get("v");
    if (v) return v;
  } catch {
    return null;
  }
  return null;
}

export async function getYtReviews(): Promise<YtReview[]> {
  const endpoint = `${WP_URL}/wp-json/wp/v2/yt_review?status=publish&per_page=12&orderby=date&order=desc`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as WpYtReview[];
    return data
      .map((item) => {
        const youtubeUrl = item.acf?.youtube_url?.trim() || "";
        return {
          id: item.id,
          title: decodeHtml(item.title?.rendered || "Patient review"),
          youtubeUrl,
          videoId: extractYoutubeId(youtubeUrl),
        };
      })
      .filter((r) => Boolean(r.videoId));
  } catch {
    return [];
  }
}

export async function getPosts(): Promise<WpContentCard[]> {
  return getContentList("posts");
}

export async function getPostBySlug(slug: string): Promise<WpContentPost | null> {
  return getContentBySlug("posts", slug);
}

export async function getTreatments(): Promise<WpContentCard[]> {
  return getContentList("treatment");
}

export async function getTreatmentBySlug(
  slug: string
): Promise<WpContentPost | null> {
  return getContentBySlug("treatment", slug);
}

async function getContentList(
  type: "posts" | "treatment"
): Promise<WpContentCard[]> {
  const endpoint = `${WP_URL}/wp-json/wp/v2/${type}?status=publish&per_page=100&orderby=date&order=desc&_embed=1`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = (await res.json()) as WpEntity[];
    return data.map(mapCard);
  } catch {
    return [];
  }
}

async function getContentBySlug(
  type: "posts" | "treatment",
  slug: string
): Promise<WpContentPost | null> {
  const clean = normalizeSlug(slug);
  const endpoint = `${WP_URL}/wp-json/wp/v2/${type}?slug=${encodeURIComponent(clean)}&_embed=1`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = (await res.json()) as WpEntity[];
    const item = data[0];
    if (!item) return null;
    return mapPost(item);
  } catch {
    return null;
  }
}

function mapCard(item: WpEntity): WpContentCard {
  return {
    id: item.id,
    slug: normalizeSlug(item.slug),
    title: decodeHtml(item.title?.rendered || "Untitled"),
    excerpt: stripHtml(item.excerpt?.rendered || ""),
    date: item.date || "",
    image: extractImage(item),
    readingMinutes: extractReadingMinutes(item),
  };
}

function mapPost(item: WpEntity): WpContentPost {
  const card = mapCard(item);
  const cleaned = cleanWpContent(item.content?.rendered || "");
  return {
    ...card,
    contentHtml: cleaned.bodyHtml,
    faqs: cleaned.faqs,
    seoTitle: item.yoast_head_json?.title
      ? decodeHtml(item.yoast_head_json.title)
      : undefined,
    seoDescription: item.yoast_head_json?.description
      ? decodeHtml(item.yoast_head_json.description)
      : card.excerpt || undefined,
  };
}

function extractImage(item: WpEntity): string | null {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  const fromEmbed =
    media?.media_details?.sizes?.large?.source_url ||
    media?.media_details?.sizes?.medium_large?.source_url ||
    media?.source_url;
  if (fromEmbed) return fromEmbed;

  const fromYoast = item.yoast_head_json?.og_image?.[0]?.url;
  return fromYoast || null;
}

function extractReadingMinutes(item: WpEntity): number | undefined {
  const raw = item.yoast_head_json?.twitter_misc?.["Est. reading time"];
  if (!raw) return undefined;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
}

export function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function formatWpDate(iso: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function stripHtml(input: string) {
  return decodeHtml(
    input
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function decodeHtml(input: string) {
  return input
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ");
}
