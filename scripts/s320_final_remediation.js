// S320: Parse pack_d, fill EW + COSO on Unprocessed seeds, reconstruct file
const fs = require('fs');

const pack = fs.readFileSync('pack_d_corrected.js', 'utf8');

// Extract all items via brace-aware parsing
function extractAllItems(content) {
  const items = [];
  let i = 0;
  while (i < content.length) {
    if (content[i] === '{' && (i === 0 || content[i-1] !== '"')) {
      let depth = 1, j = i + 1;
      while (j < content.length && depth > 0) {
        if (content[j] === '{') depth++;
        if (content[j] === '}') depth--;
        j++;
      }
      const raw = content.substring(i, j);
      if (raw.includes('"QuestionID"') && raw.includes('"question_state"')) {
        items.push({ raw, start: i, end: j });
      }
      i = j;
    } else {
      i++;
    }
  }
  return items;
}

const items = extractAllItems(pack);
console.log(`Extracted ${items.length} items`);

// COSO citations to add
const cosoMap = {
  'P1-ED-001': ' Under the COSO Control Environment component (Principles 1–5), the three lines of defense model establishes the governance structure that clarifies roles for risk management and control — operational management (first line), risk and compliance functions (second line), and internal audit (third line).',
  'P1-ED-010': ' Under COSO Principle 11, IT general controls include access security measures that limit user permissions to the minimum necessary. Least-privilege access reduces the attack surface and limits damage from compromised credentials, supporting the control objective of system security.',
  'P1-ED-014': ' Under COSO Principle 12, independent verification is a detective control activity where a second person reviews the accuracy of work performed by another. It catches errors after they occur, complementing preventive controls with a detection safety net.',
  'P1-ED-016': ' Under the COSO Risk Assessment component (Principles 6–9), management selects risk responses — avoidance, reduction, sharing, or acceptance — based on the risk\'s significance relative to the organization\'s risk appetite and tolerance.',
  'P1-ED-028': ' Under the COSO Monitoring Activities component (Principles 16–17), ongoing evaluations are built into normal recurring operations and provide timely feedback about control effectiveness. Management review of exception reports and reconciliations represents ongoing monitoring that assesses whether controls are present and functioning.',
  'P1-ED-036': ' Under COSO Principle 11, IT general controls encompass change management processes governing how system modifications are tested, approved, and deployed. Proper change management prevents unauthorized or untested changes from reaching production and causing errors or fraud.',
  'P1-ED-042': ' Under the COSO Risk Assessment component (Principles 6–9), organizations must identify risks to objectives and analyze them by likelihood and impact to prioritize responses. Scoring risks enables management to allocate resources to the most significant exposures.',
  'P1-ED-046': ' Under COSO Principle 1, the control environment establishes the importance of integrity and ethical values throughout the organization. A code of conduct reinforced by annual training and acknowledgment demonstrates commitment to ethical behavior at all levels.',
  'P1-ED-051': ' Under COSO Principle 11, IT general controls include access security measures that protect information assets. Multi-factor authentication provides defense-in-depth by requiring multiple independent credentials, significantly reducing the risk of unauthorized system access.'
};

// EW fills for empty slots (distractor-specific, ~200-400 chars)
const ewFills = {
  'P1-ED-028': {
    A: 'Control activities are the specific policies and procedures implemented to address identified risks. The stem describes management periodically reviewing exception reports and reconciliations to evaluate whether controls continue to operate as designed — this is monitoring under COSO Principles 16–17, not the execution of a specific control procedure.'
  },
  'P1-ED-042': {
    A: 'Control environment sets the tone for the organization, establishing the foundation for all other components through integrity, ethical values, and governance. The stem describes the specific process of scoring risks by likelihood and impact — this analytical ranking activity is risk assessment, a distinct component.',
    C: 'Information and communication ensures relevant information is identified, captured, and communicated so people can carry out responsibilities. While risk assessment results should be communicated, the scoring activity — evaluating likelihood and impact — is the analytical core of risk assessment, not communication.'
  },
  'P1-ED-046': {
    C: 'Risk assessment identifies and analyzes threats to achieving objectives — such as financial reporting risks, fraud risks, or operational risks. While ethics training indirectly reduces certain behavioral risks, the annual code of conduct acknowledgment primarily establishes and reinforces the ethical values and integrity expectations that form the control environment under COSO Principle 1.'
  },
  'P1-ED-051': {
    D: 'Monitoring activities evaluate whether controls continue to function effectively over time. While password policies may be monitored for compliance through periodic access reviews, the multi-factor authentication requirement itself is a preventive access control under COSO Principle 11 — not a monitoring activity.'
  },
  'P1-ED-058': {
    A: 'A control environment weakness relates to the organization\'s overall attitude toward controls, such as poor tone at the top or weak governance oversight. The decision described is a rational cost-benefit judgment — the cost of the control exceeds the benefit from reducing a low-frequency, low-impact risk. This is an inherent limitation of internal control design, not a control environment deficiency.',
    C: 'Management override occurs when someone with authority intentionally bypasses established controls for personal gain or to achieve financial targets. Here, management is making a deliberate, transparent decision not to implement a control because its cost outweighs its benefit — reasoned judgment about control design, not override of an existing control.'
  },
  'P1-ED-064': {
    A: 'Foreign currency translation errors arise from exchange rate fluctuations affecting foreign-currency-denominated transactions. Restricting vendor-master-file changes is an accounts-payable control addressing the risk of unauthorized or fraudulent vendor payments — fundamentally a segregation-of-duties concern within the procurement-to-payment cycle, not a currency translation issue.'
  },
  'P1-ED-066': {
    A: 'The audit committee does not replace or perform the work of the external auditor. Under SOX and COSO Principle 2, its role is governance-level oversight — appointing the auditor, reviewing audit scope and findings, and ensuring independence. This oversight strengthens the integrity of the external audit process rather than substituting for it.'
  }
};

let ewFilled = 0, cosoAdded = 0;
const changes = [];

for (const item of items) {
  const raw = item.raw;
  const qidMatch = raw.match(/"QuestionID":\s*"([^"]+)"/);
  const stateMatch = raw.match(/"question_state":\s*"([^"]+)"/);
  if (!qidMatch || !stateMatch) continue;
  
  const qid = qidMatch[1];
  const state = stateMatch[1];
  
  // Only target Unprocessed seeds
  if (state !== 'Unprocessed') continue;
  
  // Apply EW fills
  const fills = ewFills[qid];
  if (fills) {
    const ccMatch = raw.match(/"CorrectChoice":\s*"([^"]+)"/);
    const cc = ccMatch ? ccMatch[1] : null;
    
    for (const [letter, newContent] of Object.entries(fills)) {
      const fieldName = 'ExplanationWrong' + letter;
      const pattern = new RegExp('"' + fieldName + '":\\s*""');
      if (pattern.test(raw)) {
        const replaced = raw.replace('"' + fieldName + '": ""', '"' + fieldName + '": "' + newContent + '"');
        if (replaced !== raw) {
          item.raw = replaced;
          ewFilled++;
          changes.push(`${qid}: ${fieldName} filled (${newContent.length} chars, CC=${cc})`);
        }
      }
    }
  }
  
  // Apply COSO citations
  const cosoText = cosoMap[qid];
  if (cosoText) {
    const ecMatch = item.raw.match(/"ExplanationCorrect":\s*"([^"]+)"/);
    if (ecMatch && !ecMatch[1].includes('COSO') && !ecMatch[1].includes('Principle')) {
      // Append COSO citation to EC
      const oldEC = '"ExplanationCorrect": "' + ecMatch[1] + '"';
      const newEC = '"ExplanationCorrect": "' + ecMatch[1] + cosoText + '"';
      item.raw = item.raw.replace(oldEC, newEC);
      cosoAdded++;
      changes.push(`${qid}: COSO added (${cosoText.length} chars)`);
    }
  }
}

// Reconstruct file from modified items
let result = pack;
// Process items in reverse order to preserve string offsets
for (let i = items.length - 1; i >= 0; i--) {
  const item = items[i];
  if (item.raw !== pack.substring(item.start, item.end)) {
    result = result.substring(0, item.start) + item.raw + result.substring(item.end);
  }
}

fs.writeFileSync('pack_d_corrected.js', result);

console.log(`\n=== Remediation Results ===`);
console.log(`EW slots filled: ${ewFilled}`);
console.log(`COSO citations added: ${cosoAdded}`);
console.log(`Total changes: ${changes.length}`);
changes.forEach(c => console.log(`  ${c}`));

// Verify
const verify = fs.readFileSync('pack_d_corrected.js', 'utf8');
const arrStart = verify.indexOf('['), arrEnd = verify.lastIndexOf(']') + 1;
try {
  const data = JSON.parse(verify.substring(arrStart, arrEnd));
  console.log(`\nJSON parse: OK (${data.length} items)`);
} catch(e) {
  console.log(`JSON parse: FAILED - ${e.message.substring(0, 200)}`);
}
