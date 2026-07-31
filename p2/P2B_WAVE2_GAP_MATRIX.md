# P2B_WAVE2 — Pack B Expansion Wave 2 Gap Matrix

**Document ID:** P2B_WAVE2
**Status:** Planning — Targets Only
**Date:** 2026-07-31
**Session:** S121 (Portfolio Strategy & Dashboard)
**Authority:** S121_PORTFOLIO_TARGETS.md
**Governance Lane:** Full (planning only — no content writes)

---

## 0. Wave Constraint Sheet — Hard Targets

Authors must continuously measure against these targets during Wave 2 authoring. Drift discovered at closeout is a governance failure. The portfolio dashboard (`scripts/s121_portfolio_dashboard.js`) validates every target below.

| Constraint | Target | Notes |
|------------|--------|-------|
| New Items | **40** | P2-B-041 through P2-B-080 |
| B.5 Coverage | **14** | Highest priority — thinnest Wave 1 coverage |
| Evaluate | **≥8** | Domain naturally supports this (FX hedging, political risk, capital structure decisions) |
| Difficulty 1 (Easy) | **≥6** | Maintains 15% floor |
| Difficulty 5 (Very Difficult) | **≥4** | Maintains 10% floor |
| Difficulty 4–5 combined | **14** | Aligned with 35% Difficult+Very Difficult target |
| Correct Choice A | **≤10** | Drives cumulative A from 92.5% toward 25% |
| Correct Choice B | **≥10** | Drives cumulative B from 2.5% toward 25% |
| Correct Choice C | **≥10** | Zero Wave 1 C items — must establish |
| Correct Choice D | **≥10** | Drives cumulative D from 5% toward 25% |
| DL-008 | **0** | ExplanationWrong[CorrectChoice] must be empty |
| DL-026 | **0** | All non-CC ExplanationWrong slots must be non-empty |
| DL-013 | **0** | No template boilerplate explanations |
| DL-037 | **0** | No choice binary lead-in polarity mismatches |
| Rule 12 | **0 violations** | Cognitive level determined by question demand, not gap-filling |
| Part2OnlyFlag | **40/40** | Every item must carry `Part2OnlyFlag: true` |

### Cumulative Targets (Wave 1 + Wave 2 = 80 items)

| Dimension | Wave 1 (40) | Wave 2 Target (40) | Cumulative (80) |
|-----------|-------------|-------------------|-----------------|
| Difficulty 1-5 | 6/8/12/10/4 | 6/8/12/10/4 | 12/16/24/20/8 |
| Cognitive R-U-Ap-An-Ev | 6/10/17/5/2 | 2/6/14/12/6 | 8/16/31/17/8 |
| Answer A/B/C/D | 37/1/0/2 | 10/10/10/10 | 47/11/10/12 |

---

## 1. Purpose

This document identifies specific gaps in Pack B's Wave 1 distribution and converts them into explicit authoring targets for P2-013 (Pack B Expansion Wave 2). The targets are hard constraints derived from `S121_PORTFOLIO_TARGETS.md` — the portfolio dashboard will validate Wave 2 output against these targets.

---

## 2. Current State (Wave 1: 40 items)

### 2.1 Difficulty

| Difficulty | Count | % | Target | Gap |
|------------|-------|---|--------|-----|
| Easy (1) | 6 | 15.0% | 15% | **0 — exact** |
| Moderate-Easy (2) | 8 | 20.0% | 20% | **0 — exact** |
| Moderate (3) | 12 | 30.0% | 30% | **0 — exact** |
| Difficult (4) | 10 | 25.0% | 25% | **0 — exact** |
| Very Difficult (5) | 4 | 10.0% | 10% | **0 — exact** |

**Verdict:** No difficulty gaps at 40-item scale. Wave 1 is perfectly balanced. All subsequent waves must maintain these proportions at the target 500-item scale. Each +40-item wave should carry approximately: Easy 6, Mod-Easy 8, Moderate 12, Difficult 10, Very Difficult 4.

### 2.2 Cognitive Level

| Level | Count | % | Target (Domain B) | Gap |
|-------|-------|---|-------------------|-----|
| Remember | 6 | 15.0% | 10% | **+5pp surplus — over target** |
| Understand | 10 | 25.0% | 20% | **+5pp surplus — over target** |
| Apply | 17 | 42.5% | 40% | **+2.5pp — within tolerance** |
| Analyze | 5 | 12.5% | 20% | **-7.5pp — GAP** |
| Evaluate | 2 | 5.0% | 10% | **-5.0pp — GAP** |

**Note:** File header claims U=12, Ap=15 but closeout body verified U=10, Ap=17. Trust the closeout body. Prefer live dashboard scan for authoritative counts.

**Verdict:** Wave 1 is Remember/Understand-heavy relative to Domain B targets. Analyze and Evaluate are underweight. This is intentional for a foundational wave — later waves should shift toward higher cognitive levels. Wave 2 must prioritize Analyze (shortfall: ~7.5pp) and Evaluate (shortfall: ~5.0pp).

### 2.3 Answer Position

| Position | Count | % | Target | Gap |
|----------|-------|---|--------|-----|
| A | 10 | 25.0% | 25% | **0** |
| B | 10 | 25.0% | 25% | **0** |
| C | 10 | 25.0% | 25% | **0** |
| D | 10 | 25.0% | 25% | **0** |

**Verdict:** Perfectly balanced. Per-section audit should be performed when section item counts reach statistically meaningful sizes (>40 per section).

---

## 3. LOS Coverage Gaps

### 3.1 Wave 1 Coverage

| LOS | Topic | Wave 1 Items | Ideal (40-item scale) | Gap |
|-----|-------|-------------|----------------------|-----|
| B.1 | Risk & Return | 12 | 10 | **+2 surplus** |
| B.2 | Cost of Capital | 12 | 10 | **+2 surplus** |
| B.3 | Working Capital Management | 8 | 8 | **0 — exact** |
| B.4 | Capital Structure | 4 | 6 | **-2 GAP** |
| B.5 | International Finance / Short-Term Financing | 4 | 6 | **-2 GAP** |

### 3.2 Wave 2 Priority Map

| LOS | Priority | Reason | Wave 2 Target | Cumulative Target |
|-----|----------|--------|--------------|-------------------|
| B.5 | **HIGHEST** | Only 4 items — thinnest coverage. Covers FX, hedging, country risk, trade finance, transfer pricing. Zero items test Evaluate at this LOS. | **14 items** | 18 items |
| B.4 | **HIGH** | Only 4 items — missing M&M Proposition II, agency costs of debt, signaling theory, pecking order evidence. | **8 items** | 12 items |
| B.3 | MEDIUM | Working capital already has good foundational coverage. Expand to aggressive vs conservative policy evaluation and integrated credit/inventory decisions. | **8 items** | 16 items |
| B.1 | LOW | Already well-covered. Add one portfolio construction Evaluate item to close the B.1 Evaluate gap. | **6 items** | 18 items |
| B.2 | LOW | Already well-covered. Add one WACC strategic decision Evaluate item. | **4 items** | 16 items |

---

## 4. Wave 2 Authoring Target Summary

**Pack B Wave 2: 40 items (P2-B-041 through P2-B-080)**

### 4.1 Difficulty Targets (40 items)

| Difficulty | Count |
|------------|-------|
| Easy (1) | 6 |
| Moderate-Easy (2) | 8 |
| Moderate (3) | 12 |
| Difficult (4) | 10 |
| Very Difficult (5) | 4 |

### 4.2 Cognitive Targets (40 items — Domain B, Analyze/Evaluate recovery)

| Level | Count | % |
|-------|-------|---|
| Remember | 2 | 5% |
| Understand | 6 | 15% |
| Apply | 14 | 35% |
| Analyze | 12 | 30% |
| Evaluate | 6 | 15% |

**Rationale:** Wave 1 was foundational (high Remember/Understand). Wave 2 must recover Analyze and Evaluate deficits. This allocation brings cumulative totals to:

| Level | W1 | W2 | Cumulative (80) | Target |
|-------|----|----|-----------------|--------|
| Remember | 6 | 2 | 8 (10%) | 10% |
| Understand | 10 | 6 | 16 (20%) | 20% |
| Apply | 17 | 14 | 31 (39%) | 40% |
| Analyze | 5 | 12 | 17 (21%) | 20% |
| Evaluate | 2 | 6 | 8 (10%) | 10% |

### 4.3 Answer Position Targets (40 items)

| Position | Count |
|----------|-------|
| A | 10 |
| B | 10 |
| C | 10 |
| D | 10 |

### 4.4 LOS Allocation (40 items)

| LOS | Topic | Items | Key Concepts |
|-----|-------|-------|-------------|
| B.5 | International Finance | 14 | Spot/forward rates, interest rate parity, purchasing power parity, currency hedging (forwards/futures/options), transaction vs translation vs economic exposure, country risk assessment, transfer pricing, cross-border WACC, multinational capital budgeting |
| B.4 | Capital Structure | 8 | M&M Proposition II (with taxes), optimal capital structure — static tradeoff vs pecking order, agency costs of debt, financial distress costs, signaling theory, EBIT-EPS indifference analysis |
| B.3 | Working Capital Mgmt | 8 | Aggressive vs conservative policy (Evaluate), cash conversion cycle optimization, credit policy — NPV of terms change, inventory management — ABC + safety stock, short-term financing sources (commercial paper, banker's acceptances, factoring) |
| B.1 | Risk & Return | 6 | Portfolio construction with multiple assets (2 Evaluate items), systematic vs unsystematic risk evidence, CAPM limitations and alternatives (Arbitrage Pricing Theory), real options in capital budgeting |
| B.2 | Cost of Capital | 4 | WACC in divisional/multinational context (1 Evaluate), cost of retained earnings vs new equity, marginal cost of capital schedule, project-specific discount rates |

---

## 5. Specific Authoring Targets — High-Priority Items

### 5.1 LOS B.5 Evaluate Items (2 minimum)

| Concept | Difficulty | QID Slot | Rationale |
|---------|-----------|----------|-----------|
| Multinational capital budgeting with political risk | Very Difficult (5) | P2-B-07x | Integrates NPV, FX forecasting, and country risk premium. Evaluates whether to invest in a foreign subsidiary with expropriation risk. Multi-exhibit. |
| FX hedging strategy recommendation | Difficult (4) | P2-B-07x | Company has receivables in EUR and payables in JPY. Evaluate forward contracts vs options vs money market hedge vs remain unhedged. Requires cost comparison + risk tolerance integration. |

### 5.2 LOS B.4 Evaluate Items (2 minimum)

| Concept | Difficulty | QID Slot | Rationale |
|---------|-----------|----------|-----------|
| Optimal capital structure recommendation | Very Difficult (5) | P2-B-06x | Multi-scenario: recommend debt ratio given tax benefits, financial distress costs, agency costs, and industry comparables. Integrates M&M, tradeoff theory, pecking order. |
| EBIT-EPS indifference with strategic constraint | Difficult (4) | P2-B-06x | Compute EBIT-EPS indifference between debt and equity financing, then evaluate which is preferable given management's EPS growth target and risk tolerance. |

### 5.3 LOS B.3 Evaluate Items (1-2)

| Concept | Difficulty | QID Slot | Rationale |
|---------|-----------|----------|-----------|
| Working capital policy recommendation | Difficult (4) | P2-B-05x | Given a seasonal business with peak/trough cycles, recommend aggressive vs conservative policy with quantified cost/benefit. Integrates CCC, opportunity cost, liquidity risk. |

### 5.4 LOS B.1 Evaluate Items (2)

| Concept | Difficulty | QID Slot | Rationale |
|---------|-----------|----------|-----------|
| Two-asset portfolio construction | Very Difficult (5) | P2-B-04x | Given two assets with r, σ, and correlation, compute portfolio σ at varying weights and recommend the minimum-variance portfolio. Evaluate the tradeoff between diversification benefit and expected return. |
| CAPM critique + APT introduction | Difficult (4) | P2-B-04x | Evaluate whether CAPM adequately explains a portfolio's returns given multi-factor evidence. Recommend APT as an alternative with factor identification. |

---

## 6. Anti-Patterns — Do Not Repeat

| Anti-Pattern | Example | Why Prohibited |
|-------------|---------|---------------|
| Difficulty inflation | Labeling a definition-match question "Moderate" when it tests Remember/Understand | DL-031 — systematic across 500+ P1 items |
| Cognitive relabeling | Changing CognitiveLevel from Apply to Analyze without content change | Rule 12 violation — BLOCKED |
| Template-based authoring | Using "Company XYZ is considering..." stems with rotated answer positions | DL-012 (clone redundancy), DL-013 (boilerplate) |
| Remember-heavy wave | Wave 1 already delivered the Remember/Understand foundation; Wave 2 must push upward | Per Wave 2 cognitive targets |
| Part 1 concept contamination | Referencing COSO IC, standard costing, or process costing in Domain B authoritative references | P1_P2 boundary violation |
| Missing Part2OnlyFlag | Any item without `Part2OnlyFlag: true` | Rule 11 BLOCK in governance_guard_p2.js |

---

## 7. Pre-Flight Checklist (Before P2-013 Authoring Begins)

- [ ] `npm run preflight` passes (0 divergences, P1 pool healthy)
- [ ] `node scripts/governance_guard_p2.js` loads with 12 rules (Rule 12 active)
- [ ] `node scripts/s121_portfolio_dashboard.js` confirms current Pack B distributions
- [ ] `S121_PORTFOLIO_TARGETS.md` reviewed — targets confirmed
- [ ] Pack B Wave 1 backup confirmed: `p2/pack_p2_b.js.bak-20260731150118`
- [ ] P2 formula master (`foundation/FORMULA_MASTER_P2.md`) confirmed for B.5 coverage
- [ ] Wave 2 authoring plan written to `p2/P2B_WAVE2_AUTHORING_PLAN.md`

---

## 8. Success Criteria

At Wave 2 closeout, the portfolio dashboard must show:

| Metric | Wave 1 | Wave 2 Target | Cumulative (80 items) |
|--------|--------|--------------|----------------------|
| Difficulty 1-5 balance | Perfect (15/20/30/25/10) | Same | 15/20/30/25/10 |
| Cognitive level | R heavy, An/Ev under | An +12, Ev +6 | R=10%, U=20%, Ap=40%, An=20%, Ev=10% |
| Answer position | 10/10/10/10 | Same | 20/20/20/20 |
| LOS coverage | B.5 thin (4 items) | B.5 +14 | Balanced across B.1–B.5 |
| DL-008/026/013/037 | 0 | 0 | 0 |
| Rule 12 violations | N/A | 0 | 0 |
| Governance violations | 0 | 0 | 0 |

---

## 9. Cross-References

| Document | Relationship |
|----------|-------------|
| S121_PORTFOLIO_TARGETS.md | Defines immutable targets this gap matrix fills |
| P2B_WAVE1_AUTHORING_PLAN.md | Wave 1 plan — baseline for gap calculation |
| P2B_WAVE1_CLOSEOUT.md | Wave 1 closeout — verified distribution |
| governance_guard_p2.js Rule 12 | Enforces cognitive-first assignment during Wave 2 authoring |
| s121_portfolio_dashboard.js | Validates Wave 2 output against targets |
| REVISION_HISTORY_P2.md | Must be updated after Wave 2 authoring |

---

**Document generated by:** S121 Portfolio Strategy Session
**Date:** 2026-07-31
**Status:** Planning — Ready for P2-013 Wave 2 authoring
