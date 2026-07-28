# Session 14 — Remaining Gate and Risk Register

**Date:** 2026-07-24
**Session Type:** Read-Only — No source, content, or scoring writes.
**Status:** `CLOSED DEFECTS: STRUCTURAL PACK C AND CASE-POOL IDENTITY. OPEN: SCORING, EDITORIAL, PACK D/E STRUCTURAL, GOVERNANCE.`

---

## 0. Defects Now Closed

The following defect categories, previously tracked as open risks, are now confirmed resolved and are not carried forward as remaining gates:

| Defect | Scope | Resolution |
|--------|-------|-----------|
| **Pack C BC-094/095 merged-object** | 2 QIDs | Resolved Session 11B — both items now independent parseable objects |
| **Pack C object count 499/500** | Pack C | Resolved Session 11B — 500/500 confirmed |
| **Case-pool duplicate CaseID risk** | All packs | Confirmed Session 11A — 435/435 unique; `seen.includes(x.CaseID)` active |
| **app.js SEEN_KEY null-includes crash** | app.js:777 | Resolved Session 13 — `|| '[]'` moved to guard getItem() result |
| **Pack B DL-017 backtick-newline corruption** | 275 sites | Resolved — all `` `n `` artifacts and `NNN: true,` artifacts removed |
| **Pack B Sections A/D DL-024 missing question_state** | 150 items | Resolved — all now carry `question_state: "Unprocessed"` |
| **Pack B Sections A/D DL-008 false-positive (111 counts)** | 150 items | Resolved — string-aware parser confirmed 0 DL-008 |
| **Pack E DL-018 missing EW[CC] fields** | 351 items | Resolved — all CC slots now have `""` |
| **Pack E Section C Certified DL-021** | 5 items | Resolved (Autonomous Run Part 4) |
| **Pack A Section D DL-025 Certified slots** | 51 items | Resolved (Autonomous Run Part 2) |

---

## 1. Remaining Gates — Structural / Content

These are defects in question data that affect renderability, correctness, or learner experience.

### Tier 1 — Critical / Blocking

| Gate | Type | Description | QID / Scope | Required Session | Severity |
|------|------|-------------|-------------|-----------------|----------|
| **S14-G01** | Structural | **P1-AD-075 missing content block.** Item has metadata block (QuestionID, question_state="Certified", ChoiceA-D, ExplanationWrongA-D) but NO content block (Stem, Choices, CorrectChoice, ExplanationCorrect). Verified 1 occurrence of "P1-AD-075" in pack_d_corrected.js at line 4034. Cannot be rendered — blocks learner delivery on this item. | P1-AD-075 (Pack D) | **PACK D P1-AD-075 STRUCTURAL REPAIR** — content-block reconstruction required. | **Critical** |
| **S14-G02** | Content | **Pack C Certified DL-008 (52 items).** 52 Certified items in Pack C Sections A+B carry non-empty ExplanationWrong[CorrectChoice]. Enforced-depth audit confirmed. Learner pool affected — wrong-answer text displayed in correct-answer slot. | P1-AC/BC — 52 QIDs | **DL-008 CERTIFIED REMEDIATION** — clear EW[CC] slots. Requires CC-offset-aware methodology per DL-029. | **High** |
| **S14-G03** | Content | **Phase 0B CorrectChoice Ground-Truth Audit incomplete.** Only 166/873 Certified items (19.0%) have per-item derivation evidence. 707 items remain without independent answer-key verification. DL-030 precedent (5 wrong-answer CC errors found in first 873-audit) confirms risk. | 707 Certified items (B/C/D/E) | **PHASE 0B COMPLETION** — per `PHASE0B_PRIMARY_LEDGER_COMPLETION.md` 41-batch plan. | **High** |

### Tier 2 — Medium / Important

| Gate | Type | Description | QID / Scope | Required Session | Severity |
|------|------|-------------|-------------|-----------------|----------|
| **S14-G04** | Content | **P1E-E-048 framework/version dispute.** Item asks about COSO ERM component count; answer key and framework version require human LOS authorization against current IMA blueprint. | P1E-E-048 (Pack E) | **FRAMEWORK VERSION AUTHORIZATION** — human decision required. | **Medium** |
| **S14-G05** | Content | **Pack E Section C DL-021 (95 non-Certified items).** All 95 items have zero distractor ExplanationWrong fields (absent). 300 fields require authoring from scratch. Blocks certification of Section C. | P1E-C-* — 95 QIDs | **EDITORIAL CAQS — PACK E SECTION C DISTRACTOR AUTHORING** | **Medium** |
| **S14-G06** | Content | **Pack C BC-094/095 deferred editorial fields.** 3 fields: BC-094 EW-A (DL-010 misattribution), BC-094 EW-D (empty), BC-095 EW-B (DL-010 + DL-013). Do not block renderability but degrade educational quality. | 2 QIDs, 3 fields | **EDITORIAL CAQS — BC-094/095 DEFERRED FIELDS** | **Medium** |
| **S14-G07** | Content | **DL-026 Certified pool residual slots.** ~6 remaining empty non-CC ExplanationWrong slots across Pack A (spot-checks: BC-030, AC-030, BC-060) and Pack C (scan false-positives from DL-016). Pack D Sections A+B have DL-016 metadata-content mismatch causing scan false positives. | ~6 QIDs across Packs A/C | **DL-026 RESIDUAL REMEDIATION** | **Medium** |
| **S14-G08** | Content | **DL-013 remaining boilerplate (~851 fields, 366 QIDs).** Unremediated template-boilerplate distractor explanations across Pack A Sections A/B/C/E (94 QIDs), Pack C Sections D/E/F (159 QIDs), and Pack D Sections E/F (113 QIDs). Zero Certified items affected. | 366 QIDs, 851 fields | **DL-013 BATCH REMEDIATION** | **Medium** |

### Tier 3 — Low / Cosmetic

| Gate | Type | Description | QID / Scope | Required Session | Severity |
|------|------|-------------|-------------|-----------------|----------|
| **S14-G09** | Structural | **DL-015 Topic numbering shift (E.040–E.042).** Topic field number labels shifted by one in Pack A Section E. Descriptions correct; cosmetic only. | 3 QIDs (Pack A) | Fix during next Section E certification pass. | **Low** |
| **S14-G10** | Structural | **DL-016 Metadata-content Choice mismatch (Pack A Section E).** Metadata-block ChoiceA-D text shifted by one position relative to content-block Choices. Content block authoritative for rendering — no learner impact. | 5 QIDs (Pack A) | Fix during next Section E certification pass. | **Low** |
| **S14-G11** | Structural | **DL-014 Sibling null guard missing (app.js:1187).** `s.mcqs.length` not guarded with `|| []` like sibling line 1188. No crash reported. | app.js:1187 | Defensive hardening during next app.js session. | **Low** |

---

## 2. Remaining Gates — Scoring / Behavior (`app.js`)

These are design gaps in the application's scoring logic that affect learner experience but do not cause crashes.

| Gate | Type | Description | App.js Reference | Required Session | Severity |
|------|------|-------------|-----------------|-----------------|----------|
| **S14-G12** | Scoring | **Multi-select partial credit (S3-GAP-02).** Multi-select items use all-or-nothing logic. Correct partial-credit design requires boolean-to-fraction conversion (e.g., 2/3 correct choices = 0.67 credit). Requires refactor of `scoreItem()` and `gradeSession()`. | `scoreItem()` | **SCORING DESIGN AND PARTIAL-CREDIT IMPLEMENTATION** | **High** |
| **S14-G13** | Scoring | **Matching partial credit (S3-GAP-03).** Matching items use all-or-nothing logic. Same fractional design requirement as multi-select. Requires refactor of match-type scoring path. | `scoreItem()` (match branch) | **SCORING DESIGN AND PARTIAL-CREDIT IMPLEMENTATION** | **High** |
| **S14-G14** | Scoring | **Hold-state gap (S3-GAP-01).** `question_state="Hold"` currently treated as Tier 2/3 included in pool. Requires governance decision: should Hold items be excluded from learner delivery (like Unprocessed/Archived) or remain included? | `getPool()` tier assignment | **GOVERNANCE — HOLD STATE DECISION** | **Medium** |
| **S14-G15** | Scoring | **Grade-band interpretation (S3-GAP-04).** Risk of implied official CMA equivalence. Score bands and pass/fail messaging may create false impression of official CMA grading. | Grade display / summary | **GOVERNANCE — MESSAGING REVIEW** | **Medium** |

---

## 3. Remaining Gates — Governance and Release

| Gate | Type | Description | Required Session | Severity |
|------|------|-------------|-----------------|----------|
| **S14-G16** | Governance | **Phase 0B Primary Ledger completion.** 707 Certified items remain without independent answer-key verification. DL-030 established 5 of 873 (0.57%) error rate — completing the ledger is a release-blocking governance requirement per CAQS §1.7.2. | **PHASE 0B COMPLETION** | **High** |
| **S14-G17** | Governance | **Pack B Sections A/D certification.** 150 structurally clean items ready for CAQS §1.6 six-dimension verification. Requires human authorization to enter the "In Audit" pipeline. Zero blocking structural defects. | **PACK B SECTIONS A/D CERTIFICATION PASS** | **Medium** |
| **S14-G18** | Governance | **Browser platform coverage.** Only Chromium tested. Other browsers (Firefox, Safari, Edge) not validated. Storage API, CSS rendering, and DOM behavior may differ. | **CROSS-BROWSER VALIDATION** | **Low** |
| **S14-G19** | Governance | **Documentation and messaging.** No user-facing statement about known limitations: non-equivalence to official CMA scoring, partial-credit gaps, Hold-state behavior, editorial deferrals. Required before public release. | **USER-FACING DOCUMENTATION** | **Medium** |

---

## 4. Distinction: Technical vs. Governance/Content Risks

| Type | Examples | Blocking Release? |
|------|----------|-------------------|
| **Technical — structural** | S14-G01 (AD-075 missing block), S14-G02 (DL-008 Certified) | Yes — blocks renderability or correct display |
| **Technical — scoring** | S14-G12/G13 (partial credit), S14-G14 (Hold state) | Yes — affects scoring accuracy |
| **Content — editorial** | S14-G05 (DL-021), S14-G06 (BC-094/095), S14-G07 (DL-026) | No — degrades educational quality but doesn't crash or mis-score |
| **Content — correctness** | S14-G03 (Phase 0B), S14-G04 (P1E-E-048) | Yes — wrong answer key is learner-safety risk |
| **Governance** | S14-G16 (ledger), S14-G17 (certification), S14-G19 (messaging) | Process-dependent — some are release-blocking |

---

## 5. Recommended Next Session Types

Without defining full prompts, the next three session types in priority order:

### 1. `PACK D P1-AD-075 STRUCTURAL REPAIR` (Write-Authorized)

Reconstruct the missing content block for P1-AD-075. Requires:
- Content-block fields: Part, Section, SectionName, Topic, Stem, Choices, CorrectChoice, ExplanationCorrect, StudyLinks, SourceDescription, etc.
- Infer correct content from metadata-block ChoiceA-D (material error correction / prior period adjustment topic).
- Backup-before-write mandatory per BACKUP_PROTOCOL.md.
- Verify 500/500 object parity post-repair.

### 2. `DL-008 CERTIFIED POOL REMEDIATION` (Write-Authorized)

Clear non-empty ExplanationWrong[CorrectChoice] for 52 Certified Pack C items. Requires:
- CC-offset-aware methodology (per DL-029) to avoid false positives.
- Bucket 1 pattern (calculation summaries): mechanical clear, zero content loss.
- Independent verification after each batch.
- Backup-before-write mandatory.

### 3. `SCORING DESIGN AND PARTIAL-CREDIT IMPLEMENTATION` (Write-Authorized on app.js)

Design and implement fractional partial-credit scoring for multi-select and matching item types. Requires:
- Boolean-to-fraction conversion for multi-select: score = correct_choices / total_correct.
- Matching: fraction of correct pairs.
- Backward compatibility with existing score calculations.
- Browser validation after implementation.

---

## 6. Statement: No Source Changes Made

This session performed zero modifications to any source, content, scoring, governance, or prior-report file. All classifications and recommendations are recorded in Session 14 reports only. The source baseline hashes recorded in Section 1 of `SESSION14_POSTREPAIR_TECHNICAL_CONSOLIDATION.md` are the definitive pre-session state.

---

## 7. Cross-References

| Document | Reference |
|----------|-----------|
| `SESSION14_POSTREPAIR_TECHNICAL_CONSOLIDATION.md` | Companion consolidation report — pre-flight hashes, pack-level table, case-pool summary, runtime validation |
| `SESSION_STATUS_2026-07-23.md` | Last end-of-session handoff; open risks §5 |
| `DEFECT_LIBRARY.md` | DL-008, DL-013, DL-014, DL-015, DL-016, DL-021, DL-024, DL-025, DL-026, DL-029, DL-030 |
| `PHASE0B_PRIMARY_LEDGER_COMPLETION.md` | Phase 0B ledger: 41-batch plan for 707 remaining items |
| `PHASE0B_DL029_GROUND_TRUTH_AND_PREFLIGHT_REPORT.md` | DL-030: 5 wrong-answer CC errors confirmed |
| `SESSION11_CASE_POOL_IDENTITY_AND_DUPLICATION_AUDIT.md` | Case-pool verdict: 435 unique, 0 duplicates |

---

*Generated 2026-07-24 — Session 14 read-only consolidation.*
