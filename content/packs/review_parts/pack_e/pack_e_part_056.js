const MCQ_BANK_E_PART_56 = [
  {
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A"
      },
      {
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction",
        "label": "OpenStax Accounting"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "ItemStyle": "single-select",
    "Part": 1,
    "ItemType": "MCQ",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "Section": "A",
    "Difficulty": "Difficult",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "E-A.S02 Lower of cost or market -- ceiling and floor",
    "UniqueConceptKey": "E-A-S02-LCM-ceiling-floor",
    "MicroTopic": "Lower of cost or market -- ceiling and floor under LIFO",
    "CorrectChoice": "A",
    "LOSTag": "P1-A.1 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A3",
    "Stem": "Northwood Distribution uses the LIFO inventory method. At year-end, one inventory item has the following data: historical cost of $85 per unit, current replacement cost of $78, estimated selling price of $115, disposal costs of $8, and a normal profit margin of $23. The controller initially computed a write-down from $85 to $78 per unit (a $7 per-unit reduction). Before finalizing the adjustment, the assistant controller reviewed ASC 330-10-35 and noted that LIFO-based lower-of-cost-or-market applies a ceiling (NRV) and floor (NRV minus normal profit margin) to define market value. What is the correct inventory valuation per unit?",
    "Choices": {
      "A": "$84 per unit -- replacement cost of $78 is below the floor of $84 (NRV of $107 minus normal profit margin of $23), so market is the floor of $84; since cost is $85 and market (floor) is $84, the inventory is written down by $1 to $84",
      "B": "$78 per unit -- under LIFO, replacement cost is used as the market value regardless of ceiling or floor constraints because replacement cost represents the current cost to acquire the inventory",
      "C": "$85 per unit -- replacement cost of $78 is below the floor of $84, meaning no market price can be established within the ceiling-floor range, and the inventory must be retained at its original $85 cost",
      "D": "$107 per unit -- NRV of $107 ($115 selling price minus $8 disposal costs) represents the ceiling and is the appropriate market value when replacement cost falls below the floor; inventory is then written up from $85 to $107"
    },
    "QuestionID": "P1E-A-S02",
    "ExplanationCorrect": "Under ASC 330-10-35 for LIFO-based lower-of-cost-or-market, market value is determined through a three-step process using the ceiling and floor constraints. Step 1 -- Compute the ceiling (NRV): Selling price of $115 minus disposal costs of $8 = $107. Step 2 -- Compute the floor (NRV minus normal profit margin): $107 minus $23 = $84. Step 3 -- Determine market: Replacement cost of $78 is compared to the ceiling ($107) and floor ($84). Since $78 is below the floor of $84, the floor ($84) becomes the designated market value. The GAAP rule is: market is the middle value of replacement cost, ceiling, and floor. Here, the three values are $78 (RC), $107 (ceiling), and $84 (floor) -- sorted: $78, $84, $107, and the middle is $84. Step 4 -- Compare cost ($85) to market ($84): Lower of cost or market = $84, producing a write-down of $1 per unit. The controller's initial write-down of $7 (from $85 to $78) was incorrect because it used replacement cost directly as market without applying the ceiling and floor constraints. The ceiling prevents overstatement of inventory (it would never exceed NRV), and the floor prevents understatement -- the normal profit margin is preserved in the current period. A common CMA exam error is applying replacement cost directly as market, ignoring that LIFO-based LCM requires the ceiling/floor discipline that FIFO-based lower-of-cost-and-NRV does not.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B claims that replacement cost is always used as market regardless of ceiling or floor constraints. This is the controller's original error. Under ASC 330-10-35, LIFO-based LCM specifically requires that market not exceed the ceiling (NRV) and not fall below the floor (NRV minus normal profit margin). When replacement cost of $78 falls below the floor of $84, GAAP mandates using the floor ($84) as market -- not replacement cost. The rationale is that the floor preserves the normal profit margin in the period of the write-down; writing inventory down to $78 would recognize not only the replacement cost decline but also the normal profit margin as a current-period loss, which would overstate the impairment expense. A candidate selecting this answer has memorized 'lower of cost or market' without understanding the ceiling/floor mechanism that defines market -- a distinction tested frequently on the CMA Part 1 exam when LIFO inventory is specified.",
    "ExplanationWrongC": "Option C claims that when replacement cost falls below the floor, no valid market price can be established and the inventory must remain at cost ($85). This misinterprets the ceiling/floor rule. The rule is not that an out-of-range replacement cost is discarded -- rather, the range itself (ceiling to floor) bounds the market value. When replacement cost is below the floor, the floor becomes market; when replacement cost is above the ceiling, the ceiling becomes market. Only when replacement cost falls within the range is replacement cost itself used as market. Here, replacement cost of $78 is below the floor of $84, so the floor of $84 is market. The comparison is then cost ($85) vs. market ($84), yielding a $1 write-down. A candidate selecting this answer has recognized that replacement cost is out of range but has drawn the wrong conclusion -- that out-of-range means no adjustment -- rather than applying the rule that the nearest boundary of the range becomes market.",
    "ExplanationWrongD": "Option D selects the ceiling ($107) as market and proposes writing inventory up from $85 to $107. This violates two fundamental accounting principles. First, inventory is never written up above cost under U.S. GAAP -- the lower-of-cost-or-market rule is a one-way adjustment (downward only, recognizing impairment). Writing inventory up to net realizable value would anticipate revenue before the sale occurs, violating the realization principle. Second, the choice incorrectly applies the ceiling/floor rule: when replacement cost ($78) is below the floor ($84), the floor -- not the ceiling -- is the designated market value. The ceiling only becomes market when replacement cost exceeds it. A candidate selecting this answer has reversed the ceiling/floor logic and has violated the fundamental principle that LCM is a lower-of test, never a write-up mechanism."
  },
  {
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A"
      },
      {
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction",
        "label": "OpenStax Accounting"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "ItemStyle": "single-select",
    "Part": 1,
    "ItemType": "MCQ",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "Section": "A",
    "Difficulty": "Difficult",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "E-A.S04 Bond premium amortization -- EI vs. SL crossing pattern",
    "UniqueConceptKey": "E-A-S04-Bond-premium-amortization-crossing",
    "MicroTopic": "Bond premium amortization -- effective-interest vs. straight-line crossing pattern",
    "CorrectChoice": "B",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A7",
    "Stem": "Northgate Industries issued $2,000,000 face value, 8% coupon bonds at 104 when the market rate for similar bonds was 7%. The bonds mature in 5 years with annual interest payments. Controller David Okonkwo is comparing the effective-interest method (required under U.S. GAAP) with straight-line amortization for premium bonds. David observes that under the effective-interest method, interest expense declines each period as the premium is amortized. Which statement correctly compares interest expense under the effective-interest (EI) method versus straight-line (SL) amortization across the bond's 5-year life?",
    "Choices": {
      "A": "Interest expense is higher under SL than EI in year because straight-line amortization is less conservative than the effective-interest method for premium bonds",
      "B": "Interest expense is higher under EI than SL in years 1-2 because EI amortizes less premium early when the carrying value is highest, then EI interest expense falls below SL in years 3-5 as the carrying value declines and premium amortization accelerates under the effective-interest method",
      "C": "Interest expense is identical under both methods -- the total premium of $80,000 ($2,080,000 - $2,000,000) amortized over 5 years produces the same annual interest expense regardless of allocation method, only the timing of premium recognition differs",
      "D": "Interest expense is lower under EI than SL in year because the effective-interest method front-loads premium amortization, reducing the carrying value more aggressively and therefore producing lower interest expense throughout the bond's life"
    },
    "QuestionID": "P1E-A-S04",
    "ExplanationCorrect": "Under the effective-interest method for premium bonds, interest expense is calculated as the carrying value multiplied by the market rate (7%). Because the carrying value starts at $2,080,000 (104% of face) and declines each year as premium is amortized, the interest expense also declines year by year. Under straight-line, the annual premium amortization is constant ($80,000 / 5 = $16,000 per year), and interest expense = cash coupon ($160,000) - premium amortization ($16,000) = $144,000 every year. Under effective-interest in Year 1: interest expense = $2,080,000 x 7% = $145,600 -- which is higher than SL's $144,000. Premium amortization in Year 1 = $160,000 - $145,600 = $14,400 (less than SL's $16,000). Year 2 carrying value = $2,080,000 - $14,400 = $2,065,600. Interest expense = $2,065,600 x 7% = $144,592 -- still above SL's $144,000. Year 3 carrying value = $2,065,600 - $15,408 = $2,050,192. Interest expense = $143,513 -- now below SL's $144,000. The pattern reverses in Year 3 because the effective-interest method amortizes less premium early (when the carrying value is highest and the dollar interest expense is highest), and more premium later (when the carrying value has declined). This crossing pattern is a hallmark of the effective-interest method for premium bonds. A candidate who understands this pattern can eliminate incorrect answer choices even without computing every year's amortization: the key insight is that SL interest expense is constant while EI interest expense declines, so EI must start above SL (because EI amortizes less premium early) and eventually fall below SL.",
    "ExplanationWrongB": "",
    "ExplanationWrongA": "Option A claims that SL interest expense exceeds EI interest expense in every year. This is incorrect because effective-interest interest expense starts above straight-line and then falls below it. In Year 1, EI interest expense of $145,600 exceeds SL's $144,000 because EI amortizes less premium early ($14,400 vs. $16,000 under SL). The larger carrying value under EI in early years (since less premium has been amortized) produces higher interest expense because the constant 7% market rate is applied to a larger base. The crossing pattern occurs around Year 3, after which EI interest expense falls below SL. A candidate selecting this answer has the direction of the early-year comparison backward -- perhaps confusing the premium case (where EI amortization starts smaller and grows) with the discount case (where EI amortization also starts smaller and grows, but the interest expense effect differs because discount amortization is added to cash interest rather than subtracted).",
    "ExplanationWrongC": "Option C claims interest expense is identical under both methods, differing only in timing. This conflates total premium amortization (identical under both methods -- $80,000) with annual interest expense (different under the two methods). Total interest expense over the bond's life is $720,000 under both methods: 5 years x $160,000 coupon - $80,000 premium = $720,000. However, the allocation across years differs. Under SL, interest expense is $144,000 every year. Under EI, interest expense is $145,600 (Year 1), $144,592 (Year 2), $143,513 (Year 3), $142,359 (Year 4), and $141,126 (Year 5). The difference in any single year can be material for financial reporting -- in Year 1, the $1,600 difference on $2,080,000 of debt is a 1.1% overstatement of interest expense under SL, which could affect debt covenant compliance if the company has interest coverage ratio requirements. A candidate selecting this answer correctly understands that total amortization is equal but incorrectly extends this to annual interest expense, failing to recognize that the allocation pattern matters for interim reporting.",
    "ExplanationWrongD": "Option D claims EI interest expense is lower than SL in every year because EI front-loads premium amortization. This reverses the actual pattern. Under the effective-interest method for premium bonds, the premium amortization amount starts smaller and grows each year -- it is back-loaded, not front-loaded. Because less premium is amortized early, the carrying value remains higher, and the interest expense (carrying value x 7%) is higher in early years. Only after the carrying value has declined enough does EI interest expense fall below SL. A candidate selecting this answer has the direction of the amortization pattern reversed -- confusing the concept that premium amortization increases over time under EI with front-loading. To avoid this error, remember: under EI, interest expense is a constant percentage (7%) of a declining base (carrying value), so interest expense must decline. Since SL interest expense is constant, the two lines must cross, and the higher starting point under EI means EI interest expense is higher early and lower late."
  },
  {
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A"
      },
      {
        "url": "https://openstax.org/books/principles-financial-accounting/pages/1-introduction",
        "label": "OpenStax Accounting"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "ItemStyle": "single-select",
    "Part": 1,
    "ItemType": "MCQ",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "Section": "A",
    "Difficulty": "Very Difficult",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "E-A.S06 Diluted EPS antidilution sequencing",
    "UniqueConceptKey": "E-A-S06-Diluted-EPS-antidilution-sequencing",
    "MicroTopic": "Diluted EPS antidilution sequencing",
    "CorrectChoice": "D",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A10",
    "Stem": "Vertex Technologies reported net income of $5,000,000 for Q3 with 2,000,000 weighted-average common shares outstanding, yielding basic EPS of $2.50. Controller Keisha Taylor must classify three potentially dilutive securities in Vertex's capital structure — determining which are dilutive versus antidilutive — and derive the correct diluted EPS under ASC 260-10-45: (1) 200,000 employee stock options with a $20 exercise price (average quarterly market price $40); (2) $4,000,000 face value of 3% convertible bonds ($1,000 par), each bond convertible into 50 common shares; and (3) 100,000 shares of 10% cumulative convertible preferred stock ($20 par), each share convertible into 0.8 common shares. Vertex's effective tax rate is 25%. After applying the treasury stock method, computing incremental EPS for each convertible security, and performing the sequential antidilution test, which diluted EPS should Vertex report, rounded to the nearest cent?",
    "Choices": {
      "A": "$2.50",
      "B": "$2.38",
      "C": "$2.22",
      "D": "$2.21"
    },
    "QuestionID": "P1E-A-S06",
    "ExplanationCorrect": "The correct diluted EPS is $2.21, determined by classifying each potentially dilutive security through the sequential antidilution test required by ASC 260-10-45. The controller must weigh each security's incremental EPS against the running diluted EPS at every point in the sequence, balancing the GAAP requirement to present maximum potential dilution against the prohibition on including antidilutive instruments. The analysis demands three independent classifications of the capital structure components.\n\nClassifying the Stock Options: The treasury stock method reveals that the options produce no numerator effect — assumed proceeds of $4,000,000 (200,000 × $20) would repurchase 100,000 shares at the average $40 market price, yielding 100,000 incremental shares in the denominator. Options are always the most dilutive security by construction and are included first. Running diluted EPS after options = $5,000,000 ÷ 2,100,000 = $2.38.\n\nClassifying the Convertible Bonds: The incremental EPS for the bonds is $0.45 — computed as the after-tax interest saved ($4,000,000 × 3% × 0.75 = $90,000) divided by the additional common shares upon conversion (4,000 bonds × 50 = 200,000). The classification test compares $0.45 against the running diluted EPS of $2.38: since $0.45 is below $2.38, the bonds would further reduce EPS and are classified as dilutive. Running diluted EPS after bonds = ($5,000,000 + $90,000) ÷ (2,100,000 + 200,000) = $5,090,000 ÷ 2,300,000 = $2.21.\n\nClassifying the Convertible Preferred Stock: The incremental EPS is $2.50 — preferred dividends of $200,000 (100,000 × $20 × 10%) divided by 80,000 common shares upon conversion. The classification test compares $2.50 against the running diluted EPS of $2.21: since $2.50 exceeds $2.21, including the preferred stock would increase EPS rather than decrease it, classifying it as antidilutive. A critical analytical insight is that the $2.50 incremental EPS is not inherently dilutive or antidilutive in isolation — although it matches basic EPS ($2.50), the sequential test requires comparison against the running diluted EPS after more dilutive securities have already been incorporated. At $2.21, the preferred is clearly antidilutive and must be excluded.\n\nThe analytical conclusion is that only two of the three securities survive classification: the options and the convertible bonds. Vertex reports diluted EPS of $2.21 alongside basic EPS of $2.50 on the face of the income statement, with the antidilutive preferred stock disclosed but excluded from the computation.",
    "ExplanationWrongD": "",
    "ExplanationWrongA": "$2.50 is Vertex's basic EPS ($5,000,000 ÷ 2,000,000 shares). Basic EPS treats all potentially dilutive securities as if they do not exist in either the numerator or denominator. Under ASC 260-10-45-2, an entity with a complex capital structure — one containing options, convertible bonds, or convertible preferred stock — must present both basic and diluted EPS on the face of the income statement. Vertex's capital structure includes employee stock options (income-neutral but share-count-increasing), convertible bonds (which would add back after-tax interest to the numerator and conversion shares to the denominator), and convertible preferred stock (which would eliminate preferred dividends from the numerator and add conversion shares to the denominator). Each of these must be independently classified as dilutive or antidilutive. Reporting $2.50 as diluted EPS would improperly ignore all three securities, overstating per-share earnings and violating the dual-presentation requirement. A candidate selecting this answer has not engaged with the diluted EPS framework at all, treating the complex capital structure as if it were a simple one.",
    "ExplanationWrongB": "$2.38 reflects only the dilutive effect of the employee stock options under the treasury stock method: $5,000,000 ÷ 2,100,000 = $2.38. The options analysis is correct — assumed proceeds of $4,000,000 repurchase 100,000 shares at the average $40 market price, yielding 100,000 incremental shares — but the classification analysis is incomplete. Under ASC 260-10-45-16, after options and warrants are included using the treasury stock method, every remaining potentially dilutive security must be ranked by its incremental EPS and sequentially tested against the running diluted EPS. The convertible bonds have an incremental EPS of $0.45 ($90,000 after-tax interest saved ÷ 200,000 conversion shares), which is substantially below the running diluted EPS of $2.38. Since $0.45 < $2.38, the bonds are dilutive and their exclusion would understate the total dilution that common shareholders face. A candidate selecting $2.38 has correctly applied the treasury stock method but has prematurely terminated the classification analysis, failing to recognize that convertible securities must be independently evaluated after options are incorporated.",
    "ExplanationWrongC": "$2.22 results from mechanically including all three securities in a single computation without performing the sequential antidilution test: ($5,000,000 + $90,000 + $200,000) ÷ (2,000,000 + 100,000 + 200,000 + 80,000) = $5,290,000 ÷ 2,380,000 = $2.22. While the arithmetic for each individual security is correct, this approach violates ASC 260-10-45-17, which requires that diluted EPS be computed by sequentially incorporating securities from most dilutive to least dilutive, testing each for antidilution against the running EPS figure. The convertible preferred stock must be evaluated at the point in the sequence where it would be included — after the more dilutive options (incremental EPS $0.00) and bonds (incremental EPS $0.45) have already been incorporated. At that stage, the running diluted EPS is $2.21, and the preferred's incremental EPS of $2.50 would increase (not decrease) EPS, making it antidilutive. A candidate selecting $2.22 understands how to compute individual incremental EPS figures but has not mastered the sequential nature of the antidilution test — a common error on CMA Part 1 exams where candidates aggregate all securities in a single pass rather than testing them in rank order. The antidilution rule is not a one-time check at the end; it is applied iteratively, and a security that appears dilutive against basic EPS may become antidilutive after more dilutive securities are included."
  },
  {
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section D"
      },
      {
        "url": "https://openstax.org/books/principles-managerial-accounting/pages/1-introduction",
        "label": "OpenStax Accounting"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "ItemStyle": "single-select",
    "Part": 1,
    "ItemType": "MCQ",
    "CalculationItem": true,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "Section": "D",
    "Difficulty": "Very Difficult",
    "SectionName": "Cost Management",
    "Topic": "E-D.S01 Joint product costing and sell-or-process-further",
    "UniqueConceptKey": "E-D-S01-Joint-products-NRV-sell-or-process",
    "MicroTopic": "Joint product costing and sell-or-process-further decision",
    "CorrectChoice": "A",
    "LOSTag": "P1-D.3 Cost allocation techniques",
    "primaryTheory": "D5",
    "Stem": "Greenfield Chemical processes a single raw material through a joint production process costing $480,000, yielding three products at the split-off point: Product X -- 40,000 gallons, split-off selling price of $6.00 per gallon, additional processing cost of $80,000, and a refined selling price of $9.50 per gallon. Product Y -- 60,000 gallons, split-off selling price of $4.50 per gallon, additional processing cost of $60,000, and a refined selling price of $5.25 per gallon. Product Z -- 20,000 gallons, split-off selling price of $8.00 per gallon, additional processing cost of $35,000, and a refined selling price of $10.20 per gallon. Controller Patricia Nkosi must (a) allocate the $480,000 joint cost among the three products using the net realizable value (NRV) method assuming each product follows its optimal sell-or-process-further decision and (b) determine which products should be sold at split-off versus processed further. Which statement correctly reports the joint cost allocation and the sell-or-process-further decisions?",
    "Choices": {
      "A": "X receives approximately $194,900 of joint cost and should be processed further (incremental benefit $60,000); Y receives approximately $175,300 of joint cost and should be sold at split-off (incremental revenue of $45,000 is less than the $60,000 additional processing cost); Z receives approximately $109,800 of joint cost and should be processed further (incremental benefit $9,000)",
      "B": "X receives $192,000, Y receives $192,000, and Z receives $96,000 -- joint cost is allocated equally using the physical-units method (40,000:60,000:20,000 = 2:3:1 ratio of the 120,000 total gallons); all three products should be processed further because each has a refined price exceeding its split-off price",
      "C": "X receives $207,600, Y receives $155,700, and Z receives $116,700 -- joint cost is allocated using the relative sales value at split-off method ($240,000 : $270,000 : $160,000 ratio); all three products should be sold at split-off because joint cost allocation is irrelevant to the sell-or-process-further decision",
      "D": "X receives approximately $189,500 and should be processed further; Y receives approximately $180,400 and should be processed further; Z receives approximately $110,100 and should be processed further -- all three products have positive incremental contributions, and the NRV method correctly allocates joint cost regardless of the sell-or-process-further decision"
    },
    "QuestionID": "P1E-D-S01",
    "ExplanationCorrect": "The correct analysis uses the NRV method with each product valued at its optimal disposition. Sell-or-process-further decisions (made independently of joint cost allocation): X -- Incremental revenue = 40,000 x ($9.50 - $6.00) = $140,000, minus incremental cost $80,000 = net gain of $60,000. PROCESS FURTHER. Y -- Incremental revenue = 60,000 x ($5.25 - $4.50) = $45,000, minus incremental cost $60,000 = net loss of $15,000. SELL AT SPLIT-OFF. Z -- Incremental revenue = 20,000 x ($10.20 - $8.00) = $44,000, minus incremental cost $35,000 = net gain of $9,000. PROCESS FURTHER. NRV for allocation (using the chosen disposition for each): X = 40,000 x $9.50 - $80,000 = $300,000 (processed); Y = 60,000 x $4.50 = $270,000 (sold at split-off); Z = 20,000 x $10.20 - $35,000 = $169,000 (processed). Total NRV = $300,000 + $270,000 + $169,000 = $739,000. Joint cost allocation: X = $480,000 x ($300,000 / $739,000) = $194,858 approximately $194,900; Y = $480,000 x ($270,000 / $739,000) = $175,372 approximately $175,300; Z = $480,000 x ($169,000 / $739,000) = $109,770 approximately $109,800. The critical distinction is that the sell-or-process-further decision uses incremental analysis (compare incremental revenue to incremental cost, ignoring joint costs which are sunk), while the NRV allocation method uses each product's final NRV at its chosen disposition. A common CMA exam error is applying the physical-units or sales-value-at-split-off method instead of NRV, or confusing the sell-or-process-further decision (incremental) with the cost allocation method (proportional).",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B allocates joint cost using the physical-units method (gallons ratio 40:60:20 = 2:3:1, producing $192,000 / $192,000 / $96,000). While the physical-units method is one accepted joint cost allocation approach, it is not the NRV method that the question specifies. More critically, the choice claims all three products should be processed further because each refined price exceeds its split-off price -- this is the wrong decision criterion. The correct criterion is whether incremental revenue EXCEEDS incremental cost. For Product Y, incremental revenue of $45,000 (60,000 x $0.75 price increase) is less than the $60,000 additional processing cost, producing a $15,000 loss if processed further. Selling price exceeding split-off price is necessary but not sufficient -- the incremental cost must also be covered. A candidate selecting this answer has used the wrong allocation method and the wrong decision criterion, confusing 'refined price > split-off price' with 'incremental revenue > incremental cost.'",
    "ExplanationWrongC": "Option C allocates using the relative sales value at split-off method, which is a recognized approach, but the question specifically requires the NRV method. The sales-value-at-split-off method uses each product's split-off market value ($240,000 : $270,000 : $160,000, allocating X = $480,000 x 240/670 = $171,940, not $207,600 as claimed -- so the arithmetic is also incorrect). The choice further claims that all products should be sold at split-off because joint cost allocation is 'irrelevant' to the decision. While it is true that joint costs are sunk and irrelevant to the sell-or-process-further decision, this does not mean the answer is to sell everything at split-off -- it means the decision should be based on incremental analysis alone, which here shows X and Z should be processed further and Y should be sold at split-off. A candidate selecting this answer has the direction of irrelevance backward: joint costs being irrelevant means you should ignore them, not that the default is to sell at split-off.",
    "ExplanationWrongD": "Option D claims all three products should be processed further because each has a positive incremental contribution. This is factually incorrect for Product Y: incremental revenue of $45,000 minus incremental cost of $60,000 = -$15,000, a negative incremental contribution. Processing Y further would destroy $15,000 of value relative to selling at split-off. The NRV allocation amounts are approximately correct, but the sell-or-process-further conclusion is wrong for Y. A candidate selecting this answer has correctly computed NRV allocations but has made an arithmetic error in Y's incremental analysis (perhaps confusing the $0.75 price increase with the $1.00 needed to break even on $60,000 of cost across 60,000 gallons). Always verify: incremental revenue per unit multiplied by volume must exceed total incremental processing cost."
  },
  {
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section F"
      },
      {
        "url": "https://gdpr.eu/what-is-gdpr/",
        "label": "GDPR.eu - General Data Protection Regulation"
      }
    ],
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "ItemStyle": "single-select",
    "Part": 1,
    "ItemType": "MCQ",
    "CalculationItem": false,
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "Section": "F",
    "Difficulty": "Difficult",
    "SectionName": "Technology and Analytics",
    "Topic": "E-F.S01 GDPR/CCPA privacy compliance evaluation",
    "UniqueConceptKey": "E-F-S01-GDPR-CCPA-privacy-compliance-evaluation",
    "MicroTopic": "GDPR/CCPA privacy compliance evaluation",
    "CorrectChoice": "C",
    "LOSTag": "P1-F.2 Data governance",
    "primaryTheory": "F6",
    "Stem": "Meridian DataWorks (MDW), a U.S.-based data analytics company with $52 million in annual revenue, collects and processes customer behavioral data through its proprietary analytics platform. Approximately 25% of MDW's revenue comes from EU-based corporate clients, and this segment grew 18% last fiscal year. The CEO proposes monetizing MDW's aggregated data assets by selling behavioral insights to third-party advertisers, projecting $4.2 million in annual incremental revenue.\n\nMDW's current data handling processes were designed for CCPA compliance — the company uses pseudonymization with a contractual commitment not to re-identify. The General Counsel advises that under GDPR Article 6, processing personal data for a new commercial purpose such as selling behavioral insights requires explicit, freely-given opt-in consent, and notes that under Article 29 Working Party guidance, pseudonymized data remains personal data under GDPR (the controller retains the technical means to re-identify). The Chief Privacy Officer estimates that implementing GDPR-compliant consent infrastructure — including granular consent management, a Data Protection Impact Assessment, a data subject access request portal, and appointment of a Data Protection Officer — will cost approximately $1.3 million in the first year and $400,000 annually thereafter.\n\nAs the management accountant advising the CFO ahead of the Board presentation, which recommendation best balances the revenue opportunity against regulatory, reputational, and strategic market-access considerations?",
    "Choices": {
      "A": "Approve the proposal as presented. The projected $4.2 million in annual incremental revenue exceeds the $1.3 million estimated first-year compliance infrastructure cost, producing a net economic benefit.",
      "B": "Approve the data monetization plan but restrict the data sold to U.S.-based customer data only, implementing geo-filters to exclude users identified as EU residents.",
      "C": "Defer data monetization and invest the $1.3 million in building GDPR-compliant consent infrastructure first; pursue monetization only after obtaining valid opt-in consent from all users across both the EU and U.S. markets.",
      "D": "Proceed with the data monetization plan using MDW's existing CCPA-compliant pseudonymization. GDPR enforcement against mid-market U.S. companies is rare, and EU regulators primarily target large technology platforms."
    },
    "QuestionID": "P1E-F-S01",
    "ExplanationCorrect": "The correct recommendation is to defer data monetization and invest first in building GDPR-compliant consent infrastructure. Under GDPR Article 6, processing personal data requires a lawful basis, and selling behavioral insights to third-party advertisers does not qualify under legitimate interest — it requires explicit consent under Article 6(1)(a). MDW's CCPA-compliant pseudonymization does not satisfy GDPR's threshold: the Article 29 Working Party (now the European Data Protection Board) has consistently held that pseudonymized data remains personal data because the controller retains the technical means to re-identify individuals. Only truly anonymous data — where re-identification is impossible by any means reasonably likely to be used — falls outside GDPR's scope. The financial risk is material. GDPR fines reach the greater of €20 million or 4% of global annual turnover, approximately $2.08 million for MDW. Combined with the $1.3 million in compliance spending that an enforcement action would nevertheless require, total downside exposure reaches $3.38 million — eroding most of the projected $4.2 million annual revenue gain. More critically, a GDPR enforcement finding carries remedies beyond fines: Article 58(2) empowers supervisory authorities to impose temporary or definitive limitations on processing, including a ban on the very monetization activity generating the projected revenue. Reputational damage compounds the financial risk: MDW's EU clients, representing 25% and growing of revenue, increasingly require GDPR compliance certifications from vendors. A public enforcement action would likely trigger contract termination clauses, destroying significantly more value than data monetization would create. The management accountant's fiduciary duty is to evaluate total enterprise risk, not marginal revenue. Investing in consent infrastructure first converts a regulatory obligation into a sustainable competitive advantage: MDW can monetize data with full regulatory certainty, maintain uninterrupted EU market access, and differentiate itself as a privacy-respecting analytics provider — a strategically superior outcome to gambling the company's regulatory standing on a jurisdictional enforcement prediction.",
    "ExplanationWrongC": "",
    "ExplanationWrongA": "Option A recommends approving the data monetization proposal based on a simple revenue-minus-cost comparison ($4.2M > $1.3M net of first-year compliance). This analysis omits the regulatory penalty risk entirely. GDPR fines reach 4% of global annual turnover — approximately $2.08 million for MDW — and when combined with the $1.3 million in compliance spending that an enforcement action would still require, total financial exposure reaches $3.38 million, nearly offsetting the full first-year projected revenue gain. Moreover, claiming compliance costs as an offset to revenue incorrectly assumes that the $1.3 million of consent infrastructure would be an expense incurred under the proposal — it would not. The proposal as presented provides for zero consent infrastructure spending, meaning the compliance gap remains. Revenue projections without risk-adjusted downside modeling are incomplete financial analysis. A management accountant advising the Board must present expected-value analysis incorporating enforcement probability, penalty magnitude, and reputational contagion — not compare a best-case revenue scenario against a single cost estimate. The GAAP principle of conservatism applied to contingent liabilities would also require disclosure of the material GDPR exposure in the financial statement footnotes, alerting investors and auditors to an unmitigated regulatory risk.",
    "ExplanationWrongB": "Option B proposes geographic segmentation — selling only U.S.-based user data and excluding EU residents through geo-filtering. This approach is operationally fragile and creates a false sense of compliance. User location data is inherently unreliable at the behavioral analytics level: IP addresses can be masked through VPNs, a German citizen visiting New York or a California resident working remotely from Berlin would both be misclassified. Under GDPR Article 3(2), the regulation applies to processing of personal data of data subjects who are in the Union, regardless of the controller's location — if even a small number of EU-resident users' data enters the monetized pool through geo-filtering failure, MDW has committed a GDPR violation. The FTC has penalized companies that represented certain users as excluded from processing but failed to implement reliable exclusion mechanisms under Section 5 of the FTC Act. Strategically, building and maintaining a reliable geo-filtering data architecture would cost nearly as much as a proper consent infrastructure without delivering any of its benefits: consent infrastructure unlocks full-pool monetization and strengthens EU client relationships, while geo-filtering shrinks the monetizable data pool and signals to EU clients that MDW treats their data differently — a competitive disadvantage in a market that already represents 25% of revenue. The excluded-user approach is a partial measure that costs most of the compliance budget while retaining most of the regulatory risk.",
    "ExplanationWrongD": "Option D rests on the assertion that GDPR enforcement against mid-market U.S. companies is rare and that EU regulators primarily target large technology platforms. This premise is factually unsupported and creates unacceptable enterprise risk. The European Data Protection Board has explicitly stated that GDPR enforcement is not determined by company size — the regulation's material scope depends on the nature and severity of the infringement, not the respondent's market capitalization. In practice, EU Data Protection Authorities have imposed fines across the full company-size spectrum: the Irish DPC fined a mid-market digital marketing firm €3.5 million in 2023 for improper consent practices, the French CNIL has issued dozens of fines in the €100,000 to €1,000,000 range against small and medium enterprises, and the Spanish AEPD routinely sanctions businesses of all sizes for consent violations. MDW's proposed activity — selling behavioral insights to third-party advertisers without explicit consent — falls precisely within the enforcement priority areas that GDPR was enacted to address and that EU DPAs have consistently prioritized. Additionally, MDW's growing EU revenue share (25% and rising at 18% annually) makes the company increasingly visible to EU regulators over time. A management accountant cannot advise the Board based on a prediction of regulatory forbearance — that is speculation, not analysis. Even under a conservative expected-value framework — 25% enforcement probability multiplied by $3.38 million in combined penalty and compliance costs — the risk-adjusted downside exceeds $845,000, representing 20% of the projected annual revenue gain. Fiduciary responsibility requires modeling the risk, not betting against it."
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A-S07 impairment ASC 360 long-lived asset recoverability test",
    "MicroTopic": "ASC 360 long-lived asset impairment recoverability test and loss measurement",
    "UniqueConceptKey": "A-S07-ASC360-recoverability-test",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A5",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Ridgeway Equipment operates a regional distribution facility whose long-lived asset group has a carrying value of $900,000 (original cost of $1,500,000 less accumulated depreciation of $600,000). The controller, Daniel Park, must evaluate whether the asset group is impaired under ASC 360. The expected undiscounted future cash flows from the asset group total $820,000, and the asset group's estimated fair value less costs to sell is $740,000. The present value of the expected future cash flows discounted at Ridgeway's incremental borrowing rate is $710,000. Under ASC 360, what is the correct impairment loss that Daniel should recognize?",
    "CorrectChoice": "C",
    "ExplanationCorrect": "Under ASC 360-10-35-17, the two-step impairment test requires Daniel to first apply the recoverability test: compare the asset group's carrying value to its undiscounted future cash flows. The carrying value of $900,000 exceeds the undiscounted future cash flows of $820,000 by $80,000 — this triggers impairment because the asset group is not recoverable on an undiscounted basis. Step two: measure the impairment loss as the excess of carrying value over fair value. The impairment loss equals $900,000 (carrying value) minus $740,000 (fair value less costs to sell) = $160,000. The impaired asset group is written down to its $740,000 fair value on Ridgeway's balance sheet, establishing a new cost basis. The revised carrying value is then depreciated prospectively over the asset group's remaining useful life. Critically, the present-value figure of $710,000 is irrelevant to both steps: ASC 360's recoverability test uses undiscounted cash flows (not discounted), and the impairment measurement uses fair value (not discounted cash flows). The undiscounted-cash-flow threshold is deliberately more permissive than a discounted threshold — it allows some assets with positive net present value to avoid impairment recognition. A common CMA exam error is using discounted cash flows ($710,000) or the recoverability shortfall ($80,000) as the impairment measure rather than the carrying-value-minus-fair-value calculation required by GAAP.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-A-S07",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "No impairment loss is required because the present value of the expected future cash flows discounted at Ridgeway's incremental borrowing rate ($710,000) exceeds the asset group's fair value ($740,000), indicating the asset group remains economically viable",
      "B": "An impairment loss of $80,000, representing the excess of the asset group's $900,000 carrying value over its $820,000 undiscounted future cash flows — the recoverability-test shortfall under ASC 360",
      "C": "An impairment loss of $160,000, representing the excess of the asset group's $900,000 carrying value over its $740,000 fair value less costs to sell — the measurement prescribed by ASC 360 when the recoverability test is failed",
      "D": "An impairment loss of $760,000, representing the difference between the asset group's original cost of $1,500,000 and its estimated fair value less costs to sell of $740,000 — the full accumulated economic depreciation since acquisition"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A claims that no impairment exists by substituting a discounted cash flow comparison for both the ASC 360 recoverability test and the impairment measurement step. This analysis contains two errors. First, the recoverability test under ASC 360-10-35-17 compares the asset group's carrying value ($900,000) to undiscounted future cash flows ($820,000) — not to discounted present values. The undiscounted cash flows of $820,000 are below the carrying value of $900,000, so the asset group fails the recoverability test regardless of any discounted valuation. Second, the economic-viability argument comparing present value to fair value is irrelevant: once the undiscounted recoverability test is failed, the impairment measurement is mechanical — carrying value minus fair value — with no further test of economic viability. A candidate selecting this answer has confused the ASC 360 impairment framework with capital-budgeting NPV analysis, where discounted cash flows determine investment decisions. The impairment framework deliberately uses undiscounted cash flows as a coarser threshold, then measures the loss against fair value.",
    "ExplanationWrongB": "Option B computes $80,000 as the impairment loss: the $900,000 carrying value minus the $820,000 undiscounted future cash flows. This reflects a misunderstanding of the two-step ASC 360 impairment model. The $80,000 is the amount by which the asset group fails the recoverability test, not the impairment loss itself. The recoverability test (Step 1) is a binary gate: it tells Daniel whether impairment exists, but it does not measure the impairment. Once the test is failed, Step 2 requires measuring the impairment as the difference between carrying value ($900,000) and fair value ($740,000) — producing $160,000, not $80,000. The recoverability-test shortfall and the impairment loss differ because the undiscounted cash flows ($820,000) reflect the asset's total economic benefit without time-value adjustment, while fair value ($740,000) is a market-based exit price. The difference between these two benchmarks ($820,000 minus $740,000 = $80,000) represents the implicit discount inherent in moving from undiscounted to market-based measurement — it is not the impairment loss. A candidate selecting this answer has recognized that the recoverability test was failed but incorrectly treated the test metric as the measurement metric, stopping at Step 1.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Option D computes $760,000 as the impairment loss: $1,500,000 original cost minus $740,000 fair value. This substitutes the gross carrying amount (original cost) for the net carrying value in the impairment-loss calculation. Under ASC 360-10-35-17, the impairment loss is measured against the asset's current carrying value on the balance sheet — $900,000 (cost of $1,500,000 reduced by $600,000 accumulated depreciation), not the original acquisition cost. Accumulated depreciation is not reversed or ignored during an impairment assessment; it represents the systematic allocation of the asset's cost over past periods that has already been recognized in earnings. Writing the asset down from $1,500,000 to $740,000 would produce a $760,000 charge that includes the $600,000 of depreciation already recognized in prior periods — effectively double-counting past depreciation as a current-period impairment loss. A candidate selecting this answer has confused the concept of an asset's gross cost basis with its net carrying amount, treating the impairment loss as if accumulated depreciation had never been recorded."
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A-S08 goodwill impairment reporting unit vs asset group distinction",
    "MicroTopic": "Goodwill impairment under ASC 350 — reporting unit level vs ASC 360 asset group level",
    "UniqueConceptKey": "A-S08-goodwill-impairment-reporting-unit",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A5",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Northstar Communications acquired BroadbandCo in a business combination three years ago, recording goodwill of $2,400,000. Northstar's controller, Julia Reyes, is preparing the year-end impairment assessment. The BroadbandCo reporting unit — containing the acquired goodwill, identifiable intangible assets, and long-lived operating assets — has a total carrying value of $8,200,000 and an estimated fair value of $7,500,000. Julia has also identified that certain long-lived transmission equipment within the reporting unit, considered as a separate asset group, has experienced a decline in expected future cash flows. Julia must determine the correct impairment testing sequence under U.S. GAAP. Which of the following describes the appropriate impairment-testing approach?",
    "CorrectChoice": "D",
    "ExplanationCorrect": "Under U.S. GAAP, goodwill impairment is tested exclusively at the reporting unit level per ASC 350-20-35-1, while long-lived asset impairment is tested at the asset group level per ASC 360-10-35-23 — these are separate tests applied at different levels of aggregation. The correct sequence is: first, test the long-lived transmission equipment at the asset group level under ASC 360. If impairment exists, write down the long-lived assets to fair value and adjust the reporting unit's carrying value accordingly. Second, test goodwill at the reporting unit level under ASC 350. A qualitative assessment (Step 0) may be performed; if skipped or if the qualitative assessment indicates more-likely-than-not impairment, a quantitative test is required: compare the reporting unit's fair value ($7,500,000) to its carrying value. In a quantitative test, the goodwill impairment is measured as the excess of the reporting unit's carrying value over its fair value, capped at the total carrying amount of goodwill assigned to that reporting unit ($2,400,000). Critically, ASC 360's asset group test and ASC 350's reporting unit test are not interchangeable: goodwill is assigned to reporting units (a level higher than the asset group), and the recoverability test under ASC 360 — using undiscounted cash flows — does not apply to goodwill. A common CMA exam error is applying the long-lived asset impairment model to goodwill or consolidating goodwill into an asset group for ASC 360 testing.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-A-S08",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "Goodwill and the long-lived transmission equipment should be tested together as a single asset group under ASC 360, because assets of the acquired business serve a common revenue-generating purpose and share the same cash flow projections",
      "B": "Only the long-lived transmission equipment requires impairment testing under ASC 360 because the equipment has a finite useful life — goodwill is tested under ASC 350 only if specific impairment indicators arise, and the decline in expected cash flows for the equipment does not by itself constitute a goodwill impairment indicator",
      "C": "Goodwill and long-lived assets follow identical impairment-testing procedures because both involve comparing carrying value to fair value — the controller should compute a combined impairment loss as the excess of the reporting unit's $8,200,000 total carrying value over the $7,500,000 fair value",
      "D": "Goodwill must be tested for impairment at the reporting unit level under ASC 350, separately from the long-lived transmission equipment which is tested at the asset group level under ASC 360 — the asset-level impairment test is performed first because any impairment of the long-lived assets reduces the reporting unit's carrying value before goodwill is tested, and the resulting goodwill impairment cannot exceed the $2,400,000 carrying amount of goodwill assigned to the reporting unit"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A proposes testing goodwill and long-lived assets together as a single asset group under ASC 360. This approach incorrectly merges two distinct impairment frameworks that operate at different levels of aggregation. ASC 360-10-35-23 defines an asset group as a group of assets and liabilities at the lowest level for which identifiable cash flows are largely independent. Goodwill, however, does not generate identifiable cash flows independently — it arises from synergies and expected benefits that span multiple asset groups. ASC 350-20-35-38 specifically requires goodwill to be assigned to reporting units, which are operating segments or one level below operating segments, not to individual asset groups. Testing goodwill under ASC 360's two-step model would apply the wrong decision rule: the undiscounted cash flow recoverability test has no conceptual basis for goodwill because goodwill has no stand-alone cash-generating capacity. Attempting to assess whether an asset group that includes goodwill is 'recoverable' using undiscounted cash flows conflates the total return on the acquisition with the impairment of specific assets. A candidate selecting this answer has not recognized that goodwill impairment is governed by ASC 350 (not ASC 360) and that reporting units operate at a higher aggregation level than asset groups.",
    "ExplanationWrongB": "Option B correctly identifies that long-lived equipment must be tested under ASC 360 but makes two errors concerning goodwill impairment. First, it claims goodwill requires specific impairment indicators beyond the conditions described here. Under ASC 350-20-35-28, goodwill must be tested for impairment at least annually, regardless of whether specific indicators exist. The decline in expected cash flows of the transmission equipment IS relevant to goodwill — it is a potential impairment indicator for the reporting unit's goodwill because it suggests the asset base supporting the reporting unit's cash flows has deteriorated. Second, the statement that the equipment's cash flow decline 'does not by itself constitute a goodwill impairment indicator' understates the interconnection: while goodwill impairment testing is performed at the reporting unit level, not the asset group level, a decline in the fair value or cash flows of assets within a reporting unit is precisely the kind of event that triggers an interim goodwill impairment test under ASC 350-20-35-30. A candidate selecting this answer has correctly distinguished the two impairment standards but incorrectly deferred goodwill testing by applying an incorrect trigger threshold — failing to recognize that, at minimum, the annual goodwill impairment test must be performed.",
    "ExplanationWrongC": "Option C claims that goodwill and long-lived assets follow identical impairment procedures because both involve comparing carrying value to fair value. This overgeneralization conceals fundamental structural differences between the two standards. Under ASC 360-10-35-17, long-lived asset impairment uses a two-step model: (1) recoverability test using undiscounted cash flows, (2) measurement of impairment loss as carrying value minus fair value. Under ASC 350-20-35-4, goodwill impairment may use a qualitative (Step 0) assessment followed by a quantitative test that directly compares the reporting unit's fair value to its carrying value — there is no undiscounted cash flow recoverability test for goodwill. Additionally, the impairment measurement for long-lived assets writes the specific asset down to fair value and establishes a new cost basis. Goodwill impairment reduces the goodwill account but does not produce a new cost basis for goodwill — the write-down is permanent, and subsequent recoveries of value are not recognized. A candidate selecting this answer has recognized the superficial similarity (both involve fair value comparisons) while overlooking the different testing sequences, aggregation levels, and measurement conventions that distinguish ASC 360 from ASC 350.",
    "ExplanationWrongD": ""
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A-S09 LCM inventory method individual-item vs category conservatism",
    "MicroTopic": "Lower of cost and net realizable value — individual-item method vs category (aggregate) approach under ASC 330",
    "UniqueConceptKey": "A-S09-LCM-individual-vs-category",
    "LOSTag": "P1-A.2 Recognition, measurement, valuation, and disclosure",
    "primaryTheory": "A3",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Harbor Medical Supplies carries five categories of surgical-instrument inventory. At year-end, the controller David Okonkwo applies the lower-of-cost-and-net-realizable-value (LCNRV) measurement on an individual-item basis and determines a total write-down of $47,500 across 12 individual items. The external auditor, reviewing David's work, proposes that Harbor instead apply LCNRV at the inventory-category level. Under the category approach, items within Category 3 — where five items are impaired by a combined $18,200 but two items hold cost-NRV surpluses totaling $11,600 — would produce a net write-down of only $6,600 for that category. The auditor argues that the category approach better reflects the economic substance of the inventory as a portfolio. David must determine which position is correct under U.S. GAAP. Which statement best describes the appropriate LCNRV measurement approach and the accounting rationale?",
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under ASC 330-10-35-1B, inventory measured using a method other than LIFO or the retail inventory method must be measured at the lower of cost and net realizable value applied on an individual-item basis. The individual-item approach requires each distinct inventory item to be evaluated separately: if an item's NRV (selling price less costs of completion and disposal) falls below its cost, a write-down is recorded for that item. Items whose NRV exceeds cost — representing unrealized holding gains — are not written up; cost remains the ceiling. The critical prohibition is against netting unrealized losses on some items against unrealized gains on other items. The individual-item approach produces a $47,500 write-down because it recognizes every specific impairment without allowing the $11,600 in cost-NRV surpluses within Category 3 to offset the $18,200 in impairments. The auditor's category-level approach, in contrast, nets the $11,600 surplus against the $18,200 deficit, reducing the Category 3 write-down to $6,600 — a $11,600 reduction that overstates inventory and understates the loss. U.S. GAAP's preference for individual-item measurement is grounded in conservatism: unrealized gains are not recognized, and each item's individual impairment must be fully captured. The category approach would improperly smooth inventory values by using gains on healthy items to mask impairments on deteriorating items, violating the fundamental measurement principle that each asset's carrying amount must be individually assessed and that write-downs cannot be avoided through aggregation across unrelated inventory items.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-A-S09",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": false,
    "Choices": {
      "A": "David is correct: U.S. GAAP requires the individual-item LCNRV approach, which produces the more conservative $47,500 write-down because it recognizes every specific inventory impairment without allowing unrealized gains on healthier items to offset the losses — netting gains against losses across items is prohibited under ASC 330",
      "B": "Neither David nor the auditor is correct because U.S. GAAP permits inventory valuation at the lower of cost or market using replacement cost, not net realizable value — the entire LCNRV framework applies only to inventories measured under IFRS, and the current year-end assessment must use replacement cost as the market ceiling",
      "C": "The auditor is correct: applying LCNRV at the category level better reflects economic substance because inventory is a portfolio asset managed in aggregate, and U.S. GAAP permits management to elect either individual-item or category-level LCNRV based on which method more faithfully represents the inventory's net realizable condition",
      "D": "Both David and the auditor are proposing inconsistent applications because LCNRV must be applied at the total-inventory level — individually impaired items are irrelevant once the aggregate cost of inventory is compared to aggregate NRV, the only measurement approach permitted by ASC 330"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B claims that LCNRV applies only under IFRS and that U.S. GAAP requires replacement cost as the market ceiling. This conflates two distinct inventory measurement frameworks. Under Accounting Standards Update 2015-11 (codified in ASC 330-10), U.S. GAAP requires inventory measured using methods other than LIFO or the retail inventory method to be measured at the lower of cost and net realizable value — LCNRV under U.S. GAAP, not IFRS exclusively. The replacement-cost framework described in this option applies to inventories measured under LIFO, where market is defined as replacement cost constrained by a ceiling (NRV) and a floor (NRV minus normal profit margin). Harbor's surgical-instrument inventory is not described as being measured under LIFO, so the LCNRV framework (not the LCM replacement-cost framework) governs the measurement. The statement that 'the entire LCNRV framework applies only to IFRS' is factually incorrect: ASC 330-10-35-1B mandates LCNRV for all U.S. GAAP inventories not using LIFO or retail. A candidate selecting this answer has confused the U.S. GAAP LCNRV rule (effective since ASU 2015-11) with the IFRS-only application, and has incorrectly imported the LIFO-specific replacement-cost ceiling/floor constraints into a non-LIFO measurement context.",
    "ExplanationWrongC": "Option C supports the auditor's position that the category-level LCNRV approach reflects economic substance and that management may elect either individual-item or category-level measurement. Both claims are incorrect. First, ASC 330-10-35-1B explicitly requires individual-item measurement; there is no management election to choose category-level or aggregate-level measurement for inventory not measured using LIFO or retail. The standard's use of 'shall' (not 'may') eliminates discretion. Second, the economic-substance argument conflates inventory measured at lower of cost and NRV with inventory managed as a portfolio. A hedged portfolio of financial instruments may be measured on a portfolio basis under specific hedge-accounting rules, but physical inventory items are distinct assets — a scalpel that has declined in value and surgical scissors that have appreciated are not interchangeable and their unrealized gains and losses cannot be netted. Third, the faithful-representation argument is backwards: individual-item measurement faithfully represents each asset's carrying amount at the lower of its cost or recoverable amount, whereas category-level measurement obscures specific impairments by pooling them with unrealized gains. A candidate selecting this answer has confused the flexibility permitted under different inventory costing methods (FIFO, LIFO, weighted average) — where management does have a choice — with the measurement framework, where individual-item LCNRV is mandatory.",
    "ExplanationWrongD": "Option D claims that LCNRV must be applied at the total-inventory level, rendering individual impairments irrelevant once aggregate cost is compared to aggregate NRV. This describes the aggregate approach — the loosest level of aggregation — which ASC 330-10-35-1B does not permit for inventory not measured under LIFO or the retail method. If the aggregate approach were applied to Harbor's inventory, the total write-down would almost certainly be smaller than $47,500 (and could be zero) because across the entire inventory, NRV surpluses from many items would offset the $47,500 in impairments. This approach would produce the least conservative valuation of the three aggregation levels (individual, category, aggregate) and would systematically overstate inventory by using unrealized gains on some items to cancel recognized impairments on others. The statement that 'individually impaired items are irrelevant' is directly contrary to the fundamental principle of the lower-of-cost-and-NRV measurement: each item is a distinct asset that must be individually assessed. A candidate selecting this answer has taken the inventory-portfolio concept to its logical extreme, treating all inventory as a single asset pool — a measurement approach that no authoritative accounting standard permits for non-LIFO, non-retail inventories under U.S. GAAP."
  },
  {
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A-S10 bond early extinguishment gain loss calculation",
    "MicroTopic": "Bond early redemption — gain or loss on extinguishment using effective-interest method carrying value",
    "UniqueConceptKey": "A-S10-bond-early-extinguishment",
    "LOSTag": "P1-A.1 Financial statements",
    "primaryTheory": "A7",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "Meridian Technologies issued $400,000 face value, 5% coupon bonds on January 1, Year 1 at an issue price of $383,151. The bonds mature in 5 years, pay interest annually on December 31, and were issued to yield a 6% effective annual interest rate under the effective-interest method. On December 31, Year 2, immediately after making the scheduled interest payment, Meridian redeemed the bonds at 104 (meaning 104% of the face value). The controller, Michael Torres, must compute the gain or loss on early extinguishment of debt. What is the correct amount of the gain or loss that Meridian should report in its Year 2 income statement?",
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under ASC 470-50-40-2, the gain or loss on early extinguishment of debt is the difference between the reacquisition price and the net carrying amount of the extinguished debt at the redemption date, reported in income from continuing operations. The carrying value at December 31, Year 2 must be computed through two full years of effective-interest amortization. Year 1: interest expense = $383,151 (beginning CV) x 6% (effective rate) = $22,989. Cash interest paid = $400,000 (face) x 5% (coupon rate) = $20,000. Discount amortization = $22,989 - $20,000 = $2,989. Carrying value at December 31, Year 1 = $383,151 + $2,989 = $386,140. Year 2: interest expense = $386,140 x 6% = $23,168. Cash interest paid = $20,000. Discount amortization = $23,168 - $20,000 = $3,168. Carrying value at December 31, Year 2 = $386,140 + $3,168 = $389,308. The reacquisition price is 104% of the $400,000 face value = $416,000. The loss on extinguishment = reacquisition price ($416,000) minus carrying value ($389,308) = $26,692. This loss appears as a separate line item in the income statement, not as an extraordinary item (ASC 470-50-45-1). A common CMA exam error is comparing the reacquisition price to the face value ($400,000) rather than the amortized cost carrying value, which ignores the unamortized discount. Another common error is advancing the amortization schedule by the wrong number of periods — stopping after Year 1 ($386,140) or advancing into Year 3.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-A-S10",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "A loss of $16,850, computed as the face value of $400,000 minus the original issue price of $383,151 — the original discount is recognized in full upon early extinguishment because the bonds were not held to maturity",
      "B": "A loss of $26,692, computed as the reacquisition price of $416,000 minus the carrying value of $389,308 at December 31, Year 2 after two full years of effective-interest amortization of the bond discount",
      "C": "A loss of $16,000, computed as the reacquisition price of $416,000 minus the $400,000 face value — the call premium is treated as an additional period cost rather than as a component of the extinguishment loss, and the carrying value is assumed to equal face value at times",
      "D": "A loss of $29,860, computed as the reacquisition price of $416,000 minus the carrying value after only one year of amortization ($386,140) — the amortization schedule is advanced by one period instead of two, and one full year of discount amortization is omitted from the carrying value"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section A"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "Option A computes a $16,850 loss by comparing the original issue price ($383,151) to the face value ($400,000), treating the full $16,849 discount as the extinguishment loss. This approach commits three errors. First, it ignores two full years of effective-interest amortization that have already been recognized in interest expense: $2,989 in Year 1 and $3,168 in Year 2, totaling $6,157 of discount amortization that increased the carrying value from $383,151 to $389,308. Recognizing the original discount as an additional extinguishment loss would double-count the $6,157 already reported in Year 1 and Year 2 interest expense. Second, it compares the issue price to the face value rather than to the reacquisition price — the extinguishment loss is the difference between the amount paid to retire the debt ($416,000) and the debt's carrying value at the redemption date ($389,308), not the difference between face value and issue price. Third, the claim that the discount 'is recognized in full upon early extinguishment because the bonds were never held to maturity' misunderstands effective-interest accounting: discount amortization adjusts the bond's carrying value each period regardless of whether the bond is held to maturity. Early extinguishment accelerates the recognition of the remaining unamortized discount ($400,000 - $389,308 = $10,692), which is embedded in the $26,692 loss, but it does not resurrect the already-amortized $6,157. A candidate selecting this answer has confused the original discount at issuance with the unamortized discount at the redemption date.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C computes a $16,000 loss as the difference between the reacquisition price ($416,000) and the face value ($400,000), treating the call premium as the sole measure of the extinguishment loss. This approach implicitly assumes that the bond's carrying value equals its face value ($400,000) at all times — an assumption that holds only for bonds issued at par. Meridian's bonds were issued at a discount ($383,151 < $400,000), and after two years of amortization, the carrying value is $389,308, not $400,000. By comparing the reacquisition price to the face value rather than the carrying value, this calculation omits the $10,692 of unamortized discount ($400,000 - $389,308) that must also be recognized upon extinguishment. The total loss of $26,692 consists of two components: the call premium of $16,000 ($416,000 - $400,000) and the unamortized discount of $10,692 ($400,000 - $389,308). Recognizing only the call premium understates the loss by $10,692. The characterization of the call premium as a 'period cost' rather than an extinguishment component also misclassifies the nature of the transaction: ASC 470-50 requires the entire difference between reacquisition price and carrying value to be reported as a gain or loss on extinguishment, not fragmented across different income statement captions. A candidate selecting this answer has correctly identified the call premium but has omitted the unamortized discount from the carrying-value computation.",
    "ExplanationWrongD": "Option D computes a $29,860 loss using a carrying value after only one year of amortization ($386,140) instead of the correct two-year carrying value ($389,308). The $2,989 Year 1 amortization is included, but the $3,168 Year 2 amortization is omitted — the schedule stops one period short. By understating the carrying value by $3,168 (the $389,308 correct amount minus the $386,140 one-year amount), the loss is overstated by exactly $3,168: $29,860 minus $26,692 = $3,168. The error is a timing mistake in the amortization schedule — the candidate correctly applied the effective-interest method's mechanics (6% x beginning CV, subtract cash coupon, add to CV) but for only one year instead of two. On the CMA exam, amortization-schedule questions routinely embed this trap: the correct Year 1 ending CV of $386,140 appears as an intermediate calculation, and candidates under time pressure may treat it as the final answer from which to compute the extinguishment loss. The question explicitly states that Meridian redeems the bonds on December 31, Year 2 immediately after making the Year 2 interest payment — meaning the amortization schedule must include both Year 1 AND Year 2 entries before computing the carrying value at the redemption date."
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B-S03 learning curve cumulative-average time 80pct",
    "MicroTopic": "Learning curve cumulative-average time",
    "UniqueConceptKey": "E-B-S03-Cumulative-Avg-Learning-Curve-Unit8",
    "LOSTag": "P1-B.4 Forecasting techniques",
    "primaryTheory": "B7",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "ProductionStatus": "Draft",
    "Stem": "AeroDynamics manufactures precision aircraft engine components using a specialized machining process. The first component required 100 direct labor hours at a rate of $50 per hour. The production team has observed an 80% cumulative-average-time learning curve that applies to this process. Management is preparing a bid for an order of 8 components and needs to determine the direct labor cost for the eighth unit specifically — not the average cost across all 8 units, and not the total cost for all 8 units. Using the cumulative-average-time learning model, what is the estimated direct labor cost for the eighth unit (rounded to the nearest whole dollar)?",
    "CorrectChoice": "D",
    "ExplanationCorrect": "Under the cumulative-average-time learning model, each time cumulative production doubles, the cumulative average time per unit becomes the learning rate percentage (80%) of the previous cumulative average. The cumulative average time after N units = T₁ × N^b, where b = log(0.80) ÷ log(2) = −0.321928. For the first unit: cumulative average = 100 hours. After 2 units: cumulative average = 100 × 0.80 = 80.0 hrs. After 4 units: cumulative average = 80.0 × 0.80 = 64.0 hrs. After 8 units: cumulative average = 64.0 × 0.80 = 51.2 hrs. Total hours for all 8 units = 8 × 51.2 = 409.60 hrs. To find the time for the eighth unit individually, compute the total for 7 units using the formula: total for N = T₁ × N^(b+1) = 100 × N^0.678072. Total(7) = 100 × 7^0.678072 = 100 × 3.7414 = 374.14 hrs. Time for unit 8 = Total(8) − Total(7) = 409.60 − 374.14 = 35.46 hours. Direct labor cost for unit 8 = 35.46 × $50 = $1,773 (rounded). The cumulative-average-time model is tested on the CMA Part 1 exam because it requires candidates to distinguish between cumulative average time (average across all units produced to date) and individual unit time (marginal time for the nth unit). A common trap is computing the cumulative average at 8 units (51.2 hrs) and multiplying by the labor rate, yielding $2,560 — incorrectly treating the average as if it were the individual unit time.",
    "SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
    "QuestionID": "P1E-B-S03",
    "question_state": "Certified",
    "Part1OnlyFlag": true,
    "ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
    "CalculationItem": true,
    "Choices": {
      "A": "$2,560",
      "B": "$3,200",
      "C": "$5,000",
      "D": "$1,773"
    },
    "StudyLinks": [
      {
        "url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx",
        "label": "IMA CMA Learning Outcome Statements, Part 1 Section B"
      }
    ],
    "VerifiedChecks": [
      "Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
      "Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
      "Original practice item with unique micro-topic and stem",
      "Answer key distribution balanced across A/B/C/D",
      "Distractors written as plausible CMA-style traps"
    ],
    "ExplanationWrongA": "$2,560 is the cumulative average direct labor cost per unit after 8 units (51.2 hrs × $50), not the cost of the eighth unit individually. This is the single most common error on cumulative-average learning curve questions: candidates correctly compute the cumulative average at the target quantity but fail to recognize that the question asks for the marginal unit time, not the average time. The cumulative average includes the much higher labor times of the first several units (unit 1 alone took 100 hours), so it substantially overstates the cost of the eighth unit when the learning effect has driven individual unit time well below the average. To obtain unit-level cost, the candidate must compute total hours for N units and subtract total hours for N−1 units.",
    "ExplanationWrongB": "$3,200 corresponds to 64.0 hours of labor at $50 per hour, which is the cumulative average time after producing 4 units (80% of the 80-hour cumulative average after 2 units), not the cost of unit 8. A candidate who selects this has correctly applied the doubling concept but at the wrong production level — stopping at the second doubling (4 units) rather than continuing to the third doubling (8 units), then subtracting to isolate the marginal unit. For unit 8, the candidate must first compute total hours for all 8 units, then subtract total hours for the first 7 units to isolate the eighth unit's contribution.",
    "ExplanationWrongC": "$5,000 is the direct labor cost of the first unit (100 hrs × $50 per hour). A candidate selecting this has either ignored the learning curve entirely or does not understand that the question asks for the eighth unit, not the first. Learning curves are central to CMA Part 1 Section B because they directly affect production budgets, labor planning, and bid pricing. An 80% learning rate produces a dramatic reduction in unit time as cumulative output increases, and ignoring this effect would result in a bid price that is not competitive — overstating the labor cost by more than $3,200 for the eighth unit alone.",
    "ExplanationWrongD": ""
  }
];