import React from 'react';

interface ServiceCardImageProps {
  theme: string;
  title: string;
  className?: string;
  showOverlayTitle?: boolean;
}

export const ServiceCardImage: React.FC<ServiceCardImageProps> = ({
  theme,
  title,
  className = 'h-48 sm:h-52 w-full',
  showOverlayTitle = true
}) => {
  const renderVisualArtwork = () => {
    switch (theme) {
      case 'stock-cash':
        // Pure Gold bullion ingots stack with metallic sheen & warm luster (like screenshot card 3)
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="goldBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#452a0a" />
                <stop offset="40%" stopColor="#855819" />
                <stop offset="80%" stopColor="#301b05" />
                <stop offset="100%" stopColor="#1a0e02" />
              </linearGradient>
              <linearGradient id="ingotTop" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#eab308" />
                <stop offset="80%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>
              <linearGradient id="ingotSide" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ca8a04" />
                <stop offset="60%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#3f2204" />
              </linearGradient>
              <linearGradient id="ingotFront" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a16207" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#713f12" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#goldBg)" />
            {/* Background gold bar layers */}
            <g opacity="0.6">
              <polygon points="40,60 180,60 150,20 10,20" fill="url(#ingotTop)" />
              <polygon points="180,60 210,35 180,20 150,20" fill="url(#ingotSide)" />
              <polygon points="190,60 330,60 300,20 160,20" fill="url(#ingotTop)" />
              <polygon points="330,60 360,35 330,20 300,20" fill="url(#ingotSide)" />
            </g>
            {/* Mid row gold bars */}
            <g opacity="0.85">
              <polygon points="20,130 190,130 160,80 0,80" fill="url(#ingotTop)" />
              <polygon points="190,130 220,95 190,80 160,80" fill="url(#ingotSide)" />
              <rect x="20" y="130" width="170" height="35" fill="url(#ingotFront)" />
              <polygon points="190,130 220,95 220,130 190,165" fill="url(#ingotSide)" />
              <text x="75" y="152" fill="#452a0a" fontSize="11" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">FINE GOLD 999.9</text>

              <polygon points="210,130 380,130 350,80 180,80" fill="url(#ingotTop)" />
              <polygon points="380,130 400,105 380,80 350,80" fill="url(#ingotSide)" />
              <rect x="210" y="130" width="170" height="35" fill="url(#ingotFront)" />
              <text x="265" y="152" fill="#452a0a" fontSize="11" fontFamily="sans-serif" fontWeight="900" letterSpacing="1">1000g NET</text>
            </g>
            {/* Foreground bar */}
            <polygon points="60,205 280,205 240,150 20,150" fill="url(#ingotTop)" />
            <polygon points="280,205 320,165 280,150 240,150" fill="url(#ingotSide)" />
            <rect x="60" y="205" width="220" height="35" fill="url(#ingotFront)" />
            <polygon points="280,205 320,165 320,200 280,240" fill="url(#ingotSide)" />
            <text x="135" y="228" fill="#452a0a" fontSize="12" fontFamily="sans-serif" fontWeight="900" letterSpacing="2">ARTHANIVESH 999.9</text>
            {/* Specular sparkle */}
            <circle cx="160" cy="80" r="3" fill="#ffffff" opacity="0.9" />
            <circle cx="280" cy="150" r="4" fill="#ffffff" opacity="0.9" />
          </svg>
        );

      case 'stock-future':
        // Deep blue currency background with glowing neon upward zig-zag trajectory arrow (like screenshot card 2)
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="futureBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#081e3d" />
                <stop offset="50%" stopColor="#103b70" />
                <stop offset="100%" stopColor="#051329" />
              </linearGradient>
              <linearGradient id="arrowGrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect width="400" height="240" fill="url(#futureBg)" />
            {/* Background currency & grid pattern */}
            <g opacity="0.18">
              {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map(x => (
                <line key={`gx-${x}`} x1={x} y1="0" x2={x} y2="240" stroke="#38bdf8" strokeWidth="1" />
              ))}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240].map(y => (
                <line key={`gy-${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#38bdf8" strokeWidth="1" />
              ))}
              {/* Currency engraving textures */}
              <text x="30" y="80" fill="#38bdf8" fontSize="48" fontFamily="serif" fontWeight="bold">₹</text>
              <text x="260" y="110" fill="#38bdf8" fontSize="56" fontFamily="serif" fontWeight="bold">₹</text>
              <text x="120" y="210" fill="#38bdf8" fontSize="72" fontFamily="serif" fontWeight="bold">NSE</text>
            </g>
            {/* Soft wave area */}
            <path
              d="M 0,220 L 40,190 L 80,210 L 130,170 L 190,195 L 250,130 L 320,80 L 360,40 L 400,30 L 400,240 L 0,240 Z"
              fill="#0284c7"
              opacity="0.25"
            />
            {/* Primary Glowing Neon Ascending Trajectory Arrow */}
            <g filter="url(#neonGlow)">
              <polyline
                points="20,210 60,180 100,200 150,150 200,180 270,110 330,65"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.7"
              />
              <polyline
                points="20,210 60,180 100,200 150,150 200,180 270,110 330,65"
                fill="none"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrow Head */}
              <polygon points="345,50 310,65 330,85" fill="#ffffff" />
            </g>
          </svg>
        );

      case 'stock-option':
        // Desk with financial calculations, calculator, reading glasses, graph sheet (like screenshot card 1)
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="woodDesk" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#453224" />
                <stop offset="50%" stopColor="#2c1f15" />
                <stop offset="100%" stopColor="#1a120b" />
              </linearGradient>
              <linearGradient id="sheetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#woodDesk)" />
            {/* Desk ledger paper tilted */}
            <g transform="rotate(-5 200 120)">
              <rect x="50" y="20" width="300" height="200" rx="4" fill="url(#sheetGrad)" opacity="0.95" />
              {/* Printed ledger lines */}
              {[45, 65, 85, 105, 125, 145, 165, 185].map(y => (
                <line key={`pl-${y}`} x1="70" y1={y} x2="330" y2={y} stroke="#94a3b8" strokeWidth="0.8" />
              ))}
              {/* Tiny bar graph on sheet */}
              <rect x="250" y="110" width="10" height="40" fill="#10b981" />
              <rect x="265" y="95" width="10" height="55" fill="#10b981" />
              <rect x="280" y="120" width="10" height="30" fill="#f43f5e" />
              <rect x="295" y="80" width="10" height="70" fill="#10b981" />
            </g>
            {/* Calculator sitting on left */}
            <g transform="translate(30, 80)">
              <rect x="0" y="0" width="105" height="150" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              {/* Screen */}
              <rect x="10" y="10" width="85" height="28" rx="3" fill="#64748b" opacity="0.3" />
              <text x="90" y="30" fill="#34d399" fontSize="13" fontFamily="monospace" textAnchor="end" fontWeight="bold">24,850.00</text>
              {/* Buttons */}
              {[0, 1, 2, 3].map(row =>
                [0, 1, 2, 3].map(col => (
                  <rect
                    key={`b-${row}-${col}`}
                    x={12 + col * 21}
                    y={48 + row * 23}
                    width="17"
                    height="16"
                    rx="3"
                    fill={row === 3 && col === 3 ? '#10b981' : '#1e293b'}
                  />
                ))
              )}
            </g>
            {/* Reading glasses placed on top right */}
            <g transform="translate(190, 30)">
              <ellipse cx="60" cy="40" rx="30" ry="22" fill="none" stroke="#0f172a" strokeWidth="4" />
              <ellipse cx="60" cy="40" rx="28" ry="20" fill="#38bdf8" opacity="0.15" />
              <ellipse cx="140" cy="40" rx="30" ry="22" fill="none" stroke="#0f172a" strokeWidth="4" />
              <ellipse cx="140" cy="40" rx="28" ry="20" fill="#38bdf8" opacity="0.15" />
              {/* Bridge */}
              <path d="M 90,38 Q 100,32 110,38" fill="none" stroke="#0f172a" strokeWidth="4" />
              {/* Temples */}
              <line x1="30" y1="40" x2="5" y2="70" stroke="#0f172a" strokeWidth="3" />
              <line x1="170" y1="40" x2="195" y2="70" stroke="#0f172a" strokeWidth="3" />
            </g>
          </svg>
        );

      case 'index':
        // Scientific calculator, technical charts, executive pen, institutional reports (like screenshot card 5)
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="indexBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#indexBg)" />
            {/* Technical benchmark curve background */}
            <path
              d="M 0,180 Q 80,160 140,110 T 260,80 T 400,30"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeDasharray="6 3"
            />
            {/* Financial Document Paper */}
            <g transform="rotate(3 200 120)">
              <rect x="80" y="30" width="280" height="180" rx="6" fill="#f1f5f9" opacity="0.9" />
              <text x="100" y="60" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                NIFTY 50 & BANK NIFTY BENCHMARK REPORT
              </text>
              {[80, 100, 120, 140, 160, 180].map(y => (
                <line key={`il-${y}`} x1="100" y1={y} x2="340" y2={y} stroke="#cbd5e1" strokeWidth="1" />
              ))}
              <text x="100" y="95" fill="#059669" fontSize="11" fontFamily="monospace" fontWeight="bold">+1.45% WEEKLY ADVANCE</text>
            </g>
            {/* Calculator overlay on bottom left */}
            <g transform="translate(40, 90)">
              <rect x="0" y="0" width="120" height="140" rx="10" fill="#090d16" stroke="#475569" strokeWidth="2" />
              <rect x="12" y="12" width="96" height="25" rx="3" fill="#1e293b" />
              <text x="100" y="29" fill="#38bdf8" fontSize="12" fontFamily="monospace" textAnchor="end">53,210.80</text>
              {[0, 1, 2].map(r =>
                [0, 1, 2, 3].map(c => (
                  <rect key={`bc-${r}-${c}`} x={12 + c * 24} y={45 + r * 22} width="19" height="15" rx="2" fill="#334155" />
                ))
              )}
            </g>
            {/* Metallic Fountain Pen lying diagonally */}
            <g transform="rotate(45 310 120)">
              <rect x="290" y="40" width="12" height="130" rx="3" fill="#cbd5e1" stroke="#475569" />
              <polygon points="296,170 290,190 302,190" fill="#eab308" />
              <rect x="288" y="70" width="16" height="8" rx="2" fill="#eab308" />
            </g>
          </svg>
        );

      case 'commodity':
      case 'mcx':
        // Golden ripe wheat, crude oil barrel silhouettes, natural gas energy flames (like screenshot card 4 & 6)
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="commBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a2b" />
                <stop offset="50%" stopColor="#3d2a14" />
                <stop offset="100%" stopColor="#0f1912" />
              </linearGradient>
              <linearGradient id="wheatGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#commBg)" />
            {/* Rising wheat stalks across bottom and left */}
            {[20, 50, 80, 110, 140, 170, 200].map((x, idx) => (
              <g key={`wheat-${idx}`} transform={`translate(${x}, 50)`}>
                <line x1="0" y1="180" x2="0" y2="30" stroke="#854d0e" strokeWidth="2.5" />
                {/* Grains */}
                {[30, 45, 60, 75, 90, 105, 120].map((gy, gi) => (
                  <g key={`grain-${gi}`}>
                    <ellipse cx="-7" cy={gy} rx="6" ry="10" transform={`rotate(-25 -7 ${gy})`} fill="url(#wheatGrad)" />
                    <ellipse cx="7" cy={gy} rx="6" ry="10" transform={`rotate(25 7 ${gy})`} fill="url(#wheatGrad)" />
                  </g>
                ))}
              </g>
            ))}
            {/* Crude Oil Barrel silhouette on right */}
            <g transform="translate(260, 70)" opacity="0.85">
              <ellipse cx="60" cy="20" rx="45" ry="14" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              <rect x="15" y="20" width="90" height="110" fill="#1e293b" />
              <ellipse cx="60" cy="130" rx="45" ry="14" fill="#0f172a" />
              {/* Rings */}
              <line x1="15" y1="50" x2="105" y2="50" stroke="#0f172a" strokeWidth="3" />
              <line x1="15" y1="90" x2="105" y2="90" stroke="#0f172a" strokeWidth="3" />
              <text x="60" y="75" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                CRUDE OIL
              </text>
            </g>
          </svg>
        );

      case 'turtle-treasure':
      case 'positional':
        // Ascending stair steps drawn by business strategist, reaching milestone flags (like screenshot card 6)
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="suitBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#suitBg)" />
            {/* Executive Suit Silhouette on left */}
            <path
              d="M -30,240 L 40,90 L 110,120 L 150,90 L 220,240 Z"
              fill="#090d16"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* White shirt collar & red tie */}
            <polygon points="105,120 125,160 145,120 125,115" fill="#f8fafc" />
            <polygon points="120,135 130,135 134,195 125,215 116,195" fill="#ef4444" />
            {/* Hand holding chalk/marker drawing ascending stairs */}
            <g transform="translate(180, 50)">
              {/* Chalk Drawn Staircase */}
              <path
                d="M 10,150 L 50,150 L 50,115 L 100,115 L 100,80 L 150,80 L 150,45 L 190,45"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrow and Success Marker */}
              <path d="M 190,45 L 210,45 L 200,35" stroke="#38bdf8" strokeWidth="4" fill="none" strokeLinecap="round" />
              <text x="110" y="25" fill="#38bdf8" fontSize="13" fontFamily="sans-serif" fontWeight="900">
                SWING SWING →
              </text>
            </g>
          </svg>
        );

      case 'intraday':
        // High-velocity momentum candle bursts, speed gauges, lightning breakouts
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="intraBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e1022" />
                <stop offset="50%" stopColor="#0d1b2a" />
                <stop offset="100%" stopColor="#051412" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#intraBg)" />
            {/* Speed vectors */}
            {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x, i) => (
              <line
                key={`sp-${i}`}
                x1={x}
                y1="240"
                x2={x + 35}
                y2="0"
                stroke="#10b981"
                strokeWidth={i % 2 === 0 ? '1' : '0.5'}
                opacity={0.15 + (i / 10) * 0.25}
              />
            ))}
            {/* Ascending candlesticks */}
            {[
              { x: 50, o: 170, c: 150, h: 140, l: 180, g: true },
              { x: 90, o: 155, c: 130, h: 120, l: 160, g: true },
              { x: 130, o: 135, c: 145, h: 125, l: 150, g: false },
              { x: 170, o: 140, c: 105, h: 95, l: 145, g: true },
              { x: 210, o: 110, c: 80, h: 70, l: 115, g: true },
              { x: 250, o: 85, c: 95, h: 75, l: 100, g: false },
              { x: 290, o: 90, c: 50, h: 40, l: 95, g: true },
              { x: 330, o: 55, c: 25, h: 15, l: 60, g: true }
            ].map((cd, idx) => (
              <g key={`cd-${idx}`}>
                <line x1={cd.x} y1={cd.h} x2={cd.x} y2={cd.l} stroke={cd.g ? '#10b981' : '#f43f5e'} strokeWidth="1.5" />
                <rect
                  x={cd.x - 7}
                  y={Math.min(cd.o, cd.c)}
                  width="14"
                  height={Math.max(6, Math.abs(cd.c - cd.o))}
                  fill={cd.g ? '#10b981' : '#f43f5e'}
                  rx="1"
                />
              </g>
            ))}
          </svg>
        );

      default:
        // Generic Institutional Wealth & Equity Compounder
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="defBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#defBg)" />
            {/* Grid & Chart */}
            <path
              d="M 20,200 L 90,160 L 150,180 L 220,120 L 290,135 L 370,40"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="370" cy="40" r="7" fill="#10b981" />
            <circle cx="370" cy="40" r="14" fill="#10b981" opacity="0.3" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden group select-none ${className}`}>
      {/* Background Visual Graphic with smooth zoom on hover */}
      <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
        {renderVisualArtwork()}
      </div>

      {/* Subtle vignette shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />

      {/* Distinctive Frosted Glass Horizontal Center Banner (matching the user's uploaded reference screenshot) */}
      {showOverlayTitle && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/75 dark:bg-slate-900/80 backdrop-blur-md py-2.5 px-4 text-center border-y border-white/30 dark:border-slate-700/50 shadow-md">
          <span className="text-slate-900 dark:text-slate-100 font-extrabold tracking-[0.2em] uppercase font-display text-sm sm:text-base drop-shadow-xs">
            {title}
          </span>
        </div>
      )}
    </div>
  );
};
