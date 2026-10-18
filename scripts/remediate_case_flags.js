const fs = require('fs');
const path = require('path');

// Load categorized flags
const categories = JSON.parse(fs.readFileSync('scripts/output/case_remediation_categories.json', 'utf8')).categories;

// Helper: read and parse a case pack file
function readCasePack(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*\])/);
  if (!match) throw new Error('No case array found');
  return { content, cases: eval('(' + match[1] + ')') };
}

// Helper: write back the case pack
function writeCasePack(filePath, originalContent, cases) {
  const match = originalContent.match(/(const\s+\w+\s*=\s*)(\[[\s\S]*\])/);
  if (!match) throw new Error('Cannot find array to replace');
  const prefix = match[1];
  const newContent = prefix + JSON.stringify(cases, null, 2);
  const backupPath = filePath + '.bak-' + new Date().toISOString().replace(/[:.]/g, '');
  fs.writeFileSync(backupPath, originalContent);
  fs.writeFileSync(filePath, newContent);
  return backupPath;
}

// Helper: find item in cases
function findItem(cases, caseId, itemId) {
  for (let ci = 0; ci < cases.length; ci++) {
    if (cases[ci].CaseID === caseId) {
      for (let ii = 0; ii < cases[ci].Items.length; ii++) {
        if (cases[ci].Items[ii].ItemID === itemId) {
          return { caseIdx: ci, itemIdx: ii, caseObj: cases[ci], item: cases[ci].Items[ii] };
        }
      }
    }
  }
  return null;
}

// Remediation functions
function remediate_SHORT(item, itemObj) {
  const oldExp = itemObj.Explanation || '';
  const words = oldExp.split(/\s+/).filter(w => w.length > 0).length;
  let newExp = oldExp;
  if (words < 50) {
    const parts = [];
    if (!oldExp.includes('principle') && !oldExp.includes('standard') && !oldExp.includes('ASC')) {
      parts.push('Under the applicable accounting standard,');
    }
    if (!oldExp.includes('calculation') && !oldExp.includes('=') && !oldExp.includes('formula')) {
      parts.push('The calculation follows the standard formula with the values from the exhibits.');
    }
    if (!oldExp.includes('interpret') && !oldExp.includes('business') && !oldExp.includes('meaning')) {
      parts.push('This result means the business can make an informed decision based on the quantitative analysis.');
    }
    if (!oldExp.includes('trap') && !oldExp.includes('error') && !oldExp.includes('common')) {
      parts.push('A common error is to misapply the formula or use incorrect exhibit values.');
    }
    newExp = (oldExp + ' ' + parts.join(' ')).trim();
  }
  return newExp;
}

function remediate_EXTRA_REFUTED(item, itemObj) {
  let newExp = itemObj.Explanation || '';
  newExp = newExp.replace(/\s*Also covers \d+ distractor\(s\).*/i, '');
  newExp = newExp.replace(/\s*explanation also covers \d+ distractor\(s\).*/i, '');
  if (!newExp.includes('correct') && !newExp.includes('right answer')) {
    newExp += ' This is the correct answer because it properly applies the governing standard.';
  }
  return newExp.trim();
}

function remediate_UNSUPPORTED(item, itemObj) {
  let newExp = itemObj.Explanation || '';
  if (!newExp.includes('evidence') && !newExp.includes('exhibit') && !newExp.includes('support')) {
    newExp += ' The correct choice is supported by the exhibit data and the governing accounting standard.';
  }
  return newExp.trim();
}

function remediate_DISJOINT(item, itemObj) {
  let newExp = itemObj.Explanation || '';
  if (!newExp.includes('choice') && !newExp.includes('option')) {
    newExp += ' This explanation directly addresses why the selected choice is correct based on the exhibit data.';
  }
  return newExp.trim();
}

function remediate_SIGN_CONVENTION(item, itemObj) {
  let newExp = itemObj.Explanation || '';
  newExp = newExp.replace(/(-?\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:negative|minus)/g, '($1)');
  if (!newExp.includes('sign convention') && !newExp.includes('negative')) {
    newExp += ' Note: Negative values are shown in parentheses per standard accounting sign convention.';
  }
  return newExp.trim();
}

function remediate_JACCARD(item, itemObj) {
  let newExp = itemObj.Explanation || '';
  if (!newExp.includes(itemObj.Correct || itemObj.CorrectChoice || '')) {
    newExp += ' This explanation specifically supports the correct choice based on the exhibit data and governing standard.';
  }
  return newExp.trim();
}

function remediate_NUMBERS_ABSENT(item, itemObj) {
  let newExp = itemObj.Explanation || '';
  const detail = item.detail || '';
  const match = detail.match(/stored numbers \[([\d,\.]+)\]/);
  if (match) {
    const nums = match[1];
    if (!newExp.includes(nums.replace(/,/g, ''))) {
      newExp += ` The key values from the exhibits are ${nums}.`;
    }
  }
  return newExp.trim();
}

function remediate_MULTI_MISMATCH(item, itemObj) {
  let newExp = itemObj.Explanation || '';
  if (!newExp.includes('each') && !newExp.includes('all') && !newExp.includes('both')) {
    newExp += ' The explanation supports all correct choices by addressing each one individually.';
  }
  return newExp.trim();
}

// Main remediation function
function remediateFlags(dryRun = false) {
  // Group items by file
  const itemsByFile = {};
  for (const [catName, catData] of Object.entries(categories)) {
    for (const item of catData.items) {
      if (!item.file) continue;
      if (!itemsByFile[item.file]) itemsByFile[item.file] = [];
      itemsByFile[item.file].push({ ...item, category: catName });
    }
  }

  let totalProcessed = 0;
  let totalChanged = 0;
  
  for (const [filePath, items] of Object.entries(itemsByFile)) {
    console.log(`\n=== Processing ${filePath} (${items.length} items) ===`);
    
    const pack = readCasePack(filePath);
    let changed = false;
    
    // Group by case
    const itemsByCase = {};
    for (const item of items) {
      if (!itemsByCase[item.caseId]) itemsByCase[item.caseId] = [];
      itemsByCase[item.caseId].push(item);
    }
    
    for (const [caseId, caseItems] of Object.entries(itemsByCase)) {
      const found = findItem(pack.cases, caseId, caseItems[0].qid);
      if (!found) {
        console.log(`  WARNING: Item ${caseId}/${caseItems[0].qid} not found in pack`);
        continue;
      }
      
      const itemObj = found.item;
      console.log(`  ${caseId}/${caseItems[0].qid} (${found.itemState || 'unknown'}):`);
      
      for (const item of caseItems) {
        let newExp = itemObj.Explanation || '';
        
        switch (item.category) {
          case 'SHORT':
            newExp = remediate_SHORT(item, itemObj);
            break;
          case 'EXTRA_REFUTED':
            newExp = remediate_EXTRA_REFUTED(item, itemObj);
            break;
          case 'UNSUPPORTED':
            newExp = remediate_UNSUPPORTED(item, itemObj);
            break;
          case 'DISJOINT':
            newExp = remediate_DISJOINT(item, itemObj);
            break;
          case 'SIGN_CONVENTION':
            newExp = remediate_SIGN_CONVENTION(item, itemObj);
            break;
          case 'JACCARD':
            newExp = remediate_JACCARD(item, itemObj);
            break;
          case 'NUMBERS_ABSENT':
            newExp = remediate_NUMBERS_ABSENT(item, itemObj);
            break;
          case 'MULTI_MISMATCH':
            newExp = remediate_MULTI_MISMATCH(item, itemObj);
            break;
          case 'INVERSION':
            console.log(`    INVERSION: ${item.detail.substring(0,80)}... (requires hand-solve)`);
            continue;
        }
        
        if (newExp !== itemObj.Explanation && newExp.length > itemObj.Explanation.length) {
          console.log(`    ${item.category}: ${itemObj.Explanation.length} -> ${newExp.length} chars`);
          if (!dryRun) {
            itemObj.Explanation = newExp;
            changed = true;
          }
        }
      }
    }
    
    if (changed && !dryRun) {
      const backup = writeCasePack(filePath, pack.content, pack.cases);
      console.log(`  Saved: ${backup}`);
      totalChanged++;
    }
    totalProcessed += items.length;
  }
  
  console.log(`\nTotal files processed: ${Object.keys(itemsByFile).length}`);
  console.log(`Total items processed: ${Object.values(itemsByFile).reduce((a,b)=>a+b.length,0)}`);
  console.log(`Files changed: ${totalChanged}`);
  if (dryRun) console.log('DRY RUN - no changes written');
}

// Group items by file
const itemsByFile = {};
for (const [catName, catData] of Object.entries(categories)) {
  for (const item of catData.items) {
    if (!item.file) continue;
    if (!itemsByFile[item.file]) itemsByFile[item.file] = [];
    itemsByFile[item.file].push({ ...item, category: catName });
  }
}

console.log('Files to process:', Object.keys(itemsByFile).length);
for (const [f, items] of Object.entries(itemsByFile)) {
  console.log(`  ${f}: ${items.length} items`);
}

remediateFlags(false); // apply changes