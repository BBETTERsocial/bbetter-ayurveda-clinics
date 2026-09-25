export type WpFaq = { question: string; answerHtml: string };

export type CleanedWpContent = {
  bodyHtml: string;
  faqs: WpFaq[];
};

/**
 * WordPress/Elementor content cleanup:
 * - pull nested-accordion FAQs into structured data
 * - strip embeds, share widgets, empty chrome
 */
export function cleanWpContent(rawHtml: string): CleanedWpContent {
  if (!rawHtml) return { bodyHtml: "", faqs: [] };

  let html = rawHtml;
  const faqs: WpFaq[] = [];

  // Elementor nested accordion items
  html = html.replace(
    /<details\b[^>]*class="[^"]*e-n-accordion-item[^"]*"[^>]*>([\s\S]*?)<\/details>/gi,
    (_full, inner: string) => {
      const qMatch = inner.match(
        /e-n-accordion-item-title-text[^>]*>([\s\S]*?)<\/div>/i
      );
      const question = stripTags(qMatch?.[1] || "").trim();
      const afterSummary = inner.replace(/<summary\b[\s\S]*?<\/summary>/i, "");
      const answerHtml = tidyAnswerHtml(afterSummary);
      if (question && answerHtml) {
        faqs.push({ question, answerHtml });
      }
      return "";
    }
  );

  // Generic <details>/<summary> leftover FAQs
  html = html.replace(
    /<details\b[^>]*>([\s\S]*?)<\/details>/gi,
    (_full, inner: string) => {
      const qMatch = inner.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
      const question = stripTags(qMatch?.[1] || "").trim();
      const afterSummary = inner.replace(/<summary\b[\s\S]*?<\/summary>/i, "");
      const answerHtml = tidyAnswerHtml(afterSummary);
      if (question && answerHtml) {
        faqs.push({ question, answerHtml });
      }
      return "";
    }
  );

  // Drop empty Elementor accordion shells + FAQ heading that only wrapped them
  html = html.replace(
    /<div\b[^>]*elementor-widget-n-accordion[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi,
    ""
  );

  // Social share widgets
  html = html.replace(
    /<div\b[^>]*xs_social_share_widget[^>]*>[\s\S]*?<\/div>/gi,
    ""
  );

  // WP embeds / hidden iframes
  html = html.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "");
  html = html.replace(
    /<blockquote\b[^>]*wp-embedded-content[^>]*>[\s\S]*?<\/blockquote>/gi,
    ""
  );

  // Normalize Elementor headings to plain headings
  html = html.replace(
    /<h([1-6])\b[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h\1>/gi,
    "<h$1>$2</h$1>"
  );

  // Remove empty paragraphs / leftover empty wrappers noise
  html = html.replace(/<p\b[^>]*>\s*<\/p>/gi, "");
  html = html.replace(/(?:\s|&nbsp;|<br\s*\/?>)+$/gi, "");

  // If FAQ heading remains with nothing under it useful, keep it — Accordion section has its own title
  html = html.replace(
    /<h2\b[^>]*>\s*(?:తరచుగా అడిగే ప్రశ్నలు\s*)?\(?\s*FAQs?\s*\)?\s*<\/h2>/gi,
    ""
  );
  html = html.replace(
    /<h2\b[^>]*>[\s\S]*?\bFAQs?\b[\s\S]*?<\/h2>/gi,
    ""
  );

  return {
    bodyHtml: html.trim(),
    faqs,
  };
}

function tidyAnswerHtml(html: string) {
  let out = html;
  // Prefer text-editor widget bodies when present
  const editorBits = [
    ...out.matchAll(
      /elementor-widget-text-editor[\s\S]*?<div\b[^>]*elementor-widget-container[^>]*>\s*([\s\S]*?)\s*<\/div>/gi
    ),
  ].map((m) => m[1]);
  if (editorBits.length) {
    out = editorBits.join("");
  }

  out = out
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "")
    .replace(/<\/?(?:div|span|section|header|footer)(\s[^>]*)?>/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  // Ensure we still have some markup
  if (!/<\w+/.test(out) && out) {
    out = `<p>${out}</p>`;
  }
  return out;
}

function stripTags(input: string) {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
