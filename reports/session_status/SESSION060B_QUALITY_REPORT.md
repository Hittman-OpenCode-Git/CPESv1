# SESSION060B — Quality Report

**Session:** S60B — Original DL-012 Clone Program Closure (EC + ED)
**Date:** 2026-07-28
**Items:** 19 replacements (EC=5, ED=14)

---

## Quality Metrics

| Metric | EC (5 items) | ED (14 items) | Combined |
|--------|-------------|---------------|----------|
| **Avg Stem Word Count** | ~200 | ~210 | ~207 |
| **Quantified Data Points per Item** | 6-8 | 6-8 | 6-8 |
| **Named Stakeholders per Item** | 2-3 | 2-3 | 2-3 |
| **Avg ExplanationCorrect (chars)** | ~1,200 | ~1,200 | ~1,200 |
| **Avg ExplanationWrong per distractor (chars)** | ~400 | ~400 | ~400 |
| **Difficulty Distribution** | 5 Difficult | 14 Difficult | 19/19 Difficult |
| **Cognitive Level** | 4 Analyze, 1 Evaluate | 12 Analyze, 2 Evaluate | 16 Analyze, 3 Evaluate |

## Defect Scan

| Defect | Result |
|--------|--------|
| DL-008 (non-empty EW[CC]) | **0** — All 19 items clean |
| DL-026 (empty non-CC EW slots) | **0** — All 57 distractor EW slots populated |
| DL-013 (boilerplate EW) | **0** — Zero "plausible misconception" / "may misapply" |
| DL-037 (logic inversion) | **0** — Zero binary lead-in polarity mismatches |
| DL-030 (answer key error) | **0** — All CorrectChoice values aligned with COSO principles |
| Metadata-only upgrades | **0** — All items received entirely new content |

## COSO Principle Coverage

The 19 items span 13 distinct COSO principles:

| Principle | Count | Items |
|-----------|-------|-------|
| P1 (Integrity/Ethics) | 1 | ED-047 |
| P2 (Board Independence) | 1 | ED-065 |
| P3 (Authority/Responsibility) | 1 | ED-048 |
| P4 (Board Independence/Oversight) | 1 | ED-059 |
| P5 (Accountability) | 1 | ED-056 |
| P6 (Risk Identification) | 1 | ED-063 |
| P7 (Risk Assessment Bias) | 1 | ED-041 |
| P8 (Fraud Risk Assessment) | 2 | EC-075, ED-062 |
| P9 (Management Override) | 1 | ED-062 |
| P10 (Segregation of Duties) | 1 | ED-052 |
| P11 (ITGC) | 1 | EC-073 |
| P12 (Control Activities/Authorization) | 2 | EC-070, ED-061 |
| P13 (Information Quality) | 1 | ED-053 |
| P14 (Internal Communication) | 1 | EC-074 |
| P15 (External Communication) | 1 | ED-055 |
| P16 (Monitoring/Ongoing) | 2 | EC-071, ED-068 |
| P17 (Separate Evaluations) | 1 | ED-057 |

## File Integrity

| Check | Result |
|-------|--------|
| pack_c QID count | 500 (unchanged) |
| pack_d QID count | 500 (unchanged) |
| pack_d QID uniqueness | 500/500 unique |
| Governance guard | **54/54 PASS** |
| Parse validation | **PASS** (both packs) |
