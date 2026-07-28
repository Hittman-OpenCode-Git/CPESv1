================================================================================
CROSS-PACK CONSISTENCY AUDIT — S722A
Agent Q — July 26, 2026
Authority: DCS v1.1 §13 Cross-Pack Consistency Rule
Scope: 2,500 items across all 5 packs (500 each)
Methodology: Function-constructor extraction, structural-pattern grouping,
             per-section / per-pack / per-pattern CL + DS comparison
================================================================================

=== PART 1: EXECUTIVE SUMMARY ===

Overall Grade: B ("Good — isolated deviations requiring batch recalibration, but
systematic Pack E under-calibration creates a two-tier CL system")

The DCS v1.1 cross-pack consistency rule (§13) states: "Any pack whose dominant
CL for a structural pattern deviates from the pool norm by ≥1 level must be
flagged for batch CL recalibration."

FINDING: Zero sections exceed the formal ±1.0 CL threshold vs. their section
pool mean. However, the "A" grade is misleading because Pack E's UNDER-
CALIBRATION is systematic across ALL 6 sections, creating a two-tier system.

Additionally, Difficulty Score (DS) calibration shows severe cross-pack
inconsistency in Section F (Technology and Analytics), with extremes spanning
1.16 points between Pack A (1.47) and Pack C (2.63).

=== PART 2: AGENT H (S720) CLAIM VERIFICATION ===

CLAIM 1: "Pack A Section A: Evaluate on items that are Apply elsewhere"
  VERDICT: REFUTED
  Evidence: 1 Evaluate item out of 75 (1.3%) — P1-A-006 "contract liability for
  advance collections". Pack A Section A CL mean = 2.80 vs pool 2.45, deviation
  = +0.35 — below the 1.0 threshold. No systematic Evaluate inflation.

CLAIM 2: "Pack E: Remember on items that are Understand elsewhere"
  VERDICT: REFUTED (misdiagnosed — the real issue is the INVERSE)
  Evidence: Pack E has 7 Remember items (1.4%) — BELOW pool (2.5%). The actual
  systematic issue: Pack E is 79.8% Understand vs pool norm (40.8% excluding
  Pack E). Pack E under-assigns CL: Understand where pool norm is Apply.
  Sections E and F have ZERO Apply items. This is a pipeline artifact — Pack E
  was authored by a different pipeline that defaulted to Understand.

CLAIM 3: "DL-012 clone packs (C/D): consistent with each other but inflated vs.
  pool norm"
  VERDICT: PARTIALLY CONFIRMED
  Evidence: Pack C Section E CL=2.87, Pack D Section E CL=3.08 vs pool Section
  E CL=2.52. Deviation: +0.34 and +0.56 respectively — real but below the 1.0
  formal threshold. Clone packs are internally consistent (ΔCL=0.21 between
  them) but inflated relative to Packs A (2.17), B (2.53), and E (1.96).

=== PART 3: POOL-LEVEL STATISTICS ===

                    Pool (2,500)    Pack A     Pack B     Pack C     Pack D     Pack E
Remember             57 (2.3%)      3 (0.6%)   41 (8.2%)  5 (1.0%)   1 (0.2%)   7 (1.4%)
Understand         1214 (48.6%)   215 (43.0%) 130 (26.0%) 241 (48.2%) 229 (45.8%) 399 (79.8%)
Apply              1162 (46.5%)   279 (55.8%) 326 (65.2%) 230 (46.0%) 233 (46.6%)  94 (18.8%)
Analyze              10 (0.4%)      1 (0.2%)   3 (0.6%)   3 (0.6%)   3 (0.6%)   0 (0.0%)
Evaluate             57 (2.3%)      2 (0.4%)   0 (0.0%)  21 (4.2%)  34 (6.8%)   0 (0.0%)
────────────────────────────────────────────────────────────────────────────────────
CL Mean            2.52 (Apply)   2.57 (A)   2.58 (A)   2.59 (A)   2.68 (A)   2.17 (U)
DS Mean            2.36           2.17       2.34       2.48       2.54       2.30

=== PART 4: PER-SECTION COGNITIVE LEVEL CONSISTENCY MATRIX ===

Section | Pack A     Pack B     Pack C     Pack D     Pack E     Pool Mean | Range | Deviant
────────┼──────────────────────────────────────────────────────────────────┼───────┼────────
A       | 2.80 (A)   2.59 (A)   2.47 (U)   2.24 (U)   2.13 (U)   2.45 (U) | 0.67  | —
B       | 2.79 (A)   2.42 (U)   2.70 (A)   3.00 (A)   2.34 (U)   2.65 (A) | 0.66  | —
C       | 2.66 (A)   2.73 (A)   2.72 (A)   2.61 (A)   2.32 (U)   2.61 (A) | 0.41  | —
D       | 2.69 (A)   2.93 (A)   2.49 (U)   2.76 (A)   2.19 (U)   2.61 (A) | 0.75  | —
E       | 2.17 (U)   2.53 (A)   2.87 (A)   3.08 (A)   1.96 (U)   2.52 (A) | 1.12  | E(−0.56)
F       | 2.19 (U)   2.29 (U)   2.20 (U)   2.32 (U)   2.00 (U)   2.20 (U) | 0.32  | —

KEY FINDINGS:
- Section E has the WIDEST range (1.12): Pack E at 1.96 (Understand) vs Pack D
  at 3.08 (Apply). The DL-012 clone packs (C/D) sit at the high end.
- Section B has Pack D at 3.00 (Apply) — the highest of any Section B pack.
- Pack E is systematically below pool mean in ALL 6 sections.

=== PART 5: PATTERN-BASED CONSISTENCY MATRIX ===

PATTERN           | Pool CL    Pool DS | Pack A    Pack B    Pack C    Pack D    Pack E
──────────────────┼───────────────────┼─────────────────────────────────────────────────
Definition-match  | 2.55(A)   2.15    | 2.83(A)   2.20(U)   2.67(A)   2.76(A)   2.18(U)
  n=219           |                    | n=6       n=60      n=63      n=79      n=11
  ΔCL from pool   |          —        | +0.28     −0.35     +0.11     +0.21     −0.37
──────────────────┼───────────────────┼─────────────────────────────────────────────────
Calculation       | 2.99(A)   2.79    | 3.00(A)   2.98(A)   2.88(A)   3.06(A)   2.96(A)
  n=492           |                    | n=132     n=174     n=51      n=112     n=23
  ΔCL from pool   |          —        | +0.01     −0.01     −0.11     +0.07     −0.04
──────────────────┼───────────────────┼─────────────────────────────────────────────────
Framework-app.    | 2.58(A)   2.28    | 2.52(A)   2.44(U)   2.89(A)   2.70(A)   2.08(U)
  n=603           |                    | n=108     n=115     n=153     n=140     n=87
  ΔCL from pool   |          —        | −0.06     −0.13     +0.31     +0.12     −0.50
──────────────────┼───────────────────┼─────────────────────────────────────────────────

KEY FINDINGS:
- Calculation items: EXCELLENT cross-pack consistency. All packs at CL≈3.0
  (Apply), maximum Δ = 0.18. This is the gold standard for DCS consistency.
- Framework-application: Pack E is at CL 2.08 (Understand) while pool is 2.58
  (Apply) — deviation of 0.50, the largest pattern-level gap.
- Definition-match: Pack B and Pack E undervalue these items at Understand
  while Packs A/D/C correctly assign Apply.
- No pack crosses ±1.0 for any pattern — the formal DCS §13 flag is not
  triggered, but the 0.50 gap in framework-application is educationally
  significant.

=== PART 6: DIFFICULTY SCORE CROSS-PACK MATRIX ===

Section | Pack A     Pack B     Pack C     Pack D     Pack E     Pool DS | Range | Deviant
────────┼────────────────────────────────────────────────────────────────┼───────┼────────
A       | 1.95       2.44       2.08       2.33       2.39       2.24   | 0.49  | —
B       | 2.45       2.58       2.36       2.54       2.47       2.48   | 0.22  | —
C       | 2.53       2.51       2.66       2.69       2.34       2.55   | 0.35  | —
D       | 2.57       2.55       2.52       2.48       2.31       2.49   | 0.26  | —
E       | 1.83       2.05       2.59       2.63       2.17       2.25   | 0.80  | A(-0.43)
F       | 1.47       1.80       2.63       2.50       2.03       2.08   | 1.16  | A(-0.62) C(+0.54)

KEY FINDINGS:
- Section F DS range is 1.16: Pack A at 1.47 (Easy) vs Pack C at 2.63
  (Moderate). This is a FULL LEVEL deviation that is educationally significant.
- Pack A Section F DS=1.47: 40 items at DS=1, 35 at DS=2 — virtually no
  Moderate (3) or higher items. Section F (Technology & Analytics) may be
  systematically underrated for difficulty.
- Pack C Section F DS=2.63: 61 items at DS=3 (Moderate), suggesting Pack C's
  template engine assigned higher DS to technology items.
- Section E: Pack A DS=1.83 vs Pack D DS=2.63 — DL-012 clone packs inflate DS.

=== PART 7: PACK E SYSTEMATIC UNDER-CALIBRATION ANALYSIS ===

Pack E was authored through a SEPARATE pipeline from Packs A-D. Evidence:

  Section  Understand%  Apply%  Ratio(U/A)  Pool-U%  Deviation
  ───────  ───────────  ──────  ──────────  ───────  ─────────
  A        84.0%        14.7%   5.73x       46.9%    +37.1 ppt
  B        60.0%        37.0%   1.62x       41.6%    +18.4 ppt
  C        68.0%        32.0%   2.13x       47.2%    +20.8 ppt
  D        81.3%        18.7%   4.36x       43.3%    +38.0 ppt
  E        96.0%         0.0%   ∞           44.5%    +51.5 ppt
  F       100.0%         0.0%   ∞           26.5%    +73.5 ppt

Sections E and F have ZERO Apply items — every item is labeled Understand,
despite many testing at Apply-level reasoning (e.g., framework application,
technology scenario analysis).

This is the single largest cross-pack consistency defect. While no individual
section crosses the ±1.0 CL threshold, the cumulative pattern means Pack E
operates at a LOWER cognitive tier than the rest of the pool.

=== PART 8: DL-012 CLONE PACK ANALYSIS ===

Pack C Section E vs Pack D Section E (75 items each, 5-item rotation groups):

                   Pack C Sec E    Pack D Sec E    Pool Sec E
  CL Mean           2.87 (Apply)   3.08 (Apply)    2.52 (Apply)
  DS Mean           2.59           2.63            2.25
  Evaluate count    15 (20.0%)     20 (26.7%)      —

Clone-internal consistency: ΔCL(C-D) = 0.21 — GOOD (below detection threshold).
Deviation from pool:     ΔCL(C-pool) = +0.34, ΔCL(D-pool) = +0.56.
Deviation from Pack A:   ΔCL(C-A) = +0.70, ΔCL(D-A) = +0.91.

The clone packs are inflated relative to Packs A and E, but consistent with
each other. The template rotation engine assigned Evaluate and Analyze labels
to clone items where the original Pack A Section E uses Understand.

=== PART 9: TOPIC-NORMALIZED CROSS-PACK FINDINGS ===

Only 10 topics span multiple packs (low topic-label standardization).

Topics with CL variance ≥ 0.5 across packs:
  1. "management override risk" (6 items, Packs A+C):
     Pack A: CL=2.00 (Understand), Pack C: CL=3.00 (Apply). Range: 1.00
  2. "inherent risk vs control risk" (6 items, Packs A+C):
     Pack A: CL=3.00 (Apply), Pack C: CL=2.40 (Understand). Range: 0.60

Cross-pack stem-skeleton matching found ZERO structural clones across different
packs — items are genuinely distinct (different companies, different scenarios,
different numbers). The DL-012 pattern is within-pack, not cross-pack.

=== PART 10: DCS v1.1 CONSISTENCY GRADE ===

FORMAL §13 ASSESSMENT:
  Sections with CL deviation ≥ ±1.0 from section pool mean: 0 of 6 (0.0%)
  Formal grade per DCS §13 literal text: A

QUALIFIED ASSESSMENT:
  Grade: B ("Good — isolated deviations requiring recalibration")
  Rationale for downgrade from A:
    1. Pack E's systematic 2-tier CL system: Understand (79.8%) across all
       sections vs pool norm Apply (53.4%). While no single section breaches
       the ±1.0 threshold, the PACK-LEVEL deviation of −0.34 is consistent
       across all 6 sections, creating a structural bias.
    2. Section F DS range of 1.16 (Pack A 1.47 vs Pack C 2.63) exceeds the
       DCS-recommended ±1.0 by 0.16 — this is a genuine DS calibration defect.
    3. Framework-application items in Pack E (CL=2.08) are a full 0.50 below
       pool norm (2.58) — while below the 1.0 formal threshold, the gap is
       educationally significant for 87 items.
    4. Pack A Section F DS=1.47 is anomalously low — 40 of 75 items at DS=1.
       This suggests template label default rather than genuine assessment.

DCS v1.1 CONSISTENCY VERDICT:
  - For equivalent concepts across packs, DCS does NOT produce identical CL.
    Pack E and Pack A/B/C/D form separate CL assignment tiers.
  - For equivalent reasoning depth, DCS does NOT produce identical DS.
    Section F demonstrates extreme DS variance (1.47–2.63).
  - The §13 "≥1 level" threshold is too coarse — it allows systematic 0.5-level
    biases to go unflagged. Recommend lowering to ≥0.5 for pack-level analysis.

=== PART 11: RECOMMENDATIONS ===

PRIORITY 1 — PACK E CL RECALIBRATION (HIGH)
  Issue: Pack E is a 2-tier CL system (79.8% Understand, 18.8% Apply) when
  the pool norm is 46.5% Apply.
  Sections E and F have ZERO Apply items.
  Recommendation: Batch recalibrate Pack E Sections A-F. Apply items with
  framework-application stems, calculation stems, and technology-scenario stems
  that currently default to Understand. Estimated: ~200 items need CL upgrade.
  Batch cap: ≤30 items per governance-guard Rule 5.

PRIORITY 2 — PACK A SECTION F DS RECALIBRATION (HIGH)
  Issue: DS=1.47 vs pool 2.08. 40 of 75 items at DS=1.
  Recommendation: Recalibrate Pack A Section F DS. Technology items testing
  framework application should not default to DS=1. Target pool Section F DS
  mean of ~2.1.

PRIORITY 3 — PACK C/D SECTION F DS RECALIBRATION (MEDIUM)
  Issue: Pack C DS=2.63, Pack D DS=2.50, both above pool 2.08.
  Recommendation: Recalibrate to pool Section F DS norm.

PRIORITY 4 — PACK C/D SECTION E CL MODERATION (MEDIUM)
  Issue: Clone packs at CL 2.87/3.08 vs pool Section E CL 2.52. The Evaluate
  assignments (Pack C: 15, Pack D: 20) are template artifacts.
  Recommendation: Recalibrate using pool Section E CL norm of 2.52.

PRIORITY 5 — DCS v1.1 THRESHOLD ADJUSTMENT (LOW)
  Issue: The §13 "≥1 level" threshold allows systematic 0.5-level biases
  (like Pack E's cross-section −0.34) to go unflagged.
  Recommendation: Add a pack-level gate: if a pack's mean CL deviates from pool
  mean by ≥0.5 across ≥4 sections, flag for pack-level recalibration.

=== PART 12: METHODOLOGY NOTES ===

1. Extraction: Function constructor per pack (string-aware, BOM-stripped).
   Pack D required BOM-stripping (U+FEFF at file start). All 2,500 items
   extracted successfully.

2. Stem-skeleton matching: Found 0 cross-pack structural clones. DL-012 clone
   pattern is within-pack (5-item rotation groups within Pack C/D Section E),
   not cross-pack. Pack E Section E has entirely different stems from Pack C/D
   Section E — different authoring pipeline, different questions.

3. Pack D Section F: 74 items (1 fewer than Pack C's 75). Confirmed by
   Function-constructor parse count.

4. Pattern classification: Regex-based heuristics for definition-match,
   calculation, and framework-application. False positives/negatives possible
   at boundaries. The classification is intended to surface trends, not
   exhaustively catalog every item.

5. DCS v1.1 §13 compliance: FORMALLY PASSES (0 sections ≥ ±1.0). QUALIFIED
   ASSESSMENT downgrades to B due to Pack E systematic deviation and Section F
   DS range exceeding 1.0.

================================================================================
END OF AUDIT
================================================================================
