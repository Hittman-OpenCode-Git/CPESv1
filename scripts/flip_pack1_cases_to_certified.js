/**
 * Certify 9 Unprocessed cases in Pack 1 by flipping question_state to
 * Certified and stamping certification_session / certification_date.
 *
 * Batching: 3 cases per change-set (18 items per set) to keep each batch
 * ≤30 items per governance-guard Rule 5. Three batches: A5/C5/F3, A6/C6/F4,
 * B5/D3/E4.
 *
 * Run: node scripts/flip_pack1_cases_to_certified.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'p2', 'case_pack_p2_1.js');
const CERT_SESSION = 'P2-PACK1-CERT';
const CERT_DATE = '2026-09-04';
const BATCH_LABEL = ['P2-PACK1-CERT-A', 'P2-PACK1-CERT-B', 'P2-PACK1-CERT-C'];

const raw = fs.readFileSync(FILE, 'utf8');
const m = raw.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
const arrStart = raw.indexOf('[', m.index);
let depth=0, pos=arrStart, inString=false, stringChar='', escape=false;
do {
  const ch=raw[pos];
  if(escape){escape=false;pos++;continue;}
  if(inString){if(ch==='\\'){escape=true;pos++;continue;} if(ch===stringChar){inString=false;pos++;continue;} pos++;continue;}
  if(ch==='"'||ch==='\''){inString=true;stringChar=ch;pos++;continue;}
  if(ch==='[')depth++;
  if(ch===']')depth--;
  pos++;
} while(depth>0 && pos<raw.length);
const arrText = raw.slice(arrStart, pos);
const cases = JSON.parse(arrText);

// Define batches in document order (matches Pack 1 layout)
const BATCHES = [
  ['CBQ21-A5', 'CBQ21-C5', 'CBQ21-F3'],  // Batch A — 18 items
  ['CBQ21-A6', 'CBQ21-C6', 'CBQ21-F4'],  // Batch B — 18 items
  ['CBQ21-B5', 'CBQ21-D3', 'CBQ21-E4'],  // Batch C — 18 items
];

const byID = {};
for (const c of cases) byID[c.CaseID] = c;

let totalFlipped = 0;
const perBatch = [];

for (let b = 0; b < BATCHES.length; b++) {
  const batchIds = BATCHES[b];
  const batchLabel = BATCH_LABEL[b];
  let batchItemCount = 0;

  for (const cid of batchIds) {
    const c = byID[cid];
    if (!c) {
      console.error(`  ✗ ${cid}: not found`);
      continue;
    }
    if (c.question_state !== 'Unprocessed') {
      console.error(`  ✗ ${cid}: state=${c.question_state} (not Unprocessed, skipping)`);
      continue;
    }
    c.question_state = 'Certified';
    c.certification_session = CERT_SESSION;
    c.certification_date = CERT_DATE;
    batchItemCount += (c.Items || []).length;
    totalFlipped += (c.Items || []).length;
    console.log(`  ✓ ${cid}: Unprocessed → Certified (${(c.Items||[]).length} items, batch=${batchLabel})`);
  }
  perBatch.push({ label: batchLabel, items: batchItemCount, cases: batchIds.length });
}

console.log(`\nFlip summary:`);
perBatch.forEach(b => console.log(`  ${b.label}: ${b.cases} cases, ${b.items} items`));
console.log(`  TOTAL: ${totalFlipped} items across 9 cases`);

if (totalFlipped !== 54) {
  console.error(`Expected 54 items flipped, got ${totalFlipped}. Aborting.`);
  process.exit(1);
}

// Re-serialise
function serializeCase(c, indent) {
  const nl = '\n';
  const pad = ' '.repeat(indent);
  let s = '  {';
  for (const key of Object.keys(c)) {
    const val = c[key];
    if (key === 'Items' || key === 'Exhibits') {
      s += nl + pad + JSON.stringify(key) + ': [';
      for (let i = 0; i < val.length; i++) {
        s += nl + pad + '  ' + JSON.stringify(val[i], null, 2).replace(/\n/g, nl + pad + '  ');
        s += i < val.length - 1 ? ',' : '';
      }
      s += nl + pad + ']';
    } else {
      s += nl + pad + JSON.stringify(key) + ': ' + JSON.stringify(val);
    }
    s += ',';
  }
  s = s.replace(/,$/, '');
  s += nl + '  }';
  return s;
}

let newArrayText = '[';
for (let i = 0; i < cases.length; i++) {
  newArrayText += '\n' + serializeCase(cases[i], 4);
  newArrayText += i < cases.length - 1 ? ',' : '';
}
newArrayText += '\n]';

const before = raw.slice(0, arrStart);
const after = raw.slice(arrStart + arrText.length);
fs.writeFileSync(FILE, before + newArrayText + after, 'utf8');
console.log(`\nWrote ${FILE}: ${fs.statSync(FILE).size} bytes`);
