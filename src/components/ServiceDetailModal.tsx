import React from 'react';
import { ServiceItem } from '../types';
import { ServiceCardImage } from './ServiceCardImage';
import { X, CheckCircle2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onEnquire: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onEnquire
}) => {
  if (!service) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Visual Image Banner */}
        <div className="relative border-b border-slate-800">
          <ServiceCardImage
            theme={theme}
            title={visualTitle}
            className="h-44 sm:h-48 w-full"
            showOverlayTitle={true}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer border border-slate-700/80 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-medium text-emerald-400 uppercase">
                {service.marketSegment}
              </span>
              <span className="text-slate-600">·</span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded border ${getRiskBadgeColor(
                  service.riskLevel
                )}`}
              >
                Risk: {service.riskLevel}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-display">
              {service.name}
            </h2>
            <p className="text-sm text-slate-300 mt-1">{service.shortDesc}</p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-slate-300 text-sm">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2">
              Service Overview
            </h3>
            <p className="text-slate-200 leading-relaxed">{service.overview}</p>
          </div>

          {/* Grid: Who it is for & Research Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-semibold text-emerald-400 font-mono mb-1.5">
                Target Investor Profile
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{service.whoIsItFor}</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <h4 className="text-xs font-semibold text-emerald-400 font-mono mb-1.5">
                Analytical Methodology
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{service.researchApproach}</p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-3">
              Core Methodological Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What the Client Receives */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-3">
              What The Client Receives
            </h3>
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              {service.deliverables.map((del, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Research Format */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Standard Research Advisory Alert Template</span>
            </h3>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-2 mb-2 text-slate-400">
                <span>SAMPLE NOTIFICATION FORMAT</span>
                <span className="text-emerald-400 font-semibold">{service.sampleFormat.action}</span>
              </div>
              <div>
                <span className="text-slate-500">SCRIP / CONTRACT: </span>
                <strong className="text-white">{service.sampleFormat.scrip}</strong>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-slate-500">ENTRY RANGE</div>
                  <div className="text-slate-100 font-semibold">{service.sampleFormat.entryRange}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-slate-500">TARGET 1</div>
                  <div className="text-emerald-400 font-semibold">{service.sampleFormat.target1}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-slate-500">TARGET 2</div>
                  <div className="text-emerald-400 font-semibold">{service.sampleFormat.target2}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-slate-500">STOP LOSS</div>
                  <div className="text-rose-400 font-semibold">{service.sampleFormat.stopLoss}</div>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                <span className="text-slate-500">RATIONALE: </span>
                <span>{service.sampleFormat.rationale}</span>
              </div>
            </div>
          </div>

          {/* Risk Disclaimer Box */}
          <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-200">Statutory Risk Disclosure: </strong>
              {service.disclaimer}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-slate-400 font-mono">Indicative Subscription</div>
            <div className="text-lg font-bold text-white font-mono">{service.pricingSnippet}</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquire(service.name);
              }}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Enquire For This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
