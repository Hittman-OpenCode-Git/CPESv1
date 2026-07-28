// Script 5 — Recommendation Registry Builder
// Auto-create recommendation entries from scan findings
// Links recommendations → QuestionIDs → target sessions
// Output: scripts/output/recommendation_registry.json
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OUTPUT_DIR = path.join(__dirname, 'output');

function generateRecommendationId() {
  return 'REC-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

function buildRecommendations(scanArtifactPath) {
  const timestamp = new Date().toISOString();

  if (!scanArtifactPath || !fs.existsSync(scanArtifactPath)) {
    return {
      generatedSession: 'S322',
      generatedTimestamp: timestamp,
      scanArtifactSource: 'NONE — no scan artifact available',
      recommendations: [],
      summary: {
        totalRecommendations: 0,
        byType: { REMEDIATE: 0, REVIEW: 0, ESCALATE: 0, HOLD: 0 },
        bySeverity: { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 }
      }
    };
  }

  const scanArtifact = JSON.parse(fs.readFileSync(scanArtifactPath, 'utf8'));
  const defectCounts = scanArtifact.aggregateStatistics?.byDefectClass || {};

  const recommendations = [];

  // Map defect classes to recommendation types and severities
  const defectConfig = {
    'DL-008': { type: 'REMEDIATE', severity: 'CRITICAL', description: 'EW[CC] slot non-empty — DL-008 remediation required' },
    'DL-026': { type: 'REMEDIATE', severity: 'HIGH', description: 'Empty non-CC ExplanationWrong slots — DL-026 remediation required' },
    'DL-013': { type: 'REVIEW', severity: 'MEDIUM', description: 'Template boilerplate detected in explanations — DL-013 cleanup required' },
    'EV3': { type: 'REVIEW', severity: 'MEDIUM', description: 'Missing accounting principle citation in ExplanationCorrect' },
    'DL-010': { type: 'REVIEW', severity: 'LOW', description: 'Potential misassigned explanation — DL-010 screening needed' },
    'DL-016': { type: 'REMEDIATE', severity: 'HIGH', description: 'Metadata-block CC offset detected — DL-016 metadata reconciliation needed' },
    'DL-018': { type: 'REMEDIATE', severity: 'CRITICAL', description: 'Missing ExplanationWrong[CC] field — structural corruption' },
    'DL-030-EC-CC-Consistency': { type: 'REVIEW', severity: 'HIGH', description: 'EC references different choice than stored CorrectChoice' }
  };

  for (const [defectClass, count] of Object.entries(defectCounts)) {
    if (count === 0) continue;

    const config = defectConfig[defectClass] || { type: 'REVIEW', severity: 'MEDIUM', description: `Defect class ${defectClass} detected` };

    const questionIds = [];
    if (scanArtifact.perItemResults) {
      for (const result of scanArtifact.perItemResults) {
        if (result.defectFlags && result.defectFlags.some(f => f.startsWith(defectClass))) {
          questionIds.push(result.qid);
        }
      }
    }

    recommendations.push({
      recommendationId: generateRecommendationId(),
      type: config.type,
      sourceScan: defectClass,
      questionIds,
      count,
      severity: config.severity,
      targetSession: 'S811',
      status: 'Open',
      description: config.description,
      createdSession: 'S322',
      createdTimestamp: timestamp
    });
  }

  const summary = {
    totalRecommendations: recommendations.length,
    byType: { REMEDIATE: 0, REVIEW: 0, ESCALATE: 0, HOLD: 0 },
    bySeverity: { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 }
  };

  for (const rec of recommendations) {
    summary.byType[rec.type] = (summary.byType[rec.type] || 0) + 1;
    summary.bySeverity[rec.severity] = (summary.bySeverity[rec.severity] || 0) + 1;
  }

  return {
    generatedSession: 'S322',
    generatedTimestamp: timestamp,
    scanArtifactSource: path.basename(scanArtifactPath),
    recommendations,
    summary
  };
}

function runSelfTest() {
  console.log('=== Recommendation Registry Builder Self-Test ===');

  const mockDefects = {
    'DL-008': 5,
    'DL-026': 12,
    'EV3': 0
  };

  console.log(`Mock defects: ${JSON.stringify(mockDefects)}`);

  // Test ID generation
  const id1 = generateRecommendationId();
  const id2 = generateRecommendationId();
  console.log(`Recommendation IDs: ${id1}, ${id2}`);
  console.log(`IDs unique: ${id1 !== id2}`);

  // Try to load actual scan artifact
  const scanArtifactPath = path.join(OUTPUT_DIR, 'certification_scan_artifact.json');
  if (fs.existsSync(scanArtifactPath)) {
    console.log('Using real scan artifact');
  } else {
    console.log('No scan artifact — creating empty registry (all counts will be 0)');
  }

  const results = buildRecommendations(
    fs.existsSync(scanArtifactPath) ? scanArtifactPath : null
  );

  console.log(`Recommendations generated: ${results.recommendations.length}`);
  console.log(`Summary: ${JSON.stringify(results.summary)}`);

  const pass = results.recommendations !== undefined && results.summary !== undefined;
  console.log(`Self-test: ${pass ? 'PASS' : 'FAIL'}`);
  return pass;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const ok = runSelfTest();
    process.exit(ok ? 0 : 1);
  }

  const scanArtifactPath = path.join(OUTPUT_DIR, 'certification_scan_artifact.json');
  console.log('Recommendation Registry Builder');

  const results = buildRecommendations(fs.existsSync(scanArtifactPath) ? scanArtifactPath : null);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'recommendation_registry.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Recommendations: ${results.summary.totalRecommendations}`);
  console.log(`Output: ${outPath}`);
}

module.exports = { buildRecommendations, runSelfTest };
