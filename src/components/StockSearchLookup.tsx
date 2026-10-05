import React, { useState, useEffect, useMemo, useRef } from 'react';
import { INITIAL_STOCKS, StockItem } from '../data/stocksData';
import { InteractiveChart } from './InteractiveChart';
import {
  Search,
  X,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Activity,
  FileText,
  Clock,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface StockSearchLookupProps {
  onEnquireStock: (stockSymbol: string, stockName: string) => void;
}

export const StockSearchLookup: React.FC<StockSearchLookupProps> = ({ onEnquireStock }) => {
  const [query, setQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<StockItem>(INITIAL_STOCKS[0]);
  const [stocks, setStocks] = useState<StockItem[]>(INITIAL_STOCKS);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alertSet, setAlertSet] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(true);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Live real-time tick pulse simulation for the active stock
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(item => {
          if (item.symbol !== selectedStock.symbol && Math.random() > 0.3) return item;
          const delta = (Math.random() - 0.48) * (item.currentPrice * 0.0008);
          const newPrice = +(item.currentPrice + delta).toFixed(2);
          const newChange = +(item.change + delta).toFixed(2);
          const prevClose = newPrice - newChange;
          const newPct = prevClose > 0 ? +((newChange / prevClose) * 100).toFixed(2) : 0;
          const updated = {
            ...item,
            currentPrice: newPrice,
            change: newChange,
            changePct: newPct,
            dayHigh: Math.max(item.dayHigh, newPrice),
            dayLow: Math.min(item.dayLow, newPrice)
          };
          if (item.symbol === selectedStock.symbol) {
            setSelectedStock(updated);
          }
          return updated;
        })
      );
    }, 3200);

    return () => clearInterval(interval);
  }, [selectedStock.symbol, isLiveActive]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search results
  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return stocks
      .filter(
        s =>
          s.symbol.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.sector.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, stocks]);

  const handleSelectSuggestion = (stock: StockItem) => {
    setSelectedStock(stock);
    setQuery('');
    setIsDropdownOpen(false);
    setAlertSet(false);
  };

  const handleQuickPill = (symbol: string) => {
    const found = stocks.find(s => s.symbol === symbol);
    if (found) {
      setSelectedStock(found);
      setQuery('');
      setIsDropdownOpen(false);
      setAlertSet(false);
    }
  };

  const popularSymbols = [
    'RELIANCE',
    'TCS',
    'HDFCBANK',
    'INFY',
    'TATAMOTORS',
    'ICICIBANK',
    'ITC',
    'SBIN',
    'BHARTIARTL',
    'LT',
    'BAJFINANCE',
    'ZOMATO',
    'TRENT',
    'HAL'
  ];

  const isGreen = selectedStock.change >= 0;

  // Day Range calculation
  const dayRangeSpread = selectedStock.dayHigh - selectedStock.dayLow || 1;
  const dayPositionPct = Math.min(
    100,
    Math.max(0, ((selectedStock.currentPrice - selectedStock.dayLow) / dayRangeSpread) * 100)
  );

  // 52W Range calculation
  const yearSpread = selectedStock.yearHigh - selectedStock.yearLow || 1;
  const yearPositionPct = Math.min(
    100,
    Math.max(0, ((selectedStock.currentPrice - selectedStock.yearLow) / yearSpread) * 100)
  );

  return (
    <section id="stock-search" className="bg-slate-950 py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Real-Time Market Research & Price Lookup</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Live Stock Search & Technical Analysis
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Search any NSE / BSE listed enterprise to inspect live prices, 52-week valuation ranges, volume momentum, and ArthaNivesh research desk coverage.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-slate-300">NSE Live Pulse</span>
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`px-2.5 py-1 rounded text-[11px] border cursor-pointer transition-colors ${
                isLiveActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {isLiveActive ? 'Live Updates: ON' : 'Paused'}
            </button>
          </div>
        </div>

        {/* 1. SEARCH INPUT BAR CONTAINER */}
        <div ref={searchContainerRef} className="relative w-full max-w-3xl">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search by company name or ticker (e.g. Reliance, TCS, HDFC Bank, Tata Motors, Infosys...)"
              className="w-full bg-slate-900 border-2 border-slate-800 focus:border-emerald-500 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none shadow-xl transition-all font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 text-slate-400 hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-40 divide-y divide-slate-800/80 animate-in fade-in">
              <div className="p-2.5 bg-slate-950/90 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Matching Companies ({filteredSuggestions.length})</span>
                <span>Press to inspect</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {filteredSuggestions.map(stock => {
                  const sGreen = stock.change >= 0;
                  return (
                    <button
                      key={stock.symbol}
                      onClick={() => handleSelectSuggestion(stock)}
                      className="w-full p-3.5 flex items-center justify-between hover:bg-slate-800/80 text-left transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                            {stock.symbol}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                            {stock.sector}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">{stock.name}</div>
                      </div>

                      <div className="text-right font-mono">
                        <div className="text-sm font-bold text-white tabular-nums">
                          ₹{stock.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div
                          className={`text-xs font-semibold tabular-nums ${
                            sGreen ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {sGreen ? '+' : ''}
                          {stock.change.toFixed(2)} ({sGreen ? '+' : ''}
                          {stock.changePct.toFixed(2)}%)
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results message */}
          {isDropdownOpen && query.trim() && filteredSuggestions.length === 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-xs text-slate-400 shadow-xl z-40">
              No matching company found for "{query}". Try searching by ticker like <strong>RELIANCE</strong> or <strong>TCS</strong>.
            </div>
          )}
        </div>

        {/* Popular Quick-Select Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-slate-500 mr-1 text-[11px]">Popular Stocks:</span>
          {popularSymbols.map(sym => (
            <button
              key={sym}
              onClick={() => handleQuickPill(sym)}
              className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer ${
                selectedStock.symbol === sym
                  ? 'bg-emerald-400 text-slate-950 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {sym}
            </button>
          ))}
        </div>

        {/* 2. REAL-TIME SEARCHED STOCK DETAILS DISPLAY */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 backdrop-blur-sm">
          {/* Top Bar: Company Lockup & Real-Time Price */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono">
                <span className="text-emerald-400 font-bold">NSE: {selectedStock.symbol}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{selectedStock.sector}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">Large Cap Leader</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {selectedStock.name}
              </h3>

              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2 font-mono">
                <span>Market Status:</span>
                <span className="text-emerald-400 font-semibold">● Open & Trading (IST)</span>
              </div>
            </div>

            {/* Price Box with subtle real-time pulse */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:min-w-[280px] font-mono text-right flex flex-col justify-center">
              <div className="text-xs text-slate-400">CURRENT MARKET PRICE</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tabular-nums tracking-tight">
                ₹{selectedStock.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div
                className={`text-sm font-bold mt-1 flex items-center justify-end gap-1 tabular-nums ${
                  isGreen ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isGreen ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>
                  {isGreen ? '+' : ''}₹{selectedStock.change.toFixed(2)} ({isGreen ? '+' : ''}
                  {selectedStock.changePct.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Key Trading & Valuation Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day's Range Visual Slider */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">DAY'S RANGE</span>
                <span className="text-slate-200">
                  L: ₹{selectedStock.dayLow.toLocaleString('en-IN')} — H: ₹
                  {selectedStock.dayHigh.toLocaleString('en-IN')}
                </span>
              </div>
              {/* Range bar */}
              <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-visible">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-emerald-500 rounded-full"
                  style={{ width: `${dayPositionPct}%` }}
                />
                {/* Pointer marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-emerald-500 shadow-md"
                  style={{ left: `${dayPositionPct}%` }}
                  title={`Current: ₹${selectedStock.currentPrice}`}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Low: ₹{selectedStock.dayLow}</span>
                <span className="text-emerald-400 font-bold">Current: ₹{selectedStock.currentPrice}</span>
                <span>High: ₹{selectedStock.dayHigh}</span>
              </div>
            </div>

            {/* 52-Week Range Visual Slider */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">52-WEEK RANGE</span>
                <span className="text-slate-200">
                  L: ₹{selectedStock.yearLow.toLocaleString('en-IN')} — H: ₹
                  {selectedStock.yearHigh.toLocaleString('en-IN')}
                </span>
              </div>
              {/* Range bar */}
              <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-visible">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-sky-500 rounded-full"
                  style={{ width: `${yearPositionPct}%` }}
                />
                {/* Pointer marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-sky-500 shadow-md"
                  style={{ left: `${yearPositionPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>52W Low: ₹{selectedStock.yearLow}</span>
                <span className="text-sky-400 font-bold">Current: ₹{selectedStock.currentPrice}</span>
                <span>52W High: ₹{selectedStock.yearHigh}</span>
              </div>
            </div>
          </div>

          {/* Key Fundamentals Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500">MARKET CAPITALIZATION</div>
              <div className="text-base font-bold text-white mt-1 tabular-nums">
                ₹{(selectedStock.marketCapCr / 100000).toFixed(2)} Lakh Cr
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500">DAILY VOLUME</div>
              <div className="text-base font-bold text-white mt-1 tabular-nums">
                {selectedStock.volume}
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500">PRICE-TO-EARNINGS (P/E)</div>
              <div className="text-base font-bold text-emerald-400 mt-1 tabular-nums">
                {selectedStock.peRatio}x
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500">STOCK BETA (VOLATILITY)</div>
              <div className="text-base font-bold text-amber-400 mt-1 tabular-nums">
                {selectedStock.beta}
              </div>
            </div>
          </div>

          {/* ArthaNivesh Research Desk Verdict Banner */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 rounded-2xl border border-emerald-500/30 space-y-3 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-bold text-white text-xs">
                  ARTHANIVESH RESEARCH ANALYST STANCE:
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-400 text-slate-950">
                  {selectedStock.rating}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Target: </span>
                  <strong className="text-emerald-400">₹{selectedStock.targetPrice}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Support / SL: </span>
                  <strong className="text-rose-400">₹{selectedStock.stopLoss}</strong>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              <strong className="text-slate-100 font-mono">Fundamental & Technical Rationale: </strong>
              {selectedStock.rationale}
            </p>
          </div>

          {/* Interactive Candlestick / Line Chart for Searched Stock */}
          <div>
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>Technical Chart for {selectedStock.symbol}</span>
              <span className="text-emerald-400">Interactive OHLC Terminal</span>
            </div>
            <InteractiveChart
              symbol={selectedStock.symbol}
              currentPrice={selectedStock.currentPrice}
              change={selectedStock.change}
              changePct={selectedStock.changePct}
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Quotes update every 3 seconds during market sessions.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAlertSet(!alertSet)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  alertSet
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                    : 'bg-slate-950 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{alertSet ? 'Price Alert Active' : 'Set Price Alert'}</span>
              </button>

              <button
                onClick={() => onEnquireStock(selectedStock.symbol, selectedStock.name)}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Request Detailed Research Report on {selectedStock.symbol}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
