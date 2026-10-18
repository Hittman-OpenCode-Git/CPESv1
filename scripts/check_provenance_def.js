const fs = require('fs');
const path = require('path');

const qids = [
  'P2-D-198','P2-D-079','P2-D-294','P2-D-068','P2-D-073','P2-D-244','P2-D-069','P2-D-226',
  'P2-E-493','P2-E-069','P2-E-414','P2-E-080','P2-E-474','P2-E-191','P2-E-198','P2-E-426',
  'P2-F-312','P2-F-083','P2-F-407','P2-F-045','P2-F-265','P2-F-227','P2-F-233','P2-F-341'
];

const packs = ['pack_p2_d.js', 'pack_p2_e.js', 'pack_p2_f.js'];

packs.forEach(pack => {
  const content = fs.readFileSync(path.join('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2', pack), 'utf8');
  const clean = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const match = clean.match(/var\s+\w+\s*=\s*(\[[\s\S]*\])\s*;/);
  if (match) {
    try {
      const arr = eval('(' + match[1] + ')');
      arr.forEach(item => {
        if (qids.includes(item.QuestionID)) {
          const certBatch = item.certification_batch || item.certification_session || item.recertification_batch || 'NONE';
          const certDate = item.certification_date || item.recertification_date || 'NONE';
          console.log(`${item.QuestionID}|batch=${certBatch}|date=${certDate}|state=${item.question_state}|Part2OnlyFlag=${item.Part2OnlyFlag}`);
        }
      });
    } catch(e) {
      console.log(`Error parsing ${pack}: ${e.message}`);
    }
  }
});