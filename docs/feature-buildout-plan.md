# WaterAnswer Feature Buildout Plan

## Goal
Fully implement the inspiration-driven features (ZIP utility intelligence, location browser, well action workflows, NSF validation workflows, treatment matching) as production-grade tools with reliable data coverage, measurable quality gates, and maintainable architecture.

## Scope
1. ZIP -> Utility intelligence (national coverage)
2. State -> City -> System -> Contaminant browser
3. Well-water action planner (rules engine + outputs)
4. NSF certification checker (claim validation workflow)
5. Contaminant -> treatment recommender matrix
6. Tool UX consistency + analytics + QA automation

## Current baseline
- Working interactive tools exist in static client JS.
- ZIP utility lookup has city index + state defaults + modeled fallback.
- Gaps: authoritative utility data ingestion, confidence scoring rigor, test coverage, refresh pipeline, and production monitoring.

## Phase 1: Data Foundation (authoritative coverage)
### 1. Utility data pipeline
- Build `data/utility-index` generator script from authoritative sources (EPA/SDWIS/ECHO exports + state directories where needed).
- Normalize:
  - `utility_name`
  - `state`
  - `city`
  - `service_area_hint`
  - `pwsid` (if available)
  - `source_last_updated`
- Output:
  - `static/data/utility-index.json` (optimized client)
  - `docs/data-dictionary-utility-index.md`

### 2. ZIP resolution reliability
- Keep Zippopotamus + Nominatim fallback, but add:
  - deterministic resolver function
  - retry/backoff rules
  - graceful partial results policy

### 3. Confidence model v1
- Define confidence tiers:
  - `high` exact city+state+named match
  - `medium` partial city or metro match
  - `low` state-level modeled fallback
- Add explanation text per tier.

### Phase 1 exit criteria
- >=95% of tested ZIPs return at least one named utility candidate.
- Every result has a confidence tier and reason.
- Data refresh script reproducible from clean checkout.

## Phase 2: Tool Engine Hardening
### 1. ZIP utility tool
- Add explicit result model:
  - primary candidate utility
  - alternates
  - utility verification links (CCR, state portal, utility search)
- Cache lookup results in-memory for session performance.

### 2. Browser tool
- Replace hardcoded examples with dataset-driven options.
- Add contaminant drilldown links from known utility/state context.

### 3. Well action planner
- Move rules to structured config object (not inline conditionals).
- Add downloadable checklist output (copy/share-friendly text block).

### 4. NSF checker
- Add contaminant-to-standard compatibility matrix config.
- Add warning states for impossible/weak claim combinations.

### 5. Treatment matrix
- Move matrix to structured JSON.
- Add “why this recommendation” and “what this does NOT solve” blocks.

### Phase 2 exit criteria
- All tool logic data-driven from config/data files.
- No tool has page-specific hardcoded behavior.
- All tools have deterministic outputs for test inputs.

## Phase 3: UX + Accessibility + Performance
### 1. UX consistency
- Standardize:
  - result card patterns
  - status badges (`high/medium/low confidence`)
  - action CTA hierarchy (`verify`, `test`, `treat`)

### 2. Accessibility
- Keyboard-only pass for all tool controls.
- ARIA labels/states for dynamic result sections.
- Screen-reader announcements for generated results.

### 3. Performance
- Split tool data into lazy-load chunks.
- Ensure no blocking on homepage for tool JS not needed there.

### Phase 3 exit criteria
- Lighthouse accessibility >= 95 on tool pages.
- No console errors in core tool flows.
- Time to interactive remains acceptable on mobile.

## Phase 4: QA, Observability, and Release
### 1. Automated tests
- Add JS unit tests for:
  - ZIP resolver
  - confidence scoring
  - rule engines
  - recommendation mapping
- Add end-to-end smoke tests for all 5 tools.

### 2. Manual QA matrix
- ZIP cases: major metro, small town, rural well-like address, invalid ZIP, geolocation denied.
- Browser cases: full selection path + partial aborts.
- Well planner: low/medium/high urgency combinations.
- NSF + matrix: empty input, unsupported combos, expected pathways.

### 3. Analytics and instrumentation
- Track:
  - tool start
  - tool complete
  - confidence tier distribution
  - top contaminant/treatment selections
- Add privacy-safe event schema doc.

### Phase 4 exit criteria
- Release checklist passed.
- Regression suite green.
- Monitoring in place for data freshness and runtime failures.

## Implementation order (recommended)
1. Phase 1 (data + confidence model)
2. ZIP tool hardening (Phase 2.1)
3. Browser data-driven migration (Phase 2.2)
4. Well/NSF/Matrix config refactors (Phase 2.3-2.5)
5. UX/A11y/perf pass (Phase 3)
6. Full QA + release (Phase 4)

## Risks and mitigations
- EPA/source endpoint instability:
  - Mitigation: build import adapters + cached snapshots + documented fallbacks.
- Data staleness:
  - Mitigation: freshness metadata + scheduled regeneration policy.
- Overconfident utility assignment:
  - Mitigation: explicit confidence tiers + verification-first UX.

## Definition of done
- National ZIP queries return actionable, confidence-labeled utility results.
- All 5 tools are data-driven, tested, and accessible.
- Data pipeline and refresh process are documented and repeatable.
