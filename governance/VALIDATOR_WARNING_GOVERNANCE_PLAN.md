# VALIDATOR_WARNING_GOVERNANCE_PLAN.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, CAQS_v1.0.md, TWO_TIER_QUALITY_GATE_DECISION.md
**Status:** Active — Warning governance framework

---

## 1. Purpose

Establish a governance framework for validator warnings that:
- Reduces false-positive noise without hiding real errors
- Requires QID-level adjudication for all psychometric warnings
- Distinguishes **blocking errors** (Tier 1) from **tracked warnings** (Tier 2)
- Provides a calibrated allowlist mechanism with evidence requirements
- Implements warning-delta assertion for clean changes

---

## 2. Current Measured Baseline (2026-09-23)

**Validation Run:** `node scripts/validate.js` — Full population (6,600 questions: 3,070 P1 + 3,530 P2)

| Validator Module | Questions Scanned | Findings | Classification |
|------------------|-------------------|----------|----------------|
| **RepositoryValidator** | — | 0 | PASS |
| **MetadataValidator** | 190 cases | 1 (CBQ2-E2: 7 choices) | WARN — structural |
| **BlueprintValidator** | 190 cases | ~200 topic alignment warnings | WARN — taxonomy gap |
| **Part2BlueprintValidator** | 100 cases | ~50 topic alignment warnings | WARN — taxonomy gap |
| **DifficultyValidator** | 190 cases | ~100 warnings | WARN — formula/trap ref gaps |
| **ReferenceValidator** | 190 cases | ~500 warnings (FormulaReference, CommonTrapReference, DecisionTreeReference) | WARN — P2 descriptive refs |
| **ExplanationValidator** | 3,070 P1 items | 0 | PASS |
| **CaseIntegrityValidator** | 190 cases | ~50 warnings | WARN — duplicate choices FP |
| **CaseIdentityValidator** | 190 cases | 0 | PASS |
| **PsychometricValidator** (4 modules) | 6,600 items | **6,730 warnings** | WARN — see breakdown |

### 2.1 Psychometric Validator Breakdown

| Sub-Validator | Questions Scanned | Findings | Key Patterns |
|---------------|-------------------|----------|--------------|
| **AbsoluteLanguageValidator** | 6,600 | **2,571** | only/exclusively: 1,912; must: 389; exactly: 92; always: 117; never: 41; impossible: 6 |
| **AmbiguityValidator** | 6,600 | **2,303** | vague qualifiers (usually/generally/typically): 660 |
| **DistractorSimilarityValidator** | 6,600 | **1,968** | high similarity pairs: 717; moderate: 1,251 |
| **ExplanationConsistencyValidator** | 6,600 | **0** | PASS |
| **MathematicalValidator** | 6,600 | **0** | PASS (0% false positive rate) |

**Total Validator Warnings: 10,345** (Status: WARN — 0 Errors, 0 Failed)

---

## 3. Warning Taxonomy

### 3.1 Tier 1: Blocking Errors (Governance Guard Enforced)

| Warning Type | Guard Rule | Auto-BLOCK | Current Count |
|--------------|------------|------------|---------------|
| ExplanationWrong[CorrectChoice] non-empty | Rule 2 (DL-008) | YES | 0 |
| Empty non-CC ExplanationWrong slots | Rule 6 (DL-026) | YES | 0 |
| Absent distractor ExplanationWrong fields | Rule 10 (DL-021) | YES | 0 |
| Choice binary lead-in polarity mismatch | Rule 9 (DL-037) | YES | 0 |
| Part2OnlyFlag missing/false | Rule 13 | YES | 0 |
| Cross-part QID boundary violation | Rule 14 | YES | 0 |
| Certification provenance missing | Rule 16 | YES | 0 |
| Semantic quarantine violation | Rule 21 | YES | 0 |
| Legacy silent-drop extractor regression | Rule 20 | YES | 0 |

**All Tier 1 blocking errors: 0** — Clean baseline.

### 3.2 Tier 2: Tracked Psychometric Warnings

| Category | Sub-Category | Current Count | Adjudication Status |
|----------|--------------|---------------|---------------------|
| **Absolute Language** | "only"/"exclusively" | 1,912 | **Most legitimate** — technical usage (e.g., "recognize revenue only when...") |
| | "must" | 389 | Mixed — some legitimate requirement language |
| | "exactly" | 92 | Mostly legitimate — precise calculations |
| | "always" | 117 | **High cueing risk** — prioritize review |
| | "never" | 41 | **High cueing risk** — prioritize review |
| | "impossible" | 6 | **High cueing risk** — prioritize review |
| | "no-other/exception/alternative" | 14 | Review needed |
| **Ambiguity** | "usually"/"generally"/"typically" | 660 | Review needed — reduces discrimination |
| **Distractor Similarity** | High similarity (>70% Jaccard) | 717 pairs | **Adjudicated: 0 true redundancies** (DL-005 closeout 2026-09-10) |
| | Moderate similarity (50-70%) | 1,251 pairs | Lower yield — monitor |
| | 100% identical (DL-043) | ~20 items | **Resolved** — Batches 1-4 complete |
| **Blueprint Topic Alignment** | P1 case topics not in domain list | ~200 | **Taxonomy gap** — P2 domains differ from P1 |
| | P2 MCQ topics not in domain list | ~50 | **Taxonomy gap** — P2 topics need registration |
| **Reference Gaps** | FormulaReference missing (P2 calculation items) | ~100 | P2 uses descriptive refs, not canonical IDs |
| | CommonTrapReference missing/descriptive | ~300 | P2 uses prose descriptions |
| | DecisionTreeReference missing/descriptive | ~50 | P2 uses descriptive refs |
| **Case Integrity** | Duplicate choices (FP — only 1 select item) | ~10 cases | **Validator FP** — CaseIntegrityValidator fixed 2026-09-20 |
| | Choices length outside 3-6 | 1 (CBQ2-E2) | Structural — 7-choice item |

---

## 4. Known False-Positive Categories (Allowlist Candidates)

### 4.1 Absolute Language — Legitimate Technical Usage

| Pattern | Examples | Reason | Evidence Required |
|---------|----------|--------|-------------------|
| "only" in standard citations | "Revenue is recognized **only when** performance obligations are satisfied" | ASC 606 requirement language | QID + standard citation |
| "must" in requirement statements | "The auditor **must** evaluate..." | Professional standard language | QID + standard citation |
| "exactly" in calculations | "Calculate **exactly** the variance" | Precision requirement | QID showing calculation context |
| "always" in COSO limitations | "Management override of controls is **always** possible" | **Documented keep** (P1B-E-150, DL-043 Batch-2) | QID + COSO principle reference |

### 4.2 Distractor Similarity — Legitimate Parallel Structures

| Pattern | Examples | Reason | Evidence Required |
|---------|----------|--------|-------------------|
| Journal entry direction traps | "Debit AR / Credit Revenue" vs "Debit Revenue / Credit AR" | Tests debit/credit direction | QID pair + accounting concept |
| Classification matrices | "Product / Period" vs "Period / Product" | Tests classification dimension | QID pair + concept |
| U/F permutation matrices | "Favorable / Unfavorable" combinations | Tests variance interpretation | QID pair + variance type |
| Formula component permutations | "A × B" vs "B × A" with different values | Tests formula understanding | QID pair + formula |
| Sequence orderings | Step 1→2→3 vs 3→2→1 | Tests procedural knowledge | QID pair + procedure |

**Adjudication Record:** 100% of 100%-similarity pairs (417 flagged, 46 QIDs) reviewed 2026-09-10 — **0 true redundancies, 0 rewrites**. All legitimate parallel structures testing distinct accounting dimensions.

### 4.3 Blueprint Topic Alignment — Taxonomy Gaps

| Pattern | Reason | Resolution |
|---------|--------|------------|
| P1 case topics not in TAXONOMY_REGISTRY.md domain list | Registry contains P1 CSO topics; cases use more granular subtopics | Extend TAXONOMY_REGISTRY.md §8 with case-level subtopics |
| P2 MCQ topics not in TAXONOMY_REGISTRY.md domain list | P2 CSO differs from P1; registry only has P1 topics | Create P2 topic registry in TAXONOMY_REGISTRY.md |
| P2 case topics not in P2 domain list | Same — P2 domains need registration | Register P2 domains/topics |

### 4.4 Reference Gaps — P2 Descriptive Conventions

| Pattern | Reason | Resolution |
|---------|--------|------------|
| FormulaReference: descriptive prose (e.g., "CB-10: Cash Conversion Cycle") | P2 uses ID codes + prose, not P1 canonical names | Allowlist: P2 packs accept any non-empty FormulaReference (implemented 2026-09-21 via `p2UseDescriptiveReferences` flag) |
| CommonTrapReference: prose descriptions | P2 authoring uses prose, not "Trap N: Name" format | Allowlist: P2 packs accept any non-empty CommonTrapReference |
| DecisionTreeReference: descriptive names | P2 uses hyphenated descriptive names | Allowlist: P2 packs accept any non-empty DecisionTreeReference |

---

## 5. Allowlist / Calibration Mechanism

### 5.1 Allowlist Entry Requirements

To add a warning to the allowlist (suppress from WARN output), **all** must be provided:

| Requirement | Description |
|-------------|-------------|
| **QID List** | Exact QIDs affected (not counts) |
| **Pattern** | Regex or exact string matching the warning trigger |
| **Category** | False-positive category from §4 |
| **Evidence** | For each QID: why this is a false positive (standard citation, accounting concept, parallel structure type) |
| **Reviewer** | Named role (Accountant for semantic, Psychometrician for psychometric) |
| **Approval Date** | ISO 8601 |
| **Review Date** | Next mandatory review (≤ 180 days) |

### 5.2 Allowlist Storage

`scripts/validators/config/warning_allowlist.json` — structured allowlist consumed by validators.

```json
{
  "version": "1.0",
  "updated": "2026-09-23",
  "entries": [
    {
      "id": "AL-001",
      "validator": "AbsoluteLanguageValidator",
      "pattern": "always",
      "category": "COSO limitation — documented keep",
      "qids": ["P1B-E-150"],
      "evidence": "COSO Principle 15: Management override always possible",
      "reviewer": "Accountant",
      "approved": "2026-09-10",
      "review_by": "2027-03-10"
    }
  ]
}
```

### 5.3 Validator Integration

Each psychometric validator must:
1. Load allowlist at startup
2. For each finding, check if QID + pattern matches allowlist entry
3. If matched → **suppress from WARN output** (count as "allowlisted" in summary)
4. Report allowlisted count separately in validation summary

---

## 6. Warning-Delta Assertion for Clean Changes

### 6.1 Principle

Any change that claims to be "clean" (no functional modification) **must not increase** the warning count for any validator module beyond the established baseline + allowlist.

### 6.2 Implementation

```powershell
# Pre-change baseline capture
node scripts/validate.js --json > baseline_warnings.json

# Make change...

# Post-change verification
node scripts/validate.js --json > post_warnings.json

# Compare (scripted)
node scripts/compare_warning_delta.js baseline_warnings.json post_warnings.json
```

### 6.3 Delta Rules

| Scenario | Requirement |
|----------|-------------|
| **Clean change** (refactor, comment, whitespace) | Delta = 0 for all modules (excluding allowlisted) |
| **Content remediation** (fixing known defects) | Delta ≤ 0 for targeted modules; may increase in unrelated modules (document why) |
| **New content authoring** | New warnings only for new QIDs; existing QIDs delta = 0 |
| **New warning class detected** | Auto-escalate — cannot be allowlisted without adjudication |

### 6.4 CI Integration

`npm run validate` exits with code 1 if:
- Any **Error** (blocking) — current behavior
- **Warning delta > 0** for any module on clean-change branches (new enforcement)

---

## 7. Escalation Rules for New Warning Classes

| Trigger | Escalation Path |
|---------|-----------------|
| New validator module added | Governance Validator review → add to Tier 1 or Tier 2 taxonomy |
| Warning pattern not in taxonomy | Psychometrician adjudicates → classify as Tier 1/Tier 2/False Positive |
| Allowlist entry requested without evidence | **Rejected** — evidence mandatory per §5.1 |
| Warning count spikes > 20% in one session | Halt — investigate root cause (parser change, content injection, etc.) |
| MathematicalValidator findings > 0 | **Immediate escalation** — 0% false positive rate expected |

---

## 8. Distinction: Warnings vs. Blocking Validation Errors

| Property | **Blocking Errors** (Tier 1) | **Warnings** (Tier 2) |
|----------|------------------------------|----------------------|
| **Exit Code** | `npm run validate` → non-zero | `npm run validate` → 0 (WARN status) |
| **Governance Guard** | Rules 2, 6, 9, 10, 13, 14, 16, 20, 21 | Not enforced by guard |
| **Release Impact** | **Blocks release** automatically | **Tracked** — requires board approval if > threshold |
| **Remediation SLA** | Immediate (quarantine Certified) | Planned wave (≤ 90 days) |
| **Adjudication** | Binary (PASS/FAIL) | Graded (QID-level evidence) |
| **Examples** | DL-008, DL-026, DL-021, DL-037, Rule 14 | DL-003, DL-004, DL-005, DL-013, DL-031 |

**Critical:** Warning counts **alone** are never release criteria. Only **QID-adjudicated** findings with board-minute approval for residual debt.

---

## 9. Psychometric Triage Queue (QID-Level)

Instead of aggregate warning counts, maintain a **QID-level triage queue**:

### 9.1 Structure

`scripts/output/psychometric_triage_queue.json`:

```json
{
  "generated": "2026-09-23",
  "baseline_warnings": 6730,
  "allowlisted": 12,
  "actionable": [
    {
      "qid": "P2-A-180",
      "validator": "DistractorSimilarityValidator",
      "finding": "Choices B/C 100% similar",
      "category": "Parallel structure — journal entry direction",
      "status": "ADJUDICATED_LEGITIMATE",
      "reviewer": "Psychometrician",
      "date": "2026-09-10"
    }
  ],
  "pending_review": [
    {
      "qid": "P1-A-045",
      "validator": "AbsoluteLanguageValidator",
      "finding": "Choice C contains 'always'",
      "category": "Cueing risk — needs review",
      "status": "PENDING"
    }
  ],
  "resolved_this_cycle": []
}
```

### 9.2 Triage Workflow

1. **Generate** queue from validator output (automated)
2. **Filter** allowlisted entries (automated)
3. **Cluster** by category/pack for efficient review
4. **Adjudicate** each cluster — Psychometrician + Accountant
5. **Update** status: ADJUDICATED_LEGITIMATE / REMEDIATION_REQUIRED / ESCALATED
6. **Track** resolved count per cycle

---

## 10. Implementation Roadmap

| Phase | Action | Target | Owner |
|-------|--------|--------|-------|
| **1** | Create `warning_allowlist.json` with current known FPs (§4) | 2026-09-25 | Governance Validator |
| **2** | Modify psychometric validators to consume allowlist | 2026-09-30 | JavaScript Architect |
| **3** | Implement `compare_warning_delta.js` for CI | 2026-10-07 | JavaScript Architect |
| **4** | Build `psychometric_triage_queue.json` generator | 2026-10-14 | Psychometrician |
| **5** | Quarterly triage review cadence established | 2026-10-23 | Release Manager |
| **6** | Board-minute approval template for Tier 2 residual | 2026-10-23 | Release Manager |

---

## 11. Current Acceptance Status (2026-09-23)

| Item | Status | Notes |
|------|--------|-------|
| Tier 1 blocking errors | **0** — All clean | Governance guard 101/101 PASS |
| Absolute Language "always/never/impossible" in distractors | **0** — Remediated (DL-003 Batch 1-4) | 18 items reworded; P1B-E-150 documented keep |
| Distractor Similarity 100% pairs | **0 rewrites needed** — Adjudicated legitimate | DL-005 closeout 2026-09-10 (46 QIDs, 0 rewrites) |
| Near-duplicate distractors (DL-043) | **Resolved** — Program complete | Batches 1-4 closed 2026-08-23 |
| Blueprint Topic Alignment (P1/P2 cases) | **Taxonomy gap** — Not content defects | Extend TAXONOMY_REGISTRY.md |
| Reference Gaps (P2 descriptive refs) | **Allowlisted** via `p2UseDescriptiveReferences` | Implemented 2026-09-21 |
| Case Integrity Duplicate Choices | **Validator FP fixed** | CaseIntegrityValidator updated 2026-09-20 |
| MathematicalValidator | **0 findings** — 0% false positive rate | PASS |

**Net Actionable Warnings (post-allowlist): ~2,500** — primarily "only/exclusively" (legitimate technical usage) and ambiguity qualifiers requiring QID-level adjudication.

---

## 12. Governance Commitment

- **No bulk suppression** of warnings without QID-level allowlist entries
- **No release decision** based on aggregate warning counts
- **Quarterly triage review** with Psychometrician + Accountant
- **Allowlist entries expire** at 180 days — must be re-justified
- **New warning classes** require taxonomy classification before suppression

---

**Plan Owner:** Governance Validator / Release Manager
**Review Cycle:** Quarterly (aligned with Tier 2 debt review)
**Next Review:** 2026-12-23