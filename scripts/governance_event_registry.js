/**
 * Governance Event Registry v1.0 — SESSION 750, Board D
 *
 * Tracks governance events across the lifecycle:
 * - Rule Violations
 * - Exceptions / Waivers
 * - Escalations
 *
 * Lifecycle: OPEN → UNDER_REVIEW → APPROVED → CLOSED
 *
 * Run: node scripts/governance_event_registry.js [--list] [--add <type>:<summary>] [--resolve <id> <status>]
 *
 * Storage: scripts/output/governance_event_registry.json
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const STORAGE_DIR = path.join(ROOT, "scripts", "output");
const STORAGE_FILE = path.join(STORAGE_DIR, "governance_event_registry.json");

const VALID_EVENT_TYPES = ["VIOLATION", "EXCEPTION", "WAIVER", "ESCALATION"];
const VALID_STATUSES = ["OPEN", "UNDER_REVIEW", "APPROVED", "CLOSED"];

// ── Storage ─────────────────────────────────────────────────────

function ensureStorageDir() {
  if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

function loadEvents() {
  ensureStorageDir();
  if (!fs.existsSync(STORAGE_FILE)) {
    return { registry: "Governance Event Registry v1.0", events: [], nextId: 1 };
  }
  return JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8"));
}

function saveEvents(registry) {
  ensureStorageDir();
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(registry, null, 2), "utf-8");
}

// ── Event CRUD ──────────────────────────────────────────────────

function createEvent(type, summary, sourceFile, severity, linkedRule) {
  if (!VALID_EVENT_TYPES.includes(type)) {
    throw new Error(`Invalid event type: ${type}. Valid: ${VALID_EVENT_TYPES.join(", ")}`);
  }

  const registry = loadEvents();
  const event = {
    id: "GE-" + String(registry.nextId).padStart(4, "0"),
    type,
    summary,
    sourceFile: sourceFile || "unknown",
    severity: severity || "MEDIUM",
    linkedRule: linkedRule || null,
    status: "OPEN",
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    resolution: null
  };
  registry.events.push(event);
  registry.nextId++;
  saveEvents(registry);
  return event;
}

function resolveEvent(eventId, newStatus) {
  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}. Valid: ${VALID_STATUSES.join(", ")}`);
  }
  const registry = loadEvents();
  const event = registry.events.find(e => e.id === eventId);
  if (!event) throw new Error(`Event not found: ${eventId}`);
  event.status = newStatus;
  event.updated = new Date().toISOString();
  if (newStatus === "CLOSED") {
    event.resolution = `Closed at ${new Date().toISOString()}`;
  }
  saveEvents(registry);
  return event;
}

function listEvents(filterType, filterStatus) {
  const registry = loadEvents();
  let events = registry.events;
  if (filterType) events = events.filter(e => e.type === filterType);
  if (filterStatus) events = events.filter(e => e.status === filterStatus);
  return { registry: registry.registry, totalEvents: registry.events.length, filteredEvents: events.length, events };
}

// ── Auto-detect from guard engine results ───────────────────────

function ingestFromGuardEngine(engineResults) {
  const registry = loadEvents();
  const created = [];

  for (const [fileKey, data] of Object.entries(engineResults.ruleResults || {})) {
    if (data.error) continue;

    // DL-008 violations → VIOLATION events
    for (const v of (data.rule2.violations || [])) {
      const existing = registry.events.find(e =>
        e.type === "VIOLATION" &&
        e.sourceFile === fileKey &&
        e.summary.includes(v.QuestionID) &&
        e.summary.includes("DL-008")
      );
      if (!existing) {
        const event = {
          id: "GE-" + String(registry.nextId).padStart(4, "0"),
          type: "VIOLATION",
          summary: `DL-008: ${v.QuestionID} — ExplanationWrong${v.slot.slice(-1)} non-empty`,
          sourceFile: fileKey,
          severity: "HIGH",
          linkedRule: "RULE 2",
          status: "OPEN",
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          resolution: null
        };
        registry.events.push(event);
        registry.nextId++;
        created.push(event);
      }
    }
  }

  if (created.length > 0) saveEvents(registry);
  return { ingested: created.length, events: created };
}

// ── Reporting ───────────────────────────────────────────────────

function generateSummary() {
  const registry = loadEvents();
  const summary = { total: registry.events.length, byType: {}, byStatus: {}, bySeverity: {} };

  for (const ev of registry.events) {
    summary.byType[ev.type] = (summary.byType[ev.type] || 0) + 1;
    summary.byStatus[ev.status] = (summary.byStatus[ev.status] || 0) + 1;
    summary.bySeverity[ev.severity] = (summary.bySeverity[ev.severity] || 0) + 1;
  }

  return summary;
}

// ── CLI ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes("--list")) {
  const typeFilter = args.includes("--type") ? args[args.indexOf("--type") + 1] : null;
  const statusFilter = args.includes("--status") ? args[args.indexOf("--status") + 1] : null;
  const result = listEvents(typeFilter, statusFilter);
  console.log(JSON.stringify(result, null, 2));
} else if (args.includes("--add")) {
  const addIdx = args.indexOf("--add");
  const addValue = args[addIdx + 1] || "";
  const [type, ...summaryParts] = addValue.split(":");
  const summary = summaryParts.join(":");
  try {
    const event = createEvent(type, summary);
    console.log(JSON.stringify(event, null, 2));
  } catch (e) {
    console.error("Error: " + e.message);
    process.exit(1);
  }
} else if (args.includes("--resolve")) {
  const resIdx = args.indexOf("--resolve");
  const eventId = args[resIdx + 1];
  const newStatus = args[resIdx + 2] || "CLOSED";
  try {
    const event = resolveEvent(eventId, newStatus);
    console.log(JSON.stringify(event, null, 2));
  } catch (e) {
    console.error("Error: " + e.message);
    process.exit(1);
  }
} else if (args.includes("--summary")) {
  console.log(JSON.stringify(generateSummary(), null, 2));
} else {
  // Default: show summary
  const summary = generateSummary();
  console.log("\n=== GOVERNANCE EVENT REGISTRY v1.0 ===\n");
  console.log(`  Total Events: ${summary.total}`);
  console.log(`  By Type:    ${JSON.stringify(summary.byType)}`);
  console.log(`  By Status:  ${JSON.stringify(summary.byStatus)}`);
  console.log(`  By Severity: ${JSON.stringify(summary.bySeverity)}\n`);
}

module.exports = { createEvent, resolveEvent, listEvents, ingestFromGuardEngine, generateSummary, loadEvents, saveEvents };
