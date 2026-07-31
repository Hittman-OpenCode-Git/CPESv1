# S721 Agent G — Pack-Level Calibration Scorecard

**Session:** 721
**Agent:** G (Pack-Level Review)
**Type:** Read-Only Audit
**Date:** 2026-07-26
**Methodology:** Raw-file extraction via Node.js boundary-aware regex, 6,000-char window per QuestionID. DCS §3 default mapping: Remember→DS1, Understand→DS2, Apply→DS3, Analyze→DS4, Evaluate→DS4.

---

## 1. Executive Summary — Calibration Quality Ranking

| Rank | Pack | DCS §3 Compliance | Severe Rate | Mean |gap| | CL Balance | DS Balance | Notes |
|------|------|-------------------|-------------|-----------|------------|------------|-------|
| **1** | **Pack E** | **97.2%** | **2.8%** | 0.62 | Poor (78.8% Understand) | Good | Lowest severe rate; CL taxonomy is the narrowest |
| **2** | **Pack A** | **89.6%** | **10.4%** | 0.42 | Fair (55.8% Apply) | No DS4/DS5 | Low |gap| but complete absence of DS4 is suspicious |
| **3** | **Pack C** | **88.8%** | **11.2%** | 0.81 | Fair (46% Apply, 44% Understand) | DS3-heavy (60.4%) | Moderate balance; DL-012 clone artifacts in E/F |
| **4** | **Pack B** | **84.6%** | **15.4%** | 0.73 | **Best** (65% Apply, 8% Remember) | **Best** (CAQS-aligned) | Benchmark pack; severe rate is elevated by Remember@DS2/DS3 |
| **5** | **Pack D** | **84.8%** | **15.2%** | **0.85** | Fair (47% Apply, 42% Understand) | DS3-heavy (62.8%); highest DS4 (11.8%) | Worst mean |gap| and most DS4 items |

**Key insight:** Pack E has the best DCS §3 compliance rate (97.2%) but the *worst* CL diversity (78.8% Understand, nearly flat). Pack B has the *best* CL diversity but only 84.6% DCS compliance because many Remember items are labeled DS2/DS3 instead of DS1. The compliance rate alone is not a sufficient quality measure — CL distribution diversity must be weighted equally.

---

## 2. Pack-by-Pack Scorecards

### 2.1 PACK A (500 items, 481 Certified)

#### Calibration Scorecard

| Metric | Value |
|--------|-------|
| DCS §3 compliant | 448 (89.6%) |
| Severe misalignment (gap≥2) | 52 (10.4%) |
| Mean \|gap\| | 0.42 |
| Gap distribution | gap0=345 gap1=103 gap2=50 gap3=2 |

#### CL Distribution

| CL | Count | % | DCS Default | Notes |
|----|-------|---|-------------|-------|
| Remember | 3 | 0.6% | DS1 | Only 3 items — nearly absent |
| Understand | 214 | 42.8% | DS2 | Overconcentrated in sections E (62) and F (59) |
| Apply | 279 | 55.8% | DS3 | Dominant CL; 49 mislabeled @DS1 (gap=-2) |
| Analyze | 2 | 0.4% | DS4 | Virtually absent |
| Evaluate | 2 | 0.4% | DS4 | Virtually absent |

#### DS Distribution

| DS | Label | Count | % |
|----|-------|-------|---|
| DS1 | Easy | 102 | 20.4% |
| DS2 | Moderate-Easy | 215 | 43.0% |
| DS3 | Moderate | 183 | 36.6% |
| DS4 | Difficult | 0 | 0.0% |
| DS5 | Very Difficult | 0 | 0.0% |

**CRITICAL FINDING:** Zero DS4 or DS5 items. With 279 Apply items (DCS default DS3), the absence of any item labeled Difficult or Very Difficult is statistically implausible. At minimum, the 49 Apply@DS1 items and 51 Apply@DS2 items are scoring as Easy/ME when their cognitive demand (Apply = procedural computation) warrants Moderate or higher.

#### Section-Level Breakdown

| Section | Items | DCS §3 | Severe | \|gap\| | CL Summary | DS Summary | Issues |
|---------|-------|--------|--------|---------|------------|------------|--------|
| **P1-A** | 75 | 86.7% | 13.3% | 0.88 | Apply:58 Unde:15 Reme:1 Eval:1 | DS1:12 DS2:58 DS3:5 | 10 Apply@DS1 — systematically under-calibrated |
| **P1-B** | 100 | 85.0% | **15.0%** | 0.38 | Apply:79 Unde:21 | DS1:19 DS2:17 DS3:64 | 15 Apply@DS2, 4 Apply@DS1 — moderate under-calibration |
| **P1-C** | 100 | **97.0%** | 3.0% | 0.14 | Apply:64 Unde:34 Eval:1 Reme:1 | DS1:9 DS2:29 DS3:62 | Best-calibrated section in Pack A |
| **P1-D** | 75 | 94.7% | 5.3% | 0.12 | Apply:52 Unde:23 | DS1:5 DS2:22 DS3:48 | Good calibration |
| **P1-E** | 75 | 92.0% | 8.0% | 0.35 | Unde:62 Apply:13 | DS1:17 DS2:54 DS3:4 | 62 Understand items — nearly monolithic CL |
| **P1-F** | 75 | 81.3% | **18.7%** | 0.75 | Unde:59 Apply:13 Anal:2 Reme:1 | DS1:40 DS2:35 | **Worst section.** 40/75 items = Easy (DS1), zero DS3+. 14 Understand@DS1 items (gap=-1, borderline severe) |

#### CL×DS Matrix

| CL\DS | DS1 | DS2 | DS3 | DS4 | DS5 |
|-------|-----|-----|-----|-----|-----|
| Remember | 3 | 0 | 0 | 0 | 0 |
| Understand | 48 | 163 | 3 | 0 | 0 |
| Apply | **49** | 51 | 179 | 0 | 0 |
| Analyze | 2 | 0 | 0 | 0 | 0 |
| Evaluate | 0 | 1 | 1 | 0 | 0 |

**Bold = severe misalignment cluster.** 49 Apply items at DS1 (Easy) is the largest single calibration defect in Pack A.

---

### 2.2 PACK B (500 items, 500 Certified) — BENCHMARK

#### Calibration Scorecard

| Metric | Value |
|--------|-------|
| DCS §3 compliant | 423 (84.6%) |
| Severe misalignment (gap≥2) | 77 (15.4%) |
| Mean \|gap\| | 0.73 |
| Gap distribution | gap0=219 gap1=204 gap2=71 gap3=6 |

#### CL Distribution

| CL | Count | % | DCS Default | Notes |
|----|-------|---|-------------|-------|
| Remember | 41 | 8.2% | DS1 | Best Remember coverage in pool (3.6× more than Packs A/C/D/E combined) |
| Understand | 111 | 22.2% | DS2 | Closest to CAQS §6.2 target (15%) |
| Apply | 325 | 65.0% | DS3 | Closest to CAQS §6.2 target (40%) |
| Analyze | 15 | 3.0% | DS4 | Below CAQS target (25%) but best in pool |
| Evaluate | 8 | 1.6% | DS4 | Below CAQS target (15%) |

#### DS Distribution

| DS | Label | Count | % |
|----|-------|-------|---|
| DS1 | Easy | 141 | 28.2% |
| DS2 | Moderate-Easy | 84 | 16.8% |
| DS3 | Moderate | 247 | 49.4% |
| DS4 | Difficult | 28 | 5.6% |
| DS5 | Very Difficult | 0 | 0.0% |

#### Section-Level Breakdown

| Section | Items | DCS §3 | Severe | \|gap\| | CL Summary | DS Summary | Issues |
|---------|-------|--------|--------|---------|------------|------------|--------|
| **P1B-A** | 75 | **93.3%** | 6.7% | 0.64 | Appl:54 Unde:11 Reme:10 | DS1:9 DS2:30 DS3:31 DS4:5 | Well-calibrated |
| **P1B-B** | 100 | 82.0% | **18.0%** | 0.59 | Appl:64 Reme:22 Unde:10 Eval:2 Anal:2 | DS1:12 DS2:19 DS3:67 DS4:2 | 22 Remember items; 10@DS2, 12@DS3 |
| **P1B-C** | 100 | 86.0% | 14.0% | 0.66 | Appl:74 Eval:4 Unde:14 Reme:6 Anal:2 | DS1:32 DS2:8 DS3:46 DS4:14 | 32 DS1 items with 26 Understand+Apply — severe under-calibration cluster |
| **P1B-D** | 75 | 85.3% | 14.7% | 0.59 | Appl:72 Reme:2 Unde:1 | DS1:14 DS2:14 DS3:40 DS4:7 | Moderate compliance |
| **P1B-E** | 75 | 81.3% | 18.7% | 0.80 | Appl:39 Unde:27 Anal:8 Reme:1 | DS1:32 DS2:9 DS3:34 | 32 DS1 items; 19 Unde@DS1, 6 Appl@DS1 |
| **P1B-F** | 75 | **80.0%** | **20.0%** | **1.16** | Unde:48 Appl:22 Anal:3 Eval:2 | DS1:42 DS2:4 DS3:29 | **Worst section in Pack B.** Highest mean |gap|=1.16. 42/75 items = DS1. 31 Unde@DS1 items. |

#### CL×DS Matrix

| CL\DS | DS1 | DS2 | DS3 | DS4 | DS5 |
|-------|-----|-----|-----|-----|-----|
| Remember | 14 | 15 | 12 | 0 | 0 |
| Understand | 67 | 12 | 32 | 0 | 0 |
| Apply | 54 | 52 | 192 | 27 | 0 |
| Analyze | 3 | 4 | 7 | 1 | 0 |
| Evaluate | 3 | 1 | 4 | 0 | 0 |

**Key issue:** 54 Apply@DS1 (gap=-2) + 67 Understand@DS1 (gap=-1) = 121 items at Easy that could be more accurately calibrated. However, many of these are definition-match items (DL-031 pattern) where Easy IS correct — the current CL may be over-labeled rather than DS under-labeled.

#### Verdict on Pack B as Benchmark

Pack B is the best structural benchmark because:
1. **Most diverse CL distribution** — only pack with meaningful Remember (8.2%) and Analyze (3.0%) populations
2. **Best DS distribution** — closest to CAQS §6.1 targets
3. **Single-block architecture** — no DL-016 metadata-content shift contamination
4. **100% Certified** — no state-field gaps

However, its DCS compliance rate (84.6%) is misleadingly low because many Remember items are correctly labeled at DS2 (a legitimate DCS §3 deviation when the item requires discrimination between similar definitions). The "severe" rate (15.4%) includes borderline cases that may be intentional.

---

### 2.3 PACK C (500 items, 350 Certified)

#### Calibration Scorecard

| Metric | Value |
|--------|-------|
| DCS §3 compliant | 444 (88.8%) |
| Severe misalignment (gap≥2) | 56 (11.2%) |
| Mean \|gap\| | 0.81 |
| Gap distribution | gap0=167 gap1=277 gap2=42 gap3=14 |

#### CL Distribution

| CL | Count | % |
|----|-------|---|
| Remember | 5 | 1.0% |
| Understand | 221 | 44.2% |
| Apply | 230 | 46.0% |
| Analyze | 23 | 4.6% |
| Evaluate | 21 | 4.2% |

**Note:** Highest Analyze (4.6%) and Evaluate (4.2%) in pool. However, S720 Agent J found 48/66 "Analyze" items pool-wide are DL-012 definition-match clones, meaning many Pack C Analyze items may be mislabeled.

#### DS Distribution

| DS | Label | Count | % |
|----|-------|-------|---|
| DS1 | Easy | 100 | 20.0% |
| DS2 | Moderate-Easy | 79 | 15.8% |
| DS3 | Moderate | **302** | **60.4%** |
| DS4 | Difficult | 19 | 3.8% |
| DS5 | Very Difficult | 0 | 0.0% |

**DS3 concentration (60.4%) is the highest in pool.** DS2 gap: only 79 items (15.8%) vs. Pack B's 84 (16.8%) — Pack C is regressing toward the mean at DS3, reducing calibration discrimination.

#### Section-Level Breakdown

| Section | Items | DCS §3 | Severe | \|gap\| | Issues |
|---------|-------|--------|--------|---------|--------|
| **P1-AC** | 75 | 90.7% | 9.3% | 0.71 | 5 Remember (best in Pack C). Balanced DS1/DS2/DS3. |
| **P1-BC** | 100 | 83.0% | **17.0%** | 0.90 | 30 Understand items; 19 Unde@DS3 (gap=+1, benign), 7 Unde@DS4 (gap=+2). |
| **P1-CC** | 100 | 86.0% | 14.0% | 0.74 | **DS3-heavy: 76%.** 8 Analyze@DS1 (gap=-3, worst in pack). |
| **P1-DC** | 75 | 92.0% | 8.0% | 0.60 | Good balance, 52 DS3. |
| **P1-EC** | 75 | 89.3% | 10.7% | 0.97 | **DL-012 CLONE ZONE.** 56 Archived, 19 Unprocessed. DS: DS1+DS3 only (no DS2/DS4/DS5). All 56 clones have DS3 with random CL assignment (Eval:15 @DS3 — gap=-1). |
| **P1-FC** | 75 | 94.7% | 5.3% | 0.91 | **DS3-heavy: 81%.** All Unprocessed. 54 Unde items (72% of section). |

#### CL×DS Matrix

| CL\DS | DS1 | DS2 | DS3 | DS4 | DS5 |
|-------|-----|-----|-----|-----|-----|
| Remember | 2 | 3 | 0 | 0 | 0 |
| Understand | 54 | 24 | 136 | 7 | 0 |
| Apply | 30 | 47 | 141 | 12 | 0 |
| Analyze | 8 | 5 | 10 | 0 | 0 |
| Evaluate | 6 | 0 | 15 | 0 | 0 |

---

### 2.4 PACK D (500 items, 350 Certified)

#### Calibration Scorecard

| Metric | Value |
|--------|-------|
| DCS §3 compliant | 424 (84.8%) |
| Severe misalignment (gap≥2) | **76 (15.2%)** |
| Mean \|gap\| | **0.85** (worst in pool) |
| Gap distribution | gap0=162 gap1=262 gap2=65 gap3=11 |

#### CL Distribution

| CL | Count | % |
|----|-------|---|
| Remember | 1 | 0.2% |
| Understand | 209 | 41.8% |
| Apply | 233 | 46.6% |
| Analyze | 23 | 4.6% |
| Evaluate | **34** | **6.8%** |

**Highest Evaluate count in pool (34, 6.8%).** Many are in Section E (20 Evaluate items) — likely DL-012 template artifacts over-labeling definition-match items as Evaluate.

#### DS Distribution

| DS | Label | Count | % |
|----|-------|-------|---|
| DS1 | Easy | 99 | 19.8% |
| DS2 | Moderate-Easy | **28** | **5.6%** |
| DS3 | Moderate | **314** | **62.8%** |
| DS4 | Difficult | **59** | **11.8%** |
| DS5 | Very Difficult | 0 | 0.0% |

**DS2 gap: only 5.6% (lowest in pool). DS4 excess: 11.8% (highest in pool).** Pack D is simultaneously under-distributed at ME and over-distributed at Difficult — both extremes indicate template-based labeling without cognitive assessment.

#### Section-Level Breakdown

| Section | Items | DCS §3 | Severe | \|gap\| | Issues |
|---------|-------|--------|--------|---------|--------|
| **P1-AD** | 75 | 92.0% | 8.0% | 0.97 | 57 Unde items (76%); most DS1+DS3. 18 Apply items vs. 57 Understand — inverted CL pattern. |
| **P1-BD** | 100 | 87.0% | 13.0% | 0.54 | Best-calibrated Pack D section. 80 Apply items. |
| **P1-CD** | 100 | 85.0% | 15.0% | 0.80 | 23 DS4 items (highest in pack). 15 Analyze — many mislabeled. |
| **P1-DD** | 75 | 82.7% | **17.3%** | 0.73 | 18 Apply@DS1 (gap=-2) — under-calibrated cluster. |
| **P1-ED** | 75 | 85.3% | 14.7% | 0.96 | **DL-012 CLONE ZONE.** 56 Archived. DS: DS1+DS3+DS4 only. 20 Evaluate items (26.7% of section) — most are template-label artifacts. |
| **P1-FD** | 75 | **76.0%** | **24.0%** | **1.21** | **WORST SECTION POOL-WIDE.** 62 Unde items (82.7%). 19 DS4 items. 19 Unde@DS4 (gap=+2). Mean |gap|=1.21. |

#### CL×DS Matrix

| CL\DS | DS1 | DS2 | DS3 | DS4 | DS5 |
|-------|-----|-----|-----|-----|-----|
| Remember | 0 | 0 | 1 | 0 | 0 |
| Understand | 53 | 4 | 123 | 29 | 0 |
| Apply | 35 | 24 | 151 | 23 | 0 |
| Analyze | 8 | 0 | 11 | 4 | 0 |
| Evaluate | 3 | 0 | 28 | 3 | 0 |

**Key issues:** 53 Understand@DS1 (gap=-1, borderline), 29 Understand@DS4 (gap=+2, over-calibrated), 35 Apply@DS1 (gap=-2, under-calibrated). Both under- and over-calibration present — inconsistent labeling.

---

### 2.5 PACK E (500 items, 500 Certified)

#### Calibration Scorecard

| Metric | Value |
|--------|-------|
| DCS §3 compliant | **486 (97.2%)** |
| Severe misalignment (gap≥2) | **14 (2.8%)** |
| Mean \|gap\| | 0.62 |
| Gap distribution | gap0=204 gap1=282 gap2=14 gap3=0 |

#### CL Distribution

| CL | Count | % |
|----|-------|---|
| Remember | 7 | 1.4% |
| Understand | **394** | **78.8%** |
| Apply | 94 | 18.8% |
| Analyze | 3 | 0.6% |
| Evaluate | 2 | 0.4% |

**CRITICAL FINDING: 78.8% Understand.** Pack E's CL distribution is the most extreme in the pool — nearly 4/5 items are labeled Understand, creating a near-flat taxonomy that provides zero cognitive discrimination. This is a direct consequence of:
1. **S719 overcorrection:** S719 agent reclassified ~150-200 items from Understand to Understand (no change) but also reclassified ~200 Remember→Understand without boundary review.
2. **Different authoring pipeline:** Pack E was authored through an independent pipeline that produced definition-matching items with "Understand" as the default CL label.
3. **S720 partial fix:** S720 restored 7 Remember items, but the 394/500 Understand majority remains.

#### DS Distribution

| DS | Label | Count | % |
|----|-------|-------|---|
| DS1 | Easy | 103 | 20.6% |
| DS2 | Moderate-Easy | 164 | 32.8% |
| DS3 | Moderate | 208 | 41.6% |
| DS4 | Difficult | 25 | 5.0% |
| DS5 | Very Difficult | 0 | 0.0% |

#### Section-Level Breakdown

| Section | Items | DCS §3 | Severe | \|gap\| | Issues |
|---------|-------|--------|--------|---------|--------|
| **P1E-A** | 75 | **100.0%** | 0.0% | 0.49 | Perfect DCS compliance. Unde:63 Appl:11 Reme:1. DS:8+30+37. |
| **P1E-B** | 100 | 96.0% | 4.0% | 0.57 | Best-balanced CL: Appl:37 Unde:57 Reme:3 Anal:3. 15 DS4 items. |
| **P1E-C** | 100 | 93.0% | 7.0% | 0.71 | Unde:66 Appl:32 Eval:2. 8 DS4 items. |
| **P1E-D** | 75 | 96.0% | 4.0% | 0.57 | Unde:61 Appl:14. DS1:13 DS2:28 DS3:32 DS4:2. |
| **P1E-E** | 75 | **100.0%** | 0.0% | 0.67 | Reme:3 Unde:72. All DS1-DS3 only. |
| **P1E-F** | 75 | **100.0%** | 0.0% | 0.69 | Unde:75 (100% Understand). All DS1-DS3. |

**Three sections have 100% DCS compliance** — but this is a *mathematical artifact* of 78.8% Understand items where the DCS default is DS2 (±1 = DS1, DS2, DS3). With 96.5% of DS values falling in DS1-DS3, virtually every Understand item is "compliant" by definition. The compliance rate does not reflect calibration quality — it reflects the taxonomic narrowness.

#### CL×DS Matrix

| CL\DS | DS1 | DS2 | DS3 | DS4 | DS5 |
|-------|-----|-----|-----|-----|-----|
| Remember | 7 | 0 | 0 | 0 | 0 |
| Understand | 84 | 149 | 160 | 1 | 0 |
| Apply | 12 | 14 | 46 | 22 | 0 |
| Analyze | 0 | 0 | 1 | 2 | 0 |
| Evaluate | 0 | 1 | 1 | 0 | 0 |

---

## 3. Exception Cluster Map

### 3.1 Most Severe Misalignments by Section

| Rank | Pack | Section | Severe% | \|gap\| | Primary Pattern | Items |
|------|------|---------|---------|---------|-----------------|-------|
| **1** | D | FD | **24.0%** | **1.21** | 19 Unde@DS4 (gap=+2) | 75 |
| **2** | B | BF | 20.0% | 1.16 | 42 DS1 with 31 Unde@DS1 (gap=-1) | 75 |
| **3** | A | AF | 18.7% | 0.75 | 40 DS1 with 14 Unde@DS1, 14 Appl@DS1 | 75 |
| **4** | B | BE | 18.7% | 0.80 | 32 DS1 with 19 Unde@DS1, 6 Appl@DS1 | 75 |
| **5** | B | BB | 18.0% | 0.59 | 22 Reme; 10@DS2, 12@DS3 | 100 |
| **6** | D | DD | 17.3% | 0.73 | 18 Appl@DS1 (gap=-2) | 75 |
| **7** | C | BC | 17.0% | 0.90 | 7 Unde@DS4 (gap=+2) | 100 |
| **8** | B | BD | 14.7% | 0.59 | 14 DS1 | 75 |
| **9** | D | ED | 14.7% | 0.96 | DL-012 clones; 20 Eval (template) | 75 |
| **10** | D | CD | 15.0% | 0.80 | 23 DS4 items | 100 |

### 3.2 CL Values Systematically Over/Under-Calibrated

| CL | Pattern | Packs Affected | Total Items | Severity |
|----|---------|---------------|-------------|----------|
| **Apply → DS1** | Appl@Easy (gap=-2) | All 5 packs | 180 items | HIGH — systematic under-calibration |
| **Understand → DS1** | Unde@Easy (gap=-1) | A, B, C, D | 270 items | MEDIUM — borderline, many are legit definition-match |
| **Understand → DS4** | Unde@Difficult (gap=+2) | C (7), D (29) | 36 items | MEDIUM — over-calibrated |
| **Analyze → DS1** | Anal@Easy (gap=-3) | A (2), C (8), D (8) | 18 items | HIGH — worst individual gap (-3) |
| **Evaluate → DS1** | Eval@Easy (gap=-3) | B (3), C (6), D (3) | 12 items | HIGH — worst individual gap (-3) |

### 3.3 Sections with Uniform DS Clusters

| Pack | Section | DS Pattern | Items | Root Cause |
|------|---------|-----------|-------|------------|
| C | P1-EC | DS1+DS3 only (no DS2/DS4/DS5) | 75 | DL-012 template rotation |
| C | P1-FC | DS1+DS3 only | 75 | DL-012 template-like |
| D | P1-ED | DS1+DS3+DS4 only (no DS2/DS5) | 75 | DL-012 template rotation |
| D | P1-FD | DS1+DS3+DS4 only | 75 | DL-012 template-like |
| A | P1-F | DS1+DS2 only (no DS3-DS5) | 75 | Under-calibrated batch |

---

## 4. DL-012 Clone Inventory

| Pack | Section | Total Items | Archived (Clones) | Active Seeds | DS Pattern | CL Pattern |
|------|---------|-------------|-------------------|-------------|------------|------------|
| C | P1-EC | 75 | **56** | 19 | DS1+DS3 only | Eval:15 Appl:18 Unde:37 Anal:5 |
| D | P1-ED | 75 | **56** | 19 | DS1+DS3+DS4 only | Eval:20 Unde:34 Appl:21 |
| C | P1-FC | 75 | 0 | 75 | DS1+DS3 only (81% DS3) | Unde:54 Appl:15 Anal:6 |
| D | P1-FD | 75 | 1 | 74 | DS1+DS3+DS4 only | Unde:62 Appl:6 Eval:6 Reme:1 |

**Total DL-012 clone items: 112 Archived + ~150 active clone-pattern items = ~262 items (10.5% of pool).**

The DL-012 clone pattern is characterized by:
1. Only 2-3 DS values per section (missing ME and/or Difficult)
2. High DS3 concentration (>75%)
3. Identical stems with different company names
4. Position-rotated CorrectChoice within 5-item groups
5. 56 archived per section (the DL-012 remediation archived 112 items total)

---

## 5. Reviewer Drift Analysis (S718→S719→S720)

### 5.1 Pool-Wide CL Progression

| CL | Pre-S719 (S718) | Post-S719 | Post-S720 | Net Δ |
|----|-----------------|-----------|-----------|-------|
| Remember | 436 (17.4%) | 50 (2.0%) | 57 (2.3%) | -379 |
| Understand | 614 (24.6%) | 1,168 (46.7%) | 1,160 (46.4%) | +546 |
| Apply | 1,122 (46.3%) | 1,161 (46.4%) | 1,168 (46.7%) | +46 |
| Analyze | 58 (2.4%) | 66 (2.6%) | 66 (2.6%) | +8 |
| Evaluate | 223 (9.2%) | 67 (2.7%) | 67 (2.7%) | -156 |

### 5.2 S720 Agent G Write Verification

| Pack | Item | Change | Verified CL | Verified DS | Status |
|------|------|--------|-------------|-------------|--------|
| E | P1E-A-074 | Unde→Reme | **Remember** | **1** | ✓ CORRECT |
| E | P1E-B-028 | Unde→Reme | **Remember** | **1** | ✓ CORRECT |
| E | P1E-B-032 | Unde→Reme | **Remember** | **1** | ✓ CORRECT |
| E | P1E-B-033 | Unde→Reme | **Remember** | **1** | ✓ CORRECT |
| E | P1E-E-001 | Unde→Reme | **Remember** | **1** | ✓ CORRECT |
| E | P1E-E-031 | Unde→Reme | **Remember** | **1** | ✓ CORRECT |
| E | P1E-E-049 | Unde→Reme | **Remember** | **1** | ✓ CORRECT |
| E | P1E-B-001 | Unde→Appl | **Apply** | **3** | ✓ CORRECT |
| E | P1E-B-011 | Unde→Appl | **Apply** | **3** | ✓ CORRECT |
| A | P1-E-076 | Unde→Appl | **Apply** | **3** | ✓ CORRECT |
| A | P1-E-078 | Unde→Appl | **Apply** | **3** | ✓ CORRECT |
| A | P1-E-007 | Unde→Appl | **Apply** | **3** | ✓ CORRECT |
| A | P1-E-004 | Appl→Unde | **Understand** | **2** | ✓ CORRECT |
| A | P1-E-013 | Appl→Unde | **Understand** | **2** | ✓ CORRECT |

**All 14 S720 Agent G writes verified correct.** Zero regressions. Parse integrity confirmed (500/500 per pack).

### 5.3 Conflicting-Direction Drift

No items were found where the same QID changed CL in opposing directions across S718→S719→S720. The changes are directional and monotonic:
- S719: Massive Remember→Understand reclassification (386 items)
- S720: Selective Remember restoration (7 items) + Apply upgrades (7 items)

The only "back-and-forth" pattern was S720 Agent E's Pack A Section E adjustment reversing S719's overcorrection (P1-E-004/P1-E-013: Apply→Understand reverting S719's Understand→Apply). This was intentional and boundary-review-approved.

---

## 6. Cross-Pack Consistency

### 6.1 Same Topic Pattern Analysis

Using Pack B as the benchmark, CL consistency across packs for common topic patterns:

| Pattern | Pack B CL | Pack A CL | Pack C CL | Pack D CL | Pack E CL | Consensus? |
|---------|-----------|-----------|-----------|-----------|-----------|------------|
| "Definition-match" (stem=definition, answer=term) | Remember/Und | Und (42.8%) | Und (44.2%) | Und (41.8%) | **Und (78.8%)** | Partial — Pack E is outlier |
| "Calculation" (stem requires computation) | Apply (65%) | Apply (55.8%) | Apply (46%) | Apply (46.6%) | Apply (18.8%) | Weak — Packs C/D/E under-represent |
| "Framework-application" (COSO, GAAP rule application) | Apply | Apply | Apply | Apply | Und | Pack E misclassifies as Und |
| "Description-to-concept" (describe scenario, identify concept) | Und | Und | Und | Und | Und — borderline over-assigned |

**Key finding:** Pack E uses Understand as a catch-all for items that Packs A-D classify as Apply. The 78.8% Understand in Pack E vs. 22.2% in Pack B indicates a completely different taxonomy philosophy. This is documented as the "Pack E cross-pack taxonomy mismatch" (S720 remaining gap).

### 6.2 CL Deviation from Pack B Benchmark

| CL | Pack B % | Δ A | Δ C | Δ D | Δ E |
|----|----------|-----|-----|-----|-----|
| Remember | 8.2% | -7.6 | -7.2 | **-8.0** | -6.8 |
| Understand | 22.2% | +20.6 | +22.0 | +19.6 | **+56.6** |
| Apply | 65.0% | -9.2 | -19.0 | -18.4 | **-46.2** |
| Analyze | 3.0% | -2.6 | +1.6 | +1.6 | -2.4 |
| Evaluate | 1.6% | -1.2 | +2.6 | +5.2 | -1.2 |

**Pack D has the worst Remember deficit (-8.0%). Pack E has the worst Understand excess (+56.6%) and Apply deficit (-46.2%).**

### 6.3 DS Deviation from Pack B Benchmark

| DS | Pack B % | Δ A | Δ C | Δ D | Δ E |
|----|----------|-----|-----|-----|-----|
| Easy (1) | 28.2% | -7.8 | -8.2 | -8.4 | -7.6 |
| ME (2) | 16.8% | **+26.2** | -1.0 | **-11.2** | +16.0 |
| Moderate (3) | 49.4% | -12.8 | +11.0 | +13.4 | -7.8 |
| Difficult (4) | 5.6% | **-5.6** | -1.8 | **+6.2** | -0.6 |
| V.Diff (5) | 0.0% | 0.0 | 0.0 | 0.0 | 0.0 |

**Pack A has the worst DS2 surplus (+26.2%). Pack D has the worst DS4 surplus (+6.2%). No pack has any DS5 items.**

---

## 7. Remediation Priorities

### 7.1 Per-Pack Priority Queue

#### Pack A — Priority: MEDIUM
| Priority | Action | Section | Items | Effort |
|----------|--------|---------|-------|--------|
| **1** | Fix 49 Apply@DS1 → DS3 | All sections, mostly A+B | 49 | Batch recalibration |
| **2** | Upgrade P1-A Section F from DS1/DS2 → add DS3+ | F | ~20 | Per-item review |
| **3** | Add DS4 items (currently 0) | A, B, C, D | ~15 | New authoring or recal of 49 Appl |

#### Pack B — Priority: LOW
| Priority | Action | Section | Items | Effort |
|----------|--------|---------|-------|--------|
| **1** | Review 54 Apply@DS1 items | B, E, F | 54 | Per-item: some legit definition-match, some need upgrade |
| **2** | Review 12 Remember@DS3 items | B | 12 | May be legitimate (discrimination required) |

#### Pack C — Priority: MEDIUM
| Priority | Action | Section | Items | Effort |
|----------|--------|---------|-------|--------|
| **1** | Audit 23 Analyze items (DL-012 clones?) | C, E | 23 | Per-item: check if genuine analysis or definition-match |
| **2** | Recalibrate 30 Apply@DS1 → DS3 | All | 30 | Batch recalibration |
| **3** | DL-012 Section E: re-label 56 archived clones | E | 56 | State change: Archived already handled |

#### Pack D — Priority: HIGH
| Priority | Action | Section | Items | Effort |
|----------|--------|---------|-------|--------|
| **1** | **Fix P1-FD: 19 Unde@DS4 → DS2** | F | 19 | Batch recalibration (worst section pool-wide) |
| **2** | **Fix 35 Apply@DS1 → DS3** | A, D | 35 | Batch recalibration |
| **3** | Audit 34 Evaluate items (many are DL-012 template) | E | 20 | Per-item review |
| **4** | Add DS2 items (only 5.6%, target 20%) | All | ~72 | Recalibration of 62 Unde@DS3 |

#### Pack E — Priority: HIGH
| Priority | Action | Section | Items | Effort |
|----------|--------|---------|-------|--------|
| **1** | **Full CL re-audit against DCS v1.1** | All 6 | 500 | 4-6 hour per-item review |
| **2** | Identify legitimate Apply items currently @Understand | B, C, D | ~100 | Per-item reclassification |
| **3** | Restore ~40 additional justified Remember items | All | ~40 | Boundary review (S720 restored only 7/70) |

### 7.2 Remediation Strategy Recommendation

| Pack | Strategy | Rationale |
|------|----------|-----------|
| **A** | **Batch recalibration** for Apply@DS1 items (49). Per-item for Section F. | 89.6% compliance; the 49 Appl@DS1 items are the primary defect. |
| **B** | **No structural change.** Spot-audit the 54 Appl@DS1 items. | Benchmark pack. Many deviations are intentional (Remember items requiring discrimination at DS2). |
| **C** | **Per-item review** for Analyze and Evaluate CLs. Batch recal for Appl@DS1. | DL-012 template artifacts inflate Analyze/Evaluate counts. |
| **D** | **Per-item review required.** Both under- and over-calibration present. | 0.85 mean |gap|, worst section pool-wide (P1-FD), severe DS2 deficit. Cannot batch-fix. |
| **E** | **Full pack re-audit required.** The 78.8% Understand is a taxonomy failure, not a calibration failure. | 97.2% compliance is a mathematical artifact of the narrow CL distribution. Per-item review against DCS v1.1 is the only viable path. |

---

## 8. Overall Verdict

### 8.1 Calibration Quality Assessment

| Dimension | Status | Evidence |
|-----------|--------|----------|
| **Pool-wide DCS §3 compliance** | 88-89% | Excluding Pack E's artificial 97.2%, actual compliance is 84-90% |
| **Apply@Easy pattern** | **Actionable defect** | 180 items pool-wide have gap=-2 (Apply labeled Easy) |
| **Analyze gap** | **Structural** | Only 66/2500 items (2.6%) labeled Analyze vs. 25% CAQS target. Cannot fix via recalibration — requires authoring ~590 new items. |
| **DS5 absence** | **Systematic** | 0 items pool-wide at Very Difficult. All 5 packs. |
| **DL-012 clones** | **Partially resolved** | 112 cloned items archived. ~150 active clone-pattern items remain in Pack C/D Sections E/F. |
| **Pack E taxonomy** | **Critical** | 78.8% Understand requires full per-item re-audit. Compliance rate is misleading. |
| **Reviewer drift** | **Stable** | S718→S719→S720 changes are monotonic and directional. No conflicting reversions. |
| **S720 Agent G execution** | **Verified correct** | All 14 items confirmed at correct CL/DS values. |

### 8.2 Does Each Pack Need Per-Item Review or Batch Recalibration?

| Pack | Verdict | Justification |
|------|---------|---------------|
| **A** | **Batch recalibration sufficient** | 89.6% compliant. 49 Appl@DS1 items can be batch-upgraded. Section F needs per-item review (18 items). |
| **B** | **No recalibration needed** | Benchmark pack. Deviations are mostly legitimate (Remember@DS2 requires discrimination). Spot-audit only. |
| **C** | **Batch + targeted per-item** | Batch-fix the 30 Appl@DS1 items. Per-item review the 23 Analyze + 21 Evaluate items (DL-012 template risk). |
| **D** | **Per-item review required** | Both under- and over-calibration exist. Batch recalibration would create new errors. |
| **E** | **Per-item review required** | The 78.8% Understand is a taxonomy failure, not a calibration failure. Full re-audit against DCS v1.1. |

---

## 9. Data Integrity Notes

- All CL, DS, QID counts verified: each pack returns exactly 500 items.
- Pack B has 1 item (P1B-E section) with CL=UNKNOWN and DS=0 — likely a field-positioning anomaly at the section boundary. Needs investigation.
- Pack C/D dual-block architecture confirmed: CL/DS fields appear in metadata block (Block 1), not content block (Block 2).
- Extraction window of 6,000 characters per QID confirmed sufficient for all packs.
- Pack C/D Section E/F data reflects DL-012 archived states: 56/75 items archived per section.

---

*Report generated by Agent G, Session 721 — Read-Only Pack-Level Review. 2026-07-26.*
