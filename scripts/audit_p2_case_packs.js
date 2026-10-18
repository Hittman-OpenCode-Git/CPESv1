/**
 * audit_p2_case_packs.js
 * 
 * Audit P2 case packs for certification state.
 * Reads each case pack, evaluates via Function constructor,
 * and reports case-level and item-level question_state counts.
 */

const fs = require('fs');
const path = require('path');

const PACK_FILES = [
  { path: 'p2/case_pack_p2_1.js', varName: 'casePackP2_1' },
  { path: 'p2/case_pack_p2_2.js', varName: 'casePackP2_2' },
  { path: 'p2/case_pack_p2_3.js', varName: 'casePackP2_3' },
];

const ROOT = path.resolve(__dirname, '..');

function loadPack(fileInfo) {
  const filePath = path.join(ROOT, fileInfo.path);
  const raw = fs.readFileSync(filePath, 'utf8');
  // Evaluate the var declaration to get the array
  const fn = new Function(raw + `\nreturn ${fileInfo.varName};`);
  return fn();
}

function auditPack(fileInfo) {
  const pack = loadPack(fileInfo);
  const fileName = path.basename(fileInfo.path);

  const result = {
    file: fileName,
    totalCases: pack.length,
    totalItems: 0,
    caseStates: {},
    itemStates: {},
    casesWithNonCertifiedItems: [],
    casesMissingState: [],
    packStateFields: [],
    certSessionCounts: {},
  };

  for (const c of pack) {
    // Case-level state
    const caseState = c.question_state || '(none)';
    result.caseStates[caseState] = (result.caseStates[caseState] || 0) + 1;

    if (!c.question_state) {
      result.casesMissingState.push(c.CaseID);
    }

    // Check for pack_state or similar governance fields
    if (c.pack_state) {
      result.packStateFields.push({ caseID: c.CaseID, pack_state: c.pack_state });
    }

    // Certification session
    const certSession = c.certification_session || '(none)';
    result.certSessionCounts[certSession] = (result.certSessionCounts[certSession] || 0) + 1;

    // Item-level audit
    const items = c.Items || [];
    const nonCertifiedItems = [];

    for (const item of items) {
      result.totalItems++;
      const itemState = item.question_state || caseState; // inherit case state if no item-level state
      result.itemStates[itemState] = (result.itemStates[itemState] || 0) + 1;

      // Track item-level overrides (items with own question_state different from case)
      if (item.question_state && item.question_state !== caseState) {
        nonCertifiedItems.push({
          itemID: item.ItemID,
          itemState: item.question_state,
          caseState: caseState,
        });
      }
    }

    // If case has items that are not Certified at the item level
    if (caseState !== 'Certified' && items.length > 0) {
      result.casesWithNonCertifiedItems.push({
        caseID: c.CaseID,
        caseState: caseState,
        itemCount: items.length,
        note: 'case-level state is not Certified',
      });
    }

    // If individual items override case state
    if (nonCertifiedItems.length > 0) {
      result.casesWithNonCertifiedItems.push({
        caseID: c.CaseID,
        caseState: caseState,
        overriddenItems: nonCertifiedItems,
      });
    }
  }

  return result;
}

function printReport(results) {
  const line = '=' .repeat(80);
  const dash = '-'.repeat(80);

  console.log(line);
  console.log('  P2 CASE PACK CERTIFICATION STATE AUDIT');
  console.log('  Date: ' + new Date().toISOString());
  console.log(line);

  let grandTotalCases = 0;
  let grandTotalItems = 0;
  const grandCaseStates = {};
  const grandItemStates = {};
  const grandCertSessions = {};

  for (const r of results) {
    console.log(`\n${line}`);
    console.log(`  FILE: ${r.file}`);
    console.log(line);

    console.log(`\n  Total Cases:     ${r.totalCases}`);
    console.log(`  Total Items:     ${r.totalItems}`);

    // Case-level states
    console.log(`\n  Case-Level question_state:`);
    for (const [state, count] of Object.entries(r.caseStates).sort()) {
      console.log(`    ${state.padEnd(20)} ${count}`);
      grandCaseStates[state] = (grandCaseStates[state] || 0) + count;
    }

    // Item-level states
    console.log(`\n  Item-Level question_state:`);
    for (const [state, count] of Object.entries(r.itemStates).sort()) {
      console.log(`    ${state.padEnd(20)} ${count}`);
      grandItemStates[state] = (grandItemStates[state] || 0) + count;
    }

    // Certification sessions
    console.log(`\n  Certification Sessions:`);
    for (const [sess, count] of Object.entries(r.certSessionCounts).sort()) {
      console.log(`    ${sess.padEnd(20)} ${count}`);
      grandCertSessions[sess] = (grandCertSessions[sess] || 0) + count;
    }

    // Cases missing state
    if (r.casesMissingState.length > 0) {
      console.log(`\n  Cases with NO question_state:`);
      for (const cid of r.casesMissingState) {
        console.log(`    - ${cid}`);
      }
    }

    // pack_state fields
    if (r.packStateFields.length > 0) {
      console.log(`\n  Cases with pack_state field:`);
      for (const ps of r.packStateFields) {
        console.log(`    - ${ps.caseID}: ${ps.pack_state}`);
      }
    }

    // Non-Certified items
    if (r.casesWithNonCertifiedItems.length > 0) {
      console.log(`\n  Non-Certified Cases/Items:`);
      for (const entry of r.casesWithNonCertifiedItems) {
        if (entry.note) {
          console.log(`    ${entry.caseID} — Case state: "${entry.caseState}" (${entry.itemCount} items)`);
          console.log(`      ${entry.note}`);
        }
        if (entry.overriddenItems) {
          console.log(`    ${entry.caseID} — Case state: "${entry.caseState}"`);
          for (const oi of entry.overriddenItems) {
            console.log(`      ${oi.itemID}: item state="${oi.itemState}" (differs from case "${oi.caseState}")`);
          }
        }
      }
    } else {
      console.log(`\n  Non-Certified Cases/Items: (none — all Certified)`);
    }

    grandTotalCases += r.totalCases;
    grandTotalItems += r.totalItems;
  }

  // Grand totals
  console.log(`\n${line}`);
  console.log('  GRAND TOTALS — ALL P2 CASE PACKS');
  console.log(line);
  console.log(`  Total Cases:     ${grandTotalCases}`);
  console.log(`  Total Items:     ${grandTotalItems}`);

  console.log(`\n  Case-Level question_state (all packs):`);
  for (const [state, count] of Object.entries(grandCaseStates).sort()) {
    const pct = ((count / grandTotalCases) * 100).toFixed(1);
    console.log(`    ${state.padEnd(20)} ${String(count).padStart(5)}  (${pct}%)`);
  }

  console.log(`\n  Item-Level question_state (all packs):`);
  for (const [state, count] of Object.entries(grandItemStates).sort()) {
    const pct = ((count / grandTotalItems) * 100).toFixed(1);
    console.log(`    ${state.padEnd(20)} ${String(count).padStart(5)}  (${pct}%)`);
  }

  console.log(`\n  Certification Sessions (all packs):`);
  for (const [sess, count] of Object.entries(grandCertSessions).sort()) {
    console.log(`    ${sess.padEnd(20)} ${count}`);
  }

  console.log(`\n${line}`);
  console.log('  AUDIT COMPLETE');
  console.log(line);
}

// --- Main ---
const results = [];
for (const pf of PACK_FILES) {
  try {
    results.push(auditPack(pf));
  } catch (err) {
    console.error(`ERROR loading ${pf.path}: ${err.message}`);
    process.exit(1);
  }
}

printReport(results);
