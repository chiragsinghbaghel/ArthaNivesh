import {
  ServiceItem,
  ResearchCall,
  PerformanceSummary,
  PerformanceRecord,
  MarketUpdateArticle,
  ResearchReport,
  PricingPlan,
  TeamMember,
  SiteSettings,
  GrievanceComplaint,
  Enquiry
} from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'ArthaNivesh Financial Research',
  tagline: 'Independent Market Research & Quantitative Insights for Disciplined Investors',
  stats: {
    yearsOfResearch: '12+',
    marketSegments: '6 Segments',
    researchTeamCount: '14 Specialists',
    researchUpdatesCount: '18,500+',
    clientSupportSla: '99.4%'
  },
  contact: {
    addressLine1: 'Unit 904, Financial Center, G-Block, Bandra Kurla Complex (BKC)',
    addressLine2: 'Bandra East, Western Express Highway Corridor',
    cityStateZip: 'Mumbai, Maharashtra 400051',
    phone: '+91 (022) 6890 4100',
    altPhone: '+91 98200 48210',
    email: 'research@arthanivesh.in',
    complianceEmail: 'compliance@arthanivesh.in',
    workingHours: 'Mon - Fri: 8:30 AM - 6:00 PM IST (Market Hours Support)',
    whatsappNumber: '+91 98200 48210'
  },
  compliance: {
    sebiRegNo: 'INH000014829 (Research Analyst - Indicative Sample Number)',
    cin: 'U67190MH2014PTC259182',
    complianceOfficerName: 'Sanjay V. Kulkarni (CS & Compliance Head)',
    complianceOfficerContact: 'compliance@arthanivesh.in | +91 22 6890 4105',
    grievanceOfficerName: 'Pooja Deshmukh (Principal Officer)',
    grievanceOfficerContact: 'grievance@arthanivesh.in | +91 22 6890 4106'
  },
  disclaimerText: 'Investment in securities and commodities market is subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.'
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'equity-cash-research',
    name: 'Equity Cash Research',
    category: 'equity',
    imageTheme: 'stock-cash',
    visualTitle: 'STOCK CASH',
    shortDesc: 'Systematic fundamental and technical research on NSE/BSE large-cap and mid-cap cash equities.',
    overview: 'Designed for retail and active swing investors seeking well-researched delivery and positional equity opportunities backed by balance sheet strength, earnings momentum, and breakout price patterns.',
    whoIsItFor: 'Active retail investors, corporate professionals, and wealth builders seeking capital appreciation over 2 weeks to 6 months without derivatives exposure.',
    researchApproach: 'Blend of quantitative screening (ROCE > 18%, Low Debt, PE/PEG relative valuation) combined with weekly chart multi-timeframe breakouts and Volume Weighted Average Price (VWAP) confirmation.',
    marketSegment: 'NSE / BSE Cash Market (Nifty 50, Nifty Next 50, Midcap 150)',
    riskLevel: 'Moderate',
    suitableFor: 'Medium to long horizon equity investors with a 3-12 month timeframe.',
    keyFeatures: [
      'Comprehensive scrip valuation rationale & entry bands',
      'Calculated Target 1 & Target 2 levels based on Fibonacci extensions',
      'Defensive stop-loss rules to cap individual drawdown below 5-7%',
      'Quarterly result updates and earnings impact notes'
    ],
    deliverables: [
      'Real-time SMS & Telegram research notifications during market hours',
      'Detailed PDF Research Note with Fundamental Rationale',
      'Weekly Portfolio Review Webinars on Saturdays',
      'Risk-adjusted holding period tracker'
    ],
    sampleFormat: {
      scrip: 'LARSEN & TOUBRO (LT) - CASH',
      action: 'BUY',
      entryRange: '₹3,580 - ₹3,610',
      target1: '₹3,780',
      target2: '₹3,920',
      stopLoss: '₹3,470 (Closing Basis)',
      holdingPeriod: '3 - 6 Weeks',
      rationale: 'Robust order book expansion (+21% YoY) and fresh breakout above multi-month consolidation channel with 2.8x 20-day volume.'
    },
    pricingSnippet: 'From ₹4,999/month',
    disclaimer: 'Equity cash investments carry market risk. Past research outcomes are not indicative of future returns.'
  },
  {
    id: 'intraday-market-research',
    name: 'Intraday Market Research',
    category: 'equity',
    imageTheme: 'intraday',
    visualTitle: 'INTRADAY MOMENTUM',
    shortDesc: 'High-momentum same-day research alerts for highly liquid large-cap equities with disciplined stop-loss.',
    overview: 'Focused on same-day price action movements during market hours (9:15 AM - 3:15 PM) utilizing proprietary volume-spread analysis and liquidity cluster mapping.',
    whoIsItFor: 'Full-time screen traders and experienced market participants who monitor live terminals and adhere strictly to predefined stop-loss orders.',
    researchApproach: 'High-probability intraday setups identified through 5-minute and 15-minute Opening Range Breakouts (ORB), SuperTrend crossovers, and Sectoral Momentum heatmaps.',
    marketSegment: 'NSE Cash Large-Cap Equities (F&O Basket Stocks Only)',
    riskLevel: 'Very High',
    suitableFor: 'Disciplined intraday traders with quick execution speed and strict risk tolerance.',
    keyFeatures: [
      'Strict 1:1.5 minimum Risk-to-Reward ratio on every alert',
      '1 to 3 curated research calls per active trading session',
      'Mandatory hard stop-loss provided before order trigger',
      'Real-time trailing stop-loss modification advisories'
    ],
    deliverables: [
      'Instant push alerts via Portal, WhatsApp API, and Telegram',
      'Morning Pre-Market Level Sheets (Pivot Points & Key Support/Resistance)',
      '11:30 AM Mid-day Market Breadth Check',
      'EOD Intraday Performance Log with exact timestamps'
    ],
    sampleFormat: {
      scrip: 'TATA MOTORS (TATAMOTORS) - INTRADAY',
      action: 'BUY',
      entryRange: '₹988.50 - ₹991.00',
      target1: '₹1,003.00',
      target2: '₹1,012.00',
      stopLoss: '₹981.50',
      holdingPeriod: 'Intraday (Square off by 3:15 PM)',
      rationale: 'Breakout above Day’s Opening Range with heavy institutional buying in Auto Index.'
    },
    pricingSnippet: 'From ₹6,499/month',
    disclaimer: 'Intraday trading carries significant risk of rapid capital erosion. Strict capital allocation is recommended.'
  },
  {
    id: 'positional-research',
    name: 'Positional Swing Research',
    category: 'equity',
    imageTheme: 'positional',
    visualTitle: 'TURTLES TREASURE',
    shortDesc: 'Multi-week swing setups capturing 8% to 20% directional swings in top sector leaders.',
    overview: 'Positional research is engineered for traders who cannot monitor intraday ticks but wish to capitalize on multi-day trend continuations and institutional sector rotations.',
    whoIsItFor: 'Working professionals, business owners, and part-time investors looking for calculated swing ideas without intraday stress.',
    researchApproach: 'Daily chart moving average convergence (EMA 20 & EMA 50), institutional accumulation footprints, and macroeconomic thematic trends.',
    marketSegment: 'NSE Midcap & Largecap Equities',
    riskLevel: 'Moderate',
    suitableFor: 'Traders with holding capabilities of 10 to 45 trading sessions.',
    keyFeatures: [
      'Holding duration of 2 to 6 weeks',
      'Clear trailing stop-loss strategies to protect accumulated gains',
      'Detailed sector tailwind reports attached to each alert',
      'Controlled exposure of max 8-10% portfolio capital per recommendation'
    ],
    deliverables: [
      'Dedicated research reports on individual tickers',
      'Bi-weekly position management bulletin',
      'Live stop-loss adjustment triggers via SMS/Email',
      'Direct query resolution window with research desk'
    ],
    sampleFormat: {
      scrip: 'BHARTI AIRTEL (BHARTIARTL) - POSITIONAL',
      action: 'BUY',
      entryRange: '₹1,420 - ₹1,435',
      target1: '₹1,520',
      target2: '₹1,585',
      stopLoss: '₹1,375',
      holdingPeriod: '3 - 5 Weeks',
      rationale: 'Cup & Handle pattern breakout on daily charts with rising ARPU projections and strong relative strength index (RSI 62).'
    },
    pricingSnippet: 'From ₹5,999/month',
    disclaimer: 'Swing investments are subject to overnight gap risks and overall benchmark volatility.'
  },
  {
    id: 'futures-research',
    name: 'Stock Futures Research',
    category: 'derivatives',
    imageTheme: 'stock-future',
    visualTitle: 'STOCK FUTURE',
    shortDesc: 'Directional futures research on NSE stock derivatives using Open Interest and Cost-of-Carry metrics.',
    overview: 'Specialized research for derivatives traders analyzing long build-up, short-covering rallies, and high-probability directional trends with leveraged margin efficiency.',
    whoIsItFor: 'Experienced derivatives traders with adequate risk capital who understand margin calls, mark-to-market mechanics, and lot sizes.',
    researchApproach: 'In-depth Open Interest (OI) analysis, rollover percentages, basis spread dynamics, and delivery volume confirmations.',
    marketSegment: 'NSE Stock Futures (Current & Near Month Expiry)',
    riskLevel: 'Very High',
    suitableFor: 'High-risk tolerance traders with substantial capital buffers.',
    keyFeatures: [
      'Strict margin discipline and lot allocation guidelines',
      'Tracking of institutional FII & DII derivatives positioning',
      'Clear rollover recommendations 3 days prior to monthly expiry',
      'Hedging alternatives suggested during elevated market volatility'
    ],
    deliverables: [
      'High-priority derivative research alerts during market hours',
      'Daily F&O Open Interest Heatmap & Rollover tracker',
      'Weekly derivatives risk audit for active positions',
      'Live trading room commentary updates'
    ],
    sampleFormat: {
      scrip: 'RELIANCE FUT (Current Month)',
      action: 'BUY',
      entryRange: '₹2,940 - ₹2,950',
      target1: '₹2,995',
      target2: '₹3,040',
      stopLoss: '₹2,910',
      holdingPeriod: '3 - 8 Days',
      rationale: 'Long build-up with 14% increase in OI and premium expansion against spot.'
    },
    pricingSnippet: 'From ₹7,999/month',
    disclaimer: 'Futures contracts involve leverage and can result in losses exceeding initial margin.'
  },
  {
    id: 'options-research',
    name: 'Stock & Index Options Research',
    category: 'derivatives',
    imageTheme: 'stock-option',
    visualTitle: 'STOCK OPTION',
    shortDesc: 'Strategic option buying and spread structures engineered for asymmetric risk-reward profiles.',
    overview: 'Comprehensive research covering directional calls/puts, bull call spreads, bear put spreads, and volatility strategies designed to safeguard capital against theta decay.',
    whoIsItFor: 'Traders seeking defined-risk derivative exposure with controlled loss thresholds.',
    researchApproach: 'Option Greeks analysis (Delta, Theta, Gamma, Vega), Implied Volatility (IV) percentile tracking, and Max Pain / PCR (Put-Call Ratio) indicators.',
    marketSegment: 'Nifty, Bank Nifty & NSE Stock Options',
    riskLevel: 'High',
    suitableFor: 'Traders looking for asymmetric reward-to-risk setups with defined maximum loss.',
    keyFeatures: [
      'Both directional naked options (high momentum) and two-leg defined spreads',
      'Emphasis on avoiding high-decay out-of-the-money (OTM) traps',
      'Target 1:2 to 1:3 risk-reward setups with clear premium stop loss',
      'Expiry day special volatility research setups'
    ],
    deliverables: [
      'Instant SMS, Telegram, and In-App Research notifications',
      'Option Greeks summary accompanying each recommendation',
      'PCR and Max Pain shift alerts throughout the trading session',
      'Monthly derivatives educational masterclass access'
    ],
    sampleFormat: {
      scrip: 'INFY 1900 CE (Current Month Expiry)',
      action: 'BUY',
      entryRange: '₹38.00 - ₹41.00',
      target1: '₹55.00',
      target2: '₹68.00',
      stopLoss: '₹28.00',
      holdingPeriod: '2 - 4 Trading Days',
      rationale: 'Heavy call unwinding at 1900 strike accompanied by fresh IT sector breakout.'
    },
    pricingSnippet: 'From ₹6,999/month',
    disclaimer: 'Option buyers face 100% loss of paid premium if the contract expires out of the money.'
  },
  {
    id: 'index-research',
    name: 'Index Derivatives Research (Nifty & Bank Nifty)',
    category: 'derivatives',
    imageTheme: 'index',
    visualTitle: 'INDEX',
    shortDesc: 'Institutional benchmark index research focusing on Nifty 50 and Bank Nifty weekly and monthly contracts.',
    overview: 'Our flagship index research desk tracks macroeconomic indicators, global market cues, gift nifty trends, and heavyweight index constituents to forecast directional index swings.',
    whoIsItFor: 'Active index traders looking for high-conviction benchmark levels, expiry day strategies, and key inflection points.',
    researchApproach: 'Multi-variable regression of top 10 index heavyweights, open interest distribution clusters, and central pivot range (CPR) analysis.',
    marketSegment: 'NSE Nifty 50, Nifty Bank, Nifty Fin Service',
    riskLevel: 'Very High',
    suitableFor: 'Experienced index traders with rapid execution and strict risk controls.',
    keyFeatures: [
      'Daily Pre-Market Morning Index Outlook before 9:00 AM',
      'Key Support (S1, S2, S3) and Resistance (R1, R2, R3) calculation tables',
      'Weekly expiry day tactical trading plans',
      'Intraday trend reversal alerts based on volume surges'
    ],
    deliverables: [
      'Daily 8:45 AM Pre-Market Index Briefing PDF',
      'Real-time Index trading alerts during live market hours',
      'Mid-day and closing index technical summary',
      'Weekly expiry special strategy notes'
    ],
    sampleFormat: {
      scrip: 'NIFTY 24800 CALL (Current Weekly Expiry)',
      action: 'BUY',
      entryRange: '₹110.00 - ₹118.00',
      target1: '₹165.00',
      target2: '₹210.00',
      stopLoss: '₹82.00',
      holdingPeriod: 'Intraday / 1 Day',
      rationale: 'Nifty crossing 24,780 resistance with heavy short covering in IT and Private Banking.'
    },
    pricingSnippet: 'From ₹7,499/month',
    disclaimer: 'Index trading is highly volatile and influenced by domestic and geopolitical events.'
  },
  {
    id: 'commodity-research',
    name: 'Commodity MCX Research',
    category: 'commodity',
    imageTheme: 'commodity',
    visualTitle: 'MCX',
    shortDesc: 'Research coverage on MCX Bullion (Gold, Silver) and Energy (Crude Oil, Natural Gas).',
    overview: 'Providing specialized technical research for commodities traded on the Multi Commodity Exchange of India (MCX), aligned with NYMEX, COMEX, OPEC developments, and USD currency trends.',
    whoIsItFor: 'Commodity traders and evening market participants seeking opportunities during evening trading hours (9:00 AM to 11:30 PM).',
    researchApproach: 'Global commodity correlations, inventory reports (EIA Crude Oil inventory, US Natural Gas storage), and multi-timeframe technical pivot levels.',
    marketSegment: 'MCX (Gold, Silver, Crude Oil, Natural Gas, Copper)',
    riskLevel: 'Very High',
    suitableFor: 'Traders active during evening sessions who manage leveraged margin accounts.',
    keyFeatures: [
      'Comprehensive coverage of major evening trading hours',
      'Inventory announcement impact analysis prior to weekly data release',
      'Strict risk-reward parameters with exact stop-loss guidance',
      'Correlation tracking with US Dollar Index (DXY) and treasury yields'
    ],
    deliverables: [
      'Daily Evening Commodity Briefing (5:30 PM IST)',
      'Real-time MCX research alerts on SMS and Telegram',
      'Weekly Bullion & Energy Macro Outlook Report',
      'Direct communication channel with Commodity Research Desk'
    ],
    sampleFormat: {
      scrip: 'MCX CRUDE OIL (Near Month Contract)',
      action: 'BUY',
      entryRange: '₹6,420 - ₹6,440',
      target1: '₹6,560',
      target2: '₹6,680',
      stopLoss: '₹6,340',
      holdingPeriod: 'Intraday / Positional',
      rationale: 'EIA inventory drawdown of 3.2M barrels vs expected 1.1M, breakout above 50-period 4H EMA.'
    },
    pricingSnippet: 'From ₹6,999/month',
    disclaimer: 'Commodity futures are exposed to international market movements and high overnight volatility.'
  },
  {
    id: 'long-term-investment-research',
    name: 'Long-Term Wealth Creation Research',
    category: 'investment',
    imageTheme: 'stock-cash',
    visualTitle: 'LONG-TERM WEALTH',
    shortDesc: 'In-depth fundamental research for compounders with high ROCE, moat, and 3-5 year growth runways.',
    overview: 'Our long-term investment research model identifies high-quality businesses with strong management pedigree, structural tailwinds in India’s growth story, and reasonable valuation multiples.',
    whoIsItFor: 'Long-term investors, salaried professionals, business founders, and family trusts aiming for multi-year capital compounding.',
    researchApproach: 'Rigorous 5-pillar fundamental framework: Management Integrity, Moat & Pricing Power, Return on Invested Capital (ROIC > 20%), Debt-Free or Deleveraging Balance Sheet, and Fair Entry Valuations.',
    marketSegment: 'NSE / BSE Midcap, Smallcap & Largecap Equities',
    riskLevel: 'Moderate',
    suitableFor: 'Investors with minimum 2 to 5 years patient holding timeframe.',
    keyFeatures: [
      'Detailed 12 to 18-page institutional Initiating Coverage reports',
      'Target price models using 5-year Discounted Cash Flow (DCF) and EV/EBITDA',
      'Quarterly earnings review notes with management conference call summaries',
      'Clear asset allocation and staggered SIP / buying-on-dips strategy'
    ],
    deliverables: [
      'Quarterly Model Portfolio of 12-15 Handpicked Compounders',
      'Comprehensive Initiating Coverage PDF for each stock',
      'Semi-annual management interaction notes and sector reviews',
      'Annual Portfolio Rebalancing Roadmap'
    ],
    sampleFormat: {
      scrip: 'TRENT LTD / SOLAR INDUSTRIES - LONG TERM NOTE',
      action: 'ACCUMULATE ON DIPS',
      entryRange: 'Staggered over 3 tranches',
      target1: '35% Upside over 24 Months',
      target2: '75% Upside over 36 Months',
      stopLoss: 'Periodic Fundamentals Review',
      holdingPeriod: '3 - 5 Years',
      rationale: 'Category creation in retail & defense exports with 28% EPS CAGR and superior working capital discipline.'
    },
    pricingSnippet: 'From ₹14,999/year',
    disclaimer: 'Equities carry business and cyclical risks. Compounding requires patience and periodic fundamental reviews.'
  },
  {
    id: 'hni-research',
    name: 'HNI & Institutional Research Mandate',
    category: 'specialized',
    imageTheme: 'index',
    visualTitle: 'HNI INSTITUTIONAL',
    shortDesc: 'Bespoke, high-touch research coverage and thematic deep-dives for High Net Worth Individuals.',
    overview: 'Exclusive research advisory tailored for portfolios above ₹50 Lakhs. Includes direct access to Senior Research Analysts, custom portfolio risk audits, and macro thematic reports.',
    whoIsItFor: 'High Net-worth Individuals (HNIs), Ultra-HNIs, Family Offices, and Corporate Treasuries seeking institutional-grade research support.',
    researchApproach: 'Customized thematic research, unhedged risk stress-testing, promoter pledge analysis, and alternative investment evaluations.',
    marketSegment: 'Multi-Asset (Equities, Currencies, Index Hedging, Commodities)',
    riskLevel: 'Moderate',
    suitableFor: 'Accredited investors with substantial risk capital and bespoke research requirements.',
    keyFeatures: [
      'Direct 1-on-1 monthly consultation with Principal Research Analyst',
      'Customized Hedging strategies for existing large equity holdings',
      'Priority access to pre-IPO research and special situation notes',
      'White-glove communication via private channel and dedicated desk'
    ],
    deliverables: [
      'Custom quarterly portfolio health diagnostic report',
      'Direct senior analyst phone line for strategy consultations',
      'Weekly macro intelligence memo and thematic whitepapers',
      'Custom risk-budgeting sheet based on SEBI risk suitability'
    ],
    sampleFormat: {
      scrip: 'HNI MACRO STRATEGY NOTE: INFRASTRUCTURE & CAPITAL GOODS',
      action: 'STRATEGIC OVERWEIGHT',
      entryRange: 'Staggered Tranches across 5 Sector Leaders',
      target1: 'Alpha of 400-600 bps over Nifty 50',
      target2: 'Long-term Wealth Compounding',
      stopLoss: 'Dynamic Hedging via Index Puts',
      holdingPeriod: '12 - 36 Months',
      rationale: 'Capex cycle acceleration backed by central budget allocations and private sector capacity utilization crossing 76%.'
    },
    pricingSnippet: 'From ₹24,999/quarter',
    disclaimer: 'HNI mandates are research advisory services only; discretionary portfolio management is not performed.'
  },
  {
    id: 'portfolio-research',
    name: 'Portfolio Health & Review Research',
    category: 'specialized',
    imageTheme: 'stock-option',
    visualTitle: 'PORTFOLIO AUDIT',
    shortDesc: 'Independent second-opinion risk audit of your existing equity holdings to identify deadweight and concentration risk.',
    overview: 'A rigorous diagnostic check on your current stock portfolio. Our analysts evaluate sector concentration, fundamental strength of holdings, debt levels, and provide rebalancing recommendations.',
    whoIsItFor: 'Investors with existing portfolios across brokers who want an objective, conflict-free audit from a SEBI-registered research analyst.',
    researchApproach: 'Fundamental stress-test: Altman Z-Score for financial distress, Beneish M-Score for earnings manipulation, and beta-weighted sector exposure.',
    marketSegment: 'Complete Existing Equity Holdings',
    riskLevel: 'Low',
    suitableFor: 'Any investor holding 5 or more individual stocks looking to optimize risk-adjusted returns.',
    keyFeatures: [
      'Identify non-performing and value-trap stocks to exit',
      'Eliminate duplicate sector exposure and over-diversification',
      'Benchmark your portfolio against Nifty 50 & Nifty 500 indices',
      'Actionable Buy/Hold/Exit matrix with step-by-step rebalancing roadmap'
    ],
    deliverables: [
      '15-Page Comprehensive Portfolio Health Diagnostic Report',
      'Scorecard across Valuation, Quality, Momentum, and Risk',
      '30-Minute Video Consultation with Senior Research Analyst',
      'Follow-up audit after 90 days to verify portfolio alignment'
    ],
    sampleFormat: {
      scrip: 'PORTFOLIO AUDIT REPORT (SAMPLE SAMPLE-PORTFOLIO-102)',
      action: 'PORTFOLIO REBALANCING RECOMMENDATION',
      entryRange: 'Hold 65% / Trim 20% / Exit 15%',
      target1: 'Risk Optimization',
      target2: 'Sharpe Ratio Improvement to >1.4',
      stopLoss: 'Exit Loss-Making Cyclicals with deteriorating ROCE',
      holdingPeriod: 'Review every 6 Months',
      rationale: 'High concentration in PSU Banks (42% of portfolio) poses severe systemic downside in event of rate cut cycle.'
    },
    pricingSnippet: '₹4,999 (One-Time Comprehensive Audit)',
    disclaimer: 'Portfolio review is advisory in nature. Client executes trades independently through their chosen depository participant.'
  },
  {
    id: 'market-education',
    name: 'Market Education & Mentorship',
    category: 'specialized',
    imageTheme: 'stock-future',
    visualTitle: 'MARKET EDUCATION',
    shortDesc: 'Structured research-oriented learning modules on Price Action, Option Greeks, and Capital Preservation.',
    overview: 'Educational programs designed to build self-reliant market participants. Learn how professional research analysts analyze balance sheets, calculate option risk, and manage drawdowns.',
    whoIsItFor: 'Aspiring traders, engineering and MBA graduates, and investors wanting to understand the mechanics of the Indian stock market from first principles.',
    researchApproach: 'Practical, real-market case studies using historical NSE tick data, live chart sessions, and risk management simulations.',
    marketSegment: 'Educational Curriculum across Equities, F&O & Risk Management',
    riskLevel: 'Low',
    suitableFor: 'Learners of all experience levels seeking structured financial literacy.',
    keyFeatures: [
      'Module 1: Professional Technical Analysis & Price Action Mastery',
      'Module 2: Fundamental Valuation & Annual Report Decoding',
      'Module 3: Options Trading Strategies & Greek Risk Management',
      'Module 4: Trading Psychology, Journaling, and Drawdown Control'
    ],
    deliverables: [
      'Over 24 hours of self-paced institutional video lessons',
      'Comprehensive 200-page Digital Study Manual & Cheatsheets',
      'Weekly Live Doubt Clearance Sessions with Research Mentors',
      'Lifetime access to Private Educational Community Forum'
    ],
    sampleFormat: {
      scrip: 'EDUCATIONAL WORKSHOP: DERIVATIVES GREEKS DECODED',
      action: 'LEARNING MODULE',
      entryRange: 'Batch Enrollment',
      target1: 'Master Delta Neutral Spreads',
      target2: 'Master Risk-Reward Calculation',
      stopLoss: 'Zero Trading Without Risk Rules',
      holdingPeriod: '6 Weeks Interactive Program',
      rationale: 'Over 89% of retail traders lose capital due to lack of risk discipline and basic option decay awareness.'
    },
    pricingSnippet: '₹8,999 (Complete Masterclass Access)',
    disclaimer: 'Educational courses are purely for informational training and do not constitute specific trading tips or financial advice.'
  },
  {
    id: 'customized-research',
    name: 'Customized Research & Mandates',
    category: 'specialized',
    imageTheme: 'positional',
    visualTitle: 'CUSTOM RESEARCH',
    shortDesc: 'Tailor-made research coverage on specific sectors, micro-cap discovery, or special situational events.',
    overview: 'Designed for institutions, boutique funds, and corporate treasuries that require deep-dive research into specific unrepresented sectors, corporate restructuring, demergers, or open offers.',
    whoIsItFor: 'Family offices, proprietary trading desks, and business founders needing bespoke intelligence on specific listed opportunities.',
    researchApproach: 'Forensic accounting audits, channel checks with industry vendors and dealers, and customized discounted cash flow modeling under varied macroeconomic stress scenarios.',
    marketSegment: 'Bespoke Listed Securities Coverage',
    riskLevel: 'Moderate',
    suitableFor: 'Institutional and high-ticket clients requiring custom-scoped research.',
    keyFeatures: [
      'Dedicated research analyst assigned to your specific research mandate',
      'Forensic financial statement analysis and red-flag identification',
      'Primary market channel checks across Indian industrial hubs',
      'Exclusive bespoke research delivery with strict confidentiality'
    ],
    deliverables: [
      'Detailed Custom Whitepaper and Financial Model (.xlsx)',
      'Forensic Checklist across 48 critical corporate governance parameters',
      'Executive Briefing with Chief Research Strategist',
      'Continuous quarterly updates for the duration of the mandate'
    ],
    sampleFormat: {
      scrip: 'SPECIAL SITUATION: DEMERGER ARBITRAGE & VALUE UNLOCK',
      action: 'BESPOKE RESEARCH BRIEF',
      entryRange: 'Custom Mandate Specification',
      target1: 'Value Realization post-demerger',
      target2: 'Sum of the Parts (SOTP) Expansion',
      stopLoss: 'Regulatory Approval Failure Risk',
      holdingPeriod: '6 - 18 Months',
      rationale: 'Demerger of high-growth consumer retail entity from low-multiple core industrial parent unlocks 45% hidden value.'
    },
    pricingSnippet: 'Custom Quote on Request',
    disclaimer: 'Custom research is provided for internal evaluation only and is not meant for public dissemination.'
  }
];

export const INITIAL_RESEARCH_CALLS: ResearchCall[] = [
  {
    id: 'call-01',
    instrument: 'NIFTY 24850 CALL (Weekly)',
    segment: 'Index Options',
    action: 'BUY',
    entryPrice: 115.0,
    target1: 155.0,
    target2: 195.0,
    stopLoss: 88.0,
    currentPrice: 162.5,
    date: 'Today',
    time: '09:28 AM',
    status: 'TARGET_1_HIT',
    rationale: 'Gift Nifty positive momentum with strong put writing observed at 24,800 strike.',
    riskReward: '1:1.8'
  },
  {
    id: 'call-02',
    instrument: 'TATA MOTORS',
    segment: 'Equity Cash',
    action: 'BUY',
    entryPrice: 988.0,
    target1: 1015.0,
    target2: 1040.0,
    stopLoss: 968.0,
    currentPrice: 994.5,
    date: 'Today',
    time: '10:15 AM',
    status: 'ACTIVE',
    rationale: 'Breakout above 15-day consolidation base with volume 2.4x the 20-day moving average.',
    riskReward: '1:2.0'
  },
  {
    id: 'call-03',
    instrument: 'RELIANCE IND FUT',
    segment: 'Stock Futures',
    action: 'BUY',
    entryPrice: 2942.0,
    target1: 2990.0,
    target2: 3030.0,
    stopLoss: 2912.0,
    currentPrice: 2994.0,
    date: 'Yesterday',
    time: '11:40 AM',
    status: 'TARGET_1_HIT',
    rationale: 'Long build-up with 8% increase in Open Interest and supportive Energy index momentum.',
    riskReward: '1:1.6'
  },
  {
    id: 'call-04',
    instrument: 'MCX CRUDE OIL (Near Month)',
    segment: 'Commodity MCX',
    action: 'BUY',
    entryPrice: 6420.0,
    target1: 6540.0,
    target2: 6650.0,
    stopLoss: 6340.0,
    currentPrice: 6555.0,
    date: 'Yesterday',
    time: '06:10 PM',
    status: 'TARGET_1_HIT',
    rationale: 'EIA inventory drawdown and geopolitical shipping route tensions.',
    riskReward: '1:1.5'
  },
  {
    id: 'call-05',
    instrument: 'HDFC BANK',
    segment: 'Equity Cash',
    action: 'BUY',
    entryPrice: 1640.0,
    target1: 1695.0,
    target2: 1740.0,
    stopLoss: 1608.0,
    currentPrice: 1672.0,
    date: '03 Oct 2026',
    time: '09:45 AM',
    status: 'ACTIVE',
    rationale: 'Credit growth improvement and CD ratio normalization in quarterly operational preview.',
    riskReward: '1:2.2'
  },
  {
    id: 'call-06',
    instrument: 'BANK NIFTY 53200 PUT',
    segment: 'Index Options',
    action: 'BUY',
    entryPrice: 240.0,
    target1: 340.0,
    target2: 420.0,
    stopLoss: 185.0,
    currentPrice: 348.0,
    date: '02 Oct 2026',
    time: '01:15 PM',
    status: 'TARGET_1_HIT',
    rationale: 'Failure to sustain above resistance pivot with heavy call writing at 53,500.',
    riskReward: '1:1.8'
  },
  {
    id: 'call-07',
    instrument: 'INFOSYS (INFY)',
    segment: 'Equity Cash',
    action: 'BUY',
    entryPrice: 1890.0,
    target1: 1960.0,
    target2: 2020.0,
    stopLoss: 1850.0,
    currentPrice: 1845.0,
    date: '28 Sep 2026',
    time: '10:00 AM',
    status: 'SL_TRIGGERED',
    rationale: 'IT sectoral weakness triggered stop loss on sudden currency strengthening.',
    riskReward: '1:1.75'
  },
  {
    id: 'call-08',
    instrument: 'LARSEN & TOUBRO',
    segment: 'Equity Cash',
    action: 'BUY',
    entryPrice: 3580.0,
    target1: 3750.0,
    target2: 3900.0,
    stopLoss: 3470.0,
    currentPrice: 3915.0,
    date: '22 Sep 2026',
    time: '11:20 AM',
    status: 'TARGET_2_HIT',
    rationale: 'Mega international order wins announced in Middle East transmission corridor.',
    riskReward: '1:2.9'
  }
];

export const INITIAL_PERFORMANCE_SUMMARIES: PerformanceSummary[] = [
  {
    category: 'Equity',
    reportingPeriod: 'Q2 (Jul - Sep 2026)',
    totalCalls: 64,
    successfulCalls: 49,
    unsuccessfulCalls: 15,
    accuracyRate: '76.5%',
    avgRiskReward: '1:2.1',
    reportTitle: 'Equity Cash Research Performance Report Q2-2026',
    pdfFilename: 'ArthaNivesh_Equity_Q2_2026_Performance.pdf'
  },
  {
    category: 'Futures',
    reportingPeriod: 'Q2 (Jul - Sep 2026)',
    totalCalls: 52,
    successfulCalls: 38,
    unsuccessfulCalls: 14,
    accuracyRate: '73.0%',
    avgRiskReward: '1:1.8',
    reportTitle: 'Derivatives Stock Futures Performance Q2-2026',
    pdfFilename: 'ArthaNivesh_Futures_Q2_2026_Performance.pdf'
  },
  {
    category: 'Options',
    reportingPeriod: 'Q2 (Jul - Sep 2026)',
    totalCalls: 78,
    successfulCalls: 55,
    unsuccessfulCalls: 23,
    accuracyRate: '70.5%',
    avgRiskReward: '1:2.4',
    reportTitle: 'Stock & Index Options Strategy Track Record Q2-2026',
    pdfFilename: 'ArthaNivesh_Options_Q2_2026_Performance.pdf'
  },
  {
    category: 'Index',
    reportingPeriod: 'Q2 (Jul - Sep 2026)',
    totalCalls: 48,
    successfulCalls: 36,
    unsuccessfulCalls: 12,
    accuracyRate: '75.0%',
    avgRiskReward: '1:1.9',
    reportTitle: 'Nifty & Bank Nifty Expiry Research Performance Q2-2026',
    pdfFilename: 'ArthaNivesh_Index_Q2_2026_Performance.pdf'
  },
  {
    category: 'Commodity',
    reportingPeriod: 'Q2 (Jul - Sep 2026)',
    totalCalls: 40,
    successfulCalls: 29,
    unsuccessfulCalls: 11,
    accuracyRate: '72.5%',
    avgRiskReward: '1:1.7',
    reportTitle: 'MCX Bullion & Energy Quarterly Audit Q2-2026',
    pdfFilename: 'ArthaNivesh_Commodity_Q2_2026_Performance.pdf'
  },
  {
    category: 'Positional',
    reportingPeriod: 'Q2 (Jul - Sep 2026)',
    totalCalls: 32,
    successfulCalls: 26,
    unsuccessfulCalls: 6,
    accuracyRate: '81.2%',
    avgRiskReward: '1:2.8',
    reportTitle: 'Positional Multi-Week Swing Performance Q2-2026',
    pdfFilename: 'ArthaNivesh_Positional_Q2_2026_Performance.pdf'
  }
];

export const INITIAL_PERFORMANCE_RECORDS: PerformanceRecord[] = [
  {
    id: 'pr-01',
    date: '29 Sep 2026',
    instrument: 'LARSEN & TOUBRO (LT)',
    segment: 'Equity',
    action: 'BUY',
    entryPrice: 3580.0,
    exitPrice: 3910.0,
    pnlPercentage: 9.22,
    outcome: 'TARGET_HIT',
    holdingDuration: '14 Days'
  },
  {
    id: 'pr-02',
    date: '27 Sep 2026',
    instrument: 'NIFTY 24700 CE',
    segment: 'Index',
    action: 'BUY',
    entryPrice: 130.0,
    exitPrice: 198.0,
    pnlPercentage: 52.3,
    outcome: 'TARGET_HIT',
    holdingDuration: '1 Day'
  },
  {
    id: 'pr-03',
    date: '25 Sep 2026',
    instrument: 'RELIANCE FUT',
    segment: 'Futures',
    action: 'BUY',
    entryPrice: 2920.0,
    exitPrice: 2985.0,
    pnlPercentage: 2.22,
    outcome: 'TARGET_HIT',
    holdingDuration: '4 Days'
  },
  {
    id: 'pr-04',
    date: '24 Sep 2026',
    instrument: 'INFY CASH',
    segment: 'Equity',
    action: 'BUY',
    entryPrice: 1890.0,
    exitPrice: 1850.0,
    pnlPercentage: -2.11,
    outcome: 'SL_TRIGGERED',
    holdingDuration: '2 Days'
  },
  {
    id: 'pr-05',
    date: '22 Sep 2026',
    instrument: 'MCX CRUDE OIL',
    segment: 'Commodity',
    action: 'BUY',
    entryPrice: 6380.0,
    exitPrice: 6510.0,
    pnlPercentage: 2.03,
    outcome: 'TARGET_HIT',
    holdingDuration: 'Intraday'
  },
  {
    id: 'pr-06',
    date: '20 Sep 2026',
    instrument: 'BHARTI AIRTEL',
    segment: 'Positional',
    action: 'BUY',
    entryPrice: 1420.0,
    exitPrice: 1530.0,
    pnlPercentage: 7.74,
    outcome: 'TARGET_HIT',
    holdingDuration: '21 Days'
  },
  {
    id: 'pr-07',
    date: '18 Sep 2026',
    instrument: 'TATASTEEL FUT',
    segment: 'Futures',
    action: 'BUY',
    entryPrice: 158.0,
    exitPrice: 154.5,
    pnlPercentage: -2.21,
    outcome: 'SL_TRIGGERED',
    holdingDuration: '3 Days'
  },
  {
    id: 'pr-08',
    date: '15 Sep 2026',
    instrument: 'BANK NIFTY 52800 PE',
    segment: 'Options',
    action: 'BUY',
    entryPrice: 210.0,
    exitPrice: 325.0,
    pnlPercentage: 54.7,
    outcome: 'TARGET_HIT',
    holdingDuration: 'Intraday'
  }
];

export const INITIAL_RESEARCH_REPORTS: ResearchReport[] = [
  {
    id: 'rep-01',
    title: 'Daily Morning Bell & Pre-Market Strategy Note',
    category: 'Daily Research',
    date: '05 Oct 2026',
    fileSize: '1.8 MB',
    shortDescription: 'Comprehensive preview of Gift Nifty cues, Asian market trends, key institutional pivot levels for Nifty 50 and Bank Nifty, and top 5 stocks to track.',
    highlights: [
      'Nifty expected to open with a positive bias around 24,880',
      'Banking sector relative strength improving with liquidity easing',
      'Key resistance: 24,950; Crucial support: 24,720',
      'FII net buyers of ₹1,420 Cr in yesterday’s cash session'
    ],
    pdfDownloadName: 'ArthaNivesh_Daily_Bell_05Oct2026.pdf',
    analyst: 'Virendra Sharma, Lead Technical Strategist'
  },
  {
    id: 'rep-02',
    title: 'Weekly Derivatives Expiry & Open Interest Compass',
    category: 'F&O Reports',
    date: '02 Oct 2026',
    fileSize: '3.2 MB',
    shortDescription: 'Deep dive into options chain distribution, Put-Call Ratio (PCR), Max Pain analysis, and sector rollover percentages across 185 F&O counters.',
    highlights: [
      'Nifty PCR currently sits at 1.18 indicating mild bullish undertone',
      'Heavy call resistance clustered at 25,000 strike (1.1 Cr Open Interest)',
      'Bank Nifty 53,000 put base provides strong weekly foundation',
      'Automobile and Capital Goods leading sectoral rollover metrics'
    ],
    pdfDownloadName: 'ArthaNivesh_Weekly_Derivatives_OctW1_2026.pdf',
    analyst: 'Ananya Sen, Senior Derivatives Analyst'
  },
  {
    id: 'rep-03',
    title: 'Q2 FY27 Earnings Preview: Banking & Information Technology',
    category: 'Equity Reports',
    date: '28 Sep 2026',
    fileSize: '4.5 MB',
    shortDescription: 'Detailed financial modeling and margin expectations for frontline private banks and tier-1 IT services firms heading into quarterly results season.',
    highlights: [
      'Private banks expected to show stable Net Interest Margins (NIMs)',
      'Asset quality metrics remain at multi-year pristine highs',
      'IT firms seeing steady BFSI deal ramp-ups in North America',
      'Top picks: HDFC Bank, Axis Bank, and Persistent Systems'
    ],
    pdfDownloadName: 'ArthaNivesh_Q2_Earnings_Preview_2026.pdf',
    analyst: 'Rajeshwar Hegde, Head of Fundamental Research'
  },
  {
    id: 'rep-04',
    title: 'Commodity Weekly Outlook: Energy Crisis & Bullion Trends',
    category: 'Commodity Reports',
    date: '25 Sep 2026',
    fileSize: '2.1 MB',
    shortDescription: 'Global macroeconomic evaluation of MCX Gold, Silver, and Crude Oil in relation to Federal Reserve interest rate policy and geopolitical shipping bottlenecks.',
    highlights: [
      'Gold maintaining firm base above ₹75,000/10g on central bank purchases',
      'Crude oil range-bound between $74 and $81 per barrel',
      'Silver outperforming gold on industrial green-energy demand'
    ],
    pdfDownloadName: 'ArthaNivesh_Commodity_Weekly_Sep2026.pdf',
    analyst: 'Kunal Trivedi, Commodities Specialist'
  },
  {
    id: 'rep-05',
    title: 'Monthly Macroeconomic & Valuation Dossier: India’s Growth Engine',
    category: 'Monthly Research',
    date: '20 Sep 2026',
    fileSize: '5.8 MB',
    shortDescription: 'In-depth assessment of GST collection momentum, industrial production (IIP), CAD indicators, and structural valuation premiums of Indian equities.',
    highlights: [
      'GDP growth trajectory projected at 7.1% for current fiscal year',
      'Corporate capex announcements up 24% YoY across infrastructure',
      'Valuation multiples in Midcaps warranting disciplined selectivity'
    ],
    pdfDownloadName: 'ArthaNivesh_Macro_Monthly_Sep2026.pdf',
    analyst: 'Dr. Meera Iyer, Chief Economist & Strategist'
  },
  {
    id: 'rep-06',
    title: 'Midcap & Smallcap Alpha Discovery: 3 Under-Researched Compounders',
    category: 'Market Outlook',
    date: '15 Sep 2026',
    fileSize: '3.9 MB',
    shortDescription: 'Detailed qualitative Initiating Coverage on three niche manufacturing and precision engineering leaders with high ROCE and expanding export footprints.',
    highlights: [
      'Average 3-year profit CAGR exceeding 26%',
      'Negligible debt-to-equity and robust cash flow conversion (>85%)',
      'Management execution validated through primary vendor checks'
    ],
    pdfDownloadName: 'ArthaNivesh_Midcap_Alpha_Sep2026.pdf',
    analyst: 'Rajeshwar Hegde, Head of Fundamental Research'
  }
];

export const INITIAL_MARKET_UPDATES: MarketUpdateArticle[] = [
  {
    id: 'news-01',
    date: '05 Oct 2026',
    category: 'RBI & Policy',
    title: 'RBI Monetary Policy Committee Maintains Stance on Growth-Inflation Balance',
    shortDesc: 'The Reserve Bank of India’s MPC meeting concludes with benchmark repo rate maintained, highlighting domestic economic resilience.',
    content: 'The Reserve Bank of India’s Monetary Policy Committee (MPC) voted to keep the policy repo rate unchanged at 6.50%, reiterating its commitment to aligning inflation with the 4% target while actively supporting GDP growth momentum. Governor stated that domestic economic activity remains robust, bolstered by private consumption and government capital expenditure. The banking system liquidity has returned to surplus territory, which is expected to support credit transmission across commercial segments.',
    readTime: '3 min read',
    author: 'Macro Economics Desk',
    tags: ['RBI', 'Monetary Policy', 'Repo Rate', 'Inflation']
  },
  {
    id: 'news-02',
    date: '04 Oct 2026',
    category: 'Market Wrap',
    title: 'Nifty 50 Reclaims 24,800 Mark Supported by Banking & Metal Heavyweights',
    shortDesc: 'Benchmark indices surged as institutional foreign flows turned net positive and global risk appetite rebounded.',
    content: 'Indian equity benchmark indices staged a sharp comeback in Wednesday’s trading session, with the Nifty 50 rallying 185 points to close at 24,842. The advance was broad-based with the Nifty Metal index leading gainers (+2.4%), followed closely by Private Banks (+1.8%). FIIs were net buyers to the tune of ₹1,420 crore in the cash segment, while DIIs absorbed ₹890 crore. Technical indicators on the daily timeframe confirm a bullish continuation setup as the index broke above its 20-day exponential moving average.',
    readTime: '4 min read',
    author: 'Equity Research Desk',
    tags: ['Nifty 50', 'FII Flow', 'Market Wrap', 'Technical Analysis']
  },
  {
    id: 'news-03',
    date: '03 Oct 2026',
    category: 'Sector Watch',
    title: 'Auto Sector Enters Festive Season with Record Wholesale Dispatches',
    shortDesc: 'Passenger vehicle and two-wheeler retail sales indicate strong consumer sentiment across urban and semi-urban markets.',
    content: 'September wholesale dispatch figures released by leading automobile manufacturers show healthy double-digit growth. Passenger vehicle dispatches hit an all-time monthly high of 3.82 lakh units as dealerships built inventory ahead of the peak festive window. Utility vehicles (UVs) continue to dominate market share, comprising 61% of total shipments. Rural demand recovery has catalyzed two-wheeler sales, with rural dealerships reporting inquiries up 18% YoY.',
    readTime: '3 min read',
    author: 'Sectoral Research Team',
    tags: ['Automobile', 'Festive Sales', 'Wholesale', 'Consumer Demand']
  },
  {
    id: 'news-04',
    date: '01 Oct 2026',
    category: 'Macro Economy',
    title: 'Gross GST Collections Surge 10.2% YoY to ₹1.82 Lakh Crore in September',
    shortDesc: 'Buoyancy in goods and services tax collections reflects underlying formal economic expansion and improved compliance.',
    content: 'India’s gross Goods and Services Tax (GST) revenues for September 2026 touched ₹1,82,400 crore, recording a healthy 10.2% growth over the corresponding period last year. Revenues from domestic transactions registered an 11.5% uptick. Consistent tax collections above the ₹1.8 lakh crore threshold provide fiscal headroom for the government to sustain infrastructure capital expenditure targets without breaching fiscal deficit glide paths.',
    readTime: '2 min read',
    author: 'Economic Research Bureau',
    tags: ['GST', 'Economy', 'Fiscal Deficit', 'Tax Revenue']
  }
];

export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-equity-cash',
    name: 'Equity Cash Prime',
    marketSegment: 'NSE / BSE Cash Equities',
    researchType: 'Positional & Swing Equity Research',
    duration: 'Quarterly',
    price: 12999,
    gstRate: 0.18,
    features: [
      '2 to 4 high-conviction delivery research notes per week',
      'Complete entry range, Target 1, Target 2 & Stop Loss',
      'Instant SMS, Email & Telegram notification alerts',
      'Quarterly result review notes and fundamental updates',
      'Weekly weekend portfolio review webinar',
      'Dedicated email query desk access'
    ],
    terms: [
      'Strictly non-refundable once activated',
      'Execution to be performed independently by client',
      'Valid for 90 calendar days from subscription date'
    ]
  },
  {
    id: 'plan-derivatives-pro',
    name: 'Derivatives Pro (F&O)',
    marketSegment: 'Nifty, Bank Nifty & Stock Options/Futures',
    researchType: 'Directional Options & Futures Strategies',
    duration: 'Quarterly',
    price: 18999,
    gstRate: 0.18,
    popular: true,
    features: [
      'Daily 1 to 2 index and stock derivatives setups',
      'Defined-risk spreads and high-momentum option buying',
      'Real-time trailing stop-loss modification advisories',
      'Weekly expiry day special strategic blueprint',
      'Daily Pre-Market Morning Index Sheet (8:45 AM)',
      'Priority live trading desk communication channel'
    ],
    terms: [
      'High-risk category; suitable only for qualified derivatives traders',
      'No profit guarantees; stop-loss discipline mandatory',
      'Valid for 90 calendar days from subscription date'
    ]
  },
  {
    id: 'plan-complete-market-pass',
    name: 'All-Market Research Pass',
    marketSegment: 'Equities, Index, F&O & Commodities',
    researchType: 'Complete Multi-Segment Research Access',
    duration: 'Half-Yearly',
    price: 32999,
    gstRate: 0.18,
    features: [
      'Unrestricted access to all Equity Cash & Positional calls',
      'Complete Nifty, Bank Nifty & Stock Derivatives research',
      'MCX Commodity alerts (Gold, Silver, Crude Oil, Natural Gas)',
      'Access to all premium Institutional Research Reports (PDF)',
      '1-on-1 Monthly Strategy Consultation with Research Analyst',
      'Free Comprehensive Portfolio Health Review Audit'
    ],
    terms: [
      'Full research access across all trading desks',
      'Direct line to Senior Research desk during market hours',
      'Valid for 180 calendar days from subscription date'
    ]
  },
  {
    id: 'plan-hni-institutional',
    name: 'Institutional HNI Mandate',
    marketSegment: 'Bespoke Multi-Asset Research',
    researchType: 'Tailored Thematic Research & Hedging',
    duration: 'Annually',
    price: 79999,
    gstRate: 0.18,
    features: [
      'Customized research coverage for portfolios above ₹50L',
      'Tailored derivatives hedging strategies for large holdings',
      'Direct monthly video conference with Chief Research Officer',
      'Exclusive Pre-IPO and Special Situation Value Unlocking notes',
      'Dedicated Senior Relationship Research Officer',
      'Complimentary access for up to 3 family portfolio accounts'
    ],
    terms: [
      'Advisory only; non-discretionary execution model',
      'Subject to SEBI investor suitability and risk assessment',
      'Valid for 365 calendar days from subscription date'
    ]
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-01',
    name: 'Rajeshwar Hegde',
    designation: 'Head of Research & Chief Strategist',
    qualification: 'CA, CFA Charterholder (USA), B.Com',
    experienceYears: 18,
    bio: 'Over 18 years of institutional equity research experience with leading domestic brokerages. Specialist in capital goods, infrastructure valuation, and forensic balance sheet analysis.',
    specialization: 'Fundamental Valuation & Equity Strategy',
    initials: 'RH'
  },
  {
    id: 'team-02',
    name: 'Virendra Sharma',
    designation: 'Lead Technical & Derivatives Strategist',
    qualification: 'CMT (Chartered Market Technician), MBA Finance',
    experienceYears: 14,
    bio: 'Passionate price action practitioner with deep expertise in multi-timeframe volume profiling, Wyckoff accumulation structures, and benchmark index volatility modeling.',
    specialization: 'Technical Analysis & Index Dynamics',
    initials: 'VS'
  },
  {
    id: 'team-03',
    name: 'Ananya Sen',
    designation: 'Senior Derivatives & Options Analyst',
    qualification: 'NISM Series XV Certified, M.Sc. Financial Mathematics',
    experienceYears: 10,
    bio: 'Specialist in quantitative options pricing, implied volatility skew, and structured delta-neutral hedging setups for institutional and active retail derivatives desks.',
    specialization: 'Option Greeks & Volatility Arbitrage',
    initials: 'AS'
  },
  {
    id: 'team-04',
    name: 'Sanjay V. Kulkarni',
    designation: 'Compliance Officer & Company Secretary',
    qualification: 'FCS (Fellow Company Secretary), LL.B.',
    experienceYears: 16,
    bio: 'Guiding corporate governance, statutory disclosures, and regulatory compliance under SEBI (Research Analysts) Regulations, 2014 and SEBI grievance redressal mechanisms.',
    specialization: 'SEBI Regulations & Investor Protection',
    initials: 'SK'
  },
  {
    id: 'team-05',
    name: 'Kunal Trivedi',
    designation: 'Commodities & Macro Strategist',
    qualification: 'NISM Series XVI Certified, B.E. (Mechanical)',
    experienceYears: 9,
    bio: 'Specialist in Multi Commodity Exchange (MCX) derivatives, international inventory dynamics, OPEC supply curves, and dollar index currency correlations.',
    specialization: 'MCX Energy & Bullion Analytics',
    initials: 'KT'
  }
];

export const RISK_ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: 'What is your current age group?',
    options: [
      { text: 'Under 30 years', score: 4 },
      { text: '31 to 45 years', score: 3 },
      { text: '46 to 55 years', score: 2 },
      { text: 'Above 55 years / Retired', score: 1 }
    ]
  },
  {
    id: 2,
    question: 'What is your primary source of household income?',
    options: [
      { text: 'Salaried professional with stable corporate employment', score: 3 },
      { text: 'Business owner / Self-employed professional with variable income', score: 4 },
      { text: 'Retirement pension / Rental yields / Fixed income', score: 1 },
      { text: 'Active stock market trading / Investments only', score: 3 }
    ]
  },
  {
    id: 3,
    question: 'What is your annual household income range (INR)?',
    options: [
      { text: 'Below ₹10 Lakhs', score: 1 },
      { text: '₹10 Lakhs to ₹25 Lakhs', score: 2 },
      { text: '₹25 Lakhs to ₹50 Lakhs', score: 3 },
      { text: 'Above ₹50 Lakhs', score: 4 }
    ]
  },
  {
    id: 4,
    question: 'What proportion of your liquid net worth do you intend to allocate to stock market research & trading?',
    options: [
      { text: 'Less than 10% (Testing waters / Conservative allocation)', score: 1 },
      { text: '10% to 25% (Controlled strategic allocation)', score: 2 },
      { text: '25% to 50% (Substantial growth allocation)', score: 3 },
      { text: 'More than 50% (Aggressive core portfolio)', score: 4 }
    ]
  },
  {
    id: 5,
    question: 'How many years of active experience do you have in the Indian capital markets?',
    options: [
      { text: 'Less than 1 year (Beginner / New entrant)', score: 1 },
      { text: '1 to 3 years (Familiar with cash stocks & basic indices)', score: 2 },
      { text: '3 to 7 years (Experienced with market cycles and volatility)', score: 3 },
      { text: 'More than 7 years (Seasoned market participant across cycles)', score: 4 }
    ]
  },
  {
    id: 6,
    question: 'What is your primary investment / trading objective?',
    options: [
      { text: 'Capital Preservation with steady returns slightly above inflation', score: 1 },
      { text: 'Moderate long-term capital compounding over 3-5 years', score: 2 },
      { text: 'Aggressive growth through multi-week positional swing trading', score: 3 },
      { text: 'Maximum short-term alpha via high-frequency derivative strategies', score: 4 }
    ]
  },
  {
    id: 7,
    question: 'Which market segments do you primarily intend to trade or invest in?',
    options: [
      { text: 'Only Large-Cap and Nifty 50 Cash Equities (Low Volatility)', score: 1 },
      { text: 'Mid-Cap and Small-Cap Growth Stocks (Moderate Volatility)', score: 2 },
      { text: 'Stock & Index Options / Futures (High Leverage & Volatility)', score: 4 },
      { text: 'Balanced mix across Cash Equities and Hedged Derivatives', score: 3 }
    ]
  },
  {
    id: 8,
    question: 'What is your planned investment horizon for this capital?',
    options: [
      { text: 'Intraday to a few days (Pure trading)', score: 4 },
      { text: '2 weeks to 3 months (Swing & Positional)', score: 3 },
      { text: '6 months to 2 years (Medium-term investment)', score: 2 },
      { text: '3 years or longer (Long-term compounding)', score: 1 }
    ]
  },
  {
    id: 9,
    question: 'Do you maintain a separate Emergency Fund covering at least 6 months of living expenses?',
    options: [
      { text: 'Yes, fully funded in liquid bank FDs / liquid mutual funds', score: 4 },
      { text: 'Partially funded (3 to 5 months expenses covered)', score: 2 },
      { text: 'No, most of my funds are committed to business or investments', score: 1 }
    ]
  },
  {
    id: 10,
    question: 'How would you react if your overall portfolio temporarily declined by 15% due to a general market correction?',
    options: [
      { text: 'I would panic, exit all positions immediately, and avoid markets', score: 1 },
      { text: 'I would feel anxious and seek immediate reduction of risk positions', score: 2 },
      { text: 'I understand market cycles and would hold quality positions patiently', score: 3 },
      { text: 'I would view it as an opportunity and allocate additional capital to bargains', score: 4 }
    ]
  },
  {
    id: 11,
    question: 'What is your familiarity with Derivatives (Futures & Options) risk mechanics?',
    options: [
      { text: 'No knowledge; I do not understand leverage, theta decay, or margins', score: 1 },
      { text: 'Basic understanding; I know call and put concepts but have never traded', score: 2 },
      { text: 'Practical knowledge; I have traded F&O and understand stop-loss importance', score: 3 },
      { text: 'Advanced knowledge; I regularly trade spreads, Greeks, and volatility setups', score: 4 }
    ]
  },
  {
    id: 12,
    question: 'What is the maximum drawdown (loss from peak) you can comfortably absorb in a calendar quarter without impacting sleep or lifestyle?',
    options: [
      { text: 'Up to 5% maximum', score: 1 },
      { text: 'Between 5% and 12%', score: 2 },
      { text: 'Between 12% and 20%', score: 3 },
      { text: 'More than 20% (High risk-seeking profile)', score: 4 }
    ]
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-01',
    name: 'Vikramaditya Singhania',
    mobile: '+91 98210 54321',
    email: 'vikram.singhania@gmail.com',
    city: 'Mumbai',
    interestedService: 'Derivatives Pro (F&O)',
    message: 'Interested in understanding the weekly Nifty options strategy and sample research reports.',
    createdAt: '2026-10-04 14:32',
    status: 'NEW'
  },
  {
    id: 'enq-02',
    name: 'Meenakshi Iyer',
    mobile: '+91 97412 88910',
    email: 'm.iyer.tech@outlook.com',
    city: 'Bengaluru',
    interestedService: 'Long-Term Wealth Creation',
    message: 'Looking for fundamentally sound compounders for a 3-5 year investment horizon.',
    createdAt: '2026-10-03 11:15',
    status: 'CONTACTED'
  }
];

export const INITIAL_GRIEVANCES: GrievanceComplaint[] = [
  {
    id: 'grv-01',
    referenceNumber: 'ANR-GRV-2026-1042',
    name: 'Aditya Chhabra',
    mobile: '+91 98110 32145',
    email: 'aditya.chhabra@yahoo.com',
    category: 'Research Delivery',
    service: 'Equity Cash Prime',
    date: '2026-09-29',
    description: 'Encountered SMS notification delay on 28th September due to telecom DND routing issue.',
    status: 'RESOLVED',
    resolutionNotes: 'Alternative high-speed Telegram and Portal push notification configured. Issue resolved with client confirmation.',
    resolvedAt: '2026-10-01'
  }
];
