# S374–S377 — Post-Adoption Truth Assurance & Content Excellence Program

**Plan Version:** 1.0
**Created:** 2026-07-27
**Type:** READ-ONLY — Analysis, certification, and planning. No pack file content modifications. No question_state changes. No answer-key changes.
**Authority:** AGENTS.md, PROJECT_CONSTITUTION.md, Framework v2 (FULLY ADOPTED - RESTORED per S373)

---

## T0 Ground Truth (Verified 2026-07-27)

### Certified Pool
| Pack | Total | Certified | Sections Closed |
|------|-------|-----------|------------------|
| Pack A | 500 | 481 | A, D, E certified |
| Pack B | 500 | 500 | All 6 sections |
| Pack C | 500 | 388 | A, B, C, D certified; E, F partial |
| Pack D | 500 | 389 | A, B, C, D certified; E, F partial |
| Pack E | 540 | 540 | All sections, includes R-series |
| **Total** | **2,540** | **2,298** | **90.5% certified** |

### Governance
- Governance guard: **32/32 PASS** (Rules 2, 3, 5, 6 BLOCK; Rules 1, 4 WARN)
- Certified DL-008: **0** (verified via Function constructor parse)
- Certified DL-026: **0** (remediated S369-S373, 3 items)
- Identity resolution: **99.96%** (2,539/2,540)

### File Hash State
| File | Live SHA-256 | Baseline SHA-256 | Status |
|------|-------------|-------------------|--------|
| pack_a_corrected.js | E237FEAC... | E237FEAC... | MATCH |
| pack_b_corrected.js | 8A641309... | 8A641309... | MATCH |
| pack_c_corrected.js | EE70859D... | 02BD4DB6... | **DRIFT** |
| pack_d_corrected.js | B2ED6260... | E0C3650A... | **DRIFT** |
| pack_e_corrected.js | A98B27B1... | A98B27B1... | MATCH |

**Drift root cause:** Post-S853 certification wave (77 items) + S371 3-field remediation. Authorized content changes. CURRENT_BASELINES.md was never re-baselined. Pack C drift documented in REVISION_HISTORY.md S372 entry; Pack D drift is undocumented but authorized (S826 + S829 remediation waves).

### Automatic Stop Conditions (Post-T0)
| # | Condition | Actual | Verdict |
|---|-----------|--------|---------|
| 1 | Governance Guard ≠ PASS | 32/32 PASS | ✅ PASS |
| 2 | Inventory Count Conflict | 2,298 stable | ✅ PASS |
| 3 | Certified DL-008 Exists | 0 | ✅ PASS |
| 4 | Certified DL-026 Exists | 0 | ✅ PASS |
| 5 | Identity < 99% | 99.96% | ✅ PASS |
| 6 | Baseline Drift Detected | Packs C+D drift | ❌ FAIL → Phase 0 |

---

## Phase 0: Baseline Recapture (Prerequisite)

**Objective:** Re-baseline CURRENT_BASELINES.md to reflect authorized post-S853/Pack C/Pack D state. This is the single prerequisite action before S374 execution.

### Tasks:
1. Create timestamped backup of `knowledge/CURRENT_BASELINES.md`
2. Recapture SHA-256 hashes for Packs C and D via `Get-FileHash -Algorithm SHA256`
3. Update §1 hash table rows for `pack_c_corrected.js` and `pack_d_corrected.js`
4. Update §2 Certified Pool table (no count changes expected; verify)
5. Update §3 defect status (DL-026: 3 Certified→0 Certified per S373)
6. Append §5 verification log entry: "2026-07-27 — Session 374 (Phase 0) — Packs C+D re-baselined. Post-S853 + S371 authorized drift."
7. Re-verify: governance guard 32/32, certified count 2,298 stable
8. Re-check: all 6 automatic stop conditions now PASS

**Backup path:** `knowledge/CURRENT_BASELINES.md.bak-{timestamp}`

**Success criteria:** All 6 automatic stop conditions PASS after Phase 0.

---

## S374 — Methodology Certification Board

**Mission:** Certify approved scanning methodologies. Classify all historical detector types. Retire unsupported approaches.

### IS / IS NOT
- **IS:** Classification of detection/scan methodologies, trust hierarchy establishment, prohibition of DL-029-class approaches
- **IS NOT:** Content remediation, defect fixing, inventory counting, new scan tool development

### Agent Structure

#### Truth Agents A–F: Detector Type Review
- **Agent A:** Survey all historical scan/detection scripts in `scripts/` directory for methodology signatures
- **Agent B:** Classify each methodology found: regex forward-scan, window-scan, Function constructor parse, Object parse (JSON.parse), registry query, raw-file line inspection, grep/select-string
- **Agent C:** Map each methodology to known defect catalogs: DL-029 (window-scan), DL-020 (brace-matcher), DL-028 (regex false positives)
- **Agent D:** Identify all methodology types that produced false positives in historical reports (cross-reference S852 manifest, S821 queue, S361 Readiness Board)
- **Agent E:** Produce classification table: Methodology → Classification → Evidence → Risk Level
- **Agent F:** Produce prohibited methodology list with substitution guidance

**Classification taxonomy:**
- **APPROVED:** Raw-file line inspection, Function constructor parse, Object-level parse, Registry queries, SHA-256 content hashing
- **CONDITIONAL:** grep/Select-String (must pair with object-boundary verification), regex (must include boundary delimiters)
- **PROHIBITED:** Forward-scan regex without object boundaries, Window-scan with context-window overlap, Manifest consumption without raw-file verification

#### Agents G–L: Validation
- **Agent G:** Validate raw-file line inspection methodology against Pack C/D DL-026 ground truth
- **Agent H:** Validate Function constructor parse methodology against DL-008 zero-state
- **Agent I:** Validate registry query methodology against CURRENT_BASELINES.md and CANONICAL_REGISTRY.json
- **Agent J:** Validate prohibition of forward-scan regex (DL-029 evidence chain)
- **Agent K:** Validate prohibition of window-scan (S852 manifest: 301→3 false positives)
- **Agent L:** Cross-reference all validations against DEFECT_LIBRARY.md entries DL-029, DL-020, DL-028

#### Agents I–P: Retirement Protocol
- **Agent M:** Identify all scripts in `scripts/` using prohibited methodologies
- **Agent N:** Document retired methodology replacement path
- **Agent O:** Verify no CURRENT_BASELINES.md or governance-guard.js depends on prohibited methodology
- **Agent P:** Produce retirement documentation

#### Approval Board Q–Z
- **Agent Q:** Aggregate A-F classifications into draft certification JSON
- **Agent R:** Review G-L validation evidence for completeness
- **Agent S:** Review M-P retirement documentation
- **Agent T:** Produce final approved methodology registry
- **Agent U:** Produce trust hierarchy document
- **Agents V–Z:** Final review, cross-check, sign-off

### Deliverables
1. **`reports/session374/SESSION374_METHOD_CERTIFICATION.json`** — Full methodology registry with classification, evidence, risk level, and retirement status for all detected methodologies
2. **`reports/session374/SESSION374_TRUST_HIERARCHY.md`** — Trust hierarchy: Raw-line inspection > Object parse > Registry queries > grep (with boundaries) > [GAP: prohibited] > Forward-scan > Window-scan. Includes evidence chain linking each tier to defect prevention record.

### Verification
- All classifications cross-referenced against DEFECT_LIBRARY.md
- All prohibitions linked to at least one concrete false-positive event
- Trust hierarchy matches the DL-029 lessons learned
- No approved methodology in the same class as any prohibited methodology

---

## S375 — Inventory Integrity Certification

**Mission:** Create the first authoritative inventory certification registry.

### IS / IS NOT
- **IS:** Single authoritative snapshot of all countable entities, reconciliation across all data sources, discrepancy documentation
- **IS NOT:** Content fixes, count changes, question_state modifications, new content creation

### Agent Structure

#### Agents A–D: Reconciliation
- **Agent A:** Reconcile pack files: extract all QuestionIDs, question_state, CognitiveLevel, Difficulty from all 5 pack files via Function constructor parse
- **Agent B:** Reconcile registries: cross-reference CANONICAL_REGISTRY.json vs LIVE pack parse for identity_key consistency
- **Agent C:** Reconcile baselines: CURRENT_BASELINES.md §2 counts vs live grep verification
- **Agent D:** Reconcile defect libraries: DEFECT_LIBRARY.md scope claims vs live content state

**Key reconciliation targets:**
| Source Pair | Expected | Method |
|-------------|----------|--------|
| Pack parse vs CURRENT_BASELINES.md §2 | 2,540 total, 2,298 certified | Direct grep + Function parse |
| Pack parse vs CANONICAL_REGISTRY.json | 2,540 entries, 0 collision | Identity key comparison |
| CURRENT_BASELINES.md §1 hashes vs live | All 15 files match (post-Phase 0) | Get-FileHash SHA-256 |
| DEFECT_LIBRARY.md DL-008 scope vs live | 0 Certified, 3 Archived | Function parse |
| DEFECT_LIBRARY.md DL-026 scope vs live | 0 Certified, 261 non-Certified | Function parse |
| MASTER_QUESTION_REGISTRY.md vs pack files | 2,540 entries, 0 orphans | grep -c QuestionID |
| scored_cases*.js vs CURRENT_BASELINES.md | 5 files, hashes match | Get-FileHash SHA-256 |

#### Agents E–H: Count Validation
- **Agent E:** Validate per-pack certified counts against CURRENT_BASELINES.md §2
- **Agent F:** Validate per-section certified counts for all 30 sections (6 sections × 5 packs)
- **Agent G:** Validate CognitiveLevel distribution (Analyze=10, Evaluate=0, Apply=1,182, Remember=72, Understand=1,276)
- **Agent H:** Validate Difficulty distribution (Easy=569, Mod-Easy=639, Mod=1,228, Diff=113, VDiff=0)

#### Agents I–P: Authoritative Snapshot
- **Agent I:** Generate per-pack item inventory with question_state, CognitiveLevel, Difficulty, domain, section
- **Agent J:** Generate per-section certification coverage table
- **Agent K:** Generate defect exposure analysis (which defect classes touch which question_states)
- **Agent L:** Generate file inventory (all pack files, case files, application files with hashes and sizes)
- **Agent M:** Generate script inventory (all operational scripts with methodology classification from S374)
- **Agent N:** Generate report inventory (all session reports with question_state impact)
- **Agent O:** Generate discrepancy register (any mismatch between any two data sources)
- **Agent P:** Cross-validate snapshot completeness against all source files

#### Approval Board Q–Z
- **Agent Q:** Aggregate reconciliation findings
- **Agent R:** Review count validations
- **Agent S:** Review snapshot completeness
- **Agent T:** Produce final authoritative inventory JSON
- **Agent U:** Produce authoritative counts markdown
- **Agents V–Z:** Final review, cross-check, sign-off

### Deliverables
1. **`reports/session375/SESSION375_INVENTORY_CERTIFICATION.json`** — Complete inventory snapshot with: per-pack/per-section counts, question_state breakdown, CognitiveLevel/Difficulty distributions, defect exposure matrix, file inventory, script inventory, discrepancy register, reconciliation evidence
2. **`reports/session375/SESSION375_AUTHORITATIVE_COUNTS.md`** — Human-readable authoritative counts: total items, certified items, per-pack, per-section, per-domain, per-cognitive-level, per-difficulty. Discrepancies documented. All counts verified by at least 2 independent methods.

### Verification
- Every count in AUTHORITATIVE_COUNTS.md backed by JSON evidence field
- All 2,540 QuestionIDs accounted for in at least 2 data sources
- Discrepancy register documents every mismatch (even 1-item differences)
- Zero uncounted items
- Inventory JSON parseable and self-consistent

---

## S376 — Content Excellence Candidate Program

**Mission:** Select the highest-value content improvements from existing queues and gap analyses.

### IS / IS NOT
- **IS:** Candidate identification, priority scoring, backlog creation, ranking
- **IS NOT:** Content authoring, remediation execution, certification changes, pack file modifications

### Agent Structure

#### Agents A–D: Input Consumption
- **Agent A:** Consume S831 — Higher-order content gap findings (Analyze=10 vs target=635, Evaluate=0 vs target=381)
- **Agent B:** Consume S832 — remediation queue state (DL-026, DL-016, DL-021, DL-013 status)
- **Agent C:** Consume S833 — 740-item backlog classification from S835-S838
- **Agent D:** Consume S834 — Part 2 readiness score (54/100) and conditions

#### Agents E–H: Candidate Identification
- **Agent E:** Analyze candidates: Identify top 50 items most likely convertible from Understand→Analyze (highest impact, lowest rewrite cost)
- **Agent F:** Evaluate candidates: Identify top 50 items most likely convertible to Evaluate (new content from scratch; highest domain coverage priority)
- **Agent G:** Difficulty recalibration targets: Identify items with incongruent Difficulty labels (Easy on multi-step calculation items, Moderate on simple recall)
- **Agent H:** Case-based candidates: Identify highest-value case study expansion targets from scored_cases2-5

#### Agents I–P: Excellence Backlog
- **Agent I:** Build backlog JSON with scored entries: QID, current state, target state, complexity (Low/Medium/High), impact (Low/Medium/High), domain, estimated effort
- **Agent J:** Score each candidate: impact × urgency / effort = priority score
- **Agent K:** Rank candidates into tiers: High (top 25%), Medium (middle 50%), Future (bottom 25%)
- **Agent L:** Cross-reference candidates against defect library: exclude any item with open DL-016, DL-021, or other structural defects
- **Agent M:** Cross-reference candidates against S836 pipeline spec: ensure candidates are compatible with quality-first pipeline
- **Agent N:** Estimate pipeline throughput for each tier based on S837 resource model (Apply=15min, Analyze=25min, Evaluate=35min)
- **Agent O:** Produce priority matrix: Domain × CognitiveLevel × Difficulty → candidate count
- **Agent P:** Validate backlog consistency: all entries have valid QIDs, no duplicates, no certified-only items with open defects

#### Approval Board Q–Z
- **Agent Q:** Aggregate candidate findings
- **Agent R:** Review priority scoring methodology
- **Agent S:** Review tier assignments
- **Agent T:** Produce final excellence backlog JSON
- **Agent U:** Produce priority matrix markdown
- **Agents V–Z:** Final review, cross-check, sign-off

### Deliverables
1. **`reports/session376/SESSION376_EXCELLENCE_BACKLOG.json`** — Full candidate registry with: QID, pack, domain, section, current CognitiveLevel/Difficulty, target CognitiveLevel/Difficulty, complexity, impact, priority score, tier, pipeline compatibility
2. **`reports/session376/SESSION376_PRIORITY_MATRIX.md`** — Priority matrix: High/Medium/Future tiers with item counts, domain distribution, effort estimates, pipeline throughput estimates

### Verification
- All candidate QIDs verified present in pack files
- No candidate has open structural defect (DL-016, DL-021)
- Priority scoring formula applied consistently
- Tier distribution: ~25% High, ~50% Medium, ~25% Future
- Pipeline throughput estimates match S837 resource model

---

## S377 — Expansion Readiness Acceleration Board

**Mission:** Move the program closer to Part 2 readiness. Produce executive decision on expansion pace.

### IS / IS NOT
- **IS:** Readiness assessment, gap measurement, pipeline evaluation, executive decision recommendation
- **IS NOT:** Content authoring, pack file modifications, certification actions, governance changes

### Agent Structure

#### Agents A–E: Content Maturity Review
- **Agent A:** Assess current content maturity across 6 domains: coverage, cognitive level balance, difficulty distribution, item type mix
- **Agent B:** Measure gap to CAQS targets: Analyze 25% (0.4% actual), Evaluate 15% (0% actual), Understand 15% (50.2% actual)
- **Agent C:** Assess difficulty balance: target 15% Easy (22.4% actual), 25% Difficult (4.4% actual), 10% Very Difficult (0% actual)
- **Agent D:** Assess blueprint balance: section coverage, domain weighting, topic distribution
- **Agent E:** Produce content maturity scorecard (0-100 per dimension)

#### Agents F–J: Progress Measurement
- **Agent F:** Measure progress toward Analyze target: 10/635 (1.6%)
- **Agent G:** Measure progress toward Evaluate target: 0/381 (0.0%)
- **Agent H:** Measure progress toward Case-Based target: ENHANCED_CASE_BASE (90 items) certified; 330 remaining items uniform Moderate
- **Agent I:** Calculate velocity needed for each target at S837 Sprint pace (50 items/2 weeks)
- **Agent J:** Produce progress dashboard with timeline projections

#### Agents K–O: Pipeline Readiness
- **Agent K:** Review S836 quality-first pipeline specification for completeness
- **Agent L:** Assess pipeline gating: does each stage have defined pass/fail criteria?
- **Agent M:** Review 50-item pilot plan: cohort design, success criteria, validation methodology
- **Agent N:** Review S837 resource model: are time estimates validated against any real data?
- **Agent O:** Assess blocker list: what must be true before pipeline activation?

#### Executive Board P–Z
- **Agent P:** Aggregate content maturity, progress, and pipeline findings
- **Agent Q:** Score expansion readiness on 4 dimensions (Content Maturity, Authoring Readiness, Blueprint Readiness, Expansion Readiness)
- **Agent R:** Draft executive decision options: Maintain Current Pace, Accelerate Authoring, Launch Pilot Expansion Sprint
- **Agent S:** Evaluate each option against stop conditions and known risks
- **Agent T:** Produce expansion acceleration plan JSON
- **Agent U:** Produce executive decision markdown
- **Agents V–Z:** Final review, cross-check, sign-off

### Executive Decision Options

| Option | Description | Risk | Velocity |
|--------|-------------|------|----------|
| **Maintain Current Pace** | Continue ad-hoc certification waves. No new authoring. | Low — zero new defects | ~0 items/week (new content) |
| **Accelerate Authoring** | Activate S836 pipeline. Author 50-item pilot. Scale if pilot passes. | Medium — novel defect classes possible | 25 items/week (Sprint 1) |
| **Launch Pilot Expansion Sprint** | Start Sprint 1 immediately. Author 50 pilot items in 2 weeks. Gate on pilot results. | Medium — pilot may fail criteria | 25 items/week with gate |

### Deliverables
1. **`reports/session377/SESSION377_EXPANSION_ACCELERATION_PLAN.json`** — Full expansion plan with: content maturity scorecard, progress dashboard, pipeline readiness assessment, resource estimates, timeline projections, risk register
2. **`reports/session377/SESSION377_EXECUTIVE_DECISION.md`** — Executive decision document with: recommendation, supporting evidence, dissenting views, conditions precedent, go/no-go criteria

### Verification
- Expansion readiness score consistent with S838 baseline (54/100) with updated evidence
- All 6 S838 conditions for Part 2 readiness re-evaluated
- Resource estimates cross-referenced against S837 sprint model
- Executive decision includes explicit dissent documentation
- All gap-to-target calculations verified against S375 authoritative counts

---

## Execution Sequence

```
Phase 0: Baseline Recapture (1 agent, 1 file edit)
    ↓
S374: Methodology Certification (Truth A-F → G-L → I-P → Q-Z)
    ↓ (parallel)
S375: Inventory Integrity (A-D → E-H → I-P → Q-Z)
    ↓ (consume S374 + S375)
S376: Content Excellence (A-D → E-H → I-P → Q-Z)
    ↓ (consume S374 + S375 + S376)
S377: Expansion Readiness (A-E → F-J → K-O → P-Z)
```

### Serial Constraints
- Phase 0 must complete before S374 (stop condition 6 gate)
- S374 and S375 can run in parallel (no cross-dependency)
- S376 requires S375 (authoritative counts) and S835-S838 references
- S377 requires S374 (methodology), S375 (counts), and S376 (backlog)

### Parallel Opportunities
- All agents within a session that don't share dependencies
- S374 and S375 entirely in parallel
- Within S374: A-F + G-L can run in parallel (G-L validates A-F outputs after)
- Within S375: A-D + E-H + I-P phase-gated but I-P can start once A-D/E-H have partial results

---

## Governance & Stop Conditions

### Mid-Execution Checks (Tmid after each session)
1. Re-verify: governance guard still 32/32 PASS
2. Re-verify: certified count still 2,298
3. Re-verify: 0 pack file modifications (read-only program)
4. Re-verify: pack hashes unchanged from Phase 0 baseline

### Automatic Stop Conditions (re-checked at T0, Tmid per session, Tend)
| # | Condition | Trigger | Response |
|---|-----------|---------|----------|
| 1 | Governance Guard ≠ PASS | Any test failure | HALT all sessions |
| 2 | Inventory Count Conflict | Certified ≠ 2,298 | HALT, investigate |
| 3 | Certified DL-008 Exists | Any non-zero | HALT, escalate |
| 4 | Certified DL-026 Exists | Any non-zero | HALT, escalate |
| 5 | Identity < 99% | Below threshold | HALT, investigate |
| 6 | Baseline Drift Detected | Any unauthorized hash change | HALT, investigate |

### If Any Stop Condition Fires
1. Pause all agents immediately
2. Spawn independent verification agent
3. Document discrepancy in REVISION_HISTORY.md
4. Log new finding to DEFECT_LIBRARY.md if novel
5. Do not resume until condition is cleared

---

## Deliverables Summary

| File | Format | Approx Size | Session |
|------|--------|-------------|---------|
| `reports/session374/SESSION374_METHOD_CERTIFICATION.json` | JSON | ~15 KB | S374 |
| `reports/session374/SESSION374_TRUST_HIERARCHY.md` | Markdown | ~8 KB | S374 |
| `reports/session375/SESSION375_INVENTORY_CERTIFICATION.json` | JSON | ~25 KB | S375 |
| `reports/session375/SESSION375_AUTHORITATIVE_COUNTS.md` | Markdown | ~10 KB | S375 |
| `reports/session376/SESSION376_EXCELLENCE_BACKLOG.json` | JSON | ~30 KB | S376 |
| `reports/session376/SESSION376_PRIORITY_MATRIX.md` | Markdown | ~8 KB | S376 |
| `reports/session377/SESSION377_EXPANSION_ACCELERATION_PLAN.json` | JSON | ~20 KB | S377 |
| `reports/session377/SESSION377_EXECUTIVE_DECISION.md` | Markdown | ~6 KB | S377 |

**Total:** 8 files, ~122 KB, 0 content changes, 0 certification changes, 0 governance changes

---

## Success Criteria Checklist

- [ ] Phase 0 baseline recapture complete; all 6 stop conditions PASS
- [ ] S374 methodology registry complete; all detector types classified
- [ ] S374 trust hierarchy established; prohibited methodologies retired
- [ ] S375 inventory snapshot complete; all 2,540 items accounted for
- [ ] S375 all counts verified by ≥2 independent methods
- [ ] S376 candidate backlog built; priority tiers assigned
- [ ] S376 all candidates verified as defect-free (no open DL-016/DL-021)
- [ ] S377 content maturity assessed; gap-to-target calculated
- [ ] S377 executive decision produced with clear recommendation
- [ ] All 8 deliverables produced; all non-zero and valid JSON/MD
- [ ] REVISION_HISTORY.md entry written contemporaneously
- [ ] 0 pack file modifications, 0 question_state changes, 0 governance changes
- [ ] All 6 stop conditions PASS at Tend

---

## Readiness Board Verdict (Pre-Execution)

**READY for Phase 0 + S374-S377 execution.**

All preconditions verified:
- Framework v2: FULLY ADOPTED (RESTORED) per S373
- Governance guard: 32/32 PASS
- Certified pool: 2,298 stable
- Certified DL-008: 0
- Certified DL-026: 0
- Identity: 99.96%
- 6 of 6 stop conditions will PASS after Phase 0 baseline recapture

**Single Blocker:** Phase 0 baseline recapture (baseline drift on Packs C+D). One file edit to CURRENT_BASELINES.md. ~5 minute operation.

**depends_on:** S373 Adoption Restoration Decision (FULLY ADOPTED - RESTORED)
