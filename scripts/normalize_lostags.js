// Normalize LOSTag values to canonical P1-<Section>.<N> format
const fs = require('fs');
const path = require('path');

const packs = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];
let totalChanged = 0;

function normalizeTag(tag) {
  let newTag = tag;
  
  // Rule 1: "Part 1 Section X.Y" -> "P1-X.Y"
  if (tag.startsWith('Part 1 Section ')) {
    newTag = tag.replace('Part 1 Section ', 'P1-');
  }
  // Rule 2: "LOS: Part 1, Section X.Y.Z - Desc" -> "P1-X.Y.Z Desc"
  else if (tag.startsWith('LOS: Part 1, Section ')) {
    newTag = tag.replace('LOS: Part 1, Section ', 'P1-');
  }
  // Rule 3: Add P1- prefix to tags starting with A-F that don't already have it
  else if (/^[A-F]([. ]|$)/.test(tag) && !tag.startsWith('P1-')) {
    newTag = 'P1-' + tag;
  }
  
  return newTag;
}

packs.forEach(p => {
  const fn = path.join('content', 'packs', p + '_corrected.js');
  let content = fs.readFileSync(fn, 'utf8');
  let changed = 0;

  content = content.replace(/"LOSTag": "([^"]+)"/g, (match, tag) => {
    const newTag = normalizeTag(tag);
    if (newTag !== tag) {
      changed++;
      return '"LOSTag": "' + newTag + '"';
    }
    return match;
  });

  if (changed > 0) {
    fs.writeFileSync(fn, content, 'utf8');
  }
  console.log(p + ': ' + changed + ' tags changed');
  totalChanged += changed;
});

console.log('Total changed: ' + totalChanged);
