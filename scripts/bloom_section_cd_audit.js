// READ-ONLY: Bloom's taxonomy audit for Sections C and D across all 5 packs
const fs = require('fs');
const path = require('path');

const PACKS = [
  { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A' },
  { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B' },
  { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C' },
  { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D' },
  { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E' },
];

const BASE = process.argv[2] || '.';

const VALID_BLOOM = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
const VALID_DIFFICULTY = ['Easy', 'Moderate-Easy', 'Moderate', 'Difficult', 'Very Difficult'];

function loadPack(filePath, varName) {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Strip the variable declaration prefix, then re-wrap for Function constructor
  const src = raw + '; return ' + varName + ';';
  const fn = new Function(src);
  return fn();
}

function hasDL008(item) {
  const cc = item.CorrectChoice;
  if (!cc) return null; // unknown — no CC
  const key = 'ExplanationWrong' + cc;
  if (!(key in item)) return null; // field absent — DL-018 pattern
  const val = item[key];
  return (val && val.length > 0);
}

function main() {
  const result = {
    generated: new Date().toISOString(),
    methodology: 'Function-constructor parse, direct field inspection',
    per_pack: {},
    cross_pack_totals: {
      bloom: {},
      difficulty: {},
      dl008_analyze_evaluate: [],
    },
    stem_length_candidates: [],
    summary: {},
  };

  let totalSectionCD = 0;
  let totalDL008_AnalyzeEvaluate = 0;

  for (const pack of PACKS) {
    const filePath = path.join(BASE, pack.file);
    console.error(`Loading ${pack.file}...`);
    const items = loadPack(filePath, pack.varName);
    console.error(`  Loaded ${items.length} items`);

    const packKey = pack.file.replace('.js', '');
    result.per_pack[packKey] = {};

    for (const section of ['C', 'D']) {
      const secItems = items.filter(i => i.Section === section);
      const bloomDist = {};
      const diffDist = {};
      const secDL008 = [];
      const secStemCandidates = [];

      for (const bloom of VALID_BLOOM) bloomDist[bloom] = 0;
      for (const diff of VALID_DIFFICULTY) diffDist[diff] = 0;

      for (const item of secItems) {
        totalSectionCD++;

        // Bloom's
        const bl = item.CognitiveLevel || 'MISSING';
        bloomDist[bl] = (bloomDist[bl] || 0) + 1;

        // Difficulty
        const diff = item.Difficulty || 'MISSING';
        diffDist[diff] = (diffDist[diff] || 0) + 1;

        // DL-008 check for Analyze/Evaluate items
        if (bl === 'Analyze' || bl === 'Evaluate') {
          const dl008 = hasDL008(item);
          if (dl008 === true) {
            totalDL008_AnalyzeEvaluate++;
            secDL008.push({
              QuestionID: item.QuestionID || 'MISSING',
              Section: item.Section,
              CorrectChoice: item.CorrectChoice,
              CognitiveLevel: bl,
              Difficulty: diff,
              Topic: item.Topic || '',
            });
          }
        }

        // Stem length candidates
        const stemLen = (item.Stem || '').length;
        if ((bl === 'Remember' || bl === 'Understand' || bl === 'Apply') && stemLen > 200) {
          secStemCandidates.push({
            QuestionID: item.QuestionID || 'MISSING',
            Section: item.Section,
            CognitiveLevel: bl,
            Difficulty: diff,
            StemLength: stemLen,
            Topic: item.Topic || '',
          });
        }
      }

      result.per_pack[packKey][`Section_${section}`] = {
        count: secItems.length,
        bloom_distribution: bloomDist,
        difficulty_distribution: diffDist,
        dl008_analyze_evaluate: secDL008,
        dl008_count: secDL008.length,
        stem_length_candidates: secStemCandidates,
        stem_candidate_count: secStemCandidates.length,
      };
    }

    // Cross-pack totals
    for (const section of ['C', 'D']) {
      const secKey = `Section_${section}`;
      const secData = result.per_pack[packKey][secKey];
      if (!secData) continue;

      // Bloom totals
      for (const [bl, count] of Object.entries(secData.bloom_distribution)) {
        result.cross_pack_totals.bloom[bl] = (result.cross_pack_totals.bloom[bl] || 0) + count;
      }
      // Difficulty totals
      for (const [df, count] of Object.entries(secData.difficulty_distribution)) {
        result.cross_pack_totals.difficulty[df] = (result.cross_pack_totals.difficulty[df] || 0) + count;
      }
      // DL-008 entries
      for (const entry of secData.dl008_analyze_evaluate) {
        result.cross_pack_totals.dl008_analyze_evaluate.push(entry);
      }
      // Stem candidates
      for (const entry of secData.stem_length_candidates) {
        result.stem_length_candidates.push(entry);
      }
    }
  }

  // Compute bloom percentages
  result.summary.total_items = totalSectionCD;
  result.summary.bloom_percentages = {};
  for (const [bl, count] of Object.entries(result.cross_pack_totals.bloom)) {
    result.summary.bloom_percentages[bl] = {
      count,
      pct: ((count / totalSectionCD) * 100).toFixed(1) + '%',
    };
  }
  result.summary.difficulty_percentages = {};
  for (const [df, count] of Object.entries(result.cross_pack_totals.difficulty)) {
    result.summary.difficulty_percentages[df] = {
      count,
      pct: ((count / totalSectionCD) * 100).toFixed(1) + '%',
    };
  }
  result.summary.total_dl008_analyze_evaluate = totalDL008_AnalyzeEvaluate;
  result.summary.total_stem_candidates = result.stem_length_candidates.length;

  // CAQS §6.2 targets
  result.summary.caqs_targets = {
    'Remember': '5%',
    'Understand': '15%',
    'Apply': '40%',
    'Analyze': '25%',
    'Evaluate': '15%',
  };
  result.summary.caqs_difficulty_targets = {
    'Easy': '15%',
    'Moderate-Easy': '20%',
    'Moderate': '30%',
    'Difficult': '25%',
    'Very Difficult': '10%',
  };

  // Per-pack per-section bloom summaries
  result.summary.per_section_bloom = {};
  for (const [packKey, packData] of Object.entries(result.per_pack)) {
    for (const section of ['C', 'D']) {
      const secKey = `Section_${section}`;
      const secData = packData[secKey];
      if (!secData) continue;
      const label = `${packKey}/Section_${section}`;
      result.summary.per_section_bloom[label] = {
        count: secData.count,
        bloom: {},
      };
      for (const [bl, cnt] of Object.entries(secData.bloom_distribution)) {
        if (cnt > 0) {
          result.summary.per_section_bloom[label].bloom[bl] = cnt;
        }
      }
    }
  }

  console.log(JSON.stringify(result, null, 2));
  console.error('\n=== SUMMARY ===');
  console.error(`Total Section C+D items: ${totalSectionCD}`);
  console.error(`DL-008 on Analyze/Evaluate items: ${totalDL008_AnalyzeEvaluate}`);
  console.error(`Stem length candidates (>200 chars, Apply or below): ${result.stem_length_candidates.length}`);
  console.error(`\nBloom's distribution:`);
  for (const [bl, info] of Object.entries(result.summary.bloom_percentages)) {
    console.error(`  ${bl}: ${info.count} (${info.pct})`);
  }
}

main();
