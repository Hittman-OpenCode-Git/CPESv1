# External AI-Tool Integration Decision Record

**Version:** 1.0
**Date:** 2026-07-29
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Scope:** Firecrawl, Browser Use, Mem0 — first-round evaluation

---

## 1. Purpose

Document the evaluation of three external AI-tool candidates (Firecrawl, Browser Use, Mem0) against this repository's actual workflow, existing capabilities, and governance constraints. This record serves as the canonical reference for any future integration decision on these tools.

---

## 2. Current Capabilities (What We Already Have)

| Need | Existing Solution |
|------|-------------------|
| Web search with citations | `opencode-websearch-cited` plugin (registered in `opencode.json`) |
| Cross-session AI memory | `opencode-supermemory` plugin + `supermemory` tool |
| Deterministic browser automation | Playwright 1.61.1 (`scripts/smoke_test.js`, headless Chromium) |
| Content validation | 8 validators in `scripts/validators/`, 51-test governance guard |
| Pipeline integrity | `npm run preflight` (T0), `npm run pipeline` (Tend), `npm run smoke` (Tend) |
| Governance enforcement | `.opencode/plugins/governance-guard.js` (10 BLOCK rules) |
| Multi-agent orchestration | `opencode-conductor` plugin |
| Authoritative accounting references | `foundation/FORMULA_MASTER.md`, `knowledge/CAQS_v1.0.md`, `knowledge/TAXONOMY_REGISTRY.md`, `knowledge/05_COMMON_EXAM_TRAPS.md`, IMA CSO (external, via websearch) |

**Key constraint:** The repo uses zero runtime npm dependencies. The only devDependency is Playwright. The application is vanilla JS.

---

## 3. Candidate Ranking

### Rank 1 — Firecrawl (Conditional)

**What it is:** Web scraping/crawling API that turns websites into LLM-ready markdown. Supports JS rendering, crawling, and structured extraction.

| Factor | Assessment |
|--------|------------|
| Immediate usefulness | **Medium.** Useful during build-time AI verification (CAQS §1.6) when an agent needs the exact text of a specific ASC section, COSO principle, or IMA publication. |
| Implementation effort | **Low.** REST API — no npm package required. Single script, ~40 lines. |
| Overlap with existing tools | **Low.** Complements `opencode-websearch-cited` rather than competing. Websearch gives search results; Firecrawl gives structured, crawlable extraction from known authoritative URLs. |
| Governance risk | **Very Low.** Read-only. Does not touch pack files, answer keys, question_state, registries, or any governance-critical path. |
| Benefit to content production | **Moderate.** Improves verification accuracy when checking disputed answers against primary sources. Not a daily-use tool. |

**Verdict: Conditional "nice to have."** The accounting standards this repo references are static (ASC 606, COSO 2013/2017). The knowledge files already encode key references. Firecrawl would add value only when an agent needs to pull the verbatim text of a specific authoritative source that is not already documented locally.

### Rank 2 — Mem0 (Rejected)

**What it is:** A memory layer for AI agents providing persistent, searchable long-term memory across sessions.

| Factor | Assessment |
|--------|------------|
| Immediate usefulness | **Low.** The repo already has `opencode-supermemory` (registered plugin) and the `supermemory` tool (available in the OpenCode tool set) providing cross-session memory. |
| Implementation effort | **Low-Medium.** API-based, but requires schema design, categorization rules, and integration into the existing workflow. |
| Overlap with existing tools | **High — redundant.** Introducing Mem0 alongside `opencode-supermemory` creates two competing memory systems. Agents would not know which memory store is authoritative. |
| Governance risk | **Low-Medium.** Not governance-critical on its own, but a second memory system introduces ambiguity about where decisions are recorded. The repo's markdown-based knowledge files (DEFECT_LIBRARY.md, REVISION_HISTORY.md, CURRENT_BASELINES.md) are the authoritative memory — auditable, hash-verified, and preflight-checked. |
| Benefit to content production | **Minimal.** The repo's knowledge files already serve as structured, searchable memory. Adding Mem0 would duplicate this function without replacing the files (which the governance guard requires). |

**Verdict: Rejected — redundant.** Do not introduce a second memory system. The existing `opencode-supermemory` plugin, `supermemory` tool, and markdown-based knowledge files collectively meet the repo's memory needs. A second memory system is precisely the kind of unnecessary orchestration complication this decision record exists to prevent.

### Rank 3 — Browser Use (Rejected)

**What it is:** An AI agent that controls a browser to perform web-based tasks autonomously. Uses Playwright under the hood.

| Factor | Assessment |
|--------|------------|
| Immediate usefulness | **Low.** The repo's browser needs are deterministic (smoke test, UI verification). There is no workflow that needs autonomous, AI-driven browser interaction. |
| Implementation effort | **High.** Requires Python, an LLM provider configuration, browser setup, task definitions, and integration into the existing toolchain. |
| Overlap with existing tools | **High — competing.** Playwright is already installed and used for deterministic smoke testing. `opencode-conductor` already handles multi-agent orchestration. Browser Use is a second browser-automation tool AND a second orchestration framework — violating both constraints. |
| Governance risk | **Medium-High.** An AI agent controlling a browser autonomously introduces unpredictability. The repo's governance model depends on deterministic, auditable tool behavior. Autonomous browser actions could interact with unintended targets, produce unreproducible results, or violate the read-only-by-default rule (§2). |
| Benefit to content production | **None.** No content production task in this repo requires autonomous browser interaction. |

**Verdict: Rejected — avoid.** Browser Use competes with Playwright (already here), competes with `opencode-conductor` (already here), adds an orchestration layer that violates the "no second major orchestration framework" constraint, and introduces governance risk with no compensating benefit. Do not integrate.

---

## 4. Decision

| Candidate | Decision | Rationale |
|-----------|----------|-----------|
| Firecrawl | **Conditional — not now** | Only candidate with a genuine gap to fill. Defer until a concrete verification need arises that `opencode-websearch-cited` cannot handle. |
| Mem0 | **Rejected** | Redundant with `opencode-supermemory` and `supermemory`. Would create competing memory systems. |
| Browser Use | **Rejected** | Competing orchestration framework. Overlaps with Playwright and OpenCode conductor. Adds governance risk. |

**Default posture: integrate none of the above.** The repo's current toolchain is sufficient for its stated priorities (content production, quality protection, safe delivery). Defer all three until a concrete, repo-specific trigger condition is met.

---

## 5. Future Trigger Conditions (Firecrawl Only)

Integrate Firecrawl only when **two or more** of the following conditions are true:

1. **Repetitive websearch failure.** `opencode-websearch-cited` consistently fails to return usable text from an authoritative CMA reference site (e.g., FASB ASC viewer, IMA publications page, COSO framework site) that agents need to access during build-time verification.

2. **Disputed answer-key review.** A verification session reaches an impasse because the agent cannot extract the exact authoritative text for a specific standard paragraph, and the knowledge files do not contain sufficient detail to resolve the dispute.

3. **New standard publication.** A new version of COSO or a major ASC update is released that is not yet reflected in the knowledge files, requiring repeated batch fetching from the authoritative source.

4. **Batch source ingestion.** The project decides to systematically ingest and cache a specific authoritative source (e.g., the full IMA CSO as structured markdown) for repeated use across verification sessions.

**Single-condition trigger:** If the project lead explicitly requests Firecrawl integration, override the "two or more" requirement.

---

## 6. Future Integration Path (If Triggered)

If the trigger conditions are met, this is the smallest possible integration:

**File:** `scripts/fetch_authority.js` (new)

**What it does:**
- Accepts a URL as the sole command-line argument
- Calls the Firecrawl REST API (`POST https://api.firecrawl.dev/v1/scrape`)
- Outputs clean markdown to stdout
- Requires `FIRECRAWL_API_KEY` environment variable
- ~40 lines, no npm dependency, no config changes

**Design constraints (non-negotiable):**
- REST API only — no `@mendable/firecrawl-js` in `package.json`
- No pipeline wiring — not called by `preflight`, `smoke`, `validate`, or `pipeline`
- No governance-critical changes — does not touch `.opencode/`, `opencode.json`, `AGENTS.md`, or any pack/case file
- Project-local — lives in `scripts/`, not installed globally
- Read-only — never writes to any file
- Ad-hoc usage — invoked manually by an AI agent during verification, not automated

**Exact next prompt if we decide to pilot:**

> "Create `scripts/fetch_authority.js` — a read-only helper that calls the Firecrawl REST API to fetch a URL and output the page content as markdown. Use the scrape endpoint. Read the API key from `process.env.FIRECRAWL_API_KEY`. Accept the target URL from `process.argv[2]`. Do not add any npm dependency. Do not modify package.json, opencode.json, AGENTS.md, or any pack/case file."

---

## 7. Explicitly Rejected

| What | Why |
|------|-----|
| Mem0 integration | Redundant with existing `opencode-supermemory` + `supermemory`. Creates competing memory systems. The repo's markdown-based knowledge files are the authoritative memory store. |
| Browser Use integration | Competes with Playwright (browser automation) and `opencode-conductor` (orchestration). Violates the "no second major orchestration framework" constraint. Introduces autonomous browser behavior incompatible with the repo's deterministic governance model. |
| Adding any npm dependency for Firecrawl | The REST API is sufficient. Dependency creep is unnecessary. |
| Wiring any of these into the pipeline | `preflight`, `smoke`, and `pipeline` serve governance functions. Ad-hoc research tools do not belong in CI. |
| Global installation of any tool | All integrations are project-local by default. |

---

## 8. Cross-References

- `knowledge/CAQS_v1.0.md` §1.6 — Build-time AI verification standard (the workflow Firecrawl would support)
- `opencode.json` — Existing plugin registry (`opencode-supermemory`, `opencode-websearch-cited`, `opencode-conductor`)
- `package.json` — Zero runtime dependencies, Playwright as sole devDependency
- `AGENTS.md` §9 — Governance lanes, preflight/smoke/pipeline requirements
- `AGENTS.md` §2 — Read-only by default

---

*Last updated: 2026-07-29 — Initial decision record. All three candidates evaluated. Firecrawl: conditional. Mem0: rejected (redundant). Browser Use: rejected (competing orchestration + governance risk). Default posture: integrate none.*
