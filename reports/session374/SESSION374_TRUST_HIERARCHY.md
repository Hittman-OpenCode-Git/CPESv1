# S374 — Methodology Trust Hierarchy

**Session:** S374 — Methodology Certification Board
**Date:** 2026-07-27
**Authority:** Framework v2 FULLY ADOPTED (RESTORED per S373)
**Program:** 800-Series Content Excellence & Trust Preservation

---

## Trust Hierarchy

Methods are ordered from most trusted (direct source evidence) to least trusted (proven false-positive producers). The critical lesson from DL‑029: **methodology quality outweighs defect volume**.

### Tier 1 — DIRECT SOURCE EVIDENCE (Immune to DL‑029)

**When to use:** Verifying any claim that would change a governance conclusion, defect count, or pack file content.

| Method | Mechanism | False-Positive Rate | Trust Evidence |
|--------|-----------|---------------------|----------------|
| **Raw-file line inspection** | `read_file` with offset/limit — direct, untransformed read | 0.0% (3 sessions) | Disproved 34/37 S821 DL-026 claims (S369); disproved 7/8 S361 DL-008 claims |
| **Function constructor parse** | Brace-aware object extraction → `new Function()` | 0.0% (3,300 test objects) | 32/32 governance guard PASS; 301→3 DL-008 false positives eliminated (S852) |

### Tier 2 — STRUCTURED EXTRACTION (Immune, derivative of Tier 1)

**When to use:** Automated pipelines, batch operations, index lookups. Must carry `sourceFileHashes` and `verificationMethod` metadata.

| Method | Mechanism | Dependency |
|--------|-----------|------------|
| **Object-level parse** | JSON.parse within brace-delimited boundaries | Must be extracted via Tier 1 first |
| **SHA-256 content hashing** | Deterministic hash over 11-field canonical content | Must be built from Tier 2 parse |
| **Registry query** | Pre-built hash-map index (O(1) lookup) | Must be built from Tier 1 inventory |

### Tier 3 — PATTERN MATCHING WITH BOUNDARIES (Safe when constrained)

**When to use:** Quick counts, initial surveys, candidate identification. Results must be verified by Tier 1 before any action that modifies pack files.

| Method | Condition Required | Without Condition |
|--------|-------------------|-------------------|
| **grep / Select-String** | Must pair with object-boundary cross-check per item | Count-only operations are safe (no per-item classification) |
| **Regex with object boundaries** | Must operate within a brace-delimited object; must not span boundaries | Becomes PROHIB-001: forward-scan producing false positives |

### Tier 4 — DERIVED ARTIFACTS (READ-ONLY CONSUMPTION)

**When to use:** Routing, queue management, planning. Must carry Tier 1 origin metadata. Never for content modification without Tier 1 re-verification.

| Method | Safety Requirement |
|--------|-------------------|
| **Manifest consumption** | Manifest must have been built by Tier 1 or Tier 2 extraction; must carry `verificationMethod`; must be fresh (< 1 session old). Before ANY write: re-verify each target item via Tier 1. |

---

## PROHIBITED — DO NOT USE

These methodologies have been **formally retired**. Any finding from them is presumed contaminated until independently verified by Tier 1.

### PROHIB-001: Forward-Scan Regex Without Object Boundaries

- **Defect class:** DL‑029
- **False-positive rate:** ~75% (Pack B/D) to ~92% (S821 claims)
- **Why it fails:** When `CorrectChoice` appears before `QuestionID` in the JSON object, the scanner matches the next item's CC
- **Incidents:** S852 (301 FP), S821 (34 FP), S361 (7 FP)
- **Replaced by:** APPROVED-002 (Function Constructor Parse) — read CC from within the object, not by scanning forward
- **Governance guard:** Tests 26–27 prove the old window-scan approach FAILS

### PROHIB-002: Window-Scan with Context-Window Overlap

- **Defect class:** DL‑029
- **False-positive rate:** 100% on Pack D items >3000 chars
- **Why it fails:** Window captures adjacent object fields when item size exceeds window or when window boundary falls mid-object
- **Incidents:** S852 Manifest, S821 Queue, S361 RB scan
- **Replaced by:** APPROVED-002 — extract complete object, no window-size constraint

### PROHIB-003: Manifest-Only Content Decisions

- **Defect class:** DL‑036 (routing divergence)
- **Why it fails:** Manifests are snapshots; source files evolve. DL‑029 proved manifests can be systematically contaminated.
- **Incidents:** S822 blocked promotion based on 77-item claim (3 genuine)
- **Replaced by:** Verify every target item against raw file via Tier 1 before any write operation

---

## The DL‑029 Lesson

DL‑029 was not a content defect. It was a **methodology defect** — a flaw in HOW we detected defects, not in the content itself.

| Artifact | Contaminated By | Impact | Resolution |
|----------|----------------|--------|------------|
| S852 Defect Manifest | PROHIB-001 | 301 false DL-008 entries | Regenerated via Tier 2 parse |
| S821 Remediation Queue | PROHIB-002 | 37 claims → 3 genuine | S369 ground truth audit |
| S361 Readiness Board | PROHIB-001/002 | 8 claims → 1 genuine | Raw-line inspection |
| S822 Adoption Review | PROHIB-003 | 77 claims blocked promotion | S373 restored FULLY ADOPTED |

**The operational rule:** Every session begins by verifying its methodology is DL‑029 immune. No scan-based claim is accepted without raw-file cross-check. Methodology quality is checked before content quality.

---

## Retirement Status

| Prohibited Method | Retired Date | Substitution Active | Scripts Rewritten | Governance Test |
|-------------------|-------------|--------------------|--------------------|----|
| PROHIB-001 (Forward-scan) | S852 (2026-07-27) | ✅ | s852_regenerate_manifest.js v2 | ✅ Tests 26–27 |
| PROHIB-002 (Window-scan) | S369 (2026-07-27) | ✅ | All S369+ agents use raw-line | ✅ Tests 26–27 |
| PROHIB-003 (Manifest-only) | S368 (2026-07-27) | ✅ | S369–S373 pattern established | ✅ Process gate |

---

*Generated by S374 Methodology Certification Board — Truth Agents A–F + Validation G–L + Retirement M–P + Approval Q–Z*
