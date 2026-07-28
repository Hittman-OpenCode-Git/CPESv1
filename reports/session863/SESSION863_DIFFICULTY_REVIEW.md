# S863 — Cognitive Level vs Difficulty Alignment Review

**Date:** 2026-07-27
**Key Finding (S855):** Cognitive Level and Difficulty are independent dimensions.

---

## Distribution Review

### Cognitive Level Distribution (Pack C Sections C+D, Post-S861)

| Level | Section C | Section D | Total | CAQS Target |
|-------|-----------|-----------|-------|-------------|
| Remember | 1 | 0 | 1 | 5% |
| Understand | 55 | 60 | 115 | 15% |
| Apply | 44 | 29 | 73 | 40% |
| Analyze | 0 | 10 | 10 | 25% |
| Evaluate | 1 | 0 | 1 | 15% |

### Difficulty Distribution (Post-S861)

| Score | Section C | Section D | CAQS Target |
|-------|-----------|-----------|-------------|
| 1 (Easy) | 2 | 8 | 15% |
| 2 (Mod-Easy) | 38 | 5 | 20% |
| 3 (Moderate) | 28 | 72 | 30% |
| 4 (Difficult) | 6 | 14 | 25% |
| 5 (V.Difficult) | 1 | 1 | 10% |

---

## Misalignments Identified

### High Cognitive / Low Difficulty
- **P1-CC-065:** Evaluate + DS=2. Tests judgment about performance evaluation design but is labeled Moderate-Easy. Marginally understated — the Evaluate-level reasoning framework added in S862 warrants DS=3 at minimum.

### Low Cognitive / High Difficulty (Critical)
- **P1-CC-014:** Remember (definition-match: "What approach is being used?" → "DuPont method") labeled as Analyze + DS=4. **False Analyze claim.** This is the DL-031 pattern — definition-match with inflated cognitive and difficulty labels.
- **20 items across 4 rotation groups** (CC-010-014, 030-034, 040-044, 050-054) are definition-match items labeled Understand/Apply at inflated difficulty levels.

### Systematic Pattern
The 5-item rotation template assigned difficulty labels by position in the rotation group, not by cognitive assessment. Items with identical stems but rotated answer positions received different difficulty labels (e.g., CC-065 at DS=1 vs CC-066 at DS=3 — same concept, same stem, just rotated answer letter positions).

---

## Calibration Recommendations

1. **Immediate:** Flag CC-014 for DEFECT_LIBRARY.md (DL-031 false Analyze)
2. **Downgrade wave:** Reclassify 20 definition-match items from Understand/Apply → Remember, DS→1
3. **Difficulty audit:** Run full-pool DC-020 methodology on all Pack C items
4. **CC-065 DS escalation:** DS=2→3 for Evaluate-level judgment
5. **DC-005 DS escalation:** DS=3→4 to match DC-025 calibration

---

## Progression Gradient Assessment

The S861-upgraded items show a coherent difficulty gradient:
- **DS=3:** Items with enhanced business interpretation (DC-005, DC-010, DC-015, DC-030, DC-035, DC-045)
- **DS=4:** Items with multi-step decomposition + interpretation + trap identification (CC-060, CC-061, CC-064, CC-071, DC-012, DC-013, DC-025, DC-040)
- **DS=2:** Items with evaluation frameworks but simpler fact patterns (CC-065)

**Verdict:** The difficulty progression within the upgraded pool is internally consistent. Cross-item calibration between similarly complex items (DC-005 vs DC-025) needs minor adjustment.
