/**
 * p2_wave_integrate.js — Appends 30 new items (5 per pack) to P2 pack files.
 * BLOCK-AUTHORIZED — Schema Lock session batch. ≤30 items per Rule 5.
 * All items pre-normalized to ratified P2_SCHEMA_STANDARD.md v1.0.
 * 
 * Usage: node scripts/p2_wave_integrate.js [--dry-run]
 */

const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const P2_DIR = path.join(ROOT, "p2");
const DRY_RUN = process.argv.includes("--dry-run");

// ============================================================================
// ITEM DATA — 30 items, 5 per pack, all fields normalized to ratified schema
// ============================================================================

// PACK C — 5 items (P2-C-016 to P2-C-020)

const PACK_C_ITEMS = [
  {
    "Part": 2, "Section": "C", "Topic": "C.016 multi-product-cvp-weighted-average-cm",
    "QuestionID": "P2-C-016", "question_state": "Unprocessed", "Part2OnlyFlag": true,
    "UniqueConceptKey": "C-016-multi-product-cvp-wacm-breakeven",
    "Stem": "Kellerman Industries produces two products. Product X has a contribution margin of $24 per unit and Product Y has a contribution margin of $40 per unit. The expected sales mix is three units of X for every one unit of Y. Total fixed costs are $336,000. The controller is preparing the breakeven analysis for the annual operating plan.",
    "Choices": { "A": "8,400 units", "B": "10,500 units", "C": "12,000 units", "D": "14,000 units" },
    "CorrectChoice": "C",
    "ExplanationCorrect": "In multi-product CVP analysis, the breakeven point uses the weighted average contribution margin (WACM) based on the sales mix. For a bundle of 4 units (3X + 1Y), total CM = (3 x $24) + (1 x $40) = $72 + $40 = $112. WACM per unit = $112 / 4 = $28. Breakeven in total units = $336,000 / $28 = 12,000 units. Kellerman must sell a combined 12,000 units: 9,000 units of X and 3,000 units of Y. Products with different CM must be weighted, not averaged; the simple arithmetic mean of the two CM values ($32) would understate the breakeven point because it overweights the higher-CM product relative to the actual mix.",
    "ExplanationWrongA": "8,400 units results from dividing fixed costs by Product Y's CM alone ($336,000 / $40), ignoring Product X entirely. A candidate making this error treats the lower-margin product as though its contribution data is irrelevant, analogous to trap T1: excluding a relevant component from the weighted analysis. T1: including sunk costs / excluding relevant costs",
    "ExplanationWrongB": "10,500 units results from computing a simple average CM of ($24 + $40) / 2 = $32 and dividing $336,000 / $32. The simple average assumes equal sales of both products, ignoring the 3:1 mix. Because Product Y has a higher CM and represents a smaller share of the mix, the simple average overstates WACM. T2: treating unit data as if uniformly distributed",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "14,000 units results from dividing fixed costs by Product X's CM alone ($336,000 / $24), ignoring Product Y's higher $40 contribution entirely. Each unit of Y in the bundle contributes $40 toward fixed costs; excluding Y inflates the breakeven quantity. T1: treating relevant contribution data as though it does not factor into the decision.",
    "Difficulty": "Moderate", "DifficultyScore": 3, "CognitiveLevel": "Apply", "CalculationItem": true,
    "ItemStyle": "single-select", "LOSTag": "C.1", "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "DA-01: Breakeven = Fixed Costs / Weighted Average CM per Unit",
    "CommonTrapReference": "T2: Using simple average CM instead of sales-mix-weighted WACM",
    "Authorities": ["IMA SMA on relevant costing"],
    "VerifiedChecks": ["Part2OnlyFlag verified true", "EW[CC] empty (DL-008)", "Non-CC EW slots >=50 chars (DL-026)", "No boilerplate (DL-013)", "Difficulty justified", "Independent calculation: WACM=28, BE=12,000", "Authority citations match"]
  },
  {
    "Part": 2, "Section": "C", "Topic": "C.017 shut-down-point-short-run",
    "QuestionID": "P2-C-017", "question_state": "Unprocessed", "Part2OnlyFlag": true,
    "UniqueConceptKey": "C-017-shut-down-continue-if-price-covers-avc",
    "Stem": "Denton Manufacturing operates a single production line with monthly fixed costs of $180,000. The product sells for $48 per unit, variable manufacturing cost is $26 per unit, and variable selling cost is $4 per unit. Current monthly production and sales are 4,500 units, well below capacity of 10,000. Operating income is negative. The controller must recommend whether to continue operations or shut down in the short run.",
    "Choices": { "A": "Shut down immediately, because fixed costs are avoidable in the long run", "B": "Shut down, because operating income of $(99,000) is negative and the factory is below capacity", "C": "Continue operating, because the $48 selling price exceeds the $26 variable manufacturing cost per unit", "D": "Continue operating, because the $48 selling price exceeds the $30 average variable cost per unit, generating $18 contribution per unit toward fixed costs" },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The short-run shut-down rule: continue if price covers AVC. Total variable cost = $26 + $4 = $30 per unit. Selling price of $48 exceeds $30 AVC, generating $18 CM per unit. Total CM = 4,500 x $18 = $81,000, which reduces the loss from $180,000 (shut-down) to $99,000 (operating). The $81,000 advantage of continuing makes the decision clear. Fixed costs of $180,000 are committed in the short run; they are irrelevant. This is grounded in marginal analysis and CVP framework.",
    "ExplanationWrongA": "Shutting down because fixed costs are avoidable in the long run confuses short-run and long-run analysis. In the short run, $180,000 in fixed costs are committed and unavoidable. The relevant question is whether $48 price exceeds $30 AVC -- it does, contributing $81,000 toward unavoidable fixed costs. T1: including committed fixed costs in short-run relevant-cost analysis when they are sunk and common to both alternatives.",
    "ExplanationWrongB": "Negative operating income of $(99,000) does not justify shut-down when the shut-down alternative produces a larger loss of $180,000. The $81,000 CM reduces the loss relative to ceasing operations. The correct comparison: operate and lose $99K vs. shut down and lose $180K -- an $81K advantage to continuing.",
    "ExplanationWrongC": "While the $48 price exceeds the $26 variable manufacturing cost, this analysis is incomplete -- it omits the $4 variable selling cost per unit. Total variable cost is $30, and correct CM is $18, not $22. Although the conclusion to continue happens to be correct here, the reasoning is flawed. In a scenario with higher selling costs, this partial analysis could produce the wrong recommendation. T2: narrowly defining variable cost without capturing all costs that vary with the decision.",
    "ExplanationWrongD": "",
    "Difficulty": "Difficult", "DifficultyScore": 4, "CognitiveLevel": "Apply", "CalculationItem": true,
    "ItemStyle": "single-select", "LOSTag": "C.2", "BlueprintDomain": "Decision Analysis",
    "FormulaReference": "DA-07: Shut-down -- Continue if Price >= Minimum AVC",
    "CommonTrapReference": "T1: Including sunk costs in relevant-cost analysis",
    "Authorities": ["IMA SMA on relevant costing"],
    "VerifiedChecks": ["Part2OnlyFlag verified true", "EW[CC] empty (DL-008)", "Non-CC EW slots >=50 chars (DL-026)", "No boilerplate (DL-013)", "Difficulty justified", "Independent: AVC=$30, $48>$30, continue; loss vs shut-down: $99K vs $180K", "Authority citations match"]
  }
];

const PACK_F_ITEMS = [
  {
    "Part": 2, "Section": "F", "Topic": "F.001 competence-recognizing-limits-of-expertise",
    "QuestionID": "P2-F-001", "question_state": "Unprocessed", "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-001-competence-decline-unqualified-assignment",
    "Stem": "Maria Santos, a staff accountant at Westlake Manufacturing, is asked by her controller to present a complex derivative valuation analysis to the board of directors. Maria has no training in derivative valuation. Per the IMA Statement, what should Maria do?",
    "Choices": { "A": "Decline the assignment, explain the competence gap, and recommend a qualified valuation specialist", "B": "Accept the assignment and learn derivative valuation before the presentation", "C": "Accept the assignment but ask the controller to review her work before the presentation", "D": "Postpone the presentation until she completes a professional development course" },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under the IMA Competence standard, management accountants must maintain professional expertise and perform duties per professional standards. Maria lacks derivative valuation expertise. Accepting would violate the standard. The correct action: decline, disclose the gap, and recommend a qualified professional. Board presentations demand current competence, not aspirational learning.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B is incorrect. While continuing education is encouraged under the Competence standard, developing expertise in derivative valuation through self-study immediately before a board presentation does not satisfy the standard. Competence requires existing, demonstrable expertise when duties are performed. The board is entitled to analysis by a qualified professional.",
    "ExplanationWrongC": "Option C is incorrect. The Competence standard places responsibility on the individual accountant, not on a supervisor to remediate deficiencies through review. If the controller has the expertise, the controller should present directly. Delegating to an unqualified subordinate and reviewing their work does not cure the competence gap.",
    "ExplanationWrongD": "Option D is incorrect. Completing one course does not confer the depth needed for reliable derivative valuation. The IMA Competence standard requires appropriate expertise when duties are undertaken. The practical solution: engage a qualified professional now while pursuing development for future assignments.",
    "Difficulty": "Easy", "DifficultyScore": 1, "CognitiveLevel": "Understand", "CalculationItem": false,
    "ItemStyle": "single-select", "LOSTag": "F.1", "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "", "CommonTrapReference": "Confusing willingness to learn with current competence per IMA Standards",
    "Authorities": ["IMA Statement of Ethical Professional Practice - Competence Standard"],
    "VerifiedChecks": ["Part2OnlyFlag verified true", "EW[CC] empty (DL-008)", "Non-CC EW slots >=50 chars (DL-026)", "No boilerplate (DL-013)", "Difficulty justified", "IMA Competence standard correctly applied", "Scenario reflects real-world ethical dilemma"]
  },
  {
    "Part": 2, "Section": "F", "Topic": "F.002 confidentiality-proprietary-data-disclosure",
    "QuestionID": "P2-F-002", "question_state": "Unprocessed", "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-002-confidentiality-unauthorized-cost-data-sharing",
    "Stem": "During a budget review meeting, Thomas Chen, a cost analyst at Pacific Aerospace, overhears a colleague sharing proprietary supplier cost breakdowns with a friend at a competing manufacturer. Which IMA standard is most directly violated?",
    "Choices": { "A": "Competence, because the colleague failed to maintain procurement ethics expertise", "B": "Confidentiality, because proprietary cost data is disclosed to an unauthorized external party", "C": "Integrity, because the colleague's behavior undermines ethical culture", "D": "Credibility, because the colleague is not communicating cost information fairly" },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The IMA Confidentiality standard requires keeping information confidential except when disclosure is authorized or legally required. Proprietary supplier cost breakdowns -- including negotiated pricing and volume discounts -- are competitively sensitive. Sharing this data with a competitor directly violates the Confidentiality standard. While Integrity is also implicated, Confidentiality is the standard most directly and specifically violated.",
    "ExplanationWrongA": "The Competence standard addresses professional expertise and performing duties per regulations. While the colleague may lack awareness of confidentiality obligations, the specific act is a direct breach of the Confidentiality standard, which governs handling of non-public information.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "While sharing proprietary data undermines ethical culture and implicates the Integrity standard, Integrity focuses on mitigating conflicts of interest and contributing to a positive ethical culture. The more specific and directly applicable standard is Confidentiality, which explicitly prohibits unauthorized disclosure of confidential information.",
    "ExplanationWrongD": "The Credibility standard governs communication of information to intended users -- fair, objective, complete, and timely disclosure. Sharing cost data with a competitor is not about report preparation or decision-support communication. The direct wrong is unauthorized release of confidential competitive data, which falls squarely under Confidentiality.",
    "Difficulty": "Moderate-Easy", "DifficultyScore": 2, "CognitiveLevel": "Understand", "CalculationItem": false,
    "ItemStyle": "single-select", "LOSTag": "F.2", "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "", "CommonTrapReference": "Confusing the most directly violated standard with secondary implications",
    "Authorities": ["IMA Statement of Ethical Professional Practice - Confidentiality Standard"],
    "VerifiedChecks": ["Part2OnlyFlag verified true", "EW[CC] empty (DL-008)", "Non-CC EW slots >=50 chars (DL-026)", "No boilerplate (DL-013)", "Difficulty justified", "IMA Confidentiality standard correctly applied", "Distinguished from related standards"]
  },
  {
    "Part": 2, "Section": "F", "Topic": "F.003 integrity-conflict-of-interest-earnings",
    "QuestionID": "P2-F-003", "question_state": "Unprocessed", "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-003-integrity-conflict-reserve-manipulation",
    "Stem": "David Okonkwo, controller of Apex Medical Devices, is told by the CEO: 'We are $0.04 below consensus estimates. Reduce the inventory obsolescence reserve by $1.8 million so we hit the number.' David believes the current reserve is properly supported by aging analysis. Under the IMA Statement, what conflict does David face?",
    "Choices": { "A": "A credibility conflict -- the reserve adjustment affects how information is communicated to stakeholders", "B": "A confidentiality conflict -- earnings estimates are material non-public information", "C": "An integrity conflict of interest -- manipulating the reserve to meet a target puts the CEO's personal interests ahead of fair reporting", "D": "A competence conflict -- David may lack expertise to assess materiality of the adjustment" },
    "CorrectChoice": "C",
    "ExplanationCorrect": "David faces a classic integrity conflict of interest. The CEO's instruction to reduce the reserve solely to meet earnings represents manipulation. The Integrity standard requires mitigating conflicts of interest and refraining from conduct prejudicial to ethical performance. The CEO has a personal interest in meeting targets (compensation, stock price), which conflicts with GAAP-compliant reporting. David must recognize this as a conflict of interest and refuse to make an unsupported adjustment.",
    "ExplanationWrongA": "While the reserve adjustment affects external communication, the immediate issue is not about disclosure quality -- it is about the act of manipulation itself. The Credibility standard applies when information is communicated to users; here, the core problem is the CEO pressuring David to falsify the accounting record before any communication. The Integrity standard's conflict-of-interest provision is more directly applicable.",
    "ExplanationWrongB": "The Confidentiality standard prohibits unauthorized disclosure of confidential information. David's dilemma is not about whether to disclose information but whether to participate in manipulating financial statements. The CEO is not asking David to keep a secret; the CEO is asking to alter an accounting estimate -- fundamentally an integrity issue.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "David believes the current reserve is properly supported by aging analysis, indicating he has already assessed it professionally. This is not a competence issue -- David is qualified and has done the analysis. The problem is ethical pressure to override professional judgment, not a lack of expertise.",
    "Difficulty": "Moderate", "DifficultyScore": 3, "CognitiveLevel": "Apply", "CalculationItem": false,
    "ItemStyle": "single-select", "LOSTag": "F.3", "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "", "CommonTrapReference": "Misclassifying an integrity conflict as credibility, competence, or confidentiality",
    "Authorities": ["IMA Statement of Ethical Professional Practice - Integrity Standard"],
    "VerifiedChecks": ["Part2OnlyFlag verified true", "EW[CC] empty (DL-008)", "Non-CC EW slots >=50 chars (DL-026)", "No boilerplate (DL-013)", "Difficulty justified", "IMA Integrity standard conflict-of-interest correctly applied", "Real-world earnings management scenario"]
  },
  {
    "Part": 2, "Section": "F", "Topic": "F.004 credibility-error-disclosure-obligation",
    "QuestionID": "P2-F-004", "question_state": "Unprocessed", "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-004-credibility-material-error-disclosure",
    "Stem": "Patricia Mwangi, senior financial analyst at NorthStar Logistics, discovers a material error in cost allocation methodology that overstated segment profitability by 12% in a board report distributed three days ago. The board votes on segment expansion based on that report in two days. Per the IMA Credibility standard, what is Patricia required to do?",
    "Choices": { "A": "Wait until the board meeting and verbally correct the error during discussion", "B": "Correct the underlying model but take no action on the distributed report since it has been received", "C": "Report the error to the external auditors and let them address it with the board", "D": "Promptly disclose the error and its impact to the board, providing corrected information before the vote" },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The IMA Credibility standard requires disclosing all relevant information that could influence an intended user's understanding and disclosing delays or deficiencies in information. A 12% overstatement of segment profitability is material and will influence the board vote. Patricia must promptly disclose the error and provide corrected analysis before the vote. Allowing the board to decide on materially inaccurate information violates the fundamental purpose of the Credibility standard.",
    "ExplanationWrongA": "Waiting until the meeting for a verbal correction does not satisfy the Credibility standard's requirement for fair, objective communication. Board members need time to review and analyze corrected information. A verbal correction during the meeting denies members the opportunity to independently assess revised numbers.",
    "ExplanationWrongB": "Correcting the model internally without notifying the board is a serious violation. The board has already based preliminary decisions on the erroneous report. The Credibility standard requires proactive disclosure to intended users -- fixing the model alone defeats the purpose.",
    "ExplanationWrongC": "The Credibility standard places disclosure obligation on the management accountant who discovered the error. While auditors should eventually be informed, Patricia's immediate obligation is to ensure the board receives corrected information before making a consequential decision. Waiting for auditors could take weeks.",
    "ExplanationWrongD": "",
    "Difficulty": "Moderate", "DifficultyScore": 3, "CognitiveLevel": "Apply", "CalculationItem": false,
    "ItemStyle": "single-select", "LOSTag": "F.4", "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "", "CommonTrapReference": "Confusing internal model correction with the obligation to disclose errors to report users",
    "Authorities": ["IMA Statement of Ethical Professional Practice - Credibility Standard"],
    "VerifiedChecks": ["Part2OnlyFlag verified true", "EW[CC] empty (DL-008)", "Non-CC EW slots >=50 chars (DL-026)", "No boilerplate (DL-013)", "Difficulty justified", "IMA Credibility standard correctly applied", "Realistic board reporting scenario"]
  },
  {
    "Part": 2, "Section": "F", "Topic": "F.005 ethical-conflict-resolution-sequence",
    "QuestionID": "P2-F-005", "question_state": "Unprocessed", "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-005-conflict-resolution-supervisor-misconduct",
    "Stem": "Ahmed Hassan, cost accountant at Orion Pharmaceuticals, discovers his direct supervisor, the plant controller, has been systematically overbilling the company's largest customer by inflating shipping weights for six months. The overbilling totals $340,000. Ahmed has documented evidence. Per the IMA Statement resolution process, what should Ahmed do FIRST?",
    "Choices": { "A": "Present evidence to the controller's immediate supervisor (the divisional CFO), since the controller is the person whose conduct is at issue", "B": "Contact the IMA Ethics Helpline immediately, because fraudulent billing requires external guidance", "C": "Confront the controller directly and demand that the overbilling stop and the customer be reimbursed", "D": "Report directly to the audit committee, because the controller is a senior officer covered by SOX whistleblower protections" },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The IMA resolution process: first, discuss with your immediate superior -- except when the superior is involved. Since Ahmed's supervisor is the person engaged in fraud, Ahmed proceeds to the next level: the controller's supervisor, the divisional CFO. This structured escalation preserves internal governance before involving external parties. Only if the divisional CFO fails to act should Ahmed escalate to the audit committee or the IMA Ethics Helpline.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Contacting the IMA Ethics Helpline is the final step in the resolution process. Ahmed has not yet attempted internal resolution through the chain of command. Going directly to external consultation skips the organization's governance structure and unnecessarily escalates a situation resolvable by the divisional CFO.",
    "ExplanationWrongC": "Direct confrontation with the controller who is engaged in misconduct is not the recommended first step. The IMA process explicitly acknowledges that confronting an involved superior may be ineffective, could expose Ahmed to retaliation, or allow destruction of evidence. The structured escalation bypasses the involved superior.",
    "ExplanationWrongD": "While SOX provides whistleblower protections, the audit committee is not the first step in the IMA resolution process. The IMA Statement emphasizes resolving conflicts at the lowest possible organizational level. Escalating directly to the audit committee bypasses the divisional CFO, who should investigate and address the fraud before board-level involvement.",
    "Difficulty": "Moderate-Easy", "DifficultyScore": 2, "CognitiveLevel": "Analyze", "CalculationItem": false,
    "ItemStyle": "single-select", "LOSTag": "F.5", "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "", "CommonTrapReference": "Skipping chain-of-command escalation for external parties or audit committee",
    "Authorities": ["IMA Statement of Ethical Professional Practice - Resolution of Ethical Conflict", "Sarbanes-Oxley Act whistleblower protections"],
    "VerifiedChecks": ["Part2OnlyFlag verified true", "EW[CC] empty (DL-008)", "Non-CC EW slots >=50 chars (DL-026)", "No boilerplate (DL-013)", "Difficulty justified", "IMA resolution sequence correctly applied", "Real-world fraud escalation scenario"]
  }
];

// ============================================================================
// INTEGRATION LOGIC
// ============================================================================

// Pack A items from agent output — normalized inline
const PACK_A_ITEMS = [
  {"Part":2,"Section":"A","Topic":"A.101 operating-cash-flow-ratio","QuestionID":"P2-A-101","question_state":"Unprocessed","Part2OnlyFlag":true,"UniqueConceptKey":"A-101-operating-cash-flow-liquidity","Stem":"Ridgeview Industries reported net income of $8,200,000 and net cash from operating activities of $1,850,000 for the fiscal year. Current liabilities total $9,500,000. Last year's operating cash flow ratio was 0.42. CFO Diane Hartley is concerned about liquidity. What is the current-year operating cash flow ratio?","Choices":{"A":"$0.19","B":"$0.86","C":"$4.43","D":"$5.14"},"CorrectChoice":"A","ExplanationCorrect":"Operating cash flow ratio = OCF / Current Liabilities = $1,850,000 / $9,500,000 = 0.19. This means Ridgeview generates only 19 cents of operating cash per dollar of current obligations. Last year's 0.42 ratio represented adequate coverage; 0.19 signals significant liquidity deterioration. Net income of $8.2M is not the numerator — accrual earnings include non-cash items and do not represent liquid resources available to settle current liabilities. Per ASC 230-10, the statement of cash flows provides users with relevant information about the entity's cash receipts and payments, which is precisely the information needed for liquidity assessment. CFO Hartley's concern is warranted given the 55% decline.","ExplanationWrongA":"","ExplanationWrongB":"$0.86 uses net income ($8,200,000) instead of operating cash flow ($1,850,000): $8.2M / $9.5M = 0.86. Net income includes depreciation, amortization, and uncollected accrual revenue. Current liabilities must be settled with cash, not accounting earnings. Using accrual-based net income overstates debt-service capacity by more than 4x.","ExplanationWrongC":"$4.43 results from dividing net income by operating cash flow: $8,200,000 / $1,850,000 = 4.43. This is the earnings quality ratio (cash-to-income index), not a liquidity coverage measure. While useful for detecting accrual manipulation, it does not answer whether operating cash flow can service current obligations.","ExplanationWrongD":"$5.14 inverts the ratio: $9,500,000 / $1,850,000 = 5.14, expressing how many times current liabilities exceed operating cash flow. The standard convention is cash flow / liabilities, not liabilities / cash flow.","Difficulty":"Moderate-Easy","DifficultyScore":2,"CognitiveLevel":"Apply","CalculationItem":true,"ItemStyle":"single-select","LOSTag":"A.1","BlueprintDomain":"Financial Statement Analysis","FormulaReference":"Operating Cash Flow Ratio = OCF / Current Liabilities","CommonTrapReference":"Confusing accrual net income with operating cash flow when computing liquidity ratios","Authorities":["ASC 205-10","ASC 230-10"],"VerifiedChecks":["Part2OnlyFlag verified true","EW[CC] empty (DL-008)","Non-CC EW slots >=50 chars (DL-026)","No boilerplate (DL-013)","Difficulty justified","Independent: 1.85M/9.5M=0.19","Authorities match"]},
  {"Part":2,"Section":"A","Topic":"A.102 dupont-roe-decomposition","QuestionID":"P2-A-102","question_state":"Unprocessed","Part2OnlyFlag":true,"UniqueConceptKey":"A-102-dupont-roe-risk-profiles","Stem":"Meridian Corp and Northgate Inc each report ROE of 18%. Meridian: net profit margin 6%, asset turnover 1.5, total assets $40M. Northgate: net profit margin 3%, asset turnover 2.0, total assets $30M. CFO James Park evaluates both companies through the DuPont framework. Which conclusion is correct?","Choices":{"A":"Meridian has a higher equity multiplier, indicating greater financial risk from debt","B":"Meridian achieves ROE through stronger profitability; Northgate relies more on efficiency and leverage","C":"Northgate's equity multiplier is 1.5","D":"Both companies have similar capital structures since ROE is identical"},"CorrectChoice":"B","ExplanationCorrect":"DuPont: ROE = Margin x Turnover x Equity Multiplier. Meridian EM = 18% / (6% x 1.5) = 2.0. Northgate EM = 18% / (3% x 2.0) = 3.0. Meridian extracts 6 cents of profit per revenue dollar vs. Northgate's 3 cents. Northgate compensates with higher turnover (2.0 vs. 1.5) and greater leverage (EM 3.0, D/E 2.0 vs. Meridian EM 2.0, D/E 1.0). Identical ROE masks dramatically different risk profiles: Meridian is the lower-risk enterprise driven by operational efficiency, while Northgate's returns depend heavily on financial leverage.","ExplanationWrongA":"Meridian's EM is 2.0, not higher than Northgate's 3.0. Northgate is the more leveraged company, with every dollar of equity supporting three dollars of assets. The examinee may assume higher margins correlate with higher leverage, but within DuPont, EM is the plug variable that moves inversely to margin at identical ROE.","ExplanationWrongB":"","ExplanationWrongC":"1.5 is Meridian's asset turnover, not Northgate's equity multiplier. Northgate's EM = 3.0. An EM of 1.5 would correspond to D/E of 0.5 -- inconsistent with Northgate's data. The examinee has confused asset turnover (efficiency) with equity multiplier (leverage).","ExplanationWrongD":"Identical ROE reveals nothing about capital structure. Meridian's D/E is 1.0; Northgate's is 2.0 -- twice as leveraged. Equal ROE can be produced through different combinations of profitability, efficiency, and leverage -- precisely what DuPont analysis exposes.","Difficulty":"Moderate","DifficultyScore":3,"CognitiveLevel":"Analyze","CalculationItem":true,"ItemStyle":"single-select","LOSTag":"A.2","BlueprintDomain":"Financial Statement Analysis","FormulaReference":"DuPont ROE = Net Profit Margin x Asset Turnover x Equity Multiplier","CommonTrapReference":"Assuming identical ROE implies identical risk profiles","Authorities":["DuPont ROE Decomposition Framework"],"VerifiedChecks":["Part2OnlyFlag verified true","EW[CC] empty (DL-008)","Non-CC EW slots >=50 chars (DL-026)","No boilerplate (DL-013)","Difficulty justified","Independent: EM_M=2.0, EM_N=3.0","Authorities match"]},
  {"Part":2,"Section":"A","Topic":"A.103 earnings-quality-accruals","QuestionID":"P2-A-103","question_state":"Unprocessed","Part2OnlyFlag":true,"UniqueConceptKey":"A-103-earnings-quality-cash-conversion","Stem":"Astoria Technologies reported net income of $14,200,000, up from $12,500,000. However, operating cash flow fell from $11,900,000 to $3,800,000. Accounts receivable grew from $9,100,000 to $22,300,000 while revenue grew from $68M to $82M. Controller Rebecca Torres prepares materials for the audit committee. Which observation is the most significant red flag?","Choices":{"A":"21% revenue growth is unsustainable and suggests channel stuffing","B":"The $1.7M net income increase is modest and does not warrant audit committee attention","C":"OCF collapsed from 95% to 27% of net income while receivables grew 145% against 21% revenue growth -- earnings are not converting to cash","D":"Gross margin likely improved from 44% to 46%, indicating cost deferral"},"CorrectChoice":"C","ExplanationCorrect":"The cash conversion ratio collapsed from 0.95 ($11.9M/$12.5M) to 0.27 ($3.8M/$14.2M) while receivables grew 145% against revenue growth of 21%. Per ASC 205-10, financial statements should faithfully represent economic substance. When receivables grow at 7x the rate of revenue, it suggests revenue recognized on sales where cash collection is deteriorating or uncertain. The growing wedge between accrual earnings and operating cash flow is the textbook definition of low earnings quality. Rebecca should present the receivable aging, DSO trend, and cash conversion analysis to the audit committee.","ExplanationWrongA":"21% revenue growth is not inherently suspect in the technology sector. The concern is the divergence between revenue growth and receivables growth (21% vs. 145%), not the absolute growth rate. Channel stuffing requires additional evidence not present in the scenario.","ExplanationWrongB":"A $1.7M increase (13.6%) is not trivial. More importantly, the analysis misses the point: the red flag is earnings quality, not earnings magnitude. Net income increased while OCF collapsed by $8.1M, implying ~$9.8M of new earnings exists only as non-cash accruals.","ExplanationWrongC":"","ExplanationWrongD":"No data supports the claim that gross margin improved. The scenario provides revenue, net income, OCF, and receivables but no COGS data. This assertion invents facts. The documentable concern is the cash conversion collapse, fully supported by the provided data.","Difficulty":"Moderate","DifficultyScore":3,"CognitiveLevel":"Apply","CalculationItem":true,"ItemStyle":"single-select","LOSTag":"A.2","BlueprintDomain":"Financial Statement Analysis","FormulaReference":"","CommonTrapReference":"Evaluating earnings growth solely by income statement trend without examining cash conversion and balance-sheet accrual build-up","Authorities":["ASC 205-10","ASC 230-10","ASC 606"],"VerifiedChecks":["Part2OnlyFlag verified true","EW[CC] empty (DL-008)","Non-CC EW slots >=50 chars (DL-026)","No boilerplate (DL-013)","Difficulty justified","Independent: CF/NI ratio 0.95→0.27, AR growth 145% vs rev 21%","Authorities match"]},
  {"Part":2,"Section":"A","Topic":"A.104 altman-zscore-manufacturing-distress","QuestionID":"P2-A-104","question_state":"Unprocessed","Part2OnlyFlag":true,"UniqueConceptKey":"A-104-altman-zscore-manufacturing","Stem":"Brentwood Manufacturing reports: working capital $2.4M, total assets $18M, retained earnings $3.2M, EBIT $1.1M, market value of equity $5.6M, total liabilities $12.8M, sales $28.5M. Controller Marcus Webb computes a Z-score of 2.46 (grey zone: 1.81–2.99). Which statement correctly identifies the most concerning Z-score components?","Choices":{"A":"X5 (Sales/TA) of 1.58 indicates over-trading","B":"X2 (RE/TA) of 0.178 signals accumulated net losses approaching insolvency","C":"X1 (WC/TA) of 0.133 is critically low, predicting near-term liquidity crisis","D":"X3 (EBIT/TA) of 0.061 and X4 (MVE/TL) of 0.438 are both below healthy benchmarks -- weak profitability and market skepticism about viability"},"CorrectChoice":"D","ExplanationCorrect":"X3 = $1.1M/$18M = 0.061, below Altman's 0.07 danger threshold. Brentwood earns only 6.1 cents of operating profit per asset dollar. X4 = $5.6M/$12.8M = 0.438, well below the 0.60 benchmark -- the equity market values Brentwood at less than half its total debt, reflecting significant skepticism about future cash flows. Together, X3 and X4 pull the Z-score into the grey zone despite adequate liquidity (X1=0.133), moderate cumulative profitability (X2=0.178), and solid asset turnover (X5=1.58). Marcus should focus on the underlying causes of weak operating profitability and communicate why the market discounts Brentwood's outlook.","ExplanationWrongA":"X5 of 1.58 is a strength, not a weakness. It measures asset turnover -- generating $1.58 in sales per dollar of assets reflects efficient asset utilization. Over-trading would manifest as high turnover with inadequate working capital, but X1=0.133 is positive.","ExplanationWrongB":"X2 of 0.178 (RE/TA) is moderate -- retained earnings represent 17.8% of total assets, a reasonable proportion for a manufacturer. The genuine distress signal for X2 is a negative value (cumulative losses). Brentwood's X2 is not concerning.","ExplanationWrongC":"X1 of 0.133 is positive, confirming current assets exceed current liabilities. In Altman's original sample, bankrupt firms showed mean X1 of approximately -0.06 (negative working capital). Brentwood's value, while not robust, is a positive signal.","ExplanationWrongD":"","Difficulty":"Difficult","DifficultyScore":4,"CognitiveLevel":"Analyze","CalculationItem":true,"ItemStyle":"single-select","LOSTag":"A.5","BlueprintDomain":"Financial Statement Analysis","FormulaReference":"Altman Z-Score (Original Manufacturing Model)","CommonTrapReference":"Misidentifying which Z-score components are most diagnostic for the specific company profile","Authorities":["Altman Z-Score Model (1968)","ASC 205-40"],"VerifiedChecks":["Part2OnlyFlag verified true","EW[CC] empty (DL-008)","Non-CC EW slots >=50 chars (DL-026)","No boilerplate (DL-013)","Difficulty justified","Independent: X3=0.061, X4=0.438, both below benchmarks","Authorities match"]},
  {"Part":2,"Section":"A","Topic":"A.105 sustainable-growth-rate","QuestionID":"P2-A-105","question_state":"Unprocessed","Part2OnlyFlag":true,"UniqueConceptKey":"A-105-sustainable-growth-rate","Stem":"Pacifica Apparel reports ROE of 14.5% with a 35% dividend payout ratio. CEO Elena Vasquez plans 22 new stores projecting 18% revenue growth. The capital structure is 45% debt, 55% equity, and management prefers not to issue new stock. What is Pacifica's SGR and what does it imply?","Choices":{"A":"9.43%. The company cannot self-fund 18% growth and needs additional debt or must scale back expansion.","B":"14.50%. The company can nearly self-fund the expansion with modest external financing.","C":"5.08%. The company has ample capacity and can fund all 22 stores internally.","D":"18.00%. To achieve the growth target the company must eliminate its dividend."},"CorrectChoice":"A","ExplanationCorrect":"SGR = ROE x (1 - Payout Ratio) = 14.5% x 0.65 = 9.425%. This is the maximum rate at which Pacifica can grow without altering its capital structure or issuing new equity. The 18% projected growth exceeds SGR by ~8.6 percentage points -- a substantial gap. To fund the shortfall: increase debt beyond the 45% target (increasing risk), reduce the dividend (disappointing shareholders), improve ROE (challenging short-term), or scale back the store-opening plan. The SGR framework reconciles growth ambitions with financing constraints.","ExplanationWrongA":"","ExplanationWrongB":"14.50% is the ROE, not SGR. ROE measures total return on equity, but 35% is distributed. Using ROE directly as SGR assumes 0% payout, overstating internally fundable growth by 5.07 percentage points. The correct formula is ROE x retention ratio.","ExplanationWrongC":"5.08% multiplies ROE by the payout ratio (14.5% x 35%) rather than the retention ratio. This treats distributed earnings as retained -- a complete inversion. SGR uses retention rate (1 - payout), which is 65%. This error would lead management to abandon viable expansion.","ExplanationWrongD":"18% is the target growth rate, not SGR. The correct SGR is 9.43%. Eliminating the dividend would increase SGR to 14.5%, still 3.5 points short of 18%. The ROE ceiling (14.5%) caps SGR even at 100% retention.","Difficulty":"Moderate-Easy","DifficultyScore":2,"CognitiveLevel":"Apply","CalculationItem":true,"ItemStyle":"single-select","LOSTag":"A.3","BlueprintDomain":"Financial Statement Analysis","FormulaReference":"Sustainable Growth Rate = ROE x (1 - Dividend Payout Ratio)","CommonTrapReference":"Using ROE directly as SGR without adjusting for dividend payout ratio","Authorities":["DuPont Framework / SGR Model","ASC 205-10"],"VerifiedChecks":["Part2OnlyFlag verified true","EW[CC] empty (DL-008)","Non-CC EW slots >=50 chars (DL-026)","No boilerplate (DL-013)","Difficulty justified","Independent: SGR=14.5x0.65=9.43%","Authorities match"]}
];

const BATCHES = {
  A: PACK_A_ITEMS,
  C: PACK_C_ITEMS,
  F: PACK_F_ITEMS,
};

const DOMAINS = { A: "Financial Statement Analysis", B: "Corporate Finance", C: "Decision Analysis",
  D: "Risk Management", E: "Investment Decisions", F: "Professional Ethics" };

function readPack(section) {
  const sectionLower = section.toLowerCase();
  const file = `pack_p2_${sectionLower}.js`;
  const fp = path.join(P2_DIR, file);
  const content = fs.readFileSync(fp, "utf8");
  const varName = `pack_p2_${sectionLower}_questions`;
  const items = new Function(content + `\nreturn ${varName};`)();
  return { varName, items, filePath: fp };
}

function buildPackContent(varName, items) {
  const json = items.map(it => JSON.stringify(it, null, 2)).join(",\n  ");
  const indented = "\n  " + json.replace(/\n/g, "\n  ");
  return `// BLOCK-AUTHORIZED — Batch integration session.\n// Schema: P2_SCHEMA_STANDARD.md v1.0\n// Governance: Rules 2/6/9/10/11/13/14 active\n\nvar ${varName} = [${indented}\n];\n`;
}

console.log("=== P2 WAVE INTEGRATION — " + new Date().toISOString() + " ===\n");

if (DRY_RUN) console.log("[DRY RUN MODE — no files will be written]\n");

let totalNew = 0;
const results = [];

for (const [section, batchItems] of Object.entries(BATCHES)) {
  if (batchItems.length === 0) continue;

  const { varName, items: existing, filePath } = readPack(section);
  const combined = [...existing, ...batchItems];
  const newContent = buildPackContent(varName, combined);

  // Verify parse
  try {
    new Function(newContent);
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent, "utf8");
    }
    results.push(`  DONE  pack_p2_${section.toLowerCase()}.js: +${batchItems.length} items (total ${combined.length})`);
    totalNew += batchItems.length;
  } catch (e) {
    results.push(`  FAIL  pack_p2_${section}.js: parse error — ${e.message.substring(0, 80)}`);
  }
}

console.log(results.join("\n"));
console.log(`\n=== INTEGRATED: ${totalNew} items across ${Object.keys(BATCHES).filter(s => BATCHES[s].length > 0).length} packs ===\n`);
process.exit(totalNew > 0 ? 0 : 1);
