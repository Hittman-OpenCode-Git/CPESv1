// BLOCK-AUTHORIZED — Batch integration session.
// Schema: P2_SCHEMA_STANDARD.md v1.0
// Governance: Rules 2/6/9/10/11/13/14 active

var pack_p2_f_questions = [
  {
    "Part": 2,
    "Section": "F",
    "Topic": "F.001 competence-recognizing-limits-of-expertise",
    "QuestionID": "P2-F-001",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-001-competence-decline-unqualified-assignment",
    "Stem": "Maria Santos, a staff accountant at Westlake Manufacturing, is asked by her controller to present a complex derivative valuation analysis to the board of directors. Maria has no training in derivative valuation. Per the IMA Statement, what should Maria do?",
    "Choices": {
      "A": "Decline the assignment, explain the competence gap, and recommend a qualified valuation specialist",
      "B": "Accept the assignment and learn derivative valuation before the presentation",
      "C": "Accept the assignment but ask the controller to review her work before the presentation",
      "D": "Postpone the presentation until she completes a professional development course"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Under the IMA Competence standard, management accountants must maintain professional expertise and perform duties per professional standards. Maria lacks derivative valuation expertise. Accepting would violate the standard. The correct action: decline, disclose the gap, and recommend a qualified professional. Board presentations demand current competence, not aspirational learning.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B is incorrect. While continuing education is encouraged under the Competence standard, developing expertise in derivative valuation through self-study immediately before a board presentation does not satisfy the standard. Competence requires existing, demonstrable expertise when duties are performed. The board is entitled to analysis by a qualified professional.",
    "ExplanationWrongC": "Option C is incorrect. The Competence standard places responsibility on the individual accountant, not on a supervisor to remediate deficiencies through review. If the controller has the expertise, the controller should present directly. Delegating to an unqualified subordinate and reviewing their work does not cure the competence gap.",
    "ExplanationWrongD": "Option D is incorrect. Completing one course does not confer the depth needed for reliable derivative valuation. The IMA Competence standard requires appropriate expertise when duties are undertaken. The practical solution: engage a qualified professional now while pursuing development for future assignments.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "F.1",
    "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing willingness to learn with current competence per IMA Standards",
    "Authorities": [
      "IMA Statement of Ethical Professional Practice - Competence Standard"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "IMA Competence standard correctly applied",
      "Scenario reflects real-world ethical dilemma"
    ]
  },
    {
    "Part": 2,
    "Section": "F",
    "Topic": "F.002 confidentiality-proprietary-data-disclosure",
    "QuestionID": "P2-F-002",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-002-confidentiality-unauthorized-cost-data-sharing",
    "Stem": "During a budget review meeting, Thomas Chen, a cost analyst at Pacific Aerospace, overhears a colleague sharing proprietary supplier cost breakdowns with a friend at a competing manufacturer. Which IMA standard is most directly violated?",
    "Choices": {
      "A": "Competence, because the colleague failed to maintain procurement ethics expertise",
      "B": "Confidentiality, because proprietary cost data is disclosed to an unauthorized external party",
      "C": "Integrity, because the colleague's behavior undermines ethical culture",
      "D": "Credibility, because the colleague is not communicating cost information fairly"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The IMA Confidentiality standard requires keeping information confidential except when disclosure is authorized or legally required. Proprietary supplier cost breakdowns -- including negotiated pricing and volume discounts -- are competitively sensitive. Sharing this data with a competitor directly violates the Confidentiality standard. While Integrity is also implicated, Confidentiality is the standard most directly and specifically violated.",
    "ExplanationWrongA": "The Competence standard addresses professional expertise and performing duties per regulations. While the colleague may lack awareness of confidentiality obligations, the specific act is a direct breach of the Confidentiality standard, which governs handling of non-public information.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "While sharing proprietary data undermines ethical culture and implicates the Integrity standard, Integrity focuses on mitigating conflicts of interest and contributing to a positive ethical culture. The more specific and directly applicable standard is Confidentiality, which explicitly prohibits unauthorized disclosure of confidential information.",
    "ExplanationWrongD": "The Credibility standard governs communication of information to intended users -- fair, objective, complete, and timely disclosure. Sharing cost data with a competitor is not about report preparation or decision-support communication. The direct wrong is unauthorized release of confidential competitive data, which falls squarely under Confidentiality.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "F.2",
    "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing the most directly violated standard with secondary implications",
    "Authorities": [
      "IMA Statement of Ethical Professional Practice - Confidentiality Standard"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "IMA Confidentiality standard correctly applied",
      "Distinguished from related standards"
    ]
  },
    {
    "Part": 2,
    "Section": "F",
    "Topic": "F.003 integrity-conflict-of-interest-earnings",
    "QuestionID": "P2-F-003",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-003-integrity-conflict-reserve-manipulation",
    "Stem": "David Okonkwo, controller of Apex Medical Devices, is told by the CEO: 'We are $0.04 below consensus estimates. Reduce the inventory obsolescence reserve by $1.8 million so we hit the number.' David believes the current reserve is properly supported by aging analysis. Under the IMA Statement, what conflict does David face?",
    "Choices": {
      "A": "A credibility conflict -- the reserve adjustment affects how information is communicated to stakeholders",
      "B": "A confidentiality conflict -- earnings estimates are material non-public information",
      "C": "An integrity conflict of interest -- manipulating the reserve to meet a target puts the CEO's personal interests ahead of fair reporting",
      "D": "A competence conflict -- David may lack expertise to assess materiality of the adjustment"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "David faces a classic integrity conflict of interest. The CEO's instruction to reduce the reserve solely to meet earnings represents manipulation. The Integrity standard requires mitigating conflicts of interest and refraining from conduct prejudicial to ethical performance. The CEO has a personal interest in meeting targets (compensation, stock price), which conflicts with GAAP-compliant reporting. David must recognize this as a conflict of interest and refuse to make an unsupported adjustment.",
    "ExplanationWrongA": "While the reserve adjustment affects external communication, the immediate issue is not about disclosure quality -- it is about the act of manipulation itself. The Credibility standard applies when information is communicated to users; here, the core problem is the CEO pressuring David to falsify the accounting record before any communication. The Integrity standard's conflict-of-interest provision is more directly applicable.",
    "ExplanationWrongB": "The Confidentiality standard prohibits unauthorized disclosure of confidential information. David's dilemma is not about whether to disclose information but whether to participate in manipulating financial statements. The CEO is not asking David to keep a secret; the CEO is asking to alter an accounting estimate -- fundamentally an integrity issue.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "David believes the current reserve is properly supported by aging analysis, indicating he has already assessed it professionally. This is not a competence issue -- David is qualified and has done the analysis. The problem is ethical pressure to override professional judgment, not a lack of expertise.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "F.3",
    "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "",
    "CommonTrapReference": "Misclassifying an integrity conflict as credibility, competence, or confidentiality",
    "Authorities": [
      "IMA Statement of Ethical Professional Practice - Integrity Standard"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "IMA Integrity standard conflict-of-interest correctly applied",
      "Real-world earnings management scenario"
    ]
  },
    {
    "Part": 2,
    "Section": "F",
    "Topic": "F.004 credibility-error-disclosure-obligation",
    "QuestionID": "P2-F-004",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-004-credibility-material-error-disclosure",
    "Stem": "Patricia Mwangi, senior financial analyst at NorthStar Logistics, discovers a material error in cost allocation methodology that overstated segment profitability by 12% in a board report distributed three days ago. The board votes on segment expansion based on that report in two days. Per the IMA Credibility standard, what is Patricia required to do?",
    "Choices": {
      "A": "Wait until the board meeting and verbally correct the error during discussion",
      "B": "Correct the underlying model but take no action on the distributed report since it has been received",
      "C": "Report the error to the external auditors and let them address it with the board",
      "D": "Promptly disclose the error and its impact to the board, providing corrected information before the vote"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The IMA Credibility standard requires disclosing all relevant information that could influence an intended user's understanding and disclosing delays or deficiencies in information. A 12% overstatement of segment profitability is material and will influence the board vote. Patricia must promptly disclose the error and provide corrected analysis before the vote. Allowing the board to decide on materially inaccurate information violates the fundamental purpose of the Credibility standard.",
    "ExplanationWrongA": "Waiting until the meeting for a verbal correction does not satisfy the Credibility standard's requirement for fair, objective communication. Board members need time to review and analyze corrected information. A verbal correction during the meeting denies members the opportunity to independently assess revised numbers.",
    "ExplanationWrongB": "Correcting the model internally without notifying the board is a serious violation. The board has already based preliminary decisions on the erroneous report. The Credibility standard requires proactive disclosure to intended users -- fixing the model alone defeats the purpose.",
    "ExplanationWrongC": "The Credibility standard places disclosure obligation on the management accountant who discovered the error. While auditors should eventually be informed, Patricia's immediate obligation is to ensure the board receives corrected information before making a consequential decision. Waiting for auditors could take weeks.",
    "ExplanationWrongD": "",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "F.4",
    "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing internal model correction with the obligation to disclose errors to report users",
    "Authorities": [
      "IMA Statement of Ethical Professional Practice - Credibility Standard"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "IMA Credibility standard correctly applied",
      "Realistic board reporting scenario"
    ]
  },
    {
    "Part": 2,
    "Section": "F",
    "Topic": "F.005 ethical-conflict-resolution-sequence",
    "QuestionID": "P2-F-005",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "F-005-conflict-resolution-supervisor-misconduct",
    "Stem": "Ahmed Hassan, cost accountant at Orion Pharmaceuticals, discovers his direct supervisor, the plant controller, has been systematically overbilling the company's largest customer by inflating shipping weights for six months. The overbilling totals $340,000. Ahmed has documented evidence. Per the IMA Statement resolution process, what should Ahmed do FIRST?",
    "Choices": {
      "A": "Present evidence to the controller's immediate supervisor (the divisional CFO), since the controller is the person whose conduct is at issue",
      "B": "Contact the IMA Ethics Helpline immediately, because fraudulent billing requires external guidance",
      "C": "Confront the controller directly and demand that the overbilling stop and the customer be reimbursed",
      "D": "Report directly to the audit committee, because the controller is a senior officer covered by SOX whistleblower protections"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The IMA resolution process: first, discuss with your immediate superior -- except when the superior is involved. Since Ahmed's supervisor is the person engaged in fraud, Ahmed proceeds to the next level: the controller's supervisor, the divisional CFO. This structured escalation preserves internal governance before involving external parties. Only if the divisional CFO fails to act should Ahmed escalate to the audit committee or the IMA Ethics Helpline.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Contacting the IMA Ethics Helpline is the final step in the resolution process. Ahmed has not yet attempted internal resolution through the chain of command. Going directly to external consultation skips the organization's governance structure and unnecessarily escalates a situation resolvable by the divisional CFO.",
    "ExplanationWrongC": "Direct confrontation with the controller who is engaged in misconduct is not the recommended first step. The IMA process explicitly acknowledges that confronting an involved superior may be ineffective, could expose Ahmed to retaliation, or allow destruction of evidence. The structured escalation bypasses the involved superior.",
    "ExplanationWrongD": "While SOX provides whistleblower protections, the audit committee is not the first step in the IMA resolution process. The IMA Statement emphasizes resolving conflicts at the lowest possible organizational level. Escalating directly to the audit committee bypasses the divisional CFO, who should investigate and address the fraud before board-level involvement.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "F.5",
    "BlueprintDomain": "Professional Ethics",
    "FormulaReference": "",
    "CommonTrapReference": "Skipping chain-of-command escalation for external parties or audit committee",
    "Authorities": [
      "IMA Statement of Ethical Professional Practice - Resolution of Ethical Conflict",
      "Sarbanes-Oxley Act whistleblower protections"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "IMA resolution sequence correctly applied",
      "Real-world fraud escalation scenario"
    ]
  }
];
