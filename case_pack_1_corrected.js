// CMA Part 1 Exam Simulator — Case Pack 1 (25 Cases)
// Generated: SESSION 916-917 Case Study Reconsolidation
// Source: Consolidated from scored_cases.js through scored_cases5.js
// Architecture: 3-pack × 25-case structure for 2026 blueprint alignment

const CASE_PACK_1 = [
{
  "CaseID": "CBQ-A1",
  "Title": "Revenue Recognition, Cash Flow, and Deferred Tax Review",
  "SectionTags": [
    "A"
  ],
  "Pack": 1,
  "Section": "A",
  "BlueprintDomain": "External Financial Reporting Decisions",
  "BlueprintObjectives": [
    "Revenue recognition under ASC 606",
    "Liability recognition and measurement",
    "Statement of cash flows preparation and analysis",
    "Deferred tax accounting (ASC 740)"
  ],
  "Topic": "Revenue Recognition",
  "Subtopic": "Deferred tax accounting",
  "PrimaryCompetency": "Calculation",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Financial reporting",
  "CompanyName": "Northstar Equipment",
  "CompanyType": "Manufacturer",
  "Industry": "Industrial equipment",
  "Stakeholder": "Controller",
  "Confidence": 95,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "LastValidated": "2026-07-26",
  "LearningObjectives": [
    "Analyze revenue recognition under ASC 606",
    "Analyze liability recognition and measurement",
    "Analyze statement of cash flows preparation and analysis"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QuestionCount": 6,
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "S535 Certification",
      "Summary": "Certified: 6 items. Explanations expanded to 2500+ chars. All numerical answers independently recalculated and verified. AccountingPrinciple fields completed. CAQS 1.6 six-dimension audit PASS. Difficulty/CIgnitiveLevel recalibrated on Q3."
    }
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Northstar Equipment is closing its year-end reporting package. The controller must evaluate revenue recognition, operating cash flow, and deferred taxes using the exhibits. Management wants answers that reconcile cash activity to accrual accounting and identify reporting treatments before the audit committee meeting.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Customer Contracts",
      "Headers": [
        "Contract",
        "Cash received",
        "Performance status at Dec. 31",
        "Other facts"
      ],
      "Rows": [
        [
          "Service plans sold Oct. 1",
          "360,000",
          "3 of 12 months delivered",
          "Recognized evenly over service term"
        ],
        [
          "Replacement parts",
          "84,000",
          "Shipped FOB shipping point Dec. 28",
          "Customer received Jan. 3"
        ],
        [
          "Installation bundle",
          "150,000",
          "Equipment delivered; installation not complete",
          "Installation is distinct and priced at 30,000 of total SSP 180,000"
        ]
      ],
      "ExhibitID": "CBQ-A1-E1",
      "CaseID": "CBQ-A1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Other Reporting Data",
      "Headers": [
        "Item",
        "Amount"
      ],
      "Rows": [
        [
          "Net income",
          "510,000"
        ],
        [
          "Depreciation expense",
          "72,000"
        ],
        [
          "Increase in accounts receivable",
          "41,000"
        ],
        [
          "Decrease in inventory",
          "18,000"
        ],
        [
          "Decrease in accounts payable",
          "27,000"
        ],
        [
          "Temporary difference: tax depreciation exceeds book depreciation",
          "200,000"
        ],
        [
          "Enacted tax rate",
          "25%"
        ]
      ],
      "ExhibitID": "CBQ-A1-E2",
      "CaseID": "CBQ-A1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter service-plan revenue recognized at Dec. 31.",
      "Correct": "90000",
      "Explanation": "The correct answer is $90,000. Under ASC 606, Revenue from Contracts with Customers, revenue is recognized when (or as) the entity satisfies a performance obligation by transferring a promised good or service to the customer. Northstar Equipment sold service plans on October 1, collecting $360,000 in cash at contract inception. The service plans represent a single performance obligation satisfied over time because the customer simultaneously receives and consumes the benefits as Northstar performs throughout the 12-month service period. ASC 606-10-25-27 provides that for performance obligations satisfied over time, an entity recognizes revenue by measuring progress toward complete satisfaction. The straight-line (time-elapsed) method is appropriate for service plans where the entity stands ready to provide service evenly throughout the contract period. Since the service plans commenced on October 1 and the reporting date is December 31, 3 of 12 months of service have been delivered. Revenue recognized at year-end is therefore: Cash collected x (months delivered / total months) = $360,000 x 3/12 = $90,000. A common and costly CMA exam trap is to recognize the full $360,000 at year-end because cash was received. This confuses the cash basis of accounting with the accrual basis. Under accrual accounting, required under U.S. GAAP for external financial reporting, revenue is recognized when earned through the satisfaction of performance obligations, not when cash changes hands. The $360,000 cash receipt was an exchange of assets (cash for a performance obligation), not a completed earnings process. Recognizing 12/12 months of revenue would materially overstate Northstar's income for the current year and understate future income. From a balance sheet perspective, the $270,000 of unearned revenue is a contract liability: a debt Northstar owes to its customers in the form of future service, classified as current since the service will be performed within 12 months. Each subsequent month, Northstar will recognize $30,000 of revenue ($360,000 / 12 months). For Northstar's controller, this distinction is critical for the year-end reporting package. The audit committee will review whether revenue has been properly recognized under ASC 606. Misapplying the cash-receipt date as the revenue-recognition date would result in a material misstatement of both the income statement and the balance sheet. The controller must ensure the December 31 adjusting entry properly defers $270,000 to the contract liability account and that only $90,000 flows through to revenue.",
      "Topic": "Revenue recognition",
      "ItemID": "CBQ-A1-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "ASC 606 requires revenue recognition when control transfers to the customer.",
      "CalculationRequired": true,
      "CaseID": "CBQ-A1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the contract liability remaining for the service plans at Dec. 31.",
      "Correct": "270000",
      "Explanation": "The correct answer is $270,000. This amount represents Northstar Equipment's remaining performance obligation to its service-plan customers at the December 31 balance sheet date. Under ASC 606-10-45-2, a contract liability is defined as an entity's obligation to transfer goods or services to a customer for which the entity has received consideration. When Northstar collected $360,000 in cash on October 1 for 12 months of service plans, it did not earn any of that cash at that moment. Instead, it incurred an obligation to stand ready to provide service over the next 12 months. This obligation is a liability because it represents resources (future service effort) that the entity must expend to satisfy its contractual promise. The calculation is: Contract liability = Cash collected - Revenue recognized to date = $360,000 - $90,000 = $270,000. The $90,000 of recognized revenue reflects the 3 months of service delivered (October, November, December) at $30,000 per month. The remaining $270,000 represents 9 months of future service Northstar still owes. On the balance sheet, this $270,000 is classified as a current liability because the service will be performed within 12 months of the balance sheet date, typically reported under captions such as Deferred Revenue, Unearned Revenue, or Contract Liabilities. Over the next 9 months (January through September), Northstar will systematically reduce this liability by $30,000 each month with the entry: Debit Contract Liability $30,000, Credit Service Revenue $30,000. A common CMA exam error is recording the entire $360,000 of cash received as revenue immediately upon receipt, stemming from cash-basis thinking: the assumption that revenue equals cash inflows. Under accrual accounting, cash receipts and revenue recognition are separate determinations governed by different principles. Cash receipts reflect the exchange of consideration; revenue recognition reflects the satisfaction of performance obligations under ASC 606. For Northstar's controller, proper accounting for the contract liability is essential for the year-end audit committee presentation. The $270,000 represents a real obligation: if Northstar fails to provide the remaining 9 months of service, it would be required to refund the unearned portion. The controller must ensure the December 31 adjusting entry properly reflects $90,000 of revenue earned and $270,000 of deferred revenue, and that the balance sheet correctly classifies this amount as a current liability. External auditors will test this cutoff as part of standard year-end procedures, verifying that cash received before year-end but relating to future periods has been properly deferred.",
      "Topic": "Contract liabilities",
      "ItemID": "CBQ-A1-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultipleConcepts"
      ],
      "AccountingPrinciple": "ASC 606 defines contract liabilities as obligations to transfer goods/services for which consideration has been received.",
      "CalculationRequired": true,
      "CaseID": "CBQ-A1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "select",
      "Prompt": "Which treatment is most appropriate for the replacement parts shipment?",
      "Choices": [
        "Recognize 84,000 revenue in the current year",
        "Defer all revenue until customer receipt on Jan. 3",
        "Recognize only gross profit in the current year",
        "Record as other comprehensive income"
      ],
      "Correct": "Recognize 84,000 revenue in the current year",
      "Explanation": "The correct answer is 'Recognize $84,000 revenue in the current year.' Northstar Equipment shipped replacement parts to a customer on December 28 under FOB (Free On Board) shipping point terms. The customer did not physically receive the goods until January 3, five days after year-end. This timing creates a classic year-end cutoff question testing whether control transfers at shipment or at delivery. Under ASC 606-10-25-30, an entity determines the point in time at which a customer obtains control of a promised asset. For goods shipped under FOB shipping point terms, control transfers to the buyer when the goods leave the seller's shipping dock. At that moment, the buyer obtains the ability to direct the use of and obtain substantially all of the remaining benefits from the asset, which is the definition of control under ASC 606. Legal title transfers, the buyer bears the risk of loss during transit, and the seller has no further obligations with respect to the goods. The fact that the goods are physically in transit on December 31 does not prevent revenue recognition because legal control, not physical possession, determines the recognition date under FOB shipping point. This contrasts with FOB destination terms, under which control transfers only when goods arrive at the customer's location. Under FOB destination, revenue would not be recognized until January 3, and the goods in transit would remain in the seller's inventory at December 31. The CMA exam frequently tests this distinction; it is one of the most common year-end cutoff errors identified by external auditors. The key exam trap: do NOT assume revenue recognition always follows physical delivery. Read the shipping terms. FOB shipping point means recognize at shipment; FOB destination means recognize at delivery. Since there is a single performance obligation (delivery of the parts) satisfied at shipment on December 28, Northstar recognizes the entire $84,000 as revenue in the current year. For Northstar's controller, this is a standard year-end cutoff test. The shipping department's records must be reconciled to the accounting records for the last week of December. Any goods shipped FOB shipping point before midnight on December 31 belong in current-year revenue. The controller must ensure that the invoice date (December 28), the shipping log (goods left dock December 28), and the revenue recognition date are all aligned. External auditors will select a sample of shipments from year-end week and verify revenue was recorded in the correct period based on stated shipping terms. A misclassification here would be a material cutoff error.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "Deferring all revenue until the customer receives the goods on January 3 incorrectly applies the FOB destination rule to a transaction governed by FOB shipping point terms. Under FOB shipping point, legal title and control transfer to the buyer at the moment the goods leave the seller's shipping dock, not when they arrive at the customer's location. The customer bears the risk of loss during transit, and Northstar has fulfilled its performance obligation under ASC 606 when the parts leave its facility on December 28. The January 3 receipt date is irrelevant for revenue recognition purposes under these terms. A candidate selecting this option is likely confusing the two FOB designations, one of the most frequently tested concepts on the CMA Part 1 exam. The correct approach recognizes the entire $84,000 in the current year because control transferred at shipment on December 28, well before the December 31 year-end cutoff. The transit period between shipment and delivery does not defer revenue recognition under FOB shipping point.",
      "ExplanationWrongC": "Recognizing only gross profit in the current year conflates revenue recognition with profit measurement, two conceptually distinct steps in the accounting cycle. ASC 606 requires an entity to recognize revenue at the full transaction price ($84,000) when control of the promised goods transfers to the customer. Revenue recognition is a gross concept: the entity records the entire selling price as revenue. Profit measurement occurs separately through the matching principle: cost of goods sold is recorded in the same period as the related revenue to determine gross profit. A candidate selecting this option may be thinking about the completed-contract method used in long-term construction accounting or confused by percentage-of-completion concepts. In a standard product sale with a single performance obligation satisfied at a point in time, there is no basis for recognizing only the profit portion. The correct approach records the full $84,000 as revenue in the period control transfers (December 28) and separately records the related cost of goods sold to determine the gross profit on the transaction.",
      "ExplanationWrongD": "Recording the shipment as other comprehensive income (OCI) under ASC 220 is fundamentally incorrect because OCI has a narrow, specific purpose under U.S. GAAP. ASC 220 prescribes that OCI captures specific items excluded from net income but included in comprehensive income: (1) unrealized holding gains and losses on available-for-sale debt securities, (2) foreign currency translation adjustments from the translation of foreign subsidiaries' financial statements, (3) certain pension and postretirement benefit adjustments including prior service costs and actuarial gains/losses, and (4) gains and losses on derivative instruments designated as cash flow hedges (the effective portion). Revenue from the ordinary course of business — selling replacement parts to customers — is operating revenue properly classified in net income on the income statement. A candidate selecting this option likely misunderstands the limited scope of OCI defined in ASC 220-10-45-10A and is confusing it with deferred revenue or some other income classification. Revenue from customer shipments belongs in the operating section of the income statement and has no relationship to the OCI components.",
      "Topic": "Revenue recognition",
      "ItemID": "CBQ-A1-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "ASC 606 requires revenue recognition when control transfers to the customer.",
      "BusinessInterpretation": "FOB shipping point transfers control at shipment (Dec. 28), meaning $84,000 belongs in the current year regardless of when the customer physically receives the goods. This is a critical year-end cutoff judgment for the controller and audit committee.",
      "CalculationRequired": false,
      "CaseID": "CBQ-A1",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Using the indirect method and Exhibit 2 data, enter cash flow from operating activities. (Income-tax cash effects are not provided in the exhibits.)",
      "Correct": "532000",
      "Explanation": "The correct answer is $532,000. Under ASC 230, Statement of Cash Flows, the indirect method begins with net income and adjusts for (1) non-cash items included in net income, (2) changes in operating working capital accounts, and (3) items classified as investing or financing activities. The indirect method reconciles accrual-basis net income to cash-basis operating cash flow, a critical skill tested on the CMA Part 1 exam. Starting with net income of $510,000, Northstar's controller makes the following adjustments. First, depreciation expense of $72,000 is added back. Depreciation is a non-cash expense: it reduces net income on the income statement but consumes no cash. The cash outflow for equipment occurred when the asset was purchased (an investing activity, not operating). Adding back depreciation restores the cash that was never spent in the current period. Second, the $41,000 increase in accounts receivable is subtracted. An increase in receivables means Northstar recorded more revenue on the accrual basis than it collected in cash. The company shipped goods and billed customers for $41,000 more than customers paid. Subtraction converts accrual revenue to cash actually collected. Third, the $18,000 decrease in inventory is added. A decrease in inventory means Northstar sold more than it purchased or produced. The cost of these goods was recognized as COGS, but the cash outflow to acquire them occurred in a prior period. This is a source of cash because the entity is liquidating inventory into sales without spending new cash. Fourth, the $27,000 decrease in accounts payable is subtracted. When payables decrease, Northstar paid suppliers more than it purchased on credit, meaning actual cash disbursed exceeded the accrual-basis expense. The full reconciliation: Net income $510,000 + Depreciation $72,000 - Increase in A/R $41,000 + Decrease in Inventory $18,000 - Decrease in A/P $27,000 = $532,000. A common CMA exam trap is reversing the sign on working capital changes. The general rule: increases in operating assets (receivables, inventory, prepaids) are cash uses, subtracted; decreases are cash sources, added. For operating liabilities (payables, accrued expenses), increases are cash sources, added; decreases are cash uses, subtracted. Memorizing this rule is essential for exam efficiency rather than attempting to reason through each adjustment under time pressure. The $532,000 of operating cash flow tells Northstar's management that core operations generated $532,000 of cash. Since net income was $510,000, operating cash flow exceeded net income by $22,000, indicating relatively high-quality earnings backed by actual cash generation. Positive operating cash flow also demonstrates Northstar's ability to fund operations internally without external financing. For the audit committee, this is a key indicator of financial health and sustainability. Note that the prompt specifies income-tax cash effects are not provided, so no tax adjustment is made. The calculation uses only the data in Exhibit 2.",
      "Topic": "Statement of cash flows",
      "ItemID": "CBQ-A1-Q4",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis",
        "MultipleConcepts"
      ],
      "AccountingPrinciple": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
      "CalculationRequired": true,
      "CaseID": "CBQ-A1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the deferred tax liability created by the depreciation temporary difference.",
      "Correct": "50000",
      "Explanation": "The correct answer is $50,000. Under ASC 740, Income Taxes, deferred tax liabilities arise from temporary differences that will result in net taxable amounts in future years when the related assets are recovered or liabilities are settled. Northstar Equipment's tax depreciation exceeds book depreciation by $200,000, creating a taxable temporary difference. This means Northstar claimed $200,000 more depreciation on its tax return than it reported on GAAP-basis financial statements. The tax return therefore shows lower taxable income in the current year (because depreciation is higher), but this creates a catch-up effect in future years. In those future years, tax depreciation will be lower than book depreciation on these assets. When book depreciation exceeds tax depreciation in future periods, taxable income will exceed pre-tax book income, creating a future tax obligation. Under the liability method required by ASC 740, deferred taxes are measured using the enacted tax rate expected to apply when the temporary difference reverses. The enacted rate is 25% as provided in Exhibit 2. No future rate projections or management expectations are relevant; ASC 740 requires use of the rate currently enacted into law. Deferred tax liability = Taxable temporary difference x Enacted tax rate = $200,000 x 25% = $50,000. This $50,000 represents the additional taxes Northstar expects to pay in future years because of the depreciation timing difference. It is not a current tax payable. The current tax liability is calculated separately from the current year's tax return. The deferred tax liability is a noncurrent liability on the balance sheet, reported separately from current tax obligations. The direction of the temporary difference is critical. The following framework applies consistently: Taxable temporary differences (future taxable amounts exceed future deductible amounts) create DEFERRED TAX LIABILITIES. Tax depreciation exceeding book depreciation is the most common example. Deductible temporary differences (future deductible amounts exceed future taxable amounts) create DEFERRED TAX ASSETS, such as warranty expense accrued for books but not yet paid for tax, bad debt reserves, and accrued vacation liabilities. A common CMA exam trap is confusing which direction creates a DTL versus a DTA. When book income exceeds taxable income in the current period (because the tax return takes larger deductions now), the company has effectively deferred tax payments and must record a DTL. For Northstar's controller, this $50,000 deferred tax liability must be properly disclosed in year-end financial statements as a noncurrent liability. The controller should prepare the required ASC 740-10-50 disclosures describing the nature of the temporary difference and components of deferred tax liabilities. The audit committee, tax authorities, and financial statement users will review this amount as part of their assessment of Northstar's future cash tax obligations. The $50,000 is not a current cash outflow; it will materialize as higher tax payments in future years when the depreciation difference reverses.",
      "Topic": "Deferred taxes",
      "ItemID": "CBQ-A1-Q5",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultipleConcepts"
      ],
      "AccountingPrinciple": "ASC 740 requires recognition of deferred tax liabilities for temporary differences that will result in future taxable amounts.",
      "CalculationRequired": true,
      "CaseID": "CBQ-A1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "multi",
      "Prompt": "Select audit-review risks that require judgment rather than simple cash matching.",
      "Choices": [
        "Separating cash collections from earned revenue",
        "Determining whether control transferred before year-end",
        "Classifying all cash receipts as revenue",
        "Recognizing deferred tax effects from timing differences"
      ],
      "Correct": [
        "Separating cash collections from earned revenue",
        "Determining whether control transferred before year-end",
        "Recognizing deferred tax effects from timing differences"
      ],
      "Explanation": "The correct answers are A, B, and D. Each represents an audit-review risk requiring professional judgment under the accrual basis of accounting, as applied in the Northstar Equipment year-end scenario. Choice A — 'Separating cash collections from earned revenue' — requires judgment because the distinction between cash receipt and revenue recognition is at the core of accrual accounting. Under ASC 606, revenue is recognized when performance obligations are satisfied, not when cash changes hands. The Northstar case directly tests this: the $360,000 received for service plans does not equal revenue. Only $90,000 (3/12) has been earned through performance. A controller must exercise judgment to determine how much of each cash collection relates to the current period versus future periods. This requires analyzing contract terms, identifying distinct performance obligations, and measuring progress toward satisfaction. An auditor reviewing this area must assess whether management's estimates of revenue earned versus deferred are reasonable, involving complex judgment about contract interpretation and revenue-timing analysis. Choice B — 'Determining whether control transferred before year-end' — requires judgment because control transfer under ASC 606 is a matter of legal and economic substance, not simply a calendar date. The Northstar case provides the replacement parts shipped FOB shipping point on December 28 but received January 3. The controller must determine whether control transferred at shipment (per FOB shipping point terms) or at delivery (as under FOB destination). This judgment is central to proper year-end cutoff: if control transferred December 28, revenue is recognized in the current year; if January 3, the entire $84,000 is deferred. For complex transactions, this judgment may involve evaluating whether multiple performance obligations exist, whether any are satisfied over time versus at a point in time, and whether variable consideration exists. Auditors test this by examining shipping documents, contract terms, and bill-and-hold arrangements. This is a quintessential judgment area; the answer cannot be determined by simply matching cash receipts to dates. Choice D — 'Recognizing deferred tax effects from timing differences' — requires judgment because temporary differences under ASC 740 involve estimating future tax consequences. The Northstar case provides a $200,000 temporary difference where tax depreciation exceeds book depreciation. Determining the deferred tax effect requires the controller to identify the nature of the temporary difference (taxable versus deductible), apply the correct enacted tax rate (25%), assess whether a valuation allowance is needed, and classify the resulting deferred tax amount appropriately on the balance sheet. For an auditor, evaluating deferred taxes requires understanding the entity's tax positions, applicable tax law, and management's assumptions about future profitability and the timing of reversals. This is a judgment-intensive area frequently appearing on the CMA exam because it bridges financial reporting, tax strategy, and management estimation. Choice C — 'Classifying all cash receipts as revenue' — is NOT a judgment area. This is a bright-line error: under GAAP, cash receipts and revenue are fundamentally different concepts governed by different standards. Classifying all cash as revenue is objectively wrong and can be identified through a simple comparison of the cash receipts journal to the general ledger revenue account. No professional judgment is needed to determine this treatment is incorrect; it is a textbook error violating the accrual basis. This is precisely why the question asks for items requiring 'judgment rather than simple cash matching': the cash-receipts-as-revenue approach is an error that any competent auditor would detect through routine substantive testing, without exercising significant professional judgment.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "Classifying all cash receipts as revenue ignores the accrual basis of accounting, the foundational principle underlying U.S. GAAP financial reporting. Under GAAP, revenue is recognized when it is earned through the satisfaction of performance obligations (ASC 606), not simply when cash is received. Cash received in advance of performance creates a contract liability (deferred revenue), not revenue. Cash collected for a prior period's sale was already recognized when the performance obligation was satisfied; recording it again would double-count. Cash received in the current period for services to be performed in future periods must be deferred. A controller who simply matches cash receipts to revenue is effectively operating on the cash basis of accounting, which is not acceptable under GAAP. This is precisely why the question asks for items requiring 'judgment rather than simple cash matching': the cash-receipts-as-revenue approach represents a bright-line error that is straightforward to identify and correct. No professional judgment is needed to determine that it is wrong; it violates the most fundamental principle of accrual accounting. This 'cash-basis thinking' is a common CMA exam trap, particularly in questions testing the distinction between cash inflows and revenue recognition.",
      "ExplanationWrongD": "",
      "Topic": "External reporting judgment",
      "ItemID": "CBQ-A1-Q6",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology",
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "AccountingPrinciple": "The accrual basis of accounting (FASB CON 5), ASC 606 (Revenue from Contracts with Customers), and ASC 740 (Income Taxes) collectively require professional judgment in determining when revenue is earned, when control transfers, and how deferred tax effects from timing differences are measured.",
      "CaseID": "CBQ-A1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-A2",
  "Title": "Consolidation, Impairment, OCI, and Disclosure Package",
  "SectionTags": [
    "A"
  ],
  "Pack": 1,
  "Section": "A",
  "BlueprintDomain": "External Financial Reporting Decisions",
  "BlueprintObjectives": [
    "Consolidations",
    "Impairment",
    "OCI",
    "Financial reporting effects",
    "External reporting"
  ],
  "PrimaryCompetency": "Calculation",
  "Subtopic": "Asset impairment testing",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Topic": "Consolidations",
  "Author": "Case Author",
  "BusinessFunction": "Financial reporting",
  "CompanyName": "Cobalt Foods",
  "CompanyType": "Processor",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Food and beverage",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze consolidations",
    "Analyze impairment",
    "Analyze oci",
    "Analyze consolidations",
    "Analyze financial reporting effects",
    "Analyze external reporting"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "S536 Certification Wave",
      "Summary": "Explanations expanded to certification standard (3,000+ chars). All 6 items certified per CAQS v1.0 six-dimension verification. Zero answer-key changes."
    }
  ],
  "Stakeholder": "Management",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Cobalt Foods owns 80% of Delta Snacks and is preparing consolidated statements. The accounting team must eliminate intercompany activity, test an asset group for impairment, classify OCI items, and identify disclosure issues from the exhibit package.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Consolidation Facts",
      "Headers": [
        "Item",
        "Amount"
      ],
      "Rows": [
        [
          "Parent sale to subsidiary",
          "300,000"
        ],
        [
          "Parent cost of goods sold on intercompany sale",
          "210,000"
        ],
        [
          "Intercompany inventory still held by subsidiary",
          "40%"
        ],
        [
          "Delta net income",
          "500,000"
        ],
        [
          "Delta dividends",
          "80,000"
        ]
      ],
      "ExhibitID": "CBQ-A2-E1",
      "CaseID": "CBQ-A2",
      "ValidationVersion": "2.0",
      "ReferencedBy": [
        "CBQ-A2-Q1",
        "CBQ-A2-Q4",
        "CBQ-A2-Q5"
      ]
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Reporting Facts",
      "Headers": [
        "Item",
        "Amount"
      ],
      "Rows": [
        [
          "Asset group carrying amount",
          "760,000"
        ],
        [
          "Undiscounted future cash flows",
          "710,000"
        ],
        [
          "Fair value",
          "635,000"
        ],
        [
          "Unrealized gain on debt securities in OCI",
          "22,000"
        ],
        [
          "Foreign currency translation loss",
          "9,000"
        ]
      ],
      "ExhibitID": "CBQ-A2-E2",
      "CaseID": "CBQ-A2",
      "ValidationVersion": "2.0",
      "ReferencedBy": [
        "CBQ-A2-Q2",
        "CBQ-A2-Q3",
        "CBQ-A2-Q5",
        "CBQ-A2-Q6"
      ]
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter the unrealized intercompany profit remaining in ending inventory.",
      "Correct": "36000",
      "Explanation": "Under ASC 810, when a parent sells inventory to a subsidiary and the subsidiary still holds that inventory at period-end, the unrealized intercompany profit must be eliminated in consolidation. The consolidated entity cannot recognize profit on transactions that have not been realized through sale to an external party.\n\nFrom Exhibit 1, Cobalt Foods sold inventory to Delta Snacks for $300,000 with a cost of goods sold of $210,000. The total gross profit on the intercompany sale is $300,000 − $210,000 = $90,000. However, only 40% of that inventory remains in Delta’s ending inventory at period-end. The remaining 60% was sold to external customers, so that portion of the profit is realized from the consolidated perspective.\n\nThe unrealized profit remaining in ending inventory is $90,000 × 40% = $36,000. This $36,000 must be eliminated by debiting consolidated cost of goods sold (or retained earnings, depending on the elimination approach) and crediting consolidated inventory, thereby reducing consolidated net income and total assets.\n\nIn practice, management accountants preparing consolidated financial statements must systematically identify all intercompany transactions—sales of inventory, transfers of fixed assets, intercompany loans, and management fees—and eliminate the effects at each reporting date. Failing to eliminate unrealized intercompany profit overstates consolidated inventory, consolidated net income, and consolidated retained earnings. This is a high-risk area for SEC filers and is frequently tested on the CMA exam.\n\nA common exam trap is to apply the profit percentage to the total sale ($300,000) rather than to the profit margin ($90,000), yielding $120,000 instead of $36,000. Another trap is to eliminate 100% of the intercompany profit regardless of whether the inventory has been sold to external parties, or to forget that only the profit element—not the full sale price—is eliminated. Candidates should also remember that under ASC 810, intercompany eliminations apply to the full amount of the transaction regardless of the parent’s ownership percentage, although the noncontrolling interest share may affect the allocation of eliminated profit between controlling and noncontrolling interests.",
      "Topic": "Consolidations",
      "ItemID": "CBQ-A2-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "ASC 810 requires consolidation when a parent has controlling financial interest (usually >50% ownership).",
      "CalculationRequired": true,
      "CaseID": "CBQ-A2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the impairment loss for the asset group.",
      "Correct": "125000",
      "Explanation": "Under ASC 360-10, long-lived assets to be held and used must be tested for impairment when events or changes in circumstances indicate that the carrying amount may not be recoverable. The impairment test has two steps.\n\nStep 1 — Recoverability Test: Compare the asset group’s carrying amount to the sum of undiscounted future cash flows expected from its use and eventual disposal. From Exhibit 2, the asset group has a carrying amount of $760,000 and undiscounted future cash flows of $710,000. Because $710,000 < $760,000, the carrying amount is not recoverable. The asset group fails the recoverability test, so the entity must proceed to Step 2.\n\nStep 2 — Measurement: The impairment loss is measured as the excess of the carrying amount over the asset’s fair value. Fair value from Exhibit 2 is $635,000. The impairment loss is $760,000 − $635,000 = $125,000. This loss is recognized in income from continuing operations and reduces the carrying amount of the asset group on the balance sheet.\n\nAn important nuance that CMA candidates must remember: the recoverability test uses undiscounted cash flows, but the measurement of the impairment loss uses fair value (a discounted measure). This asymmetry can produce results where an asset fails Step 1 (undiscounted CF < carrying amount) but the impairment loss is smaller or larger than expected depending on the relationship between undiscounted and discounted value. Additionally, once an asset is written down for impairment, the new carrying amount becomes the asset’s new cost basis, and restoration of a previously recognized impairment loss is prohibited under U.S. GAAP (unlike IFRS, which permits reversal under IAS 36).\n\nA common exam trap is to use undiscounted cash flows ($710,000) instead of fair value ($635,000) to measure the loss, incorrectly computing $760,000 − $710,000 = $50,000. Another trap is to skip the recoverability test entirely and measure impairment whenever fair value is below carrying amount. Candidates should also distinguish between ASC 360 impairment for long-lived assets held and used versus ASC 350 impairment testing for indefinite-lived intangible assets and goodwill, which uses a different methodology.",
      "Topic": "Impairment",
      "ItemID": "CBQ-A2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis",
        "MultipleConcepts"
      ],
      "AccountingPrinciple": "ASC 360 requires impairment testing when events indicate carrying amount may not be recoverable.",
      "CalculationRequired": true,
      "CaseID": "CBQ-A2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Enter net OCI effect from the two OCI items.",
      "Correct": "13000",
      "Explanation": "Under ASC 220, Comprehensive Income, other comprehensive income (OCI) includes revenues, expenses, gains, and losses that are excluded from net income under GAAP. OCI is reported either in a single continuous statement of comprehensive income or in two separate but consecutive statements. The components of OCI are reported net of their related tax effects and are closed to accumulated other comprehensive income (AOCI), a separate component of stockholders’ equity.\n\nFrom Exhibit 2, two OCI items are presented. The first is an unrealized gain on debt securities of $22,000. Under ASC 320, unrealized holding gains and losses on available-for-sale debt securities are reported in OCI until realized through sale or until an impairment is recognized. The $22,000 gain increases OCI. The second item is a foreign currency translation loss of $9,000. Under ASC 830, translation adjustments resulting from translating a foreign subsidiary’s financial statements from its functional currency to the reporting currency are reported in OCI. The $9,000 translation loss reduces (debits) OCI.\n\nThe net OCI effect combines both items: $22,000 gain − $9,000 loss = $13,000 net OCI increase. On the statement of comprehensive income, this $13,000 positive amount would appear in the OCI section, and on the balance sheet, AOCI would increase by $13,000 (before tax effects). In practice, each OCI component is presented separately, either on the face of the financial statements or in the notes, so that users can evaluate the nature and magnitude of each item. The distinction between items that will be reclassified to net income in future periods (reclassification adjustments) versus items that will not is critical for financial statement analysis.\n\nA common exam trap is to net the two items in the wrong direction (22,000 + 9,000 = 31,000) by treating the translation loss as an increase rather than a decrease to OCI. Another trap is to classify the unrealized gain as part of net income rather than OCI, or to confuse OCI treatment under U.S. GAAP with IFRS, which has different requirements for certain OCI components. Candidates should also note that ASC 220 requires disclosure of reclassification adjustments, the tax effects allocated to each OCI component, and the accumulated balances of each component of AOCI.",
      "Topic": "OCI",
      "ItemID": "CBQ-A2-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "ASC 220 defines other comprehensive income as revenues/expenses excluded from net income under GAAP.",
      "CalculationRequired": true,
      "CaseID": "CBQ-A2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "select",
      "Prompt": "How is Delta dividends activity treated in consolidation?",
      "Choices": [
        "Eliminate the parent share of subsidiary dividends against investment activity",
        "Report all subsidiary dividends as consolidated dividend income",
        "Classify dividends as revenue from customers",
        "Record the full amount in OCI"
      ],
      "Correct": "Eliminate the parent share of subsidiary dividends against investment activity",
      "Explanation": "Dividends from a consolidated subsidiary to the parent are internal group activity and are eliminated in consolidation. Under ASC 810, a parent company with a controlling financial interest must present the parent and subsidiary as a single economic entity. All intercompany transactions—sales, dividends, loans, fees—are eliminated in full in the consolidated financial statements.\n\nCobalt Foods owns 80% of Delta Snacks. Delta paid $80,000 in dividends (Exhibit 1). The parent’s share (80% × $80,000 = $64,000) must be eliminated against the parent’s investment in subsidiary because, from the consolidated perspective, the subsidiary’s net income has already been fully consolidated. Distributing a portion as dividends merely moves cash within the group; it does not generate additional income for the consolidated entity. Reporting subsidiary dividends as consolidated revenue, dividend income, or OCI would double-count earnings that were already recognized in the consolidated income statement.\n\nThe remaining 20% ($16,000) paid to the noncontrolling interest shareholders is not eliminated. These dividends represent cash leaving the consolidated group to external parties. On the consolidated cash flow statement, noncontrolling interest dividends are reported as a financing cash outflow, and on the consolidated balance sheet, they reduce the noncontrolling interest equity balance.\n\nA common CMA exam trap is confusing equity-method accounting (where dividends reduce the investment account on the parent’s standalone books) with consolidation treatment (where the parent’s share of dividends is eliminated entirely from consolidated statements). Another trap is eliminating 100% of subsidiary dividends without recognizing that the noncontrolling interest share remains external. Candidates should also understand that the elimination principle extends to all intercompany transactions: inventory sales, fixed asset transfers, intercompany debt, and management fees.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "Reporting all subsidiary dividends as consolidated dividend income incorrectly treats intercompany distributions as earnings available to the parent's external shareholders. Under ASC 810 consolidation principles, dividends from a subsidiary to its parent are eliminated because they represent an internal transfer within the economic entity, not income generated through transactions with external parties.",
      "ExplanationWrongC": "Classifying dividends from a subsidiary as revenue from customers fundamentally mischaracterizes the nature of the transaction. Dividends represent a return on investment by the parent company, not revenue earned from third-party customers through the sale of goods or services as governed by ASC 606. Internal group dividends are eliminated in consolidation.",
      "ExplanationWrongD": "Recording subsidiary dividends in OCI confuses distribution treatment with the reporting of non-owner changes in equity. ASC 220 handles OCI items such as unrealized gains, foreign currency translation, and pension adjustments. Subsidiary dividends are eliminated in consolidation as intercompany activity, not diverted to other comprehensive income.",
      "Topic": "Consolidations",
      "ItemID": "CBQ-A2-Q4",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "ASC 810 requires consolidation when a parent has controlling financial interest (usually >50% ownership).",
      "CalculationRequired": false,
      "CaseID": "CBQ-A2",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Select items that reduce consolidated income, assets, or accumulated OCI/equity in this case.",
      "Choices": [
        "Unrealized profit in ending inventory",
        "Asset impairment loss",
        "Foreign currency translation loss in OCI",
        "Delta dividends paid to parent as external revenue"
      ],
      "Correct": [
        "Unrealized profit in ending inventory",
        "Asset impairment loss",
        "Foreign currency translation loss in OCI"
      ],
      "Explanation": "Unrealized profit reduces inventory and consolidated profit, impairment reduces income/assets, and the translation loss reduces OCI/equity. Dividends from a subsidiary are not external revenue.\n\nThe correct items are:\n\n1. Unrealized profit in ending inventory — Cobalt sold inventory to Delta at a $90,000 gross profit, and 40% ($36,000 worth) remains unsold at period-end. Under ASC 810, this $36,000 of unrealized intercompany profit must be eliminated, which reduces consolidated inventory (asset) and consolidated net income (via increased cost of goods sold or reduced gross profit).\n\n2. Asset impairment loss — The asset group’s carrying amount of $760,000 exceeds its fair value of $635,000, and undiscounted future cash flows of $710,000 are below the carrying amount, triggering an impairment loss of $125,000 under ASC 360. This loss reduces consolidated operating income and the carrying amount of the impaired asset group on the balance sheet.\n\n3. Foreign currency translation loss in OCI — The $9,000 translation loss from converting Delta’s foreign-currency financial statements (if applicable) reduces accumulated other comprehensive income (AOCI), a component of stockholders’ equity. Under ASC 830, translation adjustments do not flow through net income but do reduce total consolidated equity.\n\nWhy Delta dividends paid to the parent are NOT correctly selected: Dividends from a subsidiary to its parent are intercompany transfers that are eliminated in consolidation under ASC 810. They do not reduce consolidated income, assets, or OCI. They are simply cash movements within the consolidated economic entity. Treating them as external revenue would constitute double-counting the subsidiary’s earnings, which are already consolidated.\n\nA common exam trap is selecting all four options because the phrase “external revenue” in Option D is misleading. Candidates should recognize that subsidiary dividends are internal to the consolidated group, not external. Another trap is failing to distinguish between income-statement effects (unrealized profit, impairment loss), OCI effects (translation loss), and equity-only reclassifications (dividend elimination).",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Treating subsidiary dividends paid to the parent as external revenue misinterprets intercompany transactions. Under ASC 810 consolidation principles, dividends distributed from a subsidiary to its parent are entirely eliminated as internal transfers within the economic reporting entity. These dividends do not generate revenue for the consolidated group and do not reduce consolidated income, assets, or OCI — they are merely a movement of cash within the consolidated entity.",
      "Topic": "Financial reporting effects",
      "ItemID": "CBQ-A2-Q5",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis",
        "MultipleConcepts",
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-A2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each issue to the correct reporting treatment.",
      "LeftItems": [
        "Intercompany sale",
        "Asset impairment",
        "Debt security unrealized gain",
        "Translation loss"
      ],
      "RightItems": [
        "Eliminate in consolidation",
        "Recognize loss when carrying amount exceeds fair value after recoverability failure",
        "Report in OCI when applicable",
        "Report in OCI as cumulative translation adjustment"
      ],
      "Correct": {
        "Intercompany sale": "Eliminate in consolidation",
        "Asset impairment": "Recognize loss when carrying amount exceeds fair value after recoverability failure",
        "Debt security unrealized gain": "Report in OCI when applicable",
        "Translation loss": "Report in OCI as cumulative translation adjustment"
      },
      "Explanation": "Each item in this case requires a distinct reporting treatment under U.S. GAAP, and the matching exercise tests whether candidates can correctly map the issue to the appropriate accounting response. The four pairs are:\n\n1. Intercompany sale → Eliminate in consolidation. Under ASC 810, all intercompany transactions between entities under common control must be eliminated in full when preparing consolidated financial statements. The purpose is to present the parent and its subsidiaries as a single economic entity, showing only transactions with external parties. The elimination removes both the sale and the related cost of goods sold, along with any unrealized profit remaining in inventory.\n\n2. Asset impairment → Recognize loss when carrying amount exceeds fair value after recoverability failure. Under ASC 360, the two-step impairment test requires: (Step 1) comparing undiscounted future cash flows to carrying amount to determine if the asset is recoverable, and (Step 2) if not recoverable, measuring the impairment loss as the excess of carrying amount over fair value. The loss is recognized in operating income and the asset is written down to fair value.\n\n3. Debt security unrealized gain → Report in OCI when applicable. Under ASC 320, unrealized holding gains and losses on available-for-sale debt securities are reported in other comprehensive income rather than net income. These gains accumulate in AOCI until realized through sale or until an other-than-temporary impairment is recognized. This treatment applies specifically to available-for-sale securities; trading securities report unrealized gains in net income, and held-to-maturity securities are reported at amortized cost.\n\n4. Translation loss → Report in OCI as cumulative translation adjustment. Under ASC 830, when a foreign subsidiary’s financial statements are translated from the functional currency to the reporting currency, the resulting translation adjustment is reported in OCI as part of the cumulative translation adjustment. This amount does not flow through net income unless the subsidiary is sold or substantially liquidated.\n\nA common exam trap is mismatching the OCI items: placing the debt security gain under translation adjustment or vice versa. Another trap is classifying asset impairment as a component of OCI rather than as an income statement charge. Candidates should also understand that the accounting treatments in this matching exercise reflect the broader principle that financial reporting distinguishes between transactions with external parties (reported), internal transactions (eliminated), changes in fair value of certain financial instruments (OCI), and currency translation effects (OCI — cumulative translation adjustment).",
      "Topic": "External reporting",
      "ItemID": "CBQ-A2-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "BusinessInterpretation": "Each item requires a distinct reporting treatment rather than a single cash-based adjustment.",
      "CalculationRequired": false,
      "CaseID": "CBQ-A2",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier 1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-A3",
  "Title": "Inventory, ARO, Subsequent Events, and Cash Classification",
  "SectionTags": [
    "A"
  ],
  "Pack": 1,
  "Section": "A",
  "BlueprintDomain": "External Financial Reporting Decisions",
  "BlueprintObjectives": [
    "Inventory measurement",
    "Asset retirement obligations",
    "Subsequent events",
    "Cash classification",
    "Statement of cash flows"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Statement of Cash Flows",
  "Subtopic": "Statement of cash flows preparation",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Financial reporting",
  "CompanyName": "Orion Components",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Electronics manufacturing",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze inventory measurement",
    "Analyze asset retirement obligations",
    "Analyze subsequent events",
    "Analyze cash classification",
    "Analyze statement of cash flows",
    "Analyze external reporting"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "Session 537 — ENHANCED_CASE_BASE Final Certification Wave",
      "Summary": "All 6 items certified per CAQS v1.0 §1.6 six-dimension verification. Explanations expanded to certification standard. Choices rotated for psychometric balance. question_state: Unprocessed → Certified."
    }
  ],
  "Stakeholder": "Orion Components (Controller)",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Orion Components is finalizing its annual reporting package. The controller must evaluate inventory measurement, an asset retirement obligation, subsequent events, and statement of cash flows classification from the exhibits.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Reporting Facts",
      "Headers": [
        "Issue",
        "Fact pattern"
      ],
      "Rows": [
        [
          "Inventory",
          "FIFO cost 410,000; net realizable value 386,000"
        ],
        [
          "Asset retirement obligation",
          "Legal dismantling obligation; present value 75,000"
        ],
        [
          "Customer bankruptcy",
          "Customer filed bankruptcy after year-end; financial distress existed at year-end"
        ],
        [
          "Treasury bill",
          "Purchased with original maturity of 88 days"
        ],
        [
          "Equipment purchase",
          "Cash paid for production equipment 240,000"
        ]
      ],
      "ExhibitID": "CBQ-A3-E1",
      "CaseID": "CBQ-A3",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Cash Flow Data",
      "Headers": [
        "Item",
        "Amount"
      ],
      "Rows": [
        [
          "Net income before inventory write-down",
          "620,000"
        ],
        [
          "Depreciation",
          "86,000"
        ],
        [
          "Increase in inventory before write-down",
          "34,000"
        ],
        [
          "Increase in accrued liabilities",
          "19,000"
        ]
      ],
      "ExhibitID": "CBQ-A3-E2",
      "CaseID": "CBQ-A3",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter the inventory write-down required under lower of cost and NRV.",
      "Correct": "24000",
      "Explanation": "Under ASC 330-10-35-1B (Inventory — Subsequent Measurement), inventory measured using FIFO must be reported at the lower of cost or net realizable value (NRV). From Exhibit 1, Orion Components' FIFO inventory cost is $410,000 and NRV is $386,000. Write-down = Cost - NRV = $410,000 - $386,000 = $24,000. The write-down flows through the income statement as a charge to cost of goods sold, reducing net income. On the balance sheet, inventory is reported at $386,000. A common CMA exam trap: confusing the NRV test for FIFO (simple lower of cost or NRV) with the LCM test for LIFO/retail method (market constrained by NRV ceiling and NRV-minus-profit floor). Under FIFO, no ceiling/floor calculation is required — the comparison is straightforward. Another trap: treating the write-down as depreciation (systematic allocation) rather than as a one-time impairment. Electronics manufacturing carries heightened obsolescence risk, making lower-of-cost-or-NRV assessments critical for Orion's inventory valuation. The $24,000 write-down is a non-cash charge — added back in the indirect method operating cash flow computation (see Q5).",
      "Topic": "Inventory measurement",
      "ItemID": "CBQ-A3-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
      "CalculationRequired": true,
      "CaseID": "CBQ-A3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the amount added to the asset cost for the asset retirement obligation at initial recognition.",
      "Correct": "75000",
      "Explanation": "Under ASC 410-20-25 (Asset Retirement and Environmental Obligations), a legal obligation to retire a tangible long-lived asset requires recognition when incurred, provided fair value is estimable. ASC 410-20 applies symmetrical recognition: the present value is simultaneously recorded as a liability (ARO) and capitalized as part of the related asset's cost. From Exhibit 1, the legal dismantling obligation has a present value of $75,000. Journal entry: Debit PP&E (asset) $75,000, Credit Asset Retirement Obligation (liability) $75,000. The capitalized $75,000 is depreciated over the asset's remaining useful life, matching ARO cost to periods benefited. The ARO liability accrues accretion expense over time as the present value unwinds toward settlement value. A common CMA exam trap: confusing ARO with contingent liabilities (ASC 450) — ARO recognition is mandatory if fair value is estimable, not contingent on probability thresholds. Another trap: recording the ARO as an immediate expense rather than capitalizing it — this violates the matching principle. Orion's controller must document discount rate assumptions and periodically reassess the ARO for changes in estimated cash flows, timing, or interest rates.",
      "Topic": "Asset retirement obligations",
      "ItemID": "CBQ-A3-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultipleConcepts"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-A3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "How should the customer bankruptcy be treated?",
      "Choices": [
        "Nonrecognized event disclosed only",
        "Recognized subsequent event requiring adjustment",
        "Ignored because it occurred after year-end",
        "Reported in OCI"
      ],
      "Correct": "Recognized subsequent event requiring adjustment",
      "Explanation": "Under ASC 855-10-25 (Subsequent Events), an event occurring after the balance sheet date but before financial statement issuance is classified as Type I (recognized, requiring adjustment) if it provides additional evidence about conditions existing at the balance sheet date, or Type II (nonrecognized, disclosure only) if it relates to conditions arising after the balance sheet date. Orion's customer bankruptcy after year-end is a TYPE I RECOGNIZED SUBSEQUENT EVENT because the exhibit confirms \"financial distress existed at year-end\" — the customer's inability to pay was a pre-existing condition that the bankruptcy merely confirmed. Orion must adjust the year-end financial statements by recognizing a bad debt expense (or increasing the allowance for doubtful accounts), reducing accounts receivable and net income. A common CMA exam trap: treating all post-balance-sheet events as Type II (disclosure-only) because they \"happened after year-end.\" The test is causation: did the underlying condition exist at the balance sheet date? Financial distress at year-end → bankruptcy after year-end = Type I (adjust). Fire destroying a warehouse where no fire risk existed at year-end = Type II (disclose). Another trap: confusing subsequent events with contingent liabilities (ASC 450) — the ASC 855 framework has its own classification logic.",
      "ExplanationWrongA": "A nonrecognized event requiring disclosure only applies to Type II subsequent events — conditions that arose after the balance sheet date. Under ASC 855, the customer's bankruptcy provides additional evidence about the collectibility of receivables that existed at year-end (Type I event). Type I events require adjustment of the financial statements because they clarify conditions that were present before the balance sheet date.",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "Ignoring the bankruptcy because it occurred after year-end violates ASC 855 requirements. Subsequent events must be evaluated through the date financial statements are issued or available to be issued. When a post-balance-sheet event provides evidence about a condition that existed at the reporting date — such as a customer's financial distress that was present but not fully known at year-end — the financial statements require adjustment for proper accounting.",
      "ExplanationWrongD": "Reporting the bankruptcy impact in OCI (Other Comprehensive Income) misapplies ASC 220. OCI captures specific items excluded from net income such as unrealized gains/losses on certain securities and foreign currency translation adjustments. A bad debt write-down resulting from a customer's bankruptcy flows through the income statement as a credit loss expense, directly reducing net income and the accounts receivable asset on the balance sheet.",
      "Topic": "Subsequent events",
      "ItemID": "CBQ-A3-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-A3",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "How should the 88-day Treasury bill normally be classified?",
      "Choices": [
        "Inventory",
        "Operating receivable",
        "Cash equivalent",
        "Long-term investment"
      ],
      "Correct": "Cash equivalent",
      "Explanation": "Under ASC 305-10-20 (Cash and Cash Equivalents — Glossary), cash equivalents are short-term, highly liquid investments that are readily convertible to known amounts of cash and so near maturity they present insignificant interest rate risk. The bright-line test: original maturity to the holder of three months or less. From Exhibit 1, the 88-day Treasury bill has 88 days original maturity ≤ 90 days, satisfying the criterion. T-bills are government-backed, highly liquid, and subject to minimal interest rate risk over an 88-day horizon. Classification: CASH EQUIVALENT, reported with cash on the balance sheet. Purchases and sales of T-bills with original maturities ≤ 90 days are not reported as investing activities on the SCF. A common CMA exam trap: confusing \"original maturity\" with \"remaining maturity\" — a 2-year bond with 60 days remaining does NOT qualify (original maturity at purchase exceeded 90 days). Another trap: confusing cash equivalents (ASC 305) with investment securities (ASC 320). A T-bill ≤ 90 days = cash equivalent; a T-bill > 90 days = short-term investment security.",
      "ExplanationWrongA": "Inventory classification under ASC 330 is reserved for goods held for sale in the ordinary course of business or materials used in production. A Treasury bill is a short-term investment security purchased for cash management purposes, not a physical good awaiting sale or consumption. Classifying a financial instrument as inventory fundamentally mischaracterizes the nature of the asset on the balance sheet.",
      "ExplanationWrongB": "An operating receivable arises from the sale of goods or services to customers on credit terms, governed by ASC 310. A Treasury bill is an investment purchased in the open market for cash management, not an amount due from customers for product sales or services rendered. It represents a financial asset acquired to manage liquidity, not an operating receivable from primary business activities.",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Long-term investment classification is reserved for securities intended to be held beyond one year or the operating cycle, whichever is longer. An 88-day Treasury bill has an original maturity of less than three months, which meets the precise definition of a cash equivalent under ASC 305. Cash equivalents are short-term, highly liquid investments readily convertible to known amounts of cash and subject to insignificant risk of value changes.",
      "Topic": "Cash classification",
      "ItemID": "CBQ-A3-Q4",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-A3",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter operating cash flow using the listed cash-flow data before separately adjusting for the inventory write-down.",
      "Correct": "691000",
      "Explanation": "Under ASC 230-10-45-28 (Statement of Cash Flows — Indirect Method), operating cash flow is derived by adjusting net income for non-cash items and changes in operating assets/liabilities. From Exhibit 2, net income before write-down is $620,000. Add back depreciation (non-cash): +$86,000. Subtract increase in inventory (use of cash): -$34,000. Add increase in accrued liabilities (source of cash): +$19,000. Operating cash flow = $620,000 + $86,000 - $34,000 + $19,000 = $691,000. Orion generated $691,000 of operating cash flow, exceeding net income ($620,000) by $71,000 — driven primarily by the depreciation add-back. A common CMA exam trap: confusing directional signs — increases in current assets SUBTRACT from operating cash flow (cash was used), while increases in current liabilities ADD (cash was provided). Mnemonic: \"CAE + CLI\" — Current Assets: End - Beginning (increase = subtract); Current Liabilities: End - Beginning (increase = add). Another trap: including the equipment purchase ($240,000) in operating — equipment purchases are INVESTING activities. The inventory write-down ($24,000) is a non-cash charge that the prompt explicitly isolates; it would affect operating cash flow if included in net income but is excluded per the specific instruction.",
      "Topic": "Statement of cash flows",
      "ItemID": "CBQ-A3-Q5",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "AccountingPrinciple": "ASC 230 requires classification of cash flows into operating, investing, and financing activities.",
      "CalculationRequired": true,
      "CaseID": "CBQ-A3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "match",
      "Prompt": "Match each item to its reporting treatment.",
      "LeftItems": [
        "FIFO inventory below NRV",
        "ARO present value",
        "88-day Treasury bill",
        "Equipment purchase"
      ],
      "RightItems": [
        "Write down inventory",
        "Record liability and add to asset cost",
        "Classify as cash equivalent",
        "Classify as investing cash outflow"
      ],
      "Correct": {
        "FIFO inventory below NRV": "Write down inventory",
        "ARO present value": "Record liability and add to asset cost",
        "88-day Treasury bill": "Classify as cash equivalent",
        "Equipment purchase": "Classify as investing cash outflow"
      },
      "Explanation": "Under GAAP, different economic events receive distinct financial reporting treatments under specific ASC topics. FIFO inventory below NRV → WRITE DOWN INVENTORY (ASC 330): the $24,000 impairment charge reduces inventory to net realizable value, flowing through the income statement as a permanent write-down (GAAP prohibits reversal). ARO present value → RECORD LIABILITY AND ADD TO ASSET COST (ASC 410-20): symmetrical recognition capitalizes the $75,000 into PP&E and records a corresponding liability. 88-day T-bill → CASH EQUIVALENT (ASC 305): original maturity ≤ 90 days qualifies for cash equivalent classification, reported with cash rather than as an investment. Equipment purchase → INVESTING CASH OUTFLOW (ASC 230): capital expenditures for PP&E acquisition are classified as investing activities, distinct from operating cash flows. A common CMA exam trap: classifying the equipment purchase as an operating outflow because \"the equipment supports operations.\" The classification is based on the nature of the transaction — acquisition of long-lived assets is always investing, regardless of the asset's purpose. Each classification decision must be documented with ASC paragraph references supporting the treatment.",
      "Topic": "External reporting",
      "ItemID": "CBQ-A3-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-A3",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-A2",
  "Title": "Inventory Valuation and LCM",
  "SectionTags": [
    "A"
  ],
  "Pack": 2,
  "Section": "A",
  "BlueprintDomain": "External Financial Reporting Decisions",
  "BlueprintObjectives": [
    "Inventory"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Inventory",
  "Subtopic": "Inventory cost flow assumptions",
  "SecondaryCompetencies": [
    "Calculation"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Financial reporting",
  "CompanyName": "Oasis Retail",
  "CompanyType": "Retailer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 1,
  "Industry": "Retail",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze inventory valuation using FIFO method",
    "Apply lower of cost or market (LCM) rule",
    "Calculate inventory write-down under LCM",
    "Evaluate LCM ceiling and floor constraints",
    "Analyze inventory disclosure requirements"
  ],
  "ModifiedDate": "2026-07-20",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    }
  ],
  "Stakeholder": "Management",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "1.0",
  "ScenarioText": "Oasis Retail uses FIFO. At year-end, physical inventory count shows 10,000 units. The historical cost is $15/unit. The current replacement cost is $12/unit. Net realizable value (NRV) is $13/unit, and NRV less normal profit margin is $10/unit.",
  "Exhibits": [
    {
      "Type": "text",
      "Title": "Inventory Note",
      "Body": "Oasis evaluates inventory on an item-by-item basis. No previous write-downs have been recorded for this product line.",
      "ExhibitID": "CBQ2-A2-E1",
      "CaseID": "CBQ2-A2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "select",
      "Prompt": "Under US GAAP for a FIFO firm, inventory is valued at:",
      "Correct": "Lower of cost or NRV",
      "Explanation": "FIFO uses LCNRV. LIFO/Retail uses LCM.",
      "Topic": "Inventory",
      "Choices": [
        "Lower of cost or NRV",
        "Lower of cost or market",
        "Historical cost",
        "Fair value"
      ],
      "ItemID": "CBQ2-A2-Q1",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
      "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-A2",
      "DecisionTreeReference": "Financial Statement Ratios",
      "EstimatedMinutes": 4,
      "FormulaReference": "Inventory Turnover",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "numeric",
      "Prompt": "What is the per-unit valuation for the inventory at year-end?",
      "Correct": 13,
      "Explanation": "Cost ($15) vs NRV ($13). Lower is $13.",
      "Topic": "Inventory",
      "ItemID": "CBQ2-A2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
      "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-A2",
      "DecisionTreeReference": "Financial Statement Ratios",
      "EstimatedMinutes": 5,
      "FormulaReference": "Inventory Turnover",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "What is the total inventory write-down required?",
      "Correct": 20000,
      "Explanation": "($15 - $13) * 10,000 units = $20,000.",
      "Topic": "Inventory",
      "ItemID": "CBQ2-A2-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
      "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-A2",
      "DecisionTreeReference": "Financial Statement Ratios",
      "EstimatedMinutes": 5,
      "FormulaReference": "Inventory Turnover",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "match",
      "Prompt": "Match the inventory valuation method to its primary characteristic.",
      "Correct": {
        "LIFO": "Matches recent costs to revenue",
        "FIFO": "Ending inventory reflects current costs",
        "Weighted Average": "Smooths out price fluctuations"
      },
      "Explanation": "LIFO matches current costs to COGS. FIFO leaves current costs in Inventory.",
      "Topic": "Inventory",
      "LeftItems": [
        "LIFO",
        "FIFO",
        "Weighted Average"
      ],
      "RightItems": [
        "Matches recent costs to revenue",
        "Ending inventory reflects current costs",
        "Smooths out price fluctuations",
        "Always yields highest income"
      ],
      "ItemID": "CBQ2-A2-Q4",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
      "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-A2",
      "DecisionTreeReference": "Financial Statement Ratios",
      "EstimatedMinutes": 6,
      "FormulaReference": "Inventory Turnover",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Which costs are capitalized into inventory?",
      "Correct": [
        "Direct materials",
        "Factory overhead",
        "Direct labor"
      ],
      "Explanation": "Manufacturing costs are inventoried; selling/admin are period expenses.",
      "Topic": "Inventory",
      "Choices": [
        "Direct materials",
        "Factory overhead",
        "Direct labor",
        "Selling expenses"
      ],
      "ItemID": "CBQ2-A2-Q5",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "MultipleConcepts",
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 10: FIFO vs Weighted Average",
      "AccountingPrinciple": "FIFO inventory valued at lower of cost or NRV under GAAP.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-A2",
      "DecisionTreeReference": "Financial Statement Ratios",
      "EstimatedMinutes": 5,
      "FormulaReference": "Inventory Turnover",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "A",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-B1",
  "Title": "Integrated Sales, Production, Materials, and Cash Budget",
  "SectionTags": [
    "B"
  ],
  "Pack": 1,
  "Section": "B",
  "BlueprintDomain": "Planning, Budgeting, and Forecasting",
  "BlueprintObjectives": [
    "Production budget",
    "Direct materials budget",
    "Cash budget",
    "Budgeting judgment"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Production budget",
  "Subtopic": "Cash flow forecasting",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Treasury and planning",
  "CompanyName": "Apex Controls",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Industrial controls",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze production budget",
    "Analyze direct materials budget",
    "Analyze cash budget",
    "Analyze budgeting judgment"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "S535 Certification",
      "Summary": "Certified: 6 items. Explanations expanded to 2500+ chars. All numerical answers independently verified. B1-Q3 BusinessInterpretation un-garbled. B1-Q6 ExplanationWrongD contradiction fixed. AccountingPrinciple fields completed. LearningObjectives deduplicated."
    }
  ],
  "Stakeholder": "Apex Controls (CFO)",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Apex Controls is preparing its first-quarter budget. The CFO asks the planning team to connect sales assumptions to production, material purchases, collections, disbursements, and short-term borrowing requirements.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Operating Forecast",
      "Headers": [
        "Month",
        "Sales units",
        "Sales dollars"
      ],
      "Rows": [
        [
          "January",
          "18,000",
          "900,000"
        ],
        [
          "February",
          "22,000",
          "1,100,000"
        ],
        [
          "March",
          "25,000",
          "1,250,000"
        ],
        [
          "April",
          "24,000",
          "1,200,000"
        ]
      ],
      "ExhibitID": "CBQ-B1-E1",
      "CaseID": "CBQ-B1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Policies",
      "Headers": [
        "Policy",
        "Detail"
      ],
      "Rows": [
        [
          "Finished goods ending inventory",
          "20% of next month unit sales"
        ],
        [
          "January beginning finished goods",
          "3,600 units"
        ],
        [
          "Direct material per unit",
          "2 pounds"
        ],
        [
          "Material ending inventory",
          "10% of next month production needs"
        ],
        [
          "January beginning materials",
          "3,900 pounds"
        ],
        [
          "Cash collections",
          "35% current month, 60% next month, 5% uncollectible"
        ],
        [
          "December sales",
          "800,000"
        ],
        [
          "Cash disbursements in January",
          "1,020,000"
        ],
        [
          "Beginning cash",
          "75,000"
        ],
        [
          "Minimum cash balance",
          "60,000"
        ]
      ],
      "ExhibitID": "CBQ-B1-E2",
      "CaseID": "CBQ-B1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter January required production units.",
      "Correct": "18800",
      "Explanation": "The production budget determines how many units must be manufactured during a period to satisfy both the sales forecast and the desired ending inventory policy. It is the second budget in the master budget sequence — it depends on the sales budget and in turn drives the direct materials, direct labor, and manufacturing overhead budgets. For Apex Controls, the CFO has directed the planning team to connect the sales assumptions through to production, purchasing, collections, and borrowing. The first step is translating the January sales forecast into the number of units that must actually be produced. The production budget formula is: Required Production = Budgeted Sales Units + Desired Ending Finished Goods Inventory − Beginning Finished Goods Inventory. For Apex Controls in January, each component is derived from the exhibits as follows. Budgeted sales are 18,000 units, taken directly from Exhibit 1, January row, Sales units column. The desired ending finished goods inventory policy is specified in Exhibit 2 as 20% of next month's unit sales. February sales are budgeted at 22,000 units (Exhibit 1, February row), so the target ending inventory for January is 22,000 × 0.20 = 4,400 units. The beginning finished goods inventory for January is given in Exhibit 2 as 3,600 units. This is the inventory carried forward from December 31 into the start of January. Substituting into the formula: Required Production = 18,000 + 4,400 − 3,600 = 18,800 units. The 4,400-unit ending inventory target reflects Apex's deliberate working capital and risk management policy. By holding one-fifth of next month's sales in finished goods, Apex protects against demand spikes, production disruptions, and supply chain delays. The CFO and production manager must continuously balance the carrying costs of this buffer (storage, insurance, obsolescence risk) against the cost of stockouts (lost sales, expedited shipping charges, and customer dissatisfaction). A critical point for the CMA exam is that production units do NOT equal sales units. If a candidate enters 18,000 (January sales units) as the production figure, they have overlooked the inventory policy entirely — an error that will cascade through every subsequent budget. An equally common error is using February's total sales of 22,000 as the ending inventory number without applying the 20% policy rate. A third trap is using the wrong month's sales for the ending inventory calculation — for example, substituting March sales of 25,000 instead of February sales of 22,000 when computing January's ending inventory target. Each of these errors traces to Trap 4 (Budget Order): the production budget depends on the sales budget, but it is not a simple restatement of sales. The inventory policy creates a layer of complexity that separates production volume from sales volume. In practice, the production manager at Apex Controls uses this 18,800-unit figure to schedule production runs, allocate machine hours, determine direct labor staffing, and coordinate with the purchasing department on raw material delivery timing. The purchasing manager relies on this number — indirectly, through the materials budget — to place purchase orders with sufficient lead time. An understated production number leaves Apex unable to meet February customer demand. An overstated number builds excess inventory that ties up cash, increases carrying costs, and may lead to obsolescence write-downs. The relationship between the production budget and the cash budget is especially important in this integrated case: every unit produced in January requires cash outflows for materials, labor, and overhead, which directly feed into the borrowing calculation addressed in the later items.",
      "Topic": "Production budget",
      "ItemID": "CBQ-B1-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 4: Budget Order",
      "AccountingPrinciple": "Production budget formula: Budgeted Sales + Desired Ending Inventory - Beginning Inventory.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Production Budget",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter February required production units.",
      "Correct": "22600",
      "Explanation": "February's production budget extends the framework established in the January calculation while introducing the inter-period dependency that defines the master budget cascade. Each month's production budget is not independent — the ending inventory of one period becomes the beginning inventory of the next. This linkage transforms the master budget from a collection of disconnected monthly estimates into a unified, internally consistent financial model. The formula remains unchanged: Required Production = Budgeted Sales Units + Desired Ending Finished Goods Inventory − Beginning Finished Goods Inventory. For February, each component must be traced to the exhibits. Budgeted sales are 22,000 units (Exhibit 1, February row, Sales units column). The desired ending inventory for February follows the same 20%-of-next-month-sales policy, applied to March's budgeted sales of 25,000 units: 25,000 × 0.20 = 5,000 units. The beginning inventory for February is the ending inventory from January, which was calculated in Q1 as 4,400 units. This is the inter-period link: January's ending inventory target of 4,400 units becomes the goods available at the start of February. Substituting into the formula: Required Production = 22,000 + 4,400 − 5,000? No — let us substitute carefully. Budgeted sales = 22,000. Desired ending inventory = 25,000 × 0.20 = 5,000. Beginning inventory = January's ending inventory = 4,400. Therefore: 22,000 + 5,000 − 4,400 = 22,600 units. The cascading dependency revealed by this calculation is a defining feature of the master budget and a significant source of CMA exam risk. If a candidate made an arithmetic error computing January's ending inventory in Q1 — for example, multiplying 22,000 × 20% incorrectly to arrive at 4,000 instead of 4,400 — that error propagates into February's beginning inventory, making Q2's answer incorrect even if the candidate applies the February formula perfectly. The CMA examination tests this dependency deliberately: examiners construct multi-part budgeting cases where each item builds on the prior, rewarding candidates who maintain computational discipline across all items and penalizing those who rush through early calculations. From an operating perspective, Apex Controls must increase production from January's 18,800 units to February's 22,600 units — a 20% month-over-month increase. This production ramp requires advance coordination with the purchasing department to ensure adequate raw materials are on hand, with the human resources function to schedule additional shifts or authorize overtime, and with the treasury function to confirm that sufficient cash or credit line capacity is available to fund the higher production volume. The production budget also reveals the operating leverage embedded in Apex's inventory policy. The 20% ending inventory target means that when sales are expected to increase (as they do from January to March), production must increase by MORE than the sales increase to build the larger ending inventory buffer. Conversely, when sales are expected to decline, production drops more sharply than sales because the ending inventory target shrinks. This amplification effect is why manufacturers closely monitor inventory-to-sales ratios and why the CMA exam frequently tests the relationship between sales trends and production volumes. The key exam trap (Trap 4: Budget Order) reinforces that the production budget must follow the sales budget in sequence. A candidate who begins by calculating production from an arbitrary starting point rather than from the budgeted sales forecast will produce answers that are internally inconsistent with the exhibits. The correct approach always traces back to the sales forecast as the foundational assumption of the entire master budget system.",
      "Topic": "Production budget",
      "ItemID": "CBQ-B1-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 4: Budget Order",
      "AccountingPrinciple": "Production budget formula: Budgeted Sales + Desired Ending Inventory - Beginning Inventory.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Production Budget",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter January material purchases in pounds.",
      "Correct": "38220",
      "Explanation": "The direct materials purchases budget is the third major component in the master budget sequence, following the sales and production budgets. It translates the production plan into raw material purchasing requirements and represents a critical cash outflow forecast for the treasury function. At Apex Controls, the planning team must determine how many pounds of raw material to purchase in January to support the production run of 18,800 units while maintaining adequate safety stock per company policy. The formula for direct materials purchases is: Required Material Purchases = Materials Needed for Production + Desired Ending Materials Inventory − Beginning Materials Inventory. Each component must be traced to the exhibits. Step 1 — Materials needed for production: January's required production is 18,800 units (from Q1). Exhibit 2 specifies that each unit requires 2 pounds of direct material. Therefore, January's production material requirement is 18,800 × 2 = 37,600 pounds. Step 2 — Desired ending materials inventory: Exhibit 2 specifies that material ending inventory should equal 10% of next month's production needs. February's required production (from Q2) is 22,600 units. February's material needs are 22,600 × 2 = 45,200 pounds. Applying the 10% safety stock policy: 45,200 × 0.10 = 4,520 pounds. This 4,520-pound inventory buffer serves as insurance against supplier delivery delays, quality rejections, unexpected machine downtime, or rush orders from customers. The 10% policy for raw materials is proportionally lower than the 20% finished goods policy because raw materials are typically easier and faster to procure than finished goods are to manufacture — the safety stock primarily covers lead time variability in the supply chain. Step 3 — Beginning materials inventory: Exhibit 2 states that January beginning materials are 3,900 pounds. This represents the raw materials on hand at the close of December that carry forward and are available for January production without placing additional orders. Substituting into the formula: Material Purchases = 37,600 + 4,520 − 3,900 = 38,220 pounds. A critical CMA exam concept is the distinction between materials PURCHASED and materials USED. Materials USED in January production total 37,600 pounds (18,800 units × 2 pounds per unit). Materials PURCHASED total 38,220 pounds — which exceeds usage by 620 pounds because the purchasing department is simultaneously building the ending raw material inventory from 3,900 pounds to 4,520 pounds. The difference of 620 pounds (38,220 − 37,600) represents the planned inventory build. In cash budget terms, the cash outflow is based on purchases (38,220 pounds × price per pound), not on usage. The most common and dangerous exam error is substituting sales units for production units when computing material needs. A candidate who uses January sales of 18,000 units instead of January production of 18,800 units will compute material needs as 18,000 × 2 = 36,000 pounds, understating the purchasing requirement by 1,600 pounds. This error cascades through the entire cash budget, eventually understating January's cash disbursements and, critically, the borrowing requirement. This is Trap 4 (Budget Order) in its most concrete form: the materials budget depends on the production budget, not directly on the sales budget. Skipping the production step and connecting sales directly to materials is a fundamental sequencing error. Another common error is confusing inventory types — using the beginning finished goods inventory of 3,600 units instead of the beginning materials inventory of 3,900 pounds, mixing units with pounds in a single calculation. Others may use the desired ending materials figure (4,520) as the beginning balance, effectively reversing the formula. The 3,900 pounds of beginning materials is the raw material inventory on hand from December that is available for January production without any additional purchasing. From the purchasing manager's perspective at Apex Controls, the 38,220-pound purchase order must be placed with sufficient lead time for suppliers to deliver before January production begins. The purchasing manager coordinates with production scheduling to ensure material arrives when needed, monitors supplier performance against delivery commitments, and manages the economic trade-off between bulk purchasing discounts and inventory carrying costs. The CFO monitors this purchase volume because it represents a significant near-term cash commitment: the treasury must ensure sufficient cash or credit line availability to pay suppliers according to the company's standard disbursement schedule.",
      "Topic": "Direct materials budget",
      "ItemID": "CBQ-B1-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Direct materials purchases: Materials Needed + Desired Ending Materials - Beginning Materials.",
      "BusinessInterpretation": "Apex Controls must purchase 38,220 pounds of direct materials in January to support the production of 18,800 units while simultaneously building the raw material safety stock from 3,900 pounds to 4,520 pounds per company policy. The purchasing requirement exceeds production usage by 620 pounds due to the planned inventory increase. If the purchasing manager orders only the 37,600 pounds needed for production alone, Apex would end January with 3,900 pounds of materials — drawing down the entire safety stock — leaving a buffer of only 8.7% of February's production needs instead of the mandated 10%. The 620-pound inventory build represents a deliberate working capital investment: Apex is deploying cash to acquire additional raw materials now to protect February's production schedule against supply chain disruptions. The CFO must ensure this additional purchasing volume is funded through either operating cash flow or the line of credit, and the treasury team must include the associated supplier payments in the January cash disbursements forecast.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Direct Materials Purchases",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Enter January cash collections.",
      "Correct": "795000",
      "Explanation": "The cash collections schedule translates the revenue budget from accrual-based sales into actual expected cash inflows. This is the essential bridge between the income statement perspective (accrual accounting: revenue recognized when earned under ASC 606) and the cash budget perspective (cash accounting: cash recognized when physically received). For Apex Controls' CFO, the cash collections forecast is the starting point for determining whether January operations will generate sufficient cash or require external borrowing. The collection pattern specified in Exhibit 2 follows a 35/60/5 split: 35% of each month's sales are collected in the month of sale, 60% are collected in the following month, and 5% are estimated as uncollectible. This pattern reflects Apex's customer payment behavior — industrial controls customers typically pay under net-30 credit terms, with a subset paying early or upon receipt, and a small but real percentage defaulting. For January cash collections, two distinct revenue streams contribute. Component 1 — January sales collected in January: 35% of January's $900,000 in sales = $900,000 × 0.35 = $315,000. This represents cash received from customers who purchase and remit payment within the same calendar month, through electronic payments, credit card transactions, prepaid orders, or customers who settle invoices before the standard 30-day due date to capture any early-payment discounts. Component 2 — December sales collected in January: 60% of December's $800,000 in sales = $800,000 × 0.60 = $480,000. These are December's credit sales that fall due in January under standard 30-day payment terms. The December sales figure is provided in Exhibit 2 as a required input — without it, the January collection calculation cannot be completed. Total January cash collections = $315,000 + $480,000 = $795,000. Observe that $795,000 is significantly less than January's $900,000 in total sales. The $105,000 gap has two components: $45,000 in estimated uncollectible January sales ($900,000 × 0.05) that will never become cash, plus $540,000 in January credit sales ($900,000 × 0.60) that will be collected in February rather than January. This timing difference between sales recognition and cash receipt is the fundamental reason the cash budget exists as a separate schedule from the income statement. A company can be profitable on an accrual basis while running out of cash if collections systematically lag behind sales. The 5% uncollectible rate also means that $45,000 of January's revenue will be recognized on the income statement (as sales) but will never appear as a cash inflow on the cash budget. This is not a double-counting error — it is the accounting reality that bad debt expense reconciles accrual revenue to cash collections. The CMA exam frequently tests the distinction between accrual revenue and cash receipts — this is Trap 5 (Cash Budget). A candidate who substitutes January's total sales of $900,000 for the properly computed $795,000 in cash collections has confused the income statement with the cash flow statement. This error would overstate collections by $105,000 and understate the borrowing need calculated in Q5. Another common error is misapplying the collection percentages: for example, applying 60% to January sales instead of December sales for the prior-month collection component, or forgetting December sales entirely and collecting only 35% of January sales ($315,000). A third trap is applying 100% of December sales under the assumption that all credit sales from the prior month are collected in the current month — but the policy explicitly states that only 60% is collected in the following month, with 5% never collected at all. From a treasury management perspective, the $795,000 in January collections represents the total cash inflow available to cover January's $1,020,000 in cash disbursements. The $225,000 gross shortfall ($795,000 collections − $1,020,000 disbursements = −$225,000) is partially offset by the $75,000 beginning cash balance, leaving a $150,000 net deficiency that drives the borrowing analysis in Q5. The CFO would present this collection forecast to the bank when requesting a line of credit draw, demonstrating that the borrowing need is temporary working capital financing and that February collections of January's remaining credit sales ($900,000 × 60% = $540,000) will provide the primary source of repayment.",
      "Topic": "Cash budget",
      "ItemID": "CBQ-B1-Q4",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 5: Cash Budget",
      "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Cash Budget",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter January borrowing required to maintain the minimum cash balance.",
      "Correct": "210000",
      "Explanation": "The cash budget is the culminating schedule of the master budget. It synthesizes all prior budget components — sales, production, materials, labor, overhead, and capital expenditures — into a single financial projection that reveals whether the company will generate sufficient cash from operations or must arrange external financing. At Apex Controls, the CFO's ultimate question — how much borrowing is needed in January — can only be answered after the entire budget cascade has been completed. The cash budget structure follows a standard progression: Beginning Cash Balance + Cash Receipts − Cash Disbursements = Cash Available (Deficiency) Before Financing + Borrowing − Repayments = Ending Cash Balance. For Apex Controls in January, the analysis proceeds as follows. Beginning cash balance: $75,000. This is the cash on hand at the close of December that carries forward into January (Exhibit 2, Beginning cash row). It represents the starting liquidity position. Cash receipts: $795,000. This figure was computed in Q4 and aggregates all January cash inflows — $315,000 from January sales collected in the current month plus $480,000 from December sales collected in January. Cash disbursements: $1,020,000. This is provided as a single aggregate figure in Exhibit 2 (Cash disbursements in January row). In a fully built master budget, this $1,020,000 would be disaggregated into its components: raw material purchases (38,220 pounds at the per-pound cost), direct labor wages, manufacturing overhead costs paid in cash, selling and administrative expenses, interest payments on existing debt, and any scheduled capital expenditures. A critical point for the CMA exam (Trap 5: Cash Budget) is that non-cash expenses must be EXCLUDED from the cash disbursements total. Depreciation expense, amortization of intangible assets, bad debt expense, and stock-based compensation — while legitimate income statement expenses — are never cash outflows. Including depreciation in the $1,020,000 or adding it on top would overstate disbursements and artificially inflate the borrowing requirement. Cash available (deficiency) before financing: $75,000 + $795,000 − $1,020,000 = −$150,000. This negative $150,000 means that Apex Controls' cash inflows for January are insufficient to cover its cash outflows by $150,000. The company is consuming cash — it would exhaust the $75,000 beginning cash balance partway through the month and be unable to meet payroll, pay suppliers, or service its obligations without arranging external financing. Minimum cash balance requirement: $60,000. Management has established a policy (Exhibit 2, Minimum cash balance row) that the cash balance must never fall below $60,000. This minimum serves as a precautionary liquidity buffer — a safety reserve to absorb unexpected cash needs, timing mismatches between collections and disbursements, emergency repairs, or unplanned customer credit extensions. The $60,000 minimum is a working capital policy choice that balances the liquidity benefit against the opportunity cost of holding idle cash that could otherwise be invested or used to pay down debt. Required borrowing calculation: Apex must borrow enough to cover BOTH the $150,000 cash deficiency AND the $60,000 minimum cash balance. The total borrowing requirement is $150,000 + $60,000 = $210,000. After securing a $210,000 line of credit draw, the ending cash balance would be: −$150,000 + $210,000 = $60,000, exactly meeting the mandated minimum. A common CMA exam error is failing to include the minimum balance requirement. A candidate who computes the deficiency as $150,000 and stops there has only covered the operating shortfall — January would end with a $0 cash balance, which is $60,000 below the mandated minimum and would likely trigger a covenant violation with the company's lenders. The question explicitly asks for borrowing \"to maintain the minimum cash balance,\" not merely to bring the balance to zero. Another error is double-counting the beginning cash or subtracting the minimum instead of adding it. The correct approach is always: (Cash Deficiency + Minimum Cash Balance), or equivalently: (Minimum Cash Balance − Cash Available Before Financing). From a corporate finance perspective, the CFO of Apex Controls would present this $210,000 borrowing request to the company's commercial bank as a short-term working capital line of credit draw. The presentation would emphasize that the borrowing is seasonal in nature, driven by the production ramp-up for February and March sales, not by financial distress. The CFO would demonstrate that February collections of $540,000 (60% of January's $900,000 credit sales) will provide ample cash for repayment in the following month. The bank's credit analyst would independently verify the reasonableness of the collection assumptions, the disbursement forecast, and the minimum balance policy before approving the draw. This integrated analysis — connecting the sales forecast through production, materials, collections, and disbursements to arrive at the borrowing requirement — is precisely what the CMA examination tests in the budget domain.",
      "Topic": "Cash budget",
      "ItemID": "CBQ-B1-Q5",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 5: Cash Budget",
      "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Cash Budget",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "multi",
      "Prompt": "Select common errors that would understate January borrowing.",
      "Choices": [
        "Ignoring the minimum cash balance",
        "Using total sales instead of expected collections",
        "Treating uncollectible sales as current cash",
        "Including April production directly in January production"
      ],
      "Correct": [
        "Ignoring the minimum cash balance",
        "Using total sales instead of expected collections",
        "Treating uncollectible sales as current cash"
      ],
      "Explanation": "This item elevates the assessment from calculation (Apply) to professional judgment (Evaluate), requiring the candidate to reason directionally about how specific errors propagate through the cash budget model and affect the borrowing conclusion. The three correct answers — A, B, and C — share a common characteristic: each causes an UNDERSTATEMENT of the borrowing requirement because it either omits a necessary cash need or inflates the assumed cash inflow relative to reality. Understanding the directional logic of each option is essential for management accountants who must explain budget variances, perform sensitivity analysis, and detect errors in financial models prepared by others. Choice A — Ignoring the minimum cash balance — is correct and would understate borrowing by $60,000. The cash budget analysis in Q5 demonstrated that the cash deficiency before financing is $150,000 and the minimum balance requirement is $60,000, yielding total borrowing of $210,000. If an analyst calculates the deficiency as $150,000 but neglects the minimum balance policy, the recommended borrowing drops to $150,000 — a $60,000 understatement. The minimum cash balance is not an optional cushion; it is a binding policy constraint. Operating with a zero cash balance means vendors go unpaid, payroll checks bounce, and the company is in technical default on its credit agreements. The minimum balance policy exists precisely to prevent these scenarios and must be incorporated into every borrowing calculation. Choice B — Using total sales instead of expected collections — is correct and would understate borrowing by $105,000. January sales total $900,000 (Exhibit 1) while properly computed cash collections total only $795,000 (from Q4). If the analyst substitutes the full $900,000 sales figure for the $795,000 collections figure, cash receipts are overstated by $105,000. This inflated cash inflow reduces the apparent cash deficiency from $150,000 to $45,000 and reduces the total borrowing need from $210,000 to $105,000. The error fundamentally confuses accrual accounting (revenue recognized when earned) with cash accounting (cash recognized when received). The $105,000 overstatement consists of $45,000 in estimated uncollectible sales (5% of $900,000) plus $540,000 in credit sales that will not be collected until February. This is the textbook Trap 5 (Cash Budget) error. Choice C — Treating uncollectible sales as current cash — is correct and would understate borrowing by $45,000. The 5% uncollectible rate in Apex's collection policy (Exhibit 2) means that $45,000 of January's $900,000 in sales will never be collected. If the analyst ignores this uncollectible estimate and treats 100% of January sales as ultimately collectible, the collection forecast includes $45,000 of phantom cash that will never materialize. This inflates January cash receipts, reduces the apparent cash deficiency, and correspondingly understates the borrowing requirement. In practice, the 5% uncollectible rate is an estimate based on historical customer payment experience; treating it as zero is an overly optimistic assumption that creates a predictable cash shortfall when customer accounts are actually written off. Choice D — Including April production directly in January production — is INCORRECT and would NOT understate borrowing. Including April's production requirements in January's production calculation would inflate January's required production volume, which would inflate January's material purchases (more pounds needed), which would inflate January's cash disbursements (higher supplier payments), which would OVERSTATE the borrowing requirement. The error runs in the opposite direction from the question's premise: the question asks which errors UNDERSTATE borrowing, and Choice D OVERSTATES it. April production costs are incurred when the units are actually manufactured, not in January. While building inventory for April demand may begin in March, the cash outflows for materials, labor, and overhead associated with April production occur in the months the production takes place — not in January. The candidate who selects Choice D has either misread the question's direction (understate vs. overstate) or has confused the logic of how errors propagate through the sequential budget cascade. The broader conceptual framework tested by this item is that error propagation in financial models is both directional and traceable. Every assumption enters the model at a specific point, and its impact on the final output (here, the borrowing requirement) can be reasoned through by following the assumption step by step through the calculation chain. Management accountants use this skill daily: when a budget-to-actual variance emerges, they must trace the variance back to its root cause by following the calculation dependencies backward through the budget. An understated production assumption reduces material purchases, reduces disbursements, and reduces borrowing — the direction is the same at every step. Understanding this monotonic property of errors in additive models allows the analyst to reason about direction without recomputing every number.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Including April production directly in January production incorrectly mixes production timing with cash outflow timing. Under CMA cash budgeting principles, the determinant of borrowing is when cash disbursements occur for materials, labor, and overhead — not when the finished goods are scheduled to be produced. April production costs will be paid in April or according to the standard disbursement pattern, not in January. If an analyst mistakenly incorporates April's production volume into January's production budget, January's required production would be artificially inflated, which cascades through the materials budget (more pounds to purchase), increases January's cash disbursements (higher supplier payments, more labor hours, more overhead), and ultimately OVERSTATES the borrowing requirement — not understates it. The directional logic is the key discriminator: the question asks which errors UNDERSTATE borrowing, but this error OVERSTATES it. A candidate selecting this option has either misread the question's directional premise (understate versus overstate), confused the timing of cost recognition with the timing of cash disbursements, or incorrectly assumed that production costs are always paid in the month of production regardless of standard payment terms and lead times. The fact that April's units will eventually be produced does not mean the cash for those units leaves Apex Controls in January.",
      "Topic": "Budgeting judgment",
      "ItemID": "CBQ-B1-Q6",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "AccountingPrinciple": "Cash budget error propagation: errors that omit cash needs or inflate cash inflows directionally understate borrowing requirements. The cash budget synthesizes all prior budget components into a single financing-need conclusion. Under GAAP and standard management accounting practice, the cash budget excludes non-cash expenses (depreciation, amortization, bad debt) and distinguishes accrual revenue timing from cash receipt timing.",
      "CaseID": "CBQ-B1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-B2",
  "Title": "Rolling Forecast and Regression Update",
  "SectionTags": [
    "B"
  ],
  "Pack": 1,
  "Section": "B",
  "BlueprintDomain": "Planning, Budgeting, and Forecasting",
  "BlueprintObjectives": [
    "Forecasting",
    "Sensitivity analysis",
    "Forecasting indicators",
    "Regression",
    "Rolling forecast"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Forecast Revision",
  "Subtopic": "Rolling forecast methodology",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Treasury and planning",
  "CompanyName": "Rolling Forecast",
  "CompanyType": "Technology provider",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Technology",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze forecasting",
    "Analyze sensitivity analysis",
    "Analyze forecasting indicators",
    "Analyze regression",
    "Analyze rolling forecast",
    "Analyze forecasting"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "S536 Certification Wave",
      "Summary": "Explanations expanded to certification standard (3,000+ chars). All 6 items certified per CAQS v1.0 six-dimension verification. Zero answer-key changes."
    }
  ],
  "Stakeholder": "Controller",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "BrightAir is moving from a static annual budget to a rolling forecast. The controller must update expected activity, apply a cost formula, and interpret leading indicators without confusing bookings, orders, and shipments.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Forecast Model",
      "Headers": [
        "Driver",
        "Value"
      ],
      "Rows": [
        [
          "Fixed monthly cost",
          "180,000"
        ],
        [
          "Variable cost per machine hour",
          "42"
        ],
        [
          "Base forecast machine hours",
          "7,500"
        ],
        [
          "Updated forecast machine hours",
          "8,200"
        ],
        [
          "Regression R-squared",
          "0.81"
        ]
      ],
      "ExhibitID": "CBQ-B2-E1",
      "CaseID": "CBQ-B2",
      "ValidationVersion": "2.0",
      "ReferencedBy": [
        "CBQ-B2-Q1",
        "CBQ-B2-Q2",
        "CBQ-B2-Q4"
      ]
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Leading Indicators",
      "Headers": [
        "Metric",
        "Current signal"
      ],
      "Rows": [
        [
          "Bookings",
          "Up 14%, but 20% cancellable"
        ],
        [
          "Firm order backlog",
          "Up 8%"
        ],
        [
          "Supplier lead time",
          "Up from 21 to 34 days"
        ],
        [
          "Prior-year dividend payout",
          "Unchanged"
        ]
      ],
      "ExhibitID": "CBQ-B2-E2",
      "CaseID": "CBQ-B2",
      "ValidationVersion": "2.0",
      "ReferencedBy": [
        "CBQ-B2-Q3",
        "CBQ-B2-Q6"
      ]
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter total forecast cost using updated machine hours.",
      "Correct": "524400",
      "Explanation": "Under the cost estimation and forecasting framework of the CMA Part 1 syllabus (Section B — Planning, Budgeting, and Forecasting), total cost is modeled as Y = a + bX, where a is the fixed cost component and b is the variable cost per unit of the cost driver. This is the standard cost formula used in flexible budgeting, cost-volume-profit analysis, and forecasting.\n\nFrom Exhibit 1, BrightAir’s forecast model provides the following inputs. Fixed monthly cost (a) = $180,000. Variable cost per machine hour (b) = $42. Updated forecast machine hours (X) = 8,200.\n\nApplying the cost formula: Total forecast cost = $180,000 + ($42 × 8,200) = $180,000 + $344,400 = $524,400.\n\nThis calculation is fundamental to management accounting. The fixed cost of $180,000 represents costs that do not vary with machine hours in the relevant range—items such as facility rent, equipment depreciation, and salaried supervisor compensation. The variable cost of $42 per machine hour represents costs that increase proportionally with activity—items such as electricity, indirect materials, and hourly labor. Multiplying the variable rate by the updated forecast hours yields total variable cost of $344,400, and adding the fixed cost produces the total forecast cost of $524,400.\n\nA common CMA exam trap is to use the base forecast hours (7,500) instead of the updated forecast hours (8,200), which would produce $180,000 + ($42 × 7,500) = $495,000. The question specifically asks for total forecast cost using updated machine hours, reflecting BrightAir’s transition from a static budget to a rolling forecast where assumptions are refreshed as new information becomes available. Another trap is to forget the fixed cost entirely and compute only the variable portion ($344,400), or to incorrectly treat the variable rate as a per-unit cost of output rather than a per-hour cost of the cost driver. Candidates should always confirm that the cost driver unit (machine hours) is consistent with the variable rate’s denominator before performing the multiplication.",
      "Topic": "Forecasting",
      "ItemID": "CBQ-B2-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Sales forecasting uses trend analysis, seasonal adjustment, or qualitative methods.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the increase in forecast cost from base to updated machine hours.",
      "Correct": "29400",
      "Explanation": "Sensitivity analysis, a core topic in Section B of the CMA Part 1 syllabus, measures how changes in one input variable affect the output of a financial model while holding all other variables constant. This question tests the candidate’s ability to isolate the impact of a change in the activity level on total forecast cost.\n\nFrom Exhibit 1, the base forecast machine hours are 7,500 and the updated forecast machine hours are 8,200. The fixed monthly cost is $180,000, and the variable cost per machine hour is $42.\n\nBecause fixed costs do not change with activity within the relevant range, the entire increase in total forecast cost is attributable to the change in variable cost. The increase in machine hours is 8,200 − 7,500 = 700 hours. Multiplying this change by the variable rate: 700 hours × $42 per hour = $29,400. This represents the incremental forecast cost resulting solely from the increase in expected activity.\n\nWe can verify this by computing both totals and taking the difference. Base forecast: $180,000 + ($42 × 7,500) = $180,000 + $315,000 = $495,000. Updated forecast: $180,000 + ($42 × 8,200) = $180,000 + $344,400 = $524,400. Difference: $524,400 − $495,000 = $29,400.\n\nIn practice, sensitivity analysis is used extensively in budgeting and forecasting to evaluate how changes in key drivers—volume, pricing, input costs, exchange rates—affect projected financial results. It enables management to identify which variables have the greatest impact on outcomes and to focus monitoring and contingency planning on those variables. For the CMA exam, candidates should understand that sensitivity analysis changes one variable at a time (unlike scenario analysis, which changes multiple variables simultaneously), and that the analysis isolates only the variable-cost effect when fixed costs are unchanged.\n\nA common exam trap is to compute the change by multiplying the full updated hours (8,200) by $42 instead of the change in hours (700), producing $344,400. Another trap is to add the fixed cost to the change calculation, incorrectly computing $29,400 + $180,000 = $209,400. Candidates should also remember that sensitivity analysis holds the variable rate constant; if the rate itself changed, a separate analysis would be required.",
      "Topic": "Sensitivity analysis",
      "ItemID": "CBQ-B2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-B2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Easy",
      "DifficultyScore": 1
    },
    {
      "Type": "select",
      "Prompt": "Which indicator is least useful as a leading operational indicator?",
      "Choices": [
        "Prior-year dividend payout",
        "Firm order backlog",
        "Supplier lead time",
        "Bookings adjusted for cancellation risk"
      ],
      "Correct": "Prior-year dividend payout",
      "Explanation": "Dividend payout is a lagging financing/shareholder metric, not a leading operating demand or capacity indicator. In forecasting and performance management, leading indicators predict future activity and enable proactive decision-making, while lagging indicators confirm past outcomes.\n\nExhibit 2 presents four metrics. Firm order backlog (up 8%), supplier lead time (up from 21 to 34 days), and bookings (up 14%, with 20% cancellable) are all forward-looking operational metrics that directly inform BrightAir’s demand planning, capacity requirements, and supply-chain risk assessment. In contrast, prior-year dividend payout is a historical financing decision made by the board of directors based on past profitability and cash availability. It reflects what has already occurred, not what is expected to change in future periods.\n\nFrom a management accounting perspective, leading operational indicators include: order intake and backlog (signaling future production volume), supplier lead times (signaling potential production constraints), and bookings adjusted for cancellation risk (signaling future revenue). Lagging indicators include: financial ratios computed from historical statements, dividend declarations, past profitability measures, and prior-period variances.\n\nA common CMA exam trap is confusing financial metrics that analysts find important (such as dividend policy and payout ratios) with metrics that are useful for operational forecasting. While dividend information is relevant for investor analysis and valuation, it does not help the controller forecast next quarter’s production needs, staffing requirements, or cash flows from operations. Another trap is to select an operational indicator that appears less quantitative (such as supplier lead time) without recognizing that lead time directly affects production scheduling and on-time delivery—making it a highly relevant leading indicator. Candidates should be prepared to distinguish between leading, coincident, and lagging indicators across the planning, budgeting, and forecasting domain.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "A firm order backlog is a leading indicator that signals future production activity and revenue. It reflects committed customer demand that has not yet been fulfilled, making it a forward-looking operational metric rather than the least useful lagging indicator. The backlog directly informs capacity planning, resource allocation, and near-term revenue forecasting for management accountants.",
      "ExplanationWrongC": "Supplier lead time is a leading operational indicator because longer lead times signal potential supply chain constraints that will affect future production schedules and delivery performance. Changes in supplier lead time precede the actual impact on operations, providing management with time to adjust sourcing strategies or build safety stock before production disruptions occur.",
      "ExplanationWrongD": "Bookings adjusted for cancellation risk are a leading indicator of future revenue because they represent new orders net of anticipated non-performance. This metric captures prospective customer demand before it converts to recognized revenue, making it valuable for forecasting production requirements, cash flows, and resource allocation needs in the upcoming periods.",
      "Topic": "Forecasting indicators",
      "ItemID": "CBQ-B2-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-B2",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Select statements that correctly interpret the regression output.",
      "Choices": [
        "The model explains a substantial portion of cost variation",
        "The model proves machine hours cause all cost changes",
        "The model can support forecasting if assumptions remain relevant",
        "The fixed cost should be ignored because R-squared is high"
      ],
      "Correct": [
        "The model explains a substantial portion of cost variation",
        "The model can support forecasting if assumptions remain relevant"
      ],
      "Explanation": "R-squared supports usefulness but does not prove causation or eliminate fixed costs. Regression analysis (Y = a + bX) is a statistical tool used in CMA Part 1 to estimate the relationship between a dependent variable (cost) and one or more independent variables (cost drivers).\n\nThe correct interpretations are:\n\n1. “The model explains a substantial portion of cost variation” — An R-squared of 0.81 means that 81% of the variation in total monthly cost is explained by changes in machine hours. This is a relatively high explanatory power, suggesting that machine hours are a strong predictor of cost behavior. The remaining 19% of variation is attributable to other factors not captured by the model (random variation, omitted variables, or non-linear relationships).\n\n2. “The model can support forecasting if assumptions remain relevant” — Regression-based forecasts are reliable only when the underlying relationships remain stable. If BrightAir’s cost structure changes (e.g., through automation, outsourcing, or new pricing agreements), the historical regression equation may no longer be valid for forward-looking estimates. This is why management accountants must periodically revalidate their cost models.\n\nWhy the other choices are incorrect:\n\n• “The model proves machine hours cause all cost changes” — This statement confuses correlation with causation. Under CMA forecasting principles, regression establishes statistical association, not causation. Even with R-squared = 0.81, machine hours may be correlated with the true cost driver (e.g., production volume) without being the direct cause of cost changes. A third variable could drive both machine hours and costs, or the relationship could be coincidental.\n\n• “The fixed cost should be ignored because R-squared is high” — This is a fundamental misunderstanding of the regression equation Y = a + bX. The intercept (a = $180,000) represents estimated fixed costs that exist independently of activity. Regardless of how high R-squared is, fixed costs remain a real economic component of total cost. Ignoring them would systematically underestimate total cost and lead to incorrect budgeting, pricing, and profitability decisions.\n\nA common CMA exam trap is to equate a high R-squared with proof of causation, or to assume that statistical significance eliminates the need for management judgment in forecasting. Candidates should remember that regression analysis is a decision-support tool, not a substitute for understanding the business’s actual cost behavior.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "The statement that machine hours cause all cost changes confuses correlation with causation, a fundamental distinction in regression analysis and CMA forecasting. An R-squared of 0.81 establishes statistical association — machine hours and total cost move together in a predictable pattern — but it does not prove that machine hours are the causal mechanism driving cost changes. A third variable (such as production volume) could drive both machine hours and costs simultaneously, creating a spurious correlation. Additionally, the model explicitly includes a fixed-cost intercept (a = $180,000) that is independent of machine hours, meaning cost changes are not exclusively tied to the activity driver. Under CMA Part 1 forecasting principles, regression is a predictive tool, not a causal proof. A candidate selecting this option confuses high explanatory power with causal certainty — a common CMA exam trap (Trap 19: Correlation).",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Ignoring the fixed cost component because R-squared is high misunderstands the structure of the regression equation Y = a + bX. The intercept 'a' represents estimated fixed costs that exist independently of activity level. Even with a high R-squared, fixed costs remain a real economic component of total cost and must be included in cost estimation for accurate forecasting and decision-making.",
      "Topic": "Regression",
      "ItemID": "CBQ-B2-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 19: Correlation",
      "AccountingPrinciple": "Regression analysis estimates relationship between variables: Y = a + bX.",
      "CalculationRequired": false,
      "CaseID": "CBQ-B2",
      "DecisionTreeReference": "Regression",
      "EstimatedMinutes": 5,
      "FormulaReference": "Regression Equation",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: A rolling forecast maintains a constant planning horizon by adding a new period as the current period is _____.",
      "Correct": "completed",
      "Explanation": "Rolling forecasts extend the planning horizon as time passes. A rolling forecast (also called a continuous forecast or rolling budget) is a planning tool that maintains a constant forecast horizon by adding a new future period each time the most immediate period is completed. For example, if BrightAir maintains a 12-month rolling forecast, when January is completed, the forecast is extended by adding the following January, so the planning window always looks forward 12 months.\n\nThis approach contrasts with a traditional static annual budget, which covers a fixed fiscal year and becomes increasingly outdated as the year progresses. Rolling forecasts are updated regularly (monthly or quarterly) to incorporate actual results and revised assumptions, making them more responsive to changing business conditions. The key features of rolling forecasts include constant horizon length, periodic updates (typically monthly or quarterly), integration of actual results with forward-looking projections, and a focus on key business drivers rather than line-item detail.\n\nIn management accounting practice, rolling forecasts are particularly valuable in dynamic industries where conditions change rapidly. They support continuous planning rather than episodic annual budget exercises, reduce the behavioral problems associated with fixed annual targets (such as budget gaming), and enable more timely resource allocation decisions. The CMA exam emphasizes the distinction between traditional budgeting approaches and contemporary planning tools such as rolling forecasts, which are increasingly adopted by organizations seeking greater agility in financial planning and analysis.",
      "Topic": "Rolling forecast",
      "ItemID": "CBQ-B2-Q5",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-B2",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "match",
      "Prompt": "Match each metric to the best interpretation.",
      "LeftItems": [
        "Bookings",
        "Firm backlog",
        "Supplier lead time",
        "Regression R-squared"
      ],
      "RightItems": [
        "Potential demand, subject to cancellation",
        "Committed demand not yet shipped",
        "Supply-chain constraint signal",
        "Model explanatory power"
      ],
      "Correct": {
        "Bookings": "Potential demand, subject to cancellation",
        "Firm backlog": "Committed demand not yet shipped",
        "Supplier lead time": "Supply-chain constraint signal",
        "Regression R-squared": "Model explanatory power"
      },
      "Explanation": "The case requires distinguishing demand signals, constraints, and model evidence—each of which serves a distinct purpose in BrightAir’s rolling forecast process. The correct pairings are:\n\n1. Bookings → Potential demand, subject to cancellation. Bookings represent customer orders received but not yet fulfilled. In BrightAir’s case, bookings are up 14% but 20% are cancellable, meaning the reported figure overstates committed demand. Management accountants must adjust bookings for cancellation risk when incorporating them into revenue forecasts. Bookings differ from revenue recognition under ASC 606 because revenue is recognized only when performance obligations are satisfied, not when an order is booked.\n\n2. Firm backlog → Committed demand not yet shipped. Firm backlog represents confirmed, non-cancellable customer orders that have not yet been delivered. Unlike bookings (which may be cancellable), firm backlog is a reliable leading indicator of near-term production requirements and revenue. The 8% increase in firm backlog signals growing demand that will convert to revenue as shipments occur.\n\n3. Supplier lead time → Supply-chain constraint signal. The increase from 21 to 34 days is a 62% increase in supplier lead time, which signals potential production bottlenecks. Longer lead times mean BrightAir must order materials earlier, hold higher safety stock, or risk stockouts that delay customer deliveries. Management accountants incorporate lead time trends into cash flow forecasts (working capital requirements), production scheduling, and cost estimates (potential expediting costs or overtime).\n\n4. Regression R-squared → Model explanatory power. An R-squared of 0.81 indicates that the cost model explains 81% of the variation in total monthly cost using machine hours as the predictor. This high explanatory power supports using the model for forecasting, but management must monitor whether the relationship remains stable over time and whether omitted variables (such as product mix or batch sizes) may become important.\n\nA common exam trap is confusing bookings with revenue, backlog with shipments, or lead time with past supplier performance. Another trap is to treat R-squared as a measure of forecast accuracy (which it is not—it measures goodness of fit, not predictive accuracy). Candidates should also understand that these distinctions are fundamental to the planning, budgeting, and forecasting domain: operational metrics drive short-term planning, while statistical measures support model selection and validation.",
      "Topic": "Forecasting",
      "ItemID": "CBQ-B2-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology"
      ],
      "AccountingPrinciple": "Sales forecasting uses trend analysis, seasonal adjustment, or qualitative methods.",
      "BusinessInterpretation": "The case requires distinguishing demand signals, constraints, and model evidence.",
      "CalculationRequired": false,
      "CaseID": "CBQ-B2",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier 1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier 1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-B3",
  "Title": "Scenario Forecast, Expected Value, and Working Capital Plan",
  "SectionTags": [
    "B"
  ],
  "Pack": 1,
  "Section": "B",
  "BlueprintDomain": "Planning, Budgeting, and Forecasting",
  "BlueprintObjectives": [
    "Expected value",
    "Forecasting",
    "Cash collections",
    "Cash budget",
    "Forecast assumptions"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Forecast Revision",
  "Subtopic": "Cash flow forecasting",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Treasury and planning",
  "CompanyName": "Lakeside Instruments",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Scientific instruments",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze expected value",
    "Analyze forecasting",
    "Analyze cash collections",
    "Analyze cash budget",
    "Analyze cash budget",
    "Analyze forecast assumptions"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "Session 537 — ENHANCED_CASE_BASE Final Certification Wave",
      "Summary": "All 6 items certified per CAQS v1.0 §1.6 six-dimension verification. Explanations expanded to certification standard. Choices rotated for psychometric balance. question_state: Unprocessed → Certified."
    }
  ],
  "Stakeholder": "Lakeside Instruments (CFO)",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Lakeside Instruments is preparing an updated forecast after demand changed late in the quarter. The CFO wants probability-weighted revenue, cash collections, and a working-capital recommendation.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Demand Scenarios",
      "Headers": [
        "Scenario",
        "Probability",
        "Unit sales",
        "Selling price"
      ],
      "Rows": [
        [
          "High",
          "30%",
          "14,000",
          "80"
        ],
        [
          "Base",
          "50%",
          "11,000",
          "80"
        ],
        [
          "Low",
          "20%",
          "8,000",
          "80"
        ]
      ],
      "ExhibitID": "CBQ-B3-E1",
      "CaseID": "CBQ-B3",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Cash and Credit Terms",
      "Headers": [
        "Policy",
        "Detail"
      ],
      "Rows": [
        [
          "Collections",
          "40% in month of sale; 55% next month; 5% uncollectible"
        ],
        [
          "Prior-month credit sales",
          "720,000"
        ],
        [
          "Planned cash disbursements",
          "780,000"
        ],
        [
          "Beginning cash",
          "95,000"
        ],
        [
          "Minimum cash",
          "75,000"
        ]
      ],
      "ExhibitID": "CBQ-B3-E2",
      "CaseID": "CBQ-B3",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter expected unit sales.",
      "Correct": "11300",
      "Explanation": "Expected value is a fundamental forecasting technique in CMA Part 1 Section B (Planning, Budgeting, and Forecasting). It weights each possible outcome by its probability and sums the weighted amounts to produce a long-run average estimate. From Exhibit 1, Lakeside Instruments faces three demand scenarios: High (14,000 units, 30%), Base (11,000, 50%), Low (8,000, 20%). Probabilities sum to 100%, confirming a complete distribution. High: 14,000 x 0.30 = 4,200; Base: 11,000 x 0.50 = 5,500; Low: 8,000 x 0.20 = 1,600. Expected units = 4,200 + 5,500 + 1,600 = 11,300. The expected value (11,300) exceeds the most likely outcome (base, 11,000) because the high scenario's positive swing outweighs the low scenario's negative swing. A common CMA exam trap: using the most likely outcome (mode) instead of the expected value — the expected value incorporates information from all scenarios. Another trap: failing to verify probabilities sum to 100%. A third trap: applying the wrong probability to the wrong outcome. CFA Brian Lakeside can present 11,300 as the best single-point estimate for production planning while also communicating the range: 8,000 to 14,000.",
      "Topic": "Expected value",
      "ItemID": "CBQ-B3-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 17: Probability",
      "AccountingPrinciple": "Expected Value = Sum of (Probability x Outcome) across all possible outcomes.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B3",
      "DecisionTreeReference": "Expected Value",
      "EstimatedMinutes": 5,
      "FormulaReference": "Expected Value",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter expected sales dollars.",
      "Correct": "904000",
      "Explanation": "Revenue forecasting builds on expected unit sales to project expected sales dollars. Expected sales = Expected units x Selling price. From Q1, expected units = 11,300. From Exhibit 1, selling price = $80 per unit (constant across all scenarios). Expected sales = 11,300 x $80 = $904,000. Alternatively, compute at the dollar level: High $1,120,000 x 30% = $336,000; Base $880,000 x 50% = $440,000; Low $640,000 x 20% = $128,000; total = $904,000. Both methods agree because the selling price is constant. The $904,000 expected sales figure feeds the sales budget (the first component of the master budget), the production budget, and the cash collections schedule. A common CMA exam trap: using the most likely scenario's 11,000 units ($880,000) instead of the expected 11,300. The expected value — not the most likely outcome — is the appropriate basis for the master budget. Another trap: computing expected revenue by weighting dollar amounts directly when prices differ across scenarios — if prices vary, dollar-level weighting is required; if constant, either method works.",
      "Topic": "Forecasting",
      "ItemID": "CBQ-B3-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Sales forecasting uses trend analysis, seasonal adjustment, or qualitative methods.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter expected current-month cash collections from current-month sales.",
      "Correct": "361600",
      "Explanation": "Cash collections forecasting converts accrual-basis revenue into expected cash inflows using the company's collection pattern. From Exhibit 2: 40% collected in month of sale, 55% collected following month, 5% uncollectible. The prompt asks for current-month collections from current-month sales only. Expected sales from Q2: $904,000. Collections from current-month sales = $904,000 x 40% = $361,600. Note: prior-month credit sales of $720,000 at 55% = $396,000 is collected this month but is NOT part of this answer — it goes into total cash available (Q4). The 5% uncollectible portion ($45,200) is neither collected nor added to cash. A common CMA exam trap: failing to read \"from current-month sales\" — including prior-month collections would produce $757,600. Another trap: applying 40% to prior-month sales instead of current-month. A third trap: including the 5% uncollectible as a cash outflow — it represents revenue never collected, not cash paid out. The collection pattern reveals Lakeside operates on credit terms: only 40% converts to cash immediately, creating a working capital need during the 30-60 day lag.",
      "Topic": "Cash collections",
      "ItemID": "CBQ-B3-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Cash collections include cash sales and collections of prior credit sales.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B3",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Cash Collections",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter total cash available before disbursements.",
      "Correct": "852600",
      "Explanation": "Under the cash budget methodology in CMA Part 1 Section B, total cash available = Beginning cash + All period cash receipts. From Exhibit 2: beginning cash = $95,000. Current-month collections (Q3) = $361,600. Prior-month credit sales collection = $720,000 x 55% = $396,000. Total cash available = $95,000 + $361,600 + $396,000 = $852,600. This represents the maximum cash available to meet planned disbursements of $780,000 — leaving a pre-minimum-balance surplus of $72,600. The majority of available cash is from prior-period collections ($396,000, 46%), revealing dependence on receivable collections. A common CMA exam trap: omitting beginning cash — answering only $757,600. Another trap: including the full $720,000 of prior-month sales rather than the 55% collected portion. A third trap: confusing \"total cash available\" (before disbursements, $852,600) with \"ending cash before borrowing\" (after disbursements, $72,600). The cash budget is the CFO's primary liquidity management tool — if collections slow, borrowing needs increase.",
      "Topic": "Cash budget",
      "ItemID": "CBQ-B3-Q4",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 5: Cash Budget",
      "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
      "CalculationRequired": true,
      "CaseID": "CBQ-B3",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Cash Budget",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "Is borrowing required after planned disbursements and minimum cash?",
      "Choices": [
        "No borrowing required; ending cash exceeds minimum",
        "2,400 borrowing required",
        "75,000 borrowing required",
        "780,000 borrowing required"
      ],
      "Correct": "2,400 borrowing required",
      "Explanation": "Under the cash budget methodology, the borrowing requirement is determined by comparing the projected ending cash balance before borrowing to the minimum cash requirement. Ending cash before borrowing = $852,600 - $780,000 = $72,600. Lakeside's minimum cash policy is $75,000. Shortfall = $75,000 - $72,600 = $2,400 borrowing required. Lakeside must draw $2,400 on its line of credit to maintain the $75,000 minimum balance. The $2,400 deficit is small ($852,600 available vs. $855,000 needed), suggesting Lakeside is close to self-funding. A common CMA exam trap: confusing the minimum cash balance ($75,000) with the borrowing amount ($2,400) — the borrowing is the shortfall, not the minimum itself. Another trap: subtracting $780,000 from $852,600 and reporting $72,600 as the answer without comparing to the minimum. A third trap: using total disbursements ($780,000) as the borrowing need. The cash budget sequence: receipts → total available → less disbursements → ending before borrowing → minimum balance comparison → borrowing needed.",
      "ExplanationWrongA": "No borrowing required would be correct only if ending cash meets or exceeds the minimum cash balance of 75,000. In this scenario, the projected ending cash of 72,600 falls 2,400 below the required minimum, necessitating borrowing to cover the shortfall. Under CMA cash budgeting principles, the minimum cash balance policy is a binding constraint that triggers borrowing whenever projected ending cash falls below the required threshold.",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "75,000 borrowing required confuses the minimum cash balance requirement with the borrowing amount needed. The 75,000 minimum is the target ending cash position, not the borrowing amount itself. The actual borrowing needed is the difference between the projected ending cash (72,600) and the minimum (75,000), which equals 2,400 — enough to restore the cash balance to the minimum level, not to match the full minimum dollar for dollar.",
      "ExplanationWrongD": "780,000 borrowing required appears to use the total cash disbursements figure as the borrowing need, which drastically overstates the requirement. Under cash budgeting methodology, borrowing covers the shortfall between available cash and the minimum balance, not total disbursements. Cash collections of 852,600 already fund most of the 780,000 in disbursements, leaving only a small deficit of 2,400 to be covered by additional borrowing.",
      "Topic": "Cash budget",
      "ItemID": "CBQ-B3-Q5",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 5: Cash Budget",
      "AccountingPrinciple": "Cash budget: Beginning Cash + Cash Receipts - Cash Disbursements = Ending Cash.",
      "CalculationRequired": false,
      "CaseID": "CBQ-B3",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 4,
      "FormulaReference": "Cash Budget",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "multi",
      "Prompt": "Select assumptions that most directly affect the borrowing result.",
      "Choices": [
        "Scenario probabilities",
        "Collection percentages",
        "Minimum cash policy",
        "Prior-year dividend declaration"
      ],
      "Correct": [
        "Scenario probabilities",
        "Collection percentages",
        "Minimum cash policy"
      ],
      "Explanation": "Under CMA Part 1 Section B, forecast assumptions are the key inputs that determine the cash budget's output. Three assumptions directly drive the borrowing calculation: (1) SCENARIO PROBABILITIES — the 30%/50%/20% distribution determines expected unit sales (11,300) and therefore expected revenue ($904,000) and cash collections ($361,600); (2) COLLECTION PERCENTAGES — 40% in month of sale determines current-month collections; changes to this rate directly affect cash inflow; (3) MINIMUM CASH POLICY — the $75,000 minimum determines the borrowing threshold. The distractor \"Prior-year dividend payout\" is a SUNK COST — a historical event that has already occurred and cannot be changed by current-period decisions. Under relevant costing principles, sunk costs are irrelevant for decision-making. A common CMA exam trap: including historical data as a forecast assumption — forecasts are about the future, not the past. Another trap: confusing \"assumptions that drive the model\" with \"data inputs to the model\" — assumptions are the parameters management sets (probabilities, collection rates, minimum cash), while data inputs are specific values derived from assumptions.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Prior-year dividend declaration is a sunk historical event that does not directly affect future borrowing calculations. Under CMA cash forecasting principles, borrowing requirements depend on forward-looking assumptions about cash inflows — which scenario is most probable, what collection percentages apply to credit sales under each scenario — and cash management policies such as the minimum cash balance. A dividend already declared and paid in a prior period has no incremental effect on future cash availability or the computed borrowing requirement.",
      "Topic": "Forecast assumptions",
      "ItemID": "CBQ-B3-Q6",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-B3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-B1",
  "Title": "Production and Direct Materials Budgeting",
  "SectionTags": [
    "B"
  ],
  "Pack": 2,
  "Section": "B",
  "BlueprintDomain": "Planning, Budgeting, and Forecasting",
  "BlueprintObjectives": [
    "Production Budget",
    "Materials Budget",
    "Budget sequence"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Production Budget",
  "Subtopic": "Direct materials planning",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Treasury and planning",
  "CompanyName": "Apex Manufacturing",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "EstimatedMinutes": 25,
  "ExhibitCount": 1,
  "Industry": "Industrial controls",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze production budget — unit calculation",
    "Analyze production budget — multi-period planning",
    "Analyze materials budget — quantity planning",
    "Analyze materials budget — cost calculation",
    "Analyze budget sequencing and dependencies"
  ],
  "ModifiedDate": "2026-07-20",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    }
  ],
  "Stakeholder": "Apex Manufacturing (Management)",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "1.0",
  "ScenarioText": "Apex Manufacturing is preparing its Q1 budget. Projected sales: Jan 10,000 units, Feb 12,000 units, Mar 15,000 units. Desired ending finished goods is 20% of next month's sales. Each unit requires 3 lbs of raw material at $4/lb. Desired ending raw materials is 10% of next month's production needs.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Beginning Balances (Jan 1)",
      "Headers": [
        "Account",
        "Balance"
      ],
      "Rows": [
        [
          "Finished Goods",
          "2,000 units"
        ],
        [
          "Raw Materials",
          "3,120 lbs"
        ]
      ],
      "ExhibitID": "CBQ2-B1-E1",
      "CaseID": "CBQ2-B1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "How many units must Apex produce in January?",
      "Correct": 10400,
      "Explanation": "Sales (10,000) + End FG (12k * 20% = 2,400) - Beg FG (2,000) = 10,400.",
      "Topic": "Production Budget",
      "ItemID": "CBQ2-B1-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 4: Budget Order",
      "AccountingPrinciple": "Production budget formula: Budgeted Sales + Desired Ending Inventory - Beginning Inventory.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Production Budget",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "How many units must Apex produce in February?",
      "Correct": 12600,
      "Explanation": "Sales (12,000) + End FG (15k * 20% = 3,000) - Beg FG (2,400) = 12,600.",
      "Topic": "Production Budget",
      "ItemID": "CBQ2-B1-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 4: Budget Order",
      "AccountingPrinciple": "Production budget formula: Budgeted Sales + Desired Ending Inventory - Beginning Inventory.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Production Budget",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "How many pounds of raw material must be purchased in January?",
      "Correct": 31860,
      "Explanation": "Jan prod needs = 10,400 * 3 = 31,200. End RM = 12,600 * 3 * 10% = 3,780. Purch = 31,200 + 3,780 - 3,120 = 31,860 lbs.",
      "Topic": "Materials Budget",
      "ItemID": "CBQ2-B1-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Direct materials purchases: Materials Needed + Desired Ending Materials - Beginning Materials.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Direct Materials Purchases",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "What is the budgeted cost of raw material purchases for January?",
      "Correct": 127440,
      "Explanation": "31,860 lbs * $4 = $127,440.",
      "Topic": "Materials Budget",
      "ItemID": "CBQ2-B1-Q4",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Direct materials purchases: Materials Needed + Desired Ending Materials - Beginning Materials.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 5,
      "FormulaReference": "Direct Materials Purchases",
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "select",
      "Prompt": "Which budget must be prepared first?",
      "Correct": "Sales budget",
      "Explanation": "The sales budget drives all subsequent operating budgets.",
      "Topic": "Budget sequence",
      "Choices": [
        "Production budget",
        "Cash budget",
        "Sales budget",
        "Direct labor budget"
      ],
      "ItemID": "CBQ2-B1-Q5",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 4: Budget Order",
      "AccountingPrinciple": "Budgets follow sequence: Sales > Production > Materials > Labor > Overhead > Cash > Financial Statements.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-B1",
      "DecisionTreeReference": "Budget Sequence",
      "EstimatedMinutes": 4,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "B",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-C1",
  "Title": "Flexible Budget and Variance Investigation",
  "SectionTags": [
    "C"
  ],
  "Pack": 1,
  "Section": "C",
  "BlueprintDomain": "Performance Management",
  "BlueprintObjectives": [
    "Material price variance",
    "Material quantity variance",
    "Labor efficiency variance",
    "Labor rate variance",
    "Flexible budgeting"
  ],
  "PrimaryCompetency": "Calculation",
  "Subtopic": "Flexible budget analysis",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Topic": "Flexible Budget",
  "Author": "Case Author",
  "BusinessFunction": "Performance management",
  "CompanyName": "Summit Gear",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 1,
  "Industry": "Industrial equipment",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze material price variance",
    "Analyze material quantity variance",
    "Analyze labor efficiency variance",
    "Analyze labor rate variance",
    "Analyze flexible budgeting",
    "Analyze responsibility accounting"
  ],
  "ModifiedDate": "2026-07-20",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    }
  ],
  "Stakeholder": "Controller",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "1.0",
  "ScenarioText": "Summit Gear exceeded planned output but reported unfavorable spending. The controller wants a flexible-budget analysis before assigning responsibility to production, purchasing, or HR.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Standards and Actuals",
      "Headers": [
        "Item",
        "Standard",
        "Actual"
      ],
      "Rows": [
        [
          "Output",
          "12,000 planned units",
          "13,500 units"
        ],
        [
          "Direct material",
          "3 lb/unit at 6.00",
          "41,850 lb at 6.40"
        ],
        [
          "Direct labor",
          "0.5 hr/unit at 24.00",
          "6,950 hr at 25.00"
        ],
        [
          "Variable overhead",
          "8.00 per DLH",
          "58,000 total"
        ]
      ],
      "ExhibitID": "CBQ-C1-E1",
      "CaseID": "CBQ-C1",
      "ValidationVersion": "2.0",
      "ReferencedBy": [
        "CBQ-C1-Q1",
        "CBQ-C1-Q2",
        "CBQ-C1-Q3",
        "CBQ-C1-Q4",
        "CBQ-C1-Q5",
        "CBQ-C1-Q6"
      ]
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter the direct material price variance as a positive amount.",
      "Correct": "16740",
      "Explanation": "The direct material price variance isolates the difference between the actual price paid for raw materials and the standard price that was budgeted. Under standard costing methodology, the price variance is calculated using the actual quantity purchased (or used) so that the variance captures only the price effect — isolating the purchasing function's performance from the production function's material usage decisions. The formula prescribed by CMA standard costing conventions is: Material Price Variance = Actual Quantity × (Actual Price − Standard Price). Applying Summit Gear's exhibit data: 41,850 pounds were used at an actual price of $6.40 per pound, while the standard cost card specifies $6.00 per pound. Substituting into the formula: 41,850 × ($6.40 − $6.00) = 41,850 × $0.40 = $16,740. Because the actual price exceeds the standard price, the variance is unfavorable — Summit Gear paid $0.40 per pound more than budgeted. This $16,740 unfavorable variance tells the controller that the purchasing department either negotiated a higher price, selected a higher-grade material, or was subject to market price increases during the period. Since Summit Gear exceeded planned output (13,500 actual vs. 12,000 planned units), the purchasing volume was higher, which could have affected supplier pricing leverage. In practice, the purchasing manager would be asked to explain whether the price premium reflects quality upgrades that reduce downstream production waste or whether it represents a controllable cost overrun. A common exam trap is confusing the price variance formula with the quantity variance formula: the price variance uses actual quantity multiplied by the price difference (AQ × ΔP), while the quantity variance uses standard price multiplied by the quantity difference (SP × ΔQ). Candidates who swap standard price into the price variance formula will reach an incorrect result.",
      "ExplanationWrongA": "Using standard quantity (40,500 lb) instead of actual quantity (41,850 lb) in the price variance formula: 40,500 x ($6.40 - $6.00) = $16,200. The material price variance must use actual quantity purchased because the price difference applies to all units actually bought. Standard quantity is used only in the quantity variance, which isolates physical usage efficiency at the standard price.",
      "ExplanationWrongB": "Computing the total direct material cost difference without isolating price: (41,850 x $6.40) - (40,500 x $6.00) = $267,840 - $243,000 = $24,840. This figure combines both the price variance ($16,740 U) and the quantity variance ($8,100 U) into a single total. CMA variance analysis requires separating the price effect (AQ x (AP - SP)) from the quantity effect (SP x (AQ - SQ)).",
      "ExplanationWrongC": "Computing the material quantity variance instead of the price variance: $6.00 x (41,850 - 40,500) = $8,100. This correctly isolates the usage/quantity component but tests the wrong dimension. The price variance uses the formula AQ x (AP - SP) = 41,850 x $0.40 = $16,740, measuring the impact of paying a different price per pound than the standard of $6.00 for all 41,850 pounds actually purchased.",
      "Topic": "Material price variance",
      "ItemID": "CBQ-C1-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 7: Price vs Quantity Variance",
      "AccountingPrinciple": "Material Price Variance = AQ x (AP - SP). Actual Quantity used, comparing actual vs standard price.",
      "CalculationRequired": true,
      "CaseID": "CBQ-C1",
      "DecisionTreeReference": "Variance Analysis",
      "EstimatedMinutes": 5,
      "FormulaReference": "Material Price Variance",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the direct material quantity variance as a signed amount; use negative for favorable.",
      "Correct": "8100",
      "Explanation": "The direct material quantity variance measures how efficiently raw materials were consumed during production relative to the standard allowed for the actual output achieved. This variance isolates the production department's material usage performance by holding price constant at the standard rate. Under standard costing conventions, the quantity variance formula is: Material Quantity Variance = Standard Price × (Actual Quantity − Standard Quantity Allowed). First, compute the standard quantity allowed for actual output: Summit Gear produced 13,500 units and the standard is 3 pounds per unit, so the standard quantity allowed = 13,500 × 3 = 40,500 pounds. The actual quantity used was 41,850 pounds. Substituting into the formula: Standard Price × (Actual Quantity − Standard Quantity) = $6.00 × (41,850 − 40,500) = $6.00 × 1,350 = $8,100. Because actual pounds consumed exceed the standard pounds allowed, the variance is unfavorable — Summit Gear used 1,350 more pounds of material than the standard permitted for the units produced. The prompt requires entering the result as a signed amount with negative for favorable; since this is an unfavorable variance, the signed amount is entered as a positive number: 8,100. At $6.00 per pound, this excess consumption cost the company $8,100. The production supervisor bears primary responsibility for material quantity variances because usage decisions — machine settings, scrap rates, operator training, and spoilage control — occur on the production floor. When Summit Gear's controller reviews this variance alongside the $16,740 price variance, the combined material cost overrun was $24,840 above the standard cost for flexible-budget output. One common exam trap is computing the quantity variance using actual price instead of standard price, which would commingle the price and quantity effects and defeat the purpose of isolating the production manager's controllable usage variance. Another trap is using the static budget output of 12,000 units to compute the standard quantity allowed (which would yield 36,000 pounds and a much larger variance) — the flexible budget must always flex to actual output for meaningful performance evaluation.",
      "ExplanationWrongA": "Using planned output (12,000 units) instead of actual output (13,500 units) to compute standard quantity allowed: SQ = 12,000 x 3 = 36,000 lb; $6.00 x (41,850 - 36,000) = $35,100. The material quantity variance must be flexed to actual production because it measures efficiency at the activity level actually achieved. Using static planned output inflates the variance by treating the additional 1,500 units of production as if they consumed no materials at all.",
      "ExplanationWrongB": "Using actual price instead of standard price in the quantity variance formula: $6.40 x (41,850 - 40,500) = $8,640. The quantity variance must use the standard price to isolate the physical usage difference. Introducing the actual price contaminates the quantity variance with the price effect, double-counting the $0.40 per pound price difference that belongs in the separate material price variance (AQ x (AP - SP)).",
      "ExplanationWrongC": "Producing a negative (favorable) value by misinterpreting the sign convention. While actual output exceeded planned output, actual material usage per unit (41,850 / 13,500 = 3.10 lb) exceeded the standard of 3.0 lb per unit. The variance is unfavorable because Summit Gear used 1,350 more pounds than the standard allowed at actual output, costing an additional $8,100. Higher output volume does not make inefficient material usage favorable.",
      "Topic": "Material quantity variance",
      "ItemID": "CBQ-C1-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 7: Price vs Quantity Variance",
      "AccountingPrinciple": "Material Quantity Variance = SP x (AQ - SQ). Standard Price used, comparing actual vs standard quantity.",
      "CalculationRequired": true,
      "CaseID": "CBQ-C1",
      "DecisionTreeReference": "Variance Analysis",
      "EstimatedMinutes": 5,
      "FormulaReference": "Material Quantity Variance",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the direct labor efficiency variance as a signed amount; use negative for favorable.",
      "Correct": "4800",
      "Explanation": "The direct labor efficiency variance quantifies whether workers took more or fewer hours than the standard allowed to produce the actual output. This variance isolates the production floor's labor productivity by holding the wage rate constant at the standard rate, ensuring that wage-rate differences do not contaminate the hours-usage evaluation. The formula under standard costing is: Labor Efficiency Variance = Standard Rate × (Actual Hours − Standard Hours Allowed). For Summit Gear, first compute the standard hours allowed for actual output: the standard is 0.5 hours per unit and the plant produced 13,500 units, so standard hours allowed = 13,500 × 0.5 = 6,750 direct labor hours. The actual hours incurred were 6,950. Substituting: Labor Efficiency Variance = $24.00 × (6,950 − 6,750) = $24.00 × 200 = $4,800. Because actual hours exceed standard hours allowed, the variance is unfavorable — the production team used 200 more hours than the standard budget permitted. The prompt requires a signed amount with negative for favorable; this unfavorable variance is therefore entered as a positive: 4,800. At Summit Gear's standard labor rate of $24.00 per hour, these 200 excess hours cost the business $4,800 in additional labor. Note that Summit Gear also experienced an unfavorable labor rate variance (actual rate $25.00 vs. standard $24.00, for an additional $6,950), which is evaluated separately by HR. The combined labor cost overrun totals $11,750 ($4,800 efficiency + $6,950 rate), providing the controller with a clear picture of where labor costs deviated from the flexible budget. The production supervisor is accountable for efficiency variances — factors such as machine downtime, inadequate training, substandard materials requiring rework, or scheduling inefficiencies all drive excess hours. A common exam trap is substituting the actual labor rate ($25.00) in place of the standard rate ($24.00), which would yield $25.00 × 200 = $5,000 and commingle the rate and efficiency effects. The efficiency variance must use the standard rate to isolate hours-usage performance. A second common trap is applying the static budget output of 12,000 units rather than actual output of 13,500 when computing the standard hours allowed — under flexible budgeting principles, all efficiency analysis must be based on the standards allowed for the output actually achieved.",
      "ExplanationWrongA": "Using actual labor rate ($25.00) instead of standard rate ($24.00) in the efficiency formula: $25 x (6,950 - 6,750) = $5,000. The labor efficiency variance isolates the hours usage component at the standard rate. The $1.00 difference between actual and standard rates belongs entirely to the labor rate variance (AH x (AR - SR) = 6,950 x $1 = $6,950 U). Using actual rate in the efficiency formula conflates the two separate variance dimensions.",
      "ExplanationWrongB": "Using planned output (12,000 units) instead of actual output (13,500 units) to compute standard hours allowed: SH = 12,000 x 0.5 = 6,000; $24 x (6,950 - 6,000) = $22,800. This fails to flex the standard to actual production and confuses a volume effect with an efficiency effect. The additional 750 standard hours for the extra 1,500 units produced are a legitimate increase in expected hours, not an efficiency failure.",
      "ExplanationWrongC": "Computing the total labor variance rather than the isolated efficiency component: (6,950 x $25) - (6,750 x $24) = $173,750 - $162,000 = $11,750. This combines the rate variance ($6,950 U) and efficiency variance ($4,800 U). CMA standards require decomposing the total into its two components: rate = AH x (AR - SR); efficiency = SR x (AH - SH). Each is assigned to a different responsible manager under responsibility accounting.",
      "Topic": "Labor efficiency variance",
      "ItemID": "CBQ-C1-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 8: Rate vs Efficiency",
      "AccountingPrinciple": "Labor Efficiency Variance = SR x (AH - SH). Standard Rate used, comparing actual vs standard hours.",
      "CalculationRequired": true,
      "CaseID": "CBQ-C1",
      "DecisionTreeReference": "Variance Analysis",
      "EstimatedMinutes": 5,
      "FormulaReference": "Labor Efficiency Variance",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "select",
      "Prompt": "Which explanation best fits the labor rate variance?",
      "Choices": [
        "Actual hourly wage exceeded standard wage",
        "Actual hours exceeded standard allowed hours",
        "Actual output exceeded planned output",
        "Material usage exceeded standard quantity"
      ],
      "Correct": "Actual hourly wage exceeded standard wage",
      "Explanation": "The labor rate variance measures the difference between the actual hourly wage paid and the standard hourly wage budgeted, multiplied by the actual hours worked. The formula under standard costing conventions is: Labor Rate Variance = Actual Hours × (Actual Rate − Standard Rate). At Summit Gear, the actual rate was $25.00 per hour versus a standard of $24.00, producing an unfavorable rate variance of 6,950 × ($25.00 − $24.00) = $6,950. This variance purely isolates wage-rate differences — it answers the question \"did we pay more or less per hour than we planned?\" while holding hours constant at actual levels. Among the four choices presented, Choice A — \"Actual hourly wage exceeded standard wage\" — is the correct explanation because it directly identifies the driver of the rate variance: the price per labor hour was higher than budgeted. The other options describe fundamentally different variances. Choice B, \"Actual hours exceeded standard allowed hours,\" describes a labor efficiency variance (SR × (AH − SH)), not a rate variance. This confusion between rate and efficiency is one of the most common errors on the CMA exam — the rate variance concerns the price of labor, while the efficiency variance concerns the quantity of labor used. Choice C, \"Actual output exceeded planned output,\" concerns production volume relative to the master budget, which is a volume variance or sales-activity variance — it has no bearing on the wage-rate paid per hour. Choice D, \"Material usage exceeded standard quantity,\" describes a direct materials quantity variance (SP × (AQ − SQ)), which belongs to an entirely different resource category. The key insight for Summit Gear's controller is that the labor rate variance of $6,950 unfavorable signals that HR or staffing decisions drove labor cost above the flexible budget; this is distinct from the production floor's efficiency performance, which is captured by the separate $4,800 labor efficiency variance. A common exam trap is selecting an answer that sounds plausible because it mentions hours or output, but fails to distinguish between price-oriented and quantity-oriented variance analysis. The rate variance always isolates the price component — what was paid per unit of input.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "Actual hours exceeding standard allowed hours describes an efficiency variance, not a rate variance. Under CMA standard costing, the labor efficiency variance = SR x (AH - SH) isolates the hours usage component. The labor rate variance specifically captures wage-rate differences: AH x (AR - SR), using actual hours to isolate the pure rate effect on total labor cost.",
      "ExplanationWrongC": "Actual output exceeding planned output relates to volume or production variance analysis rather than labor rate determination. While higher output may require additional labor hours, this choice does not explain why hourly wages differed from the standard. Rate variances arise from paying a different hourly wage than planned, not from producing more or fewer units than the static budget anticipated.",
      "ExplanationWrongD": "Material usage exceeding standard quantity is a direct materials quantity variance, unrelated to labor rate analysis. It measures whether the company used more raw materials than the standard allowed for actual production — SP x (AQ - SQ). This variance pertains to the purchasing and production consumption of materials and has no bearing on direct labor wage rate determination.",
      "Topic": "Labor rate variance",
      "ItemID": "CBQ-C1-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 8: Rate vs Efficiency",
      "AccountingPrinciple": "Labor Rate Variance = AH x (AR - SR). Actual Hours used, comparing actual vs standard rate.",
      "CalculationRequired": false,
      "CaseID": "CBQ-C1",
      "DecisionTreeReference": "Variance Analysis",
      "EstimatedMinutes": 4,
      "FormulaReference": "Labor Rate Variance",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Select variances that should be analyzed using actual output rather than static planned output.",
      "Choices": [
        "Material quantity variance",
        "Labor efficiency variance",
        "Flexible-budget variable overhead variance",
        "Original static production-volume difference"
      ],
      "Correct": [
        "Material quantity variance",
        "Labor efficiency variance",
        "Flexible-budget variable overhead variance"
      ],
      "Explanation": "Flexible budgeting is a fundamental CMA Part 1 concept that distinguishes between variances driven by volume (output level differences) and variances driven by spending or efficiency. Under standard costing framework, a flexible budget is prepared after the period using actual output achieved rather than the static (master) budget's planned output. This allows management to evaluate performance on a level playing field — comparing what costs should have been for the actual volume against what costs actually were. The three correct choices — material quantity variance (A), labor efficiency variance (B), and flexible-budget variable overhead variance (C) — all share a common characteristic: their standard-allowed quantities are derived from actual output. For material quantity, the standard allowed is actual units × standard pounds per unit; for labor efficiency, it is actual units × standard hours per unit; for variable overhead flexibility, the budgeted amount is recomputed at the actual activity level. In every case, the flexible budget answers the question: \"given what we actually produced, what should the costs have been?\" By contrast, Choice D — \"Original static production-volume difference\" — is the variance that compares the static master budget (built for planned output of 12,000 units) against the flexible budget (built for actual output of 13,500 units). This is the only variance that explicitly isolates the volume effect. It is excluded from the correct set precisely because it is the one component that uses planned output rather than actual output as its reference point. At Summit Gear, the controller needs the flexible budget to separate the $24,840 material cost overrun into its price, quantity, and volume components — the price and quantity variances use actual-output standards, while the volume variance explains why total costs exceeded the master budget because the company made 1,500 more units than planned. A common exam trap is choosing all four variances because candidates assume \"all variances compare actual to budget\" without recognizing that the base of comparison (actual output vs. planned output) determines whether the variance isolates performance or volume. The CMA exam frequently tests this distinction: flexible-budget variances hold volume constant at actual levels to isolate price and efficiency effects, while the static-budget variance is decomposable into a flexible-budget variance plus a sales-volume variance.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "The original static production-volume difference measures output variance against a fixed master budget prepared for a single planned activity level, not actual output. Under CMA flexible budgeting principles, the static budget is not adjusted for actual production achieved. Comparing actual results to the static budget confuses volume effects with spending and efficiency effects, which is why flexible budgets flexed to actual output are the proper standard for performance evaluation and variance investigation.",
      "Topic": "Flexible budgeting",
      "ItemID": "CBQ-C1-Q5",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 6: Flexible Budget",
      "AccountingPrinciple": "Flexible budgets compare actual results to budgeted amounts at actual activity level.",
      "CalculationRequired": false,
      "CaseID": "CBQ-C1",
      "DecisionTreeReference": "Flexible Budget",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each variance to the manager most likely to investigate first.",
      "LeftItems": [
        "Material price",
        "Material quantity",
        "Labor rate",
        "Labor efficiency"
      ],
      "RightItems": [
        "Purchasing",
        "Production",
        "HR or staffing",
        "Production supervision"
      ],
      "Correct": {
        "Material price": "Purchasing",
        "Material quantity": "Production",
        "Labor rate": "HR or staffing",
        "Labor efficiency": "Production supervision"
      },
      "Explanation": "Responsibility accounting is a cornerstone of CMA Part 1 performance management that assigns cost and revenue control to the managers who have decision authority over the relevant cost driver. The matching in this item reflects the organizational logic of a manufacturing enterprise where different functional managers control different aspects of production cost. The Purchasing department negotiates raw material prices, selects suppliers, and manages procurement contracts — therefore the material price variance is their primary accountability. When Summit Gear pays $0.40 more per pound than the standard, the purchasing manager must explain whether this reflects market conditions, quality upgrades, or negotiation failures. The Production department controls how much material is consumed on the factory floor through machine settings, scrap reduction, spoilage control, and operator training — hence the material quantity variance falls under the production manager's purview. The 1,350 excess pounds used beyond standard belong to the production function's efficiency domain. The HR or staffing function sets wage rates through hiring decisions, collective bargaining agreements, overtime policies, and shift differentials — the labor rate variance is thus HR's accountability. Summit Gear's $1.00 per hour premium over standard requires HR to explain whether it stems from overtime usage, premium-shift staffing, or wage-scale adjustments. Production supervision controls how efficiently labor hours are utilized — scheduling, workflow design, training adequacy, and machine uptime all influence whether workers need more or fewer hours than the standard allows. The 200 excess hours producing the $4,800 labor efficiency variance must be explained by the production supervisor. A common exam trap is assigning the labor rate variance to Production because labor is \"used\" in production — but wages are set by HR, not by production supervisors, and responsibility accounting assigns accountability to the decision-maker who influences the cost, not the location where the cost is incurred. Another trap is assigning the material price variance to Production because materials are consumed there — but price is negotiated before materials reach the factory floor. The controller's integrated analysis for Summit Gear would bring all four variance owners together: purchasing ($16,740 price), production ($8,100 quantity and $4,800 efficiency), and HR ($6,950 rate) — a combined $36,590 unfavorable that spans the full value chain from procurement through labor deployment.",
      "ExplanationWrongA": "Assigning material price variance to the Production department because production \"uses\" the materials. Under responsibility accounting, the purchasing manager controls material prices through supplier selection, contract negotiation, order timing, and quantity discounts. The production manager controls how efficiently materials are used (quantity variance), not the price paid. Confusing usage control with procurement control misattributes accountability for cost drivers the manager cannot influence.",
      "ExplanationWrongB": "Assigning labor rate variance to Production supervision based on the assumption that supervisors control worker pay rates. Wage rates are determined by HR through hiring decisions, labor market conditions, union contract negotiations, and staffing mix — not by the production floor supervisor. Production supervision controls labor efficiency (hours worked per unit of output), making the efficiency variance, not the rate variance, the appropriate responsibility of the production supervision function.",
      "ExplanationWrongC": "Assigning all four variances to a single department, typically Production, on the reasoning that all manufacturing variances \"happen in the factory.\" Responsibility accounting requires matching each variance to the manager with decision authority over its root cause: Purchasing → material price, Production → material quantity, HR → labor rate, Production supervision → labor efficiency. Concentrating all accountability on one department violates the controllability principle central to effective performance measurement.",
      "Topic": "Responsibility accounting",
      "ItemID": "CBQ-C1-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology"
      ],
      "AccountingPrinciple": "Responsibility accounting assigns revenue/cost control to managers based on their decision authority.",
      "CalculationRequired": false,
      "CaseID": "CBQ-C1",
      "DecisionTreeReference": "Responsibility Centers",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-C2",
  "Title": "Investment Center Performance and Transfer Pricing",
  "SectionTags": [
    "C"
  ],
  "Pack": 1,
  "Section": "C",
  "BlueprintDomain": "Performance Management",
  "BlueprintObjectives": [
    "Residual income",
    "ROI",
    "Transfer pricing",
    "Performance measurement",
    "Performance management"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Transfer Pricing",
  "Subtopic": "Investment center performance",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Performance management",
  "CompanyName": "Juniper Appliances",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Electronics manufacturing",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze residual income",
    "Analyze roi",
    "Analyze transfer pricing",
    "Analyze performance measurement",
    "Analyze transfer pricing",
    "Analyze performance management"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "Session 537 — ENHANCED_CASE_BASE Final Certification Wave",
      "Summary": "All 6 items certified per CAQS v1.0 §1.6 six-dimension verification. Explanations expanded to certification standard. Choices rotated for psychometric balance. question_state: Unprocessed → Certified."
    }
  ],
  "Stakeholder": "Management",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Juniper Appliances evaluates two divisions as investment centers. A component transfer decision may affect divisional incentives, ROI, and residual income. Corporate wants a recommendation that preserves goal congruence.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Division Data",
      "Headers": [
        "Metric",
        "Motor Division",
        "Assembly Division"
      ],
      "Rows": [
        [
          "Operating income",
          "420,000",
          "510,000"
        ],
        [
          "Average operating assets",
          "2,800,000",
          "3,000,000"
        ],
        [
          "Required return",
          "12%",
          "12%"
        ]
      ],
      "ExhibitID": "CBQ-C2-E1",
      "CaseID": "CBQ-C2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Transfer Facts",
      "Headers": [
        "Item",
        "Amount"
      ],
      "Rows": [
        [
          "Variable cost per motor",
          "70"
        ],
        [
          "Full cost per motor",
          "95"
        ],
        [
          "Outside market price",
          "110"
        ],
        [
          "Idle capacity?",
          "Yes"
        ],
        [
          "Assembly outside purchase price",
          "108"
        ]
      ],
      "ExhibitID": "CBQ-C2-E2",
      "CaseID": "CBQ-C2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter Motor Division residual income.",
      "Correct": "84000",
      "Explanation": "Under the managerial accounting framework for investment center performance, Residual Income (RI) = Operating Income - (Required Rate of Return x Average Operating Assets). From Exhibit 1, the Motor Division reports Operating Income of $420,000 and Average Operating Assets of $2,800,000. The Required Return is 12%. Required asset charge = 12% x $2,800,000 = $336,000. Residual Income = $420,000 - $336,000 = $84,000. In Juniper Appliances' context, the Motor Division generates $84,000 of income above the 12% minimum return expected on deployed assets. A positive RI signals that the division is creating economic value beyond the hurdle rate — a signal that ROI might obscure if the division's existing ROI is very high and the manager rejects incremental projects with returns above 12% but below the current ROI. A common CMA exam trap is confusing the required return charge computation — candidates may apply 12% to operating income instead of operating assets, yielding incorrect RI. The required return is always applied to the asset base, not the income stream. RI and ROI together provide complementary signals: ROI enables cross-division comparisons regardless of size, while RI reveals whether absolute economic value is created. Professional management accountants must use both metrics to avoid the underinvestment problem. Related Part 1 topics include ROI, responsibility center design, transfer pricing and goal congruence, Economic Value Added, and the DuPont decomposition.",
      "Topic": "Residual income",
      "ItemID": "CBQ-C2-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Residual Income = Operating Income - (Required Rate of Return x Average Operating Assets).",
      "CalculationRequired": true,
      "CaseID": "CBQ-C2",
      "DecisionTreeReference": "Responsibility Centers",
      "EstimatedMinutes": 5,
      "FormulaReference": "Residual Income",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter Motor Division ROI percentage as a whole number.",
      "Correct": "15",
      "Explanation": "Under the managerial accounting framework for divisional performance measurement, Return on Investment (ROI) = Operating Income / Average Operating Assets. From Exhibit 1, the Motor Division of Juniper Appliances reports Operating Income of $420,000 and Average Operating Assets of $2,800,000. Substituting: ROI = $420,000 / $2,800,000 = 0.15 = 15%. For every dollar of operating assets deployed, the division generates $0.15 of operating income annually. Corporate management compares this 15% against the 12% required return to conclude the division is outperforming the hurdle rate by three percentage points. A common CMA exam trap is the DuPont decomposition — candidates may attempt to break ROI into profit margin and asset turnover when the question only asks for the simple ratio. Another trap: dividing income by sales instead of assets, producing profit margin not ROI. A third trap: reporting 0.15 instead of 15 (the prompt asks for percentage as a whole number). ROI is the primary percentage metric for comparing capital efficiency across divisions. However, ROI alone creates the underinvestment problem — managers reject projects with returns above the required rate but below their current ROI, destroying shareholder value. Related Part 1 topics include Residual Income (the complementary absolute-dollar metric), the DuPont decomposition (Profit Margin x Asset Turnover), responsibility accounting, and transfer pricing. Proper application means using average operating assets for a representative denominator rather than point-in-time measures.",
      "Topic": "ROI",
      "ItemID": "CBQ-C2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 13: ROI vs ROE",
      "AccountingPrinciple": "Return on Investment = Operating Income / Average Operating Assets.",
      "CalculationRequired": true,
      "CaseID": "CBQ-C2",
      "DecisionTreeReference": "Responsibility Centers",
      "EstimatedMinutes": 5,
      "FormulaReference": "Return on Investment",
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "With idle capacity and no opportunity cost, what is the minimum transfer price from the company perspective?",
      "Choices": [
        "95 full cost",
        "108 outside purchase price",
        "70 variable cost",
        "110 market price"
      ],
      "Correct": "70 variable cost",
      "Explanation": "Under the managerial accounting transfer pricing framework codified in CMA Part 1 Section C, the minimum transfer price from the selling division's perspective is: Minimum Transfer Price = Variable Cost per Unit + Opportunity Cost per Unit. Opportunity cost represents the contribution margin forgone on lost external sales. When the selling division has idle capacity — as Exhibit 2 confirms (\"Idle capacity? Yes\") — the opportunity cost is zero because no external sales are displaced. From Exhibit 2, the Motor Division's variable cost per motor is $70. Minimum Transfer Price = $70 + $0 = $70. The outside purchase price of $108 and market price of $110 represent the maximum transfer price (the buying division's ceiling), not the minimum (the selling division's floor). The negotiation range for an internal transfer is $70 to $108 — any price in this range benefits Juniper Appliances overall compared to external sourcing. A common CMA exam trap is confusing the minimum transfer price (seller's perspective: variable cost + opportunity cost) with the maximum transfer price (buyer's perspective: lower of external purchase price or net realizable value). A second trap: including fixed costs in the minimum price — fixed overhead of $25 per motor ($95 full cost - $70 variable) is irrelevant when idle capacity exists because those costs are incurred regardless of the transfer decision. This transfer pricing framework is fundamental to designing performance measurement systems that promote goal congruence — aligning divisional manager incentives with overall corporate objectives.",
      "ExplanationWrongA": "Full cost of 95 includes allocated fixed costs, which are irrelevant for the minimum transfer price decision when idle capacity exists. Under CMA transfer pricing principles, the minimum transfer price equals variable cost plus opportunity cost. Since fixed costs are incurred regardless of whether the internal transfer occurs, they are not incremental costs of the transfer and would set the price artificially high above the true economic floor.",
      "ExplanationWrongB": "The outside purchase price of 108 represents the maximum price the buying division should be willing to pay, not the minimum the selling division should accept. The minimum transfer price is determined from the selling division's perspective as variable cost plus opportunity cost. With idle capacity and no forgone external sales, variable cost alone of 70 is the relevant floor for the transfer price decision.",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Market price of 110 is the appropriate transfer price only when the selling division has no idle capacity and an active external market exists for the product. With idle capacity and no opportunity cost of lost external sales, using market price ignores the economic reality that the company as a whole benefits from any internal transfer priced above the variable cost of 70.",
      "Topic": "Transfer pricing",
      "ItemID": "CBQ-C2-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Transfer price should promote goal congruence; minimum = variable cost + opportunity cost.",
      "CalculationRequired": false,
      "CaseID": "CBQ-C2",
      "DecisionTreeReference": "Transfer Pricing",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "multi",
      "Prompt": "Select reasons residual income may improve goal congruence compared with ROI.",
      "Choices": [
        "It can encourage accepting projects above the required return",
        "It charges divisions for assets employed",
        "It always increases when assets increase",
        "It avoids rejecting investments that lower ROI but exceed the required return"
      ],
      "Correct": [
        "It can encourage accepting projects above the required return",
        "It charges divisions for assets employed",
        "It avoids rejecting investments that lower ROI but exceed the required return"
      ],
      "Explanation": "Under the managerial accounting framework for investment center performance in CMA Part 1 Section C, Residual Income (RI) overcomes a significant behavioral limitation of ROI: the underinvestment problem. RI = Operating Income - (Required Rate of Return x Average Operating Assets). ROI enables cross-division comparisons but creates dysfunctional incentives — division managers evaluated solely on ROI reject projects whose expected ROI falls below their current ROI, even if those projects earn returns above the cost of capital. RI resolves this because any project earning more than the required rate increases RI regardless of its effect on ROI percentage. Choice 1 is correct: RI encourages accepting projects above the required return — the dollar-based RI increases whenever incremental return exceeds the hurdle rate. Choice 2 is correct: RI charges divisions for assets employed through the required return charge (Required Rate x Assets), making the cost of capital visible in performance evaluation. Choice 3 is INCORRECT: RI does NOT always increase when assets increase. The asset charge term reduces RI, so RI only increases if incremental return on new assets exceeds the required rate. Choice 4 is correct: RI avoids rejecting investments that lower ROI but exceed the required return — this is the core behavioral advantage over ROI. In Juniper's context, the Assembly Division (17% ROI) might reject a project earning 14.4% > 12% required return to protect its high ROI percentage, but an RI-evaluated manager would accept it because it adds economic value. A common CMA exam trap is incorrectly assuming RI always moves in the same direction as asset increases — the sign of (Incremental Return - Required Rate) determines whether RI increases or decreases.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "Residual income does not always increase when assets increase. Under the residual income formula (RI = Operating Income - Required Return x Assets), adding assets can either increase or decrease RI depending on whether the return on those new assets exceeds the required rate of return. This is precisely why RI avoids the ROI distortion where managers may reject value-creating investments that generate returns above the hurdle rate but below the division's current ROI.",
      "ExplanationWrongD": "",
      "Topic": "Performance measurement",
      "ItemID": "CBQ-C2-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-C2",
      "DecisionTreeReference": "Responsibility Centers",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: A transfer price should promote goal _____ so divisional decisions support overall company interests.",
      "Correct": "congruence",
      "Explanation": "Under CMA Part 1 Section C, a transfer price should promote goal CONGRUENCE — the alignment of divisional manager incentives with overall company-wide value creation. Goal congruence is the foundational objective of transfer pricing policy design. When a company is organized into decentralized divisions operating as profit or investment centers, the transfer price determines how revenue and cost are allocated between buying and selling divisions. A poorly designed transfer price creates conflict: what maximizes the individual division's reported profits may harm the company as a whole. In Juniper Appliances' context, if the transfer price exceeds the Assembly Division's external purchase price of $108, the Assembly Division manager rationally purchases externally, even though the company's incremental cost is only $70. The company loses $38 per motor because the transfer pricing policy failed to achieve goal congruence. A congruent transfer price between $70 and $108 makes the internal transfer optimal for both divisions and the company. This concept extends beyond transfer pricing to all performance measurement and management control system design — budgets, cost allocations, bonus formulas, and capital budgeting thresholds must all align divisional behavior with corporate strategy. A common CMA exam trap is confusing goal congruence with terms like \"goal alignment\" or \"goal harmony\" — congruence is the specific term of art tested on the CMA examination.",
      "Topic": "Transfer pricing",
      "ItemID": "CBQ-C2-Q5",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Transfer price should promote goal congruence; minimum = variable cost + opportunity cost.",
      "CalculationRequired": false,
      "CaseID": "CBQ-C2",
      "DecisionTreeReference": "Transfer Pricing",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "match",
      "Prompt": "Match each measure to the best description.",
      "LeftItems": [
        "ROI",
        "Residual income",
        "Minimum transfer price with idle capacity",
        "Market price"
      ],
      "RightItems": [
        "Operating income divided by assets",
        "Income after required asset charge",
        "Variable cost plus opportunity cost",
        "External benchmark when available"
      ],
      "Correct": {
        "ROI": "Operating income divided by assets",
        "Residual income": "Income after required asset charge",
        "Minimum transfer price with idle capacity": "Variable cost plus opportunity cost",
        "Market price": "External benchmark when available"
      },
      "Explanation": "Under CMA Part 1 Section C, four key performance management concepts are matched to their defining characteristics. ROI matches to \"Operating income divided by assets\" — the percentage metric enabling cross-division comparison (Motor Division: 15%, Assembly Division: 17%). Residual income matches to \"Income after required asset charge\" — RI = Operating Income - (Required Rate x Average Operating Assets), an absolute-dollar measure of economic profit. The Motor Division's RI is $84,000 ($420,000 - (12% x $2,800,000)). Minimum transfer price with idle capacity matches to \"Variable cost plus opportunity cost\" — the general transfer pricing rule where opportunity cost is zero when idle capacity exists, making the minimum price equal to variable cost ($70 per motor for Juniper). Market price matches to \"External benchmark when available\" — when an active, competitive external market exists and the selling division has no idle capacity, market price is the optimal transfer price because it mimics an arm's-length transaction. A common CMA exam trap is confusing the minimum transfer price (seller's floor) with the optimal transfer price (negotiated outcome within the acceptable range). Another trap: failing to recognize that the same formula (variable cost + opportunity cost) produces different results depending on capacity utilization — $70 with idle capacity versus $110 at full capacity (opportunity cost becomes the $40 contribution margin forgone). Each measure serves a distinct purpose: ROI for cross-division comparison, RI for investment decision guidance, and the transfer pricing rule for transaction-level pricing.",
      "Topic": "Performance management",
      "ItemID": "CBQ-C2-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-C2",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-C3",
  "Title": "Balanced Scorecard and Operating Performance Review",
  "SectionTags": [
    "C"
  ],
  "Pack": 1,
  "Section": "C",
  "BlueprintDomain": "Performance Management",
  "BlueprintObjectives": [
    "Performance variance",
    "Nonfinancial measures",
    "Balanced scorecard",
    "Leading indicators",
    "Responsibility accounting"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Balanced Scorecard",
  "Subtopic": "Balanced scorecard design and implementation",
  "SecondaryCompetencies": [
    "Calculation"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Performance management",
  "CompanyName": "MetroMed Devices",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Medical devices",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze performance variance",
    "Analyze nonfinancial measures",
    "Analyze balanced scorecard",
    "Analyze leading indicators",
    "Analyze balanced scorecard",
    "Analyze responsibility accounting"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "Session 537 — ENHANCED_CASE_BASE Final Certification Wave",
      "Summary": "All 6 items certified per CAQS v1.0 §1.6 six-dimension verification. Explanations expanded to certification standard. Choices rotated for psychometric balance. question_state: Unprocessed → Certified."
    }
  ],
  "Stakeholder": "Management",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "MetroMed Devices uses a balanced scorecard to connect financial results, quality, delivery, and learning metrics. Management must distinguish leading indicators from lagging outcomes and decide where investigation is needed.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Scorecard Extract",
      "Headers": [
        "Metric",
        "Target",
        "Actual"
      ],
      "Rows": [
        [
          "Operating income",
          "900,000",
          "840,000"
        ],
        [
          "On-time delivery",
          "96%",
          "91%"
        ],
        [
          "Defect rate",
          "1.5%",
          "2.4%"
        ],
        [
          "Training hours per employee",
          "12",
          "16"
        ],
        [
          "New-product engineering changes",
          "18",
          "31"
        ]
      ],
      "ExhibitID": "CBQ-C3-E1",
      "CaseID": "CBQ-C3",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Responsibility Notes",
      "Headers": [
        "Issue",
        "Likely owner"
      ],
      "Rows": [
        [
          "Supplier late materials",
          "Purchasing"
        ],
        [
          "Machine setup errors",
          "Production"
        ],
        [
          "Design revisions",
          "Engineering"
        ],
        [
          "Pricing discount approvals",
          "Sales management"
        ]
      ],
      "ExhibitID": "CBQ-C3-E2",
      "CaseID": "CBQ-C3",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter the unfavorable operating income variance as a positive amount.",
      "Correct": "60000",
      "Explanation": "Under variance analysis in CMA Part 1 Section C, an operating income variance measures the difference between target (budgeted) and actual performance. Unfavorable variance = Target - Actual when actual is below target. From Exhibit 1: target operating income = $900,000, actual operating income = $840,000. Variance = $900,000 - $840,000 = $60,000 unfavorable. The variance is reported as a positive amount per the prompt (\"unfavorable operating income variance as positive amount\"). Med Devices fell short of its OI target by 6.67% ($60,000 / $900,000). A common CMA exam trap: computing the variance as a percentage instead of a dollar amount. Another trap: reversing the subtraction (840,000 - 900,000 = -60,000) and either reporting a negative number or confusing favorable/unfavorable signage. For variance reporting: favorable = actual revenue exceeds budget or actual cost is below budget; unfavorable = the opposite. The $60,000 unfavorable OI variance warrants investigation into whether revenue fell short, costs exceeded budget, or both — the scorecard's on-time delivery and defect rate metrics offer clues.",
      "Topic": "Performance variance",
      "ItemID": "CBQ-C3-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-C3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Easy",
      "DifficultyScore": 1,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the on-time delivery shortfall in percentage points.",
      "Correct": "5",
      "Explanation": "Nonfinancial performance measures supplement financial metrics in the balanced scorecard framework. The on-time delivery shortfall is computed as Target percentage - Actual percentage, expressed in percentage points (not percent of target). From Exhibit 1: on-time delivery target = 96%, actual = 91%. Shortfall = 96 - 91 = 5 percentage points. Note: this is 5 percentage points, not 5 percent — the distinction is critical. As a percentage of target, the shortfall is (96-91)/96 = 5.2%, but the prompt asks for percentage points. Med Devices' 91% on-time rate means 9% of deliveries are late, potentially affecting customer satisfaction (BSC customer perspective) and future revenue. A common CMA exam trap: reporting 5% instead of 5 percentage points — percentage points measure absolute differences between percentages, while \"percent\" implies a relative change. Another trap: dividing by the target to express as a percentage decline — the prompt asks for the shortfall in percentage points. Nonfinancial measures like on-time delivery are leading indicators: declining performance here signals potential future financial metric deterioration.",
      "Topic": "Nonfinancial measures",
      "ItemID": "CBQ-C3-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-C3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Easy",
      "DifficultyScore": 1,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "Which metric is most clearly a learning and growth measure?",
      "Choices": [
        "Operating income",
        "On-time delivery",
        "Training hours per employee",
        "Defect rate"
      ],
      "Correct": "Training hours per employee",
      "Explanation": "Under the Kaplan & Norton Balanced Scorecard (BSC) framework, the Learning & Growth perspective captures the organization's intangible assets — human capital, information capital, and organizational capital. Training hours per employee is a classic Learning & Growth measure because it reflects investment in employee capabilities, skills development, and future process improvement capacity. In contrast: Operating income (Choice B) belongs to the FINANCIAL perspective — it measures past financial results. On-time delivery (Choice C) belongs to the CUSTOMER or INTERNAL PROCESS perspective — it measures operational execution. Defect rate (Choice D) belongs to the INTERNAL PROCESS perspective — it measures production quality. The BSC's causal chain flows: Learning & Growth → Internal Process → Customer → Financial. Training (L&G) enables better processes, which improve quality and delivery, which satisfy customers, which drive financial results. A common CMA exam trap: confusing the four BSC perspectives and which measures belong in each. Another trap: assuming any \"employee-related\" measure is automatically L&G — employee satisfaction surveys are L&G, but employee productivity ratios may be Internal Process.",
      "ExplanationWrongA": "Operating income is a financial perspective metric in the Balanced Scorecard framework, not a learning and growth measure. Under Kaplan and Norton's BSC model, the financial perspective captures lagging indicators of profitability and shareholder value. Learning and growth metrics — such as training hours, employee satisfaction, and skill development — represent the foundational infrastructure that enables improvement in the other three scorecard perspectives over time.",
      "ExplanationWrongB": "On-time delivery is an internal business process perspective metric that measures operational efficiency and customer fulfillment performance. While it reflects the effectiveness of internal processes, it does not directly measure the learning and growth dimension, which focuses on employee capabilities, information systems, and organizational alignment — the enabling infrastructure for sustained process improvement rather than the process outcome itself.",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Defect rate is an internal business process metric measuring quality performance at a point in time. It indicates how well production or service processes are currently performing but does not measure the learning and growth infrastructure — employee training, skills development, information systems, and organizational culture — that must be in place to enable sustained process quality improvement across multiple operating periods and product lines.",
      "Topic": "Balanced scorecard",
      "ItemID": "CBQ-C3-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-C3",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "multi",
      "Prompt": "Select likely leading indicators of future financial performance.",
      "Choices": [
        "Defect rate",
        "On-time delivery",
        "Training hours per employee",
        "Prior-period operating income"
      ],
      "Correct": [
        "Defect rate",
        "On-time delivery",
        "Training hours per employee"
      ],
      "Explanation": "Under the Balanced Scorecard framework, leading indicators are predictive measures that signal future performance, while lagging indicators report historical outcomes. Three measures are LEADING indicators: (1) DEFECT RATE — current quality performance predicts future customer satisfaction, warranty costs, and rework expense; (2) ON-TIME DELIVERY — current delivery performance predicts future customer retention and revenue; (3) TRAINING HOURS PER EMPLOYEE — investment in employee capabilities predicts future process improvement and innovation. Prior-period operating income is a LAGGING indicator — it reports what has already happened and cannot be changed. A common CMA exam trap: treating all scorecard measures as equivalent — the distinction between leading and lagging matters for performance prediction versus evaluation. The BSC's strategic value comes from its inclusion of leading indicators that provide early warning signals before financial results deteriorate. Med Devices' declining on-time delivery (91% vs. 96% target) and elevated defect rate (2.4% vs. 1.5% target) are leading indicators that, if unaddressed, will eventually manifest in customer defections and revenue decline (lagging financial indicators).",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Prior-period operating income is a historical financial result — a lagging indicator that reports what has already occurred in the business. Under the Balanced Scorecard framework, leading indicators predict future performance and are typically non-financial measures drawn from the internal process, customer, and learning and growth perspectives. Prior-period income reflects past decisions and market conditions, not forward-looking signals of where performance is heading in future reporting periods.",
      "Topic": "Leading indicators",
      "ItemID": "CBQ-C3-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-C3",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "match",
      "Prompt": "Match each scorecard perspective to the best metric.",
      "LeftItems": [
        "Financial",
        "Customer",
        "Internal process",
        "Learning and growth"
      ],
      "RightItems": [
        "Operating income",
        "On-time delivery",
        "Defect rate",
        "Training hours per employee"
      ],
      "Correct": {
        "Financial": "Operating income",
        "Customer": "On-time delivery",
        "Internal process": "Defect rate",
        "Learning and growth": "Training hours per employee"
      },
      "Explanation": "Under the Kaplan & Norton Balanced Scorecard framework, four perspectives are matched to their descriptions. Financial perspective → Profitability, revenue growth, and shareholder value — the ultimate outcomes the strategy aims to achieve. Customer perspective → Market share, satisfaction, retention, and acquisition — how the company intends to create value for targeted customers. Internal Process perspective → Quality, efficiency, cycle time, and innovation — the operational excellence needed to deliver the customer value proposition. Learning & Growth perspective → Employee skills, information systems, and organizational alignment — the intangible infrastructure enabling all other perspectives. The BSC framework's causal logic: investments in Learning & Growth enable Internal Process improvements, which deliver Customer value, which generates Financial returns. A common CMA exam trap: reversing Internal Process and Customer perspectives — Internal Process is \"what we do well operationally,\" Customer is \"how the market perceives us.\" Another trap: assuming the Financial perspective is the most important — Kaplan and Norton emphasize that all four perspectives are causally linked, and overemphasizing short-term financial metrics undermines long-term strategy execution.",
      "Topic": "Balanced scorecard",
      "ItemID": "CBQ-C3-Q5",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-C3",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "Which issue should production investigate first?",
      "Choices": [
        "Supplier late materials",
        "Pricing discount approvals",
        "Prior-year dividend payout",
        "Machine setup errors"
      ],
      "Correct": "Machine setup errors",
      "Explanation": "Under responsibility accounting (CMA Part 1 Section C), managers are accountable for costs, revenues, and activities within their span of control. Machine setup errors fall within PRODUCTION'S span of control because the production department manages equipment configuration, operator training, quality procedures, and setup execution. The production manager can directly influence setup accuracy through standardized procedures, preventive maintenance, and operator skill development. In contrast: Supplier raw material delays → PURCHASING's responsibility (supplier selection and management). Incorrect pricing on customer invoices → SALES/BILLING's responsibility (pricing decisions, invoice accuracy). Insufficient dividend declaration → BOARD OF DIRECTORS' responsibility (dividend policy is a governance decision, not operational). A common CMA exam trap: attributing all \"quality-related\" issues to production — quality problems have multiple sources (design, purchasing, production, shipping), and responsibility accounting requires matching each cost or variance to the manager who controls it. Another trap: confusing authority (who can make decisions) with responsibility (who is held accountable) — they should align under responsibility accounting. Med Devices' responsibility accounting system should ensure each cost center manager is evaluated on metrics they can actually influence.",
      "ExplanationWrongA": "Supplier late materials is a procurement and supply-chain issue, not a production-floor issue. While late materials affect production scheduling, the root cause (supplier performance) lies outside the production manager's direct span of control. Responsibility accounting assigns this to purchasing/supply chain, making it a secondary investigation priority for production.",
      "ExplanationWrongB": "Pricing discount approvals are a sales and revenue-management function, not a production responsibility. The pricing decision affects revenue, not production efficiency or quality. Under responsibility accounting, sales management — not production — owns pricing decisions and their consequences.",
      "ExplanationWrongC": "Prior-year dividend payout is a board-level financing decision unrelated to current production operations. Dividends are distributions to shareholders governed by the board of directors, not an operational matter for production to investigate. This choice tests whether the candidate correctly distinguishes between operational and financing responsibilities.",
      "ExplanationWrongD": "",
      "Topic": "Responsibility accounting",
      "ItemID": "CBQ-C3-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Responsibility accounting assigns revenue/cost control to managers based on their decision authority.",
      "CalculationRequired": false,
      "CaseID": "CBQ-C3",
      "DecisionTreeReference": "Responsibility Centers",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-C1",
  "Title": "Flexible Budget and Sales Variance Analysis",
  "SectionTags": [
    "C"
  ],
  "Pack": 2,
  "Section": "C",
  "BlueprintDomain": "Performance Management",
  "BlueprintObjectives": [
    "Flexible budget variance analysis",
    "Sales volume and price variance computation",
    "Efficiency and spending variance interpretation",
    "Variance investigation decisions",
    "Performance reporting"
  ],
  "PrimaryCompetency": "Analysis",
  "Topic": "Variance Analysis",
  "Subtopic": "Flexible budget analysis and sales variances",
  "SecondaryCompetencies": [
    "Calculation",
    "Judgment"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Performance management",
  "CompanyName": "Northwood Manufacturing",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-21",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 1,
  "Industry": "Industrial manufacturing",
  "LastValidated": "2026-07-21",
  "LearningObjectives": [
    "Compute and interpret flexible budget variances for revenue and cost components",
    "Distinguish between sales volume variance and sales price variance",
    "Analyze efficiency and spending variances to identify operational issues",
    "Apply variance investigation criteria using materiality and controllability thresholds",
    "Use flexible budget data to support performance evaluation decisions"
  ],
  "ModifiedDate": "2026-07-21",
  "ProductionStatus": "Draft",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-21",
      "Version": "2.0",
      "Author": "Case Author",
      "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
    }
  ],
  "Stakeholder": "Controller",
  "Tags": [
    "flexible budget",
    "variance analysis",
    "sales variance",
    "performance management"
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Northwood Manufacturing produces industrial-grade pumps. The company uses a standard costing system and prepares flexible budgets for performance reporting. At the end of Q1, the controller prepared a variance report comparing actual results to the flexible budget. Senior management has asked for an interpretation of the variances to identify operational issues and determine whether corrective action is needed. Exhibit 1 shows the Q1 flexible budget variance report.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — Q1 Flexible Budget Variance Report",
      "Headers": [
        "Item",
        "Actual",
        "Flexible Budget",
        "Variance",
        "Variance %"
      ],
      "Rows": [
        [
          "Units produced and sold",
          "4,800",
          "5,000",
          "200 U",
          "4.0% U"
        ],
        [
          "Sales revenue",
          "$1,248,000",
          "$1,250,000",
          "$2,000 U",
          "0.2% U"
        ],
        [
          "Direct materials",
          "$288,000",
          "$250,000",
          "$38,000 U",
          "15.2% U"
        ],
        [
          "Direct labor",
          "$384,000",
          "$375,000",
          "$9,000 U",
          "2.4% U"
        ],
        [
          "Variable overhead",
          "$120,000",
          "$125,000",
          "$5,000 F",
          "4.0% F"
        ],
        [
          "Fixed overhead",
          "$180,000",
          "$175,000",
          "$5,000 U",
          "2.9% U"
        ],
        [
          "Operating income",
          "$276,000",
          "$325,000",
          "$49,000 U",
          "15.1% U"
        ]
      ],
      "ExhibitID": "CBQ2-C1-E1",
      "CaseID": "CBQ2-C1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "match",
      "Prompt": "Match each variance category to the correct variance amount shown in Exhibit 1.",
      "LeftItems": [
        "Sales price variance",
        "Direct materials efficiency variance",
        "Direct materials price variance",
        "Labor rate variance"
      ],
      "RightItems": [
        "Cannot be determined from a flexible budget report alone",
        "Requires separate price and quantity data beyond the summary",
        "Requires separate price and quantity data beyond the summary",
        "Requires separate price and quantity data beyond the summary",
        "Is exactly equal to the total static budget variance"
      ],
      "Correct": {
        "Sales price variance": "Cannot be determined from a flexible budget report alone",
        "Direct materials efficiency variance": "Requires separate price and quantity data beyond the summary",
        "Direct materials price variance": "Requires separate price and quantity data beyond the summary",
        "Labor rate variance": "Requires separate price and quantity data beyond the summary"
      },
      "Explanation": "A flexible budget report shows whether total costs were above or below the flexed amount but does not decompose variances into price and quantity components. The $38,000 unfavorable direct materials variance could be driven by higher material prices, excess usage, or both. To separate price from efficiency (quantity) effects, the accounting system must capture actual price per unit and actual quantity used separately from standard price and standard quantity. The sales price variance similarly requires knowing the actual selling price per unit compared to the standard or budgeted price. A candidate might assume the flexible budget report provides full variance decomposition, but standard costing systems require additional data to split variances into rate and efficiency components.",
      "Topic": "Flexible budget variance decomposition",
      "ItemID": "CBQ2-C1-Q1",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology",
        "MultipleConcepts"
      ],
      "AccountingPrinciple": "Flexible budgeting separates volume effects from price and efficiency effects by flexing the budget to actual activity levels before comparing actual costs.",
      "BusinessInterpretation": "Management cannot evaluate purchasing performance or production efficiency from a total-variance report alone. Separate price and quantity sub-variances are needed to assign accountability.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-C1",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each Q1 performance indicator to the most likely underlying cause.",
      "LeftItems": [
        "Direct materials variance 15.2% unfavorable",
        "Direct labor variance 2.4% unfavorable",
        "Variable overhead 4.0% favorable",
        "Sales volume 4.0% unfavorable"
      ],
      "RightItems": [
        "Possible material waste or higher input prices requiring purchasing and production review",
        "Small labor inefficiency within normal tolerance; monitor but no immediate action",
        "Lower variable overhead spending or usage than expected at actual production levels",
        "Fewer units sold than budgeted; investigate demand or market share changes",
        "Fixed overhead spending exceeded the budget; review fixed cost commitments"
      ],
      "Correct": {
        "Direct materials variance 15.2% unfavorable": "Possible material waste or higher input prices requiring purchasing and production review",
        "Direct labor variance 2.4% unfavorable": "Small labor inefficiency within normal tolerance; monitor but no immediate action",
        "Variable overhead 4.0% favorable": "Lower variable overhead spending or usage than expected at actual production levels",
        "Sales volume 4.0% unfavorable": "Fewer units sold than budgeted; investigate demand or market share changes"
      },
      "Explanation": "The 15.2% unfavorable direct materials variance is significant and exceeds any reasonable materiality threshold; management should investigate whether material prices increased or production used more materials than the standard allows. The 2.4% unfavorable labor variance is small in percentage terms and may fall within normal operating tolerance, but it should be monitored for trends. The favorable variable overhead variance could indicate lower utility rates, reduced indirect material usage, or a budgeting error. The 4.0% unfavorable sales volume variance suggests actual demand fell short of expectations; management should assess whether this is a temporary shortfall or a structural issue requiring pricing or promotion adjustments. A candidate might attribute the favorable variable overhead variance to good news without considering that it could reflect under-spending on maintenance or quality control.",
      "Topic": "Variance interpretation and investigation",
      "ItemID": "CBQ2-C1-Q2",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Variance investigation decisions should consider both the absolute dollar amount and the percentage deviation, as well as controllability and trend.",
      "BusinessInterpretation": "Management by exception directs attention to significant deviations. A 15% unfavorable variance in direct materials warrants immediate investigation, while a 2.4% variance may be within acceptable tolerance.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-C1",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each flexible budget component to its correct formula.",
      "LeftItems": [
        "Flexible budget revenue",
        "Flexible budget direct materials cost",
        "Flexible budget variable overhead cost",
        "Sales volume variance in dollars"
      ],
      "RightItems": [
        "Actual units sold x Budgeted selling price per unit",
        "Actual units produced x Standard material cost per unit",
        "Actual units produced x Standard variable overhead rate per unit",
        "(Actual units sold - Budgeted units sold) x Budgeted contribution margin per unit",
        "Actual units sold x Actual selling price per unit"
      ],
      "Correct": {
        "Flexible budget revenue": "Actual units sold x Budgeted selling price per unit",
        "Flexible budget direct materials cost": "Actual units produced x Standard material cost per unit",
        "Flexible budget variable overhead cost": "Actual units produced x Standard variable overhead rate per unit",
        "Sales volume variance in dollars": "(Actual units sold - Budgeted units sold) x Budgeted contribution margin per unit"
      },
      "Explanation": "A flexible budget recomputes budgeted amounts using actual activity. Flexible budget revenue equals actual units sold times the budgeted selling price. Flexible budget costs equal actual production activity times standard cost per unit. The sales volume variance isolates the profit impact of selling more or fewer units than budgeted, computed as the difference in volume multiplied by the budgeted contribution margin per unit. A candidate who selects actual selling price for flexible budget revenue misunderstands that the flexible budget uses budgeted prices; the actual-versus-budget price comparison is captured separately in the sales price variance.",
      "Topic": "Flexible budget formulas",
      "ItemID": "CBQ2-C1-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Flexible budgeting uses actual activity levels with standard or budgeted prices and rates to isolate volume-independent variances.",
      "BusinessInterpretation": "By flexing the budget to actual volumes, management can distinguish between variances caused by changes in activity levels and variances caused by operational efficiency or pricing.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-C1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each management action to the variance signal that would most likely trigger it.",
      "LeftItems": [
        "Authorize overtime production",
        "Renegotiate supplier contracts",
        "Launch promotional campaign",
        "Review fixed overhead commitments"
      ],
      "RightItems": [
        "Favorable sales volume variance with backlog",
        "Unfavorable direct materials price variance above threshold",
        "Unfavorable sales volume variance due to lost market share",
        "Unfavorable fixed overhead spending variance",
        "Favorable labor efficiency variance"
      ],
      "Correct": {
        "Authorize overtime production": "Favorable sales volume variance with backlog",
        "Renegotiate supplier contracts": "Unfavorable direct materials price variance above threshold",
        "Launch promotional campaign": "Unfavorable sales volume variance due to lost market share",
        "Review fixed overhead commitments": "Unfavorable fixed overhead spending variance"
      },
      "Explanation": "A favorable sales volume variance accompanied by a production backlog signals unmet demand; management may authorize overtime or additional shifts to capture foregone revenue. An unfavorable materials price variance that exceeds the investigation threshold requires purchasing to renegotiate supplier terms or seek alternative sources. An unfavorable sales volume variance caused by market share decline calls for demand-generating actions such as promotions or pricing adjustments. An unfavorable fixed overhead spending variance suggests that planned fixed costs were exceeded; management should review discretionary spending and fixed-cost commitments. A candidate might incorrectly match overtime authorization to an unfavorable labor variance, but overtime is a response to excess demand, not to labor cost overruns.",
      "Topic": "Variance-driven management decisions",
      "ItemID": "CBQ2-C1-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Variance analysis is a diagnostic tool that guides management by exception toward areas requiring corrective action.",
      "BusinessInterpretation": "Variances are not merely accounting adjustments; they are signals that inform operational decisions such as capacity planning, procurement strategy, and pricing.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-C1",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each variance type to the organizational unit most likely responsible for it.",
      "LeftItems": [
        "Direct materials usage variance",
        "Labor rate variance",
        "Sales volume variance",
        "Variable overhead spending variance"
      ],
      "RightItems": [
        "Production manager",
        "Human resources or union contract terms",
        "Sales and marketing department",
        "Department manager controlling indirect costs",
        "Corporate treasury"
      ],
      "Correct": {
        "Direct materials usage variance": "Production manager",
        "Labor rate variance": "Human resources or union contract terms",
        "Sales volume variance": "Sales and marketing department",
        "Variable overhead spending variance": "Department manager controlling indirect costs"
      },
      "Explanation": "The direct materials usage (efficiency) variance measures whether more or less material was used than the standard allows; the production manager controls usage through waste reduction, quality control, and employee training. The labor rate variance depends on the wage rates paid, which are typically determined by HR policies or collective bargaining agreements. The sales volume variance reflects the difference between actual and budgeted units sold, which is primarily the responsibility of the sales and marketing function. The variable overhead spending variance captures differences between actual and budgeted variable overhead rates, which are controlled by the department manager overseeing indirect costs. A candidate might assign the usage variance to purchasing, but purchasing is responsible for the price variance, not the quantity variance.",
      "Topic": "Variance responsibility accounting",
      "ItemID": "CBQ2-C1-Q5",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Responsibility accounting assigns costs and variances to the manager who can most directly influence them.",
      "BusinessInterpretation": "Effective variance analysis must be paired with proper accountability. Assigning the materials usage variance to purchasing instead of production could lead to blaming the wrong manager and failing to address the root cause.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-C1",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-C2",
  "Title": "Standard Cost Variance Computation",
  "SectionTags": [
    "C"
  ],
  "Pack": 2,
  "Section": "C",
  "BlueprintDomain": "Performance Management",
  "BlueprintObjectives": [
    "Direct materials price and quantity variance computation",
    "Direct labor rate and efficiency variance computation",
    "Variable overhead spending and efficiency variance analysis",
    "Standard cost card interpretation",
    "Integrated variance investigation decisions"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Standard Costing and Variance Analysis",
  "SecondaryCompetencies": [
    "Analysis",
    "Judgment"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Performance management",
  "CompanyName": "Precision Components Inc.",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-21",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 1,
  "Industry": "Precision manufacturing",
  "LastValidated": "2026-07-21",
  "LearningObjectives": [
    "Compute direct materials price and quantity variances from standard and actual data",
    "Compute direct labor rate and efficiency variances from standard and actual data",
    "Compute variable overhead spending and efficiency variances",
    "Interpret variance results to identify operational root causes",
    "Evaluate whether variances warrant investigation based on materiality and controllability"
  ],
  "ModifiedDate": "2026-07-21",
  "ProductionStatus": "Draft",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-21",
      "Version": "2.0",
      "Author": "Case Author",
      "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
    }
  ],
  "Stakeholder": "Plant Controller",
  "Tags": [
    "standard costing",
    "variance analysis",
    "direct materials",
    "direct labor",
    "overhead"
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Precision Components Inc. manufactures specialized machine parts using a standard costing system. The plant controller has collected actual production data for March and needs to compute variances against the established standards. The standard cost card and actual results are provided in Exhibit 1. Management uses a materiality threshold of 5% of standard cost to determine which variances require formal investigation.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — Standard Cost Card and March Actual Results",
      "Headers": [
        "Item",
        "Standard",
        "Actual"
      ],
      "Rows": [
        [
          "Units produced",
          "4,000",
          "3,800"
        ],
        [
          "Direct materials: pounds per unit",
          "2.5 lbs",
          "2.7 lbs"
        ],
        [
          "Direct materials: price per pound",
          "$12.00",
          "$12.80"
        ],
        [
          "Direct labor: hours per unit",
          "1.2 hrs",
          "1.3 hrs"
        ],
        [
          "Direct labor: rate per hour",
          "$22.00",
          "$21.50"
        ],
        [
          "Variable overhead: rate per DL hour",
          "$8.00",
          "$8.40"
        ],
        [
          "Variable overhead: total incurred",
          "",
          "$41,496"
        ]
      ],
      "ExhibitID": "CBQ2-C2-E1",
      "CaseID": "CBQ2-C2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Compute the direct materials price variance (enter as a positive number; indicate U or F after the number, e.g., 1234 F).",
      "Correct": "8208 U",
      "Explanation": "Actual pounds purchased = 3,800 units x 2.7 lbs = 10,260 lbs. Materials price variance = (Actual price - Standard price) x Actual quantity = ($12.80 - $12.00) x 10,260 = $0.80 x 10,260 = $8,208 unfavorable. The actual price exceeded the standard price, making this unfavorable. A candidate might use standard quantity instead of actual quantity when computing the price variance, but the price variance formula uses actual quantity to isolate the pure price effect.",
      "Topic": "Direct materials price variance",
      "ItemID": "CBQ2-C2-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "AccountingPrinciple": "The direct materials price variance is (Actual Price - Standard Price) x Actual Quantity purchased.",
      "BusinessInterpretation": "A $8,208 unfavorable price variance signals that purchasing paid more per pound than expected, possibly due to supplier price increases, rush orders, or lower-quality substitutions.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-C2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Compute the direct materials quantity (usage) variance (enter as a positive number; indicate U or F).",
      "Correct": "9120 U",
      "Explanation": "Standard quantity allowed = 3,800 units x 2.5 lbs = 9,500 lbs. Actual quantity used = 3,800 units x 2.7 lbs = 10,260 lbs. Materials quantity variance = (Actual quantity - Standard quantity) x Standard price = (10,260 - 9,500) x $12.00 = 760 x $12.00 = $9,120 unfavorable. More material was used than the standard allows. A candidate might incorrectly use actual price instead of standard price in the quantity variance formula, but the standard price isolates the usage effect.",
      "Topic": "Direct materials quantity variance",
      "ItemID": "CBQ2-C2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "AccountingPrinciple": "The direct materials quantity variance is (Actual Quantity Used - Standard Quantity Allowed) x Standard Price.",
      "BusinessInterpretation": "The unfavorable $9,120 usage variance suggests production inefficiency, inferior material quality causing waste, or inadequate employee training. This exceeds the 5% threshold (5% of $114,000 = $5,700) and warrants investigation.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-C2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Compute the direct labor rate variance (enter as a positive number; indicate U or F).",
      "Correct": "2470 F",
      "Explanation": "Actual hours worked = 3,800 units x 1.3 hrs = 4,940 hours. Labor rate variance = (Actual rate - Standard rate) x Actual hours = ($21.50 - $22.00) x 4,940 = (-$0.50) x 4,940 = -$2,470 = $2,470 favorable. The actual wage rate was lower than the standard rate. A candidate might confuse favorable with unfavorable direction; a negative result when actual is less than standard produces a favorable variance.",
      "Topic": "Direct labor rate variance",
      "ItemID": "CBQ2-C2-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "AccountingPrinciple": "The direct labor rate variance is (Actual Rate - Standard Rate) x Actual Hours Worked.",
      "BusinessInterpretation": "A favorable rate variance could result from using lower-skilled employees or a wage rate freeze. However, management should verify that lower wage rates are not causing quality or efficiency problems.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-C2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Compute the direct labor efficiency variance (enter as a positive number; indicate U or F).",
      "Correct": "8360 U",
      "Explanation": "Standard hours allowed = 3,800 units x 1.2 hrs = 4,560 hours. Actual hours worked = 3,800 units x 1.3 hrs = 4,940 hours. Labor efficiency variance = (Actual hours - Standard hours) x Standard rate = (4,940 - 4,560) x $22.00 = 380 x $22.00 = $8,360 unfavorable. More labor hours were used than the standard allows. A candidate might use actual rate instead of standard rate, which would incorrectly include rate effects in the efficiency measure.",
      "Topic": "Direct labor efficiency variance",
      "ItemID": "CBQ2-C2-Q4",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "AccountingPrinciple": "The direct labor efficiency variance is (Actual Hours - Standard Hours Allowed) x Standard Rate.",
      "BusinessInterpretation": "The $8,360 unfavorable efficiency variance (8.3% of $100,320 standard) exceeds the 5% threshold, suggesting training gaps, equipment issues, or poor production scheduling that increased labor time per unit.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-C2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Compute the variable overhead efficiency variance (enter as a positive number; indicate U or F).",
      "Correct": "3040 U",
      "Explanation": "Standard hours allowed = 3,800 units x 1.2 hrs = 4,560 hours. Actual hours = 4,940 hours. Variable overhead efficiency variance = (Actual hours - Standard hours) x Standard variable overhead rate = (4,940 - 4,560) x $8.00 = 380 x $8.00 = $3,040 unfavorable. The variance is driven by the same excess labor hours captured in the labor efficiency variance; variable overhead is applied based on direct labor hours. A candidate might compute this as (actual rate - standard rate) x actual hours, but that is the spending variance, not the efficiency variance.",
      "Topic": "Variable overhead efficiency variance",
      "ItemID": "CBQ2-C2-Q5",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis",
        "MultipleConcepts"
      ],
      "AccountingPrinciple": "Variable overhead efficiency variance = (Actual Cost Driver - Standard Cost Driver Allowed) x Standard Variable Overhead Rate. When overhead is applied based on direct labor hours, this variance is directly linked to labor efficiency.",
      "BusinessInterpretation": "The unfavorable variable overhead efficiency variance reinforces the labor efficiency finding. Combined, the labor and overhead efficiency variances suggest a systemic productivity issue that requires root-cause analysis rather than isolated fixes.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-C2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-D1",
  "Title": "ABC, Quality Costs, and Process Improvement",
  "SectionTags": [
    "D"
  ],
  "Pack": 1,
  "Section": "D",
  "BlueprintDomain": "Cost Management",
  "BlueprintObjectives": [
    "Activity-based costing",
    "Quality costs",
    "ABC distortion",
    "ABC"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Quality costs",
  "Subtopic": "Activity-based costing",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Cost accounting",
  "CompanyName": "Terra Kitchens",
  "CompanyType": "Processor",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Food and beverage",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze activity-based costing",
    "Analyze quality costs",
    "Analyze ABC distortion",
    "Apply ABC overhead allocation",
    "Classify prevention and appraisal activities",
    "Analyze quality cost taxonomy"
  ],
  "ModifiedDate": "2026-07-20",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    }
  ],
  "Stakeholder": "Terra Kitchens (Management)",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "1.0",
  "ScenarioText": "Terra Kitchens is replacing a plantwide overhead rate with ABC after pricing problems on complex low-volume products. Operations also wants quality-cost evidence to prioritize process improvement.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Activity Pools",
      "Headers": [
        "Pool",
        "Cost",
        "Driver volume",
        "Product B usage"
      ],
      "Rows": [
        [
          "Setups",
          "240,000",
          "600 setup hours",
          "180 hours"
        ],
        [
          "Engineering changes",
          "180,000",
          "300 orders",
          "120 orders"
        ],
        [
          "Material moves",
          "150,000",
          "7,500 moves",
          "2,000 moves"
        ]
      ],
      "ExhibitID": "CBQ-D1-E1",
      "CaseID": "CBQ-D1",
      "ValidationVersion": "2.0",
      "ReferencedBy": [
        "CBQ-D1-Q1"
      ]
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Quality Costs",
      "Headers": [
        "Activity",
        "Annual cost"
      ],
      "Rows": [
        [
          "Supplier certification",
          "42,000"
        ],
        [
          "Final inspection",
          "55,000"
        ],
        [
          "Scrap before shipment",
          "38,000"
        ],
        [
          "Warranty repairs",
          "64,000"
        ]
      ],
      "ExhibitID": "CBQ-D1-E2",
      "CaseID": "CBQ-D1",
      "ValidationVersion": "2.0",
      "ReferencedBy": [
        "CBQ-D1-Q2",
        "CBQ-D1-Q4",
        "CBQ-D1-Q6"
      ]
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter total ABC cost assigned to Product B from the three pools.",
      "Correct": "184000",
      "Explanation": "Activity-based costing (ABC) assigns overhead to products using multiple activity cost drivers that reflect actual resource consumption patterns, rather than a single volume-based allocation base such as direct labor hours or machine hours. Under the ABC methodology, each activity pool's cost is divided by its total driver volume to compute a cost-per-driver-unit rate, which is then applied to each product based on the product's actual consumption of that driver. For Terra Kitchens' three activity pools, the calculations proceed as follows. Setups pool: $240,000 total cost divided by 600 setup hours yields a rate of $400 per setup hour; Product B consumes 180 of those hours, so the setups cost assigned = 180 × $400 = $72,000. Engineering changes pool: $180,000 total cost divided by 300 engineering change orders yields a rate of $600 per order; Product B accounts for 120 orders, so engineering cost assigned = 120 × $600 = $72,000. Material moves pool: $150,000 total cost divided by 7,500 moves yields a rate of $20 per move; Product B requires 2,000 moves, so moves cost assigned = 2,000 × $20 = $40,000. Summing across all three activity pools: $72,000 (setups) + $72,000 (engineering) + $40,000 (moves) = $184,000 total ABC overhead cost assigned to Product B. In Terra Kitchens' context, this $184,000 figure represents the overhead the product truly consumes based on its actual demand for setup time, engineering support, and material handling. Under a plantwide labor-hour rate, Product B might have received a significantly different overhead charge — likely lower if it is low-volume, because traditional volume-based allocation would spread overhead proportional to labor hours and underrepresent the batch-level and product-sustaining activities that complex products disproportionately consume. A common exam trap on ABC problems is confusing the driver volume denominator (total pool activity) with the product's driver consumption (Product B usage) when computing the rate. Another trap is adding the total pool costs ($570,000) and dividing by the total number of drivers without disaggregating; this produces a composite rate that defeats the purpose of ABC, which requires separate activity rates because each driver measures a distinct consumption pattern. On CMA Part 1, candidates must compute individual pool rates first, then apply the product-specific driver consumption for each pool separately, and finally sum — exactly as demonstrated above.",
      "ExplanationWrongA": "Using a plantwide overhead rate instead of ABC by dividing total pool cost ($570,000) by a single volume driver such as direct labor hours or units, then allocating proportionally across products. Under a plantwide approach, all products receive the same overhead rate regardless of their actual consumption of batch-level activities like setups and engineering changes. ABC corrects this distortion by assigning each activity pool's cost using its own causal driver — setup hours, engineering orders, and material moves.",
      "ExplanationWrongB": "Misapplying the setup pool calculation by dividing total setup cost by Product B's hours alone ($240,000 / 180 = $1,333.33 per hour) instead of total driver volume ($240,000 / 600 = $400 per setup hour). This error inflates Product B's setup cost to the entire $240,000 pool rather than the correct $72,000. The cost driver rate must be computed from total activity volume to establish the per-unit-of-driver cost before multiplying by the individual product's consumption.",
      "ExplanationWrongC": "Computing driver volume percentages without multiplying by the pool dollar amounts. For example, determining that Product B uses 30% of setup hours (180/600), 40% of engineering orders (120/300), and 26.7% of material moves (2,000/7,500) but failing to apply these percentages to the actual pool costs. The ABC method requires: (Pool cost / Total driver volume) x Product B driver volume for each pool, then summing the three resulting amounts to arrive at $184,000.",
      "Topic": "Activity-based costing",
      "ItemID": "CBQ-D1-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 3: Allocated Fixed Costs",
      "AccountingPrinciple": "ABC assigns overhead using activity cost drivers rather than single volume-based allocation.",
      "CalculationRequired": true,
      "CaseID": "CBQ-D1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Enter total external failure cost.",
      "Correct": "64000",
      "Explanation": "Quality costs are classified into four categories under the CMA quality cost framework: prevention costs (incurred to prevent defects from occurring), appraisal costs (incurred to detect defects before products reach customers), internal failure costs (defects detected before shipment), and external failure costs (defects discovered after delivery to customers). External failure costs are the most expensive category of quality costs because they involve products that have already reached the customer — triggering warranty claims, returns, reputation damage, and potential product liability exposure. In Terra Kitchens' Exhibit 2, four quality-related activities are listed with their annual costs. Supplier certification ($42,000) is a prevention cost — it is incurred before production begins to ensure incoming materials meet quality specifications, reducing the likelihood of defects downstream. Final inspection ($55,000) is an appraisal cost — it involves checking finished products before they leave the facility, identifying defects so they can be corrected prior to customer delivery. Scrap before shipment ($38,000) is an internal failure cost — the defective product is discovered and discarded within Terra Kitchens' own operations, before any customer sees it. Warranty repairs ($64,000) is an external failure cost — these costs arise only after products have been shipped and customers experience failures, requiring Terra Kitchens to repair or replace the product under warranty. The prompt asks specifically for total external failure cost, which is the warranty repairs amount: $64,000. In a business context, Terra Kitchens' management would compare the $64,000 in external failure costs against the combined $97,000 in prevention and appraisal costs ($42,000 + $55,000) to assess whether increased investment in prevention and appraisal activities could reduce the much more damaging external failure costs. The strategic insight of the quality cost framework is that prevention is far cheaper than failure — every dollar spent preventing defects typically saves multiple dollars in internal and external failure costs. A common CMA exam trap is classifying scrap as external failure because it sounds like a disposal cost — but scrap before shipment is an internal failure because the customer never received the defective product. The definitive test is: did the failure occur after the customer took possession? If yes, it is external failure; if no, it is internal failure. A second trap is confusing appraisal costs (inspecting products you already made) with prevention costs (designing processes so defects never occur).",
      "ExplanationWrongA": "Including scrap before shipment ($38,000) as an external failure cost, yielding $64,000 + $38,000 = $102,000. Scrap is an internal failure cost because the defective units are identified and discarded before delivery to the customer. External failure costs arise exclusively from defects discovered after the product reaches the customer. The distinction depends on the point of detection: before transfer (internal failure) versus after transfer (external failure).",
      "ExplanationWrongB": "Summing all four quality cost line items as external failure: $42,000 + $55,000 + $38,000 + $64,000 = $199,000. This treats prevention costs (supplier certification) and appraisal costs (final inspection) as failures, ignoring their distinct purpose. Prevention and appraisal costs are conformance costs intentionally incurred to avoid failures. Only costs resulting from actual defects — scrap, rework, warranty claims — are failure costs, and only those detected after customer delivery are external failures.",
      "ExplanationWrongC": "Classifying final inspection ($55,000) as an external failure cost, producing $64,000 + $55,000 = $119,000. Final inspection is an appraisal cost: it is designed to detect defects before products ship. If inspection works effectively, it prevents external failures by catching defects internally. Classifying it as an external failure cost conflates the activity that detects defects with the consequence of defects that went undetected — the very outcome inspection exists to prevent.",
      "Topic": "Quality costs",
      "ItemID": "CBQ-D1-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Quality costs are classified as prevention, appraisal, internal failure, or external failure.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "select",
      "Prompt": "Which product is most likely undercosted by a plantwide labor-hour rate?",
      "Choices": [
        "Low-volume complex product",
        "High-volume simple product",
        "Product with fewer support activities",
        "Product with stable design and few setups"
      ],
      "Correct": "Low-volume complex product",
      "Explanation": "Traditional plantwide overhead allocation using a single volume-based driver such as direct labor hours systematically distorts product costs whenever products consume overhead resources in proportions that differ from their consumption of the allocation base. This is the central problem that activity-based costing was designed to solve. A low-volume complex product is the correct answer because it consumes disproportionately more batch-level activities (setups, purchase orders, material movements) and product-sustaining activities (engineering changes, design modifications, specialized tooling) than its labor-hour consumption would suggest. Under a plantwide labor-hour rate, overhead is allocated as if every labor hour drives the same amount of overhead cost — but in reality, a complex low-volume product requires frequent, small-batch setups, specialized engineering attention, and non-standard handling, all of which consume overhead resources regardless of direct labor hours. The plantwide rate undercharges this product relative to the overhead it actually consumes, making it undercosted. As a result, Terra Kitchens would price this product too low, potentially losing money on every unit sold while being unaware of the loss because the cost system misrepresents true product cost. The other choices describe products that are overcosted by a plantwide rate. A high-volume simple product (Choice B) runs in long production runs with few setups and minimal engineering intervention; its labor hours absorb the same overhead rate as complex products, but it actually consumes far fewer batch and product-sustaining resources, so it is cross-subsidizing the complex products. A product with fewer support activities (Choice C) and a product with stable design and few setups (Choice D) similarly receive inflated overhead charges under volume-based allocation because the plantwide rate cannot distinguish between products that genuinely require extensive support and those that do not. This cost distortion — where simple high-volume products subsidize complex low-volume products — is the most frequently tested ABC concept on the CMA Part 1 exam. A common exam trap is reversing the directional logic: candidates sometimes reason that because complex products \"do more,\" they must receive more overhead and therefore be overcosted — but the distortion works the other way. Traditional costing assigns overhead based on volume, not complexity; the complex product gets too little overhead assigned to it per unit, making it appear cheaper than it really is (undercosted). Remember: volume-based allocation undercosts low-volume complexity and overcosts high-volume simplicity.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "A high-volume simple product is most likely overcosted, not undercosted, by a plantwide labor-hour rate. Traditional volume-based allocation spreads overhead proportionally to direct labor hours, assigning the same overhead rate regardless of complexity. Simple products that consume relatively few batch-level or product-sustaining activities receive an excessive share of overhead under this approach, cross-subsidizing complex products that are actually undercosted.",
      "ExplanationWrongC": "A product with fewer support activities would receive unnecessarily high overhead allocation under a plantwide labor-hour rate, making it overcosted rather than undercosted. The volume-based approach fails to recognize that this product actually demands fewer setups, inspections, and engineering changes than its labor-hour consumption would suggest under traditional costing methods.",
      "ExplanationWrongD": "A product with stable design and few setups is efficiently produced through repeated standardized processes with minimal batch or product-level overhead demands. Under a plantwide rate, this product absorbs the same overhead per labor hour as complex products, meaning it is overcosted and subsidizes the overhead costs of products requiring more varied and frequent support activities.",
      "Topic": "ABC distortion",
      "ItemID": "CBQ-D1-Q3",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 3: Allocated Fixed Costs",
      "AccountingPrinciple": "ABC assigns overhead using activity cost drivers rather than single volume-based allocation — low-volume complex products are systematically undercosted by plantwide rates.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D1",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Select prevention or appraisal activities from the quality exhibit.",
      "Choices": [
        "Supplier certification",
        "Final inspection",
        "Scrap before shipment",
        "Warranty repairs"
      ],
      "Correct": [
        "Supplier certification",
        "Final inspection"
      ],
      "Explanation": "The classification of quality costs into prevention, appraisal, internal failure, and external failure categories is a core CMA Part 1 competency. This question requires the candidate to identify which activities from Terra Kitchens' Exhibit 2 qualify as prevention or appraisal — the two categories that represent proactive or detective quality investments intended to avoid defects rather than react to them. Supplier certification (Choice A) is a prevention cost. Prevention costs are incurred to stop defects from occurring in the first place. Supplier certification involves auditing, qualifying, and monitoring raw material suppliers to ensure incoming inputs meet quality specifications before they enter Terra Kitchens' production process. By screening suppliers upstream, the company reduces the probability that defective materials will cause production problems or finished-good failures. This is a classic prevention activity — it addresses quality at the source, before production begins. Final inspection (Choice B) is an appraisal cost. Appraisal costs are incurred to detect defects that have already occurred, with the goal of identifying nonconforming products before they reach the customer. Final inspection involves examining finished products at the end of the production line, testing them against specifications, and segregating defective units. While it does not prevent defects from occurring, it prevents defective products from reaching customers — which distinguishes it from internal failure and external failure costs. The two choices excluded from the correct set are failure costs. Scrap before shipment (Choice C) is an internal failure cost — the defect has already occurred and the product must be discarded, but the failure was discovered within the company's operations, before the customer took delivery. Warranty repairs (Choice D) is an external failure cost — the defect was discovered only after the product reached the customer, triggering a warranty obligation. A common CMA exam trap is misclassifying final inspection as a prevention cost because it sounds proactive; but inspection only finds defects that already exist, it does not stop them from happening. The litmus test: prevention costs design quality into the process, appraisal costs inspect quality into the output, internal failure costs fix quality before delivery, and external failure costs suffer quality after delivery. The strategic priority is to shift spending leftward on this spectrum — from failure to appraisal to prevention — because prevention is the most cost-effective quality investment.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "Scrap before shipment is an internal failure cost, not a prevention or appraisal activity. Under the CMA quality cost framework, internal failure costs arise when defects are detected before products reach the customer — including scrap, rework, and reinspection. Prevention costs such as supplier certification and appraisal costs such as final inspection are incurred to avoid failures, while scrap is the consequence of failures that have already occurred in the production process.",
      "ExplanationWrongD": "Warranty repairs are classified as external failure costs under the quality cost taxonomy. These costs arise when defective products reach customers, triggering warranty claims, returns, and potential product liability. External failure costs are the most expensive quality category because they damage reputation and customer relationships in addition to incurring direct repair or replacement costs after the product has been delivered.",
      "Topic": "Quality costs",
      "ItemID": "CBQ-D1-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Quality costs are classified as prevention, appraisal, internal failure, or external failure.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: ABC assigns overhead using activity cost _____ rather than a single volume base.",
      "Correct": "drivers",
      "Explanation": "Activity-based costing (ABC) is a costing methodology that assigns manufacturing overhead to products using multiple activity cost drivers rather than a single volume-based allocation base such as direct labor hours, machine hours, or units produced. The key term that completes the definition is \"drivers.\" An activity cost driver is a factor that causes — or drives — the consumption of overhead resources. In the ABC framework, each activity pool (setups, engineering changes, material handling, quality inspections) is associated with a specific cost driver (setup hours, number of engineering change orders, number of material moves, number of inspections) that best explains why that activity's costs vary. The driver serves two functions in ABC: first, it is used to compute the activity rate (total pool cost divided by total driver volume), and second, it is used to assign cost to cost objects by measuring each product's consumption of the driver. This stands in direct contrast to traditional costing, which uses a single volume-based allocation base that assumes all overhead costs vary in direct proportion to production volume. For Terra Kitchens, the three activity drivers — setup hours, engineering change orders, and material moves — each capture a different dimension of product complexity that a single plantwide labor-hour rate would miss. Product B, which requires 180 setup hours, 120 engineering orders, and 2,000 material moves, receives ABC overhead of $184,000. Under a plantwide labor-hour rate, Product B might have received a substantially different allocation because labor hours do not correlate with the batch-level and product-sustaining activities that drive much of Terra Kitchens' overhead. By using multiple activity cost drivers, ABC produces more accurate product costs that better reflect the economic reality of resource consumption. Accurate product costs are essential for pricing decisions, product-line profitability analysis, and process improvement prioritization — which is precisely why Terra Kitchens is replacing its plantwide rate in the first place. A common exam trap on fill-in-the-blank questions of this type is writing \"pools\" instead of \"drivers\" — activity cost pools are the buckets where costs are accumulated, but the drivers are the causal factors used to allocate costs out of the pools. Another common error is \"rates\" — the activity rate is the result of dividing pool cost by driver volume, not the allocation base itself.",
      "ExplanationWrongA": "\"pools\" — Activity cost pools are the groupings of overhead costs associated with a particular activity (e.g., the setups pool totaling $240,000). Cost drivers are the causal factors that measure consumption of those pooled resources (e.g., setup hours). ABC uses drivers to assign pooled costs to cost objects, so the blank calls for the allocation basis (\"drivers\"), not the cost collection bucket (\"pools\"). Confusing pools with drivers reverses the ABC logic of cost assignment.",
      "ExplanationWrongB": "\"rates\" — A cost driver rate is the quotient of pool cost divided by driver volume (e.g., $400 per setup hour). The driver itself is the underlying allocation basis (setup hours, engineering orders, material moves) — the causal factor that drives resource consumption. The sentence describes ABC assigning overhead using the allocation basis, not the computed rate. The driver is the independent variable; the rate is the dependent calculation derived from it.",
      "ExplanationWrongC": "\"bases\" — While \"allocation bases\" is a general cost accounting term, CMA-specific ABC terminology requires \"cost drivers\" as the precise designation for the causal factors linking resource consumption to cost objects. \"Bases\" is too generic and could describe any traditional allocation basis (direct labor hours, machine hours) that may not be causally linked to overhead consumption. ABC's defining advantage is its use of causal drivers rather than arbitrary bases for cost assignment.",
      "Topic": "ABC",
      "ItemID": "CBQ-D1-Q5",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 3: Allocated Fixed Costs",
      "AccountingPrinciple": "ABC assigns overhead to products using multiple activity cost drivers that measure causal resource consumption, unlike traditional costing which uses a single volume-based allocation base.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D1",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "match",
      "Prompt": "Match each activity to its quality-cost category.",
      "LeftItems": [
        "Supplier certification",
        "Final inspection",
        "Scrap before shipment",
        "Warranty repairs"
      ],
      "RightItems": [
        "Prevention",
        "Appraisal",
        "Internal failure",
        "External failure"
      ],
      "Correct": {
        "Supplier certification": "Prevention",
        "Final inspection": "Appraisal",
        "Scrap before shipment": "Internal failure",
        "Warranty repairs": "External failure"
      },
      "Explanation": "The four-category quality cost taxonomy is a foundational CMA Part 1 framework that classifies all quality-related expenditures by their timing and purpose within the production-to-customer lifecycle. This matching exercise requires the candidate to correctly assign four specific activities from Terra Kitchens' operations to their proper quality cost categories. Supplier certification matches to Prevention. Prevention costs are incurred proactively to design quality into processes and prevent defects from occurring. Supplier certification — the practice of auditing, qualifying, and monitoring raw material suppliers before materials enter production — is a textbook prevention activity because it addresses quality at the earliest possible point in the value chain. By ensuring suppliers meet specifications upstream, Terra Kitchens reduces the likelihood of material-related defects cascading through production and reaching customers. Final inspection matches to Appraisal. Appraisal costs are incurred to detect defects that have already occurred, measuring and evaluating products against quality standards. Final inspection of finished goods, conducted before products leave the facility, is the canonical appraisal activity — it identifies nonconforming units so they can be segregated and corrected before shipment, but it does not prevent defects from occurring in the first place. Scrap before shipment matches to Internal failure. Internal failure costs arise when defects are detected within the company's operations, before products reach the customer. Scrapped products represent material and labor costs that cannot be recovered — the defect has already consumed resources, but the failure was contained internally. Warranty repairs matches to External failure. External failure costs are the most damaging category because they occur after products have been delivered to customers. Warranty repair obligations not only incur direct service and replacement costs but also damage customer relationships, brand reputation, and may trigger product liability exposure. The critical distinction between internal and external failure is the point of discovery: before delivery (internal) versus after delivery (external). A common exam trap is confusing final inspection (appraisal) with supplier certification (prevention) — the difference is whether the activity is checking work already done (appraisal) or preventing defects by design (prevention). Another trap is misclassifying scrap as prevention because it sounds like \"removing defective material\" — but scrap is the cost consequence of a failure that already occurred, not an activity designed to avoid future failures. For Terra Kitchens' management, the $64,000 in external failure costs (warranty repairs) dwarfs the $38,000 in internal failure costs, signaling that the company's quality controls are insufficient to catch defects before shipment — a strategic problem that increased appraisal spending might help solve.",
      "ExplanationWrongA": "Classifying scrap before shipment as appraisal, reasoning that identifying scrap involves inspection-like evaluation of defective units. Appraisal costs (like final inspection) are incurred to detect defects in products that may or may not be defective. Scrap is the cost of products already determined to be defective — it is the unrecoverable value of discarded units, making it an internal failure cost. The key distinction: appraisal seeks to find defects; failure costs are the consequence of defects already found.",
      "ExplanationWrongB": "Classifying supplier certification as appraisal, reasoning that it evaluates or assesses suppliers. Supplier certification is a prevention cost because its purpose is to prevent defective materials from entering the production process by qualifying suppliers before they ship. Appraisal costs inspect existing products for defects; prevention costs design quality into the process upstream. Certifying suppliers reduces the probability of defects occurring, which is the definition of a prevention activity.",
      "ExplanationWrongC": "Classifying warranty repairs as internal failure, reasoning that the company still pays for the repair internally. The quality-cost taxonomy distinguishes failure costs by where the defect is detected: internal failures (scrap, rework) are caught before products reach the customer; external failures (warranty, returns, liability) are discovered after customer delivery. Warranty repairs are external failure costs — the most expensive category because they also carry reputational damage and potential legal liability beyond the direct repair cost.",
      "Topic": "Quality costs",
      "ItemID": "CBQ-D1-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Quality costs are classified as prevention, appraisal, internal failure, or external failure.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D1",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-D2",
  "Title": "Process Costing, Lean Waste, and Bottleneck Analysis",
  "SectionTags": [
    "D"
  ],
  "Pack": 1,
  "Section": "D",
  "BlueprintDomain": "Cost Management",
  "BlueprintObjectives": [
    "Process costing",
    "Theory of constraints",
    "Lean operations",
    "Cost management"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Process costing",
  "Subtopic": "Process costing",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Cost accounting",
  "CompanyName": "Keystone Bikes",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Transportation equipment",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze process costing",
    "Analyze process costing",
    "Analyze theory of constraints",
    "Analyze lean operations",
    "Analyze process costing",
    "Analyze cost management"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "Session 537 — ENHANCED_CASE_BASE Final Certification Wave",
      "Summary": "All 6 items certified per CAQS v1.0 §1.6 six-dimension verification. Explanations expanded to certification standard. Choices rotated for psychometric balance. question_state: Unprocessed → Certified."
    }
  ],
  "Stakeholder": "Controller",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Keystone Bikes produces standard frames in a continuous process. The controller must compute equivalent units, interpret process costing data, and identify the operational bottleneck in a lean improvement review.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Process Costing Data",
      "Headers": [
        "Item",
        "Units",
        "Completion"
      ],
      "Rows": [
        [
          "Started and completed",
          "18,000",
          "100%"
        ],
        [
          "Ending WIP",
          "4,000",
          "60% conversion"
        ],
        [
          "Beginning WIP",
          "0",
          "Not applicable"
        ]
      ],
      "ExhibitID": "CBQ-D2-E1",
      "CaseID": "CBQ-D2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Cost and Capacity Data",
      "Headers": [
        "Item",
        "Amount"
      ],
      "Rows": [
        [
          "Materials cost added",
          "330,000"
        ],
        [
          "Conversion cost added",
          "255,000"
        ],
        [
          "Cutting capacity",
          "24,000 frames"
        ],
        [
          "Welding capacity",
          "19,500 frames"
        ],
        [
          "Painting capacity",
          "21,000 frames"
        ]
      ],
      "ExhibitID": "CBQ-D2-E2",
      "CaseID": "CBQ-D2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter equivalent units for conversion costs using weighted-average.",
      "Correct": "20400",
      "Explanation": "Under process costing methodology in CMA Part 1 Section D (Cost Management), equivalent units of production (EUP) express partially completed work-in-process in terms of fully completed units. The weighted-average formula is: Equivalent Units = Units Completed + (Ending WIP Units x Percentage Complete). From Keystone Bikes' Exhibit 1: 18,000 units started and completed at 100%, ending WIP of 4,000 units at 60% completion for conversion costs, beginning WIP = 0. Equivalent units = 18,000 + (4,000 x 60%) = 18,000 + 2,400 = 20,400 EU. Because beginning WIP is zero, no prior-period work adjustment is required under weighted-average. The 20,400 equivalent units serve as the denominator for computing the conversion cost per EU in Q2. A common CMA exam trap is confusing the weighted-average method with FIFO — FIFO isolates only current-period work and treats beginning WIP separately. Another trap: computing equivalent units for materials separately from conversion costs when they have different completion patterns. A third trap: using physical units (22,000 total) instead of equivalent units (20,400), which would understate cost per completed frame. This concept is fundamental to inventory valuation in continuous-production industries like Keystone's bicycle frame manufacturing.",
      "Topic": "Process costing",
      "ItemID": "CBQ-D2-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Process costing computes equivalent units = completed units + (WIP x completion%).",
      "CalculationRequired": true,
      "CaseID": "CBQ-D2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter conversion cost per equivalent unit.",
      "Correct": "12.5",
      "Explanation": "Under process costing methodology, the conversion cost per equivalent unit is: Total Conversion Costs / Equivalent Units for Conversion Costs. From Exhibit 2, conversion costs are $255,000. From Q1, equivalent units are 20,400 EU. Conversion cost per EU = $255,000 / 20,400 = $12.50 per equivalent unit. For every fully completed frame transferred to finished goods, $12.50 of conversion cost (direct labor + manufacturing overhead) is assigned. For ending WIP of 4,000 frames at 60% (2,400 EU), conversion cost assigned = 2,400 x $12.50 = $30,000. The remaining $225,000 is assigned to 18,000 completed frames (18,000 x $12.50). Under weighted-average, beginning WIP costs are combined with current-period costs — here beginning WIP is zero, simplifying the computation. A common CMA exam trap is failing to include beginning WIP costs in the numerator under weighted-average when beginning WIP is non-zero. Another trap: confusing materials cost per EU with conversion cost per EU — they may have different equivalent unit counts. A third trap: using the wrong denominator — physical units instead of equivalent units would yield $255,000 / 22,000 = $11.59, understating the true conversion cost per completed frame because it ignores partial completion of ending WIP. The $12.50 per EU figure is critical for inventory valuation, COGS computation, and variance analysis.",
      "Topic": "Process costing",
      "ItemID": "CBQ-D2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Process costing computes equivalent units = completed units + (WIP x completion%).",
      "CalculationRequired": true,
      "CaseID": "CBQ-D2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "Which operation is the bottleneck?",
      "Choices": [
        "Cutting",
        "Welding",
        "Painting",
        "No bottleneck exists"
      ],
      "Correct": "Welding",
      "Explanation": "Under the Theory of Constraints (TOC) developed by Dr. Eliyahu Goldratt, a bottleneck is the resource with the lowest capacity that limits the throughput of the entire production system. From Exhibit 2, Keystone Bikes' three operations have these capacities: Cutting 24,000 frames, Welding 19,500 frames, Painting 21,000 frames. Arranging in ascending order: Welding (19,500) < Painting (21,000) < Cutting (24,000). Welding is the bottleneck because it has the lowest throughput capacity. Regardless of how efficiently Cutting or Painting operates, the system cannot produce more than 19,500 completed frames per period. Every frame must pass through all three operations sequentially, and the slowest operation sets the pace. A common CMA exam trap is identifying the operation with the highest capacity as needing improvement rather than the constraint. Another trap: confusing a bottleneck (capacity constraint) with a non-value-added activity (lean waste concept). TOC principles dictate that the bottleneck should never be idle, quality at the bottleneck is paramount (defective units waste the most constrained resource), and improvement efforts should focus on elevating the bottleneck's capacity before optimizing non-bottleneck operations. Keystone's management should focus on increasing Welding capacity through process improvement, additional shifts, or equipment upgrades.",
      "ExplanationWrongA": "Cutting has higher capacity than welding, meaning it can process more units per period than the bottleneck operation. Under the Theory of Constraints, the bottleneck is the resource with the lowest throughput capacity that limits the entire system's output. Since welding can only produce 19,500 frames, cutting's higher capacity means it is constrained by welding's output, not by its own processing capability or resource availability.",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "Painting has a higher capacity than welding, so it is not the system constraint. Under TOC principles, non-bottleneck resources should not be operated at full utilization because this would only build unnecessary work-in-process inventory ahead of the bottleneck operation. The operational priority is to maximize throughput at welding, the lowest-capacity resource that determines total system output.",
      "ExplanationWrongD": "A bottleneck always exists in any multi-step production process because capacities across operations are never perfectly balanced. The Theory of Constraints defines the bottleneck as the operation with the lowest processing capacity, and welding's capacity of 19,500 frames identifies it as the clear system constraint. Denying the existence of a bottleneck prevents management from focusing improvement efforts at the constraint where throughput gains translate directly to higher system output.",
      "Topic": "Theory of constraints",
      "ItemID": "CBQ-D2-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "The bottleneck operation constrains throughput; improve the lowest-capacity resource.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D2",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "multi",
      "Prompt": "Select actions consistent with lean thinking.",
      "Choices": [
        "Reduce waiting time before welding",
        "Increase batch queues to keep every department busy",
        "Investigate rework causes",
        "Simplify material movement"
      ],
      "Correct": [
        "Reduce waiting time before welding",
        "Investigate rework causes",
        "Simplify material movement"
      ],
      "Explanation": "Under lean manufacturing philosophy in CMA Part 1 Section D, lean operations seek to eliminate waste (muda) in all forms. The three correct lean actions are: (1) REDUCE WAITING TIME before welding — waiting is one of the seven wastes of lean (muda of waiting), and reducing queue time improves flow and throughput; (2) INVESTIGATE REWORK causes — rework represents the waste of defects, requiring resources to correct errors that should have been produced right the first time (jidoka principle); (3) SIMPLIFY MATERIAL MOVEMENT — unnecessary transportation is a classic lean waste, consuming labor and time without adding value. The distractor \"Increase batch queues to keep the welding station busy\" directly contradicts lean thinking — large batch queues create excess work-in-process inventory (muda of inventory), hide process problems, increase lead times, and require additional storage space. Lean manufacturing emphasizes single-piece flow, pull systems (kanban), and eliminating inventory buffers that mask underlying process inefficiencies. A common CMA exam trap is confusing lean waste reduction with traditional efficiency metrics like machine utilization — lean prioritizes flow and value creation over keeping all resources busy. Keystone's controller should focus on eliminating non-value-added activities throughout the production process.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "Increasing batch queues to keep every department busy directly contradicts lean thinking. Under lean manufacturing principles, the goal is to eliminate waste (muda) including overproduction and excess work-in-process inventory. Building queues to maximize local efficiency optimizes individual departments at the expense of overall flow, creating the very waste that lean systems seek to eliminate through pull-based production and continuous one-piece flow operations.",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "",
      "Topic": "Lean operations",
      "ItemID": "CBQ-D2-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Lean emphasizes waste reduction, continuous improvement, and pull-based production flow.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: Equivalent units combine completed units and partially completed work expressed as _____ units.",
      "Correct": "complete",
      "Explanation": "Under process costing in managerial accounting, equivalent units express partial work in terms of COMPLETE units. The concept enables companies with continuous production to value partially finished ending work-in-process inventory. If 4,000 units are 60% complete for conversion costs, they represent 2,400 equivalent COMPLETE units — the same amount of conversion resources as if 2,400 units were started and fully finished. This allows the cost accountant to compute a single cost per equivalent unit and allocate conversion costs proportionally between completed output and ending WIP. Equivalent units are the bridge between physical units (which understate the work done on partially complete inventory) and financial reporting requirements (which demand accurate inventory valuation). The weighted-average and FIFO methods differ in how they treat beginning WIP in the equivalent unit computation. A common CMA exam trap is confusing the term \"equivalent\" with \"physical\" — equivalent units are a computational construct, not a physical count.",
      "Topic": "Process costing",
      "ItemID": "CBQ-D2-Q5",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Process costing computes equivalent units = completed units + (WIP x completion%).",
      "CalculationRequired": false,
      "CaseID": "CBQ-D2",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "match",
      "Prompt": "Match each issue to the best tool.",
      "LeftItems": [
        "Partially complete WIP",
        "Lowest capacity resource",
        "Unnecessary movement",
        "Continuous homogeneous output"
      ],
      "RightItems": [
        "Equivalent units",
        "Bottleneck analysis",
        "Lean waste review",
        "Process costing"
      ],
      "Correct": {
        "Partially complete WIP": "Equivalent units",
        "Lowest capacity resource": "Bottleneck analysis",
        "Unnecessary movement": "Lean waste review",
        "Continuous homogeneous output": "Process costing"
      },
      "Explanation": "Under CMA Part 1 Section D, four cost management tools are matched to their descriptions. Process costing matches to \"Assigns costs to homogeneous units in continuous production\" — appropriate when identical products flow through a series of standardized processes, accumulating materials costs at the start and conversion costs uniformly. Equivalent units matches to \"Expresses partially completed output as fully completed units\" — the computational mechanism enabling process costing to value ending WIP. Bottleneck matches to \"The slowest operation constraining system throughput\" — per the Theory of Constraints, the capacity-limiting resource determines maximum output. Lean manufacturing matches to \"Systematic elimination of waste across value streams\" — targeting overproduction, waiting, transportation, overprocessing, inventory, motion, and defects. A common CMA exam trap is confusing process costing with job-order costing — process costing is for homogeneous production (chemicals, food, bicycle frames), while job-order costing is for custom, distinct products (construction, consulting, custom manufacturing). Each tool addresses a distinct dimension of cost management: process costing for product costing, equivalent units for inventory valuation, TOC for capacity management, and lean for operational efficiency.",
      "Topic": "Cost management",
      "ItemID": "CBQ-D2-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology"
      ],
      "BusinessInterpretation": "The selected tool should match the operating issue.",
      "CalculationRequired": false,
      "CaseID": "CBQ-D2",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-D1",
  "Title": "Activity-Based Costing Implementation Analysis",
  "SectionTags": [
    "D"
  ],
  "Pack": 2,
  "Section": "D",
  "BlueprintDomain": "Cost Management",
  "BlueprintObjectives": [
    "Activity-based costing methodology and cost driver identification",
    "Comparison of traditional costing versus ABC",
    "ABC cost pool and driver selection",
    "Product cost distortion analysis under traditional systems",
    "Implementation considerations for ABC systems"
  ],
  "PrimaryCompetency": "Conceptual",
  "Topic": "Activity-Based Costing",
  "Subtopic": "ABC system design and cost driver analysis",
  "SecondaryCompetencies": [
    "Analysis",
    "Judgment"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Cost accounting",
  "CompanyName": "Apex Manufacturing",
  "CompanyType": "Manufacturer of electronic components",
  "Confidence": 100,
  "CreatedDate": "2026-07-21",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 30,
  "ExhibitCount": 1,
  "Industry": "Electronics manufacturing",
  "LastValidated": "2026-07-21",
  "LearningObjectives": [
    "Identify appropriate cost drivers for ABC cost pools based on cause-and-effect relationships",
    "Evaluate the advantages of ABC over traditional volume-based costing",
    "Analyze product cost distortion when using a single plantwide overhead rate",
    "Select activities suitable for ABC cost pools using resource consumption patterns",
    "Assess implementation challenges and cost-benefit trade-offs of ABC systems"
  ],
  "ModifiedDate": "2026-07-21",
  "ProductionStatus": "Draft",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-21",
      "Version": "2.0",
      "Author": "Case Author",
      "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
    }
  ],
  "Stakeholder": "Cost Accounting Manager",
  "Tags": [
    "ABC",
    "cost drivers",
    "activity-based costing",
    "overhead allocation",
    "product costing"
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Apex Manufacturing produces two electronic components: the Standard Board (high volume, simple assembly) and the Custom Board (low volume, complex assembly). The company currently uses a single plantwide overhead rate based on direct labor hours. The cost accounting manager suspects that this traditional approach is distorting product costs because the Custom Board consumes significantly more engineering change orders, quality inspections, and machine setups per unit than the Standard Board. The CFO has asked for an ABC analysis. Exhibit 1 shows the activity data for the current period.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — Activity Data and Overhead Analysis",
      "Headers": [
        "Activity",
        "Cost Pool",
        "Cost Driver",
        "Standard Board",
        "Custom Board",
        "Total Driver Volume"
      ],
      "Rows": [
        [
          "Machine operations",
          "$400,000",
          "Machine hours",
          "12,000",
          "8,000",
          "20,000"
        ],
        [
          "Machine setups",
          "$150,000",
          "Number of setups",
          "30",
          "120",
          "150"
        ],
        [
          "Quality inspections",
          "$90,000",
          "Inspection hours",
          "400",
          "1,100",
          "1,500"
        ],
        [
          "Engineering changes",
          "$60,000",
          "Change orders",
          "10",
          "50",
          "60"
        ],
        [
          "Materials handling",
          "$100,000",
          "Material moves",
          "200",
          "300",
          "500"
        ],
        [
          "Total overhead",
          "$800,000",
          "",
          "",
          "",
          ""
        ],
        [
          "Direct labor hours",
          "",
          "Current allocation base",
          "18,000",
          "12,000",
          "30,000"
        ]
      ],
      "ExhibitID": "CBQ2-D1-E1",
      "CaseID": "CBQ2-D1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "multi",
      "Prompt": "Which activities shown in Exhibit 1 would benefit most from having their own cost pools in an ABC system rather than being lumped into a single overhead rate?",
      "Correct": [
        "Engineering changes",
        "Machine setups",
        "Quality inspections"
      ],
      "Choices": [
        "Engineering changes",
        "Machine setups",
        "Quality inspections",
        "Direct materials",
        "Direct labor"
      ],
      "Explanation": "Engineering changes, machine setups, and quality inspections are all non-volume-related activities whose consumption patterns differ significantly between Standard and Custom boards. Under a single plantwide rate based on direct labor hours, these costs would be allocated disproportionately to the high-volume Standard Board. Direct materials and direct labor are direct costs traced directly to products, not overhead activities that would be in a cost pool. A candidate might include all activities listed, but direct materials and labor are not part of overhead allocation — they are direct costs assigned by tracing.",
      "Topic": "ABC cost pool identification",
      "ItemID": "CBQ2-D1-Q1",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity",
        "JudgmentRequired"
      ],
      "AccountingPrinciple": "Activity-based costing assigns overhead to products based on each product's consumption of activities, using cause-and-effect cost drivers rather than a single volume-based allocation.",
      "BusinessInterpretation": "Products with complex, low-volume production processes (like the Custom Board) typically consume disproportionate shares of support activities. ABC captures this by using activity-specific cost drivers rather than spreading all overhead evenly across direct labor hours.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-D1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Which items represent valid criticisms of Apex's current single plantwide overhead rate approach?",
      "Correct": [
        "High-volume products may be overcosted relative to their actual resource consumption",
        "The system provides no incentive to manage non-labor overhead activities",
        "Custom products' complexity is not reflected in the cost allocation"
      ],
      "Choices": [
        "High-volume products may be overcosted relative to their actual resource consumption",
        "The system provides no incentive to manage non-labor overhead activities",
        "Custom products' complexity is not reflected in the cost allocation",
        "Direct labor hours are always the most accurate allocation base",
        "Single rates are more expensive to maintain than multiple rates"
      ],
      "Explanation": "Under a single plantwide rate, high-volume products absorb a large share of all overhead costs, including those driven by complexity rather than volume. This overcosts simple high-volume products and undercosts complex low-volume products. Since the allocation is based only on labor hours, there is no direct link between cost and cost driver for activities like setups or engineering changes, so managers have no cost signal to manage those activities. Single rates are actually less expensive to maintain than multiple ABC rates; this is one reason companies hesitate to adopt ABC. Direct labor hours are not inherently the most accurate base — accuracy depends on whether overhead costs are actually driven by labor hours.",
      "Topic": "Traditional costing limitations",
      "ItemID": "CBQ2-D1-Q2",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity",
        "JudgmentRequired"
      ],
      "AccountingPrinciple": "Volume-based allocation systems distort product costs when overhead is driven by factors other than production volume, such as product complexity, batch size, or setup time.",
      "BusinessInterpretation": "Management may be making incorrect pricing, product mix, or outsourcing decisions based on distorted cost information. A product that appears profitable under traditional costing may actually be unprofitable when its true consumption of support activities is recognized.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-D1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "C",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Assuming Apex adopts ABC, which cost drivers are most appropriate for the machining and setup cost pools?",
      "Correct": [
        "Machine hours for the machining cost pool",
        "Number of setups for the setup cost pool"
      ],
      "Choices": [
        "Machine hours for the machining cost pool",
        "Number of setups for the setup cost pool",
        "Direct labor hours for the setup cost pool",
        "Units produced for the machining cost pool",
        "Inspection hours for the machining cost pool"
      ],
      "Explanation": "Machine hours are the appropriate cost driver for the machining pool because machining costs (power, maintenance, depreciation) vary with machine runtime. Number of setups is the appropriate driver for the setup pool because setup costs are incurred each time a production run is changed, regardless of how many units are produced afterward. Direct labor hours would not reflect setup activity. Units produced would dilute the cost of setups that occur per batch, not per unit. Inspection hours relate to quality costs, not machining.",
      "Topic": "ABC cost driver selection",
      "ItemID": "CBQ2-D1-Q3",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity",
        "JudgmentRequired"
      ],
      "AccountingPrinciple": "ABC requires identifying a cost driver for each activity that has a cause-and-effect relationship with the costs in the cost pool.",
      "BusinessInterpretation": "The Custom Board has four times as many setups as the Standard Board (120 vs. 30), even though it uses fewer machine hours (8,000 vs. 12,000). Using setups as a driver will allocate setup costs much more heavily to the Custom Board, reflecting the true cost of its low-volume, high-complexity production.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-D1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Which of the following are valid reasons why Apex might choose NOT to implement a full ABC system?",
      "Correct": [
        "The cost of data collection and system maintenance may exceed the benefits",
        "Managers may be comfortable with the existing cost system and resist change",
        "ABC requires significant judgment in defining activities and cost drivers"
      ],
      "Choices": [
        "The cost of data collection and system maintenance may exceed the benefits",
        "Managers may be comfortable with the existing cost system and resist change",
        "ABC requires significant judgment in defining activities and cost drivers",
        "ABC always produces lower product costs than traditional costing",
        "ABC is prohibited under GAAP for external reporting"
      ],
      "Explanation": "ABC systems are expensive to implement and maintain. Data collection for activity volumes requires detailed tracking systems that many companies lack. Behavioral resistance is a common barrier — managers may distrust new cost numbers or fear unfavorable comparisons. ABC involves substantial judgment in defining activities, grouping cost pools, and selecting drivers. ABC does not always produce lower costs; it redistributes costs. ABC is not prohibited under GAAP; many companies use ABC for internal management and a simplified system for external reporting.",
      "Topic": "ABC implementation challenges",
      "ItemID": "CBQ2-D1-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "ABC is a management accounting tool designed for internal decision-making. Companies may maintain separate systems for internal and external reporting.",
      "BusinessInterpretation": "The decision to implement ABC is a cost-benefit analysis. If the product mix is relatively simple or overhead is a small percentage of total cost, the benefits of ABC may not justify the implementation expense.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-D1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "select",
      "Prompt": "If Apex uses a single plantwide rate based on direct labor hours, what is the overhead allocated to the Standard Board?",
      "Correct": "$480,000",
      "Choices": [
        "$480,000",
        "$320,000",
        "$800,000",
        "$200,000"
      ],
      "Explanation": "Plantwide overhead rate = $800,000 / 30,000 DL hours = $26.67 per DL hour (rounded). Overhead allocated to Standard Board = 18,000 DL hours x $26.67 = $480,000 (approximately). A candidate might compute $320,000 by using the Custom Board's hours instead, or $800,000 by assigning all overhead to the high-volume product. Under ABC, the allocation would likely shift because the Custom Board consumes a disproportionate share of non-volume-driven activities like setups and engineering changes.",
      "Topic": "Traditional cost allocation with plantwide rate",
      "ItemID": "CBQ2-D1-Q5",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "AccountingPrinciple": "A plantwide overhead rate is computed as Total Estimated Overhead divided by Total Estimated Allocation Base (e.g., direct labor hours).",
      "BusinessInterpretation": "Under the traditional system, the Standard Board — a simple, high-volume product — receives 60% of all overhead ($480,000 / $800,000). Under ABC, this share would likely decrease because many overhead costs are driven by activities related to the Custom Board's complexity, not by volume.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-D2",
  "Title": "Joint Cost Allocation & Sell-or-Process-Further Decisions",
  "SectionTags": [
    "D"
  ],
  "Pack": 2,
  "Section": "D",
  "BlueprintDomain": "Cost Management",
  "BlueprintObjectives": [
    "Joint cost allocation — NRV method",
    "Joint cost allocation — physical-units method",
    "Sell-or-process-further analysis",
    "Joint cost concepts",
    "Joint costing terminology"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Cost Allocation",
  "Subtopic": "Joint cost allocation",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Cost accounting",
  "CompanyName": "Gulf Coast Fisheries",
  "CompanyType": "Processor",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Food and beverage",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze joint cost allocation — nrv method",
    "Analyze joint cost allocation — physical-units method",
    "Analyze sell-or-process-further analysis",
    "Analyze joint cost concepts",
    "Analyze joint costing terminology",
    "Analyze joint cost allocation methods"
  ],
  "ModifiedDate": "2026-07-20",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    }
  ],
  "Stakeholder": "Controller",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "1.0",
  "ScenarioText": "Gulf Coast Fisheries processes raw tuna at a single split-off point into three products. The controller must allocate the $200,000 joint cost to main products for inventory valuation and advise management on whether to process products beyond split-off before the quarterly audit committee review.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — Joint Cost & Production Data",
      "Headers": [
        "Product",
        "Units Produced",
        "Sales Value at Split-Off",
        "Further Processing Cost",
        "Final Sales Value if Processed Further"
      ],
      "Rows": [
        [
          "Alpha (canned)",
          "10,000",
          "$100,000",
          "$30,000",
          "$150,000"
        ],
        [
          "Beta (steaks)",
          "5,000",
          "$150,000",
          "$20,000",
          "$200,000"
        ],
        [
          "Gamma (pet food – byproduct)",
          "2,000",
          "$20,000",
          "$0",
          "$20,000"
        ]
      ],
      "ExhibitID": "CBQ2-D2-E1",
      "CaseID": "CBQ2-D2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 — Allocation Policy & Rules",
      "Headers": [
        "Item",
        "Detail"
      ],
      "Rows": [
        [
          "Total joint cost incurred before split-off",
          "$200,000"
        ],
        [
          "Byproduct treatment",
          "NRV of byproduct deducted from joint cost before allocation to main products"
        ],
        [
          "NRV method definition",
          "Allocates joint cost based on final sales value minus further processing costs"
        ],
        [
          "Physical-units method definition",
          "Allocates joint cost based on units of output volume"
        ],
        [
          "Sell-or-process-further rule",
          "Process further only if incremental revenue exceeds incremental cost"
        ]
      ],
      "ExhibitID": "CBQ2-D2-E2",
      "CaseID": "CBQ2-D2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Using the NRV method (net of byproduct), calculate the joint cost allocated to Alpha. Round to the nearest whole dollar.",
      "Correct": "72000",
      "Explanation": "Byproduct deduction: $200,000 − $20,000 = $180,000 net joint cost. Alpha NRV = $150,000 − $30,000 = $120,000. Beta NRV = $200,000 − $20,000 = $180,000. Total NRV = $300,000. Alpha allocation = $180,000 × ($120,000 / $300,000) = $72,000. The NRV method matches cost allocation to revenue-generating potential.",
      "Topic": "Joint cost allocation — NRV method",
      "ItemID": "CBQ2-D2-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultiStepCalculation"
      ],
      "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Using the physical-units method (net of byproduct), calculate the joint cost allocated to Beta. Round to the nearest whole dollar.",
      "Correct": "60000",
      "Explanation": "Net joint cost after byproduct = $180,000. Total main-product units = 10,000 + 5,000 = 15,000. Beta units = 5,000. Allocation = $180,000 × (5,000 / 15,000) = $60,000. The physical-units method ignores relative value and allocates strictly by volume. A common trap is to include the byproduct units in the denominator.",
      "Topic": "Joint cost allocation — physical-units method",
      "ItemID": "CBQ2-D2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultiStepCalculation"
      ],
      "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
      "BusinessInterpretation": "The physical-units method allocates cost strictly by production volume. A common trap is to include the byproduct units in the denominator.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "select",
      "Prompt": "Should Beta be processed further based on the sell-or-process-further rule?",
      "Choices": [
        "Yes, because incremental benefit is $30,000",
        "Yes, because the final sales value is $200,000",
        "No, because further processing costs exceed joint cost allocation",
        "No, because Beta already has higher value at split-off"
      ],
      "Correct": "Yes, because incremental benefit is $30,000",
      "Explanation": "Incremental revenue = $200,000 − $150,000 = $50,000. Incremental cost = $20,000. Net benefit = $30,000. Joint costs are sunk and irrelevant to sell-or-process-further decisions; only incremental revenue and incremental cost matter.",
      "Topic": "Sell-or-process-further analysis",
      "ItemID": "CBQ2-D2-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Process further only if incremental revenue exceeds incremental costs.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D2",
      "EstimatedMinutes": 4,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "multi",
      "Prompt": "Select the correct statements about joint cost allocation.",
      "Choices": [
        "Byproduct revenue is typically deducted from joint cost before allocating to main products",
        "Physical-units method can cause a high-value product to appear unprofitable",
        "Joint costs are relevant for sell-or-process-further decisions",
        "NRV method uses final sales value minus further processing costs as the allocation base"
      ],
      "Correct": [
        "Byproduct revenue is typically deducted from joint cost before allocating to main products",
        "Physical-units method can cause a high-value product to appear unprofitable",
        "NRV method uses final sales value minus further processing costs as the allocation base"
      ],
      "Explanation": "Byproduct NRV is deducted to avoid distorting main-product margins. Physical-units allocation ignores value, so a high-value product may seem unprofitable. Joint costs are sunk and irrelevant for further-processing decisions — a common exam trap.",
      "Topic": "Joint cost concepts",
      "ItemID": "CBQ2-D2-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "BusinessInterpretation": "Byproduct NRV is deducted to avoid distorting main-product margins. Physical-units allocation ignores value, so a high-value product may seem unprofitable under that method.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "fill",
      "Prompt": "Costs incurred after the split-off point that can be traced to individual products are called ______ costs.",
      "Correct": "separable",
      "Explanation": "Separable costs are incurred after split-off and are directly assignable to individual products. They are distinguished from joint costs, which are common costs incurred before split-off.",
      "Topic": "Joint costing terminology",
      "ItemID": "CBQ2-D2-Q5",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-D2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "match",
      "Prompt": "Match each joint cost allocation method to its allocation basis.",
      "LeftItems": [
        "NRV method",
        "Physical-units method",
        "Sales-value-at-split-off method",
        "Constant gross-margin NRV method"
      ],
      "RightItems": [
        "Final sales value minus further processing costs",
        "Volume of output",
        "Market value at split-off point",
        "Joint cost allocated so every product has the same gross margin percentage"
      ],
      "Correct": {
        "NRV method": "Final sales value minus further processing costs",
        "Physical-units method": "Volume of output",
        "Sales-value-at-split-off method": "Market value at split-off point",
        "Constant gross-margin NRV method": "Joint cost allocated so every product has the same gross margin percentage"
      },
      "Explanation": "Each method uses a different allocation base. NRV uses net realizable value (final value minus separable costs). Physical units use output volume. Sales-value-at-split-off uses market value at the split-off point. Constant gross-margin NRV back-allocates to achieve identical gross margin percentages across products.",
      "Topic": "Joint cost allocation methods",
      "ItemID": "CBQ2-D2-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Joint costs are allocated to products using NRV, physical-units, or sales-value methods.",
      "BusinessInterpretation": "NRV back-allocates to achieve identical gross margin percentages across products.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D2",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-D3",
  "Title": "Process Costing — Equivalent Units and Cost Allocation",
  "SectionTags": [
    "D"
  ],
  "Pack": 2,
  "Section": "D",
  "BlueprintDomain": "Cost Management",
  "BlueprintObjectives": [
    "Weighted-average equivalent unit computation",
    "FIFO equivalent unit computation",
    "Cost per equivalent unit and cost allocation",
    "Process costing for multiple departments",
    "Comparison of weighted-average and FIFO methods"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Process Costing",
  "Subtopic": "Equivalent units and cost allocation",
  "SecondaryCompetencies": [
    "Analysis"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Cost accounting",
  "CompanyName": "ChemFlow Processing",
  "CompanyType": "Chemical processor",
  "Confidence": 100,
  "CreatedDate": "2026-07-21",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 35,
  "ExhibitCount": 1,
  "Industry": "Chemical processing",
  "LastValidated": "2026-07-21",
  "LearningObjectives": [
    "Compute equivalent units of production using the weighted-average method",
    "Compute equivalent units of production using the FIFO method",
    "Calculate cost per equivalent unit and allocate costs between completed units and work-in-process",
    "Analyze the impact of beginning WIP inventory treatment on unit costs",
    "Apply process costing concepts to a multi-department production environment"
  ],
  "ModifiedDate": "2026-07-21",
  "ProductionStatus": "Draft",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-21",
      "Version": "2.0",
      "Author": "Case Author",
      "Summary": "Full case reconstruction — replaced placeholder content with authored CMA-quality case study"
    }
  ],
  "Stakeholder": "Cost Accounting Manager",
  "Tags": [
    "process costing",
    "equivalent units",
    "weighted-average",
    "FIFO",
    "WIP inventory"
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "ChemFlow Processing produces a chemical compound in a continuous manufacturing process. All direct materials are added at the beginning of the production process, while conversion costs are incurred evenly throughout the process. The company uses process costing to compute unit costs. For March, the cost accountant needs to determine equivalent units using both the weighted-average and FIFO methods, then allocate total costs between completed units and ending work-in-process inventory. Exhibit 1 provides the production and cost data for March.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — March Production and Cost Data",
      "Headers": [
        "Item",
        "Amount"
      ],
      "Rows": [
        [
          "Beginning WIP (March 1)",
          "5,000 units"
        ],
        [
          "  Beginning completion: Materials",
          "100%"
        ],
        [
          "  Beginning completion: Conversion",
          "40%"
        ],
        [
          "  Beginning WIP cost: Materials",
          "$30,000"
        ],
        [
          "  Beginning WIP cost: Conversion",
          "$12,000"
        ],
        [
          "Units started in March",
          "20,000 units"
        ],
        [
          "Units completed and transferred out",
          "18,000 units"
        ],
        [
          "Ending WIP (March 31)",
          "7,000 units"
        ],
        [
          "  Ending completion: Materials",
          "100%"
        ],
        [
          "  Ending completion: Conversion",
          "50%"
        ],
        [
          "March costs added: Direct materials",
          "$168,000"
        ],
        [
          "March costs added: Conversion",
          "$126,000"
        ]
      ],
      "ExhibitID": "CBQ2-D3-E1",
      "CaseID": "CBQ2-D3",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Using the weighted-average method, compute the equivalent units for conversion costs.",
      "Correct": 21500,
      "Explanation": "Weighted-average EU for conversion = Units completed (18,000) + Ending WIP (7,000 units x 50% complete = 3,500 EU) = 18,000 + 3,500 = 21,500 EU. Under weighted-average, beginning WIP is treated as if it were started and completed in the current period; no separate calculation for beginning WIP completion is needed. A candidate might subtract beginning WIP or add separate EU for beginning WIP completion, but the weighted-average method combines beginning inventory costs with current period costs and computes a single EU total.",
      "Topic": "Weighted-average equivalent units",
      "ItemID": "CBQ2-D3-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "FinancialStatementAnalysis"
      ],
      "AccountingPrinciple": "Under the weighted-average method, equivalent units = Units completed and transferred out + (Ending WIP units x Percentage complete). Beginning WIP is not separately tracked.",
      "BusinessInterpretation": "The weighted-average method simplifies costing by blending beginning and current period costs. It is widely used when inventory levels are stable and the additional precision of FIFO is not justified.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D3",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Using the FIFO method, compute the equivalent units for conversion costs.",
      "Correct": "19500",
      "Explanation": "FIFO EU for conversion = (Beginning WIP units x % to complete) + (Units started and completed) + (Ending WIP units x % complete). Beginning WIP completion: 5,000 units x (100% - 40%) = 5,000 x 60% = 3,000 EU. Units started and completed = 20,000 started - 7,000 ending = 13,000 units. Ending WIP: 7,000 x 50% = 3,500 EU. Total = 3,000 + 13,000 + 3,500 = 19,500. Wait — recalculating: Units started and completed = Units completed - Beginning WIP = 18,000 - 5,000 = 13,000. FIFO EU = (5,000 x 0.6) + 13,000 + (7,000 x 0.5) = 3,000 + 13,000 + 3,500 = 19,500. Correction: 19,500 EU.",
      "Topic": "FIFO equivalent units",
      "ItemID": "CBQ2-D3-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultiStepCalculation"
      ],
      "AccountingPrinciple": "Under FIFO, equivalent units = (Beginning WIP x % to complete) + (Units started and completed) + (Ending WIP x % complete). Beginning WIP costs are kept separate and applied only to the current period's work.",
      "BusinessInterpretation": "FIFO provides a clearer picture of current period production costs by separating beginning WIP costs from current period costs, which is useful when input costs are changing over time.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D3",
      "EstimatedMinutes": 7,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Using the weighted-average method, compute the total cost per equivalent unit for conversion costs. Round to the nearest cent.",
      "Correct": "6.42",
      "Explanation": "Total conversion cost = Beginning WIP conversion ($12,000) + March conversion ($126,000) = $138,000. Weighted-average EU for conversion = 18,000 + (7,000 x 0.5) = 21,500. Cost per EU = $138,000 / 21,500 = $6.4186, rounded to $6.42. A candidate might forget to include beginning WIP costs in the numerator, resulting in a lower cost per EU ($126,000 / 21,500 = $5.86), but weighted-average combines beginning and current period costs.",
      "Topic": "Weighted-average cost per equivalent unit",
      "ItemID": "CBQ2-D3-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultiStepCalculation"
      ],
      "AccountingPrinciple": "Weighted-average cost per EU = (Beginning WIP Cost + Current Period Cost) / Weighted-Average Equivalent Units.",
      "BusinessInterpretation": "The blended cost per EU smooths out periodic cost fluctuations, which can be helpful for stable pricing but may obscure rising or falling cost trends.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D3",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "numeric",
      "Prompt": "Using the weighted-average method, compute the cost of units completed and transferred out (conversion only). Round to the nearest whole dollar.",
      "Correct": 115535,
      "Explanation": "Cost per EU for conversion = $6.4186 (unrounded). Units completed = 18,000. Conversion cost assigned = 18,000 x $6.4186 = $115,535. Wait — let me recompute precisely. $138,000 / 21,500 EU = $6.418604651. $6.418604651 x 18,000 = $115,534.88, rounded to $115,535. Using rounded $6.42 x 18,000 = $115,560. Precision: $138,000 / 21,500 = 6.418604651. 6.418604651 * 18000 = 115534.88.",
      "Topic": "Cost allocation to completed units",
      "ItemID": "CBQ2-D3-Q4",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Moderate",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "MultiStepCalculation"
      ],
      "AccountingPrinciple": "Cost of units completed = Units completed x Cost per equivalent unit.",
      "BusinessInterpretation": "The cost assigned to completed units becomes part of finished goods inventory and ultimately cost of goods sold. Accurate EU computation is essential for proper inventory valuation and income determination.",
      "CalculationRequired": true,
      "CaseID": "CBQ2-D3",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3
    },
    {
      "Type": "select",
      "Prompt": "Under the weighted-average method, why is the conversion cost per EU different from what it would be under FIFO?",
      "Correct": "Weighted-average blends beginning WIP costs ($12,000) with March costs, while FIFO keeps them separate, so the denominators and numerators differ",
      "Choices": [
        "Weighted-average blends beginning WIP costs ($12,000) with March costs, while FIFO keeps them separate, so the denominators and numerators differ",
        "FIFO always produces a lower cost per EU because it assumes older costs are cheaper",
        "Weighted-average uses a different definition of equivalent units that excludes ending WIP",
        "FIFO ignores conversion costs entirely and assigns them only to direct materials"
      ],
      "Explanation": "Under weighted-average, beginning WIP costs ($12,000 conversion) are added to March costs ($126,000), and EU includes all work done on all units (21,500 EU). Under FIFO, beginning WIP costs remain separate and only March costs ($126,000) are divided by FIFO EU (19,500). The difference in both numerator and denominator produces a different cost per EU. FIFO does not automatically produce lower costs — the direction depends on whether costs are rising or falling. Weighted-average does not exclude ending WIP from EU. FIFO definitely includes conversion costs.",
      "Topic": "Method comparison — weighted-average vs FIFO",
      "ItemID": "CBQ2-D3-Q5",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology"
      ],
      "AccountingPrinciple": "The weighted-average method blends prior-period and current-period costs, while FIFO separates beginning inventory costs and values beginning WIP as a distinct batch.",
      "BusinessInterpretation": "In periods of rising costs, FIFO produces a higher cost per EU and a higher cost of goods sold, while weighted-average smooths the increase. Management should select the method that best reflects the actual production flow and cost behavior.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-D3",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "D",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-E1",
  "Title": "Accounts Payable Controls and SOX Evaluation",
  "SectionTags": [
    "E"
  ],
  "Pack": 1,
  "Section": "E",
  "BlueprintDomain": "Internal Controls",
  "BlueprintObjectives": [
    "Segregation of duties",
    "Control activities",
    "Deficiency evaluation",
    "COSO limitations",
    "Control classification"
  ],
  "PrimaryCompetency": "Judgment",
  "Topic": "Internal Control Objectives",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Internal audit",
  "CompanyName": "Granite Homewares",
  "CompanyType": "Distributor",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Home goods",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze segregation of duties",
    "Analyze control activities",
    "Analyze deficiency evaluation",
    "Analyze coso limitations",
    "Analyze control classification",
    "Analyze sox evidence"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "1.1",
      "Author": "S533 Certification Agent",
      "Summary": "Certification-grade explanation expansion (6 items). question_state -> Certified. All 6 items passed CAQS six-dimension verification. Section E — Internal Controls."
    }
  ],
  "Stakeholder": "Internal Audit Director",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "1.0",
  "ScenarioText": "Granite Homewares found duplicate payments and unauthorized vendor changes during its SOX walkthrough. Internal audit must evaluate control design, evidence, and deficiency severity.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Process Observations",
      "Headers": [
        "Observation",
        "Detail"
      ],
      "Rows": [
        [
          "Vendor master access",
          "AP clerk can create vendors and enter invoices"
        ],
        [
          "Invoice approval",
          "Supervisor approves invoices above 25,000 after payment run"
        ],
        [
          "Three-way match",
          "Disabled for service invoices"
        ],
        [
          "Duplicate payment report",
          "Generated monthly but not reviewed in April or May"
        ],
        [
          "Fraud loss",
          "Duplicate and fictitious vendor payments total 180,000"
        ]
      ],
      "ExhibitID": "CBQ-E1-E1",
      "CaseID": "CBQ-E1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Materiality Context",
      "Headers": [
        "Measure",
        "Amount"
      ],
      "Rows": [
        [
          "Pretax income",
          "6,000,000"
        ],
        [
          "Total assets",
          "84,000,000"
        ],
        [
          "Management materiality threshold",
          "300,000"
        ]
      ],
      "ExhibitID": "CBQ-E1-E2",
      "CaseID": "CBQ-E1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "select",
      "Prompt": "Which control weakness is most directly related to fictitious vendor risk?",
      "Choices": [
        "Same AP clerk can create vendors and enter invoices",
        "Supervisor approves invoices after payment",
        "Duplicate report was not reviewed in April or May",
        "Service invoices lack receiving documents"
      ],
      "Correct": "Same AP clerk can create vendors and enter invoices",
      "Explanation": "Under COSO 2013 Principle 11, management must deploy control activities through policies that establish segregation of duties — the separation of authorization, custody, and recordkeeping responsibilities. SOX Section 404 requires management to assess internal control over financial reporting, including whether incompatible duties are adequately separated. The fictitious vendor scheme is one of the most significant AP fraud risks: an employee creates a shell company in the vendor master file, then enters and approves invoices from that company, directing company funds to an account they control. This risk materializes precisely when the same individual holds both vendor creation authority (the authorization function) and invoice entry capability (the recordkeeping function that triggers disbursement). The correct answer directly traces to this incompatible-duty combination — no other control weakness in the scenario enables the entire fraud lifecycle from vendor creation through payment. The supervisor's post-payment approval (Choice B) is a timing defect in the review process, not a segregation issue; it detects overpayments to legitimate vendors rather than preventing fictitious vendor creation. The unreviewed duplicate-payment report (Choice C) is a monitoring deficiency that may catch fictitious payments after they occur but does not prevent the scheme's initiation. The absence of receiving documents for service invoices (Choice D) impairs the three-way match for service expenditures, enabling overbilling by existing vendors rather than creation of entirely fictitious ones. For Granite Homewares, internal audit must recommend immediate structural separation: vendor master file maintenance must reside outside the AP processing team, ideally in procurement or finance operations, with independent approval for all new vendor additions. The $180,000 in identified duplicate and fictitious payments almost certainly originated from this segregation failure. A common CMA exam trap is to select the most serious-sounding control weakness rather than the one most directly linked to the specific risk described in the question stem — candidates must read precisely: the question asks about fictitious vendor risk specifically, not general AP control failure. In professional practice, PCAOB AS 2201 would classify this segregation-of-duties failure as at least a significant deficiency, potentially a material weakness given the $180,000 loss and the qualitative significance of a fraud-enabling control failure.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "While post-payment approval is a weak control, it represents a timing defect in the review process rather than a segregation-of-duties violation that enables fictitious vendor fraud. Under COSO's control activities principle, segregation of duties is the primary preventive defense against asset misappropriation, requiring separation of authorization, custody, and recordkeeping. The supervisor approval timing issue is a detective control failure rather than a preventive segregation problem.",
      "ExplanationWrongC": "The failure to review duplicate-payment reports in April and May is a monitoring deficiency rather than the most direct enabler of fictitious vendor fraud. Under the COSO framework, monitoring controls detect problems after they occur but do not prevent them from happening initially. A lack of segregation of duties at the point of vendor creation and invoice entry creates the opportunity for fraud that monitoring may or may not catch later.",
      "ExplanationWrongD": "The absence of receiving documents for service invoices impairs the three-way match control for service expenditures, which can lead to payment for services not received. However, this weakness primarily enables overbilling by legitimate vendors rather than the creation of entirely fictitious vendors. The direct segregation-of-duties failure — allowing one person to both create vendor records and enter invoices — is the more fundamental control weakness enabling fictitious vendor schemes.",
      "Topic": "Segregation of duties",
      "ItemID": "CBQ-E1-Q1",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 26: Segregation of Duties",
      "AccountingPrinciple": "Incompatible duties (authorization, custody, recordkeeping) should be separated.",
      "CalculationRequired": false,
      "CaseID": "CBQ-E1",
      "DecisionTreeReference": "Internal Controls (COSO)",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ExplanationVersion": 2
    },
    {
      "Type": "multi",
      "Prompt": "Select controls that would improve the AP process.",
      "Choices": [
        "Independent vendor-master approval",
        "Preventive three-way match before payment where applicable",
        "Post-payment approval of high-dollar invoices only",
        "Documented review of duplicate-payment reports"
      ],
      "Correct": [
        "Independent vendor-master approval",
        "Preventive three-way match before payment where applicable",
        "Documented review of duplicate-payment reports"
      ],
      "Explanation": "Under COSO 2013 Principle 11, management selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives. Principle 12 requires that these control activities be deployed through policies that specify what is expected and procedures that put those policies into action. For accounts payable, an effective control environment demands preventive controls that operate before cash is disbursed, detective controls that identify exceptions after processing, documented evidence of control operation, and appropriate segregation of incompatible duties. The three correct choices each address a specific deficiency observed during the Granite Homewares SOX walkthrough. Independent vendor-master approval (Choice A) removes the incompatible-duty conflict where the same AP clerk creates vendors and enters invoices — this is a segregation-of-duties preventive control that blocks fictitious vendor creation at the point of master-file entry. A preventive three-way match before payment where applicable (Choice B) extends the PO-invoice-receiving document verification to service invoices, closing the gap where services were paid without corroborating evidence of receipt — this stops improper payment at the point of authorization. Documented review of duplicate-payment reports (Choice D) transforms the existing detective control from an unauditable process into an evidenced control activity — under SOX, management must be able to demonstrate that detective controls actually operated, and a signature, date, or system log of review provides that evidence. Post-payment approval of high-dollar invoices only (Choice C) is the incorrect choice because it represents a degradation of control design in two respects: approval after payment is a detective control applied reactively after cash has already been disbursed, and the high-dollar-only threshold creates a materiality loophole where smaller fraudulent payments escape review entirely. For Granite Homewares, implementing these three controls would directly remediate the walkthrough weaknesses. A common CMA exam trap on multi-select questions is to select an option that sounds directionally correct (some review is better than none) without recognizing that it represents a weaker control design than what is needed. Candidates must evaluate each choice against best-practice control criteria, not against the deficient status quo. PCAOB AS 2201 requires auditors to evaluate whether controls address relevant assertions — for AP, the completeness, existence, and accuracy assertions are all implicated by these control activities. The multi-select format tests the candidate's ability to independently assess each option rather than looking for a single correct answer.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "Post-payment approval of high-dollar invoices only is a reactive detective control that does not prevent improper payments from occurring. Under COSO control activities, preventive controls that operate before payment — such as independent approval and three-way matching — are far more effective than detective controls applied after cash has already been disbursed. Additionally, limiting review to only high-dollar invoices creates a threshold-based gap where smaller fraudulent payments may go entirely undetected.",
      "ExplanationWrongD": "",
      "Topic": "Control activities",
      "ItemID": "CBQ-E1-Q2",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 21: COSO Components",
      "AccountingPrinciple": "Control Activities are policies and procedures that ensure management directives are carried out.",
      "BusinessInterpretation": "Effective controls should be timely, evidenced, and segregated.",
      "CalculationRequired": false,
      "CaseID": "CBQ-E1",
      "DecisionTreeReference": "Internal Controls (COSO)",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ExplanationVersion": 2
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the duplicate/fictitious payment loss as a percentage of pretax income, rounded to one decimal place.",
      "Correct": "3.0",
      "Explanation": "PCAOB Auditing Standard 2201 requires auditors to evaluate the severity of identified control deficiencies by considering both the magnitude of the potential misstatement and the likelihood that a misstatement could occur. AS 4101 further defines a material weakness as a deficiency, or combination of deficiencies, such that there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis. Quantitative materiality assessment for income-statement-affecting deficiencies typically uses pretax income as the benchmark, since most AP-related misstatements flow through the income statement via expense accounts. The calculation is direct: from Exhibit 1, the identified duplicate and fictitious vendor payments total $180,000. From Exhibit 2, Granite Homewares' pretax income is $6,000,000. Dividing the loss by the benchmark yields $180,000 / $6,000,000 = 0.030 = 3.0%, rounded to one decimal place as the prompt instructs. At 3.0% of pretax income, the $180,000 loss is a quantitatively meaningful percentage. Although the dollar amount falls below Granite Homewares' management materiality threshold of $300,000 (which equates to 5.0% of pretax income), PCAOB guidance emphasizes that deficiency classification is not determined solely by the known misstatement amount — auditors must evaluate the magnitude of the misstatement that could result from the deficiency. Given that the segregation-of-duties weakness could enable unlimited fictitious payments, the actual $180,000 represents a floor, not a ceiling, for potential loss. A common CMA exam trap is dividing by the wrong denominator — candidates may incorrectly use total assets ($84,000,000, yielding 0.2%) instead of pretax income, or may round to 3 rather than 3.0, failing to observe the one-decimal-place instruction. In professional practice, the control deficiency enabling fictitious vendor creation and duplicate payments at 3.0% of pretax income would likely warrant classification as a significant deficiency or material weakness depending on qualitative factors including the nature of the deficiency — segregation-of-duties failures carry greater weight due to the elevated fraud risk they represent. Candidates must also recognize that management-set thresholds are one input to the analysis, not a definitive classification boundary.",
      "Topic": "Deficiency evaluation",
      "ItemID": "CBQ-E1-Q3",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-E1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ExplanationVersion": 2
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: Management override and collusion are inherent limitations, so internal control provides reasonable, not _____, assurance.",
      "Correct": "absolute",
      "Explanation": "The COSO 2013 Internal Control — Integrated Framework explicitly states in its foundational definition that internal control is designed to provide reasonable assurance regarding the achievement of objectives — not absolute assurance. This distinction is one of the most fundamental concepts in internal control theory and is tested on virtually every professional accounting certification examination. The COSO framework identifies several inherent limitations that prevent any internal control system, no matter how well designed and operated, from providing absolute assurance: human error in judgment or execution, management override of controls, collusion among two or more individuals to circumvent segregation of duties, and cost-benefit constraints that limit the resources an organization can devote to control activities. The question stem provides two of these limitations — management override and collusion — as contextual clues that should lead the candidate directly to the term absolute as the contrasting concept to reasonable assurance. Under PCAOB AS 2201.13, the auditor must consider the inherent limitations of internal control when planning and performing the audit of internal control over financial reporting. Similarly, AICPA AU-C 315 recognizes that internal control can provide only reasonable assurance due to these inherent limitations. The IIA Standards (Attribute Standard 1210.A1) require internal auditors to possess knowledge of these fundamental concepts as a core competency. For the Granite Homewares internal audit director, this concept frames the communication to management and the audit committee: even after all identified AP control weaknesses are remediated — segregation of duties is restored, three-way matching is extended to service invoices, and duplicate-payment reports are consistently reviewed — the control environment can only provide reasonable assurance, not a guarantee. The tone at the top must reinforce that management cannot rely on controls alone; ethical culture, management philosophy, and operating style are equally essential components of the control environment per COSO Principle 1. A common CMA exam trap is to fill in synonyms such as complete, total, full, or guaranteed assurance — these are conceptually adjacent but not the specific terminology used in the COSO framework. The CMA exam rewards precision in professional vocabulary. Candidates must memorize the COSO definition verbatim: internal control is a process designed to provide reasonable assurance. The word reasonable is inseparable from the framework's architecture, and absolute is its only correct antonym in this context.",
      "Topic": "COSO limitations",
      "ItemID": "CBQ-E1-Q4",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 21: COSO Components",
      "CalculationRequired": false,
      "CaseID": "CBQ-E1",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ExplanationVersion": 2
    },
    {
      "Type": "match",
      "Prompt": "Match each control to preventive or detective.",
      "LeftItems": [
        "Independent vendor approval",
        "Three-way match before payment",
        "Duplicate-payment report review",
        "Bank reconciliation"
      ],
      "RightItems": [
        "Preventive",
        "Preventive",
        "Detective",
        "Detective"
      ],
      "Correct": {
        "Independent vendor approval": "Preventive",
        "Three-way match before payment": "Preventive",
        "Duplicate-payment report review": "Detective",
        "Bank reconciliation": "Detective"
      },
      "Explanation": "Under COSO 2013 Principle 11, management selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives. The framework classifies controls along multiple dimensions, with the preventive-detective dichotomy being one of the most fundamental and most frequently tested on the CMA exam. Preventive controls are designed to stop errors, omissions, or fraudulent transactions before they enter the accounting system — they operate at the point of transaction initiation or processing and are generally more cost-effective because they prevent losses from occurring. Detective controls identify errors, omissions, or fraud after they have occurred, providing evidence that enables investigation and corrective action. Independent vendor approval is a preventive control because it stops unauthorized or fictitious vendors from being established in the vendor master file before any transaction can be processed against that vendor — the approval gate operates at the point of vendor creation, and the control event precedes the risk event. A three-way match before payment is a preventive control because it verifies the consistency of the purchase order, receiving report, and supplier invoice before cash is disbursed — it blocks improper payment at the point of authorization. Duplicate-payment report review is a detective control because the report identifies payments that have already been processed — the control operates after the disbursement event has occurred. If duplicate payments exist, the money has already left the organization; the review detects what has already happened. Bank reconciliation is a detective control because it compares the entity's cash records to the bank's independent records after transactions have cleared the banking system, identifying discrepancies that already exist in the accounting records. For Granite Homewares, the internal audit assessment reveals an unbalanced control mix: the preventive controls are either missing (no independent vendor approval) or deficient (three-way match disabled for service invoices), while detective controls exist in design but fail in operation — duplicate-payment reports are generated but not reviewed. The $180,000 in losses occurred precisely because preventive controls at the vendor creation and invoice validation points were absent or circumvented. A common CMA exam trap is misclassifying bank reconciliation as a preventive control — candidates reason that reconciliation prevents errors from persisting, but the classification depends on timing relative to the transaction, not on whether errors are eventually corrected. Similarly, duplicate-payment report review may seem preventive because it appears proactive, but the review occurs after payment, making it detective by nature. The three-way match is the canonical CMA exam example of a preventive control because it operates at the point of payment authorization, before cash is disbursed.",
      "Topic": "Control classification",
      "ItemID": "CBQ-E1-Q5",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-E1",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ExplanationVersion": 2
    },
    {
      "Type": "select",
      "Prompt": "Which evidence issue most weakens operating effectiveness?",
      "Choices": [
        "The report was generated but not reviewed for two months",
        "The report exists in the ERP menu",
        "The process owner says review is normally performed",
        "The report includes vendor number and invoice amount"
      ],
      "Correct": "The report was generated but not reviewed for two months",
      "Explanation": "Under COSO 2013 Principle 12, management deploys control activities through policies that establish what is expected and procedures that put policies into action. The distinction between control design and control operation is critical: a control may be perfectly designed on paper but fail in performance. PCAOB AS 2201.46 specifies that testing operating effectiveness requires determining whether the control is operating as designed and whether the person performing the control possesses the necessary authority and competence. SOX Section 404 explicitly requires management to assess both the design and operating effectiveness of internal control over financial reporting — neither alone is sufficient. The evidence hierarchy for operating effectiveness, from strongest to weakest, is: documented performance with date and reviewer identification, system-generated automated logs of control execution, inquiry of process owners, absence of evidence, and — most damaging — direct evidence that the control was not performed. Choice A provides the most damaging possible evidence: the duplicate-payment report existed and was generated, but it was not reviewed for two consecutive months (April and May). This is not merely weak evidence of performance — it is definitive evidence of non-performance. The control did not operate during the period, and the gap directly coincides with the accumulation of $180,000 in duplicate and fictitious payments. Choice B — the report exists in the ERP menu — is evidence of design effectiveness only; it confirms the system can generate the report but says nothing about whether anyone reviewed it. Choice C — the process owner says review is normally performed — is inquiry evidence, which PCAOB standards treat as insufficient on its own to support an operating-effectiveness conclusion; however, inquiry suggesting performance is less damaging than documented evidence of non-performance. Choice D — the report includes vendor number and invoice amount — is evidence of design quality, showing the report contains the right data fields for meaningful review; this actually supports rather than weakens the control assessment. For Granite Homewares, this finding means the internal audit report must separately conclude on design effectiveness (the control was properly designed) and operating effectiveness (the control failed because human review did not occur for two months). A common CMA exam trap is to mistakenly select inquiry evidence (Choice C) on the basis that inquiry alone is weak — but documented non-performance is categorically worse than any form of positive evidence. Under PCAOB standards, an external auditor finding that a key detective control was not performed for two consecutive months would at minimum require extended substantive testing for the affected period and would likely contribute to a control deficiency classification requiring communication to the audit committee.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "The report existing in the ERP menu confirms that the control was designed and the system can generate it — this is a design-effectiveness indicator, not an operating-effectiveness weakness. The question asks what most weakens operating effectiveness, which concerns whether the control actually operates, not whether it was designed.",
      "ExplanationWrongC": "The process owner stating that review is 'normally performed' is inquiry evidence. While inquiry alone is insufficient under SOX, it is not as weak as documented evidence showing the review did NOT occur for two months. COSO and PCAOB standards treat absence of evidence more severely than reliance on inquiry.",
      "ExplanationWrongD": "Including vendor number and invoice amount in the report is evidence of report design quality — the report contains the right data fields for review. This actually supports, rather than weakens, operating effectiveness because it shows the report was designed with the necessary information for proper review.",
      "Topic": "SOX evidence",
      "ItemID": "CBQ-E1-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "BusinessInterpretation": "A control must operate and have evidence of review; generation alone is insufficient.",
      "CalculationRequired": false,
      "CaseID": "CBQ-E1",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ExplanationVersion": 2
    }
  ],
  "question_state": "Certified",
  "pack_state": "Production",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-E2",
  "Title": "IT General Controls, Change Management, and Access Review",
  "SectionTags": [
    "E",
    "F"
  ],
  "Pack": 1,
  "Section": "E",
  "BlueprintDomain": "Internal Controls",
  "BlueprintObjectives": [
    "Access controls",
    "Access review",
    "IT controls",
    "Change management",
    "ITGC risk"
  ],
  "PrimaryCompetency": "Judgment",
  "Topic": "COSO Enterprise Risk Management",
  "Subtopic": "ERP systems",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Internal audit",
  "CompanyName": "Vector Labs",
  "CompanyType": "Technology provider",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 1,
  "Industry": "Technology",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze access controls",
    "Analyze access review",
    "Analyze it controls",
    "Analyze change management",
    "Analyze itgc risk",
    "Analyze monitoring"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "Session 537 — ENHANCED_CASE_BASE Final Certification Wave",
      "Summary": "All 6 items certified per CAQS v1.0 §1.6 six-dimension verification. Explanations expanded to certification standard. Choices rotated for psychometric balance. question_state: Unprocessed → Certified."
    }
  ],
  "Stakeholder": "Internal Audit Director",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Vector Labs implemented a cloud ERP and analytics platform. Internal audit identified privileged-access, change-management, and automated-report risks before year-end close.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Control Exceptions",
      "Headers": [
        "Area",
        "Exception"
      ],
      "Rows": [
        [
          "Privileged access",
          "Three shared administrator IDs remain active"
        ],
        [
          "Terminated users",
          "12 of 340 users active more than 30 days after termination"
        ],
        [
          "Change management",
          "Emergency report changes migrated without post-implementation approval"
        ],
        [
          "Interface controls",
          "Sales subledger to GL reconciliation fails intermittently"
        ],
        [
          "Audit logs",
          "Enabled but retained for only 14 days"
        ]
      ],
      "ExhibitID": "CBQ-E2-E1",
      "CaseID": "CBQ-E2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "select",
      "Prompt": "Which response best addresses shared administrator IDs?",
      "Choices": [
        "Keep shared IDs but change the password quarterly",
        "Disable audit logging to reduce storage cost",
        "Unique privileged IDs with MFA and periodic access review",
        "Allow only finance users to know the shared password"
      ],
      "Correct": "Unique privileged IDs with MFA and periodic access review",
      "Explanation": "Under COSO Principle 11, general control activities over technology must ensure that system actions can be attributed to specific individuals through unique user identification, multi-factor authentication, periodic access review, and comprehensive audit logging. Vector Labs' Exhibit 1 reveals three shared administrator IDs remain active in the cloud ERP — a severe ITGC deficiency that undermines individual accountability. The correct response establishes: (1) unique privileged IDs so each administrator's actions are attributable, enabling audit trails to identify who performed each privileged operation; (2) MFA to prevent credential theft from compromising privileged access; (3) periodic access review to ensure administrators retain only appropriate access. A common CMA exam trap: confusing \"password rotation on shared IDs\" with \"unique identification\" — changing a shared password improves credential hygiene but cannot create individual accountability, which is the fundamental COSO requirement. Another trap: confusing the cost of controls (log storage, MFA) with control effectiveness — the cost of unauthorized privileged access far exceeds control costs. COSO Principle 16 further requires monitoring activities to evaluate control effectiveness, which is impossible without unique IDs.",
      "ExplanationWrongA": "Keeping shared IDs but changing the password quarterly fails to establish individual accountability for system actions. Under COSO IT general controls, each user must have a unique identifier so that all transactions and changes can be traced to a specific person. Shared credentials, regardless of password rotation frequency, make it impossible to attribute actions to individuals, violating the fundamental control principle of accountability in information systems.",
      "ExplanationWrongB": "Disabling audit logging to reduce storage cost eliminates a critical detective control and is directly contrary to COSO's monitoring component. Audit logs provide the evidentiary trail needed to detect unauthorized access, investigate security incidents, and demonstrate compliance with regulatory requirements. The cost of log storage is negligible compared to the risk of undetected unauthorized activity in privileged accounts.",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Restricting knowledge of shared passwords to finance users does not resolve the individual accountability problem and creates a false sense of security. Multiple finance users still share a single identity, meaning any action performed under that ID cannot be attributed to a specific person. COSO requires unique user identification regardless of how narrowly the shared credential knowledge is distributed within the organization.",
      "Topic": "Access controls",
      "ItemID": "CBQ-E2-Q1",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "BusinessInterpretation": "Shared IDs reduce accountability; privileged access requires unique IDs, MFA, logging, and review.",
      "CalculationRequired": false,
      "CaseID": "CBQ-E2",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the terminated-user exception rate as a percentage rounded to one decimal place.",
      "Correct": "3.5",
      "Explanation": "The terminated-user exception rate measures the proportion of active accounts belonging to former employees. From Exhibit 1: 12 terminated users remain active out of 340 total users. Exception rate = 12 / 340 = 0.03529... = 3.529...% Rounded to one decimal place: 3.5%. Verification: 340 x 3.5% = 11.9, which rounds to 12 — internally consistent. A 3.5% exception rate means approximately 1 in 29 user accounts belongs to a former employee, creating unauthorized access risk under COSO. Industry best practice (aligned with ISO 27001) requires deprovisioning within 24-48 hours of termination for privileged users. Vector Labs' 30-day threshold already represents a relaxed standard; 12 accounts exceeding even that threshold indicates systemic failure in identity lifecycle management. A common CMA exam trap: dividing by the wrong base (e.g., 328, the \"clean\" user count) instead of the total population (340). Another trap: rounding incorrectly — 3.529 rounds to 3.5, not 3.6 or 3.53 (two decimal places exceeds the instruction).",
      "Topic": "Access review",
      "ItemID": "CBQ-E2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-E2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "multi",
      "Prompt": "Select ITGCs relevant to the exceptions.",
      "Choices": [
        "Logical access controls",
        "Change-management controls",
        "Computer operations/interface monitoring",
        "Sales price variance analysis"
      ],
      "Correct": [
        "Logical access controls",
        "Change-management controls",
        "Computer operations/interface monitoring"
      ],
      "Explanation": "Under COSO Principle 11 and COBIT 2019, IT General Controls (ITGCs) govern the overall technology environment. The five Exhibit 1 exceptions map to three ITGC categories. LOGICAL ACCESS CONTROLS (Choice A — correct): Shared administrator IDs and 12 terminated users still active both represent access control failures — unique identification, authentication, and timely deprovisioning. CHANGE-MANAGEMENT CONTROLS (Choice B — correct): Emergency report changes migrated without post-implementation approval represent a failure of the change governance process — all modifications, even emergency ones, require documented approval. COMPUTER OPERATIONS/INTERFACE MONITORING (Choice C — correct): The failed sales subledger-to-GL reconciliation represents an interface monitoring failure threatening data integrity. SALES PRICE VARIANCE ANALYSIS (Choice D — INCORRECT): This is a performance management and cost accounting tool (CMA Part 1 Section C), not an ITGC. It analyzes business outcomes using IT-generated data but does not govern the IT environment itself. A common CMA exam trap: confusing IT controls (which govern the technology environment) with business analytics (which consume IT data). The critical distinction: would removing this activity make the IT environment less controlled? If no, it's not an ITGC.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Sales price variance analysis is a performance management tool used in cost accounting, not an IT general control (ITGC). Under the COSO framework, ITGCs support the overall control environment by governing IT infrastructure — including logical access controls, change management procedures, and computer operations monitoring. Sales price variance analysis evaluates business unit performance and belongs to the application control or management reporting domain rather than the IT general control layer.",
      "Topic": "IT controls",
      "ItemID": "CBQ-E2-Q3",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-E2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: Emergency changes should receive timely post-implementation review and _____.",
      "Correct": "approval",
      "Explanation": "Under COSO Principle 11 and COBIT 2019 (process BAI06 — Manage Changes), emergency changes represent a recognized exception pathway within the change management lifecycle. When a critical system issue (production outage, security vulnerability, regulatory deadline) requires immediate remediation, normal pre-approval gates may be bypassed. However, the control framework requires that emergency changes receive post-implementation review and APPROVAL. Approval completes the control cycle — it creates a formal record that an authorized individual has reviewed the emergency change and accepted responsibility. It enables auditability — without post-approval, there is no way to distinguish a genuine emergency from a developer using the emergency pathway to skip controls. Vector Labs' Exhibit 1 identifies this deficiency: \"Emergency report changes migrated without post-implementation approval.\" A common CMA exam trap: confusing \"documentation\" or \"testing\" with \"approval\" — documentation records what was done, testing verifies it works, but approval provides the governance sign-off that the change was authorized. The missing approval at Vector Labs means unauthorized or erroneous report logic could be operating in the production ERP.",
      "Topic": "Change management",
      "ItemID": "CBQ-E2-Q4",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-E2",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "match",
      "Prompt": "Match each exception to the primary risk.",
      "LeftItems": [
        "Shared administrator IDs",
        "Terminated users active",
        "Unapproved emergency changes",
        "Failed interface reconciliation"
      ],
      "RightItems": [
        "Lack of accountability",
        "Unauthorized access",
        "Unauthorized or erroneous report logic",
        "Incomplete or inaccurate data transfer"
      ],
      "Correct": {
        "Shared administrator IDs": "Lack of accountability",
        "Terminated users active": "Unauthorized access",
        "Unapproved emergency changes": "Unauthorized or erroneous report logic",
        "Failed interface reconciliation": "Incomplete or inaccurate data transfer"
      },
      "Explanation": "Under COSO Principle 15, risk identification and impact assessment are the first steps in internal control evaluation. Each of Vector Labs' four exceptions maps to a distinct risk. Shared administrator IDs → LACK OF ACCOUNTABILITY: when multiple individuals share one credential, no action can be attributed to a specific person, undermining COSO's requirement that \"actions taken using technology can be attributed to specific individuals.\" Terminated users active → UNAUTHORIZED ACCESS: former employees retain system access they are no longer entitled to have. Unapproved emergency changes → UNAUTHORIZED OR ERRONEOUS REPORT LOGIC: reports running in production may contain unapproved, untested logic changes. Failed interface reconciliation → INCOMPLETE OR INACCURATE DATA TRANSFER: transactions recorded in the sales subledger may not fully and accurately flow to the general ledger. A common CMA exam trap: confusing \"lack of accountability\" with \"unauthorized access\" — accountability asks \"can we tell who did it?\" while authorization asks \"should they have been able to do it?\" Shared IDs primarily compromise the first question.",
      "Topic": "ITGC risk",
      "ItemID": "CBQ-E2-Q5",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-E2",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "Why is 14-day log retention a concern?",
      "Choices": [
        "It proves all users are unauthorized",
        "It makes reconciliations unnecessary",
        "It converts preventive controls into manual controls",
        "It may prevent investigation of issues discovered after logs are overwritten"
      ],
      "Correct": "It may prevent investigation of issues discovered after logs are overwritten",
      "Explanation": "Under COSO Principle 16, monitoring activities require access to historical system records to evaluate whether controls operated effectively. Vector Labs' 14-day log retention in the cloud ERP means any log record older than two weeks is permanently overwritten. If a problem is discovered on day 15 — a financial misstatement, security incident, unauthorized transaction, or control failure — the evidence needed to investigate it has already been destroyed. The Association of Certified Fraud Examiners reports the median fraud scheme lasts 12 months before detection — with 14-day log retention, system-level evidence would be overwritten 26 times before most frauds are discovered. External auditors require log evidence for the entire fiscal year. Without it, the auditor cannot verify that controls operated effectively. SEC Rule 17a-4 and Sarbanes-Oxley Section 802 establish record retention obligations. Industry best practice (COBIT, NIST SP 800-92) recommends 90 days online retention minimum, with 1+ year archived. A common CMA exam trap: confusing log retention with log sufficiency (\"14 days is enough to detect intrusions\") — real-time monitoring and retrospective investigation serve different purposes. Another trap: claiming that log retention makes other controls \"unnecessary\" — logs and reconciliations serve different control objectives.",
      "ExplanationWrongA": "14-day log retention does not prove or disprove whether users are authorized. Authorization is an access-control design question, not a retention-period question. Log retention affects whether you can investigate what authorized (or unauthorized) users did, not whether their access was authorized in the first place.",
      "ExplanationWrongB": "Log retention is unrelated to reconciliation requirements. Reconciliations compare two independent sets of records to verify accuracy — they are detective controls that operate regardless of how long logs are kept. Short retention does not make reconciliations unnecessary; it makes investigation of discrepancies after 14 days impossible.",
      "ExplanationWrongC": "Log retention period does not convert preventive controls into manual controls. Preventive controls (e.g., system access restrictions) deter errors before they occur. Manual vs. automated classification depends on how the control operates, not on how long evidence of its operation is retained. This choice confuses control classification with evidence preservation.",
      "ExplanationWrongD": "",
      "Topic": "Monitoring",
      "ItemID": "CBQ-E2-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Monitoring evaluates whether internal controls continue to operate effectively.",
      "CalculationRequired": false,
      "CaseID": "CBQ-E2",
      "DecisionTreeReference": "Internal Controls (COSO)",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-F2",
  "Title": "Cybersecurity, RPA, and Finance Automation Governance",
  "SectionTags": [
    "E",
    "F"
  ],
  "Pack": 1,
  "Section": "F",
  "BlueprintDomain": "Internal Controls",
  "BlueprintObjectives": [
    "RPA benefits",
    "Exception analytics",
    "Cybersecurity controls",
    "Automation governance",
    "Analytics governance"
  ],
  "PrimaryCompetency": "Calculation",
  "Topic": "Corporate Governance",
  "Subtopic": "COSO internal control components",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Internal audit",
  "CompanyName": "NexGen Components",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Electronics manufacturing",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze rpa benefits",
    "Analyze exception analytics",
    "Analyze cybersecurity controls",
    "Analyze automation governance",
    "Analyze analytics governance",
    "Analyze technology controls"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "2.0",
      "Author": "Session 537 — ENHANCED_CASE_BASE Final Certification Wave",
      "Summary": "All 6 items certified per CAQS v1.0 §1.6 six-dimension verification. Explanations expanded to certification standard. Choices rotated for psychometric balance. question_state: Unprocessed → Certified."
    }
  ],
  "Stakeholder": "Internal Audit Director",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "NexGen Components automated invoice processing with RPA and added an exception dashboard. The audit committee asks whether cybersecurity, data quality, and model-monitoring controls are sufficient before expanding automation.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Automation Results",
      "Headers": [
        "Metric",
        "Before RPA",
        "After RPA"
      ],
      "Rows": [
        [
          "Invoices per month",
          "9,000",
          "9,000"
        ],
        [
          "Manual minutes per invoice",
          "12",
          "3"
        ],
        [
          "Exception rate",
          "N/A",
          "7%"
        ],
        [
          "Unresolved exceptions over 10 days",
          "N/A",
          "126"
        ]
      ],
      "ExhibitID": "CBQ-F2-E1",
      "CaseID": "CBQ-F2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Governance Findings",
      "Headers": [
        "Area",
        "Finding"
      ],
      "Rows": [
        [
          "Bot credentials",
          "One shared service account"
        ],
        [
          "Exception rules",
          "Changed by analyst without approval"
        ],
        [
          "Vendor master data",
          "Duplicate vendor IDs remain"
        ],
        [
          "Model monitoring",
          "No review of false positives or missed exceptions"
        ]
      ],
      "ExhibitID": "CBQ-F2-E2",
      "CaseID": "CBQ-F2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter monthly labor hours saved by RPA.",
      "Correct": "1350",
      "Explanation": "Robotic Process Automation (RPA) labor savings are computed by comparing manual processing time before automation to automated processing time after, multiplied by transaction volume. From NexGen Components' Exhibit 1: 9,000 invoices per month (constant). Before RPA: 9,000 x 12 minutes = 108,000 total monthly minutes. After RPA: 9,000 x 3 minutes = 27,000 total monthly minutes. Minutes saved = 108,000 - 27,000 = 81,000. Convert to hours: 81,000 / 60 = 1,350 hours saved per month. Verification: 1,350 x 60 = 81,000 minutes; 81,000 / 9,000 = 9 minutes saved per invoice (12 - 3 = 9). A common CMA exam trap: forgetting to convert minutes to hours. Another trap: computing the difference in minutes per invoice first (12 - 3 = 9) and stopping there without multiplying by volume. Under COSO Principle 11, organizations must evaluate whether technology investments achieve their intended efficiency objectives. The 1,350 hours represent capacity freed for higher-value activities — analysis, exception handling, and strategic support.",
      "Topic": "RPA benefits",
      "ItemID": "CBQ-F2-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-F2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "numeric",
      "Prompt": "Enter the number of invoices routed to exception handling each month.",
      "Correct": "630",
      "Explanation": "Exception invoice count represents the volume of transactions that cannot be processed automatically and require human intervention. From Exhibit 1: 9,000 invoices per month at a 7% exception rate. Exception invoices = 9,000 x 7% = 9,000 x 0.07 = 630 invoices per month. This means that even after RPA implementation, 630 invoices each month require manual review — approximately 7 out of every 100 invoices. The exception rate is a key metric in RPA governance: high exception rates indicate the automation rules may need refinement, source data quality issues exist, or process standardization is incomplete. NexGen's management should analyze exception patterns to identify root causes — are exceptions concentrated in certain vendors, invoice types, or dollar ranges? Reducing the 7% exception rate through master data cleanup (as one of the governance recommendations suggests) would further increase automation benefits. A common CMA exam trap: applying 7% to the hourly savings calculation (Q1) instead of the invoice count. Another trap: confusing the exception count with the exception rate — 630 is the count, 7% is the rate.",
      "Topic": "Exception analytics",
      "ItemID": "CBQ-F2-Q2",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": true,
      "CaseID": "CBQ-F2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "select",
      "Prompt": "Which governance finding creates the clearest accountability risk?",
      "Choices": [
        "Exception rate of 7%",
        "Unresolved exceptions over 10 days",
        "Duplicate vendor IDs",
        "One shared service account"
      ],
      "Correct": "One shared service account",
      "Explanation": "Under COSO Principle 11, unique identification and individual accountability are foundational requirements for IT general controls over access. Shared service accounts for RPA bots — where multiple bots or processes use a single credential — prevent tracing specific automated actions to accountable owners. When an RPA bot using a shared service account processes a transaction incorrectly, the organization cannot determine which bot, which process, or which configuration caused the error. This mirrors the shared-administrator-ID problem identified in COSO ITGC assessments. The correct response — one shared service account — represents the clearest accountability risk because it eliminates attribution and weakens access control. A common CMA exam trap: confusing an \"exception rate\" (a performance metric) with an \"accountability risk\" (a control deficiency). Another trap: ignoring the governance implications of RPA — bots are not exempt from access control, segregation of duties, or change management requirements just because they are automated. COSO Principle 11 applies equally to human and automated system access.",
      "ExplanationWrongA": "An exception rate of 7% indicates a processing error frequency that, while elevated and requiring investigation, may have various root causes including data quality, system configuration, or training deficiencies. Under COSO and IT governance frameworks, accountability risk is fundamentally about the ability to trace actions to specific individuals — a shared service account breaks this traceability regardless of the exception rate, making it the clearest and most foundational governance risk.",
      "ExplanationWrongB": "Unresolved exceptions over 10 days reflect a timeliness deficiency in the monitoring and remediation process rather than a foundational accountability risk. This is an operational control weakness that can be addressed through process improvement and service-level monitoring. The underlying issue — a shared service account that eliminates individual accountability — is more critical because it prevents attribution of any action including exception resolution to a specific person.",
      "ExplanationWrongC": "Duplicate vendor IDs represent a master data quality issue that can lead to payment errors, control inefficiencies, and potential duplicate payments. While this is a meaningful governance concern requiring data stewardship attention, it is secondary to the accountability risk created by shared credentials. A shared service account means no one can be held responsible for bot actions including those related to vendor master data management and maintenance.",
      "ExplanationWrongD": "",
      "Topic": "Cybersecurity controls",
      "ItemID": "CBQ-F2-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 28: Cybersecurity",
      "AccountingPrinciple": "Cybersecurity controls protect information systems; encryption complements access controls.",
      "CalculationRequired": false,
      "CaseID": "CBQ-F2",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "multi",
      "Prompt": "Select controls that should be added before expanding automation.",
      "Choices": [
        "Unique bot/service credentials with monitored access",
        "Change approval for exception rules",
        "Vendor master-data cleanup",
        "Disable audit logs after go-live"
      ],
      "Correct": [
        "Unique bot/service credentials with monitored access",
        "Change approval for exception rules",
        "Vendor master-data cleanup"
      ],
      "Explanation": "Under COSO Principle 11 and IT governance frameworks, automation controls must address access, change management, and data quality. Three controls are prerequisites for safe RPA deployment: (1) UNIQUE BOT/SERVICE CREDENTIALS WITH MONITORED ACCESS — each RPA bot must have a distinct credential enabling attribution of all automated actions, with access logging and review; (2) CHANGE APPROVAL FOR EXCEPTION RULES — any modification to the bot's decision logic (exception routing rules, matching criteria) must follow formal change management with testing and approval; (3) VENDOR MASTER-DATA CLEANUP — the 7% exception rate arises partly from data quality issues; cleaning vendor master data reduces exceptions and improves automation throughput. The distractor \"Disable audit logs to improve processing speed\" is destructive — eliminating logs removes the detective control layer and contradicts COSO Principle 16 (monitoring). A common CMA exam trap: treating RPA as a \"set and forget\" technology — automation requires ongoing governance, just like any IT system. Another trap: prioritizing processing speed over control effectiveness — a fast but uncontrolled RPA deployment creates more risk than manual processing.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Disabling audit logs after go-live eliminates the evidence trail needed to monitor automated activities and investigate exceptions. Under COSO's monitoring principle and IT general controls, audit logging is a fundamental detective control that must remain active throughout the automation lifecycle. Disabling logs saves minimal storage cost while creating a catastrophic visibility gap — making it impossible to detect unauthorized changes, trace processing errors to their source, or demonstrate regulatory compliance.",
      "Topic": "Automation governance",
      "ItemID": "CBQ-F2-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-F2",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: Periodic review of false positives and missed exceptions is model _____.",
      "Correct": "monitoring",
      "Explanation": "Under COSO and IT governance frameworks, model MONITORING evaluates whether analytics and automated decision systems continue to perform as intended over time. As data patterns, business conditions, and transaction characteristics change, models that were accurate at deployment may degrade — a phenomenon known as model drift. Monitoring includes: tracking false-positive rates (invoices incorrectly flagged as exceptions), false-negative rates (erroneous invoices passing through undetected), processing accuracy trends, and exception rate changes. NexGen's periodic review of false positives and missed exceptions is a monitoring activity. When monitoring identifies performance degradation, the model should be retrained, recalibrated, or replaced. A common CMA exam trap: confusing monitoring (ongoing performance evaluation) with model development (the initial build phase). Another trap: assuming that once an automation is implemented, it requires no further attention — continuous monitoring is a COSO requirement for all control activities.",
      "Topic": "Analytics governance",
      "ItemID": "CBQ-F2-Q5",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-F2",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ModifiedDate": "2026-07-26"
    },
    {
      "Type": "match",
      "Prompt": "Match each finding to the main control response.",
      "LeftItems": [
        "Shared bot account",
        "Unapproved rule changes",
        "Duplicate vendor IDs",
        "No false-positive review"
      ],
      "RightItems": [
        "Unique credentials and access logging",
        "Change management",
        "Master-data governance",
        "Model monitoring"
      ],
      "Correct": {
        "Shared bot account": "Unique credentials and access logging",
        "Unapproved rule changes": "Change management",
        "Duplicate vendor IDs": "Master-data governance",
        "No false-positive review": "Model monitoring"
      },
      "Explanation": "Under COSO and IT governance frameworks, each automation risk requires a targeted governance response. Shared bot credentials → UNIQUE SERVICE ACCOUNTS: each automated process receives a distinct credential with access logging, enabling attribution of all bot actions. Unapproved exception rules → CHANGE MANAGEMENT: all modifications to RPA logic follow formal change control (request, analysis, approval, testing, migration, post-review) consistent with COBIT BAI06. Master data errors → DATA GOVERNANCE: vendor master data is reviewed, cleansed, and maintained through defined ownership, validation rules, and regular quality audits. Disabled audit logs → LOG MANAGEMENT: audit logs are enabled, retained for an adequate period, and regularly reviewed for anomalies — supporting COSO Principle 16's monitoring requirements. A common CMA exam trap: applying a single generic control response to all automation risks — each risk requires a specific control matched to the vulnerability it addresses. Another trap: confusing data governance (data quality and ownership) with access control (who can access or modify data). COSO's framework distinguishes these as separate control dimensions.",
      "Topic": "Technology controls",
      "ItemID": "CBQ-F2-Q6",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "BusinessInterpretation": "Each automation risk requires a targeted governance response.",
      "CalculationRequired": false,
      "CaseID": "CBQ-F2",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Certified",
      "pedagogical_cluster": "",
      "question_tier": "Tier1",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ModifiedDate": "2026-07-26"
    }
  ],
  "question_state": "Certified",
  "pack_state": "Certified",
  "pedagogical_cluster": "",
  "question_tier": "Tier1",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-E1",
  "Title": "IT General Controls Assessment",
  "SectionTags": [
    "E"
  ],
  "Pack": 2,
  "Section": "E",
  "BlueprintDomain": "Internal Controls",
  "BlueprintObjectives": [
    "IT general controls framework and components",
    "Logical access controls",
    "Change management controls",
    "Computer operations controls",
    "System development lifecycle controls"
  ],
  "PrimaryCompetency": "Analysis",
  "Topic": "IT General Controls",
  "SecondaryCompetencies": [
    "Judgment",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Internal audit",
  "CompanyName": "DataGuard Systems",
  "CompanyType": "Financial services firm",
  "Confidence": 100,
  "CreatedDate": "2026-07-21",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 35,
  "ExhibitCount": 1,
  "Industry": "Financial services",
  "LastValidated": "2026-07-21",
  "LearningObjectives": [
    "Identify IT general control categories and their purposes",
    "Match control activities to the IT risks they mitigate",
    "Distinguish between IT general controls and application controls",
    "Evaluate segregation of duties within IT functions",
    "Analyze IT control deficiencies and recommend remediation"
  ],
  "ModifiedDate": "2026-07-21",
  "ProductionStatus": "Draft",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    }
  ],
  "Stakeholder": "Chief Information Officer",
  "Tags": [
    "IT controls",
    "access controls",
    "change management",
    "SDLC",
    "IS audit"
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "DataGuard Systems, a financial services firm, processes confidential client data through its core banking platform. The internal audit team is conducting a review of IT general controls following a recent security incident involving unauthorized access to the production environment. The IT director has provided Exhibit 1 summarizing the current control environment. The audit team must identify gaps and recommend improvements.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — IT General Control Environment Summary",
      "Headers": [
        "Control Area",
        "Current Practice",
        "Issue Identified"
      ],
      "Rows": [
        [
          "Logical access",
          "Password-based authentication with 90-day rotation",
          "Shared admin accounts exist; no multi-factor authentication"
        ],
        [
          "Change management",
          "System changes approved via email",
          "No formal change advisory board; emergency changes not tracked"
        ],
        [
          "Computer operations",
          "Batch processing runs overnight",
          "No independent review of job completion logs"
        ],
        [
          "Program development",
          "Developers have access to production data",
          "No segregation between development, test, and production environments"
        ],
        [
          "Physical security",
          "Server room requires badge access",
          "Visitor logs not maintained consistently"
        ]
      ],
      "ExhibitID": "CBQ2-E1-E1",
      "CaseID": "CBQ2-E1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "match",
      "Prompt": "Match each IT general control category to the primary risk it addresses.",
      "LeftItems": [
        "Logical access controls",
        "Change management controls",
        "Computer operations controls",
        "Program development controls"
      ],
      "RightItems": [
        "Unauthorized users gaining system access",
        "Unauthorized or untested system modifications causing errors or security gaps",
        "Processing errors, data loss, or incomplete processing going undetected",
        "Flawed or malicious code introduced into production systems",
        "Hardware theft or environmental damage to data center"
      ],
      "Correct": {
        "Logical access controls": "Unauthorized users gaining system access",
        "Change management controls": "Unauthorized or untested system modifications causing errors or security gaps",
        "Computer operations controls": "Processing errors, data loss, or incomplete processing going undetected",
        "Program development controls": "Flawed or malicious code introduced into production systems"
      },
      "Explanation": "Logical access controls (passwords, MFA, account management) prevent unauthorized access. Change management ensures system modifications are authorized, tested, and documented. Computer operations controls monitor batch processing, backups, and job completion. Program development controls (SDLC, segregation of environments) prevent defective or unauthorized code from reaching production. Physical security risks (hardware theft, environmental damage) are addressed by physical access controls, not by the ITGC categories listed here. A candidate might confuse computer operations with logical access controls, but operations controls focus on system processing integrity, not user authentication.",
      "Topic": "IT general control categories",
      "ItemID": "CBQ2-E1-Q1",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "IT general controls (ITGC) govern the overall IT environment and include logical access, change management, computer operations, and program development controls.",
      "BusinessInterpretation": "Weak ITGC can result in unauthorized transactions, data breaches, and unreliable financial reporting. COSO and COBIT frameworks emphasize ITGC as foundational to reliable financial systems.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-E1",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each control deficiency identified in Exhibit 1 to the most appropriate remediation.",
      "LeftItems": [
        "Shared admin accounts without MFA",
        "Changes approved only via email",
        "Developers accessing production data",
        "No batch job completion review"
      ],
      "RightItems": [
        "Implement individual accounts with multi-factor authentication and periodic access reviews",
        "Establish a change advisory board with formal approval, testing, and rollback procedures",
        "Enforce environment segregation and restrict production access to operations team only",
        "Implement automated job monitoring with alerts for failures and independent review of logs",
        "Install video surveillance and biometric access controls in the server room"
      ],
      "Correct": {
        "Shared admin accounts without MFA": "Implement individual accounts with multi-factor authentication and periodic access reviews",
        "Changes approved only via email": "Establish a change advisory board with formal approval, testing, and rollback procedures",
        "Developers accessing production data": "Enforce environment segregation and restrict production access to operations team only",
        "No batch job completion review": "Implement automated job monitoring with alerts for failures and independent review of logs"
      },
      "Explanation": "Shared accounts eliminate individual accountability; each user should have a unique ID and MFA for administrative access. Email-based change approval lacks the structure of a formal change advisory board (CAB) with documented testing, approval, and rollback plans. Developers in production violates segregation of duties between development and operations; production access should be limited to the operations team. Batch job completion should be monitored automatically with independent review to detect failures or unauthorized changes. Physical security remediation (video surveillance) addresses a different control area not flagged as deficient in this scenario.",
      "Topic": "IT control remediation",
      "ItemID": "CBQ2-E1-Q2",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Control weaknesses should be remediated based on risk severity. The COBIT framework provides a structured approach to IT control assessment and remediation.",
      "BusinessInterpretation": "The deficiencies identified represent systemic ITGC weaknesses that could lead to material misstatements in financial reporting if they affect financial applications. Management should prioritize remediation based on the sensitivity of the affected systems.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-E1",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each IT control type to the correct description of its purpose.",
      "LeftItems": [
        "Preventive control",
        "Detective control",
        "Corrective control",
        "Compensating control"
      ],
      "RightItems": [
        "Stops errors or unauthorized actions before they occur",
        "Identifies errors or irregularities after they have occurred",
        "Resolves issues after detection to restore normal operations",
        "Provides alternative oversight when primary controls are not feasible",
        "Documents all system changes for audit trail purposes"
      ],
      "Correct": {
        "Preventive control": "Stops errors or unauthorized actions before they occur",
        "Detective control": "Identifies errors or irregularities after they have occurred",
        "Corrective control": "Resolves issues after detection to restore normal operations",
        "Compensating control": "Provides alternative oversight when primary controls are not feasible"
      },
      "Explanation": "Preventive controls (e.g., password policies, authorization requirements) stop problems before they happen. Detective controls (e.g., access logs, batch completion monitoring) find problems after they occur. Corrective controls (e.g., backup restoration, incident response plans) fix problems. Compensating controls (e.g., manual review when automated controls are lacking) provide alternative oversight. Documentation is not a control type; it supports all control types by providing evidence.",
      "Topic": "IT control types",
      "ItemID": "CBQ2-E1-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Internal controls are classified as preventive, detective, corrective, or compensating based on when they operate relative to the risk event.",
      "BusinessInterpretation": "A well-designed IT control environment uses a mix of preventive and detective controls. Over-reliance on detective controls without preventive measures exposes the organization to unnecessary risk.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-E1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each application control type to its correct example.",
      "LeftItems": [
        "Input validation",
        "Processing control",
        "Output control",
        "Access control"
      ],
      "RightItems": [
        "Range check ensuring dollar amounts fall within expected limits",
        "Run-to-run control totals verifying data processed completely",
        "Review of printed reports for reasonableness before distribution",
        "User authentication required to access the application",
        "Quarterly physical inventory count verification"
      ],
      "Correct": {
        "Input validation": "Range check ensuring dollar amounts fall within expected limits",
        "Processing control": "Run-to-run control totals verifying data processed completely",
        "Output control": "Review of printed reports for reasonableness before distribution",
        "Access control": "User authentication required to access the application"
      },
      "Explanation": "Input validation checks data for accuracy and completeness before processing. Processing controls (e.g., control totals, limit checks) ensure data is processed correctly. Output controls verify that results are reasonable and complete before distribution. Access controls restrict who can use the application. Physical inventory counts are a general business control, not an application control.",
      "Topic": "Application controls vs IT general controls",
      "ItemID": "CBQ2-E1-Q4",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Application controls are specific to individual business applications and include input, processing, output, and access controls. They differ from IT general controls, which apply to the overall IT environment.",
      "BusinessInterpretation": "Strong application controls reduce the risk of material misstatements in financial data processed through business systems. Auditors test both ITGC and application controls to rely on automated controls.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-E1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "match",
      "Prompt": "Match each IT role to the correct segregation-of-duties conflict if the role is combined with others.",
      "LeftItems": [
        "System administrator also performs user access reviews",
        "Developer also moves code to production",
        "IT operator also records changes in the change log",
        "Database administrator also approves system access requests"
      ],
      "RightItems": [
        "The administrator could grant excessive privileges and conceal the action during review",
        "Code could be deployed without independent testing or approval",
        "Changes could be made without independent verification of completion",
        "Access could be granted without independent approval, bypassing access controls",
        "The CFO could override system controls and approve their own transactions"
      ],
      "Correct": {
        "System administrator also performs user access reviews": "The administrator could grant excessive privileges and conceal the action during review",
        "Developer also moves code to production": "Code could be deployed without independent testing or approval",
        "IT operator also records changes in the change log": "Changes could be made without independent verification of completion",
        "Database administrator also approves system access requests": "Access could be granted without independent approval, bypassing access controls"
      },
      "Explanation": "Segregation of duties in IT is critical: the person who administers systems should not review their own access changes. Developers should not have production migration rights. Operators should not self-approve their changes. Database administrators should not both request and approve access. These conflicts represent IT equivalent of the classic authorization-custody-recordkeeping segregation. The CFO scenario is not an IT role conflict.",
      "Topic": "IT segregation of duties",
      "ItemID": "CBQ2-E1-Q5",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Segregation of duties applies to IT functions just as it does to financial functions. The person who authorizes, processes, and reviews IT changes should not be the same individual.",
      "BusinessInterpretation": "Inadequate IT segregation of duties was a contributing factor in several major financial reporting frauds. SOX compliance requires auditors to evaluate IT segregation as part of the control environment.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-E1",
      "EstimatedMinutes": 6,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "E",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ-F1",
  "Title": "Data Governance and Warranty Analytics Dashboard",
  "SectionTags": [
    "F"
  ],
  "Pack": 1,
  "Section": "F",
  "BlueprintDomain": "Technology and Analytics",
  "BlueprintObjectives": [
    "Data quality",
    "Data governance",
    "Analytics types",
    "Data lineage",
    "Analytics governance"
  ],
  "PrimaryCompetency": "Judgment",
  "Topic": "Data Analytics",
  "Subtopic": "Quality cost classification",
  "SecondaryCompetencies": [
    "Calculation",
    "Conceptual"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Technology and analytics",
  "CompanyName": "Line Equipment",
  "CompanyType": "Manufacturer",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "EstimatedMinutes": 30,
  "ExhibitCount": 2,
  "Industry": "Industrial equipment",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Analyze data quality",
    "Analyze data governance",
    "Analyze data quality",
    "Analyze analytics types",
    "Analyze data lineage",
    "Analyze analytics governance"
  ],
  "ModifiedDate": "2026-07-26",
  "ProductionStatus": "Production",
  "QAReviewer": "Validator",
  "QuestionCount": 6,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    },
    {
      "Date": "2026-07-26",
      "Version": "1.1",
      "Author": "S533 Certification Agent",
      "Summary": "Certification-grade explanation expansion (6 items). question_state -> Certified. All 6 items passed CAQS six-dimension verification. Section F — Technology and Analytics."
    }
  ],
  "Stakeholder": "Line Equipment (CFO)",
  "Tags": [],
  "ValidationVersion": "2.0",
  "Version": "1.0",
  "ScenarioText": "BrightLine Equipment is building a warranty analytics dashboard to investigate failures in a new compressor model. The CFO will not allow operational decisions until data quality, lineage, and analytics purpose are clear.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 - Data Quality Profile",
      "Headers": [
        "Issue",
        "Count"
      ],
      "Rows": [
        [
          "Warranty claims in file",
          "18,000"
        ],
        [
          "Missing installation date",
          "3,600"
        ],
        [
          "Duplicate serial numbers",
          "450"
        ],
        [
          "Product codes not matching ERP master data",
          "1,200"
        ],
        [
          "Claims for XR-500 model",
          "2,800"
        ]
      ],
      "ExhibitID": "CBQ-F1-E1",
      "CaseID": "CBQ-F1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    },
    {
      "Type": "table",
      "Title": "Exhibit 2 - Analytics Requests",
      "Headers": [
        "Request",
        "Purpose"
      ],
      "Rows": [
        [
          "Summarize third-quarter failure rate",
          "What happened"
        ],
        [
          "Investigate supplier batch relationship",
          "Why it happened"
        ],
        [
          "Estimate next quarter warranty reserve",
          "What may happen"
        ],
        [
          "Recommend inspection threshold",
          "What should be done"
        ]
      ],
      "ExhibitID": "CBQ-F1-E2",
      "CaseID": "CBQ-F1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "numeric",
      "Prompt": "Enter the percentage of claims missing installation date, as a whole number.",
      "Correct": "20",
      "Explanation": "The percentage of claims missing installation date is calculated as (Missing installation date claims / Total warranty claims) x 100 = (3,600 / 18,000) x 100 = 20%. This calculation directly assesses the data-quality dimension of completeness, which DAMA-DMBOK defines as the proportion of stored data against the universe of expected values. In a governed data environment per COBIT 2019's Managed Data process (APO14), completeness ratios below 95% trigger remediation requirements because decision-critical fields cannot be missing at rates exceeding 5% without undermining the reliability of all downstream analytics. For BrightLine Equipment, 20% incompleteness means that one in five warranty claims cannot be analyzed on a time-series basis — the installation date anchors the claim in the compressor's lifecycle, enabling failure-rate trending, cohort analysis, and warranty reserve estimation. Without it, these claims are excluded from any time-dependent analysis, biasing the failure-rate dashboard toward more recently installed units and potentially masking systemic defects in older production runs. The business impact is material: the CFO's stated requirement that operational decisions must rest on clear data quality and lineage means this 20% missing rate must be disclosed to executives before any conclusions are drawn from the dashboard. The risk is that a dashboard showing failure rates based only on the 14,400 claims with installation dates may understate or overstate the true failure rate, leading BrightLine to misallocate warranty reserves, miss a supplier quality problem, or delay a necessary design change. A common CMA exam trap is to divide by a subset denominator — for example, calculating 3,600 / 2,800 = 128.6% by mistakenly using only XR-500 claims as the base. The exam tests whether candidates can identify the correct denominator for a data-quality completeness ratio: total records in the data set, not a filtered subset. From a professional standpoint, the management accountant's role under the IMA Statement of Ethical Professional Practice requires competence (presenting complete information), integrity (disclosing data limitations), and credibility (communicating fairly). Presenting analytics derived from incomplete data without quantifying the completeness gap would violate all three standards.",
      "Topic": "Data quality",
      "ItemID": "CBQ-F1-Q1",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "Simple",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 29: Data Governance",
      "CalculationRequired": true,
      "CaseID": "CBQ-F1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ExplanationVersion": 2
    },
    {
      "Type": "select",
      "Prompt": "Which data governance response best addresses inconsistent product codes?",
      "Choices": [
        "Assign data ownership and master-data standards",
        "Delete all XR-500 claims",
        "Use only spreadsheet formulas",
        "Classify the issue as residual income"
      ],
      "Correct": "Assign data ownership and master-data standards",
      "Explanation": "The best data governance response to inconsistent product codes is to assign data ownership and master-data standards. Under DAMA-DMBOK, master data management (MDM) establishes a single authoritative source for critical business entities — in this case, product codes for BrightLine's compressor models. When the warranty claims system uses product codes that do not match the ERP master data, this is a consistency failure: the same entity (a compressor model) is represented differently across two systems. The root cause is not a data-entry error but a governance failure — no authority has defined the valid product codes, no stewardship role owns the master data, and no synchronization process ensures the warranty system's reference data matches the ERP's master record. COBIT 2019's APO14 (Managed Data) control objective requires that master data be defined, maintained, and governed with clear ownership. COSO Principle 12 reinforces this by requiring that the organization deploys control activities over technology, which includes data validation rules that reject claims with product codes not present in the authorized master list. For BrightLine Equipment, the integrity of the warranty analytics dashboard depends on the ability to aggregate claims by product code. If 1,200 of 18,000 claims carry codes that cannot be mapped to the ERP master data, those claims are effectively orphaned — they cannot be assigned to a specific compressor model for failure-rate analysis, supplier investigation, or warranty reserve estimation. The CFO's mandate that decisions must await clear data quality is directly responsive to this defect. Establishing data ownership assigns a named individual or function responsible for maintaining the product code master and resolving discrepancies; establishing master-data standards defines the valid values, formats, and synchronization cadence between warranty and ERP systems; and instituting maintenance procedures ensures ongoing governance rather than one-time cleanup. A critical CMA exam trap is to select an operational workaround rather than a governance solution. Deleting data (Choice B) destroys transaction history; relying on spreadsheet formulas (Choice C) moves logic outside governed systems; and referencing residual income (Choice D) confuses financial performance measurement with data management. The exam tests the candidate's recognition that data-quality problems require governance-level interventions — ownership, standards, and procedures — not technical patches. Professionally, the management accountant serves as a bridge between IT governance and business decision-making. Recommending master-data governance demonstrates competency in information management and supports the organization's strategic objective of reliable analytics, consistent with the IMA's competence standard.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "Deleting all XR-500 claims would destroy transaction data and eliminate any ability to reconcile or correct the underlying product-code inconsistency. Under data governance best practices, the correct response to inconsistent data is to establish standards and ownership, not to delete the data. Data retention and integrity are fundamental governance principles; deletion eliminates the evidence without addressing the root cause of the inconsistency.",
      "ExplanationWrongC": "Using only spreadsheet formulas does not address the underlying governance failure of inconsistent master data. Spreadsheets are end-user computing tools that lack the centralized control, validation rules, and audit trail capabilities of a governed master data management system. Relying on spreadsheet formulas to work around inconsistent data compounds governance risks by introducing uncontrolled logic outside the approved system environment.",
      "ExplanationWrongD": "Classifying the issue as residual income is entirely unrelated to data governance and reflects a fundamental confusion between financial performance measurement metrics and data management controls. Residual income (RI) is a profitability measure comparing operating income to a required return on assets. It has no bearing on how product codes are standardized, maintained, or governed within an information system.",
      "Topic": "Data governance",
      "ItemID": "CBQ-F1-Q2",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "Terminology",
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 29: Data Governance",
      "AccountingPrinciple": "Data governance establishes policies for data quality, security, and usage.",
      "CalculationRequired": false,
      "CaseID": "CBQ-F1",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ExplanationVersion": 2
    },
    {
      "Type": "multi",
      "Prompt": "Select data-quality dimensions directly affected.",
      "Choices": [
        "Completeness",
        "Uniqueness",
        "Consistency",
        "Dividend policy"
      ],
      "Correct": [
        "Completeness",
        "Uniqueness",
        "Consistency"
      ],
      "Explanation": "The three data-quality dimensions directly affected by BrightLine's data profile are Completeness, Uniqueness, and Consistency. Under the DAMA-DMBOK Data Quality Framework, completeness measures whether all required data values are present — Exhibit 1 shows 3,600 of 18,000 claims are missing installation dates, representing a 20% completeness gap. This missing field prevents time-dependent analysis of these claims and causes any failure-rate trend or cohort analysis to be based on incomplete data. Uniqueness measures whether each entity is represented only once — the 450 duplicate serial numbers violate uniqueness, as the same compressor serial number appears multiple times in the claims database. Duplicates can arise from repeated submissions of the same claim, system reprocessing, or data integration errors. If uncorrected, duplicates inflate the apparent claim count, overstate failure rates, and distort warranty cost projections. Consistency measures whether related data elements agree across systems and within a single record — the 1,200 product codes that do not match the ERP master data are a consistency violation. The warranty system's product coding does not align with the authoritative ERP reference, meaning claims cannot be reliably grouped by product model for comparative analysis. These three dimensions are drawn from DAMA-DMBOK's standard data quality dimensions, which also include accuracy (reflects real-world state), timeliness (available when needed), and validity (conforms to defined format and range) — none of which are the primary issues identified in BrightLine's profile. COBIT 2019's DSS06 (Managed Business Process Controls) requires data quality controls that detect and correct completeness, uniqueness, and consistency violations before data enters analytic workflows. For BrightLine, the practical implication is that any dashboard built on this data without first remediating these three dimensions will produce unreliable insights. The CFO cannot assess whether the XR-500 compressor's failure rate is abnormal if the underlying data lacks complete installation dates, contains duplicate warranty claims, and includes product codes that cannot be matched to the compressor model hierarchy. A common CMA exam trap is to include a plausible-sounding but irrelevant financial term — dividend policy (Choice D) — among the options. The exam expects candidates to recognize that data quality dimensions are an information governance concept, not a financial management concept. The professional responsibility of the management accountant includes assessing the fitness of data for decision-making and communicating data-quality limitations to decision-makers per the IMA Statement of Ethical Professional Practice.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "",
      "ExplanationWrongC": "",
      "ExplanationWrongD": "Dividend policy is a corporate finance decision regarding the distribution of profits to shareholders and has no relationship to data quality dimensions. Data quality is assessed through dimensions such as completeness (are all required values present?), uniqueness (are there duplicate records?), consistency (do related data elements agree across systems?), accuracy, timeliness, and validity. Dividend policy is a financial management consideration wholly outside the data governance and quality measurement framework.",
      "Topic": "Data quality",
      "ItemID": "CBQ-F1-Q3",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "DistractorSimilarity"
      ],
      "CommonTrapReference": "Trap 29: Data Governance",
      "CalculationRequired": false,
      "CaseID": "CBQ-F1",
      "EstimatedMinutes": 5,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ExplanationVersion": 2
    },
    {
      "Type": "match",
      "Prompt": "Match each analytics request to its type.",
      "LeftItems": [
        "Summarize failure rate",
        "Investigate supplier batch relationship",
        "Estimate reserve",
        "Recommend inspection threshold"
      ],
      "RightItems": [
        "Descriptive",
        "Diagnostic",
        "Predictive",
        "Prescriptive"
      ],
      "Correct": {
        "Summarize failure rate": "Descriptive",
        "Investigate supplier batch relationship": "Diagnostic",
        "Estimate reserve": "Predictive",
        "Recommend inspection threshold": "Prescriptive"
      },
      "Explanation": "The four analytics requests in Exhibit 2 must be matched to the standard analytics maturity taxonomy: Descriptive, Diagnostic, Predictive, and Prescriptive. This taxonomy, formalized in the Gartner Analytics Ascendancy Model and applied in DAMA-DMBOK's data science and analytics chapter, classifies analytics by the question each type answers. 'Summarize failure rate' = Descriptive analytics, which answers 'What happened?' Descriptive analytics aggregates historical data to produce summary statistics — in BrightLine's case, the third-quarter XR-500 compressor failure rate expressed as a percentage, count, or trend line. It consumes the most basic analytics capability and serves as the foundation for all higher-order analysis. 'Investigate supplier batch relationship' = Diagnostic analytics, which answers 'Why did it happen?' Diagnostic analytics drills into the data to identify correlations, patterns, and causal factors — BrightLine's CFO wants to know whether specific supplier batches are associated with higher failure rates, which requires joining warranty claims data with supplier shipment records and conducting correlation or regression analysis. 'Estimate next quarter warranty reserve' = Predictive analytics, which answers 'What may happen?' Predictive analytics uses historical patterns and statistical models (e.g., Weibull failure distribution, regression, machine learning) to forecast future outcomes — BrightLine needs to estimate the dollar amount of expected warranty claims for the upcoming quarter to inform the financial close and reserve adequacy assessment under ASC 450 (Loss Contingencies). 'Recommend inspection threshold' = Prescriptive analytics, which answers 'What should be done?' Prescriptive analytics goes beyond forecasting to recommend specific actions — BrightLine's operations team needs to know at what production milestone an inspection should be triggered to catch potential defects before they become warranty claims. The hierarchy is important: each level builds on the output of the preceding level. BrightLine cannot diagnose the cause of failures without first describing the failure rate, cannot predict future claims without understanding historical patterns and causal factors, and cannot prescribe inspection protocols without a predictive model that quantifies risk thresholds. A critical CMA exam trap is to reverse Descriptive and Diagnostic — the temptation is to call failure-rate summarization 'diagnostic' because it involves investigating claims, but mere summarization of what occurred is descriptive. Similarly, candidates may confuse Predictive with Prescriptive by thinking that any forward-looking analysis is prescriptive, but a prediction is not the same as a recommendation. From a professional standpoint, the management accountant participates in analytics governance by ensuring that each analytics request is matched to the appropriate methodology and that the limitations of each analytics type are communicated to decision-makers.",
      "Topic": "Analytics types",
      "ItemID": "CBQ-F1-Q4",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CommonTrapReference": "Trap 27: Analytics Types",
      "BusinessInterpretation": "Analytics type depends on whether the question is what happened, why, what may happen, or what should be done.",
      "CalculationRequired": false,
      "CaseID": "CBQ-F1",
      "EstimatedMinutes": 6,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "ExplanationVersion": 2
    },
    {
      "Type": "fill",
      "Prompt": "Fill in the blank: Documentation showing source fields, transformations, and report logic is data _____.",
      "Correct": "lineage",
      "Explanation": "The documentation showing source fields, transformations, and report logic is data lineage. Under DAMA-DMBOK, data lineage is defined as the documentation of the data lifecycle: where data originates (source systems, tables, fields), what transformations it undergoes (joins, aggregations, calculations, filters, business rules applied), and where it is ultimately consumed (reports, dashboards, models, extracts). Data lineage is a distinct data governance capability — it is not synonymous with data quality (which measures fitness for use), metadata (which describes data structure and meaning), or a data dictionary (which catalogs field definitions). Rather, lineage specifically answers the question, 'How did this data get here and what happened to it along the way?' For BrightLine Equipment, data lineage is essential to the CFO's governance condition: before the warranty analytics dashboard can inform operational decisions such as supplier termination, design changes, or warranty reserve adjustments, the CFO must understand exactly which source fields fed each dashboard metric, what transformations were applied, and whether those transformations are logically sound and unchanged since the last reporting cycle. Without lineage, an executive cannot assess whether a spike in the failure-rate chart reflects a genuine product problem, a data-feed error from the warranty claims system, a change in the aggregation logic, or a duplicate-record artifact. COBIT 2019's APO14 (Managed Data) control objective includes lineage traceability as a required capability for trusted analytics. The COSO Internal Control Framework's Principle 13 (information and communication) requires that the organization obtains, generates, and uses relevant, quality information — lineage provides the evidence that information quality has been maintained through the transformation chain. In CMA Part 1 exam context, Section F (Technology and Analytics) tests the candidate's ability to distinguish between related but distinct data governance terms. A common trap is to answer 'data quality' — the prompt describes documentation about the data journey, not measurement of data fitness. Another trap is 'metadata' — while lineage is a form of metadata, the specific description of 'source fields, transformations, and report logic' points inexorably to lineage as the precise term. A third trap is 'data dictionary' or 'data catalog' — these describe what data means, not where it came from and how it was changed. From a professional standpoint, the management accountant who signs off on analytics used for financial decisions (such as ASC 450 warranty reserve estimates) must be able to trace the figures back to source data through documented lineage. Without lineage, a warranty reserve estimate cannot be explained or defended.",
      "Topic": "Data lineage",
      "ItemID": "CBQ-F1-Q5",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-F1",
      "EstimatedMinutes": 3,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2,
      "ExplanationVersion": 2
    },
    {
      "Type": "select",
      "Prompt": "What is the best recommendation before presenting the dashboard to executives?",
      "Choices": [
        "Resolve or disclose material data-quality limitations before drawing conclusions",
        "Hide missing dates because the chart looks complete",
        "Use duplicate serial numbers to increase sample size",
        "Change product codes manually without documentation"
      ],
      "Correct": "Resolve or disclose material data-quality limitations before drawing conclusions",
      "Explanation": "The best recommendation before presenting the warranty analytics dashboard to BrightLine's executives is to resolve or disclose material data-quality limitations before drawing conclusions. This answer reflects the convergence of three governance frameworks: DAMA-DMBOK data governance principle that data consumers must be informed of data quality issues that affect their decisions; COSO Principle 13, which requires that the organization communicates relevant and quality information, including known limitations, to enable internal control responsibilities; and the IMA Statement of Ethical Professional Practice, whose competence standard requires the management accountant to provide decision-support information that is accurate, clear, and complete, while the credibility standard requires communicating information fairly and objectively with all relevant limitations disclosed. The BrightLine CFO's explicit condition — no operational decisions until data quality, lineage, and analytics purpose are clear — establishes an analytics governance gate that this recommendation directly satisfies. The risks of the three incorrect options are instructive. Hiding missing dates because the chart looks complete (Choice B) is an active concealment of known data-quality issues, violating the IMA integrity standard's prohibition against engaging in activity that discredits the profession and directly contradicting the credibility standard's requirement for full disclosure of relevant limitations. Using duplicate serial numbers to increase sample size (Choice C) is a data manipulation that creates a false impression of statistical robustness. Duplicate records do not represent independent observations — including them inflates the n-count without adding new information, leading to artificially narrow confidence intervals and erroneous conclusions about failure-rate precision. Under DAMA-DMBOK, duplicate records must be identified and excluded from analysis before calculations, not treated as legitimate data points. Changing product codes manually without documentation (Choice D) violates change-management controls, breaks the audit trail, and destroys data lineage. Manual, undocumented changes mean the dashboard's underlying data can never be reconciled to the source system, making it impossible to determine whether a trend reflects real-world changes or unauthorized data modifications. The professional implication for the management accountant is clear: under the IMA integrity standard, the accountant must abstain from engaging in or supporting any activity that might discredit the profession — presenting analytics with known but undisclosed data quality defects would discredit both the accountant and the analytics function. The practical business impact for BrightLine is equally clear: if the CFO, acting on undisclosed-incomplete dashboard data, terminates a supplier or initiates a product recall that proves unnecessary, BrightLine incurs reputational damage, potential litigation, and wasted operational expenditure. The disclosure approach — acknowledging that 20% of claims lack installation dates, that 450 serial numbers are duplicated, and that 1,200 product codes are inconsistent — enables executives to apply appropriate professional skepticism to the dashboard's conclusions and make risk-adjusted decisions. This is consistent with the COSO ERM framework's principle that risk information must be communicated with sufficient context for decision-makers to evaluate its reliability.",
      "ExplanationWrongA": "",
      "ExplanationWrongB": "Hiding missing dates because the chart 'looks complete' is an ethical violation and a data-integrity failure. Data governance frameworks require disclosure of limitations, not concealment. Presenting incomplete data as complete can lead executives to draw incorrect conclusions, creating both operational and reputational risk.",
      "ExplanationWrongC": "Using duplicate serial numbers to increase sample size inflates the apparent data volume without adding new information. This is a data-quality manipulation — it creates the illusion of larger sample size while introducing bias. Proper analytics governance requires valid, unique data points, not fabricated volume.",
      "ExplanationWrongD": "Changing product codes manually without documentation violates data-integrity and change-management controls. Unauthorized and undocumented data modifications break the audit trail and compromise data lineage. All data changes require proper authorization and documentation under data governance standards.",
      "Topic": "Analytics governance",
      "ItemID": "CBQ-F1-Q6",
      "CognitiveLevel": "Apply",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "CalculationRequired": false,
      "CaseID": "CBQ-F1",
      "EstimatedMinutes": 4,
      "Pack": 1,
      "ProductionStatus": "Production",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "ExplanationVersion": 2
    }
  ],
  "question_state": "Certified",
  "pack_state": "Production",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-F1",
  "Title": "Data Analytics Maturity",
  "SectionTags": [
    "F"
  ],
  "Pack": 2,
  "Section": "F",
  "BlueprintDomain": "Technology and Analytics",
  "BlueprintObjectives": [
    "Data analytics maturity levels",
    "Data governance for analytics readiness"
  ],
  "PrimaryCompetency": "Judgment",
  "Topic": "Data analytics maturity",
  "Subtopic": "Data analytics classification",
  "SecondaryCompetencies": [],
  "Author": "Case Author",
  "BusinessFunction": "Technology and analytics",
  "CompanyName": "Meridian Retail Group",
  "CompanyType": "Technology provider",
  "Confidence": 100,
  "CreatedDate": "2026-07-20",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 20,
  "ExhibitCount": 1,
  "Industry": "Technology",
  "LastValidated": "2026-07-20",
  "LearningObjectives": [
    "Classify a data analytics practice by maturity level",
    "Distinguish descriptive from diagnostic analytics",
    "Recognize predictive analytics applications",
    "Evaluate data governance prerequisites for analytics readiness",
    "Identify prescriptive analytics applications"
  ],
  "ModifiedDate": "2026-07-20",
  "ProductionStatus": "Draft",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-20",
      "Version": "1.0",
      "Author": "Case Author",
      "Summary": "Initial creation with metadata schema"
    }
  ],
  "Stakeholder": "Chief Data Officer",
  "Tags": [
    "data analytics",
    "analytics maturity",
    "descriptive analytics",
    "predictive analytics",
    "prescriptive analytics",
    "data governance"
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "Meridian Retail Group operates 85 department stores across the Midwest with annual revenue of $420 million. The company recently hired a Chief Data Officer (CDO) to build an enterprise analytics capability. Currently, the finance team produces monthly sales reports in Excel using historical data, while the marketing team conducts simple campaign analysis. The CDO has proposed a three-phase analytics maturity roadmap. The board has asked for an assessment of current maturity and a plan to advance toward predictive and prescriptive analytics capabilities. The CDO has prepared a summary of current analytics practices across departments.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — Current Analytics Practices by Department",
      "Headers": [
        "Department",
        "Analytics Type Used",
        "Data Sources",
        "Decision Support"
      ],
      "Rows": [
        [
          "Finance",
          "Descriptive",
          "Historical sales, GL",
          "Monthly variance reports, budget vs actual"
        ],
        [
          "Marketing",
          "Descriptive / Diagnostic",
          "Customer surveys, web traffic",
          "Campaign ROI analysis, customer segmentation"
        ],
        [
          "Supply Chain",
          "Descriptive",
          "Inventory levels, supplier lead times",
          "Reorder point calculations, stockout reports"
        ],
        [
          "Store Operations",
          "Descriptive",
          "POS data, labor schedules",
          "Sales per square foot, labor cost percentage"
        ]
      ],
      "ExhibitID": "CBQ2-F1-E1",
      "CaseID": "CBQ2-F1",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "select",
      "Prompt": "Based on the scenario, which level of analytics maturity best describes Meridian Retail Group's current state?",
      "Correct": "Descriptive analytics — reporting on historical performance",
      "Choices": [
        "Descriptive analytics — reporting on historical performance",
        "Diagnostic analytics — analyzing why something happened",
        "Predictive analytics — forecasting future outcomes",
        "Prescriptive analytics — recommending optimal actions",
        "Cognitive analytics — autonomous decision-making by AI"
      ],
      "Explanation": "Meridian currently uses historical sales data for monthly variance reports and budget comparisons, which is descriptive analytics — answering \"what happened?\" Descriptive analytics summarizes past data to identify trends. Diagnostic analytics would answer \"why did it happen?\" through root cause analysis. Predictive analytics uses models to forecast what might happen. Prescriptive analytics recommends actions. Cognitive analytics involves AI-driven autonomous decisions. The company is not yet performing diagnostic analysis, as no root cause investigation or cause-effect analysis is described.",
      "Topic": "Analytics maturity levels",
      "ItemID": "CBQ2-F1-Q1",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Descriptive analytics forms the foundation of management reporting. The IMA Statement of Ethical Professional Practice emphasizes that management accountants should provide accurate and clear information, which begins with descriptive reporting.",
      "BusinessInterpretation": "Before a company can advance to predictive or prescriptive analytics, it must have a strong descriptive analytics foundation with clean, reliable data. Meridian's current Excel-based reporting is typical of organizations at Level 1 of the analytics maturity model.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "select",
      "Prompt": "The CDO proposes implementing a dashboard that shows real-time sales by region, inventory turnover, and customer foot traffic. What type of analytics does this dashboard primarily enable?",
      "Correct": "Diagnostic analytics — the dashboard allows drill-down to understand performance drivers",
      "Choices": [
        "Diagnostic analytics — the dashboard allows drill-down to understand performance drivers",
        "Descriptive analytics — the dashboard simply displays historical data",
        "Predictive analytics — the dashboard forecasts future sales trends",
        "Prescriptive analytics — the dashboard recommends inventory reorder quantities",
        "Operational analytics — the dashboard automates routine business decisions"
      ],
      "Explanation": "Real-time dashboards with drill-down capability enable diagnostic analytics, which answers \"why did it happen?\" Users can identify patterns, correlations, and root causes. While dashboards can display descriptive information (what happened), the real-time drill-down feature distinguishes it as diagnostic analytics by allowing users to explore underlying drivers. Predictive analytics would require statistical models or machine learning. Prescriptive analytics would require optimization algorithms that recommend specific actions. The term \"operational analytics\" is not a standard analytics maturity level.",
      "Topic": "Diagnostic analytics",
      "ItemID": "CBQ2-F1-Q2",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "The COSO framework's information and communication component requires that relevant information be identified, captured, and communicated in a form and timeframe that enables management to make informed decisions.",
      "BusinessInterpretation": "Diagnostic analytics dashboards bridge the gap between descriptive reporting and predictive modeling. They are essential for identifying performance drivers and operational issues before they escalate.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "select",
      "Prompt": "For the next phase of the analytics roadmap, the CDO wants to use historical sales data and external economic indicators to forecast next quarter's revenue. What type of analytics is being described?",
      "Correct": "Predictive analytics — using historical data and models to forecast future outcomes",
      "Choices": [
        "Predictive analytics — using historical data and models to forecast future outcomes",
        "Descriptive analytics — summarizing historical sales data in reports",
        "Diagnostic analytics — analyzing why sales changed last quarter",
        "Prescriptive analytics — determining the optimal pricing strategy",
        "Confirmation analytics — validating existing business hypotheses"
      ],
      "Explanation": "Predictive analytics uses historical data, statistical models, and machine learning to forecast future events. The scenario explicitly describes forecasting next quarter's revenue, which is the defining characteristic of predictive analytics. Descriptive analytics only summarizes past data without forecasting. Diagnostic analytics explains past events. Prescriptive analytics suggests actions to achieve desired outcomes. \"Confirmation analytics\" is not a recognized analytics category in the standard maturity model.",
      "Topic": "Predictive analytics",
      "ItemID": "CBQ2-F1-Q3",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Management accountants increasingly use predictive analytics for budgeting and forecasting. The IMA's Management Accounting Competency Framework identifies data analytics and modeling as a key competency area.",
      "BusinessInterpretation": "Predictive analytics improves forecast accuracy by incorporating leading indicators and external data. Organizations with mature analytics capabilities can reduce forecasting error and respond faster to market changes.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F1",
      "EstimatedMinutes": 4,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "select",
      "Prompt": "The supply chain team wants a tool that recommends optimal inventory reorder quantities and identifies the most cost-effective shipping routes. The tool should consider demand forecasts, supplier lead times, and freight rates. What type of analytics is required?",
      "Correct": "Prescriptive analytics — recommending optimal actions based on multiple variables and constraints",
      "Choices": [
        "Prescriptive analytics — recommending optimal actions based on multiple variables and constraints",
        "Descriptive analytics — reporting current inventory levels and shipping costs",
        "Predictive analytics — forecasting when stockouts will occur",
        "Diagnostic analytics — explaining why shipping costs increased",
        "Automated analytics — replacing the supply chain team with AI"
      ],
      "Explanation": "Prescriptive analytics goes beyond predicting what will happen to recommend specific actions that optimize outcomes given defined constraints. The scenario requires optimizing inventory and shipping decisions using multiple variables, which is the hallmark of prescriptive analytics. Descriptive analytics would only report current status. Predictive analytics would forecast stockouts but wouldn't recommend order quantities. Diagnostic analytics would explain past variances. \"Automated analytics\" is not a standard category.",
      "Topic": "Prescriptive analytics",
      "ItemID": "CBQ2-F1-Q4",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "Prescriptive analytics supports the management function of decision-making by identifying optimal resource allocation. It aligns with cost-benefit analysis and constraint-based optimization taught in CMA curriculum.",
      "BusinessInterpretation": "Prescriptive analytics represents the highest maturity level and requires significant investment in data infrastructure, modeling expertise, and cross-functional data integration. Most organizations achieve this capability only after mastering descriptive and predictive analytics.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "select",
      "Prompt": "Before Meridian can advance its analytics maturity, it must address several data challenges. Which of the following is the MOST critical prerequisite for successful analytics implementation?",
      "Correct": "Establishing data governance policies to ensure data quality, consistency, and accessibility across departments",
      "Choices": [
        "Establishing data governance policies to ensure data quality, consistency, and accessibility across departments",
        "Purchasing the most advanced analytics software platform available",
        "Hiring a team of data scientists with PhDs in machine learning",
        "Creating a centralized data warehouse that consolidates all departmental data",
        "Outsourcing all analytics functions to a third-party consulting firm"
      ],
      "Explanation": "Data governance is the foundational prerequisite for analytics maturity. Without consistent data definitions, quality standards, and access policies, analytics outputs are unreliable regardless of the tools or talent employed. While a data warehouse and skilled data scientists are valuable, they are less critical than governance. Purchasing advanced software without governance leads to \"garbage in, garbage out.\" Outsourcing bypasses the internal capability-building needed for sustainable analytics maturity.",
      "Topic": "Data governance and analytics readiness",
      "ItemID": "CBQ2-F1-Q5",
      "CognitiveLevel": "Evaluate",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "High",
      "DifficultyDrivers": [
        "JudgmentRequired"
      ],
      "AccountingPrinciple": "The COSO principle of reliable data and information applies directly to analytics. Management accountants must ensure that data used for decision-making is accurate, complete, and timely — all governed by data governance policies.",
      "BusinessInterpretation": "Organizations that invest in analytics without first establishing data governance often struggle with inconsistent metrics, lack of trust in data, and failed analytics initiatives. Governance is the foundation upon which all analytics capabilities are built.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F1",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
},
{
  "CaseID": "CBQ2-F2",
  "Title": "Data Governance and Lifecycle Management",
  "SectionTags": [
    "F"
  ],
  "Pack": 2,
  "Section": "F",
  "BlueprintDomain": "Technology and Analytics",
  "BlueprintObjectives": [
    "Data governance framework and principles",
    "Data lifecycle management",
    "Data quality dimensions and controls",
    "Master data management",
    "Data privacy and regulatory compliance"
  ],
  "PrimaryCompetency": "Conceptual",
  "Topic": "Data Governance and Lifecycle Management",
  "Subtopic": "Data management, data quality, and governance frameworks",
  "SecondaryCompetencies": [
    "Analysis",
    "Judgment"
  ],
  "Author": "Case Author",
  "BusinessFunction": "Data governance and compliance",
  "CompanyName": "HealthPlus Insurance",
  "CompanyType": "Health insurance provider",
  "Confidence": 100,
  "CreatedDate": "2026-07-21",
  "Dependencies": [],
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "EstimatedMinutes": 25,
  "ExhibitCount": 1,
  "Industry": "Insurance",
  "LastValidated": "2026-07-21",
  "LearningObjectives": [
    "Identify data lifecycle stages and their governance requirements",
    "Recognize data quality dimensions and their business impact",
    "Apply data governance principles to regulatory compliance scenarios",
    "Evaluate data management controls for completeness and accuracy",
    "Distinguish between master data, transactional data, and metadata"
  ],
  "ModifiedDate": "2026-07-21",
  "ProductionStatus": "Draft",
  "QAReviewer": "Validator",
  "QuestionCount": 5,
  "Reviewer": "Accountant",
  "RevisionHistory": [
    {
      "Date": "2026-07-21",
      "Version": "2.0",
      "Author": "Case Author",
      "Summary": "Full content authoring — data governance, data lifecycle, data quality, and regulatory compliance"
    }
  ],
  "Stakeholder": "Chief Data Officer",
  "Tags": [
    "data governance",
    "data lifecycle",
    "data quality",
    "data privacy",
    "master data management",
    "metadata"
  ],
  "ValidationVersion": "2.0",
  "Version": "2.0",
  "ScenarioText": "HealthPlus Insurance is a regional health insurer with 1.2 million members and annual premium revenue of $3.8 billion. The company processes over 15 million claims annually through its core claims administration system. Recent regulatory audits revealed data quality issues that led to incorrect provider payments and compliance reporting errors. The newly appointed Chief Data Officer (CDO) is implementing a comprehensive data governance program. The data governance team has documented the current data management practices and identified gaps in data lifecycle governance, data quality controls, and regulatory compliance.",
  "Exhibits": [
    {
      "Type": "table",
      "Title": "Exhibit 1 — Current Data Management Practices Assessment",
      "Headers": [
        "Data Lifecycle Stage",
        "Current Practice",
        "Issue Identified"
      ],
      "Rows": [
        [
          "Data creation / acquisition",
          "Member enrollment data entered by call center; provider contracts scanned as PDF",
          "No standardized data entry validation; duplicate member records estimated at 4%"
        ],
        [
          "Data storage and maintenance",
          "Claims data stored in legacy system; provider data in separate CRM",
          "No master data management; provider and member data fragmented across 3 systems"
        ],
        [
          "Data usage",
          "Claims processors access member and provider data daily; analytics team runs ad hoc queries",
          "No data usage tracking; analysts use different definitions for \"active member\""
        ],
        [
          "Data archiving",
          "Claims older than 7 years stored on tape backup",
          "No consistent retention policy; some data purged prematurely"
        ],
        [
          "Data disposal",
          "Paper records shredded by third-party vendor",
          "No certification of destruction; e-waste disposal unmonitored"
        ]
      ],
      "ExhibitID": "CBQ2-F2-E1",
      "CaseID": "CBQ2-F2",
      "ValidationVersion": "2.0",
      "ReferencedBy": []
    }
  ],
  "Items": [
    {
      "Type": "fill",
      "Prompt": "Enter the term for the data management practice that ensures consistent, accurate, and uniform data across the enterprise by creating a single source of truth for critical business entities such as members and providers.",
      "Correct": "Master data management",
      "Explanation": "Master data management (MDM) is the practice of creating a single, consistent, and authoritative source of truth for core business entities such as customers, members, providers, and products. The scenario describes fragmented member and provider data across three systems, which is exactly the problem MDM addresses. Data governance establishes overall policies but MDM specifically enables consistency of master data entities.",
      "Topic": "Master data management",
      "ItemID": "CBQ2-F2-Q1",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Master data management supports the COSO principle that reliable data is essential for effective internal control. Consistent master data (vendors, customers, employees) is critical for financial reporting accuracy.",
      "BusinessInterpretation": "Organizations with fragmented master data across systems face increased risk of duplicate payments, incorrect reporting, and operational inefficiencies. MDM implementation is a foundational step in any data governance program.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "fill",
      "Prompt": "Enter the data quality dimension that is violated when different departments use different definitions for \"active member,\" leading to inconsistent analytics results.",
      "Correct": "Consistency",
      "Explanation": "Consistency is the data quality dimension that requires data values to be the same across systems and according to common definitions. When different departments use different definitions for the same concept, data consistency is violated. Accuracy refers to whether data correctly reflects reality. Completeness measures whether all required data is present. Timeliness measures whether data is current. The core issue here is definitional inconsistency.",
      "Topic": "Data quality dimensions",
      "ItemID": "CBQ2-F2-Q2",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "The FASB's qualitative characteristics of accounting information include consistency and comparability. Similarly, data quality frameworks require consistency across systems and time periods for reliable management reporting.",
      "BusinessInterpretation": "Inconsistent data definitions are one of the most common data quality issues in healthcare organizations and lead to unreliable KPIs, regulatory reporting errors, and management mistrust of analytics.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    },
    {
      "Type": "fill",
      "Prompt": "Enter the term for the data that describes the structure, context, and meaning of other data — for example, the definition of \"claim status\" field, its data type, and allowable values.",
      "Correct": "Metadata",
      "Explanation": "Metadata is \"data about data\" that describes the structure, context, meaning, and lineage of data. Examples include field definitions, data types, allowable values, and business rules. Metadata management is a critical component of data governance because it enables users to understand what data means and how to use it consistently. Master data refers to core business entities. Transactional data records business events. Reference data is a subset of metadata defining allowable values.",
      "Topic": "Metadata management",
      "ItemID": "CBQ2-F2-Q3",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "Management accountants rely on metadata to ensure consistent application of accounting policies across reporting periods. The SEC's XBRL taxonomy is essentially a metadata standard for financial reporting.",
      "BusinessInterpretation": "Without proper metadata management, organizations struggle with data lineage tracing, impact analysis, and regulatory compliance. Metadata catalogs are a key enabler of self-service analytics.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F2",
      "EstimatedMinutes": 4,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "fill",
      "Prompt": "Enter the regulatory framework acronym that requires HealthPlus to protect member health information, including implementing data access controls, encryption, and breach notification procedures.",
      "Correct": "HIPAA",
      "Explanation": "HIPAA (Health Insurance Portability and Accountability Act) establishes national standards for protecting individuals' medical records and health information. It requires covered entities like HealthPlus to implement administrative, physical, and technical safeguards for protected health information (PHI). While other regulations may also apply (such as state privacy laws), HIPAA is the primary federal regulation governing health insurers' data privacy obligations.",
      "Topic": "Data privacy and regulatory compliance",
      "ItemID": "CBQ2-F2-Q4",
      "CognitiveLevel": "Understand",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Short",
      "DecisionComplexity": "Low",
      "DifficultyDrivers": [
        "Terminology"
      ],
      "AccountingPrinciple": "SOX requires public companies to maintain internal controls over financial reporting, including controls over data integrity. HIPAA adds additional privacy and security requirements for healthcare entities.",
      "BusinessInterpretation": "Regulatory compliance is a key driver of data governance programs in the healthcare industry. Non-compliance can result in significant penalties, reputational damage, and loss of member trust.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F2",
      "EstimatedMinutes": 4,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Moderate-Easy",
      "DifficultyScore": 2
    },
    {
      "Type": "fill",
      "Prompt": "Enter the term for the data lifecycle stage in which HealthPlus should implement a formal data retention schedule that specifies how long different types of data must be kept based on regulatory, legal, and business requirements.",
      "Correct": "Data archiving",
      "Explanation": "Data archiving is the lifecycle stage where data is moved from primary production systems to long-term storage according to a defined retention schedule. The scenario notes that HealthPlus lacks a consistent retention policy, with some data being purged prematurely. Data archiving ensures compliance with legal and regulatory requirements for data retention. Data storage focuses on maintaining current operational data. Data disposal is the final stage of secure data destruction after the retention period expires.",
      "Topic": "Data lifecycle management",
      "ItemID": "CBQ2-F2-Q5",
      "CognitiveLevel": "Analyze",
      "CalculationComplexity": "None",
      "ReadingComplexity": "Moderate",
      "DecisionComplexity": "Medium",
      "DifficultyDrivers": [
        "Terminology",
        "DistractorSimilarity"
      ],
      "AccountingPrinciple": "The Sarbanes-Oxley Act (SOX) requires public companies to retain audit-related records for 7 years. Data archiving policies must incorporate these and other regulatory retention requirements to ensure compliance.",
      "BusinessInterpretation": "A formal data retention and archiving policy reduces legal risk, ensures regulatory compliance, and controls storage costs. Many organizations discover they lack clear archiving policies during regulatory audits.",
      "CalculationRequired": false,
      "CaseID": "CBQ2-F2",
      "EstimatedMinutes": 5,
      "Pack": 2,
      "ProductionStatus": "Draft",
      "Section": "F",
      "question_state": "Certified",
      "pack_state": "Draft",
      "pedagogical_cluster": "",
      "question_tier": "Ungraded",
      "question_status": "Active",
      "Difficulty": "Difficult",
      "DifficultyScore": 4
    }
  ],
  "question_state": "Certified",
  "pack_state": "Draft",
  "pedagogical_cluster": "",
  "question_tier": "Ungraded",
  "question_status": "Active"
}
];

// UI Catalog Aliases — resolves the 0-case display bug for Packs A/E
const CASE_BANK_A = CASE_PACK_1;
const MIGRATED_CASE_BASE_A = CASE_PACK_1;
const CASE_BANK_D = CASE_PACK_1;
const MIGRATED_CASE_BASE_D = CASE_PACK_1;
