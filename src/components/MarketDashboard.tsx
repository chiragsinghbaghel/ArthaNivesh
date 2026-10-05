import React, { useState } from 'react';
import { InteractiveChart } from './InteractiveChart';
import { TrendingUp, TrendingDown, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

interface MarketIndexItem {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  pct: number;
  high: number;
  low: number;
  category: 'indices' | 'stocks' | 'commodities';
}

const DASHBOARD_INSTRUMENTS: MarketIndexItem[] = [
  { id: 'nifty', name: 'Nifty 50', ticker: 'NIFTY', price: 24852.15, change: 142.35, pct: 0.58, high: 24890.4, low: 24710.2, category: 'indices' },
  { id: 'banknifty', name: 'Nifty Bank', ticker: 'BANKNIFTY', price: 53215.40, change: 322.10, pct: 0.61, high: 53340.0, low: 52910.0, category: 'indices' },
  { id: 'sensex', name: 'BSE Sensex', ticker: 'SENSEX', price: 81430.70, change: 418.90, pct: 0.52, high: 81520.1, low: 81020.3, category: 'indices' },
  { id: 'reliance', name: 'Reliance Industries', ticker: 'RELIANCE', price: 2948.50, change: 24.20, pct: 0.83, high: 2962.0, low: 2928.0, category: 'stocks' },
  { id: 'hdfcbank', name: 'HDFC Bank', ticker: 'HDFCBANK', price: 1672.00, change: 14.80, pct: 0.89, high: 1680.0, low: 1652.0, category: 'stocks' },
  { id: 'tcs', name: 'Tata Consultancy Services', ticker: 'TCS', price: 4280.00, change: -18.50, pct: -0.43, high: 4310.0, low: 4265.0, category: 'stocks' },
  { id: 'gold', name: 'MCX Gold 24K (10g)', ticker: 'GOLD', price: 76240.00, change: 280.00, pct: 0.37, high: 76400.0, low: 75980.0, category: 'commodities' },
  { id: 'crude', name: 'MCX Brent Crude', ticker: 'CRUDEOIL', price: 6445.00, change: 65.00, pct: 1.02, high: 6490.0, low: 6380.0, category: 'commodities' }
];

export const MarketDashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MarketIndexItem>(DASHBOARD_INSTRUMENTS[0]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'indices' | 'stocks' | 'commodities'>('all');

  const filteredItems = categoryFilter === 'all'
    ? DASHBOARD_INSTRUMENTS
    : DASHBOARD_INSTRUMENTS.filter(i => i.category === categoryFilter);

  return (
    <section className="bg-slate-900/40 py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-400 tracking-wide uppercase font-mono mb-1">
              Live Market Dashboard
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Indian Market Benchmark & Asset Pulse
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Simulated real-time quote feeds, daily highs/lows, and interactive technical charting.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs self-start md:self-auto">
            {(['all', 'indices', 'stocks', 'commodities'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Assets' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid: Left Scrip Selector Table, Right Active Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Instrument List */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/60 shadow-lg">
            <div className="p-3 bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Instrument</span>
              <span className="text-right">Price / Change</span>
            </div>

            <div className="max-h-[460px] overflow-y-auto divide-y divide-slate-800/40">
              {filteredItems.map(item => {
                const isSelected = selectedItem.id === item.id;
                const isGreen = item.change >= 0;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full p-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/80 border-l-3 border-emerald-400'
                        : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {isSelected && (
                          <span className="text-[10px] text-emerald-400 font-mono">● active</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        H: ₹{item.high.toLocaleString('en-IN')} · L: ₹{item.low.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-white tabular-nums">
                        ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-xs font-medium tabular-nums flex items-center justify-end gap-0.5 ${
                          isGreen ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isGreen ? '+' : ''}
                        {item.change.toFixed(2)} ({isGreen ? '+' : ''}
                        {item.pct.toFixed(2)}%)
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-slate-950 text-[11px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-800">
              <span>NSE / BSE / MCX Indicative Feed</span>
              <span>Updated 15s ago</span>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="lg:col-span-7">
            <InteractiveChart
              symbol={selectedItem.ticker}
              currentPrice={selectedItem.price}
              change={selectedItem.change}
              changePct={selectedItem.pct}
            />

            {/* Statutory Label */}
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Demonstration price feed for research and technical evaluation purposes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
