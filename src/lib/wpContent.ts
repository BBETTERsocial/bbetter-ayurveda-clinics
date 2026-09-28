export type WpFaq = { question: string; answerHtml: string };

export type CleanedWpContent = {
  bodyHtml: string;
  faqs: WpFaq[];
};

/**
 * WordPress content cleanup:
 * - pull FAQs (Elementor accordion + GutenKit FAQ blocks) into structured data
 * - strip embeds, share widgets, empty chrome
 */
export function cleanWpContent(rawHtml: string): CleanedWpContent {
  if (!rawHtml) return { bodyHtml: "", faqs: [] };

  let html = rawHtml;
  const faqs: WpFaq[] = [];

  // GutenKit FAQ items (used on treatment pages)
  // Structure: .gkit-faq-item-title + sibling .gkit-faq-item-body
  html = html.replace(
    /<div\b[^>]*class="[^"]*gkit-faq-item-header[^"]*"[^>]*>\s*<h([1-6])\b[^>]*class="[^"]*gkit-faq-item-title[^"]*"[^>]*>([\s\S]*?)<\/h\1>\s*<\/div>\s*<div\b[^>]*class="[^"]*gkit-faq-item-body[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    (_full, _level: string, titleInner: string, bodyInner: string) => {
      const question = stripTags(titleInner).trim();
      const answerHtml = tidyAnswerHtml(bodyInner);
      if (question && answerHtml) {
        faqs.push({ question, answerHtml });
      }
      return "";
    }
  );

  // Strip empty GutenKit FAQ item / wrapper shells left after extraction
  for (let i = 0; i < 6; i++) {
    html = html.replace(
      /<div\b[^>]*(?:data-block="gutenkit\/faq(?:-item)?"|class="[^"]*(?:wp-block-gutenkit-faq|gkit-faq-item|gkit-faq)[^"]*")[^>]*>\s*<\/div>/gi,
      ""
    );
  }

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

  // Drop empty Elementor accordion shells
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

  // Page already renders the post title — drop a leading duplicate H1 from the body
  html = html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");

  // Drop empty paragraphs / leftover empty wrappers noise
  html = html.replace(/<p\b[^>]*>\s*<\/p>/gi, "");
  html = html.replace(/(?:\s|&nbsp;|<br\s*\/?>)+$/gi, "");

  // FAQ heading is handled by ArticleFaqs
  html = html.replace(
    /<h2\b[^>]*>\s*(?:తరచుగా అడిగే ప్రశ్నలు\s*)?\(?\s*FAQs?\s*\)?\s*<\/h2>/gi,
    ""
  );
  html = html.replace(/<h2\b[^>]*>[\s\S]*?\bFAQs?\b[\s\S]*?<\/h2>/gi, "");

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
