/**
 * Fix Pattern 2 + Pattern 3: replace boilerplate 327-char template and
 * short explanations with content-specific text for 26 items across the
 * 6 affected Unprocessed cases.
 *
 * Run: node scripts/fix_pack1_explanations.js
 */

const fs = require("fs");
const path = require("path");

const FILE = path.resolve(__dirname, "..", "p2", "case_pack_p2_1.js");
const raw = fs.readFileSync(FILE, "utf8");

// String-aware parse
const m = raw.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
const arrStart = raw.indexOf("[", m.index);
let depth=0, pos=arrStart, inString=false, stringChar="", escape=false;
do {
  const ch=raw[pos];
  if(escape){escape=false;pos++;continue;}
  if(inString){
    if(ch==='\\'){escape=true;pos++;continue;}
    if(ch===stringChar){inString=false;pos++;continue;}
    pos++;continue;
  }
  if(ch==='"'||ch==='\''){inString=true;stringChar=ch;pos++;continue;}
  if(ch==='[')depth++;
  if(ch===']')depth--;
  pos++;
} while(depth>0 && pos<raw.length);
const arrText = raw.slice(arrStart, pos);
const cases = JSON.parse(arrText);

// ── Content-specific explanations for 26 items ──────────────────────────
// Each explanation references scenario facts (exhibit values, formulas),
// names the governing standard/principle, and identifies the key distractor trap.
// Length target: 250-450 chars to comfortably exceed Apply/Analyze/Evaluate
// minimum of 200 chars.

const NEW_EXPLANATIONS = {
  // ── CBQ21-A6: Summit Health — Inflation-Adjusted Trend ──────────────
  "CBQ21-A6-Q1":
    "Year2 net income restated to Year1 constant dollars = Year2 nominal / (CPI_Year2 / CPI_Year1) = $22.4M / (104.5/100) = $22.4M / 1.045 = $21.43M. Under FASB ASC 255 (Changing Prices), constant-dollar accounting divides nominal amounts by the price-index ratio to remove general inflation effects; monetary items (cash, receivables, debt) gain or lose purchasing power and are reported net, while nonmonetary items (inventory, PP&E, equity) are restated to current cost. For Summit Health, the 22.4 nominal overstates real purchasing-power earnings by 4.5%, the inflation rate. A common trap is dividing by 100 directly (giving $22.4), or applying the inflation rate additively instead of as an index ratio.",

  "CBQ21-A6-Q2":
    "Real growth = (Real Year2 NI / Real Year1 NI) - 1 = ($21.43M / $20.0M) - 1 = 7.15%, rounded to 7.2%. The nominal reported growth of 12.0% ($22.4 / $20.0 - 1) overstates real growth by 4.8 percentage points (the 4.5% inflation plus rounding). This decomposition lets Dana Lee show the board that real sustainable earnings growth is materially below the reported headline number. A common trap is computing the difference as 22.4/20.0 - 21.43/20.0 = 4.85% and calling that the 'inflation adjustment', or computing (1.045/1.045 - 1) = 0% real growth, which misuses the index.",

  "CBQ21-A6-Q4":
    "Nominal current ratio 2.10 uses current assets and current liabilities at December 31 face values. Constant-dollar current ratio 1.92 restates nonmonetary current assets (inventory at FIFO) down by 4.5% and recognizes that monetary current liabilities are unchanged in nominal terms, so the constant-dollar numerator is lower while the denominator is unchanged. Real liquidity erosion means Summit has less working-capital cushion than the nominal ratio suggests, and the debt covenant should be tested at constant dollars to avoid relying on inflation-inflated assets. Choice A treats inflation as helpful (only true for monetary liabilities); Choice B treats nominal as covenant-safe; Choice D ignores the issue entirely.",

  // ── CBQ21-C6: Greenstone Mining — Four-Ore WACM ─────────────────────
  "CBQ21-C6-Q1":
    "Weighted-average contribution margin = Σ (CM_i × Mix_i) = (50 × 0.40) + (80 × 0.30) + (40 × 0.20) + (120 × 0.10) = 20 + 24 + 8 + 12 = $64 per ton. Per DA-01, WACM blends individual ore CMs by sales-mix proportions to produce a single CM figure for breakeven, DOL, and margin-of-safety calculations across multi-product operations. The mix assumption (40/30/20/10) is critical — if it shifts, WACM shifts. A common trap is computing the simple arithmetic average of CMs ((50+80+40+120)/4 = 72.50), which ignores mix; another is computing tonnage-weighted CM ($640,000 / 10,000 tons = $64, correct but arrived at by accident).",

  "CBQ21-C6-Q2":
    "Breakeven tons = Fixed Costs / WACM = $480,000 / $64 per ton = 7,500 tons per month (DA-02). Per DA-02, breakeven in units is total fixed costs divided by weighted-average CM per unit, which yields the volume at which total CM exactly covers fixed costs and operating income is zero. For Greenstone this is well below the 10,000-ton budget, confirming positive budgeted operating income. A common trap uses a single ore's CM (e.g., copper CM $50 → 9,600 tons) or computes breakeven dollars ($480,000 / 0.10 CM ratio = $4.8M revenue); both are wrong units.",

  "CBQ21-C6-Q3":
    "Degree of operating leverage at the 10,000-ton budget = Contribution Margin / Operating Income = $640,000 / $160,000 = 4.00 (FA-19). DOL measures how a percentage change in sales volume translates to a percentage change in operating income; DOL of 4.0 means a 10% volume change produces a 40% OI change in the same direction. With most ore tonnage locked at the budget mix, the hoist-hours capacity is the binding constraint, amplifying volume sensitivity into OI. A common trap divides CM by FC ($640,000 / $480,000 = 1.33) instead of by OI, or computes total-CM ratio against revenue.",

  "CBQ21-C6-Q4":
    "Margin of safety = Budget tons - Breakeven tons = 10,000 - 7,500 = 2,500 tons, or 2,500 / 10,000 = 25% of budget volume. MoS is the buffer above breakeven before losses begin — a 25% volume cushion means sales could fall 25% before the operation turns unprofitable (FA-23 / DA-03). For Greenstone this cushion is meaningful but not large given ore-price and hoist-capacity volatility. Choice B (7,500 tons, 75%) confuses breakeven itself with the buffer above it; Choice C (10,000 tons, 100%) misuses budget as buffer. A common trap treats breakeven dollars as margin of safety.",

  // ── CBQ21-F4: Pinnacle University — ESG Assurance ───────────────────
  "CBQ21-F4-Q1":
    "The carbon-neutral headline claims portfolio-wide Scope 1-3 coverage, but assurance is limited to 40% AUM (listed equities only). IMA Credibility (fourth standard) requires fair and full disclosure of all relevant information — communicating 'carbon-neutral' when 60% of the endowment is unaudited misleads donors and beneficiaries. The headline-scope mismatch is a greenwashing exposure that the audit committee and donors should see. Choice A (Confidentiality) governs how information moves through proper channels, not what may be claimed; Choice C (Competence) is technical expertise, not communication fairness. The donor's '$25M if overstates' is exactly the credibility test.",

  "CBQ21-F4-Q2":
    "ISAE 3000 distinguishes limited assurance (negative form — 'nothing came to our attention indicating material misstatement', based on limited evidence) from reasonable assurance (positive form — 'in our opinion, the statement is fairly presented', based on extensive evidence analogous to an audit). Pinnacle's 40% scope received only limited assurance, which is insufficient evidentiary support for a portfolio-wide carbon-neutral claim. The choice is to expand assurance scope to 100% with reasonable assurance, or qualify the headline to reflect the actual coverage ('40% assured, 60% unaudited'). Choice A (reasonable on 100%) describes the upgrade path; Choice B (no assurance) ignores the question; Choice D conflates the two assurance types.",

  "CBQ21-F4-Q3":
    "Under ASC 958 (Not-for-Profit Entities) and ASC 450 (Contingencies), a conditional gift with a measurable barrier (the donor's '$25M if report overstates') is not recognized as revenue until the barrier is met. Recognition requires unconditional promise or completed transfer; a conditional promise is disclosed, not booked, until the condition is substantially met. Recognizing $25M immediately to 'secure the gift' violates ASC 958-605 and inflates the donor-reporting claim that triggered the condition in the first place. The CEO's pressure compounds the credibility risk (IMA Credibility). Disclose the contingency and avoid recognition until verification. Choice B (recognize) is the GAAP failure; Choice C (book as liability) mischaracterizes; Choice D (defer until lawsuit) ignores disclosure.",

  "CBQ21-F4-Q4":
    "IMA resolution (Statement of Ethical Professional Practice, 'Resolve Ethical Conflicts' subsection) starts with the immediate supervisor unless that person appears involved in the conflict. Here the VP of Sales authored the return-rights instruction that drives the credibility concern, so direct confrontation both fails procedurally and risks tipping the counterparty. Escalation moves to next-level management or the audit committee with contemporaneous documentation (email, memo, dates). Resignation is the last resort only after channels are exhausted. Choice A (publish as drafted) abandons the framework; Choice C (confront donor) compounds the issue; Choice D (resign immediately) bypasses available internal channels. SOX 806 protects this escalation path.",

  // ── CBQ21-B5: Orchard Capital — Dividend and Repurchase ─────────────
  "CBQ21-B5-Q1":
    "Residual dividend = (Net Income - Positive-NPV Investments) / Shares = ($14M - $8M) / 2M = $6M / 2M = $3.00 per share. The residual model (B.7) preserves shareholder value by funding all positive-NPV projects first and distributing only the leftover earnings. For Orchard Capital the residual $3.00 is the maximum sustainable dividend that funds the $8M project slate without external equity or changed capital structure. Choice A is the gross payout $14M / 2M = $7.00 (ignores investment opportunity); Choice C is the stable $2 Maya is considering (would retain $4M excess, suboptimal signaling); Choice D is hoarding cash (zero payout).",

  "CBQ21-B5-Q3":
    "Residual $3.00 fits Orchard's growth profile: it funds the full $8M project slate, distributes the remaining $6M to shareholders, and avoids external equity issuance. The residual policy is growth-aligned because it lets investment opportunities drive the dividend dollar. Stable $5 (Choice C) exceeds the residual and would require issuing new equity or cutting projects. Stable $2 (implied elsewhere) would retain $4M excess that could fund additional growth — sub-optimal signaling unless the board has a stated accumulation phase. Zero payout (Choice D) hoards cash without a stated strategic rationale. 100% payout (Choice A) ignores project NPV entirely.",

  "CBQ21-B5-Q4":
    "Stable $2.00 signals management's confidence that future earnings can sustain the dividend even through cyclical downturns; the trade-off is retaining $4M of excess earnings that could fund additional growth or repurchase. Residual $3.00 signals the opposite — that attractive investment opportunities exist — but introduces payout volatility that some income-oriented shareholders dislike. The right choice for Orchard depends on shareholder mix: growth-oriented investors prefer residual (signaling growth); income-oriented investors prefer stable (signaling confidence). Choice B reverses the standard interpretation; Choice C is always false; Choice D ignores signaling theory entirely. Modigliani-Miller dividend irrelevance assumes no signaling, taxes, or information asymmetry.",

  "CBQ21-B5-Q5":
    "Two factors support repurchase here. First, the stock is undervalued — repurchasing below intrinsic value is mathematically accretive (per-share earnings rise as the share count falls against a fixed earnings numerator). Second, repurchase defers shareholder tax relative to dividends — capital gains are taxed only on sale at the holder's election, while dividends are taxed in the current period at ordinary income rates for many holders. These two together (accretion + tax deferral) are the canonical repurchase advantages. Choice C ('repurchase always higher payout') is the absolute-language trap; Choice D ('dividend signals growth') reverses standard signaling theory; Choice E ('repurchase requires no cash') is factually false — repurchase uses cash.",

  "CBQ21-B5-Q6":
    "Residual $3.00 maps to earnings minus investments ($14M - $8M = $6M residual / 2M shares). Repurchase 200k shares accretes EPS from $7.00 to ~$7.78 (post-repurchase share count 1.8M, $14M / 1.8M), an EPS accretion of approximately $0.78 that derives from buying below intrinsic P/E. Stable $2.00 smooths the payout, signals confidence, and retains the $4M excess for opportunistic use. SGR link is the Higgins formula ROE × retention, where retention = 1 - payout/earnings — connecting the dividend decision to internally-fundable growth.",

  // ── CBQ21-D3: Shield Insurance — RAROC ──────────────────────────────
  "CBQ21-D3-Q1":
    "RAROC (Risk-Adjusted Return on Capital) = (Revenue - Expected Loss) / Economic Capital = ($10.0M - $4.0M) / $20.0M = $6.0M / $20.0M = 30.00%. The metric measures risk-adjusted profitability per unit of economic capital deployed, allowing like-for-like comparison across lines with different risk profiles. For Auto, 30% comfortably exceeds the 15% hurdle, signaling value creation. The common trap (Revenue/Capital = $10/$20 = 50%) ignores expected loss entirely and overstates risk-adjusted return — a frequent exam error that double-counts revenue without subtracting the loss provision.",

  "CBQ21-D3-Q2":
    "Health RAROC = ($12M - $7M) / $25M = $5M / $25M = 20.00%. Although Health's gross loss is larger in dollars than Auto's ($7M vs $4M), the capital base is also larger ($25M vs $20M), and the resulting risk-adjusted return is 20% — still above the 15% hurdle but the lowest of the four lines. Per D.5, RAROC normalizes for capital intensity so that a high-revenue/high-loss line (Health) can be ranked against a low-revenue/low-loss line (Life at 50%) on a comparable basis. The trap is the gross-ratio (revenue/capital = 48%), which ignores EL.",

  "CBQ21-D3-Q3":
    "Life line RAROC = ($6M - $1M) / $10M = 50%, the highest in the portfolio and well above the 15% hurdle. Per D.5 and D.7 capital allocation discipline, incremental capital should flow to the highest-RAROC line first because each marginal dollar of capital earns more risk-adjusted return there. Auto (30%), Property (30%), and Health (20%) all clear the hurdle but rank below Life. Choice A misidentifies Health (the lowest); Choice B cites Auto but ignores Life (highest); Choice D treats the Property-Auto tie as equivalent to Life's dominance.",

  "CBQ21-D3-Q4":
    "RAROC of 30% against a 15% hurdle implies value creation: the line's risk-adjusted return exceeds the cost-of-capital-adjusted hurdle, so every dollar of capital allocated generates positive economic profit (RAROC - hurdle, times capital). For Auto, that spread is 15 percentage points × $20M capital = $3.0M of expected economic profit per period. A line below hurdle would destroy value (negative economic profit); a line at hurdle is the break-even risk-adjusted decision boundary. Choice B (destroys value) is the inverse trap; Choice C (breakeven) applies only when RAROC = hurdle exactly; Choice D ignores the hurdle framework.",

  "CBQ21-D3-Q5":
    "RAROC improves when numerator rises or denominator falls, holding risk constant. Two actions that meet these criteria: reducing expected loss through underwriting controls (numerator up — fewer claims per dollar of revenue) and optimizing capital via reinsurance (denominator down — ceded risk reduces required economic capital). Choice C ('increase revenue without capital change') raises gross revenue but also raises expected loss proportionally — RAROC may not improve. Choice D ('add capital arbitrarily') inflates the denominator and lowers RAROC. Choice E ('cut revenue') lowers numerator — directionally wrong. The two correct answers are the underwriting-control and reinsurance levers.",

  "CBQ21-D3-Q6":
    "Auto RAROC 30% = ($10M-$4M)/$20M, value-creating, should be allocated. Health RAROC 20% = ($12M-$7M)/$25M, the lowest among cleared lines, candidate for de-allocation or repricing. Life RAROC 50% = ($6M-$1M)/$10M, the highest, should be prioritized for incremental capital. The 15% hurdle is the risk-adjusted cost-of-capital threshold above which a line creates economic profit and below which it destroys value — the practical dividing line for capital deployment decisions in an ERM-driven insurance portfolio.",

  // ── CBQ21-E4: Northwind Pharma — Monte Carlo NPV ─────────────────────
  "CBQ21-E4-Q3":
    "Monte Carlo 10,000 runs produce a distribution: mean NPV $1.2M, SD $0.8M, P(NPV>0) = 84%. The point NPV ($1.2M) is the expected value; the 84% confidence is the probability that the realized NPV exceeds zero across the simulated scenarios. A 16% chance of loss despite a positive mean is not 'risk-free' — risk-adjusted decision requires comparing both metrics against the company's risk appetite (e.g., 5% VaR of -$0.12M from Exhibit 1). Choice A misreads 84% as certainty; Choice C is the deterministic-fallacy trap; Choice D confuses the 84% with a dollar amount. The CFO should report both point NPV and distribution to the board.",

  "CBQ21-E4-Q4":
    "Tornado sensitivity shows price variance contributes 60% of total NPV variance — the dominant driver. Per E.4 sensitivity-analysis discipline, audit and risk-management effort should focus on the highest-variance driver first because reducing price uncertainty captures the largest expected NPV variance reduction. Volume contributes 25% (second priority); cost contributes 15% (lowest priority, often not worth dedicated hedging unless asymmetric). Choice B (cost 15%) inverts the priority; Choice C (all equally) ignores the tornado's monotonic structure; Choice D (volume 25%) addresses the second-priority driver, missing the biggest lever.",

  "CBQ21-E4-Q5":
    "Two actions manage risk proportional to driver variance. Locking price via contract addresses 60% (the dominant driver) and removes the largest source of NPV variability. Hedging volume via offtake agreement addresses 25% (second driver) and stabilizes the demand-side risk. Cost audit at 15% is the lowest-leverage action and not in the optimal pair; it might be done for completeness but is not where risk-management effort pays off. Choice C (audit cost only) misses the dominant drivers; Choice D (ignore price) violates the tornado hierarchy; Choice E (add fixed cost) worsens downside by raising the loss threshold.",

  "CBQ21-E4-Q6":
    "Mean NPV $1.2M vs SD $0.8M describes point estimate against dispersion — the coefficient of variation is 0.67, indicating high relative volatility. 84% P(NPV>0) is the confidence interval for positive returns, leaving 16% loss probability. Tornado price 60% is the dominant variance driver — audit price inputs and consider price hedging first. 5% VaR of -$0.12M is the tail-loss appetite test: at the 5th percentile, the project loses $120k, which the risk committee should weigh against the 84% upside probability when deciding whether to proceed.",
};

// ── Apply ───────────────────────────────────────────────────────────────
let updated = 0;
let notFound = 0;
const notFoundList = [];

for (const c of cases) {
  if (c.question_state !== "Unprocessed") continue;
  for (const it of c.Items || []) {
    const key = c.CaseID + "-" + (it.ItemID || "").split("-").pop();
    if (NEW_EXPLANATIONS[it.ItemID]) {
      const oldLen = (it.Explanation || "").length;
      it.Explanation = NEW_EXPLANATIONS[it.ItemID];
      console.log(`  ✓ ${it.ItemID}: ${oldLen} → ${it.Explanation.length} chars`);
      updated++;
    } else if (NEW_EXPLANATIONS[key]) {
      const oldLen = (it.Explanation || "").length;
      it.Explanation = NEW_EXPLANATIONS[key];
      console.log(`  ✓ ${it.ItemID} (via short key): ${oldLen} → ${it.Explanation.length} chars`);
      updated++;
    }
  }
}

console.log(`\nApplied ${updated} new explanations.`);

// ── Serialise back ──────────────────────────────────────────────────────
function serializeCase(c, indent) {
  const nl = "\n";
  const pad = " ".repeat(indent);
  let s = "  {";
  for (const key of Object.keys(c)) {
    const val = c[key];
    if (key === "Items" || key === "Exhibits") {
      s += nl + pad + JSON.stringify(key) + ": [";
      for (let i = 0; i < val.length; i++) {
        s += nl + pad + "  " + JSON.stringify(val[i], null, 2).replace(/\n/g, nl + pad + "  ");
        s += i < val.length - 1 ? "," : "";
      }
      s += nl + pad + "]";
    } else {
      s += nl + pad + JSON.stringify(key) + ": " + JSON.stringify(val);
    }
    s += ",";
  }
  s = s.replace(/,$/, "");
  s += nl + "  }";
  return s;
}

let newArrayText = "[";
for (let i = 0; i < cases.length; i++) {
  newArrayText += "\n" + serializeCase(cases[i], 4);
  newArrayText += i < cases.length - 1 ? "," : "";
}
newArrayText += "\n]";

const before = raw.slice(0, arrStart);
const after = raw.slice(arrStart + arrText.length);
const newRaw = before + newArrayText + after;

fs.writeFileSync(FILE, newRaw, "utf8");
const newSize = fs.statSync(FILE).size;
console.log(`\nWrote ${FILE}: ${newSize} bytes`);
