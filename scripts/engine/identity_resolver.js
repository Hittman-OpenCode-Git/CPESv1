// Identity Resolver — computes the 6-field compound key per S321 Identity Schema v2
// Compound key: QID|CorrectChoice|EWPattern|TemplateFamily|FilePath|VersionID
const crypto = require('crypto');

function computeEWPattern(item) {
  const choices = ['A', 'B', 'C', 'D'];
  let pattern = '';
  const cc = item.CorrectChoice || '';

  for (const choice of choices) {
    if (choice === cc) {
      pattern += '0';
      continue;
    }
    const ewKey = 'ExplanationWrong' + choice;
    const ewVal = item[ewKey];
    if (ewVal && typeof ewVal === 'string' && ewVal.trim().length >= 50) {
      pattern += '1';
    } else {
      pattern += '0';
    }
  }
  return pattern;
}

function computeTemplateFamilyId(item) {
  const section = item.Section || '?';
  const pack = item.__pack || 'unknown';

  const qid = item.QuestionID || '';
  const match = qid.match(/\d{3}$/);
  const num = match ? match[0] : '000';

  return `TF-Pack${pack.toUpperCase()}-${section}-${num}`;
}

function detectTemplateFamilies(items) {
  const families = new Map();

  for (const item of items) {
    if (!item.QuestionID) continue;
    const familyId = computeTemplateFamilyId(item);

    if (!families.has(familyId)) {
      families.set(familyId, []);
    }
    families.get(familyId).push(item.QuestionID);
  }

  return families;
}

function computeCompoundKey(item, filePath) {
  const qid = item.QuestionID || '';
  const cc = item.CorrectChoice || '';
  const ewPattern = computeEWPattern(item);
  const templateFamily = computeTemplateFamilyId(item);
  const fp = filePath || item.__filePath || 'unknown';
  const versionId = item.VersionID || '1.0.0';

  return `${qid}|${cc}|${ewPattern}|${templateFamily}|${fp}|${versionId}`;
}

function resolveCompoundKey(item, packName) {
  const clean = packName.replace(/^pack_/, '');
  const filePath = `pack_${clean}_corrected.js::Section ${item.Section || '?'}`;
  return computeCompoundKey(item, filePath);
}

function verifyTemplateFamilyConsistency(familyItems, familyId) {
  if (!familyItems || familyItems.length === 0) {
    return { consistent: false, issues: [`TemplateFamily ${familyId}: empty family (orphan)`] };
  }

  const issues = [];
  const firstChoicesStr = JSON.stringify(familyItems[0].Choices || {});

  for (let i = 1; i < familyItems.length; i++) {
    const currentChoicesStr = JSON.stringify(familyItems[i].Choices || {});
    if (currentChoicesStr !== firstChoicesStr) {
      issues.push(
        `TemplateFamily ${familyId}: item ${familyItems[i].QuestionID} has different choices than seed ${familyItems[0].QuestionID}`
      );
    }
  }

  return {
    consistent: issues.length === 0,
    issues,
    memberCount: familyItems.length
  };
}

function extractAllCompoundKeys(items, packName) {
  const results = [];
  const seen = new Set();

  for (const item of items) {
    if (!item.QuestionID) continue;
    const key = resolveCompoundKey(item, packName);

    if (seen.has(key)) {
      results.push({ item, compoundKey: key, status: 'DUPLICATE' });
    } else {
      seen.add(key);
      results.push({ item, compoundKey: key, status: 'UNIQUE' });
    }
  }

  return results;
}

module.exports = {
  computeEWPattern,
  computeTemplateFamilyId,
  computeCompoundKey,
  resolveCompoundKey,
  detectTemplateFamilies,
  verifyTemplateFamilyConsistency,
  extractAllCompoundKeys
};
