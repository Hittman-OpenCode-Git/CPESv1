const fs = require('fs');
const packs = [
  'p2/pack_p2_a.js',
  'p2/pack_p2_b.js',
  'p2/pack_p2_c.js',
  'p2/pack_p2_d.js',
  'p2/pack_p2_e.js',
  'p2/pack_p2_f.js'
];

for (const pack of packs) {
  const content = fs.readFileSync(pack, 'utf8');
  const ccMatches = content.match(/"CorrectChoice"\s*:\s*"([A-D])"/g);
  if (ccMatches) {
    const dist = {A:0,B:0,C:0,D:0};
    const letters = [];
    for (const m of ccMatches) {
      const letter = m.match(/"([A-D])"$/)[1];
      dist[letter]++;
      letters.push(letter);
    }
    console.log(pack + ': CorrectChoice distribution:', dist);
    
    // Check streaks
    let currentStreak = 1;
    let maxStreak = 1;
    let streakLetter = letters[0];
    for (let i = 1; i < letters.length; i++) {
      if (letters[i] === letters[i-1]) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
          streakLetter = letters[i];
        }
      } else {
        currentStreak = 1;
      }
    }
    console.log(pack + ': Max streak = ' + maxStreak + ' (' + streakLetter + ')');
    
    // Show all streaks > 4
    currentStreak = 1;
    for (let i = 1; i < letters.length; i++) {
      if (letters[i] === letters[i-1]) {
        currentStreak++;
        if (currentStreak > 4) {
          console.log('  Streak at index ' + (i - currentStreak + 1) + ': ' + currentStreak + 'x ' + letters[i]);
        }
      } else {
        currentStreak = 1;
      }
    }
  }
}