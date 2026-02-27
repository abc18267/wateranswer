---
title: "Contaminant to Treatment Matrix"
description: "EPA treatability-inspired matrix linking common drinking water contaminants to practical household treatment approaches."
date: 2026-02-27
lastmod: 2026-02-27
primaryKeyword: "contaminant treatment matrix"
silo: "tools"
pageType: "tool"
layout: "tool"
affiliateDisclosure: false
showDisclaimer: false
quickLinks:
  - title: "Utility and ZIP Triage"
    description: "Start with system-level context before treatment."
    href: "/tools/water-system-lookup/"
  - title: "NSF Certification Checker"
    description: "Validate treatment claims before purchase."
    href: "/tools/nsf-certification-checker/"
  - title: "Mail-In Water Testing"
    description: "Confirm contaminant profile at tap level."
    href: "/testing/best-mail-in-water-tests/"
faq:
  - question: "Can one treatment handle every contaminant?"
    answer: "Usually no. Different contaminant classes require different mechanisms. Multi-barrier setups are common when risk profile is mixed."
  - question: "Should I trust this matrix without testing?"
    answer: "Use it to shortlist treatment options, then confirm with utility data and tap-level testing."
---

This matrix is inspired by EPA treatability logic and adapted for homeowner decisions.

<div id="treatment-matrix-tool" class="not-prose mt-6 mb-8 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
  <p class="text-sm font-semibold text-slate-900 mb-3">Interactive treatment matcher</p>
  <div class="grid gap-3 md:grid-cols-3">
    <select id="tm-contaminant" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
      <option value="">Select contaminant</option>
      <option value="PFAS">PFAS</option>
      <option value="Lead">Lead</option>
      <option value="Nitrates">Nitrates</option>
      <option value="Arsenic">Arsenic</option>
      <option value="Chromium-6">Chromium-6</option>
      <option value="THMs/VOCs">THMs/VOCs</option>
      <option value="Hardness">Hardness</option>
      <option value="Bacteria">Bacteria</option>
    </select>
    <select id="tm-goal" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
      <option value="">Select goal</option>
      <option value="drink">Drinking-water risk reduction</option>
      <option value="whole">Whole-home protection</option>
      <option value="both">Both</option>
    </select>
    <button id="tm-run" type="button" class="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">Match Treatment</button>
  </div>
  <div id="tm-result" class="hidden mt-4 rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900"></div>
</div>

## Treatment matrix

| Contaminant | Typical effective approach | Notes |
|---|---|---|
| PFAS | Reverse osmosis, high-quality activated carbon | Verify certification and replacement schedule |
| Lead | NSF 53/58 point-of-use filtration | Also evaluate service lines/plumbing source |
| Nitrates | Reverse osmosis or distillation | Standard carbon is not sufficient |
| Arsenic | RO or selective adsorptive media | Speciation and pH can affect performance |
| Chromium-6 | RO and selected adsorptive systems | Verify claim scope for Cr(VI) specifically |
| THMs/VOCs | Activated carbon | Often tied to disinfection chemistry |
| Hardness | Ion exchange softening | Scale control, not contaminant removal for drinking risk |
| Bacteria | Disinfection + source correction | UV/chlorination plus well/system remediation |

## How to use this intelligently

1. Identify likely contaminants from CCR, region profile, or well testing.
2. Use matrix to shortlist mechanisms.
3. Verify exact product certifications.
4. Re-test water after installation to confirm performance.

## Supporting references

- [EPA Treatability Database](https://tdb.epa.gov/)
- [How to remove PFAS](/treatment/how-to-remove-pfas/)
- [How to remove lead](/treatment/how-to-remove-lead-from-water/)
- [How to remove nitrates](/treatment/how-to-remove-nitrates-from-water/)
- [How to remove chromium-6](/treatment/how-to-remove-chromium-6-from-water/)
