import React, { useState } from 'react';
import { MarketUpdateArticle } from '../types';
import { Calendar, Clock, User, ArrowRight, X, Tag } from 'lucide-react';

interface MarketUpdatesSectionProps {
  articles: MarketUpdateArticle[];
}

export const MarketUpdatesSection: React.FC<MarketUpdatesSectionProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<MarketUpdateArticle | null>(null);

  return (
    <section className="bg-slate-950 py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-2">
              Market Intelligence & Daily Commentary
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Live Market Updates & Policy Analysis
            </h2>
            <p className="text-base text-slate-300 mt-2 max-w-2xl">
              Real-time dispatches on macroeconomic events, RBI monetary policy announcements, earnings surprises, and sectoral rotation trends.
            </p>
          </div>
        </div>

        {/* 4-Column or 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map(art => (
            <article
              key={art.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-colors shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2.5">
                  <span className="text-emerald-400 font-semibold">{art.category}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors font-display line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                  {art.shortDesc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
                  {art.tags.slice(0, 2).map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{art.date}</span>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Read Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for Full Article View */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span>{selectedArticle.category}</span>
                  <span>·</span>
                  <span>{selectedArticle.date}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white font-display leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-2 mb-6">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Published by {selectedArticle.author} · ArthaNivesh Financial Research</span>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed space-y-4 font-sans">
                <p className="font-semibold text-slate-200">{selectedArticle.shortDesc}</p>
                <p>{selectedArticle.content}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Tag className="w-3 h-3" />
                  <span>{selectedArticle.tags.join(', ')}</span>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
