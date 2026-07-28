// Hash Engine — deterministic SHA-256 hashing per S321 Delta Engine Spec
// Three hash types: content_hash (learner-facing), metadata_hash (non-content), identity_hash (compound key)
const crypto = require('crypto');

function normalizeText(val) {
  if (val === null || val === undefined) return '';
  return String(val).trim().replace(/\s+/g, ' ');
}

function sha256(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function computeContentHash(item) {
  const fields = {
    Stem: normalizeText(item.Stem || ''),
    Choices_A: normalizeText(item.Choices ? item.Choices.A || '' : ''),
    Choices_B: normalizeText(item.Choices ? item.Choices.B || '' : ''),
    Choices_C: normalizeText(item.Choices ? item.Choices.C || '' : ''),
    Choices_D: normalizeText(item.Choices ? item.Choices.D || '' : ''),
    CorrectChoice: item.CorrectChoice || '',
    ExplanationCorrect: normalizeText(item.ExplanationCorrect || ''),
    ExplanationWrongA: normalizeText(item.ExplanationWrongA || ''),
    ExplanationWrongB: normalizeText(item.ExplanationWrongB || ''),
    ExplanationWrongC: normalizeText(item.ExplanationWrongC || ''),
    ExplanationWrongD: normalizeText(item.ExplanationWrongD || '')
  };

  const sorted = {};
  Object.keys(fields).sort().forEach(k => { sorted[k] = fields[k]; });

  if (item.CorrectChoice) {
    const ccSlot = 'ExplanationWrong' + item.CorrectChoice;
    if (ccSlot in sorted) {
      sorted[ccSlot] = '';
    }
  }

  return sha256(JSON.stringify(sorted));
}

function computeMetadataHash(item) {
  const fields = {
    Difficulty: normalizeText(item.Difficulty || ''),
    DifficultyScore: String(item.DifficultyScore || 0),
    CognitiveLevel: normalizeText(item.CognitiveLevel || ''),
    LOSTag: normalizeText(item.LOSTag || ''),
    Topic: normalizeText(item.Topic || ''),
    Section: normalizeText(item.Section || ''),
    SectionName: normalizeText(item.SectionName || ''),
    MicroTopic: normalizeText(item.MicroTopic || ''),
    CognitiveLevelCategory: normalizeText(item.CognitiveLevelCategory || ''),
    CalculationItem: item.CalculationItem ? 'true' : 'false',
    ItemType: normalizeText(item.ItemType || 'MCQ')
  };

  const sorted = {};
  Object.keys(fields).sort().forEach(k => { sorted[k] = fields[k]; });

  return sha256(JSON.stringify(sorted));
}

function computeIdentityHash(compoundKey) {
  return sha256(compoundKey);
}

function computeAllHashes(item) {
  return {
    contentHash: computeContentHash(item),
    metadataHash: computeMetadataHash(item),
    identityHash: null
  };
}

function computeAllHashesWithIdentity(item, compoundKey) {
  const hashes = computeAllHashes(item);
  hashes.identityHash = computeIdentityHash(compoundKey);
  return hashes;
}

function verifyDeterminism(item) {
  const h1 = computeContentHash(item);
  const h2 = computeContentHash(item);
  const m1 = computeMetadataHash(item);
  const m2 = computeMetadataHash(item);
  return {
    contentHashDeterministic: h1 === h2,
    metadataHashDeterministic: m1 === m2,
    contentHash: h1,
    metadataHash: m1
  };
}

module.exports = {
  computeContentHash,
  computeMetadataHash,
  computeIdentityHash,
  computeAllHashes,
  computeAllHashesWithIdentity,
  verifyDeterminism,
  sha256,
  normalizeText
};
