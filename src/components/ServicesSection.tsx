import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { ServiceCardImage } from './ServiceCardImage';
import {
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Briefcase,
  BookOpen,
  PieChart,
  Zap,
  Flame,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onEnquireService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
  onEnquireService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 6 marquee visual cards directly inspired by the user's reference screenshot:
  const marqueeVisuals = [
    {
      id: 'options-research',
      title: 'STOCK OPTION',
      theme: 'stock-option',
      tag: 'Derivatives Options'
    },
    {
      id: 'futures-research',
      title: 'STOCK FUTURE',
      theme: 'stock-future',
      tag: 'Leveraged Futures'
    },
    {
      id: 'equity-cash-research',
      title: 'STOCK CASH',
      theme: 'stock-cash',
      tag: 'Delivery & Swing'
    },
    {
      id: 'positional-research',
      title: 'TURTLES TREASURE',
      theme: 'turtle-treasure',
      tag: 'Positional Trend'
    },
    {
      id: 'index-research',
      title: 'INDEX',
      theme: 'index',
      tag: 'Nifty & Bank Nifty'
    },
    {
      id: 'commodity-research',
      title: 'MCX',
      theme: 'commodity',
      tag: 'Bullion & Energy'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'equity', label: 'Cash Equity' },
    { id: 'derivatives', label: 'Derivatives & F&O' },
    { id: 'commodity', label: 'Commodities MCX' },
    { id: 'investment', label: 'Wealth Compounding' },
    { id: 'specialized', label: 'Portfolio & Specialized' }
  ];

  const filteredServices = services.filter(s => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.marketSegment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const getRiskColor = (risk: string) => {
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

  const handleMarqueeClick = (serviceId: string) => {
    const found = services.find(s => s.id === serviceId);
    if (found) onSelectService(found);
  };

  return (
    <section id="services" className="bg-slate-950 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
            Research Offerings & Market Segments
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Comprehensive Market Research Categories
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Independent institutional research across equities, derivatives, commodities, and wealth compounding. Explore our core segments through visual research models.
          </p>
        </div>

        {/* 1. MARQUEE 6-IMAGE VISUAL CARDS GRID (Directly inspired by user reference) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Core Market Segments · Visual Showcase</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              Click any card to explore full research details
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {marqueeVisuals.map((card, idx) => (
              <div
                key={idx}
                onClick={() => handleMarqueeClick(card.id)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-emerald-500/10"
              >
                {/* Visual Image with Frosted Center Ribbon */}
                <ServiceCardImage
                  theme={card.theme}
                  title={card.title}
                  className="h-52 sm:h-56 w-full"
                  showOverlayTitle={true}
                />

                {/* Bottom interactive peek bar */}
                <div className="p-3 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[11px]">{card.tag}</span>
                  <span className="text-emerald-400 group-hover:text-emerald-300 font-semibold flex items-center gap-1 text-[11px]">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. DETAILED 12 RESEARCH SERVICES CATALOG */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                All 12 Research Services & Methodologies
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Filter by asset class or search for specific research requirements.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-400 text-slate-950 font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 12 Services Card Grid with Card Cover Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => {
              const themeName = service.imageTheme || 'stock-cash';
              const visualTitle = service.visualTitle || service.name.toUpperCase();

              return (
                <div
                  key={service.id}
                  className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group shadow-lg"
                >
                  {/* Top Image Banner for each service */}
                  <div
                    onClick={() => onSelectService(service)}
                    className="cursor-pointer overflow-hidden border-b border-slate-800"
                  >
                    <ServiceCardImage
                      theme={themeName}
                      title={visualTitle}
                      className="h-40 sm:h-44 w-full"
                      showOverlayTitle={true}
                    />
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Risk Level Badge & Market Segment */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] text-emerald-400 font-mono">
                          {service.marketSegment}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${getRiskColor(
                            service.riskLevel
                          )}`}
                        >
                          Risk: {service.riskLevel}
                        </span>
                      </div>

                      {/* Title & Short Description */}
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-display">
                        {service.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                        {service.shortDesc}
                      </p>

                      {/* Suitable For */}
                      <div className="mt-3.5 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Suitable For: </span>
                        <span>{service.suitableFor}</span>
                      </div>

                      {/* Key Features Bullet List */}
                      <div className="mt-3 space-y-1.5">
                        {service.keyFeatures.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2.5">
                      <button
                        onClick={() => onSelectService(service)}
                        className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors text-center cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onEnquireService(service.name)}
                        className="py-2 px-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No research services found matching your search filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
