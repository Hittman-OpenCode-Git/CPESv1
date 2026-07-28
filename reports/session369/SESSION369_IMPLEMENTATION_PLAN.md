# SESSION369 — Automation Roadmap Implementation Plan

**Date:** 2026-07-28
**Session:** S369 (Read-Only Planning)
**Current Score:** 48/100 (AT RISK)
**Target:** 55/100 (Operational Sustainability)
**Type:** Implementation roadmap — no code execution or file modifications

---

## 1. Current State — What 48/100 Really Means

### 1.1 The Score is Carried by One Component

The governance guard plugin (19/20) accounts for 40% of the total score. It is the **only fully automated, self-verifying component** in the repository. Every other workflow requires a human or agent to:

1. Know which script to invoke
2. Invoke it with correct parameters
3. Interpret its output
4. Take corrective action based on findings

### 1.2 What's Automated (Production-Grade)

| Component | Status | What it does |
|-----------|--------|-------------|
| Governance Guard | **19/20** | 9 BLOCK rules at write time + session idle. 51/51 tests PASS. DL-008, DL-026, DL-037, batch caps, registry protection, answer-key verification, question_state tracking. Fully automated — zero manual steps per invocation. |
| Defect Scanners (exist, manual) | **5/15** | 7 scanners exist (DL-008, DL-026, DL-021, DL-037, orchestrator) using Function constructor parse. All require manual `node scripts/scan_*.js` invocation. |
| Validator Framework (exists, manual) | **8/15** | 11 validators covering structural, content, psychometric checks. All require manual invocation via `npm run validate`. |
| Pack Reader Engine | **HIGH quality** | `pack_reader.js` — Function constructor parsing, CC-position-aware. Used by all active tools. The foundation for all new automation. |

### 1.3 What's Manual (10-15 Minutes Per Change-Set)

After every pack file modification, the agent must manually execute ~10 steps:

1. `node scripts/test_governance_guard.js` — confirm 51/51 PASS
2. `npm run validate` — capture error/warning counts
3. `Select-String -Pattern '"QuestionID"'` — confirm QID count unchanged
4. `Get-FileHash -Algorithm SHA256` on modified pack files
5. Diff new hashes against CURRENT_BASELINES.md §5 — flag drift
6. Run DL-008 scan on modified packs
7. Run DL-026 scan on modified packs
8. Hand-edit CURRENT_BASELINES.md table rows
9. Hand-edit CURRENT_BASELINES.md §2 Certified counts
10. Hand-author REVISION_HISTORY.md entry

**These 10 steps are 100% script-chainable.** Zero judgment is required unless a scan flags unexpected results.

### 1.4 What's Broken

| System | Status | Impact |
|--------|--------|--------|
| MASTER_QUESTION_REGISTRY.md | 2 days stale, broken section labels (I/P/T/U) | No agent trusts registry data; all counts done via raw-file grep |
| CURRENT_BASELINES.md updates | Regex-replace hacks (rebuild_baselines_s*.js) | Fragile, session-specific, no single command |
| Pre-delivery safety check | 100% manual agent workflow (155 lines of skill instructions) | No automated pool verification before learner sessions |
| CI/CD pipeline | Non-existent | No automated regression gate; T0/Tmid/Tend checkpoints fully manual |

---

## 2. Quick Wins — Session 370-A

These three automations can be built in a single session (~3 hours total). They add +3 points to the automation score (48 → 51) and establish the development pattern for Phase 1.

### 2.1 Fix generate_registry.js Section Mapping (+1 score, ~1 hour)

**Problem:** The `MASTER_QUESTION_REGISTRY.md` displays sections as I/P/T/U instead of A/B/C/D/E/F. The root cause is in `extractQID()` at line 111-115 of `generate_registry.js`:

```javascript
function extractQID(msg) {
    const m = msg.match(/\(([A-Z]{1,2}[-][A-F][-]\d{3})\)/);
    if (m) return m[1];
    const m2 = msg.match(/(P1[A-Z]?[-][A-F][-]\d{3})/);
    if (m2) return m2[1];
    return null;
}
```

The regex `P1[A-Z]?[-][A-F][-]\d{3}` does not match Pack E format (`P1E-A-NNN`) because `P1E` has 3 prefix chars before the dash. It also does not match Pack C/D section suffixes (`P1-AC-NNN`). The second issue is that the Domain field in the CSV may be pulling from `SectionName` rather than `Section` — `build_master_registry.js` line 126 maps `Domain: obj.SectionName || section`.

**Fix:**

1. Update `extractQID()` regex patterns to match all 5 QID formats
2. Add a QID-to-section extraction function that derives the section letter from the QID convention itself (QID → section letter mapping is deterministic: P1-A-NNN → A, P1-BC-NNN → B, P1E-C-NNN → C, etc.)
3. Re-run `npm run build-registry`

**Verification:** Run `npm run build-registry`, open MASTER_QUESTION_REGISTRY.md, verify "By Section" table shows A-F with correct domain names. Verify total count matches raw-file grep.

### 2.2 DL-021 Governance Guard Rule 10 (+1 score, ~0.5 hours)

**Problem:** Rule 6 blocks empty non-CC EW slots but absent fields (DL-021) pass through unchecked. 95 Certified Pack E Section C items have structurally absent distractor EW fields. This is a documented gap (S365 §2, DL-021 entry).

**Fix:** Extend `findDL026Violations()` in governance-guard.js (line 107-123) to also catch absent fields:

```javascript
// In findDL026Violations, the check at line 117 is:
if (!(ewKey in obj) || (typeof obj[ewKey] === 'string' && obj[ewKey].length === 0)) {
    violations.push({ letter: L, qid: obj.QuestionID || '(unknown)' });
}

// The !(ewKey in obj) portion already catches absent fields.
// But the function name and error message only reference "empty."
// Fix: rename to findDistractorEWViolations() and emit separate
// violation types for absent vs empty fields.
```

Add 3 test cases to test_governance_guard.js:
- Absent distractor EW field → BLOCKED
- Present but empty distractor EW → BLOCKED (existing Rule 6)
- Present and non-empty → PASSES

**Verification:** Run `node scripts/test_governance_guard.js`, confirm 54/54 PASS (51 + 3 new). Test with a synthetic write containing an item with missing distractor EW fields → confirm BLOCK.

### 2.3 scan_dl031.js — Difficulty Inflation Detector (+1 score, ~1.5 hours)

**Problem:** ~500 items are labeled Difficulty: "Moderate" (DifficultyScore: 3) when they test at Bloom's Remember or Understand via definition-match stems. No automated scanner exists.

**Fix:** New script `scripts/scan_dl031.js` implementing the three-filter pipeline from S367 §3:

- **Filter 1:** Extract items where `CognitiveLevel` ∈ {Remember, Understand} AND `DifficultyScore` >= 3 (via pack_reader.js Function constructor)
- **Filter 2:** Stem matches definition patterns: `Which of the following (best describes|refers to|is)`, `<Term> (refers to|is defined as|represents|is a)`
- **Filter 3:** Word-level Jaccard similarity between stem (stop words removed) and correct answer choice text > 50%

Output: `scripts/output/dl031_scan.json` — scored candidate list with confidence, ordered by severity.

**Dry-run mode default.** The script does NOT auto-apply downgrades without an explicit `--apply` flag. This prevents accidental difficulty miscalibration.

**Verification:** Run on all 5 packs. Verify output JSON has ~500 candidates with confidence scores. Spot-check 10 high-confidence candidates against raw file — confirm they are genuine definition-match items.

---

## 3. Phase 1 Package — Reaching 55

### 3.1 Implementation Order

```
Session 370-A (3 hours) — Quick Wins
  ├── Fix generate_registry.js                     +1 score  (1.0h)
  ├── DL-021 Governance Guard Rule 10              +1 score  (0.5h)
  └── scan_dl031.js detection                      +1 score  (1.5h)
  Result: 48 → 51

Session 371 (3 hours) — Pre-Delivery Safety
  └── pre_delivery_safety_check.js                 +2 score  (3.0h)
  Result: 51 → 53

Session 372 (4 hours) — QC + Baselines Automation
  ├── rebuild_baselines.js (full regeneration)     +2 score  (2.0h)
  └── post_change_qc.js (QC pipeline)              +2 score  (2.0h)
  Result: 53 → 55
```

The overlap between `rebuild_baselines.js` and `post_change_qc.js` is intentional — `post_change_qc.js` handles the *automated QC trigger* (run after every change) while `rebuild_baselines.js` handles the *complete regeneration* (run when hashes need wholesale recapture). They can share the same hash-computation module.

### 3.2 Verification Gates per Component

**pre_delivery_safety_check.js:**
- Verify it correctly identifies `question_state` filter in app.js (or flags its absence)
- Verify Certified count matches raw-file grep
- Verify known-defective QID cross-reference catches DL-012 clones + DL-034 missing-field items
- Verify section coverage A-F all have >0 Certified items
- Verify stop conditions trigger when defect is found

**rebuild_baselines.js:**
- After regeneration, CURRENT_BASELINES.md §1 table rows match `Get-FileHash -Algorithm SHA256` for all 13 files
- §2 Certified counts match `Select-String -Pattern '"question_state": "Certified"'` per pack
- No data loss in §3-§6 (preserved text blocks)

**post_change_qc.js:**
- After a synthetic pack modification (whitespace-only change to pack_a_corrected.js):
  - Governance guard test: PASS (51/51)
  - Validator: captures error/warning counts
  - QID count: unchanged
  - Hash diff: correctly flags pack_a hash has changed
  - DL-008/026/037 re-scan: no new findings
  - `--update-baselines` flag: CURRENT_BASELINES.md updated with new pack_a hash

### 3.3 Dependency Map

```
pack_reader.js (exists, production-grade)
    ├── pre_delivery_safety_check.js
    ├── rebuild_baselines.js
    ├── post_change_qc.js
    └── scan_dl031.js

governance-guard.js (exists, 9 rules, 354 lines)
    └── Rule 10 (DL-021) — extension only

scan_dl008_fn.js, scan_s710r_dl026.js, scan_logic_inversions.js (exist)
    └── post_change_qc.js — execSync wrappers
```

No new dependencies. No npm installs. No architectural changes.

---

## 4. Phase 2 Aspirational — Reaching 60

### 4.1 Additional Components

| # | Component | Effort | +Score | Cumulative |
|---|-----------|--------|--------|------------|
| (Phase 1) | — | 10h | +7 | 55 |
| 6 | Registry Auto-Regeneration Hook | 0.5h | +1 | 56 |
| 7 | CI/CD Pipeline (GitHub Actions) | 4.0h | +2 | 58 |
| 8 | clone_replacement_scaffolder.js | 4.0h | +1 | 59 |
| 9 | Script Hygiene Catalog Pass | 8.0h | +1 | 60 |

### 4.2 Is 60 Worth It?

**Yes, but the ROI curve flattens.** The jump from 48 → 55 (AT RISK → operational sustainability) is the critical threshold. At 55, the simulator has a self-verifying delivery pipeline where:

- Every pack change triggers automated QC (`post_change_qc.js`)
- The delivery pool is verifiable with a single command (`pre_delivery_safety_check.js`)
- Baselines regenerate from source, not regex hacks (`rebuild_baselines.js`)
- The registry stays current (auto-regeneration hook)
- New defects are caught at write time (Rules 2, 6, 9, 10)
- Difficulty inflation is detectable (`scan_dl031.js`)

The jump from 55 → 60 adds CI/CD gating and script hygiene — valuable but not transformative. The CI/CD pipeline depends on the repo being hosted on a Git forge with CI runner support (GitHub Actions, GitLab CI, etc.). If the repo is local-only, the CI/CD component score caps lower.

**Recommendation:** Execute Phase 1 (reach 55). Evaluate Phase 2 after 1-2 months of operating at the 55 level. The script hygiene pass (8 hours) and clone scaffolder (4 hours) are significant investments with lower per-hour ROI than the Phase 1 components.

---

## 5. New Governance Rules

### 5.1 Rule 10 — DL-021 Absent Distractor EW Fields (BLOCK)

**Cost:** 0.5 hours
**Coverage gap closed:** 95 Certified Pack E Section C items currently have absent distractor EW fields. This rule prevents any future certification of items with absent fields — the certifier must populate the fields before certification can proceed.
**Implementation:** Extend `findDL026Violations()` or add `findDL021Violations()` to governance-guard.js. Wire into `tool.execute.before` hook.

### 5.2 Rule beyond Rule 10 — DL-010 Semantic Misassignment

**Cost:** Infinite (cannot be automated)
**Why no rule:** DL-010 requires determining whether ExplanationWrong text semantically describes the correct distractor. This requires NLP understanding of both the explanation text and the choice text — equivalent to reading and comprehending the question. No regex or structural check can detect this. It must remain a human/agent review task in the certification workflow.

### 5.3 Signal Improvement for Rules 1 and 4

**Current limitation:** Rules 1 and 4 check at session idle that REVISION_HISTORY.md was touched and that recomputed verification phrases appear in the content — but these are **presence checks, not correctness checks**. The guard cannot verify:
- That the REVISION_HISTORY.md entry is factually accurate
- That the "independently verified" note is genuinely independently computed
- That the before/after counts in the entry match actual pack file state

**Improvement (Medium effort, ~2 hours):** Extend Rules 1 and 4 to cross-reference the REVISION_HISTORY.md entry's claimed counts against the actual pack file state (via Function constructor parse). If the entry says "Certified: 481 → 500" but the pack file actually has 481, flag the discrepancy. This transforms Rules 1 and 4 from presence checks to basic integrity checks. However, it cannot verify the *semantic* correctness of the entry — only that the stated numbers match reality.

---

## 6. Script Hygiene Plan

### 6.1 Current State

| Metric | Value |
|--------|-------|
| Total scripts/ files | 1,176 (all files including subdirectories) |
| Top-level JS scripts | 224 |
| Categorized | 105 (46.9%) |
| Uncategorized | 119 (53.1%) |
| Cataloged by SESSION950 | 22 uncertain scripts |
| Unexamined | ~97 |

### 6.2 Recommended Approach — Three-Pass Taxonomy

**Pass 1 — Filename Classification (1 hour):**
Classify every top-level `.js` file by naming convention:
- `sNNN_*` → session-specific
- `scan_*` → defect scanner
- `build_*` → generator/builder
- `test_*` → test
- `_*` → abandoned/debug
- `session*_*` → session-specific
- `agent_*` → agent tool
- `verify_*` → verification tool
- Unclassified → requires Pass 2

**Pass 2 — Deep Read (5 hours):**
For each of the ~97 unexamined uncategorized scripts:
1. Open the file
2. Read first 30 lines — identify purpose, dependencies, session origin
3. Classify into a functional category
4. Decision: keep / archive / delete

**Pass 3 — Archive & Document (2 hours):**
1. Move confirmed one-offs to `scripts/archive/` (preserve for forensic purposes)
2. Add `.archive` suffix to abandoned/debug prototypes
3. Flag any script using forward-scan regex (DL-029 risk) — prevent invocation for production decisions
4. Create `scripts/README.md` with:
   - Structured taxonomy (by function: Scanners, Builders, Validators, Tests, Session Tools, Archive)
   - For each active production script: purpose, invocation, prerequisites, output format
   - List of archived scripts with archive rationale
5. Update SESSION950_UNCERTAIN_SCRIPTS_INDEX.md to reflect final taxonomy

### 6.3 Archival Policy

**Never delete.** Even abandoned prototypes may contain forensic value for reconstructing the defect-discovery timeline (e.g., DL-028 tooling regression evidence exists only in file diffs). Move to `scripts/archive/` with a `.archive` suffix and a one-line comment at the top explaining the archive date and rationale.

**Immediate archive candidates (DL-029 risk):**
- `check_ew.js` — forward-scan regex, DL-029 susceptible
- `session86_dl8_scan.js` — marked candidate_archive by SESSION950
- `session86_dl026_scan.js` — marked candidate_archive by SESSION950

---

## 7. Risk Assessment

### 7.1 Risks by Component

| Component | Risk | Mitigation |
|-----------|------|------------|
| generate_registry.js fix | LOW — regex update only | Test against all 5 QID formats before production run |
| DL-021 Guard Rule 10 | LOW — extends existing pattern | Add to test suite before deployment; 3 test cases |
| scan_dl031.js | MEDIUM — 20-30% false positive rate on definition-match detection | Dry-run mode default; no auto-apply without `--apply` flag; verification queue for borderline cases |
| pre_delivery_safety_check.js | LOW — uses production-grade pack_reader.js | Hardcode known-defective QID lists from DEFECT_LIBRARY.md; update lists when defects are resolved |
| rebuild_baselines.js | MEDIUM — CURRENT_BASELINES.md table parsing fragile | Fallback: read file paths from hardcoded manifest, write complete new §1 section. Preserve §3-§6 as-is |
| post_change_qc.js | MEDIUM — chains 7 external scripts; any script failure breaks chain | Each step wrapped in try/catch; partial results aggregated; failure in one step does not prevent remaining steps from executing |
| CI/CD Pipeline | LOW — standard GitHub Actions pattern | Test workflow on a branch before merging to main |
| Script Hygiene Pass | LOW — read-only classification | Archive, never delete. Preserve forensic trail |

### 7.2 Systemic Risks

**Risk: Automation produces false confidence.** A script that reports "0 defects" may be wrong if its parsing methodology is flawed (the DL-029 lesson). Mitigation: every scanner output must include its parsing methodology in the output JSON (Function constructor vs. string-aware brace vs. forward-scan regex). Any forward-scan tool produces a `"methodology_warning": "DL-029 SUSCEPTIBLE"` flag.

**Risk: Automation conceals drift.** If `post_change_qc.js` auto-updates CURRENT_BASELINES.md hashes on every change, a malicious or buggy change that corrupts pack files would be immediately baselined and accepted. Mitigation: hash auto-update is gated behind an explicit `--update-baselines` flag. Without the flag, the script only *reports* the drift — it does not update.

**Risk: Concurrent-write data loss (DL-019) persists.** No automation can prevent two sessions from writing to the same pack file simultaneously. The governance guard operates within a single session and has no inter-session coordination. Mitigation: `post_change_qc.js` hash drift detection catches the *symptom* (unexpected hash change after a write that should have been self-contained). The root cause requires a file-lock protocol — out of scope for this automation roadmap.

### 7.3 What Cannot Be Automated (and Shouldn't Be Attempted)

| Task | Reason |
|------|--------|
| CAQS 6-dimension verification | Requires reading stems, independently solving items, evaluating distractor quality — irreducible accounting judgment |
| DL-010 semantic misassignment detection | Requires NLP understanding of explanation text vs. choice text — no structural check can catch this |
| Stem authoring for new items | Requires domain knowledge, test-design creativity, and cross-pack uniqueness verification |
| Distractor engineering | Each distractor must target a documented CMA exam trap or student misconception — template generation creates DL-013 boilerplate |
| CorrectChoice verification for conceptual items | Requires understanding the accounting principle and the specific fact pattern — equivalent to passing a CMA exam |
| REVISION_HISTORY.md narrative content | The template generator can produce the skeleton (QID list, counts, before/after) but the narrative explaining *why* changes were made requires agent authorship |

---

## 8. Appendix A — Score Component Definitions

These definitions are proposed for formal adoption in the next CURRENT_BASELINES.md update. They make the automation score auditable and repeatable.

| Component | Max | What "10" means | Current |
|-----------|-----|-----------------|---------|
| Governance Guard | 20 | All known structural defect classes blocked at write time; all content-change rules tracked at session idle; test suite >= 50 tests; 100% pass rate | 19 |
| Validator Framework | 15 | Single-command invocation; auto-chained with governance guard; output structured JSON; all validators use CC-position-aware parsing | 8 |
| Defect Scanning | 15 | Scanners exist for all 5 major defect classes (DL-008, DL-021, DL-026, DL-031, DL-037); all use Function constructor; single-command scan-all; integrated with CI | 5 |
| Registry Automation | 10 | Registry regenerates on every pack file change; section mapping is A-F with correct counts; consumed by downstream tools; no manual edits | 3 |
| Baselines Automation | 10 | Single-command full regeneration from source; auto-update on pack modification; hash drift detection integrated with QC pipeline; integrated with CI | 2 |
| CI/CD Pipeline | 10 | Push-triggered: validate → governance guard → pre-delivery safety → baseline drift; PR gating; artifact retention; deploy to staging | 0 |
| Pre-Delivery Automation | 10 | Single-command delivery pool verification; cross-references known-defective QIDs; section coverage check; auto-blocks delivery if stop conditions triggered; integrated with CI | 1 |
| Script Hygiene | 10 | All scripts taxonomized by function; active production scripts documented with purpose, invocation, output; abandoned scripts archived; no forward-scan tools in active use | 10 |

---

## Appendix B — Key File References

| File | Path | Role |
|------|------|------|
| S365 Gap Report | `reports/sustainability/SESSION365_AUTOMATION_GAP_REPORT.md` | Current-state assessment, gap identification |
| S367 Time-Loss Analysis | `reports/session367/SESSION367_TIME_LOSS_ANALYSIS.md` | Per-workflow labor breakdown, automation feasibility |
| S367 Remediation Automation | `reports/session367/SESSION367_REMEDIATION_AUTOMATION.json` | Structured analysis of 5 workflows, 24.5 automatable hours |
| S369 Roadmap JSON | `reports/session369/SESSION369_AUTOMATION_ROADMAP.json` | This session's roadmap data (companion file) |
| Governance Guard | `.opencode/plugins/governance-guard.js` | 9 BLOCK rules, 354 lines |
| Governance Guard Tests | `scripts/test_governance_guard.js` | 51 tests, 658 lines |
| Pack Reader | `scripts/engine/pack_reader.js` | Function constructor parser, CC-position-aware |
| Pipeline Orchestrator | `scripts/pipeline_orchestrator.js` | Framework v2, 296 lines, manual invoke |
| Scan Orchestrator | `scripts/scan_orchestrator.js` | Gate -1 through Gate 4 pipeline, 542 lines |
| Current Baselines | `knowledge/CURRENT_BASELINES.md` | 13 file hashes, Certified pool counts |
| Defect Library | `knowledge/DEFECT_LIBRARY.md` | DL-001 through DL-037, all known defects |
| Script Sprawl Index | `scripts/SESSION950_UNCERTAIN_SCRIPTS_INDEX.md` | 22 uncertain scripts cataloged |
