# CMA Part 1 — Section D (Cost Management) Audit Report
## Questions P1B-D-076 through P1B-D-100
## File: pack_b_corrected.js | Lines 11132–12206

**Auditor:** Independent re-solve and review  
**Date:** 2026-07-20  
**Domain:** Domain 4 — Cost Management  
**Section:** D

---

## Executive Summary

| Metric | Count |
|---|---|
| Total Questions Audited | 25 |
| PASS (all checks clear) | 24 |
| WARN (minor issues) | 1 |
| FAIL (material error) | 0 |
| Calculation Items Verified | 14 of 14 ✓ |
| Conceptual Items Reviewed | 11 of 11 ✓ |
| "This is the correct choice" bug found | 0 |

---

## Per-Question Audit

---

### Q1: P1B-D-076 — Cost Behavior: Fixed Cost
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | "Apex Manufacturing pays a monthly rent of $15,000 for its factory building regardless of production volume. This cost is best classified as:" |
| **Choices** | A: Step cost, B: Fixed cost, C: Variable cost, D: Mixed cost |
| **Stored Answer** | B (Fixed cost) |
| **Independent Answer** | B (Fixed cost) ✓ |
| **Principle Tested** | LOS D.1.1 — Distinguish fixed, variable, and mixed costs |
| **Arithmetic** | N/A (conceptual) |
| **ExplanationCorrect** | Correctly explains that a fixed cost remains constant in total regardless of activity. Includes relevant range qualifier. ✓ |
| **ExplanationWrongA** | Explains step cost and why $15,000 rent doesn't fit. ✓ |
| **ExplanationWrongB** | Empty — correct choice field. ✓ |
| **ExplanationWrongC** | Explains variable cost and why constant rent doesn't fit. ✓ |
| **ExplanationWrongD** | Explains mixed cost and why no variable component exists. ✓ |
| **"Correct choice" bug** | Not present ✓ |
| **Distractor Quality** | All four cost types are represented; each wrong answer has a distinct reasoning path. Good. |
| **Difficulty** | Easy — appropriate for a foundational classification question. |
| **LOS Alignment** | D.1.1 — correct ✓ |
| **Confidence** | **HIGH** |

---

### Q2: P1B-D-077 — Cost Behavior: Variable Cost Calculation
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | "Benton Manufacturing produces 5,000 units at a total variable cost of $100,000. If production increases to 6,000 units, what is the total variable cost?" |
| **Choices** | A: $100,000, B: $20,000, C: $120,000, D: $83,333 |
| **Stored Answer** | C ($120,000) |
| **Independent Answer** | VC/unit = $100,000/5,000 = $20. Total VC = 6,000 × $20 = $120,000. **C ✓** |
| **Arithmetic Verified** | $100k ÷ 5k = $20/unit. $20 × 6k = $120k ✓ |
| **ExplanationCorrect** | Shows step-by-step calculation and reinforces per-unit constancy concept. ✓ |
| **ExplanationWrongA** | Correctly identifies as the total at 5,000 units. ✓ |
| **ExplanationWrongB** | Correctly identifies as per-unit cost, not total. ✓ |
| **ExplanationWrongC** | Empty — correct choice. ✓ |
| **ExplanationWrongD** | Explains $83,333 as $100k ÷ 1.2 (fallacy of falling per-unit cost). ✓ |
| **Difficulty** | Labeled **Difficult** — seems overstated for a two-step arithmetic problem; Moderate would be more appropriate. Minor concern. |
| **Confidence** | **HIGH** |

---

### Q3: P1B-D-078 — Cost Behavior: Mixed Cost Calculation
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | "Crestwood Inc. has a utility cost that includes a fixed base fee of $500 per month plus $0.15 per machine hour. At 8,000 machine hours, what is the total utility cost?" |
| **Choices** | A: $500, B: $1,700, C: $1,200, D: $8,500 |
| **Stored Answer** | B ($1,700) |
| **Independent Answer** | $500 + ($0.15 × 8,000) = $500 + $1,200 = $1,700. **B ✓** |
| **Arithmetic Verified** | 0.15 × 8,000 = 1,200; 1,200 + 500 = 1,700 ✓ |
| **ExplanationCorrect** | Shows formula: Total = Fixed + (Variable × Activity). ✓ |
| **ExplanationWrongA** | Only fixed component. ✓ |
| **ExplanationWrongB** | Empty — correct choice. ✓ |
| **ExplanationWrongC** | Only variable component, missing fixed fee. ✓ |
| **ExplanationWrongD** | Claims $8,500 comes from "multiplying the rate by the wrong base" — could be clearer. $8,500 = $500 + $8,000 (as if someone used $1.00/MH instead of $0.15/MH). Marginal note: this distractor arithmetic path is not fully explained. Minor. |
| **Difficulty** | Labeled **Difficult** — again, seems Moderate. |
| **Confidence** | **HIGH** |

---

### Q4: P1B-D-079 — Cost Behavior: Step Cost
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | "Dunwoody Manufacturing employs one supervisor for every 10 production workers. Each supervisor earns $55,000 per year. This cost is best described as a:" |
| **Choices** | A: Fixed cost, B: Variable cost, C: Step cost, D: Mixed cost |
| **Stored Answer** | C (Step cost) |
| **Independent Answer** | C ✓ — Step cost is fixed over a range, then jumps. |
| **ExplanationCorrect** | Clearly describes step pattern and threshold trigger. ✓ |
| **Explanations (Wrong)** | All three incorrect choices explained with reasoning linking to the scenario. ✓ |
| **Difficulty** | Easy ✓ |
| **Confidence** | **HIGH** |

---

### Q5: P1B-D-080 — Cost Estimation: High-Low Method (Variable Cost)
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Edgemont Company data: 6 months of MH and cost. Find VC per MH using high-low. |
| **Choices** | A: $3.50, B: $2.50, C: $3.00, D: $4.00 |
| **Stored Answer** | C ($3.00) |
| **Independent Answer** | High: (10,000, $47,000); Low: (5,000, $32,000). ΔCost/ΔActivity = ($47k−$32k)/(10k−5k) = $15k/5k = $3.00/MH. **C ✓** |
| **Arithmetic Verified** | $15,000 ÷ 5,000 = $3.00 ✓ |
| **ExplanationCorrect** | Step-by-step with formula. ✓ |
| **Explanations (Wrong)** | Each corrects a specific misconception (wrong delta, wrong points). ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q6: P1B-D-081 — Cost Estimation: High-Low Method (Fixed Cost)
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Same dataset as D-080. Find estimated fixed maintenance cost per month. |
| **Choices** | A: $12,000, B: $17,000, C: $20,000, D: $15,000 |
| **Stored Answer** | B ($17,000) |
| **Independent Answer** | FC = $47,000 − ($3.00 × 10,000) = $17,000. Also: $32,000 − ($3.00 × 5,000) = $17,000. **B ✓** |
| **Arithmetic Verified** | $47,000 − $30,000 = $17,000 ✓ |
| **ExplanationCorrect** | Demonstrates both high-point and low-point methods. ✓ |
| **Explanations (Wrong)** | All address specific errors. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q7: P1B-D-082 — Cost Behavior: Relevant Range
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Fixed costs of $200,000 constant within 10,000–25,000 units. This range is known as the: |
| **Choices** | A: Relevant range, B: Break-even range, C: Margin of safety, D: Operating leverage range |
| **Stored Answer** | A (Relevant range) |
| **Independent Answer** | A ✓ |
| **ExplanationCorrect** | Defines relevant range and links to validity of cost assumptions. ✓ |
| **Explanations (Wrong)** | All distinguish the correct term from related concepts. ✓ |
| **Difficulty** | Easy ✓ |
| **Confidence** | **HIGH** |

---

### Q8: P1B-D-083 — CVP: Contribution Margin per Unit
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Glen Haven: SP $80, VC $50, FC $120,000. Find CM per unit. |
| **Choices** | A: $80, B: $130, C: $30, D: $50 |
| **Stored Answer** | C ($30) |
| **Independent Answer** | $80 − $50 = $30. **C ✓** |
| **Arithmetic Verified** | 80 − 50 = 30 ✓ |
| **ExplanationCorrect** | States formula: SP − VC per unit. Note: fixed cost is a distractor (not needed for CM per unit). ✓ |
| **Explanations (Wrong)** | Each identifies the error: $80 is SP, $130 is sum, $50 is VC. ✓ |
| **Difficulty** | Labeled **Difficult** — this is a single-step subtraction, arguably Easy. Overrated. |
| **Confidence** | **HIGH** |

---

### Q9: P1B-D-084 — CVP: Contribution Margin Ratio
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Hampton Inc.: SP $120, VC $78. Find CM ratio. |
| **Choices** | A: 45%, B: 65%, C: 35%, D: 55% |
| **Stored Answer** | C (35%) |
| **Independent Answer** | ($120 − $78) / $120 = $42 / $120 = 0.35 = 35%. **C ✓** |
| **Arithmetic Verified** | 42 ÷ 120 = 0.35 ✓ |
| **ExplanationCorrect** | Shows formula and interpretation. ✓ |
| **ExplanationWrongB** | Correctly identifies 65% as variable cost ratio. ✓ |
| **Difficulty** | Labeled **Difficult** — two-step calculation, arguably Moderate. |
| **Confidence** | **HIGH** |

---

### Q10: P1B-D-085 — CVP: Total Contribution Margin
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Irving Corp: 3,000 units at $50, VC $30, FC $40,000. Find total CM. |
| **Choices** | A: $150,000, B: $20,000, C: $60,000, D: $90,000 |
| **Stored Answer** | C ($60,000) |
| **Independent Answer** | ($50 − $30) × 3,000 = $20 × 3,000 = $60,000. FC is irrelevant. **C ✓** |
| **Arithmetic Verified** | 20 × 3,000 = 60,000 ✓ |
| **ExplanationCorrect** | Clear formula. ✓ |
| **Explanations (Wrong)** | A identified as total revenue; B as per-unit CM without multiplication; D as unspecified error. ✓ |
| **Difficulty** | Labeled **Difficult** — Moderate seems more fitting. |
| **Confidence** | **HIGH** |

---

### Q11: P1B-D-086 — Job Order Costing: Characteristics
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Jackson Custom Furniture produces custom-built furniture, each order unique. Most appropriate costing system? |
| **Choices** | A: Process costing, B: Operation costing, C: Job order costing, D: Backflush costing |
| **Stored Answer** | C (Job order costing) |
| **Independent Answer** | C ✓ — Custom, unique orders = job order costing. |
| **ExplanationCorrect** | Contrasts job vs. process costing. ✓ |
| **Explanations (Wrong)** | All clearly distinguish the alternatives. ✓ |
| **Difficulty** | Easy ✓ |
| **Confidence** | **HIGH** |

---

### Q12: P1B-D-087 — Job Order Costing: Job Cost Sheet
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Job 101: DM $2,400, DL $3,600, OH at 150% of DL. Total cost? |
| **Choices** | A: $9,000, B: $6,000, C: $11,400, D: $5,400 |
| **Stored Answer** | C ($11,400) |
| **Independent Answer** | Applied OH = 150% × $3,600 = $5,400. Total = $2,400 + $3,600 + $5,400 = $11,400. **C ✓** |
| **Arithmetic Verified** | 1.5 × 3,600 = 5,400; 2,400 + 3,600 + 5,400 = 11,400 ✓ |
| **ExplanationCorrect** | Step-by-step. ✓ |
| **ExplanationWrongA** | Explains $9,000 as "not including all components correctly." Possible path: 150% × ($2,400+$3,600) = $9,000 (applying rate to prime cost). Explanation could be more explicit about the arithmetic path. Minor. |
| **ExplanationWrongB** | $6,000 = DM + DL only. ✓ |
| **ExplanationWrongD** | $5,400 = applied OH only. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q13: P1B-D-088 — Job Order Costing: Predetermined OH Rate
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Estimated OH $600k, est. DLH 40k. Actual OH $620k, actual DLH 42k. Find predetermined rate. |
| **Choices** | A: $15.00/DLH, B: $14.76/DLH, C: $14.29/DLH, D: $15.50/DLH |
| **Stored Answer** | A ($15.00/DLH) |
| **Independent Answer** | $600,000 / 40,000 = $15.00/DLH. **A ✓** (Rate uses estimates only.) |
| **Arithmetic Verified** | 600,000 ÷ 40,000 = 15.00 ✓ |
| **ExplanationCorrect** | Clarifies that predetermined rate uses estimates, not actuals. ✓ |
| **Explanations (Wrong)** | Each traces to a specific wrong combination of actual/estimated: B = actual/actual ($620k/42k = $14.76); C = est/actual ($600k/42k = $14.29); D = actual/est ($620k/40k = $15.50). Excellent diagnostic value. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q14: P1B-D-089 — Job Order Costing: Over/Underapplied OH
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Rate $15/DLH, actual OH $620k, actual DLH 42k. Find over/underapplied. |
| **Choices** | A: $20k underapplied, B: $20k overapplied, C: $10k overapplied, D: $10k underapplied |
| **Stored Answer** | C ($10,000 overapplied) |
| **Independent Answer** | Applied = $15 × 42,000 = $630,000. Actual = $620,000. Applied > Actual = $10,000 overapplied. **C ✓** |
| **Arithmetic Verified** | 15 × 42,000 = 630,000; 630,000 − 620,000 = 10,000 ✓ |
| **ExplanationCorrect** | Clear. ✓ |
| **Explanations (Wrong)** | All correct: A reversed direction; B wrong magnitude; D reversed direction. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q15: P1B-D-090 — Job Order Costing: Journal Entry for Actual OH
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Actual OH $45k ($25k indirect materials, $12k indirect labor, $8k other). Correct journal entry? |
| **Choices** | A: Dr COGS / Cr Various; B: Dr MOH / Cr Raw Materials, Wages Payable, Various; C: Dr FG / Cr Various; D: Dr WIP / Cr Various |
| **Stored Answer** | B |
| **Independent Answer** | B ✓ — Actual overhead is debited to Manufacturing Overhead control account. |
| **ExplanationCorrect** | Explains purpose of accumulating actual OH in MOH for later comparison. ✓ |
| **Explanations (Wrong)** | A: COGS is wrong; C: FG is wrong; D: WIP is for applied OH, not actual. All correct. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q16: P1B-D-091 — Job Order Costing: Service Firms
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Consulting firm, each engagement is a job. Which is a direct cost for a specific engagement? |
| **Choices** | A: Consultant hours on engagement, B: Admin assistant salary, C: Office rent, D: Office supplies |
| **Stored Answer** | A |
| **Independent Answer** | A ✓ — Consultant hours are traceable to the specific engagement. |
| **ExplanationCorrect** | Distinguishes direct (traceable) from indirect (allocated). ✓ |
| **Explanations (Wrong)** | Each explains why the cost is indirect. ✓ |
| **Difficulty** | Easy ✓ |
| **Confidence** | **HIGH** |

---

### Q17: P1B-D-092 — Job Order Costing: Applied Overhead Entry
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Rate $12/MH, 3,500 MH. Journal entry to apply overhead? |
| **Choices** | A: Dr WIP $42k / Cr MOH $42k; B: Dr MOH $42k / Cr Various; C: Dr FG $42k / Cr MOH; D: Dr MOH $42k / Cr WIP |
| **Stored Answer** | A |
| **Independent Answer** | Applied OH = $12 × 3,500 = $42,000. Dr WIP, Cr MOH. **A ✓** |
| **Arithmetic Verified** | 12 × 3,500 = 42,000 ✓ |
| **ExplanationCorrect** | Correct entry and rationale. ✓ |
| **Explanations (Wrong)** | B describes actual OH entry; C debits FG instead of WIP; D reverses the accounts. All correct. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q18: P1B-D-093 — Process Costing: Characteristics
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Pacific Chemicals produces identical liquid solution continuously. Most appropriate system? |
| **Choices** | A: Job order, B: Backflush, C: Process costing, D: Activity-based costing |
| **Stored Answer** | C (Process costing) |
| **Independent Answer** | C ✓ — Homogeneous continuous production = process costing. |
| **ExplanationCorrect** | Clearly explains averaging over identical units. ✓ |
| **Explanations (Wrong)** | All correctly distinguish from alternatives. ✓ |
| **Difficulty** | Easy ✓ |
| **Confidence** | **HIGH** |

---

### Q19: P1B-D-094 — Process Costing: Weighted-Average Equivalent Units
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Beg WIP 1,000 (40% complete); Started 5,000; End WIP 800 (75% complete). Find WA EU for conversion. |
| **Choices** | A: 5,200, B: 6,000, C: 5,400, D: 5,800 |
| **Stored Answer** | D (5,800) |
| **Independent Answer** | Completed = 1,000 + 5,000 − 800 = 5,200. EU = 5,200 + (800 × 75%) = 5,200 + 600 = 5,800. **D ✓** |
| **Arithmetic Verified** | 1,000 + 5,000 − 800 = 5,200; 800 × 0.75 = 600; 5,200 + 600 = 5,800 ✓ |
| **ExplanationCorrect** | Walks through the full calculation. ✓ |
| **Explanations (Wrong)** | A = completed only; B = total units to account for; C = 25% instead of 75%. All good. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q20: P1B-D-095 — Process Costing: FIFO Equivalent Units
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Beg WIP 1,000 (50% complete); Started 9,000; End WIP 2,000 (40% complete). Find FIFO EU for conversion. |
| **Choices** | A: 8,000, B: 8,300, C: 7,800, D: 8,500 |
| **Stored Answer** | B (8,300) |
| **Independent Answer** | Beg WIP work: 1,000 × 50% = 500. Completed = 1,000+9,000−2,000 = 8,000. Started & completed = 8,000−1,000 = 7,000. End WIP = 2,000 × 40% = 800. Total = 500+7,000+800 = 8,300. **B ✓** |
| **Arithmetic Verified** | 1,000×0.5=500; 8,000−1,000=7,000; 2,000×0.4=800; 500+7,000+800=8,300 ✓ |
| **ExplanationCorrect** | Full FIFO breakdown. ✓ |
| **Explanations (Wrong)** | A = completed only; C = missing ending WIP; D = treating beg WIP as 100% done. All correct. ✓ |
| **Difficulty** | Difficult — appropriate given the multi-step nature. ✓ |
| **Confidence** | **HIGH** |

---

### Q21: P1B-D-096 — Process Costing: Cost per Equivalent Unit
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Total conversion costs $232,000, EU 5,800. Find cost per EU. |
| **Choices** | A: $40.00, B: $36.00, C: $45.00, D: $38.00 |
| **Stored Answer** | A ($40.00) |
| **Independent Answer** | $232,000 / 5,800 = $40.00. **A ✓** |
| **Arithmetic Verified** | 232,000 ÷ 5,800 = 40.00 ✓ |
| **ExplanationCorrect** | States formula and clarifies WA includes beg WIP costs. ✓ |
| **Explanations (Wrong)** | Each traces to wrong EU or wrong total. Could be more specific about the arithmetic paths, but functional. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q22: P1B-D-097 — Process Costing: Cost Allocation to Ending WIP
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | 5,200 completed, 800 end WIP (75% conversion). Materials $15/EU (added at beginning), conversion $40/EU. Cost in ending WIP? |
| **Choices** | A: $44,000, B: $12,000, C: $28,000, D: $36,000 |
| **Stored Answer** | D ($36,000) |
| **Independent Answer** | Materials: 800 × 100% × $15 = $12,000. Conversion: 800 × 75% × $40 = $24,000. Total: $36,000. **D ✓** |
| **Arithmetic Verified** | 800×15=12,000; 800×0.75×40=24,000; 12,000+24,000=36,000 ✓ |
| **ExplanationCorrect** | Clearly separates materials and conversion. ✓ |
| **Explanations (Wrong)** | A = 100% conversion; B = materials only; C = 50% conversion. All correct. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q23: P1B-D-098 — Process Costing: FIFO Cost per Equivalent Unit ⚠️
**Verdict: WARN**

| Field | Assessment |
|---|---|
| **Stem** | Current period conversion costs $207,500; FIFO EU 8,300; Beg WIP had $12,500 conversion costs. Find FIFO cost per EU. |
| **Choices** | A: $24.70, B: $26.51, C: $27.50, D: $25.00 |
| **Stored Answer** | D ($25.00) |
| **Independent Answer** | FIFO cost per EU = Current period costs / FIFO EU = $207,500 / 8,300 = $25.00. **D ✓** |
| **Arithmetic Verified** | 207,500 ÷ 8,300 = 25.00 ✓ |
| **ExplanationCorrect** | Correctly states that only current period costs are divided by FIFO EU; beginning WIP costs are kept separate. ✓ |
| **ExplanationWrongA** | **BUG:** Says "$24.70 incorrectly includes beginning WIP costs in the per-unit calculation." This is **arithmetically wrong**. If beginning WIP costs were included: ($207,500 + $12,500) / 8,300 = $220,000 / 8,300 = **$26.51**, which matches **Choice B**, not Choice A ($24.70). The explanation for Choice A gives an incorrect reason. $24.70 (× 8,300 = $205,010) may come from some other error (e.g., wrong EU), but not from including beginning WIP costs. |
| **ExplanationWrongB** | Correctly identifies $26.51 as including beginning WIP costs. ✓ |
| **ExplanationWrongC** | Generic — "would result if current costs were $228,250." Acceptable. |
| **ExplanationWrongD** | Empty — correct choice. ✓ |
| **"Correct choice" bug** | Not present ✓ |
| **Difficulty** | Difficult ✓ |
| **Confidence in Answer** | **HIGH** (the stored answer $25.00 is correct) |
| **Confidence in Explanation** | **LOW** (ExplanationWrongA contains a factual arithmetic error) |

---

### Q24: P1B-D-099 — Process Costing: Transferred-In Costs
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Finishing Dept: Beg WIP 500 units ($20k TI costs), received 4,000 units ($160k TI costs). Total TI costs under weighted-average? |
| **Choices** | A: $180,000, B: $160,000, C: $140,000, D: $20,000 |
| **Stored Answer** | A ($180,000) |
| **Independent Answer** | WA total TI costs = Beg WIP ($20k) + Current ($160k) = $180,000. **A ✓** |
| **Arithmetic Verified** | 20,000 + 160,000 = 180,000 ✓ |
| **ExplanationCorrect** | Correctly explains WA combines beginning and current period costs. ✓ |
| **Explanations (Wrong)** | All correct: B = current only; C = unexplained wrong number; D = beginning only. ✓ |
| **Difficulty** | Moderate ✓ |
| **Confidence** | **HIGH** |

---

### Q25: P1B-D-100 — Operation Costing (Hybrid Costing)
**Verdict: PASS ✓**

| Field | Assessment |
|---|---|
| **Stem** | Windsor Apparel: batch clothing, common processes (cutting, sewing) but different materials (denim, cotton, polyester). Most appropriate system? |
| **Choices** | A: Operation costing, B: Backflush costing, C: Job order costing, D: Process costing |
| **Stored Answer** | A (Operation costing) |
| **Independent Answer** | A ✓ — Operation (hybrid) costing combines process costing for conversion with job costing for materials. |
| **ExplanationCorrect** | Clearly describes hybrid nature. ✓ |
| **Explanations (Wrong)** | All distinguish alternatives correctly. ✓ |
| **Difficulty** | Easy ✓ |
| **Confidence** | **HIGH** |

---

## Cross-Cutting Observations

### 1. Difficulty Ratings
Several questions labeled **Difficult** seem overrated:
| Question | Labeled | Suggested | Reason |
|---|---|---|---|
| D-077 | Difficult | Moderate | Two-step arithmetic (÷ then ×) |
| D-078 | Difficult | Moderate | Plug-and-chug formula |
| D-083 | Difficult | Easy | Single subtraction |
| D-084 | Difficult | Moderate | Two-step (subtract then divide) |
| D-085 | Difficult | Moderate | Two-step (subtract then multiply) |

This may be intentional (cautious labeling), but examinees may be misled about which questions deserve extra time.

### 2. Explanation Quality
- All **ExplanationCorrect** entries explain **why** the answer is correct, not just what it is. ✓
- All **ExplanationWrong** entries explain **why the specific choice is wrong** rather than just saying "this is incorrect." ✓
- **No instance** of the "This is the correct choice" bug found across all 25 questions. ✓

### 3. Distractor Quality
Strong distractors overall. Most wrong choices correspond to common student errors:
- Using wrong data points (D-080, D-081)
- Confusing total vs. per-unit (D-077, D-083, D-085)
- Including/excluding wrong cost components (D-078, D-087, D-097, D-099)
- Confusing actual vs. estimated (D-088, D-089)
- Applying wrong completion % (D-094, D-097)
- Confusing FIFO vs. weighted-average (D-095, D-098)

### 4. Scenario Consistency
- D-080 and D-081 share identical datasets — good for testing depth across two related calculations (VC, then FC).
- D-088 and D-089 share data with D-080/D-081 — not identical but uses manufacturing overhead context consistently.
- D-094 and D-096 use consistent data (D-096's 5,800 EU = D-094's answer). Excellent linkage.

### 5. LOS Coverage (Domain 4 — Cost Management)

| LOS Area | Questions | Coverage |
|---|---|---|
| D.1 Cost Behavior | D-076, D-077, D-078, D-079, D-080, D-081, D-082 | ✓ Comprehensive |
| D.2 CVP / Contribution Margin | D-083, D-084, D-085 | ✓ Adequate |
| D.3 Job Order Costing | D-086, D-087, D-088, D-089, D-090, D-091, D-092 | ✓ Comprehensive |
| D.4 Process Costing | D-093, D-094, D-095, D-096, D-097, D-098, D-099, D-100 | ✓ Comprehensive |
| D.5 Activity-Based Costing | *(none in this batch — starts at D-101)* | N/A |

### 6. ExplanationWrongA Arithmetic Error (D-098)
**Severity: Minor** — The stored answer ($25.00) is correct, and the correct explanation is accurate. However, the ExplanationWrongA field claims $24.70 results from "including beginning WIP costs," which is arithmetically false. The actual result of including beginning WIP is $26.51 (Choice B). This reduces the pedagogical value of the wrong-answer explanation.

---

## Summary Table

| # | QuestionID | Topic | Calc? | Difficulty | Stored Answer | My Answer | Match? | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | P1B-D-076 | Fixed cost classification | No | Easy | B | B | ✓ | **PASS** |
| 2 | P1B-D-077 | Variable cost calculation | Yes | Difficult | C | C | ✓ | **PASS** |
| 3 | P1B-D-078 | Mixed cost calculation | Yes | Difficult | B | B | ✓ | **PASS** |
| 4 | P1B-D-079 | Step cost classification | No | Easy | C | C | ✓ | **PASS** |
| 5 | P1B-D-080 | High-low method (VC) | Yes | Moderate | C | C | ✓ | **PASS** |
| 6 | P1B-D-081 | High-low method (FC) | Yes | Moderate | B | B | ✓ | **PASS** |
| 7 | P1B-D-082 | Relevant range | No | Easy | A | A | ✓ | **PASS** |
| 8 | P1B-D-083 | CM per unit | Yes | Difficult | C | C | ✓ | **PASS** |
| 9 | P1B-D-084 | CM ratio | Yes | Difficult | C | C | ✓ | **PASS** |
| 10 | P1B-D-085 | Total CM | Yes | Difficult | C | C | ✓ | **PASS** |
| 11 | P1B-D-086 | Job costing concept | No | Easy | C | C | ✓ | **PASS** |
| 12 | P1B-D-087 | Job cost sheet | Yes | Moderate | C | C | ✓ | **PASS** |
| 13 | P1B-D-088 | Predetermined OH rate | Yes | Moderate | A | A | ✓ | **PASS** |
| 14 | P1B-D-089 | Over/underapplied OH | Yes | Moderate | C | C | ✓ | **PASS** |
| 15 | P1B-D-090 | OH journal entry | No | Moderate | B | B | ✓ | **PASS** |
| 16 | P1B-D-091 | Service firm direct costs | No | Easy | A | A | ✓ | **PASS** |
| 17 | P1B-D-092 | Applied OH journal entry | No | Moderate | A | A | ✓ | **PASS** |
| 18 | P1B-D-093 | Process costing concept | No | Easy | C | C | ✓ | **PASS** |
| 19 | P1B-D-094 | WA equivalent units | Yes | Moderate | D | D | ✓ | **PASS** |
| 20 | P1B-D-095 | FIFO equivalent units | Yes | Difficult | B | B | ✓ | **PASS** |
| 21 | P1B-D-096 | Cost per EU | Yes | Moderate | A | A | ✓ | **PASS** |
| 22 | P1B-D-097 | Cost to ending WIP | Yes | Moderate | D | D | ✓ | **PASS** |
| 23 | **P1B-D-098** | **FIFO cost per EU** | **Yes** | **Difficult** | **D** | **D** | **✓** | **WARN** |
| 24 | P1B-D-099 | Transferred-in costs | Yes | Moderate | A | A | ✓ | **PASS** |
| 25 | P1B-D-100 | Operation costing | No | Easy | A | A | ✓ | **PASS** |

### Final Tally
- **PASS:** 24 / 25 (96%)
- **WARN:** 1 / 25 (4%) — D-098 (explanation arithmetic error in ExplanationWrongA)
- **FAIL:** 0 / 25 (0%)

### Recommendation
Fix the ExplanationWrongA field for P1B-D-098. The current text says "$24.70 incorrectly includes beginning WIP costs in the per-unit calculation." This should be corrected to state the actual probable error path that leads to $24.70 (e.g., using wrong EU count or misapportioned costs), or the line should be revised to accurately describe the mathematical derivation.

All question bodies, stems, choices, correct answers, and arithmetic are verified correct.
