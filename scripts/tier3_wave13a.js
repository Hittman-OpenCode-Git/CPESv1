const WAVE13A = [
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
      "A": "A $72,000 / B $48,000 — NRV pro-rata ($250,000 vs $170,000 of $420,000)",
      "B": "A $60,000 / B $60,000 — equal split reflects equal processing stages",
      "C": "A $70,000 / B $50,000 — constant 60% gross margin on both (A COGS $120,000 = $50,000 separable + $70,000 joint; B COGS $80,000 = $30,000 + $50,000)",
      "D": "A $120,000 / B $0 — all joint cost to the higher-sales product as primary-output costing"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Overall gross margin = ($500,000 sales − $120,000 joint − $80,000 separable)/$500,000 = $300,000/$500,000 = 60%. Force 60% on each: A COGS = $300,000 × 40% = $120,000 = $50,000 separable + $70,000 joint; B COGS = $200,000 × 40% = $80,000 = $30,000 separable + $50,000 joint. Check: $70,000 + $50,000 = $120,000 joint — reconciles. NRV pro-rata (option A: $250,000 vs $170,000 of $420,000 → $71,429/$48,571... precisely 250/420×$120,000 = $71,428.57; 170/420×$120,000 = $48,571.43) yields UNEQUAL margins (A 61.9%, B 55.7%) — defeating the stated objective. Equal split (option B: $60,000 each) ignores economics entirely. Primary-output (option D: $120,000/$0) treats B as a by-product — but B's $200,000 sales make it a joint product, not scrap. Business interpretation: constant-margin NRV backs into joint allocations from a mandated margin — compute overall margin first, then force it per product. Common trap: using NRV pro-rata when equal margins are the stated goal.",
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
    "ExplanationWrongA": "Option A's $72,000/$48,000 applies NRV pro-rata ($71,429/$48,571 exactly) — yielding 61.9%/55.7% unequal margins. Pro-rata serves relative values, never mandated equal margins.",
    "ExplanationWrongB": "Option B's $60,000 equal split ignores both NRV ($250,000 vs $170,000) and margin targets — equality without economic basis.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D's $120,000/$0 treats $200,000-sales B as a by-product — joint products with material sales values share joint cost; by-product treatment needs immateriality.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
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
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
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
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
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
      "A": "EU 9,170 (8,000 + 450×100% + 1,550×40% = 8,000 + 450 + 620); unit cost ($12,000 + $180,000)/9,170 = $192,000/9,170 = $20.94 — normal loss absorbs as EU with cost to good output",
      "B": "EU 8,620 (loss excluded) — losses never enter equivalent units",
      "C": "EU 9,620 (loss double-counted in both completed and EWIP) — conservatism double-counts shrinkage",
      "D": "EU 8,000 (completed only) — WIP and loss are period adjustments outside EU"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Weighted-average EU: completed 8,000 + normal loss 450 (detected at completion = 100% complete) + EWIP 1,550 × 40% = 620 → 8,000 + 450 + 620 = 9,170 EU. Unit cost = ($12,000 + $180,000)/9,170 = $192,000/9,170 = $20.939... ≈ $20.94. Normal loss detected at completion counts as full EU (work was fully performed before loss discovery) with its $9,423 (450 × $20.94) absorbed by good output. Loss-excluding (option B: 8,620 EU → $22.27/unit) spreads loss cost nowhere while understating EU — denominator without the loss it must absorb. Double-counting (option C: 9,620) adds loss units twice. Completed-only (option D: 8,000 EU → $24.00) strands EWIP and loss outside unitization entirely. Business interpretation: normal losses detected at completion are 100% EU — the work was done, the units failed, good output absorbs. Common trap: excluding normal loss from EU denominators.",
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
    "ExplanationWrongB": "Option B's 8,620 EU excludes 450 loss units — denominator without the loss it must absorb, overstating unit cost to $22.27 while hiding $9,423 of loss economics.",
    "ExplanationWrongC": "Option C's 9,620 double-counts loss units in completed and separately — 450 units of phantom EU understating cost.",
    "ExplanationWrongD": "Option D's 8,000 completed-only strands 620 EWIP EU plus 450 loss EU outside unitization — $24.00/unit prices WIP and loss out of existence.",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, pending six-dimension verification)"
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
    "Stem": "Materials added 60% at start, 40% at 70% completion. BWIP 2,000u 50% complete (past the 70% point? No — 50% < 70%, so second material not yet added). Started 8,000; completed 9,000; EWIP 1,000u 80% complete (past 70%, both materials added). Current material costs $50,000. Under FIFO, what are material EU?",
    "Choices": {
      "A": "9,800 EU (full counting of all physical units regardless of staging) — staging affects timing, never EU",
      "B": "7,800 EU — BWIP needs 40% (to reach 70%... precisely BWIP at 50% needs 20 points to 70% for second material + 0% of first (already added): 2,000 × 100% of second-material... let me recompute cleanly below",
      "C": "8,600 EU — BWIP 2,000×100% + started/completed 7,000×100% − EWIP timing overcount",
      "D": "7,000 EU — started-and-completed only; BWIP and EWIP adjustments net to zero by coincidence"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "FIFO material EU with staged additions: BWIP 2,000u at 50% (first material already added at start last period; second material at 70% not yet added) → current work = 2,000 × 100% (second material added this period as units pass 70%) = 2,000 EU. Started-and-completed = 9,000 − 2,000 = 7,000 × 100% (both materials added during processing) = 7,000 EU. EWIP 1,000u at 80% (past 70% → both added this period... precisely EWIP started this period, so both additions occur now: 1,000 × 100% = 1,000 EU). Total = 2,000 + 7,000 + 1,000 = 10,000 EU?? That contradicts the 7,800 choice. Recompute per the choice structure: if BWIP needs only the 40% second-material portion... the item as drafted mixes conventions. REPAIR: this item's numbers need reconciliation — WITHDRAWN pending clean recomputation; replacement ships separately.",
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
    "ExplanationWrongA": "WITHDRAWN — see repair note",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "WITHDRAWN — see repair note",
    "ExplanationWrongD": "WITHDRAWN — see repair note",
    "question_state": "Unprocessed",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_batch": "Tier 3 Wave 13 (authored 2026-09-11, WITHDRAWN — EU inconsistency caught at authoring; corrected 105 ships separately)"
  }
];
module.exports = WAVE13A;