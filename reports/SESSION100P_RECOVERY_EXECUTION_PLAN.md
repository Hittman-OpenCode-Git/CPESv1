# Session 100P — Recovery Execution Plan

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Input Sessions:** S92P (Drift), S93P (Audit), S94P (Recovery Strategy), S95P (Certification Framework), S96P (Pilot), S97P (Automation)
**Status:** COMPLETE

---

## 1. Executive Summary

**The quality-recovery track (S92P→S97P) has converged on a clear execution path.** All research questions are answered. All feasibility gates are passed. The remaining step is controlled execution — not further analysis.

This plan defines the concrete path from the current state (543 HO items, 34.8% flagged by automated screening, 58.7% misclassification) to a corrected state where cognitive labels accurately reflect item content.

| Metric | Current | Target After Execution |
|--------|---------|----------------------|
| HO-labeled items | 543 (21.3% of 2,545) | ~350-400 (13.7-15.7%) |
| True HO estimate | ~219 (8.6%) | ~350 (13.7%) after correction + quality creation |
| Evaluate misclassification | 58.7% | <10% (all automated gates deployed) |
| Analyze misclassification | 58.7% | <10% |
| Automated gates active | 0 | 5 (AF-2 through AF-5 + AF-6 heuristic) |
| Certification blocked by automation | 0 | ~60% of new HO labeling attempts blocked at gate |

---

## 2. What Six Sessions of Research Established

### 2.1 The Phylogeny of the Quality Track

```
S92P: Cognitive drift detected across all 12 modernization waves
  ↓        Problem: "Our HO numbers are inflated"
S93P: 150-item stratified audit — 58.7% misclassification rate
  ↓        Finding: 309 overstated items, true HO = ~219 (8.6%)
S94P: 4-phase recovery strategy + 7 automated quality gates defined
  ↓        Framework: label correction → gate deployment → creation → monitoring
S95P: Formal certification framework — rubrics, AF conditions, review workflow
  ↓        Standardization: S95P makes certification repeatable, not subjective
S96P: Pilot validation on Pack C Section EC — 66 items reclassified
  ↓        Calibration: Three-tier model replaces binary "HO vs. lower"
S97P: Prototype engine — 189/543 HO items flagged automatically
          Validation: 4 of 6 AF conditions fully automatable
```

### 2.2 Converged Truths

1. **The problem is classification quality, not content volume.** 309 items need label correction, not rewrite.
2. **AF-3 (Rule Application as HO) dominates.** 105 of 189 flags (55.6%) — the single biggest target.
3. **Relabeling alone is sufficient.** S96P pilot proved zero content rewrites needed for cognitive correction.
4. **4 of 6 AF conditions are fully automatable.** AF-2, AF-3, AF-4, AF-5 capture 188/189 flagged items.
5. **~50+ scenario-framed definitions escape regex detection.** AF-1 semantic ceiling is the known gap.
6. **Three tiers of misclassification.** ~10% order-of-magnitude (multi-tier), ~17% one-tier slippage, ~62% correctly labeled among HO items.

---

## 3. Execution Architecture

### 3.1 Three-Phase Execution

```
PHASE A: Automated Pre-Screening [S97P engine → reclassification queue]
  │  Takes: S97P AF-2/3/4/5 results
  │  Produces: Per-item classification recommendation
  │  Risk: Low (conservative gate — false positives <5%)
  │
  ▼
PHASE B: Human/LLM Semantic Review [AF-1 ceiling + borderline items]
  │  Takes: Items passing automated gates but flagged by sample audit
  │  Produces: Final classification for ~80 scenario-framed definitions
  │  Risk: Medium (requires per-item semantic assessment)
  │
  ▼
PHASE C: Batch Relabeling [Scripted write, ≤30 items per batch]
  │  Takes: Phase A + B classification decisions
  │  Produces: Updated CognitiveLevel + Difficulty fields in pack files
  │  Risk: Very low (metadata-only, no content changes)
```

### 3.2 Governance Constraints

| Constraint | Source | Impact on Execution |
|------------|--------|---------------------|
| Batch cap: ≤30 items | Governance-guard Rule 5 | ~30 batches for full repository |
| Backup-before-write | BACKUP_PROTOCOL.md | 5 pack file backups per batch |
| REVISION_HISTORY entry required | Governance-guard Rule 1 | Per-batch entries (cognitive label change ≠ question_state change per AGENTS.md §4, but best practice) |
| No certification state changes | CAQS §9.2 | CognitiveLevel is metadata — does not trigger re-certification |
| No content changes | Task constraint | Zero rewrites. Labels only. |
| No May changes | Task constraint | May coaching layer unaffected |
| No overlap with Session 92 | Lane safety | S92 edits Pack B Section B content — S100P is read-only analysis |

---

## 4. Phase A — Automated Pre-Screening

### 4.1 What Gets Flagged

Based on S97P prototype results:

| AF Condition | Items Flagged | Confidence | Action |
|-------------|-------------|------------|--------|
| **AF-3** (Rule Application as HO) | 105 | HIGH (97-98%) | Reclassify to Apply |
| **AF-2** (Formula Substitution as HO) | 60 | MODERATE (92-95%) | Pre-screen → human review → reclassify to Apply |
| **AF-4** (Taxonomy Classification as HO) | 14 | VERY HIGH (100%) | Reclassify to Understand or Remember |
| **AF-5** (Difficulty Mismatch) | 9 | CERTAIN (100%) | Fix DifficultyScore OR CognitiveLevel |
| **AF-6** (Single Correct Option) | 28 | MODERATE (85-90%) | Route to human review — heuristic only |
| **AF-1** (Definition Match) | 1 | LOW (sensitivity) | Known ceiling — ~50+ more exist |

### 4.2 Per-Pack Automated Screening Impact

| Pack | HO Items | AF-2 | AF-3 | AF-4 | AF-5 | AF-6 | Unique Flagged | Clean |
|------|---------|------|------|------|------|------|---------------|-------|
| Pack A | 133 | ~10 | ~17 | ~2 | ~2 | ~3 | 34 | 99 |
| Pack B | 42 | ~4 | ~3 | ~1 | ~0 | ~2 | 11 | 31 |
| Pack C | 104 | ~18 | ~18 | ~4 | ~3 | ~6 | 54 | 50 |
| Pack D | 214 | ~24 | ~60 | ~6 | ~3 | ~12 | 79 | 135 |
| Pack E | 50 | ~4 | ~7 | ~1 | ~1 | ~5 | 11 | 39 |
| **Total** | **543** | **60** | **105** | **14** | **9** | **28** | **189** | **354** |

### 4.3 Phase A Execution Protocol

1. Run `s097p_automated_gate.js` → produces `s097p_gate_results.json`
2. Filter to items triggering AF-2/3/4/5 (188 items, 99.5%)
3. AF-2 items: flag for human spot-check (5-8% FP risk). Route borderline items to Phase B.
4. AF-3 items: high-confidence auto-reclassify (97-98% accuracy). Document batch.
5. AF-4 items: auto-reclassify (100% — unambiguous taxonomy classification).
6. AF-5 items: auto-fix (deterministic — either difficulty or cognitive level is wrong).
7. AF-6 items: route to Phase B human review (85-90% accuracy, heuristic only).

---

## 5. Phase B — Semantic Review (AF-1 Ceiling + Borderline)

### 5.1 Scope

| Category | Estimated Items | Detection |
|----------|----------------|-----------|
| Scenario-framed definitions (AF-1 ceiling) | ~50+ | S93P identified pattern: stem embeds textbook definition in business scenario without "what term is this" language |
| Borderline AF-2 items (multi-step calculation) | ~5 | Items where calculation is one step in a genuine analytical chain |
| Borderline AF-3 items (ASC reference is contextual) | ~3 | Items where trade-off language exists but was missed by regex |
| Borderline AF-6 items (competing standard analysis) | ~4 | Items comparing multiple standards before selecting one |
| **Total Phase B** | **~62** | |

### 5.2 Methodology

For each item in Phase B:
1. Read the full item (stem, choices, correct answer, explanation)
2. Apply the S95P Evaluate/Analyze rubrics (all criteria)
3. Classify independently — ignore the stored label
4. Document evidence per S95P Stage 3 (Evidence Collection)
5. Record recommended cognitive level

### 5.3 Phase B Execution

| Step | Items | Method | Effort |
|------|-------|--------|--------|
| B.1: Identify scenario-framed definitions | ~50+ | LLM-based topic classification or human semantic review | ~2 hours (human) or ~5 min (LLM) |
| B.2: Review borderline AF-2 items | ~5 | Human spot-check | ~10 min |
| B.3: Review borderline AF-3 items | ~3 | Human spot-check | ~6 min |
| B.4: Review borderline AF-6 items | ~4 | Human spot-check | ~8 min |
| **Total Phase B** | **~62** | | **~2.5 hours** |

---

## 6. Phase C — Batch Relabeling

### 6.1 Relabeling Protocol

For each item in the confirmed reclassification list:

1. **Read the item** from the source pack file
2. **Locate the CognitiveLevel field** — `"CognitiveLevel": "Evaluate"` or `"Analyze"`
3. **Replace with corrected level** — `"CognitiveLevel": "Apply"` (or Understand/Remember)
4. **Reassess Difficulty** — CAQS-consistent difficulty for the corrected level:
   - Remember → Easy (1) or Moderate-Easy (2)
   - Understand → Moderate-Easy (2) or Moderate (3)
   - Apply → Moderate (3) or Difficult (4)
   - Analyze → Difficult (4) or Very Difficult (5)
   - Evaluate → Difficult (4) or Very Difficult (5)
5. **Backup before write** — per BACKUP_PROTOCOL.md
6. **Document batch** — per governance-guard Rule 5 (≤30 items)

### 6.2 Batch Structure

| Batch | Section | Items | AF Source | Priority |
|-------|---------|-------|-----------|----------|
| C.1 | Pack C EC (AF-3, AF-4) | 28 | AF-3 (ASC/COSO rules) + AF-4 (taxonomy) | P0 |
| C.2 | Pack C EC (AF-2, AF-6) | 24 | AF-2 (formulas) + AF-6 (single option) | P0 |
| C.3 | Pack D DD (AF-3, AF-4) | 17 | All Analyze → Understand/Apply | P0 |
| C.4 | Pack D CD (AF-2, AF-4) | 10 | Definition-matching | P0 |
| C.5 | Pack A Section A (AF-3) | 22 | ASC rules → Apply | P0 |
| C.6 | Pack D Section A (AF-3) | 28 | ASC rules + no tradeoff | P1 |
| C.7 | Pack D Section A (AF-3) | 27 | ASC rules continued | P1 |
| C.8 | Pack C CC (AF-2, AF-3) | 28 | Variance formulas | P1 |
| C.9 | Pack D BD (AF-2, AF-3) | 28 | Budget formulas reframed as HO | P1 |
| C.10 | Pack D BD (AF-2, AF-3) | 22 | Continued | P1 |
| C.11 | Pack D ED (AF-3, AF-6) | 28 | COSO classification | P1 |
| C.12 | Pack D ED (AF-3, AF-6) | 16 | Continued | P1 |
| C.13 | Pack C DC (AF-2, AF-3) | 23 | Cost management formulas | P2 |
| C.14 | Pack C FC (AF-3, AF-4) | 18 | Technology taxonomy | P2 |
| C.15 | Pack D FD (AF-3, AF-4) | 25 | Technology taxonomy | P2 |
| C.16 | Pack A Sections B/C/D (residual) | 28 | Mixed — formula + ASC items | P2 |
| C.17 | Pack B Sections B/C/F (residual) | 23 | Low volume, mixed patterns | P3 |
| C.18 | Pack E All (residual) | 28 | Independent pipeline — per-item audit | P3 |
| C.19 | Pack E All (continued) | 22 | Continued | P3 |
| C.20+ | Phase B semantic review results | ~62 | Scenario-framed definitions + borderline | P3 |
| | **Total** | **~450+** | | ~20 batches |

### 6.3 Scripted Relabeling

A targeted Node.js script (`scripts/s100p_reclassify.js`) can automate batch relabeling:

1. **Input:** JSON lookup table of QID → {new_CognitiveLevel, new_Difficulty, new_DifficultyScore}
2. **Process:** For each QID, find the item in the pack file by QuestionID → locate CognitiveLevel field → replace
3. **Output:** Modified pack file + batch log
4. **Validation:** Re-run preflight + validator after each batch
5. **Batch cap:** Configurable — default ≤30 per governance-guard Rule 5

---

## 7. Three-Tier Model — Calibrated for S96P Findings

### 7.1 Corrected Projection (S93P + S96P + S97P Calibrated)

| Tier | Pattern | % of HO Misclassified | Projected Count | Action |
|------|---------|----------------------|-----------------|--------|
| **Tier 1** | Order-of-Magnitude (Evaluate/Apply → Understand/Remember) | ~10.6% | ~20 | Relabel. No content change. |
| **Tier 2** | One-Tier Slippage (Evaluate → Analyze, Analyze → Apply) | ~16.7% | ~32 | Relabel. Content is well-written. |
| **Tier 3** | Correctly Labeled | ~62.7% | ~118 | No action. |
| **Automated catch (AF-2/3/4/5)** | Across all tiers | 34.8% | 189 | Pre-screen. Human review where needed. |

### 7.2 The S94P Correction

| S94P Claim | Corrected Per S96P/S97P |
|------------|------------------------|
| "0 genuine Evaluate in EC" | **37% truly Evaluate**. Corrected by three-tier model. |
| "Most misclassified items are multi-tier errors" | **~10% multi-tier, ~17% one-tier**. The overstatement profile is flatter. |
| "Rewrites required" | **No rewrites required.** Relabeling sufficient. |

---

## 8. Non-Overlap Verification

| Concurrent Lane | File/Section Overlap | Resolution |
|----------------|---------------------|------------|
| Session 92 (Pack B Section B content rewrites) | S92 edits Pack B Section B content. S100P is read-only analysis across all packs. | **None.** S100P produces no writes. |
| S92 (Pack B distractor rewrites) | S100P analysis flags Pack B items for cognitive relabeling — no content modification. | **None.** S100P produces write recommendations, not writes. |
| May workstreams (MAY-023+) | May coaching / UI. S100P is cognitive quality analysis. | **None.** Different domains, files, and objectives. |
| Prior P-sessions (S93P-S97P) | S100P is the synthesis/convergence of those sessions. | **Downstream consumer.** No conflict. |

---

## 9. Success Metrics

| Metric | Pre-Execution | Post-Execution Target |
|--------|--------------|----------------------|
| Evaluate misclassification | 58.7% (S93P sample) | <10% |
| Analyze misclassification | 58.7% (S93P sample) | <10% |
| HO pool size | 543 labeled | ~350-400 corrected |
| True HO estimate | ~219 (S93P) | ~350 (accurate labels) |
| Automated gates deployed | 0 | 5 |
| Remember-as-Evaluate items | ~26 (S93P projection) | 0 |
| Structural defects in HO | ~3 | 0 |
| Estimated effort | 0 | ~6-8 hours total |
| Content rewrites required | 0 | 0 |

---

## 10. Risk Register

| Risk | Severity | Mitigation |
|------|----------|------------|
| Batch relabeling introduces corrupted JSON | Medium | String-aware parser; validator run after each batch; backup-before-write |
| Human reviewer time not available for Phase B | Medium | Prioritize automated passes first (188 of 189 items captured by AF-2/3/4/5); Phase B is incremental |
| AF-2 false positives (5-8%) cause incorrect downgrades | Low | All AF-2 items routed through human spot-check before write |
| Governance guard Rule 5 batch cap slows execution | Low | 30 items per batch = ~20 batches total. Scripted tooling makes batch operations fast. |
| Pack E R-series QID format breaks extraction | Low | String-aware parser already handles R-series format (verified in S97P) |

---

## 11. Recommended Execution Sessions

| Session | Description | Lane | Est. Duration |
|---------|-------------|------|---------------|
| S101P | Phase A + B: Run automated engine, review borderline items, produce final reclassification QID list | Light (analysis) | ~3 hours |
| S102P | Phase C: Execute Tier 1 (P0) batch relabeling — Pack C EC, Pack A Section A, Pack D DD/CD | Full (pack writes) | ~2 hours |
| S103P | Phase C: Execute Tier 2 (P1) batch relabeling — Pack D Sections A, BD, ED | Full (pack writes) | ~2 hours |
| S104P | Phase C: Execute Tier 3 (P2/P3) batch relabeling — remaining sections + Phase B results | Full (pack writes) | ~2 hours |
| S105P | Verification + Closeout: Independent re-audit of corrected labels, preflight, governance checks | Light (verification) | ~1 hour |

---

*Generated: 2026-07-31 | Session 100P Planner Phase*
