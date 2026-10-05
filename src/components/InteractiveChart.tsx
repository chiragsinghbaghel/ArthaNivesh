import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Layers, RefreshCw } from 'lucide-react';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface InteractiveChartProps {
  symbol?: string;
  currentPrice?: number;
  change?: number;
  changePct?: number;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  symbol = 'NIFTY 50',
  currentPrice = 24852.15,
  change = 142.35,
  changePct = 0.58
}) => {
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '1Y'>('1D');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showSMA, setShowSMA] = useState<boolean>(true);

  // Generate deterministic realistic candle series based on timeframe
  const candles: CandleData[] = useMemo(() => {
    const count = timeframe === '1D' ? 32 : timeframe === '5D' ? 40 : timeframe === '1M' ? 30 : 50;
    const base = currentPrice * 0.985;
    const data: CandleData[] = [];
    let prevClose = base;

    const times =
      timeframe === '1D'
        ? ['09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30']
        : Array.from({ length: count }, (_, i) => `T-${count - i}`);

    for (let i = 0; i < count; i++) {
      const volatility = currentPrice * 0.0035;
      const drift = (i / count) * (currentPrice - base) * 1.05;
      const open = prevClose;
      const delta = (Math.sin(i * 0.7) * 0.6 + (Math.random() - 0.45)) * volatility;
      const close = +(open + delta + drift * 0.05).toFixed(2);
      const high = +(Math.max(open, close) + Math.random() * volatility * 0.8).toFixed(2);
      const low = +(Math.min(open, close) - Math.random() * volatility * 0.8).toFixed(2);
      const volume = Math.round(150000 + Math.random() * 450000 + (high - low) * 8000);

      data.push({
        time: times[i % times.length] || `Bar ${i + 1}`,
        open,
        high,
        low,
        close,
        volume
      });
      prevClose = close;
    }
    return data;
  }, [timeframe, currentPrice]);

  // Compute 10-period SMA
  const smaPoints = useMemo(() => {
    return candles.map((_, i) => {
      if (i < 5) return null;
      const slice = candles.slice(i - 5, i + 1);
      const avg = slice.reduce((acc, c) => acc + c.close, 0) / slice.length;
      return avg;
    });
  }, [candles]);

  // Bounds
  const minVal = Math.min(...candles.map(c => c.low));
  const maxVal = Math.max(...candles.map(c => c.high));
  const maxVol = Math.max(...candles.map(c => c.volume));
  const range = maxVal - minVal || 1;

  const activeCandle = hoverIndex !== null && candles[hoverIndex] ? candles[hoverIndex] : candles[candles.length - 1];

  const chartHeight = 240;
  const chartWidth = 600;
  const paddingX = 24;
  const paddingY = 20;
  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const getY = (val: number) => {
    return paddingY + innerHeight - ((val - minVal) / range) * innerHeight;
  };

  const getX = (index: number) => {
    return paddingX + (index / (candles.length - 1)) * innerWidth;
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 text-slate-100 shadow-xl backdrop-blur-sm">
      {/* Chart Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-white font-mono tracking-tight">
                {symbol}
              </span>
              <span className="text-[11px] text-slate-400 font-sans">NSE Real-time Pulse</span>
            </div>
            <div className="flex items-baseline gap-2 font-mono text-sm sm:text-base">
              <span className="font-bold text-white tabular-nums">
                ₹{activeCandle.close.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`text-xs font-semibold tabular-nums ${
                  change >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {change >= 0 ? '+' : ''}
                {change.toFixed(2)} ({changePct >= 0 ? '+' : ''}
                {changePct.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 text-xs">
          {/* Timeframe Buttons */}
          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 font-mono">
            {(['1D', '5D', '1M', '1Y'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                  timeframe === tf
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setChartType('candle')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                chartType === 'candle'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Candlestick Chart"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                chartType === 'line'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Line Chart"
            >
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Indicator Toggle */}
          <button
            onClick={() => setShowSMA(!showSMA)}
            className={`px-2 py-1 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
              showSMA
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}
          >
            SMA 10
          </button>
        </div>
      </div>

      {/* OHLC Bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400 mb-2 border-b border-slate-800/40 pb-2">
        <span>
          Time: <strong className="text-slate-200">{activeCandle.time}</strong>
        </span>
        <span>
          O: <strong className="text-slate-200">{activeCandle.open.toFixed(2)}</strong>
        </span>
        <span>
          H: <strong className="text-emerald-400">{activeCandle.high.toFixed(2)}</strong>
        </span>
        <span>
          L: <strong className="text-rose-400">{activeCandle.low.toFixed(2)}</strong>
        </span>
        <span>
          C: <strong className="text-slate-200">{activeCandle.close.toFixed(2)}</strong>
        </span>
        <span>
          Vol: <strong className="text-slate-300">{activeCandle.volume.toLocaleString('en-IN')}</strong>
        </span>
      </div>

      {/* Main SVG Chart */}
      <div className="relative w-full h-[260px] overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Subtle Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = paddingY + innerHeight * pct;
            const val = maxVal - pct * range;
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                />
                <text
                  x={chartWidth - paddingX + 4}
                  y={y + 3}
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Volume bars in lower background */}
          {candles.map((c, i) => {
            const x = getX(i);
            const isGreen = c.close >= c.open;
            const volH = (c.volume / maxVol) * 45;
            const volY = chartHeight - paddingY - volH;
            const barW = Math.max(3, innerWidth / candles.length - 2);
            return (
              <rect
                key={`vol-${i}`}
                x={x - barW / 2}
                y={volY}
                width={barW}
                height={volH}
                fill={isGreen ? '#10b981' : '#f43f5e'}
                opacity={0.18}
              />
            );
          })}

          {/* Candlesticks or Line */}
          {chartType === 'candle' ? (
            candles.map((c, i) => {
              const x = getX(i);
              const isGreen = c.close >= c.open;
              const yHigh = getY(c.high);
              const yLow = getY(c.low);
              const yOpen = getY(c.open);
              const yClose = getY(c.close);

              const candleTop = Math.min(yOpen, yClose);
              const candleHeight = Math.max(2, Math.abs(yClose - yOpen));
              const candleWidth = Math.max(3.5, innerWidth / candles.length - 3);

              return (
                <g
                  key={`candle-${i}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(i)}
                >
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={isGreen ? '#10b981' : '#f43f5e'}
                    strokeWidth="1.2"
                  />
                  {/* Body */}
                  <rect
                    x={x - candleWidth / 2}
                    y={candleTop}
                    width={candleWidth}
                    height={candleHeight}
                    fill={isGreen ? '#10b981' : '#f43f5e'}
                    rx="0.5"
                  />
                </g>
              );
            })
          ) : (
            // Area line chart
            <g>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <polygon
                points={`
                  ${getX(0)},${chartHeight - paddingY}
                  ${candles.map((c, i) => `${getX(i)},${getY(c.close)}`).join(' ')}
                  ${getX(candles.length - 1)},${chartHeight - paddingY}
                `}
                fill="url(#chartGradient)"
              />
              {/* Path */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                points={candles.map((c, i) => `${getX(i)},${getY(c.close)}`).join(' ')}
              />
            </g>
          )}

          {/* SMA 10 overlay line */}
          {showSMA && (
            <polyline
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.4"
              strokeDasharray="4 2"
              points={candles
                .map((_, i) => (smaPoints[i] !== null ? `${getX(i)},${getY(smaPoints[i]!)}` : ''))
                .filter(Boolean)
                .join(' ')}
            />
          )}

          {/* Interactive Crosshair */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={paddingY}
                x2={getX(hoverIndex)}
                y2={chartHeight - paddingY}
                stroke="#94a3b8"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(candles[hoverIndex].close)}
                r="3.5"
                fill="#10b981"
                stroke="#0f172a"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Chart Footer Indicator Legend */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" />
            Bullish Candlestick
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 inline-block" />
            Bearish Candlestick
          </span>
          {showSMA && (
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-3 h-0.5 bg-amber-400 inline-block" />
              SMA(10)
            </span>
          )}
        </div>
        <div className="text-slate-500 hidden sm:block">
          Interactive Technical Terminal
        </div>
      </div>
    </div>
  );
};
