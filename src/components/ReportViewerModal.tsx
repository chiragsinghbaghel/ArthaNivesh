import React from 'react';
import { ResearchReport } from '../types';
import { X, FileDown, Printer, ShieldCheck, CheckCircle2, Share2 } from 'lucide-react';

interface ReportViewerModalProps {
  report: ResearchReport | null;
  onClose: () => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({ report, onClose }) => {
  if (!report) return null;

  const handleDownload = () => {
    const text = `
ARTHANIVESH FINANCIAL RESEARCH
======================================================
REPORT: ${report.title}
CATEGORY: ${report.category}
DATE: ${report.date}
LEAD ANALYST: ${report.analyst}
SEBI REGISTRATION: INH000014829
======================================================
EXECUTIVE SUMMARY:
${report.shortDescription}

KEY RESEARCH HIGHLIGHTS:
${report.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

ANALYST CERTIFICATION & DISCLOSURES:
The research analyst certifies that all views expressed in this report accurately reflect personal views about the subject securities. The analyst does not hold any financial interest or beneficial ownership exceeding 1% in the recommended scrips.
======================================================
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* PDF Viewer Top Action Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="text-xs font-mono font-bold text-slate-200">
              PDF Document Viewer: {report.pdfDownloadName}
            </span>
            <span className="text-xs text-slate-500 font-mono">({report.fileSize})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close document"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Realistic Institutional Research PDF Canvas Container */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-950/40 text-slate-200 space-y-8 font-sans">
          {/* Institutional Document Header */}
          <div className="border-b-2 border-emerald-500/40 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase mb-1">
                Institutional Equity & Derivatives Research Note
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {report.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mt-2">
                <span>Category: {report.category}</span>
                <span>·</span>
                <span>Release Date: {report.date}</span>
                <span>·</span>
                <span className="text-emerald-400">SEBI Reg: INH000014829</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-right sm:min-w-[200px]">
              <div className="text-[10px] text-slate-500 font-mono uppercase">Primary Author</div>
              <div className="text-xs font-bold text-white mt-0.5">{report.analyst}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">ArthaNivesh Research Desk</div>
            </div>
          </div>

          {/* Executive Briefing */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Executive Strategic Briefing
            </h2>
            <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800 text-sm leading-relaxed text-slate-300">
              {report.shortDescription}
            </div>
          </div>

          {/* Core Findings & Data Matrix */}
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Core Research Insights & Tactical Pillars
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Valuation Framework Box */}
          <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wide">
              Analytical Methodology & Valuation Parameters
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Our valuation models utilize historical price-to-earnings (P/E) bands, enterprise value to EBITDA (EV/EBITDA), and a 5-year discounted cash flow framework under a 12.5% Weighted Average Cost of Capital (WACC) assumption. Derivatives indicators utilize open interest concentration strikes and volume-weighted VWAP bands.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-[10px]">
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-slate-500">COVERAGE HORIZON</div>
                <div className="font-bold text-white mt-0.5">3 - 12 Months</div>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-slate-500">MODEL WACC</div>
                <div className="font-bold text-white mt-0.5">12.2%</div>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-slate-500">BENCHMARK</div>
                <div className="font-bold text-emerald-400 mt-0.5">Nifty 50 TRI</div>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-slate-500">RECOMMENDATION STANCE</div>
                <div className="font-bold text-emerald-400 mt-0.5">OVERWEIGHT</div>
              </div>
            </div>
          </div>

          {/* Statutory Compliance Certification */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Analyst Certification & Conflict of Interest Disclosure</span>
            </div>
            <p className="leading-relaxed">
              The research analyst(s) primarily responsible for the preparation of this report hereby certifies that the views expressed reflect accurate, unbiased personal opinions regarding the securities and issuers covered. The research analyst, his associates, or research entity do not hold financial interests, actual/beneficial ownership of more than 1% in the subject company, and have not received compensation from the subject company in the past 12 months.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>ArthaNivesh Research Publication Archive · Reference #{report.id.toUpperCase()}</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
