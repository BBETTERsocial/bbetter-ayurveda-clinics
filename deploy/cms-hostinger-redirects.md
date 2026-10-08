# CMS subdomain: hide old WP frontend (Hostinger)

Goal:
- `cms.bbetterayurvedaclinics.com` should NOT show the old public WordPress site
- Keep working:
  - `/wp-admin` (edit blogs/treatments)
  - `/wp-json` (Next.js API)
  - `/wp-content` (images)
  - `/wp-login.php`

Do **not** delete posts, treatments, or media.

---

## 1) Hostinger File Manager → edit `.htaccess`

1. Hostinger → Websites → **cms.bbetterayurvedaclinics.com**
2. Open **File Manager**
3. Go to folder: `public_html/cms` (or the cms site root)
4. Open file: `.htaccess`
5. Put the block below **at the very top**, above the WordPress `# BEGIN WordPress` section
6. Save

```apache
# BEGIN BBETTER CMS GUARD
<IfModule mod_rewrite.c>
RewriteEngine On

# Keep WordPress admin, API, assets, login
RewriteRule ^wp-admin(/|$) - [L]
RewriteRule ^wp-json(/|$) - [L]
RewriteRule ^wp-content(/|$) - [L]
RewriteRule ^wp-includes(/|$) - [L]
RewriteRule ^wp-login\.php$ - [L]
RewriteRule ^xmlrpc\.php$ - [L]

# Send all other public CMS pages to the Next.js site
RewriteRule ^$ https://bbetterayurvedaclinics.com/ [R=301,L]
RewriteRule ^(.*)$ https://bbetterayurvedaclinics.com/$1 [R=301,L]
</IfModule>
# END BBETTER CMS GUARD
```

### Test after save

| URL | Expected |
|-----|----------|
| `https://cms.bbetterayurvedaclinics.com/` | Redirects to main site |
| `https://cms.bbetterayurvedaclinics.com/wp-admin` | WP login/admin works |
| `https://cms.bbetterayurvedaclinics.com/wp-json/wp/v2/posts` | JSON still works |
| `https://bbetterayurvedaclinics.com/blog` | Still shows blogs |

If admin breaks, remove the `# BEGIN BBETTER CMS GUARD` … `# END` block immediately.

---

## 2) Stop Google indexing the CMS site

### Option A — Yoast (recommended)

1. Login: `https://cms.bbetterayurvedaclinics.com/wp-admin`
2. **Yoast SEO → Settings → Site features** (or **Search appearance → General**)
3. Enable **Discourage search engines from indexing** / site noindex if available  
   Or: **Settings → Reading** → check **Discourage search engines from indexing this site**

### Option B — robots.txt via Yoast

Yoast currently allows all crawlers on cms. After enabling “discourage indexing”, verify:

`https://cms.bbetterayurvedaclinics.com/robots.txt`

should disallow crawling.

---

## 3) Optional Hostinger Redirects UI

If you prefer the panel instead of `.htaccess`:

1. Hostinger → cms site → **Domains → Redirects**
2. Redirect:
   - From: `cms.bbetterayurvedaclinics.com/`
   - To: `https://bbetterayurvedaclinics.com/`
   - Type: Permanent (301)

Note: panel redirects are often less precise than the `.htaccess` rules above. Prefer `.htaccess` so `/wp-admin` and `/wp-json` stay open.
