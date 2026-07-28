// S320: Fill empty EW slots in 7 Pack D seeds via exact line replacement
const fs = require('fs');

let lines = fs.readFileSync('pack_d_corrected.js', 'utf8').split('\n');

// Each entry: [lineNum, newLineContent] (lineNum is 0-based)
const fills = [
  // P1-ED-028: EW_A (line 19103, 0-based = 19102)
  [19102, '        "ExplanationWrongA": "Control activities are the specific policies and procedures implemented to address risks identified through risk assessment. The stem describes management periodically reviewing exception reports and reconciliations to evaluate whether controls continue to operate as designed — this is monitoring under COSO Principles 16–17, not the execution of a specific control procedure.",'],
  
  // P1-ED-042: EW_A (line 19803, 0-based = 19802)  
  [19802, '        "ExplanationWrongA": "Control environment sets the tone for the organization, establishing the foundation for all other components through integrity, ethical values, and governance structure. The stem describes the specific process of scoring risks by likelihood and impact — this analytical ranking activity is risk assessment, which operates within the control environment but is a distinct component.",'],
  
  // P1-ED-042: EW_C (line 19805, 0-based = 19804)
  [19804, '        "ExplanationWrongC": "Information and communication ensures relevant information is identified, captured, and communicated so that people can carry out their responsibilities. While risk assessment results should be communicated, the scoring activity itself — evaluating likelihood and impact — is the analytical core of risk assessment, not the communication component.",'],
  
  // P1-ED-046: EW_C (line 20005, 0-based = 20004)
  [20004, '        "ExplanationWrongC": "Risk assessment identifies and analyzes threats to achieving objectives — such as financial reporting risks, fraud risks, or operational risks. While ethics training indirectly reduces certain behavioral risks, the annual code of conduct acknowledgment primarily establishes and reinforces the ethical values and integrity expectations that form the control environment under COSO Principle 1.",'],
  
  // P1-ED-051: EW_D (line 20256, 0-based = 20255)
  [20255, '        "ExplanationWrongD": "Monitoring activities evaluate whether controls continue to function effectively over time. While password policies may be monitored for compliance through periodic access reviews, the multi-factor authentication requirement itself is a preventive access control under COSO Principle 11 — not a monitoring activity.",'],
  
  // P1-ED-058: EW_A (line 20553, 0-based = 20552)
  [20552, '        "ExplanationWrongA": "A control environment weakness relates to the organization\'s overall attitude toward controls, such as poor tone at the top or weak governance oversight. The decision described is a rational cost-benefit judgment — the cost of the control exceeds the expected benefit from reducing a low-frequency, low-impact risk. This is an inherent limitation of internal control design, not a control environment deficiency.",'],
  
  // P1-ED-058: EW_C (line 20555, 0-based = 20554)
  [20554, '        "ExplanationWrongC": "Management override occurs when someone with authority intentionally bypasses established controls for personal gain or to achieve financial targets. Here, management is making a deliberate, transparent decision not to implement a control because its cost outweighs its risk-reduction benefit — this is reasoned judgment about control design, not override of an existing control.",'],
  
  // P1-ED-064: EW_A (line 20853, 0-based = 20852)
  [20852, '        "ExplanationWrongA": "Foreign currency translation errors arise from exchange rate fluctuations affecting foreign-currency-denominated transactions. Restricting vendor-master-file changes is an accounts-payable control addressing the risk of unauthorized or fraudulent vendor payments — fundamentally a segregation-of-duties concern within the procurement-to-payment cycle, not a currency translation issue.",'],
  
  // P1-ED-066: EW_A (line 20953, 0-based = 20952)
  [20952, '        "ExplanationWrongA": "The audit committee does not replace or perform the work of the external auditor. Its role under SOX and COSO Principle 2 is governance-level oversight — appointing the auditor, reviewing audit scope and findings, and ensuring independence. This oversight strengthens the integrity of the external audit process rather than substituting for it.",'],
  
  // P1-ED-066: EW_C (line 20955, 0-based = 20954) — EW_C doesn't exist empty for CC=B. Wait, let me check.
  // Actually ED-066 CC=B, so B is CC. EW_A and EW_C are the empty non-CC slots.
  // EW_C already has: '"ExplanationWrongC": "Setting employee compensation is a management responsibility..."'
  // So only EW_A needed. Let me remove EW_C from the fill list.
];

// Verify each target line is currently empty before replacing
let failed = 0;
for (const [lineNum, newLine] of fills) {
  const current = lines[lineNum].trim();
  if (current === '"ExplanationWrongA": "",' || current === '"ExplanationWrongC": "",' || current === '"ExplanationWrongD": "",') {
    lines[lineNum] = newLine;
  } else {
    console.log(`SKIPPED line ${lineNum + 1}: current content is not empty: "${current.substring(0, 80)}..."`);
    failed++;
  }
}

if (failed > 0) {
  console.log(`\n${failed} fills SKIPPED — line content was not empty. Aborting.`);
  process.exit(1);
}

// Also add COSO citations to ED-016 and ED-036 (missing COSO + weak EC)
// ED-016: line 19503 area — need to find EC line
// Let me just verify and report on what's needed

fs.writeFileSync('pack_d_corrected.js', lines.join('\n'));
console.log(`Applied ${fills.length} EW fills successfully.`);
console.log('Verifying...');

// Quick parse check
const content = lines.join('\n');
const arrayStart = content.indexOf('[');
const arrayEnd = content.lastIndexOf(']') + 1;
try {
  const data = JSON.parse(content.substring(arrayStart, arrayEnd));
  console.log(`JSON parse: OK (${data.length} items)`);
} catch(e) {
  console.log(`JSON parse: FAILED - ${e.message.substring(0, 150)}`);
}
