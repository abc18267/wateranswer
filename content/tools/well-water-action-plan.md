---
title: "Private Well Water Action Plan"
description: "CDC and EPA-inspired well testing action plan: what to test, when to test, and what to do after abnormal results."
date: 2026-02-27
lastmod: 2026-02-27
primaryKeyword: "well water action plan"
silo: "tools"
pageType: "tool"
layout: "tool"
affiliateDisclosure: false
showDisclaimer: false
quickLinks:
  - title: "Well Testing Guide"
    description: "Deep guide for panel selection and interpretation."
    href: "/your-water/well-water/well-water-testing-guide/"
  - title: "After Flood Checklist"
    description: "Immediate post-flood testing sequence."
    href: "/your-water/well-water/test-well-after-flood/"
  - title: "Treatment Matrix"
    description: "Match abnormal results to treatment mechanism."
    href: "/tools/contaminant-treatment-matrix/"
faq:
  - question: "How often should private well owners test water?"
    answer: "At minimum once per year for core indicators, plus event-based testing after flooding, repairs, or sudden taste/odor changes."
  - question: "What are high-priority contaminants for private wells?"
    answer: "Coliform/E. coli, nitrates, and region-specific metals (such as arsenic or manganese) are common first priorities."
---

Private wells are not regulated like public utilities. Use this as a simple action checklist.

<div id="well-action-tool" class="not-prose mt-6 mb-8 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
  <p class="text-sm font-semibold text-slate-900 mb-3">Generate my well-water action plan</p>
  <div class="grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
    <label class="flex items-start gap-2"><input type="checkbox" value="annual" /> I have not tested in the last 12 months</label>
    <label class="flex items-start gap-2"><input type="checkbox" value="flood" /> Flooding happened near my well</label>
    <label class="flex items-start gap-2"><input type="checkbox" value="repair" /> Well/plumbing repair was done recently</label>
    <label class="flex items-start gap-2"><input type="checkbox" value="taste" /> New taste, smell, or color change</label>
    <label class="flex items-start gap-2"><input type="checkbox" value="infant" /> Infant/pregnancy or vulnerable household member</label>
    <label class="flex items-start gap-2"><input type="checkbox" value="known" /> Prior result showed contamination</label>
  </div>
  <button id="well-action-generate" type="button" class="mt-3 rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">Build Plan</button>
  <div id="well-action-result" class="hidden mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
    <p id="well-action-urgency" class="font-semibold text-amber-900 mb-2"></p>
    <ul id="well-action-steps" class="list-disc pl-5 text-sm text-amber-900 space-y-1"></ul>
  </div>
</div>

## Step 1: Baseline annual panel

Test at least once each year for:

- Total coliform and E. coli
- Nitrate/nitrite
- pH and hardness
- Region-specific metals (arsenic, manganese, iron)

Reference: [Well water testing guide](/your-water/well-water/well-water-testing-guide/)

## Step 2: Trigger-based testing

Run immediate testing if any of these happen:

- Flooding near the well
- Well cap damage or plumbing repairs
- New taste, odor, or color change
- Household infant, pregnancy, or immune vulnerability

Related playbooks:

- [Test well after flood](/your-water/well-water/test-well-after-flood/)
- [How often to test well water](/your-water/well-water/how-often-test-well-water/)

## Step 3: Decide treatment path from results

| Result pattern | First treatment direction |
|---|---|
| Bacteria positive | Disinfection workflow and root-cause fix |
| Nitrate elevated | Reverse osmosis or distillation for drinking/cooking |
| Arsenic elevated | NSF 58 RO or adsorptive media validated for arsenic |
| Iron/manganese aesthetic and staining | Oxidation/filtration plus point-of-use drinking treatment as needed |

## Step 4: Re-test after treatment changes

Any new treatment system should be validated by follow-up testing to confirm removal performance.

## Authoritative references

- [EPA private wells hub](https://www.epa.gov/privatewells/protect-your-homes-water)
- [CDC well-water testing guidance](https://www.cdc.gov/drinking-water/safety/guidelines-for-testing-well-water.html)
- [Find certified labs](https://www.epa.gov/privatewells)
