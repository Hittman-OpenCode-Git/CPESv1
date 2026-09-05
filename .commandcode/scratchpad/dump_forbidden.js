const items = require("./p2d_batch1_items.json");
for (const q of ["P2-D-257", "P2-D-263"]) {
  const it = items.find(i => i.QuestionID === q);
  console.log(`${q} choices:`);
  for (const L of ["A", "B", "C", "D"]) {
    console.log(`  ${L}: ${it.Choices[L]}`);
  }
  console.log("");
}
