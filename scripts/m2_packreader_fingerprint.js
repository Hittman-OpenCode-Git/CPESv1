/**
 * m2_packreader_fingerprint.js — Migration 2 parity driver
 * Dumps a stable per-pack fingerprint via engine/pack_reader so the
 * pre/post-migration outputs can be diffed byte-for-byte.
 */
'use strict';
const path = require('path');
const crypto = require('crypto');
const pr = require('../scripts/engine/pack_reader.js');

const ROOT = path.resolve(__dirname, '..', 'content', 'packs');
function norm(v) {
  if (Array.isArray(v)) return v.map(norm);
  if (v && typeof v === 'object') {
    const o = {};
    for (const k of Object.keys(v).sort()) o[k] = norm(v[k]);
    return o;
  }
  return v;
}

const out = {};
for (const pn of Object.keys(pr.PACK_FILES)) {
  try {
    const items = pr.parsePackFile(pn, ROOT);
    const qids = items.filter(i => i && i.QuestionID).map(i => i.QuestionID);
    out[pn] = {
      count: items.length,
      qidCount: qids.length,
      distinctQids: new Set(qids).size,
      first: qids[0],
      last: qids[qids.length - 1],
      // stable content hash excluding nothing — full item array
      contentHash: crypto.createHash('sha256').update(JSON.stringify(norm([...items]))).digest('hex'),
      metaProps: {
        _packName: items._packName, _fileName: items._fileName,
        _filePath: items._filePath, _fileHash: items._fileHash,
      },
    };
  } catch (e) {
    out[pn] = { error: e.message };
  }
}
console.log(JSON.stringify(out, null, 2));
