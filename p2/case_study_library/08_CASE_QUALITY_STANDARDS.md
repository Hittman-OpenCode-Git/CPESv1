# 08 — Case Quality Standards (Part 2)

**Status:** Authoritative for all Part 2 case studies
**Sources:** CAQS_v1.0.md §3, §14.3; `knowledge/03_content_authoring/CASE_STUDY_GOLD_STANDARD.md`; `CASE_STUDY_SCORING_RUBRIC.md`; QUESTION_METADATA_STANDARD §9.4 (certification blockers)

---

## 1. Scenario Requirements (every case)

1. **Named company** — fictional, realistic (e.g., "Harbor Medical Supplies"). Generic labels prohibited.
2. **Named stakeholder** — a decision-maker with a role (e.g., "CFO Maria Chen").
3. **Business trigger** — a specific event or reporting requirement (year-end close, credit-line renewal, board request, audit finding, expansion decision).
4. **Clear task** — what the candidate must accomplish.
5. **Realistic context** — a situation a management accountant plausibly faces.
6. **Length** — 2–4 sentences; executive/business language, not textbook exposition.

**Prohibited patterns:** "A company is preparing…", "Calculate the variance using the formula…", "Which of the following is correct?" framing, data-dumps without business context.

**Language:** prefer controller memos, board packages, treasury reports, audit workpapers, operations dashboards, email threads — not textbook prose.

---

## 2. Exhibit Standards

1. **Purpose clarity** — every exhibit has a defined purpose and is referenced by ≥1 item.
2. **Professional format** — resembles real business documents (financial statements, ERP reports, dashboards, contracts, policies, emails).
3. **No decorative data** — every row/column is consumed by an item (consumption rule).
4. **Data consistency** — subtotals add to totals; figures reconcile across exhibits.
5. **Independent readability** — understandable without other exhibits (though complementary).
6. **Schema** — Type from the 9-type enum; Headers+Rows for tables (never Body-as-table).

---

## 3. Cognitive Progression (per case)

| Position | Type | Cognitive | Purpose |
|----------|------|-----------|---------|
| Items 1–2 | numeric | Apply | Foundational calculation |
| Items 3–4 | select | Analyze | Interpretation of results |
| Item 5 | multi | Evaluate | Judgment and decision-making |
| Item 6 | fill / match | Evaluate | Synthesis-level application |

- Items progress from calculation → analysis → judgment.
- Later items may reference earlier results but must be **independently answerable** (candidate can miss Q1 and still answer Q4).
- Case DifficultyScore within ±1 of the mean item score.

---

## 4. Realism Checklist (pass/fail gate)

- [ ] Could this happen in a real business?
- [ ] Would a controller recognize this scenario?
- [ ] Would a CFO use these exhibits?
- [ ] Are the numbers commercially reasonable (scale, industry norms)?
- [ ] Are industry practices authentic (e.g., manufacturer uses FIFO/COGS; software uses ASC 606 deferred revenue)?
- [ ] Would an executive communicate this way?

---

## 5. Anti-AI Writing Standards

| Avoid | Prefer |
|-------|--------|
| "Company XYZ is considering…" | Named company + named stakeholder |
| "The company manufactures products" | "Harbor operates three production lines in Denver" |
| "Calculate the variance" | "The CFO needs to explain the $42,000 variance to the board" |
| Textbook "Which is correct?" | "Which recommendation should the controller present?" |

---

## 6. Explanation Standards (case items)

- **Correct answer:** names the governing principle/standard, shows the formula with substituted values (calculations) or the reasoning chain (conceptual), states why correct, and gives a business interpretation.
- **Distractors:** each wrong choice explains the specific error, the likely misconception, and the correction — choice-specific, never recycled text.
- **Length:** Apply+ items ≥ 200 chars; select/multi/match items must carry distractor rationale.
- **Authorities:** cite the actual governing standard (ASC/COSO/IMA); a citation that doesn't match the tested concept is a defect (DL-P2-004 class).

---

## 7. Numerical Standards

- **Formulas:** every computation references a volume-09 formula ID; notation, rounding, and tolerance follow the catalog (dollar → whole $; % → 2 decimals; ratios → 2 decimals; 365 days).
- **Independent recomputation:** reviewer solves from stem + exhibits WITHOUT reading the stored answer first; any mismatch is Critical.
- **Internal consistency:** a choice header value must equal the derivation shown in that same choice (DL-P2-009 class — no hedge language).

---

## 8. Certification Blockers (§9.4 of the metadata standard)

A case item **shall not be certified** if:
1. Any explanation slot contains text topically unrelated to its distractor (cross-item contamination).
2. Dual-block architectures diverge between metadata and content blocks.
3. An Apply/Analyze/Evaluate item's explanation is one sentence; select/multi/match items lack distractor rationale; the correct-answer explanation doesn't name the governing principle.
4. DL-008/DL-021/DL-026 conditions hold (non-empty correct slot / absent or empty distractor slots).

---

## 9. Scoring

Score every case with `knowledge/03_content_authoring/CASE_STUDY_SCORING_RUBRIC.md` (five domains: Scenario, Exhibits, Questions, Explanations, Psychometrics). Gold Standard = 100/100 rubric + full §14.3 checklist + two independent reviewers + dual numerical verification.
