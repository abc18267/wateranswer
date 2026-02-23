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
- `/tools/` — resource hub (external tools, reference tables, filter decision guide)
- `/learn/` — reference hub (NSF explainer, CCR guide, MCL explainer)
- `/about` — editorial credibility / E-E-A-T page
- `/review-policy` — FTC affiliate disclosure and editorial standards

## spokeCards pattern (learned 2026-02-22)
- Hub pages use `spokeCards:` frontmatter array to render a card grid via `spoke-grid.html`
- Format: `- title:`, `description:`, `href:`, optional `badge:`
- Optional `spokeHeading:` sets the H2 above the grid
- Without spokeCards, spoke pages under a hub are invisible to users browsing the hub
- Every hub and contaminant hub should have spokeCards set. Check before adding new spokes.
- The `spoke-grid.html` partial checks `{{ if .Params.spokeCards }}` — no spokeCards = no grid, no error

## Nav rules (learned 2026-02-22)
- Never add a nav link to a section that doesn't have a working _index.md
- Primary nav (desktop): 5 items max before it crowds on medium screens
- More dropdown: working links only — broken links in a dropdown destroy trust faster than a missing link
- Current primary nav: Your Water, Well Water, Testing, Filters & Treatment, Learn
- Current More dropdown: Tools & Resources, About, Review Policy

## Content live (as of 2026-02-23)
136 pages total (17 original + 54 added 2026-02-22 + 79 added 2026-02-23 + 5 added 2026-02-22 UX pass = ~136 Hugo output pages):

### Original 17
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

### Added 2026-02-22 (32 pages)

**Your-water contaminants (10 new):**
18. `/your-water/contaminants/iron/` — contaminant
19. `/your-water/contaminants/nitrates/` — contaminant (emergency callout, showDisclaimer: true)
20. `/your-water/contaminants/microplastics/` — contaminant (showDisclaimer: true)
21. `/your-water/contaminants/hydrogen-sulfide/` — contaminant
22. `/your-water/contaminants/fluoride/` — contaminant (policy-neutral)
23. `/your-water/contaminants/arsenic/` — contaminant (showDisclaimer: true, geographic risk)
24. `/your-water/contaminants/bacteria/` — contaminant (emergency callout, showDisclaimer: true)
25. `/your-water/contaminants/manganese/` — contaminant (showDisclaimer: true, infant advisory)
26. `/your-water/contaminants/thms/` — contaminant (showDisclaimer: true, municipal only)
27. `/your-water/contaminants/chloramines/` — contaminant (showDisclaimer: true, lead connection cited)
28. `/your-water/contaminants/vocs/` — contaminant (showDisclaimer: true)
29. `/your-water/contaminants/radon/` — contaminant (showDisclaimer: true, inhalation > ingestion)
30. `/your-water/contaminants/chromium-6/` — contaminant (showDisclaimer: true, CA MCL 10ppb)

**Lead spokes (3 new):**
31. `/your-water/contaminants/lead/lead-service-lines/` — spoke
32. `/your-water/contaminants/lead/lead-in-tap-water-apartment/` — spoke
33. `/your-water/contaminants/lead/how-to-test-for-lead/` — spoke

**Well water spokes (2 new):**
34. `/your-water/well-water/well-water-testing-guide/` — spoke
35. `/your-water/well-water/test-well-after-flood/` — spoke (emergency callout)

**Treatment howtos (3 new):**
36. `/treatment/how-to-remove-iron-from-well-water/` — howto
37. `/treatment/how-to-remove-arsenic-from-water/` — howto
38. `/treatment/how-to-remove-fluoride/` — howto

**Treatment reviews (5 new):**
39. `/treatment/best-iron-filters-well-water/` — review
40. `/treatment/reverse-osmosis/best-countertop-ro-systems/` — review
41. `/treatment/best-pitcher-water-filters/` — review (Clearly Filtered > ZeroWater > Brita)
42. `/treatment/best-uv-water-purifiers/` — review (NSF 55 Class A required)
43. `/treatment/best-shower-filters/` — review (chloramine liability handled)
44. `/treatment/best-whole-house-water-filters/` — review

**Treatment informational (1 new):**
45. `/treatment/water-softener-vs-salt-free-conditioner/` — spoke

**Learn silo (2 new):**
46. `/learn/how-to-read-water-quality-report/` — spoke
47. `/learn/epa-mcl-vs-mclg-explained/` — spoke

### Added 2026-02-22 UX pass (5 pages)

**E-E-A-T / structural pages:**
48. `/about` — spoke (editorial credibility, who we are, how content is sourced)
49. `/review-policy` — spoke (FTC disclosure, product selection criteria, NSF cert requirement)

**Learn silo:**
50. `/learn/nsf-certification-standards-explained/` — spoke (NSF 42/53/58/401/55/177 explained)

**Treatment informational:**
51. `/treatment/what-water-filter-do-i-need/` — spoke (contaminant-to-NSF-standard decision guide)
52. `/treatment/when-to-replace-water-filter/` — spoke (replacement schedules by filter type)

### Added 2026-02-23 (79 pages)

**Symptom/diagnostic pages (9):**
53. `/your-water/brown-water-from-tap` — spoke
54. `/your-water/water-tastes-like-chlorine` — spoke
55. `/your-water/metallic-taste-in-water` — spoke (showDisclaimer: true, lead angle)
56. `/your-water/hot-water-smells-like-rotten-eggs` — spoke
57. `/your-water/white-residue-on-dishes` — spoke
58. `/your-water/orange-stains-toilet-sink` — spoke
59. `/your-water/blue-green-stains-copper-pipes` — spoke (showDisclaimer: true, copper/pH)
60. `/your-water/musty-smell-water` — spoke
61. `/your-water/slippery-water-after-softener` — spoke

**Demographic pages (8):**
62. `/treatment/water-filter-for-renters` — spoke (affiliateDisclosure: true)
63. `/treatment/best-portable-water-filter-camping` — review (affiliateDisclosure: true)
64. `/learn/tap-water-baby-formula-safety` — spoke (showDisclaimer: true, emergency callout)
65. `/learn/drinking-water-pregnancy` — spoke (showDisclaimer: true)
66. `/learn/water-safety-pets-dogs-cats` — spoke
67. `/learn/distilled-water-cpap-humidifier` — spoke (showDisclaimer: true)
68. `/learn/water-for-aquarium-fish-tank` — spoke
69. `/learn/drinking-water-kidney-disease` — spoke (showDisclaimer: true)

**Brand reviews (14):**
70. `/treatment/berkey-water-filter-review` — review
71. `/treatment/aquatru-countertop-review` — review
72. `/treatment/waterdrop-water-filter-review` — review
73. `/treatment/ispring-water-filter-review` — review
74. `/treatment/aquasana-water-filter-systems-review` — review
75. `/treatment/brita-water-filter-review` — review
76. `/treatment/pur-faucet-water-filter-review` — review
77. `/treatment/clearly-filtered-pitcher-review` — review
78. `/treatment/zerowater-pitcher-review` — review
79. `/treatment/best-refrigerator-water-filters` — review
80. `/treatment/best-water-softener-brands` — review
81. `/treatment/best-faucet-water-filters` — review
82. `/treatment/best-under-sink-water-filters` — review
83. `/treatment/best-gravity-water-filters` — review

**Comparison pages (8):**
84. `/treatment/pitcher-vs-under-sink-water-filter` — spoke (affiliateDisclosure: true)
85. `/treatment/reverse-osmosis-vs-distillation` — spoke
86. `/treatment/whole-house-vs-point-of-use-filter` — spoke (affiliateDisclosure: true)
87. `/treatment/faucet-filter-vs-pitcher-water-filter` — spoke (affiliateDisclosure: true)
88. `/treatment/uv-purifier-vs-reverse-osmosis` — spoke
89. `/treatment/water-softener-vs-reverse-osmosis-hard-water` — spoke
90. `/treatment/berkey-vs-aquatru` — spoke (affiliateDisclosure: true)
91. `/treatment/brita-vs-clearly-filtered-vs-zerowater` — spoke (affiliateDisclosure: true)

**Hard water spokes (7):**
92. `/your-water/contaminants/hard-water/hard-water-skin-effects` — spoke
93. `/your-water/contaminants/hard-water/hard-water-hair-damage` — spoke
94. `/your-water/contaminants/hard-water/hard-water-appliance-damage` — spoke
95. `/your-water/contaminants/hard-water/water-hardness-levels-by-state` — spoke
96. `/your-water/contaminants/hard-water/how-water-softener-works` — spoke
97. `/your-water/contaminants/hard-water/is-softened-water-safe-to-drink` — spoke
98. `/your-water/contaminants/hard-water/descale-water-heater` — spoke

**Well water spokes (8):**
99. `/your-water/well-water/how-often-test-well-water` — spoke
100. `/your-water/well-water/brown-well-water-causes` — spoke
101. `/your-water/well-water/how-to-shock-chlorinate-well` — spoke (showDisclaimer: true)
102. `/your-water/well-water/well-water-low-pressure-causes` — spoke
103. `/your-water/well-water/well-water-tds-levels` — spoke
104. `/your-water/well-water/treating-hard-well-water` — spoke
105. `/your-water/well-water/new-well-what-to-test-for` — spoke (showDisclaimer: true)
106. `/your-water/well-water/private-well-water-epa-guidelines` — spoke

**How-to guides (7):**
107. `/treatment/how-to-install-reverse-osmosis-under-sink` — howto (affiliateDisclosure: true)
108. `/testing/how-to-test-water-hardness-at-home` — howto
109. `/treatment/how-to-clean-water-softener` — howto
110. `/treatment/how-to-change-refrigerator-water-filter` — howto
111. `/treatment/how-to-remove-chlorine-from-tap-water` — howto
112. `/treatment/how-to-reduce-tds-drinking-water` — howto (affiliateDisclosure: true)
113. `/treatment/how-to-filter-microplastics-water` — howto (showDisclaimer: true)

**Testing deep-dives (5):**
114. `/testing/how-to-test-water-at-home` — spoke
115. `/testing/what-is-tds-in-water` — spoke
116. `/testing/how-to-read-water-test-results` — spoke
117. `/testing/get-free-water-test-from-utility` — spoke
118. `/testing/water-testing-renters-apartment` — spoke (affiliateDisclosure: true)

**Location pages (8):**
119. `/learn/california-drinking-water-quality` — spoke (showDisclaimer: true)
120. `/learn/florida-drinking-water-quality` — spoke (showDisclaimer: true)
121. `/learn/texas-drinking-water-quality` — spoke (showDisclaimer: true)
122. `/learn/michigan-pfas-water-contamination` — spoke (showDisclaimer: true)
123. `/learn/midwest-nitrates-well-water` — spoke (showDisclaimer: true, emergency callout)
124. `/learn/new-england-arsenic-well-water` — spoke (showDisclaimer: true)
125. `/learn/arizona-hard-water-treatment` — spoke
126. `/learn/nyc-tap-water-quality` — spoke

**Emerging topics (5):**
127. `/learn/states-reducing-fluoride-water` — spoke (policy-neutral)
128. `/learn/epa-pfas-drinking-water-rule-2024` — spoke (showDisclaimer: true)
129. `/your-water/contaminants/pfas/pfoa-vs-pfos` — spoke (showDisclaimer: true)
130. `/your-water/contaminants/microplastics/bottled-water-microplastics` — spoke (showDisclaimer: true)
131. `/learn/does-boiling-water-remove-contaminants` — spoke (showDisclaimer: true, emergency callout)

**Appliance pages (4):**
132. `/treatment/refrigerator-water-filter-what-removes` — spoke
133. `/treatment/best-inline-water-filter-ice-maker` — review (affiliateDisclosure: true)
134. `/learn/humidifier-distilled-vs-filtered-water` — spoke
135. `/treatment/best-water-filter-for-coffee-scale` — spoke (affiliateDisclosure: true)

---

## Parallel Agent Content Writing (learned 2026-02-23)

### Strategy that works
- 15 background agents x 3-9 articles each = 79 pages in ~7 minutes of clock time
- Each agent gets: exact file paths, full front matter specs, word count targets, source URLs, style rules, and a post-write verification checklist
- Agents self-verify: `python3 -c "..."` em-dash check + `grep -r ";" file | grep "answer:"` semicolon check

### Em-dash cleanup (run after every batch)
Even with explicit style rules, ~60% of agent-written files have em dashes. Run this after every write session before committing:
```python
import pathlib
for f in pathlib.Path('content').rglob('*.md'):
    t = f.read_text()
    fixed = t.replace(' \u2014 ', ', ').replace('\u2014', ', ').replace(' \u2013 ', ', ').replace('\u2013', ', ')
    if fixed != t:
        f.write_text(fixed)
```

### Hub spokeCards: update in final pass
More efficient to update all hub spokeCards in one pass after all agents complete, not per-agent. Hubs updated 2026-02-23: hard-water, well-water, testing, treatment, learn.

---

## Content Expansion Plan (researched 2026-02-22)

### Key findings from research
- Biggest gap: zero coverage of iron, manganese, sulfur smell, nitrates, bacteria — the most-searched well water topics
- Fastest-rising city water topics: microplastics, fluoride (surging due to state-level bans in 2025 and RFK Jr. announcements)
- Highest affiliate AOV: well water treatment systems ($600–$2,000+) — SpringWell, Aquasana, Crystal Quest
- Critical YMYL pages needing emergency callouts: nitrates (infant blue baby syndrome), bacteria (immunocompromised)

### Authoritative sources to cite
- EPA National Primary Drinking Water Regulations: https://www.epa.gov/ground-water-and-drinking-water/national-primary-drinking-water-regulations
- EPA Private Wells: https://www.epa.gov/privatewells
- EPA Potential Well Water Contaminants: https://www.epa.gov/privatewells/potential-well-water-contaminants-and-their-impacts
- CDC Chlorine/Chloramine: https://www.cdc.gov/drinking-water/about/about-water-disinfection-with-chlorine-and-chloramine.html
- CDC How to Read CCR: https://www.cdc.gov/drinking-water/about/how-to-read-drinking-water-quality-reports.html
- USGS NAWQA: https://www.usgs.gov/mission-areas/water-resources/science/national-water-quality-assessment-nawqa
- USGS Arsenic: https://www.usgs.gov/mission-areas/water-resources/science/arsenic-and-drinking-water
- USGS Domestic Wells: https://www.usgs.gov/mission-areas/water-resources/science/domestic-private-supply-wells
- EWG Tap Water Database: https://www.ewg.org/tapwater/
- EWG Standards: https://www.ewg.org/tapwater/ewg-standards.php
- MyTapWater.org (zip code lookup): https://mytapwater.org/
- PMC Blue Babies / Nitrates: https://pmc.ncbi.nlm.nih.gov/articles/PMC1638204/
- PMC Chloramine + Blood Lead (2007): https://pmc.ncbi.nlm.nih.gov/articles/PMC1817676/
- PMC Microplastics in Drinking Water: https://pmc.ncbi.nlm.nih.gov/articles/PMC12474263/
- Nature npj Clean Water — Microplastic Removal (2025): https://www.nature.com/articles/s41545-025-00531-w

### NSF certification standards (include in every product review)
- NSF/ANSI 42 — aesthetic contaminants (chlorine, taste, odor)
- NSF/ANSI 53 — health effects (lead, cysts, VOCs)
- NSF/ANSI 58 — reverse osmosis (PFAS, arsenic, nitrates, fluoride)
- NSF/ANSI 401 — emerging contaminants (pharmaceuticals, pesticides)
- NSF/ANSI 55 — UV systems (Class A = purification, Class B = supplemental only)
- NSF/ANSI 177 — shower filtration

### Liability rules (water-specific, on top of global YMYL rules)
- Never say a filter "eliminates" a contaminant. Say "reduces" or "reduces by up to X% per NSF testing."
- Never say water is "safe" after filtration. Say "reduces X below EPA limits" or cite NSF-tested reduction rates.
- Nitrates page: 911 emergency callout ABOVE THE FOLD — infant blue baby syndrome can be fatal.
- Bacteria page: emergency callout for immunocompromised readers above the fold.
- Manganese: has a health advisory (0.3 mg/L lifetime, 0.1 mg/L for infants). showDisclaimer: true. YMYL language required.
- Microplastics: causation NOT established. The 2024 NEJM study showed association only. Write: "researchers found an association" not "causes heart disease."
- Chloramines: do NOT claim shower filters remove chloramines unless NSF/ANSI 177 certified for it. Most use calcium sulfite (chlorine only).
- Fluoride: don't take a political stance. Present EPA MCL (4.0 mg/L), SMCL (2.0 mg/L), HHS recommendation (0.7 mg/L) as separate numbers with separate purposes.
- Alkaline water: never claim health benefits. Active FTC scrutiny. No peer-reviewed clinical evidence.
- Shower filters: verify chloramine removal claim against NSF documentation before repeating it.
- Never publish fabricated removal percentages. Cite NSF certificate or manufacturer's documented lab testing.
- Add "Test your water before choosing treatment — source water varies by region and well" to every treatment page.

### Affiliate programs to join before Phase 1 goes live
- SpringWell: https://www.springwellwater.com/affiliate-program/ — iron filters, whole house, UV ($800–$2,000 AOV)
- Aquasana — well water combo systems, UV add-ons
- Crystal Quest: https://crystalquest.com/pages/digital-affiliate — 15% commission, broad catalog
- Waterdrop — countertop RO, under-sink, pitcher filters
- Amazon Associates — pitcher filters, test kits, shower filters (lower AOV)

---

### Phase 1 — Build next (8 pages)

**P1-1: Iron in Well Water**
- Path: `/your-water/contaminants/iron/`
- Layout: contaminant | showDisclaimer: false (aesthetic issue, not health)
- Keyword: iron in well water
- Angle: symptom-driven (orange staining, metallic taste, slime). Explain 3 forms: ferrous (dissolved), ferric (particulate), iron bacteria. Treatment differs by form.
- EPA Secondary MCL: 0.3 mg/L (aesthetic only, not health-based)
- Do NOT conflate with manganese on this page. Manganese has actual health advisory.

**P1-2: Nitrates in Well Water**
- Path: `/your-water/contaminants/nitrates/`
- Layout: contaminant | showDisclaimer: true
- Keyword: nitrates in well water
- REQUIRED: 911 emergency callout at the very top (above fold). Infants under 12 months — bluish skin, rapid breathing, unusual fatigue after well water = call 911.
- Key fact: boiling concentrates nitrates. Never boil to "fix" nitrates.
- EPA MCL: 10 mg/L. MCLG: 10 mg/L. Source: PMC blue baby study.
- Geographic focus: Iowa, Illinois, Indiana, Nebraska, Kansas (agricultural runoff)

**P1-3: Microplastics in Drinking Water**
- Path: `/your-water/contaminants/microplastics/`
- Layout: contaminant | showDisclaimer: true
- Keyword: microplastics in drinking water
- Lead with counterintuitive stat: bottled water ~90,000 microplastics/year vs tap ~4,000/year
- Causation NOT established. NEJM 2024 = association only. Frame carefully.
- No EPA MCL. EPA in research mode.
- Cite: Nature npj 2025 study, PMC microplastics review, 2024 boiling study (China, Science Alert)

**P1-4: Hydrogen Sulfide (Rotten Egg Smell)**
- Path: `/your-water/contaminants/hydrogen-sulfide/`
- Layout: contaminant | showDisclaimer: false (aesthetic issue)
- Keyword: rotten egg smell well water
- Angle: Start direct — "If your water smells like rotten eggs, you have hydrogen sulfide."
- Key angle most sites miss: if ONLY hot water smells (not cold), the source is the water heater anode rod, not the well.
- No EPA MCL. Secondary aesthetic standard only. Low liability page.

**P1-5: Complete Well Water Testing Guide**
- Path: `/your-water/well-water/well-water-testing-guide/`
- Layout: spoke (under well-water hub)
- Keyword: how to test well water
- Covers: what to test for, when, how often, how to find a certified lab (link EPA locator), what results mean, when to retest
- High internal linking hub for the whole well water silo
- No affiliate disclosure needed (informational). Link to testing review pages.

**P1-6: Fluoride in Drinking Water**
- Path: `/your-water/contaminants/fluoride/`
- Layout: contaminant | showDisclaimer: false (neutral information page)
- Keyword: fluoride in drinking water
- Do NOT take a political stance. Present three numbers with three different purposes:
  - EPA MCL: 4.0 mg/L (prevents skeletal fluorosis)
  - EPA SMCL: 2.0 mg/L (prevents dental fluorosis)
  - HHS recommended level for fluoridation: 0.7 mg/L
- Natural fluoride above 4.0 mg/L is a real well water risk in parts of Southwest and Appalachia.
- What removes it: RO (NSF/ANSI 58), activated alumina, bone char. NOT standard carbon/Brita.

**P1-7: How to Remove Iron from Well Water**
- Path: `/treatment/how-to-remove-iron-from-well-water/`
- Layout: howto | affiliateDisclosure: true
- Keyword: how to remove iron from well water
- Decision tree by iron type. Ferrous = oxidizing filter (air injection, greensand). Ferric = sediment filter. Iron bacteria = shock chlorination first, then filtration.
- Link to iron filter review (P1-8).

**P1-8: Best Iron Filters for Well Water**
- Path: `/treatment/best-iron-filters-well-water/`
- Layout: review | affiliateDisclosure: true
- Keyword: best iron filter for well water
- Products: SpringWell WS, Aquasana Whole House Well Water, Kind Water AIO, Pelican Iron+Manganese
- AOV: $600–$1,800. Join SpringWell and Aquasana affiliate programs before publishing.
- Only cite removal rates that are NSF-certified or documented by manufacturer lab testing.

---

### Phase 2 — Build after Phase 1 (10 pages)

| # | Path | Layout | Keyword | Notes |
|---|------|--------|---------|-------|
| 2-1 | `/your-water/contaminants/arsenic/` | contaminant | arsenic in well water | USGS county mapping. Maine, NH, AZ, NV hotspots. MCLG = 0, MCL = 10 ppb. RO (NSF 58) + activated alumina. showDisclaimer: true |
| 2-2 | `/your-water/contaminants/chloramines/` | contaminant | chloramines in drinking water | Municipal only. Cite PMC 2007 study — chloramine + lead pipe = higher blood lead in kids. Standard carbon doesn't fully remove; catalytic carbon or vitamin C needed. showDisclaimer: true |
| 2-3 | `/your-water/contaminants/bacteria/` | contaminant | bacteria in well water | 911 callout at top (immunocompromised risk). Seasonal: flooding angle. UV disinfection = clean recommendation. showDisclaimer: true |
| 2-4 | `/your-water/contaminants/manganese/` | contaminant | manganese in well water | Health advisory: 0.3 mg/L lifetime, 0.1 mg/L for infants. Neurological effects in children documented. showDisclaimer: true. Do not minimize as merely aesthetic. |
| 2-5 | `/your-water/contaminants/thms/` | contaminant | trihalomethanes drinking water | Municipal only. Forms when chlorine meets organic matter. Bladder cancer link (cite studies). EWG data: Texas, PA, NY highest levels. showDisclaimer: true |
| 2-6 | `/treatment/reverse-osmosis/best-countertop-ro-systems/` | review | best countertop reverse osmosis system | Fast-growing segment. AquaTru Carafe, Waterdrop A1 are top performers. affiliateDisclosure: true |
| 2-7 | `/treatment/best-pitcher-water-filters/` | review | brita vs zerowater vs clearly filtered | Hierarchy: Clearly Filtered (most contaminants, incl. PFAS+fluoride) > ZeroWater (all dissolved solids, short 45-gal filter) > Brita (taste/chlorine only). Be honest about Brita's limits. affiliateDisclosure: true |
| 2-8 | `/treatment/water-softener-vs-salt-free-conditioner/` | spoke | water softener vs salt free conditioner | Key fact: salt-free conditioners don't actually lower hardness (TDS). They change mineral structure. Strong editorial take. Converts well. |
| 2-9 | `/learn/how-to-read-water-quality-report/` | spoke | how to read consumer confidence report | E-E-A-T builder. CCRs are dense — translate to homeowner language. Link to EWG and MyTapWater.org for zip code lookups. |
| 2-10 | `/treatment/how-to-remove-arsenic-from-water/` | howto | how to remove arsenic from drinking water | RO (NSF 58) is primary. Activated alumina works. Standard carbon doesn't. Geographic angle — western US well owners. affiliateDisclosure: true |

---

### Phase 3 — Long tail + seasonal (9 pages)

| Path | Layout | Notes |
|------|--------|-------|
| `/your-water/contaminants/vocs/` | contaminant | USGS: VOCs in 65% of domestic well samples. Benzene MCLG = 0. Activated carbon primary treatment. showDisclaimer: true |
| `/your-water/contaminants/chromium-6/` | contaminant | No federal MCL for Cr-6 specifically. CA adopted 10 ppb April 2024. Erin Brockovich angle. showDisclaimer: true |
| `/your-water/contaminants/radon/` | contaminant | 89% of radon health risk from inhalation during showers, NOT drinking. Northeast/granite bedrock focus. showDisclaimer: true |
| `/your-water/well-water/test-well-after-flood/` | spoke | Seasonal. Publish May (spring floods), update September (hurricane season). Hurricane Helene 2024: 40% of tested wells showed contamination. |
| `/treatment/best-uv-water-purifiers/` | review | NSF 55 Class A = purification. Class B = supplemental only. Always pair with sediment + carbon pre-filtration. affiliateDisclosure: true |
| `/treatment/best-shower-filters/` | review | Chloramine removal: verify NSF/ANSI 177 cert per product. Most use calcium sulfite (chlorine only). KDF-55 and vitamin C work for chloramine. Never claim chloramine removal without documentation. affiliateDisclosure: true |
| `/treatment/best-whole-house-water-filters/` | review | High-effort, high-reward. $600–$2,000 AOV. Build after establishing authority in well water space. affiliateDisclosure: true |
| `/treatment/how-to-remove-fluoride/` | howto | Pair with fluoride contaminant page. RO (NSF 58), activated alumina, bone char work. Standard carbon does NOT. affiliateDisclosure: true |
| `/learn/epa-mcl-vs-mclg-explained/` | spoke | E-E-A-T authority page. Explains why EWG standards differ from EPA MCLs. Most sites get this wrong or skip it entirely. |

---

### Structural fixes completed (2026-02-22 UX pass)
- ✅ Lead hub: spokeCards added for 3 spoke pages
- ✅ PFAS hub: spokeCards added, duplicate markdown list removed
- ✅ Your Water hub: spokeCards added (6 contaminants surfaced), "Related Topics" list removed
- ✅ Treatment hub: spokeCards added (6 key pages)
- ✅ Learn hub: "coming soon" replaced with real content + spokeCards
- ✅ Tools hub: "coming soon" replaced with resource page + reference tables
- ✅ Nav: 7 broken links removed, Well Water added to primary nav
- ✅ Homepage: 3 broken silo cards replaced with Well Water, Learn, Tools
- ✅ Hard water: broken softener link fixed → /treatment/water-softener-vs-salt-free-conditioner
- ✅ Footer: About, NSF explainer, CCR guide links added

### Structural fixes completed (2026-02-23 content expansion)
- ✅ Hard-water hub: spokeCards added for all 7 new hard water spokes
- ✅ Well-water hub: spokeCards added for 10 well water spokes (including 2 from Phase 1)
- ✅ Testing hub: spokeCards added for 8 testing pages (6 new)
- ✅ Treatment hub: expanded spokeCards from 6 to 12 (whole-house, UV, countertop RO, renters, camping, salt-free)
- ✅ Learn hub: expanded spokeCards from 3 to 11 (baby formula, pregnancy, pets, CPAP, kidney, boiling, PFAS rule, fluoride states)
- ✅ docs/learnings.md created with session notes

### Structural work still needed
- Author/reviewer bio page — highest priority E-E-A-T gap. One named reviewer with credentials satisfies Google SQRG for all YMYL pages.
- Article schema (JSON-LD) not yet implemented on content pages — only WebSite schema on homepage
- `contaminant.html` layout: emergency callouts hardcoded inline in markdown. Consider `emergencyCallout:` frontmatter field + partial.
- Location pages under `/learn/` — if state content grows past 10 pages, consider `/your-water/by-state/` subsilo
- Affiliate links: all review pages use placeholder `[Check current pricing](#)` — need real URLs before monetizing. Priority: SpringWell, Aquasana, Clearly Filtered, AquaTru, Amazon Associates.
- Your Water hub: only surfaces 6 contaminants. 13 contaminant pages now exist. Consider alphabetical index or expanding grid.
