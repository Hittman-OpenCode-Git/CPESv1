const fs = require('fs');
const FILE = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/case_pack_p2_1.js';
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
const arr = JSON.parse(arrText);
console.log('Parse OK:', arr.length, 'cases');
let totalItems = 0, totalExhibits = 0, totalUnproc = 0, totalCert = 0;
for (const c of arr) {
  totalItems += (c.Items||[]).length;
  totalExhibits += (c.Exhibits||[]).length;
  if (c.question_state === 'Unprocessed') totalUnproc++;
  if (c.question_state === 'Certified') totalCert++;
}
console.log('Items:', totalItems, 'Exhibits:', totalExhibits);
console.log('Unprocessed:', totalUnproc, 'Certified:', totalCert);

let badChoices = 0;
for (const c of arr) for (const it of c.Items||[]) {
  if ((it.Type === 'select' || it.Type === 'multi') && (it.Choices && !Array.isArray(it.Choices))) {
    console.log('BAD:', c.CaseID, it.ItemID, 'choices not array');
    badChoices++;
  }
}
console.log('Non-array Choices:', badChoices);

let shortEx = 0;
for (const c of arr) for (const it of c.Items||[]) {
  if (typeof it.Explanation === 'string' && it.Explanation.length < 100) {
    console.log('SHORT EXPL:', c.CaseID, it.ItemID, it.Explanation.length, 'chars');
    shortEx++;
  }
}
console.log('Short explanations (<100 chars):', shortEx);
