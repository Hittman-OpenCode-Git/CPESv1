# Session 11 — Case-Pool Selection Risk Register

**Date:** 2026-07-24
**Session Status:** `READ-ONLY — NO REMEDIATION REQUIRED.`

---

## Risk Register Summary

This register documents every non-unique CaseID group found during the case-pool identity audit. The audit found **zero** non-unique CaseIDs across 435 runtime case instances.

---

## 1. Repeated CaseID Groups

**None.** All 435 CaseID instances are unique.

| CaseID Group | Instance Count | Source Banks/Files | Identity Classification | Learner-Selection Risk |
|-------------|---------------|-------------------|------------------------|----------------------|
| — | — | — | — | — |

---

## 2. Risk Level Assessment

| Risk Category | Level | Learner Impact | Repetition Possible in One Session? |
|--------------|-------|---------------|-------------------------------------|
| Duplicate CaseID in pool | **None** | No impact | No — all CaseIDs unique |
| Same content under different CaseID | **Low** | Learner sees two different case titles for similar content | Theoretically possible but not harmful — CaseIDs differ, titles differ (`(A simulation)` vs. `(B simulation)`) |
| Session-level CaseID collision | **None** | No impact | `seen.includes(x.CaseID)` prevents |

---

## 3. Structural Safety Mechanisms (Verified)

| Mechanism | Location | Effect |
|-----------|----------|--------|
| CaseID uniqueness at source | `cloneEnhancedCase()` | Appends `-{packLabel}` suffix preventing cross-section collisions |
| CaseID namespace isolation | Pack files vs. scored files | `CASE-*` prefix (standard) vs. `CBQ*-*-*` (enhanced) — non-overlapping |
| Session deduplication | `app.js:801-806` | `seen.includes(x.CaseID)` — without-replacement selection |
| Tier-based fallback ordering | `app.js:807-812` | Prefers unseen Tier 1 first, only falls to seen when exhausted |

---

## 4. Data/Runtime Ownership

| Component | Owner | File |
|-----------|-------|------|
| Standard case banks | Pack authors | `pack_a_corrected.js` — `pack_d_corrected.js` |
| Enhanced case banks | Case authors | `scored_cases.js` — `scored_cases5.js` |
| Pool construction | Runtime | `app.js:1023-1077` (`getCasePool()`) |
| Session selection | Runtime | `app.js:799-813` (session constructor) |

---

## 5. Proposed Minimum Remedy

**No change needed.** The current architecture provides:

1. **Source-level uniqueness:** `cloneEnhancedCase()` appends `-{packLabel}` to every CaseID
2. **Namespace isolation:** Standard and enhanced cases use non-overlapping CaseID prefixes
3. **Runtime deduplication:** Session selection uses `seen.includes(x.CaseID)`

---

## 6. Preconditions for Future Write-Authorized Session

If a future session needs to add new case sources:

- Any new case file must use a unique CaseID prefix (e.g., `CBQ6-*`)
- Any new clone function must append a distinguishing suffix to CaseID
- Standard case additions must use unique `CASE-X{N}` identifiers within the existing namespace
- After any case addition, re-run the VM load simulation to verify 0 duplicate CaseIDs

---

## 7. Regression Tests Required After Any Future Remediation

| # | Test | Method |
|---|------|--------|
| 1 | CaseID uniqueness scan | Node VM load + check `new Set(caseIDs).size === totalCount` |
| 2 | Session selection deduplication | Simulate session with all packs selected, verify no duplicate CaseIDs |
| 3 | Cross-pack edge case | Select Packs A+B+C+D+E, verify no CaseID collision |
| 4 | Enhanced + standard collision | Verify no `CASE-*` CaseID matches any `CBQ*-*-*` CaseID |
| 5 | Browser render verification | In browser, generate a session with all packs, inspect `s.cases` for duplicate CaseIDs |

---

**CASE-POOL IDENTITY AUDIT COMPLETE — NO DUPLICATE-CASE RISK — CASES ARE UNIQUELY IDENTIFIED OR RELIABLY DEDUPLICATED; NO SOURCE CHANGES MADE.**
