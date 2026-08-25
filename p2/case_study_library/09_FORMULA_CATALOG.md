# Part 2 Formula Catalog — Complete Registry

**Status:** Reference material — generated 2026-08-22 from `p2/P2005_FORMULA_MASTER.json` (Session P2-005, 52 formulas, verified against the P2002 blueprint extraction).
**Use:** attach to case-study authoring runs. Every case item that requires a computation must reference a formula ID from this catalog in its `FormulaReference` field.

Domain counts: A = 21, B = 9, C = 11, D = 3, E = 8, F = 0 (ethics is scenario-based, no computational formulas).

---

## Domain A — Financial Statement Analysis (25 formulas)

### FA-01 — Current Ratio

| Field | Value |
|-------|-------|
| Subsection | Liquidity Ratios |
| Notation | `Current Ratio = Current Assets / Current Liabilities` |
| Variables | CA = Current Assets; CL = Current Liabilities |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Including restricted cash in current assets without verifying liquidity; Misclassifying the current portion of long-term debt as non-current |
| Exam trap | Candidates often include prepaid expenses as cash equivalents or exclude the current portion of long-term debt from current liabilities. |

### FA-02 — Quick Ratio (Acid-Test Ratio)

| Field | Value |
|-------|-------|
| Subsection | Liquidity Ratios |
| Notation | `Quick Ratio = (Cash + Marketable Securities + Accounts Receivable) / Current Liabilities` |
| Variables | C = Cash; MS = Marketable Securities; AR = Accounts Receivable; CL = Current Liabilities |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Including inventory in the numerator (excluded in quick ratio); Including prepaid expenses |
| Exam trap | The quick ratio excludes inventory because it is the least liquid current asset. Candidates frequently include it, confusing the quick ratio with the current ratio. |

### FA-03 — Cash Ratio

| Field | Value |
|-------|-------|
| Subsection | Liquidity Ratios |
| Notation | `Cash Ratio = (Cash + Marketable Securities) / Current Liabilities` |
| Variables | C = Cash; MS = Marketable Securities; CL = Current Liabilities |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Including accounts receivable (AR is excluded from the cash ratio); Treating restricted cash as unrestricted |
| Exam trap | The cash ratio is the most conservative liquidity measure. Candidates may apply it where inventory or receivables turn over quickly, making the ratio misleadingly low. |

### FA-04 — Inventory Turnover

| Field | Value |
|-------|-------|
| Subsection | Activity Ratios |
| Notation | `Inventory Turnover = COGS / Average Inventory` |
| Variables | COGS = Cost of Goods Sold; AvgInv = Average Inventory |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 330 (Inventory) |
| Common errors | Using ending inventory instead of average inventory; Using sales instead of COGS |
| Exam trap | Using sales in the numerator when COGS is required inflates the turnover figure and misrepresents inventory management efficiency. |

### FA-05 — Days Sales Outstanding (DSO)

| Field | Value |
|-------|-------|
| Subsection | Activity Ratios |
| Notation | `DSO = (Average Accounts Receivable / Net Credit Sales) × 365` |
| Variables | AvgAR = Average Accounts Receivable; NCS = Net Credit Sales |
| Rounding | Two decimal places |
| Tolerance | 0.01 days |
| Authority | ASC 310 (Receivables) |
| Common errors | Using 360 days instead of 365; Using total sales instead of credit sales |
| Exam trap | The CMA exam uses 365 days (not 360). A low DSO is generally favorable but may indicate overly restrictive credit policies. |

### FA-06 — Days Payable Outstanding (DPO)

| Field | Value |
|-------|-------|
| Subsection | Activity Ratios |
| Notation | `DPO = (Average Accounts Payable / Total Purchases) × 365` |
| Variables | AvgAP = Average Accounts Payable; TP = Total Purchases |
| Rounding | Two decimal places |
| Tolerance | 0.01 days |
| Authority | ASC 405 (Liabilities) |
| Common errors | Using 360 days; Using COGS directly without adjusting for inventory change |
| Exam trap | Purchases must be computed indirectly if not given: Purchases = COGS + ΔInventory. A high DPO may signal liquidity problems rather than favorable credit terms. |

### FA-07 — Debt-to-Equity Ratio

| Field | Value |
|-------|-------|
| Subsection | Leverage Ratios |
| Notation | `D/E = Total Liabilities / Total Shareholders' Equity` |
| Variables | TL = Total Liabilities; TSE = Total Shareholders' Equity |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using only long-term debt instead of total liabilities; Omitting operating lease liabilities (ASC 842) |
| Exam trap | Know which variant the question asks for—Debt-to-Equity (total liabilities) vs. Long-Term Debt-to-Equity (LT debt only). |

### FA-08 — Times Interest Earned (Interest Coverage)

| Field | Value |
|-------|-------|
| Subsection | Leverage Ratios |
| Notation | `TIE = EBIT / Interest Expense` |
| Variables | EBIT = Earnings Before Interest and Taxes; IE = Interest Expense |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using net income instead of EBIT; Using only cash interest paid rather than total interest expense |
| Exam trap | EBIT is before interest and taxes. Using EBT or net income in the numerator understates the coverage ratio. |

### FA-09 — Gross Margin Percentage

| Field | Value |
|-------|-------|
| Subsection | Profitability Ratios |
| Notation | `Gross Margin % = (Gross Profit / Net Sales) × 100` |
| Variables | GP = Gross Profit; NS = Net Sales |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using total sales before returns and allowances; Confusing gross margin with markup (markup = GP / COGS) |
| Exam trap | Gross Margin % = GP / Sales. Markup % = GP / COGS. These are different metrics—candidates frequently confuse them. |

### FA-10 — Operating Margin Percentage

| Field | Value |
|-------|-------|
| Subsection | Profitability Ratios |
| Notation | `Operating Margin % = (Operating Income / Net Sales) × 100` |
| Variables | OI = Operating Income; NS = Net Sales |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Including non-operating items (interest, gains/losses) in operating income |
| Exam trap | Operating income excludes interest and taxes. Including them converts the metric to net margin, not operating margin. |

### FA-11 — Net Margin Percentage

| Field | Value |
|-------|-------|
| Subsection | Profitability Ratios |
| Notation | `Net Margin % = (Net Income / Net Sales) × 100` |
| Variables | NI = Net Income; NS = Net Sales |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Including discontinued operations that distort the sustainable margin; Using net income attributable to non-controlling interests inconsistently |
| Exam trap | Net margin includes financing and tax strategy effects. Comparing net margins across companies with different capital structures is misleading. |

### FA-12 — Return on Assets (ROA)

| Field | Value |
|-------|-------|
| Subsection | Profitability Ratios |
| Notation | `ROA = Net Income / Average Total Assets` |
| Variables | NI = Net Income; AvgTA = Average Total Assets |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using ending total assets instead of average; Using operating income instead of net income without specification |
| Exam trap | ROA uses average assets, not end-of-period assets, unless the question explicitly states otherwise. |

### FA-13 — Return on Equity (ROE)

| Field | Value |
|-------|-------|
| Subsection | Profitability Ratios |
| Notation | `ROE = (Net Income − Preferred Dividends) / Average Common Shareholders' Equity` |
| Variables | NI = Net Income; PD = Preferred Dividends; AvgCSE = Average Common Equity |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using ending equity vs. average; Not subtracting preferred dividends for common ROE |
| Exam trap | If preferred stock exists, net income must be reduced by preferred dividends for common ROE. Using total net income overstates returns to common shareholders. |

### FA-14 — DuPont Identity (ROE Decomposition)

| Field | Value |
|-------|-------|
| Subsection | Profitability Ratios |
| Notation | `ROE = NPM × TAT × EM = (Net Income / Sales) × (Sales / Average Total Assets) × (Average Total Assets / Average Equity)` |
| Variables | NPM = Net Profit Margin; TAT = Total Asset Turnover; EM = Equity Multiplier |
| Rounding | Two decimal places (ROE); four decimal places (components) |
| Tolerance | 0.01 percent |
| Authority | DuPont Corporation (1914); financial ratio analysis theory |
| Common errors | Using ending values instead of averages for TAT and EM; Computing components with inconsistent base periods |
| Exam trap | The three-way DuPont reveals whether ROE is driven by profitability (NPM), efficiency (TAT), or leverage (EM). High ROE from high EM signals financial risk, not operational excellence. |

### FA-15 — Earnings Per Share (EPS)

| Field | Value |
|-------|-------|
| Subsection | Market Ratios |
| Notation | `Basic EPS = (Net Income − Preferred Dividends) / Weighted Average Common Shares Outstanding` |
| Variables | NI = Net Income; PD = Preferred Dividends; WASO = Weighted Average Shares |
| Rounding | Two decimal places |
| Tolerance | 0.01 dollars per share |
| Authority | ASC 260 (Earnings Per Share) |
| Common errors | Using ending shares instead of weighted average; Not subtracting undeclared cumulative preferred dividends; Not retroactively adjusting for stock splits/dividends |
| Exam trap | Stock splits and stock dividends are applied retroactively to WASO for all periods presented. Failing to adjust understates prior-period EPS. |

### FA-16 — Price-to-Earnings (P/E) Ratio

| Field | Value |
|-------|-------|
| Subsection | Market Ratios |
| Notation | `P/E = Market Price per Share / Earnings per Share` |
| Variables | MPS = Market Price per Share; EPS = Earnings per Share |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | Market-based ratio; financial ratio analysis theory |
| Common errors | Using basic EPS when diluted EPS is more conservative; Comparing trailing P/E to forward P/E of another company |
| Exam trap | P/E ratios are not comparable across industries. A 'low' P/E in a cyclical industry may signal peak earnings about to decline, not a bargain. |

### FA-17 — Dividend Yield

| Field | Value |
|-------|-------|
| Subsection | Market Ratios |
| Notation | `Dividend Yield = (Annual Dividends per Share / Market Price per Share) × 100` |
| Variables | DPS = Dividends per Share; MPS = Market Price per Share |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Market-based ratio; financial ratio analysis theory |
| Common errors | Using one quarter's dividend × 4 without confirming representativeness; Using wrong share price date |
| Exam trap | A high dividend yield may result from a declining stock price (denominator falling), not from generous dividends. |

### FA-18 — Book Value per Share

| Field | Value |
|-------|-------|
| Subsection | Market Ratios |
| Notation | `BVPS = (Total Shareholders' Equity − Preferred Equity) / Common Shares Outstanding` |
| Variables | TSE = Total Shareholders' Equity; PE = Preferred Equity; CSO = Common Shares Outstanding |
| Rounding | Two decimal places |
| Tolerance | 0.01 dollars per share |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using average shares instead of period-end shares; Not subtracting preferred equity |
| Exam trap | Book value reflects historical cost, not market value. A stock trading below BVPS does not necessarily mean undervaluation—assets may be impaired. |

### FA-19 — Degree of Operating Leverage (DOL)

| Field | Value |
|-------|-------|
| Subsection | Leverage Ratios |
| Notation | `DOL = Contribution Margin / Operating Income` |
| Variables | CM = Contribution Margin; OI = Operating Income |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | Managerial accounting theory |
| Common errors | Using gross margin instead of contribution margin; Computing at the wrong sales level |
| Exam trap | DOL is a point elasticity—it changes at different sales levels. DOL of 3 means a 1% sales increase produces a 3% operating income increase at that specific sales level. |

### FA-20 — Degree of Financial Leverage (DFL)

| Field | Value |
|-------|-------|
| Subsection | Leverage Ratios |
| Notation | `DFL = EBIT / EBT = Operating Income / (Operating Income − Interest Expense)` |
| Variables | EBIT = Earnings Before Interest and Taxes; EBT = Earnings Before Taxes |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | Corporate finance theory |
| Common errors | Not adjusting denominator for preferred dividends grossed up for taxes |
| Exam trap | If preferred stock exists, denominator must also subtract Preferred Dividends / (1 − t), reflecting the after-tax nature of preferred dividends. |

### FA-21 — Sustainable Growth Rate

| Field | Value |
|-------|-------|
| Subsection | Profitability Ratios |
| Notation | `SGR = ROE × (1 − Dividend Payout Ratio)` |
| Variables | ROE = Return on Equity; b = Retention Ratio |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Corporate finance theory (Higgins, 1977) |
| Common errors | Using dividend yield instead of payout ratio; Assuming constant SGR when ROE fluctuates |
| Exam trap | SGR assumes constant capital structure, dividend policy, and asset turnover. It is a theoretical maximum, not a forecast. |

### FA-22 — Dividend Payout Ratio

| Field | Value |
|-------|-------|
| Subsection | Market Value Ratios |
| Notation | `Payout Ratio = Dividends per Share / Earnings per Share` |
| Variables | DPS = Dividends per Share; EPS = Earnings per Share |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | Corporate finance theory; dividend policy |
| Common errors | Using total dividends instead of per-share values; Confusing payout ratio with retention ratio (b = 1 − payout) |
| Exam trap | Retention ratio is the complement: b = 1 − Payout Ratio. Sustainable growth (SGR) requires the retention ratio, not the payout ratio directly. |

### FA-23 — Free Cash Flow (FCF)

| Field | Value |
|-------|-------|
| Subsection | Cash Flow Analysis |
| Notation | `FCF = Operating Cash Flow − Net Capital Expenditures` |
| Variables | OCF = Operating Cash Flow; NCapex = Net Capital Expenditures |
| Rounding | Nearest whole dollar |
| Tolerance | 1 USD |
| Authority | ASC 230-10 (Statement of Cash Flows) |
| Common errors | Including financing or investing inflows; Treating EBITDA as a proxy for FCF |
| Exam trap | FCF measures discretionary cash available after maintaining the asset base. Common error: adding borrowing proceeds (a financing inflow) into FCF. |

### FA-24 — Total Asset Turnover

| Field | Value |
|-------|-------|
| Subsection | Activity Ratios |
| Notation | `Total Asset Turnover = Net Sales / Average Total Assets` |
| Variables | NS = Net Sales; AvgTA = Average Total Assets |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using ending assets instead of average; Comparing asset-heavy and asset-light firms without context |
| Exam trap | A low ratio for a capital-intensive manufacturer is normal; the same ratio for a retailer signals inefficiency. Always interpret within the industry business model. |

### FA-25 — Debt-to-Assets Ratio

| Field | Value |
|-------|-------|
| Subsection | Leverage Ratios |
| Notation | `Debt-to-Assets = Total Liabilities / Total Assets` |
| Variables | TL = Total Liabilities; TA = Total Assets |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | ASC 205-10 (Presentation of Financial Statements) |
| Common errors | Using long-term debt only instead of total liabilities; Confusing D/A with D/E |
| Exam trap | D/A and the equity-financing ratio sum to 1. D/A is the safer metric when equity can approach zero (making D/E explode). |

---

## Domain B — Corporate Finance (11 formulas)

### CB-01 — Expected Return (Probability-Weighted)

| Field | Value |
|-------|-------|
| Subsection | Risk and Return |
| Notation | `E(R) = Σ(P_i × R_i)` |
| Variables | P_i = Probability of State i; R_i = Return in State i |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Portfolio theory (Markowitz, 1952) |
| Common errors | Probabilities not summing to 1.0; Using simple arithmetic mean instead of probability-weighted average |
| Exam trap | Expected return is a probability-weighted average, not a simple arithmetic mean. Candidates frequently compute the simple mean of returns without applying probabilities. |

### CB-02 — Standard Deviation of Returns

| Field | Value |
|-------|-------|
| Subsection | Risk and Return |
| Notation | `σ = sqrt(Σ(P_i × (R_i − E(R))²))` |
| Variables | σ = Standard Deviation; P_i = Probability of State i; R_i = Return in State i; E(R) = Expected Return |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Portfolio theory (Markowitz, 1952) |
| Common errors | Computing population standard deviation instead of applying probability weights; Forgetting the square root |
| Exam trap | Standard deviation measures total risk (systematic + unsystematic). In a diversified portfolio, only systematic risk (beta) matters. |

### CB-03 — Coefficient of Variation

| Field | Value |
|-------|-------|
| Subsection | Risk and Return |
| Notation | `CV = σ / E(R)` |
| Variables | σ = Standard Deviation; E(R) = Expected Return |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | Portfolio theory |
| Common errors | Reversing numerator and denominator; Using variance instead of standard deviation |
| Exam trap | CV measures risk per unit of return—the correct metric for comparing investments with different expected returns. |

### CB-04 — Capital Asset Pricing Model (CAPM)

| Field | Value |
|-------|-------|
| Subsection | Risk and Return |
| Notation | `R_e = R_f + β(R_m − R_f)` |
| Variables | R_e = Required Return on Equity; R_f = Risk-Free Rate; β = Beta; R_m = Market Return; R_m − R_f = Market Risk Premium |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | CAPM (Sharpe, 1964; Lintner, 1965) |
| Common errors | Using historical market return instead of expected; Using wrong risk-free rate maturity; Computing beta from non-comparable index |
| Exam trap | CAPM gives the required return (cost of equity), not the expected return of the stock. Using historical beta without adjustment for mean reversion is a known limitation. |

### CB-05 — Weighted Average Cost of Capital (WACC)

| Field | Value |
|-------|-------|
| Subsection | Cost of Capital |
| Notation | `WACC = (E/V × R_e) + (P/V × R_p) + (D/V × R_d × (1 − t))` |
| Variables | E = Market Value of Equity; P = Market Value of Preferred Stock; D = Market Value of Debt; V = Total Value; R_e = Cost of Equity; R_p = Cost of Preferred Stock; R_d = Cost of Debt (pre-tax); t = Marginal Tax Rate |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Corporate finance theory (Brealey-Myers); Modigliani-Miller |
| Common errors | Using pre-tax cost of debt instead of after-tax; Omitting preferred stock component; Using book values instead of market values for weights |
| Exam trap | Three classic WACC errors: (1) Pre-tax cost of debt—must multiply by (1 − t). (2) Omitting preferred stock entirely. (3) Book value weights instead of market value weights. |

### CB-06 — Cost of Preferred Stock

| Field | Value |
|-------|-------|
| Subsection | Cost of Capital |
| Notation | `R_p = D_p / P_p` |
| Variables | D_p = Annual Preferred Dividend; P_p = Net Proceeds per Preferred Share |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Corporate finance theory |
| Common errors | Subtracting flotation costs from dividend instead of from price; Using par value instead of market price |
| Exam trap | Preferred dividends are not tax-deductible. Unlike debt, there is no (1 − t) adjustment for preferred stock in WACC. |

### CB-07 — Cost of Debt (After-Tax)

| Field | Value |
|-------|-------|
| Subsection | Cost of Capital |
| Notation | `After-Tax Cost of Debt = R_d × (1 − t)` |
| Variables | R_d = Pre-Tax Cost of Debt; t = Marginal Tax Rate |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Corporate finance theory; IRC §163 (interest deductibility) |
| Common errors | Using coupon rate instead of YTM; Using average tax rate instead of marginal rate; Forgetting (1 − t) |
| Exam trap | The pre-tax cost of debt for WACC is YTM, not the coupon rate. Using the coupon rate ignores whether the bond trades at a premium or discount. |

### CB-08 — Economic Order Quantity (EOQ)

| Field | Value |
|-------|-------|
| Subsection | Working Capital Management |
| Notation | `EOQ = sqrt(2DS / H)` |
| Variables | D = Annual Demand; S = Ordering Cost; H = Holding Cost |
| Rounding | Nearest whole unit |
| Tolerance | 1 units |
| Authority | Inventory management theory (Harris, 1913; Wilson, 1934) |
| Common errors | Using demand in dollars vs. units inconsistently; Double-counting or omitting opportunity cost in H |
| Exam trap | D and H must be in the same time units (both annual). If monthly demand is given, multiply by 12 first. If holding cost is a percentage, multiply by unit cost to get H in dollars. |

### CB-09 — Forward/FX Premium or Discount

| Field | Value |
|-------|-------|
| Subsection | International Finance |
| Notation | `Forward Premium/Discount (%) = ((Forward Rate − Spot Rate) / Spot Rate) × (360 / Days) × 100` |
| Variables | F = Forward Rate; S = Spot Rate; Days = Forward Period |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | International finance theory; interest rate parity |
| Common errors | Reversing numerator (S − F) flipping the sign; Using 365 days instead of 360 (FX convention) |
| Exam trap | FX markets use a 360-day year. A positive result means the foreign currency trades at a forward premium (strengthening). Direction matters for interpretation. |

### CB-10 — Cash Conversion Cycle (CCC)

| Field | Value |
|-------|-------|
| Subsection | Working Capital Management |
| Notation | `CCC = DIO + DSO − DPO` |
| Variables | DIO = Days Inventory Outstanding; DSO = Days Sales Outstanding; DPO = Days Payable Outstanding |
| Rounding | Whole days |
| Tolerance | 0.01 days |
| Authority | Working capital management theory |
| Common errors | ADDING DPO instead of subtracting it; Using 360 days instead of 365; Using COGS instead of purchases when computing DPO |
| Exam trap | Lower CCC frees cash. A negative CCC means suppliers finance operations. Compute DPO from purchases (Purchases = COGS + ΔInventory) when purchases are not given. |

### CB-11 — Cost of Common Equity — Dividend Discount Model (Gordon Growth)

| Field | Value |
|-------|-------|
| Subsection | Cost of Capital Components |
| Notation | `Re = D1 / P0 + g` |
| Variables | D1 = Next Expected Dividend (D0 × (1+g)); P0 = Current Stock Price; g = Constant Growth Rate |
| Rounding | Two decimal places (percent) |
| Tolerance | 0.01 percent |
| Authority | Dividend Discount Model (Gordon, 1962) |
| Common errors | Using D0 (last paid dividend) instead of D1; Ignoring flotation costs when valuing NEW equity |
| Exam trap | D1 = D0 × (1 + g). For NEW common equity, adjust the denominator for flotation costs: Re = D1 / (P0 × (1 − F)) + g. Requires constant perpetual growth; not applicable to non-dividend payers. |

---

## Domain C — Decision Analysis (11 formulas)

### DA-01 — Breakeven Point (Units)

| Field | Value |
|-------|-------|
| Subsection | Cost-Volume-Profit Analysis |
| Notation | `BE_units = Fixed Costs / CM per Unit` |
| Variables | FC = Fixed Costs; CM/unit = Contribution Margin per Unit |
| Rounding | Nearest whole unit |
| Tolerance | 1 units |
| Authority | Managerial accounting theory; CVP analysis |
| Common errors | Using selling price instead of contribution margin; Including variable costs in the numerator; Not separating semi-variable (mixed) costs |
| Exam trap | Semi-variable (mixed) costs must be separated into fixed and variable components before computing breakeven. |

### DA-02 — Breakeven Point (Dollars)

| Field | Value |
|-------|-------|
| Subsection | Cost-Volume-Profit Analysis |
| Notation | `BE_$ = Fixed Costs / CM Ratio` |
| Variables | FC = Fixed Costs; CM Ratio = Contribution Margin Ratio |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollars |
| Authority | Managerial accounting theory; CVP analysis |
| Common errors | Using markup percentage instead of CM ratio; Using gross margin ratio instead of CM ratio |
| Exam trap | CM Ratio = CM / Sales. Gross Margin Ratio = Gross Profit / Sales. These are different—CM excludes all variable costs, not just COGS. |

### DA-03 — Target Profit (Units)

| Field | Value |
|-------|-------|
| Subsection | Cost-Volume-Profit Analysis |
| Notation | `Units_target = (Fixed Costs + Target Operating Profit) / CM per Unit` |
| Variables | FC = Fixed Costs; TP = Target Operating Profit; CM/unit = Contribution Margin per Unit |
| Rounding | Nearest whole unit |
| Tolerance | 1 units |
| Authority | Managerial accounting theory; CVP analysis |
| Common errors | Using after-tax target profit without grossing up for taxes; Forgetting to add fixed costs in numerator |
| Exam trap | If the question gives target net income (after-tax), convert: Target Pre-Tax = After-Tax Profit / (1 − t). Then add to fixed costs. |

### DA-04 — Margin of Safety

| Field | Value |
|-------|-------|
| Subsection | Cost-Volume-Profit Analysis |
| Notation | `MOS (%) = ((Actual Sales − Breakeven Sales) / Actual Sales) × 100` |
| Variables | AS = Actual Sales; BES = Breakeven Sales |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Managerial accounting theory; CVP analysis |
| Common errors | Reversing numerator (BE − Actual) giving negative MOS; Mixing dollar and unit measures |
| Exam trap | Margin of safety answers 'How much can sales decline before the company incurs a loss?' Always expressed as a percentage of actual sales. |

### DA-05 — Degree of Operating Leverage (CVP Form)

| Field | Value |
|-------|-------|
| Subsection | Cost-Volume-Profit Analysis |
| Notation | `DOL = Contribution Margin / Operating Income` |
| Variables | CM = Contribution Margin; OI = Operating Income |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | Managerial accounting theory |
| Common errors | Using gross margin instead of CM; Computing at the wrong activity level |
| Exam trap | DOL is highest near the breakeven point (operating income → 0 in denominator). Very high DOL signals both high upside and high downside risk. |

### DA-06 — Weighted Average Contribution Margin

| Field | Value |
|-------|-------|
| Subsection | Cost-Volume-Profit Analysis (Multi-Product) |
| Notation | `WACM = Σ(Sales Mix_i × CM_i)` |
| Variables | Sales Mix_i = Sales Mix Percentage of Product i; CM_i = CM per Unit of Product i |
| Rounding | Two decimal places (WACM); four decimal places (mix %) |
| Tolerance | 0.01 dollars per unit |
| Authority | Managerial accounting theory; multi-product CVP analysis |
| Common errors | Using revenue mix instead of unit mix; Mix percentages not summing to 1.0 |
| Exam trap | Multi-product breakeven yields total units, not per-product units. After computing total breakeven units, multiply by sales mix % to get per-product units. |

### DA-07 — Shut-Down Point

| Field | Value |
|-------|-------|
| Subsection | Marginal Analysis |
| Notation | `Shut Down if: Price < Minimum AVC` |
| Variables | P = Price; AVC_min = Minimum Average Variable Cost |
| Rounding | Two decimal places |
| Tolerance | 0.01 dollars per unit |
| Authority | Managerial economics; short-run production theory |
| Common errors | Comparing price to average total cost (ATC) instead of AVC; Shutting down when P between AVC and ATC (should continue short-run) |
| Exam trap | In the short run, continue if P ≥ AVC, even if P < ATC. Continuing covers variable costs and contributes to fixed costs. Shutting down when P ≥ AVC increases losses. |

### DA-08 — Sell-or-Process-Further Decision

| Field | Value |
|-------|-------|
| Subsection | Marginal Analysis |
| Notation | `Process Further if: Incremental Revenue − Incremental Cost > 0` |
| Variables | IR = Incremental Revenue; IC = Incremental Cost |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollars |
| Authority | IMA SMA on relevant costing; joint product decision theory |
| Common errors | Including allocated joint costs (sunk at split-off—irrelevant); Comparing total profitability instead of incremental |
| Exam trap | Joint costs allocated to products are irrelevant—they are sunk at the split-off point. Only incremental revenues and costs beyond split-off matter. |

### DA-09 — Transfer Price (Minimum)

| Field | Value |
|-------|-------|
| Subsection | Transfer Pricing |
| Notation | `Transfer Price_min = Variable Cost per Unit + Opportunity Cost per Unit` |
| Variables | VC = Variable Cost; OC = Opportunity Cost |
| Rounding | Two decimal places |
| Tolerance | 0.01 dollars per unit |
| Authority | IMA SMA on relevant costing; transfer pricing theory |
| Common errors | Forgetting opportunity cost when at full capacity; Using full absorption cost instead of variable cost |
| Exam trap | Idle capacity → OC = $0 → minimum TP = VC. Full capacity → OC = CM lost from displaced external sales. The distinction is critical on the CMA exam. |

### DA-10 — Expected Value

| Field | Value |
|-------|-------|
| Subsection | Decision Modeling Under Uncertainty |
| Notation | `EV = Σ(P_i × Outcome_i)` |
| Variables | P_i = Probability of Outcome i; Outcome_i = Payoff in Outcome i |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollars |
| Authority | Decision theory (Raiffa, 1968) |
| Common errors | Probabilities not summing to 1.0; Confusing expected value with most likely outcome |
| Exam trap | EV is a long-run average, not a prediction of a single outcome. Higher EV does not guarantee a better result in any given instance. |

### DA-11 — Value of Perfect Information

| Field | Value |
|-------|-------|
| Subsection | Decision Modeling Under Uncertainty |
| Notation | `EVPI = EV_with perfect information − EV_without perfect information` |
| Variables | EV_w_PI = EV with Perfect Information; EV_wo_PI = EV without Perfect Information |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollars |
| Authority | Decision theory (Raiffa, 1968) |
| Common errors | Computing EV with PI by taking the simple best outcome instead of probability-weighting; Confusing EVPI with maximum possible payoff |
| Exam trap | EVPI is the maximum a decision-maker should pay for perfect information. If market research costs more than EVPI, don't buy it—regardless of accuracy. |

---

## Domain D — Risk Management (3 formulas)

### RM-01 — Expected Loss

| Field | Value |
|-------|-------|
| Subsection | Risk Assessment |
| Notation | `Expected Loss = Probability × Impact` |
| Variables | P = Probability of Loss; I = Impact |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollars |
| Authority | COSO ERM (2017) — Component 3: Performance, Principle 10 (Identifies Risk) |
| Common errors | Using ordinal labels ('likely') without converting to numeric; Using worst-case impact instead of expected impact |
| Exam trap | Expected loss is a probability-weighted average, not the worst-case scenario. Risk response should consider both expected loss and tail risk. |

### RM-02 — Risk Score

| Field | Value |
|-------|-------|
| Subsection | Risk Assessment |
| Notation | `Risk Score = Likelihood × Severity` |
| Variables | L = Likelihood; S = Severity |
| Rounding | Nearest integer |
| Tolerance | 0 ordinal |
| Authority | COSO ERM (2017) — Component 3: Performance, Principle 10 (Identifies Risk) |
| Common errors | Using different scales for L and S (e.g., 1–3 for L, 1–5 for S); Adding instead of multiplying |
| Exam trap | Risk heat maps multiply likelihood × severity, not add them. A risk that is almost certain (5) with moderate impact (3) = 15, not 8. Adding understates high-likelihood, high-severity risks. |

### RM-03 — Residual Risk

| Field | Value |
|-------|-------|
| Subsection | Risk Response |
| Notation | `Residual Risk = Inherent Risk − Controls Mitigation` |
| Variables | IR = Inherent Risk; CM = Controls Mitigation |
| Rounding | Nearest integer |
| Tolerance | 1 ordinal |
| Authority | COSO ERM (2017) — Component 3: Performance, Principle 11 (Assesses Severity of Risk, including residual risk) |
| Common errors | Reversing direction (Controls − Inherent); Assuming residual risk reaches zero |
| Exam trap | Residual risk can never be zero—no control system is perfect. The CMA exam expects candidates to recognize that some residual risk always remains. |

---

## Domain E — Investment Decisions (10 formulas)

### ID-01 — Net Present Value (NPV)

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting |
| Notation | `NPV = Σ(CF_t / (1 + r)^t) − I_0` |
| Variables | CF_t = Cash Flow in Period t; r = Discount Rate; t = Time Period; n = Project Life; I_0 = Initial Investment |
| Rounding | Nearest whole dollar; carry 4 decimal places for discount factors |
| Tolerance | 5 dollars |
| Authority | Capital budgeting theory (Fisher, 1930); NPV decision rule |
| Common errors | Wrong discount rate (real vs. nominal, pre-tax vs. after-tax); Omitting working capital recovery in terminal year; Including sunk costs in cash flows; Double-counting inflation |
| Exam trap | NPV uses cash flows, not accounting income. Depreciation is added back via the tax shield. Discount rate must match cash flow type—nominal cash flows need nominal rates. |

### ID-02 — Profitability Index (PI)

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting |
| Notation | `PI = PV of Future Cash Flows / Initial Investment` |
| Variables | PV_CF = PV of Future Cash Flows; I_0 = Initial Investment |
| Rounding | Two decimal places |
| Tolerance | 0.01 ratio |
| Authority | Capital budgeting theory |
| Common errors | Including I_0 in numerator (gives NPV/I_0 + 1, not PI); Using undiscounted cash flows |
| Exam trap | PI is NPV-based (uses discounted cash flows), not simple benefit-cost ratio. PI > 1 means NPV > 0. Correct ranking metric under capital rationing. |

### ID-03 — Payback Period

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting |
| Notation | `Payback = Initial Investment / Annual Cash Flow (uniform CF); cumulative otherwise` |
| Variables | I_0 = Initial Investment; ACF = Annual Cash Flow |
| Rounding | One decimal place |
| Tolerance | 0.1 years |
| Authority | Capital budgeting theory |
| Common errors | Using accounting income instead of cash flows; Not using cumulative method for non-uniform CFs |
| Exam trap | Payback ignores the time value of money and cash flows beyond the payback period. It is a liquidity/screening tool, not a profitability measure. |

### ID-04 — Discounted Payback Period

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting |
| Notation | `DPP = time until cumulative discounted cash flows ≥ I_0` |
| Variables | I_0 = Initial Investment; DCF_t = Discounted Cash Flow in t |
| Rounding | One decimal place |
| Tolerance | 0.1 years |
| Authority | Capital budgeting theory |
| Common errors | Using undiscounted cash flows (defeats the purpose); Stopping at the wrong year |
| Exam trap | Discounted payback corrects for time value of money but still ignores post-cutoff cash flows. It is always longer than simple payback. |

### ID-05 — Equivalent Annual Annuity (EAA)

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting (Unequal Lives) |
| Notation | `EAA = NPV / PVIFA(r, n) = NPV / ((1 − (1 + r)^(−n)) / r)` |
| Variables | NPV = Net Present Value; PVIFA = PV Interest Factor of Annuity; r = Discount Rate; n = Project Life |
| Rounding | Nearest whole dollar |
| Tolerance | 5 dollars |
| Authority | Capital budgeting theory |
| Common errors | Comparing NPVs directly for unequal-life projects; Using wrong annuity factor |
| Exam trap | When comparing mutually exclusive projects with unequal lives, NPV alone is insufficient. EAA converts lump-sum NPV to an annualized equivalent for apples-to-apples comparison. |

### ID-06 — After-Tax Cash Flow

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting |
| Notation | `ATCF = (Revenue − Cash Operating Expenses) × (1 − t) + (Depreciation × t)` |
| Variables | Rev = Revenue; COE = Cash Operating Expenses; t = Marginal Tax Rate; Depr = Depreciation |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollars |
| Authority | Capital budgeting theory; IRC §167 (depreciation); IRC §168 (MACRS) |
| Common errors | Omitting the depreciation tax shield (Depr × t); Treating depreciation as a cash outflow; Using average tax rate instead of marginal |
| Exam trap | Depreciation is non-cash—it does NOT directly reduce cash flow. It reduces taxable income, creating a tax shield. Only the tax shield (Depreciation × t) is added back. |

### ID-07 — MACRS Depreciation

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting |
| Notation | `MACRS Depreciation_t = Cost × MACRS Rate_t (from IRS Pub 946 tables)` |
| Variables | Cost = Asset Cost; Rate_t = MACRS Rate for Year t |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollars |
| Authority | MACRS — IRS Publication 946; IRC §168 |
| Common errors | Subtracting salvage value before applying MACRS rate (MACRS ignores salvage); Using wrong recovery period; Wrong half-year convention application in disposal year |
| Exam trap | MACRS ignores salvage value entirely—depreciable basis = full cost. Half-year convention: only 50% of Year 1 rate in Year 1, remainder in Year n+1. A 3-year property is depreciated over 4 tax years. |

### ID-08 — Accounting Rate of Return (ARR)

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting |
| Notation | `ARR = Average Annual Net Income / Average Investment` |
| Variables | AANI = Average Annual Net Income; AI = Average Investment |
| Rounding | Two decimal places |
| Tolerance | 0.01 percent |
| Authority | Capital budgeting theory |
| Common errors | Using cash flows instead of accounting net income; Using initial investment instead of average investment |
| Exam trap | ARR is the only capital budgeting method using accounting income rather than cash flows. It ignores the time value of money entirely. |

### ID-09 — Internal Rate of Return (IRR)

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting Methods |
| Notation | `IRR = discount rate r where NPV = Σ(CF_t / (1 + r)^t) − I_0 = 0; accept if IRR > required return (WACC)` |
| Variables | r = Discount Rate that zeroes NPV; CF_t = Cash Flow in Period t; I_0 = Initial Investment |
| Rounding | Two decimal places (percent) |
| Tolerance | 0.01 percent |
| Authority | Capital budgeting theory (Fisher, 1930); IRR decision rule |
| Common errors | Accepting projects whose IRR is below WACC; Ranking mutually exclusive projects of different scale or timing by IRR; Ignoring the multiple-IRR problem when cash flows change sign more than once |
| Exam trap | IRR has no closed form — it is found by interpolation or calculator. The IRR method assumes reinvestment at the IRR itself; NPV assumes reinvestment at WACC. For independent projects IRR and NPV agree; for mutually exclusive projects they can conflict. |

### ID-10 — Post-Audit Variance Analysis

| Field | Value |
|-------|-------|
| Subsection | Capital Budgeting Control |
| Notation | `Variance = Actual − Budget (decomposed by line: revenue, variable costs, fixed costs)` |
| Variables | Actual_t / Budget_t = actual and budgeted amounts for each post-audit line item |
| Rounding | Nearest whole dollar |
| Tolerance | 1 dollar |
| Authority | Capital budgeting control theory; post-completion audit practice |
| Common errors | Sign errors (reporting unfavorable variances as favorable); Comparing totals without decomposing into drivers; Reporting the variance of a non-comparable period |
| Exam trap | A post-audit decomposes the operating-income miss into revenue and cost drivers to improve future forecasts. It is not a punishment tool for uncontrollable variances, and acceptance criteria are never changed retroactively. |

---

## Domain F — Professional Ethics (0 formulas)
