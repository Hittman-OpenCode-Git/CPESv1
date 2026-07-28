/**
 * Certification Audit Builder v1.0 — SESSION 750, Board C
 *
 * Generates complete certification audit chains from existing data:
 * Question → Certification → Recommendation → Session → Challenge → Closure
 *
 * Run: node scripts/certification_audit_builder.js [--json] [--qid <QuestionID>]
 *
 * Output: Structured certification audit chain in JSON format.
 * Supports investigative traceability for any single question.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const REVISION_HISTORY = path.join(ROOT, "knowledge", "REVISION_HISTORY.md");
const DEFECT_LIBRARY = path.join(ROOT, "knowledge", "DEFECT_LIBRARY.md");

// ── Audit chain model ───────────────────────────────────────────

/**
 * Certification Audit Chain structure:
 *
 * Question
 *   ├── QuestionID, Stem, CorrectChoice, question_state
 *   ├── Certification (when + who + verification dimensions)
 *   ├── Recommendations (REC-IDs linked to this QID)
 *   ├── Sessions (session IDs that touched this QID)
 *   ├── Challenges (CH-IDs raised against this QID)
 *   └── Closure (resolution status)
 */

function extractRevisionEntries() {
  if (!fs.existsSync(REVISION_HISTORY)) return [];
  const text = fs.readFileSync(REVISION_HISTORY, "utf-8");
  const entries = [];
  // Use matchAll to find header positions + content between them
  const headerRe = /^## Session (\d+)[^\n]*/gm;
  const matches = [...text.matchAll(headerRe)];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const sessionNum = match[1];
    const headerStart = match.index;
    const nextStart = (i + 1 < matches.length) ? matches[i + 1].index : text.length;
    const section = text.substring(headerStart, nextStart);
    const dateMatch = match[0].match(/(\d{4}-\d{2}-\d{2})/);
    const entry = {
      session: sessionNum,
      date: dateMatch ? dateMatch[0] : null,
      qids: [],
      raw: section.substring(0, 2000)
    };
    const qidRe = /P1[A-E]-[A-Z]{1,3}-\d{2,3}|CBQ\d*-[A-F]\d*/g;
    let m;
    while ((m = qidRe.exec(section)) !== null) {
      if (!entry.qids.includes(m[0])) entry.qids.push(m[0]);
    }
    entries.push(entry);
  }
  return entries;
}

function extractDefectReferences() {
  if (!fs.existsSync(DEFECT_LIBRARY)) return {};
  const text = fs.readFileSync(DEFECT_LIBRARY, "utf-8");
  const defectMap = {};
  // Match: ## DL-NNN followed by content. Capture DL number from header.
  const dlHeaderRe = /^## DL-(\d+)/gm;
  const dlMatches = [...text.matchAll(dlHeaderRe)];
  for (let i = 0; i < dlMatches.length; i++) {
    const match = dlMatches[i];
    const dlNum = match[1];
    const dlId = "DL-" + dlNum;
    const blockStart = match.index;
    const nextStart = (i + 1 < dlMatches.length) ? dlMatches[i + 1].index : text.length;
    const block = text.substring(blockStart, nextStart);
    const statusMatch = block.match(/Status\s+([A-Za-z\s-]+)/);
    const severityMatch = block.match(/Severity\s+([A-Za-z]+)/);
    defectMap[dlId] = {
      id: dlId,
      status: statusMatch ? statusMatch[1].trim() : "Unknown",
      severity: severityMatch ? severityMatch[1].trim() : "Unknown"
    };
  }
  return defectMap;
}

function buildAuditChain(qid, revisionEntries, defectMap) {
  const chain = {
    question: { QuestionID: qid, investigationLevel: 1 },
    certification: { certified: false, entries: [] },
    recommendations: [],
    sessions: [],
    challenges: [],
    defects: [],
    closure: { status: "UNKNOWN", recommendation: null }
  };

  // Find sessions that reference this QID
  for (const entry of revisionEntries) {
    if (entry.qids.includes(qid)) {
      chain.sessions.push({ session: entry.session, date: entry.date });
      const raw = entry.raw;
      if (/question_state.*Certified/i.test(raw)) {
        chain.certification.entries.push({ session: entry.session, date: entry.date, action: "Certified" });
        chain.certification.certified = true;
      }
      if (/REC-\d+/i.test(raw)) {
        const recMatch = raw.match(/REC-\d+/gi);
        if (recMatch) {
          for (const rec of recMatch) {
            if (!chain.recommendations.includes(rec)) chain.recommendations.push(rec);
          }
        }
      }
      if (/CH-\d+/i.test(raw)) {
        const chMatch = raw.match(/CH-\d+/gi);
        if (chMatch) {
          for (const ch of chMatch) {
            if (!chain.challenges.includes(ch)) chain.challenges.push(ch);
          }
        }
      }
      if (/DL-\d+/i.test(raw)) {
        const dlMatch = raw.match(/DL-\d+/g);
        if (dlMatch) {
          for (const dl of dlMatch) {
            if (!chain.defects.includes(dl)) chain.defects.push(dl);
          }
        }
      }
    }
  }

  // Enrich defects with status from library
  chain.defects = chain.defects.map(d => defectMap[d] ? { id: d, ...defectMap[d] } : { id: d, status: "Unknown" });

  // Determine closure
  if (chain.certification.certified) {
    chain.closure.status = "CLOSED";
    chain.closure.recommendation = "Certified — in learner delivery pool.";
  } else if (chain.sessions.length > 0) {
    chain.closure.status = "IN_PROGRESS";
    chain.closure.recommendation = "Under audit — review and remediate before certification.";
  } else {
    chain.closure.status = "UNPROCESSED";
    chain.closure.recommendation = "No audit sessions found. Requires initial review.";
  }

  return chain;
}

// ── Main Builder ────────────────────────────────────────────────

function runAuditBuilder(qid) {
  const revisionEntries = extractRevisionEntries();
  const defectMap = extractDefectReferences();

  if (qid) {
    return buildAuditChain(qid, revisionEntries, defectMap);
  }

  // Build chains for all QIDs referenced in revision history
  const allQids = new Set();
  for (const entry of revisionEntries) {
    for (const q of entry.qids) {
      allQids.add(q);
    }
  }

  const chains = [];
  for (const q of [...allQids].slice(0, 100)) {
    chains.push(buildAuditChain(q, revisionEntries, defectMap));
  }

  return {
    builder: "Certification Audit Builder v1.0",
    timestamp: new Date().toISOString(),
    totalChains: chains.length,
    certifiedCount: chains.filter(c => c.certification.certified).length,
    uncertifiedCount: chains.filter(c => !c.certification.certified).length,
    chains
  };
}

// ── CLI ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const useJSON = args.includes("--json");
const qidArg = args.find(a => a.startsWith("--qid="));
const qid = qidArg ? qidArg.split("=")[1] : null;

const result = runAuditBuilder(qid);

if (useJSON) {
  console.log(JSON.stringify(result, null, 2));
} else {
  if (qid) {
    console.log(`\n=== CERTIFICATION AUDIT CHAIN: ${qid} ===\n`);
    console.log(`  Certification: ${result.certification.certified ? "Certified" : "Not Certified"}`);
    console.log(`  Sessions: ${result.sessions.length}`);
    console.log(`  Recommendations: ${result.recommendations.join(", ") || "None"}`);
    console.log(`  Challenges: ${result.challenges.join(", ") || "None"}`);
    console.log(`  Defects: ${result.defects.map(d => d.id).join(", ") || "None"}`);
    console.log(`  Closure: ${result.closure.status} — ${result.closure.recommendation}\n`);
  } else {
    console.log(`\n=== CERTIFICATION AUDIT BUILDER v1.0 ===\n`);
    console.log(`  Total Audit Chains: ${result.totalChains}`);
    console.log(`  Certified: ${result.certifiedCount}`);
    console.log(`  Uncertified: ${result.uncertifiedCount}\n`);
  }
}

module.exports = { runAuditBuilder, buildAuditChain, extractRevisionEntries, extractDefectReferences };
