const http = require('http');
const { parsePack, toCanonicalRecords } = require('./lib/pack_parser.js');
const fs = require('fs');

const content = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf-8');
const parsed = parsePack(content, { sourceName: 'A' });
const canonical = toCanonicalRecords(parsed);
const rawRec = parsed.records[0];
const stem = (rawRec && rawRec.object && rawRec.object.Stem) || '';
const item = {
  qid: canonical[0].qid,
  stem: stem,
  choices: canonical[0].choices,
  explanationCorrect: canonical[0].explanationCorrect,
};

const prompt = 'You are a CMA Part 1 exam expert.\n\nFor each MCQ item below, do two things:\n1. Independently solve using ONLY stem + choices (do NOT read EC yet).\n2. Read the EC, state which choice (A/B/C/D) it supports.\n\nOutput STRICT JSON array only:\n[{"qid":"...","derived":"A/B/C/D","confidence":"high/medium/low","reasoning":"brief","ec_supports":"A/B/C/D","ec_agree":true/false,"note":""}]\n\nItems:\n' + JSON.stringify([item]);

const payload = JSON.stringify({
  model: 'auto/best-coding',
  messages: [{ role: 'user', content: prompt }],
  temperature: 0,
  stream: false,
});

console.log('Sending request...');
console.log('Prompt length:', prompt.length, 'chars');
console.log('Payload size:', Buffer.byteLength(payload), 'bytes');

const req = http.request('http://127.0.0.1:20128/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-036c5aaaf75a4581-5eafb0-e1239330',
    'Content-Length': Buffer.byteLength(payload),
  },
  timeout: 90000,
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    try {
      const j = JSON.parse(body);
      const content = j.choices?.[0]?.message?.content || '';
      console.log('\n=== Response ===');
      console.log('Status:', res.statusCode);
      console.log('Model:', j.model);
      console.log('Usage:', JSON.stringify(j.usage));
      console.log('Content:', content.substring(0, 800));
    } catch(e) {
      console.log('PARSE ERROR:', e.message);
      console.log('Body:', body.substring(0, 300));
    }
  });
});

req.on('error', e => console.log('REQUEST ERROR:', e.message));
req.on('timeout', () => { console.log('TIMEOUT'); req.destroy(); });
req.write(payload);
req.end();
