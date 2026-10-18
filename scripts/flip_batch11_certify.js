/**
 * Certify Batch 11 cases by flipping question_state to Certified
 * and stamping certification_session / certification_date.
 *
 * Batch: P2-HAND-SOLVE-WAVE-B11 (5 cases from p2/case_pack_p2_3.js)
 * 18 items per batch (3 cases * 6 items) — within Rule 5 cap.
 *
 * Run: node scripts/flip_batch11_certify.js
 */
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'p2', 'case_pack_p2_3.js');
const CERT_SESSION = 'P2-HAND-SOLVE-WAVE';
const CERT_DATE = '2026-09-30';
const BATCH_LABEL = 'P2-HAND-SOLVE-WAVE-B11';

const raw = fs.readFileSync(FILE, 'utf8');
const m = raw.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
if (!m) {
  console.error('Could not find casePackP2_3 array declaration');
  process.exit(1);
}
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

// Batch 11 cases
const BATCH_IDS = [
  'CBQ23-F4',
  'CBQ23-A4',
  'CBQ23-C5',
  'CBQ23-D3',
  'CBQ23-E4'
];

const byID = {};
for (const c of cases) byID[c.CaseID] = c;

let totalFlipped = 0;

console.log(`=== CERTIFYING BATCH ${BATCH_LABEL} ===`);
console.log(`File: ${FILE}`);
console.log(`Session: ${CERT_SESSION}`);
console.log(`Date: ${CERT_DATE}`);
console.log('');

for (const cid of BATCH_IDS) {
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
  c.certification_session = 'P2-HAND-SOLVE-WAVE';
  c.certification_date = CERT_DATE;
  totalFlipped += (c.Items || []).length;
  console.log(`  ✓ ${cid}: Unprocessed → Certified (${(c.Items||[]).length} items)`);
}

console.log(`\nFlip summary:`);
console.log(`  ${BATCH_LABEL}: ${BATCH_IDS.length} cases, ${totalFlipped} items`);

if (totalFlipped !== 30) {
  console.error(`Expected 30 items flipped, got ${totalFlipped}. Aborting.`);
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

// Backup first
const backupFile = FILE + '.bak-cert-' + Date.now();
fs.writeFileSync(backupFile, raw, 'utf8');
console.log(`\nBackup: ${backupFile}`);

// Write updated file
fs.writeFileSync(FILE, before + newArrayText + after, 'utf8');
console.log(`Wrote ${FILE}: ${fs.statSync(FILE).size} bytes`);

// Post-verify
const raw2 = fs.readFileSync(FILE, 'utf8');
const m2 = raw2.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
const arrStart2 = raw2.indexOf('[', m2.index);
let depth2=0, pos2=arrStart2, inString2=false, stringChar2='', escape2=false;
do {
  const ch=raw2[pos2];
  if(escape2){escape2=false;pos2++;continue;}
  if(inString2){if(ch==='\\'){escape2=true;pos2++;continue;} if(ch===stringChar2){inString2=false;pos2++;continue;} pos2++;continue;}
  if(ch==='[')depth2++;
  if(ch===']')depth2--;
  pos2++;
} while(depth2>0 && pos2<raw2.length);
const arrText2 = raw2.slice(arrStart2, pos2);
const cases2 = JSON.parse(arrText2);
const byID2 = {};
for (const c of cases2) byID2[c.CaseID] = c;

let ok = 0;
for (const cid of BATCH_IDS) {
  const c = byID2[cid];
  if (c && c.question_state === 'Certified' && c.certification_session === 'P2-HAND-SOLVE-WAVE') {
    ok++;
  } else {
    console.error(`POST-FAIL: ${cid} not certified`);
    process.exit(1);
  }
}
console.log(`POST-VERIFY: ${ok}/${BATCH_IDS.length} cases Certified`);