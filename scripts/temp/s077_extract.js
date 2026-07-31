const fs = require('fs');
const src = fs.readFileSync('pack_a_corrected.js', 'utf8');

const qids = ['P1-B-001','P1-B-003','P1-B-004','P1-B-007','P1-B-008',
              'P1-B-009','P1-B-010','P1-B-011','P1-B-013','P1-B-016',
              'P1-B-022','P1-B-030','P1-B-036','P1-B-039','P1-B-070'];

for (const qid of qids) {
  // Find QuestionID position
  const idx = src.indexOf('"QuestionID": "' + qid + '"');
  if (idx === -1) { console.log(qid + ': NOT FOUND'); continue; }
  
  // Find the enclosing brace boundaries — search backward for '{' and forward for matching '}'
  // The metadata block starts with '{' before QuestionID
  let start = idx;
  let depth = 0;
  // Search backward for opening brace
  for (let i = idx; i >= 0; i--) {
    if (src[i] === '}') depth++;
    if (src[i] === '{') {
      if (depth === 0) { start = i; break; }
      depth--;
    }
  }
  
  // Search forward for closing brace (metadata block)
  let metaEnd = idx;
  depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start + 1; i < src.length; i++) {
    if (escape) { escape = false; continue; }
    if (src[i] === '\\') { escape = true; continue; }
    if (src[i] === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (src[i] === '{') depth++;
    if (src[i] === '}') {
      if (depth === 0) { metaEnd = i; break; }
      depth--;
    }
  }
  
  // Now find the content block (next '{')
  let contentStart = -1;
  inString = false;
  escape = false;
  for (let i = metaEnd + 1; i < src.length; i++) {
    if (escape) { escape = false; continue; }
    if (src[i] === '\\') { escape = true; continue; }
    if (src[i] === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (src[i] === '{') { contentStart = i; break; }
  }
  
  // Find content block end
  let contentEnd = -1;
  if (contentStart !== -1) {
    depth = 0;
    inString = false;
    escape = false;
    for (let i = contentStart + 1; i < src.length; i++) {
      if (escape) { escape = false; continue; }
      if (src[i] === '\\') { escape = true; continue; }
      if (src[i] === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (src[i] === '{') depth++;
      if (src[i] === '}') {
        if (depth === 0) { contentEnd = i; break; }
        depth--;
      }
    }
  }
  
  // Extract metadata and content blocks
  const metaBlock = src.substring(start, metaEnd + 1);
  const contentBlock = (contentStart !== -1 && contentEnd !== -1) ? 
    src.substring(contentStart, contentEnd + 1) : 'NONE';
  
  // Save to file
  const extract = {
    qid: qid,
    fileStart: start,
    metaEnd: metaEnd,
    contentStart: contentStart,
    contentEnd: contentEnd,
    metaBlock: metaBlock,
    contentBlock: contentBlock
  };
  
  fs.writeFileSync('scripts/temp/s077_' + qid.replace(/-/g, '_') + '.json', JSON.stringify(extract, null, 2));
  console.log(qid + ': meta=' + metaBlock.length + ' chars, content=' + contentBlock.length + ' chars');
}
