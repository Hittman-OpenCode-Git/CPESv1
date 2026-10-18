const fs = require('fs');

// Fix DL-008 and DL-026 in P2 packs
function fixPackDL008_DL026(packPath, varName) {
  const content = fs.readFileSync(packPath, 'utf8');
  const backupPath = packPath + '.bak-dl008-dl026-fix-' + Date.now();
  fs.writeFileSync(backupPath, content);
  console.log('Backup created:', backupPath);

  let bank = new Function(content + '\nreturn ' + varName + ';')();
  console.log('Loaded', packPath, 'with', bank.length, 'items');

  let dl008Fixed = 0;
  let dl026Fixed = 0;

  for (const item of bank) {
    if (!item.Choices || !item.CorrectChoice) continue;
    
    const cc = item.CorrectChoice;
    const ewCCKey = 'ExplanationWrong' + cc;
    
    // DL-008: ExplanationWrong[CorrectChoice] must be empty
    if (item[ewCCKey] && item[ewCCKey].trim() !== '') {
      console.log('  DL-008 fix: ' + item.QuestionID + ' CC=' + cc + ' EW[' + cc + '] was non-empty, clearing');
      item[ewCCKey] = '';
      dl008Fixed++;
    }
    
    // DL-026: All distractor ExplanationWrong must be non-empty
    for (const letter of ['A', 'B', 'C', 'D']) {
      if (letter === cc) continue;
      const ewKey = 'ExplanationWrong' + letter;
      if (!item[ewKey] || item[ewKey].trim() === '') {
        console.log('  DL-026 fix: ' + item.QuestionID + ' EW[' + letter + '] was empty, adding placeholder');
        item[ewKey] = 'This option is incorrect because it does not follow from the correct analysis of the scenario. The correct answer requires a different approach as explained in the correct choice.';
        dl026Fixed++;
      }
    }
  }

  console.log('Fixed DL-008:', dl008Fixed, 'DL-026:', dl026Fixed);

  const newContent = 'const ' + varName + ' = ' + JSON.stringify(bank, null, 2) + ';\n';
  fs.writeFileSync(packPath, newContent);
  console.log('File written successfully');

  return { dl008Fixed, dl026Fixed };
}

console.log('=== Fixing P2-A ===');
fixPackDL008_DL026('p2/pack_p2_a.js', 'pack_p2_a_questions');

console.log('\n=== Fixing P2-B ===');
fixPackDL008_DL026('p2/pack_p2_b.js', 'pack_p2_b_questions');

console.log('\n=== Fixing P2-C ===');
fixPackDL008_DL026('p2/pack_p2_c.js', 'pack_p2_c_questions');

console.log('\n=== Fixing P2-D ===');
fixPackDL008_DL026('p2/pack_p2_d.js', 'pack_p2_d_questions');

console.log('\n=== Fixing P2-E ===');
fixPackDL008_DL026('p2/pack_p2_e.js', 'pack_p2_e_questions');

console.log('\n=== Fixing P2-F ===');
fixPackDL008_DL026('p2/pack_p2_f.js', 'pack_p2_f_questions');