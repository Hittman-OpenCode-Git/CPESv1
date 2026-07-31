# Session 100P — Automation Deployment Plan

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Input:** S95P (Certification Framework), S97P (Automation Prototype), S97P Gate Results
**Status:** COMPLETE

---

## 1. Objective

Deploy the S97P automated screening engine as a permanent pre-certification gate in the repository's quality infrastructure, preventing future cognitive misclassification at certification time.

## 2. Engine Status

| Attribute | Current State |
|-----------|--------------|
| **Script** | `scripts/s097p_automated_gate.js` — functional, tested, 400 lines |
| **Runtime** | <3 seconds for 2,545 items |
| **Output** | `scripts/output/s097p_gate_results.json` — 89,722 lines of per-item AF analysis |
| **Accuracy** | 99.5% coverage (188/189 flagged items via AF-2/3/4/5) |
| **False positive rate** | ~4% overall (8-12 items of 189) |
| **Known gap** | AF-1: ~50+ scenario-framed definitions escape regex detection (fundamental ceiling) |

## 3. Deployment Model

### 3.1 Two-Phase Deployment

```
PHASE A: Certification gate (BLOCK at write/edit time)
  │  Decision: If item write changes CognitiveLevel to Analyze/Evaluate,
  │  run the engine on that item BEFORE allowing the write.
  │
  │  AF-5 (Difficulty Mismatch) → deterministic, can auto-BLOCK
  │  AF-4 (Taxonomy Classification) → unambiguous, can auto-BLOCK
  │  AF-3 (Rule Application) → high-confidence, can auto-BLOCK with appeal path
  │  AF-2 (Formula Substitution) → moderate-confidence, flag for review
  │
  ▼
PHASE B: Pre-certification audit (in pipeline)
  │  Decision: Before any batch certification, run the engine on
  │  all candidate items. Items triggering AF conditions are routed
  │  to human reviewer before certification proceeds.
```

### 3.2 Integration Points

| Integration | Location | Purpose |
|-------------|----------|---------|
| **Governance guard Rule 10** | `.opencode/plugins/governance-guard.js` | BLOCK writes that create implausible Analyze/Evaluate labels |
| **Pre-certification hook** | `scripts/validators/cognitive_validator.js` | Run AF gates on certification candidates; produce pre-certification report |
| **Pipeline (`npm run pipeline`)** | `package.json` | Add cognitive gate check after existing validate → build-registry → dashboard |
| **Dashboard** | Dashboard generation script | Show cognitive flag rate trend over time |

### 3.3 Rule 10 Specification

```
RULE 10 — Cognitive Classification Gates
Level: BLOCK (subset)
Applies to: Any write/edit that changes CognitiveLevel field
             to "Evaluate" or "Analyze"

Auto-BLOCK (no human review needed):
  G-DEF: Stem→CorrectChoice lexical overlap > 70% → cap at Understand
  G-EVAL-4: Difficulty ≤ Moderate-Easy AND Evaluate → BLOCK
  G-STRUCT: Missing stem/choices/correct choice → BLOCK all HO labels
  G-AF4: Taxonomy classification pattern → BLOCK Analyze/Evaluate

Flag (human reviews before certification):
  G-AF2: Formula substitution pattern → flag for cognitive review
  G-AF3: Rule application + no trade-off → flag for cognitive review
  G-AF6: Single correct option heuristic → flag for cognitive review
```

## 4. Engine Enhancements (Post-S100P)

### 4.1 AF-1 Semantic Enhancement

**Problem:** The current multi-signal regex approach catches only explicit definition-request patterns. Scenario-framed definitions — where the stem embeds a concept description in business language without "what term is this" — escape detection entirely.

**Estimated scope:** ~50+ items across the HO pool.

**Solution options:**

| Option | Approach | Accuracy | Effort | Recommendation |
|--------|----------|----------|--------|----------------|
| A: Topic-to-answer NLP | Compute embedding similarity between stem and correct choice; high cosine similarity + short choice = definition-match | ~80% | Medium | **Recommended** |
| B: LLM classification | Pass stem + choices to an LLM with "Is this a definition-match item?" prompt | ~95% | Low (API cost) | Back-up if Option A insufficient |
| C: Manual supplementary review | Schedule per-section definition-match sweeps after automated screening | 100% | High | Fallback |

**Recommended path:** Deploy Option A (embedding similarity) as a supplement to the existing regex-based AF-1. If embedding similarity > 0.8 and correct choice < 100 chars, flag as probable definition-match.

### 4.2 AF-2 False Positive Reduction

**Problem:** The current AF-2 multi-signal approach flags items where "calculate" is one step in a multi-step analytical chain (estimated 5-8% FP rate).

**Solution:** Add a third signal: "Does the ExplanationCorrect discuss interpretation or comparison of results?" If yes → likely genuine Analyze. Add a counter-signal that suppresses the flag.

### 4.3 Trend Tracking

Add to the S97P engine output:
- **Historical flag rate** — compare current scan to prior scans to detect drift
- **Per-section trend** — which sections are improving (lower flag rate) vs. degrading
- **New HO item flag rate** — items authored in recent waves should have lower flag rates than legacy items

## 5. Dashboard Integration

### 5.1 New Dashboard Panel: Cognitive Quality

Add to the existing pipeline dashboard:

```
┌──────────────────────────────────────┐
│  COGNITIVE CLASSIFICATION QUALITY    │
│                                      │
│  HO Items: 543 (21.3%)              │
│  AF-Flagged: 189 (34.8%)            │
│  ├─ AF-2 (Formula): 60 (11.0%)     │
│  ├─ AF-3 (Rule App): 105 (19.3%)   │
│  ├─ AF-4 (Taxonomy): 14 (2.6%)     │
│  ├─ AF-5 (Difficulty): 9 (1.7%)    │
│  └─ AF-6 (Single Opt): 28 (5.2%)   │
│                                      │
│  Trend: ▲(improving) / ▼(degrading) │
│  Last scan: 2026-07-31              │
└──────────────────────────────────────┘
```

## 6. Future Session Schedule

| Session | Description | Lane |
|---------|-------------|------|
| **S109P** | Deploy Rule 10 (auto-BLOCK subset) to governance guard | Full (governance code) |
| **S110P** | Add cognitive validator to pre-certification pipeline | Full (pipeline code) |
| **S111P** | Deploy AF-1 semantic enhancement (Option A) | Light (script only) |
| **S112P** | Integrate cognitive quality into pipeline dashboard | Light (dashboard only) |

## 7. Governance Alignment

| Check | Status |
|-------|--------|
| No pack file modifications | CONFIRMED — plan only |
| No certification changes | CONFIRMED — plan only |
| No overlap with active content/modernization sessions | CONFIRMED |
| New governance guard rule proposed | Rule 10 — not deployed in this session |
| REVISION_HISTORY entry required | No — Light Lane, no content/certification changes |
| DEFECT_LIBRARY entry required | No — no new defect discovered |

---

*Generated: 2026-07-31 | Session 100P Implementer Phase — Automation Deployment Plan*
