const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\pack_d_corrected.js', 'utf8');

// Find P1-DD-062
const qidIdx = c.indexOf('"QuestionID": "P1-DD-062"');
if (qidIdx === -1) { console.log('QID not found'); process.exit(1); }

// Find "Part": 1, before QID
const partIdx = c.lastIndexOf('"Part": 1,', qidIdx);
if (partIdx === -1) { console.log('Part not found'); process.exit(1); }

const openBrace = c.substring(0, partIdx).lastIndexOf('{');
if (openBrace === -1) { console.log('Brace not found'); process.exit(1); }

// Forward brace match
let pos = openBrace + 1, depth = 1, inString = false, esc = false;
while (pos < c.length && depth > 0) {
  const ch = c[pos];
  if (ch === '{' && !inString) depth++;
  else if (ch === '}' && !inString) { depth--; if (depth === 0) break; }
  else if (ch === '"' && !esc) inString = !inString;
  esc = (ch === '\\' && inString && !esc);
  pos++;
}
const itemEnd = pos;

const newItem = `{
		"Part": 1,
		"Section": "D",
		"SectionName": "Cost Management",
		"Topic": "D.062 evaluate product mix shift tradeoff BEP vs total CM",
		"MicroTopic": "evaluate product mix shift tradeoff BEP vs total CM",
		"UniqueConceptKey": "D-D062-evaluate-product-mix-shift-tradeoff-bep-vs-cm",
		"LOSTag": "D Cost management",
		"Difficulty": "Difficult",
		"ItemType": "MCQ",
		"ItemStyle": "single-select",
		"Stem": "Westbrook Company sells two products in a constant sales mix. Product X sells for $120 per unit with variable costs of $78 (CM = $42) and represents 60% of unit sales. Product Y sells for $95 per unit with variable costs of $62 (CM = $33) and represents 40% of unit sales. Total fixed costs are $468,000. The current weighted-average contribution margin (WACM) is $38.40, producing a break-even point of 12,188 units and operating income of $151,200 at the forecasted 16,125 units. The marketing director, Angela Frost, has proposed a campaign to shift the product mix toward the higher-priced Product X, targeting a new mix of 75% X / 25% Y. The campaign would cost $52,000 annually. Frost projects that the campaign would not change total unit sales. However, the operations manager warns that Product X requires more skilled labor and a shift to 75% X would create production bottlenecks, adding $38,000 in overtime and expediting costs. Which recommendation should the controller present?",
		"Choices": {
			"A": "Approve the mix shift. New WACM = (75% x $42) + (25% x $33) = $39.75. New BEP = ($468,000 + $52,000 + $38,000) / $39.75 = 14,038 units. Operating income = (16,125 x $39.75) - $558,000 = $82,969, which is lower than the current $151,200. But the campaign positions Westbrook for long-term growth in the higher-margin Product X segment.",
			"B": "Reject the mix shift and retain the 60/40 mix. The current operating income of $151,200 exceeds the proposed $82,969 by $68,231. While the shift to Product X increases the WACM per unit by $1.35, the additional $90,000 in combined campaign and bottleneck costs more than consumes the $21,769 in additional contribution margin from the mix shift. The higher BEP of 14,038 units versus 12,188 also reduces the margin of safety from 24.4% to 12.9%.",
			"C": "Approve the mix shift but phase out Product Y entirely over two years. At $42 CM and $558,000 fixed costs, BEP = 13,286 units. At 16,125 units of X only, operating income = $119,250 \u2014 lower than the current $151,200 but the single-product focus reduces production complexity.",
			"D": "Approve the mix shift but negotiate the campaign cost down to $35,000. New fixed costs = $541,000. Operating income = (16,125 x $39.75) - $541,000 = $99,969 \u2014 still $51,231 below current, but a compromise that captures partial benefit."
		},
		"CorrectChoice": "B",
		"ExplanationCorrect": "The controller must evaluate the proposal using incremental CVP analysis. Current contribution: 16,125 x $38.40 = $619,200. Operating income = $619,200 - $468,000 = $151,200. Proposed new WACM: (75% x $42) + (25% x $33) = $39.75. The WACM increases by $1.35 per unit because Product X ($42 CM) displaces Product Y ($33 CM). At 16,125 units, incremental CM = 16,125 x $1.35 = $21,769. Full incremental costs: $52,000 + $38,000 = $90,000. Net impact = $21,769 - $90,000 = -$68,231 reduction in operating income. The break-even point increases from 12,188 to 14,038, nearly halving the margin of safety. The recommendation must be to reject. The marketing director's focus on CM per unit overlooks that the fixed-cost increase is disproportionate. At the proposed WACM of $39.75, an additional 2,264 units ($90,000 / $39.75) beyond 16,125 would be needed just to break even on the incremental costs. This is a classic case where higher CM per unit does not translate to higher operating income when fixed costs rise significantly.",
		"StudyLinks": [
			{
				"label": "IMA CMA Learning Outcome Statements, Part 1 Section D",
				"url": "https://prodcm.imanet.org/-/media/IMA/Files/Home/IMA-Certifications/CMA-Certification/2024-CMA-Learning-Outcome-Statement-Final.ashx"
			},
			{
				"label": "OpenStax Managerial Accounting: Activity-Based Costing",
				"url": "https://openstax.org/books/principles-managerial-accounting/pages/6-introduction"
			}
		],
		"SourceDescription": "Original CMA Part 1 exam-style practice. Not real CMA exam content and not copied from official samples.",
		"Part1OnlyFlag": true,
		"ReviewNote": "If missed or marked, review the linked study materials and rework the underlying concept without looking at the answer.",
		"QuestionID": "P1-DD-062",
		"CalculationItem": false,
		"VerifiedChecks": [
			"Mapped to CMA Part 1 Learning Outcome Statements effective September 1, 2024",
			"Screened to exclude Part 2-only topics such as CVP, financial ratio analysis, capital budgeting, corporate finance, ERM, and ethics",
			"Original practice item with unique micro-topic and stem",
			"Answer key distribution balanced across A/B/C/D",
			"Distractors written as plausible CMA-style traps"
		],
		"ExplanationWrongA": "This option correctly computes the new WACM and operating income but the recommendation to approve contradicts the math. Operating income falls from $151,200 to $82,969 \u2014 a 45% decline. A candidate selecting this may agree with the computation but fail to apply the logical conclusion: the controller must not recommend a course of action that demonstrably reduces profit, even if the strategic positioning argument has qualitative appeal.",
		"ExplanationWrongB": "",
		"ExplanationWrongC": "Phasing out Product Y eliminates 6,450 units (40% of 16,125) at $33 CM = $212,850 in contribution, while saving only $38,000 in bottleneck costs and adding $0 in campaign costs. Even at the higher $42 CM for Product X, replacing Y's volume with X would require 5,071 additional X units (($33 x 6,450) / $42) just to maintain current CM \u2014 requiring total X volume of 14,746, which would leave Y's former customers unserved. A candidate selecting this may be focused on reducing complexity without quantifying the CM sacrificed.",
		"ExplanationWrongD": "Negotiating the campaign cost down to $35,000 reduces the income decline from $68,231 to $51,231 \u2014 a smaller loss, but still a loss. The controller's recommendation must be based on best available estimates, not hypothetical renegotiation. Recommending approval conditional on cost reduction subordinates the analytical decision to an uncertain future event. A candidate may be attempting to salvage a proposal they favor rather than evaluating it objectively.",
		"question_state": "Certified",
		"DifficultyScore": 4,
		"CognitiveLevel": "Evaluate"
	}`;

const newContent = c.substring(0, openBrace) + newItem + c.substring(itemEnd + 1);
fs.writeFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\pack_d_corrected.js', newContent);

// Verify
try { new Function(newContent); console.log('Parse: PASS'); }
catch(e) { console.log('Parse: FAIL — ' + e.message); }

console.log('P1-DD-062 applied to Pack D');
