/**
 * fix_b1_meta.js — Rewrites the meta-contaminated EC/EW texts in p2d_batch1_content.json
 * (items 2,3,4,9,10,11,12,13) with clean, internally-consistent prose that names the CC
 * letter (per the relocated manifest) and explains each distractor without meta-commentary.
 */
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

function setItem(idx, fields) {
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined) continue;
    items[idx][k] = v;
  }
}

// ── Item 2 (P2-D-247) cc=C — Performance example. The correct Performance activity is
//    scoring a supplier risk + selecting mitigation, which must be at C. Relocate content:
//    B currently holds that correct text; C holds "internal audit testing framework fit".
//    The relocation script did NOT move these (they were at different letters with matching
//    cc), so we must hand-swap B and C so C = the Performance example.
const it2 = items[1];
const ch2 = it2.choices;
const tmp2 = ch2.C; ch2.C = ch2.B; ch2.B = tmp2;
const ew2 = it2.ew;
const tmpEw2 = ew2.C; ew2.C = ew2.B; ew2.B = tmpEw2;
const di2 = it2.di;
const tmpDi2 = di2.C; di2.C = di2.B; di2.B = tmpDi2;
it2.cc = "C";
setItem(1, {
  ec: "Under COSO ERM 2017, the Performance component identifies risk, assesses severity and likelihood, prioritizes risks, and implements responses within the boundaries set by governance and strategy. Scoring a new supplier risk on likelihood and impact and then selecting a mitigation response is the clearest example: it is the assessment-and-response cycle itself. Option C states this activity. Governance and Culture sets appetite (Option A), Review and Revision evaluates framework suitability (the internal-audit framework-fit testing), and audit oversight of historical disclosures (Option D) is an internal-control activity, not the Performance risk cycle.",
  ew: {
    A: "Option A is wrong because re-approving the risk appetite statement is a Governance and Culture activity — the board setting the amount and type of risk the organization will accept. Performance executes within that appetite by identifying, assessing, and responding to specific risks; setting the boundary is not itself a Performance activity.",
    B: "Option B is wrong because internal audit testing whether the ERM framework still fits the company's new business model is a Review and Revision activity, which evaluates whether the framework, responses, and appetite remain suitable as the organization changes. Performance addresses current risks; framework suitability review is a separate component.",
    C: "",
    D: "Option D is wrong because reviewing last year's loss events for disclosure accuracy is a financial reporting and internal-control activity tied to the audit committee's oversight, not the forward-looking identification, assessment, and response cycle that defines Performance in COSO ERM 2017."
  },
  uniqueness: "Option A is appetite-setting (Governance and Culture); Option B is framework-suitability testing (Review and Revision); Option D is audit oversight; Option C is the Performance assessment-and-response cycle.",
  di: {
    A: { misconception: "Attributes appetite-setting to Performance", why_plausible: "Both involve the board and risk, so candidates may place appetite approval inside the risk-response cycle", tier_candidate: 1 },
    B: { misconception: "Mistakes framework suitability testing for Performance", why_plausible: "Review and Revision sounds like assessment, but it evaluates the framework itself rather than responding to risks", tier_candidate: 2 },
    D: { misconception: "Treats historical loss review as risk assessment", why_plausible: "Audit committee review of losses resembles assessment but is backward-looking disclosure oversight, not forward-looking risk response", tier_candidate: 3 }
  },
  ssk_conclusion: "The risk-scoring-and-response activity is Performance, making Option C correct."
});

// ── Item 3 (P2-D-248) cc=B — Expected loss = 0.04 x 1.2M x 0.60 = 28,800. The manifest CC=B
//    but the correct $28,800 is at A. Hand-swap A and B so B holds $28,800.
const it3 = items[2];
const ch3 = it3.choices;
const tmp3 = ch3.B; ch3.B = ch3.A; ch3.A = tmp3;
const ew3 = it3.ew;
const tmpEw3 = ew3.B; ew3.B = ew3.A; ew3.A = tmpEw3;
const di3 = it3.di;
const tmpDi3 = di3.B; di3.B = di3.A; di3.A = tmpDi3;
it3.cc = "B";
setItem(2, {
  ec: "Under COSO ERM 2017 Performance (risk assessment), Expected Loss = Probability x Impact, and for credit risk the impact is Exposure x Loss-Given-Default. Recomputed: 0.04 x $1,200,000 = $48,000 expected exposure; then x 0.60 LGD = $28,800 expected loss. Option B states the correct answer. $48,000 (Option A) is the expected exposure before applying LGD; $720,000 (Option C) is the conditional loss given default; $1,152,000 (Option D) inverts the probability.",
  ew: {
    A: "Option A is wrong because $48,000 is the expected exposure (0.04 x $1,200,000) before applying loss given default. Expected loss requires the full chain Probability x Exposure x LGD; stopping after the probability weighting omits the 60% recovery shortfall and overstates the expected credit loss.",
    B: "",
    C: "Option C is wrong because $720,000 is the loss given default alone (60% x $1,200,000) before weighting by the 4% probability of default. This is the conditional loss if default occurs, not the expected loss, which must also reflect that default happens only 4% of the time.",
    D: "Option D is wrong because $1,152,000 is 96% of the exposure, the complement of the default probability. This reverses the probability logic — the expected loss weights the 4% loss outcome by 60% LGD; it is not the loan amount reduced by the survival probability."
  },
  uniqueness: "Option A omits LGD (48,000); Option C uses conditional loss without probability weighting (720,000); Option D inverts the probability (1,152,000); Option B is the full PD x EAD x LGD chain (28,800).",
  di: {
    A: { misconception: "Omits loss given default entirely", why_plausible: "PD x exposure is a natural first computation and the 48,000 result looks plausible when LGD is forgotten", tier_candidate: 1 },
    C: { misconception: "Uses conditional loss given default without probability weighting", why_plausible: "The 720,000 figure is the actual loss if default occurs, tempting candidates who skip the probability step", tier_candidate: 2 },
    D: { misconception: "Reverses the probability into the survival rate", why_plausible: "96% of exposure appears meaningful and the arithmetic is clean, masking the inverted logic", tier_candidate: 3 }
  },
  ssk_conclusion: "The correct expected loss is $28,800, which is Option B."
});

// ── Item 4 (P2-D-249) cc=D — useful appetite feature = measurable thresholds. It's at A;
//    manifest CC=D. Hand-swap A and D so D holds the measurable-threshold feature.
const it4 = items[3];
const ch4 = it4.choices;
const tmp4 = ch4.D; ch4.D = ch4.A; ch4.A = tmp4;
const ew4 = it4.ew;
const tmpEw4 = ew4.D; ew4.D = ew4.A; ew4.A = tmpEw4;
const di4 = it4.di;
const tmpDi4 = di4.D; di4.D = di4.A; di4.A = tmpDi4;
it4.cc = "D";
setItem(3, {
  ec: "Under COSO ERM 2017, an effective risk appetite statement is quantitative where possible and is cascaded into risk tolerance (acceptable variation around objectives) and limits that business units monitor with risk indicators. The proposed language converts appetite into measurable thresholds — a $5 million currency cap and a 10% earnings-volatility bound — which management can translate into unit-level limits and monitor through KRIs. Option D states this measurable-threshold feature, which is what makes the statement most useful. The statement does not replace tolerance bands (Option A misstates this), is not treasury-only (Option C), and is not legally binding on its own (Option B).",
  ew: {
    A: "Option A is wrong because it claims the quantified statement eliminates the need for tolerance bands. Tolerance operationalizes appetite at finer levels (per business unit, per risk type) and can be tighter than the appetite ceiling; the two work together, and one company-wide number does not replace the tolerance cascade.",
    B: "Option B is wrong because a risk appetite statement is not legally binding and does not automatically cap all risk-taking. It expresses the board's willingness to accept risk; management implements it through limits, tolerances, and monitoring, and the statement is a governance declaration, not a statute.",
    C: "Option C is wrong because risk appetite is a board-level declaration of the risk the organization will accept in pursuing strategy; it is not confined to treasury. Currency and earnings limits are enterprise-wide, and the board — not the treasury function — approves and owns the statement.",
    D: ""
  },
  uniqueness: "Option A misstates tolerance elimination; Option B claims legal binding; Option C confines appetite to treasury; Option D is the measurable-threshold feature.",
  di: {
    A: { misconception: "Thinks tolerance equals appetite at one company-wide number", why_plausible: "Candidates may treat tolerance as a synonym for appetite rather than the operational cascade", tier_candidate: 1 },
    B: { misconception: "Treats the appetite statement as legally binding", why_plausible: "Board-approved statements feel authoritative, so candidates may overstate their enforceability", tier_candidate: 2 },
    C: { misconception: "Confines appetite to treasury", why_plausible: "Currency risk is treasury-adjacent, so candidates may assume the statement is function-specific", tier_candidate: 3 }
  },
  ssk_conclusion: "The measurable-threshold structure is the useful feature, making Option D correct."
});

// ── Item 9 (P2-D-254) cc=D — the $40M loan breaches the single-borrower tolerance. That
//    analysis is at B; manifest CC=D. Hand-swap B and D.
const it9 = items[8];
const ch9 = it9.choices;
const tmp9 = ch9.D; ch9.D = ch9.B; ch9.B = tmp9;
const ew9 = it9.ew;
const tmpEw9 = ew9.D; ew9.D = ew9.B; ew9.B = tmpEw9;
const di9 = it9.di;
const tmpDi9 = di9.D; di9.D = di9.B; di9.B = tmpDi9;
it9.cc = "D";
setItem(8, {
  ec: "Under COSO ERM 2017, risk capacity is the maximum risk the organization can absorb (here $120 million), risk appetite is the amount it is willing to accept (here $18 million of annual credit losses), and risk tolerance is the acceptable variation around objectives at the operating level (here a $30 million single-borrower band). The $40 million loan breaches the $30 million single-borrower tolerance band, requiring escalation or restructuring below the band — the tolerance breach is the operative signal. Option D states this. Capacity is larger ($120M) so the loan does not breach it (Option A), appetite is a loss-level statement not a per-loan limit (Option C), and the tolerance band does bind despite capacity being larger.",
  ew: {
    A: "Option A is wrong because risk capacity is the maximum the organization can absorb ($120 million); $40 million is well below it. Capacity defines the outer survival limit, not the operating limit, so the loan does not breach capacity and capacity does not itself mandate decline.",
    B: "Option B is wrong because it claims the loan breaches no boundary. The $40 million exposure is below capacity but above the $30 million single-borrower tolerance band, and tolerance operationalizes appetite at the transaction level — the breach is real and requires escalation or restructuring.",
    C: "Option C is wrong because risk appetite is the amount of risk the organization is willing to accept — here $18 million of annual credit losses — which is a loss measure, not a single-exposure limit. The $40 million exposure breaches the $30 million single-borrower tolerance band, not the annual loss appetite; divesting all other exposure would be a disproportionate response.",
    D: ""
  },
  uniqueness: "Option A cites capacity incorrectly; Option B claims no breach; Option C misreads appetite as a transaction limit; Option D identifies the tolerance breach.",
  di: {
    A: { misconception: "Equates capacity with the binding transaction limit", why_plausible: "Capacity is the largest number and candidates may treat the largest boundary as the one that binds", tier_candidate: 1 },
    B: { misconception: "Ignores the tolerance band when capacity is larger", why_plausible: "Comparing only to the largest number hides the transaction-level tolerance that actually binds", tier_candidate: 2 },
    C: { misconception: "Mistakes a transaction breach for an appetite breach", why_plausible: "Appetite is a loss-level statement, and the $18M figure invites candidates to compare it against the loan amount directly", tier_candidate: 3 }
  },
  ssk_conclusion: "The loan breaches the $30M tolerance band, requiring escalation — Option D."
});

// ── Item 10 (P2-D-255) cc=B — residual EL = 0.40 x 5M x 0.30 = 600,000. Correct figure at A;
//    manifest CC=B. Hand-swap A and B.
const it10 = items[9];
const ch10 = it10.choices;
const tmp10 = ch10.B; ch10.B = ch10.A; ch10.A = tmp10;
const ew10 = it10.ew;
const tmpEw10 = ew10.B; ew10.B = ew10.A; ew10.A = tmpEw10;
const di10 = it10.di;
const tmpDi10 = di10.B; di10.B = di10.A; di10.A = tmpDi10;
it10.cc = "B";
setItem(9, {
  ec: "Residual expected loss applies the control effectiveness to the inherent expected loss. Inherent expected loss = 0.40 x $5,000,000 = $2,000,000. With 70% control effectiveness, the residual is the 30% of inherent exposure not covered by controls: $2,000,000 x (1 - 0.70) = $600,000. Recomputed: 0.40 x 5,000,000 = 2,000,000; 2,000,000 x 0.30 = 600,000. Option B states the correct answer. Option A ($1,400,000) is the portion covered by controls (70% x $2M); Option C is the inherent EL before reduction; Option D applies effectiveness to impact while dropping probability.",
  ew: {
    A: "Option A is wrong because $1,400,000 is the amount of inherent expected loss the controls cover (70% x $2,000,000), not the residual that remains. The question asks for the residual exposure after controls, which is the uncovered 30% ($600,000).",
    B: "",
    C: "Option C is wrong because $2,000,000 is the inherent expected loss (0.40 x $5,000,000) before any control reduction. This is the pre-control baseline; residual expected loss must reflect the 70% effectiveness of the controls applied.",
    D: "Option D is wrong because $3,500,000 is 70% of the inherent impact (0.70 x $5,000,000), which treats the control effectiveness as reducing the impact but ignores the 40% likelihood weighting entirely. Expected loss requires the probability-weighted impact reduced by the control effect."
  },
  uniqueness: "Option A is the covered portion (70% x $2M = $1.4M); Option C stops at inherent EL; Option D drops probability; Option B is the residual 0.40 x 5M x 0.30 = $600,000.",
  di: {
    A: { misconception: "Reports the covered amount instead of the residual", why_plausible: "70% x $2M is a clean computation, and candidates may report what controls absorb rather than what remains", tier_candidate: 1 },
    C: { misconception: "Stops at inherent expected loss without control reduction", why_plausible: "The 2,000,000 baseline is a natural intermediate, and candidates may submit it without the final step", tier_candidate: 2 },
    D: { misconception: "Applies effectiveness to impact while dropping probability", why_plausible: "70% x 5,000,000 is an easy computation that yields a large plausible number", tier_candidate: 3 }
  },
  ssk_conclusion: "The residual expected loss is $600,000, which is Option B."
});

// ── Item 11 (P2-D-256) cc=C — tail-revealing scenario design = correlated severe scenarios.
//    It's at B; manifest CC=C. Hand-swap B and C.
const it11 = items[10];
const ch11 = it11.choices;
const tmp11 = ch11.C; ch11.C = ch11.B; ch11.B = tmp11;
const ew11 = it11.ew;
const tmpEw11 = ew11.C; ew11.C = ew11.B; ew11.B = tmpEw11;
const di11 = it11.di;
const tmpDi11 = di11.C; di11.C = di11.B; di11.B = tmpDi11;
it11.cc = "C";
setItem(10, {
  ec: "Under COSO ERM 2017, scenario analysis explores plausible futures — including severe ones — by varying assumptions and examining how risks interact. Modeling several plausible severe scenarios, varying key assumptions, and examining how losses compound across correlated exposures reveals the tail behavior a point-estimate or history-only exercise misses. Option C states this design. A single most-likely scenario (Option A) suppresses the tail; history-only (Option B) cannot capture unprecedented events; excluding correlation (Option D) understates joint losses in a downturn.",
  ew: {
    A: "Option A is wrong because stressing only the single most likely scenario with point estimates suppresses the tail — the extreme, low-probability combinations that drive severe losses. A single point-estimate path cannot reveal how assumptions interact under stress, so it undermines the tail-risk objective.",
    B: "Option B is wrong because historical losses understate tail risk: severe events may be rare or unprecedented, and scenario analysis exists precisely to explore plausible futures beyond the historical record. Relying on history alone ignores new risk drivers and structural changes.",
    C: "",
    D: "Option D is wrong because excluding correlation understates portfolio tail risk — correlated exposures compound in a downturn, so multiple lines fail together. Scenario analysis should model dependence, not assume independence, to reveal the true joint tail."
  },
  uniqueness: "Option A suppresses the tail with point estimates; Option B trusts history alone; Option D hides correlation; Option C models severe correlated scenarios.",
  di: {
    A: { misconception: "Equates likelihood with tail relevance", why_plausible: "The most likely scenario feels most informative, but tail risk lives in the severe, less likely combinations", tier_candidate: 1 },
    B: { misconception: "Trusts history to capture the tail", why_plausible: "Historical loss data is concrete and defensible, but tail events are often outside the observed record", tier_candidate: 2 },
    D: { misconception: "Assumes independence simplifies correctly", why_plausible: "Isolating risks makes the math cleaner but hides the correlation that drives systemic tail losses", tier_candidate: 3 }
  },
  ssk_conclusion: "Modeling severe correlated scenarios is the tail-revealing design — Option C."
});

// ── Item 12 (P2-D-257) cc=A — appetite screens strategic alternatives during formulation.
//    It's at B; manifest CC=A. Hand-swap A and B.
const it12 = items[11];
const ch12 = it12.choices;
const tmp12 = ch12.A; ch12.A = ch12.B; ch12.B = tmp12;
const ew12 = it12.ew;
const tmpEw12 = ew12.A; ew12.A = ew12.B; ew12.B = tmpEw12;
const di12 = it12.di;
const tmpDi12 = di12.A; di12.A = di12.B; di12.B = tmpDi12;
it12.cc = "A";
setItem(11, {
  ec: "Under COSO ERM 2017, one of the framework's defining advances is integrating risk management with strategy. Risk appetite is developed and applied during strategy formulation, so strategic alternatives are screened against the amount and type of risk the organization is willing to accept. Option A states this integration. This prevents the company from committing to a strategy that exceeds its appetite and forces explicit discussion of the risk-return tradeoff. Post-hoc documentation (Option B), isolation from strategy (Option C), and transaction-only application (Option D) each contradict the framework's strategy-integration requirement.",
  ew: {
    A: "",
    B: "Option B is wrong because setting appetite only after strategy approval documents rather than guides the strategic choice. COSO ERM 2017 requires appetite to inform strategy formulation, so that the company does not commit to a strategy whose risk profile exceeds what it is willing to accept.",
    C: "Option C is wrong because COSO ERM 2017 explicitly integrates risk with strategy: management considers appetite when developing, selecting, and executing strategy. Treating strategy as a growth decision isolated from risk reintroduces the silo approach ERM was designed to eliminate.",
    D: "Option D is wrong because appetite cascades from the enterprise level to business units and portfolios; applying it only at transaction level ignores the portfolio view that prevents risk concentration across the organization."
  },
  uniqueness: "Option B documents after the fact; Option C separates strategy from risk; Option D limits appetite to transactions; Option A screens alternatives during formulation.",
  di: {
    B: { misconception: "Believes appetite is documented after strategy", why_plausible: "Many firms do document appetite late, making this a plausible but non-compliant practice", tier_candidate: 1 },
    C: { misconception: "Separates strategy from risk as distinct domains", why_plausible: "The strategy-vs-treasury split mirrors legacy silo thinking that ERM replaced", tier_candidate: 2 },
    D: { misconception: "Limits appetite to transactions", why_plausible: "Transaction-level limits are familiar from credit and trading, so candidates may miss the portfolio cascade", tier_candidate: 3 }
  },
  ssk_conclusion: "Appetite screens strategic alternatives during formulation — Option A."
});

// ── Item 13 (P2-D-258) cc=D — register updated continuously with formal annual review.
//    It's at A; manifest CC=D. Hand-swap A and D.
const it13 = items[12];
const ch13 = it13.choices;
const tmp13 = ch13.D; ch13.D = ch13.A; ch13.A = tmp13;
const ew13 = it13.ew;
const tmpEw13 = ew13.D; ew13.D = ew13.A; ew13.A = tmpEw13;
const di13 = it13.di;
const tmpDi13 = di13.D; di13.D = di13.A; di13.A = tmpDi13;
it13.cc = "D";
setItem(12, {
  ec: "Under COSO ERM 2017, risk information must remain current to support decision-making: risks, controls, and the environment change continuously, so the register should be refreshed as those changes occur, with a formal review at least annually. Option D states this cadence principle. Waiting for a loss (Option A), freezing for the year (Option B), or treating the register as a static annual document (Option C) each make the register a historical artifact rather than a decision tool.",
  ew: {
    A: "Option A is wrong because updating only when a loss occurs records history rather than managing forward-looking exposure. The register must reflect emerging risks and control changes before events occur, not merely document losses after the fact.",
    B: "Option B is wrong because a static annual document cannot support timely risk decisions; the register is a living assessment tool refreshed as conditions change, not a once-a-year board artifact. Freezing it for a year would leave management acting on stale risk information.",
    C: "Option C is wrong because the register is not a static annual document prepared only for the board meeting. It must be refreshed as risks, controls, and the environment change, with formal review at least annually — the living-tool cadence.",
    D: ""
  },
  uniqueness: "Option A reduces the register to a loss log; Option B freezes it as an annual artifact; Option C treats it as a static board document; Option D states the continuous-update principle.",
  di: {
    A: { misconception: "Reduces the register to a loss log", why_plausible: "Recording losses after the fact is concrete and tempting, but it abandons forward-looking risk management", tier_candidate: 1 },
    B: { misconception: "Freezes the register for the fiscal year", why_plausible: "Comparability arguments sound rigorous, but they sacrifice the currency the register needs", tier_candidate: 2 },
    C: { misconception: "Treats the register as a static annual document", why_plausible: "Annual board reporting is familiar, making a static register plausible", tier_candidate: 3 }
  },
  ssk_conclusion: "The register is refreshed continuously with formal annual review — Option D."
});

fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log("Batch 1 content fixed: items 2,3,4,9,10,11,12,13 rewritten clean.");
