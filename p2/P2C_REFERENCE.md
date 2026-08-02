# P2C Reference — Decision Analysis Authoring Knowledge Base

Attach this file to every ChatDev run for Pack C. It carries
everything the LLM needs to author accurate, governance-compliant
Part 2 exam questions.

---

## 1. Domain C Formulas

DA-01  Breakeven (units)  B/E units = Fixed Costs / CM per Unit
DA-02  Breakeven (dollars) B/E $ = Fixed Costs / CM Ratio
DA-03  Target Profit (units) (FC + Target Profit) / CM per Unit
DA-04  Margin of Safety  (Actual Sales - BE Sales) / Actual Sales
DA-05  Degree of Op Leverage CM / Operating Income
DA-06  Multi-product WACM  sum(Sales Mix % x CM per Unit) per product
DA-07  Shut-down point  Continue if Price >= Minimum AVC
DA-08  Process further   Process if Incremental Rev > Incremental Cost
DA-09  Transfer pricing min  Variable Cost + Opportunity Cost
DA-10  Expected Value  sum(Probability x Outcome)
DA-11  Value of Perfect Info  EV with PI - EV without PI

---

## 2. Distractor Traps (7 patterns)

Every wrong-choice explanation must identify which specific trap the
distractor represents.

T1  Including sunk costs in relevant-cost analysis
T2  Treating unit fixed costs as if variable
T3  Using absorption unit cost for special-order pricing
T4  Forgetting opportunity cost in make-or-buy
T5  Applying joint costs to sell-or-process-further
T6  Omitting capacity constraints in multi-product CVP
T7  Using average instead of incremental cost in pricing

---

## 3. JSON Field Schema (exact field order for every item)

```
Part              2
Section           "C"
Topic             "C.NNN descriptive-topic"
QuestionID        "P2-C-NNN"
question_state    "Unprocessed"
Part2OnlyFlag     true
Stem              business-realistic scenario (2-4 sentences)
Choices.{A,B,C,D} four answer options
CorrectChoice     one of "A"/"B"/"C"/"D"
ExplanationCorrect  full explanation, min 200 chars for Apply+
ExplanationWrongA  distractor text or empty if CC is A
ExplanationWrongB  distractor text or empty if CC is B
ExplanationWrongC  distractor text or empty if CC is C
ExplanationWrongD  distractor text or empty if CC is D
Difficulty         "Easy" / "Moderate-Easy" / "Moderate" / "Difficult" / "Very Difficult"
DifficultyScore    1=Easy, 2=Moderate-Easy, 3=Moderate, 4=Difficult, 5=Very Difficult
CognitiveLevel     "Remember" / "Understand" / "Apply"
CalculationItem    true if requires arithmetic
Type               "select"
LOSTag             "C.1" through "C.7"
BlueprintDomain    "Decision Analysis"
FormulaReference   formula name, or empty string
CommonTrapReference  trap name, or empty string
Authorities        ["IMA SMA on relevant costing"]
VerificationChecks array of 7 check strings
```

### ExplanationWrong rules

- If CorrectChoice is "C", then ExplanationWrongC must be empty.
- All three non-correct-answer ExplanationWrong slots must contain
  at least 75 characters of choice-specific text.
- No text may be reused across multiple distractor slots.

---

## 4. Governance Rules (BLOCK level)

Rule 2 (DL-008)  ExplanationWrong at the CorrectChoice letter must be empty
Rule 6 (DL-026)  All 3 non-CC ExplanationWrong slots must be non-empty
Rule 9 (DL-037)  No "No ... should be investigated" mismatches
Rule 11  Part2OnlyFlag=true, QID format P2-C-NNN

---

## 5. Explanation Templates

CALCULATION CORRECT ANSWER:

Under relevant costing principles, only incremental costs and revenues
are considered when evaluating [decision]. Fixed costs are [treatment].
[Formula with substituted values] = [result]. Therefore, [business
interpretation]. A common error is [specific trap].

DISTRACTOR WRONG ANSWER:

Option [letter] incorrectly [specific error]. A candidate selecting
this option likely [misconception]. The correct approach is [contrast].
This is a common area of confusion between [two concepts].

FORBIDDEN BOILERPLATE (never use these phrases):

- "represents a plausible misconception"
- "A candidate may select this option by misapplying"
- "does not align with CMA Part 1 accounting principles"
- Any text repeated across multiple distractor slots

---

## 6. Business Realism

Company names to use: Atlas Manufacturing, Pine Ridge Components,
Harbor Food Processors, Meridian Equipment, Northstar Analytics,
Lakeside Medical Supply, Ridgeview Electronics, Summit Packaging.

Stakeholder roles: Controller, CFO, Operations Manager, VP of
Manufacturing, Production Manager, Cost Accountant.

Scenario openers:
- "The controller is evaluating whether to accept a one-time special
  order..."
- "The VP of Manufacturing must decide whether to make a component
  in-house or purchase it from an outside supplier..."
- "Management is analyzing the profitability of a product line that
  has been showing losses..."

---

## 7. Answer Position Balance

Across the 15 items in this batch distribute CorrectChoice as:
A ~4, B ~4, C ~4, D ~3.
No streak of 4 or more consecutive same-letter correct answers.

---

## 8. Definition-Match Prevention (DL-031)

Do NOT write items where the stem is a textbook definition and the
correct answer is the defined term. Example to AVOID:
  Stem = "The point at which total revenues equal total costs is the:"
  Correct = "Breakeven point"
This is a DL-031 violation. If the item requires only reading
comprehension, score it Easy (difficultyScore: 1).

PREFER items where the candidate must apply a formula or concept to
a specific business scenario with named company and numeric figures.

---

## 9. Content Stop Conditions

REJECT and regenerate if any of these:

- Part 1 concept as primary topic (variance analysis, process costing)
- ExplanationWrong at the CorrectChoice letter is non-empty
- Any non-CC ExplanationWrong slot is empty (fewer than 75 characters)
- "No" paired with an affirmative conclusion (or vice versa)
- Same text across multiple distractor slots
- No IMA SMA / relevant costing authority cited in ExplanationCorrect
- Definition-match item scored higher than Easy (1)
- Formula not listed in Section 1 above
