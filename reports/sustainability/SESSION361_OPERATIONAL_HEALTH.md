# S361 — Operational Sustainability Audit Report

**Date:** 2026-07-28  
**Session:** S361  
**Mode:** READ-ONLY  
**Governance Guard:** 51/51 PASS  
**Repository:** CMA Part 1 Exam Simulator  

---

## Executive Summary

| Component | Score | Status |
|-----------|-------|--------|
| Platform Administration | **85/100** | HEALTHY |
| Governance Infrastructure | **95/100** | STRONG |
| Registry Integrity | **35/100** | DEGRADED |
| Certification Workflow | **70/100** | ADEQUATE |
| Technical Debt | **55/100** | ELEVATED |
| Operational Overhead | **60/100** | MODERATE |
| **OVERALL HEALTH SCORE** | **65/100** | ⚠️ NEEDS ATTENTION |

**Top 3 Critical Findings:**

1. **MASTER_QUESTION_REGISTRY.md is 36.6 hours stale** — missing 1,245 pack entries from actual files. No certified count tracked. References obsolete `scored_cases*.js` architecture. This is the single largest operational risk.

2. **Document conflict: DL-021 status** — CURRENT_BASELINES.md §3 reports "OPEN — learner-safety gap (95 Certified items)" while DEFECT_LIBRARY.md reports "Resolved — 0 DL-021 remaining (S828)." One of these is wrong about learner-pool safety.

3. **Pack D certified count discrepancy** — CURRENT_BASELINES.md §2 claims 389, raw file grep returns 392 (+3). 2,320 vs. documented 2,317. Certified pool denominator is inaccurate.

---

## 1. Platform Administration Health — 85/100

### 1.1 Index & Script Loading

`index_updated.html` correctly references all 8 expected bundles:
- `pack_a_corrected.js` through `pack_e_corrected.js` (5 MCQ packs)
- `case_pack_1_corrected.js` through `case_pack_3_corrected.js` (3 consolidated case packs — post-S916 reconsolidation)
- `may-learner-state.js` + `may-core.js` (coaching layer)
- `governance/delivery_blocklist.js` (learner-pool safety)
- `app.js` (application engine)

**⚠️ DRIFT:** `index_updated.html` SHA-256 (`E0B7BBAA...`) does NOT match the §1 Application Core table hash (`586396F9...`) in CURRENT_BASELINES.md. However, it DOES match the S916-S918 verification log entry. This is a documentation-maintenance lapse — the §1 table was never updated after the S916 case-pack reconsolidation.

### 1.2 May Coaching Layer

Both files exist with correct hashes matching CURRENT_BASELINES.md:
- `may-core.js`: `183D2E6B...` ✓ (344,883 bytes)
- `may-learner-state.js`: `BEE72B86...` ✓ (110,240 bytes)

### 1.3 Application Core Integrity

| File | Status | Notes |
|------|--------|-------|
| `app.js` | ✓ Hash match | 209,937 bytes |
| `styles.css` | ✓ Hash match | 68,696 bytes |
| `governance/delivery_blocklist.js` | ✓ Present | 2,647 bytes |

### 1.4 Root Directory Cleanliness

Per the most recent REVISION_HISTORY entry (2026-07-28 root cleanup): 21 files in root, 0 `.bak` files. Constitution §11.1 compliance: 16 of 17 permitted files present (missing `package-lock.json`? Or it was cleaned). `AGENTS.md` and `admin.html` remain in root — not in Constitution §11.1 permitted list but are legitimate application/governance files.

---

## 2. Governance Infrastructure — 95/100

### 2.1 Rule Inventory

All 9 rules are at **BLOCK** level. Zero WARN-only rules. No WARN-to-BLOCK upgrade backlog.

| Rule | Scope | Status |
|------|-------|--------|
| R1 | question_state → REVISION_HISTORY | BLOCK ✓ |
| R2 | DL-008 (non-empty EW[CC]) | BLOCK ✓ |
| R3 | Registry hand-edit prevention | BLOCK ✓ |
| R4 | Answer-key → recomputed note | BLOCK ✓ |
| R5 | ≤30 items per change-set | BLOCK ✓ |
| R6 | DL-026 (empty distractor EW) | BLOCK ✓ |
| R7 | Derived registry protection | BLOCK ✓ |
| R8 | Session package registration | BLOCK ✓ |
| R9 | DL-037 (choice polarity mismatch) | BLOCK ✓ |

### 2.2 Test Suite

**51/51 PASS** — Verified S361 T0. All governance-critical file hashes match baseline. Zero regression.

### 2.3 Coverage Gaps

Three rule gaps identified (no WARN/BLOCK enforcement exists):
1. **DL-018/DL-021** — ExplanationWrong field ABSENCE (undefined, not empty string). Rule 6 catches `=== ""` but not `undefined`.
2. **DL-016** — Dual-block metadata vs content mismatch. No automated enforcement of `ChoiceA-D` == `Choices.A-D`.
3. **DL-031** — Definition-match difficulty inflation. No rule prevents labeling a Remember-level item as "Moderate."

### 2.4 REVISION_HISTORY.md Integrity

- 25,581 lines — very large (>25K lines is itself a navigability concern)
- 104 "Certified" mentions
- 3,109 session references (S###)
- Entries are chronologically ordered (most recent first)
- Format is consistent: `## Session Title — Date`, then `**Type:**`, `**Outcome:**`, details
- **⚠️ Note:** The most recent 10 entries focus on Phase 1 authoring (S899), root cleanup, and case-pack reconciliation — three distinct workstreams in one day

---

## 3. Registry Integrity — 35/100 ⚠️ DEGRADED

### 3.1 MASTER_QUESTION_REGISTRY.md — CRITICALLY STALE

| Metric | Value |
|--------|-------|
| Last generated | 2026-07-27 00:35:00 |
| Staleness | **36.6 hours (1.5 days)** |
| Registry total | 2,995 questions |
| Registry pack entries | 1,295 |
| Actual pack QIDs | 2,540 |
| Delta | **-1,245 entries missing** |
| Certified count | **NOT TRACKED** |
| Staleness flag | **TRUE** (exceeds 24h threshold per AGENTS.md §9.6) |

**Root cause:** The registry references old `scored_cases*.js` architecture (pre-S916 reconsolidation). It has never been regenerated to reflect the 3×25 case_pack architecture. The registration script (`scripts/generate_registry.js`) exists but requires manual invocation.

**Risk:** Any tool or agent consuming this registry for coverage analysis, certification tracking, or delivery-pool validation will produce incorrect results.

### 3.2 Certified Pool Counts — DISCREPANCY

| Source | Pack D Certified | Grand Total |
|--------|-----------------|-------------|
| CURRENT_BASELINES.md §2 | 389 | 2,317 |
| Raw file grep (S361 T0) | **392** | **2,320** |
| Delta | +3 | +3 |

Pack D has 3 more Certified items than documented. The DRIFT FLAG (line 42) was never updated from the S896 baseline.

### 3.3 TAXONOMY_REGISTRY.md

All permitted enumeration values present and consistent. Covers 18 categories (CognitiveLevel, Difficulty, BlueprintDomain, etc.). No staleness issues — this is a static reference document.

### 3.4 CURRENT_BASELINES.md Internal Inconsistency

The §1 Application Core table has a stale `index_updated.html` hash (`586396F9...`). The verification log at line 169 correctly records `E0B7BBAA...` from S916-S918. Two tables in the same document disagree on the current hash — a maintenance failure.

---

## 4. Certification Workflow — 70/100

### 4.1 Pipeline Throughput

Recent certification activity (S899 Phase 1, 2026-07-28):
- 20 net-new items authored at Analyze/Evaluate levels
- 4 batches of 5 items (governance-guard compliant)
- 2 pre-existing DL-008 violations caught and corrected during same session
- Quality: 21.9 items/hour with 0 structural defects

### 4.2 Certification Provenance

**⚠️ 0 of 2,500 MCQ items in Packs A-D carry `certification_session` metadata.** Pack E has 40 items with this field (P1-E-R series, S313). For 98.4% of the certified pool, certification provenance exists only in REVISION_HISTORY.md — there is no machine-readable link between an item and the session that certified it.

### 4.3 Stalled Items

- 38 "Editorial Queue" mentions in REVISION_HISTORY.md
- **No mechanism exists to track Editorial Queue entry-to-exit duration**
- Cannot determine if any items have been stalled >7 days
- Recommendation: Add `editorial_queue_entry_date` field to items, or maintain an Editorial Queue tracking file

### 4.4 Documentation Conflict — DL-021

This is a significant concern:

| Document | Claim | Status Implication |
|----------|-------|-------------------|
| CURRENT_BASELINES.md §3 HIGH table | "DL-021: 95 Certified items, OPEN — learner-safety gap" | **Learner pool unsafe** |
| DEFECT_LIBRARY.md DL-021 | "Resolved — S71 (2026-07-24). 0 DL-021 remaining." | **Learner pool safe** |

The DEFECT_LIBRARY.md entry is more recent and provides specific remediation evidence (264 explanations, S828 confirmation). CURRENT_BASELINES.md §3 was not refreshed after the remediation. This is a documentation staleness issue, but the safety implication requires immediate resolution — either the learner pool has 95 items with missing explanations OR the baseline document is misleading stakeholders.

---

## 5. Technical Debt — 55/100 ⚠️ ELEVATED

### 5.1 Open Defects by Class

| Class | Count | Highest Severity | IDs |
|-------|-------|-----------------|-----|
| Structural | 5 | High (DL-026, DL-035) | DL-012, DL-014, DL-015, DL-026, DL-035 |
| Content | 2 | High (DL-009, DL-010) | DL-009, DL-010 |
| Pedagogical | 2 | High (DL-031) | DL-031, DL-032 |
| Process/Methodology | 3 | High (DL-029) | DL-028, DL-029, DL-036 |
| **Total Open** | **12** | | |
| **Total Resolved** | **14** | | |
| **Total in Library** | **37** | | |

### 5.2 Severity Breakdown

| Severity | Count | Risk |
|----------|-------|------|
| Critical | 0 | — |
| High | 6 | Learner safety + educational quality |
| Medium | 4 | Operational friction |
| Low | 2 | Cosmetic / metadata |

### 5.3 Top 3 High-Severity Items Requiring Action

1. **DL-026** — ~1,005 items pool-wide with empty distractor EW slots. Even if partially remediated (autonomous runs cleared hundreds), the residual is unquantified. CURRENT_BASELINES.md claims 0 Certified (which may itself be stale).

2. **DL-031** — ~500 items systemically labeled "Moderate" that test Bloom's Remember/Understand. Compromises difficulty distribution metrics and adaptive testing.

3. **DL-029** — Scan methodology produces false positives on DL-008. Prior sessions reported 885+ Certified DL-008 where actual was dozens. This methodology has been used across multiple sessions, casting doubt on the accuracy of historical DL-008 counts.

### 5.4 Tooling Regressions

| DL-ID | Description | Remediation Status |
|-------|-------------|-------------------|
| DL-028 | DL-013 remediation tooling created empty slots | Not fixed |
| DL-029 | Regex block-window scan ~75% false positive rate | Not fixed |

### 5.5 Drift Flags

| File | Issue | Severity |
|------|-------|----------|
| `index_updated.html` | CURRENT_BASELINES.md §1 table has stale hash (documented but not updated in table) | Low |
| `pack_d_corrected.js` | Certified count 392 vs documented 389 (+3) | Medium |

---

## 6. Operational Overhead — 60/100

### 6.1 Script Inventory

| Category | Count | % |
|----------|-------|---|
| Utility (parse/extract/count/check/enrich/verify/migrate/backup) | 30 | 13.4% |
| Audit + Scan | 27 | 12.1% |
| Build (generate/rebuild/regen) | 15 | 6.7% |
| Remediation | 14 | 6.3% |
| Test | 11 | 4.9% |
| Validation | 8 | 3.6% |
| **Other/Uncategorized** | **119** | **53.1%** |
| **Total root** | **224** | |
| Total with subdirectories | 252 | |

**53.1% of scripts (119 files) are uncategorized** — this is a significant operational hygiene issue. Many are likely one-off investigation scripts, deprecated tools, or ad-hoc utilities that inflate the code surface without delivering ongoing value.

### 6.2 Manual Intervention Points

The certification pipeline requires manual intervention at these stages:

| Stage | Action | Automated? |
|-------|--------|-----------|
| Item authoring | Per-item design and writing | ✗ Manual |
| Distractor authoring | Per-distractor explanation writing | ✗ Manual |
| DL-008/DL-026 enforcement | Governance guard Rule 2/6 | ✓ Automated |
| Certification decision | Human authorization per CAQS §1.7.2 | ✗ Manual |
| Difficulty calibration | Per-item cognitive review | ✗ Manual |
| Registry regeneration | Script invocation | ✗ Manual (no CI trigger) |
| CURRENT_BASELINES.md update | Manual hash recapture | ✗ Manual |
| Cross-document consistency | Manual reconciliation | ✗ Manual |
| Governance guard test expansion | Manual test authoring | ✗ Manual |

### 6.3 Automation Estimate

**~55% automated.** The governance guard provides automated pre-write enforcement. The test suite provides automated regression testing. But content authoring, quality calibration, documentation maintenance, and registry synchronization all require manual effort.

---

## 7. Recommendations

### 7.1 Immediate (This Session)

1. **Regenerate MASTER_QUESTION_REGISTRY.md** — Run `node scripts/generate_registry.js` to bring registry within 24h staleness threshold. Update to reference `case_pack_*_corrected.js` architecture.

2. **Resolve DL-021 status conflict** — Re-verify Pack E Section C ExplanationWrong field presence via boundary-aware scan. Update both CURRENT_BASELINES.md and DEFECT_LIBRARY.md with authoritative finding.

3. **Reconcile Pack D certified count** — Determine source of +3 discrepancy. Run boundary-aware scan on Pack D filtered to `question_state: "Certified"` with QID list evidence.

### 7.2 Short-Term (This Week)

4. **Fix CURRENT_BASELINES.md §1** — Update `index_updated.html` hash in Application Core table to `E0B7BBAA...`. The verification log already has the correct hash.

5. **Quantify DL-026 residual** — Run fresh boundary-aware scan on all 5 packs. Document exact QID list per section. Update CURRENT_BASELINES.md §3.

6. **Categorize uncategorized scripts** — Audit 119 uncategorized scripts. Archive deprecated tools. Tag remaining by purpose.

7. **Add `certification_session` metadata** — Implement a script to backfill `certification_session` field for Certified items in Packs A-D from REVISION_HISTORY.md records.

### 7.3 Medium-Term

8. **Implement DL-031 remediation** — Begin systematic difficulty recalibration for ~500 definition-match items. Target CAQS §6.1 distribution.

9. **Fix DL-029 scan methodology** — Refactor `scan_dl008.js` and related tools to use object-boundary parsing (already implemented in governance-guard.js).

10. **Deploy editorial queue tracker** — Add `editorial_queue_entry_date` or a tracking file to measure stall duration.

11. **Automate registry regeneration** — Add to governance guard as a post-write hook that flags when source pack files change without registry regeneration within 1 hour.

12. **Consolidate scripts** — Reduce 252 scripts by 40-50% through archival of one-off tools and merging of overlapping utilities.

---

## 8. Platform Health Score Breakdown

| Component | Score | Weight | Weighted Score |
|-----------|-------|--------|---------------|
| Platform Administration | 85 | 15% | 12.75 |
| Governance Infrastructure | 95 | 20% | 19.00 |
| Registry Integrity | 35 | 20% | 7.00 |
| Certification Workflow | 70 | 20% | 14.00 |
| Technical Debt | 55 | 15% | 8.25 |
| Operational Overhead | 60 | 10% | 6.00 |
| **OVERALL** | | | **65.00** |

**Assessment:** The platform is operational but sustaining technical debt that will compound if not addressed. Governance infrastructure is the strongest component (95/100). Registry integrity is the weakest (35/100) — the MASTER_QUESTION_REGISTRY.md staleness and the DL-021 documentation conflict represent the highest-risk items. The platform can sustain learner delivery in its current state, but operational health is declining due to accumulated documentation drift and uncategorized tooling.

---

*Report generated 2026-07-28 by S361 Operational Sustainability Audit (READ-ONLY). No files modified.*
