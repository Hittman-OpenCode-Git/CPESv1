// Template Family Detection — rotation group identification per S321 Identity Schema
// Groups items by stem+choice similarity, identifies rotation variants
const crypto = require('crypto');

function normalizeText(val) {
  if (val === null || val === undefined) return '';
  return String(val).trim().replace(/\s+/g, ' ');
}

function sha256(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function computeStemHash(item) {
  return sha256(normalizeText(item.Stem || ''));
}

function computeChoicesHash(item) {
  const choices = item.Choices || {};
  const sorted = ['A', 'B', 'C', 'D'].map(c => normalizeText(choices[c] || '')).sort();
  return sha256(sorted.join('|'));
}

function detectTemplateFamilies(items) {
  const familyMap = new Map();
  const stemGroups = new Map();

  for (const item of items) {
    if (!item.QuestionID) continue;
    const stemHash = computeStemHash(item);
    if (!stemGroups.has(stemHash)) {
      stemGroups.set(stemHash, []);
    }
    stemGroups.get(stemHash).push(item);
  }

  let familyCounter = 1;
  for (const [stemHash, group] of stemGroups) {
    const choicesMap = new Map();

    for (const item of group) {
      const ch = computeChoicesHash(item);
      if (!choicesMap.has(ch)) {
        choicesMap.set(ch, []);
      }
      choicesMap.get(ch).push(item);
    }

    for (const [choicesHash, subgroup] of choicesMap) {
      const familyId = `TF-${String(familyCounter).padStart(4, '0')}`;
      familyMap.set(familyId, {
        familyId,
        stemHash,
        choicesHash,
        members: subgroup.map(i => ({
          qid: i.QuestionID,
          cc: i.CorrectChoice,
          section: i.Section
        })),
        memberCount: subgroup.length
      });
      familyCounter++;
    }
  }

  return familyMap;
}

function assignFamiliesToItems(items) {
  const families = detectTemplateFamilies(items);
  const itemToFamily = new Map();

  for (const [familyId, family] of families) {
    for (const member of family.members) {
      itemToFamily.set(member.qid, familyId);
    }
  }

  return itemToFamily;
}

function verifyFamilyConsistency(family) {
  if (!family || !family.members || family.members.length === 0) {
    return { consistent: false, issues: ['Empty family (orphan)'] };
  }

  const issues = [];

  if (family.memberCount < 1) {
    issues.push(`Family ${family.familyId}: orphan (0 members)`);
  }

  const ccs = family.members.map(m => m.cc).filter(Boolean);
  const uniqueCCs = new Set(ccs);
  if (ccs.length > uniqueCCs.size) {
    const dupes = ccs.filter((c, i) => ccs.indexOf(c) !== i);
    issues.push(`Family ${family.familyId}: duplicate CCs within family — ${[...new Set(dupes)].join(', ')}`);
  }

  return {
    consistent: issues.length === 0,
    issues,
    familyId: family.familyId,
    memberCount: family.memberCount
  };
}

function getFamilyStatistics(families) {
  let totalMembers = 0;
  let orphanCount = 0;
  let maxSize = 0;
  let minSize = Infinity;
  const sizeDistribution = {};

  for (const [familyId, family] of families) {
    const count = family.memberCount;
    totalMembers += count;
    if (count < 1) orphanCount++;
    if (count > maxSize) maxSize = count;
    if (count < minSize) minSize = count;
    sizeDistribution[count] = (sizeDistribution[count] || 0) + 1;
  }

  return {
    totalFamilies: families.size,
    totalMembers,
    averageSize: families.size > 0 ? (totalMembers / families.size).toFixed(1) : 0,
    maxSize,
    minSize: minSize === Infinity ? 0 : minSize,
    orphanCount,
    sizeDistribution
  };
}

module.exports = {
  computeStemHash,
  computeChoicesHash,
  detectTemplateFamilies,
  assignFamiliesToItems,
  verifyFamilyConsistency,
  getFamilyStatistics,
  normalizeText,
  sha256
};
