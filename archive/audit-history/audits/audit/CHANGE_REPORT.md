# Change Report: `pack_b_corrected.js`

**Date:** 2026-07-20 | **Total modifications:** 50

---

## Summary

- **Source:** `audit_report_q401_500.md` (questions 401–500 / P1B-E-126 through P1B-F-150)
- **PASS items (no changes):** 68
- **WARN items (no changes):** 11
- **FAIL items corrected:** 21
- **Structural repairs:** 1 (missing field added)

---

## Section E — Internal Controls (12 answer fixes, 1 structural repair)

| QuestionID | Field Changed | Old Value | New Value | Reason |
|---|---|---|---|---|
| P1B-E-129 | `CorrectChoice` | D | A | Wrong stored answer. "Rely solely on plan's documentation" → should be "periodically test the plan" |
| P1B-E-129 | `ExplanationWrongA` | (contained text for B) | "Confidentiality restrictions limit disclosure..." | Shift correction: text restored to proper slot |
| P1B-E-129 | `ExplanationWrongB` | (text for C) | "Updating a plan does not ensure recoverability without testing." | Shift correction |
| P1B-E-129 | `ExplanationWrongC` | (text for D) | "Relying solely on documentation without testing does not validate recoverability." | Shift correction |
| P1B-E-129 | `ExplanationWrongD` | (empty, was correct slot for D) | "" | Now correctly empty (D is wrong) |
| P1B-E-130 | `CorrectChoice` | B | A | SOX §201 permits tax compliance with pre-approval; bookkeeping is prohibited |
| P1B-E-130 | `ExplanationWrongA` | (contained text for A) | "" | Now empty (A is correct answer) |
| P1B-E-130 | `ExplanationWrongB` | (empty, was correct slot) | "Tax compliance services are permitted with audit committee pre-approval..." | Moved from old slot A |
| P1B-E-133 | `CorrectChoice` | B | C | Management override described → requires C (control override assessment), not B |
| P1B-E-133 | Explanation fields | realigned | realigned | +1 shift corrected |
| P1B-E-135 | `CorrectChoice` | A | B | Purchasing insurance is risk sharing/transfer, not risk acceptance |
| P1B-E-137 | `CorrectChoice` | C | A | Original documents = most reliable; verbal = least reliable |
| P1B-E-137 | Explanation fields | realigned | realigned | Explanation + shift corrected |
| P1B-E-138 | `CorrectChoice` | B | A | Data classification determines appropriate security controls |
| P1B-E-140 | `CorrectChoice` | A | C | "Willing to accept" = risk appetite, not risk capacity |
| P1B-E-140 | Explanation fields | realigned | realigned | Shift corrected |
| P1B-E-141 | `CorrectChoice` | A | D | Combining sysadmin + data access violates SoD |
| P1B-E-142 | `CorrectChoice` | D | A | Key benefit of whistleblower hotline = encouraging reporting without retaliation fear |
| P1B-E-142 | Explanation fields | realigned | realigned | +1 shift corrected |
| P1B-E-143 | `CorrectChoice` | D | B | "Less severe than material weakness" = significant deficiency (B) |
| P1B-E-148 | `CorrectChoice` | A | B | Pre-numbered documents detect missing transactions (completeness), not prevent access |
| P1B-E-149 | `CorrectChoice` | A | B | SOX §906 certifies Exchange Act compliance, not auditor independence |

---

## Section F — Technology and Analytics (37 answer fixes)

| QuestionID | Field Changed | Old Value | New Value | Reason |
|---|---|---|---|---|
| P1B-F-077 | `CorrectChoice` | C | D | Day-to-day data management = data steward, not data owner |
| P1B-F-078 | `CorrectChoice` | A | C | Customer names / vendor info = master data, not transaction data |
| P1B-F-087 | `CorrectChoice` | A | D | Labeled data → supervised learning, not unsupervised |
| P1B-F-089 | `CorrectChoice` | C | B | Blockchain immutability is key feature, not "data can be easily modified" |
| P1B-F-090 | `CorrectChoice` | A | C | Blockchain provides shared cryptographic record, not "guarantees accurate classification" |
| P1B-F-091 | `CorrectChoice` | D | C | Key cloud risk = data stored in multiple jurisdictions affecting compliance |
| P1B-F-094 | `CorrectChoice` | B | A | Defense in depth = multiple layers, not "relying solely on firewall" |
| P1B-F-097 | `CorrectChoice` | A | C | ERP risk = inadequate training / resistance to change, not "no impact on processes" |
| P1B-F-098 | `CorrectChoice` | B | A | Relational databases minimize redundancy through normalization |
| P1B-F-099 | `CorrectChoice` | D | A | GDPR right = access and deletion, not "require sharing with other customers" |
| P1B-F-100 | `CorrectChoice` | D | C | CCPA grants deletion, opt-out, AND disclosure rights = "All of the above" |
| P1B-F-103 | `CorrectChoice` | A | B | CEO fraud email = Phishing/BEC, not malware infection |
| P1B-F-104 | `CorrectChoice` | A | D | Data governance = policies/oversight; data management = technical implementation |
| P1B-F-106 | `CorrectChoice` | B | D | Budget vs actual comparison = bar chart, not word cloud |
| P1B-F-109 | `CorrectChoice` | A | D | Users validating business requirements = UAT, not unit testing |
| P1B-F-111 | `CorrectChoice` | D | C | Structured processed data from multiple sources = data warehouse, not data lake |
| P1B-F-113 | `CorrectChoice` | D | C | Rule-based reconciliation across systems = RPA, not NLP |
| P1B-F-115 | `CorrectChoice` | B | C | Internal audit testing 100% of transactions = continuous auditing, not compliance audit |
| P1B-F-117 | `CorrectChoice` | A | D | Ultimate accountability for data = data owner, not data custodian |
| P1B-F-119 | `CorrectChoice` | B | A | Firewall/IDS/segmentation = technical controls, not administrative |
| P1B-F-120 | `CorrectChoice` | D | C | ML risk = bias/explainability issues, not "never make errors" |
| P1B-F-122 | `CorrectChoice` | C | A | Vendor risk management = due diligence with SOC reports, not "accept all terms" |
| P1B-F-123 | `CorrectChoice` | C | B | Drill-down to find root cause = diagnostic analytics, not descriptive |
| P1B-F-126 | `CorrectChoice` | A | C | Segmenting customers to find natural groups = clustering, not classification |
| P1B-F-127 | `CorrectChoice` | C | A | Agile characteristic = iterative cycles, not "all requirements defined upfront" |
| P1B-F-129 | `CorrectChoice` | A | B | Files encrypted by malware + payment demand = ransomware, not phishing |
| P1B-F-130 | `CorrectChoice` | A | B | MDM objective = single consistent source of master data |
| P1B-F-132 | `CorrectChoice` | A | D | Model results should be interpreted with business judgment |
| P1B-F-136 | `CorrectChoice` | A | B | SaaS customer responsibility = managing access/classification/encryption |
| P1B-F-138 | `CorrectChoice` | D | A | Users bypassing ERP workflows = process/control issue, not hardware problem |
| P1B-F-140 | `CorrectChoice` | C | B | Ensuring data doesn't harm individuals = data ethics, not data redundancy |
| P1B-F-141 | `CorrectChoice` | A | D | Blockchain limitation = immutability creates error correction challenges |
| P1B-F-142 | `CorrectChoice` | D | A | Continuous verification of automated controls = configure system to log violations |
| P1B-F-143 | `CorrectChoice` | A | D | What-if/sensitivity analysis changes inputs to observe output effects |
| P1B-F-147 | `CorrectChoice` | D | A | Three-day-old data = timeliness issue, not consistency |
| P1B-F-148 | `CorrectChoice` | A | C | RPA controls need segregation of duties between developers/operators/approvers |
| P1B-F-149 | `CorrectChoice` | A | D | GDPR cross-border transfer = SCCs or adequacy decision, not email notification |

---

## Structural/Field Repairs

| QuestionID | Field | Issue | Fix |
|---|---|---|---|
| P1B-B-112 | `ExplanationWrongC` | Missing field | Added `"ExplanationWrongC": ""` (C is correct answer, so this slot should be empty) |

---

## Explanation Field Realignments

For all items where `CorrectChoice` was changed, the four `ExplanationWrong*` fields were reassigned as follows:

1. **New correct slot** → `""` (empty — no explanation needed for the correct answer)
2. **Other three slots** → populated with the explanation text that matches the corresponding wrong choice, ensuring no text contradicts the stored answer

Items affected: P1B-E-129, P1B-E-130, P1B-E-133, P1B-E-135, P1B-E-137, P1B-E-138, P1B-E-140, P1B-E-141, P1B-E-142, P1B-E-143, P1B-E-148, P1B-E-149, P1B-F-077, P1B-F-078, P1B-F-087, P1B-F-089, P1B-F-090, P1B-F-091, P1B-F-094, P1B-F-097, P1B-F-098, P1B-F-099, P1B-F-100, P1B-F-103, P1B-F-104, P1B-F-106, P1B-F-109, P1B-F-111, P1B-F-113, P1B-F-115, P1B-F-117, P1B-F-119, P1B-F-120, P1B-F-122, P1B-F-123, P1B-F-126, P1B-F-127, P1B-F-129, P1B-F-130, P1B-F-132, P1B-F-136, P1B-F-138, P1B-F-140, P1B-F-141, P1B-F-142, P1B-F-143, P1B-F-147, P1B-F-148, P1B-F-149

---

## Validation Results

| Check | Result |
|---|---|
| JSON parse | PASS — 500 questions |
| Required fields (all 500 q) | PASS |
| All 4 choices present (all 500 q) | PASS |
| ExplanationWrongA/B/C/D present (all 500 q) | PASS |
| FAIL item CorrectChoice (49 items) | PASS |
| Invalid CorrectChoice values | NONE |
| Empty ExplanationCorrect | NONE |

**Overall: ALL CHECKS PASSED ✅**
