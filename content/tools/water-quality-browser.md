---
title: "Water Quality Browser: State to System to Contaminant"
description: "Browse water quality context in four steps: state, city, utility system, and contaminant. Use this to narrow risk before testing or treatment."
date: 2026-02-27
lastmod: 2026-02-27
primaryKeyword: "water quality browser"
silo: "tools"
pageType: "tool"
layout: "tool"
affiliateDisclosure: false
showDisclaimer: false
quickLinks:
  - title: "Start with ZIP Lookup"
    description: "Identify likely utility context before browse drilldown."
    href: "/tools/water-system-lookup/"
  - title: "Read CCR Correctly"
    description: "Use this when utility data language is unclear."
    href: "/learn/how-to-read-water-quality-report/"
  - title: "Map Contaminant to Treatment"
    description: "Shortlist treatment mechanisms after you identify risk."
    href: "/tools/contaminant-treatment-matrix/"
faq:
  - question: "Why use a browse flow instead of jumping to filter products?"
    answer: "Because treatment only makes sense after you identify likely contaminant patterns in your location and utility system. The browse flow reduces wrong purchases."
  - question: "Can this flow replace a water test?"
    answer: "No. It prioritizes likely issues and next steps. Tap-level testing is still the confirmation step."
---

Use this WaterQ-style browse model to narrow your risk before buying tests or filters.

<div id="water-browser-tool" class="not-prose mt-6 mb-8 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
  <p class="text-sm font-semibold text-slate-900 mb-3">Interactive browser</p>
  <div class="grid gap-3 md:grid-cols-4">
    <select id="wb-state" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
      <option value="">Select state</option>
    </select>
    <select id="wb-city" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled>
      <option value="">Select city/region</option>
    </select>
    <select id="wb-system" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled>
      <option value="">Select system context</option>
    </select>
    <select id="wb-contaminant" class="rounded-lg border border-slate-300 px-3 py-2 text-sm" disabled>
      <option value="">Select contaminant</option>
    </select>
  </div>
  <div id="wb-result" class="hidden mt-4 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-900"></div>
</div>

## 1. Select state

- [California overview](/learn/california-drinking-water-quality/)
- [Florida overview](/learn/florida-drinking-water-quality/)
- [Texas overview](/learn/texas-drinking-water-quality/)
- [Michigan PFAS context](/learn/michigan-pfas-water-contamination/)

## 2. Choose city or region

- [Midwest nitrate regions](/learn/midwest-nitrates-well-water/)
- [New England arsenic regions](/learn/new-england-arsenic-well-water/)
- [Arizona hardness context](/learn/arizona-hard-water-treatment/)
- [NYC utility profile](/learn/nyc-tap-water-quality/)

## 3. Confirm your water system

1. Pull utility name from your water bill.
2. Open your latest CCR and confirm system name.
3. Check violation notices and trend lines, not just one-year values.

Use: [How to read your water quality report](/learn/how-to-read-water-quality-report/)

## 4. Triage contaminant and action path

- PFAS: [contaminant hub](/your-water/contaminants/pfas/) -> [treatment options](/treatment/how-to-remove-pfas/)
- Lead: [contaminant hub](/your-water/contaminants/lead/) -> [treatment options](/treatment/how-to-remove-lead-from-water/)
- Nitrates: [contaminant hub](/your-water/contaminants/nitrates/) -> [treatment options](/treatment/how-to-remove-nitrates-from-water/)
- Chromium-6: [contaminant hub](/your-water/contaminants/chromium-6/) -> [treatment options](/treatment/how-to-remove-chromium-6-from-water/)

## Validate before you act

- Confirm utility-level context via [EPA CCR Directory](https://www.epa.gov/ccr)
- Compare health framing via [EWG Tap Water Database](https://www.ewg.org/tapwater/)
- Validate product claims through [NSF Certified Listings](https://info.nsf.org/Certified/DWTU/)
