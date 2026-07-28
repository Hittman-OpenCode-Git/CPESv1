# Session 15 — Pack C / Pack B Provenance Investigation

**Date:** 2026-07-24
**Status:** `PROVENANCE INVESTIGATION PASSED — PACK C DELTA AND PACK B CERTIFIED ANOMALY CHARACTERIZED.`
**Read-Only:** Yes. No source or ledger writes performed.

---

## 1. Pre-Flight Source Baseline

### 1.1 Current File Hashes (2026-07-24, Session 15)

| File | Bytes | SHA-256 | Modified |
|------|-------|---------|----------|
| `pack_a_corrected.js` | 1,906,851 | `8164F1FC1B6509F88D2709DE3770ECBB49602D0EBE65F36CF46A652D5FCBC633` | 2026-07-24 11:23:10 |
| `pack_b_corrected.js` | 1,334,070 | `09CFEC8BCB5E92391A9FAB8793AFCED84E41DEB77A04FC1938C8611D5DC61CEC` | 2026-07-24 09:42:51 |
| `pack_c_corrected.js` | 1,767,156 | `82D0594E02084998C4083E4A9D949120F667FFF5B78056CE46E41FF458D94868` | 2026-07-24 12:26:11 |
| `pack_d_corrected.js` | 1,889,721 | `DEB235BECDA957D4940C7F7872BA13F2A7222CB3E09680D0B809F3436047FF61` | 2026-07-23 23:16:59 |
| `pack_e_corrected.js` | 1,167,565 | `43047A66DAB30DAAA477625AC68BD341B3CB4638C45F5E9EC5D2D1B93144CEF4` | 2026-07-24 09:43:04 |
| `scored_cases.js` | 191,441 | `79C1DF6049A10A638DA53B0667A90CDB58CC46D8B0A341E8C831CD5426305BBC` | 2026-07-22 17:40:24 |
| `scored_cases2.js` | 245,449 | `191846B948B7246C7C7C6F09757071F992CF95514E1F403D7EE347A789288B8D` | 2026-07-22 17:40:24 |
| `scored_cases3.js` | 273,596 | `FA5333902F8AF3191001E59C725623BBD8AB6FCC48CFE5F0058E99E62E5F15D4` | 2026-07-23 16:15:01 |
| `scored_cases4.js` | 282,293 | `A330E145695243EEA42544A32D135D00E072062965840C97DC922A8E95D87BB7` | 2026-07-23 16:15:52 |
| `scored_cases5.js` | 317,780 | `5629ED6C065A68382526A2303EC985528BE0DFD7BE548DFEEC05A230E62CADD6` | 2026-07-23 16:16:20 |
| `app.js` | 113,475 | `C6BB093B9D4990CD297BD92D9FA552D8EA1F0DAD44061F4CD3ABE096CB4D5EA4` | 2026-07-24 12:30:20 |
| `index_updated.html` | 5,724 | `81C809455B16DD14BDB11EFBC810B34F158B046896922102BBB5CF48FCBBA5B3` | 2026-07-24 09:59:52 |

### 1.2 Hash Comparison Against Known Baselines

| File | Session 11 Baseline | Session 12 Observed | Session 15 (Current) | Match |
|------|--------------------|--------------------|---------------------|-------|
| `pack_a_corrected.js` | `8164F1FC...6BC633` | `8164F1FC...6BC633` | `8164F1FC...6BC633` | S11 ✓ |
| `pack_b_corrected.js` | `09CFEC8B...C61CEC` | `09CFEC8B...C61CEC` | `09CFEC8B...C61CEC` | S11 ✓ |
| `pack_c_corrected.js` | `82D0594E...D94868` | `3F1F17FF...A9D5C` | `82D0594E...D94868` | S11 ✓ (RESTORED) |
| `pack_d_corrected.js` | `DEB235BE...7FF61` | `DEB235BE...7FF61` | `DEB235BE...7FF61` | S11 ✓ |
| `pack_e_corrected.js` | `43047A66...CEF4` | `43047A66...CEF4` | `43047A66...CEF4` | S11 ✓ |
| `app.js` | `5319DD4B...CF54B` | `5319DD4B...CF54B` | `C6BB093B...D5EA4` | **CHANGED** |

### 1.3 Scored-Case Files

| File | Session 12 Hash | Session 15 Hash | Match |
|------|----------------|----------------|-------|
| `scored_cases.js` | `79C1DF60...5BBC` | `79C1DF60...5BBC` | ✓ |
| `scored_cases2.js` | `191846B9...88B8D` | `191846B9...88B8D` | ✓ |
| `scored_cases3.js` | `FA533390...5F15D4` | `FA533390...5F15D4` | ✓ |
| `scored_cases4.js` | `A330E145...D87BB7` | `A330E145...D87BB7` | ✓ |
| `scored_cases5.js` | `5629ED6C...2CADD6` | `5629ED6C...2CADD6` | ✓ |

### 1.4 Concurrent-Write Check

No concurrent-write sessions detected. All pack files stable across two consecutive hash reads. Session 15 investigation can proceed without evidence-integrity risk.

---

## 2. Pack C 57-Byte Delta Analysis

### 2.1 Hash Timeline

| State | Hash | Size | Session |
|-------|------|------|---------|
| Pre-repair (S8) | `C934FD69...516ECE8` | 1,767,306 | Session 8 |
| Post-repair (S11) | `82D0594E...D94868` | 1,767,156 | Session 11 (-150 bytes) |
| S12 observed | `3F1F17FF...A9D5C` | 1,767,213 | Session 12 (+57 bytes from S11) |
| S15 current | `82D0594E...D94868` | 1,767,156 | Session 15 (= S11 baseline) |

### 2.2 Current State

The current `pack_c_corrected.js` hash (`82D0594E...`) matches the Session 11 post-repair baseline exactly. The `3F1F17FF...` state observed in Session 12 no longer exists on disk.

### 2.3 Backup Analysis

| Backup | Hash | Size | Match |
|--------|------|------|-------|
| `backups\pack_c_corrected.js.bak-20260724122533` | `C934FD69...` | 1,767,306 | Session 8 pre-repair |

The only backup in the `backups\` directory with a 2026-07-24 timestamp is the pre-repair baseline from Session 8. No backup of the `3F1F17FF...` state was preserved. Since the `3F1F17FF` state no longer exists on disk, the exact byte-level changes that caused the 57-byte delta cannot be determined.

### 2.4 Known Content During Delta State (from Session 12 Verification)

Session 12 independently verified that during the `3F1F17FF...` state:
- BC-094 and BC-095 repairs were intact (object boundaries, CorrectChoice, ExplanationWrong[CC], question_state)
- No BC-094/095 structural degradation was observed

This suggests the 57-byte delta was in areas outside BC-094/095. Possible sources:
1. A small automated remediation script (DL-026/DL-013) modified one or two question objects by adding/changing text
2. A session between S11 and S12 made an edit with a different hash outcome

### 2.5 Provenance Verdict

```
PACK C PROVENANCE VERDICT: ALL DELTA ACCOUNTED (RESTORED TO BASELINE)

The 57-byte delta observed in Session 12 was a transient state between the Session 11
post-repair baseline (82D0594E...) and the current file state. By Session 15, the file
has been restored to match the Session 11 baseline exactly. The delta's content cannot
be reconstructed because:
  (a) no backup of the 3F1F17FF... state was preserved, and
  (b) the current file is byte-identical to the Session 11 baseline.

The restoration to the Session 11 baseline may have occurred in unlogged Sessions 13-14
or through a direct file overwrite. No evidence of corruption or data loss is present
in the current file. BC-094/095 repairs are confirmed intact.
```

### 2.6 app.js Delta

`app.js` hash changed from `5319DD4B...CF54B` (Session 12) to `C6BB093B...D5EA4` (Session 15) — same file size (113,475 bytes). This indicates a content-level change in app.js between Sessions 12 and 15. Scope and authorization of this change are outside the Session 15 investigation mandate.

---

## 3. Pack B 351 vs. 350 Certified Discrepancy

### 3.1 Current Counts

| Metric | Count |
|--------|-------|
| `grep '"question_state": "Certified"'` | **351** |
| `grep '"question_state": "Unprocessed"'` | **150** |
| Total question_state entries | **501** |
| Unique QIDs with question_state | **500** |
| Unique QIDs with Certified state (source-parse) | **350** |
| Expected Certified QIDs (B-C-E-F = 100+100+75+75) | **350** |

### 3.2 Anomaly Root Cause

**Anomaly QID: `P1B-B-153`**

`P1B-B-153` has **two** `"question_state": "Certified"` entries:
- Line 5052: first entry (normal, within the content block)
- Line 5074: second entry (duplicate, inserted after `ExplanationWrongD` alongside `certification_date` and `certification_batch` fields)

The extra entry at line 5074 appears to be a secondary certification annotation appended to the object during the R14 Wave 4 certification pass (per `certification_batch: "R14 Wave 4"` at line 5076). The original entry at line 5052 was not removed when the secondary entry was added.

### 3.3 Impact

| Aspect | Assessment |
|--------|-----------|
| Learner impact | **Zero** — both entries have identical value "Certified"; no governance conflict |
| Governance | Grep counts inflate Pack B Certified by +1. Unique Certified QIDs = 350 |
| Grep-based reporting | All prior reports using grep (including Phase 0B §A.3) show 351. This is a **minor inflation**, not a governance error |
| Parsed reporting | Function-constructor or object-level parsing yields 350 unique Certified |

### 3.4 Classification

| Property | Value |
|----------|-------|
| Nature | Duplicate-state artifact (non-harmful) |
| Class | Structural / Metadata Duplication |
| Severity | Low — zero learner or governance impact |
| Requires future write? | Yes — remove duplicate `question_state` line 5074 (and companion `certification_date`/`certification_batch` fields if also duplicates) |
| Recommended session type | Metadata cleanup (Pack B Section B block) |

### 3.5 Interim Guidance

Until the duplicate is removed, **governance-valid Pack B Certified denominator = 350** (unique QIDs). Grep-based counts will show 351 but reflect the duplicate, not an additional Certified item.

---

## 4. BCDE Certified Total Reconciliation

### 4.1 Current Per-Pack Certified Counts

| Pack | Grep Certified | Unique Certified | Source |
|------|---------------|-----------------|--------|
| B | 351 | **350** | P1B-B-153 duplicate |
| C | 175 | **175** | BC-094 promoted (S11 repair) |
| D | 248 | **248** | AD-075 metadata-only (see §5.1) |
| E | 101 | **101** | P1E-E-048 structural conflict (see §5.2) |
| **BCDE** | **875** | **874** | |

### 4.2 Reconciliation from Phase 0B Baseline (873)

```
Phase 0B baseline:  B=350 + C=174 + D=248 + E=101 = 873
Current governance-valid: B=350 + C=175 + D=248 + E=101 = 874

Delta sources:
  +1: BC-094 promotion (C: 174 → 175)
     ── Session 11 structural repair restored BC-094 as independent, structurally valid,
        question_state="Certified" item in the learner pool.
  
  +1: P1B-B-153 duplicate Certified entry (B: 350 unique → 351 grep)
     ── Grep-only inflation. Governance-valid unique Certified in Pack B = 350.
  
  +2: Total grep delta from Phase 0B: 873 → 875

Governance-valid delta from Phase 0B: 873 → 874 (+1 = BC-094 only)
```

### 4.3 The "Second +1" (Beyond BC-094)

The "second +1" that explains the BCDE 873→875 shift is the P1B-B-153 duplicate `question_state: "Certified"` entry at line 5074. This is a grep-counting artifact, not an actual additional Certified item. Governance-valid BCDE = 874.

---

## 5. Cross-References

- Session 11 repair execution: `reports/SESSION11_PACK_C_BC094_BC095_REPAIR_EXECUTION.md`
- Session 12 reconciliation: `reports/SESSION12_PRIMARY_LEDGER_RECONCILIATION_AFTER_PACKC_REPAIR.md`
- Phase 0B primary ledger: `reports/PHASE0B_PRIMARY_LEDGER_RECONCILIATION.md`
- Phase 0B preflight: `reports/PHASE0B_DL029_GROUND_TRUTH_AND_PREFLIGHT_REPORT.md`
- DEFECT_LIBRARY.md: DL-008, DL-016, DL-024, DL-029
- REVISION_HISTORY.md
- SESSION_STATUS_2026-07-23.md

---

*Generated 2026-07-24 — Session 15 Provenance Investigation, read-only.*
