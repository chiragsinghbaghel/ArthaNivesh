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
  Enquiry,
  GrievanceComplaint
} from '../types';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_SERVICES,
  INITIAL_RESEARCH_CALLS,
  INITIAL_PERFORMANCE_SUMMARIES,
  INITIAL_PERFORMANCE_RECORDS,
  INITIAL_RESEARCH_REPORTS,
  INITIAL_MARKET_UPDATES,
  INITIAL_PRICING_PLANS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_ENQUIRIES,
  INITIAL_GRIEVANCES
} from '../data/initialData';

const KEYS = {
  SETTINGS: 'arthanivesh_settings_v1',
  SERVICES: 'arthanivesh_services_v1',
  CALLS: 'arthanivesh_calls_v1',
  PERF_SUMMARIES: 'arthanivesh_perf_summaries_v1',
  PERF_RECORDS: 'arthanivesh_perf_records_v1',
  REPORTS: 'arthanivesh_reports_v1',
  UPDATES: 'arthanivesh_updates_v1',
  PRICING: 'arthanivesh_pricing_v1',
  TEAM: 'arthanivesh_team_v1',
  ENQUIRIES: 'arthanivesh_enquiries_v1',
  GRIEVANCES: 'arthanivesh_grievances_v1'
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing localStorage key "${key}":`, e);
  }
}

export const Storage = {
  getSettings: (): SiteSettings => safeGet(KEYS.SETTINGS, INITIAL_SITE_SETTINGS),
  saveSettings: (settings: SiteSettings) => safeSet(KEYS.SETTINGS, settings),

  getServices: (): ServiceItem[] => safeGet(KEYS.SERVICES, INITIAL_SERVICES),
  saveServices: (services: ServiceItem[]) => safeSet(KEYS.SERVICES, services),

  getResearchCalls: (): ResearchCall[] => safeGet(KEYS.CALLS, INITIAL_RESEARCH_CALLS),
  saveResearchCalls: (calls: ResearchCall[]) => safeSet(KEYS.CALLS, calls),

  getPerformanceSummaries: (): PerformanceSummary[] => safeGet(KEYS.PERF_SUMMARIES, INITIAL_PERFORMANCE_SUMMARIES),
  savePerformanceSummaries: (summaries: PerformanceSummary[]) => safeSet(KEYS.PERF_SUMMARIES, summaries),

  getPerformanceRecords: (): PerformanceRecord[] => safeGet(KEYS.PERF_RECORDS, INITIAL_PERFORMANCE_RECORDS),
  savePerformanceRecords: (records: PerformanceRecord[]) => safeSet(KEYS.PERF_RECORDS, records),

  getReports: (): ResearchReport[] => safeGet(KEYS.REPORTS, INITIAL_RESEARCH_REPORTS),
  saveReports: (reports: ResearchReport[]) => safeSet(KEYS.REPORTS, reports),

  getMarketUpdates: (): MarketUpdateArticle[] => safeGet(KEYS.UPDATES, INITIAL_MARKET_UPDATES),
  saveMarketUpdates: (updates: MarketUpdateArticle[]) => safeSet(KEYS.UPDATES, updates),

  getPricingPlans: (): PricingPlan[] => safeGet(KEYS.PRICING, INITIAL_PRICING_PLANS),
  savePricingPlans: (plans: PricingPlan[]) => safeSet(KEYS.PRICING, plans),

  getTeamMembers: (): TeamMember[] => safeGet(KEYS.TEAM, INITIAL_TEAM_MEMBERS),
  saveTeamMembers: (team: TeamMember[]) => safeSet(KEYS.TEAM, team),

  getEnquiries: (): Enquiry[] => safeGet(KEYS.ENQUIRIES, INITIAL_ENQUIRIES),
  saveEnquiries: (enquiries: Enquiry[]) => safeSet(KEYS.ENQUIRIES, enquiries),

  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry => {
    const list = Storage.getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'NEW'
    };
    Storage.saveEnquiries([newEnquiry, ...list]);
    return newEnquiry;
  },

  getGrievances: (): GrievanceComplaint[] => safeGet(KEYS.GRIEVANCES, INITIAL_GRIEVANCES),
  saveGrievances: (grievances: GrievanceComplaint[]) => safeSet(KEYS.GRIEVANCES, grievances),

  addGrievance: (complaint: Omit<GrievanceComplaint, 'id' | 'referenceNumber' | 'status'>): GrievanceComplaint => {
    const list = Storage.getGrievances();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newGrievance: GrievanceComplaint = {
      ...complaint,
      id: 'grv-' + Date.now(),
      referenceNumber: `ANR-GRV-2026-${randomSuffix}`,
      status: 'SUBMITTED'
    };
    Storage.saveGrievances([newGrievance, ...list]);
    return newGrievance;
  },

  resetToDefaults: () => {
    Object.values(KEYS).forEach(k => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        // ignore
      }
    });
  }
};
