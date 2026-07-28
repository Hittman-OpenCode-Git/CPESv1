# Gold Standard Examples

*Part of the CAQS governance framework. Effective Sub-batch 2A close-out (2026-07-22).*

---

## Purpose

This file documents questions that have achieved `question_state = Certified` — the highest governance state in the CAQS framework. Each Certified question serves as a reference example for:

- Distractor tiering (A/B/C/D per `BUILD_TIME_VERIFICATION_STANDARD.md` §4)
- Certification entry format (per `BUILD_TIME_VERIFICATION_STANDARD.md` §5)
- Pedagogical cluster labeling (per `QUESTION_METADATA_STANDARD.md` §9)

New questions should match the structural patterns shown here before they can advance to Certified.

---

## Question 1: P1-A-036

**Governance fields:**

- question_state: "Certified"
- pedagogical_cluster: "accounting_equation_axis_cluster"

**Stem:** Lumen reports total assets of $367,300 and total liabilities of $148,100. What total equity should be reported?

**Correct answer:** D. $219,200

**Distractor tier map:**

| Choice | Value | Tier | Misconception |
|--------|-------|------|---------------|
| A | $515,400 | C | Adds assets and liabilities (confuses equation direction) |
| B | $234,200 | B | $15,000 offset error — plausible transposition |
| C | $148,100 | A | Selects liabilities instead of solving for equity |
| D | $219,200 | (correct) | — |

**Certification entry:**

```
P1-A-036 — Certified 2026-07-22

  Verification: HIGH confidence, all six dimensions PASS
  Authority: A = L + E (foundational accounting identity)
  Axis: N/A (single-concept, no pedagogical axis)
  Distractor tier map:
    A: C — adds assets and liabilities
    B: B — $15,000 offset error
    C: A — liabilities instead of equity
    D: (correct)
  Pedagogical cluster: accounting_equation_axis_cluster
  Certifier: build-time AI verification + user approval
```

---

## Question 2: P1-A-046

**Governance fields:**

- question_state: "Certified"
- pedagogical_cluster: "accounting_equation_axis_cluster"

**Stem:** Vantage reports total assets of $410,300 and total liabilities of $169,100. What total equity should be reported?

**Correct answer:** C. $241,200

**Distractor tier map:**

| Choice | Value | Tier | Misconception |
|--------|-------|------|---------------|
| A | $256,200 | B | $15,000 offset error — plausible transposition |
| B | $169,100 | A | Selects liabilities instead of solving for equity |
| C | $241,200 | (correct) | — |
| D | $579,400 | C | Adds assets and liabilities (confuses equation direction) |

**Certification entry:**

```
P1-A-046 — Certified 2026-07-22

  Verification: HIGH confidence, all six dimensions PASS
  Authority: A = L + E (foundational accounting identity)
  Axis: N/A (single-concept, no pedagogical axis)
  Distractor tier map:
    A: B — $15,000 offset error
    B: A — liabilities instead of equity
    C: (correct)
    D: C — adds assets and liabilities
  Pedagogical cluster: accounting_equation_axis_cluster
  Certifier: build-time AI verification + user approval
```

---

## Question 3: P1-A-056

**Governance fields:**

- question_state: "Certified"
- pedagogical_cluster: "accounting_equation_axis_cluster"

**Stem:** Granite reports total assets of $453,300 and total liabilities of $190,100. What total equity should be reported?

**Correct answer:** D. $263,200

**Distractor tier map:**

| Choice | Value | Tier | Misconception |
|--------|-------|------|---------------|
| A | $190,100 | A | Selects liabilities instead of solving for equity |
| B | $643,400 | C | Adds assets and liabilities (confuses equation direction) |
| C | $278,200 | B | $15,000 offset error — plausible transposition |
| D | $263,200 | (correct) | — |

**Certification entry:**

```
P1-A-056 — Certified 2026-07-22

  Verification: HIGH confidence, all six dimensions PASS
  Authority: A = L + E (foundational accounting identity)
  Axis: N/A (single-concept, no pedagogical axis)
  Distractor tier map:
    A: A — liabilities instead of equity
    B: C — adds assets and liabilities
    C: B — $15,000 offset error
    D: (correct)
  Pedagogical cluster: accounting_equation_axis_cluster
  Certifier: build-time AI verification + user approval
```

---

## Question 4: P1-A-066

**Governance fields:**

- question_state: "Certified"
- pedagogical_cluster: "accounting_equation_axis_cluster"

**Stem:** Quartz reports total assets of $496,300 and total liabilities of $211,100. What total equity should be reported?

**Correct answer:** C. $285,200

**Distractor tier map:**

| Choice | Value | Tier | Misconception |
|--------|-------|------|---------------|
| A | $211,100 | A | Selects liabilities instead of solving for equity |
| B | $707,400 | C | Adds assets and liabilities (confuses equation direction) |
| C | $285,200 | (correct) | — |
| D | $300,200 | B | $15,000 offset error — plausible transposition |

**Certification entry:**

```
P1-A-066 — Certified 2026-07-22

  Verification: HIGH confidence, all six dimensions PASS
  Authority: A = L + E (foundational accounting identity)
  Axis: N/A (single-concept, no pedagogical axis)
  Distractor tier map:
    A: A — liabilities instead of equity
    B: C — adds assets and liabilities
    C: (correct)
    D: B — $15,000 offset error
  Pedagogical cluster: accounting_equation_axis_cluster
  Certifier: build-time AI verification + user approval
```

---

## Certification Entry Template

For future Certified questions, use this template in `REVISION_HISTORY.md`:

```
[QID] — Certified [date]

  Verification: [confidence level], all six dimensions PASS/FAIL
  Authority: [primary citation]
  Axis: [pedagogical axis if applicable]
  Distractor tier map:
    A: [tier] — [misconception]
    B: [tier] — [misconception]
    C: [tier] — [misconception]
    D: [tier] — [misconception]
  Pedagogical cluster: [cluster ID]
  Certifier: build-time AI verification + user approval
```

---

---

## Batch 1 Rewrite Exemplars

These three questions were fully rewritten during Batch 1 (CAQS gains of +47, +32, and +29.5 respectively). They demonstrate the quality standard for full rewrites under the CAQS framework.

### P1E-A-003 — Accounting Equation (Retained Earnings)

**Governance fields:**
- question_state: "Certified"
- pedagogical_cluster: "accounting_equation_axis_cluster"

**Stem:** The CFO of Meridian Manufacturing provides year-end information: Total assets $4,200,000, Total liabilities $1,600,000, Common stock $1,000,000, Additional paid-in capital $400,000. Based on the accounting equation, what is retained earnings?

**Correct answer:** $1,200,000

**Distinction from cluster:** Unlike the P1-A-036/046/056/066 series (which give A and L and solve for total E), this question gives A, L, and equity components, requiring two-step computation (total E, then deduct components to find retained earnings). This is a higher-difficulty variant.

---

### P1E-A-032 — Full Disclosure Principle

**Governance fields:**
- question_state: "Certified"

**Stem:** NorthStar Equipment's controller learns that a customer with a $350,000 receivable has been downgraded and may restructure. Which action best aligns with the full disclosure principle under GAAP?

**Correct answer:** Disclose the nature and estimate of the contingency.

**Signature quality:** Real-world narrative scenario with a materiality-driven disclosure decision. Tests the boundary between probable (accrue) and reasonably possible (disclose only) under ASC 450 — a classic CMA exam distinction.

---

### P1E-A-043 — Effective Interest Method (Bond Discount)

**Governance fields:**
- question_state: "Certified"

**Stem:** NorthStar Equipment issued $1,000,000 face value, 5-year bonds paying 8% annual interest when the market rate was 10%. Initial carrying value $924,184. Using the effective interest method, what is the interest expense for the first year?

**Correct answer:** $92,418

**Signature quality:** Full amortization-schedule reasoning. Tests the distinction between carrying value × market rate (correct) vs. face value × market rate (common trap) vs. face value × stated rate (common trap).

---

## Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-22 | Initial version. 4 Certified examples from accounting equation axis cluster |
| 1.1 | 2026-07-22 | Added 3 Batch 1 rewrite exemplars (P1E-A-003, 032, 043) |
