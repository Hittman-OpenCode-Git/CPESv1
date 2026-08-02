# P1 — Repository Truth Verification Report

**Generated:** 2026-08-01
**Lane:** Full Governance (read-only audit — no pack/state/content writes)
**Method:** Function-constructor parse of all 5 pack files (DL-029-compliant, within-object CC/EW association) + raw file line inspection (AGENTS.md §5 Dual Verification) + governance guard suite + downstream-consumer code trace.

---

## 1. Executive Summary

P1 confirms the **baseline counts** but **refutes the "clean" claims** in CURRENT_BASELINES.md §2 and the runtime defect manifest. Three material findings were not captured by any prior scan or blocklist:

| # | Finding | Scope | Learner Impact |
|---|---------|-------|----------------|
| F1 | **9 Certified Pack D Section B items carry DL-008** (non-empty ExplanationWrong[CorrectChoice]) | 9 items, all Certified | HIGH — Tier 1 delivery, correct-answer slot shows distractor/cross-item text |
| F2 | **20 items carry non-registry `question_state: "Active"`** | Pack C: 9, Pack D: 11 | MEDIUM — invisible to governance counts; scored as Tier 2/3 and deliverable |
| F3 | **3 Certified Pack A Section E items missing `CognitiveLevel`** (and `DifficultyScore`) | 3 items, all Certified | LOW-MEDIUM — metadata-incomplete Certified items in learner pool |

All three are **not covered** by `governance/DEFECT_MANIFEST_DL008_DL026.json`, `governance/delivery_blocklist.js`, or `governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json`.

---

## 2. Confirmed Baselines (PASS)

| Check | Result | Evidence |
|-------|--------|----------|
| QID counts | 500/500/500/500/545 = **2,545** | `Select-String '"QuestionID"'` per pack |
| Certified counts | 500/500/455/456/540 = **2,451** | `Select-String '"question_state": "Certified"'` per pack |
| Matches CURRENT_BASELINES.md §2 | ✅ | 2,451 total |
| Parse integrity | ✅ all 5 packs | Function-constructor parse + `node --check` |
| Governance guard | **66/66 PASS** | `node scripts/test_governance_guard.js` |
| `question_state` coverage | 2,545/2,545 (100%) | Function-constructor parse (no MISSING state) |
| Cognitive distribution | Analyze 188 / Evaluate 164 (pool-wide) | Function-constructor parse — matches S122 documented counts |
| Preflight | 0 divergences | `npm run preflight` |

---

## 3. Finding F1 — Certified Pack D Section B DL-008 Cluster (HIGH)

### 3.1 Detection

String-aware, within-object scan (Function-constructor parse, CC read from the same object as EW slots — immune to DL-029 forward-scan artifact). 9 Certified items have a non-empty `ExplanationWrong[CorrectChoice]`:

| QID | CC | EW[CC] len | Empty non-CC slots |
|-----|----|-----------|--------------------|
| P1-BD-008 | D | 751 | 1 (C) |
| P1-BD-015 | D | 461 | 1 (C) |
| P1-BD-056 | D | 1,038 | 1 (C) |
| P1-BD-064 | C | 375 | 1 (B) |
| P1-BD-070 | B | 783 | 1 (C) |
| P1-BD-076 | D | 796 | 0 |
| P1-BD-077 | B | 196 | 1 (A) |
| P1-BD-079 | D | 352 | 1 (C) |
| P1-BD-100 | D | 827 | 1 (A) |

**8 of 9 also carry DL-026** (empty non-CC distractor slot) — same rotation-artifact cluster.

### 3.2 Raw-File Verification (AGENTS.md §5)

- **P1-BD-008** (CC=D, EW_D 751 chars): EW_D contains **cross-item ZBB text** — "Option D focuses exclusively on the ongoing cost differential ($42,000 vs. $9,200/year) while ignoring the savings ZBB may generate" — while the actual Choice D is "It can perpetuate inefficiencies from prior periods without requiring justification of costs" (incremental budgeting drawback). Learner selecting wrong answers sees feedback about a completely different question's choices.
- **P1-BD-064** (CC=C, EW_C 375 chars): EW_C describes **Choice B's error** ("applies the high-low method ... but overlooks the step-cost constraint") at the C slot — misassigned distractor text at the CorrectChoice position.

Both verified by direct raw-file inspection (`content/packs/pack_d_corrected.js`).

### 3.3 Delivery Exposure

`assignTier` (app/app.js:1068) routes Certified → Tier 1 (highest priority). These 9 QIDs are **not present** in any blocklist source:
- `governance/DEFECT_MANIFEST_DL008_DL026.json` (264 entries, all P1-EC/ED/FC/FD) — **no P1-BD entries at all**
- `governance/delivery_blocklist.js` (117 entries; contains P1-BD-017/021/022/023/024/057/058/059) — **does not include these 9**
- `governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json` (same 8 P1-BD entries) — **does not include these 9**

**Consequence:** 9 Certified items are in the active Tier 1 learner delivery pool with defective `ExplanationWrong[CorrectChoice]`, directly contradicting CURRENT_BASELINES.md "DL-008: 0" and the manifest's `dl008_certified: 0`.

### 3.4 Root Cause

Pack D Section B Block 1 / S74 cognitive-upgrade wave items. The CC slots are non-empty with either cross-item text (DL-016-style rotation shift) or misassigned distractor text (DL-010-style). Same template-rotation family that produced the documented Pack C/D and Pack A Section E rotation artifacts. These escaped the 2026-07-23 DL-008 closeout because that sweep scoped Packs A/C/D/E and Pack D was reported "0 remaining" — this Section B cluster was missed.

---

## 4. Finding F2 — Non-Registry `question_state: "Active"` (20 items)

### 4.1 Detection

Function-constructor parse found 20 items with `question_state: "Active"`:

| Pack | QIDs |
|------|------|
| Pack C (9) | P1-EC-001, P1-EC-005, P1-EC-010, P1-EC-030, P1-EC-055, P1-FC-005, P1-FC-016, P1-FC-045, P1-FC-050 |
| Pack D (11) | P1-ED-002, P1-ED-015, P1-ED-020, P1-ED-040, P1-ED-050, P1-FD-002, P1-FD-010, P1-FD-020, P1-FD-040, P1-FD-046, P1-FD-050 |

### 4.2 Governance Impact

- **Not a registered state.** QUESTION_METADATA_STANDARD.md §9.1 lists only: Unprocessed, In Audit, Editorial Queue, Certified, Archived. "Active" is absent.
- **Invisible to counts.** These 20 are excluded from the 2,451 Certified total and from all state-based governance reporting.
- **Runtime-deliverable.** `assignTier` does NOT hard-exclude "Active" (only Archived/In Audit/Editorial Queue are excluded). Quality-scored → Tier 2 (all 19 scored ≥2) or Tier 3 (P1-FD-046, score −1). `selectWithDifficultyDistribution` fill order includes Tier 2/3 → **these items can reach learners** despite never being Certified.

### 4.3 Origin

S899 Phase 1 authoring (2026-07-28) intentionally used `question_state: "Active"` for 20 replacement items; S103P (2026-07-31) preserved it ("all 3 items — all Active"). The registry was never updated to recognize the state. Note: P1-FD-046 is a known shell item (no content block) — it is correctly excluded from delivery only by scoring (−1 → Tier 3, and lacks renderable content).

---

## 5. Finding F3 — Certified Pack A Items Missing CognitiveLevel (3 items)

| QID | Section | State | Missing |
|-----|---------|-------|---------|
| P1-E-081 | E | Certified | CognitiveLevel, DifficultyScore |
| P1-E-082 | E | Certified | CognitiveLevel, DifficultyScore |
| P1-E-083 | E | Certified | CognitiveLevel, DifficultyScore |

All 3 are Certified (Tier 1 delivery) and carry no `CognitiveLevel` key at all. Difficulty calibration, May coaching (which reads `CognitiveLevel` per may-context-builder.js:168), and CAQS §6 reporting silently degrade for these items.

---

## 6. Stale Defect Manifest (Systemic)

`governance/DEFECT_MANIFEST_DL008_DL026.json` (last written 2026-07-27) predates S899 (2026-07-28) and current pack state (2026-07-30). It reports:
- `dl008_certified: 0` — **false** (9 exist, F1)
- `dl026_certified: 0` — **false** (8 exist within the same F1 cluster)
- 264 blocked entries, all in P1-EC/ED/FC/FD — **no P1-BD / P1-CD coverage**

Prior S725/S726 documented this manifest as DL-029-contaminated and scheduled regeneration; it was partially regenerated (264 entries) but never rebuilt from Function-constructor parse for Packs A/B. The 9-item F1 cluster is the proof: the manifest's "0 Certified DL-008" claim is stale.

---

## 7. P1 Verdict

| Dimension | Status |
|-----------|--------|
| Repository truth (counts, parse, guard) | **CONFIRMED** — baselines accurate |
| Learner-pool safety | **NOT CLEAN** — 9 Certified DL-008 items + 3 metadata-incomplete Certified items in Tier 1 delivery |
| Governance coverage | **GAP** — 20 non-registry "Active" items invisible and runtime-deliverable |
| Manifest accuracy | **STALE** — contradicts verified raw-file state |

**P2 implication:** P2 (Cognitive Integrity Verification) can proceed, but its scope must include the F1 cluster (EW[CC] integrity is a learner-safety item, not just a label question). The "taxonomy-integrity proof" framing holds — the label counts are intact; the *explanation-slot integrity* on 9 Certified Pack D Section B items is the actionable finding.

---

## 8. Evidence File Index

| Item | Location |
|------|----------|
| Pack files | `content/packs/pack_{a-e}_corrected.js` |
| Scan script (state coverage) | `%TEMP%\opencode\p1_state_audit.js` |
| Scan script (cognitive audit) | `%TEMP%\opencode\p1_cognitive_audit.js` |
| Scan script (DL-008/DL-026/state/CL) | `%TEMP%\opencode\p1_safety_scan.js` |
| Scan script (CC raw verify) | `%TEMP%\opencode\p1_cc_verify.js` |
| Scan script (DL-030 check) | `%TEMP%\opencode\p1_dl030_check.js` |
| Scan script (Active-tier classification) | `%TEMP%\opencode\p1_active_tier.js` |
| Runtime delivery logic | `app/app.js` — `assignTier` (1068), `selectWithDifficultyDistribution` (2058), `getMCQPool` (2163) |
| Defect manifest | `governance/DEFECT_MANIFEST_DL008_DL026.json` (stale) |
| Delivery blocklists | `governance/delivery_blocklist.js`, `governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json` |
