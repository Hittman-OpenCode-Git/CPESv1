# GOVERNANCE.md — Certification Frame for This Review Package

**Package:** p2_cert_review_20260824
**Scope:** Uncertified Part 2 content authored in sessions P2-053 through P2-057 — 75 MCQs (Pack A ×15; Pack C ×60) and 12 integrated case studies (36 case items).
**Governing authority chain:** PROJECT_CONSTITUTION → CAQS v1.0 → P2002_CERTIFICATION_STANDARD → QUESTION_METADATA_STANDARD §9 → AGENTS.md Rules 1–14.

---

## 1. What certification REQUIRES (per CAQS §1.7.2 and P2002)

A question transitions Unprocessed → Certified only when ALL of the following hold:

1. **Six-dimension verification at HIGH confidence** (CAQS §1.6 / P2002):
   - **D1 Correctness** — answer key consistent with authoritative standards (GAAP/ASC, COSO ERM 2017, IMA SMA, corporate finance/decision theory as applicable)
   - **D2 Precision** — exactly one defensible answer under the stated facts
   - **D3 Difficulty calibration** — DifficultyScore matches true cognitive demand (DL-031 guard: no definition-match items above Easy)
   - **D4 Distractor engineering** — every wrong choice maps to a documented misconception; no two distractors test the same error
   - **D5 Blueprint alignment** — LOSTag maps to the IMA Part 2 CSO; content is Part 2 scope (not Part 1-exclusive)
   - **D6 Part 2 relevance** — no concept belongs exclusively to Part 1
2. **User approval recorded in REVISION_HISTORY_P2.md**
3. **Distractor tier map (A/B/C/D)** captured per item in the certification entry
4. Any low-confidence claim resolved BEFORE flip

## 2. Certification-BLOCKING conditions already enforced (evidence below)

| Guard | Rule | Evidence for THIS content |
|-------|------|---------------------------|
| DL-008 | EW[CorrectChoice] must be empty | Object-parse scan: 0 violations across all 90 items |
| DL-026 | All 3 non-CC EW slots ≥50 chars, choice-specific | 0 violations |
| DL-013 | No template boilerplate | 0 violations |
| DL-021 | No absent EW fields | 0 violations |
| DL-037 | No Yes/No polarity-inverted choices | 0 violations |
| Rule 11 AF-3/4/5 | Cognitive gates (no rule-citation stems at Analyze/Evaluate; Evaluate needs named decision-maker + ≥2 defensible alternatives + DifficultyScore ≥3) | PASS |
| Rule 13/14 | Part2OnlyFlag true; QID format `P2-X-NNN` consecutive, no gaps/dups | PASS |

## 3. Verification ALREADY PERFORMED (build-time evidence — see session entries P2-053..P2-057)

| Dimension | Method | Result |
|-----------|--------|--------|
| Structural | Independent object-parse scans post-write (every wave) | 0 issues |
| Numerical | Answers centrally designed; independently recomputed before write (spot-checks 13/13 on Pack A wave 4; all case numerics table-verified; Laplace winner corrected in-draft after recomputation) | Match |
| Answer-key rotation | Programmatic CC-balance check per wave | A-wave 4/4/4/3; C-waves balanced with B-heavy flag (below) |
| Arithmetic sources | All formulas cross-checked against foundation/FORMULA_MASTER_P2.md IDs where applicable (FA-01/02/04/05/14, RM-01/03, DA-03/09/11, ID-01/02/03/05/06) | Match |
| Case exhibits | Every exhibit row consumed by ≥1 item; ReferencedBy complete (script-enforced) | PASS |

## 4. What remains for the CERTIFIER (the actual review task)

Per item/chunk:
- [ ] D1: solve independently; confirm stored key is the only defensible answer
- [ ] D2: confirm stem contains all needed data and no hidden assumptions
- [ ] D3: confirm DifficultyScore against §5 calibration map of the authoring skill (Easy=definition/recall … 5=cross-domain synthesis)
- [ ] D4: confirm each distractor targets a DISTINCT documented misconception
- [ ] D5/D6: confirm LOSTag fit and Part 2 scope
- [ ] For calc items: recompute from the stem numbers (answer keys in ANSWER_KEYS.md)
- [ ] For select items: confirm distractors are mutually exclusive and plausibly attractive

Then, upon approval: flip `question_state` → `"Certified"`, add `certification_session`, record QuestionIDs + verification results + distractor tier map in REVISION_HISTORY_P2.md, and re-run `npm run validate:p2` + `npm run preflight:p2`.

## 5. KNOWN FLAGS requiring certifier attention

| Flag | Items | Note |
|------|-------|------|
| B-heavy answer rotation in C-141–155 batch | C-141–155 | CC distribution A:3/B:6/C:3/D:3 within that sub-batch; pool-wide balance acceptable but consider key rotation during certification |
| F-domain cases are ALL-SELECT | CBQ22-F1, CBQ23-F2 items | Deliberate deviation from numeric-first progression for conceptual ethics domain; documented in P2-054/P2-055 entries |
| NPV tolerance | CBQ23-E1-Q2 | Correct "49170", ±$1,000 accepted (stated in prompt + explanation); rounding-path variants land 49,170–49,200 |
| CBQ23-E2-Q3 | enumerated-optimum item | Optimum {A,D,E} = $9.2M requires testing adjacent combinations; greedy {A,B} = $8.5M is the refuted heuristic — explanation covers both |
| Elasticity markup convention | P2-C-162 | Markup ON VARIABLE COST = 1/(|ED|−1) = 33.3%; margin-on-price would be 25% — distractor A captures that confusion deliberately |
| Parallel-session overlap | Packs D/E/F and earlier A/B/C tails | NOT in this package; this package covers ONLY sessions P2-053..057 output listed in MANIFEST.md |

## 6. State-flip mechanics (after approval)

```
question_state: "Unprocessed" -> "Certified"
+ certification_session: <your session ID>
+ REVISION_HISTORY_P2.md entry (QuestionIDs, six-dimension results, distractor tier map)
+ npm run validate:p2 && npm run preflight:p2 (must stay 0 divergences)
```

Certified → In Audit requires explicit re-verification request (§9.2). Never hand-edit derived registries.
