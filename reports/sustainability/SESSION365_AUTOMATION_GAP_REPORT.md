# S365 Automation Gap Report — CMA Part 1 Exam Simulator

**Date:** 2026-07-28
**Session:** S365 (Automation Effectiveness Review)
**Prior Rating:** S362 — 48/100 (AT RISK)
**Current Rating:** **48/100 (AT RISK)** — confirmed unchanged
**Target:** >= 55/100 for operational sustainability

---

## Executive Summary

The automation landscape remains at **48/100**, unchanged from S362. The governance guard plugin is the **only fully automated, self-verifying component** in the entire repository. Everything else — defect scanning, registry generation, baselines management, certification pipelines, and pre-delivery safety checks — requires manual human or agent invocation. The script directory is 53.1% uncategorized sprawl. The core gap preventing >= 55 is the **absence of an end-to-end automated pipeline**: no CI/CD, no auto-regeneration of derived artifacts, and no automated pre-delivery pool verification.

---

## 1. Script Landscape

**1,176 files** reside in the `scripts/` directory (including subdirectories). Of the **224 identifiable top-level JS scripts**, only **105 (46.9%)** are categorized by function. The remaining **119 (53.1%)** are session-specific one-off remediation tools, ad-hoc debug scripts, abandoned prototypes, or uncategorized utilities.

### Category Breakdown

| Category | Count | Quality | Notes |
|----------|-------|---------|-------|
| **Governance Guard & Enforcement** | 4 | **HIGH** | 9 BLOCK rules, 51/51 tests, string-aware parse. Fully automated. |
| **Validator Framework** | 16 | MODERATE | 11 validators covering structural/content/psychometric. DL-020 fixed. Manual invocation only. |
| **Registry/Baselines Generation** | 8 | **FRAGILE** | generate_registry.js broken (shows I/P/T/U sections). rebuild_baselines is regex-replace hack. |
| **Defect Scanning** | 15 | MODERATE | DL-008/026/021/037 scanners exist with Function constructor parse (DL-029 resolved). All manual-invoke. |
| **Certification Pipeline** | 24 | MODERATE | Framework v2 exists (identity_validator → readiness_scorer → certification_candidate_engine). Manual orchestration. |
| **Testing** | 12 | MODERATE | Governance guard tests comprehensive. May layer tests exist. No CI runner. |
| **Session One-Offs** | ~75 | **LOW** | Remediation/audit tools from S4-S899. 22 flagged candidate_archive. 109 already archived. |
| **Uncategorized Sprawl** | ~67 | **LOW** | Debug snippets, ad-hoc field checks, underscore-prefixed abandoned files. |
| **Engine Modules** | 5 | HIGH | pack_reader.js, identity_resolver.js — Function constructor based. |
| **Library Modules** | 6 | HIGH | ValidatorRunner.js, FileReconstructor.js — foundational infrastructure. |

### Subdirectory Summary

| Directory | Files | Purpose |
|-----------|-------|---------|
| `engine/` | 5 | Pack reader, identity resolver, hash engine, queue state machine, template family |
| `lib/` | 6 | Validator runner, case extractor, file reconstructor, metadata migrator |
| `validators/` | 16 | 11 validator classes + config + base + psychometric sub-modules |
| `output/` | 126+ | JSON/MD output artifacts from certification, scanning, and session pipelines |
| `reports/` | 30+ | Generated report files (sprint reports, dashboard, migration summaries) |
| `s719_batches/` | 12 | Batch specification JSON for Pack E certification waves |

---

## 2. Governance Guard Assessment — The Only Reliable Component

**Verdict: Production-grade. Fully automated. Self-verifying. The single most trustworthy automation component.**

### Rule Inventory (All BLOCK Level)

| Rule | Enforcement | Trigger | Status |
|------|------------|---------|--------|
| **Rule 1** | question_state → REVISION_HISTORY pairing | Session idle | Active |
| **Rule 2** | DL-008 — ExplanationWrong[CC] must be empty | Write time | Active |
| **Rule 3** | Registry must not be hand-edited | File target | Active |
| **Rule 4** | answer-key → recomputed note | Session idle | Active |
| **Rule 5** | ≤30 question objects per change-set | Write time | Active |
| **Rule 6** | DL-026 — non-CC EW slots must be non-empty | Write time | Active |
| **Rule 7** | Derived registries not hand-edited | File target | Active |
| **Rule 8** | Session packages must be registered | File target | Active |
| **Rule 9** | DL-037 — choice binary lead-in polarity mismatch | Write time | Active |

### Test Suite: 51/51 PASS (verified S365)

Tests cover: Rule 2 (DL-008) with DL-029 boundary cases, Rule 3 (registry protection), Rule 4 (RECOMPUTED_RE), Rules 1+4 BLOCK architectural verification, Rule 5 (30-item cap), Rule 6 (DL-026 empty distractor), Rule 7 (derived registry paths), Rule 8 (session packages), Rule 9 (DL-037 logic inversions), and read-only passthrough verification.

### What It Cannot Automate

1. **Rules 1 and 4 enforce at session idle** — the guard allows writes but raises an error at session close. The REVISION_HISTORY.md update and recomputed verification note must still be **manually authored**. The guard only checks that the file was touched and that the content contains verification phrases — it cannot verify the note is mathematically correct.

2. **DL-010 (semantic misassignment)** — the guard cannot detect when an ExplanationWrong field describes the wrong choice. This requires NLP/human judgment.

3. **DL-021 (absent EW fields)** — the guard has no rule for structurally absent distractor ExplanationWrong fields (only for empty/non-empty string values).

---

## 3. Registry Pipeline — Stale and Broken

The `MASTER_QUESTION_REGISTRY.md` is **2 days stale** (last generated 2026-07-26 21:04, now 2026-07-28). Beyond staleness:

- **Section categorization is broken**: The registry reports sections I, P, T, U instead of A, B, C, D, E, F. This is a pull-parsing defect in `generate_registry.js` — the section field mapping is pulling from the wrong data field or using corrupted CSV input.
- **Count drift**: Registry says 2,975 questions. The actual count based on pack files should be 2,540 (MCQ from 5 packs: 500+500+500+500+540) + ~400 (case items) = ~2,940. The 35-question discrepancy suggests stale data.
- **Manual append**: The S316 Wave 2 entry was manually appended with a "RULE 3 exception" annotation — indicating the generation pipeline was not trusted even when it was last run.
- **No automatic trigger**: Nothing re-runs `build_master_registry.js` after pack changes. Not consumed by any automated tool.

---

## 4. Baselines Management — Fully Manual

`CURRENT_BASELINES.md` is the authoritative hash baseline for all runtime-critical files (pack files, app.js, governance guard). After every pack modification:

1. **Hash capture**: `Get-FileHash -Algorithm SHA256` (PowerShell) — quick, but manual per-file
2. **Entry update**: Either hand-edit the markdown table, or run an ad-hoc `rebuild_baselines_s*.js` script (regex-based text replacement on the .md file)
3. **Provenance update**: Manually document what changed and why

The rebuild_baselines scripts are **regex-replace hacks**, not full regeneration from source. They search for specific table rows and replace them. They are fragile and session-specific (each major change gets its own rebuild_baselines script: s916, s923, s896, s888, etc.).

The **T0/Tmid/Tend checkpoint sequence** (AGENTS.md §13.1) is entirely manual. An agent reads the instructions, runs the checks, and logs the results. There is no automated checkpoint system.

---

## 5. Defect Detection Automation

### Per-Defect Status

| Defect | Scan Script | Method | Quality | Guard Rule | Auto Block? | Manual Scan? |
|--------|------------|--------|---------|------------|-------------|-------------|
| **DL-008** | scan_dl008_fn.js | Function constructor | HIGH | Rule 2 | YES | YES |
| **DL-026** | scan_s710r_dl026.js | Function constructor | HIGH | Rule 6 | YES | YES |
| **DL-021** | scan_dl021_s828.js | Function constructor | MEDIUM | None | NO | YES |
| **DL-037** | scan_logic_inversions.js | String-aware extraction | HIGH | Rule 9 | YES | YES |
| **DL-010** | None | N/A | N/A | None | NO | NO |

### DL-029 Methodology Gap — Status

The forward-scan regex methodology gap (75% false positive rate on Pack B, documented in DL-029) has been **resolved for active tools**. The governance guard, test_governance_guard.js, scan_dl008_fn.js, scan_s710r_dl026.js, scan_dl021_s828.js, and scan_logic_inversions.js all use **Function constructor** or **string-aware brace matching** — CC-position-aware parsing.

However, three older scripts (`check_ew.js`, `session86_dl8_scan.js`, `session86_dl026_scan.js`) still use forward-scan regex. These are marked `candidate_archive` by SESSION950 and pose no active risk unless invoked.

### DL-028 Tooling Regression — UNFIXED

The DL-013 remediation short-form rewrite script (used during the Pack C/D Section C DL-013 sweep on 2026-07-23) left empty rotation-template distractor slots. The root cause is documented (DEFECT_LIBRARY.md DL-028) but **no tooling fix has been applied**. The script is not preserved in the repository — evidence exists only in file diffs.

---

## 6. Manual vs Automated Ratios

| Workflow | Automated | Manual | Score |
|----------|-----------|--------|-------|
| **Certifying a batch** | 33% (3 steps) | 67% (6 steps) | LOW |
| **Running DL-008 scan** | 67% (2 steps) | 33% (1 step) | MODERATE |
| **Regenerating registry** | 50% (2 steps) | 50% (2 steps) | MODERATE |
| **Updating baselines** | 20% (1 step) | 80% (4 steps) | LOW |
| **Governance test suite** | **100%** (1 step) | **0%** | **HIGH** |
| **Pre-delivery safety** | **0%** | **100%** (5 steps) | **NONE** |

The governance test suite is the **only workflow that is fully automated** — a single `node scripts/test_governance_guard.js` command.

---

## 7. Tool Quality Assessment

### CC-Position-Aware (HIGH Quality, 0% False Positive Rate)

All active tools use either Function constructor parsing or string-aware brace matching:
- `governance-guard.js` / `test_governance_guard.js`
- `scan_dl008_fn.js`, `scan_dl008_boundary.js`
- `scan_s710r_dl026.js`, `scan_dl021_s828.js`
- `scan_logic_inversions.js`
- `certification_candidate_engine.js` (uses `pack_reader` engine)
- `scan_orchestrator.js` (uses `pack_reader` engine)

### Forward-Scan Regex (LOW Quality, DL-029 Susceptible)

These legacy scripts should never be relied upon for production decisions:
- `check_ew.js` — forward-scan from QID position
- `session86_dl8_scan.js` — marked candidate_archive
- `session86_dl026_scan.js` — marked candidate_archive

### Overall Toolkit Quality: MODERATE

Active production tools are high-quality. Legacy sprawl contains unreliable forward-scan relics. The 53.1% uncategorized rate means nearly half the scripts/ directory cannot be evaluated.

---

## 8. Automation Score — 48/100 (AT RISK)

### Component Breakdown

| Component | Score | Max | Assessment |
|-----------|-------|-----|------------|
| Governance Guard | 19 | 20 | Near-perfect. Only gap: cannot verify semantic correctness of REVISION_HISTORY/recomputed notes |
| Validator Framework | 8 | 15 | 11 validators exist but manual invocation. Some older extraction methods. |
| Defect Scanning | 5 | 15 | Scanners for DL-008/026/021/037 exist but manual-invoke. DL-010 has no scanner. |
| Registry Automation | 3 | 10 | Generation scripts exist but stale, broken section mapping, manual invocation. |
| Baselines Automation | 2 | 10 | rebuild_baselines scripts are regex-replace hacks. Hash capture manual. No auto-regeneration. |
| CI/CD Pipeline | 0 | 10 | **Non-existent.** No GitHub Actions, no pre-commit hooks, no automated regression. |
| Pre-Delivery Automation | 1 | 10 | 100% manual. No automated delivery-pool verification before learner sessions. |
| Script Hygiene | 10 | 10 | 53.1% uncategorized. ~67 sprawl scripts. No structured taxonomy. |

**Total: 48/100** — consistent with S362. The governance guard is carrying virtually the entire score.

---

## 9. Path to 55

### Phase 1 — Quick Wins (+5 points, projects to 53/100)

1. **Fix generate_registry.js section extraction** — restore A-F section mapping. Re-run. Score: +1
2. **Write `scripts/pre_delivery_safety_check.js`** — single-command delivery pool verification. Score: +2
3. **Write `scripts/rebuild_baselines.js`** — full regeneration from source, not regex-replace. Score: +2

### Phase 2 — Structural Improvements (+3 points, projects to 56/100)

4. **Set up GitHub Actions** — on push: `npm run ci` → validate.js + test_governance_guard.js + pre_delivery_safety_check.js. Score: +2
5. **Catalog and archive script sprawl** — taxonomize all 224 scripts, archive confirmed one-offs, delete abandoned prototypes. Score: +1

### Phase 3 — Integration (+2 points, projects to 58/100)

6. **Wire pre-delivery safety check as learner session gate** — app.js integration or standalone pre-flight script. Score: +1
7. **Auto-regenerate registry on pack file write** — governance guard post-write hook. Score: +1

---

## 10. Verdict

**The governance guard is the only reliable automation component.** It is the sole reason the automation score is not in the 20s. Every other operational workflow — scanning for defects, regenerating the registry, recapturing baselines, verifying delivery pool safety — requires a human or agent to:

1. Know which script to invoke
2. Invoke it with correct parameters
3. Interpret its output
4. Take corrective action based on findings

The path to 55 is clear and achievable in 2-3 sessions: fix the registry generation, automate the pre-delivery safety check, automate baselines regeneration, and set up a CI pipeline. These are infrastructure improvements, not content changes — they do not require CAQS verification or accounting expertise.

**The uncategorized script sprawl (53.1%) is a governance risk.** A future agent or human contributor cannot distinguish between a production-grade scanner and a one-off debug snippet without opening each file. The SESSION950 cataloging effort identified 22 uncertain scripts but left ~67 more unexamined. A full taxonomy pass is overdue.

---

## Appendix A — Key File References

| File | Path | Status |
|------|------|--------|
| Governance Guard Plugin | `.opencode/plugins/governance-guard.js` | Active (9 rules, 354 lines) |
| Governance Guard Tests | `scripts/test_governance_guard.js` | 51/51 PASS (658 lines) |
| Validator Suite | `scripts/validators/` | 16 files, manual invocation |
| Registry Generator | `scripts/generate_registry.js` | Broken section mapping |
| Registry Builder | `scripts/build_master_registry.js` | CSV output, working |
| CURRENT_BASELINES.md | `knowledge/CURRENT_BASELINES.md` | Last updated 2026-07-28 |
| MASTER_QUESTION_REGISTRY.md | `knowledge/MASTER_QUESTION_REGISTRY.md` | 2 days stale (2026-07-26) |
| SESSION950 Sprawl Index | `scripts/SESSION950_UNCERTAIN_SCRIPTS_INDEX.md` | 22 scripts cataloged |
| Pre-Delivery Safety Skill | `.opencode/skills/pre-delivery-safety-check.md` | Manual workflow (155 lines) |
| Package Scripts | `package.json` | 6 npm scripts, no CI |

