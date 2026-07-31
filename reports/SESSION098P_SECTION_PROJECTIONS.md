# SESSION098P — Section-Level Projections

**Session:** 98P — Repository Reclassification ROI Analysis
**Date:** 2026-07-31
**Source Data:** S96P (Pack C EC) + S98P (Pack A Section A, Pack D CD, Pack D DD)
**Confidence:** HIGH for audited sections; MEDIUM for projected sections

---

## 1. Audited Sections (Ground Truth)

| Section | Pack | Items | HO Labeled | True HO | HO Accuracy | Largest Gap |
|---------|------|-------|-----------|----------|-------------|-------------|
| EC (Internal Controls) | C | 75 | 66 (88.0%) | 40 (53.3%) | 60.6% | Eval→Analyze (11 items) |
| Section A | A | 75 | 22 (29.3%) | 4 (5.3%) | 18.2% | Eval/Anal→Apply (18 items) |
| CD (Perf Mgmt) | D | 100 | 14 (14.0%) | 0 (0.0%) | 0.0% | Anal→Understand (12 items) |
| DD (Cost Mgmt) | D | 75 | 18 (24.0%) | 1 (1.3%) | 5.6% | Anal→Understand (12 items) |

---

## 2. Projected Sections (Extrapolated from Audit Data)

### 2.1 Based on Section Archetype

| Section | Archetype | Labeled HO Items | Est. True HO | Est. Accuracy | Basis |
|---------|-----------|-----------------|-------------|---------------|-------|
| Pack C ED | COSO Framework (like EC) | ~75 | ~45 | ~60% | Similar to EC — COSO content with one-tier slippage |
| Pack C EE | COSO Framework (like EC) | ~50 | ~30 | ~60% | Smaller COSO sample, same pipeline |
| Pack C EF | Technology (like F) | ~15 | ~8 | ~53% | Pack A Section F was 100% accurate; this may be similar |
| Pack D ED | COSO Framework (like EC) | ~75 | ~45 | ~60% | S94P estimated 79% accuracy — likely correct |
| Pack D FD | Technology (like F) | ~25 | ~13 | ~52% | Mixed accuracy; Pack A Section F = benchmark |
| Pack C CC | Perf Mgmt (like CD) | ~29 | ~3 | ~10% | Similar to CD — formula/concept as analysis |
| Pack C DC | Cost Mgmt (like DD) | ~23 | ~2 | ~9% | Similar to DD — definitions as analysis |
| Pack D BD | Budgeting (HIGH) | ~89 | ~67 | ~75% | S94P: highest accuracy after AB; well-authored campaigns |
| Pack A Section B | Benchmark (HIGH) | ~35 | ~29 | ~83% | Gold standard section — individually authored |
| Pack A Section C | Perf Mgmt | ~17 | ~4 | ~24% | Between CD and EC — some genuine variance analysis |
| Pack A Section D | Cost Mgmt | ~18 | ~5 | ~28% | Between DD and A/A — some genuine application items |
| Pack A Section E | Internal Controls | ~23 | ~12 | ~52% | Between EC and ED — template COSO items |
| Pack A Section F | Technology | ~5 | ~5 | ~100% | Confirmed perfect by S94P |
| Pack B Sections | All (independent) | ~25 | ~11 | ~44% | Independent pipeline — S93P estimated ~48% |
| Pack E Sections | All (independent) | ~35 | ~24 | ~69% | Independent pipeline — small sample, mixed |

### 2.2 Per-Pack Projections

| Pack | Items | Labeled HO | Est. True HO | Labeled HO% | True HO% | Δ |
|------|-------|-----------|-------------|-------------|----------|----|
| Pack A | 500 | 120 | ~51 | 24.0% | 10.2% | −69 |
| Pack B | 500 | 25 | ~11 | 5.0% | 2.2% | −14 |
| Pack C | 500 | ~158 | ~70 | 31.6% | 14.0% | −88 |
| Pack D | 500 | ~244 | ~106 | 48.8% | 21.2% | −138 |
| Pack E | 545 | ~35 | ~24 | 6.4% | 4.4% | −11 |
| **Total** | **2,545** | **~582** | **~262** | **22.9%** | **10.3%** | **−320** |

*Note: Labeled HO counts differ from S94P's 528 because S98P found additional HO-labeled items in Section A (22 vs 18 labeled), CD (14 vs 10), and DD (18 vs 17).*

---

## 3. Non-HO Sections — Where Apply/Understand Items Are Hiding as HO

### 3.1 Apply-Rich Sections Currently Labeled HO

| Section | Items | Current Apply | Hidden Apply (in Analyze/Evaluate labels) | Corrected Apply |
|---------|-------|--------------|------------------------------------------|----------------|
| Pack A Section A | 75 | 51 | 18 (from 22 HO items) | 69 |
| Pack D Section CD | 100 | 54 | 2 (from 14 HO items) | 56 |
| Pack D Section DD | 75 | 38 | 5 (from 18 HO items) | 43 |

### 3.2 Understand-Rich Sections Currently Labeled HO

| Section | Items | Current Understand | Hidden Understand (in HO labels) | Corrected Understand |
|---------|-------|-------------------|--------------------------------|---------------------|
| Pack D Section CD | 100 | 32 | 12 (from 14 HO items) | 44 |
| Pack D Section DD | 75 | 19 | 12 (from 18 HO items) | 31 |

---

## 4. Impact of Relabeling on Repository-Wide Distributions

### 4.1 Before Relabeling (Current Baseline)

| Level | Count | % |
|-------|-------|---|
| Remember | 81 | 3.2% |
| Understand | 1,002 | 39.4% |
| Apply | 972 | 38.2% |
| Analyze | 260 | 10.2% |
| Evaluate | 221 | 8.7% |
| Missing/Defect | 9 | 0.4% |

### 4.2 After Relabeling (Projected)

| Level | Count | % |
|-------|-------|---|
| Remember | ~120 | 4.7% |
| Understand | ~1,230 | 48.3% |
| Apply | ~1,100 | 43.2% |
| Analyze | ~145 | 5.7% |
| Evaluate | ~117 | 4.6% |
| Missing/Defect | ~9 | 0.4% |

### 4.3 After Relabeling + Genuine HO Creation (End State)

| Level | Count | % | CAQS Target | Gap |
|-------|-------|---|-------------|-----|
| Remember | ~130 | 5.1% | 5% (127) | +3 |
| Understand | ~1,230 | 48.3% | 15% (382) | +848 surplus |
| Apply | ~1,080 | 42.4% | 40% (1,018) | +62 surplus |
| Analyze | ~390 | 15.3% | 25% (636) | −246 |
| Evaluate | ~300 | 11.8% | 15% (382) | −82 |
| **HO Total** | **~690** | **~27.1%** | **40% (1,018)** | **−328** |

*End state assumes creating ~545 genuine HO items at 60% campaign conversion rate (producing ~328 true HO).*

---

## 5. Confidence Assessment

| Finding | Evidence | Confidence |
|---------|----------|------------|
| Pack A Section A: 4 true HO, 19 over-labeled | 22-item full audit | **HIGH** |
| Pack D CD: 0 true HO, 12 Understand items | 14-item full audit | **HIGH** |
| Pack D DD: 1 true HO, 12 Understand items | 18-item full audit | **HIGH** |
| Repository-wide: ~262 true HO | 120-item calibration + S93P sample | **MEDIUM-HIGH** |
| Per-section projections (non-audited) | Extrapolation from archetypes | **MEDIUM** |
| Zero items need content rewrite | 120-item evidence base | **HIGH** |

---

*Generated: 2026-07-31 | Session 98P Implementer Phase*
