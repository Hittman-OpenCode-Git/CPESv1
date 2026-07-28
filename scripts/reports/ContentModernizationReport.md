# Content Modernization Report — Sprint 5.9C

**Date:** 2026-07-21
**Scope:** Read-only analysis of 2500 MCQs and 75 case studies for content modernization.
**Baseline:** Realism score 3.4/5 (weakest dimension). All other dimensions >= 4.2/5.

---

## 1. Executive Summary

The repository's weakest dimension is **Realism (3.4/5)** — a systemic issue rooted in template-based question generation. Of 2500 questions, ~900 scored Realism=3 (the minimum observed). No other dimension scored below 4.2. Fixing realism will produce the single largest quality improvement available.

Three distinct modernization patterns were identified, each with different effort/impact profiles:

| Pattern | Questions Affected | Realism Avg | Effort to Fix | Educational Impact |
|---------|-------------------|-------------|---------------|-------------------|
| **A: Absolute Language in Choices** | ~150 across all packs | 3.0–3.5 | Low (bulk find-replace) | High (removes obvious answer cues) |
| **B: No Business Context ("A company...")** | ~100 in Pack A, Section A | 3.0 | Low (add named entity + one sentence) | Medium-High |
| **C: Token Company Name / Definition-Style** | ~600 across all packs | 3.0–3.5 | Medium (2-3 sentence scenario per question) | High |
| **D: Cloned Questions (rotated names only)** | ~800 in Packs C, D, and their clones | 3.0 | High (structural rewrite of entire packs) | Moderate |

---

## 2. Pattern Analysis

### Pattern A: Absolute Language in Choices

~150 questions flagged with "Uses absolute language: 'all', 'never', 'every'". These words make correct/incorrect answers too obvious because real-world accounting rarely admits absolutes.

**Examples from CSV issues column:**
- P1-A-005: Choice B "Defer **all** revenue" / Choice C "Recognize **all** revenue"
- P1-A-009: "Assume LIFO liquidation **always** decreases income"
- P1-B-009 through P1-B-100: 10+ questions with "all" in choices
- P1-AC-016 through P1-AC-020: Clone pack repeating "all" pattern
- P1-BC-029 through P1-BC-093: 15+ clone questions with "all"

**Fix:** Replace "all" with "the full contract price," "entire balance," "generally," or context-specific qualifiers. Bulk find-replace across packs, then validate per question.

### Pattern B: No Business Context ("A company...")

~100 Pack A questions (P1-A-003, P1-A-010, P1-A-026 through P1-A-075) use "A company reports..." with no named entity, industry, or decision-maker role.

**Example:**
> P1-A-003: "A company reports net income of $172,000, depreciation expense of $53,000..."

**Fix:** Replace "A company" with a rotating list of 10-15 named entities (e.g., "NorthStar Manufacturing," "Apex Electronics," "Coastal Wholesale"). Add industry context per domain (manufacturing for Section A, retail for Section B, etc.).

### Pattern C: Token Company Name, No Scenario

~600 questions have a company name but lack any business context: no industry, no decision-stakes, no role. The question reads "Company X does Y. Which response is most appropriate?" — still essentially a multiple-choice definition test.

**Example:**
> P1-A-001: "Quartz is preparing a classified balance sheet for a supplier financing arrangement due in nine months. Which response is most appropriate?"

**Fix:** Expand each one-line stem to 2-3 sentences: add the controller's name, the business impact of getting it wrong, and a stakeholder expectation. Example rewrite: *"Quartz Manufacturing is preparing its year-end classified balance sheet. The CFO needs to determine the proper classification of a supplier financing arrangement due in nine months before presenting to the audit committee. How should this obligation be presented?"*

### Pattern D: Cloned Questions with Rotated Names

Packs C and D (and their variant packs: AC, BC, CC, DC, EC, FC, AD, BD, CD, DD, ED, FD) contain structurally identical questions where only the company name changes across 4 variants. Each variant is a separate question object.

**Example (4 clones, same stem):**
> P1-AC-001: "Ashford issued bonds at a premium..."
> P1-AC-002: "Brightpoint issued bonds at a premium..."
> P1-AC-003: "Cedarline issued bonds at a premium..."
> P1-AC-004: "Driftwood issued bonds at a premium..."

**Fix:** Requires writing unique content for each clone. Keep one as-is; rewrite the other three with different scenarios, fact patterns, or choice sets. This is the highest-effort but highest-variety-impact fix.

---

## 3. Effort-Impact Matrix

| Pattern | Questions | Effort (person-hours) | Est. Realism Gain | Priority |
|---------|-----------|-----------------------|-------------------|----------|
| A (Absolute language) | ~150 | 4–6 | +0.3 | P1 |
| B (No context) | ~100 | 10–15 | +0.5 | P2 |
| C (Token name) | ~600 | 80–120 | +0.8 | P3 |
| D (Clones) | ~800 | 200+ | +1.0 | P4 |

**Recommended order:** A → B → C → D. Execute in waves, validating realism improvement after each wave.

---

## 4. Repository Stability Note

Current validation: **0 structural errors, 0 duplicate IDs**. No modernization work should introduce structural issues. Pattern D poses the highest structural risk because it involves changing question IDs or deleting objects. Patterns A–C are stem/choice text changes only and carry negligible risk.

---

## 5. Metrics for Success

- Average Realism score increases from 3.4 to ≥ 4.0 after applying Patterns A+B+C.
- Number of questions scored Realism=3 decreases from ~900 to ≤ 200.
- Clone group stem similarity drops below detection threshold.
- Zero new structural errors introduced.

---

## 6. Next Steps

1. Execute Pattern A (absolute language) — bulk search-and-replace, 4–6 hours.
2. Execute Pattern B (named entities for "A company") — 10–15 hours.
3. Re-run quality audit to measure realism improvement.
4. If realism exceeds 4.0, move to Pattern C (scenario expansion).
5. Evaluate whether Pattern D (clone rewrite) is needed given remaining improvement.
