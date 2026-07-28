# S371 — Cognitive Gap Capacity Analysis

**Session:** S371
**Type:** Read-Only Analysis — Cognitive Gap Closure Model
**Timestamp:** 2026-07-28T12:00:00
**Sources:** S861, S862, S863, S864, S899, S367A, S370, CURRENT_BASELINES.md

---

## 1. Current Gap Size and Composition

| Metric | Value |
|--------|-------|
| Total pool | 2,540 items (500×5 packs + 40 Pack E R-series) |
| Currently Analyze+Evaluate | ~50 items (1.97%) |
| CAQS §6.2 Analyze target | 25% = 635 items |
| CAQS §6.2 Evaluate target | 15% = 381 items |
| Combined target | 40% = 1,016 items |
| **Gap** | **966 items (38.03 pp)** |

Current production velocity does not close this gap in a reasonable timeframe. At S861's best demonstrated rate (25 Analyze items per wave, 1 wave/week), closing 966 items would take ~39 weeks — nearly 10 months of sustained effort, ignoring the harder Evaluate items entirely.

## 2. Three Pathway Analysis

### Pathway A — Stem Rewrite (S861 method)

Takes a calculation item and rewrites the stem into a diagnosis prompt. S861: 15 direct edits + 10 cascade-inherited = 25 Analyze items per wave. Items per hour: 5.0 (net) / 3.0 (direct). Quality risk: Medium.

Cascade dependency: the 67% lift depends on intact rotation groups. Remediation waves (DL-013, DL-026) may have broken some groups.

### Pathway B — Net-New Authoring (S899 method)

Authors completely new items from blank slots. S899 Phase 1: 20 items (13 Analyze + 7 Evaluate), ~8 hours. Items per hour: 2.5 blended. Evaluate items (~1/hr) are the binding constraint. Quality risk: High — no existing answer key to cross-validate.

### Pathway C — Label-Only Relabel (PROHIBITED)

Per S862 anti-inflation safeguards. However, classification correction (items whose stems genuinely demand analysis but carry wrong labels) is permitted — see Bucket 1.

## 3. Gap Classification

| Bucket | Items | % | Hours | Method |
|--------|-------|---|-------|--------|
| B1 — Classification Correction | 100 | 10.4% | 20 | Metadata verify + relabel |
| B2 — Upgradable | 350 | 36.2% | 70 | Stem rewrite (Pathway A) |
| B3 — Replacement Required | 516 | 53.4% | 206 | Net-new author (Pathway B) |
| **Total** | **966** | **100%** | **296** | — |

## 4. Total Closure Effort

At 1 wave/week: ~41 weeks (~10 months)
At 2 waves/week: ~21 weeks (~5 months)
At 3 waves/week: ~14 weeks (~3.5 months)

## 5. Two-Tier Certification Impact

- Analyze items (80% of new content): ~15-20% effort reduction (Production tier omits business interpretation sections)
- Evaluate items (20%): 0% reduction (Evaluate demands Gold-tier treatment)
- Weighted reduction: ~12% (296h → 260h)

## 6. Verdict

**Cannot reach 40% Analyze+Evaluate without increasing authoring throughput.** At 1 wave/week: 41 weeks. The Evaluate bottleneck (381 items needed, 0 certified, 5-7 per phase) alone requires 55-76 phases.

## 7. Minimum Throughput Increase Required

| Requirement | Current | Needed |
|------------|---------|--------|
| Waves per week | ~1 | **~3** (3x increase) |
| Items per wave (Analyze) | 25 | 30 (20% process improvement) |
| Items per wave (Evaluate) | ~5 | **~15** (3x — requires new methodology) |
| Reviewer sessions/week | ~1 | **~2-3** |

**Recommended acceleration:** 2 waves/week + two-tier certification + S370 automation → Analyze gap (~585 items) closes in ~18 weeks. Evaluate gap (~381 items) requires separate, longer-term strategy.
