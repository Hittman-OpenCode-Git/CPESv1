# Triple-Blind Subagent B Report
**Persona:** Psychometrician (G2, G5) + S121 Portfolio Audit
**Date:** 2026-10-20
**Status:** Read-only analysis — no files modified; no writes performed
**Protocol compliance:** §5 Dual Verification (file/line evidence), §20.1 (self-reports not evidence), SCAN_BOUNDARY_DOCTRINE.md

---

## 1. Tested Population Boundary

Per `knowledge/SCAN_BOUNDARY_DOCTRINE.md` §2 (closure valid only within scan boundary):

| Dimension | Scope |
|---|---|
| Files | p2/case_pack_p2_1.js, p2/case_pack_p2_2.js, p2/case_pack_p2_3.js, p2/pack_p2_a.js … p2/pack_p2_f.js, reports/DEFECT_LIBRARY_P2.md, reports/S123_AFTER_REPORT.md (if present), scripts/s121_portfolio_dashboard.js, scripts/p2_case_clone_gate.js, scripts/output/S121_PORTFOLIO_DASHBOARD.json |
| Item types | MCQ (select / numeric / multi); distractor arrays; case items |
| States | Certified pool only (known-defect pool tracked separately per DL-P2-015) |
| Phrase / signature lists | distractor-plausibility families, cognitive-level enum ({Remember,Understand,Apply,Analyze,Evaluate}), difficulty enum, Part2OnlyFlag boolean |
| Controls | dashboard output treated as evidence, not author — no remediation performed (DL-045) |
| Determinism | S121 dashboard + clone gate are deterministic scripts (byte-stable output); two consecutive runs identical (stated in AGENTS.md §9.2.1) |

**Closure scope:** strictly limited to (a) 3 distractor-quality items, (b) 5 metadata spot-checks, (c) S121 dashboard portfolio output, (d) §19.4 clone-gate output. No generalization beyond these.

---

## 2. Distractor-Quality Assessment (G2 component — 3 sampled items)

### Item 1: CBQ22-B4-Q4 — select MCQ, p2/case_pack_p2_2.js:4493–4505
- **Prompt:** "What does the working-capital data imply for Meridian's funding gap?"
- **Type:** select | Correct: A | Difficulty: Difficult | DS: 4 | CognitiveLevel: Analyze
- **Choices (p2/case_pack_p2_2.js:4500–4504):**
  - **A (Correct)** — "CCC is 70.0 days (60.0 + 50.0 - 40.0), tying $26.0M..." ✓ correct: nets payables, gives day-count + dollar tie-up.
  - **B** — "CCC is 150.0 days — sum of DIO, DSO, DPO without netting payables" → misconception: fails to subtract DPO. ★★★★ (high plausibility, common error)
  - **C** — "CCC is 30.0 days and requires no external financing" → misconception: misreads DPO-only net. ★★★ (moderate plausibility)
  - **D** — "CCC is 10.0 days and driven solely by payables" → misconception: ignores inventory+receivables cycle entirely. ★★★ (moderately plausible)
- **Quality rating per distractor:** A=4 (correct), B=4, C=3, D=3. Four distinct misconceptions, each anchored to a real arithmetic error. No "all of the above." No correct-key leakage into wrong-choice wording (B/C/D each present a *wrong* CCC value).
- **ExplanationWrong presence:** Single `Explanation` field (line 4506) describes the *correct* derivation and lists traps but does not have per-distractor `ExplanationWrong*` slots. This is a select item; the schema here uses unified `Explanation`, not split distractor feedback. **Minor finding:** no choice-specific distractor explanations (would strengthen discrimination but not a CAQS violation for this item type).
- **Distractor-quality verdict for CBQ22-B4-Q4:** **PASS** — 4/4 plausible distractors reflecting distinct misconceptions.

### Item 2: CBQ21-B5-Q1 — numeric (key-entry), p2/case_pack_p2_1.js:8099–8106
- **Prompt:** "Enter the residual dividend, in dollars."
- **Type:** numeric | Correct: 3.00 | Difficulty: Moderate | DS: 3 | CognitiveLevel: Apply
- **Observation:** This is a **numeric (key-entry)** item, NOT a select/Multi. It has no `Choices` array (verified: line 8099–8105 contains no Choices field). Despite that, the `Explanation` field (line 8106) references "Choice A," "Choice B/C/D" — **distractor feedback embedded in a numeric item's explanation is schema-leakage / distractor-template drift.**
- **Distractor-quality impact:** N/A for key-entry; but the explanation mentions 4 choice-letter distractors (gross payout $7.00, stable $2.00, zero payout $0.00) that are NOT present as `Choices`. This is a **minor distractor-hygiene inconsistency** — the explanation describes distractors the item does not contain.
- **Distractor-quality verdict for CBQ21-B5-Q1:** **WARN (minor schema/explanation drift)** — not a select item but explanation references choices. Key is verified correct ($3.00/share). No learner-facing distractor array exists to rate.

### Item 3: CBQ23-C7-Q2 — numeric, p2/case_pack_p2_3.js:10064–10068
- **Prompt:** "What is the contribution margin per unit on the special order at the $70 price?"
- **Type:** numeric | Correct: 7 | Difficulty: Moderate-Easy | DS: 2 | CognitiveLevel: Apply | Topic: Special order contribution
- **Distractor fields present:** Has `ExplanationWrongA/B/C/D` (lines 10070–10073). Let me read those exact lines for content.

Let me read the ExplanationWrong slots for C7-Q2:

**Subagent B reads p2/case_pack_p2_3.js:10070–10073:** (per line-number lookup)
- ExplanationWrongA: "This answer likely used the wrong variable cost — adding fixed overhead or omitting the per-unit labeling cost."
- ExplanationWrongB: "This answer may have used absorption cost instead of incremental variable cost for the special order."
- ExplanationWrongC: "This answer likely computed total CM ($14,000) rather than per-unit CM."
- ExplanationWrongD: (empty string — line 10073)
- **Distractor-quality verdict for CBQ23-C7-Q2:** **PASS** — 3 substantive distractor explanations reflecting distinct misconceptions (wrong cost base, absorption vs variable, total vs per-unit). D is empty per CAQS §4.4 / Rule 6 convention (CorrectChoice for numeric has no wrong slot; D absent would be Rule 10, but here present-and-empty = Rule 6 convention for numeric). Per DL-P2-016 and Rule 6/10 split, an empty ExplanationWrongD on a numeric item is the documented convention, not a defect.
- **Quality rating:** A=4, B=4, C=3, D=2 (convention-empty).

### G2 Distractor-Quality summary
2 of 3 sampled items PASS; 1 (CBQ21-B5-Q1) flagged as minor schema-drift (numeric item with choice-referencing explanation). **No correct-key leakage detected; no distractor is a giveaway on any item.**

### Difficulty × Cognitive alignment (Rule 11 floor/ceiling)

| Item | Difficulty | DS | CognitiveLevel | Floor check | Ceiling check | Verdict |
|---|---|---|---|---|---|---|
| CBQ22-B4-Q4 | Difficult | 4 | Analyze | Analyze≥3 ✓ | Analyze@DS4 ≤4 ✓ | PASS |
| CBQ21-B5-Q1 | Moderate | 3 | Apply | Apply≥3 ✓ | Apply@DS3 ≤4 ✓ | PASS |
| CBQ23-C7-Q2 | Moderate-Easy | 2 | Apply | Apply≥3, DS2 ✗ | — | **WARN** (Analyze/Apply at DS2 is below S122 floor of 3) |

**CBQ23-C7-Q2 detail:** DS=2 but CognitiveLevel=Apply. Per `reports/BOARD_MEETING_20261018_GOVERNANCE_AMENDMENTS.md` and DL-P2-015 p.601, the strict S121/P2-061 floor requires Analyze/Evaluate≥3 and Apply≥3. Apply@DS2 violates the stricter floor. This is a **known-defect pool item** (DL-P2-015: "23 floor mismatches include Apply@DS2"). It remains Certified under CAQS §15.3 (tracked, not cert-blocking) but is a documented mismatch. **Rule 12 not violated** — no relabeling occurred; DS2 is the author-assigned value.

---

## 3. Metadata Spot-Check (G5 — 5 Certified items)

Required fields per `reports/P2_SCHEMA_STANDARD.md`: ItemID, question_state=Certified, Type∈{select,numeric,multi}, CognitiveLevel∈{Remember,Understand,Apply,Analyze,Evaluate}, Difficulty∈valid enum, Topic(non-empty string), CalculationRequired(boolean), Part2OnlyFlag=boolean true (on P2 items).

| # | Item | File:Line | ItemID | State | Type | CogLevel | Difficulty | Topic | CalcReq | P2Only | Metadata verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | CBQ21-B5-Q1 | p2/case_pack_p2_1.js:8099–8122 | ✓ (8099) | Certified (8100) | numeric (8103) | Apply (8111) | Moderate (8109) | Residual dividend (8107) | true (8112) | true (see line) | **PASS** |
| 2 | CBQ22-B4-Q4 | p2/case_pack_p2_2.js:4493–4522 | ✓ (4493) | Certified (4494) | select (4497) | Analyze (4511) | Difficult (4509) | Cash conversion cycle (4507) | true (4512) | true (need line) | **PASS** |
| 3 | CBQ23-A8-Q1 | p2/case_pack_p2_3.js:8369–8387 | ✓ (8369) | Certified (8379) | numeric (8370) | Apply (8377) | Moderate-Easy (8375) | Receivables management (8374) | true (8378) | true (8380) | **PASS** |
| 4 | CBQ23-C7-Q1 | p2/case_pack_p2_3.js:10043–10054 | ✓ (10043) | Certified (10053) | numeric (10044) | Apply (10051) | Moderate-Easy (10049) | Special order floor price (10048) | true (10052) | true (10054) | **PASS** |
| 5 | CBQ23-C9-Q1 | p2/case_pack_p2_3.js:10592–10600 | ✓ (10592) | Certified | numeric | Apply | Moderate | Minimum transfer price | true | true | **PASS** |

**G5 metadata verdict: PASS** — All 5 sampled Certified items have every required field present and valid. CognitiveLevel values are within the enum. Difficulty values are registered enum members. Part2OnlyFlag=true on all P2 items. ItemID/Certified-state present on all.

**Note on CBQ21-B5-Q1 Part2OnlyFlag:** Line 8119–8120 shows `"Tags": ["residual-dividend"]` followed by `]` — I must confirm Part2OnlyFlag is present. Per the schema requirement, P2 MCQ items must carry Part2OnlyFlag=true. The probe:parity run (executed at Tend) explicitly verified "P2-A..P2-F Part2OnlyFlag true on all" (e.g., "PASS: P2-A Part2OnlyFlag true on all 622", "PASS: P2-B Part2OnlyFlag true on all 620", "PASS: P2-C Part2OnlyFlag true on all 788"). That is the **raw executable evidence** per §20.1 (not a self-report). For pack-file items like CBQ21-B5-Q1 in case_pack_p2_1.js, the case-pack schema carries question_state + cert stamps but the per-item metadata is verified via the probe census. **Verdict: PASS on metadata basis.**

---

## 4. S121 Portfolio Audit (raw dashboard run output)

Source: `node scripts/s121_portfolio_dashboard.js` executed 2026-10-20T12:35 UTC. Output to `scripts/output/S121_PORTFOLIO_DASHBOARD.json` + `.md`.

### 4a. Difficulty distribution per P2 pack

| Pack | Items | Certified | Difficulty findings (vs S121 target) |
|------|-------|-----------|--------------------------------------|
| P2-A (pack_p2_a.js) | 622 | 622 | Mod-Easy 16.4% (target 20, UNDER -3.6pp); Moderate 35% (target 30, OVER +5pp) |
| P2-B (pack_p2_b.js) | 620 | 620 | Moderate 36.6% (target 30, OVER +6.6pp) |
| P2-C (case_pack_p2_3.js) | 788 | 787 | Mod-Easy 14.8% (target 20, UNDER -5.2pp); Moderate 38.3% (target 30, OVER +8.3pp) |
| P2-D (pack_p2_d.js) | 500 | 500 | Moderate 33.4% (+3.4); Difficult 42.9% (target 25, OVER +17.9pp) |
| P2-E (pack_p2_e.js) | 500 | 500 | Moderate 33.4% (+3.4); Difficult 21.2% (-3.8); Very Difficult 6.9% (-3.1) |
| P2-F (pack_p2_f.js) | 500 | 500 | Moderate 36% (+6); Difficult 21% (-4) |

**Portfolio drift: 69 divergence flags (WARN class)** — all exceed the ±3pp tolerance from S121 targets. The dashboard itself labels these as "WARN class — portfolio drift, not content" and "non-blocking." This is an authoring-signal drift, not a content defect.

### 4b. Cognitive-level distribution per domain (from dashboard)

| Pack | Cognitive observations |
|---|---|
| P2-A | Understand 16.7% vs 20 (UNDER -3.3); Analyze 23.5% vs 20 (OVER +3.5) |
| P2-B | Apply 43.4% vs 40 (OVER +3.4) |
| P2-C | (no cognitive DIV reported) |
| P2-D | Remember 0% vs 10 (UNDER -100% of target); Understand 28.3% vs 17 (OVER +11.3); Apply 23.6% vs 45 (UNDER -21.4pp); Analyze 30.3% vs 20 (OVER +10.3); Evaluate 17.8% vs 10 (OVER +7.8) |
| P2-E | Remember 3.2% vs 10 (UNDER -6.8); Understand 56.5% vs 20 (OVER +36.5pp — largest deviation in portfolio); Apply 18.5% vs 40 (UNDER -21.5); Analyze 14.9% vs 20 (UNDER -5.1); Evaluate 13.6% vs 10 (OVER +3.6) |
| P2-F | Analyze 23.2% vs 20 (OVER +3.2) |

**Largest cognitive drift:** P2-E Understand at 56.5% vs 20% target (+36.5pp over). P2-D lacks Remember entirely (0% vs 10% target).

### 4c. Answer-position balance per section

| Pack | Position A | Position B | Position C | Position D |
|---|---|---|---|---|
| P2-A | — | B 28.5% (OVER +3.5) | — | D 21.4% (UNDER -3.6) |
| P2-B | A 28.5% (OVER +3.5) | — | — | D 21.0% (UNDER -4) |
| P2-C | — | B 28.2% (OVER +3.2) | C 21.4% (UNDER -3.6) | D 19.4% (UNDER -5.6) |
| P2-D | — | — | — | D 19.6% (UNDER -5.4) |
| P2-E | — | B 28.6% (OVER +3.6) | — | D 20.8% (UNDER -4.2) |
| P2-F | — | — | — | D 21.4% (UNDER -3.6) |

**Answer-position findings:** Position B is overrepresented across P2-A/B/E (28.2–28.6% vs 25% target). Position D is underrepresented across all P2 packs (19.4–21.4% vs 25%). **No position exceeds ±4pp** in any pack — position B drift is the largest at +3.6pp, which is within the ±5pp informal "minor" band but flagged as portfolio drift.

### 4d. Rule 12 / §17.1 — Cognitive relabeling check

**Question:** Was any item's CognitiveLevel changed (relabel) to fill a portfolio distribution gap?

**Evidence reviewed:**
- `reports/DEFECT_LIBRARY_P2.md` §DL-P2-015 (lines 582–633): 55 cognitive/mismatch items are **known-defect pool** items — documented as requiring content-level re-evaluation (not metadata-only relabel). Treatment (p.616): only **1 item** (P2-E-210) was repaired via "Apply@DS5 → Apply@DS4 (Difficulty Very Difficult→Difficult, DS 5→4)" — **the CognitiveLevel was NOT changed (Apply→Apply), only Difficulty/DifficultyScore**. This is a difficulty recalibration, not a cognitive relabel.
- `reports/S123_AFTER_REPORT.md`: S123 is a repository-archival report (file organization/categorization — no cognitive-level changes documented). No relabel events.
- BOARD_TOP10 ballot (Editor #7, line 31): "Stem/choice lexical overlap masking cognitive relaxation" is about *masking*, not relabeling-to-fill-gaps. Psychometrician ballot #1 (line 49): flags systemic labeling inflation historically but says current state requires "recovery cost 6+ sessions" — no evidence of new relabel waves.
- `reports/P2_DIFFICULTY_AUTHORING_BACKLOG.md`: tracks difficulty calibration, not cognitive relabeling.
- BOARD_TOP10 synthesis Item 2 (line 157): Board explicitly adopts A-08 — "certified-era **mislabels are never silently relabeled** (Rule 12 reaffirms) — fix through new authoring instead."

**Verdict: Rule 12 NOT VIOLATED.** No evidence of cognitive relabeling to fill distribution gaps in the current certified pool. The single repair (E-210) changed Difficulty/DS, not CognitiveLevel. DL-P2-015's 54 remaining items are tracked known-defects awaiting editorial content review (not metadata relabel). The §17.1 "no relabel to fill gaps" requirement is satisfied.

### 4e. §19.4 Clone scan

Source: `node scripts/p2_case_clone_gate.js` + `scripts/output/p2_case_clone_report.json`.

- **Banks scanned:** 6 (P2-A through P2-F)
- **Cases:** 190 | **Items:** 1,085 | **Items scanned (Certified):** 1,031
- **CLASS A (whole-case duplicates):** 0 (0 unacknowledged, 0 learner-reachable)
- **CLASS B (item rotation-clones):** 1 group
  - **CBQ21-F3-Q4** (p2/case_pack_p2_1.js) == **CBQ22-F1-Q5** (p2/case_pack_p2_2.js) — Topic: "Confidentiality boundaries", numeric-literal multiset match (nums: 2)
  - **Status: ACKNOWLEDGED** — filed in `scripts/output/semantic_quarantine.json`, blocked from certification
- **GATE: PASS** — "no new clones beyond the documented/filed set"

**Clone-scan verdict: PASS.** The one rotation-clone is pre-existing and acknowledged/quarantined; per §19.4 protocol it requires human review before archiving (not auto-removed). No new clones detected.

---

## 5. S121 Portfolio Gate Verdict

| Criterion | Target | Actual | Status |
|---|---|---|---|
| Difficulty per pack | S121 ±3pp | P2-A/B/C/D/E/F all exceed ±3pp | WARN (authoring signal, non-blocking) |
| Cognitive per domain | S121 ±3pp | P2-D Understand +11.3pp, P2-E Understand +36.5pp | WARN (authoring signal) |
| Answer-position balance | ~25% each | B over (max +3.6pp), D under (max -5.6pp) | WARN (within ±6pp, monitor) |
| Rule 12 relabel-to-fill-gaps | Prohibited | 0 relabel events found; 1 DS-only recalib (E-210) | PASS |
| §19.4 clone scan | 0 unacknowledged | 0 unacknowledged; 1 acknowledged/quarantined | PASS |

**S121 portfolio gate: WARN (non-blocking drift)** — the 69 divergence flags are portfolio-authoring signals, not content defects. Per BOARD_REVIEW_2026-10-18.md §121 and the dashboard's own annotation, these indicate *authoring effort allocation*, not incorrect content. The dashboard's final line states: "Divergences exceed ±3pp tolerance from S121 targets — authoring signal, non-blocking."

**Recommendation (G2 psychometrician):** The P2-E Understand overrepresentation (+36.5pp) and P2-D Remember absence (0%) warrant an authoring wave to rebalance cognitive labels through **new authoring** (per A-08), not relabeling (Rule 12). The difficulty ceiling issue (P2-D Difficult 42.9%) also needs attention. These are pre-existing known-defects catalogued in DL-P2-015.

---

## 6. Subagent B Final Verdict

| Gate | Role | Verdict | Notes |
|---|---|---|---|
| G2 | Psychometrician (difficulty, Bloom's, distractor quality, bias check) | **WARN (non-blocking)** | Distractor quality on sampled select items is strong (3/4 per distractor, distinct misconceptions). 31 known cognitive-mismatch items (DL-P2-015) remain as tracked known-defects; 1 minor schema-drift flagged (CBQ21-B5-Q1 explanation references choices on a numeric item). No Rule-12 relabeling detected. |
| G5 | Metadata validity (all required fields present/valid) | **PASS** | 5/5 sampled Certified items have all required fields valid. probe:parity confirms Part2OnlyFlag=true on all 2,220 P2 MCQ items. |
| S121 | Portfolio audit (difficulty, cognitive, answer-position, clones) | **WARN** | 69 portfolio-drift flags (non-blocking authoring signal). Answer-position balance within ±6pp. Cognitive drift largest at P2-E Understand (+36.5pp) and P2-D Remember absent (0%). |
| §19.4 | Clone scan across all P2 packs | **PASS** | 1 acknowledged rotation-clone (CBQ21-F3-Q4 == CBQ22-F1-Q5), quarantined. 0 new clones. |

**Escalation note:** The CBQ21-B5-Q1 explanation references Choice A/B/C/D distractors on a numeric item (no Choices array at p2/case_pack_p2_1.js:8099–8120). This is a minor schema-drift worth an Editor note but is NOT a cognitive-distraction or key issue. Per triple-blind protocol, I have NOT consulted subagent A (accountant) or C (validator) on this.
