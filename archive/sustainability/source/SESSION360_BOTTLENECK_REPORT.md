# S360 — Expansion Bottleneck Report

**Session:** S360 (Read-Only) — Expansion Risk Analysis  
**Date:** 2026-07-28  
**Authority:** AGENTS.md, PROJECT_CONSTITUTION.md  
**Input Sessions:** S355–S358 (Operational Value Realization)  
**Certified Pool:** 2,320 of 2,540 items (91.3%)

---

## Top 5 Expansion Blockers

Ranked by severity × scope (severe + many items = highest priority).

### 1. FD-075 — Certified Item Missing All Structural Fields (CRITICAL)

| Dimension | Detail |
|-----------|--------|
| **Severity** | CRITICAL |
| **Scope** | 1 item (P1-FD-075, Pack D) |
| **Current State** | `question_state: "Certified"` — in active learner delivery pool |
| **Missing Fields** | Stem, CorrectChoice, ExplanationCorrect, Choices |
| **Learner Impact** | User sees a blank/broken question. Rendering engine encounters undefined fields. |
| **Root Cause** | S899 Phase 1 item authoring — FD-075 was allocated as a slot but never populated with content before being certified. |
| **Cost of Delay** | **Immediate learner-facing defect.** Every learner who draws this item gets a broken experience. Degrades platform credibility. |
| **Mitigation** | Immediate structural repair: either complete the item (author missing content) or downgrade to Archived/Active. Minimum: remove from Certified pool. |

### 2. DL-021 — 95 Certified Items Lack Distractor Explanations (HIGH)

| Dimension | Detail |
|-----------|--------|
| **Severity** | HIGH |
| **Scope** | 95 Certified items in Pack E Section C (all 100 P1E-C-* items) |
| **Current State** | All 4 ExplanationWrong fields structurally present (DL-018 normalized), but non-CC slots contain empty strings (""). Sample of 10 items: 7 had empty distractor EW slots. |
| **Learner Impact** | Learners who select wrong answers see no educational feedback. Degraded pedagogical value. |
| **Root Cause** | Pack E authoring pipeline omitted distractor explanations for Section C; DL-018 added empty field shells but no content was authored. |
| **Cost of Delay** | 95 items (4.1% of certified MCQ pool) provide degraded educational experience. Candidates studying Section C (Performance Management) get incomplete feedback. |
| **Mitigation** | Author ~285 choice-specific distractor explanations (3 per item × 95 items). At 3 min/exclamation field: ~14.3 hours. S71 authored 264 fields for 88 Unprocessed Section C items — this is the remaining certified subset. |

### 3. DL-031 — 500 Items with Inflated Difficulty Labels (HIGH)

| Dimension | Detail |
|-----------|--------|
| **Severity** | HIGH |
| **Scope** | ~500 items across all 5 packs |
| **Current State** | 1,270 items (50% of pool) at Remember/Understand cognitive level. CAQS target: 20%. Moderate difficulty items labeled at Remember/Understand = DL-031 candidates. |
| **Learner Impact** | Distorted difficulty analytics. Blueprint coverage reporting shows inflated difficulty distribution. Adaptive testing would mis-rank candidates. |
| **Root Cause** | Template-rotation authoring assigned difficulty labels by position in rotation group, not cognitive demand. |
| **Cost of Delay** | Label-only recalibration (difficulty downgrade): ~16.7 hours. But label changes don't close the CAQS cognitive gap (Analyze deficit: 530 items, Evaluate deficit: 336 items). Genuine cognitive upgrades require stem rewrites or net-new authoring. |
| **Mitigation** | Two-track approach: (a) Downgrade difficulty labels for definition-match items (2 min/item, 16.7 hrs total). (b) Upgrade stems for ~200 items to add application/analysis depth (30 min/item, ~100 hrs). |

### 4. Sections E+F Uncertified — 202 Items Blocking Full Closure (MEDIUM)

| Dimension | Detail |
|-----------|--------|
| **Severity** | MEDIUM |
| **Scope** | 202 items: Pack C EC (56 non-certified), Pack C FC (56), Pack D ED (56), Pack D FD (52) |
| **Current State** | ~200 items are Archived DL-012 rotation clones. 20 are Active (S899 Phase 1 authored but not yet certified). All sections at ~25% certified. |
| **Learner Impact** | 8.5% of the MCQ pool is excluded from learner delivery. Sections E (Internal Controls) and F (Technology & Analytics) are severely underrepresented. |
| **Root Cause** | DL-012 clone redundancy — 28 clone groups across Packs C+D Section E/F. S899 Phase 1 replaced 20; ~180 clones remain as Archived shells. |
| **Cost of Delay** | At S899 throughput (20 items/session), full closure requires ~10 sessions of net-new authoring for 200 items. With current velocity of 5.6 items/day, this takes ~36 days. |
| **Mitigation** | Continue S900 Phase 2 program. Each 20-item batch replaces 20 Archived clones with authored items. 10 batches total. Priority: Pack D Sections ED/FD first (has structural issues), then Pack C. |

### 5. DL-035 — 39 Certified Domain F Items Lack Distractor Explanations (HIGH)

| Dimension | Detail |
|-----------|--------|
| **Severity** | HIGH |
| **Scope** | 39 items: 28 Pack C Section FC + 11 Pack D Section FD |
| **Current State** | All 39 items Certified (S853 WAVE_A). ~1.5 empty non-CC EW slots per item = ~117 empty distractor slots. Rule 6 deployed (S814) but content remediation not yet executed. |
| **Learner Impact** | Domain F learners (Technology & Analytics) get no feedback on why their wrong answers are wrong. |
| **Root Cause** | Certification pipeline checked DL-008 only, not DL-026. Pre-existing empty distractor slots from template rotation passed through without flagging. |
| **Cost of Delay** | 39 items in active learner pool. Authoring ~117 distractor explanations: ~5.9 hours at 3 min/field. |
| **Mitigation** | S816-S818 content remediation program (already scheduled). Each distractor field needs Technology & Analytics domain-appropriate content. |

---

## Bottleneck Classification

| Category | Constraint | Severity | Items Affected | Mitigation Path |
|----------|-----------|----------|---------------|-----------------|
| **Architecture** | Dual-block pack structure (DL-016) causes scan false positives | MEDIUM | All Pack C/D items | Single-object migration during certification. Scan tools need into-block field extraction, not forward-scan. |
| **Architecture** | FD-045/FD-075 structural holes — items with QuestionID but no content | CRITICAL (FD-075) | 2 items (Pack D) | Complete FD-075 content immediately. Downgrade FD-075 from Certified if not fixable within 24h. Fix FD-045 when Section F activated. |
| **Governance** | 30-item batch cap (Rule 5) limits batch remediation throughput | MEDIUM | All writes | Use BLOCK-AUTHORIZED marker for large remediation batches. S893-S896 used this for 59 DL-008 clears. |
| **Governance** | Rule 6 (DL-026 BLOCK) deployed but 39 items unremediated | HIGH | 39 | S816-S818 scheduled. Author ~117 fields. |
| **Governance** | Pack D certified count stale (baseline: 389, actual: 392) | LOW | Documentation | Re-baseline pack_d_corrected.js hash and certified count. |
| **Operations** | No automated certification quality gate — DL-026/DL-031/DL-021 pass through | HIGH | Pipeline-wide | Add pre-certification checks: DL-026 (empty non-CC slots), DL-031 (difficulty-cognitive mismatch), structural completeness. |
| **Operations** | Scan tools produce false positives (DL-029 methodology gap) | HIGH | All pack scans | Upgrade scan scripts to CC-position-aware parsing. Standardize on Function constructor parse for structural scans. |
| **Content** | DL-031 — 500 items with inflated difficulty labels | HIGH | 500 (19.7%) | Two-track: label downgrade (~16.7 hrs) + cognitive upgrade for ~200 items (~100 hrs). |
| **Content** | DL-021 — 95 Certified items with empty distractor explanations | HIGH | 95 (4.1%) | Author ~285 choice-specific EW fields (~14.3 hrs). |
| **Content** | DL-035 — 39 Certified Domain F items lack distractor explanations | HIGH | 39 (1.7%) | Author ~117 choice-specific EW fields (~5.9 hrs). S816-S818 scheduled. |
| **Content** | Sections E+F 202 items uncertified | MEDIUM | 202 (8.5%) | 10 batches of 20 items each. S900 Phase 2 program. |
| **Content** | DL-032 — 330 case items uniform Moderate difficulty | MEDIUM | 330 | Recalibrate scored_cases2-5 difficulty labels. ~11 hours at 2 min/item. |
| **Content** | Cognitive gap: Analyze deficit 530 items, Evaluate deficit 336 items | HIGH | 866 (34.1%) | Long-term program. Requires stem rewrites and distractor engineering. ~54 hours at measured velocity. |
| **Training** | Agent prompt drift across long sessions | LOW | Process | Implement T0/Tmid/Tend checkpoint sequence (AGENTS.md §13.1). Deploy drift-detector subagent at Tmid. |
| **Training** | Stale baselines (Pack D certified count off by 3) | LOW | Documentation | Regular re-baselining after every certification wave. |

---

## Recommended Sequencing

### Phase 1 — Critical Fixes (24 hours)

1. **FD-075 repair** — Complete item content or downgrade from Certified. This is a learner-facing broken question. _(1-3 hours)_
2. **DL-035 remediation (S816-S818)** — Author 117 distractor explanations for 39 Domain F Certified items. _(~6 hours)_
3. **Pack D re-baseline** — Update CURRENT_BASELINES.md with corrected certified count (389→392). _(15 minutes)_

### Phase 2 — High-Impact Quality (Week 1)

4. **DL-021 remediation** — Author 285 distractor explanations for 95 Pack E Section C items. _(~14 hours)_
5. **DL-031 label recalibration** — Downgrade difficulty labels for ~500 definition-match items from Moderate→Easy. _(~17 hours)_
6. **Pre-certification gate deployment** — Add structural completeness + DL-026 + DL-031 checks to certification pipeline. Prevent new instances. _(~4 hours)_

### Phase 3 — Structural Closure (Weeks 2-3)

7. **S900 Phase 2** — Continue replacing Archived DL-012 clones in Sections E+F. 10 batches of 20 items. Target: Pack C+D Sections E+F reach 100% certified. _(~20 sessions)_
8. **DL-032 case recalibration** — Assign genuine difficulty labels to 330 case items. _(~11 hours)_
9. **Scan tool upgrade** — Fix DL-029 methodology gap. CC-position-aware parsing in all scan scripts. _(~8 hours)_

### Phase 4 — Cognitive Upgrade Program (Weeks 4-8)

10. **Analyze/Evaluate expansion** — Close the 866-item cognitive gap. This is the binding constraint for meeting CAQS targets. Requires sustained content design output. At current velocity (21.9 items/hr Analyze, 11.3 items/hr Evaluate), feasible in ~54 billable hours across ~10 weeks.

---

## Cost-of-Delay Estimates

| Blocker | Daily Cost | Metric |
|---------|-----------|--------|
| FD-075 (broken certified item) | 1 user-impact per draw | Learner sees blank question. Platform credibility risk. |
| DL-021 (95 empty distractor slots) | ~0.5% of Section C study sessions degraded | Learners studying Performance Management get incomplete feedback. |
| DL-035 (39 Domain F items) | ~0.2% of Domain F sessions degraded | Technology & Analytics learners lack wrong-answer guidance. |
| DL-031 (500 inflated labels) | Distorted analytics permanently | Blueprint reports inaccurate. Adaptive routing suboptimal. |
| Sections E+F uncertified | 8.5% pool exclusion | Internal Controls and Technology domains underrepresented. ~200 items unavailable. |
| Cognitive gap (866 items) | Blueprint non-compliance | Does not meet CAQS §6.1-6.2 targets for cognitive distribution. |

---

## Key Metrics Summary

| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| Certified pool | 2,320 (91.3%) | 2,540 (100%) | 220 items |
| Structural integrity | 1 item broken | 0 broken | FD-075 |
| Open HIGH defects | 6 | 0 | 6 |
| Cognitive: Analyze+Evaluate | 5.9% | 40% | -34.1% |
| Difficulty: Difficult+V.Difficult | 7.0% | 35% | -28.0% |
| Sections fully certified | 20/30 | 30/30 | 4 sections |
| Authoring velocity | 5.6 items/day | 20+ items/day | Need ~4× improvement |

---

## Conclusion

The platform is **operationally ready** but **content-bound**. Governance infrastructure is mature (9 BLOCK rules, 51/51 tests pass). The binding constraints are:

1. **Content design capacity** — net-new authoring throughput (5.6 items/day) is too low to close the cognitive gap at scale.
2. **Quality debt in certified pool** — FD-075 (broken), DL-021 (95 items), DL-035 (39 items) are active learner-facing defects.
3. **Cognitive distribution** — 50% of the pool at Remember/Understand vs 20% CAQS target. This is the largest single gap.

Large-scale expansion should not proceed until Phases 1-2 are complete (critical fixes + high-impact quality). Phase 3 (structural closure) can run in parallel with Phase 4 (cognitive upgrade program) once the certified pool is secured.

---

*S360 Expansion Risk Analysis. READ-ONLY. No file modifications.*
