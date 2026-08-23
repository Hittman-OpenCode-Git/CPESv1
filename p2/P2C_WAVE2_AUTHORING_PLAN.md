# P2C Wave 2 Authoring Plan — 50 New Section C Items (75 → 125)

**Status:** Active
**Date:** 2026-08-23
**Rationale:** Section C carries 25% exam weight but holds only 75/495 MCQs (60% of weight-implied target). This wave authors 50 new items to close the gap. All items follow the content-authoring skill + P2C_REFERENCE schema, `question_state: "Unprocessed"`.

---

## 1. Session Structure (3 sessions: 17 + 17 + 16)

| Session | QID range | C.1 | C.2 | C.3 | C.4 | C.5 | C.6 | C.7 | Total |
|---------|-----------|-----|-----|-----|-----|-----|-----|-----|-------|
| 1 | P2-C-076…092 | 3 | 3 | 2 | 3 | 2 | 2 | 2 | 17 |
| 2 | P2-C-093…109 | 3 | 3 | 3 | 3 | 2 | 2 | 1 | 17 |
| 3 | P2-C-110…125 | 2 | 2 | 3 | 2 | 2 | 2 | 3 | 16 |
| **Totals** | | **8** | **8** | **8** | **8** | **6** | **6** | **6** | **50** |

Post-wave LOS distribution: C.1=25, C.2=25, C.3=25, C.4=11, C.5=14, C.6=16, C.7=9 (total 125).

---

## 2. Coverage Controls (enforced per batch)

- **Formula matrix:** every DA-01…DA-11 exercised ≥2× across the wave; each calculation item carries `FormulaReference` from volume 09.
- **Zero-hit theory:** shadow price cluster — 3 items (recall/apply/analyze) across sessions 1–2 (C-088 in S1, two more in S2).
- **Topic extension:** new subtopics beyond the 75-item inventory — cash breakeven, price-change break-even volume, value-based pricing, learning-curve repeat-order pricing, supplier-failure expected cost, pilot-option value, shadow price, released-capacity redeployment, tax-on-disposal relevant costs.
- **Psychometric quotas (wave totals):** Cognitive — Apply 20, Analyze 14, Evaluate 8, Understand 6, Remember 2 · Difficulty — Easy 6, Mod-Easy 10, Moderate 16, Difficult 13, Very Difficult 5 · Answer letters — A 12, B 13, C 13, D 12.
- **Trap mapping:** every distractor maps to a named trap; traps reused at most ~6× per wave.

## 3. Session 1 Cognitive/Difficulty Allocation

| QID | LOS | Topic (new subtopic) | Cog | Diff | CC |
|-----|-----|----------------------|-----|------|----|
| C-076 | C.1 | Cash breakeven vs accounting breakeven | Apply | ME | B |
| C-077 | C.1 | Multi-product BE after sales-mix shift | Apply | M | C |
| C-078 | C.1 | MOS × DOL maximum sales decline | Analyze | D | B |
| C-079 | C.2 | Special order displacing regular sales + commission savings | Analyze | D | A |
| C-080 | C.2 | Sell-or-process with capacity constraint (two byproducts) | Analyze | D | D |
| C-081 | C.2 | Keep-or-replace with tax on disposal | Apply | M | C |
| C-082 | C.3 | Value-based pricing | Apply | M | A |
| C-083 | C.3 | Price-change break-even volume | Analyze | D | B |
| C-084 | C.4 | Add-or-drop with released-capacity redeployment | Analyze | D | D |
| C-085 | C.4 | Learning-curve pricing on a repeat order | Apply | D | C |
| C-086 | C.4 | Temporary shutdown — relevant advantage | Analyze | M | D |
| C-087 | C.5 | Throughput per constraint minute | Apply | ME | A |
| C-088 | C.5 | Shadow price of binding constraint (zero-hit #1) | Apply | M | B |
| C-089 | C.6 | EVPI as research-budget ceiling | Apply | M | D |
| C-090 | C.6 | Pilot-option value (sequential tree) | Analyze | D | C |
| C-091 | C.7 | Outsourcing with supplier-failure expected cost | Apply | D | C |
| C-092 | C.7 | Strategic make-or-buy with switching costs | Evaluate | VD | A |

Session 1 quotas: Apply 8, Analyze 7, Evaluate 1, (Understand/Remember carried by S2/S3) · ME 2, M 6, D 8, VD 1 · A 4, B 4, C 5, D 4.

## 4. Governance

- Each session ≤30 items (Rule 5 OK, no BLOCK-AUTHORIZED needed).
- T0 preflight + backup before writes; volume-11 cautions C1–C7 per item; independent recompute of every calculation; `node --check` + DL-008/DL-026 scan post-batch.
- REVISION_HISTORY_P2 entry per session; DL-P2 entry only if a defect is discovered.
- Post-wave: §18 chunked handoff to the external reviewer; certification only after HIGH-confidence verification.
