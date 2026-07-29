# CMA Part 2 Exam Simulator — Repository Layout & Naming Standards

**Document ID:** P2002
**Status:** Draft — Architecture
**Date:** 2026-07-29
**Session:** P2-002
**Parent:** P2001_PART2_BLUEPRINT_FOUNDATION.md
**Based on:** CMA Part 1 Exam Simulator v2.1 repository structure
**Authoritative Source:** P2001 §6 — Technical Architecture Decisions

---

## a. Complete Directory Tree

```
CMA_Part_2_2026/                            (repository root)
│
├── .opencode/                              (OpenCode IDE tooling — per §11.2)
│   ├── .gitignore                          (ignore IDE internal state)
│   ├── agent/                              (subagent prompt definitions)
│   │   ├── governance-validator.md
│   │   └── ...                             (migrate + adapt from Part 1)
│   ├── Commands/                           (custom IDE slash commands)
│   ├── goals/                              (session goal state)
│   ├── plugins/                            (governance guard + other plugins)
│   │   └── governance-guard.js             (9 rules, forked from Part 1)
│   ├── skills/                             (project-level skill definitions)
│   │   ├── pre-delivery-safety-check.md
│   │   └── reconciliation-audit.md
│   └── session/                            (session-orchestration scripts)
│       └── ...
│
├── knowledge/                              (AI governance documents — §11.2)
│   ├── 00_PROJECT_CONSTITUTION.md          (adapted: Part 2 scope, authorities)
│   ├── AGENTS.md                           (standing instructions for AI sessions)
│   ├── CAQS_P2_v1.0.md                    (content & assessment quality standard)
│   ├── QUESTION_METADATA_STANDARD.md       (metadata schema, forked + adapted)
│   ├── TAXONOMY_REGISTRY_P2.md            (enumeration values for Part 2 domains)
│   ├── DEFECT_LIBRARY_P2.md               (empty — seeded for future defect tracking)
│   ├── CURRENT_BASELINES_P2.md            (empty — seeded for hash baselines)
│   ├── BACKUP_PROTOCOL.md                  (forked: backup-before-write rules)
│   ├── BUILD_TIME_VERIFICATION_STANDARD.md (forked: 6-dimension verification)
│   ├── REVISION_HISTORY.md                 (empty — seeded for change tracking)
│   └── PROMPT_GOVERNANCE_TEMPLATES.md      (forked: prompt templates for AI)
│
├── foundation/                             (authoritative reference documents — §11.2)
│   ├── EXAM_BLUEPRINT_P2.md               (Part 2 CSO blueprint — P2001 §5: Phase 0)
│   └── FORMULA_MASTER_P2.md               (40+ Part 2 formulas — P2001 §5: Phase 0)
│
├── ai/                                     (AI persona definitions — §11.2)
│   ├── COLLABORATION_MATRIX.md             (forked: authority boundaries)
│   ├── WORKFLOWS.md                        (forked: 8 standard workflows)
│   ├── TASK_TEMPLATES.md                   (forked: session task templates)
│   ├── accountant.md
│   ├── case_author.md
│   ├── editor.md
│   ├── javascript_architect.md
│   ├── psychometrician.md
│   ├── release_manager.md
│   ├── reviewer.md
│   ├── student.md
│   └── validator.md
│
├── review/                                 (decision trees, exam traps — §11.2)
│   ├── ACCOUNTING_DECISION_TREES.md        (Part 2 decision trees: NPV/IRR, CAPM, WACC, etc.)
│   ├── COMMON_EXAM_TRAPS.md                (Part 2 exam traps)
│   └── SECTION_AUDIT_PROTOCOL.md           (forked: audit workflow)
│
├── scripts/                                (validation, enrichment, utilities — §11.2)
│   ├── validate.js                         (forked: Part 2 domain validators)
│   ├── test_governance_guard.js            (forked: governance guard test suite)
│   ├── config.js                           (Part 2 config)
│   ├── validators/                         (validation modules)
│   │   ├── ExplanationValidator.js         (forked: string-aware brace-matcher)
│   │   ├── MathematicalValidator.js        (Part 2 formula validators)
│   │   └── ...                             (migrate + adapt from Part 1)
│   ├── output/                             (script-generated artifacts)
│   └── reports/                            (script-generated reports)
│
├── reports/                                (audit, session, certification reports — §11.2)
│   ├── session_status/                     (end-of-cycle handoff logs)
│   ├── defect_sweeps/                      (defect scan reports)
│   ├── remediation/                        (remediation proposals)
│   ├── certification/                      (certification batch reports)
│   ├── systematic_testing/                 (global certification reviews)
│   └── ...                                 (expand as sessions accumulate)
│
├── backups/                                (timestamped file backups — §11.2)
│   └── ...                                 (populated at first write)
│
├── p2/                                     (Part 2 planning documents — transient)
│   ├── P2001_PART2_BLUEPRINT_FOUNDATION.md (copied from Part 1 repo)
│   └── P2002_REPOSITORY_LAYOUT.md          (this document)
│
│
├── index_updated.html                      (application shell — forked + adapted)
├── app.js                                  (application engine — forked + adapted)
├── styles.css                              (application styles — forked, identical)
│
├── pack_p2_a.js                            (MCQ Pack A: Domain A — Financial Statement Analysis, 500 items)
├── pack_p2_b.js                            (MCQ Pack B: Domain B — Corporate Finance, 500 items)
├── pack_p2_c.js                            (MCQ Pack C: Domain C — Decision Analysis, 500 items)
├── pack_p2_d.js                            (MCQ Pack D: Domains D+E — Risk Management & Investment Decisions, 500 items)
├── pack_p2_e.js                            (MCQ Pack E: Domain F + Cross-domain, 500 items)
│
├── case_pack_p2_1.js                       (Case Pack 1: 25 cases, ~133 items)
├── case_pack_p2_2.js                       (Case Pack 2: 25 cases, ~133 items)
├── case_pack_p2_3.js                       (Case Pack 3: 25 cases, ~134 items)
│
├── package.json                            (npm config — forked + adapted)
├── package-lock.json                       (dependency lock)
├── opencode.json                           (OpenCode IDE config)
├── VERSION                                 (semantic version marker)
└── AGENTS.md                               (AI session standing instructions)
```

**Total directories in tree: 24** (including the root and all subdirectories shown above with actual content — excluding transient `p2/` which is removed post-planning).

---

## b. Pack Naming Standards

### b.1 MCQ Pack Files

| Pack | Filename | Primary Domain(s) | Items | Notes |
|------|----------|-------------------|-------|-------|
| A | `pack_p2_a.js` | A — Financial Statement Analysis | 500 | Single domain |
| B | `pack_p2_b.js` | B — Corporate Finance | 500 | Single domain |
| C | `pack_p2_c.js` | C — Decision Analysis | 500 | Single domain (largest — 25% exam weight) |
| D | `pack_p2_d.js` | D — Risk Management + E — Investment Decisions | 500 | Dual domain (250+250) |
| E | `pack_p2_e.js` | F — Professional Ethics + Cross-domain | 500 | Dual purpose (375+125) |

**Rationale:**

| Part 1 Pattern | Part 2 Pattern | Difference |
|----------------|---------------|------------|
| `pack_a_corrected.js` | `pack_p2_a.js` | Adds `p2_` prefix for explicit Part 2 labeling; drops `_corrected` suffix (all Part 2 packs are authored under governance guard from day one) |
| `pack_b_corrected.js` | `pack_p2_b.js` | Same transformation |
| `pack_c_corrected.js` | `pack_p2_c.js` | Same transformation |
| `pack_d_corrected.js` | `pack_p2_d.js` | Same transformation |
| `pack_e_corrected.js` | `pack_p2_e.js` | Same transformation |

**Design decisions:**
1. **`_corrected` suffix dropped.** Part 1 used this suffix because packs underwent post-hoc correction. Part 2 is authored cleanly from day one with governance guard active — no correction pass needed. Files are correct by construction.
2. **`p2_` infix included.** Prevents any accidental cross-contamination if files are ever copied or referenced across repos. Makes the Part 2 identity explicit in every filename.
3. **Domain-to-pack mapping follows P2001 §2 table exactly.**

### b.2 Case Pack Files

| Pack | Filename | Cases | Items (est.) | Section Distribution |
|------|----------|-------|--------------|---------------------|
| 1 | `case_pack_p2_1.js` | 25 | ~133 | A:6, B:5, C:6, D:3, E:3, F:2 |
| 2 | `case_pack_p2_2.js` | 25 | ~133 | A:4, B:5, C:6, D:3, E:2, F:5 |
| 3 | `case_pack_p2_3.js` | 25 | ~134 | A:5, B:5, C:6, D:2, E:2, F:5 |

**Rationale:**

| Part 1 Pattern | Part 2 Pattern | Difference |
|----------------|---------------|------------|
| `case_pack_1_corrected.js` | `case_pack_p2_1.js` | Adds `p2_` infix; drops `_corrected` suffix |
| `case_pack_2_corrected.js` | `case_pack_p2_2.js` | Same transformation |
| `case_pack_3_corrected.js` | `case_pack_p2_3.js` | Same transformation |

**Design decisions:**
1. **3 packs × 25 cases = 75 cases** (matching P2001 §3 target).
2. **No `_corrected` suffix** — same rationale as MCQ packs.
3. **3 packs vs. Part 1's 5 `scored_cases.js` files.** Part 1 evolved with 5 scored_cases files plus 3 consolidated case_pack files. Part 2 starts with exactly 3 clean files from day one — no migration or consolidation needed.

---

## c. Case Naming Standards

### c.1 CaseID Format

**Pattern:** `CBQ2{PackNum}-{Section}{Seq}`

**Regex:** `^CBQ2\d?-[A-F]\d+$`

| Component | Description | Examples |
|-----------|-------------|----------|
| `CBQ` | Literal prefix — "CMA Board Question" | All cases |
| `2` | Exam Part identifier | Always `2` for Part 2 |
| `{PackNum}` | Case pack number (omitted for pack 1) | `""` (pack 1), `2` (pack 2), `3` (pack 3) |
| `-` | Separator | Required |
| `{Section}` | Domain letter A through F | `A` through `F` |
| `{Seq}` | Sequential integer within section | `1`, `2`, `3`, ... |

**Examples:**

| CaseID | Pack | Section | Sequence |
|--------|------|---------|----------|
| `CBQ2-A1` | Pack 1 | Financial Statement Analysis | 1st case in Section A |
| `CBQ2-C6` | Pack 1 | Decision Analysis | 6th case in Section C |
| `CBQ22-B5` | Pack 2 | Corporate Finance | 5th case in Section B |
| `CBQ23-F2` | Pack 3 | Professional Ethics | 2nd case in Section F |

**Collision analysis with Part 1:**

| Part 1 Pattern | Part 2 Pattern | Collision Risk |
|---------------|---------------|----------------|
| `CBQ` | `CBQ2` | **None.** Part 1 uses `CBQ` prefix (no digit) or `CBQ{N}` where N ≥ 2 for later packs. The leading `2` digit immediately after `CBQ` is reserved for Part 2 and not present in any Part 1 case ID. |
| `CBQ3-A1` | `CBQ2` | **None.** 3 ≠ 2. |
| `CBQ4-A1` | `CBQ2` | **None.** 4 ≠ 2. |

### c.2 ItemID Format

**Pattern:** `{CaseID}-Q{N}`

**Regex:** `^CBQ2\d?-[A-F]\d+-Q\d+$`

**Examples:**

| ItemID | CaseID | Position |
|--------|--------|----------|
| `CBQ2-A1-Q1` | `CBQ2-A1` | First item in the case |
| `CBQ2-A1-Q5` | `CBQ2-A1` | Fifth item |
| `CBQ22-B5-Q3` | `CBQ22-B5` | Third item |

### c.3 ExhibitID Format

**Pattern:** `{CaseID}-E{N}`

**Regex:** `^CBQ2\d?-[A-F]\d+-E\d+$`

**Examples:**

| ExhibitID | CaseID | Type |
|-----------|--------|------|
| `CBQ2-A1-E1` | `CBQ2-A1` | First exhibit |
| `CBQ2-A1-E2` | `CBQ2-A1` | Second exhibit |
| `CBQ22-C3-E1` | `CBQ22-C3` | First exhibit |

---

## d. QID Standards

### d.1 QID Format

**Pattern:** `P2-{Section}-{NNN}`

**Regex validation pattern:** `^P2-[A-F]-\d{3}$`

| Component | Description | Examples |
|-----------|-------------|----------|
| `P2` | Exam Part identifier | Always `P2` for Part 2 |
| `-` | Separator | Required |
| `{Section}` | Domain letter A through F | `A` through `F` |
| `-` | Separator | Required |
| `{NNN}` | Zero-padded 3-digit sequence number | `001` through `500` |

**Full regex (with constraint range):** `^P2-[A-F]-(0[0-9]{2}|[1-4][0-9]{2}|500)$`

### d.2 Section Ranges Per Pack

| Pack | Domain(s) | QID Range | Count |
|------|-----------|-----------|-------|
| `pack_p2_a.js` | A | `P2-A-001` through `P2-A-500` | 500 |
| `pack_p2_b.js` | B | `P2-B-001` through `P2-B-500` | 500 |
| `pack_p2_c.js` | C | `P2-C-001` through `P2-C-500` | 500 |
| `pack_p2_d.js` | D | `P2-D-001` through `P2-D-250` | 250 |
| `pack_p2_d.js` | E | `P2-E-001` through `P2-E-250` | 250 |
| `pack_p2_e.js` | F | `P2-F-001` through `P2-F-375` | 375 |
| `pack_p2_e.js` | Cross-domain | `P2-F-376` through `P2-F-500` | 125 |

**Total: 2,500 MCQs**

### d.3 QID Format Comparison — Part 1 vs. Part 2

| Property | Part 1 | Part 2 |
|----------|--------|--------|
| Prefix | `P1` (pack A) or `P1B`/`P1C`/`P1D`/`P1E` (other packs) | `P2` (all packs — uniform) |
| Separator | `-` | `-` |
| Section format | `A` through `F` | `A` through `F` (same) |
| Number format | `NNN` (3-digit zero-padded) | `NNN` (3-digit zero-padded) |
| Regex | Varies per pack (legacy) | `^P2-[A-F]-\d{3}$` (uniform) |

**Design decision:** Part 2 uses a **uniform QID format** across all 5 packs (`P2-{Section}-{NNN}`). Part 1's per-pack letter variation (`P1B-`, `P1C-`, etc.) was a legacy artifact of the original authoring pipeline and is not replicated. Uniform format simplifies:
- Cross-pack scanning tools
- QID parsing (single regex)
- Registry generation
- Learner-facing question references

### d.4 Naming Collision Prevention — Part 1 vs. Part 2 QIDs

| Dimension | Part 1 | Part 2 | Collision? |
|-----------|--------|--------|------------|
| Prefix | `P1` or `P1{B,C,D,E}` | `P2` | **No.** `P1` ≠ `P2`. Second character is digit 1 vs. digit 2. |
| Section | A–F | A–F (same) | Not applicable — prefix distinguishes. |
| Segment | 3-digit padded number | 3-digit padded number | Not applicable — prefix distinguishes. |

**Exhaustive collision verification:**
- `P1-A-001` vs. `P2-A-001` — different prefix digits — no collision.
- `P1B-F-150` vs. `P2-F-150` — `P1B-` starts with `P1`, `P2-` starts with `P2` — no collision.
- Any P1 QID starts with `P1`; any P2 QID starts with `P2` — prefix disambiguates all.

---

## e. Versioning Standards

### e.1 Semantic Versioning Rules

All version numbers use **SemVer 2.0.0** format: `MAJOR.MINOR.PATCH`

| Scope | Version Field | Initial Value | Increment Rule |
|-------|--------------|---------------|----------------|
| Repository | `VERSION` file | `0.1.0-alpha` | MAJOR: architectural breaking change; MINOR: new feature/content; PATCH: fix/repair |
| MCQ pack | `pack_version` field in each pack file | `"1.0"` | Increment on any batch write to that pack |
| Case pack | `Version` field in each case object | `"1.0"` | Increment on any case revision |
| Individual item | `Version` field (if present) | `"1.0"` | Increment on item edit |

### e.2 Pack Version Guidelines

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| First creation | `"1.0"` | Initial empty pack |
| Certification batch applied to items | `"1.1"` → `"1.2"` → ... | PATCH bump |
| Rewrite/remediation of items | `"1.3"` → `"1.4"` → ... | PATCH bump |
| Structural schema change | `"2.0"` | MAJOR bump |
| Domain reassignment | `"2.0"` | MAJOR bump |
| Answer key correction | `"1.N"` → `"1.N+1"` | PATCH bump |

### e.3 Repository VERSION File

```
# Version
0.1.0-alpha

# Build
2026.07.29.001

# Release Track
Alpha

# Phase
Pre-Flight
```

The repository VERSION file is the single source of truth for the overall project build number. It follows the format established in Part 1.

### e.4 Case-Level Versioning

Each case object carries `Version` and `RevisionHistory` fields as defined in `QUESTION_METADATA_STANDARD.md`:

```jsonc
{
  "CaseID": "CBQ2-A1",
  "Version": "1.2",
  "RevisionHistory": [
    { "Date": "2026-08-01", "Version": "1.0", "Author": "Case Author", "Summary": "Initial creation" },
    { "Date": "2026-08-15", "Version": "1.1", "Author": "Accountant", "Summary": "Corrected NPV calculation in Q3" },
    { "Date": "2026-08-22", "Version": "1.2", "Author": "Editor", "Summary": "Revised WACC exhibit for clarity" }
  ]
}
```

---

## f. File Organization Rules

### f.1 Root Directory

Per `00_PROJECT_CONSTITUTION.md` §11 conventions (applied to Part 2), the repository root shall contain **only files required to run the application.**

**Permitted root-level files:**

| File | Purpose |
|------|---------|
| `index_updated.html` | Application HTML shell |
| `app.js` | Application engine (Part 2 adapted fork) |
| `styles.css` | Application stylesheet |
| `pack_p2_a.js` | MCQ Pack A |
| `pack_p2_b.js` | MCQ Pack B |
| `pack_p2_c.js` | MCQ Pack C |
| `pack_p2_d.js` | MCQ Pack D |
| `pack_p2_e.js` | MCQ Pack E |
| `case_pack_p2_1.js` | Case Pack 1 |
| `case_pack_p2_2.js` | Case Pack 2 |
| `case_pack_p2_3.js` | Case Pack 3 |
| `package.json` | npm project configuration |
| `package-lock.json` | Dependency lock file |
| `opencode.json` | OpenCode IDE configuration |
| `VERSION` | Semantic version marker |
| `AGENTS.md` | AI session standing instructions |

**Prohibited root-level files:**
- Backup files (`.bak`, `.bakN`)
- Ad-hoc utility scripts (`_*.js`, `check_*.js`, etc.)
- Temp files (`temp_*.txt`, `temp_*.js`)
- Audit reports, markdown reports, JSON manifests

### f.2 Subfolder Organization

| Subfolder | Purpose | File Types |
|-----------|---------|------------|
| `.opencode/` | OpenCode IDE tooling | Plugins, agent prompts, skills, commands, goals |
| `knowledge/` | AI governance: constitution, standards, defect library, taxonomy | `.md` documents |
| `foundation/` | Authoritative references: exam blueprint, formula master | `.md` documents |
| `ai/` | AI collaboration matrix, persona definitions, workflows | `.md` documents |
| `review/` | Decision trees, exam traps, review protocols | `.md` documents |
| `scripts/` | Validation, enrichment, and utility scripts | `.js`, `.json` |
| `scripts/validators/` | Modular validator engine | `.js` |
| `scripts/output/` | Script-generated artifacts | `.json`, `.csv`, `.md` |
| `scripts/reports/` | Script-generated reports | `.md`, `.json` |
| `reports/` | Audit reports, session reports, certification reports | `.md`, `.json` |
| `reports/session_status/` | End-of-cycle handoff logs | `.md` |
| `reports/defect_sweeps/` | Defect scan reports | `.md` |
| `reports/remediation/` | Remediation proposals and execution records | `.md` |
| `backups/` | Timestamped file backups | `.bak-YYYYMMDDHHMMSS` |

### f.3 Enforcement

Before any release or commit:
- All backup files shall be in `backups/`
- All utility scripts shall be in `scripts/`
- All reports shall be in `reports/`
- No ad-hoc scripts, temp files, or reports shall remain in the root directory

---

## g. Initialization Checklist (Phase 0 — Repo Creation Day)

### g.1 Repository Scaffold

- [ ] Create new repository `CMA_Part_2_2026` (separate from Part 1)
- [ ] Initialize git repository
- [ ] Create `.gitignore` with Part 1 patterns

### g.2 Root-Level Files (Empty or Seeded)

- [ ] Create `VERSION` with initial content: `0.1.0-alpha` / `2026.07.29.001` / `Alpha` / `Pre-Flight`
- [ ] Create `AGENTS.md` — adapt from Part 1's AGENTS.md
- [ ] Create `opencode.json` — adapt from Part 1's opencode.json
- [ ] Create `package.json` — minimal npm config
- [ ] Create empty `package-lock.json`
- [ ] Fork `index_updated.html` from Part 1 (Part 2 adapted: domain labels, case count, exam config)
- [ ] Fork `app.js` from Part 1 (~70% reusable, 30% Part 2-specific config)
- [ ] Fork `styles.css` from Part 1 (identical — shared UI framework)

### g.3 MCQ Pack File Creation

- [ ] Create `pack_p2_a.js` — initialize as `var pack_p2_a_questions = [];`
- [ ] Create `pack_p2_b.js` — initialize as `var pack_p2_b_questions = [];`
- [ ] Create `pack_p2_c.js` — initialize as `var pack_p2_c_questions = [];`
- [ ] Create `pack_p2_d.js` — initialize as `var pack_p2_d_questions = [];`
- [ ] Create `pack_p2_e.js` — initialize as `var pack_p2_e_questions = [];`

Each file shall contain:
```javascript
// CMA Part 2 Exam Simulator — Pack {Letter}
// Domain(s): {Domain Label(s)}
// Generated: 2026-07-29
// Governance State: Unprocessed (all items)
// Architecture: Single-object (one JSON object per MCQ item)
var pack_p2_{letter}_questions = [];
```

### g.4 Case Pack File Creation

- [ ] Create `case_pack_p2_1.js` — initialize as `var casePackP2_1 = [];`
- [ ] Create `case_pack_p2_2.js` — initialize as `var casePackP2_2 = [];`
- [ ] Create `case_pack_p2_3.js` — initialize as `var casePackP2_3 = [];`

### g.5 Knowledge Directory

- [ ] Create `knowledge/00_PROJECT_CONSTITUTION.md` — adapt from Part 1 (Part 2 scope, authorities, immutable rules)
- [ ] Create `knowledge/CAQS_P2_v1.0.md` — adapt CAQS v1.0 (Part 2 domains, authorities, Dimension 6 → "Part 2 Relevance")
- [ ] Create `knowledge/QUESTION_METADATA_STANDARD.md` — forked from Part 1 (single-object schema from §2 of P2001)
- [ ] Create `knowledge/TAXONOMY_REGISTRY_P2.md` — Part 2 domain enums (A–F with Part 2 topics)
- [ ] Create `knowledge/DEFECT_LIBRARY_P2.md` — empty, seeded with header and template only
- [ ] Create `knowledge/CURRENT_BASELINES_P2.md` — empty, seeded with header and sections for hash baselines
- [ ] Create `knowledge/BACKUP_PROTOCOL.md` — forked from Part 1 (identical rules)
- [ ] Create `knowledge/BUILD_TIME_VERIFICATION_STANDARD.md` — forked (rename Dimension 6)
- [ ] Create `knowledge/REVISION_HISTORY.md` — empty, seeded with Phase 0 header entry
- [ ] Create `knowledge/PROMPT_GOVERNANCE_TEMPLATES.md` — forked

### g.6 Foundation Directory

- [ ] Create `foundation/EXAM_BLUEPRINT_P2.md` — IMA Part 2 Content Specification Outline mapping
- [ ] Create `foundation/FORMULA_MASTER_P2.md` — 40+ Part 2 formulas with canonical names

### g.7 AI Directory

- [ ] Copy `ai/COLLABORATION_MATRIX.md` from Part 1
- [ ] Copy `ai/WORKFLOWS.md` from Part 1
- [ ] Copy `ai/TASK_TEMPLATES.md` from Part 1
- [ ] Copy all 9 persona files (`accountant.md`, `case_author.md`, etc.) from Part 1

### g.8 Review Directory

- [ ] Create `review/ACCOUNTING_DECISION_TREES.md` — Part 2 decision trees (NPV/IRR, CAPM, WACC, ratio analysis, ERM, ethics)
- [ ] Create `review/COMMON_EXAM_TRAPS.md` — Part 2 exam traps
- [ ] Copy `review/SECTION_AUDIT_PROTOCOL.md` from Part 1

### g.9 .opencode Directory

- [ ] Copy `.opencode/plugins/governance-guard.js` from Part 1 (9 rules, all generalize)
- [ ] Copy `.opencode/skills/pre-delivery-safety-check.md` from Part 1
- [ ] Copy `.opencode/skills/reconciliation-audit.md` from Part 1
- [ ] Copy `.opencode/agent/` contents from Part 1
- [ ] Copy `.opencode/Commands/` from Part 1

### g.10 Scripts Directory

- [ ] Copy `scripts/validators/ExplanationValidator.js` from Part 1 (string-aware brace-matcher)
- [ ] Copy `scripts/test_governance_guard.js` from Part 1
- [ ] Copy `scripts/test_session_recovery.js` from Part 1
- [ ] Create `scripts/config.js` with Part 2 configuration:
  ```javascript
  module.exports = {
    examPart: 2,
    domains: ['A', 'B', 'C', 'D', 'E', 'F'],
    domainNames: {
      A: 'Financial Statement Analysis',
      B: 'Corporate Finance',
      C: 'Decision Analysis',
      D: 'Risk Management',
      E: 'Investment Decisions',
      F: 'Professional Ethics'
    },
    mcqPacks: ['pack_p2_a', 'pack_p2_b', 'pack_p2_c', 'pack_p2_d', 'pack_p2_e'],
    casePacks: ['case_pack_p2_1', 'case_pack_p2_2', 'case_pack_p2_3'],
    qidPattern: /^P2-[A-F]-\d{3}$/,
    caseIdPattern: /^CBQ2\d?-[A-F]\d+$/,
    totalTargetMCQs: 2500,
    totalTargetCases: 75
  };
  ```
- [ ] Create `scripts/validate.js` — Part 2 adapted validator entry point

### g.11 Subfolder Creation (Empty Directories)

- [ ] Create `reports/session_status/` (empty — first session writes first log)
- [ ] Create `reports/defect_sweeps/` (empty)
- [ ] Create `reports/remediation/` (empty)
- [ ] Create `reports/certification/` (empty)
- [ ] Create `reports/systematic_testing/` (empty)
- [ ] Create `backups/` (empty)
- [ ] Create `scripts/output/` (empty)
- [ ] Create `scripts/reports/` (empty)

### g.12 Governance Verification (Post-Scaffold)

- [ ] Verify governance guard loads without errors: `node .opencode/plugins/governance-guard.js --self-test`
- [ ] Verify governance guard test suite passes: `node scripts/test_governance_guard.js`
- [ ] Verify application loads without JS errors: open `index_updated.html` in browser, check console
- [ ] Verify empty pack files parse correctly (no syntax errors)
- [ ] Verify empty case pack files parse correctly
- [ ] Verify QID regex matches expected P2 patterns
- [ ] Verify CaseID regex matches expected CBQ2 patterns
- [ ] Confirm zero collision between Part 1 and Part 2 identifier spaces

---

## h. Naming Collision Prevention — Exhaustive Rules

### h.1 Prefix Disambiguation

| Scope | Part 1 Prefix | Part 2 Prefix | Collision? |
|-------|--------------|--------------|------------|
| MCQ QID | `P1` (or `P1B`/`P1C`/`P1D`/`P1E`) | `P2` | **No** — digit `1` vs. `2` in second position |
| Case CaseID | `CBQ` | `CBQ2` | **No** — `2` digit immediately after `CBQ` |
| Case pack files | `case_pack_1_corrected.js` | `case_pack_p2_1.js` | **No** — `_p2_` infix |
| MCQ pack files | `pack_a_corrected.js` | `pack_p2_a.js` | **No** — `_p2_` infix |
| Application JS | `app.js` | `app.js` (separate repo) | **No** — separate repository |

### h.2 Identifier Space Partitioning

The identifier space is partitioned by exam part at the second character position:

```
Position:  0  1  2  3  4  5  6  7  8  9 ...
           ───┬───
Part 1:    P  1  -  A  -  0  0  1
Part 2:    P  2  -  A  -  0  0  1
           ───┬───
Case 1:    C  B  Q  -  A  1
Case 2:    C  B  Q  2  -  A  1
```

**Rule:** The character immediately following the identifying prefix (`P` for MCQs, `CBQ` for cases) is the exam part digit (`1` or `2`). All tooling and scanners shall use this character for exam part routing.

### h.3 Regex Part-Routing Rules

**Universal QID router:**
```javascript
function routeQID(qid) {
  if (/^P1[A-E]?-[A-F]-\d{3}$/.test(qid)) return 'Part1';
  if (/^P1[A-E]?-E-R\d{2}$/.test(qid)) return 'Part1';  // R-series
  if (/^P2-[A-F]-\d{3}$/.test(qid)) return 'Part2';
  throw new Error(`Unknown QID format: ${qid}`);
}
```

**Universal CaseID router:**
```javascript
function routeCaseID(caseId) {
  if (/^CBQ\d?-[A-F]\d+$/.test(caseId)) return 'Part1';
  if (/^CBQ2\d?-[A-F]\d+$/.test(caseId)) return 'Part2';
  throw new Error(`Unknown CaseID format: ${caseId}`);
}
```

### h.4 File-Level Collision Prevention

All pack files include a `Part` field (`"Part": 2` for all Part 2 items) as explicit metadata. This guarantees that even if files were accidentally mixed across repositories (e.g., a Part 1 pack loaded into Part 2 engine), the runtime can detect and reject mismatched content.

```jsonc
{
  "Part": 2,
  "Section": "A",
  "QuestionID": "P2-A-001",
  // ...
}
```

### h.5 Cross-Repository Prevention

| Scenario | Prevention Mechanism |
|----------|---------------------|
| Part 1 pack loaded in Part 2 engine | `"Part": 2` field check rejects `"Part": 1` items |
| Part 2 pack loaded in Part 1 engine | `"Part": 1` field check rejects `"Part": 2` items |
| Same QID in both repos | Prefixed `P1` vs. `P2` — different strings |
| Same CaseID in both repos | Prefixed `CBQ` vs. `CBQ2` — different strings |
| File overwrite during copy | `_p2_` infix prevents filename collision |
| Accidental git merge | Separate repositories — no shared git history |

---

## Appendix A: Quick Reference Card

| Element | Pattern | Regex | Example |
|---------|---------|-------|---------|
| MCQ QID | `P2-{Section}-{NNN}` | `^P2-[A-F]-\d{3}$` | `P2-A-001` |
| CaseID (pack 1) | `CBQ2-{Section}{Seq}` | `^CBQ2-[A-F]\d+$` | `CBQ2-A1` |
| CaseID (pack 2+) | `CBQ2{PackNum}-{Section}{Seq}` | `^CBQ2[2-9]-[A-F]\d+$` | `CBQ22-B5` |
| ItemID | `{CaseID}-Q{N}` | `^CBQ2\d?-[A-F]\d+-Q\d+$` | `CBQ2-A1-Q3` |
| ExhibitID | `{CaseID}-E{N}` | `^CBQ2\d?-[A-F]\d+-E\d+$` | `CBQ2-A1-E1` |
| MCQ pack file | `pack_p2_{letter}.js` | `^pack_p2_[a-e]\.js$` | `pack_p2_a.js` |
| Case pack file | `case_pack_p2_{n}.js` | `^case_pack_p2_[1-3]\.js$` | `case_pack_p2_1.js` |
| Repository VERSION | SemVer 2.0.0 | `^\d+\.\d+\.\d+(-alpha|-beta)?$` | `0.1.0-alpha` |
| Backup file | `*.bak-YYYYMMDDHHMMSS` | `\.bak-\d{14}$` | `pack_p2_a.js.bak-20260801120000` |

---

## Appendix B: Part 1 → Part 2 File Migration Map

For each shared asset, the migration path from Part 1 to Part 2:

| Part 1 Source | Part 2 Destination | Action |
|---------------|-------------------|--------|
| `.opencode/plugins/governance-guard.js` | `.opencode/plugins/governance-guard.js` | **Copy** (all 9 rules generalize) |
| `.opencode/skills/pre-delivery-safety-check.md` | `.opencode/skills/pre-delivery-safety-check.md` | **Copy** (adapt domain labels) |
| `.opencode/skills/reconciliation-audit.md` | `.opencode/skills/reconciliation-audit.md` | **Copy** (adapt pack names) |
| `.opencode/agent/*.md` | `.opencode/agent/*.md` | **Copy** (all generalize) |
| `scripts/validators/ExplanationValidator.js` | `scripts/validators/ExplanationValidator.js` | **Copy** (string-aware matcher generalizes) |
| `scripts/test_governance_guard.js` | `scripts/test_governance_guard.js` | **Copy** (adapt domain validators) |
| `scripts/test_session_recovery.js` | `scripts/test_session_recovery.js` | **Copy** (generic — no domain dependency) |
| `knowledge/BACKUP_PROTOCOL.md` | `knowledge/BACKUP_PROTOCOL.md` | **Copy** (identical rules) |
| `knowledge/BUILD_TIME_VERIFICATION_STANDARD.md` | `knowledge/BUILD_TIME_VERIFICATION_STANDARD.md` | **Copy** (rename Dimension 6) |
| `ai/COLLABORATION_MATRIX.md` | `ai/COLLABORATION_MATRIX.md` | **Copy** (authorities differ per domain) |
| `ai/WORKFLOWS.md` | `ai/WORKFLOWS.md` | **Copy** (identical workflows) |
| `ai/*.md` (9 persona files) | `ai/*.md` | **Copy** (personas generalize) |
| `review/SECTION_AUDIT_PROTOCOL.md` | `review/SECTION_AUDIT_PROTOCOL.md` | **Copy** (adapt Part 2 references) |
| `knowledge/CAQS_v1.0.md` | `knowledge/CAQS_P2_v1.0.md` | **Adapt** (rename, Part 2 domains, new authorities per §4 of P2001) |
| `knowledge/00_PROJECT_CONSTITUTION.md` | `knowledge/00_PROJECT_CONSTITUTION.md` | **Adapt** (Part 2 scope, modified immutable rules) |
| `knowledge/QUESTION_METADATA_STANDARD.md` | `knowledge/QUESTION_METADATA_STANDARD.md` | **Adapt** (single-object schema, P2 domain enums) |
| `knowledge/TAXONOMY_REGISTRY.md` | `knowledge/TAXONOMY_REGISTRY_P2.md` | **Adapt** (Part 2 domain enums, new formula refs) |
| `foundation/EXAM_BLUEPRINT.md` | `foundation/EXAM_BLUEPRINT_P2.md` | **New** (from IMA Part 2 CSO) |
| `foundation/FORMULA_MASTER.md` | `foundation/FORMULA_MASTER_P2.md` | **New** (40+ Part 2 formulas) |
| `index_updated.html` | `index_updated.html` | **Fork** (Part 2 domain labels, case count 3) |
| `app.js` | `app.js` | **Fork** (~70% reusable, ~30% Part 2 config) |
| `styles.css` | `styles.css` | **Copy** (identical) |

---

**Revision History:**

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-29 | P2-002 — Repository Board Subagent | Initial repository layout and naming standards |
