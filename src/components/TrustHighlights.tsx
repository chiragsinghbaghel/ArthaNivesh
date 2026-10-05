import React from 'react';
import { SiteSettings } from '../types';
import { Award, Layers, Users, FileText, Headphones } from 'lucide-react';

interface TrustHighlightsProps {
  settings: SiteSettings;
  onOpenAbout: () => void;
}

export const TrustHighlights: React.FC<TrustHighlightsProps> = ({ settings, onOpenAbout }) => {
  const stats = [
    {
      icon: Award,
      value: settings.stats.yearsOfResearch,
      label: 'Years of Market Research',
      detail: 'Disciplined research spanning multiple domestic market cycles.'
    },
    {
      icon: Layers,
      value: settings.stats.marketSegments,
      label: 'Market Segments Covered',
      detail: 'Equities, Stock Futures, Options, Indices, and MCX Commodities.'
    },
    {
      icon: Users,
      value: settings.stats.researchTeamCount,
      label: 'Qualified Analysts Desk',
      detail: 'NISM & CFA certified equity researchers and chartists.'
    },
    {
      icon: FileText,
      value: settings.stats.researchUpdatesCount,
      label: 'Published Research Notes',
      detail: 'Audited research reports, intraday updates, and macro notes.'
    },
    {
      icon: Headphones,
      value: settings.stats.clientSupportSla,
      label: 'Query Resolution SLA',
      detail: 'Dedicated market-hour helpdesk for subscription queries.'
    }
  ];

  return (
    <section className="bg-slate-950 py-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 group-hover:border-emerald-500/50 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1 font-sans">
                  {stat.label}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
