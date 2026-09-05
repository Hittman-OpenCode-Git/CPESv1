const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';
const files = [
  ['p2/case_pack_p2_1.js', 'casePackP2_1'],
  ['p2/case_pack_p2_2.js', 'casePackP2_2'],
  ['p2/case_pack_p2_3.js', 'casePackP2_3']
];

const forbidden = ['always', 'never', 'impossible', 'all of the above', 'none of the above'];

for (const [rel, varName] of files) {
  const src = fs.readFileSync(base + '/' + rel, 'utf8');
  const arr = new Function(src + '\nreturn ' + varName + ';')();
  const unproc = arr.filter(c => c.question_state !== 'Certified');

  console.log('\n=== ' + rel + ' — ' + unproc.length + ' Unprocessed cases ===\n');

  for (const c of unproc) {
    const types = c.Items.map(i => i.Type);
    const cog = c.Items.map(i => i.CognitiveLevel + '(DS' + i.DifficultyScore + ')');

    // Cognitive progression check
    const bloomOrder = { 'Remember': 1, 'Understand': 2, 'Apply': 3, 'Analyze': 4, 'Evaluate': 5, 'Synthesize': 5 };
    const seq = c.Items.map(i => bloomOrder[i.CognitiveLevel]);
    const regressions = [];
    for (let i = 1; i < seq.length; i++) {
      if (seq[i] < seq[i-1]) regressions.push('item' + i + ': ' + c.Items[i-1].CognitiveLevel + ' -> ' + c.Items[i].CognitiveLevel);
    }

    // Forbidden terms check
    const forbiddenHits = [];
    for (const item of c.Items) {
      const choices = Array.isArray(item.Choices) ? item.Choices
                      : item.Choices && typeof item.Choices === 'object' ? Object.values(item.Choices)
                      : [];
      for (const choice of choices) {
        if (typeof choice === 'string') {
          for (const term of forbidden) {
            if (choice.toLowerCase().includes(term)) {
              forbiddenHits.push(item.ItemID + ': "' + term + '" in choice');
            }
          }
        }
      }
    }

    let status = 'OK';
    const issues = [];
    if (regressions.length) { status = 'COG-REGRESSION'; issues.push(regressions.join('; ')); }
    if (forbiddenHits.length) { status = (status === 'OK' ? '' : status + ' + ') + 'FORBIDDEN-TERMS'; issues.push(forbiddenHits.join('; ')); }

    console.log(c.CaseID + ': types=[' + types.join(',') + '] cog=[' + cog.join(',') + '] ' + status);
    if (issues.length) issues.forEach(i => console.log('  -> ' + i));
  }
}
