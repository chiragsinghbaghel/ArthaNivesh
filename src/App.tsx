/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Storage } from './utils/storage';
import {
  ServiceItem,
  ResearchReport,
  SiteSettings,
  ResearchCall,
  PerformanceSummary,
  PerformanceRecord,
  MarketUpdateArticle,
  PricingPlan,
  TeamMember
} from './types';

// Components
import { MarketTicker } from './components/MarketTicker';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustHighlights } from './components/TrustHighlights';
import { MarketDashboard } from './components/MarketDashboard';
import { StockSearchLookup } from './components/StockSearchLookup';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { LiveResearchCalls } from './components/LiveResearchCalls';
import { PerformanceSection } from './components/PerformanceSection';
import { ResearchReportsSection } from './components/ResearchReportsSection';
import { ReportViewerModal } from './components/ReportViewerModal';
import { MarketUpdatesSection } from './components/MarketUpdatesSection';
import { PricingSection } from './components/PricingSection';
import { RiskAssessment } from './components/RiskAssessment';
import { AboutSection } from './components/AboutSection';
import { ComplianceSection } from './components/ComplianceSection';
import { ContactSection } from './components/ContactSection';
import { GrievanceSection } from './components/GrievanceSection';
import { EnquiryModal } from './components/EnquiryModal';
import { LegalModal } from './components/LegalModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

// Icons for CTA and banner
import { PhoneCall, ShieldCheck, ArrowRight, Compass, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');

  // Dynamic Data States from Storage
  const [settings, setSettings] = useState<SiteSettings>(Storage.getSettings());
  const [services, setServices] = useState<ServiceItem[]>(Storage.getServices());
  const [calls, setCalls] = useState<ResearchCall[]>(Storage.getResearchCalls());
  const [summaries, setSummaries] = useState<PerformanceSummary[]>(Storage.getPerformanceSummaries());
  const [records, setRecords] = useState<PerformanceRecord[]>(Storage.getPerformanceRecords());
  const [reports, setReports] = useState<ResearchReport[]>(Storage.getReports());
  const [updates, setUpdates] = useState<MarketUpdateArticle[]>(Storage.getMarketUpdates());
  const [pricing, setPricing] = useState<PricingPlan[]>(Storage.getPricingPlans());
  const [team, setTeam] = useState<TeamMember[]>(Storage.getTeamMembers());

  // Modals
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedReportDoc, setSelectedReportDoc] = useState<ResearchReport | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [enquiryServiceName, setEnquiryServiceName] = useState<string>('Equity Cash Prime');
  const [isGrievanceOpen, setIsGrievanceOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<'disclaimer' | 'privacy' | 'terms' | 'refund' | null>(null);

  // Theme State: 'dark' | 'light'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arthanivesh_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('arthanivesh_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const refreshAllData = () => {
    setSettings(Storage.getSettings());
    setServices(Storage.getServices());
    setCalls(Storage.getResearchCalls());
    setSummaries(Storage.getPerformanceSummaries());
    setRecords(Storage.getPerformanceRecords());
    setReports(Storage.getReports());
    setUpdates(Storage.getMarketUpdates());
    setPricing(Storage.getPricingPlans());
    setTeam(Storage.getTeamMembers());
  };

  const handleOpenEnquiry = (serviceName?: string) => {
    if (serviceName) setEnquiryServiceName(serviceName);
    setIsEnquiryOpen(true);
  };

  const handleOpenSampleReport = (title: string, category: string) => {
    const found = reports.find(r => r.category.toLowerCase().includes(category.toLowerCase())) || reports[0];
    setSelectedReportDoc(found);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      } flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950`}
    >
      {/* 1. Real-time Market Ticker Bar */}
      <MarketTicker />

      {/* 2. Top Navigation Bar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenRiskAssessment={() => {
          setActiveTab('risk-assessment');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* 3. Main Content Router / Views */}
      <main className="flex-1">
        {selectedServiceDetail ? (
          <ServiceDetailPage
            service={selectedServiceDetail}
            allServices={services}
            onBack={() => {
              setSelectedServiceDetail(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectOtherService={s => {
              setSelectedServiceDetail(s);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEnquire={name => handleOpenEnquiry(name)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreServices={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onTalkToExpert={() => handleOpenEnquiry()}
              onOpenRiskAssessment={() => {
                setActiveTab('risk-assessment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Trust Highlights Counters */}
            <TrustHighlights
              settings={settings}
              onOpenAbout={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Interactive Live Market Dashboard */}
            <MarketDashboard />

            {/* Real-Time Stock Search & Research Price Lookup */}
            <StockSearchLookup
              onEnquireStock={(symbol, name) =>
                handleOpenEnquiry(`${symbol} (${name}) Research Report`)
              }
            />

            {/* Services Section (All 12 cards with filtering) */}
            <ServicesSection
              services={services}
              onSelectService={srv => setSelectedServiceDetail(srv)}
              onEnquireService={srvName => handleOpenEnquiry(srvName)}
            />

            {/* Live Research Calls Dissemination */}
            <LiveResearchCalls calls={calls} onEnquire={() => handleOpenEnquiry()} />

            {/* Historical Performance Track Record */}
            <PerformanceSection
              summaries={summaries}
              records={records}
              onOpenReportModal={handleOpenSampleReport}
            />

            {/* Institutional Research Reports Library */}
            <ResearchReportsSection
              reports={reports}
              onViewReport={rep => setSelectedReportDoc(rep)}
            />

            {/* High-Impact Consultation Banner */}
            <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 py-16 border-y border-emerald-500/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SEBI Regulatory Investor Suitability</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display max-w-2xl mx-auto">
                  Have Questions About Our Research Methodologies?
                </h2>

                <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Connect directly with our research coordinators to understand how our fundamental models, risk-reward ratios, and stop-loss trailing rules operate.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenEnquiry()}
                    className="px-6 py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Talk to a Research Expert</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('risk-assessment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-emerald-400" />
                    <span>Take Free Risk Assessment</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Market Updates & News */}
            <MarketUpdatesSection articles={updates} />

            {/* Pricing Section */}
            <PricingSection
              plans={pricing}
              onSelectPlan={planName => handleOpenEnquiry(planName)}
            />

            {/* Contact & Consultation Form */}
            <ContactSection settings={settings} />
          </>
        )}

        {/* Dedicated "Stock Search & Research" View */}
        {activeTab === 'stock-search' && (
          <div className="animate-in fade-in">
            <StockSearchLookup
              onEnquireStock={(symbol, name) =>
                handleOpenEnquiry(`${symbol} (${name}) Research Report`)
              }
            />
          </div>
        )}

        {/* Dedicated "About Us" View */}
        {activeTab === 'about' && (
          <div className="animate-in fade-in">
            <AboutSection
              team={team}
              settings={settings}
              onExploreServices={() => setActiveTab('services')}
              onTalkToExpert={() => handleOpenEnquiry()}
            />
          </div>
        )}

        {/* Dedicated "Services" View */}
        {activeTab === 'services' && (
          <div className="animate-in fade-in">
            <ServicesSection
              services={services}
              onSelectService={srv => setSelectedServiceDetail(srv)}
              onEnquireService={srvName => handleOpenEnquiry(srvName)}
            />
          </div>
        )}

        {/* Dedicated "Performance" View */}
        {activeTab === 'performance' && (
          <div className="animate-in fade-in">
            <PerformanceSection
              summaries={summaries}
              records={records}
              onOpenReportModal={handleOpenSampleReport}
            />
          </div>
        )}

        {/* Dedicated "Research Reports" View */}
        {activeTab === 'reports' && (
          <div className="animate-in fade-in">
            <ResearchReportsSection
              reports={reports}
              onViewReport={rep => setSelectedReportDoc(rep)}
            />
          </div>
        )}

        {/* Dedicated "Live Calls" View */}
        {activeTab === 'calls' && (
          <div className="animate-in fade-in">
            <LiveResearchCalls calls={calls} onEnquire={() => handleOpenEnquiry()} />
          </div>
        )}

        {/* Dedicated "Pricing" View */}
        {activeTab === 'pricing' && (
          <div className="animate-in fade-in">
            <PricingSection
              plans={pricing}
              onSelectPlan={planName => handleOpenEnquiry(planName)}
            />
          </div>
        )}

        {/* Dedicated "Risk Assessment" View */}
        {activeTab === 'risk-assessment' && (
          <div className="animate-in fade-in">
            <RiskAssessment
              onExploreServices={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTalkToExpert={() => handleOpenEnquiry('Risk Suitability Consultation')}
            />
          </div>
        )}

        {/* Dedicated "Compliance" View */}
        {activeTab === 'compliance' && (
          <div className="animate-in fade-in">
            <ComplianceSection
              settings={settings}
              onOpenGrievanceForm={() => setIsGrievanceOpen(true)}
            />
          </div>
        )}

        {/* Dedicated "Contact" View */}
        {activeTab === 'contact' && (
          <div className="animate-in fade-in">
            <ContactSection settings={settings} />
          </div>
        )}
          </>
        )}
      </main>

      {/* 4. Institutional Multi-Column Footer */}
      <Footer
        settings={settings}
        onNavigate={tab => {
          setSelectedServiceDetail(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLegal={type => setLegalModalType(type)}
        onOpenGrievance={() => setIsGrievanceOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 5. Modals and Overlays */}

      {/* PDF Research Dossier Viewer Modal */}
      <ReportViewerModal
        report={selectedReportDoc}
        onClose={() => setSelectedReportDoc(null)}
      />

      {/* Talk to Expert / Lead Inquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedService={enquiryServiceName}
      />

      {/* Grievance & Complaint Redressal Modal */}
      {isGrievanceOpen && (
        <GrievanceSection onClose={() => setIsGrievanceOpen(false)} />
      )}

      {/* Legal & Compliance Disclaimers Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Secured Admin Dashboard Console */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={settings}
        onSaveSettings={newSettings => setSettings(newSettings)}
        onRefreshData={refreshAllData}
      />
    </div>
  );
}
