# BOARD MEETING — Governance & Constitution Amendment Debate

**Date:** 2026-10-18 · **Type:** Board review + amendment session (governance-defining, per Chairwoman directive)
**Trigger:** Convened after the Top-10 Issues ballot board (`reports/BOARD_TOP10_ISSUES_20261018.md`) to debate and enact standing-rule changes flowing from the ballot, the 2026-10-18 emergency fix review (L-10…L-13), and lessons learned sessions (L-01…L-09). Explicit authorization to update PROJECT_CONSTITUTION.md and subordinate governance documents on vote.
**Presiding:** Release Manager · **Attendees:** Accountant, Editor, Reviewer, Psychometrician, Case Author, JavaScript Architect, Validator, Student

**Working rule:** every amendment was debated on a question frame, votes recorded per persona, and each carries an evidence cite. Adopted amendments are applied in this change-set; defeated/suspended amendments are recorded with reasons.

---

## Amendment A — Constitution §13: Verification Doctrine (ADOPTED, 8-0)

**Question:** should the Constitution elevate verification discipline (tooling controls, evidence, environment-conditionality, no-auto-remediate) from scattered AGENTS.md rules to constitutional rank?

**Debate.** Reviewer: every major incident this month (DL-066 false failures, DL-073 false PASS, the tag-v2.0.0 false claim) is a verification-doctrine failure, not a content failure; doctrines scattered across AGENTS §5/§6 and defect-library lessons keep being re-discovered and re-worded. Validator: constitutionalization fixes the "rule arrives after incident" class (lesson E-05) at the right level — the constitution states the doctrine, AGENTS/CAQS instantiate the mechanics. JavaScript Architect: cautions against constitutionalizing tool details that will change (seeded-defect specifics belong in AGENTS, not here). Board agreed: constitution gets the principle; mechanics stay subordinate.

**Adopted as PROJECT_CONSTITUTION.md §13** (see applied text). Recorded vote: 8-0.

---

## Amendment B — AGENTS.md §20: Verification & Certification Doctrine (ADOPTED, 8-0)

**Question:** codify L-01 (subagent self-reports), the verifier control standard (A-04/L-03), certification hand-solve attestation (A-07), environment-conditional PASS labeling (L-10), and identity-key anti-re-suffix discipline (L-11, extending §19.4) into one standing section?

**Debate.** Psychometrician: the hand-solve attestation is the single highest-leverage change — DL-070 proved certification-vs-repair confusion targets *the keys we already shipped*; make the attestation batch-recorded, not per-item prose. Validator: A-04's dual control (known-good PASS + seeded-defect FAIL) is cheap to comply with; force it at script debut, not at first incident. Editor: entry-level burden is acceptable because it applies to *new* tooling only. Case Author: A-08 authoring-time cognitive gates must stay a pointer (§17.3 remains the authority — Rule 12 relabeling prohibition unaffected). Release Manager: the environment-conditional PASS label is the missing wording that would have prevented DL-073's successive "PASS" claims. Student: keep runtime-path testing visible — Item 6 of the ballot (2 votes but the deepest learner harm).

**Adopted as AGENTS.md §20 (20.1–20.6)** with cross-references to §5, §7, §17.3, §18; head-bumped to v2.2. Recorded vote: 8-0.

---

## Amendment C — CAQS §1.7.4: Certification Hand-Solve Attestation (ADOPTED, 7-0-1 abstention)

**Question:** amend the certification standard so no item becomes Certified without a keyed independent hand-solve attestation — or a batch-documented verification-basis exemption?

**Debate.** Accountant: yes; §5.1 requires it for remediation today, but certification itself only borrowed it as practice during DL-066 — that asymmetry produced DL-070. Validator (abstaining on the writer-side mechanics, supporting the substance): the exemption path must stay narrow or the requirement becomes decoration. Reviewer: precedent DL-059/DL-066 lineage already demonstrated 159/163 verbatim match effectiveness — the cost is bounded and predictable. Psychometrician: match/multi items' attestation must tolerate stated-tolerance deltas (see CBQ4-A1-Q3 waves); wording includes tolerance-aware solvability.

**Adopted as CAQS §1.7.4** with an effective-date clause (no retroactive recertification; future batches only) and **1.7.5** recording the Section-508 blocking conditions pointer; document version-bumped to v1.1. Recorded vote: 7-0-1 (Validator abstention on mechanics only).

---

## Amendment D — COLLABORATION_MATRIX.md: Forbidden-Behavior Extension (ADOPTED, 8-0)

**Question:** add an explicit forbidden behavior — accepting chat/self-report/screen output as evidence without raw-tool reproduction — to the matrix?

**Debate.** Reviewer: the matrix's forbidden list lacks the trust rule; L-01 filled AGENTS, but a persona accepting "my subagent said it passed" remains formally permitted there. Editor: keep the formulation short — one line, pointing to AGENTS §5/§20.1. No dissent in debate.

**Adopted** (one-line addition to Forbidden Behavior). Recorded vote: 8-0.

---

## Amendments debated and NOT adopted

- **E — Constitutionalizing Rule 5 batch caps** (proposed by Validator to move the 30-object cap into the Constitution). Defeated 2-6: mechanics, will change; AGENTS + guard plugin remain the right home.
- **F — Merging DEFECT_LIBRARY + DEFECT_LIBRARY_P2 in this change-set** (proposed by Case Author). Deferred, not rejected — consolidation needs an index-verification pass first; logged as the standing A-10 evaluation (Reviewer owner), revisit next closeout cycle.
- **G — Raising the guard plugin to enforce A-04/A-07 as BLOCK rules 24/25** (proposed by Release Manager). Deferred: guard coverage expansions belong to a dedicated tooling wave with the plugin's test-matrix growth planned (A-04 harness work) — not to a governance session. Board reaffirmed: mechanisms in this change-set stay procedural; deadlines unchanged (next tooling wave).

---

## Applied change-set (by this session, on vote)

| Document | Change | Version |
|---|---|---|
| `knowledge/00_PROJECT_CONSTITUTION.md` | New §13 Verification Doctrine + revision-history row | 2.2 |
| `AGENTS.md` | New §20 (20.1–20.6) + header note | 2.2 |
| `knowledge/CAQS_v1.0.md` | New §1.7.4 Hand-Solve Attestation, §1.7.5 pointer, §A revision row | 1.1 |
| `ai/COLLABORATION_MATRIX.md` | Forbidden-behavior line added | 1.1 |

Backups: `backups/*.bak-GOV-20261018183918` (4 files, non-zero verified).

**Minutes closed by the Release Manager. Next board: A-05 completion review, or the next defect-triggered event.**
