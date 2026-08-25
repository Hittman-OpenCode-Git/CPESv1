// Script 7 — Readiness Scorer
// Computes READY / MINOR_FIX / REMEDIATE / BLOCKED per Framework v2 state machine
// Output: scripts/output/readiness_scoring.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const ir = require('./engine/identity_resolver');

const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

const READINESS_STATES = {
  BLOCKED: { label: 'BLOCKED', order: 0, description: 'Failed identity validation or JSON integrity' },
  REMEDIATE: { label: 'REMEDIATE', order: 1, description: 'Has structural/content defects requiring fix' },
  READY: { label: 'READY', order: 2, description: 'All gates pass, ready for Quality Board review' },
  CERTIFY: { label: 'CERTIFY', order: 3, description: 'Quality Board approved, ready for certification' }
};

function scoreReadiness(rootDir, scanArtifactPath) {
  const timestamp = new Date().toISOString();
  let scanArtifact = null;

  if (scanArtifactPath && fs.existsSync(scanArtifactPath)) {
    try {
      scanArtifact = JSON.parse(fs.readFileSync(scanArtifactPath, 'utf8'));
    } catch (e) {
      console.log(`Could not load scan artifact from ${scanArtifactPath}: ${e.message}`);
    }
  }

  // Currency guard (DL-045 doctrine): a stale gate artifact must never feed
  // readiness scoring silently.
  if (scanArtifact && Array.isArray(scanArtifact.perItemResults)) {
    const stale = [];
    for (const packName of PACKS) {
      const key = `pack_${packName}_corrected.js`;
      const recorded = scanArtifact.packFileHashes ? scanArtifact.packFileHashes[key] : undefined;
      const current = pr.getPackFileHash(packName, rootDir);
      if (!recorded || recorded === 'ERROR' || recorded !== current) stale.push(key);
    }
    if (stale.length > 0) {
      throw new Error(`STALE SCAN ARTIFACT — pack hashes diverge for: ${stale.join(', ')}. Re-run scripts/scan_orchestrator.js before scoring.`);
    }
    if (scanArtifact.aggregateStatistics && scanArtifact.aggregateStatistics.totalScanned === 0) {
      throw new Error('EMPTY SCAN ARTIFACT — upstream pipeline scanned zero items. Scoring refused (DL-045).');
    }
  }

  const results = {
    sessionId: 'S322',
    timestamp,
    upstreamEvidence: scanArtifact ? {
      artifactId: scanArtifact.artifactId || null,
      artifactTimestamp: scanArtifact.timestamp || null,
      packFileHashes: scanArtifact.packFileHashes || null
    } : null,
    packFileHashes: Object.fromEntries(PACKS.map(p => [p, pr.getPackFileHash(p, rootDir)])),
    portfolioReadiness: {
      readinessScore: 0.0,
      readinessStatus: 'BLOCKED',
      byState: { BLOCKED: 0, REMEDIATE: 0, READY: 0, CERTIFY: 0 }
    },
    perDomain: {},
    perPack: {},
    items: []
  };

  let totalInScope = 0;
  let readyOrCertify = 0;
  const domainData = {};

  for (const packName of PACKS) {
    let items;
    try {
      items = pr.parsePackFile(packName, rootDir);
    } catch (e) { continue; }

    const packValid = items.filter(i => i.QuestionID);
    const packResult = { total: packValid.length, BLOCKED: 0, REMEDIATE: 0, READY: 0, CERTIFY: 0 };

    for (const item of packValid) {
      const qid = item.QuestionID;
      const section = item.Section || '?';
      const domain = section;
      const compoundKey = ir.resolveCompoundKey(item, packName);
      totalInScope++;

      if (!domainData[domain]) {
        domainData[domain] = { total: 0, ready: 0, blocked: 0, remediate: 0, certify: 0 };
      }
      domainData[domain].total++;

      // Determine readiness state
      let state = 'BLOCKED';
      let blockReason = '';

      // Check if item is already Certified
      if (item.question_state === 'Certified') {
        state = 'CERTIFY';
      } else if (item.question_state === 'Archived') {
        state = 'BLOCKED';
        blockReason = 'Item is Archived';
      } else if (item.question_state === 'Unprocessed') {
        // Check scan artifact if available
        if (scanArtifact) {
          const scanResult = (scanArtifact.perItemResults || []).find(
            r => r.qid === qid && r.pack === packName
          );
          if (scanResult && scanResult.overallVerdict === 'PASS') {
            state = 'READY';
          } else {
            state = 'REMEDIATE';
            if (scanResult) {
              blockReason = scanResult.defectFlags.join('; ');
            }
          }
        } else {
          state = 'REMEDIATE';
          blockReason = 'No scan artifact — requires Gate pipeline run';
        }
      }

      results.portfolioReadiness.byState[state]++;
      packResult[state]++;

      if (state === 'READY' || state === 'CERTIFY') {
        readyOrCertify++;
        domainData[domain].ready++;
      } else if (state === 'BLOCKED') {
        domainData[domain].blocked++;
      } else if (state === 'REMEDIATE') {
        domainData[domain].remediate++;
      } else if (state === 'CERTIFY') {
        domainData[domain].certify++;
      }

      results.items.push({
        qid,
        pack: packName,
        section,
        domain,
        compoundKey,
        readinessState: state,
        blockReason,
        transitionPath: state === 'BLOCKED' ? 'BLOCKED → REMEDIATE (fix defects and re-run pipeline)' :
                       state === 'REMEDIATE' ? 'REMEDIATE → READY (fix defects and re-scan)' :
                       state === 'READY' ? 'READY → CERTIFY (Quality Board review required)' :
                       'Already Certified',
        eligibleForCertification: state === 'READY'
      });
    }

    results.perPack[packName] = packResult;
  }

  results.portfolioReadiness.readinessScore = totalInScope > 0
    ? (readyOrCertify / totalInScope).toFixed(4)
    : 0;

  const score = parseFloat(results.portfolioReadiness.readinessScore);
  if (score >= 0.95) results.portfolioReadiness.readinessStatus = 'READY';
  else if (score >= 0.70) results.portfolioReadiness.readinessStatus = 'IN_PROGRESS';
  else if (score >= 0.50) results.portfolioReadiness.readinessStatus = 'NEEDS_WORK';
  else results.portfolioReadiness.readinessStatus = 'BLOCKED';

  for (const [domain, data] of Object.entries(domainData)) {
    data.readinessScore = data.total > 0 ? (data.ready / data.total).toFixed(4) : 0;
    results.perDomain[domain] = data;
  }

  return results;
}

function runSelfTest() {
  console.log('=== Readiness Scorer Self-Test ===');
  // Packs live at content/packs/ since the repository reorganization.
  const rootDir = path.resolve(__dirname, '..', 'content', 'packs');

  let scanArtifactPath = path.join(OUTPUT_DIR, 'certification_scan_artifact.json');
  const results = scoreReadiness(rootDir, scanArtifactPath);

  console.log(`Portfolio readiness: ${results.portfolioReadiness.readinessScore} (${results.portfolioReadiness.readinessStatus})`);
  console.log(`States: ${JSON.stringify(results.portfolioReadiness.byState)}`);
  console.log(`Items scored: ${results.items.length}`);

  const domains = Object.keys(results.perDomain).sort();
  for (const d of domains.slice(0, 6)) {
    const dd = results.perDomain[d];
    console.log(`  Domain ${d}: ${dd.total} total, ${dd.ready} ready, ${dd.blocked} blocked (${dd.readinessScore})`);
  }

  const packEItems = results.items.filter(i => i.pack === 'pack_e');
  const packECertified = packEItems.filter(i => i.readinessState === 'CERTIFY').length;
  console.log(`Pack E certified: ${packECertified}/${packEItems.length}`);

  const pass = results.items.length >= 500 && Object.keys(results.perDomain).length >= 1;
  console.log(`Self-test: ${pass ? 'PASS' : 'FAIL'}`);
  return pass;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const ok = runSelfTest();
    process.exit(ok ? 0 : 1);
  }

  const rootDir = path.resolve(__dirname, '..', 'content', 'packs');
  let scanArtifactPath = path.join(OUTPUT_DIR, 'certification_scan_artifact.json');

  if (!fs.existsSync(scanArtifactPath)) {
    console.error('NO SCAN ARTIFACT — scoring without Gate-pipeline evidence is refused (DL-045 doctrine).');
    console.error('Run scripts/scan_orchestrator.js first.');
    process.exit(1);
  }

  console.log('Readiness Scorer — computing Framework v2 readiness states');

  let results;
  try {
    results = scoreReadiness(rootDir, scanArtifactPath);
  } catch (e) {
    console.error('SCORING REFUSED: ' + e.message);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'readiness_scoring.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Portfolio: ${results.portfolioReadiness.readinessScore} — ${results.portfolioReadiness.readinessStatus}`);
  console.log(`States: ${JSON.stringify(results.portfolioReadiness.byState)}`);
  console.log(`Output: ${outPath}`);
}

module.exports = { scoreReadiness, runSelfTest };
