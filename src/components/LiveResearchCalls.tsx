import React, { useState } from 'react';
import { ResearchCall, CallStatus } from '../types';
import { ShieldAlert, ArrowUpRight, ArrowDownRight, Clock, Target, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface LiveResearchCallsProps {
  calls: ResearchCall[];
  onEnquire: () => void;
}

export const LiveResearchCalls: React.FC<LiveResearchCallsProps> = ({ calls, onEnquire }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const segments = ['All', 'Equity Cash', 'Stock Futures', 'Stock Options', 'Index Options', 'Commodity MCX'];
  const statuses = ['All', 'ACTIVE', 'TARGET_1_HIT', 'TARGET_2_HIT', 'SL_TRIGGERED'];

  const filteredCalls = calls.filter(c => {
    const matchSeg = selectedSegment === 'All' || c.segment === selectedSegment;
    const matchStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchSeg && matchStatus;
  });

  const getStatusBadge = (status: CallStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </span>
        );
      case 'TARGET_1_HIT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <CheckCircle2 className="w-3 h-3 text-teal-400" />
            Target 1 Achieved
          </span>
        );
      case 'TARGET_2_HIT':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Target 2 Achieved
          </span>
        );
      case 'SL_TRIGGERED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3 text-rose-400" />
            SL Triggered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
            Closed
          </span>
        );
    }
  };

  return (
    <section id="calls" className="bg-slate-900/60 py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-1">
              Live Research Updates & Calls Dashboard
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Real-Time Research Dissemination
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Strictly timestamped research ideas with defined entry trigger, targets, and defensive stop-loss. Published by certified analysts during market hours.
            </p>
          </div>

          <button
            onClick={onEnquire}
            className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm self-start md:self-auto cursor-pointer"
          >
            Subscribe to Live Alerts
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
          {/* Segment Selector */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1">Segment:</span>
            {segments.map(seg => (
              <button
                key={seg}
                onClick={() => setSelectedSegment(seg)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedSegment === seg
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1">Status:</span>
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st === 'All' ? 'All Status' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Calls Cards / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCalls.map(call => {
            const isBuy = call.action === 'BUY';
            return (
              <div
                key={call.id}
                className="bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-colors"
              >
                <div>
                  {/* Top Bar: Action Pill, Instrument & Timestamp */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          isBuy
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {call.action}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{call.segment}</span>
                    </div>
                    {getStatusBadge(call.status)}
                  </div>

                  <div className="text-base font-bold text-white font-mono tracking-tight">
                    {call.instrument}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{call.date} at {call.time}</span>
                    <span>·</span>
                    <span>R:R {call.riskReward}</span>
                  </div>

                  {/* Level Details Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center font-mono">
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
                      <div className="text-[10px] text-slate-400">ENTRY TRIGGER</div>
                      <div className="text-xs font-bold text-white tabular-nums">
                        ₹{call.entryPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
                      <div className="text-[10px] text-emerald-400">TARGET 1 / 2</div>
                      <div className="text-xs font-bold text-emerald-400 tabular-nums">
                        ₹{call.target1} / ₹{call.target2}
                      </div>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-800/60">
                      <div className="text-[10px] text-rose-400">STOP LOSS</div>
                      <div className="text-xs font-bold text-rose-400 tabular-nums">
                        ₹{call.stopLoss}
                      </div>
                    </div>
                  </div>

                  {/* Rationale Snippet */}
                  <div className="mt-3 text-[11px] text-slate-300 leading-snug bg-slate-900/30 p-2.5 rounded border border-slate-800/40">
                    <strong className="text-slate-200">Analysis: </strong>
                    {call.rationale}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Current: ₹{call.currentPrice || call.entryPrice}</span>
                  <span className="text-emerald-400">SEBI RA Published</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCalls.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            No research calls found in this category.
          </div>
        )}

        {/* Regulatory Disclosure Strip */}
        <div className="mt-8 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200 font-semibold">Important Regulatory Notice: </strong>
            Research calls are disseminated for informational and educational decision-support. No advice herein promises or guarantees profit or capital preservation. Derivative positions involve high risk of complete loss of margin capital. Investors must conduct their independent risk assessment before executing orders.
          </p>
        </div>
      </div>
    </section>
  );
};
