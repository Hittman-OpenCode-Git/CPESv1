const fs = require('fs');
const path = require('path');

const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js'
];

const targetCaseIds = [
  'CBQ-C2', 'CBQ-C3', 'CBQ-D2', 'CBQ-E1', 'CBQ-E2',
  'CBQ2-F1', 'CBQ2-A3', 'CBQ3-A1', 'CBQ4-A1', 'CBQ2-B2',
  'CBQ3-B2', 'CBQ2-C3', 'CBQ3-C3', 'CBQ4-C1', 'CBQ4-E1',
  'CBQ4-F1', 'CBQ5-A2', 'CBQ5-B2', 'CBQ4-B1', 'CBQ4-B2',
  'CBQ4-D3', 'CBQ4-E2', 'CBQ5-E1', 'CBQ5-E2', 'CBQ5-E3',
  'CBQ4-F2', 'CBQ5-F2', 'CBQ3-A3', 'CBQ3-A4', 'CBQ3-C4'
];

const targetItemIds = new Set([
  'CBQ-C2-Q1', 'CBQ-C3-Q1', 'CBQ-D2-Q1', 'CBQ-E1-Q1', 'CBQ-E2-Q1',
  'CBQ2-F1-Q1', 'CBQ2-A3-Q1', 'CBQ3-A1-Q1', 'CBQ3-A1-Q3', 'CBQ4-A1-Q1',
  'CBQ2-B2-Q1', 'CBQ2-B2-Q4', 'CBQ3-B2-Q1', 'CBQ3-B2-Q4', 'CBQ2-C3-Q1',
  'CBQ3-C3-Q1', 'CBQ3-C3-Q2', 'CBQ4-C1-Q1', 'CBQ4-E1-Q1', 'CBQ4-F1-Q1',
  'CBQ4-F1-Q2', 'CBQ5-A2-Q1', 'CBQ5-B2-Q1', 'CBQ4-B1-Q1', 'CBQ4-B1-Q4',
  'CBQ4-B2-Q1', 'CBQ4-D3-Q1', 'CBQ4-D3-Q2', 'CBQ4-E2-Q1', 'CBQ4-E2-Q2',
  'CBQ5-E1-Q1', 'CBQ5-E1-Q2', 'CBQ5-E1-Q4', 'CBQ5-E2-Q1', 'CBQ5-E2-Q3',
  'CBQ5-E3-Q1', 'CBQ4-F2-Q1', 'CBQ4-F2-Q2', 'CBQ4-F2-Q4', 'CBQ5-F2-Q1',
  'CBQ5-F2-Q3', 'CBQ3-A3-Q1', 'CBQ3-A4-Q1', 'CBQ3-C4-Q1'
]);

function extractCases(packPath) {
  const content = fs.readFileSync(packPath, 'utf8');
  const cases = [];
  const caseRegex = /"CaseID":\s*"([^"]+)"\s*,\s*"Title"/g;

  let caseMatch;
  const casePositions = [];
  while ((caseMatch = caseRegex.exec(content)) !== null) {
    casePositions.push({ caseId: caseMatch[1], pos: caseMatch.index });
  }

  for (let i = 0; i < casePositions.length; i++) {
    const start = casePositions[i].pos;
    const end = i + 1 < casePositions.length ? casePositions[i + 1].pos : content.length;
    const caseBlock = content.substring(start, end);

    const items = [];
    const itemRegex2 = /"ItemID":\s*"([^"]+)"/g;
    const itemPositions = [];
    let itemMatch;
    while ((itemMatch = itemRegex2.exec(caseBlock)) !== null) {
      itemPositions.push({ itemId: itemMatch[1], pos: itemMatch.index });
    }

    for (let j = 0; j < itemPositions.length; j++) {
      const iStart = itemPositions[j].pos;
      const iEnd = j + 1 < itemPositions.length ? itemPositions[j + 1].pos : caseBlock.length;
      const itemBlock = caseBlock.substring(iStart, iEnd);

      const promptMatch = itemBlock.match(/"Prompt":\s*"([^"]+)"/);
      const typeMatch = itemBlock.match(/"Type":\s*"([^"]+)"/);
      const choicesMatch = itemBlock.match(/"Choices":\s*\[([^\]]*)\]/);
      const leftMatch = itemBlock.match(/"LeftItems":\s*\[([^\]]*)\]/);
      const rightMatch = itemBlock.match(/"RightItems":\s*\[([^\]]*)\]/);
      const explanationMatch = itemBlock.match(/"Explanation":\s*"((?:[^"\\]|\\.)*)"/);

      const item = {
        itemId: itemPositions[j].itemId,
        type: typeMatch ? typeMatch[1] : 'unknown',
        Prompt: promptMatch ? promptMatch[1] : '',
        Correct: '[HIDDEN - derive independently]',
        ExplanationCorrect: explanationMatch ? explanationMatch[1] : ''
      };

      if (choicesMatch) {
        item.Choices = choicesMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      }
      if (leftMatch) {
        item.LeftItems = leftMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      }
      if (rightMatch) {
        item.RightItems = rightMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      }

      items.push(item);
    }

    cases.push({ caseId: casePositions[i].caseId, bank: packPath, items });
  }
  return cases;
}

const allCases = [];
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (fs.existsSync(fullPath)) {
    allCases.push(...extractCases(fullPath));
  }
}

const caseMap = new Map();
for (const c of allCases) {
  caseMap.set(c.caseId, c);
}

const output = [];
for (const caseId of targetCaseIds) {
  const c = caseMap.get(caseId);
  if (c) {
    const filteredItems = c.items.filter(item => targetItemIds.has(item.itemId));
    output.push({
      bank: c.bank || 'unknown',
      caseId: c.caseId,
      currentState: 'In Audit',
      items: filteredItems
    });
  } else {
    console.error(`Case not found: ${caseId}`);
  }
}

const outputPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Written ${output.length} cases to ${outputPath}`);
console.log(`Total items: ${output.reduce((sum, c) => sum + c.items.length, 0)}`);
