# WS-C Prompt — Portfolio Authoring (Full Governance Lane)

**Version:** 1.0
**Status:** Prerequisite Required → Ready for Authorization After Backlog Authored
**Lane:** Full Governance Lane
**Token:** WS-C (Portfolio Authoring)

---

## Executive Summary

Author ~80 new **Easy (DifficultyScore=1)** MCQ items across P2 Sections A, B, C to hit difficulty distribution targets per S121 Portfolio Targets and CAQS v1.0 §6.1.

**Prerequisite:** `P2_DIFFICULTY_AUTHORING_BACKLOG.md` must be authored first (planning artifact documenting the ~80-item backlog with blueprint mappings, topic assignments, and distractor strategies). This is a read-only planning item or part of WS-C scope.

**Uses:** `content-authoring` skill (blueprint taxonomy, CAQS workflow, distractor design, cognitive calibration, formula integration, governance compliance).

---

## Prerequisite (Must Complete First)

### `P2_DIFFICULTY_AUTHORING_BACKLOG.md` Authoring

**Scope:** Document the ~80 Easy-item backlog with:
- Per-section targets: Section A ~22, Section B ~20, Section C ~38 (from design doc §5 WS-C)
- Blueprint LOS mapping for each planned item (Section → Domain → LOS)
- Topic + Subtopic assignments
- Distractor strategy per item (misconception targeted)
- Formula references (from `foundation/FORMULA_MASTER.md`)
- CognitiveLevel: **Remember** or **Understand** (per CAQS §6.2 — Easy items target Remember 5%, Understand 15%)
- DifficultyScore: **1** (Easy)
- Part2OnlyFlag: **true** (Rule 13 enforcement)

**Lane:** Governance Light Lane (read-only planning artifact) or included in WS-C Full Governance scope.

**Output:** `reports/P2_DIFFICULTY_AUTHORING_BACKLOG.md` (or `p2/` subfolder per repo org)

---

## Current State (Verified)

| Metric | Current | Target (CAQS §6.1) | Gap |
|--------|---------|-------------------|-----|
| P2 MCQ Certified | 3,450/3,450 | 3,450+ | — |
| Easy (DS=1) items | Unknown (backlog missing) | 15% of bank | ~80 items needed |
| Sections A/B/C Easy | Sparse | Per S121 targets | Backlog defines exact gap |

**P2 Pool Baseline** (from `p2/CURRENT_BASELINES_P2.md`):
- Section A: 600 items
- Section B: 600 items  
- Section C: 750 items
- Section D: 500 items
- Section E: 500 items
- Section F: 500 items
- **Total: 3,450 MCQs** + 100 cases

---

## Session Plan — Multi-Session Full Governance Wave

### Prerequisite Session (Light Lane) — Backlog Authoring
- Author `P2_DIFFICULTY_AUTHORING_BACKLOG.md` per above
- No pack file writes
- `npm run preflight` recommended at T0
- REVISION_HISTORY entry only if content defect found

### WS-C Wave Sessions (Full Governance Lane)

#### Session 1: T0 + Sections A+B Authoring (~42 items)

**T0 — Preflight (MANDATORY per §9.2)**
```bash
npm run preflight
```
Verify: 0 divergences, 3,450 P2 Certified, baseline coherence 0.

**Backup Protocol (§3) — Before ANY pack write:**
```bash
# For each pack file to be edited
Copy-Item "p2/pack_p2_a.js" "backups/pack_p2_a.js.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
Copy-Item "p2/pack_p2_b.js" "backups/pack_p2_b.js.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
Copy-Item "p2/pack_p2_c.js" "backups/pack_p2_c.js.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
```
Confirm all backups exist and non-zero.

**Authoring (per `content-authoring` skill):**
- Follow blueprint taxonomy (TAXONOMY_REGISTRY.md §8)
- CAQS v1.0 workflow: Technical → Psychometric → Numerical → Instructional → Metadata → Final Validation
- Distractor design: Each distractor maps to documented misconception/exam trap
- Cognitive calibration: Remember/Understand for Easy items (Rule 11 gate)
- Formula integration: Reference `foundation/FORMULA_MASTER.md` canonical names
- Governance compliance: Part2OnlyFlag=true, QID format `P2-{Section}-{NNN}`, question_state="Unprocessed"
- Rule 5: ≤30 items per change-set (batch across packs as needed)

**Rule 17 (Heuristic-screen admissibility):** Mass choice rewrites (≥3 objects) must cite evidence basis:
- "stratified review" / "context review" / "adjudicated" / "triage" / "candidate-list" / "independently derived"
- Or carry `BLOCK-AUTHORIZED` marker

#### Session 2: Section C Authoring (~38 items) + Certification Prep
- Same protocol
- Prepare items for certification (six-dimension AI verification per CAQS §1.6)

#### Session 3: Certification Batch + Semantic Screens Re-run (§9.2.1)
- Six-dimension AI verification (Correctness, Precision, Difficulty, Distractors, Blueprint, Part 2 Relevance)
- HIGH confidence across all dimensions required
- User approval documented in REVISION_HISTORY.md
- Distractor tier map (A/B/C/D) recorded
- **Semantic screens re-run (MANDATORY at Tend):**
  ```bash
  # MCQ screens
  node scripts/phase0_census.js
  node scripts/semantic_key_audit_p2.js
  # Case screens (if any P2 cases affected)
  node scripts/case_semantic_screens.js
  ```
- Clean result: zero new flags beyond documented false-positive set, zero confirmed key/explanation inversions
- No `question_state` flip to Certified without clean re-run

### Tend — Pipeline (MANDATORY per §9.2)
```bash
npm run pipeline
```
- validate → case-screens → build-registry → dashboard → baseline-coherence
- Must exit 0

---

## Governance Checklist (Full Governance Lane)

| Requirement | When | Status |
|-------------|------|--------|
| `npm run preflight` | T0 mandatory | ✅ |
| Backup-before-write (§3) | Every pack edit | ✅ |
| Raw evidence verification (§5) | All claims | ✅ |
| `npm run pipeline` | Tend mandatory | ✅ |
| Semantic screens re-run (§9.2.1) | Every cert batch | ✅ |
| REVISION_HISTORY entry (§4) | Content/cert changes | ✅ |
| DEFECT_LIBRARY entry | New defects found | ✅ |
| Rule 5 (≤30 objects/change-set) | All batches | ✅ |
| Rule 12 (zero relabel) | No existing items touched | ✅ |
| Rule 13 (Part2OnlyFlag=true) | Every P2 MCQ | ✅ |
| Rule 14 (Cross-part QID boundary) | P1 QIDs blocked in P2 | ✅ |
| Rule 17 (Heuristic evidence) | Mass rewrites ≥3 | ✅ |
| Rule 18 (Choice-text hygiene) | All new choices | ✅ |
| Rule 20 (Legacy extractor block) | No bank-name-regex | ✅ |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cognitive mislabel (Rule 11) | Medium | High | Verify against S122 False Positive Library before labeling |
| Difficulty inflation (Rule 12) | Medium | High | Easy items = Remember/Understand only; no Apply+ at DS=1 |
| Distractor quality | Medium | Medium | Use S122 Analyze/Evaluate patterns as templates; avoid DL-005/DL-043 |
| Blueprint misalignment | Low | High | Map each item to specific LOS before authoring |
| Count instability (§6) | Low | High | Stabilize count across 2 independent scans before remediation |
| Clone injection (§19.4) | Low | Critical | Run numeric-multiset + Topic clone scan pre-certification |

---

## Authorization Required

**User must provide (AFTER backlog authored):**
1. Explicit task: "Execute WS-C Portfolio Authoring"
2. Scope authorization: "Full Governance Lane — P2 pack files A/B/C, new Easy items only"
3. Confirmation: Backlog authored and approved
4. Confirmation: No existing Certified items will be modified

**Expected duration:** 3–5 Full Governance sessions (authoring waves + certification + pipeline)

---

## Post-Completion State

- ~80 new Easy items authored across P2 A/B/C
- All items Certified (six-dimension verification + semantic screens clean)
- Difficulty distribution moves toward CAQS §6.1 targets
- `p2/CURRENT_BASELINES_P2.md` updated (new hashes, counts)
- REVISION_HISTORY.md entries for each wave
- DEFECT_LIBRARY.md entries for any new defects discovered

---

## References

- Board Briefing: `reports/BOARD_BRIEFING_20260921.md` §4 WS-C
- Design Doc: `reports/MAY_3_0_DESIGN_20260921.md` (F1–F4 accepted; §5 WS-C)
- S121 Targets: `knowledge/S121_PORTFOLIO_TARGETS.md`
- CAQS v1.0: `knowledge/CAQS_v1.0.md` §1.6, §6.1, §6.2, §14
- Content Authoring Skill: `.opencode/skills/content-authoring.md`
- S122 References: Gold Standard Library, False Positive Library, Pattern Catalogs
- Governance: `AGENTS.md` §9.2, §9.2.1, §14, §15, §17
- Current baseline: `p2/CURRENT_BASELINES_P2.md`
- Part 2 Blueprint: `p2/` exam blueprint (IMA CSO Part 2)