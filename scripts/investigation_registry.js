/**
 * Investigation Registry v1.0 — SESSION 252, Board D
 *
 * Manages formal investigations triggered by challenges, defect discoveries,
 * governance events, or systematic issues across the CMA Part 1 Exam Simulator.
 *
 * Lifecycle: OPEN → INVESTIGATING → ACTION_REQUIRED → RESOLVED → CLOSED
 *
 * Operations:
 *   --create              Create a new investigation manually
 *   --auto-create         Scan OPEN challenges and auto-create investigations
 *   --from-challenge=ID   Create from a specific challenge
 *   --from-defect=DL-XXX  Create from a known defect code
 *   --list                List investigations with filters
 *   --get=INV_ID          Get full investigation record
 *   --update=INV_ID       Update investigation status/findings/assignment
 *   --close=INV_ID        Close investigation with resolution
 *   --summary             Generate summary dashboard
 *   --stats               Generate detailed statistics
 *
 * Storage: scripts/output/investigation_registry.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const STORAGE_DIR = path.join(ROOT, "scripts", "output");
const STORAGE_FILE = path.join(STORAGE_DIR, "investigation_registry.json");
const CHALLENGE_FILE = path.join(STORAGE_DIR, "challenge_registry.json");

const VALID_TYPES = ["CHALLENGE", "DEFECT", "GOVERNANCE", "SYSTEMATIC"];
const VALID_STATUSES = ["OPEN", "INVESTIGATING", "ACTION_REQUIRED", "RESOLVED", "CLOSED"];
const VALID_RESOLUTION_TYPES = ["CONFIRMED_DEFECT", "CONFIRMED_VALID", "DUPLICATE", "INVALID", "NO_ACTION", "REMEDIATED", "DISMISSED"];
const VALID_SEVERITIES = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFORMATIONAL"];

// ── State Machine ────────────────────────────────────────────────

const STATE_TRANSITIONS = {
  OPEN: ["INVESTIGATING", "CLOSED"],
  INVESTIGATING: ["ACTION_REQUIRED", "RESOLVED", "CLOSED"],
  ACTION_REQUIRED: ["RESOLVED", "CLOSED"],
  RESOLVED: ["CLOSED"],
  CLOSED: []
};

const DEFECT_SEVERITY_MAP = {
  "DL-008": "HIGH",
  "DL-026": "HIGH",
  "DL-030": "CRITICAL",
  "DL-035": "HIGH",
  "DL-036": "MEDIUM",
  "DL-010": "HIGH",
  "DL-016": "HIGH",
  "DL-021": "HIGH",
  "DL-025": "HIGH",
  "DL-019": "HIGH",
  "DL-022": "HIGH",
  "DL-034": "CRITICAL"
};

const CHALLENGE_TYPE_TO_INV_TYPE = {
  "CONTENT_ERROR": "CHALLENGE",
  "TECHNICAL_ISSUE": "CHALLENGE",
  "ANSWER_DISPUTE": "CHALLENGE",
  "EXPLANATION_ISSUE": "CHALLENGE",
  "AMBIGUITY": "CHALLENGE",
  "OTHER": "CHALLENGE"
};

// ── Storage ──────────────────────────────────────────────────────

function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

function loadRegistry() {
  ensureStorageDir();
  if (!fs.existsSync(STORAGE_FILE)) {
    return {
      specId: "SESSION252_INVESTIGATION_REGISTRY_SPEC",
      board: "D",
      version: "1.0.0",
      generatedTimestamp: new Date().toISOString(),
      nextId: 1,
      investigations: []
    };
  }
  return JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8"));
}

function saveRegistry(registry) {
  ensureStorageDir();
  registry.generatedTimestamp = new Date().toISOString();
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(registry, null, 2), "utf-8");
}

function loadChallenges() {
  if (!fs.existsSync(CHALLENGE_FILE)) return null;
  return JSON.parse(fs.readFileSync(CHALLENGE_FILE, "utf-8"));
}

// ── ID Generation ────────────────────────────────────────────────

function generateId(registry) {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const seq = String(registry.nextId).padStart(3, "0");
  const id = `INV-${dateStr}-${seq}`;
  registry.nextId++;
  return id;
}

// ── Priority Derivation ──────────────────────────────────────────

function derivePriorityFromChallenge(challenge) {
  let priority = 50;

  if (challenge.priority === "HIGH") priority = 85;
  else if (challenge.priority === "MEDIUM") priority = 65;
  else if (challenge.priority === "LOW") priority = 40;

  const linkedDefects = challenge.linkedDefects || [];
  for (const d of linkedDefects) {
    const sev = DEFECT_SEVERITY_MAP[d];
    if (sev === "CRITICAL") priority = Math.max(priority, 100);
    else if (sev === "HIGH") priority = Math.max(priority, 85);
  }

  return Math.min(100, Math.max(1, priority));
}

function derivePriorityFromDefect(defectCode) {
  const sev = DEFECT_SEVERITY_MAP[defectCode];
  if (sev === "CRITICAL") return 100;
  if (sev === "HIGH") return 85;
  if (sev === "MEDIUM") return 65;
  return 50;
}

// ── Validation ───────────────────────────────────────────────────

function validateTransition(fromStatus, toStatus) {
  if (!VALID_STATUSES.includes(toStatus)) {
    throw new Error(`Invalid status: "${toStatus}". Valid: ${VALID_STATUSES.join(", ")}`);
  }
  if (!STATE_TRANSITIONS[fromStatus]) {
    throw new Error(`Invalid current status: "${fromStatus}"`);
  }
  if (!STATE_TRANSITIONS[fromStatus].includes(toStatus)) {
    throw new Error(
      `Invalid transition: ${fromStatus} → ${toStatus}. ` +
      `Valid transitions from ${fromStatus}: ${STATE_TRANSITIONS[fromStatus].join(", ") || "(terminal)"}`
    );
  }
}

function validateType(type) {
  if (!VALID_TYPES.includes(type)) {
    throw new Error(`Invalid type: "${type}". Valid: ${VALID_TYPES.join(", ")}`);
  }
}

function validateResolutionType(rt) {
  if (!VALID_RESOLUTION_TYPES.includes(rt)) {
    throw new Error(`Invalid resolution type: "${rt}". Valid: ${VALID_RESOLUTION_TYPES.join(", ")}`);
  }
}

function validateSeverity(s) {
  if (!VALID_SEVERITIES.includes(s)) {
    throw new Error(`Invalid severity: "${s}". Valid: ${VALID_SEVERITIES.join(", ")}`);
  }
}

// ── Timeline ─────────────────────────────────────────────────────

function recordTimeline(investigation, fromStatus, toStatus, note) {
  if (!investigation.timeline) investigation.timeline = [];
  investigation.timeline.push({
    timestamp: new Date().toISOString(),
    from_status: fromStatus,
    to_status: toStatus,
    author: process.env.USER || process.env.USERNAME || "system",
    note: note || `Status transition: ${fromStatus} → ${toStatus}`
  });
}

// ── Core Operations ──────────────────────────────────────────────

function createInvestigation(title, type, priority, options) {
  validateType(type);
  const registry = loadRegistry();
  const opts = options || {};

  const investigation = {
    id: generateId(registry),
    title,
    type,
    status: "OPEN",
    priority: Math.min(100, Math.max(1, priority || 50)),
    related_qids: opts.qids || [],
    related_challenges: opts.challenges || [],
    related_defects: opts.defects || [],
    related_recommendations: opts.recommendations || [],
    related_sessions: opts.sessions || ["S252"],
    related_governance_events: opts.governanceEvents || [],
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString(),
    assigned_to: opts.assignedTo || null,
    findings: [],
    resolution: null,
    resolution_date: null,
    resolution_type: null,
    resolution_author: null,
    resolution_session: null,
    metadata: {
      source: opts.source || "manual",
      tags: opts.tags || [],
      estimated_hours: opts.estimatedHours || null,
      blocking: opts.blocking || false
    },
    timeline: [{
      timestamp: new Date().toISOString(),
      from_status: null,
      to_status: "OPEN",
      author: process.env.USER || process.env.USERNAME || "system",
      note: opts.timelineNote || "Investigation created"
    }]
  };

  registry.investigations.push(investigation);
  saveRegistry(registry);
  return investigation;
}

function autoCreateInvestigations(minPriority) {
  const challenges = loadChallenges();
  if (!challenges || !challenges.challenges) {
    return { created: 0, investigations: [], message: "No challenge registry found" };
  }

  const threshold = minPriority || 80;
  const registry = loadRegistry();
  const created = [];

  const eligibleChallenges = challenges.challenges.filter(ch => {
    if (ch.status !== "OPEN" && ch.status !== "INVESTIGATING") return false;
    const pri = derivePriorityFromChallenge(ch);
    if (pri < threshold) return false;
    const linkedDefects = ch.linkedDefects || [];
    if (linkedDefects.length === 0) return false;

    const existing = registry.investigations.find(inv =>
      (inv.status === "OPEN" || inv.status === "INVESTIGATING") &&
      inv.related_qids.includes(ch.questionId) &&
      inv.related_challenges.includes(ch.challengeId)
    );
    return !existing;
  });

  for (const ch of eligibleChallenges) {
    const linkedDefects = ch.linkedDefects || [];
    const linkedRecs = ch.linkedRecommendations || [];
    const priority = derivePriorityFromChallenge(ch);

    let title = `Challenge investigation: ${ch.type.replace(/_/g, " ")} — ${ch.questionId}`;
    if (linkedDefects.length > 0) {
      title += ` (${linkedDefects.join(", ")})`;
    }

    const investigation = {
      id: generateId(registry),
      title,
      type: "CHALLENGE",
      status: "OPEN",
      priority,
      related_qids: [ch.questionId],
      related_challenges: [ch.challengeId],
      related_defects: linkedDefects,
      related_recommendations: linkedRecs,
      related_sessions: (ch.linkedSessions || []).concat(["S252"]),
      related_governance_events: [],
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
      assigned_to: null,
      findings: [{
        timestamp: new Date().toISOString(),
        author: "auto-create",
        finding: `Auto-created from challenge ${ch.challengeId}: ${ch.studentDescription}`,
        severity: priority >= 85 ? "HIGH" : "MEDIUM"
      }],
      resolution: null,
      resolution_date: null,
      resolution_type: null,
      resolution_author: null,
      resolution_session: null,
      metadata: {
        source: "auto-create",
        tags: ["auto-created", ch.type.toLowerCase()],
        estimated_hours: null,
        blocking: priority >= 85
      },
      timeline: [{
        timestamp: new Date().toISOString(),
        from_status: null,
        to_status: "OPEN",
        author: "auto-create",
        note: `Auto-created from challenge ${ch.challengeId}`
      }]
    };

    registry.investigations.push(investigation);
    created.push(investigation);
  }

  saveRegistry(registry);
  return { created: created.length, investigations: created };
}

function createFromChallenge(challengeId, priorityOverride) {
  const challenges = loadChallenges();
  if (!challenges || !challenges.challenges) {
    throw new Error("Challenge registry not found");
  }

  const challenge = challenges.challenges.find(c => c.challengeId === challengeId);
  if (!challenge) {
    throw new Error(`Challenge not found: ${challengeId}`);
  }

  const linkedDefects = challenge.linkedDefects || [];
  const linkedRecs = challenge.linkedRecommendations || [];
  const priority = priorityOverride || derivePriorityFromChallenge(challenge);
  const invType = CHALLENGE_TYPE_TO_INV_TYPE[challenge.type] || "CHALLENGE";

  const title = `Investigation: ${challenge.type.replace(/_/g, " ")} — ${challenge.questionId}` +
    (linkedDefects.length ? ` (${linkedDefects.join(", ")})` : "");

  return createInvestigation(title, invType, priority, {
    qids: [challenge.questionId],
    challenges: [challengeId],
    defects: linkedDefects,
    recommendations: linkedRecs,
    sessions: (challenge.linkedSessions || []).concat(["S252"]),
    source: "from-challenge",
    tags: ["from-challenge", challenge.type.toLowerCase()],
    blocking: priority >= 85,
    timelineNote: `Created from challenge ${challengeId}`
  });
}

function createFromDefect(defectCode, priorityOverride) {
  const defectPattern = /^DL-\d{3}$/;
  if (!defectPattern.test(defectCode)) {
    throw new Error(`Invalid defect code format: ${defectCode}. Expected: DL-NNN`);
  }

  const priority = priorityOverride || derivePriorityFromDefect(defectCode);
  const sev = DEFECT_SEVERITY_MAP[defectCode] || "MEDIUM";

  let title = `Defect investigation: ${defectCode}`;
  if (defectCode === "DL-008") title = `Defect investigation: DL-008 — ExplanationWrong[CorrectChoice] non-empty`;
  else if (defectCode === "DL-026") title = `Defect investigation: DL-026 — Empty non-CorrectChoice ExplanationWrong slots`;
  else if (defectCode === "DL-030") title = `Defect investigation: DL-030 — CorrectChoice answer-key errors`;
  else if (defectCode === "DL-035") title = `Defect investigation: DL-035 — Certified items with empty distractor EW slots`;

  return createInvestigation(title, "DEFECT", priority, {
    defects: [defectCode],
    source: "from-defect",
    tags: ["from-defect", defectCode.toLowerCase(), sev.toLowerCase()],
    blocking: sev === "CRITICAL" || sev === "HIGH",
    timelineNote: `Created from defect ${defectCode}`
  });
}

function listInvestigations(filterStatus, filterType, filterPriority) {
  const registry = loadRegistry();
  let investigations = registry.investigations;

  if (filterStatus) {
    investigations = investigations.filter(inv => inv.status === filterStatus);
  }
  if (filterType) {
    investigations = investigations.filter(inv => inv.type === filterType);
  }
  if (filterPriority !== null && filterPriority !== undefined) {
    investigations = investigations.filter(inv => inv.priority >= filterPriority);
  }

  return {
    specId: registry.specId,
    version: registry.version,
    generatedTimestamp: new Date().toISOString(),
    totalInvestigations: registry.investigations.length,
    filteredCount: investigations.length,
    filters: {
      status: filterStatus || "all",
      type: filterType || "all",
      minPriority: filterPriority || 0
    },
    summary: buildSummary(registry.investigations),
    investigations: investigations.map(formatInvestigationSummary)
  };
}

function formatInvestigationSummary(inv) {
  return {
    id: inv.id,
    title: inv.title,
    type: inv.type,
    status: inv.status,
    priority: inv.priority,
    related_qids_count: (inv.related_qids || []).length,
    related_challenges_count: (inv.related_challenges || []).length,
    related_defects: inv.related_defects || [],
    assigned_to: inv.assigned_to || "unassigned",
    created_date: inv.created_date,
    updated_date: inv.updated_date,
    findings_count: (inv.findings || []).length,
    blocking: (inv.metadata && inv.metadata.blocking) || false
  };
}

function getInvestigation(invId) {
  const registry = loadRegistry();
  const investigation = registry.investigations.find(inv => inv.id === invId);
  if (!investigation) {
    throw new Error(`Investigation not found: ${invId}`);
  }
  return investigation;
}

function updateInvestigation(invId, updates) {
  const registry = loadRegistry();
  const idx = registry.investigations.findIndex(inv => inv.id === invId);
  if (idx === -1) {
    throw new Error(`Investigation not found: ${invId}`);
  }

  const investigation = registry.investigations[idx];
  const fromStatus = investigation.status;

  if (updates.status && updates.status !== investigation.status) {
    validateTransition(investigation.status, updates.status);
    investigation.status = updates.status;
    recordTimeline(investigation, fromStatus, updates.status,
      updates.transitionNote || `Status updated to ${updates.status}`);
  }

  if (updates.finding) {
    if (!investigation.findings) investigation.findings = [];
    const sev = updates.findingSeverity || "MEDIUM";
    validateSeverity(sev);
    investigation.findings.push({
      timestamp: new Date().toISOString(),
      author: updates.author || process.env.USER || process.env.USERNAME || "system",
      finding: updates.finding,
      severity: sev
    });
  }

  if (updates.assignTo) {
    investigation.assigned_to = updates.assignTo;
  }

  if (updates.addQid) {
    if (!investigation.related_qids.includes(updates.addQid)) {
      investigation.related_qids.push(updates.addQid);
    }
  }

  if (updates.addDefect) {
    if (!investigation.related_defects.includes(updates.addDefect)) {
      investigation.related_defects.push(updates.addDefect);
    }
  }

  if (updates.tags) {
    if (!investigation.metadata) investigation.metadata = { tags: [] };
    if (!investigation.metadata.tags) investigation.metadata.tags = [];
    for (const tag of updates.tags.split(",")) {
      const trimmed = tag.trim();
      if (trimmed && !investigation.metadata.tags.includes(trimmed)) {
        investigation.metadata.tags.push(trimmed);
      }
    }
  }

  investigation.updated_date = new Date().toISOString();
  registry.investigations[idx] = investigation;
  saveRegistry(registry);
  return investigation;
}

function closeInvestigation(invId, resolution, resolutionType) {
  validateResolutionType(resolutionType);
  if (!resolution || resolution.length < 10) {
    throw new Error("Resolution text must be at least 10 characters");
  }

  const registry = loadRegistry();
  const idx = registry.investigations.findIndex(inv => inv.id === invId);
  if (idx === -1) {
    throw new Error(`Investigation not found: ${invId}`);
  }

  const investigation = registry.investigations[idx];
  const fromStatus = investigation.status;

  validateTransition(investigation.status, "CLOSED");

  investigation.status = "CLOSED";
  investigation.resolution = resolution;
  investigation.resolution_type = resolutionType;
  investigation.resolution_date = new Date().toISOString();
  investigation.resolution_author = process.env.USER || process.env.USERNAME || "system";
  investigation.resolution_session = "S252";
  investigation.updated_date = new Date().toISOString();

  recordTimeline(investigation, fromStatus, "CLOSED",
    `${resolutionType}: ${resolution}`);

  registry.investigations[idx] = investigation;
  saveRegistry(registry);
  return investigation;
}

// ── Reporting ────────────────────────────────────────────────────

function buildSummary(investigations) {
  const summary = {
    total: investigations.length,
    byStatus: {},
    byType: {},
    byPriorityBand: {
      "critical_90_100": 0,
      "high_70_89": 0,
      "medium_40_69": 0,
      "low_1_39": 0
    },
    blocking: 0,
    totalFindings: 0
  };

  for (const inv of investigations) {
    summary.byStatus[inv.status] = (summary.byStatus[inv.status] || 0) + 1;
    summary.byType[inv.type] = (summary.byType[inv.type] || 0) + 1;

    if (inv.priority >= 90) summary.byPriorityBand.critical_90_100++;
    else if (inv.priority >= 70) summary.byPriorityBand.high_70_89++;
    else if (inv.priority >= 40) summary.byPriorityBand.medium_40_69++;
    else summary.byPriorityBand.low_1_39++;

    if (inv.metadata && inv.metadata.blocking) summary.blocking++;
    summary.totalFindings += (inv.findings || []).length;
  }

  return summary;
}

function generateSummary() {
  const registry = loadRegistry();
  const summary = buildSummary(registry.investigations);

  const oldest = [...registry.investigations].sort((a, b) =>
    a.created_date.localeCompare(b.created_date))[0];
  const newest = [...registry.investigations].sort((a, b) =>
    b.created_date.localeCompare(a.created_date))[0];

  return {
    specId: registry.specId,
    version: registry.version,
    generatedTimestamp: new Date().toISOString(),
    summary,
    recentActivity: {
      oldestInvestigation: oldest ? { id: oldest.id, created: oldest.created_date } : null,
      newestInvestigation: newest ? { id: newest.id, created: newest.created_date } : null,
      openInvestigations: summary.byStatus["OPEN"] || 0,
      investigatingCount: summary.byStatus["INVESTIGATING"] || 0,
      actionRequiredCount: summary.byStatus["ACTION_REQUIRED"] || 0,
      blockedCount: summary.blocking
    },
    activeDefectCodes: [...new Set(
      registry.investigations
        .filter(inv => inv.status !== "CLOSED")
        .flatMap(inv => inv.related_defects || [])
    )].sort()
  };
}

function generateStats() {
  const registry = loadRegistry();
  const investigations = registry.investigations;

  const byDefect = {};
  for (const inv of investigations) {
    for (const d of (inv.related_defects || [])) {
      if (!byDefect[d]) byDefect[d] = { investigations: 0, open: 0, closed: 0 };
      byDefect[d].investigations++;
      if (inv.status === "CLOSED") byDefect[d].closed++;
      else byDefect[d].open++;
    }
  }

  const qidImpact = {};
  for (const inv of investigations) {
    for (const qid of (inv.related_qids || [])) {
      if (!qidImpact[qid]) qidImpact[qid] = 0;
      qidImpact[qid]++;
    }
  }

  const sortedQids = Object.entries(qidImpact)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([qid, count]) => ({ qid, investigations: count }));

  const resolutionTimes = investigations
    .filter(inv => inv.resolution_date && inv.created_date)
    .map(inv => {
      const created = new Date(inv.created_date).getTime();
      const resolved = new Date(inv.resolution_date).getTime();
      return (resolved - created) / (1000 * 60 * 60 * 24);
    });

  const avgResolutionDays = resolutionTimes.length > 0
    ? (resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length).toFixed(1)
    : null;

  return {
    specId: registry.specId,
    version: registry.version,
    generatedTimestamp: new Date().toISOString(),
    totalInvestigations: investigations.length,
    byDefect,
    topQidsByInvestigation: sortedQids,
    blockinInvestigations: investigations.filter(inv =>
      inv.metadata && inv.metadata.blocking && inv.status !== "CLOSED"
    ).map(inv => ({
      id: inv.id,
      title: inv.title,
      priority: inv.priority,
      status: inv.status,
      defects: inv.related_defects
    })),
    resolutionMetrics: {
      resolved: investigations.filter(inv => inv.status === "CLOSED" && inv.resolution).length,
      averageResolutionDays: avgResolutionDays,
      byType: {
        CONFIRMED_DEFECT: investigations.filter(inv => inv.resolution_type === "CONFIRMED_DEFECT").length,
        CONFIRMED_VALID: investigations.filter(inv => inv.resolution_type === "CONFIRMED_VALID").length,
        DUPLICATE: investigations.filter(inv => inv.resolution_type === "DUPLICATE").length,
        NO_ACTION: investigations.filter(inv => inv.resolution_type === "NO_ACTION").length,
        DISMISSED: investigations.filter(inv => inv.resolution_type === "DISMISSED").length,
        REMEDIATED: investigations.filter(inv => inv.resolution_type === "REMEDIATED").length
      }
    }
  };
}

// ── CLI ──────────────────────────────────────────────────────────

function parseArgv(rawArgs) {
  const args = rawArgs || process.argv.slice(2);
  const parsed = { op: null, flags: {} };

  for (const arg of args) {
    if (arg.startsWith("--")) {
      const eqIdx = arg.indexOf("=");
      if (eqIdx > 0) {
        const key = arg.slice(2, eqIdx);
        const val = arg.slice(eqIdx + 1);
        if (key === "create" || key === "auto-create" || key === "list" || key === "summary" || key === "stats") {
          parsed.op = key;
        } else if (key === "get" || key === "update" || key === "close" || key === "from-challenge" || key === "from-defect") {
          parsed.op = key;
          parsed.targetId = val;
        } else {
          parsed.flags[key] = val;
        }
      } else {
        const key = arg.slice(2);
        if (["create", "auto-create", "list", "summary", "stats"].includes(key)) {
          parsed.op = key;
        } else {
          parsed.flags[key] = true;
        }
      }
    }
  }

  return parsed;
}

function run() {
  const parsed = parseArgv();
  const op = parsed.op;
  const flags = parsed.flags;

  try {
    if (!op) {
      const s = generateSummary();
      console.log("\n=== INVESTIGATION REGISTRY v1.0 ===\n");
      console.log(`  Registry: ${s.specId}`);
      console.log(`  Version:  ${s.version}`);
      console.log(`  Total Investigations: ${s.summary.total}`);
      console.log(`  By Status:  OPEN=${s.summary.byStatus.OPEN || 0}  INVESTIGATING=${s.summary.byStatus.INVESTIGATING || 0}  ACTION_REQUIRED=${s.summary.byStatus.ACTION_REQUIRED || 0}  RESOLVED=${s.summary.byStatus.RESOLVED || 0}  CLOSED=${s.summary.byStatus.CLOSED || 0}`);
      console.log(`  By Type:    ${JSON.stringify(s.summary.byType)}`);
      console.log(`  Blocking:   ${s.summary.blocking}`);
      console.log(``);
    } else if (op === "create") {
      const title = flags["title"];
      const type = flags["type"];
      if (!title) throw new Error("--title is required for --create");
      if (!type) throw new Error("--type is required for --create");
      validateType(type);

      const priority = flags["priority"] ? parseInt(flags["priority"], 10) : 50;
      const qids = flags["qids"] ? flags["qids"].split(",").map(s => s.trim()).filter(Boolean) : [];

      const inv = createInvestigation(title, type, priority, {
        qids,
        source: "manual",
        tags: flags["tags"] ? flags["tags"].split(",").map(s => s.trim()).filter(Boolean) : [],
        blocking: flags["blocking"] === "true"
      });
      console.log(JSON.stringify(inv, null, 2));

    } else if (op === "auto-create") {
      const minPriority = flags["min-priority"] ? parseInt(flags["min-priority"], 10) : 80;
      const result = autoCreateInvestigations(minPriority);
      console.log(JSON.stringify(result, null, 2));

    } else if (op === "from-challenge") {
      const chId = parsed.targetId;
      if (!chId) throw new Error("Usage: --from-challenge=CH_ID");
      const priority = flags["priority"] ? parseInt(flags["priority"], 10) : null;
      const inv = createFromChallenge(chId, priority);
      console.log(JSON.stringify(inv, null, 2));

    } else if (op === "from-defect") {
      const defCode = parsed.targetId;
      if (!defCode) throw new Error("Usage: --from-defect=DL-XXX");
      const priority = flags["priority"] ? parseInt(flags["priority"], 10) : null;
      const inv = createFromDefect(defCode, priority);
      console.log(JSON.stringify(inv, null, 2));

    } else if (op === "list") {
      const status = flags["status"] || null;
      const type = flags["type"] || null;
      const priority = flags["priority"] ? parseInt(flags["priority"], 10) : null;
      const result = listInvestigations(status, type, priority);
      console.log(JSON.stringify(result, null, 2));

    } else if (op === "get") {
      const invId = parsed.targetId;
      if (!invId) throw new Error("Usage: --get=INV_ID");
      const inv = getInvestigation(invId);
      console.log(JSON.stringify(inv, null, 2));

    } else if (op === "update") {
      const invId = parsed.targetId;
      if (!invId) throw new Error("Usage: --update=INV_ID");

      const updates = {};
      if (flags["status"]) updates.status = flags["status"];
      if (flags["finding"]) updates.finding = flags["finding"];
      if (flags["finding-severity"]) updates.findingSeverity = flags["finding-severity"];
      if (flags["assign-to"]) updates.assignTo = flags["assign-to"];
      if (flags["add-qid"]) updates.addQid = flags["add-qid"];
      if (flags["add-defect"]) updates.addDefect = flags["add-defect"];
      if (flags["tags"]) updates.tags = flags["tags"];
      if (flags["note"]) updates.transitionNote = flags["note"];

      const inv = updateInvestigation(invId, updates);
      console.log(JSON.stringify(inv, null, 2));

    } else if (op === "close") {
      const invId = parsed.targetId;
      if (!invId) throw new Error("Usage: --close=INV_ID");
      const resolution = flags["resolution"];
      const resolutionType = flags["resolution-type"];
      if (!resolution) throw new Error("--resolution is required to close");
      if (!resolutionType) throw new Error("--resolution-type is required to close");

      const inv = closeInvestigation(invId, resolution, resolutionType);
      console.log(JSON.stringify(inv, null, 2));

    } else if (op === "summary") {
      const s = generateSummary();
      console.log(JSON.stringify(s, null, 2));

    } else if (op === "stats") {
      const s = generateStats();
      console.log(JSON.stringify(s, null, 2));

    } else {
      throw new Error(`Unknown operation: ${op}`);
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
}

// ── Module Exports ───────────────────────────────────────────────

module.exports = {
  createInvestigation,
  autoCreateInvestigations,
  createFromChallenge,
  createFromDefect,
  listInvestigations,
  getInvestigation,
  updateInvestigation,
  closeInvestigation,
  generateSummary,
  generateStats,
  buildSummary,
  formatInvestigationSummary,
  loadRegistry,
  saveRegistry,
  derivePriorityFromChallenge,
  derivePriorityFromDefect,
  validateTransition,
  STATE_TRANSITIONS,
  VALID_TYPES,
  VALID_STATUSES,
  VALID_RESOLUTION_TYPES,
  VALID_SEVERITIES,
  DEFECT_SEVERITY_MAP
};

// ── Run if called directly ───────────────────────────────────────

if (require.main === module) {
  run();
}
