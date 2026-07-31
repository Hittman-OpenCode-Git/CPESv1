// Prepare audit batches for Session 93P task agents
const fs = require('fs');
const path = require('path');

const sample = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'output', 'SESSION093P_AUDIT_SAMPLE.json'), 'utf8'
));

// Combine and shuffle (maintain seed stability with fixed order for reproducibility)
const allItems = [...sample.evaluate.sample, ...sample.analyze.sample];

// Split into 6 batches of 25
const batchSize = 25;
const batches = [];
for (let i = 0; i < allItems.length; i += batchSize) {
  batches.push(allItems.slice(i, i + batchSize));
}

const criteria = {
  evaluate: {
    required: [
      "Decision maker — a named stakeholder with a role making a choice",
      "Competing alternatives — explicit trade-offs, not a single calculable answer",
      "Judgment under uncertainty — no single deterministic rule; requires weighing factors",
      "Selection of best option — candidate must choose among multiple defensible options"
    ],
    indicators: [
      "Multiple factors to weigh (e.g., cost vs. quality vs. time)",
      "Scenario with ambiguity (not all data given; must infer)",
      "Professional judgment language ('recommend', 'assess', 'evaluate')",
      "No single formula produces the answer directly"
    ],
    counterIndicators: [
      "Single calculation step produces answer",
      "Known rule/standard directly applied (e.g., 'Under ASC 606...')",
      "Definition matching (stem describes concept, answer is the concept name)",
      "One-step lookup or comparison"
    ]
  },
  analyze: {
    required: [
      "Cause-effect analysis — identifying why something happened",
      "Pattern recognition — identifying relationships across data points",
      "Relationship evaluation — understanding how parts connect",
      "Decomposition — breaking down a complex situation into components"
    ],
    indicators: [
      "Multiple data points to interpret",
      "'Why' or 'how' question framing",
      "Requires identifying relationships between variables",
      "Variance analysis, trend analysis, ratio interpretation patterns"
    ],
    counterIndicators: [
      "Single-step retrieval of a known fact",
      "Direct application of a defined rule without interpretation",
      "Definition-to-term matching without analysis",
      "One-step calculation with no interpretation"
    ]
  },
  apply: {
    indicators: [
      "Known rule directly applied",
      "Known procedure followed step-by-step",
      "Known formula with number substitution",
      "Single correct process yields the answer",
      "No judgment between competing alternatives"
    ]
  }
};

// Write each batch to a file
const outputDir = path.join(__dirname, 'output', '093p_batches');
fs.mkdirSync(outputDir, { recursive: true });

for (let i = 0; i < batches.length; i++) {
  const batch = {
    batchId: `B${i + 1}`,
    itemCount: batches[i].length,
    items: batches[i].map(item => ({
      qid: item.qid,
      pack: item.pack,
      section: item.section,
      labeledCognitiveLevel: item.cognitiveLevel,
      topic: item.topic,
      difficulty: item.difficulty,
      stem: item.stem,
      choices: item.choices,
      correctChoice: item.correctChoice,
    })),
  };
  fs.writeFileSync(
    path.join(outputDir, `batch_${i + 1}.json`),
    JSON.stringify(batch, null, 2)
  );
  console.log(`Batch ${i + 1}: ${batches[i].length} items`);
}

// Also write criteria to a separate file
fs.writeFileSync(
  path.join(outputDir, 'criteria.json'),
  JSON.stringify(criteria, null, 2)
);

console.log(`\nTotal: ${allItems.length} items across ${batches.length} batches`);
console.log(`Output directory: ${outputDir}`);
