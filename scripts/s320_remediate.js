// S320 Remediation: Fill empty EW slots + add COSO citations to 7 Pack D Section E seeds
// Per backup protocol: pack_d_corrected.js already backed up before this run
const fs = require('fs');
const path = require('path');

let pack = fs.readFileSync('pack_d_corrected.js', 'utf8');
const changes = [];
let totalEWFills = 0;
let totalCOSOAdds = 0;

// =============================================
// P1-ED-028: CC=D, EW_A empty, COSO missing
// =============================================
// Find: QuestionID P1-ED-028, then find ExplanationWrongA=""
{
  const qidIdx = pack.indexOf('"QuestionID": "P1-ED-028"');
  // After QuestionID, find first ExplanationWrongA
  const afterQID = pack.substring(qidIdx);
  const ewaIdx = qidIdx + afterQID.indexOf('"ExplanationWrongA"');
  const ewaLine = pack.substring(ewaIdx, pack.indexOf('\n', ewaIdx));
  
  if (ewaLine.includes('""')) {
    const old = ewaLine;
    const newEwA = '"ExplanationWrongA": "Control activities are the specific policies and procedures implemented to address risks identified through risk assessment. The stem describes management periodically reviewing exception reports and reconciliations to evaluate whether controls continue to operate as designed — this is monitoring, not the execution of a specific control procedure.",';
    pack = pack.replace(old, newEwA);
    changes.push(`ED-028: EW_A filled (${newEwA.length} chars)`);
    totalEWFills++;
  }
  
  // Check and add COSO
  const afterEWA = pack.substring(ewaIdx);
  const ecIdx = qidIdx + afterQID.indexOf('"ExplanationCorrect"');
  const ecLine = pack.substring(ecIdx, pack.indexOf('\n', ecIdx) + 1);
  if (!ecLine.includes('COSO')) {
    const newEC = ecLine.replace(
      /"ExplanationCorrect": "([^"]*)"/,
      '"ExplanationCorrect": "$1 Under the COSO Monitoring Activities component (Principles 16–17), ongoing evaluations are built into normal recurring operations and provide timely feedback about control effectiveness. Management review of exception reports and reconciliations represents ongoing monitoring that assesses whether controls are present and functioning."'
    );
    pack = pack.replace(ecLine, newEC);
    changes.push('ED-028: COSO citation added');
    totalCOSOAdds++;
  }
}

// =============================================
// P1-ED-042: CC=B, EW_A empty, EW_C empty
// =============================================
{
  const qidIdx = pack.indexOf('"QuestionID": "P1-ED-042"');
  const afterQID = pack.substring(qidIdx);
  
  // EW_A
  const ewaIdx = qidIdx + afterQID.indexOf('"ExplanationWrongA"');
  const ewaLine = pack.substring(ewaIdx, pack.indexOf('\n', ewaIdx));
  if (ewaLine.includes('""')) {
    const newEwA = '"ExplanationWrongA": "Control environment sets the tone for the organization, establishing the foundation for all other components through integrity, ethical values, and governance structure. The stem describes the specific process of scoring risks by likelihood and impact — this analytical ranking activity is risk assessment, which operates within the control environment but is a distinct component.",';
    pack = pack.replace(ewaLine, newEwA);
    changes.push('ED-042: EW_A filled');
    totalEWFills++;
  }
  
  // EW_C
  const afterEWA = pack.substring(ewaIdx + 1);
  const ewcIdx = ewaIdx + 1 + afterEWA.indexOf('"ExplanationWrongC"');
  const ewcLine = pack.substring(ewcIdx, pack.indexOf('\n', ewcIdx));
  if (ewcLine.includes('""')) {
    const newEwC = '"ExplanationWrongC": "Information and communication ensures relevant information is identified, captured, and communicated in a form and timeframe that enables people to carry out their responsibilities. While risk assessment results should be communicated, the scoring activity itself — evaluating likelihood and impact — is the analytical process of risk assessment, not the distribution of information.",';
    pack = pack.replace(ewcLine, newEwC);
    changes.push('ED-042: EW_C filled');
    totalEWFills++;
  }
}

// =============================================
// P1-ED-046: CC=B, EW_C empty, COSO missing
// =============================================
{
  // Find the SECOND P1-ED-046 (first one may be in a different variant)
  let firstIdx = pack.indexOf('"QuestionID": "P1-ED-046"');
  let secondIdx = pack.indexOf('"QuestionID": "P1-ED-046"', firstIdx + 1);
  let qidIdx = secondIdx;
  // Actually we need to be more careful - the canonical seed is a specific one.
  // Let's use: find P1-ED-046 with CC=B and empty EW_C
  // Simpler: find the right one by searching for CorrectChoice B near the QID
  while (true) {
    const after = pack.substring(qidIdx, qidIdx + 5000);
    if (after.includes('"CorrectChoice": "B"')) {
      break;
    }
    qidIdx = pack.indexOf('"QuestionID": "P1-ED-046"', qidIdx + 1);
    if (qidIdx === -1) break;
  }
  
  const afterQID = pack.substring(qidIdx);
  const ewcIdx = qidIdx + afterQID.indexOf('"ExplanationWrongC"');
  const ewcLine = pack.substring(ewcIdx, pack.indexOf('\n', ewcIdx));
  if (ewcLine.includes('""')) {
    const newEwC = '"ExplanationWrongC": "Risk assessment identifies and analyzes threats to achieving objectives — such as financial reporting risks, fraud risks, or operational risks. While ethics training indirectly reduces certain behavioral risks, the annual code of conduct acknowledgment primarily establishes and reinforces the ethical values and integrity expectations that form the control environment.",';
    pack = pack.replace(ewcLine, newEwC);
    changes.push('ED-046: EW_C filled');
    totalEWFills++;
  }
}

// =============================================
// P1-ED-051: CC=C, EW_D empty, COSO missing
// =============================================
{
  let qidIdx = pack.indexOf('"QuestionID": "P1-ED-051"');
  while (true) {
    const after = pack.substring(qidIdx, qidIdx + 5000);
    if (after.includes('"CorrectChoice": "C"')) break;
    qidIdx = pack.indexOf('"QuestionID": "P1-ED-051"', qidIdx + 1);
    if (qidIdx === -1) break;
  }
  
  const afterQID = pack.substring(qidIdx);
  const ewdIdx = qidIdx + afterQID.indexOf('"ExplanationWrongD"');
  const ewdLine = pack.substring(ewdIdx, pack.indexOf('\n', ewdIdx));
  if (ewdLine.includes('""')) {
    const newEwD = '"ExplanationWrongD": "Monitoring activities evaluate whether controls continue to function effectively over time. Password complexity requirements may be monitored for compliance through periodic access reviews, but the password policy itself is a preventive access control — not a monitoring activity.",';
    pack = pack.replace(ewdLine, newEwD);
    changes.push('ED-051: EW_D filled');
    totalEWFills++;
  }
}

// =============================================
// P1-ED-058: CC=B, EW_A empty, EW_C empty, COSO present
// =============================================
// (EC already has COSO citation)
{
  let qidIdx = pack.indexOf('"QuestionID": "P1-ED-058"');
  while (true) {
    const after = pack.substring(qidIdx, qidIdx + 5000);
    if (after.includes('"CorrectChoice": "B"')) break;
    qidIdx = pack.indexOf('"QuestionID": "P1-ED-058"', qidIdx + 1);
    if (qidIdx === -1) break;
  }
  
  const afterQID = pack.substring(qidIdx);
  
  // EW_A
  const ewaIdx = qidIdx + afterQID.indexOf('"ExplanationWrongA"');
  const ewaLine = pack.substring(ewaIdx, pack.indexOf('\n', ewaIdx));
  if (ewaLine.includes('""')) {
    const newEwA = '"ExplanationWrongA": "A control environment weakness relates to the organization\'s overall attitude toward controls, such as poor tone at the top or weak governance oversight. The decision described is a rational cost-benefit judgment — the cost of the control exceeds the expected benefit from reducing a low-frequency, low-impact risk. This is an inherent limitation of internal control design, not a control environment deficiency.",';
    pack = pack.replace(ewaLine, newEwA);
    changes.push('ED-058: EW_A filled');
    totalEWFills++;
  }
  
  const afterEWA = pack.substring(ewaIdx + 1);
  const ewcIdx = ewaIdx + 1 + afterEWA.indexOf('"ExplanationWrongC"');
  const ewcLine = pack.substring(ewcIdx, pack.indexOf('\n', ewcIdx));
  if (ewcLine.includes('""')) {
    const newEwC = '"ExplanationWrongC": "Management override occurs when someone with authority intentionally bypasses established controls for personal gain or to achieve financial targets. Here, management is making a deliberate, transparent decision not to implement a control because its cost outweighs its risk-reduction benefit — this is reasoned judgment about control design, not override of an existing control.",';
    pack = pack.replace(ewcLine, newEwC);
    changes.push('ED-058: EW_C filled');
    totalEWFills++;
  }
}

// =============================================
// P1-ED-064: CC=D, EW_A empty, COSO present
// =============================================
{
  let qidIdx = pack.indexOf('"QuestionID": "P1-ED-064"');
  while (true) {
    const after = pack.substring(qidIdx, qidIdx + 5000);
    if (after.includes('"CorrectChoice": "D"')) break;
    qidIdx = pack.indexOf('"QuestionID": "P1-ED-064"', qidIdx + 1);
    if (qidIdx === -1) break;
  }
  
  const afterQID = pack.substring(qidIdx);
  const ewaIdx = qidIdx + afterQID.indexOf('"ExplanationWrongA"');
  const ewaLine = pack.substring(ewaIdx, pack.indexOf('\n', ewaIdx));
  if (ewaLine.includes('""')) {
    const newEwA = '"ExplanationWrongA": "Foreign currency translation errors arise from exchange rate fluctuations affecting foreign-currency-denominated transactions. Restricting vendor-master-file changes is an accounts-payable control addressing the risk of unauthorized or fraudulent vendor payments — fundamentally a segregation of duties concern within the procurement-to-payment cycle, not a currency translation issue.",';
    pack = pack.replace(ewaLine, newEwA);
    changes.push('ED-064: EW_A filled');
    totalEWFills++;
  }
}

// =============================================
// P1-ED-066: CC=B, EW_A empty, EW_C empty, COSO present
// =============================================
{
  let qidIdx = pack.indexOf('"QuestionID": "P1-ED-066"');
  while (true) {
    const after = pack.substring(qidIdx, qidIdx + 5000);
    if (after.includes('"CorrectChoice": "B"')) break;
    qidIdx = pack.indexOf('"QuestionID": "P1-ED-066"', qidIdx + 1);
    if (qidIdx === -1) break;
  }
  
  const afterQID = pack.substring(qidIdx);
  
  // EW_A
  const ewaIdx = qidIdx + afterQID.indexOf('"ExplanationWrongA"');
  const ewaLine = pack.substring(ewaIdx, pack.indexOf('\n', ewaIdx));
  if (ewaLine.includes('""')) {
    const newEwA = '"ExplanationWrongA": "The audit committee does not replace or perform the work of the external auditor. Its role is governance-level oversight — appointing the auditor, reviewing audit scope and findings, and ensuring independence. This oversight strengthens the integrity of the external audit process rather than substituting for it.",';
    pack = pack.replace(ewaLine, newEwA);
    changes.push('ED-066: EW_A filled');
    totalEWFills++;
  }
  
  const afterEWA = pack.substring(ewaIdx + 1);
  const ewcIdx = ewaIdx + 1 + afterEWA.indexOf('"ExplanationWrongC"');
  const ewcLine = pack.substring(ewcIdx, pack.indexOf('\n', ewcIdx));
  if (ewcLine.includes('""')) {
    const newEwC = '"ExplanationWrongC": "Setting employee compensation is a management responsibility, not an audit committee function. The audit committee\'s role is governance-level oversight of financial reporting, internal controls, and the audit functions — not operational decisions about compensation structures or levels.",';
    pack = pack.replace(ewcLine, newEwC);
    changes.push('ED-066: EW_C filled');
    totalEWFills++;
  }
}

// Now add COSO citations to items that lack them
// ED-001, ED-010, ED-014, ED-016, ED-036, ED-042, ED-046, ED-051
const cosoAdditions = [
  { qid: 'P1-ED-001', cc: 'A', cosoText: ' Under the COSO Control Environment component (Principles 1–5), the three lines of defense model establishes the governance structure that clarifies roles and responsibilities for risk management and control — the board and senior management (first line oversight), risk and compliance functions (second line), and internal audit (third line).' },
  { qid: 'P1-ED-010', cc: 'B', cosoText: ' Access controls that limit user permissions to the minimum necessary for job functions are preventive controls under COSO Principle 12. Least-privilege access reduces the attack surface and limits the damage from compromised credentials or insider threats.' },
  { qid: 'P1-ED-014', cc: 'B', cosoText: ' Independent verification — where a second person reviews and confirms the accuracy of work performed by another — is a detective control activity under COSO Principle 12. It catches errors after they occur, providing a safety net for the initial processing.' },
  { qid: 'P1-ED-016', cc: 'D', cosoText: ' Under the COSO Risk Assessment component (Principles 6–9), risk responses include avoidance, reduction, sharing, and acceptance. Selecting the appropriate response requires evaluating the risk\'s significance against the organization\'s risk appetite.' },
  { qid: 'P1-ED-036', cc: 'D', cosoText: ' Under COSO Principle 11, IT general controls encompass change management processes that govern how system modifications are tested, approved, and deployed. Proper change management prevents unauthorized or untested changes from reaching production systems.' },
  { qid: 'P1-ED-042', cc: 'B', cosoText: ' Under the COSO Risk Assessment component (Principles 6–9), organizations must identify risks to the achievement of objectives and analyze them by likelihood and impact to determine how they should be managed. This prioritization enables management to allocate resources to the most significant risks.' },
  { qid: 'P1-ED-046', cc: 'B', cosoText: ' Under COSO Principle 1, the control environment establishes the importance of integrity and ethical values throughout the organization. A code of conduct reinforced through annual training and acknowledgment demonstrates the board and management\'s commitment to ethical behavior.' },
  { qid: 'P1-ED-051', cc: 'C', cosoText: ' Under COSO Principle 11, IT general controls include access security measures that protect information assets from unauthorized access. Multi-factor authentication provides defense-in-depth by requiring multiple independent credentials, significantly reducing the risk of compromised accounts.' }
];

for (const entry of cosoAdditions) {
  let qidIdx = pack.indexOf(`"QuestionID": "${entry.qid}"`);
  while (true) {
    const after = pack.substring(qidIdx, qidIdx + 5000);
    if (after.includes(`"CorrectChoice": "${entry.cc}"`)) break;
    qidIdx = pack.indexOf(`"QuestionID": "${entry.qid}"`, qidIdx + 1);
    if (qidIdx === -1) break;
  }
  if (qidIdx === -1) continue;
  
  const afterQID = pack.substring(qidIdx);
  const ecIdx = qidIdx + afterQID.indexOf('"ExplanationCorrect"');
  const ecLine = pack.substring(ecIdx, pack.indexOf('\n', ecIdx));
  
  if (!ecLine.includes('COSO') && !ecLine.includes('Principle')) {
    const newEC = ecLine.replace(/"ExplanationCorrect": "([^"]*)"/, (match, text) => {
      return '"ExplanationCorrect": "' + text + entry.cosoText + '"';
    });
    pack = pack.replace(ecLine, newEC);
    changes.push(`${entry.qid}: COSO citation added (CC=${entry.cc})`);
    totalCOSOAdds++;
  } else {
    changes.push(`${entry.qid}: COSO already present (CC=${entry.cc}) — skipped`);
  }
}

// Write the modified file
fs.writeFileSync('pack_d_corrected.js', pack);

console.log('=== S320 Pack D Remediation Complete ===');
console.log(`Total EW slots filled: ${totalEWFills}`);
console.log(`Total COSO citations added: ${totalCOSOAdds}`);
console.log(`Total changes: ${changes.length}`);
console.log('');
changes.forEach(c => console.log('  ' + c));

// Verify integrity
const verify = fs.readFileSync('pack_d_corrected.js', 'utf8');
const parseAttempt = verify.substring(verify.indexOf('['), verify.lastIndexOf(']') + 1);
try {
  const data = JSON.parse(parseAttempt);
  console.log(`\nJSON parse: OK (${data.length} items)`);
} catch(e) {
  console.log(`\nJSON parse: FAILED - ${e.message.substring(0, 100)}`);
}
