const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'p2', 'case_pack_p2_1.js');
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

const CERT_SESSION = 'P2-PACK1-CERT-W2';
const CERT_DATE = '2026-09-04';

const newIds = ['CBQ21-B6','CBQ21-C7','CBQ21-D4','CBQ21-E5','CBQ21-F5'];
const byID = {};
for (const c of cases) byID[c.CaseID] = c;

let flipped = 0;
for (const cid of newIds) {
  const c = byID[cid];
  if (!c) { console.error('NOT FOUND:', cid); continue; }
  if (c.question_state !== 'Unprocessed') { console.error('NOT UNPROCESSED:', cid, c.question_state); continue; }
  c.question_state = 'Certified';
  c.certification_session = CERT_SESSION;
  c.certification_date = CERT_DATE;
  flipped += (c.Items||[]).length;
  console.log('  ✓', cid, '→ Certified (', (c.Items||[]).length, 'items )');
}
console.log('Total flipped:', flipped, 'items across', newIds.length, 'cases');
if (flipped !== 30) { console.error('Expected 30, got', flipped); process.exit(1); }

function serializeCase(c, indent) {
  const nl = '\n', pad = ' '.repeat(indent);
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

let newText = '[\n';
for (let i = 0; i < cases.length; i++) {
  newText += serializeCase(cases[i], 4);
  newText += i < cases.length - 1 ? ',\n' : '\n';
}
newText += ']';

const before = raw.slice(0, arrStart);
// Find the ];\n after the array close
const afterStart = arrStart + arrText.length;
const after = raw.slice(afterStart);
fs.writeFileSync(FILE, before + newText + after, 'utf8');
console.log('Wrote', FILE, ':', fs.statSync(FILE).size, 'bytes');
