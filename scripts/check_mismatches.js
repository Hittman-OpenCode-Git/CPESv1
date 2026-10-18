const fs = require('fs');
const files = ['p2/case_pack_p2_1.js', 'p2/case_pack_p2_3.js'];
const scoreMap = { 1: 'Easy', 2: 'Moderate-Easy', 3: 'Moderate', 4: 'Difficult', 5: 'Very Difficult' };

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const varMatch = content.match(/(?:const|let|var)\s+(CASE_PACK_\d+)\s*=/);
  if (!varMatch) continue;
  const arrStart = content.indexOf('[', varMatch.index);
  let depth = 0, pos = arrStart;
  do { if (content[pos] === '[') depth++; if (content[pos] === ']') depth--; pos++; } while (depth > 0 && pos < content.length);
  const jsStr = content.substring(arrStart, pos);
  try { 
    const cases = JSON.parse(jsStr);
    for (const c of cases) {
      if (!c.Items) continue;
      for (const it of c.Items) {
        if (it.Difficulty !== undefined && it.DifficultyScore !== undefined) {
          const expected = scoreMap[it.DifficultyScore];
          if (expected && it.Difficulty !== expected) {
            console.log(f + ' | ' + c.CaseID + '/' + it.ItemID + ' | Difficulty=' + it.Difficulty + ' | DifficultyScore=' + it.DifficultyScore + ' | Expected=' + expected);
          }
        }
      }
    }
  } catch(e) {}
}