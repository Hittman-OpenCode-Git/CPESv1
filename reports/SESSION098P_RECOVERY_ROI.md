# SESSION098P — Recovery ROI Analysis

**Session:** 98P — Repository Reclassification ROI Analysis
**Date:** 2026-07-31
**Evidence Base:** S96P (Pack C EC) + S98P (3 sections) = 120-item ground-truth audit

---

## 1. Three Recovery Paths Compared

### Path A — Relabeling (Metadata Correction Only)

**What:** Change `CognitiveLevel` field on misclassified items. No content changes.

| Factor | Assessment |
|--------|------------|
| Items to correct | ~320 (HO-labeled that are not true HO) |
| Effort | ~4-5 hours (scripted batch relabeling, ~30 sec per item) |
| Risk | Very low — metadata-only change |
| Governance | Requires backup-before-write; Rule 5 batch cap (≤30) applies |
| Content rewrites | 0 |
| Certification impact | None — CognitiveLevel is metadata, not content |
| Learner impact | Improved difficulty expectations; honest cognitive labeling |
| CAQS §6.2 compliance | Distribution becomes accurate; gap becomes visible |
| Cost | **1 session (~4-5 hours)** |

**Outcome:** True HO count revealed: ~262 items (10.3%). Gap to CAQS target: 756 true HO items.

### Path B — Targeted Rewrites (Upgrade to Genuine HO)

**What:** Rewrite items that are currently Apply/Understand to raise them to genuine Analyze/Evaluate.

| Factor | Assessment |
|--------|------------|
| Items available for upgrade | ~1,100 Apply + ~1,230 Understand = ~2,330 base pool |
| Items needing upgrade for CAQS | ~756 (gap to 40% HO target) |
| Campaign conversion rate (best observed) | ~70% (Pack A Section B = 83%, Pack D Section B = 71%) |
| Items to author to get 756 true HO | ~1,080 (756 / 0.70) |
| Effort per item (modernization) | ~15-20 minutes (full scenario design, distractor engineering) |
| Total modernization effort | ~15-20 sessions (~270-360 hours) |
| Risk | Medium — content errors possible during rewrites |
| Content rewrites | ~1,080 items |
| Cost | **~15-20 sessions** |

### Path C — Rebuild (New Items from Scratch)

**What:** Archive misclassified sections and author new, quality-controlled HO items.

| Factor | Assessment |
|--------|------------|
| Items to archive | ~320 misclassified HO items (or sections CD/DD entirely) |
| New items needed | ~756 |
| New item efficiency (from scratch) | ~50% (lower than upgrade — no existing scenario to build on) |
| Items to author | ~1,512 |
| Effort per item | ~20-25 minutes |
| Total effort | ~30-40 sessions (~500-630 hours) |
| Risk | High — discards well-written content; no guarantee new items are better |
| Content loss | ~320 items (archived, not deleted) |
| Cost | **~30-40 sessions** |

---

## 2. ROI Comparison

| Metric | Path A (Relabel) | Path B (Rewrite) | Path C (Rebuild) |
|--------|-----------------|------------------|-------------------|
| Sessions required | 1 | 15-20 | 30-40 |
| Content preserved | 100% | ~50% rewritten | 0% (archived + new) |
| True HO gain | +0 (baseline correction) | +756 | +756 |
| Learner safety risk | None | Low | Medium |
| Governance overhead | Low | High | High |
| Immediate correctness fix | Yes | No | No |
| **ROI** | **Highest** | Medium | Lowest |

---

## 3. Key Insight: Path A Enables Path B

The paths are not mutually exclusive. The optimal strategy is:

**Phase 1 — Relabel (1 session)** → Accurate baseline. Repository shows 262 true HO, not 528.

**Phase 2 — Prioritize (1 session)** → With accurate labels, identify sections where items CAN be upgraded to true HO vs. sections where wholesale new authoring is more efficient.

**Phase 3 — Targeted Rewrites (10-15 sessions)** → Upgrade Apply items in sections where the underlying content supports Analyze-level redesign. Use the 70% conversion rate from proven campaigns.

**Total: 12-17 sessions.** This is the hybrid approach the user suggested.

---

## 4. Why Relabeling-First Has Superior ROI

### 4.1 Efficiency

Continuing modernization waves WITHOUT relabeling first means:
- Campaigns targeting "HO creation" are creating items that may be mislabeled
- At current 41% labeling accuracy, each "50-item HO modernization campaign" produces ~21 true HO
- At 70% campaign efficiency × 41% label accuracy = ~29% net efficiency

After relabeling:
- Campaigns know which sections genuinely need HO creation
- Each "50-item HO modernization campaign" targeting Apply→Analyze upgrades produces ~35 true HO
- Net efficiency improves from 29% → 70%

### 4.2 Truth in Reporting

Current state: "We have 528 HO items (20.7%), we need 490 more."
True state: "We have ~262 HO items (10.3%), we need 756 more."

The difference is 266 items — more than a year of modernization sessions at current rates. Basing campaign planning on inflated HO counts is the single largest strategic error.

### 4.3 Resource Allocation

The S93P finding that "58.7% of HO items are misclassified" means that for every hour spent creating new "HO" items:
- ~35 minutes of effort produces items that aren't actually HO
- ~25 minutes produces genuine HO

Relabeling corrects the map. Then the same hour of effort becomes:
- ~42 minutes produces genuine HO (70% campaign efficiency)
- ~18 minutes produces items below target

Relabeling is the highest-leverage single action available.

---

## 5. Risk Assessment

### 5.1 Relabeling Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Label change invalidates certification | Low | Low | CAQS §1.7.2 does not require CognitiveLevel for certification |
| Label change breaks app rendering | None | None | CognitiveLevel is metadata; app.js does not read it for rendering |
| Batch size violation | Low | Medium | Governed by Rule 5 (≤30 items per batch) |
| Concurrent write overwrite | Low | High | Backup-before-write; single-session execution |
| Wrong label assigned during relabeling | Medium | Low | Use audit-derived QID→corrected label table; spot-check 20% |

### 5.2 Certifications Not Affected

Per CAQS v1.0 §1.7.2, certification requires:
1. Six-dimension HIGH-confidence AI verification (unchanged — content is same)
2. User approval (unchanged)
3. Distractor tier map (unchanged)
4. Low-confidence claims resolved (unchanged)

Changing `CognitiveLevel` does not trigger re-certification. Items remain Certified.

---

## 6. Recommendation

**Path A (Relabeling) is the clear winner.**

| Recommendation | Rationale |
|----------------|-----------|
| Execute relabeling first | 1 session, 4-5 hours, zero content risk |
| Then recalibrate modernization targets | Accurate baseline reveals true ~756 gap |
| Then targeted rewrites | Quality-controlled at 70%+ conversion rate |

This is the "Hybrid Approach" — relabeling for truth, then modernization for CAQS compliance. Relabeling alone reveals that the modernization gap is 54% larger than currently believed (756 vs. 490), which fundamentally changes the scope and timeline of the modernization program.

---

*Generated: 2026-07-31 | Session 98P Implementer Phase*
