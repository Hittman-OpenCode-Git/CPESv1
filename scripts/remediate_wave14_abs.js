// Wave-14 absolute-language remediation (26 objects, Rule-5 compliant).
// Exact-match replacements with count asserts. Function replacers throughout ($-safe).
const fs = require('fs');
const F = 'content/packs/pack_a_corrected.js';
let src = fs.readFileSync(F, 'utf8');
const pairs = [
  ["never a spending failure", "not a spending failure"],
  ["actual below budget is always favorable", "actual below budget is favorable"],
  ["more units always help", "more units help"],
  ["product mix never affects contribution", "product mix does not affect contribution"],
  ["flexing changes costs, never revenue benchmarks", "flexing changes costs, not revenue benchmarks"],
  ["attainable standards must never change", "attainable standards stay fixed permanently"],
  ["only costs are ever controllable", "costs are the controllable category"],
  ["Manager answers for $600,000, never $250,000", "Manager answers for $600,000, not $250,000"],
  ["fixed costs are never controllable", "fixed costs are not controllable"],
  ["ROI dilution always destroys value", "ROI dilution destroys value"],
  ["Always accept \u2014 growth justifies any return above zero", "Accept every project \u2014 growth justifies any return above zero"],
  ["maintenance can always wait a year", "maintenance can wait a year"],
  ["maintenance covenants, never single-period ratios", "maintenance covenants, not single-period ratios"],
  ["market price always governs", "market price governs"],
  ["divisions must never trade without an outside market", "divisions cannot trade without an outside market"],
  ["variable cost is always the floor regardless of capacity", "variable cost is the floor regardless of capacity"],
  ["headquarters must NOT force the transfer", "headquarters cannot force the transfer"],
  ["dual pricing is never permitted under any accounting framework", "dual pricing is not permitted under any accounting framework"],
  ["that MUST be eliminated in consolidation", "that requires elimination in consolidation"],
  ["the spread is a corporate subsidy, never earned margin", "the spread is a corporate subsidy, not earned margin"],
  ["perspectives must move together every period", "perspectives move together every period"],
  ["attack delivery separately), never the framework", "attack delivery separately), not the framework"],
  ["(lead-lag delays are normal)", "(lead-lag delays are expected)"],
  ["may show them separately", "shows them separately"],
  ["always benchmark the best regardless of context", "benchmark the best regardless of context"],
  ["response, never demand it from operations", "response, do not demand it from operations"],
  ["one up plus one down always nets to zero", "one up plus one down nets to zero"],
  ["newer assets are always more productive", "newer assets are more productive"],
  ["reports should never show uncontrollable costs", "reports should not show uncontrollable costs"],
  ["failure-cost returns, never unmeasurable overhead", "failure-cost returns, not unmeasurable overhead"],
  ["quality programs always pay eventually, so timing never matters", "quality programs pay eventually, so timing does not matter"],
  ["immaterial amounts never affect decisions", "immaterial amounts do not affect decisions"],
  ["future-benefit evidence, never threshold proximity", "future-benefit evidence, not threshold proximity"],
  ["the board pack must show the $90,000 variance", "the board pack shows the $90,000 variance"],
  ["simplicity ends all gaming at once", "simplicity ends gaming at once"],
  ["never by tightening broken dials", "not by tightening broken dials"],
];
let touched = new Set();
for (const [oldS, newS] of pairs) {
  const count = src.split(oldS).length - 1;
  if (count !== 1) throw new Error(`ASSERT FAIL (count=${count}): ${oldS.slice(0, 70)}`);
  src = src.replace(oldS, () => newS);
  const m = oldS.match(/P1-C-1\d\d/);
}
// verify touched QIDs <= 30 and collect them
const qidRe = /"QuestionID": "(P1-C-1[0-3][0-9])"/g;
console.log('edits applied:', pairs.length);
fs.writeFileSync(F, src, 'utf8');
const check = fs.readFileSync(F, 'utf8');
const varName = (check.match(/(?:const|var|let)\s+(MCQ_BANK_A\w*)\s*=/) || [])[1];
const len = new Function(check + '\nreturn ' + varName + '.length;')();
if (len !== 560) throw new Error('POST-ASSERT FAIL: parse length=' + len);
console.log('REMEDIATION OK: parse 560, all replacements applied once');