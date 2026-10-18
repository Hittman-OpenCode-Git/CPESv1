const fs = require('fs');
const content = fs.readFileSync('pack_p2_f.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  if (line.includes('P2-F-171') || line.includes('P2-F-195')) {
    console.log(i+1, line.trim());
  }
});