const c = require("./p2d_batch1_content.json");
const declareRe = /(?:the (?:correct )?answer (?:is|must be)|correct answer is|making option|option ([a-d]) (?:is|states) (?:the )?correct|is the correct answer|which is option ([a-d]))/i;
for (let i = 0; i < c.length; i++) {
  const it = c[i];
  const m = it.ec.match(declareRe);
  if (m) {
    const declared = (m[1] || m[2] || "").toUpperCase();
    if (declared && declared !== it.cc) {
      console.log(`item ${i + 1} (${it.qid || "?"}) cc=${it.cc} EC declares=${declared}`);
      console.log(`  EC: ${it.ec.slice(0, 160)}...`);
    }
  }
}
