import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePct: number;
  type: 'index' | 'commodity' | 'vix';
}

const INITIAL_TICKERS: TickerItem[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50', value: 24852.15, change: 142.35, changePct: 0.58, type: 'index' },
  { symbol: 'SENSEX', name: 'BSE Sensex', value: 81430.70, change: 418.90, changePct: 0.52, type: 'index' },
  { symbol: 'BANK NIFTY', name: 'Bank Nifty', value: 53215.40, change: 322.10, changePct: 0.61, type: 'index' },
  { symbol: 'NIFTY IT', name: 'Nifty IT', value: 41920.80, change: -110.45, changePct: -0.26, type: 'index' },
  { symbol: 'INDIA VIX', name: 'India VIX', value: 12.82, change: -0.42, changePct: -3.17, type: 'vix' },
  { symbol: 'GOLD (MCX)', name: 'Gold 24K', value: 76240.00, change: 280.00, changePct: 0.37, type: 'commodity' },
  { symbol: 'CRUDE OIL', name: 'Brent Crude', value: 6445.00, change: 65.00, changePct: 1.02, type: 'commodity' },
  { symbol: 'SILVER (MCX)', name: 'Silver 1kg', value: 92850.00, change: 420.00, changePct: 0.45, type: 'commodity' }
];

export const MarketTicker: React.FC = () => {
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS);

  // Subtle tick simulation every 4 seconds to give a real-time market pulse feel
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev =>
        prev.map(item => {
          if (Math.random() > 0.4) return item;
          const delta = (Math.random() - 0.48) * (item.value * 0.0006);
          const newValue = +(item.value + delta).toFixed(2);
          const newChange = +(item.change + delta).toFixed(2);
          const newChangePct = +((newChange / (newValue - newChange)) * 100).toFixed(2);
          return {
            ...item,
            value: newValue,
            change: newChange,
            changePct: newChangePct
          };
        })
      );
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 text-xs text-slate-300 py-1.5 overflow-hidden select-none">
      <div className="flex animate-ticker whitespace-nowrap items-center">
        {/* Repeating twice for seamless marquee loop */}
        {[...tickers, ...tickers].map((item, idx) => {
          const isPositive = item.change >= 0;
          return (
            <div
              key={`${item.symbol}-${idx}`}
              className="inline-flex items-center gap-2 px-5 border-r border-slate-800/60 font-mono text-[11px] tracking-tight"
            >
              <span className="font-semibold text-slate-200">{item.symbol}</span>
              <span className="text-slate-100 tabular-nums">
                {item.value.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 tabular-nums ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 inline-block" />
                ) : (
                  <TrendingDown className="w-3 h-3 inline-block" />
                )}
                {isPositive ? '+' : ''}
                {item.change.toFixed(1)} ({isPositive ? '+' : ''}
                {item.changePct.toFixed(2)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
