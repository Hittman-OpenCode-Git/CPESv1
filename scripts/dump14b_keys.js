const A = require('./tier3_wave14a.js');
const B = require('./tier3_wave14b.js');
const C = require('./tier3_wave14c.js');
for (const it of [...A, ...B, ...C]) {
  console.log(`${it.QuestionID} CC=${it.CorrectChoice} DS=${it.DifficultyScore} CL=${it.CognitiveLevel} A[${(it.Choices.A||'').slice(0,60)}]`);
}