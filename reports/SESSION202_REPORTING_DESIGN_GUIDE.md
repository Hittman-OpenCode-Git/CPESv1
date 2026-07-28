# SESSION 202 — Reporting Design Guide

**Version:** 1.0
**Status:** Active
**Authority:** SESSION202_REPORTING_MINIMALIST_MODEL.json
**Applies to:** All sessions S830+
**Generated:** 2026-07-27
**Type:** Operational Design Guide

---

## 1. Purpose

This guide defines how to write, enforce, and maintain the 4-report model for the CMA Part 1 Exam Simulator. It is the operational companion to `SESSION202_REPORTING_MINIMALIST_MODEL.json`.

Every session S830+ produces exactly 4 reports. No more without explicit authorization.

---

## 2. The Four Reports at a Glance

| # | Report | File Name | Format | Producer | Audience | When |
|---|--------|-----------|--------|----------|----------|------|
| 1 | Readiness Report | `SESSIONNNN_READINESS_REPORT.json` | JSON | Governance Board Agent | Operations / Session Arbiter | Pre-session + Tmid |
| 2 | Quality Report | `SESSIONNNN_QUALITY_REPORT.json` | JSON | Quality Board (3 agents) | Quality Board, Certification Board | Per-batch + post-session |
| 3 | Certification Decision Report | `SESSIONNNN_CERTIFICATION_REPORT.json` | JSON | Certification Board | Certification Board, Governance Board | Post-session |
| 4 | Governance & Audit Report | `SESSIONNNN_GOVERNANCE_REPORT.md` | MD | Governance Board | All boards (session closeout) | Post-session (Tend) |

---

## 3. Report Templates

### 3.1 Report 1 — Readiness Report

**Naming:** `SESSIONNNN_READINESS_REPORT.json` (e.g., `SESSION830_READINESS_REPORT.json`)

**When:** Generated at T0 (pre-session). Updated at Tmid if session exceeds 30 minutes.

**Required sections:**

```json
{
  "session": "SNNN",
  "report_type": "READINESS",
  "generated_timing": "T0",
  "generated_at": "2026-07-27T14:00:00Z",
  "produced_by": "Governance Board — Session Arbiter",

  "session_gate": {
    "gate_status": "SESSION_READY",
    "blocking_conditions": [],
    "governance_guard": {
      "rules_active": 8,
      "rules_passed": 8,
      "rule_details": {
        "RULE_1": "PASS", "RULE_2": "PASS", "RULE_3": "PASS",
        "RULE_4": "PASS", "RULE_5": "PASS", "RULE_6": "PASS",
        "RULE_7": "PASS", "RULE_8": "PASS"
      }
    },
    "t0_hash_verification": {
      "all_13_matched": true,
      "mismatches": []
    }
  },

  "portfolio_snapshot": {
    "certified_count": 2221,
    "total_items": 2900,
    "certified_percentage": 76.6,
    "domain_distribution": {
      "A": { "certified": 481, "total": 500 },
      "B": { "certified": 500, "total": 500 },
      "C": { "certified": 350, "total": 500 },
      "D": { "certified": 350, "total": 500 },
      "E": { "certified": 400, "total": 500 },
      "F": { "certified": 140, "total": 500 }
    },
    "question_state_counts": {
      "Unprocessed": 300,
      "In_Audit": 179,
      "Editorial_Queue": 0,
      "Certified": 2221,
      "Archived": 200
    }
  },

  "session_plan": {
    "session_type": "CERTIFICATION_WAVE",
    "target_qids": ["P1-CD-001", "P1-CD-002", "..."],
    "estimated_operations": 50,
    "delta_from_last_session": {
      "new_certified_items": 0,
      "defect_counts_delta": { "dl008": 0, "dl026": 0, "dl013": 0 },
      "registry_changes": []
    },
    "domain_e_f_readiness": {
      "domain_e_seeds_remaining": 38,
      "domain_f_seeds_remaining": 25,
      "batch_plan": "Wave 4: 28 items, Wave 5: 25 items"
    }
  }
}
```

**What NOT to include:**
- Per-item quality scores (→ Report 2)
- Certification decisions (→ Report 3)
- Per-item EW slot detail (→ Report 2)
- Audit trail narrative (→ Report 4)
- REVISION_HISTORY.md entry content (→ Report 3 prepares, Report 4 validates)

**Quality criterion:** A Session Arbiter can determine Go/No-Go in under 3 minutes.

---

### 3.2 Report 2 — Quality Report

**Naming:** `SESSIONNNN_QUALITY_REPORT.json` (e.g., `SESSION830_QUALITY_REPORT.json`)

**When:** Per-batch (after each batch completes Quality Board review). Final aggregate post-session combines all batches.

**Required sections:**

```json
{
  "session": "SNNN",
  "report_type": "QUALITY",
  "generated_at": "2026-07-27T15:30:00Z",
  "produced_by": "Quality Board — Agents 1 (Technical), 2 (Psychometric), 3 (Structural)",

  "structural_state": {
    "dl008_count": 0,
    "dl008_qids": [],
    "dl026_count": 0,
    "dl026_qids": [],
    "dl018_count": 0,
    "dl021_count": 0,
    "dl013_count": 12
  },

  "content_quality": {
    "technical_accuracy_pct": 100.0,
    "items_failing_technical": [],
    "distractor_quality_score": 8.4,
    "explanation_quality_score": 8.1,
    "ev_compliance_breakdown": {
      "EV1": { "pass": 28, "fail": 0 },
      "EV2": { "pass": 28, "fail": 0 },
      "EV3": { "pass": 26, "fail": 2 },
      "EV4": { "pass": 28, "fail": 0 },
      "EV5": { "pass": 28, "fail": 0 },
      "EV6": { "pass": 28, "fail": 0 },
      "EV7": { "pass": 28, "fail": 0 },
      "EV8": { "pass": 28, "fail": 0 }
    },
    "coso_citation_audit": { "missing": 2, "qids": ["P1-CD-014", "P1-CD-028"] },
    "dl031_detected": [],
    "dl010_detected": [],
    "dl016_detected": []
  },

  "ew_integrity": {
    "ew_fill_rate": 96.4,
    "ew_boilerplate_rate": 3.6,
    "ew_choice_specificity_rate": 94.1,
    "correctchoice_accuracy": 100.0,
    "dl030_detected": []
  },

  "per_item_verdicts": {
    "items_reviewed": 28,
    "items_certifiable": 26,
    "items_needs_revision": 2,
    "items_rejected": 0,
    "per_item": [
      {
        "qid": "P1-CD-001",
        "compound_key": "P1-CD-001|C|PATTERN_A|TEMPLATE_F3|pack_d_corrected.js",
        "caqs_scores": {
          "D1_Blueprint": 10, "D2_Cognitive": 9, "D3_Technical": 10,
          "D4_Distractor": 8, "D5_Realism": 9, "D6_Numerical": 10,
          "D7_Explanation": 8, "D8_Clarity": 9, "D9_Accessibility": 9,
          "D10_Metadata": 10
        },
        "overall_score": 92.0,
        "quality_tier": "Exam-Ready",
        "verdict": "CERTIFIABLE",
        "distractor_tier_map": { "A": "calculation_error", "B": "principle_misapplication", "D": "conceptual_confusion" },
        "rendering_compliance": true
      }
    ]
  },

  "difficulty_distribution": {
    "difficulty": { "Easy": 4, "Moderate": 18, "Difficult": 5, "Very_Difficult": 1 },
    "blooms": { "Remember": 1, "Understand": 4, "Apply": 15, "Analyze": 6, "Evaluate": 2 },
    "dl031_recalibrations": 2
  }
}
```

**What NOT to include:**
- Portfolio certified count (→ Report 1)
- Session authorization decisions (→ Report 1)
- Certification state changes (→ Report 3)
- Governance guard status (→ Report 1)
- Defect library update log (→ Report 4)

**Quality criterion:** A Quality Board chair can assess whether all items are certifiable in under 5 minutes.

---

### 3.3 Report 3 — Certification Decision Report

**Naming:** `SESSIONNNN_CERTIFICATION_REPORT.json`

**When:** Post-session, after all batches complete Certification Board adjudication.

**Required sections:**

```json
{
  "session": "SNNN",
  "report_type": "CERTIFICATION",
  "generated_at": "2026-07-27T16:00:00Z",
  "produced_by": "Certification Board",

  "certification_decisions": {
    "certification_round": "Domain D Wave 1",
    "items_certified": 26,
    "items_held": 2,
    "items_escalated": 0,
    "per_item": [
      {
        "qid": "P1-CD-001",
        "compound_key": "P1-CD-001|C|PATTERN_A|TEMPLATE_F3|pack_d_corrected.js",
        "decision": "CERTIFY",
        "caqs_score": 92.0,
        "evidence_dimensions": ["Technical: PASS (Agent 1)", "Psychometric: PASS (Agent 2)", "Structural: PASS (Agent 3)"],
        "distractor_tier_map": { "A": "calculation_error", "B": "principle_misapplication", "D": "conceptual_confusion" }
      },
      {
        "qid": "P1-CD-014",
        "compound_key": "P1-CD-014|A|PATTERN_B|TEMPLATE_F3|pack_d_corrected.js",
        "decision": "HOLD",
        "conditions": ["Missing COSO citation in EW slots A, C", "EW slot D < 50 chars"],
        "remediation_owner": "Quality Board Agent 2 (Psychometric/Instructional)",
        "reverify_path": "Quality Board Agent 3 (Structural) re-verifies after fix"
      }
    ]
  },

  "state_transitions": {
    "pre_session_counts": { "Certified": 2221, "In_Audit": 179, "Unprocessed": 300, "Archived": 200 },
    "post_session_counts": { "Certified": 2247, "In_Audit": 155, "Unprocessed": 298, "Archived": 200 },
    "transitions": [
      { "qid": "P1-CD-001", "from": "In_Audit", "to": "Certified" }
    ],
    "certified_count_before": 2221,
    "certified_count_after": 2247,
    "certified_net_change": 26
  },

  "evidence_package": {
    "quality_report_ref": "SESSIONNNN_QUALITY_REPORT.json",
    "readiness_report_ref": "SESSIONNNN_READINESS_REPORT.json",
    "registry_ref": "MASTER_QUESTION_REGISTRY.md (2026-07-27T14:00:00Z)",
    "gnew_rules_enforced": ["G-NEW-1", "G-NEW-2", "G-NEW-3", "G-NEW-4"]
  },

  "revision_history_prepared": {
    "entry_text": "## Session NNN — Domain D Wave 1 Certification\n\n**Date:** 2026-07-27\n**Type:** Certification Wave\n\n### Certified: 26 items (P1-CD-001 through P1-CD-028, excluding P1-CD-014, P1-CD-022)\n...",
    "entry_validated": false
  }
}
```

**What NOT to include:**
- Per-item quality dimension breakdown (→ Report 2 — referenced, not duplicated)
- Structural defect inventory (→ Report 2)
- Portfolio snapshot (→ Report 1)
- Governance events (→ Report 4)

**Quality criterion:** A Certification Board member can verify every CERTIFY decision against evidence in 5 minutes.

---

### 3.4 Report 4 — Governance & Audit Report

**Naming:** `SESSIONNNN_GOVERNANCE_REPORT.md`

**When:** Post-session at Tend, as the session closing document.

**Required sections (Markdown):**

```markdown
# Session NNN — Governance & Audit Report

**Generated:** 2026-07-27T16:30:00Z
**Produced by:** Governance Board
**Session Type:** Certification Wave
**Session Status:** CLOSED

---

## 1. Session Close Authorization

| Item | Status |
|------|--------|
| Close Decision | SESSION_CLOSE_AUTHORIZED |
| Tend Hash Verification | 13/13 match T0 (no drift) |
| Backup Protocol | Verified — pack_d_corrected.js.bak-20260727160030 (1,894,646 bytes) |
| REVISION_HISTORY.md Entry | Written and validated |
| No Staged Findings | Confirmed — all defects logged to DEFECT_LIBRARY.md |
| Governance Guard Post-Session | 8/8 PASS, 0 violations |

---

## 2. Portfolio Authorization (Tier 3)

| Item | Status |
|------|--------|
| Portfolio Decision | PORTFOLIO_READY |
| Delivery Pool Safety | 0 known-defective QIDs in delivery pool |
| Pre-Delivery Safety Check | PASS |
| Portfolio Health Index | 82.3 (Grade B+) |

### Active Risks

| Severity | Count | Top Risk |
|----------|-------|----------|
| Critical | 0 | — |
| High | 1 | DL-008: 0 remaining in Certified pool, but 10 DL-026 items in Pack D Section C (In Audit, excluded) |
| Medium | 3 | DL-013: 851 boilerplate fields remaining in non-Certified sections |
| Low | 5 | DL-031: ~500 difficulty inflation items uncorrected |

---

## 3. Session Governance Events

- **Critical Incidents:** 0
- **Concurrent Write Events:** 0 (file-lock protocol active)
- **P0 Blockers:** 0
- **Scan Discrepancies:** 0 (dual-verification: Select-String = Function constructor parse = 2,247)
- **Agent Anomalies:** 0

### Governance Guard Actions

| Rule | Level | Fired | Details |
|------|-------|-------|---------|
| RULE 2 | BLOCK | NO | All EW[CC] slots verified empty on write |
| RULE 5 | BLOCK | NO | 26 items ≤ 30 cap |
| RULE 6 | BLOCK | NO | Pre-flight gate PASS before state transitions |
| RULE 7 | BLOCK | NO | All non-CC EW slots present and non-empty on certified items |

---

## 4. Defect Library Updates

### New Defects Discovered
None.

### Existing Defects Resolved
None (no defects in scope for this certification wave).

### Status Changes
None.

---

## 5. REVISION_HISTORY.md Governance Appendix

| Field | Value |
|-------|-------|
| Entry Prepared | Yes (by Certification Board, Report 3) |
| Entry Validated | Yes (by Governance Board, this report) |
| Content Changes | 0 (certification only — existing items promoted) |
| Certification Changes | 26 items: Unprocessed → Certified |
| Governance Changes | 0 |

### Entry Preview
```
## Session NNN — Domain D Wave 1 Certification
...
```

---

## 6. Reporting Compliance Self-Check

| Item | Status |
|------|--------|
| Reports Produced | 4 |
| Under Soft Cap (≤8) | YES |
| Excess Report Justification | N/A |

### Files Produced
1. `SESSIONNNN_READINESS_REPORT.json`
2. `SESSIONNNN_QUALITY_REPORT.json`
3. `SESSIONNNN_CERTIFICATION_REPORT.json`
4. `SESSIONNNN_GOVERNANCE_REPORT.md`

---

*End of Governance & Audit Report. Session NNN closed. Handoff to Session NNN+1 via Report 1 (Readiness).*
```

**What NOT to include:**
- Per-item quality breakdown (→ Report 2)
- Full certification decisions list (→ Report 3)
- Domain distribution detail (→ Report 1)
- Agent deployment play-by-play (→ Report 1 mid-session)

**Quality criterion:** A Governance Board member can confirm session closure and portfolio safety in under 5 minutes.

---

## 4. What NOT to Report — The "No-Go" List

The following metrics and content types have been identified as producing zero downstream decisions. They shall not appear in any of the 4 reports:

| Metric / Content | Why It Doesn't Drive Decisions | Where It Lives (if retention needed) |
|------------------|-------------------------------|--------------------------------------|
| Agent runtime logs (execution timestamps, model IDs) | Does not change certification or governance outcomes | Temp directory, auto-purged |
| Per-scan methodology descriptions (e.g., "used Select-String with pattern X") | Methodology is standardized in DEFINITIVE_PARSER_VALIDATION.md | Reference document, not per-session report |
| Historical session comparison tables (>5 sessions back) | Decisions are made on current state, not historical trends | Retained in REVISION_HISTORY.md for reference |
| Agent coordination narrative ("Agent A handed off to Agent B...") | Process documentation, not governance evidence | Retired — no retention needed |
| Scanner observation logs (raw output with 26 false positives) | Adjudicated in Quality Board; raw scanner output is noise | Temp directory during session, not persisted |
| "Reports about reports" (REPORTING_PACKAGE.json) | Recursive — reports about the act of reporting | Retired entirely |
| Duplicate metric copies across reports | See metric deduplication map in the JSON model | Each metric has 1 authoritative report + at most 1 secondary |
| Forecast files with identical data to session plan | Session plan in Report 1 already contains forecast | Collapsed into Report 1 |
| Per-agent confidence percentages with no action tied | Confidence without action is informational noise | Retired — only report confidence when it triggers a decision |
| "All checks passed" boilerplate paragraphs | Binary governance gates are tables, not prose | Replaced by structured table in Report 4 |

**The golden rule:** If a metric cannot be traced to a specific decision (Go/No-Go, CERTIFY/HOLD, CLOSE/BLOCKED), it does not belong in a report.

---

## 5. How to Retire Legacy Reports

### 5.1 Archival Without Deletion

The corpus of 1,227 legacy report files is not deleted. It is moved. This preserves the full audit trail.

**Archive command (governed, single batch at S830):**

```powershell
# Pre-archive verification
$preCount = (Get-ChildItem -Path "reports" -Recurse -File | Measure-Object).Count
Write-Output "Pre-archive file count: $preCount"

# Create legacy directory structure
New-Item -ItemType Directory -Path "reports\legacy" -Force
@("100_series", "300_series", "500_series", "600_series", "700_series", "800_series_pre_S830") | ForEach-Object {
    New-Item -ItemType Directory -Path "reports\legacy\$_" -Force
}

# Move files (session-by-session to verify)
# ... governed batch operations per session series ...

# Post-archive verification
$postCount = (Get-ChildItem -Path "reports" -Recurse -File | Measure-Object).Count
Write-Output "Post-archive file count: $postCount"
Write-Output "Files moved: $($preCount - $postCount)"
```

### 5.2 LEGACY_INDEX.md

An auto-generated index file at `reports/legacy/LEGACY_INDEX.md` maps legacy file names to:

| Field | Description |
|-------|-------------|
| Original filename | Full filename before archival |
| Session | Session ID (e.g., S312) |
| Series | 100/300/500/600/700/800 |
| Content summary | 1-line description extracted from file metadata |
| Date | File creation/modification date |
| Archived path | Where the file now lives in `reports/legacy/` |

**Generation:** Run a single script at S830 archival time. Do not hand-write.

### 5.3 What Stays Active

The following non-session-prefixed reports remain active in the `reports/` root:

| File | Reason |
|------|--------|
| `PORTFOLIO_RISK_REGISTER.json` | Cross-session governance — active risk tracking |
| `GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md` | Consolidated governance reference |
| `DEFINITIVE_PARSER_VALIDATION_2026-07-23.md` | Methodology standard — cited by governance |
| `SESSION31_RECONCILIATION_EXECUTION.md` | G1-G5 runbook — cross-session reference |
| `SESSION52_GOVERNANCE_FOLLOWUP_EXECUTION.md` | Sync Anomaly Playbook — cross-session reference |
| `SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md` | Runtime governance — cross-session reference |
| `FD045_CROSS_SESSION_REFERENCE.md` | FD-045 CAPA — cross-session reference |
| `MAY_*` files | Operational documents in active use |

---

## 6. How to Enforce the 4-Report Cap

### 6.1 Governance Guard Extension

Add Rule 9 to `governance-guard.js`:

```javascript
// RULE 9 — Reporting Cap
// Level: BLOCK (soft) — WARN at ≤8, BLOCK at >8 without marker
// Check: count files in reports/ directory written during current session
// BLOCK if: >8 report files produced AND no BLOCK-AUTHORIZED marker in Report 4
// WARN if: >4 report files produced (encourages phase-down to 4)

RULE 9: {
  level: "BLOCK",
  check: function(sessionReports) {
    const count = sessionReports.length;
    if (count > 8) {
      const report4 = sessionReports.find(r => r.name.endsWith("_GOVERNANCE_REPORT.md"));
      const hasMarker = report4 && report4.content.includes("BLOCK-AUTHORIZED: Reporting cap exceeded");
      if (!hasMarker) return { result: "BLOCK", reason: `${count} reports produced (>8 cap), no BLOCK-AUTHORIZED marker` };
    }
    if (count > 4) return { result: "WARN", reason: `${count} reports produced (>4 target), phase-down in progress` };
    return { result: "PASS" };
  }
}
```

### 6.2 Session Arbiter Enforcement

At T0, the Session Arbiter declares the expected report count: typically 4, maximum 8. If a session is expected to exceed 4 (e.g., Phase 1 infrastructure sessions generating registry snapshots), the BLOCK-AUTHORIZED marker is pre-approved.

At Tend, the Session Arbiter verifies actual report count against declared count. Any unreported excess triggers Rule 9 BLOCK.

### 6.3 What Counts Toward the Cap

Only files written to the `reports/` directory tree during the current session. Specifically:

| Counts | Do Not Count |
|--------|-------------|
| `SESSIONNNN_READINESS_REPORT.json` | `pack_*_corrected.js.bak-*` (backups) |
| `SESSIONNNN_QUALITY_REPORT.json` | `MASTER_QUESTION_REGISTRY.md` (knowledge/) |
| `SESSIONNNN_CERTIFICATION_REPORT.json` | `REVISION_HISTORY.md` (knowledge/) |
| `SESSIONNNN_GOVERNANCE_REPORT.md` | `DEFECT_LIBRARY.md` (knowledge/) |
| Any additional JSON/MD files in reports/ | `CURRENT_BASELINES.md` (knowledge/) |
| | Scripts output in `scripts/` |
| | Agent debug logs in `Temp/` |

---

## 7. Edge Cases

### 7.1 Failed Sessions

A session that encounters a P0 blocker and must halt before completion still produces reports — but truncated:

| Report | Failed Session Handling |
|--------|------------------------|
| Report 1 | Produced at T0 as normal. If failure occurs before Tmid, no Tmid update. |
| Report 2 | Produced for whatever batches completed. Marked `"session_status": "HALTED"`. |
| Report 3 | If no certification occurred: produced with `"items_certified": 0`, `"session_status": "HALTED"`, and a `"failure_reason"` field. |
| Report 4 | Produced with `"close_decision": "SESSION_CLOSE_BLOCKED"` and the failure reason documented. Portfolio gate marked `INCOMPLETE`. |

**Key rule:** A failed session must still produce Report 4 with the failure documented. No session exits without a governance closeout. Per AGENTS.md §12: no staged findings.

### 7.2 Read-Only Sessions

Read-only sessions (audit, research, design) produce zero content changes and zero certification changes. They still produce all 4 reports:

| Report | Read-Only Adaptation |
|--------|---------------------|
| Report 1 | Standard pre-session gate. `"session_type": "READ_ONLY_AUDIT"`. `"estimated_operations": 0`. |
| Report 2 | `"items_reviewed": 0"`. Relevant sections (`R2_STRUCTURAL_STATE`) may still be populated from pre-flight scan. `R2_PER_ITEM_VERDICT` is empty. |
| Report 3 | `"items_certified": 0"`. `"certified_net_change": 0"`. `"certification_round": "N/A — Read-Only"`. |
| Report 4 | Standard close. `"content_changes": 0"`. `"certification_changes": 0"`. |

Report 2 is still generated even if empty — it serves as the structural scan artifact for the session's governance trail.

### 7.3 Emergency Sessions

An emergency session (unexpected defect discovery, critical P0 fix, delivery pool quarantine) may produce a 5th report:

**Emergency Addendum:** `SESSIONNNN_EMERGENCY_ADDENDUM.md`

This file:
- Is exempt from the 4-report cap when marked with `EMERGENCY-AUTHORIZED`
- Must describe the emergency trigger, the specific QIDs affected, and the remediation applied
- Is appended to Report 4's governance events section
- Triggers a mandatory REVISION_HISTORY.md entry with `EMERGENCY` tag

**Cap rule:** Emergency sessions may produce 5 reports (4 standard + 1 addendum) without BLOCK-AUTHORIZED marker. The emergency authorization is implicit in the emergency trigger.

### 7.4 Partial Sessions (Resume After Halt)

A session that halts and resumes produces Report 1 at the resumed T0 (not the original T0). The original T0 Report 1 is preserved for the audit trail. The resumed T0 Report 1 has a `"resumed_from": "SESSIONNNN_READINESS_REPORT.json (original T0)"` field.

Reports 2, 3, and 4 aggregate work from both the pre-halt and post-resume phases. The Report 4 closeout documents the halt + resume as a governance event.

---

## 8. Report Quality Standards

### 8.1 The Five-Minute Rule

Every report must be consumable by its target audience within 5 minutes. This means:

| Principle | Implementation |
|-----------|---------------|
| **Tables over prose** | Governance gates, defect counts, portfolio snapshots are tables (in MD) or structured objects (in JSON). Not paragraphs. |
| **Decisions first** | The Go/No-Go, CERTIFY/HOLD, CLOSE/BLOCKED verdict appears at the top of each report. Supporting evidence follows. |
| **No scrolling walls** | Report 2's per-item verdict is the longest section (potentially 28+ items). Structure it as an array of compact objects — each QID verdict is <10 lines. |
| **Single-page mental model** | A reader should see all section headings without scrolling. In JSON: top-level keys are sections. In MD: `##` headings visible in outline. |
| **Color/warning independent** | Reports render correctly in plain text. No color coding, no emoji, no rich formatting. Bold/italic is the only formatting in MD. |

### 8.2 Consistency Rules

| Rule | Description |
|------|-------------|
| CR1 | Certified count in Report 1 must equal certified count in Report 3's post_session_counts |
| CR2 | Defect counts in Report 2 must agree with defect counts in Report 4's portfolio risks |
| CR3 | Report 3's evidence_package must reference the correct filenames for Reports 1 and 2 |
| CR4 | Report 4's revision entry preview must match Report 3's revision_history_prepared entry text |
| CR5 | All timestamps are ISO 8601 with seconds precision (2026-07-27T16:30:00Z) |
| CR6 | All QID references use the compound key format (QID|CC|EW_Pattern|Template_Family|File_Path) |

### 8.3 Validation Before Publish

Before any report is considered final:

```
Report 1: governance guard test suite passes → hash verification dual-confirmed → publish
Report 2: all 3 Quality Board agents sign off → per-item scores validated → publish
Report 3: all CERTIFY decisions cross-referenced against Report 2 evidence → publish
Report 4: CR1-CR6 consistency check → REVISION_HISTORY.md entry validated → publish
```

---

## 9. Interface with REVISION_HISTORY.md

### 9.1 The Chain

The 4-report model does not replace REVISION_HISTORY.md. It feeds it:

```
Report 1 (Readiness) → confirms prerequisites met
Report 2 (Quality)    → provides per-item CAQS scores and defect evidence
Report 3 (Certification) → prepares the REVISION_HISTORY.md entry text
Report 4 (Governance) → validates and confirms the entry was written
```

### 9.2 What Goes in REVISION_HISTORY.md

Every session produces exactly one REVISION_HISTORY.md entry. The entry is prepared by Certification Board (Report 3) and validated by Governance Board (Report 4).

**Required fields per AGENTS.md §4:**

| Field | Source |
|-------|--------|
| Session ID and date | Report 4 header |
| Type (read-only, certification, remediation, governance) | Report 1 session_type |
| QuestionIDs affected | Report 3 per_item_decisions |
| Before/after counts (certified, in_audit, archived) | Report 3 state_transitions |
| Verification results | Report 2 per-item verdicts |
| Distractor tier map | Report 3 per_item_decisions |
| Content changes count | Report 4 |
| Defect library updates | Report 4 defect_updates |

### 9.3 The Write Order

1. Report 3 prepares the entry text in `R3_REVISION_HISTORY_DATA`
2. Report 4 validates the entry text against CR1-CR6 consistency rules
3. Governance Board writes the validated entry to `knowledge/REVISION_HISTORY.md`
4. Report 4 confirms the write in `R4_REVISION_APPENDIX.entry_validated = true`
5. Session closes

No REVISION_HISTORY.md write occurs before Step 4. In failed sessions, the prepared-but-unwritten entry text is captured in Report 4 for the next session to handle.

---

## 10. Migration Path (v1 → v2)

### 10.1 Phase 1 — S830 (Dual-Run)

Phase 1 runs both v1 and v2 reporting in parallel. The 4 v2 reports are produced alongside legacy reports. This allows:

- Validation that Report 2 captures all structural defect data previously in 6 separate EW audit files
- Validation that Report 1 is sufficient for Session Arbiter Go/No-Go decisions
- Measurement of the reporting burden reduction (files per session drops from 11.7 → 4)

**At Phase 1 close:** If 4-report model passes dual-run validation (all governance decisions can be made from v2 reports alone), Phase 2 activates and v1 reports retire to legacy.

### 10.2 Phase 2 — S900 (v2 Authoritative)

Only the 4 v2 reports are produced. Legacy reports are archived. Soft cap enforced at 8.

### 10.3 Phase 3 — S910 (Hard Cap)

Hard cap at 4 reports per session. Any session producing >4 files must carry `BLOCK-AUTHORIZED` marker (emergency sessions exempt per §7.3).

---

## Appendices

### A. Quick Reference — Which Report Has What

| I need to find... | Look in... |
|-------------------|------------|
| Is the session safe to start? | Report 1, §session_gate.gate_status |
| What's the current certified count? | Report 1, §portfolio_snapshot.certified_count |
| How many DL-008 items remain? | Report 2, §structural_state.dl008_count |
| What's the EW fill rate? | Report 2, §ew_integrity.ew_fill_rate |
| Which items were certified this session? | Report 3, §certification_decisions.per_item |
| What state transitions occurred? | Report 3, §state_transitions.transitions |
| Is the portfolio safe for learners? | Report 4, §2. Portfolio Authorization |
| Were any defects discovered? | Report 4, §4. Defect Library Updates |
| Was the REVISION_HISTORY entry written? | Report 4, §5. REVISION_HISTORY Appendix |
| How many reports were produced? | Report 4, §6. Reporting Compliance |

### B. Naming Convention

```
SESSION{NNN}_{REPORT_TYPE}.{format}
           └─── READINESS_REPORT
           └─── QUALITY_REPORT
           └─── CERTIFICATION_REPORT
           └─── GOVERNANCE_REPORT
           └─── EMERGENCY_ADDENDUM (edge case only)
```

No file name exceeds 60 characters. No version numbers or dates in filenames (metadata is in file content).

### C. Revision History

| Version | Date | Summary |
|---------|------|---------|
| 1.0 | 2026-07-27 | Initial design guide. Defines 4-report model, templates, enforcement, edge cases, and migration path. Derived from S200 Agent G + S201 Agent G + S311-S320 report inventory analysis. |

---

*End of SESSION202_REPORTING_DESIGN_GUIDE.md. Companion to SESSION202_REPORTING_MINIMALIST_MODEL.json.*
