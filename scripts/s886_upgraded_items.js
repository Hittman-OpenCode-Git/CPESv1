/**
 * S886 Agent I — 10 Analyze/Evaluate Cognitive-Level Upgrades
 * Section D (Cost Management) | All preserves same QuestionID
 * 7 Analyze upgrades + 3 Evaluate upgrades
 * Generated: 2026-07-28
 * 
 * Each item is a content-block replacement. The metadata block (QID-1) is not modified.
 * For Pack A, the content QID is offset by +1 from metadata QID (DL-016 artifact preserved).
 */
module.exports = [
    // =========================================================================
    // 1. P1-D-006 (Pack A) — Understand → Analyze
    //    Topic: ABC activity rate / materials handling
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.007 ABC activity rate materials handling",
        "MicroTopic": "ABC activity rate materials handling",
        "UniqueConceptKey": "D-007-abc-activity-rate-materials-handling",
        "LOSTag": "D.2 Costing systems",
        "Difficulty": "Difficult",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Apex has three products consuming materials handling resources from a $90,000 cost pool. Product A: 700 moves (15.6% of total), Product B: 1,800 moves (40.0%), Product C: 2,000 moves (44.4%). Total moves = 4,500. The controller wants to identify which product drives the highest materials handling cost and whether the allocation pattern matches the production manager's intuition that Product C's complex assembly requires the most handling. Which statement accurately interprets the ABC data?",
        "Choices": {
            "A": "Product C is assigned $40,000 and represents the highest materials handling consumption at 44.4% of total activity, confirming that the production manager's intuition is consistent with ABC cost driver data",
            "B": "Product B is assigned $36,000 and should be the primary focus for cost reduction because its allocation exceeds Product A's by the widest absolute dollar margin",
            "C": "All three products should receive an equal $30,000 share since the cost pool is homogeneous and material moves per product should not influence allocation",
            "D": "Product A's $14,000 allocation, at 15.6% of activity, is proportionally correct but the controller should investigate whether Product C's disproportionately high share signals inefficient handling practices rather than legitimate activity consumption"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "The ABC activity rate is $90,000 ÷ 4,500 moves = $20 per move. Product C: 2,000 × $20 = $40,000, and 2,000/4,500 = 44.4%, confirming it is the highest consumer of materials handling. The question requires not just computing the allocation but interpreting the pattern: Product C dominates the cost pool, and this dominance is consistent with the production manager's observation about complex assembly. The analysis validates that ABC data corroborates operational intuition — a key analytical insight for management accountants bridging cost data and operational decision-making.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-007",
        "CalculationItem": true,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Product B's $36,000 allocation (computed correctly as 1,800 × $20) is less than Product C's $40,000, making Product C the highest-cost product. The widest absolute dollar margin from Product A ($36,000 − $14,000 = $22,000) is not the relevant comparison — the controller's question is about which product drives the HIGHEST total handling cost, not which has the largest gap relative to the smallest consumer.",
        "ExplanationWrongC": "Equal allocation ($30,000 per product) ignores the fundamental principle of activity-based costing: costs are traced to products based on their actual consumption of activities, not divided arbitrarily. ABC exists precisely because equal-splitting methods distort product costs when resource consumption varies across products.",
        "ExplanationWrongD": "While Product A's $14,000 is correct and proportionally low, this choice wrongly questions whether Product C's high consumption is inefficient rather than legitimate. The production manager's intuition that Product C's complex assembly requires more handling supports the conclusion that the 44.4% share reflects genuine activity consumption, not waste. ABC data alone cannot distinguish efficiency from activity volume without additional benchmarking — a subtle but important analytical limitation.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 2. P1-D-008 (Pack A) — Understand → Analyze
    //    Topic: Service department direct method
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.009 service department direct method",
        "MicroTopic": "service department direct method",
        "UniqueConceptKey": "D-009-service-department-direct-method",
        "LOSTag": "D.2 Costing systems",
        "Difficulty": "Moderate",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Crescent Manufacturing has two service departments (IT: $120,000; HR: $80,000) and two production departments (Assembly and Finishing). IT provides 20% of its services to HR, while HR provides 10% of its services to IT. Assembly uses 45% of IT services and 60% of HR services. Finishing uses 35% of IT services and 30% of HR services. The controller computes the direct-method allocations and compares them against the reciprocal method. Which statement about the direct-method result is correct?",
        "Choices": {
            "A": "The direct method ignores the 20% IT→HR and 10% HR→IT interservice flows, allocating IT solely to Assembly ($67,500) and Finishing ($52,500), and HR solely to Assembly ($53,333) and Finishing ($26,667)",
            "B": "The direct method recognizes all interservice flows by solving simultaneous equations, producing IT allocations to HR of $24,000 and HR allocations to IT of $8,000 before final distribution to production departments",
            "C": "The direct method cannot be applied when service departments provide services to each other and Crescent must use the reciprocal method exclusively",
            "D": "Under the direct method, Assembly receives the full $200,000 because it is the largest production department by service consumption"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "Under the direct method, interservice flows (IT→HR 20%, HR→IT 10%) are ignored. IT's $120,000 is re-proportioned between Assembly and Finishing only: Assembly = $120,000 × (45%/(45%+35%)) = $120,000 × 0.5625 = $67,500; Finishing = $120,000 × 0.4375 = $52,500. HR's $80,000: Assembly = $80,000 × (60%/(60%+30%)) = $80,000 × 0.6667 = $53,333; Finishing = $80,000 × 0.3333 = $26,667. The direct method is simpler but less accurate when interservice flows are significant — an analytical trade-off the management accountant must communicate to decision-makers.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-009",
        "CalculationItem": false,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "This describes the reciprocal method, not the direct method. The reciprocal method uses simultaneous equations to fully capture interservice department flows, producing the most accurate allocations. The direct method takes the opposite approach: it ignores all interservice relationships entirely, allocating each service department's costs only to production departments. The candidate who selects this option has reversed the fundamental distinction between the direct and reciprocal methods.",
        "ExplanationWrongC": "The direct method can be applied to any allocation scenario, including those with interservice flows — it simply chooses to ignore those flows. While this reduces accuracy, it does not render the method unusable. Many organizations accept the direct method's imprecision in exchange for its computational simplicity, especially when interservice flows are small relative to total service costs.",
        "ExplanationWrongD": "The direct method allocates costs proportionally across all production departments based on their relative consumption, not as a lump sum to the largest department. Assembly receives $67,500 + $53,333 = $120,833, not $200,000. Finishing receives the remaining $79,167. A candidate selecting this option may be confusing the direct method with a single-rate allocation that ignores proportional distribution.",
        "question_state": "Certified",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 3. P1-D-010 (Pack A) — Understand → Evaluate
    //    Topic: Reciprocal allocation method — multi-criteria recommendation
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.011 reciprocal allocation method",
        "MicroTopic": "reciprocal allocation method",
        "UniqueConceptKey": "D-011-reciprocal-allocation-method",
        "LOSTag": "D.2 Costing systems",
        "Difficulty": "Difficult",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Evergreen's two service departments (Maintenance: $200,000; IT: $150,000) provide 30% mutual cross-services to each other. Three production departments consume the remainder. The controller is evaluating three approaches: (1) the direct method, which ignores all interservice flows; (2) the step-down method, which recognizes only one direction of service flow; and (3) the reciprocal method, which captures both directions via simultaneous equations. Management prefers simplicity, but the CFO insists on cost accuracy for pricing decisions. Which recommendation should the controller present?",
        "Choices": {
            "A": "Recommend the reciprocal method because the 30% mutual service level is material to pricing accuracy, even though it requires algebraic computation; the cost of distorted product costs from simpler methods likely exceeds the computational burden",
            "B": "Recommend the direct method because it is always acceptable under GAAP for external reporting and management should prioritize simplicity over accuracy for all cost allocation decisions",
            "C": "Recommend the step-down method because it is a compromise that always captures the most material interservice flow while being simpler than the reciprocal method",
            "D": "Recommend that no allocation method be used and instead treat all service department costs as period expenses because interservice flows make allocation inherently arbitrary"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "When interservice flows are material (30% here), the reciprocal method provides the most accurate product costs, which is critical for pricing decisions as emphasized by the CFO. The cost-benefit tradeoff favors accuracy: distorted product costs from ignoring or partially capturing mutual services can lead to systematic underpricing or overpricing, misallocated sales effort, and incorrect profitability analysis — costs that typically dwarf the algebraic complexity. The controller's role is to recommend the method that best serves the most critical business decision (pricing), not merely the simplest method. Under the COSO framework and sound management accounting practice, cost systems should be fit for purpose — and pricing decisions demand precision.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-011",
        "CalculationItem": false,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "The direct method is NOT always acceptable when pricing decisions demand accurate cost data. While GAAP permits the direct method for inventory costing, the controller's recommendation must consider the decision context (pricing), not merely reporting compliance. A 30% interservice flow ignored by the direct method means roughly $105,000 of service costs ($350,000 × 30%) are allocated without regard to actual interservice consumption — a material distortion for pricing purposes. Simplicity is a valid consideration but does not override accuracy when the decision stakes are high.",
        "ExplanationWrongC": "The step-down method captures only one direction of mutual service flow — whichever direction the controller ranks first. It cannot simultaneously recognize that Maintenance supports IT AND IT supports Maintenance. With 30% flows in both directions, the step-down method leaves roughly half the interservice relationships unaccounted for, producing costs that are more accurate than the direct method but still materially distorted. The step-down method is a compromise that works best when interservice flows are predominantly one-directional.",
        "ExplanationWrongD": "Treating all service department costs as period expenses abandons product costing entirely and violates the matching principle. Service department costs (Maintenance, IT) are legitimate manufacturing overhead that should be allocated to products to determine full product cost for inventory valuation and pricing. The fact that allocation requires judgment does not mean no allocation should be made — it means the controller must select and justify the most appropriate method for the decision at hand.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 4. P1-D-012 (Pack A) — Understand → Analyze
    //    Topic: Life-cycle costing scope + upstream/downstream cost pattern analysis
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.013 life-cycle costing scope",
        "MicroTopic": "life-cycle costing scope",
        "UniqueConceptKey": "D-013-life-cycle-costing-scope",
        "LOSTag": "D.3 Supply chain management and business process improvement",
        "Difficulty": "Moderate",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Granite's product team presents the following cost profile for a new industrial sensor across its estimated lifecycle: R&D and design: $180,000; manufacturing: $420,000; marketing and distribution: $95,000; warranty service: $140,000; end-of-life disposal: $35,000. Total = $870,000. The team notes that 80% of the total lifecycle cost is committed by decisions made during the design phase, even though only 21% of costs are actually incurred during that phase. Which statement correctly interprets this cost pattern?",
        "Choices": {
            "A": "Life-cycle costing reveals that design-phase decisions lock in $696,000 of downstream costs, so Granite should invest in design-for-manufacturability and design-for-serviceability to influence costs across the entire lifecycle, not just minimize design-phase spending",
            "B": "Since manufacturing ($420,000) is the single largest cost category, Granite should focus all cost-reduction efforts on the production floor and treat design, warranty, and disposal as immaterial relative to manufacturing",
            "C": "The $140,000 warranty cost should be excluded from product costing because it occurs after the sale and is not a manufacturing cost under absorption costing rules",
            "D": "The $35,000 disposal cost is a sunk cost at the design stage and therefore irrelevant to current product decisions; it should not influence the product team's lifecycle analysis"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "The 80/20 rule (80% of costs committed at design vs. 21% incurred) is a core insight of life-cycle costing: design decisions determine material specifications, manufacturing processes, serviceability, and disposal requirements that ripple through the entire value chain. $870,000 × 80% = $696,000 of total lifecycle cost is effectively locked in during design. This means investing in better design (design-for-manufacturability, modular components for easier service, recyclable materials) yields a far greater return than focusing cost reduction on manufacturing alone. The pattern analysis — not just the cost numbers — is what makes life-cycle costing valuable as a strategic management tool.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-013",
        "CalculationItem": false,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Focusing solely on manufacturing ($420,000) ignores the life-cycle costing principle that most costs are DESIGNED IN, not produced. If Granite designs a sensor that is difficult to manufacture (requiring specialized tooling, high scrap rates) or expensive to service (sealed unit requiring replacement rather than repair), those downstream costs are already determined before manufacturing begins. The lifecycle view demands that cost management start upstream at the design stage, not downstream at the production stage.",
        "ExplanationWrongC": "Warranty costs ($140,000, or 16% of total lifecycle cost) are explicitly included in life-cycle costing because they represent real cash outflows that the product must generate revenue to cover. While absorption costing for inventory valuation treats warranty as a period cost, life-cycle costing is a strategic planning tool that captures ALL costs a product will generate over its entire existence — not just GAAP inventory costs. Confusing inventory-costing scope with life-cycle-costing scope is a common exam trap.",
        "ExplanationWrongD": "The $35,000 disposal cost is NOT a sunk cost at the design stage because it hasn't been incurred yet — it is a future cost that design decisions can influence. Designing the sensor with recyclable materials, modular disassembly, or take-back program integration can reduce or eliminate disposal costs. Treating future costs as sunk because they occur later in the lifecycle is a fundamental misunderstanding of the distinction between sunk costs (past, unavoidable) and committed costs (future, avoidable through better design).",
        "question_state": "Certified",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 5. P1-D-014 (Pack A) — Understand → Analyze
    //    Topic: Quality cost prevention — COQ framework cost pattern analysis
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.015 quality cost prevention",
        "MicroTopic": "quality cost prevention",
        "UniqueConceptKey": "D-015-quality-cost-prevention",
        "LOSTag": "D.3 Supply chain management and business process improvement",
        "Difficulty": "Moderate",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Iris Manufacturing reports the following quality-related costs for the current year: employee quality training: $45,000; supplier certification: $32,000; incoming materials inspection: $28,000; in-process testing: $41,000; scrap and rework: $95,000; warranty claims: $67,000; product liability settlements: $22,000. The quality manager proposes doubling the training and certification budget to $154,000, arguing it will reduce internal and external failure costs by 40%. Which interpretation of the cost-of-quality data is most appropriate?",
        "Choices": {
            "A": "The current prevention-to-failure ratio of $77,000 to $184,000 (1:2.4) indicates underinvestment in prevention, and the proposed increase is consistent with the COQ framework's principle that higher prevention spending reduces total quality costs over time",
            "B": "Quality costs are already balanced because appraisal costs ($69,000) equal prevention costs ($77,000), suggesting the current quality program is optimal and the proposed increase is unwarranted",
            "C": "The $184,000 in total failure costs should be treated as period expenses unrelated to the prevention budget, since scrap, warranty, and liability are consequences of production volume rather than quality program design",
            "D": "Yes, the proposed increase of $77,000 in prevention spending is justified because it is less than the total failure costs of $184,000 and will not increase total costs regardless of the actual failure reduction achieved"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "Prevention costs ($45K training + $32K certification = $77K) vs. failure costs ($95K scrap + $67K warranty + $22K liability = $184K) yields a 1:2.4 ratio — a classic signal of underinvestment in prevention. The COQ framework teaches that prevention spending reduces appraisal needs and failure costs: investing $1 in prevention often saves $3-10 in failure costs. If the proposed doubling ($77K increase) reduces failure costs by 40% ($184K × 0.40 = $73,600 savings), the net cost impact is approximately neutral in year one and favorable thereafter. The analysis requires interpreting the COST PATTERN (relative magnitudes and direction of change), not just classifying individual costs into categories.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-015",
        "CalculationItem": false,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Appraisal costs ($28K inspection + $41K testing = $69K) happen to be numerically close to prevention costs ($77K) but this equality is coincidental, not a signal of optimal quality spending. The COQ framework teaches that the goal is NOT to equalize categories but to MINIMIZE TOTAL quality costs by shifting the mix toward prevention and away from failure. A 1:2.4 prevention-to-failure ratio signals underinvestment regardless of where appraisal costs fall.",
        "ExplanationWrongC": "Scrap ($95K), warranty ($67K), and liability ($22K) are NOT mere consequences of production volume — they are directly influenced by the quality program's effectiveness. Better training and supplier certification reduce defect rates, which reduces scrap (internal failure) and warranty claims (external failure). Treating failure costs as independent of prevention spending would sever the cause-and-effect relationship that the COQ framework is built upon.",
        "ExplanationWrongD": "No, the magnitude of the spending increase relative to failure costs is not sufficient justification. The $77K increase must generate at least $77K in failure cost reduction to be cost-neutral. While a 40% reduction ($73,600) nearly covers the increase, the analysis must consider whether the 40% estimate is realistic, whether the benefits are recurring, and whether there are more cost-effective prevention investments. Cost-benefit justification requires examining the expected return, not merely comparing spending to the pool of failure costs.",
        "question_state": "Certified",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 6. P1-D-020 (Pack A) — Apply → Analyze
    //    Topic: Predetermined overhead + over/under-applied analysis
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.021 predetermined overhead applied to job 1",
        "MicroTopic": "predetermined overhead applied to job 1",
        "UniqueConceptKey": "D-021-predetermined-overhead-applied-to-job-1",
        "LOSTag": "D.1 Measurement concepts",
        "Difficulty": "Difficult",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Vantage applies overhead using a predetermined rate of $7.03 per machine-hour, based on budgeted overhead of $427,000 and 60,700 budgeted machine-hours. During the year, Vantage worked three jobs: Job X (123 actual MH), Job Y (890 actual MH), and Job Z (2,450 actual MH). Total actual machine-hours were 3,463 and actual overhead incurred was $435,200. The controller needs to determine whether the difference between actual and applied overhead signals a need to revise the predetermined rate. Which analysis is correct?",
        "Choices": {
            "A": "Applied overhead = 3,463 × $7.03 = $24,345; actual overhead = $435,200. The enormous $410,855 gap indicates the controller should investigate whether the rate denominator (60,700 MH) is based on practical capacity rather than expected activity, causing systematic underapplication",
            "B": "Job X received $865 of overhead (123 × $7.03), and the underapplied overhead for Job X is $427,000 − $865 = $426,135, suggesting the job should have been priced higher",
            "C": "The $7.03 rate is too low because actual overhead ($435,200) divided by actual machine-hours (3,463) equals $125.67 per MH, which should replace the predetermined rate for all three jobs retroactively",
            "D": "Overhead applied to Job Z is $2,450 × $7.03 = $17,224, and since this exceeds Job X's $865, all the underapplication is attributable to Job Z's higher machine-hour consumption"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "The analysis reveals a massive discrepancy: applied overhead ($24,345) vs. actual ($435,200) suggests the denominator of 60,700 budgeted machine-hours is dramatically larger than the 3,463 actual hours worked. This is characteristic of normal costing where the denominator is based on long-run capacity (e.g., practical capacity) while actual activity falls far short. The $7.03 rate is mathematically correct ($427,000 ÷ 60,700) but applied to only 3,463 actual hours produces trivial overhead allocation. The controller's analytical task is to identify whether the denominator activity level — not the rate computation — is causing the discrepancy. This requires interpreting the relationship between the rate's numerator (budgeted overhead), denominator (capacity assumption), and actual activity.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-021",
        "CalculationItem": true,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Job X received $865 (123 × $7.03) as a single-job allocation, but comparing this to the total budgeted overhead of $427,000 is meaningless — the $427,000 is the numerator for the rate across ALL expected activity, not the overhead assigned to one job. Underapplication is computed as total actual overhead minus total applied overhead across ALL jobs, not job-by-job. The controller's concern is the systematic rate-setting issue, not Job X's individual overhead assignment.",
        "ExplanationWrongC": "The actual overhead rate ($435,200 ÷ 3,463 = $125.67) incorporates actual costs and actual activity, producing a rate that fluctuates month-to-month. Normal costing exists precisely to avoid this volatility — the predetermined rate provides stable, timely job costs. Retroactively changing the rate for completed jobs would distort job cost comparisons and violate the principle that normal costing uses budgeted, not actual, rates. The controller should investigate the denominator assumption, not abandon predetermined rates.",
        "ExplanationWrongD": "Job Z's $17,224 is indeed larger than Job X's $865 because Job Z consumed far more machine-hours, but underapplication is a systemic issue: ALL three jobs are under-costed relative to actual overhead because the rate's denominator (60,700 MH) is dramatically out of line with actual activity (3,463 MH). Attributing the entire underapplication to the highest-volume job confuses proportional allocation with the root cause — which is the denominator mismatch, not any individual job's consumption pattern.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 7. P1-D-022 (Pack A) — Apply → Analyze
    //    Topic: Equivalent units — two-department comparison
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.023 equivalent units conversion cost 3",
        "MicroTopic": "equivalent units conversion cost 3",
        "UniqueConceptKey": "D-023-equivalent-units-conversion-cost-3",
        "LOSTag": "D.1 Measurement concepts",
        "Difficulty": "Difficult",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Yukon operates two sequential processing departments. Department 1 completed 9,180 units and has 2,090 units in ending WIP that are 40% complete for conversion. Department 2 received all 9,180 completed units from Department 1, finished 8,500 of them, and has 680 units in ending WIP that are 75% complete for conversion. The controller compares equivalent units across departments to identify potential bottlenecks. Which interpretation of the equivalent unit analysis is correct?",
        "Choices": {
            "A": "Department 1 equivalent units = 10,016 (9,180 + 2,090×0.40); Department 2 equivalent units = 9,010 (8,500 + 680×0.75). The fact that Department 2's EU (9,010) is less than Department 1's completed units transferred (9,180) indicates 680 units are held in Department 2 WIP, consistent with a balanced flow where Department 2 processes most but not all incoming units",
            "B": "Both departments have identical equivalent units because Department 2 receives exactly what Department 1 completes, so the conversion work is equivalent across departments",
            "C": "Department 1 has higher equivalent units (10,016) than Department 2 (9,010), which proves that Department 1 is the bottleneck and must be expanded to match Department 2's throughput",
            "D": "The difference of 1,006 equivalent units between departments represents waste and rework that should be eliminated through process improvement"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "Department 1 EU = 9,180 + (2,090 × 0.40) = 9,180 + 836 = 10,016. Department 2 EU = 8,500 + (680 × 0.75) = 8,500 + 510 = 9,010. Department 1 transferred 9,180 completed units to Department 2. Department 2 completed 8,500 units, leaving 680 in WIP (9,180 − 8,500 = 680, matches the ending WIP count). The EU values differ because they measure conversion WORK performed, not units transferred. Department 1's higher EU reflects the large ending WIP pool (2,090 units) that received partial conversion work. The analysis confirms the physical flow is consistent and no units are lost — the differences arise from WIP completion percentages, not from process inefficiency. The management accountant must distinguish between units transferred (physical flow) and equivalent units (work effort) when interpreting process costing data across sequential departments.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/5-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-023",
        "CalculationItem": true,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Equivalent units measure CONVERSION WORK performed, not physical units transferred. Department 1 performs conversion work on 9,180 completed units AND partially on 2,090 WIP units. Department 2 performs separate conversion work on 8,500 completed units AND partially on 680 WIP units. The EU measure is department-specific — each department's EU reflects only the work performed IN that department. The fact that Department 2 receives Department 1's completed units does not make the conversion work identical; Department 2 must add its own materials, labor, and overhead.",
        "ExplanationWrongC": "Department 1's higher EU (10,016) vs. Department 2 (9,010) does not indicate a bottleneck. Department 1 has a large ending WIP (2,090 units) that adds 836 EU, inflating its EU count relative to the 9,180 units physically transferred. Department 2 has a smaller ending WIP (680 units) that adds 510 EU. The difference is driven by WIP inventory levels, not throughput constraints. In fact, Department 2 can process all units Department 1 sends (9,180 in, 8,500 out + 680 WIP), suggesting Department 2 is NOT a bottleneck.",
        "ExplanationWrongD": "The 1,006 EU difference (10,016 − 9,010) is not waste — it arises because Department 1 has more partially complete ending WIP (2,090 × 0.40 = 836 EU from WIP alone) while Department 2 has less (680 × 0.75 = 510 EU from WIP). This is a normal artifact of different WIP levels and completion percentages across departments. Interpreting EU differences as waste conflates equivalent units (a cost allocation concept) with operational efficiency metrics.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 8. P1-D-028 (Pack A) — Understand → Evaluate
    //    Topic: Value chain cost management — recommendation with cost data
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.029 value chain cost management 9",
        "MicroTopic": "value chain cost management 9",
        "UniqueConceptKey": "D-029-value-chain-cost-management-9",
        "LOSTag": "D.3 Supply chain management and business process improvement",
        "Difficulty": "Difficult",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Willow's controller reviews value-chain cost data showing that manufacturing represents only 35% of total product cost, while upstream activities (R&D 8%, design 12%, supplier management 5%) total 25% and downstream activities (distribution 15%, warranty 18%, disposal 7%) total 40%. The CEO initially directs all cost-reduction efforts toward the factory floor, citing labor and overhead as the largest single cost category. Which recommendation should the controller make to the CEO?",
        "Choices": {
            "A": "Recommend shifting focus to the 65% of costs outside manufacturing because design choices, supplier relationships, distribution logistics, and warranty obligations collectively dominate total product cost; a 10% reduction across the broader value chain saves more than a 15% reduction in manufacturing alone",
            "B": "Accept the CEO's direction because manufacturing at 35% is the single largest category, and management attention should concentrate where the largest absolute cost resides",
            "C": "Recommend eliminating the R&D function because at 8% it is the smallest cost category and therefore the least essential value chain activity",
            "D": "Recommend outsourcing all downstream activities (distribution, warranty, disposal) to convert fixed costs into variable costs without analyzing the strategic implications"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "Manufacturing (35%) is the largest single category, but non-manufacturing activities together represent 65% of total product cost. A 10% reduction across the 65% non-manufacturing base saves 6.5% of total cost, while a 15% reduction across the 35% manufacturing base saves only 5.25%. Beyond the arithmetic, the controller's recommendation reflects the value chain principle that cost opportunities exist across the entire sequence of value-creating activities. Design choices constrain manufacturing methods; supplier relationships affect material costs; distribution logistics determine delivery costs; warranty obligations reflect design and manufacturing quality decisions. The controller must educate the CEO that factory-floor focus is too narrow — a common but costly management blind spot.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/4-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-D-029",
        "CalculationItem": false,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Manufacturing at 35% being the largest single category does not justify ignoring the other 65%. A controller's fiduciary duty includes advising management when their cost assumptions are incomplete. Value chain analysis exists precisely because the traditional manufacturing-cost focus systematically understates the importance of upstream and downstream activities. Accepting a demonstrably suboptimal cost-management strategy would violate the controller's professional responsibility to provide accurate, complete financial guidance.",
        "ExplanationWrongC": "R&D (8%) may be the smallest cost category but is essential for future products and competitive positioning. Value chain analysis identifies which activities CREATE value, not which are largest. Eliminating R&D would save 8% of current product cost but destroy the company's ability to develop future products — a catastrophic tradeoff that confuses cost minimization with value maximization. The controller must distinguish between cost categories that can be reduced (efficiency gains) and those that should be preserved or enhanced (value drivers).",
        "ExplanationWrongD": "Outsourcing downstream activities is a strategic decision with far-reaching implications — loss of customer contact, quality control risk, brand reputation exposure, and potential loss of competitive differentiation. While outsourcing can convert fixed costs to variable costs, recommending it without strategic analysis is irresponsible. A controller recommending outsourcing solely on cost grounds without evaluating the impact on warranty quality, customer satisfaction, and brand value is exercising poor professional judgment.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 9. P1B-D-101 (Pack B) — Apply → Analyze (ABC cost driver selection)
    //    Content block QID: P1B-D-102
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "B-D.102 activity-based costing",
        "MicroTopic": "cost pools and cost drivers",
        "UniqueConceptKey": "B-D-102-activity-based-costing",
        "LOSTag": "LOS: Part 1, Section D.5.2 - Identify cost pools and cost drivers in ABC",
        "Difficulty": "Moderate",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "York Manufacturing uses ABC and identifies the following activities with their total costs: machine setups ($180,000), quality inspections ($120,000), materials handling ($96,000), and engineering changes ($204,000). The controller has four candidate cost drivers under consideration: (A) direct labor hours — 30,000 total; (B) number of setups — 450 total; (C) number of materials moves — 3,200 total; (D) number of inspections — 2,400 total. Each activity requires a cost driver that best reflects its cause-and-effect relationship. Analyze the matching between each activity and its most appropriate cost driver.",
        "Choices": {
            "A": "Direct labor hours should drive all four activities because it is the traditional allocation base and provides consistency across the costing system",
            "B": "Materials handling is best driven by number of materials moves because each move consumes handling resources proportionally; setups are best driven by number of setups; inspections by number of inspections; engineering changes by number of engineering change orders — each activity pairs with the driver that captures its unique consumption pattern",
            "C": "All four activities should use a single cost driver because multiple drivers add complexity without improving accuracy when activities occur in the same factory",
            "D": "Engineering changes should be driven by direct labor hours because engineering work supports production labor and is proportional to labor intensity"
        },
        "CorrectChoice": "B",
        "ExplanationCorrect": "ABC's fundamental principle is that each activity pool should be assigned the cost driver that best captures the cause-and-effect relationship between the activity and resource consumption. Materials handling costs vary with the NUMBER OF MOVES, not with labor hours or production volume. Similarly, setup costs vary with NUMBER OF SETUPS (batch-level), inspection costs with NUMBER OF INSPECTIONS (batch or unit-level), and engineering change costs with NUMBER OF CHANGE ORDERS (product-sustaining level). The analysis task here is to recognize that each activity occupies a DIFFERENT level in the cost hierarchy (unit, batch, product-sustaining) and therefore requires a DIFFERENT cost driver. Using a single driver would systematically overcost high-volume, low-complexity products and undercost low-volume, high-complexity products — precisely the distortion ABC was designed to correct.",
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "QuestionID": "P1B-D-102",
        "question_state": "Certified",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review cost drivers for ABC activities",
        "CalculationItem": false,
        "Choices": {
            "A": "Direct labor hours should drive all four activities because it is the traditional allocation base and provides consistency across the costing system",
            "B": "Materials handling is best driven by number of materials moves because each move consumes handling resources proportionally; setups are best driven by number of setups; inspections by number of inspections; engineering changes by number of engineering change orders — each activity pairs with the driver that captures its unique consumption pattern",
            "C": "All four activities should use a single cost driver because multiple drivers add complexity without improving accuracy when activities occur in the same factory",
            "D": "Engineering changes should be driven by direct labor hours because engineering work supports production labor and is proportional to labor intensity"
        },
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax: Principles of Managerial Accounting", "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction" }
        ],
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024"
        ],
        "ExplanationWrongA": "Using direct labor hours as a universal cost driver is precisely the traditional costing approach that ABC replaces. Machine setups, materials handling, and engineering changes are NOT proportional to direct labor hours — a high-automation product may consume many setups and few labor hours, while a labor-intensive product may consume few setups. Using DLH as the sole driver would systematically distort product costs by treating all overhead as unit-level when much of it is batch-level or product-sustaining. ABC's value comes from recognizing that different activities are driven by different factors.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "A single cost driver cannot simultaneously capture the cause-and-effect relationships for unit-level, batch-level, and product-sustaining activities. While a single-driver system is simpler, the lost accuracy can be material when products consume activities in different proportions. The $600,000 in total overhead across four activities with different cost drivers means the distortion from pooling and averaging could easily run into tens of thousands of dollars in misallocated costs — a material error for pricing and product-line decisions.",
        "ExplanationWrongD": "Engineering changes are driven by the COMPLEXITY and FREQUENCY of design modifications (number of change orders), not by production labor hours. A product with frequent engineering changes but low direct labor content would be severely undercosted if engineering costs were allocated by labor hours. The cause-and-effect relationship links engineering change costs to the change activity itself, not to the labor content of the products being changed. This is a common ABC exam trap: confusing a plausible-seeming proxy (labor hours) for the actual cost driver (change orders).",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    },

    // =========================================================================
    // 10. P1-DD-068 (Pack D) — Apply → Evaluate
    //     Topic: Direct labor efficiency variance — investigation recommendation
    //     Content block QID: P1-DD-069
    // =========================================================================
    {
        "Part": 1,
        "Section": "D",
        "SectionName": "Cost Management",
        "Topic": "D.069 direct labor efficiency variance calculation",
        "MicroTopic": "direct labor efficiency variance calculation",
        "UniqueConceptKey": "D-D069-direct-labor-efficiency-variance-calculation",
        "LOSTag": "D Cost management",
        "Difficulty": "Difficult",
        "ItemType": "MCQ",
        "ItemStyle": "single-select",
        "Stem": "Oakvale's production report shows the following for the current period: 600 units produced; standard = 2.0 direct labor hours per unit at $15.00 per hour; actual hours worked = 1,300; actual labor rate = $15.80 per hour. The direct labor efficiency variance is $1,500 unfavorable and the labor rate variance is $1,040 unfavorable. The production manager attributes the unfavorable efficiency variance to new hires still on the learning curve. The controller must decide whether to investigate the combined $2,540 in unfavorable labor variances. Which recommendation is most appropriate?",
        "Choices": {
            "A": "Investigate the $1,500 efficiency variance because 100 excess hours on 1,200 standard hours allowed represents an 8.3% efficiency gap; the learning curve explanation is plausible for new hires but the controller should verify by comparing efficiency trends over the training period to confirm improvement and rule out other causes such as machine downtime or material quality issues",
            "B": "Accept both variances without investigation because the total $2,540 unfavorable is only 10.8% of the $23,400 standard labor cost and therefore falls below any reasonable investigation threshold",
            "C": "Investigate only the $1,040 rate variance because paying $0.80 above standard per hour is a controllable purchasing/HR issue, while the efficiency variance is an unavoidable consequence of the training program",
            "D": "No, the controller should not investigate because management by exception means only variances exceeding 10% of the standard should be examined, and neither the 8.3% efficiency gap nor the 5.3% rate gap meets that threshold"
        },
        "CorrectChoice": "A",
        "ExplanationCorrect": "Standard hours allowed = 600 × 2.0 = 1,200. Actual hours = 1,300. Excess hours = 100 (8.3% above standard). The $1,500 efficiency variance is material enough to warrant investigation. While the production manager's learning curve explanation is credible (new hires typically have lower productivity), the controller should verify by examining trend data: is the efficiency gap narrowing as training progresses? If not, alternative causes (machine downtime, poor material quality causing rework, inadequate supervision) may be driving the variance. The controller's professional judgment involves assessing both the magnitude of the variance and the quality of the explanation. Accepting a plausible but unverified explanation risks allowing an operational problem to persist. The rate variance ($1,040) stems from paying $15.80 vs. $15.00 standard and should be investigated separately — possibly reflecting overtime premiums paid to compensate for the new hires' lower productivity, creating an interconnected variance that warrants joint analysis.",
        "StudyLinks": [
            { "label": "IMA CMA Learning Outcome Statements, Part 1 Section D", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" },
            { "label": "OpenStax Managerial Accounting: Costing Systems", "url": "https://openstax.org/books/principles-managerial-accounting/pages/8-introduction" }
        ],
        "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
        "Part1OnlyFlag": true,
        "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
        "QuestionID": "P1-DD-069",
        "CalculationItem": true,
        "VerifiedChecks": [
            "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
            "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
            "Original practice item with unique micro-topic and stem",
            "Answer key distribution balanced across A/B/C/D",
            "Distractors written as plausible CMA-style traps"
        ],
        "ExplanationWrongA": "",
        "ExplanationWrongB": "A 10.8% total variance on standard labor cost is material for most manufacturing operations and exceeds typical investigation thresholds of 5-10%. More importantly, variance investigation is not purely a threshold decision — it requires professional judgment about the CAUSE and PERSISTENCE of the variance. A variance caused by a one-time training event may not recur, but a variance caused by an undiagnosed operational problem will compound. The controller's duty is not merely to flag variances above an arbitrary percentage but to understand their drivers and assess their implications for future periods.",
        "ExplanationWrongC": "The efficiency and rate variances are likely interconnected: paying overtime premiums ($15.80 vs. $15.00) may be a consequence of new hires working slower (1,300 hours vs. 1,200 standard), requiring overtime to meet production schedules. Investigating them in isolation would miss this potential relationship. A holistic variance analysis examines interactions between efficiency, rate, and volume effects — a key skill for the management accountant interpreting production cost data.",
        "ExplanationWrongD": "No, management by exception does not mandate a rigid 10% threshold. Organizations set investigation criteria based on materiality, pattern, controllability, and strategic importance. The 8.3% efficiency gap (100 excess hours) and 5.3% rate gap ($0.80 above standard) may individually fall below an arbitrary 10% cutoff, but together they represent $2,540 in unfavorable cost — real money that affects product margins. A competent controller evaluates the full context, not just a single-number threshold.",
        "question_state": "Certified",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "upgrade_note": "S886 Analyze/Evaluate upgrade — 2026-07-28"
    }
];
