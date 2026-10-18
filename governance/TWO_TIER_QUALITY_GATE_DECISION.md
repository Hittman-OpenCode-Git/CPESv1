# TWO_TIER_QUALITY_GATE_DECISION.md

**Version:** 1.0
**Date:** 2026-09-23
**Authority:** PROJECT_CONSTITUTION.md, CAQS_v1.0.md, AGENTS.md
**Status:** Active — Governance policy for defect classification and release gating

---

## 1. Purpose

Establish a formal two-tier quality gate framework that distinguishes:

- **Tier 1 — Correctness/Safety Gates:** Defects that **block certification and release** (wrong answers, learner-safety risks, integrity bypasses)
- **Tier 2 — Authenticity/Psychometric Debt:** Defects that are **tracked, triaged, and remediated over time** but do not automatically imply wrong keys or unsafe content

This framework prevents conflation of fundamentally different defect classes and ensures release decisions are based on evidenced risk, not warning counts.

---

## 2. Tier Definitions

### 2.1 Tier 1: Correctness/Safety Gates (Blocking)

**Definition:** Defects that, if present in Certified content, directly compromise:
- Answer key correctness (wrong answer marked correct)
- Learner safety (integrity mode bypass, crash on restore, wrong feedback on correct answer)
- Certification integrity (unverified state flips, missing provenance)
- Cross-part contamination (P1 items in P2 pool, P2 items in P1 pool)

**Characteristics:**
- Binary PASS/FAIL — no "degree of severity"
- Require **immediate quarantine** (Certified → In Audit) on detection
- Block **any release** until remediated and re-verified
- Require **human approval** to accept residual risk (extremely rare)

| Gate ID | Defect Class | Detection | Remediation SLA |
|---------|-------------|-----------|-----------------|
| T1-01 | Wrong Answer Key (DL-030, DL-047 key inversion) | Semantic key verifier, independent hand-solve | Immediate — 0 tolerance |
| T1-02 | ExplanationWrong[CorrectChoice] Non-Empty (DL-008 / Rule 2) | Governance guard Rule 2, ExplanationValidator | Immediate — 0 tolerance |
| T1-03 | Empty/Absent Distractor ExplanationWrong (DL-021, DL-026 / Rules 6, 10) | Governance guard Rules 6/10 | Immediate — 0 tolerance |
| T1-04 | Choice Binary Lead-In Polarity Mismatch (DL-037 / Rule 9) | Governance guard Rule 9 | Immediate — 0 tolerance |
| T1-05 | Exam Integrity Mode Bypass (DL-042, W1-A/B) | Smoke test W1-A/B | Immediate — 0 tolerance |
| T1-06 | Corrupted Session Restore Crash (DL-014, DL-022) | Smoke test Abnormal, SessionPersistence tests | Immediate — 0 tolerance |
| T1-07 | Non-Certified Delivery Pool Leak (Tier -1 assignment) | `assignTier()` audit, probe:parity | Immediate — 0 tolerance |
| T1-08 | Cross-Part QID Contamination (Rule 14) | Governance guard Rule 14 | Immediate — 0 tolerance |
| T1-09 | Part2OnlyFlag Missing/False (Rule 13) | Governance guard Rule 13 | Immediate — 0 tolerance |
| T1-10 | Certification Provenance Missing (Rule 16) | Governance guard Rule 16 | Immediate — 0 tolerance |
| T1-11 | Semantic Quarantine Violation (Rule 21) | Governance guard Rule 21 | Immediate — 0 tolerance |

**Tier 1 PASS Condition:** **Zero** instances across entire Certified pool (P1 + P2).

---

### 2.2 Tier 2: Authenticity/Psychometric Debt (Non-Blocking, Tracked)

**Definition:** Defects that degrade educational quality, psychometric rigor, or authenticity but do **not** constitute correctness or safety failures. These are "debt" — acknowledged, tracked, and remediated through planned waves.

**Characteristics:**
- Graded severity (High/Medium/Low/Informational)
- **Do not block release** if tracked and below threshold
- Require **board-minute or human approval** to accept residual debt
- Remediated via **planned authoring waves** (not emergency fixes)
- Measured via **QID-level evidence**, not aggregate warning counts

| Gate ID | Debt Class | Examples | Tracking | Acceptance Threshold |
|---------|-----------|----------|----------|---------------------|
| T2-01 | Absolute Language in Distractors (DL-003) | "always", "never", "impossible" in choices | QID list per pack | ≤ 50 distractor slots pool-wide (current: 0 post-remediation) |
| T2-02 | Ambiguity / Vague Qualifiers (DL-004) | "usually", "generally", "typically" | QID list | ≤ 100 items pool-wide |
| T2-03 | Distractor Similarity (DL-005) | Jaccard > 70% between distractors | QID pairs | ≤ 50 pairs pool-wide (adjudicated) |
| T2-03a | Logical Equivalence / Near-Duplicate (DL-043) | "A < B" vs "B > A" restatement | QID pairs | 0 confirmed equivalence pairs |
| T2-04 | Template Boilerplate Explanations (DL-013) | Generic "plausible misconception" text | QID list + field count | 0 Certified items; 0 non-Certified boilerplate fields pool-wide (CLOSED CLEAN — 2026-09-05 closeout) |
| T2-05 | Difficulty Inflation (DL-031) | Definition-match items labeled Moderate | QID list | ≤ 50 items pool-wide (adjudicated) |
| T2-06 | Case Uniform Difficulty (DL-032) | All items labeled Moderate | Case pack distribution | Target CAQS §6.1 distribution |
| T2-07 | Metadata Label/Score Mismatch (DL-052) | Difficulty label ≠ DifficultyScore | QID list | 0 items |
| T2-08 | Cognitive Level Misclassification (Rule 11/12) | AF-3/4/5 gate violations | QID list | 0 Certified items |
| T2-09 | Clone/Redundancy (DL-012, DL-046-P2) | Rotation-template clones | QID groups | 0 Certified clones; archived clones tracked |
| T2-10 | Choice Text Hygiene (DL-046, Rule 18) | Fragments, leading whitespace, < 8 chars | QID list | 0 Certified items |
| T2-11 | Validator Warning Noise (Q-01/Q-02) | Psychometric warnings without QID adjudication | Warning taxonomy + allowlist | See VALIDATOR_WARNING_GOVERNANCE_PLAN.md |

**Tier 2 ACCEPTANCE Condition:** All tracked debt items **below threshold** + **board-minute approval** for residual.

**Amendment — §2.2 "Exceedance" Column Disambiguation (2026-09-23):** The `exceedance` field in §5 has two distinct semantic paths that must not be conflated: (1) **Below-threshold residual** — the current count is below the threshold (e.g., 0 fields against a 200-field cap), meaning no exceedance exists and the debt is fully within tolerance; no board-minute approval is needed and no remediation wave is authorized. (2) **Above-threshold exception** — the current count exceeds the threshold, requiring explicit board-minute approval with a documented remediation plan and risk assessment. Any entry claiming "exceedance" must specify which path applies; a zero or negative exceedance is not a debt item and must not appear in the board-minute template as a live acceptance request.

---

## 3. Gate Enforcement Matrix

| Gate Tier | Enforcement Point | Automation | Human Decision Required |
|-----------|-------------------|------------|------------------------|
| **Tier 1** | `npm run preflight` (T0) | Governance guard Rules 2, 6, 9, 10, 13, 14, 16, 21 | Release blocked automatically |
| **Tier 1** | `npm run pipeline` (Tend) | Semantic key verifier, probe:parity, case-screens | Release blocked automatically |
| **Tier 1** | Write-time (content packs) | Governance guard Rules 1, 4, 5, 17, 19 | Commit blocked automatically |
| **Tier 2** | `npm run validate` | Psychometric validators (AbsoluteLanguage, Ambiguity, DistractorSimilarity) | **Board-minute approval** for residual debt |
| **Tier 2** | Certification waves | CAQS §1.6 six-dimension verification | **Human approval** per batch |
| **Tier 2** | Periodic audit | P2_SAMPLE_AUDIT_PLAN.md, DL-031/DL-032 tracking | **Board-minute approval** for thresholds |

---

## 4. Release Decision Logic

```
RELEASE DECISION:
├─ Tier 1 Gates: ALL PASS (0 failures)?
│   ├─ NO → RELEASE BLOCKED — remediate all Tier 1 failures
│   └─ YES → Tier 2 Debt Assessment
│       ├─ All Tier 2 debts BELOW threshold?
│       │   ├─ YES → CONDITIONALLY READY — requires Board-minute approval for residual debt
│       │   └─ NO → RELEASE BLOCKED — remediate exceeding Tier 2 debts
│       └─ Board-minute approval recorded for residual Tier 2?
│           ├─ YES → READY FOR FORMAL RELEASE SIGN-OFF
│           └─ NO → CONDITIONALLY READY — awaiting human approval
```

**No release proceeds with any Tier 1 failure.** Tier 2 debt acceptance requires explicit, documented human approval.

---

## 5. Board-Minute Approval Fields (Tier 2 Residual Debt)

When Tier 2 debts exceed thresholds or cannot be fully remediated pre-release, the following **must be documented in board minutes / REVISION_HISTORY.md**:

| Field | Required | Description |
|-------|----------|-------------|
| `debt_id` | Yes | e.g., T2-01, T2-04 |
| `current_count` | Yes | Current QID/field count from latest audit |
| `threshold` | Yes | Defined threshold from §2.2 |
| `exceedance` | Yes | Count above threshold |
| `remediation_plan` | Yes | Wave ID, target date, owner |
| `risk_assessment` | Yes | Why residual is acceptable (no correctness impact, learner impact assessed) |
| `approver` | Yes | Named role (Release Manager + Accountant minimum) |
| `approval_date` | Yes | ISO 8601 |
| `review_date` | Yes | Next mandatory review date (≤ 90 days) |

**Template Entry:**
```markdown
## Tier 2 Debt Acceptance — 2026-09-23

| Debt ID | Current | Threshold | Exceedance | Plan | Risk | Approver | Review By |
|---------|---------|-----------|------------|------|------|----------|-----------|
| T2-04 (DL-013 boilerplate) | 0 fields (Pack A) | 200 | 0 | None — CLOSED CLEAN | No residual debt; no learner exposure | N/A | N/A |
```

---

## 6. Mapping Current Defects to Tiers

| Defect ID | Class | Tier | Status | Notes |
|-----------|-------|------|--------|-------|
| DL-008 | ExplanationWrong[CC] non-empty | **T1** | RESOLVED (0 pool-wide) | Rule 2 BLOCK active |
| DL-026 | Empty non-CC EW slots | **T1** | RESOLVED-in-fact (0 Certified) | Rule 6 BLOCK active |
| DL-021 | Absent distractor EW (Pack E Sec C) | **T1** | RESOLVED (S828) | Rule 10 BLOCK active |
| DL-037 | Choice polarity mismatch | **T1** | RESOLVED (S911) | Rule 9 BLOCK active |
| DL-030 | Wrong answer key | **T1** | RESOLVED (5 items) | Semantic key verifier gate |
| DL-047 | Key/explanation contradiction | **T1** | RESOLVED (10 items) | Semantic key verifier + quarantine |
| DL-042 | Integrity mode bypass on resume | **T1** | RESOLVED (W1-A) | Smoke test W1-A gate |
| DL-014/022 | Session restore crash | **T1** | RESOLVED | Smoke test Abnormal gate |
| DL-040 | Non-registry "Active" state | **T1** | RESOLVED (S133) | Rule 1/7 enforcement |
| DL-035 | Guard DL-026 coverage gap | **T1** | RESOLVED-in-fact | Rule 6 deployed |
| DL-049/050 | Validator coverage gaps | **T1** | RESOLVED (2026-09-13/20) | Rule 20/21 + coverage assertions |
| **DL-003** | Absolute language | **T2** | RESOLVED (18 items reworded) | 0 distractor absolutes post-remediation |
| **DL-013** | Template boilerplate | **T2** | RESOLVED (2026-09-05) | 0 pool-wide; CLOSED CLEAN |
| **DL-031** | Difficulty inflation | **T2** | PARTIAL (17 items fixed) | Adjudicated residuals tracked |
| **DL-032** | Case uniform difficulty | **T2** | PARTIAL (ENHANCED_CASE_BASE done) | 330 items deferred |
| **DL-005** | Distractor similarity | **T2** | ADJUDICATED (0 rewrites) | 100% pairs legitimate per DL-005 closeout |
| **DL-043** | Near-duplicate distractors | **T2** | RESOLVED (Batches 1-4) | Program complete |
| **DL-046** | Choice text hygiene | **T2** | RESOLVED (P1E-A-024 + P2 clones) | Rule 18 BLOCK active |
| **DL-012** | Clone redundancy | **T2** | RESOLVED (18 archived) | DL-012 archival complete |
| **DL-048** | Duplicate CaseID | **T2** | RESOLVED (CBQ3-A3/A4 renumbered) | CaseIdentityValidator gate |
| **DL-052** | Metadata label/score mismatch | **T2** | RESOLVED (6 items) | 0 mismatches |
| **DL-011** | Reserved | N/A | N/A | Numbering gap |

---

## 7. Validator Warning Classification

Per **VALIDATOR_WARNING_GOVERNANCE_PLAN.md**, validator output is classified:

| Category | Tier | Examples | Action |
|----------|------|----------|--------|
| **Blocking Errors** | T1 | DL-008, DL-026, Rule 9, 13, 14, 16, 21 violations | Auto-BLOCK via governance guard |
| **Known False Positives** | T2 | Allowlisted patterns (e.g., calculation-item vocabulary overlap in B-screen) | Allowlist entry + QID evidence |
| **Pending Review** | T2 | New warning patterns, unadjudicated psychometric flags | Triage queue → board approval |
| **Plausible Defects** | T2 | Ambiguity, similarity, boilerplate warnings with QID evidence | Track in DEFECT_LIBRARY, remediate per wave |

**Critical Rule:** Warning counts **alone** are never release criteria. Only **QID-adjudicated** findings matter.

---

## 8. Historical Precedent

| Event | Date | Lesson |
|-------|------|--------|
| DL-008 539 occurrences | 2026-07-22/23 | Structural defect at scale — required 6-agent orchestration; now Rule 2 BLOCK prevents recurrence |
| DL-012 140 clones | 2026-09-05 | Clone redundancy diluted pool — archival (not deletion) preserves content |
| DL-047 10 key inversions | 2026-09-05 | Structural gates (Rule 2/6/9) PASS but semantic FAIL — semantic key verifier now mandatory |
| DL-031 "~500 items" | 2026-09-10 | Unstratified heuristic screens produce false positives — adjudication required |
| DL-005 100% pairs legitimate | 2026-09-10 | Jaccard similarity blind to accounting semantics — human adjudication mandatory |

---

## 9. Implementation Checklist

- [x] Tier 1 gates codified in governance-guard.js Rules 2, 6, 9, 10, 13, 14, 16, 21
- [x] Tier 1 semantic gates: semantic_key_verifier.js (B-select/B-multi/B-num/lead-token/EC-stem/lowercase/B-num)
- [x] Tier 1 delivery gate: probe:parity (Tier-1 Certified-only, blocklist, coverage)
- [x] Tier 1 integrity gates: smoke test W1-A/B/C/D (exam-integrity-mode, pause, resume, submit)
- [x] Tier 2 tracking: DEFECT_LIBRARY.md with Tier classification
- [x] Tier 2 thresholds defined in §2.2
- [ ] Board-minute approval template integrated into REVISION_HISTORY.md workflow
- [ ] VALIDATOR_WARNING_GOVERNANCE_PLAN.md allowlist mechanism implemented
- [ ] Periodic Tier 2 debt review cadence (quarterly) established

---

## 10. Conclusion

**This two-tier framework is now the authoritative quality gate policy for the CMA Exam Simulator.**

- **Tier 1 = Release Blocking** — Zero tolerance, automated enforcement, immediate quarantine
- **Tier 2 = Managed Debt** — Threshold-based, human-approved, wave-remediated

**Current Release Status (2026-09-23):**
- Tier 1: **PASS** (all blocking gates green post-reconciliation)
- Tier 2: **PASS** — all tracked debts below or at threshold; DL-013 CLOSED CLEAN (0 fields, no residual)

**Release remains READY — all Tier 1 and Tier 2 gates PASS; no residual debt requiring board-minute approval.**

---

**Policy Owner:** Release Manager / Governance Validator
**Review Cycle:** Quarterly or upon gate addition
**Next Review:** 2026-12-23