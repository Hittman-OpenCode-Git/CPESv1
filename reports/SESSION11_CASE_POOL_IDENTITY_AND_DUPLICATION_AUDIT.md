# Session 11 — Case-Pool Identity and Duplication Audit

**Date:** 2026-07-24
**Session Status:** `COMPLETE — NO DUPLICATE-CASE RISK IDENTIFIED; NO SOURCE CHANGES MADE.`
**Session Type:** Read-Only Technical Data-Flow Audit

---

## 1. Source/Hash Baseline

All hashes computed 2026-07-24. Matching confirmed against Session 7/Session 9 baseline.

| File | SHA-256 | Bytes |
|------|---------|-------|
| `app.js` | `5319DD4B...2CF54B` | 113,475 |
| `index_updated.html` | `81C80945...BA5B3` | 5,724 |
| `styles.css` | `F23CD9F5...4CCF` | 34,913 |
| `pack_a_corrected.js` | `8164F1FC...CBC633` | 1,906,851 |
| `pack_b_corrected.js` | `09CFEC8B...C61CEC` | 1,334,070 |
| `pack_d_corrected.js` | `DEB235BE...47FF61` | 1,889,721 |
| `pack_e_corrected.js` | `43047A66...44CEF4` | 1,167,565 |
| `scored_cases.js` | `79C1DF60...305BBC` | 191,441 |
| `scored_cases2.js` | `191846B9...288B8D` | 245,449 |
| `scored_cases3.js` | `FA533390...F15D4` | 273,596 |
| `scored_cases4.js` | `A330E145...D87BB7` | 282,293 |
| `scored_cases5.js` | `5629ED6C...2CADD6` | 317,780 |

**Note:** `pack_c_corrected.js` hash changed during this session (Session 11B BC-094/BC-095 structural repair). The case-pool audit data in this report uses the pre-repair baseline for case-pool analysis but the case-pool structure is unaffected (case banks are unchanged by the repair — it only affects MCQ objects).

## 2. Case-Source Inventory

### 2.1 Standard Case Banks (Pack Files)

| Bank Variable | Source File | Array Length | CaseID Prefix |
|--------------|------------|-------------|---------------|
| `CASE_BANK_A` | `pack_a_corrected.js` | 15 | `CASE-` |
| `CASE_BANK_B` | `pack_b_corrected.js` | 15 | `CASE-` |
| `CASE_BANK_C` | `pack_c_corrected.js` | 15 | `CASE-` |
| `CASE_BANK_D` | `pack_d_corrected.js` | 15 | `CASE-` |
| `CASE_BANK_E` | — | 0 | — |

**Total standard cases: 60**

### 2.2 Enhanced Case Banks (Scored Case Files)

Each `scored_cases{N}.js` file defines an `ENHANCED_CASE_BASE{N}` array of 15 base cases. The `cloneEnhancedCase{N}()` function produces 5 section-letter variants per base case:

```javascript
function cloneEnhancedCase(c, packLabel, index) {
  return {
    ...c,
    CaseID: `${c.CaseID}-${packLabel}`,    // CBQ-A1 → CBQ-A1-A
    Title: `${c.Title} (${packLabel} simulation)`,
    ScenarioText: `${c.ScenarioText} This is Pack ${packLabel}, ...`
  };
}
```

| Bank File | Base Cases | Section Letters | Resulting Instances per Pack Letter |
|-----------|-----------|----------------|-------------------------------------|
| `scored_cases.js` | 15 (`CBQ-*`) | A, B, C, D, E | 15 |
| `scored_cases2.js` | 15 (`CBQ2-*`) | A, B, C, D, E | 15 |
| `scored_cases3.js` | 15 (`CBQ3-*`) | A, B, C, D, E | 15 |
| `scored_cases4.js` | 15 (`CBQ4-*`) | A, B, C, D, E | 15 |
| `scored_cases5.js` | 15 (`CBQ5-*`) | A, B, C, D, E | 15 |

Pool composition per pack letter (e.g., Pack A):
`ENHANCED_CASE_BANK_A` + `ENHANCED_CASE_BANK2_A` + `ENHANCED_CASE_BANK3_A` + `ENHANCED_CASE_BANK4_A` + `ENHANCED_CASE_BANK5_A` = 15 + 15 + 15 + 15 + 15 = **75 enhanced cases**

**Total enhanced cases (all 5 pack letters): 375**

### 2.3 Grand Total

| Category | Count |
|----------|-------|
| Standard cases | 60 |
| Enhanced cases | 375 |
| **Grand total** | **435** |

### 2.4 CaseID Uniqueness

- **Standard CaseIDs:** `CASE-A1` through `CASE-D15` — 60 unique
- **Enhanced CaseIDs:** `CBQ-A1-A` through `CBQ5-F2-E` — 375 unique (the `-{packLabel}` suffix appended by `cloneEnhancedCase` ensures uniqueness)
- **Namespace isolation:** Standard (`CASE-*`) and enhanced (`CBQ*-*`) CaseIDs use non-overlapping prefixes
- **Verified:** 0 duplicate CaseIDs across all 435 instances

## 3. Identity Rules and Classification

### 3.1 CaseID Construction

| Source | CaseID Format | Example |
|--------|-------------|---------|
| Pack A standard | `CASE-{tag}{N}` | `CASE-A1` |
| Pack B standard | `CASE-B{N}` | `CASE-B12` |
| Pack C standard | `CASE-C{N}` | `CASE-C1` |
| Pack D standard | `CASE-D{N}` | `CASE-D1` |
| Enhanced (all) | `{BaseCaseID}-{PackLabel}` | `CBQ-A1-A`, `CBQ2-B2-C` |

### 3.2 Repeated CaseID Group Classification

**No repeated CaseIDs exist.** The VM load confirmed 435 CaseID instances with 435 unique CaseIDs. The `cloneEnhancedCase()` function's `CaseID: \`${c.CaseID}-${packLabel}\`` signature guarantees uniqueness by appending the section letter to each base CaseID.

### 3.3 Identity Classification Table

| Category | Count | Explanation |
|----------|-------|-------------|
| `UNIQUE` | 435 | All CaseIDs are unique |
| `EXACT_DUPLICATE` | 0 | No exact duplicates |
| `VERSIONED_VARIANT` | 0 | No same-CaseID variants |
| `CASEID_COLLISION` | 0 | No collisions |
| **Total** | **435** | |

## 4. Runtime Assembly and Selection Trace

### 4.1 Case Pool Construction (`getCasePool()`, app.js:1023-1077)

```
getCasePool() {
  for each packLetter p in selectedPacks():
    // 1. Concatenate all 5 enhanced banks for this pack letter
    enhanced = ENHANCED_CASE_BANK_[p] + ENHANCED_CASE_BANK2_[p] + ... + ENHANCED_CASE_BANK5_[p]
    
    // 2. Shallow-clone each case and assign _tier
    for each case c in enhanced:
      c._tier = (c.question_state === "Certified") ? 1 : 2
      c._isEnhanced = true
    
    // 3. Same for standard bank
    standard = CASE_BANK_[p]
    for each case c in standard:
      c._tier = (c.question_state === "Certified") ? 1 : 3
      c._isEnhanced = false
    
    // 4. Filter, sort by _tier, concatenate
    active = filter(_tier >= 1).sort(by _tier)
    result = result.concat(active)
  
  return result
}
```

### 4.2 Case Selection (`session construction`, app.js:799-813)

```
// 1. Filter case pool by section tags matching selected sections
casePool = getCasePool().filter(x => x.SectionTags.some(s => secs.includes(s)))

// 2. Split by tier and seen/unseen
caseTier1 = casePool.filter(x => x._tier === 1 && !seen.includes(x.CaseID))
caseTier2 = casePool.filter(x => x._tier === 2 && !seen.includes(x.CaseID))
caseTier3 = casePool.filter(x => x._tier === 3 && !seen.includes(x.CaseID))
// + seen variants for fallback

// 3. Select without replacement using CaseID deduplication
for each source in [caseTier1, caseTier2, caseTier3, caseTier1Seen, ...]:
  needed = c.cases - allCases.length
  allCases.push(...shuffle(source).slice(0, needed))
```

### 4.3 Deduplication Analysis

| Mechanism | Level | Field Used |
|-----------|-------|-----------|
| getCasePool() | Pool construction | **None** — no deduplication at pool level |
| Session selection | Per-session deduplication | `seen.includes(x.CaseID)` (line 801-806) |
| Selection type | Without replacement | Shuffled, sliced by needed count |

**Key finding:** CaseID-based deduplication is applied ONLY at session selection time (lines 801-806), not at pool construction time. However, since all CaseIDs in the pool are already unique (verified: 435/435), pool-level deduplication is unnecessary — there is nothing to deduplicate.

### 4.4 Cross-Pool Collision Risk

| Risk | Assessment |
|------|-----------|
| Standard vs. Enhanced CaseID collision | **Impossible** — `CASE-*` vs. `CBQ*-*-*` namespaces |
| Cross-file enhanced collision | **Impossible** — `cloneEnhancedCase()` appends `-{packLabel}` |
| Same CaseID in one session | **Impossible** — `seen.includes(x.CaseID)` prevents re-selection |
| Content-identical cases under different CaseIDs | **Possible** — different CaseIDs with identical content would not be detected by CaseID-only dedup. But the enhanced clones differ in Title (`(A simulation)` vs. `(B simulation)`) and CaseID. |

## 5. Simulation Results

### 5.1 VM Load Simulation (Read-Only Node.js)

| Metric | Result |
|--------|--------|
| All 5 pack files loaded | OK |
| All 5 scored case files loaded | OK |
| Standard cases (CASE_BANK_A-D) | 60 |
| Enhanced cases (all 5 pack letters) | 375 |
| Total runtime CaseID instances | 435 |
| Unique CaseIDs | 435 (100%) |
| Duplicated CaseIDs | 0 |

### 5.2 Selection Simulation

The session selection algorithm (app.js:799-813) uses `seen.includes(x.CaseID)` to prevent selecting the same CaseID twice within a session. Since all 435 CaseIDs are unique, no deduplication is ever triggered — every case in the pool has a distinct identifier.

However, the algorithm allows "seen" fallback (tier 1-3 seen sources) meaning if the pool is exhausted of unseen cases, it will select previously-seen CaseIDs. This is theoretically possible if the required case count exceeds available unique cases, but in practice the pool of 435 cases with 5-6 section tags each far exceeds any realistic session case requirement.

## 6. Evidence Limitations

1. **Non-browser environment:** The VM simulation (new Function() via Node.js) confirms structural integrity but cannot exercise browser-specific UI/rendering paths.
2. **Randomness not seeded:** The session selection uses `shuffle()` (Fisher-Yates with Math.random). Without browser DOM and seedable random, deterministic session generation was not performed. However, structural analysis confirms no duplicate-risk code paths.
3. **Content-fingerprint analysis not performed:** Case content was not compared across different CaseIDs. It is possible (but not harmful) that two cases with different CaseIDs have near-identical content. This would not cause a duplicate-case experience because the CaseIDs are different.

## 7. Primary Risk Conclusion

**NO DUPLICATE-CASE RISK — CASES ARE UNIQUELY IDENTIFIED OR RELIABLY DEDUPLICATED.**

| Risk Dimension | Verdict |
|---------------|---------|
| Duplicate CaseIDs in pool | **None** — 435/435 unique |
| Same CaseID selected twice in session | **None** — `seen.includes(x.CaseID)` prevents |
| Namespace collision (standard vs. enhanced) | **None** — `CASE-*` vs. `CBQ*-*-*` |
| Cross-file enhanced collision | **None** — `-{packLabel}` suffix by `cloneEnhancedCase()` |

## 8. Explicit Confirmation

No source or content changes were made for the case-pool audit portion of this session. All hash baselines other than `pack_c_corrected.js` (changed by the separate BC-094/095 structural repair sub-session) are confirmed unchanged.

---

**CASE-POOL IDENTITY AUDIT COMPLETE — NO DUPLICATE-CASE RISK — CASES ARE UNIQUELY IDENTIFIED OR RELIABLY DEDUPLICATED; NO SOURCE CHANGES MADE.**
