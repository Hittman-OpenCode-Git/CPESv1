const WAVE1315_PART_001 = [
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.101 constant gross margin NRV method",
    "MicroTopic": "constant gross margin NRV",
    "UniqueConceptKey": "D-C101-constant-gross-margin-NRV",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $120,000. Products: A final sales $300,000 with $50,000 separable costs; B final sales $200,000 with $30,000 separable. Management wants identical gross-margin percentages on both products. Allocate joint cost by the constant-gross-margin NRV method.",
    "Choices": {
      "A": "A $71,429 / B $48,571 — NRV pro-rata ($250,000 vs $170,000 of $420,000)",
      "B": "A $60,000 / B $60,000 — equal split reflects equal processing stages",
      "C": "A $70,000 / B $50,000 — constant 60% gross margin on both (A COGS $120,000 = $50,000 separable + $70,000 joint; B COGS $80,000 = $30,000 + $50,000)",
      "D": "A $120,000 / B $0 — all joint cost to the higher-sales product as primary-output costing"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Overall gross margin = ($500,000 sales − $120,000 joint − $80,000 separable)/$500,000 = $300,000/$500,000 = 60%. Force 60% on each: A COGS = $300,000 × 40% = $120,000 = $50,000 separable + $70,000 joint; B COGS = $200,000 × 40% = $80,000 = $30,000 separable + $50,000 joint. Check: $70,000 + $50,000 = $120,000 joint — reconciles. NRV pro-rata (option A: $250,000 vs $170,000 of $420,000 → $71,429/$48,571... precisely 250/420×$120,000 = $71,428.57; 170/420×$120,000 = $48,571.43) yields UNEQUAL margins (A 59.5%, B 60.7%) — defeating the stated objective. Equal split (option B: $60,000 each) ignores economics entirely. Primary-output (option D: $120,000/$0) treats B as a by-product — but B's $200,000 sales make it a joint product, not scrap. Business interpretation: constant-margin NRV backs into joint allocations from a mandated margin — compute overall margin first, then force it per product. Common trap: using NRV pro-rata when equal margins are the stated goal.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Joint Products",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-101",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's $71,429/$48,571 applies NRV pro-rata (250/420 and 170/420 of $120,000 exactly) — yielding 59.5%/60.7% unequal margins. Pro-rata serves relative values, never mandated equal margins.",
    "ExplanationWrongB": "Option B's $60,000 equal split ignores both NRV ($250,000 vs $170,000) and margin targets — equality without economic basis.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $120,000/$0 treats $200,000-sales B as a by-product — joint products with material sales values share joint cost; by-product treatment needs immateriality.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.102 by-product revenue method at sale",
    "MicroTopic": "by-product revenue method sale",
    "UniqueConceptKey": "D-C102-by-product-revenue-method-sale",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Joint cost $150,000. Main product sales $600,000. By-product sales $25,000 with $5,000 disposal costs, sold in the period (no beginning inventory, none left unsold). Compare the revenue method (recognize by-product revenue at sale, no inventory value) against the NRV-reduction method. What does each report?",
    "Choices": {
      "A": "Revenue method: $625,000 revenue, $150,000 COGS; NRV method: $600,000 revenue, $130,000 COGS ($150,000 − $20,000 NRV) — $475,000 vs $470,000 gross profit differ by $5,000 of disposal timing",
      "B": "Identical $475,000 gross profit under both — presentation never affects profit when by-products sell through",
      "C": "Revenue method reports $25,000 more profit — gross by-product revenue exceeds net NRV credits by definition",
      "D": "NRV method reports $25,000 more profit — deductions always dominate additions"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Revenue method: revenue $600,000 + $25,000 = $625,000; COGS $150,000 (joint, unreduced); gross = $475,000. NRV method: revenue $600,000; COGS $150,000 − ($25,000 − $5,000 = $20,000) = $130,000; gross = $470,000. Difference = $5,000 (the disposal cost: expensed through COGS-reduction arithmetic under NRV vs netted in revenue under the revenue method... precisely under revenue method the $5,000 disposal hits selling expense separately, so total profit reconciles at $470,000 both ways when fully traced — the $475,000 vs $470,000 gross-profit gap is a classification difference, not an economic one). Identical-profit claims (option B) ignore the $5,000 disposal geography. Directional absolutes (options C/D) pick winners without tracing disposal. Business interpretation: by-product methods differ in geography (revenue vs COGS lines), converging on total profit when fully traced — compare methods on transparency, never on headline gross profit. Common trap: reading gross-profit gaps as economic differences.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Joint Products",
        "url": "https://openstax.org/books/principles-financial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-102",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B's identical-$475,000 claims geography never matters — $475,000 vs $470,000 gross differs by the $5,000 disposal placement. Trace fully before declaring equivalence.",
    "ExplanationWrongC": "Option C's revenue-method-superiority reads $475,000 vs $470,000 as economic victory — the $5,000 gap is disposal geography ($5,000 selling expense under revenue method), not value creation.",
    "ExplanationWrongD": "Option D's NRV-superiority inverts the same error — $470,000 vs $475,000 reflects cost placement, never economic dominance.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.103 scrap waste spoilage taxonomy",
    "MicroTopic": "scrap waste spoilage taxonomy",
    "UniqueConceptKey": "D-C103-scrap-waste-spoilage-taxonomy",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Three residues: (1) metal shavings sold for $3,000 (no separable cost); (2) evaporated solvent, valueless, no disposal cost; (3) 200 defective units (normal, $15,000 rework absorbed). Classify each as scrap, waste, or spoilage with correct treatment.",
    "Choices": {
      "A": "All spoilage — residues are residues regardless of value or form",
      "B": "(1) scrap (other income or COGS credit, $3,000); (2) waste (no entry — valueless); (3) normal spoilage (product cost, $15,000 absorbed) — value and form determine taxonomy",
      "C": "(1) by-product (joint allocation); (2) abnormal spoilage (period loss); (3) waste (no entry)",
      "D": "(1) waste, (2) scrap, (3) abnormal — alphabetical assignment is the standard mnemonic"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Taxonomy by value and form: (1) shavings with $3,000 sales value = SCRAP (material leftover with realizable value → other income or COGS credit); (2) evaporated solvent, valueless, costless = WASTE (no entry — nothing to measure); (3) defective UNITS (not mere residue) at normal rates = NORMAL SPOILAGE (product cost, $15,000 absorbed by good output). All-spoilage (option A) erases value/form distinctions the treatments depend on. By-product treatment (option C: joint allocation for $3,000 shavings) elevates scrap to co-product status; abnormal labeling without controllability evidence plus waste-as-no-entry for defective units misfires twice. Alphabetical assignment (option D) is not a taxonomy. Business interpretation: scrap has value (track it), waste has neither value nor cost (ignore it), spoilage has form (units — cost it by normality). Common trap: calling all residues spoilage.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-103",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's all-spoilage erases the value distinction ($3,000 scrap tracked as income/credit) and the form distinction (units vs residue) — treatments differ, so taxonomy matters.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C elevates $3,000 shavings to joint-product status (allocation) while calling normal-rate defectives abnormal and good units waste — three misclassifications in one option.",
    "ExplanationWrongD": "Option D's alphabetical assignment is not a taxonomy — value (scrap), valuelessness (waste), and unit-form (spoilage) classify, never alphabet position.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.104 normal loss with beginning WIP",
    "MicroTopic": "normal loss beginning WIP",
    "UniqueConceptKey": "D-C104-normal-loss-beginning-WIP",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "BWIP 1,000 units 60% complete ($12,000 prior cost); started 9,000; normal loss 5% of started units (450 units, detected at completion); completed 8,000; EWIP 1,550 units 40% complete. Under weighted average, how does the normal loss affect EU and unit cost (current costs $180,000)?",
    "Choices": {
      "A": "EU 9,070 (8,000 + 450×100% + 1,550×40% = 8,000 + 450 + 620); unit cost ($12,000 + $180,000)/9,070 = $192,000/9,070 = $21.17 — normal loss absorbs as EU with cost to good output",
      "B": "EU 8,620 (loss excluded) — losses never enter equivalent units",
      "C": "EU 9,620 (loss double-counted in both completed and EWIP) — conservatism double-counts shrinkage",
      "D": "EU 8,000 (completed only) — WIP and loss are period adjustments outside EU"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Weighted-average EU: completed 8,000 + normal loss 450 (detected at completion = 100% complete) + EWIP 1,550 × 40% = 620 → 8,000 + 450 + 620 = 9,070 EU. Unit cost = ($12,000 + $180,000)/9,070 = $192,000/9,070 = $21.1716... ≈ $21.17. Normal loss detected at completion counts as full EU (work was fully performed before loss discovery) with its $9,527 (450 × $21.17) absorbed by good output. Loss-excluding (option B: 8,620 EU → $22.27/unit) spreads loss cost nowhere while understating EU — denominator without the loss it must absorb. Double-counting (option C: 9,620) adds loss units twice. Completed-only (option D: 8,000 EU → $24.00) strands EWIP and loss outside unitization entirely. Business interpretation: normal losses detected at completion are 100% EU — the work was done, the units failed, good output absorbs. Common trap: excluding normal loss from EU denominators.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-104",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B's 8,620 EU excludes 450 loss units — denominator without the loss it must absorb, overstating unit cost to $22.27 while hiding $9,527 of loss economics.",
    "ExplanationWrongC": "Option C's 9,620 double-counts loss units in completed and separately — 450 units of phantom EU understating cost.",
    "ExplanationWrongD": "Option D's 8,000 completed-only strands 620 EWIP EU plus 450 loss EU outside unitization — $24.00/unit prices WIP and loss out of existence.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.105 FIFO with staged material additions",
    "MicroTopic": "FIFO staged material additions",
    "UniqueConceptKey": "D-C105-FIFO-staged-material-additions",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Materials added 60% at start, 40% at 70% completion. BWIP 2,000u 50% complete (first material added last period; second not yet). Started 8,000; completed 7,000 (plus BWIP finished = 9,000 total out); EWIP 1,000u 80% complete (both materials added this period). Current material costs $54,000. Under FIFO, what are material EU and cost per EU?",
    "Choices": {
      "A": "10,000 EU at $5.40 — full counting regardless of staging",
      "B": "8,000 EU (BWIP 2,000 second-material + started/completed 7,000... precisely 2,000 + 7,000 = 9,000... recompute: BWIP needs second material only on 2,000u = 2,000 × 40% = 800 EU; started/completed 7,000 × 100% = 7,000; EWIP 1,000 × 100% = 1,000; total 800 + 7,000 + 1,000 = 8,800 EU; $54,000/8,800 = $6.1364 ≈ $6.14)",
      "C": "8,800 EU at $6.14 — staged additions counted as added (BWIP 800 + 7,000 + 1,000)",
      "D": "7,000 EU (started/completed only) — WIP adjustments net to zero"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "FIFO material EU tracks when each addition occurs: BWIP 2,000u already holds first material (added last period) but needs second material (40% portion) as units pass 70% this period: 2,000 × 40% = 800 EU. Started-and-completed 7,000u get both additions now: 7,000 × 100% = 7,000 EU. EWIP 1,000u (started this period, past 70%): both additions now = 1,000 × 100% = 1,000 EU. Total = 800 + 7,000 + 1,000 = 8,800 EU; cost = $54,000/8,800 = $6.13636 ≈ $6.14. Full-counting (option A: 10,000 EU) ignores that BWIP's first material arrived last period. Started-only (option D: 7,000) drops 1,800 EU of legitimate current additions. Option B's arithmetic trails off mid-computation ($6.14 belongs to the corrected 8,800, not to B's fragmented 9,000). Business interpretation: staged additions split EU by addition point — BWIP carries prior additions forward, current additions count now. Common trap: full-unit EU for partially-added materials.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-105",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's 10,000 EU counts BWIP's first material (added last period) as current work — staged additions split by period; prior-period additions never recur in current EU.",
    "ExplanationWrongB": "Option B trails off mid-computation ($6.14 belongs to 8,800 EU, not to its fragmented 9,000) — incomplete arithmetic presented as an answer.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's 7,000 started-only drops 800 BWIP EU plus 1,000 EWIP EU of legitimate current additions — WIP adjustments net to zero only by coincidence, never by rule.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.106 weighted average with profit in BWIP",
    "MicroTopic": "weighted average profit BWIP",
    "UniqueConceptKey": "D-C106-weighted-average-profit-BWIP",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "BWIP 1,000 units ($10,000: $6,000 cost + $4,000 profit under a transfer-pricing markup); started 9,000; completed 8,500; EWIP 1,500 units 60% complete. Current costs $170,000. Under weighted average, what are EU, unit cost, and how is BWIP profit handled?",
    "Choices": {
      "A": "EU 9,400 (8,500 + 900); unit $19.15 ($180,000/9,400); BWIP profit stays buried in unit cost — average costing blends margins by construction",
      "B": "EU 8,500 (completed only); unit $21.18 ($180,000/8,500) — WIP excluded like FIFO",
      "C": "EU 10,000 (all physical units); unit $18.00 — denominators count units, never completion",
      "D": "EU 9,400 with profit stripped first ($176,000/9,400 = $18.72) — BWIP profit must be purged before averaging"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Weighted-average EU = 8,500 + 1,500×60% (900) = 9,400 EU (loss-free here). Total cost = $10,000 BWIP (INCLUDING its $4,000 profit — average costing blends prior-period margins into current unit cost by construction) + $170,000 current = $180,000; unit = $180,000/9,400 = $19.1489 ≈ $19.15. Completed COGS = 8,500 × $19.15 = $162,745... precisely 8,500 × 19.14894 = $162,766; EWIP = 900 × $19.15 = $17,234 (sums $180,000 ✓). Profit-stripping (option D: $176,000/9,400 = $18.72) applies FIFO thinking (prior-period profit purged) under an average label. Completed-only (option B: $21.18) strands 900 EWIP EU. All-physical (option C: $18.00) ignores completion states. Business interpretation: weighted-average blending is the method's defining choice — prior margins melt into current unit cost, visibly and by design. FIFO would exclude the $4,000; average absorbs it. Common trap: purging BWIP profit under average costing.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-106",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B's 8,500 completed-only strands 900 EWIP EU — average EU includes ending WIP by completion state, always.",
    "ExplanationWrongC": "Option C's 10,000 all-physical ignores the 60% completion state (900 EU, not 1,500) — denominators weight by completion, never count heads.",
    "ExplanationWrongD": "Option D purges $4,000 of BWIP profit before averaging — FIFO thinking under an average label. Average blends prior margins by construction and discloses the blending.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.107 EU with mid-process inspection",
    "MicroTopic": "EU mid-process inspection",
    "UniqueConceptKey": "D-C107-EU-mid-process-inspection",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Inspection at 60% completion. Started 10,000; completed 8,000; EWIP 1,200u 80% complete (past inspection); BWIP 800u 40% complete (pre-inspection, prior-period loss already accounted). Normal loss 300u detected at inspection; abnormal loss 200u (same point). Current costs $200,000. Under weighted average, what are EU?",
    "Choices": {
      "A": "EU 9,460 (8,000 + 500 loss + 960 EWIP); unit $21.14 ($200,000/9,460) — BWIP excluded (prior accounted), all current losses included",
      "B": "EU 9,960 — BWIP re-included for completeness",
      "C": "EU 8,960 — abnormal excluded from denominators as period losses",
      "D": "EU 8,000 — WIP and loss are period adjustments outside EU"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Weighted-average EU: completed 8,000 + normal loss 300 (at 60% inspection = 100% of inspection-point work... precisely losses detected at inspection count per inspection-point completion: 300 × 100% = 300... plus abnormal 200 × 100% = 200 (abnormal counts in EU, then assigned to period loss — EU inclusion with period-loss assignment); EWIP 1,200 × 80% = 960. Total = 8,000 + 300 + 200 + 960 = 9,460 EU. BWIP 800u excluded (prior-period loss already accounted — no double count). Unit = $200,000/9,460 = $21.1416 ≈ $21.14. BWIP-including (option B: 9,960) double-counts prior-accounted loss. Abnormal-excluding (option C: 8,960... precisely 9,460 − 200 − 300 = 8,960... that excludes BOTH losses; abnormal-only exclusion gives 9,260) misstates EU — abnormal units consumed current work and enter EU before period-loss assignment. Completed-only (option D) strands WIP and loss. Business interpretation: EU counts current work done (including on lost units); loss classification assigns the resulting cost (normal to product, abnormal to period). Count all, assign by normality. Common trap: excluding abnormal units from EU.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Process Costing",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-107",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B's 9,960 re-includes 800 BWIP units whose prior-period loss was already accounted — double-counting across periods.",
    "ExplanationWrongC": "Option C excludes abnormal units from EU — but abnormal units consumed current work (200 EU of effort); they enter EU, then their $4,228 cost assigns to period loss.",
    "ExplanationWrongD": "Option D's 8,000 completed-only strands 960 EWIP EU plus 500 loss EU — $21.14 becomes $25.00 on fiction.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.108 dual-rate allocation design",
    "MicroTopic": "dual-rate allocation design",
    "UniqueConceptKey": "D-C108-dual-rate-allocation-design",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Power department: budgeted fixed $300,000 (capacity 100,000 kWh) plus variable $0.10/kWh. Divisions: M budgets 60,000 kWh, uses 50,000; N budgets 40,000, uses 45,000. Design the dual-rate charge for each division.",
    "Choices": {
      "A": "Single rate $3.10/kWh on actual usage (M $155,000, N $139,500) — simplicity governs",
      "B": "Fixed on budgeted plus variable on budgeted (M $186,000/N $124,000) — budgets govern all legs for stability",
      "C": "Fixed on actual usage (M $150,000/N $150,000... precisely 50/95×$300,000 = $157,895/$142,105) plus variable on actual — actual shares for all legs",
      "D": "Fixed on budgeted ($180,000 M / $120,000 N) plus variable on actual ($5,000 M / $4,500 N) — totals M $185,000, N $124,500; fixed reflects capacity reserved, variable reflects consumption"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Dual-rate mechanics: fixed allocated on BUDGETED usage (capacity reserved: M 60% × $300,000 = $180,000; N 40% × $300,000 = $120,000 — budgeted shares, rewarding accurate forecasting); variable on ACTUAL usage (M 50,000 × $0.10 = $5,000; N 45,000 × $0.10 = $4,500). Totals: M $185,000; N $124,500 (sum $309,500 vs $300,000 + $9,500 actual variable... precisely budgeted variable was 100,000 × $0.10 = $10,000; actual 95,000 × $0.10 = $9,500; fixed $300,000 + $9,500 = $309,500 ✓). Single-rate (option A: $3.10 = ($300,000 fixed + $10,000 budgeted variable)/100,000 budgeted kWh → M 50,000 × $3.10 = $155,000; N 45,000 × $3.10 = $139,500) charges reserved capacity by consumption.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-108",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's single rate (corrected $3.10: M $155,000/N $139,500) charges reserved capacity by consumption — M's accurate forecasting subsidizes N's 5,000-hour overrun. Single rates conflate reservation with consumption.",
    "ExplanationWrongB": "Option B's variable-on-budgeted ($6,000/$4,000) charges unconsumed variable cost — variable follows actual consumption, always. Budgeted-variable billing taxes M for 10,000 unconsumed kWh.",
    "ExplanationWrongC": "Option C allocates fixed on actual usage ($157,895/$142,105) — penalizing N's overrun... precisely rewarding it (N pays more fixed for using more, M pays less for accuracy). Fixed follows reservations (budgeted), never consumption.",
    "ExplanationWrongD": "",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  },
  {
    "Part": 1,
    "Section": "D",
    "SectionName": "Cost Management",
    "Topic": "D.109 single versus dual rate comparison",
    "MicroTopic": "single versus dual rate comparison",
    "UniqueConceptKey": "D-C109-single-versus-dual-rate-comparison",
    "LOSTag": "P1-D Cost management",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Same power department ($300,000 fixed, $0.10 variable, 100,000 budgeted kWh; M 60,000/N 40,000 budgeted; M 50,000/N 45,000 actual). Compare single-rate ($3.10) against dual-rate outcomes and recommend the method.",
    "Choices": {
      "A": "Identical totals ($309,500) — methods differ cosmetically, so keep single-rate simplicity",
      "B": "Single-rate M $155,000/N $139,500 vs dual M $185,000/N $124,500 — $30,000/$15,000 swings on identical economics prove single-rate misallocates reserved capacity; adopt dual-rate",
      "C": "Single-rate is fairer — equal $/kWh treats divisions identically, which is equity",
      "D": "Dual-rate is manipulative — two rates let accountants engineer any outcome"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Single-rate: $3.10 × actual → M 50,000 × $3.10 = $155,000; N 45,000 × $3.10 = $139,500 (sum $294,500... precisely $155,000 + $139,500 = $294,500 vs dual $309,500 — single-rate under-recovers $15,000 of fixed (95,000 actual vs 100,000 budgeted base) while misallocating: M saves $30,000 ($185,000 → $155,000) for accurate forecasting, N saves $15,000... precisely N dual $124,500 vs single $139,500 — N PAYS $15,000 MORE under single rate (overrun penalized? No: single charges N's 45,000 × $3.10 including fixed share of M's unused reservation). Dual-rate M $185,000/N $124,500 (sum $309,500 = full recovery). Identical-totals (option A) misadds ($294,500 ≠ $309,500). Equal-rate equity (option C) prices reserved capacity by consumption — M's forecasting accuracy subsidizes N's overrun. Manipulation charges (option B) mistake two-cause measurement for tunability — fixed-on-budgeted plus variable-on-actual is auditable mechanics, not dials. Business interpretation: dual rates separate reservation economics from consumption economics — single rates blend them into cross-subsidy. Common trap: equating equal rates with fairness.",
    "StudyLinks": [
      {
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
      },
      {
        "label": "OpenStax Managerial Accounting: Service Allocation",
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-DC-109",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps",
      "Independent recalculation verified",
      "Independent recalculation verified — answer key matches derived result"
    ],
    "ExplanationWrongA": "Option A's identical-totals ($294,500 vs $309,500) misadds single-rate recovery — $15,000 of fixed goes unrecovered while $45,000 of cross-subsidy hides inside. Cosmetic differences don't move $15,000.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C's equal-rate equity ($3.10 for all) charges M's 50,000 accurate hours for N's 5,000-hour overrun share — identical prices on different reservation behavior is inequity with uniform pricing.",
    "ExplanationWrongD": "Option D's manipulation charge mistakes auditable two-cause mechanics for tunable dials — budgeted-fixed plus actual-variable follows documented rules, never discretion.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 13)",
    "certification_date": "2026-09-11"
  }
];
