export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'equity' | 'derivatives' | 'commodity' | 'investment' | 'specialized';
  shortDesc: string;
  overview: string;
  whoIsItFor: string;
  researchApproach: string;
  marketSegment: string;
  riskLevel: RiskLevel;
  suitableFor: string;
  keyFeatures: string[];
  deliverables: string[];
  sampleFormat: {
    scrip: string;
    action: string;
    entryRange: string;
    target1: string;
    target2: string;
    stopLoss: string;
    holdingPeriod: string;
    rationale: string;
  };
  pricingSnippet: string;
  disclaimer: string;
  imageTheme?: string;
  visualTitle?: string;
}

export type CallStatus = 'ACTIVE' | 'TARGET_1_HIT' | 'TARGET_2_HIT' | 'SL_TRIGGERED' | 'CLOSED';
export type CallAction = 'BUY' | 'SELL' | 'HOLD';

export interface ResearchCall {
  id: string;
  instrument: string;
  segment: 'Equity Cash' | 'Stock Futures' | 'Stock Options' | 'Index Options' | 'Commodity MCX';
  action: CallAction;
  entryPrice: number;
  target1: number;
  target2: number;
  stopLoss: number;
  currentPrice?: number;
  date: string;
  time: string;
  status: CallStatus;
  rationale: string;
  riskReward: string;
}

export interface PerformanceSummary {
  category: 'Equity' | 'Futures' | 'Options' | 'Index' | 'Commodity' | 'Positional';
  reportingPeriod: string;
  totalCalls: number;
  successfulCalls: number;
  unsuccessfulCalls: number;
  accuracyRate: string;
  avgRiskReward: string;
  reportTitle: string;
  pdfFilename: string;
}

export interface PerformanceRecord {
  id: string;
  date: string;
  instrument: string;
  segment: 'Equity' | 'Futures' | 'Options' | 'Index' | 'Commodity' | 'Positional';
  action: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  pnlPercentage: number;
  outcome: 'TARGET_HIT' | 'SL_TRIGGERED' | 'PROFIT_BOOKED';
  holdingDuration: string;
}

export interface MarketUpdateArticle {
  id: string;
  date: string;
  category: 'Market Wrap' | 'Macro Economy' | 'RBI & Policy' | 'Earnings' | 'Sector Watch';
  title: string;
  shortDesc: string;
  content: string;
  readTime: string;
  author: string;
  tags: string[];
}

export interface ResearchReport {
  id: string;
  title: string;
  category: 'Daily Research' | 'Weekly Research' | 'Monthly Research' | 'Equity Reports' | 'F&O Reports' | 'Commodity Reports' | 'Market Outlook';
  date: string;
  fileSize: string;
  shortDescription: string;
  highlights: string[];
  pdfDownloadName: string;
  analyst: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  marketSegment: string;
  researchType: string;
  duration: 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Annually';
  price: number;
  gstRate: number; // 18%
  popular?: boolean;
  features: string[];
  terms: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  specialization: string;
  initials: string;
}

export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  interestedService: string;
  message: string;
  createdAt: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
}

export interface GrievanceComplaint {
  id: string;
  referenceNumber: string;
  name: string;
  mobile: string;
  email: string;
  category: 'Service Delay' | 'Research Delivery' | 'Billing & Subscription' | 'Technical Access' | 'Other';
  service: string;
  date: string;
  description: string;
  status: 'SUBMITTED' | 'UNDER_INVESTIGATION' | 'RESOLVED';
  resolutionNotes?: string;
  resolvedAt?: string;
}

export interface RiskAssessmentAnswer {
  questionId: number;
  selectedScore: number;
}

export interface RiskProfileOutput {
  score: number;
  profile: 'Conservative' | 'Moderate' | 'Balanced' | 'Aggressive' | 'High Growth';
  riskTolerance: string;
  investmentHorizon: string;
  assetAllocation: {
    fixedIncome: number;
    largeCapEquity: number;
    midSmallCap: number;
    derivativesCommodities: number;
    goldCash: number;
  };
  suitableServices: string[];
  disclaimer: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  stats: {
    yearsOfResearch: string;
    marketSegments: string;
    researchTeamCount: string;
    researchUpdatesCount: string;
    clientSupportSla: string;
  };
  contact: {
    addressLine1: string;
    addressLine2: string;
    cityStateZip: string;
    phone: string;
    altPhone: string;
    email: string;
    complianceEmail: string;
    workingHours: string;
    whatsappNumber: string;
  };
  compliance: {
    sebiRegNo: string;
    cin: string;
    complianceOfficerName: string;
    complianceOfficerContact: string;
    grievanceOfficerName: string;
    grievanceOfficerContact: string;
  };
  disclaimerText: string;
}
