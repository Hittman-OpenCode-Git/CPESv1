# LEGACY_LOADER_PROTECTION_PLAN.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, DEFECT_LIBRARY.md DL-044/DL-048
**Status:** Active — guard proposal + verification procedure (no archive removal)

---

## 1. Objective

Prove — technically, not by assertion — that archived legacy case banks **cannot silently populate live learner pools**, and define the guard that prevents future accidental re-feeding. No archive content is removed (Constitution §7: AI shall not delete case studies).

---

## 2. Current Wiring (verified 2026-09-23, read-only)

### 2.1 Live loader inventory

| Layer | Live source | Evidence |
|-------|-------------|----------|
| HTML script tags (`index_updated.html:132-146`) | `content/packs/pack_{a..e}_corrected.js` (MCQ); `content/cases/case_pack_{1..3}_corrected.js` (P1 cases); `__P2_BANK_SRC` manifest (6 P2 MCQ + 5 P2 case banks); `app/may/*`; `app/app.js` | grep `<script src` — **zero** references to `legacy/`, `scored_cases`, `ENHANCED_CASE_BASE`, `CASE_BANK`, `MIGRATED_CASE_BASE` |
| P1 case pool (`app/app.js:3090-3153 getCasePool`) | `CASE_PACK_1` + `CASE_PACK_2` + `CASE_PACK_3` only (80 cases / 425 items); `enhanced_banks.LIVE = []` (dead code, feeds nothing) | Direct read of `getCasePool()` P1 branch |
| P2 case pool (`app/app.js:3044-3088`) | `casePackP2_1/2/3`, `casePackP2Authored`, `casePackP2_C4_C8` only (110 cases / 660 items); strict tier (case Certified AND every item effectively Certified) + blocklist + section filter + CaseID dedupe | Direct read of `getCasePool()` P2 branch |
| P1 MCQ pool | `MCQ_BANK_A..E` globals from `content/packs/` | pool_parity_probe Tier-1-only PASS on all 5 packs |

### 2.2 Legacy bank inventory (archived, must stay on disk)

| File | Declared globals | Loaded by HTML? | Consumed by `getCasePool`? |
|------|------------------|-----------------|----------------------------|
| `content/cases/legacy/scored_cases.js` | `ENHANCED_CASE_BASE` (+ derived `ENHANCED_CASE_BANK*` maps) | No | No |
| `content/cases/legacy/scored_cases2.js` | `ENHANCED_CASE_BASE2` (+ file-level `.map()` derivations `ENHANCED_CASE_BANK2_A..F`, executed on load) | No | No |
| `content/cases/legacy/scored_cases3/4/5.js` | `ENHANCED_CASE_BASE3/4/5` family | No | No |

**Verification commands (2026-09-23):**
- `Select-String index_updated.html -Pattern 'scored_cases|legacy|ENHANCED_CASE|CASE_BANK|MIGRATED'` → **0 content matches** (only `app.js` comment lines matched, which are code comments, not loader references)
- `Select-String app/app.js -Pattern 'ENHANCED_CASE_BASE'` → **0 matches**
- `pool_parity_probe` → `PASS: no legacy scored_cases/ENHANCED_CASE_BASE globals contribute to P2 strict pool`; `PASS: P1 live case count 80`; `*** PROBE PASS — 0 divergences ***`

### 2.3 Known residual mechanisms (documented, not re-litigated)

1. **File-level derivations in legacy banks** (DL-044 amendment): `scored_cases2.js:4752+` runs `.map(cloneEnhancedCase2…)` at load — if a legacy `<script>` tag were ever re-added, partially-named globals would execute and could yield a silently partial pool. This is why the guard below is load-path-based, not content-based.
2. **Stale `CASE_BANK_*` alias comments** in `app.js` (lines 71, 3091, 3142, 6892, 6928): comments only; no live code path reads `CASE_BANK_*` or `MIGRATED_CASE_BASE_*` in the P1 branch (banks object contains only `LIVE`). The CaseID dedupe at line 3142-3148 is defense-in-depth.
3. **Duplicate CaseIDs DL-048** (CBQ3-A1/A2 across case_pack_2/3): resolved via renumber to CBQ3-A3/A4; CaseIdentityValidator enforces uniqueness.

---

## 3. Proposed Guard (safe negative test + policy)

### 3.1 Automated negative test (to add to `npm run probe:parity` or smoke)

```javascript
// legacy_loader_guard — FAILS CLOSED if legacy globals can reach pools
const LEGACY_GLOBALS = [
  'ENHANCED_CASE_BASE', 'ENHANCED_CASE_BASE2', 'ENHANCED_CASE_BASE3',
  'ENHANCED_CASE_BASE4', 'ENHANCED_CASE_BASE5',
  'CASE_BANK_A', 'CASE_BANK_B', 'CASE_BANK_C', 'CASE_BANK_D', 'CASE_BANK_E',
  'MIGRATED_CASE_BASE_A', 'MIGRATED_CASE_BASE_B', 'MIGRATED_CASE_BASE_C',
  'MIGRATED_CASE_BASE_D', 'MIGRATED_CASE_BASE_E',
];
// 1. Static: index_updated.html must not reference legacy/ or scored_cases*
// 2. Static: app/app.js getCasePool must not reference any LEGACY_GLOBALS identifier
//    (comments excluded — parse identifiers, not substrings)
// 3. Runtime (smoke): after page load, assert every LEGACY_GLOBALS entry is
//    `undefined` on window; FAIL if any is defined.
// 4. Pool accounting: live case census (80 P1 / 110 P2 strict) unchanged.
```

**Expected-pass case:** current tree — all four checks pass (evidenced manually 2026-09-23; automation pending).
**Expected-fail case:** add `<script src="content/cases/legacy/scored_cases2.js">` to a scratch copy of the HTML — checks 1 and 3 fail, probe exits non-zero.

### 3.2 Policy (effective immediately, no code change required)

- **Prohibited:** adding `<script>` tags for `content/cases/legacy/*`, or referencing `ENHANCED_CASE_BASE*` / `CASE_BANK_*` / `MIGRATED_CASE_BASE_*` / `SCORED_CASES*` in any loader, pool builder, catalog, hero census, or dashboard source.
- **Required:** any change-set touching `index_updated.html` script tags or `getCasePool`/`getMCQPool`/catalog/hero pool accounting must (a) re-run `npm run probe:parity`, (b) attach the legacy-negative-test result, (c) update this plan's §2 table if the live source set changes.
- **Rollback:** revert the loader change-set; re-run parity + smoke; confirm 80/110 census. No content changes involved — rollback is a loader-only revert.

---

## 4. Acceptance Criteria Status

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Canonical safe workflow explicit | **Met** | CANONICAL_TOOLCHAIN_INVENTORY.md §2 |
| No unvalidated mass archival/deletion | **Met** | Zero files deleted/moved this session; 5 legacy files retained |
| Legacy exposure technically blocked **and tested**, or explicitly escalated | **Partially met — escalated** | Static + runtime absence **verified manually** (probes PASS); dedicated automated negative test **proposed, not yet implemented** → UNRESOLVED_HUMAN_ACTIONS.md |
| New-maintainer docs identify authoritative commands + unsafe one-shots | **Met** | CANONICAL_TOOLCHAIN_INVENTORY.md §2/§3/§5 |

---

**Owner:** JavaScript Architect (guard implementation) / Release Manager (policy adoption)
**Next:** implement §3.1 negative test; wire into `probe:parity`; re-verify.
