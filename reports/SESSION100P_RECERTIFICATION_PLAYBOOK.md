# Session 100P — Recertification Playbook

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Input:** S95P (review workflow), S96P (pilot protocol), S97P (automation engine), Governance Guard Rules
**Status:** COMPLETE

---

## 1. Purpose

This playbook defines the step-by-step protocol for executing cognitive reclassification on the repository's higher-order items. It is designed to be used by **build-time AI verification** or **human reviewers** executing batch relabeling sessions.

**Core principle:** This is a metadata correction exercise, not a content rewrite program. Zero stems, choices, explanations, or answer keys are modified.

---

## 2. Pre-Execution Checklist

Before any relabeling session:

- [ ] **Lane:** Full Governance Lane (pack file writes)
- [ ] **Preflight at T0:** `npm run preflight` — confirm 0 divergences
- [ ] **Backup protocol:** Confirm backup directory accessible
- [ ] **Batch size:** Confirm ≤30 items per batch
- [ ] **Target pack file:** Verify current state (QID count, parse OK, certified count)
- [ ] **Session 92 / May overlap:** Confirm no concurrent content/modernization session operating on same pack file
- [ ] **Automated gate run:** Run `s097p_automated_gate.js` to get current per-item AF state
- [ ] **QID list:** Exact list of QIDs for this batch, with current and target CognitiveLevel + Difficulty

---

## 3. Classification Decision Protocol

### 3.1 Automated Gate Trust Levels

| Gate | Trust Level | Action |
|------|-------------|--------|
| AF-4 (Taxonomy Classification) | **TRUST** | Auto-reclassify. No human review needed. |
| AF-5 (Difficulty Mismatch) | **TRUST** | Auto-fix metadata inconsistency. |
| AF-3 (Rule Application) | **TRUST** (with trade-off counter-check) | Reclassify to Apply. If counter-signal suppressed (recommend + competing alternatives), escalate to human review. |
| AF-2 (Formula Substitution) | **VERIFY** | Flag for human spot-check. 5-8% FP risk. Items where calculation precedes genuine analysis should NOT be reclassified. |
| AF-6 (Single Correct Option) | **TRIAGE** | Flag for human review. 10-15% FP risk. Do not auto-reclassify. |
| AF-1 (Definition Match) | **DO NOT TRUST** | Only explicit "what term describes X" patterns are automatable. Scenario-framed definitions require semantic review. |

### 3.2 Human Review Protocol (for VERIFY and TRIAGE items)

For each item flagged by AF-2 or AF-6:

1. **Read the full item** — stem, choices, correct answer, explanation
2. **Identify the task** — what does the candidate actually need to do?
3. **Classify using S95P criteria:**
   - Is there a decision maker making a choice between competing alternatives? (Evaluate E1-E3)
   - Is the candidate breaking down data to identify causes, patterns, or relationships? (Analyze A1-A4)
   - Is the candidate executing a known formula, rule, or procedure? (Apply disqualifier)
   - Is the candidate matching a definition to a term? (Understand/Remember disqualifier)
4. **Document evidence** — per S95P Stage 3 format
5. **Record decision** — PASS (keep current label) or RECLASSIFY (new label + reason)

### 3.3 Reclassification Decision Matrix

| Current Label | AF Triggered | Human Review Finding | Action |
|--------------|-------------|---------------------|--------|
| Evaluate | AF-3 (ASC + no trade-off) | No competing alternatives | Reclassify to Apply |
| Evaluate | AF-3 (ASC + no trade-off) | Has competing alternatives + recommendation | KEEP Evaluate (FP) |
| Evaluate | AF-2 (formula) | Single formula, plug-and-chug | Reclassify to Apply |
| Evaluate | AF-2 (formula) | Multi-step calculation + interpretation | KEEP Evaluate or downgrade to Analyze |
| Analyze | AF-3 (rule + no trade-off) | Deterministic rule application | Reclassify to Apply |
| Analyze | AF-4 (taxonomy) | "What type of [X]" classification | Reclassify to Understand or Remember |
| Analyze | AF-5 (Difficulty=1) | Analyze with all criteria met but at Easy | Fix DifficultyScore to ≥3 OR reclassify |

---

## 4. Write Protocol (Per Batch)

### 4.1 For Each Item in the Batch

1. **Locate the item** in the pack file by QuestionID
2. **Verify current state** — read CognitiveLevel, Difficulty, DifficultyScore
3. **Confirm the change** — only modify CognitiveLevel (and Difficulty if needed):
   ```
   BEFORE: "CognitiveLevel": "Evaluate", "Difficulty": "Difficult", "DifficultyScore": 4
   AFTER:  "CognitiveLevel": "Apply", "Difficulty": "Moderate", "DifficultyScore": 3
   ```
4. **Do NOT modify:**
   - Stem, choices, correct answer (CorrectChoice)
   - ExplanationCorrect, ExplanationWrong*
   - question_state, pack_state
   - Any other fields
5. **Apply the change** — string replacement at the exact field boundaries

### 4.2 Batch Completion Checklist

After each batch of ≤30 items:

- [ ] **Backup taken** — timestamped `pack_X_corrected.js.bak-YYYYMMDDHHMMSS`
- [ ] **QID count unchanged** — `grep -c '"QuestionID"'` matches pre-batch count
- [ ] **Parse test** — `node -e "JSON.parse(fs.readFileSync('pack_X_corrected.js', 'utf8').replace(/^.*?=\s*\[|;\s*$/g, ''))"` succeeds for all 500/545 items
- [ ] **Certified count unchanged** — `question_state: "Certified"` count matches baseline (unless explicitly changing it — which this playbook does not)
- [ ] **REVISION_HISTORY entry** — batch logged with QID list, before/after CognitiveLevel, and rationale
- [ ] **Preflight run** — `npm run preflight` → 0 divergences
- [ ] **Governance guard** — `node scripts/test_governance_guard.js` → 54/54 PASS

### 4.3 Difficulty Recalibration Rules

When reclassifying cognitive level, difficulty must be reassessed:

| Old COG → New COG | Difficulty Adjustment |
|-------------------|----------------------|
| Evaluate → Analyze | Keep same difficulty (Analyze can be Moderate to Very Difficult) |
| Evaluate → Apply | Downgrade difficulty by 0-1 tier (e.g., Difficult(4) → Moderate(3)) |
| Evaluate → Understand | Downgrade difficulty by 2+ tiers (e.g., Difficult(4) → Moderate-Easy(2)) |
| Evaluate → Remember | Downgrade difficulty to Easy(1) or Moderate-Easy(2) |
| Analyze → Apply | Downgrade difficulty by 0-1 tier |
| Analyze → Understand | Downgrade difficulty by 1-2 tiers |
| Analyze → Remember | Downgrade difficulty to Easy(1) |

---

## 5. Rollback Protocol

If a batch introduces validator errors or QID count divergence:

1. **Halt immediately** — stop the current batch
2. **Restore from backup** — `copy pack_X_corrected.js.bak-TIMESTAMP pack_X_corrected.js`
3. **Verify restoration** — QID count, parse test, preflight
4. **Diagnose** — what went wrong? Field boundary mismatch? String replacement error?
5. **Re-attempt** — with corrected script/approach
6. **Document** — log the rollback and root cause in REVISION_HISTORY.md

---

## 6. Example Batch Log Entry

```
Batch: S100P-C.1 | 2026-07-31
Pack: pack_c_corrected.js
Section: EC
Items: 28

QID | Before COG | After COG | Before Diff | After Diff | Reason
P1-EC-005 | Evaluate | Remember | Difficult(4) | Easy(1) | AF-4: definition of segregation of duties
P1-EC-007 | Evaluate | Analyze | Difficult(4) | Difficult(4) | AF-3: COSO diagnosis (one-tier slippage)
P1-EC-008 | Analyze | Understand | Difficult(4) | Moderate-Easy(2) | AF-4: COSO framework classification
...

Verified:
  - QID count: 500 (unchanged)
  - Parse: OK
  - Certified count: 455 (unchanged)
  - Preflight: 0 divergences
  - Governance guard: 54/54 PASS
Backup: pack_c_corrected.js.bak-20260731000000
```

---

## 7. Session Closeout

After all batches for a session are complete:

- [ ] **Final preflight** — `npm run preflight` → 0 divergences
- [ ] **Pipeline** — `npm run pipeline` (validate → build-registry → dashboard) if ≥5 batches
- [ ] **REVISION_HISTORY.md** — comprehensive entry covering all batches
- [ ] **DEFECT_LIBRARY.md** — only if a new defect class was discovered during relabeling
- [ ] **CURRENT_BASELINES.md** — update if significant cognitive distribution change
- [ ] **Session closeout** — per AGENTS.md §9.5 Full Governance Lane closeout protocol

---

*Generated: 2026-07-31 | Session 100P Implementer Phase — Recertification Playbook*
