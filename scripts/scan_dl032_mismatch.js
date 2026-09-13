// DL-032 demand-based mismatch scan: find items where difficulty label contradicts demand signals
// Inflation signal: Remember/Understand + no calculation + Difficulty Difficult(4)
// Understatement signal: Evaluate + calculation + Difficulty Easy(1)/Moderate-Easy(2)
const fs = require('fs');
function load(f) {
  const src = fs.readFileSync(f, 'utf8');
  const s = src.indexOf('[');
  let d = 0, e = -1;
  for (let i = s; i < src.length; i++) {
    if (src[i] === '[') d++;
    else if (src[i] === ']') { d--; if (d === 0) { e = i; break; } }
  }
  return { arr: (new Function('return ' + src.substring(s, e + 1)))(), src };
}
const files = ['content/cases/legacy/scored_cases.js','content/cases/legacy/scored_cases2.js','content/cases/legacy/scored_cases3.js','content/cases/legacy/scored_cases4.js','content/cases/legacy/scored_cases5.js'];
const inflated = [];   // Difficult but low demand
const understated = []; // Easy/Mod-Easy but high demand
for (const f of files) {
  const { arr } = load(f);
  for (const c of arr) {
    for (const it of (c.Items || [])) {
      const cl = it.CognitiveLevel || '?';
      const ds = it.DifficultyScore;
      const calc = it.CalculationRequired;
      const id = c.CaseID + '/' + (it.ItemID || '?');
      if (ds === 4 && (cl === 'Remember' || cl === 'Understand') && calc === false) {
        inflated.push({ id, file: f, cl, calc, topic: it.Topic, prompt: (it.Prompt || '').substring(0, 120) });
      }
      if ((ds === 1 || ds === 2) && cl === 'Evaluate' && calc === true) {
        understated.push({ id, file: f, cl, calc, topic: it.Topic, prompt: (it.Prompt || '').substring(0, 120) });
      }
    }
  }
}
console.log('INFLATED (Difficult + Remember/Understand + no calc): ' + inflated.length);
for (const r of inflated) console.log('  ' + r.id + ' [' + r.cl + '] ' + r.topic + ' :: ' + r.prompt);
console.log('UNDERSTATED (Easy/ModEasy + Evaluate + calc): ' + understated.length);
for (const r of understated) console.log('  ' + r.id + ' [' + r.cl + '] ' + r.topic + ' :: ' + r.prompt);
fs.writeFileSync('reports/DL032_demand_mismatch.json', JSON.stringify({ inflated, understated }, null, 2));