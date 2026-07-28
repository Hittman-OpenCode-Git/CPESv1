// Session 4: Forensic Provenance Reconciliation
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

function hashFile(fpath) {
  if (!fs.existsSync(fpath)) return 'FILE_NOT_FOUND';
  const buf = fs.readFileSync(fpath);
  return crypto.createHash('sha256').update(buf).digest('hex').toUpperCase();
}

function fileInfo(fpath) {
  if (!fs.existsSync(fpath)) return null;
  const buf = fs.readFileSync(fpath);
  const stat = fs.statSync(fpath);
  return {
    path: fpath,
    size: buf.length,
    sha256: crypto.createHash('sha256').update(buf).digest('hex').toUpperCase(),
    mtime: stat.mtime.toISOString(),
    ctime: stat.ctime.toISOString()
  };
}

function tryParse(fpath) {
  if (!fs.existsSync(fpath)) return 'FILE_NOT_FOUND';
  try {
    const src = fs.readFileSync(fpath, 'utf8');
    const startIdx = src.indexOf('[');
    if (startIdx === -1) return 'NO_ARRAY_FOUND';
    const fn = new Function('return ' + src.substring(startIdx));
    const result = fn();
    const withQID = result.filter(o => o && o.QuestionID);
    return result.length + '/' + withQID.length + ' objects/QIDs';
  } catch(e) {
    return 'PARSE_FAILED: ' + e.message.substring(0, 80);
  }
}

console.log('=== CHRONOLOGICAL FILE-STATE TABLE ===\n');

// === PACK A ===
console.log('--- Pack A ---\n');

// Find ALL pack_a files (live + backups)
const allA = [];
const aLive = path.join(base, 'pack_a_corrected.js');
const aLiveInfo = fileInfo(aLive);
if (aLiveInfo) allA.push({ label: 'LIVE', ...aLiveInfo, parse: tryParse(aLive) });

// Find backups in both root and backups directory
const aBackups = [];
const backupsDir = path.join(base, 'backups');
const rootDir = base;

// Check root for backups
const rootFiles = fs.readdirSync(rootDir).filter(f => f.startsWith('pack_a_corrected.js.bak'));
for (const f of rootFiles) {
  const fpath = path.join(rootDir, f);
  const info = fileInfo(fpath);
  if (info) {
    const tsMatch = f.match(/\.bak-(\d{14})/);
    const tsLabel = tsMatch ? tsMatch[1] : 'unknown';
    aBackups.push({ label: f, tsLabel, ...info, parse: tryParse(fpath) });
  }
}

// Check backups directory
if (fs.existsSync(backupsDir)) {
  const bkFiles = fs.readdirSync(backupsDir).filter(f => f.startsWith('pack_a_corrected.js.bak'));
  for (const f of bkFiles) {
    const fpath = path.join(backupsDir, f);
    const info = fileInfo(fpath);
    if (info) {
      const tsMatch = f.match(/\.bak-(\d{14})/);
      const tsLabel = tsMatch ? tsMatch[1] : 'unknown';
      aBackups.push({ label: f + ' (backups/)', tsLabel, ...info, parse: tryParse(fpath) });
    }
  }
}

// Sort by timestamp
aBackups.sort((a, b) => a.mtime.localeCompare(b.mtime));

console.log('File | Timestamp | Size | SHA-256 (first 16) | Parse Result');
console.log('-----|-----------|------|-------------------|--------------');
for (const entry of aBackups) {
  console.log(entry.label + ' | ' + entry.mtime + ' | ' + entry.size + ' | ' + entry.sha256.substring(0,16) + ' | ' + entry.parse);
}
console.log('LIVE | ' + aLiveInfo.mtime + ' | ' + aLiveInfo.size + ' | ' + aLiveInfo.sha256.substring(0,16) + ' | ' + aLiveInfo.parse);

// Find the EARLIEST backup (closest to Session 3 baseline)
const earliestA = aBackups[0];
const latestA = aBackups[aBackups.length - 1];

console.log('\nEarliest backup: ' + (earliestA ? earliestA.label : 'NONE') + ' (size=' + (earliestA ? earliestA.size : 'N/A') + ')');
console.log('Session 3 baseline (claimed): size=1906854, SHA=ABC961B224F3D9E2...');
console.log('Current live: size=' + aLiveInfo.size + ', SHA=' + aLiveInfo.sha256.substring(0,16) + '...');

// === PACK C ===
console.log('\n--- Pack C ---\n');

const allC = [];
const cLive = path.join(base, 'pack_c_corrected.js');
const cLiveInfo = fileInfo(cLive);
if (cLiveInfo) allC.push({ label: 'LIVE', ...cLiveInfo, parse: tryParse(cLive) });

const cBackups = [];
const rootFilesC = fs.readdirSync(rootDir).filter(f => f.startsWith('pack_c_corrected.js.bak'));
for (const f of rootFilesC) {
  const fpath = path.join(rootDir, f);
  const info = fileInfo(fpath);
  if (info) {
    const tsMatch = f.match(/\.bak-(\d{14})/);
    const tsLabel = tsMatch ? tsMatch[1] : 'unknown';
    cBackups.push({ label: f, tsLabel, ...info, parse: tryParse(fpath) });
  }
}
if (fs.existsSync(backupsDir)) {
  const bkFiles = fs.readdirSync(backupsDir).filter(f => f.startsWith('pack_c_corrected.js.bak'));
  for (const f of bkFiles) {
    const fpath = path.join(backupsDir, f);
    const info = fileInfo(fpath);
    if (info) {
      const tsMatch = f.match(/\.bak-(\d{14})/);
      const tsLabel = tsMatch ? tsMatch[1] : 'unknown';
      cBackups.push({ label: f + ' (backups/)', tsLabel, ...info, parse: tryParse(fpath) });
    }
  }
}

cBackups.sort((a, b) => a.mtime.localeCompare(b.mtime));

console.log('File | Timestamp | Size | SHA-256 (first 16) | Parse Result');
console.log('-----|-----------|------|-------------------|--------------');
for (const entry of cBackups) {
  console.log(entry.label + ' | ' + entry.mtime + ' | ' + entry.size + ' | ' + entry.sha256.substring(0,16) + ' | ' + entry.parse);
}
console.log('LIVE | ' + cLiveInfo.mtime + ' | ' + cLiveInfo.size + ' | ' + cLiveInfo.sha256.substring(0,16) + ' | ' + cLiveInfo.parse);

const earliestC = cBackups[0];
console.log('\nEarliest backup: ' + (earliestC ? earliestC.label : 'NONE') + ' (size=' + (earliestC ? earliestC.size : 'N/A') + ')');
console.log('Session 3 baseline (claimed): size=1767306, SHA=9B8E8C679F2F3E59...');
console.log('Current live: size=' + cLiveInfo.size + ', SHA=' + cLiveInfo.sha256.substring(0,16) + '...');
