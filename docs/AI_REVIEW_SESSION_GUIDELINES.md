# AI Review Session Guidelines

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md
**Generated:** 2026-07-24

---

## 1. Purpose

This document defines the rules that govern AI-assisted review sessions in the CMA Part 1 Exam Simulator repository. It ensures that every session is auditable, reversible, and clearly scoped — with analysis always preceding implementation.

---

## 2. Session Types

### 2.1 Analysis-Only Sessions

**Definition:** Read-only sessions that audit, scan, inventory, or verify. No content or code changes.

**Rules:**
- No writes to pack files, application code, or governance documents (except session reports).
- May produce reports in `reports/`.
- May flag findings in session output or append to logs.
- Must end with a REVISION_HISTORY.md entry stating "analysis only — no content changes."

**Example:** Session 55 (12-agent standardization audit).

### 2.2 Implementation Sessions

**Definition:** Sessions that modify content (packs, cases), application code (app.js, styles.css, index_updated.html), or governance state (question_state, certifications).

**Rules:**
- Must have explicit user authorization ("apply the fix", "make the change", "execute the write").
- Must follow backup protocol (BACKUP_PROTOCOL.md) — backup before every write.
- Must obey batch caps (max 30 items per governance-guard Rule 5).
- Must produce a REVISION_HISTORY.md entry with before/after counts.
- Must independently verify all changes (raw file/line evidence, no self-reported claims).

**Example:** Session 54 (AI Review Coach implementation in app.js).

### 2.3 Governance Sessions

**Definition:** Sessions that create or update documentation, governance files, policies, or folder organization. No content or scoring changes.

**Rules:**
- May create/update files in `docs/`, `governance/`, `knowledge/`.
- May reorganize non-runtime files into subfolders.
- Must log all changes in REVISION_HISTORY.md.
- Must verify that no runtime file was modified (baseline check).
- Must verify application still loads and passes tests after any reorganization.

---

## 3. Scope Boundaries

### 3.1 What AI May Do

| Activity | Requires Authorization? | Session Type |
|----------|------------------------|-------------|
| Read any file in the repository | No | Any |
| Run validation scripts (read-only) | No | Any |
| Generate audit reports | No | Analysis |
| Create/update documentation in `docs/` | No | Governance |
| Create/update governance in `governance/` | No | Governance |
| Reorganize non-runtime files | No | Governance |
| Modify pack files (content, state, metadata) | **Yes** | Implementation |
| Modify application code (app.js, styles.css, html) | **Yes** | Implementation |
| Change answer keys | **Yes** | Implementation |
| Change question_state | **Yes** | Implementation |
| Move runtime files | **Yes** | Governance |

### 3.2 What AI Must Never Do (Without Explicit Authorization)

- Delete questions, explanations, or case studies
- Renumber questions
- Reuse QuestionIDs
- Invent accounting standards or formulas
- Guess when uncertain
- Break backward compatibility
- Modify scoring without review
- Alter schema definitions

---

## 4. External Research Escalation

When AI encounters a question where the answer depends on an accounting standard outside its training data:

1. **Flag the question** — do not guess.
2. **State what is uncertain** — which standard, which interpretation.
3. **Recommend external verification** — which authoritative source to consult.
4. **Hold the item** — do not certify or change state.

The project's Source Hierarchy (PROJECT_CONSTITUTION.md §9) governs which sources are authoritative:
- TIER 1: Official IMA publications
- TIER 2: COSO frameworks
- TIER 3: Established accounting textbooks
- TIER 4: Professional publications
- TIER 5: General educational websites

---

## 5. Tone and Communication

### 5.1 Positive but Honest

- Report findings factually — do not minimize defects.
- Acknowledge uncertainty when confidence is below 90%.
- Never claim "complete" or "clean" without raw file/line evidence (per AGENTS.md §5).
- Separate findings from recommendations.

### 5.2 No Silent Changes

- Every content change must be traceable to a REVISION_HISTORY.md entry.
- Every defect fix must be traceable to a DEFECT_LIBRARY.md entry.
- Summary claims like "all clean" or "zero remaining" must be cross-checked against raw file/line counts.

---

## 6. Required Session Outputs

Every session (regardless of type) must produce:

| Output | Analysis | Implementation | Governance |
|--------|----------|---------------|------------|
| REVISION_HISTORY.md entry | Yes | Yes | Yes |
| Session report (if findings) | Yes | Yes | Optional |
| DEFECT_LIBRARY.md update (if new defect) | Yes | Yes | No |
| Backup files (if writes) | No | Yes | No |
| Baseline verification (no drift) | No | Yes | Yes |

---

## 7. Future Prompt Specification

Future sessions should specify their type in the prompt:

**Analysis-only prompt example:**
> "Run a read-only audit of Pack C Section C. No content changes. Produce a report with counts and findings."

**Implementation prompt example:**
> "Apply the DL-008 fix to P1-A-001 through P1-A-025. Clear ExplanationWrong[CorrectChoice]. Follow backup protocol."

**Governance prompt example:**
> "Create ROOT_FOLDER_POLICY.md in docs/. No content changes."

---

## 8. Multi-Agent Session Patterns

### 8.1 Audit Pattern (Analysis-Only)

```
Agent 1 (Scoping) → Agent 2-N (Parallel Pack Scans) → Agent N+1 (Synthesis)
```
All agents read-only. Synthesis agent produces consolidated report.

### 8.2 Repair Pattern (Implementation)

```
Agent 1 (Repair) → Agent 2 (Independent Verification)
```
Repair agent writes. Verification agent confirms with raw evidence. Batch cap: ≤30 items.

### 8.3 Certification Pattern (Implementation)

```
Agent 1 (CAQS Six-Dimension Verification) → Agent 2 (Metadata/Structural Check) → Agent 3 (Independent Re-Verification)
```
Certification agent verifies. Metadata agent checks fields. Re-verification agent confirms. Requires user authorization.

---

## 9. Session Closeout Requirements

Per AGENTS.md §12: **No staged findings.** Before session close:

1. Write REVISION_HISTORY.md entry (contemporaneous, not batched).
2. Log any new defect to DEFECT_LIBRARY.md.
3. Verify no runtime-file drift (if applicable).
4. Confirm backup files exist (if writes performed).

Findings discovered during a session must be logged before the session closes — never deferred to "next session."

---

## 10. References

- AGENTS.md: Standing instructions for all sessions
- BACKUP_PROTOCOL.md: `knowledge/BACKUP_PROTOCOL.md`
- Collaboration Matrix: `ai/COLLABORATION_MATRIX.md`
- Workflows: `ai/WORKFLOWS.md`
- Constitution: `knowledge/00_PROJECT_CONSTITUTION.md`
