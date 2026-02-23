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
49 pages total (17 original + 32 added 2026-02-22):

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

### Structural fixes needed
- Lead contaminant page needs spokes: `/lead/lead-service-lines/`, `/lead/lead-in-tap-water-apartment/`, `/lead/how-to-test-for-lead/`
- Hard water page needs spokes: at minimum a water softener review link and a salt-free conditioner comparison
- Well-water hub (`/your-water/well-water/`) needs spokeCards updated as Phase 1 spokes are added
- Activate /learn/ silo with 2-9 (CCR guide) and Phase 3 MCL explainer
- After Phase 1: check whether `contaminant.html` layout supports a top-of-page emergency callout block separate from the standard blue disclaimer box. May need a new partial.
