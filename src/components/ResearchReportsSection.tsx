import React, { useState } from 'react';
import { ResearchReport } from '../types';
import { FileText, FileDown, Eye, Search, Calendar, User, ArrowUpRight } from 'lucide-react';

interface ResearchReportsSectionProps {
  reports: ResearchReport[];
  onViewReport: (report: ResearchReport) => void;
}

export const ResearchReportsSection: React.FC<ResearchReportsSectionProps> = ({
  reports,
  onViewReport
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Daily Research',
    'Weekly Research',
    'Monthly Research',
    'Equity Reports',
    'F&O Reports',
    'Commodity Reports',
    'Market Outlook'
  ];

  const filteredReports = reports.filter(r => {
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    const matchSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.analyst.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (report: ResearchReport, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `
ARTHANIVESH FINANCIAL RESEARCH
======================================================
REPORT: ${report.title}
CATEGORY: ${report.category}
DATE: ${report.date}
LEAD ANALYST: ${report.analyst}
======================================================
${report.shortDescription}

KEY HIGHLIGHTS:
${report.highlights.join('\n')}
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.pdfDownloadName.replace('.pdf', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="reports" className="bg-slate-900/40 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
            Institutional Research Publication Library
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Independent Research Dossiers & Analysis
          </h2>
          <p className="text-base text-slate-300 mt-3 leading-relaxed">
            Access institutional-grade daily market briefings, weekly derivatives expiry outlooks, sector evaluations, and quarterly fundamental company initiations.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-400 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports or analyst..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group shadow-lg"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                  <span className="text-emerald-400 font-semibold">{report.category}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{report.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-display line-clamp-2">
                  {report.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                  {report.shortDescription}
                </p>

                {/* Highlights Pill List */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                  {report.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold shrink-0">·</span>
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Analyst & Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mb-3">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{report.analyst}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewReport(report)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View PDF</span>
                  </button>

                  <button
                    onClick={e => handleDownload(report, e)}
                    className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-900 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Download Report"
                  >
                    <FileDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No research reports match your active filter.
          </div>
        )}
      </div>
    </section>
  );
};
