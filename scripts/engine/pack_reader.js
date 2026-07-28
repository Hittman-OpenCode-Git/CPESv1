// AM-1 Function Constructor Parse — canonical pack file reader
// Shared by ALL Framework v2 scripts. Within-object extraction only.
// FORBIDDEN: forward-scan, regex-window, flat-field matching.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PACK_FILES = {
  pack_a: 'pack_a_corrected.js',
  pack_b: 'pack_b_corrected.js',
  pack_c: 'pack_c_corrected.js',
  pack_d: 'pack_d_corrected.js',
  pack_e: 'pack_e_corrected.js'
};

const VAR_NAMES = {
  pack_a: 'MCQ_BANK_A',
  pack_b: 'MCQ_BANK_B',
  pack_c: 'MCQ_BANK_C',
  pack_d: 'MCQ_BANK_D',
  pack_e: 'MCQ_BANK_E'
};

const QID_REGEX = {
  pack_a: /^P1-[A-F]-\d{3}$/,
  pack_b: /^P1B-[A-F]-\d{3}$/,
  pack_c: /^P1-[A-F]C-\d{3}$/,
  pack_d: /^P1-[A-F]D-\d{3}$/,
  pack_e: /^(P1E-[A-F]-\d{3}|P1-E-R\d{2})$/
};

function sha256(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function parsePackFile(packName, rootDir) {
  const fileName = PACK_FILES[packName];
  const filePath = path.resolve(rootDir || process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Pack file not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const varName = VAR_NAMES[packName];

  let items;
  try {
    const fn = new Function(raw + '\n; return ' + varName + ';');
    items = fn();
  } catch (e) {
    throw new Error(`AM-1 Function Constructor Parse failed for ${fileName}: ${e.message}`);
  }

  if (!Array.isArray(items)) {
    throw new Error(`Parsed ${fileName} but result is not an array (got ${typeof items})`);
  }

  items._packName = packName;
  items._fileName = fileName;
  items._filePath = filePath;
  items._fileHash = sha256(raw);

  return items;
}

function parseAllPacks(rootDir) {
  const results = {};
  for (const packName of Object.keys(PACK_FILES)) {
    try {
      results[packName] = parsePackFile(packName, rootDir);
    } catch (e) {
      results[packName] = { _error: e.message, _packName: packName, _items: [] };
    }
  }
  return results;
}

function getAllItems(rootDir) {
  const packs = parseAllPacks(rootDir);
  const all = [];
  for (const [packName, items] of Object.entries(packs)) {
    if (items._error) continue;
    for (const item of items) {
      if (typeof item === 'object' && item !== null && item.QuestionID) {
        item.__pack = packName;
        item.__filePath = items._filePath;
        all.push(item);
      }
    }
  }
  return all;
}

function getItemCount(packName, rootDir) {
  const items = parsePackFile(packName, rootDir);
  return items.filter(i => typeof i === 'object' && i !== null && i.QuestionID).length;
}

function getQIDFormatRegex(packName) {
  return QID_REGEX[packName] || /.*/;
}

function getPackFileHash(packName, rootDir) {
  const fileName = PACK_FILES[packName];
  const filePath = path.resolve(rootDir || process.cwd(), fileName);
  if (!fs.existsSync(filePath)) return null;
  return sha256(fs.readFileSync(filePath, 'utf8'));
}

module.exports = {
  PACK_FILES,
  VAR_NAMES,
  QID_REGEX,
  parsePackFile,
  parseAllPacks,
  getAllItems,
  getItemCount,
  getQIDFormatRegex,
  getPackFileHash,
  sha256
};
