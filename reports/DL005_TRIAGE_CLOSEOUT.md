# DL-005 100%-Pair Triage Closeout — 46/46 Legitimate Parallel Structure (0 rewrites)

**Date:** 2026-09-10
**Scope:** All 46 QIDs with Jaccard-100% distractor pairs from `ValidationReport.json`
  (B:22, E:23, D:1; backlog: `reports/DL005_100pct_backlog.json`)
**Method:** Per-item human review of full choice sets + CorrectChoice (scripts/show_choices.js)
**Verdict:** 0 true redundancies. All 46 are legitimate parallel-structure distractors.
**Content writes:** NONE. No backups triggered (no pack writes).

## Why Jaccard-100% misfires here

The validator compares sets of significant words (length > 2, minus stopwords). It is blind to:
direction (debit/credit, increase/decrease, favorable/unfavorable), negation, sequence order,
magnitude, and account-side assignment — which are precisely the dimensions these distractors test.
Prior calibration stands: 70% confidence with non-trivial FP rate (DL-005 notes); DL-043 showed the
same for 55–65% pairs. This session proves it for 100% pairs too.

## Per-item verdicts

| # | QID | CC | 100% pairs | Verdict |
|---|-----|----|-----------|---------|
| 1 | P1B-A-105 | B | 6 | LEGIT — classification matrix (investing/operating/financing × dividends/interest), all combos distinct |
| 2 | P1B-A-112 | A | 6 | LEGIT — journal direction traps (DTA vs DTL × debit vs credit) |
| 3 | P1B-A-114 | B | 6 | LEGIT — valuation-allowance journal variants |
| 4 | P1B-A-140 | A | 6 | LEGIT — straight-line/front-loaded matrix, all combos distinct |
| 5 | P1B-B-114 | A | 6 | LEGIT — distinct amounts × U/F ($5KU/$25KU/$20KF/$20KU) |
| 6 | P1B-B-151 | C | 6 | LEGIT — budget-sequence orderings, all distinct |
| 7 | P1B-C-110 | A | 6 | LEGIT — increase/decrease COGS matrix |
| 8 | P1B-C-113 | A | 6 | LEGIT — journal variants with different amounts/accounts |
| 9 | P1B-C-137 | D | 6 | LEGIT — DuPont margin × turnover combos |
| 10 | P1B-C-139 | D | 6 | LEGIT — accept/reject matrix under ROI × RI |
| 11 | P1B-C-162 | D | 6 | LEGIT — BSC perspective orderings |
| 12 | P1B-C-168 | A | 6 | LEGIT — division × ROI% combos |
| 13 | P1B-C-169 | B | 6 | LEGIT — division × $ amount combos |
| 14 | P1B-C-171 | A | 6 | LEGIT — product × amount combos |
| 15 | P1B-C-178 | D | 6 | LEGIT — constraint-analysis options |
| 16 | P1B-C-194 | A | 6 | LEGIT — net variance amount × significance combos |
| 17 | P1B-D-092 | C | 6 | LEGIT — journal direction traps (WIP/FG/MOH × debit/credit) |
| 18 | P1B-D-136 | B | 6 | LEGIT — amount × % combos |
| 19 | P1B-D-144 | D | 6 | LEGIT — product × CM-per-hour combos |
| 20 | P1B-D-149 | A | 6 | LEGIT — prime/conversion amount swaps |
| 21 | P1B-E-115 | D | 6 | LEGIT — penalty magnitude ladder |
| 22 | P1B-F-114 | C | 6 | LEGIT — breach-notification timeframe ladder |
| 23 | P1-CD-048 | A | 6 | LEGIT — four distinct terms (validator artifact; near-zero word overlap) |
| 24 | P1E-A-008 | A | 6 | LEGIT — cash-flow activity classifications |
| 25 | P1E-A-020 | D | 6 | LEGIT — preferred-stock feature statements |
| 26 | P1E-B-006 | A | 6 | LEGIT — budget-type terms |
| 27 | P1E-B-071 | A | 6 | LEGIT — variance-analysis process steps |
| 28 | P1E-B-086 | C | 6 | LEGIT — rolling-budget frequency concepts |
| 29 | P1E-C-003 | C | 6 | LEGIT — prose causal attributions sharing vocabulary but asserting different causes (overtime vs skill-mix per department); exemplar distractor engineering |
| 30 | P1E-C-006 | D | 6 | LEGIT — variance-cause terms |
| 31 | P1E-C-032 | D | 6 | LEGIT — DMAIC vs plausible corruptions (order traps) |
| 32 | P1E-C-038 | D | 6 | LEGIT — market-share formula component permutations |
| 33 | P1E-C-039 | D | 6 | LEGIT — market-size formula component permutations |
| 34 | P1E-C-040 | C | 6 | LEGIT — efficiency-variance cause statements |
| 35 | P1E-C-052 | D | 6 | LEGIT — DuPont component pairs |
| 36 | P1E-C-098 | A | 6 | LEGIT — favorable/unfavorable direction statements |
| 37 | P1E-C-099 | C | 6 | LEGIT — scope traps ("Only X" vs goal congruence) |
| 38 | P1E-C-S01 | ? | 6 | LEGIT — 4-slot U/F permutation matrix across four variances |
| 39 | P1E-D-S12 | A | 6 | LEGIT — step-cost counts + cannot-determine |
| 40 | P1-E-R04 | ? | 6 | LEGIT — preventive/detective control classifications |
| 41 | P1-E-R15 | ? | 6 | LEGIT — input/processing/output sequence permutations |
| 42 | P1-E-R17 | ? | 6 | LEGIT — risk-response sequence permutations |
| 43 | P1E-E-010 | B | 6 | LEGIT — risk-definition terms (residual/inherent/total) |
| 44 | P1E-F-050 | D | 6 | LEGIT — data-model types |
| 45 | P1E-F-S03 | ? | 6 | LEGIT — descriptive/diagnostic/predictive/prescriptive assignments |
| 46 | P1E-F-S04 | ? | 6 | LEGIT — CCPA/GDPR requirement allocations |

(CC="?" = dump-script regex gap on R/S-series ID formats, not a content finding; keys verified intact
in prior reviews. P1-CD-048's flag is a validator artifact — choices share near-zero vocabulary.)

## Recommendation

1. **Close 2.1 with zero rewrites.** The 100%-pair flag, like the 55–65% flag before it (DL-043),
   requires human adjudication; unadjudicated Jaccard output is inadmissible as rewrite evidence (DL-045).
2. **Validator precision note (future work, not this session):** Jaccard-on-word-sets could exclude
   structured choice sets (journal entries, matrices, sequences) or weight direction/negation tokens.
   Logged as observation; no validator change made (ExplanationValidator/psychometric suite untouched —
   governance-critical files stable).
3. Residual DL-005 risk, if any, lives in the 275 moderate-similarity (50–70%) pairs — lower yield
   than the 100% set just cleared (which yielded 0/46). Defer unless a learner challenge surfaces one.
