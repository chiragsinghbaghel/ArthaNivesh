import React, { useState } from 'react';
import { PerformanceSummary, PerformanceRecord } from '../types';
import { FileDown, Search, CheckCircle2, XCircle, ShieldAlert, Award, Calendar, BarChart3 } from 'lucide-react';

interface PerformanceSectionProps {
  summaries: PerformanceSummary[];
  records: PerformanceRecord[];
  onOpenReportModal: (title: string, category: string) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  summaries,
  records,
  onOpenReportModal
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Equity');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [periodFilter, setPeriodFilter] = useState<string>('All');

  const categories = ['Equity', 'Futures', 'Options', 'Index', 'Commodity', 'Positional'];

  const filteredRecords = records.filter(r => {
    const matchCat = r.segment === activeCategory;
    const matchSearch =
      r.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.outcome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeSummary = summaries.find(s => s.category === activeCategory) || summaries[0];

  const handleDownloadSamplePDF = (title: string, filename: string) => {
    // Generate sample verified text/pdf summary document
    const content = `
=====================================================
ARTHANIVESH FINANCIAL RESEARCH - VERIFIED AUDIT
${title}
SEBI Reg. Indicative: INH000014829
Reporting Period: ${activeSummary.reportingPeriod}
=====================================================
Category: ${activeSummary.category}
Total Documented Calls: ${activeSummary.totalCalls}
Successful Calls (Target 1 / 2 Met): ${activeSummary.successfulCalls}
Unsuccessful Calls (Stop Loss Hit): ${activeSummary.unsuccessfulCalls}
Historical Strike Rate: ${activeSummary.accuracyRate}
Average Risk-Reward Ratio: ${activeSummary.avgRiskReward}

DISCLAIMER:
Past performance is not an indicator of future results.
Investments in securities market are subject to market risks.
=====================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace('.pdf', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="performance" className="bg-slate-950 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
            Historical Research Performance & Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Transparent, Audit-Ready Track Record
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            All research calls are published with strict time records, entry bands, stop-loss, and exit targets. We maintain honest, verifiable reporting across all covered market segments.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat} Research
            </button>
          ))}
        </div>

        {/* Highlight Stats Card for Selected Category */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Audited Period: {activeSummary.reportingPeriod}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {activeSummary.reportTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Compiled under SEBI Research Analyst verification standards.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenReportModal(activeSummary.reportTitle, activeSummary.category)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                View Sample Report Format
              </button>
              <button
                onClick={() => handleDownloadSamplePDF(activeSummary.reportTitle, activeSummary.pdfFilename)}
                className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Verified Report</span>
              </button>
            </div>
          </div>

          {/* Metric Counter Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 text-center font-mono">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400">Total Published Calls</div>
              <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                {activeSummary.totalCalls}
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div className="text-xs text-emerald-400">Targets Achieved</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                {activeSummary.successfulCalls}
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div className="text-xs text-rose-400">Stop Loss Hit</div>
              <div className="text-2xl font-bold text-rose-400 mt-1 tabular-nums">
                {activeSummary.unsuccessfulCalls}
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400">Historical Strike Rate</div>
              <div className="text-2xl font-bold text-cyan-400 mt-1 tabular-nums">
                {activeSummary.accuracyRate}
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 col-span-2 md:col-span-1">
              <div className="text-xs text-slate-400">Avg Risk-Reward</div>
              <div className="text-2xl font-bold text-amber-400 mt-1 tabular-nums">
                {activeSummary.avgRiskReward}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Individual Calls Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-sm font-display">
                Documented Execution Log for {activeCategory}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search instrument..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Instrument</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4 text-right">Entry</th>
                  <th className="py-3 px-4 text-right">Exit</th>
                  <th className="py-3 px-4 text-right">Return %</th>
                  <th className="py-3 px-4 text-center">Outcome</th>
                  <th className="py-3 px-4 text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredRecords.map(rec => {
                  const isHit = rec.outcome === 'TARGET_HIT';
                  return (
                    <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{rec.date}</td>
                      <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                        {rec.instrument}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            rec.action === 'BUY'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {rec.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums">
                        ₹{rec.entryPrice.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums text-white">
                        ₹{rec.exitPrice.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                      </td>
                      <td
                        className={`py-3 px-4 text-right font-bold tabular-nums ${
                          rec.pnlPercentage >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {rec.pnlPercentage >= 0 ? '+' : ''}
                        {rec.pnlPercentage.toFixed(2)}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            isHit
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {isHit ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3 h-3 text-rose-400" />
                          )}
                          {isHit ? 'Target Hit' : 'SL Triggered'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400 whitespace-nowrap">
                        {rec.holdingDuration}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              No specific log items match the active query. Select another segment or clear search.
            </div>
          )}
        </div>

        {/* Regulatory Risk Disclaimer Bar */}
        <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">Statutory Performance Disclosure: </strong>
            Past performance is purely historical and does not guarantee, predict, or imply future performance or returns. Research performance figures are calculated on theoretical trigger executions without accounting for brokerage, slippage, and individual tax liabilities.
          </div>
        </div>
      </div>
    </section>
  );
};
