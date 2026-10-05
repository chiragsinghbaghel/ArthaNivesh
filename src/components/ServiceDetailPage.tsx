import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { ServiceCardImage } from './ServiceCardImage';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  FileText,
  PhoneCall,
  Clock,
  ArrowRight,
  ShieldCheck,
  Share2,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
  allServices: ServiceItem[];
  onBack: () => void;
  onSelectOtherService: (service: ServiceItem) => void;
  onEnquire: (serviceName: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  allServices,
  onBack,
  onSelectOtherService,
  onEnquire
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'methodology' | 'sample' | 'pricing'>('overview');

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Moderate':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'High':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Very High':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const theme = service.imageTheme || 'stock-cash';
  const visualTitle = service.visualTitle || service.name.toUpperCase();

  const otherServices = allServices.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 animate-in fade-in">
      {/* 1. Breadcrumb & Back Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800 sticky top-18 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Back to All Services</span>
          </button>

          <div className="text-xs font-mono text-slate-400 hidden sm:flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">{service.name}</span>
          </div>

          <button
            onClick={() => onEnquire(service.name)}
            className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* 2. Full-Bleed High-Impact Visual Banner */}
      <div className="relative w-full border-b border-slate-800 bg-slate-950">
        <ServiceCardImage
          theme={theme}
          title={visualTitle}
          className="h-64 sm:h-80 lg:h-96 w-full"
          showOverlayTitle={true}
        />
      </div>

      {/* 3. Service Hero Header Title Block */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-emerald-400 uppercase font-semibold">
                  {service.marketSegment}
                </span>
                <span className="text-slate-600">·</span>
                <span
                  className={`px-2.5 py-0.5 rounded-md border font-semibold ${getRiskBadgeColor(
                    service.riskLevel
                  )}`}
                >
                  Risk: {service.riskLevel}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">SEBI Research Standard</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
                {service.name}
              </h1>

              <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                {service.shortDesc}
              </p>
            </div>

            {/* Quick Price & Action Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:min-w-[280px] shadow-xl text-center space-y-4">
              <div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  Subscription Rate
                </div>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">
                  {service.pricingSnippet}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">+ 18% GST Applicable</div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onEnquire(service.name)}
                  className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Subscribe / Enquire Now</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Zero Brokerage Conflict</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Content Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-950 sticky top-30 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono py-2">
            {[
              { id: 'overview', label: '01. Overview & Strategy' },
              { id: 'methodology', label: '02. Research Methodology' },
              { id: 'sample', label: '03. Sample Research Alert' },
              { id: 'pricing', label: '04. Deliverables & Pricing' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white bg-slate-900/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white font-display mb-3">
                    Detailed Service Overview
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {service.overview}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                      Who Is This Service For?
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.whoIsItFor}
                    </p>
                  </div>

                  <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                      Ideal Investment Horizon & Suitability
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.suitableFor}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-4">
                    Core Methodological Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: METHODOLOGY */}
            {activeTab === 'methodology' && (
              <div className="space-y-8 animate-in fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white font-display mb-3">
                    Analytical Research Framework
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.researchApproach}
                  </p>
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
                  <h4 className="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider">
                    Our 4-Step Trade Setup Protocol
                  </h4>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center shrink-0 font-mono">
                        1
                      </span>
                      <div>
                        <strong className="text-white">Quantitative & Liquidity Filter: </strong>
                        We restrict coverage strictly to highly liquid large/midcap counters with adequate daily turnover and minimal impact cost.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center shrink-0 font-mono">
                        2
                      </span>
                      <div>
                        <strong className="text-white">Price Action & Volume Confirmation: </strong>
                        Multi-timeframe chart alignment using 20/50 EMAs, VWAP bands, and Wyckoff breakout patterns.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center shrink-0 font-mono">
                        3
                      </span>
                      <div>
                        <strong className="text-white">Risk-to-Reward Modeling: </strong>
                        No research call is published unless it satisfies a calculated minimum 1:1.5 or 1:2 Risk-to-Reward ratio with tight stop loss.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center shrink-0 font-mono">
                        4
                      </span>
                      <div>
                        <strong className="text-white">Live Trailing SL Management: </strong>
                        Real-time alerts to trail stop-loss into profit territory as Target 1 is approached.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SAMPLE FORMAT */}
            {activeTab === 'sample' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white font-display mb-2">
                    Official Research Alert Format
                  </h3>
                  <p className="text-xs text-slate-400">
                    Subscribers receive alerts formatted as below via SMS, Telegram, and In-App notification.
                  </p>
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-slate-400">DISSEMINATION TEMPLATE</span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      {service.sampleFormat.action}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500">INSTRUMENT / CONTRACT: </span>
                    <strong className="text-white text-sm">{service.sampleFormat.scrip}</strong>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400">ENTRY RANGE</div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {service.sampleFormat.entryRange}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-emerald-400">TARGET 1</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">
                        {service.sampleFormat.target1}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-emerald-400">TARGET 2</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">
                        {service.sampleFormat.target2}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-rose-400">STOP LOSS</div>
                      <div className="text-xs font-bold text-rose-400 mt-0.5">
                        {service.sampleFormat.stopLoss}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-slate-300">
                    <span className="text-slate-500">HOLDING TIMEFRAME: </span>
                    <span className="text-white">{service.sampleFormat.holdingPeriod}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-slate-300 leading-relaxed font-sans text-xs">
                    <strong className="text-white font-mono block mb-1">ANALYTICAL RATIONALE:</strong>
                    {service.sampleFormat.rationale}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRICING */}
            {activeTab === 'pricing' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white font-display mb-2">
                    What The Client Receives
                  </h3>
                  <p className="text-xs text-slate-400">
                    Comprehensive deliverables included in your active research subscription.
                  </p>
                </div>

                <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  {service.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Indicative Subscription Fee</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      {service.pricingSnippet}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fees must be remitted strictly via official banking channels. All subscriptions are backed by an official GST tax invoice. No cash or personal UPI accounts accepted.
                  </p>
                </div>
              </div>
            )}

            {/* Statutory Risk Disclaimer Block */}
            <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl text-xs text-amber-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-200 font-semibold">Statutory Risk Disclosure: </strong>
                {service.disclaimer}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Direct Consultation Box & Related Services */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Enquiry Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h4 className="text-base font-bold text-white font-display">
                Request a Callback
              </h4>
              <p className="text-xs text-slate-400">
                Connect with our advisory desk to review suitability for <strong>{service.name}</strong>.
              </p>

              <button
                onClick={() => onEnquire(service.name)}
                className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Talk to Research Specialist</span>
              </button>
            </div>

            {/* Related Services */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Explore Other Market Segments
              </h4>
              <div className="space-y-3">
                {otherServices.map(other => (
                  <div
                    key={other.id}
                    onClick={() => onSelectOtherService(other)}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl cursor-pointer transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {other.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {other.marketSegment}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
