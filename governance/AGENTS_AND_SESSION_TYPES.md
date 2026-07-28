# Agents and Session Types

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md, AI_REVIEW_SESSION_GUIDELINES.md
**Generated:** 2026-07-24

---

## 1. Purpose

This document defines the types of AI-assisted sessions supported in the CMA Part 1 Exam Simulator repository, the agents (personas and subagents) that participate, and the rules that govern each session type. It ensures that every session is properly classified, scoped, and auditable.

---

## 2. Session Types

### 2.1 Analysis-Only Session

**Purpose:** Read-only audit, scan, inventory, or verification. No content or code changes.

**Authorization:** Not required (default mode per AGENTS.md §2).

**Agents:** explore, general, goal-verify.

**Outputs:**
- Session report in `reports/`
- REVISION_HISTORY.md entry (analysis-only)
- DEFECT_LIBRARY.md update if new defect discovered

**Rules:**
- Zero writes to pack files, application code, or governance state.
- May produce new files in `reports/` only.
- Must verify findings with raw file/line evidence.
- Must not self-report "complete" without source-level cross-check.

**Example prompt:**
> "Run a read-only audit of all Pack C Section E items. Scan for DL-008, DL-013, DL-026. No content changes. Produce a report with QID-level findings."

### 2.2 Implementation Session

**Purpose:** Modify content, application code, or governance state. Requires explicit authorization.

**Authorization:** Must include "apply the fix", "make the change", "execute the write", or equivalent.

**Agents:** general (task), goal-verify (verification).

**Outputs:**
- Modified pack/application files
- Backups in `backups/`
- REVISION_HISTORY.md entry with before/after counts
- Verification report from independent agent

**Rules:**
- Backup before every write (BACKUP_PROTOCOL.md).
- Batch cap ≤30 items per governance-guard Rule 5.
- Independent verification agent must confirm all changes.
- Must not exceed authorization scope.

**Example prompt:**
> "Apply the DL-008 fix to P1-A-001 through P1-A-025. Clear ExplanationWrong[CorrectChoice]. Follow backup protocol. Batch cap: 25 items."

### 2.3 Governance Session

**Purpose:** Create or update documentation, governance files, policies, or folder organization. No content or scoring changes.

**Authorization:** Not required for documentation. Required for file moves that affect application loading.

**Agents:** general.

**Outputs:**
- New/updated files in `docs/`, `governance/`, `knowledge/`
- REVISION_HISTORY.md entry
- Verification that no runtime file was modified

**Rules:**
- Zero changes to pack files, app.js, styles.css, index_updated.html.
- Must verify runtime-file hashes unchanged after session.
- Must verify app.js syntax (`node --check app.js`).
- Must update any stale cross-references.

**Example prompt:**
> "Create PROJECT_OVERVIEW.md in docs/. Include current architecture, item bank overview, baseline status. No content changes."

### 2.4 Certification Session

**Purpose:** Transition items from "In Audit" to "Certified" per CAQS §1.6 six-dimension verification.

**Authorization:** Must be explicitly authorized. Requires user approval per §1.7.2.

**Agents:** general (verification), general (metadata check), goal-verify (independent re-verification).

**Outputs:**
- Modified pack files (question_state changes)
- Backups in `backups/`
- REVISION_HISTORY.md entry with QID list, before/after counts, distractor tier map
- Verification report

**Rules:**
- All six CAQS dimensions must pass at HIGH confidence.
- DL-008 must be clean for all items (governance-guard Rule 2 BLOCK).
- CorrectChoice must be independently verified.
- User approval must be documented.

---

## 3. Agent Types and Their Roles

### 3.1 Personas (Defined in `ai/COLLABORATION_MATRIX.md`)

| Persona | Primary Authority | Session Types |
|----------|-------------------|---------------|
| Accountant | Accounting correctness | Audit, Certification |
| Editor | Language and readability | Editorial review |
| Psychometrician | Exam quality, difficulty | Audit, Certification |
| Case Author | Case studies | Case review |
| JavaScript Architect | Application code | Implementation |
| Validator | Validation | All types |
| Release Manager | Final approval | Certification closeout |

### 3.2 OpenCode Subagents

| Subagent | Best For | Session Types |
|----------|----------|---------------|
| `explore` | Fast file search, pattern matching, code discovery | Analysis, scoping |
| `general` | Complex multi-step tasks, content editing, batch processing | Implementation, Certification |
| `goal-verify` | Independent verification of completion claims | All types (verification phase) |

**Important:** Per SESSION_STATUS_2026-07-23.md §9, prefer `task` (general) agents over `delegate` for all work. `delegate` has been observed to fail silently on this project's file sizes (completes in <1s with empty output).

### 3.3 Multi-Agent Patterns

#### Audit Pattern (Analysis-Only)

```
Agent 1 (Scoping: explore)
  ↓
Agents 2–N (Parallel Pack Scans: general × N)
  ↓
Agent N+1 (Synthesis: general)
```

All read-only. Synthesis agent produces consolidated report.

#### Repair Pattern (Implementation)

```
Agent 1 (Repair: general)
  ↓
Agent 2 (Independent Verification: goal-verify)
```

Repair agent writes. Verification agent confirms with raw evidence.

#### Certification Pattern

```
Agent 1 (CAQS Six-Dimension: general)
  ↓
Agent 2 (Metadata/Structural: general)
  ↓
Agent 3 (Independent Re-Verification: goal-verify)
```

---

## 4. Session Lifecycle

### 4.1 Startup (T0)

Per AGENTS.md §9:
1. Read `reports/session_status/SESSION_STATUS_2026-07-23.md`.
2. Read `knowledge/REVISION_HISTORY.md` for most recent state.
3. Verify certified count via direct grep.
4. Cross-check open remediation proposals against current source state.
5. Determine session type.

### 4.2 Midpoint (Tmid)

For sessions exceeding 30 minutes or 3 agents (per AGENTS.md §13):
- Verify runtime-file hashes against CURRENT_BASELINES.md.
- Check Pack D CAPA: hash, parse-count, FD-045/FD-046, AD-075.
- If any check fails, halt all write agents and execute G1–G5 reconciliation.

### 4.3 Closeout (Tend)

Per AGENTS.md §12 — no staged findings:
1. Write REVISION_HISTORY.md entry (contemporaneous, not batched).
2. Log new defects to DEFECT_LIBRARY.md.
3. Verify no runtime-file drift.
4. Confirm backups exist (if writes performed).
5. Update SESSION_STATUS if state changed significantly.

---

## 5. Authorization Levels

| Action | Authorization Required? | Session Type |
|--------|------------------------|-------------|
| Read any file | No | Any |
| Run validation scripts | No | Any |
| Create docs in `docs/` | No | Governance |
| Create files in `governance/` | No | Governance |
| Write session reports in `reports/` | No | Any |
| Modify pack files (content) | **Yes** | Implementation |
| Modify pack files (question_state) | **Yes** | Certification |
| Modify application code | **Yes** | Implementation |
| Change answer keys | **Yes** | Implementation |
| Move runtime files | **Yes** | Governance |
| Delete files | **Yes (dedicated session)** | Governance |

---

## 6. Session Documentation Requirements

Every session must produce:

| Output | Analysis | Implementation | Governance | Certification |
|--------|----------|---------------|------------|---------------|
| REVISION_HISTORY.md entry | Yes | Yes | Yes | Yes |
| Session report | Yes (if findings) | Yes | Optional | Yes |
| DEFECT_LIBRARY.md update | Yes (if new defect) | Yes (if new defect) | No | No |
| Backup files | No | Yes | No | Yes |
| Baseline verification | No | Yes | Yes | Yes |
| Independent verification | No | Yes | No | Yes |

---

## 7. References

- AI Review Session Guidelines: `docs/AI_REVIEW_SESSION_GUIDELINES.md`
- Collaboration Matrix: `ai/COLLABORATION_MATRIX.md`
- Workflows: `ai/WORKFLOWS.md`
- AGENTS.md: Standing session instructions
- CAQS v1.0: `knowledge/CAQS_v1.0.md`
- Session Status: `reports/session_status/SESSION_STATUS_2026-07-23.md`
