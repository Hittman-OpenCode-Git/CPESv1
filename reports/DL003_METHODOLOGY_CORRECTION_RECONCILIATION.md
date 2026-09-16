# DL-003 Scan Methodology Correction — Consolidated Reconciliation

**Date:** 2026-09-16
**Trigger:** Reconciliation hard-stop (AGENTS.md §6) — DL-003 counts unstable across reports
**Status:** Resolved — counts stable across 2 independent scans

---

## Summary

The prior Section A–F review reports used a substring-matching scan (`indexOf("never")`) to detect DL-003 forbidden terms. This produced massive false positives because **"whenever" (w-h-e-n-e-ver) contains the substring "never" (n-e-v-e-r)** starting at character 3. Every instance of "whenever" in a distractor was falsely flagged as a DL-003 violation.

An independent re-scan using proper word-boundary regex (`/never\b/` etc.) found the true DL-003 count is **16 unique QIDs** (not 81). Additionally, 5 "all of the above" items (DL-043) were incorrectly lumped into DL-003 counts.

### Corrected counts (unique-QID basis):

| Section | Report claimed | True DL-003 (absolute) | DL-043 ("all of the above") | SHORT-EW |
|---------|----------------|------------------------|----------------------------|----------|
| A | 0 | 2 | 0 | 30 |
| B | 34 | 4 | 0 | 34 |
| C | 20 | 1 | 2 | 17 |
| D | 17 | 2 | 0 | 40 |
| E | 10 | 2 | 2 | 23 |
| F | 8 | 5 | 1 | 22 |
| **TOTAL** | **81** | **16** | **5** | **166** |

### False positive root cause (verbatim evidence):

All 11 false-positive QIDs contain "whenever" matched as a substring of "never":

| QID | Pack | Context snippet |
|-----|------|-----------------|
| P1-A-012 | pack_a | "...accrued whenever a dollar amoun..." |
| P1-A-081 | pack_a | "...goodwill whenever fair value dec..." |
| P1-F-026 | pack_a | "Classification is required whenever two variables..." |
| P1-AC-016 | pack_c | "Increase goodwill whenever fair value rises..." |
| P1-AC-017 | pack_c | "Increase goodwill whenever fair value rises..." |
| P1-AC-018 | pack_c | "Increase goodwill whenever fair value rises..." |
| P1-AC-019 | pack_c | "Increase goodwill whenever fair value rises..." |
| P1-AC-020 | pack_c | "Increase goodwill whenever fair value rises..." |
| P1-BD-084 | pack_d | "...hold targets whenever conditions cha..." |
| P1-C-113 | pack_a | "...investment whenever project return..." |
| P1-DC-110 | pack_c | "methods converge whenever percentages su..." |

### Overlap note (P1B-E-150):

P1B-E-150 has BOTH a true DL-003 hit (`Choice D: "Management override of established controls is always possible"` — standalone "always") AND a DL-043 hit (`Choice C: "all of the above"`). This QID appears in both lists — it is counted once in the 16 DL-003 unique QIDs and once in the 5 DL-043 unique QIDs, for a total of 20 unique QIDs with forbidden terms.

---

## True DL-003 QID list (16 unique QIDs)

### Section A (2):
- P1B-A-161 (pack_b, Choice D, "never")
- P1-AC-125 (pack_c, Choice C, "never")

### Section B (4):
- P1B-B-172 (pack_b, Choice D, "always")
- P1B-B-206 (pack_b, Choice B, "never")
- P1-BD-006 (pack_d, Choice B, "impossible")
- P1-BD-012 (pack_d, Choice B, "never")

### Section C (1):
- P1-CD-119 (pack_d, Choice C, "never")

### Section D (2):
- P1-DC-118 (pack_c, Choice B, "never")
- P1-DD-076 (pack_d, Choice A, "impossible")

### Section E (2):
- P1B-E-150 (pack_b, Choice D, "always")
- P1E-E-124 (pack_e, Choice C, "never")

### Section F (5):
- P1B-F-138 (pack_b, Choice B, "never")
- P1B-F-148 (pack_b, Choice C, "impossible")
- P1-FC-056 (pack_c, Choice A, "always")
- P1-FC-057 (pack_c, Choice A, "always")
- P1-FD-011 (pack_d, Choice D, "never")

---

## DL-043 QID list (5 unique QIDs — "all of the above")

| QID | Pack | Choice | Section |
|-----|------|--------|---------|
| P1E-C-056 | pack_e | A | C |
| P1E-C-061 | pack_e | D | C |
| P1B-E-087 | pack_b | D | E |
| P1B-E-150 | pack_b | C | E (also DL-003) |
| P1B-F-100 | pack_b | C | F |

---

## Stability verification (two independent scans)

**Scan 1** (`reconcile_final.js`): 20 total forbidden-term QIDs (16 DL-003 + 5 DL-043 - 1 overlap + "all of the above" included in scan's forbidden list). SHORT-EW: 166 unique.

**Scan 2** (`dl003_truth_scan.js`): 16 DL-003 (word-boundary "always/never/impossible" only), 17 hits in 16 QIDs. 5 "all of the above" items found separately. SHORT-EW: 166 unique.

**Both scans agree:** 16 true DL-003 + 5 DL-043, SHORT-EW = 166.

---

## Impact on prior reports

All six Section A–F handoff reports need the following corrections:
1. Replace DL-003 count with the true word-boundary count from the table above
2. Move "all of the above" items from DL-003 to DL-043
3. Remove all false-positive "whenever" QIDs from DL-003 tables
4. Update summary table MEDIUM finding counts

**Section C has been corrected in-place.** Sections A, B, D, E, F retain their original inflated counts pending in-place correction.
