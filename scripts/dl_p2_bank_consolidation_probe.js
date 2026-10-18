// DL-P2-* consolidation verify — pre-merge collision check for banks 4/5 → pack 2
const fs = require('fs');
const p2 = fs.readFileSync('p2/case_pack_p2_2.js', 'utf8');
const ids = [...p2.matchAll(/"CaseID": "(CBQ2[123]-[A-F]\d+)"/g)].map(m => m[1]);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
console.log('pack2 CaseIDs total:', ids.length, '| internal dups:', dup.length ? dup.join(',') : 'none');
const moving = ['CBQ22-A7','CBQ22-A8','CBQ22-F8','CBQ22-F9','CBQ22-F10','CBQ22-C9','CBQ22-C10','CBQ22-C11','CBQ22-C12','CBQ22-C13'];
const clash = moving.filter(id => ids.includes(id));
console.log('moving IDs collision with pack2:', clash.length ? 'CLASH: ' + clash.join(',') : 'none');
const bank = new Function(p2 + '; return casePackP2_2;')();
const st = {};
bank.forEach(c => st[c.question_state] = (st[c.question_state] || 0) + 1);
console.log('pack2 states:', JSON.stringify(st));
console.log('archived IDs in pack2:', bank.filter(c => c.question_state === 'Archived').map(c => c.CaseID).join(','));
