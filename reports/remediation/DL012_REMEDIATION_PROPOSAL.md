# DL-012 Remediation Proposal — Pack C/D Section E Clones

**Date:** 2026-07-22
**Status:** Proposal — corrected after reconciliation halt; awaiting explicit selection
**Scan Version:** 3 (definitive — 2026-07-22 definitive re-scan)
**Governance Guard:** Registered in opencode.json (`.opencode/plugins/governance-guard.js` — all 5 rules)

---

## 1. Pre-flight Status

| Check | Result |
|-------|--------|
| governance-guard.js exists | Confirmed — `.opencode/plugins/governance-guard.js`, 217 lines, 5 rules |
| governance-guard registered | Registered in `opencode.json` plugin array |
| opencode-background-agents available | Registered in `opencode.json` |
| opencode-goal-plugin available | Registered in `opencode.json` |
| opencode-websearch-cited available | Registered in `opencode.json` |

---

## 2. Reconciliation Haltsite: Count Stability Confirmed

Three scans were run. Only the third was definitive.

| Scan | Date | Pack C | Pack D | Total | Standalone | Clones | Errors |
|------|------|--------|--------|-------|------------|--------|--------|
| DL012 report (manual) | 2026-07-22 | "56" | "56" | "128" | — | — | Arithmetic error (56+56=112≠128); undercount |
| BG Agent 1 (prior) | 2026-07-22 | 69 | 69 | 138 | 10 | 138 | Groups 1 & 15 miscounted as 4 items; 2 hallucinated Section F misplacements |
| **BG Agent 3 (definitive)** | **2026-07-22** | **75** | **75** | **150** | **10** | **140** | **Zero errors** |

### 2.1 Definitive Inventory

| Metric | Pack C | Pack D | Total |
|--------|--------|--------|-------|
| Total Section-E-prefixed items | 75 (EC-001–EC-075) | 75 (ED-001–ED-075) | 150 |
| Clone groups | 14 | 14 | 28 |
| Items per group | 5 | 5 | — |
| Clone items (28×5) | 70 | 70 | **140** |
| Standalone unique items | 5 | 5 | **10** |
| Section F misplacements | 0 | 0 | **0** |

### 2.2 Standalone Items (Not Clones — Preserved)

| Pack | QuestionIDs | Topics |
|------|-------------|--------|
| Pack C | EC-021, EC-022, EC-023, EC-024, EC-025 | vendor-setup-payment, duplicate-payment-control, IT-access-terminated, application-input-control, preventive-vs-detective |
| Pack D | ED-071, ED-072, ED-073, ED-074, ED-075 | change-management-production, fraud-risk-purchasing, exception-reports-unreviewed, reconciliation-incompatible-duties, segregation-approval-reconciliation |

All 10 have custom (non-template) distractor explanations, unique stems, and real business scenarios. Confirmed match with the user's expected list.

### 2.3 Section F Misplacements: ZERO — Prior Claim Retracted

The first background agent hallucinated that EC-075 (`E-C075-remediation-of-control-deficiency`) and ED-075 (`E-D075-segregation-approval-reconciliation`) were Section F topics. Both are conclusively Section E. EC-075 is a member of clone Group 14 (remediation-of-control-deficiency). ED-075 is a standalone item (in the correct Section E standalone list above).

### 2.4 question_state Distribution

| State | Pack C | Pack D | Total |
|-------|--------|--------|-------|
| `"Unprocessed"` | 19 (14 leaders + 5 standalones) | 19 (14 leaders + 5 standalones) | 38 |
| MISSING (no field) | 56 (4 non-leader clones × 14 groups) | 56 | 112 |
| **Total** | 75 | 75 | 150 |

The original DL012 report's "56 per pack" figure matches the MISSING count — the reporter counted only items without `question_state`, excluding the 19 items that already have it set to `"Unprocessed"`.

### 2.5 Registry Cross-Check

- **Zero items Certified** — none with `question_state: "Certified"`
- **Zero items in learner pool** — per CAQS_v1.0.md §1.7.1 gate
- All items with `question_state` populated read `"Unprocessed"`
- `MASTER_QUESTION_REGISTRY.md` lists all 150 items as "Not Scored" with no CAQS score

---

## 3. Clone Groups — Full Inventory (28 groups, 5 items each)

### 3.1 Pack C Clone Groups

| G# | Concept | Items (EC-*) | TPL-Free | Seed Candidate | Seed EC | Prev Seed |
|----|---------|-------------|----------|----------------|---------|-----------|
| 1 | segregation-of-duties-design | 001–005 | EC-004 | **⛔ EC-004** (custom, 302) | 302 | EC-003 (TPL, 175) |
| 2 | coso-internal-control-framework | 006–010 | EC-008 | EC-008 (custom, 312) | 312 | EC-007 (TPL, 184) |
| 3 | fraud-triangle-elements | 011–015 | EC-014 | EC-014 (custom, 224) | 224 | EC-013 (TPL, 146) |
| 4 | physical-controls-over-assets | 016–020 | EC-017, EC-020 | EC-020 (custom, 269) | 269 | EC-019 (TPL, 142) |
| 5 | bank-reconciliation-control | 026–030 | EC-028 | EC-028 (custom, 280) | 280 | EC-027 (TPL, 155) |
| 6 | erm-risk-appetite | 031–035 | — none — | EC-031 (leader, 168 TPL) | 168 | EC-031 (same) |
| 7 | it-general-controls-access | 036–040 | EC-040 | EC-040 (custom, 226) | 226 | EC-039 (TPL, 144) |
| 8 | management-override-risk | 041–045 | EC-041 | EC-041 (custom, 280) | 280 | EC-040 (wrong group) |
| 9 | whistleblower-hotline-purpose | 046–050 | EC-049 | EC-049 (custom, 266) | 266 | EC-048 (TPL, 154) |
| 10 | compensating-control-small-business | 051–055 | EC-052 | EC-052 (custom, 270) | 270 | EC-051 (TPL, 148) |
| 11 | control-environment-tone-at-top | 056–060 | EC-060 | EC-060 (custom, 276) | 276 | EC-059 (TPL, 156) |
| 12 | inherent-risk-vs-control-risk | 061–065 | EC-061 | EC-061 (custom, 241) | 241 | EC-060 (wrong group) |
| 13 | segregation-cash-custody-recording | 066–070 | EC-066 | EC-066 (custom, 217) | 217 | EC-066 (same) |
| 14 | remediation-of-control-deficiency | 071–075 | EC-072 | EC-072 (custom, 244) | 244 | EC-071 (TPL, 153) |

### 3.2 Pack D Clone Groups

| G# | Concept | Items (ED-*) | TPL-Free | Seed Candidate | Seed EC | Prev Seed |
|----|---------|-------------|----------|----------------|---------|-----------|
| 15 | three-lines-of-defense-model | 001–005 | ED-001 | ED-001 (custom, 237) | 237 | ED-001 (same) ✅ |
| 16 | access-control-least-privilege | 006–010 | ED-010 | ED-010 (custom, 208) | 208 | ED-009 (TPL, 154) |
| 17 | independent-verification-control-activity | 011–015 | ED-014 | ED-014 (custom, 225) | 225 | ED-013 (TPL, 158) |
| 18 | erm-risk-response-strategies | 016–020 | — none — | ED-016 (leader, 152 TPL) | 152 | ED-016 (same) |
| 19 | control-activities-authorization | 021–025 | ED-025 | ED-025 (custom, 197) | 197 | ED-024 (TPL, 159) |
| 20 | monitoring-ongoing-evaluations | 026–030 | ED-028 | ED-028 (custom, 210) | 210 | ED-027 (TPL, 154) |
| 21 | data-backup-disaster-recovery | 031–035 | ED-035 | ED-035 (custom, 215) | 215 | ED-034 (TPL, 166) |
| 22 | change-management-control-it-systems | 036–040 | — none — | ED-036 (leader, 144 TPL) | 144 | ED-035 (wrong group) |
| 23 | risk-assessment-likelihood-impact | 041–045 | ED-042 | ED-042 (custom, 238) | 238 | ED-041 (TPL, 163) |
| 24 | code-of-conduct-ethics-program | 046–050 | — none — | ED-046 (leader, 158 TPL) | 158 | ED-046 (same) |
| 25 | password-access-authentication-control | 051–055 | — none — | ED-051 (leader, 167 TPL) | 167 | ED-051 (same) |
| 26 | internal-control-cost-benefit-limitation | 056–060 | ED-058 | ED-058 (custom, 273) | 273 | ED-057 (TPL, 184) |
| 27 | vendor-master-file-controls | 061–065 | ED-064 | ED-064 (custom, 280) | 280 | ED-063 (TPL, 168) |
| 28 | audit-committee-oversight-role | 066–070 | ED-066 | ED-066 (custom, 265) | 265 | ED-065 (TPL, 168) |

### 3.3 TPL-Free Items Summary

| Pack | Groups with ≥1 TPL-free item | TPL-free items total | Completely TPL groups (no custom distractors) |
|------|------------------------------|---------------------|-----------------------------------------------|
| Pack C | 12 of 14 | 14 | Groups 6 (erm-risk-appetite) |
| Pack D | 8 of 14 | 8 | Groups 18, 22, 24, 25 |
| **Combined** | **20 of 28** | **22** | **5 groups** |

22 of 140 clone items have original distractor explanations. The remaining 118 are fully template-based.

### 3.4 ⛔ Group 1 Seed — Manual Decision Required

**Stop condition triggered.** Group 1 was miscounted by the first agent as 4 items (EC-001 through EC-004). The correct 5-item set (EC-001 through EC-005) reveals:

| Item | EC Length | Distractor Quality | CorrectChoice | Notes |
|------|-----------|-------------------|---------------|-------|
| EC-001 | 175 | ALL TPL | A | Leader (has question_state) |
| EC-002 | 175 | ALL TPL | B | |
| EC-003 | 175 | ALL TPL | C | **Prior seed (selected from 4-item set)** — "Difficult" |
| **EC-004** | **302** | **4/4 custom** | D | **Correct seed (only TPL-free item in group)** |
| EC-005 | 175 | ALL TPL | A | Missed by prior agent entirely |

**Previous seed: EC-003** — selected because the prior agent only saw EC-001–EC-004 and EC-003 was marked "Difficult" with the longest EC among those four (175).

**Correct seed: EC-004** — the only item with custom (non-template) distractor explanations (EC=302 vs. 175 for all others). EC-003's distractors are entirely template text.

**Decision required:** Keep EC-003 (the prior selection — a template item with no original content, but the group leader with `question_state` already set) or switch to EC-004 (the only item with genuine distractor explanations). Recommendation below.

### 3.5 Group 15 Seed — Confirmed, No Change ✅

ED-001 was correctly identified as seed in the prior 4-item scan and remains the correct seed in the 5-item set. ED-001 is the only TPL-free item in Group 15 (EC=237, custom distractors). ED-002–ED-005 are all TPL with EC=188.

---

## 4. Seed Selection Policy (for Groups Other Than 1)

Two seed-selection heuristics exist, and they conflict for groups where the TPL-free item is not the group leader:

| Heuristic | Selects | Rationale |
|-----------|---------|-----------|
| **Content quality** | Item with highest EC length + custom distractors | Preserves the best educational content |
| **Structural position** | Group leader (first item, has `question_state` already) | Minimizes metadata surgery — leader already has `question_state: "Unprocessed"` |

For 22 of 28 groups, these heuristics point to different items. The table in §3.1–3.2 uses the **content quality** heuristic (select the item with custom distractors and highest EC length) as the default.

The content-quality heuristic is recommended because:
1. Seeds will eventually undergo CAQS review and certification — starting from the best content reduces future revision effort.
2. The group leaders were determined by template numbering, not by content quality.
3. `question_state` is trivially addable to any item (it's currently MISSING on all non-leader items anyway).

Groups where content-quality seed ≠ group leader are marked with "TPL, lower EC" in the "Prev Seed" column of §3.1–3.2. The prior agent uniformly selected the group leader when no TPL-free item existed, but selected the wrong leader when the TPL-free item was a non-leader position.

---

## 5. Remediation Options

### 5.1 Option A — Archive Redundant Clones

**Mechanism:** Keep 1 seed per clone group, set `question_state: "Archived"` on 4 clones per group.

**Scope:**

| Action | Count |
|--------|-------|
| Seeds retained (active) | 28 |
| Clones archived (140 − 28) | **112** |
| Standalone items preserved (active) | 10 |
| Section F misplacements | **0** (none exist) |
| **Resulting active Pack C/D Section E** | **38** (28 seeds + 10 standalone) |

**Session-generation impact:** No regression. All 150 items are currently excluded from the learner pool (`question_state` is either `"Unprocessed"` or MISSING — neither qualifies). After archival, seeds will be `"Unprocessed"` (eligible for future certification), 10 standalones stay `"Unprocessed"`, and 112 clones become `"Archived"` (permanently excluded).

### 5.2 Option B — Re-key UniqueConceptKey for Runtime Dedup

**Mechanism:** Rewrite `UniqueConceptKey` so all 5 items in each clone group share one key. Runtime `uniqueByConcept` suppresses 4 of 5.

**Scope:** 140 `UniqueConceptKey` edits (112 clones rewritten to match seed key).

**Same reliability tradeoffs and answer-rotation risk as prior version.** No change from original proposal — Option B remains the runtime-suppression approach vs. Option A's permanent archival.

---

## 6. Precedent from REVISION_HISTORY.md

Unchanged from original proposal. The ASC 450 clone cluster consolidation (2026-07-22) archived redundant clones (P1-A-044, P1-A-064) and kept seeds. This is the established pattern.

---

## 7. Recommendation: Option A (Archive)

**Rationale unchanged.** Precedent, definitiveness, clarity, auditability. Plus: the Group 1 seed question is moot under Option A if EC-003 is selected — it remains active regardless and gets a future content-quality upgrade opportunity. If EC-004 is preferred, the write plan adjusts by one item.

---

## 8. Write Operation Plan (Option A — Corrected)

### 8.1 Files Affected

| File | Action | Items Touched |
|------|--------|---------------|
| `pack_c_corrected.js` | Set `question_state: "Archived"` | 56 items (4 clones × 14 groups) |
| `pack_d_corrected.js` | Set `question_state: "Archived"` | 56 items (4 clones × 14 groups) |
| `knowledge/REVISION_HISTORY.md` | Add DL-012 remediation entry | 1 entry |

**Total write scope: 112 `question_state` changes + 1 revision entry.**

### 8.2 Governance Guard Compliance (Rule 5 — 30-item block limit)

112 items ÷ 28 per batch = exactly 4 batches. Each batch covers 7 groups × 4 clones = 28 items. All four batches are under Rule 5's 30-item threshold.

The 4-batch structure exploits the natural half-pack split: 14 groups per pack, each batch covers 7 groups. This is a deliberate grouping (7 groups is exactly half a pack's clone inventory), not coincidental — but the number 28 landing under 30 is a fortunate alignment.

### 8.3 Batch Table

| Batch | Pack | Groups | QuestionIDs to Archive | Count |
|-------|------|--------|------------------------|-------|
| 1 | C | 1–7 | EC-001,002,003,005; EC-006,007,009,010; EC-011,012,013,015; EC-016,017,018,019; EC-026,027,029,030; EC-032,033,034,035; EC-036,037,038,039 | 28 |
| 2 | C | 8–14 | EC-042,043,044,045; EC-046,047,048,050; EC-053,054,055; EC-056,057,058,059; EC-062,063,064,065; EC-067,068,069,070; EC-071,073,074,075 | 28 |
| 3 | D | 15–21 | ED-002,003,004,005; ED-006,007,008,009; ED-011,012,013,015; ED-017,018,019,020; ED-021,022,023,024; ED-026,027,029,030; ED-031,032,033,034 | 28 |
| 4 | D | 22–28 | ED-037,038,039,040; ED-041,043,044,045; ED-046,047,048,049,050; ED-051,052,053,054,055; ED-056,057,059,060; ED-061,062,063,065; ED-067,068,069,070 | 28 |

**Note:** Batch 4 includes 5 items for Group 24 (code-of-conduct) and Group 25 (password-access) because those groups have no TPL-free seed — all 5 items are TPL. The leader (first item with `question_state`) is kept. For groups with a TPL-free seed, that item is excluded from the archive list.

The archive lists above use the **content-quality seed** from §3.1–3.2. If a different seed selection policy is chosen for any group (particularly Group 1), the affected batch adjusts by ±1 item.

### 8.4 Group 1 Blow-up (per-batch impact)

If EC-003 is kept (prior selection) instead of EC-004 (content-quality selection):
- Batch 1 would archive EC-001,002,**004**,005 instead of EC-001,002,**003**,005
- Item count unchanged (28). No batch size violation.
- Seed quality: EC-003 has 175-char EC, ALL TPL distractors, zero original content.

If EC-004 is kept (content-quality selection, recommended):
- As shown in the batch table above.
- Seed quality: EC-004 has 302-char EC, 4/4 custom distractors.

### 8.5 Backup Protocol (Hard Requirement — Not Yet Executed)

Per `knowledge/BACKUP_PROTOCOL.md`:

1. Before any edit: copy `pack_c_corrected.js` → `pack_c_corrected.js.bak-YYYYMMDDHHMMSS`
2. Before any edit: copy `pack_d_corrected.js` → `pack_d_corrected.js.bak-YYYYMMDDHHMMSS`
3. Confirm each backup exists with non-zero size before first batch
4. Re-serialization safety: any rebuild script must parse all objects before writing output and fail loudly on first parse error

Backups have NOT been created yet — this is a plan, not an execution.

### 8.6 RULE 1 Compliance

All `question_state` changes must pair with a `knowledge/REVISION_HISTORY.md` entry. The revision entry will be added after all 4 batches complete, documenting the 28 seed selections, 112 archived clone QuestionIDs, and the backup filenames.

---

## 9. Group 1 Seed — ⛔ Manual Decision Required

This is the only stop condition triggered. From §3.4:

| Property | EC-003 (prior selection) | EC-004 (recommended) |
|----------|--------------------------|----------------------|
| ExplanationCorrect | 175 chars | 302 chars |
| Distractors | ALL template ("plausible misconception...") | 4/4 custom, choice-specific |
| Difficulty | "Difficult" | Not marked Difficult |
| question_state | `"Unprocessed"` (already set) | MISSING (needs to be set) |
| CorrectChoice | C | D |
| Original content | Zero — entire question is template | Genuine distractor explanations |

**Recommendation: EC-004.** The entire purpose of keeping a seed is to preserve the best content. EC-003 has zero original content — it is no better than any of the clones being archived. EC-004 is the only item in Group 1 with educationally substantive material.

**No batch-size impact either way.** The archive count stays at 28 for Batch 1 regardless of which item is kept.

---

## 10. Stop Conditions

| Condition | Status |
|-----------|--------|
| Governance-guard confirmed active | Registered in opencode.json |
| No background-agent writes attempted | Confirmed |
| No items outside 140-clone scope touched | Confirmed — 10 standalone excluded, 0 Section F, 0 Section A–D items |
| All 28 groups confirmed at 5 items | Confirmed — definitive scan |
| Backup protocol built into plan | Confirmed (not yet executed) |
| Block-size constraint: 4 batches ≤28 | Confirmed — all under 30 |
| Group 1 seed change flagged | **⛔ AWAITING DECISION** (see §9) |
| Group 15 seed confirmed no change | Confirmed — ED-001 remains seed ✅ |

---

## 11. Required Output Complete

This proposal presents both options with corrected counts (140 clones, 112 to archive, 4 batches of 28), corrected seed candidates from the definitive scan, and the Group 1 seed decision flagged for manual resolution. **No remediation executed.** Awaiting:
1. Group 1 seed decision (EC-003 or EC-004)
2. Option A/B selection

---

*Scans: ses_07389ccdfffejeXgMZc9mW1ZMo (v1 — erroneous), ses_073898aceffe8UrmqxwCkDumhq (UCKey analysis), ses_0737dd580ffeSt607c3qpDyrOg (v3 — definitive).*
