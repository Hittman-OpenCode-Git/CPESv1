# S372 — DL-031 Calibration Strategy: Backlog Economics

**Session:** S372
**Type:** Read-Only Analysis — DL-031 Backlog Economics
**Timestamp:** 2026-07-28T12:00:00Z

---

## 1. DL-031 Scope and Severity

DL-031 is systematic difficulty inflation affecting **~850 definition-match items** across all 5 packs. The stem is a textbook definition; the correct answer is the term. These items test Bloom's Remember/Understand but are labeled `Difficulty: "Moderate" (score 3)`.

**Detection signature:** Single-sentence stem, textbook definition, no scenario data (no company name, no dollar amounts, no dates), Jaccard similarity stem↔correct-choice >50%.

| Factor | Assessment |
|--------|-----------|
| Learner safety | LOW — labels don't affect scoring |
| Pedagogical quality | MEDIUM — distorts perceived exam difficulty |
| Analytical integrity | HIGH — 48.3% Moderate pool contains ~70% Easy items |
| Downstream planning | **CRITICAL** — CAL-001: #1 blocker for all difficulty/Bloom's planning |

## 2. Classification Breakdown

| Category | Items | % | Hours | Automatable |
|----------|-------|---|-------|-------------|
| Simple Relabel | 595 | 70% | 11.9h | Yes (Jaccard scan + batch write) |
| Calibration Adjustment | 110 | 13% | 11.0h | Partially (detection only) |
| Rewrite Required | 85 | 10% | 42.5h | No — DEFERRED |
| Replace Required | 60 | 7% | 90.0h | No — DEFERRED |

## 3. CRITICAL: Paired Constraint

DL-031 cannot execute in isolation. Easy is already at 21.1% (target 15%). Adding 595 Moderate→Easy relabels pushes Easy to **54.6%** — making the distribution WORSE.

**Mandatory:** Every batch of ≤30 items must contain ≥3 downgrades paired with ≥2 upward recalibrations (Moderate→Difficult).

## 4. Strategy Recommendation

**Option C — Wave-Paired (23h immediate, 132.5h deferred) is RECOMMENDED.**

- Execute Simple Relabel (12h, automated) + Calibration Adjustment (11h, manual) immediately
- DEFER Rewrite + Replace items to pair with S371 cognitive upgrade waves
- Redirect 132.5 deferred hours to S371 pipeline: produce ~285 Analyze/Evaluate/VDiff items

Comparison:
- Option A (Full, 155h): 850 items relabeled, **zero cognitive tier upgrades**
- Option C (Wave-Paired, 113h): 930 items total, **foundational calibration + 225 cognitive upgrades**

## 5. Opportunity Cost

| Activity | Hours/item | Cognitive tier created | Value |
|----------|-----------|----------------------|-------|
| DL-031 stem rewrite | 0.5h | Same tier | Low |
| New Analyze item | 0.5h | Analyze (one-tier upgrade) | High |
| New Evaluate item | 0.33h | Evaluate (highest-tier creation) | Very High |

**Cognitive upgrades are 5-10x more valuable per authoring hour than DL-031 stem rewrites.**

## 6. Post-Execution State

After DL-031 wave-pairing:
- TRUE Moderate pool: ~500-600 (down from 1,226)
- TRUE Difficult shortfall: ~350-400 (not ~550)
- Easy: 43-45% (trending toward 15% after upward recalibrations in subsequent waves)
- All downstream planning: precise within ±5% (was ±30%)
