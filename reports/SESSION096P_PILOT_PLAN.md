# SESSION096P — Misclassification Recovery Pilot Plan

**Session:** 96P
**Governance Lane:** Light / Read-Only Analysis
**Date:** 2026-07-31
**Status:** Active

---

## 1. Objective

Validate the assumptions behind the Session 94P recovery plan by performing a full cognitive recertification audit on Pack C Section EC — the section with the highest observed misclassification severity.

## 2. Pilot Section Selection

**Selected:** `Pack C Section EC` (75 items, 70 Certified)

**Rationale:**
- Highest concentration of COSO/Internal Controls content with complex scenario-based items
- Strong distribution across all cognitive levels under current labeling
- 66 of 75 items (88%) labeled at Analyze or Evaluate — highest HO density in any pack/section
- Contains both genuinely complex scenario items AND clear definition-recall items labeled as Analyze
- Active items present (5) + Certified (70) — covers both state categories
- Pre-existing rotation-clone architecture (DL-012 remediation) provides structural contrast

## 3. S94P Assumptions Under Test

| Assumption | Test |
|------------|------|
| "Most Evaluate-labeled items are actually Analyze or lower" | Audit all 27 Evaluate items |
| "Many Analyze-labeled items are Understand or Remember" | Audit all 39 Analyze items |
| "Pack C Section EC has 0 genuine Evaluate items" | Classify each item independently |
| "Template rotation is the root cause of mislabeling" | Pattern-match clones within section |
| "Recovery requires rewrite, not just relabeling" | Assess salvageability per item |

## 4. Methodology

### 4.1 Extraction
- Function constructor parse of `pack_c_corrected.js` → 500 items
- Filter: `QuestionID` matches `/^P1-EC-\d{3}$/` → 75 items
- Extract: CognitiveLevel, question_state, Difficulty, Stem, Choices, CorrectChoice, Topic, upgrade_note

### 4.2 Cognitive Classification (S94P Quality Gates)

| Level | Gates |
|-------|-------|
| **Remember** | Stem is a definition; answer is the defined term. No scenario. No analysis required. |
| **Understand** | Stem describes a concept or situation; answer requires classifying/naming with brief reasoning. |
| **Apply** | Stem presents a specific scenario; candidate must apply a known rule/framework to select the correct action. |
| **Analyze** | Stem presents a complex multi-factor scenario; candidate must diagnose what went wrong or identify causal factors. |
| **Evaluate** | Stem presents competing alternatives with tradeoffs; candidate must make a judgment or recommendation weighing pros/cons. |

### 4.3 Quality Control
- Each item independently classified by reading full stem + all choices + correct answer
- Clone items (same stem, different company name) receive same classification as the seed
- Items where the stem describes a named company scenario but the cognitive demand is classification (e.g., "what type of control is this?") → **not** Analyze
- Items where the stem presents a multi-paragraph scenario and asks the candidate to diagnose root cause → **Analyze**
- Items where the candidate must choose among competing governance/responses with tradeoffs → **Evaluate**

## 5. Scope Boundaries

**IN SCOPE:**
- Cognitive reclassification of all 66 Evaluate + Analyze labeled items
- Statistical comparison of current vs. true labels
- Repository-wide projection model
- Recovery effort estimation

**OUT OF SCOPE:**
- Content edits
- Certification state changes
- May coaching modifications
- Pack B/B (Session 92 overlap avoidance)
- Any writes to pack files

## 6. Deliverables

1. `SESSION096P_PILOT_PLAN.md` ← THIS FILE
2. `SESSION096P_SECTION_AUDIT.md` — Full per-item reclassification
3. `SESSION096P_RECLASSIFICATION_MODEL.md` — Methodology validation
4. `SESSION096P_RECOVERY_IMPACT.md` — Repository-wide projections
5. `SESSION096P_CERTIFICATION_ACCURACY.md` — Certification integrity analysis
6. `SESSION096P_CLOSEOUT.md` — Final closeout

## 7. Success Criteria

- [ ] All 66 Evaluate/Analyze items independently reclassified
- [ ] Q1: Genuine Evaluate count determined
- [ ] Q2: HO decline quantified
- [ ] Q3: Salvageability assessed
- [ ] Q4: S94P projection model validated or corrected
- [ ] Zero repository modifications
- [ ] Zero governance violations
