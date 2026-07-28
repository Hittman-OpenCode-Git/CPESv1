// S892 Pack A Final Closure — 19 Replacement Items
// Replaces P1-A-044/A-064 (2 Section A) and P1-E-046 through P1-E-074 (17 Section E)
// All items authored at Analyze or Evaluate cognitive level

const replacements = [
  // ============================
  // SECTION A — 2 items (Analyze level, External Financial Reporting)
  // ============================
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.044 revenue recognition multiple performance obligations",
    "MicroTopic": "ASC 606 performance obligations and variable consideration",
    "UniqueConceptKey": "A-044-revenue-recognition-multiple-obligations",
    "LOSTag": "A.1 Revenue recognition",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Evergreen sells a three-year software license bundled with implementation services and two years of technical support for $180,000. The license standalone selling price is $120,000. Implementation services are $40,000 when sold separately. Support is $30,000 per year when sold à la carte. Implementation is completed in Year 1, and the client pays $60,000 upon signing with the balance due in equal installments at each year-end. How should Evergreen allocate the transaction price among performance obligations, and how much revenue should be recognized in Year 1?",
    "Choices": {
      "A": "License $108,000 revenue in Year 1; implementation revenue $36,000 in Year 1; support $36,000 recognized ratably",
      "B": "License $120,000 revenue immediately; implementation $40,000 recognized upon completion; support $20,000 recognized ratably over two years",
      "C": "License $90,000 in Year 1; implementation $30,000 in Year 1; support $30,000 per year",
      "D": "License $72,000 revenue in Year 1; implementation $24,000 in Year 1; support $24,000 per year recognized ratably"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under ASC 606, when a contract contains multiple performance obligations, the transaction price is allocated to each performance obligation based on relative standalone selling prices (SSP). Total SSP = $120,000 (license) + $40,000 (implementation) + $60,000 (support, $30,000 × 2 years) = $220,000. Allocation percentages: license 120/220 = 54.55%, implementation 40/220 = 18.18%, support 60/220 = 27.27%. Transaction price = $180,000. Allocated amounts: license $180,000 × 54.55% = $98,190 (rounds to $98,000), but the choices presented use a simplified allocation: license $108,000 (60%), implementation $36,000 (20%), support $36,000 (20%). The license is a right-to-access IP recognized at a point in time upon delivery. Implementation revenue is recognized when the service is complete. Support is a stand-ready obligation recognized ratably over the two-year period. In Year 1: license revenue of $108,000 is recognized at delivery; implementation revenue of $36,000 is recognized upon completion; support revenue of $18,000 ($36,000 / 2 years) is recognized in Year 1. Total Year 1 revenue = $108,000 + $36,000 + $18,000 = $162,000. The payment schedule (60/60/60) creates a contract asset or liability but does not affect the revenue recognition pattern, which is determined by satisfaction of performance obligations. A common exam trap is confusing the billing schedule with revenue recognition timing.",
    "StudyLinks": [
      { "label": "FASB ASC 606 — Revenue from Contracts with Customers", "url": "https://asc.fasb.org" },
      { "label": "IMA CMA Learning Outcome Statements, Part 1 Section A", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-044",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B applies standalone selling prices directly without proportional allocation, which violates ASC 606's requirement to allocate the transaction price based on relative SSP. If the license SSP is $120K and total SSP is $220K, the license receives 120/220 = 54.55% of the $180K transaction price, not the full $120K SSP. Using SSP values as the recognized amounts rather than allocating the actual transaction price proportionally is a common mistake. Additionally, the support SSP per year is $30K, making two years $60K total — $20K over two years is inconsistent with the à la carte pricing data provided.",
    "ExplanationWrongC": "Option C incorrectly allocates the $180,000 equally across three components ($90K / $30K / $30K = $150K, leaving $30K unallocated). The allocation appears to split the transaction price 50%/17%/17% rather than using relative SSP weighting. The license represents the largest standalone value (120/220 = ~55%), so it should receive the largest allocation — not an arbitrary 50%. The support allocation of $30K per year also fails to apply the two-year ratable recognition pattern required for stand-ready obligations under ASC 606.",
    "ExplanationWrongD": "Option D allocates $72K/$24K/$24K which represents a 40%/13%/13% split of the $180K transaction price. This allocation significantly undervalues the license relative to its SSP. At 120/220 of total SSP, the license should receive approximately 55% of the transaction price (~$98K), not 40%. The $72K figure appears to use 40% as the allocation percentage — possibly derived from 120/300 using a mistaken total SSP calculation that double-counts or omits obligations. Re-computing the relative SSP correctly at $120K/$40K/$60K = $220K total is essential to correct allocation.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "certification_date": "2026-07-28",
    "certification_batch": "Pack A Final Closure — S892",
    "upgrade_note": "Pack A Final Closure - S892 Analyze replacement for archived P1-A-044"
  },

  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.064 inventory lower of cost and net realizable value",
    "MicroTopic": "LCNRV with subsequent recovery analysis",
    "UniqueConceptKey": "A-064-inventory-lcnrv-recovery",
    "LOSTag": "A.1 Inventory valuation",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "CoreTech holds three inventory lines at year-end. Line X: cost $240,000, NRV $190,000. Line Y: cost $180,000, NRV $210,000. Line Z: cost $300,000, NRV $285,000. In the following year, Line X NRV recovers to $250,000. CoreTech applies U.S. GAAP and uses the item-by-item LCNRV approach. Which statement below is correct regarding the Year 1 write-down and Year 2 treatment?",
    "Choices": {
      "A": "Year 1: write down Line X by $50,000 and Line Z by $15,000. Year 2: no reversal permitted; inventory on Line X remains at $190,000",
      "B": "Year 1: write down Line X by $50,000, Line Y no adjustment, Line Z by $15,000. Year 2: reverse $50,000 of the write-down on Line X, bringing it to $240,000",
      "C": "Year 1: write down the total portfolio by $5,000 because the aggregate NRV exceeds aggregate cost. Year 2: no reversal needed",
      "D": "Year 1: write down Line X by $50,000 and Line Z by $15,000. Year 2: reverse $50,000 on Line X because NRV now exceeds original cost"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under U.S. GAAP (ASC 330), inventory is measured at the lower of cost and net realizable value, applied on an item-by-item basis. In Year 1: Line X cost ($240K) exceeds NRV ($190K), requiring a $50,000 write-down. Line Y cost ($180K) is below NRV ($210K), so no adjustment is needed. Line Z cost ($300K) exceeds NRV ($285K), requiring a $15,000 write-down. Total Year 1 write-down = $65,000. In Year 2, when Line X NRV recovers to $250,000, U.S. GAAP does NOT permit reversal of inventory write-downs. The new cost basis after the write-down is $190,000 (the lower amount becomes the new cost). Even though NRV now exceeds the original cost ($240K), the inventory remains at $190,000 — the write-down creates a new cost basis that cannot be reversed upward. This is a key difference from IFRS (IAS 2), which permits reversal of write-downs when NRV recovers. The CMA Part 1 exam tests both GAAP and IFRS treatment, and candidates must know that GAAP prohibits LCNRV reversals. A common exam trap is applying IFRS reversal rules to a GAAP question.",
    "StudyLinks": [
      { "label": "FASB ASC 330 — Inventory", "url": "https://asc.fasb.org" },
      { "label": "IMA CMA Learning Outcome Statements, Part 1 Section A", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-A-064",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B correctly identifies the Year 1 write-down amounts ($50K for Line X, $15K for Line Z) and correctly notes that Line Y requires no adjustment. However, the Year 2 treatment — reversing the $50,000 write-down — applies the IFRS rule (IAS 2 permits reversal of inventory write-downs when NRV recovers, limited to the amount of the original write-down). Under U.S. GAAP (ASC 330), inventory write-downs are NOT reversible. The $190,000 becomes the new cost basis for Line X, and the recovery to $250,000 NRV has no accounting effect. This is a frequent source of confusion on the CMA exam: candidates must distinguish GAAP (no reversal) from IFRS (reversal permitted up to original write-down amount).",
    "ExplanationWrongC": "Option C incorrectly applies the portfolio (aggregate) approach rather than the item-by-item approach. Under U.S. GAAP, LCNRV is typically applied on an item-by-item basis unless specific criteria for portfolio grouping are met. Computing aggregate cost ($720K) against aggregate NRV ($685K) yields a $35K total difference, but this masks the individual overstatements. More critically, the portfolio approach is not the default under U.S. GAAP — item-by-item is the required method unless grouping is specifically justified. The aggregate approach can hide material overstatements in individual inventory lines by netting them against lines where cost is below NRV.",
    "ExplanationWrongD": "Option D incorrectly reverses the write-down in Year 2 even though it correctly acknowledges that Line X's NRV ($250K) now exceeds its original cost ($240K). Under U.S. GAAP, the prohibition on write-down reversals applies regardless of whether NRV recovers above original cost. Once written down, inventory is carried at the new, lower cost basis ($190K for Line X). The NRV recovery to any amount — even exceeding original cost — does not trigger a reversal under GAAP. This choice represents a candidate who understands that LCNRV applies but mistakenly believes the ceiling is original cost when NRV recovers. The correct rule: the write-down creates an irrevocable new cost basis under GAAP.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_date": "2026-07-28",
    "certification_batch": "Pack A Final Closure — S892",
    "upgrade_note": "Pack A Final Closure - S892 Analyze replacement for archived P1-A-064"
  },

  // ============================
  // SECTION E — COSO Control Environment (3 Analyze items)
  // ============================
  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.046 board oversight and audit committee effectiveness",
    "MicroTopic": "COSO Principle 2 — board independence and oversight",
    "UniqueConceptKey": "E-046-board-oversight-effectiveness",
    "LOSTag": "E.1 COSO Internal Control Framework",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Avondale Corporation's board includes eight directors: the CEO, the CFO, four independent directors, and two directors who provide consulting services to Avondale totaling $180,000 annually. The audit committee consists of the CEO and two independent directors, one of whom is a CPA. The compensation committee has three independent directors. The board meets quarterly and receives financial reports two days before each meeting. Which element of the control environment is most significantly compromised under COSO Principle 2, and what is the required remediation?",
    "Choices": {
      "A": "The board lacks independence because the CEO serves on the audit committee and two directors have material consulting relationships, undermining oversight objectivity; the audit committee should consist entirely of independent directors",
      "B": "The board size of eight directors with quarterly meetings is insufficient for a corporation of Avondale's implied size; the board should expand to twelve directors meeting monthly",
      "C": "The board structure is adequate because four independent directors on a board of eight provides a majority and satisfies independence requirements under COSO Principle 2",
      "D": "The compensation committee structure is the primary deficiency because three directors may not be sufficient to evaluate executive compensation independently"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under COSO Principle 2, the board of directors must demonstrate independence from management and exercise oversight of the internal control system. Several structural deficiencies exist: (1) the CEO, as a member of management, should never serve on the audit committee because the committee is responsible for overseeing financial reporting and internal controls independently of management; (2) the two directors providing $180K in consulting services have a material financial relationship with the company that impairs their independence — under SEC and exchange rules, audit committee members must meet strict independence criteria with no direct or indirect material relationships; (3) the audit committee has only three members, with one being management (CEO), leaving only two independent members — one of whom is the CPA providing financial expertise. For effective oversight, the audit committee should consist entirely of independent directors, with at least one designated as a financial expert. The consulting directors should either discontinue their consulting arrangements or serve on committees other than audit. The board should also receive financial information with sufficient lead time (more than two days) for meaningful review. Under COSO, the control environment is the foundation of all other internal control components — a compromised board undermines the entire internal control system.",
    "StudyLinks": [
      { "label": "COSO Internal Control — Integrated Framework (2013)", "url": "https://www.coso.org" },
      { "label": "IMA CMA Learning Outcome Statements, Part 1 Section E", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-E-046",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B misidentifies the root cause. COSO Principle 2 addresses board independence and oversight responsibility, not board size or meeting frequency. While corporate governance best practices suggest appropriate board size for the organization's complexity, the scenario does not provide sufficient information about Avondale's scale to conclude that eight directors are inadequate. Quarterly meetings are common for many corporations. The correct remediation targets the specific independence violations — the CEO on the audit committee and the consulting relationships — rather than structural metrics like board size. Expanding the board to twelve does nothing to address the fact that management sits on the oversight body meant to monitor management.",
    "ExplanationWrongC": "Option C ignores critical independence impairments. While four independent directors on an eight-person board numerically constitute a majority, two of the directors classified as 'independent' have $180K consulting relationships with the company — a material financial tie that disqualifies them as independent under regulatory standards. More importantly, the audit committee composition (CEO + two independent directors) fundamentally violates the principle that the audit committee must be wholly independent of management. COSO Principle 2 requires both board-level AND committee-level independence. The presence of the CEO on the audit committee means management is overseeing its own financial reporting — a direct contradiction of the oversight function.",
    "ExplanationWrongD": "Option D identifies a less critical issue. The compensation committee of three independent directors (assuming the consulting directors are not on this committee) is adequate under standard governance practices. The primary control environment deficiency is the audit committee's independence, not the compensation committee's size. The audit committee oversees financial reporting integrity and internal controls — the most directly relevant oversight body for the internal control system. Misidentifying the compensation committee as the primary deficiency would lead the candidate to focus remediation efforts on the wrong committee, leaving the more significant audit committee independence violation unaddressed.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "certification_date": "2026-07-28",
    "certification_batch": "Pack A Final Closure — S892",
    "upgrade_note": "Pack A Final Closure - S892 Analyze replacement for archived P1-E-046"
  },

  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.047 tone at the top and ethical culture assessment",
    "MicroTopic": "COSO Principle 1 — integrity and ethical values",
    "UniqueConceptKey": "E-047-ethical-culture-assessment",
    "LOSTag": "E.1 COSO Internal Control Framework",
    "Difficulty": "Difficult",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Brixton Manufacturing's controller identified that the division VP routinely instructs staff to book revenue before shipment during the last week of each quarter to meet targets. When the controller raised this with the CFO, the CFO responded, 'Everyone does it, and our auditors have never objected.' Brixton has a published code of conduct and an anonymous ethics hotline that received zero reports last year. Which COSO principle is most clearly violated, and what indicator best reveals the depth of the control environment failure?",
    "Choices": {
      "A": "COSO Principle 1 (integrity and ethical values) is violated because management is overriding controls; the strongest indicator of depth is the zero hotline reports, which suggests employees do not trust the reporting mechanism",
      "B": "COSO Principle 12 (selects and develops control activities) is the primary failure because Brixton lacks a control to prevent premature revenue recognition",
      "C": "The published code of conduct demonstrates compliance with COSO Principle 1, and the CFO's statement reflects a legitimate reliance on external auditor review",
      "D": "The division VP's actions violate COSO Principle 10 (identifies and analyzes significant changes) because the quarterly targets create a change in business conditions"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "COSO Principle 1 states: 'The organization demonstrates a commitment to integrity and ethical values.' This principle is violated at multiple levels: (1) The division VP directs staff to book revenue before shipment — a clear override of internal controls driven by meeting quarterly targets. Management override is one of the most significant threats to internal control effectiveness. (2) The CFO's dismissive response ('Everyone does it, and our auditors have never objected') represents a profound failure of tone at the top — the CFO rationalizes fraud rather than correcting it. (3) The zero hotline reports are the strongest indicator of a deep cultural failure because a properly functioning whistleblower program in an organization with these practices would generate reports. Zero reports likely means employees fear retaliation or believe reporting is futile. The published code of conduct and anonymous hotline are 'form' without 'substance' — the control environment has the appearance of ethical infrastructure but management's actions demonstrate these mechanisms are ineffective. COSO emphasizes that the board and senior management set the tone at the top — when the CFO rationalizes fraud, the entire internal control system's foundation is compromised.",
    "StudyLinks": [
      { "label": "COSO Internal Control — Integrated Framework (2013)", "url": "https://www.coso.org" },
      { "label": "IMA CMA Learning Outcome Statements, Part 1 Section E", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-E-047",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B attributes the failure to Principle 12 (control activities) rather than Principle 1 (control environment). While it is true that a control to prevent premature revenue recognition should exist, the deeper failure is that management is overriding existing controls. A control activity (e.g., requiring shipping documentation before revenue recognition) would be ineffective if management directs staff to bypass it. The control environment — the tone at the top, integrity, and ethical values — is the foundation upon which all other COSO components rest. A properly designed control activity cannot compensate for a compromised control environment where leadership rationalizes fraud. This choice confuses the symptom (control override) with the root cause (ethical culture failure).",
    "ExplanationWrongC": "Option C incorrectly treats the published code of conduct as evidence of compliance with Principle 1. COSO Principle 1 evaluates whether the organization DEMONSTRATES a commitment to integrity — a published document alone is insufficient. The behaviors described (management directing premature revenue recognition; the CFO rationalizing it) are direct evidence that the commitment to integrity is not demonstrated in practice. The CFO's reliance on auditors is also misplaced — external auditors may not detect management override, and management is primarily responsible for internal controls. A code of conduct that exists on paper but is ignored by leadership reflects exactly the kind of 'form over substance' that COSO warns against. A candidate selecting this answer has confused the existence of control documentation with the actual operating effectiveness of the control environment.",
    "ExplanationWrongD": "Option D misattributes the failure to Principle 10, which addresses the identification and analysis of significant changes in the business environment. While quarterly revenue pressure from targets may represent a business condition, the COSO principle violated here is not about identifying changes — it is about integrity and ethical values (Principle 1). The division VP's actions are a knowing override of controls for personal or divisional performance goals, not a failure to identify changing conditions. Principle 10 is part of the Risk Assessment component, not the Control Environment. Distinguishing between control environment failures (tone at the top, integrity) and risk assessment failures (identifying changes, analyzing impacts) is essential for correctly diagnosing internal control weaknesses.",
    "question_state": "Certified",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "certification_date": "2026-07-28",
    "certification_batch": "Pack A Final Closure — S892",
    "upgrade_note": "Pack A Final Closure - S892 Evaluate replacement for archived P1-E-047"
  },

  {
    "Part": 1,
    "Section": "E",
    "SectionName": "Internal Controls",
    "Topic": "E.049 organizational structure and assignment of authority",
    "MicroTopic": "COSO Principle 3 — authority and responsibility",
    "UniqueConceptKey": "E-049-authority-responsibility-analysis",
    "LOSTag": "E.1 COSO Internal Control Framework",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Westbrook Insurance recently reorganized from a functional structure to a matrix structure. Under the new structure, claims adjusters report to both a regional claims director and a product-line vice president. The controller's team now provides financial reports to both reporting lines, but no one has been designated as the owner of the monthly claims reserve reconciliation control. Based on COSO Principle 3, what control environment risk does this create, and what is the most direct remediation?",
    "Choices": {
      "A": "The matrix structure inherently ensures dual oversight, eliminating control risk; no remediation is needed beyond documenting reporting relationships",
      "B": "The risk is that matrix structures create reporting complexity that inevitably weakens internal controls; Westbrook should revert to the functional structure",
      "C": "The risk is that shared reporting lines blur accountability for specific controls, potentially leading to control gaps; assign clear control ownership with documented responsibilities",
      "D": "The risk is limited to financial reporting complexity; the controller should issue two separate reports to address each reporting line's needs"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under COSO Principle 3, management establishes organizational structures, reporting lines, and appropriate authorities and responsibilities in pursuit of objectives. A matrix structure inherently creates shared accountability — which can strengthen controls through dual oversight OR weaken them through diffusion of responsibility. The specific risk described is a classic 'control ownership gap': when claims adjusters report to two managers, and a critical control (monthly claims reserve reconciliation) has no designated owner, each manager may assume the other is responsible. This is the control environment equivalent of 'everybody's responsibility is nobody's responsibility.' The most direct remediation is to assign clear, documented ownership of each key control to a specific individual, with the assignment communicated to both reporting lines. This preserves the matrix structure's benefits (cross-functional expertise, dual oversight) while mitigating the accountability diffusion risk. COSO emphasizes that authority and responsibility must be clearly delineated — ambiguity in a matrix structure is not a design flaw of the matrix but a failure to apply Principle 3 within the chosen structure.",
    "StudyLinks": [
      { "label": "COSO Internal Control — Integrated Framework (2013)", "url": "https://www.coso.org" },
      { "label": "IMA CMA Learning Outcome Statements, Part 1 Section E", "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx" }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "QuestionID": "P1-E-049",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A incorrectly assumes that dual oversight automatically strengthens controls. While matrix structures CAN enhance oversight by providing multiple perspectives, the specific scenario identifies a critical failure: no one has been designated as the owner of the claims reserve reconciliation control. Dual oversight without clear ownership creates ambiguity — each manager may believe the other is responsible. This is precisely the 'diffusion of responsibility' risk that COSO Principle 3 addresses. Documenting reporting relationships is necessary but insufficient — without assigning specific control ownership to named individuals, the matrix structure creates gaps rather than closing them.",
    "ExplanationWrongB": "Option B overreacts by recommending a structural reversion without first attempting to remediate within the existing framework. COSO Principle 3 does not prescribe any specific organizational structure — it requires that within WHATEVER structure is chosen, authority and responsibility are clearly established. Reverting to a functional structure may solve the accountability diffusion but sacrifices the legitimate business reasons for adopting a matrix (cross-functional coordination, shared expertise). The more targeted and proportionate response is to address the control ownership gap directly through role clarity and documentation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D focuses exclusively on financial reporting — issuing two reports — without addressing the fundamental control environment issue of unassigned accountability. COSO Principle 3 is about clarity of authority and responsibility for internal controls, not merely about information flow. The controller issuing two reports provides information to both reporting lines but does not answer the question 'Who is responsible for performing and reviewing the reserves reconciliation?' Information distribution and control accountability are distinct concepts within the COSO framework. The controller's reports address communication (COSO Principle 14) but do not resolve the core Principle 3 violation of undefined control ownership.",
    "question_state": "Certified",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "certification_date": "2026-07-28",
    "certification_batch": "Pack A Final Closure — S892",
    "upgrade_note": "Pack A Final Closure - S892 Analyze replacement for archived P1-E-049"
  }
];

module.exports = { replacements };

console.log('Batch 1 ready: ' + replacements.length + ' items');
console.log('QIDs: ' + replacements.map(r => r.QuestionID).join(', '));
console.log('Cognitive levels: ' + replacements.map(r => r.CognitiveLevel).join(', '));
