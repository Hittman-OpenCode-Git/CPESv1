# Change Report: WARN Item Corrections — `pack_b_corrected.js`

**Date:** 2026-07-20 | **WARN items corrected:** 7 | **Structure repaired:** 1

---

## Summary

- **Source:** `audit_report_q401_500.md`
- **WARN items identified:** 12
- **WARN items requiring correction:** 7
- **WARN items left as-is (already correct or debatable):** 5
- **Additional structural fix:** 1 (missing field)

---

## WARN Items Corrected

### 1. P1B-E-132 (Q407) — Explanation shift (+1)

**Stored answer:** D (Independent verification) — correct, no answer change needed

**Issue:** Explanation content shifted +1. `ExplanationWrongA` was empty (should explain A=Segregation of duties). Content in slots B–D described the preceding choice.

**Change:**

| Field | Before | After |
|---|---|---|
| `ExplanationWrongA` | *(empty)* | "Segregation of duties separates functions across individuals. This stem describes verification by a supervisor, not separation of incompatible functions." |
| `ExplanationWrongB` | "Segregation of duties separates..." | "Physical controls involve security measures such as locks and access restrictions. The stem describes a verification process, not physical security." |
| `ExplanationWrongC` | "Physical controls involve..." | "Authorization involves approving transactions beforehand. The stem describes after-the-fact verification by an independent party." |
| `ExplanationWrongD` | "Authorization involves..." | *(empty)* — correct answer D now has empty slot |

---

### 2. P1B-E-136 (Q411) — Explanation field shift

**Stored answer:** A (Financial statement fraud) — correct, no answer change needed

**Issue:** `ExplanationWrongA` contained text about Procurement fraud (should be in `ExplanationWrongB`). `ExplanationWrongB` was empty.

**Change:**

| Field | Before | After |
|---|---|---|
| `ExplanationWrongA` | "Procurement fraud involves manipulating the purchasing process, not financial statements." | *(empty)* — A is correct |
| `ExplanationWrongB` | *(empty)* | "Procurement fraud involves manipulating the purchasing process, not financial statements." |

---

### 3. P1B-E-139 (Q414) — ExplanationWrongC populated for correct answer

**Stored answer:** C (Control Environment) — correct, no answer change needed

**Issue:** `ExplanationWrongC` contained text describing Control Activities when C is the correct answer (slot should be empty). `ExplanationWrongD` was empty (D=Control Activities is wrong).

**Change:**

| Field | Before | After |
|---|---|---|
| `ExplanationWrongC` | "Control Activities are specific policies. The principle of competence falls under Control Environment." | *(empty)* — C is correct |
| `ExplanationWrongD` | *(empty)* | "Control Activities are specific policies and procedures. While competence is important across all components, the principle of demonstrating commitment to competence is specifically a Control Environment principle, not part of Control Activities." |

---

### 4. P1B-F-080 (Q430) — Explanation shift (+1)

**Stored answer:** D (Descriptive analytics) — correct, no answer change needed

**Issue:** `ExplanationWrongC` (should explain C=Diagnostic) was empty. `ExplanationWrongD` contained Diagnostic explanation text.

**Change:**

| Field | Before | After |
|---|---|---|
| `ExplanationWrongC` | *(empty)* | "Diagnostic analytics determines why something happened. The dashboard describes what happened, not why it happened." |
| `ExplanationWrongD` | "Diagnostic analytics determines why something happened. The dashboard describes what happened." | *(empty)* — D is correct |

---

### 5. P1B-F-082 (Q432) — Explanation shift

**Stored answer:** D (Predictive analytics) — correct, no answer change needed

**Issue:** `ExplanationWrongB` (should explain B=Diagnostic) was empty. `ExplanationWrongC` contained text about Diagnostic (belongs in B). `ExplanationWrongD` contained text about Prescriptive (belongs in C).

**Change:**

| Field | Before | After |
|---|---|---|
| `ExplanationWrongB` | *(empty)* | "Diagnostic analytics determines why something happened. The model predicts future events, not explains past causes." |
| `ExplanationWrongC` | "Diagnostic determines why. The model predicts future events." | "Prescriptive analytics recommends actions. The model estimates likelihood of future events, not recommends what to do." |
| `ExplanationWrongD` | "Prescriptive recommends actions. The model estimates likelihood of future events." | *(empty)* — D is correct |

---

### 6. P1B-F-085 (Q435) — Wrong stored answer + Explanation shift

**Stored answer before:** B (Classification)
**Stored answer after:** D (Association rule mining)

**Issue:** The stem describes market basket analysis (association rule mining), but `CorrectChoice` was B (Classification). Additionally, `ExplanationWrongC` contained text about Classification (belongs in B) and `ExplanationWrongD` contained text about Regression (belongs in C).

**Change:**

| Field | Before | After |
|---|---|---|
| `CorrectChoice` | B | D |
| `ExplanationWrongA` | "Clustering groups similar data points. The described technique finds purchase associations." | "Clustering groups similar data points. The described technique finds purchase associations between different products, not groups of similar data points." |
| `ExplanationWrongB` | *(empty)* | "Classification assigns items to predefined categories. The technique finds relationships between products, not categorical assignments." |
| `ExplanationWrongC` | "Classification assigns items to categories. The technique finds relationships between products." | "Regression predicts a numerical value. The described technique identifies purchase patterns, not numerical predictions." |
| `ExplanationWrongD` | "Regression predicts a numerical value. The described technique identifies purchase patterns." | *(empty)* — D is now correct |

---

### 7. P1B-F-102 (Q452) — Explanation shift

**Stored answer:** C (Benford's Law) — correct, no answer change needed

**Issue:** `ExplanationWrongC` contained text about cluster analysis (should be empty since C is correct). `ExplanationWrongD` was empty (should explain D=Cluster analysis).

**Change:**

| Field | Before | After |
|---|---|---|
| `ExplanationWrongC` | "Benford's Law describes the expected frequency of leading digits in natural datasets. The question asks for the analytical technique; cluster analysis groups data into clusters to detect patterns." | *(empty)* — C is correct |
| `ExplanationWrongD` | *(empty)* | "Cluster analysis groups data into clusters to find natural groupings. The described technique compares actual digit frequencies against Benford's Law's expected distribution, not cluster memberships." |

---

## WARN Items Left Unchanged

| QuestionID | Verdict | Reason |
|---|---|---|
| P1B-F-103 | WARN — Arguable | Already fixed in FAIL round (A→B, Phishing/BEC). Now correct. |
| P1B-F-106 | WARN — Arguably wrong | Already fixed in FAIL round (B→D, Bar chart). Now correct. |
| P1B-F-115 | WARN — Debatable | Already fixed in FAIL round (B→C, Continuous auditing). Now correct. |
| P1B-F-116 | WARN — Debatable | Audit says A is arguably better but verdict is WARN (debatable). No definitive correction mandated. |
| P1B-F-149 | WARN — Debatable | Already fixed in FAIL round (A→D, SCCs). Now correct. |

---

## Additional Structural Fix (from prior session)

| QuestionID | Field | Issue | Fix |
|---|---|---|---|
| P1B-B-112 | `ExplanationWrongC` | Missing field (C is correct answer, slot must exist as empty string) | Added `"ExplanationWrongC": ""` |

---

## Validation Results

| Check | Result |
|---|---|
| JSON parse | PASS — 500 questions |
| Required fields (all 500 q) | PASS |
| All 4 choices present (all 500 q) | PASS |
| ExplanationWrong A/B/C/D present (all 500 q) | PASS |
| FAIL item CorrectChoice (49 items) | PASS |
| WARN item CorrectChoice (12 items) | PASS |
| Invalid CorrectChoice values | NONE |
| Empty ExplanationCorrect | NONE |

**Overall: ALL CHECKS PASSED ✅**
