// Replacement Lineage Tracker — SESSION 850 Board E
// Tracks original→replacement→certification→promotion lineage for modernized items.
// Uses template family detection and seed group mapping.
// Output: scripts/output/replacement_lineage.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const tf = require('./engine/template_family');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];
const DOMAINS = ['A', 'B', 'C', 'D', 'E', 'F'];

function detectSeedGroups(items, packName) {
  const families = tf.detectTemplateFamilies(items);
  const seedGroups = [];

  for (const [familyId, family] of families) {
    if (family.memberCount < 2) continue;

    // Members where stem similarity is very high are likely clones/seeds
    const members = family.members || [];
    if (members.length < 2) continue;

    // Designate first member as seed
    const seedQID = members[0].qid;
    const cloneQIDs = members.slice(1).map(m => m.qid);

    const section = seedQID.match(/[A-F](?=[CD]?-)/)?.[0] || '?';

    seedGroups.push({
      groupId: familyId,
      groupType: family.memberCount >= 5 ? 'dl012_clone' : 'template_rotation',
      section,
      domain: DOMAINS.includes(section) ? section : '?',
      seedQID,
      seedPack: packName,
      cloneQIDs,
      totalMembers: family.memberCount
    });
  }

  return seedGroups;
}

function run() {
  const timestamp = new Date().toISOString();

  const results = {
    specId: 'SESSION850_REPLACEMENT_LINEAGE_SPEC',
    board: 'E',
    generatedTimestamp: timestamp,
    summary: {
      totalLineages: 0, totalReplacements: 0, totalSeeds: 0,
      certifiedReplacements: 0, pendingReplacements: 0
    },
    lineages: [],
    seedGroups: []
  };

  // Build full item lookup map
  const allItems = {};
  for (const packName of PACKS) {
    let items;
    try { items = pr.parsePackFile(packName, ROOT); } catch (e) { continue; }
    for (const item of items) {
      if (!item.QuestionID) continue;
      allItems[item.QuestionID] = { ...item, __pack: packName };
    }
  }

  // Detect seed groups per pack
  const allSeedGroups = [];
  for (const packName of PACKS) {
    let items;
    try { items = pr.parsePackFile(packName, ROOT); } catch (e) { continue; }
    const validItems = items.filter(i => i.QuestionID);
    const groups = detectSeedGroups(validItems, packName);
    allSeedGroups.push(...groups);
  }

  // Build lineages from seed groups
  for (const group of allSeedGroups) {
    const seedItem = allItems[group.seedQID];
    const section = group.section;
    const domain = group.domain;

    const seedLineage = {
      lineageId: `LN-${group.groupId}`,
      originalQID: group.seedQID,
      replacementQID: group.seedQID,
      replacementDate: null,
      replacementType: 'seed',
      certificationStatus: seedItem ? (seedItem.question_state || 'Unprocessed') : 'Unknown',
      certificationDate: null,
      seedFlag: true,
      pack: group.seedPack,
      section,
      domain,
      notes: `Seed item for template family ${group.groupId}. ${group.cloneQIDs.length} clones identified.`
    };

    results.lineages.push(seedLineage);
    results.summary.totalSeeds++;
    results.summary.totalLineages++;

    if (seedLineage.certificationStatus === 'Certified') {
      results.summary.certifiedReplacements++;
    } else {
      results.summary.pendingReplacements++;
    }

    // Add clone entries
    for (const cloneQID of group.cloneQIDs) {
      const cloneItem = allItems[cloneQID];
      const cloneLineage = {
        lineageId: `LN-${group.groupId}-CLONE-${cloneQID}`,
        originalQID: cloneQID,
        replacementQID: group.seedQID,
        replacementDate: null,
        replacementType: 'clone_archival',
        certificationStatus: cloneItem ? (cloneItem.question_state || 'Unprocessed') : 'Unknown',
        certificationDate: null,
        seedFlag: false,
        pack: group.seedPack,
        section,
        domain,
        notes: `Clone of seed ${group.seedQID}. Target: archival after seed certified.`
      };

      results.lineages.push(cloneLineage);
      results.summary.totalReplacements++;
      results.summary.totalLineages++;

      if (cloneLineage.certificationStatus === 'Archived') {
        results.summary.certifiedReplacements++;
      }
    }

    // Add seed group record
    results.seedGroups.push({
      ...group,
      seedState: seedItem ? (seedItem.question_state || 'Unprocessed') : 'Unknown',
      cloneStates: group.cloneQIDs.map(qid => {
        const item = allItems[qid];
        return item ? (item.question_state || 'Unprocessed') : 'Unknown';
      }),
      archivedCount: group.cloneQIDs.filter(qid => {
        const item = allItems[qid];
        return item && item.question_state === 'Archived';
      }).length
    });
  }

  const outputPath = path.join(OUTPUT_DIR, 'replacement_lineage.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`Replacement Lineage Tracker complete.`);
  console.log(`  Total seed groups: ${allSeedGroups.length}`);
  console.log(`  Total lineages:    ${results.summary.totalLineages}`);
  console.log(`  Total seeds:       ${results.summary.totalSeeds}`);
  console.log(`  Total replacements: ${results.summary.totalReplacements}`);
  console.log(`  Certified: ${results.summary.certifiedReplacements}`);
  console.log(`  Pending:   ${results.summary.pendingReplacements}`);
  console.log(`\nOutput: ${outputPath}`);

  return results;
}

if (require.main === module) {
  run();
}

module.exports = { run, detectSeedGroups };
