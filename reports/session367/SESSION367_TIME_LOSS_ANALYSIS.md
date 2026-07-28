# SESSION367_TIME_LOSS_ANALYSIS.md — Remediation Automation Analysis

**Session:** S367 (Read-Only Planning)
**Date:** 2026-07-28
**Authority:** AGENTS.md §9, PROJECT_CONSTITUTION.md
**Type:** Time-loss analysis across five remediation workflows

---

## 1. Where Time Is Lost

### 1.1 DL-031 Difficulty Calibration (~500 items)

**What the agent/human does:**
Scans 2,540 items for inflated difficulty labels. Identifies items where the stem is a textbook definition, the correct answer is the term being defined, and DifficultyScore is 3+ (Moderate or higher). For each flagged item, verifies the flag is genuine (not a legitimate Moderate conceptual item with definition-like phrasing). Downgrades Difficulty from "Moderate"/"Difficult" to "Easy" and DifficultyScore to 1. Re-runs governance guard and validator suite. Recaptures hashes. Writes REVISION_HISTORY.md entry.

**Where friction lives:**
- **Identification:** No DL-031 scanner exists. Agent must manually cross-reference 1,154 Moderate items against cognitive level data. A regex/Jaccard-similarity scanner would take <1 minute to produce a candidate list; manual scan takes hours.
- **Verification:** Each flagged item requires reading the stem, checking the correct answer, and determining whether the item's distractors justify the Moderate label despite definition-match appearance. This is ~75% of the per-item time.
- **Application:** Downgrading 500 items individually is repetitive but fast (~30 sec/item). A bulk-apply script would take <60 seconds total but doesn't exist.
- **Post-change QC:** Hash recapture, baseline update, REVISION_HISTORY entry — all manual, all script-chainable, all pure repetition.

**Repetitive vs. Judgment breakdown:**
| Step | Type | Minutes/Item |
|------|------|-------------|
| Run DL-031 scanner on all packs | Repetition | 0.05 |
| Verify each flagged candidate | Judgment | 1.5 |
| Apply downgrade (Difficulty + DifficultyScore) | Repetition | 0.3 |
| Post-change QC (governance, validator, hashes, REVISION_HISTORY) | Repetition | 0.15 |
| **Total** | | **2.0** |

### 1.2 DL-035 Domain F Distractor Remediation (39 items, 117 fields)

**What the agent/human does:**
For each of 39 Certified Domain F items (28 Pack C Section FC + 11 Pack D Section FD), authors ~3 choice-specific distractor explanations where non-CC ExplanationWrong slots are empty. Each explanation must identify the specific error in that distractor, explain the misconception, contrast with the correct approach, use Technology & Analytics domain-appropriate content, and exceed 50 characters. Post-authoring, runs governance guard Rule 6 check, verifies QID counts, recaptures hashes, and writes REVISION_HISTORY.md.

**Where friction lives:**
- **Core authoring:** Each of 117 fields requires understanding (1) the item's topic, (2) the specific distractor text, (3) why a candidate would select that distractor, and (4) what the correct approach is. This is irreducible cognitive labor. AI can draft suggestions but the final text demands domain-appropriate content.
- **Domain knowledge:** Technology & Analytics is the least formulaic blueprint section (no cash collections formula, no variance formula — the content is conceptual: data governance, ERP controls, cybersecurity, AI ethics). Distractor explanations must reflect genuine technology-and-analytics misconceptions, not generic "plausible misconception" boilerplate.
- **DL-016 risk:** Pack C and Pack D items use dual-block architecture. The ExplanationWrong fields are in the metadata block; the learner-facing choices are in the content block. An agent authoring distractor explanations must index the *content block* choices, not the metadata block. This has been a recurring source of cross-agent errors.

**Repetitive vs. Judgment breakdown:**
| Step | Type | Minutes/Field |
|------|------|-------------|
| Inventory empty non-CC EW slots by QID | Repetition | 0.05 |
| Author choice-specific distractor explanation | Judgment | 2.5 |
| Verify >= 50 chars, Rule 6 compliance, no DL-010 misassignment | Repetition | 0.3 |
| Post-batch QC (governance, validator, hashes, REVISION_HISTORY) | Repetition | 0.15 |
| **Total** | | **3.0** |

### 1.3 Clone Replacement Pipeline (~180-200 items)

**What the agent/human does:**
Replaces Archived DL-012 clone items (183 across Pack C Sections E+F and Pack D Sections E+F) with net-new authored items. For each slot: selects a blueprint topic, authors a stem, authors 4 choices with exactly one correct answer, authors ExplanationCorrect with formula/substitution or reasoning chain, authors 3 ExplanationWrong fields, assigns metadata fields (QID, Section, Difficulty, CognitiveLevel, etc.), verifies accounting correctness, and runs certification-quality gates.

**Where friction lives:**
- **Stem design:** Each stem must be a CMA Part 1 appropriate test of a specific learning objective. Cannot be a clone of any existing item across all 5 packs. Requires both accounting knowledge and test-design creativity. Unautomatable.
- **Distractor engineering:** Three plausible-but-wrong choices per item. Each must target a distinct CMA exam trap or documented student misconception. Unautomatable.
- **Explanation authoring:** Mini-lesson format per CAQS §4.2: principle + solution + business interpretation + common trap. Unautomatable.
- **Metadata scaffolding:** Mechanical but time-consuming. QID assignment, Section/Part/Domain fields, Difficulty/CognitiveLevel — these follow deterministic rules from the QID convention and section template. Fully automatable.
- **Post-authoring verification:** Independently solving the question, confirming CorrectChoice, running governance guard, verifying QID count. Parallelizable and chainable but currently manual.

**Repetitive vs. Judgment breakdown:**
| Step | Type | Minutes/Item |
|------|------|-------------|
| Select topic and assign QID/metadata scaffolding | Repetition | 1.5 |
| Author stem | Judgment | 3.0 |
| Author 4 choices with distractors | Judgment | 4.0 |
| Author ExplanationCorrect + 3 ExplanationWrong | Judgment | 4.0 |
| Verify accounting correctness (independent solve) | Judgment | 1.5 |
| Post-authoring QC (governance, validator, count, lineage) | Repetition | 1.0 |
| **Total** | | **15.0** |

### 1.4 Certification Workflow (per batch)

**What the agent/human does:**
For each certification batch (≤30 items per Rule 5): runs identity validation, readiness scoring, candidate selection, DL-008 scan, DL-026 scan, governance guard test suite, validator suite, CAQS 6-dimension verification, QID count verification, hash recapture, baselines update, and REVISION_HISTORY.md entry.

**Where friction lives:**
- **Manual scan orchestration:** Each scan script must be invoked separately with the correct parameters. Outputs from one script are manually read and used as inputs to the next. There is no pipeline auto-chaining.
- **REVISION_HISTORY.md authoring:** Every certification batch requires a narrative entry with QID list, verification results, before/after counts, and disposition. This is manually typed. A template generator would save 80% of this time.
- **Baseline hash recapture:** After every pack modification, Get-FileHash must be run on each modified file, then CURRENT_BASELINES.md must be manually edited to update the table rows. This is ~4 minutes of pure mechanical work per change.
- **CAQS verification:** The 6-dimension assessment requires accounting expertise and cannot be automated. This is the correctly irreducible step.

**Repetitive vs. Judgment breakdown:**
| Step | Type | Minutes/Batch |
|------|------|-------------|
| Identity validation + readiness scoring + candidate selection | Repetition | 2.0 |
| DL-008 scan + DL-026 scan | Repetition | 1.5 |
| Governance guard test suite + validator suite | Repetition | 1.5 |
| CAQS 6-dimension verification | Judgment | 8.0 |
| QID count + hash recapture + baselines update | Repetition | 2.0 |
| Write REVISION_HISTORY.md entry | Repetition | 3.0 |
| Interpret scan findings, adjudicate false positives | Judgment | 2.0 |
| **Total** | | **20.0** |

### 1.5 QC Workflow (per change-set)

**What the agent/human does:**
After any pack-file change: runs governance guard test suite, validator suite, QID count verification, hash capture on modified files, DL-008/DL-026/DL-037 re-scans, CURRENT_BASELINES.md update, and REVISION_HISTORY.md entry.

**Where friction lives:**
- **Entirely script-chainable.** Every step is a deterministic command with structured output. Zero judgment required unless a scan flags unexpected results. Yet these 10 steps are executed manually every time.
- **Hash management:** CURRENT_BASELINES.md has 13 file hashes that must be recaptured and table-updated after any pack modification. The rebuild_baselines scripts are regex-replace hacks, not full regeneration. No automated diff against stored baselines exists.
- **Scan result interpretation:** The only judgment step is when a scan finds something unexpected. In >90% of QC passes, all scans are clean — yet the agent still manually reads each scan output line by line.

**Repetitive vs. Judgment breakdown:**
| Step | Type | Minutes/Change |
|------|------|-------------|
| Run governance guard test suite (51 tests) | Repetition | 0.5 |
| Run validator suite — capture error/warning counts | Repetition | 1.5 |
| Verify QID count unchanged (Select-String) | Repetition | 0.5 |
| Recapture SHA-256 hashes for modified files | Repetition | 1.0 |
| Re-scan for DL-008/026/037 on modified packs | Repetition | 2.0 |
| Update CURRENT_BASELINES.md hashes and counts | Repetition | 3.0 |
| Interpret scan/diff results | Judgment | 2.0 |
| Write REVISION_HISTORY.md entry | Repetition | 3.0 |
| Commit and verify backup protocol | Judgment | 1.5 |
| **Total** | | **15.0** |

---

## 2. Automation Opportunity Heatmap

Ranked by automatable hours saved:

| Rank | Workflow | Manual Hours | Automatable Hours | Feasibility | Savings % |
|------|----------|-------------|-------------------|-------------|-----------|
| 1 | **DL-031 Difficulty Calibration** | 16.7 | 10.0 | HIGH | 60% |
| 2 | **Clone Replacement Scaffolding** | 47.5 | 9.5 | MEDIUM | 20% |
| 3 | **Certification Workflow Orchestration** | 3.3 | 2.0 | HIGH | 60% |
| 4 | **QC Workflow Automation** | 2.5 | 2.0 | HIGH | 80% |
| 5 | **DL-035 Verification Scaffolding** | 5.9 | 1.0 | LOW | 17% |

**Key insight:** The two largest manual efforts (Clone Replacement at 47.5 hours, DL-031 at 16.7 hours) have very different automation profiles. Clone replacement is only 20% automatable because the core work is creative content design. DL-031 is 60% automatable because the core work is pattern matching + bulk field replacement. The certification and QC workflows are 60-80% automatable but contribute smaller absolute hours.

---

## 3. DL-031 Deep Dive — Difficulty Inflation

### 3.1 Can a regex-based scanner identify definition-match items?

**Yes, with a three-filter pipeline:**

**Filter 1 — Cognitive level gate:** Items with `CognitiveLevel: "Remember"` or `"Understand"` AND `DifficultyScore >= 3`. This eliminates all Apply/Analyze/Evaluate items (where Moderate difficulty is appropriate even for straightforward stems). 

**Filter 2 — Definition-stem pattern gate:** Stems matching known definition-question patterns:
- `"Which of the following (best describes|refers to|is) <concept>?"`
- `"<Term> (refers to|is defined as|represents|is a)..."`  
- `"The <phrase> is (best described as|known as|referred to as)..."`

**Filter 3 — Stem-to-correct-choice lexical overlap:** Compute word-level Jaccard similarity between the stem (stop words removed) and the correct answer choice text. When overlap exceeds 50%, the stem is functionally a definition of the correct answer — the item tests recognition, not application.

### 3.2 What's the false positive risk?

**~20-30%.** Three false-positive categories:

1. **Distractor-engineered definition items:** The stem is a definition but the distractors are sophisticated enough that selecting the correct answer requires genuine discernment (e.g., distinguishing between related-but-distinct COSO principles). These correctly deserve Moderate labeling. Example: a stem describing "independent verification of performance" with distractors mixing COSO monitoring, control activities, and risk assessment principles — this tests understanding of COSO taxonomy boundaries, not just term recognition.

2. **Conceptual contrast items:** The stem describes one concept but the answer requires identifying what it is NOT, or distinguishing between two similar concepts. The lexical overlap with the correct answer may be high but the cognitive demand exceeds Remember/Understand.

3. **Metadata-only mismatch:** Items where DifficultyScore is 3 but the actual item tests at Apply level — the CognitiveLevel field itself may be misassigned. DL-031 flags these as candidates, but the correct fix is upgrading CognitiveLevel, not downgrading Difficulty.

### 3.3 How much of the 17 hours is truly automatable?

**~10 hours (60%):**
- **Fully automatable (4.2 hours):** Run scanner across all 2,540 items producing a scored candidate list. Bulk-apply downgrades to high-confidence matches (>60% stem-choice overlap + definition pattern + Remember/Understand). Re-run governance guard. Recapture hashes. Generate REVISION_HISTORY.md template.
- **Partially automatable (5.8 hours replaced by ~3 hours manual):** Adjudicate borderline cases (40-60% overlap). Instead of manually inspecting every flagged item, the scanner produces a verification queue sorted by confidence score. Agent reviews only the bottom ~30% of candidates (~150 items at 1.2 min/item = 3 hours vs. 500 items at 1.5 min/item = 12.5 hours).
- **Irreducible (3.3 hours):** Verify metadata-only mismatches (CognitiveLevel upgrades, not Difficulty downgrades). These ~100 items require per-item cognitive assessment — agent must read stem, choices, and determine if the item genuinely tests Apply/Analyze.

---

## 4. DL-035 Deep Dive — Domain F Distractor Authoring

### 4.1 Can distractor explanations be template-generated?

**No.** Unlike DL-013 boilerplate (identical text across all 3 distractor slots, differing only by letter), DL-035 requires **choice-specific** explanations. Each of the 117 fields must respond to a specific distractor choice with a specific misconception analysis. A template that generates "Option X is incorrect because it represents a plausible misconception about [topic]" is exactly the DL-013/DL-007 defect pattern that required 2,587 fields of remediation.

### 4.2 Why does this require per-item editorial judgment?

**Three irreducible judgment requirements:**

1. **Domain-appropriate content:** Technology & Analytics distractors span diverse sub-topics (data governance, ERP segregation of duties, cybersecurity frameworks, AI ethics, data quality dimensions, system development lifecycles). A distractor explanation for "data stewardship" differs fundamentally from one for "penetration testing methodology." Each explanation must cite the correct domain framework (COSO, COBIT, NIST, ITIL, IIA GTAG) appropriate to the distractor.

2. **Distractor diagnosis:** The agent must identify WHY a candidate would select this specific wrong answer. For "data warehouse" as a distractor on a data lake question: the candidate is likely confusing OLAP-structured storage with schema-on-read flexibility. The explanation must teach this distinction, not just state the choice is wrong.

3. **DL-016 safety:** Pack C/D items use dual-block architecture. The ExplanationWrong slots index into the metadata-block `ChoiceA-D` values, but the learner sees the content-block `Choices.A-D` values. If these diverge (as they do in many Pack C/D items), the agent must verify which set of choices the ExplanationWrong text describes. Authoring an explanation for the metadata-block choice when the content-block choice is different creates a DL-010 misassignment.

### 4.3 What automation IS possible?

**Pre/post-verification scaffolding only:**
- A pre-flight script inventories exactly which slots are empty per QID, with the content-block choice text for that slot (for reference during authoring)
- A post-flight script verifies all 117 slots are non-empty, >= 50 characters, and Rule 6 compliant
- A topic-to-domain mapping table can suggest appropriate framework references for each item's MicroTopic

**Estimated savings: ~1 hour (17% of 5.9 hours)** — limited to verification steps.

---

## 5. Clone Replacement Analysis

### 5.1 Can stem authoring be automated?

**Partially.** A template-based stem generator could produce question stems for formula-driven calculation items (e.g., "Company X has sales of $Y, collection pattern of Z%. What is cash collections for Q1?"). The formula is fixed; the template substitutes company name and numbers. This works for ~30% of item types (calculation items with standard formulas).

For conceptual items (~70%), stem authoring requires designing a testing scenario that:
- Is not a clone of any existing item across 5 packs (cross-pack uniqueness)
- Tests the specific learning objective at the appropriate cognitive level
- Uses a business context that feels authentic (named company, realistic numbers, plausible scenario)
- Has exactly one defensible correct answer given the facts

This cannot be template-generated. The S899 model (20 items/session) reflects the practical ceiling for agent-led authoring.

### 5.2 Can answer generation be automated?

**For calculation items: yes.** Given a stem with known inputs and a formula from FORMULA_MASTER.md, the correct answer can be programmatically computed. A verifier script can independently solve the item and compare to the stored CorrectChoice, flagging mismatches as DL-030 candidates.

**For conceptual items: no.** The correct answer depends on the specific conceptual framing in the stem. Automated generation would require natural language understanding of the accounting principle and the specific fact pattern — equivalent to answering a CMA exam question.

### 5.3 Can quality verification be automated?

**Partially.** Structural checks (DL-008, DL-026, DL-037) are fully automated via governance guard Rules 2/6/9. Metadata completeness checks are available via identity_validator.js. But the most important quality dimension — **Is the stored CorrectChoice actually correct?** — requires independent solving by an accounting agent. A verification script can flag CorrectChoice mismatches (DL-030) by independently computing the answer for calculation items, but conceptual items still require human/agent judgment.

### 5.4 Throughput improvement potential

**With metadata scaffolding automation: 25-30 items/session (vs. 20 currently).**

A clone replacement scaffolder script would:
1. Accept a QID slot list and a topic assignment map
2. Pre-populate all structural metadata fields (QuestionID, Part, Section, SectionName, ItemType, ItemStyle, SourceDescription, VerifiedChecks, StudyLinks, UniqueConceptKey template)
3. Leave content fields (Stem, Choices, ExplanationCorrect, ExplanationWrong*) as authoring stubs with TODO markers
4. Post-authoring: verify metadata completeness, run governance guard, log QID to replacement_lineage_tracker

This eliminates ~3 minutes of mechanical metadata work per item, allowing the agent to focus entirely on content design.

---

## 6. Certification Friction Points

### 6.1 Exact manual steps in a certification pass (and automation potential)

| # | Step | Current | Target | Status |
|---|------|---------|--------|--------|
| 1 | Identity validation | `node scripts/identity_validator.js` — manual invoke | Auto-chained in orchestrator | Script exists |
| 2 | Readiness scoring | `node scripts/readiness_scorer.js` — manual invoke | Auto-chained | Script exists |
| 3 | Candidate selection | `node scripts/certification_candidate_engine.js` — manual invoke | Auto-chained | Script exists |
| 4 | DL-008 scan | `node scripts/scan_dl008_fn.js` — manual invoke | Auto-chained | Script exists |
| 5 | DL-026 scan | `node scripts/scan_s710r_dl026.js` — manual invoke | Auto-chained | Script exists |
| 6 | Governance guard | `node scripts/test_governance_guard.js` — manual invoke | Auto-chained + pass/fail capture | Script exists |
| 7 | Validator suite | Manual invocation of multiple validator modules | Single-command `npm run validate` | Partial |
| 8 | Interpret scan results, adjudicate findings | **Manual — requires judgment** | Can't eliminate. Semi-automated: scanner produces structured JSON with QID lists, agent reviews only flagged items | **Needs scanner output format upgrade** |
| 9 | CAQS 6-dimension verification | **Manual — requires accounting expertise** | Unautomatable (but can be parallelized across agents) | — |
| 10 | Hash recapture + baselines update | Manual `Get-FileHash` + hand-edit CURRENT_BASELINES.md | Auto-chained post-certification hook | **No script exists** |
| 11 | REVISION_HISTORY.md entry | Manual authoring of narrative entry with QID list and counts | Template generator: QID list + pass/fail counts → fill-in-the-blanks template → agent reviews and appends | **No template generator exists** |

### 6.2 Which steps can be script-chained?

**Steps 1-7 are fully script-chainable.** The pipeline_orchestrator.js already exists at `scripts/pipeline_orchestrator.js` but is manually invoked per-step. Chaining would require:

1. A wrapper script that accepts a QID list or section range
2. Sequentially invokes each scanner/validator
3. Aggregates outputs into a per-batch certification report (structured JSON)
4. Auto-generates the REVISION_HISTORY.md entry template
5. As a post-certification hook: recaptures hashes and updates CURRENT_BASELINES.md

**Development effort:** ~2 hours for the orchestrator upgrade. **Savings:** ~2 hours per 10-batch certification wave.

### 6.3 What CANNOT be script-chained?

- **CAQS 6-dimension verification** (step 9): Requires reading stems, independently solving items, evaluating distractor quality. This is the one correctly irreducible step.
- **Scan finding adjudication** (step 8): Can be partially automated by outputting structured JSON with per-QID evidence, but final disposition requires judgment.

---

## 7. Recommendations

### 7.1 Top 3 Automation Investments (Ranked by Hours-Saved per Hour of Development)

| # | Investment | Savings | Dev Effort | ROI | Rationale |
|---|-----------|---------|-----------|-----|-----------|
| **1** | **DL-031 Scanner + Bulk Downgrade** | 10.0 hours | 1.5 hours | **6.7:1** | Single new script (`scan_dl031.js`). Pattern-matching on existing fields (CognitiveLevel, DifficultyScore, Stem, CorrectChoice). No new parsing infrastructure needed. Uses same Function constructor approach as scan_dl008_fn.js. Bulk application is a regex replace. Largest single savings, lowest dev effort. |
| **2** | **Post-Change QC Script** | 2.0 hours per change-set, ~20+ hours/year | 3.0 hours | **6.7:1** | New script (`post_change_qc.js`). Chains governance guard → validator → QID count → hash capture → baseline diff → auto-update CURRENT_BASELINES.md → REVISION_HISTORY.md template. Eliminates 10 manual-per-change steps. Used after every pack modification (estimated 10+ uses per month). |
| **3** | **Clone Replacement Scaffolder** | 9.5 hours (across ~190 items) | 2.0 hours | **4.75:1** | New script (`clone_replacement_scaffolder.js`). Pre-fills 12+ metadata fields per item from QID convention + section templates. Post-authoring verification chain. Parallelizes with DL-031 scanner development. Directly increases content throughput by 25%. |

### 7.2 Recommended Execution Order

```
Phase A (Sessions S368-S369) — Quick Automation Wins
  ├── S368: Write scripts/scan_dl031.js + execute bulk scan + dry-run downgrade
  ├── S369: Write scripts/post_change_qc.js + test on one pack
  └── Result: Automation score 48 → 53 (path to 55)

Phase B (Sessions S370-S372) — Structural Automation
  ├── S370: Upgrade pipeline_orchestrator.js to auto-chain 7 scan/validation steps
  ├── S371: Write REVISION_HISTORY.md template generator
  ├── S372: Write clone_replacement_scaffolder.js
  └── Result: Automation score 53 → 58

Phase C (Session S373+) — Content Execution
  ├── Execute DL-031 downgrade on verified candidates (~500 items)
  ├── Execute DL-035 distractor authoring (S816-S818, scheduled)
  ├── Execute clone replacement Phase 2 (~190 items)
  └── Each execution uses automated QC + scaffolding from Phases A-B
```

### 7.3 What NOT to Automate

- **DL-035 distractor authoring:** The 1.0 hour of automatable savings (pre/post verification) doesn't justify a dedicated script. Use the post_change_qc.js script (Recommendation #2) for verification instead.
- **CAQS 6-dimension verification:** Accounting correctness verification of a question requires reading, understanding, and independently solving the item. This is the one step where human/agent judgment is both necessary and correct.
- **DL-010 semantic scanning:** No automated tool can determine whether an ExplanationWrong field text describes the correct distractor choice. This remains a human/agent review task.

### 7.4 Automation Score Projection

| Component | Current | After Phase A | After Phase B | Notes |
|-----------|---------|---------------|---------------|-------|
| Governance Guard | 19/20 | 19/20 | 19/20 | Already near-perfect |
| Validator Framework | 8/15 | 8/15 | 10/15 | Pipeline auto-chaining |
| Defect Scanning | 5/15 | 8/15 | 10/15 | DL-031 scanner + auto-chain |
| Registry Automation | 3/10 | 3/10 | 6/10 | Auto-regeneration on write |
| Baselines Automation | 2/10 | 7/10 | 7/10 | post_change_qc.js handles this |
| CI/CD Pipeline | 0/10 | 0/10 | 0/10 | GitHub Actions deferred |
| Pre-Delivery Automation | 1/10 | 1/10 | 3/10 | Partial via QC script |
| Script Hygiene | 10/10 | 10/10 | 10/10 | Already capped |
| **Total** | **48** | **56** | **65** | **ABOVE sustainability threshold (55)** |

---

## Appendix A — Data Sources

| Source | File | Date |
|--------|------|------|
| Automation gap report | `reports/sustainability/SESSION365_AUTOMATION_GAP_REPORT.md` | 2026-07-28 |
| Bottleneck report | `reports/sustainability/SESSION360_BOTTLENECK_REPORT.md` | 2026-07-28 |
| Defect library (DL-031, DL-035, DL-012) | `knowledge/DEFECT_LIBRARY.md` | 2026-07-28 |
| Governance guard plugin | `.opencode/plugins/governance-guard.js` | Active (9 rules) |
| Script directory inventory | `scripts/` (1,176 files, 224 top-level JS) | 2026-07-28 |
| Difficulty distribution | Raw `Select-String` on 5 pack files | 2026-07-28 (S367) |
| Certified pool count | Raw `Select-String` on 5 pack files | 2026-07-28 (S367) |
| Archived item count | Raw `Select-String` on pack_c/pack_d | 2026-07-28 (S367) |

## Appendix B — Key Counting Results (S367 Direct Measurement)

| Metric | Count | Source |
|--------|-------|--------|
| Total MCQ items | 2,540 | 500×4 + 540 Pack E |
| Total Certified | 2,337 | Direct grep (Pack C: 398, Pack D: 399) |
| DifficultyScore=3 (Moderate) | 1,154 | Direct grep across all 5 packs |
| Archived items (Pack C+D) | 183 | 93 Pack C + 90 Pack D |
| DL-031 candidacy pool | ~1,154 | All D3 items; estimated ~500 definition-match |
| DL-035 Certified Domain F items | 39 | Per DEFECT_LIBRARY.md DL-035 |
| DL-035 empty distractor fields | ~117 | ~1.5 empty non-CC slots per item × 39 items |
| Clone replacement pool | ~183-200 | Archived items in Pack C/D Sections E+F |
| Governance guard rules | 9 | All BLOCK level, 51/51 tests PASS |
| Existing defect scanners | 7 | DL-008, DL-026, DL-021, DL-037, orchestrator |
| Script sprawl | 53.1% uncategorized | Per S365 report |
| Automation score | 48/100 (AT RISK) | Per S365 report |
