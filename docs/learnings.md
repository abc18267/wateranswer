# WaterAnswer Learnings

## 2026-02-27: Lookup workflow integration + tools UX system

### What worked well

**Build integrations as reusable primitives, not page-specific HTML**
- A shared partial for ZIP intake (`layouts/partials/zip-lookup-form.html`) removed duplicated markup and made homepage + lookup behavior consistent.
- Moving the lookup experience to a dedicated layout (`layouts/_default/waterlookup.html`) made it easier to evolve without bloating markdown content files.

**Task-first architecture scales better than topic-only navigation**
- Adding a persistent "Find My Water" nav entry and task cards on the homepage improved discoverability of high-intent flows.
- New tools pages (browser, well action plan, NSF checker, treatment matrix) integrate cleanly when linked as "next-step" modules from the lookup page and tools hub.

**Front matter-driven UX polish is low-maintenance**
- Adding `quickLinks` arrays in tool content and rendering them in `tool.html` gives each page useful action cards without custom template branches.
- Shared shell styling in `tool.html` + CSS creates visual consistency across all tools with minimal per-page effort.

### Bugs/regressions caught and fixed

**Geolocation submission trap**
- Initial bug: geolocation flow could fail when reverse-geocoding didn't return ZIP, because ZIP input remained required.
- Fix: allow geolocation-only submission (`lat/lon`) when ZIP is unavailable, while keeping strict ZIP validation for manual form usage.
- Location: `layouts/partials/scripts.html` (lookup form wiring block).

**Placeholder links in content**
- Many pages still contained `[...](#)` placeholders.
- Mitigation: render hook converts `href="#"` to non-clickable text span to avoid broken-page behavior.
- Location: `layouts/_default/_markup/render-link.html`.

### Validation workflow that proved reliable

- Run build with local cache dir to avoid sandbox cache permission failures:
  - `hugo --gc --minify --cacheDir /tmp/hugo_cache`
- Run local broken-link scan across generated `public/` after major nav/content changes.
- Check heading structure after layout edits:
  - `MISSING_H1 0`, `MULTI_H1 0` should hold.
- Verify no `href="#"` remains in generated output.

### Content/UX integration patterns to keep using

- Keep tool pages action-oriented:
  - header with purpose,
  - quick-action cards,
  - main workflow body,
  - FAQ schema block.
- Prefer contextual "next-step" links between tools over isolated one-off pages.
- For location workflows, always present a confidence caveat:
  - ZIP/address are triage inputs, not compliance determinations.

## 2026-02-23: Phase 2 content expansion (79 new pages)

### What worked well

**Parallel agent strategy**
15 background agents writing 79 pages finished in roughly 7 minutes of clock time. Each batch got a detailed prompt with exact front matter specs, word count targets, NSF/EPA source requirements, and style rules. Agents self-verified with Python em-dash/semicolon checks before returning.

**Content categories written:**
- 9 symptom/diagnostic pages (brown water, rotten egg smell, metallic taste, etc.)
- 8 demographic pages (renters, baby formula, pregnancy, pets, CPAP, aquarium, kidney disease, camping)
- 14 brand review pages (Berkey, AquaTru, Waterdrop, iSpring, Aquasana, Brita, PUR, Clearly Filtered, ZeroWater, plus 5 best-of reviews)
- 8 comparison pages (pitcher vs under-sink, RO vs distillation, softener vs RO, etc.)
- 7 hard water spoke pages
- 8 well water spoke pages (+ 2 from previous session = 10 total)
- 7 how-to guides
- 5 testing deep-dives
- 8 location pages (CA, FL, TX, MI, Midwest nitrates, New England arsenic, AZ hard water, NYC)
- 5 emerging topics (PFAS rule, fluoride state bans, pfoa vs pfos, bottled water microplastics, boiling)
- 4 appliance pages (refrigerator filter, ice maker inline, humidifier, coffee)

**Total site pages: ~136 (from 17 original)**

**Hub spokeCards pattern**
Every hub needs spokeCards updated after adding new spokes. Doing this in a final pass (rather than per-agent) was more efficient. Updated: hard-water hub, well-water hub, testing hub, treatment hub, learn hub.

### What to improve next time

**Em dash cleanup**
Even with explicit style rules, roughly 60% of agent-written files needed em dash cleanup. Run the global Python replace after every content batch, not just per-agent. Script:
```python
import pathlib
for f in pathlib.Path('content').rglob('*.md'):
    t = f.read_text()
    fixed = t.replace(' \u2014 ', ', ').replace('\u2014', ', ').replace(' \u2013 ', ', ').replace('\u2013', ', ')
    if fixed != t:
        f.write_text(fixed)
```

**Semicolons in YAML FAQ answers**
Semicolons in YAML values don't break the build, but they violate the no-semicolons style rule. Worth adding to the post-write verification: `grep -r ";" content/ | grep "answer:"`.

**Affiliate links**
All review pages use placeholder `[Check current pricing](#)` hrefs. Before publishing to production, replace with actual affiliate links. Priority order: SpringWell, Aquasana, Clearly Filtered, AquaTru, Amazon Associates.

**Hub architecture**
The your-water hub still only surfaces 6 contaminants in spokeCards. After Phase 2, there are 13 contaminant pages total. Consider a 2-column grid or alphabetical index for the full contaminant list.

**Location pages**
8 location pages live under /learn/ — not ideal for SEO. Consider a /your-water/by-state/ subsilo for Phase 3 expansion if state-specific content grows beyond 10 pages.

**E-E-A-T gap**
Author/reviewer bio page still needed. One named reviewer with credentials linking back to a bio page satisfies Google SQRG for YMYL. This is the highest-priority structural item before doing any link outreach.

### Liability patterns that held up

- Microplastics: consistently framed as "researchers found an association" not "causes" — the 2024 NEJM study was cited correctly across all agents
- Nitrates: emergency blockquote callout at top of every article that mentions infants and nitrates
- Boiling: every boiling page correctly states it doesn't remove lead, nitrates, or PFAS
- Fluoride: presented three numbers with three different purposes — EPA MCL (4.0), SMCL (2.0), HHS recommendation (0.7) — no political stance taken
- Shower filters/chloramines: agents consistently avoided claiming chloramine removal without NSF 177 documentation
