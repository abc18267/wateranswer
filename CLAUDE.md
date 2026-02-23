# WaterAnswer.com — Project Memory

## Stack
- Hugo 0.152.2 extended (installed via Fedora dnf)
- Tailwind v4 via `@tailwindcss/postcss` + Hugo Pipes
- PostCSS CLI (`postcss-cli`) required alongside `postcss` for Hugo Pipes to find the binary
- Cloudflare Pages via GitHub auto-deploy

## Deployment
- Repo: https://github.com/abc18267/wateranswer
- Build command: `npm install && hugo`
- Output directory: `public`
- Env var: `HUGO_VERSION = 0.152.2`
- Do NOT use Wrangler CLI. GitHub push triggers Cloudflare build automatically.

## Local build
```
npm install && hugo          # full build
hugo server                  # dev server
rm -rf public resources && hugo   # clean build
```

## Content structure
- `content/_index.md` — homepage (no body content, layout handled by layouts/index.html)
- `content/[silo]/_index.md` — hub pages (layout: hub)
- `content/[silo]/[page].md` — spoke/review/howto pages
- `content/[silo]/[subsilo]/_index.md` — sub-hub or contaminant pages

## Frontmatter keys
- `layout:` must match a file in `layouts/_default/[layout].html`
- `pageType:` kept as a param for reference but Hugo uses `layout:` for template selection
- `date:` = pubDate, `lastmod:` = updatedDate
- `affiliateDisclosure: true` triggers the amber disclosure box at top of page
- `showDisclaimer: true` triggers the blue health disclaimer box (top + bottom)
- YAML single-quote FAQ values that contain apostrophes: `q: 'It''s fine'`

## Layout system
All layouts live in `layouts/_default/`. Hugo selects by `layout:` frontmatter key.
Every layout defines a `main` block rendered by `baseof.html`.

| Layout | Used for |
|--------|----------|
| hub | Silo landing pages |
| spoke | Informational sub-pages |
| review | Product reviews (affiliate) |
| contaminant | Contaminant profile pages (always shows disclaimers) |
| howto | How-to guides |
| tool | Calculators/tools |

## Partials
- `head.html` — SEO meta, canonical, OG, CSS via Hugo Pipes
- `nav.html` — sticky nav with More dropdown + mobile hamburger
- `footer.html` — 4-column footer grid + disclaimer + affiliate notice
- `breadcrumb.html` — auto-generates from `.Ancestors` + BreadcrumbList JSON-LD
- `faq.html` — FAQ accordion + FAQPage JSON-LD (renders only if `.Params.faq` exists)
- `spoke-grid.html` — card grid for hub pages (needs `spokeCards:` frontmatter)
- `affiliate-disclosure.html` — amber box, conditional on `affiliateDisclosure: true`
- `disclaimer.html` — blue box, conditional on `showDisclaimer: true`

## CSS pipeline (Tailwind v4)
- Entry: `assets/css/main.css`
- Uses `@import "tailwindcss"` and `@plugin "@tailwindcss/typography"`
- Brand colors defined in `@theme {}` block
- Hugo Pipes processes it: `resources.Get "css/main.css" | css.PostCSS`
- Production: `| minify | fingerprint`
- postcss.config.js uses `'@tailwindcss/postcss': {}` (not `tailwindcss: {}`)

## JSON-LD rules
- Use `{{ $schema | jsonify | safeJS }}` inside script tags to avoid double-encoding
- `disableHTML = true` in `[minify]` config prevents Hugo's minifier from stripping JSON-LD braces
- FAQ YAML: single-quote values with apostrophes. Double-quoting causes jsonify issues.

## Taxonomy
- Disabled with `disableKinds = ["taxonomy", "term"]` in hugo.toml
- Without this, Hugo generates empty /categories/ and /tags/ pages

## Silos (current)
- `/your-water/` — contaminants, well water (hub + spokes + contaminant profiles)
- `/testing/` — test kits, mail-in labs (hub + reviews)
- `/treatment/` — RO systems, how-to guides (hub + reviews + howtos)
- `/tools/` — placeholder hub
- `/learn/` — placeholder hub

## Content live (as of 2026-02-22)
17 pages total:
1. `/` — homepage
2. `/your-water/` — hub
3. `/your-water/contaminants/pfas/` — contaminant
4. `/your-water/contaminants/pfas/what-is-pfas/` — spoke
5. `/your-water/contaminants/pfas/pfas-in-drinking-water/` — spoke
6. `/your-water/contaminants/pfas/pfas-health-effects/` — spoke
7. `/your-water/contaminants/lead/` — contaminant
8. `/your-water/contaminants/hard-water/` — contaminant
9. `/your-water/well-water/` — hub
10. `/testing/` — hub
11. `/testing/best-water-test-kits/` — review
12. `/testing/best-mail-in-water-tests/` — review
13. `/treatment/` — hub
14. `/treatment/how-to-remove-pfas/` — howto
15. `/treatment/reverse-osmosis/best-under-sink-ro-systems/` — review
16. `/tools/` — hub (placeholder)
17. `/learn/` — hub (placeholder)
