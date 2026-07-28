const fs = require("fs");

const files = [
  "scored_cases.js",
  "scored_cases2.js",
  "scored_cases3.js",
  "scored_cases4.js",
  "scored_cases5.js",
];

files.forEach((f) => {
  const c = fs.readFileSync(f, "utf8");
  const lines = c.split("\n");
  let count = 0;
  console.log(`${f}:`);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match lines like: `   1405: "value"` or `   1405: 'value'`
    const m = line.match(/^(\s*)(\d+):\s*["'](.+)/);
    if (m) {
      count++;
      const val = m[3].length > 60 ? m[3].substring(0, 60) + "..." : m[3];
      console.log(`  L${i + 1}: indent=${m[1].length} num=${m[2]} val="${val}"`);
    }
  }
  console.log(`  Total: ${count} numeric keys`);
});
