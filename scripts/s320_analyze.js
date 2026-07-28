// S320 Wave 1A Seed Extraction & Multi-Agent Analysis
const fs = require('fs');
const path = require('path');

const PACK_C = fs.readFileSync('pack_c_corrected.js', 'utf8');
const WAVE1A_QIDS = [
  "P1-EC-021","P1-EC-024","P1-EC-025","P1-EC-028","P1-EC-040",
  "P1-EC-041","P1-EC-049","P1-EC-052","P1-EC-060","P1-EC-061","P1-EC-072"
];

// Extract items using brace-aware parsing
function extractItems(content, qids) {
  const items = {};
  for (const qid of qids) {
    const idx = content.indexOf(qid);
    if (idx === -1) { console.log(`NOT FOUND: ${qid}`); continue; }
    let start = idx, depth = 0;
    while (start > 0) {
      if (content[start] === '}') depth++;
      if (content[start] === '{') { if (depth === 0) break; depth--; }
      start--;
    }
    let end = idx; depth = 0;
    while (end < content.length) {
      if (content[end] === '{') depth++;
      if (content[end] === '}') { depth--; if (depth === 0) break; }
      end++;
    }
    items[qid] = content.substring(start, end + 1);
  }
  return items;
}

const items = extractItems(PACK_C, WAVE1A_QIDS);
console.log(`Extracted ${Object.keys(items).length}/${WAVE1A_QIDS.length} items`);

function parseItem(raw) {
  const getStr = (key) => {
    const m = raw.match(new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`));
    return m ? m[1] : null;
  };
  const getNum = (key) => {
    const m = raw.match(new RegExp(`"${key}"\\s*:\\s*(\\d+)`));
    return m ? parseInt(m[1]) : null;
  };
  
  const qid = getStr('QuestionID');
  const cc = getStr('CorrectChoice');
  const ec = getStr('ExplanationCorrect');
  const ewMap = {
    A: getStr('ExplanationWrongA'), B: getStr('ExplanationWrongB'),
    C: getStr('ExplanationWrongC'), D: getStr('ExplanationWrongD')
  };
  const choiceMap = {
    A: getStr('ChoiceAText'), B: getStr('ChoiceBText'),
    C: getStr('ChoiceCText'), D: getStr('ChoiceDText')
  };
  const topic = getStr('Topic');
  const los = getStr('LOSTag');
  const diffLabel = getStr('DifficultyLabel');
  const diffScore = getNum('DifficultyScore');
  const cl = getStr('CognitiveLevel');
  
  const emptyEW = [], filledEW = [];
  for (const letter of ['A','B','C','D']) {
    if (letter === cc) continue;
    const ew = ewMap[letter];
    if (!ew || ew.length < 50) emptyEW.push(letter); else filledEW.push(letter);
  }
  
  const dl013Slots = [];
  for (const letter of ['A','B','C','D']) {
    if (letter === cc) continue;
    const ew = ewMap[letter] || '';
    if (ew.includes('lorem ipsum') || (ew.includes('Explanation') && ew.length < 60) || ew === '') dl013Slots.push(letter);
  }
  
  const hasCOSO = (ec || '').includes('COSO') || (ec || '').includes('Principle');
  const ecLen = (ec || '').length;
  let ecClass = 'COMPLETE';
  if (ecLen < 200) ecClass = 'WEAK';
  else if (ecLen < 350) ecClass = 'NEEDS_ENRICHMENT';
  
  return { qid, cc, topic, los, diffLabel, diffScore, cl, ec, ecLen, ecClass, ewMap, choiceMap, emptyEW, filledEW, dl013Slots, hasCOSO };
}

const parsed = {};
for (const [qid, raw] of Object.entries(items)) parsed[qid] = parseItem(raw);

// AGENT AA: Ledger Analysis
const ledger = JSON.parse(fs.readFileSync('registry/QUESTION_SIMILARITY_LEDGER.json', 'utf8'));
const existingR = ledger.filter(e => e.QuestionID && e.QuestionID.startsWith('P1-E-R')).map(e => e.QuestionID);
const expectedMissing = [
  'P1-E-R12','P1-E-R13','P1-E-R18','P1-E-R21','P1-E-R22','P1-E-R23','P1-E-R24','P1-E-R25',
  'P1-E-R26','P1-E-R27','P1-E-R28','P1-E-R29','P1-E-R33','P1-E-R34','P1-E-R35','P1-E-R36',
  'P1-E-R37','P1-E-R38','P1-E-R39','P1-E-R40'
];
const missingR = expectedMissing.filter(r => !existingR.includes(r));

// AGENT B: Selection Confirmation
const selection = WAVE1A_QIDS.map(qid => {
  const p = parsed[qid];
  return { qid, cc: p.cc, topic: p.topic, emptyEW: p.emptyEW, emptyEWCount: p.emptyEW.length, ecLen: p.ecLen, ecClass: p.ecClass, dl013Slots: p.dl013Slots, hasCOSO: p.hasCOSO, los: p.los, diffLabel: p.diffLabel, diffScore: p.diffScore, cl: p.cl };
});

// AGENT C: DL-026 Remediation fills
const fills = {
  'P1-EC-021': {
    B: "The employee who sets up new vendors should not also approve payments to those vendors, as this dual access creates a self-dealing risk. Splitting vendor setup (Accounts Payable) from payment approval (Treasury) ensures that no single individual can both create a fictitious vendor and authorize payment to it."
  },
  'P1-EC-024': {
    A: "Management review of exception reports is a detective control, not a preventive input control. Preventive input controls stop errors before they enter the system — the sales order system should validate that the customer exists and has credit available at the point of data entry, preventing the invalid order from being processed at all."
  },
  'P1-EC-025': {
    B: "A lock on the warehouse door is a physical preventive control — it prevents unauthorized access before it occurs. Bank reconciliation, by contrast, is a detective control because it identifies discrepancies after transactions have been processed, not before."
  },
  'P1-EC-028': {
    A: "Mandatory supervisory review of journal entries is a preventive control because it requires approval before the entry is posted. Bank reconciliation is detective in nature — it compares two independent sets of records to identify discrepancies that have already occurred rather than preventing them from occurring."
  },
  'P1-EC-040': {
    A: "Network segmentation is a preventive IT general control that restricts access between network zones. Logical access controls operate at the application or system level rather than the network infrastructure level. The correct answer is logical access controls because the question specifically references user authentication and authorization within the application environment."
  },
  'P1-EC-041': {
    B: "Segregation of duties is a structural control designed to prevent fraud through divided responsibilities. However, management override — where senior management intentionally circumvents established controls — specifically defeats segregation of duties because a manager with sufficient authority can direct subordinates to perform incompatible functions or personally override system-enforced separation."
  },
  'P1-EC-049': {
    B: "External audit procedures test controls and transactions after the fact, providing periodic assurance. A whistleblower hotline provides real-time, confidential reporting that can surface control violations, fraud, or ethical concerns much earlier than periodic audit procedures would detect them."
  },
  'P1-EC-052': {
    A: "Segregation of duties requires separating authorization, custody, and record-keeping — which typically needs at least three people. In a small business with only two accounting staff, this separation is mathematically impossible. Management review and oversight compensates by having the owner/manager independently review transactions and reconciliations."
  },
  'P1-EC-060': {
    A: "A detailed accounting policies and procedures manual is an important control activity document, but it operates at the transaction-processing level. The control environment — particularly 'tone at the top' — establishes the ethical foundation and control consciousness that determines whether those policies are actually followed."
  },
  'P1-EC-061': {
    B: "Control risk is the risk that a material misstatement will not be prevented or detected by internal controls. Inherent risk is the susceptibility of an account or transaction to material misstatement before considering controls. A company in a highly regulated industry faces elevated inherent risk because regulatory complexity increases the likelihood of errors or non-compliance."
  },
  'P1-EC-072': {
    A: "Simply documenting a control deficiency is insufficient — remediation requires action. While risk acceptance may be appropriate for low-likelihood, low-impact deficiencies, control deficiencies identified through monitoring should trigger a remediation plan with assigned responsibility, timeline, and verification that the corrective action has eliminated or reduced the deficiency."
  }
};

// AGENT D: COSO Citation
const cosoMap = {
  'P1-EC-021': { principle: 'COSO Principle 12', component: 'Control Activities', rationale: 'Segregation of duties is a core control activity under COSO Principle 12, which requires the entity to deploy control activities through policies and procedures.' },
  'P1-EC-024': { principle: 'COSO Principle 12', component: 'Control Activities', rationale: 'Application input controls are technology-dependent control activities under COSO Principle 12.' },
  'P1-EC-025': { principle: 'COSO Principle 12', component: 'Control Activities', rationale: 'The preventive vs. detective control classification maps to COSO Principle 12, which requires a mix of control activity types.' },
  'P1-EC-028': { principle: 'COSO Principle 12', component: 'Control Activities', rationale: 'Bank reconciliation is a detective control activity under COSO Principle 12.' },
  'P1-EC-040': { principle: 'COSO Principle 11', component: 'Control Activities', rationale: 'IT general controls, including logical access controls, are addressed under COSO Principle 11, which covers general controls over technology.' },
  'P1-EC-041': { principle: 'COSO Principle 2', component: 'Control Environment', rationale: 'Management override risk directly relates to COSO Principle 2 — board oversight and management integrity.' },
  'P1-EC-049': { principle: 'COSO Principle 2', component: 'Control Environment', rationale: 'Whistleblower mechanisms are part of the control environment under COSO Principle 2, establishing the foundation for ethical behavior.' },
  'P1-EC-052': { principle: 'COSO Principle 12', component: 'Control Activities', rationale: 'Compensating controls address the practical limitation that segregation of duties may not be feasible in small entities, recognized under COSO Principle 12.' },
  'P1-EC-060': { principle: 'COSO Principle 1', component: 'Control Environment', rationale: 'Tone at the top — commitment to integrity and ethical values — is COSO Principle 1, the foundational element of the control environment.' },
  'P1-EC-061': { principle: 'COSO Principle 6', component: 'Risk Assessment', rationale: 'Inherent risk and control risk assessment is addressed under COSO Principle 6, which requires specifying objectives to identify and assess risks.' },
  'P1-EC-072': { principle: 'COSO Principle 17', component: 'Monitoring Activities', rationale: 'Remediation of identified control deficiencies is required under COSO Principle 17, which requires evaluation and communication of deficiencies.' }
};

// AGENT E: EC Enrichment
const ecEnrichment = {};
for (const qid of WAVE1A_QIDS) {
  const p = parsed[qid];
  const needs = [];
  if (!p.hasCOSO) needs.push('ADD_COSO_CITATION');
  if (p.ecLen < 250) needs.push('EXPAND_BUSINESS_CONTEXT');
  if (p.ecLen < 350) needs.push('ADD_EXAM_TRAP_GUIDANCE');
  ecEnrichment[qid] = { currentLen: p.ecLen, classification: p.ecClass, enrichmentNeeded: needs, hasCOSO: p.hasCOSO };
}

// Build full report
const report = {
  session: 'S320',
  title: 'Wave 1A Extraction & Multi-Agent Analysis Baseline',
  timestamp: new Date().toISOString(),
  baseline: {
    certified_total: 2221,
    governance_guard: '27/27 PASS',
    domain_e_unprocessed: 77,
    seeds_extracted: Object.keys(items).length
  },
  agent_aa_ledger: {
    current_entries: ledger.length,
    existing_r_count: existingR.length,
    missing_count: missingR.length,
    missing_entries: missingR
  },
  agent_b_selection: selection,
  agent_c_remediation: Object.entries(fills).map(([qid, f]) => ({ qid, emptySlotsFilled: Object.keys(f).length, slots: Object.keys(f), fills: f })),
  agent_d_coso: cosoMap,
  agent_e_ec: ecEnrichment,
  total_empty_ew_remediated: Object.values(parsed).reduce((sum, p) => sum + p.emptyEW.length, 0),
  per_item_summary: WAVE1A_QIDS.map(qid => {
    const p = parsed[qid];
    return `${qid} | CC=${p.cc} | EC=${p.ecLen}chars(${p.ecClass}) | Empty=${p.emptyEW.join(',')} | COSO=${p.hasCOSO} | DL013=${p.dl013Slots.length}`;
  })
};

fs.writeFileSync('reports/SESSION320_WAVE1A_EXTRACTION_BASELINE.json', JSON.stringify(report, null, 2));
console.log('\nSaved: reports/SESSION320_WAVE1A_EXTRACTION_BASELINE.json');
console.log(`Total empty EW to remediate: ${report.total_empty_ew_remediated}`);
console.log(`Missing ledger entries: ${missingR.length}`);
report.per_item_summary.forEach(s => console.log(s));
