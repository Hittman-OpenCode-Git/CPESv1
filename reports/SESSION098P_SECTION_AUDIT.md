# SESSION098P — Section Audit: Three-Section Cognitive Reclassification

**Session:** 98P — Repository Reclassification ROI Analysis
**Governance Lane:** Light / Read-Only Analysis
**Date:** 2026-07-31
**Sections Audited:** Pack A Section A, Pack D Section CD, Pack D Section DD
**Total HO Items Audited:** 54 (22 + 14 + 18)
**Methodology:** S96P quality gates, per-item independent classification by 3 parallel agents

---

## 1. Executive Summary

| Section | HO Labeled | True HO | HO Accuracy | Evaluate Accuracy | Analyze Accuracy |
|---------|-----------|----------|-------------|-------------------|-----------------|
| Pack A Section A | 22 | **4** | 13.6% | 16.7% (2/12) | 10.0% (1/10) |
| Pack D Section CD | 14 | **0** | 0.0% | N/A (0 Eval) | 0.0% (0/14) |
| Pack D Section DD | 18 | **1** | 5.6% | 0.0% (0/7) | 9.1% (1/11) |
| **Combined** | **54** | **5** | **9.3%** | 10.5% (2/19) | 5.7% (2/35) |

**Key Finding:** These three sections are **substantially worse than Pack C EC** (60.6% HO accuracy). Pack C EC — the section S94P called "the COSO Definition-Matching Disaster" — turns out to be the benchmark for moderate misclassification. These three sections represent catastrophic misclassification.

---

## 2. Section-by-Section Audit

### 2.1 Pack A Section A — ASC Rules as Judgment

| Metric | S94P Estimate | S98P Audit |
|--------|-------------|------------|
| HO Labeled | 22 (4 Eval + 18 Analyze) | 22 (12 Eval + 10 Analyze) |
| True Evaluate | ~1 (25%) | **2** (16.7%) |
| True Analyze | ~0 (0%) | **1** (10.0%) |
| True Apply | — | **18** (81.8%) |
| True HO | ~5 | **4** |

**Audit finding:** S94P was directionally correct but the actual count differs. Pack A Section A has 4 true HO items, not 5. And 12 items are labeled Evaluate (not 4 as previously sampled). Two items (P1-A-022 and P1-A-029) are genuinely Evaluate — both involve tradeoffs between competing reporting frameworks or stakeholder interests.

**Dominant pattern:** 18 of 22 items (81.8%) are Apply — deterministic ASC-standard application. The stem presents a scenario with specific facts; the candidate must apply the cited standard to determine the correct treatment. These are well-written items that test genuine CMA competency — they are just labeled two tiers too high.

**Full classification (22 items):**

| QID | Labeled | True | Category |
|-----|---------|------|----------|
| P1-A-002 | Evaluate | Apply | Multi-tier-error |
| P1-A-005 | Evaluate | Apply | Multi-tier-error |
| P1-A-007 | Analyze | Apply | One-tier-slippage |
| P1-A-008 | Evaluate | Apply | Multi-tier-error |
| P1-A-009 | Analyze | Apply | One-tier-slippage |
| P1-A-011 | Evaluate | Analyze | One-tier-slippage |
| P1-A-012 | Evaluate | Apply | Multi-tier-error |
| P1-A-013 | Evaluate | Apply | Multi-tier-error |
| P1-A-014 | Analyze | Apply | One-tier-slippage |
| P1-A-016 | Analyze | Analyze | **Correct** |
| P1-A-021 | Evaluate | Apply | Multi-tier-error |
| P1-A-022 | Evaluate | Evaluate | **Correct** |
| P1-A-023 | Analyze | Apply | One-tier-slippage |
| P1-A-024 | Analyze | Apply | One-tier-slippage |
| P1-A-025 | Evaluate | Apply | Multi-tier-error |
| P1-A-029 | Evaluate | Evaluate | **Correct** |
| P1-A-030 | Analyze | Apply | One-tier-slippage |
| P1-A-034 | Evaluate | Apply | Multi-tier-error |
| P1-A-039 | Analyze | Apply | One-tier-slippage |
| P1-A-044 | Analyze | Apply | One-tier-slippage |
| P1-A-054 | Evaluate | Apply | Multi-tier-error |
| P1-A-064 | Analyze | Apply | One-tier-slippage |

---

### 2.2 Pack D Section CD — Performance Concepts as Analysis

| Metric | S94P Estimate | S98P Audit |
|--------|-------------|------------|
| HO Labeled | 10 (0 Eval + 10 Analyze) | 14 (0 Eval + 14 Analyze) |
| True Analyze | ~0 (0%) | **0** (0.0%) |
| True Apply | — | **2** (14.3%) |
| True Understand | — | **12** (85.7%) |
| True HO | ~0 | **0** |

**Audit finding:** Confirmed catastrophic. Section CD has **0 genuine Analyze items** and **0 genuine Evaluate items**. 14 items labeled Analyze. All 14 are over-labeled. 12 of 14 (85.7%) are Understand — textbook definition-to-term matching.

**Root cause:** The DL-012 clone rotation pipeline assigned `CognitiveLevel: "Analyze"` to every item by template, without cognitive assessment. Items that read "expressing each line item as a percentage of total revenue" and ask "What is this analysis called?" are Understand — the candidate names the concept from its definition.

**Full classification (14 items):**

| QID | Labeled | True | Category |
|-----|---------|------|----------|
| P1-CD-001 | Analyze | Apply | One-tier-slippage |
| P1-CD-015 | Analyze | Understand | Multi-tier-error |
| P1-CD-017 | Analyze | Understand | Multi-tier-error |
| P1-CD-043 | Analyze | Understand | Multi-tier-error |
| P1-CD-047 | Analyze | Understand | Multi-tier-error |
| P1-CD-057 | Analyze | Understand | Multi-tier-error |
| P1-CD-061 | Analyze | Understand | Multi-tier-error |
| P1-CD-064 | Analyze | Understand | Multi-tier-error |
| P1-CD-065 | Analyze | Apply | One-tier-slippage |
| P1-CD-067 | Analyze | Understand | Multi-tier-error |
| P1-CD-071 | Analyze | Understand | Multi-tier-error |
| P1-CD-074 | Analyze | Understand | Multi-tier-error |
| P1-CD-089 | Analyze | Understand | Multi-tier-error |
| P1-CD-092 | Analyze | Understand | Multi-tier-error |

---

### 2.3 Pack D Section DD — Cost Management Definitions as Analysis

| Metric | S94P Estimate | S98P Audit |
|--------|-------------|------------|
| HO Labeled | 17 (0 Eval + 17 Analyze) | 18 (7 Eval + 11 Analyze) |
| True Evaluate | — | **0** (0.0%) |
| True Analyze | ~0 (0%) | **1** (9.1% of Analyze) |
| True Apply | — | **5** (27.8%) |
| True Understand | — | **12** (66.7%) |
| True HO | ~0 | **1** |

**Audit finding:** Essentially confirmed. 1 item (DD-051) is genuinely Analyze — a complex step-method allocation scenario requiring multi-step diagnosis. The other 17 items are over-labeled. 12 of 18 (66.7%) are Understand — definition-to-term matching (kaizen costing, reciprocal method, normal costing, CVP assumptions).

**Notable:** 7 items carry `Evaluate` label. Zero are true Evaluate. Three are Understand (reciprocal method definition with rotated choices), two are Apply (CVP formula), one is Analyze (DD-051), one is multi-tier Apply.

**Full classification (18 items):**

| QID | Labeled | True | Category |
|-----|---------|------|----------|
| P1-DD-001 | Analyze | Understand | Multi-tier-error |
| P1-DD-003 | Analyze | Understand | Multi-tier-error |
| P1-DD-004 | Analyze | Apply | One-tier-slippage |
| P1-DD-021 | Evaluate | Apply | Multi-tier-error |
| P1-DD-026 | Analyze | Apply | One-tier-slippage |
| P1-DD-031 | Analyze | Understand | Multi-tier-error |
| P1-DD-036 | Analyze | Understand | Multi-tier-error |
| P1-DD-039 | Analyze | Understand | Multi-tier-error |
| P1-DD-041 | Analyze | Understand | Multi-tier-error |
| P1-DD-043 | Analyze | Understand | Multi-tier-error |
| P1-DD-046 | Analyze | Understand | Multi-tier-error |
| P1-DD-048 | Evaluate | Understand | Multi-tier-error |
| P1-DD-050 | Evaluate | Understand | Multi-tier-error |
| P1-DD-051 | Evaluate | Analyze | **One-tier-slippage** |
| P1-DD-061 | Evaluate | Understand | Multi-tier-error |
| P1-DD-062 | Evaluate | Apply | Multi-tier-error |
| P1-DD-063 | Analyze | Understand | Multi-tier-error |
| P1-DD-069 | Evaluate | Apply | Multi-tier-error |

---

## 3. Classification Accuracy Summary

| Section | Items | Correct | One-Tier | Multi-Tier | Understated | Relabel-Only |
|---------|-------|---------|----------|------------|-------------|-------------|
| Pack A Section A | 22 | 3 (13.6%) | 10 (45.5%) | 9 (40.9%) | 0 | **22 (100%)** |
| Pack D Section CD | 14 | 0 (0.0%) | 2 (14.3%) | 12 (85.7%) | 0 | **14 (100%)** |
| Pack D Section DD | 18 | 0 (0.0%) | 3 (16.7%) | 15 (83.3%) | 0 | **18 (100%)** |
| **Combined** | **54** | **3 (5.6%)** | **15 (27.8%)** | **36 (66.7%)** | **0** | **54 (100%)** |

**Critical finding:** Across all three sections, exactly 3 of 54 HO-labeled items (5.6%) are correctly labeled. 51 items (94.4%) are over-labeled. **Zero items require content rewrites.** All 54 can be corrected by relabeling alone.

---

## 4. Cross-Section Comparison: Do They Resemble Pack C EC?

| Metric | Pack C EC (S96P) | Pack A Section A | Pack D Section CD | Pack D Section DD |
|--------|-----------------|------------------|-------------------|-------------------|
| HO Labeled | 66 | 22 | 14 | 18 |
| HO Correct | 40 (60.6%) | 3 (13.6%) | 0 (0.0%) | 0 (0.0%) |
| Evaluate Correct | 10/27 (37.0%) | 2/12 (16.7%) | N/A | 0/7 (0.0%) |
| Analyze Correct | 30/39 (76.9%) | 1/10 (10.0%) | 0/14 (0.0%) | 1/11 (9.1%) |
| Dominant True Level | Analyze (45.5%) | Apply (81.8%) | Understand (85.7%) | Understand (66.7%) |
| Genuine HO items | 40 | 4 | 0 | 1 |
| Salvageable by relabel | 26 (100%) | 19 (100%) | 14 (100%) | 18 (100%) |

**Answer: No, these sections are substantially worse than Pack C EC.**

Pack C EC had a 60.6% HO accuracy rate — moderate misclassification with many one-tier-slippage items (Evaluate→Analyze). These three sections have 0-13.6% accuracy — **catastrophic** misclassification with predominantly multi-tier errors.

Pack C EC was the moderate benchmark. These sections reveal a much more severe defect pattern: items where the question is a textbook definition ("What is kaizen costing?") and the label says "Evaluate." This is a fundamentally different quality problem than the Evaluate→Analyze tier-slippage seen in Pack C EC.

---

## 5. Per-Section Recovery Profile

### 5.1 Recovery Categories

| Section | No Change | Relabel 1 Tier | Relabel 2+ Tiers | Rewrite | Rebuild |
|---------|-----------|---------------|-----------------|---------|---------|
| Pack A Section A | 3 | 10 | 9 | 0 | 0 |
| Pack D Section CD | 0 | 2 | 12 | 0 | 0 |
| Pack D Section DD | 0 | 3 | 15 | 0 | 0 |
| **Combined** | **3** | **15** | **36** | **0** | **0** |

### 5.2 Effort Estimate

| Section | Metadata Changes | Estimated Time (scripted) |
|---------|-----------------|--------------------------|
| Pack A Section A | 19 CognitiveLevel + ~10 DifficultyScore adjustments | ~15 minutes |
| Pack D Section CD | 14 CognitiveLevel adjustments | ~10 minutes |
| Pack D Section DD | 18 CognitiveLevel + ~7 DifficultyScore adjustments | ~15 minutes |
| **Combined** | **51 metadata edits** | **~40 minutes** |

---

## 6. Template Rotation Evidence

### 6.1 Clone Identification

| Section | Clone Groups | Items Per Group | Pattern |
|---------|-------------|-----------------|---------|
| Pack A Section A | None (unique items) | — | ASC scenarios are individually authored |
| Pack D Section CD | 7 groups | 2 each (14 items) | DL-012 rotation: same stem, rotated choice positions |
| Pack D Section DD | 6 groups | 2-3 each (18 items) | DL-012 rotation: same stem, cognitive label varies by position |

### 6.2 Rotation Artifact

In Section DD, items DD-046/048/050 share identical stems ("In the reciprocal method...") but DD-046 is labeled Analyze while DD-048 and DD-050 are labeled Evaluate — purely because of where they fell in the 5-item rotation group. The label was assigned by template position, not cognitive assessment. This confirms the S94P/S96P finding that template rotation is the primary root cause of misclassification.

---

*Generated: 2026-07-31 | Session 98P Auditor Phase*
