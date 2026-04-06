'use client';

import { useState } from 'react';

// ============ TREASURY DATA ============
const treasuryData = [
  { date: '2/2026', send: 208879479, cc: 62113382, cusd: 185000, usdcx: 165000, usdc: 3200000, pol: 2128330, fiat: 34963, eth: 0, isLatest: true },
  { date: '1/2026', send: 212705811, cc: 64819991, cusd: 0, usdcx: 0, usdc: 2837000, pol: 949000, fiat: 183409, eth: 0 },
  { date: '12/2025', send: 214371974, cc: 55312796, cusd: 2752008, usdcx: 0, usdc: 36049.98, pol: 790976, fiat: 20783.78, eth: 0 },
  { date: '11/2025', send: 215761675, cc: 31402896, cusd: 2225640, usdcx: 0, usdc: 506813.95, pol: 1199746, fiat: 62488.28, eth: 0 },
  { date: '10/2025', send: 208017123, cc: 5900000, cusd: 5000, usdcx: 0, usdc: 28432, pol: 1132537, fiat: 142835.65, eth: 0 },
  { date: '9/2025', send: 204768175, cc: 300000, cusd: 100000, usdcx: 0, usdc: 124962, pol: 283000, fiat: 120203.75, eth: 0 },
  { date: '8/2025', send: 207586872, cc: 300000, cusd: 0, usdcx: 0, usdc: 3317, pol: 187000, fiat: 1008.14, eth: 0 },
  { date: '7/2025', send: 208047690, cc: 250000, cusd: 0, usdcx: 0, usdc: 3177, pol: 187000, fiat: 3006.96, eth: 0 },
  { date: '6/2025', send: 208612155, cc: 1062920, cusd: 0, usdcx: 0, usdc: 32405, pol: 176000, fiat: 9953.74, eth: 0 },
  { date: '5/2025', send: 209215508, cc: 0, cusd: 0, usdcx: 0, usdc: 36127, pol: 192000, fiat: 445.13, eth: 0 },
  { date: '4/2025', send: 197633733, cc: 0, cusd: 0, usdcx: 0, usdc: 15059, pol: 325000, fiat: 2742.66, eth: 0 },
  { date: '3/2025', send: 198183422, cc: 0, cusd: 0, usdcx: 0, usdc: 25364, pol: 340000, fiat: 4117.16, eth: 0 },
  { date: '2/2025', send: 199278650, cc: 0, cusd: 0, usdcx: 0, usdc: 76454, pol: 400000, fiat: 6743.21, eth: 0 },
  { date: '1/2025', send: 200000000, cc: 0, cusd: 0, usdcx: 0, usdc: 84452, pol: 0, fiat: 2306.94, eth: 1.21 },
  { date: '12/2024', send: 200735941, cc: 0, cusd: 0, usdcx: 0, usdc: 4496, pol: 0, fiat: 4457.07, eth: 3.53 },
  { date: '11/2024', send: 198370253, cc: 0, cusd: 0, usdcx: 0, usdc: 31927, pol: 0, fiat: 2447.68, eth: 0 },
  { date: '10/2024', send: 194993853, cc: 0, cusd: 0, usdcx: 0, usdc: 22122, pol: 0, fiat: 10743.50, eth: 0 },
  { date: '9/2024', send: 188158506, cc: 0, cusd: 0, usdcx: 0, usdc: 5237, pol: 0, fiat: 3090.93, eth: 1.18 },
  { date: '8/2024', send: 188264852, cc: 0, cusd: 0, usdcx: 0, usdc: 19833, pol: 0, fiat: 3594.71, eth: 11.24 },
  { date: '7/2024', send: 188291500, cc: 0, cusd: 0, usdcx: 0, usdc: 63955, pol: 0, fiat: 10712.49, eth: 10.75 },
  { date: '6/2024', send: 188637562, cc: 0, cusd: 0, usdcx: 0, usdc: 133444, pol: 0, fiat: 2854.24, eth: 12.14 },
  { date: '5/2024', send: 192435807, cc: 0, cusd: 0, usdcx: 0, usdc: 8271, pol: 0, fiat: 13209.79, eth: 4.49 },
  { date: '4/2024', send: 193601786, cc: 0, cusd: 0, usdcx: 0, usdc: 56056, pol: 0, fiat: 19898.67, eth: 11.94 },
  { date: '3/2024', send: 193133959, cc: 0, cusd: 0, usdcx: 0, usdc: 108831, pol: 0, fiat: 2760.79, eth: 3.05 },
  { date: '2/2024', send: 186850340, cc: 0, cusd: 0, usdcx: 0, usdc: 4729, pol: 0, fiat: 846.19, eth: 6.38 },
  { date: '1/2024', send: 186369603, cc: 0, cusd: 0, usdcx: 0, usdc: 170, pol: 0, fiat: 7838.94, eth: 1.25 },
  { date: '12/2023', send: 186255465, cc: 0, cusd: 0, usdcx: 0, usdc: 24794, pol: 0, fiat: 11161.41, eth: 1.48 },
  { date: '11/2023', send: 188071891, cc: 0, cusd: 0, usdcx: 0, usdc: 4616, pol: 0, fiat: 9338.04, eth: 25.95 },
  { date: '10/2023', send: 199279218, cc: 0, cusd: 0, usdcx: 0, usdc: 5921, pol: 0, fiat: 13204.87, eth: 32.94 },
  { date: '9/2023', send: 199059767, cc: 0, cusd: 0, usdcx: 0, usdc: 14600, pol: 0, fiat: 15041.81, eth: 42.32 },
  { date: '8/2023', send: 200686621, cc: 0, cusd: 0, usdcx: 0, usdc: 14568, pol: 0, fiat: 0, eth: 7.08 },
];

const currentHoldings = treasuryData[0];

// Token prices (updated monthly alongside treasury data)
const tokenPrices = {
  send: 0.025,   // SEND price in USD
  cc: 0.16,      // Canton Coin price in USD
};

// Asset definitions with Send brand colors and colored left-border styling
const assets = [
  { key: 'send', label: 'SEND', color: '#40FB50' },
  { key: 'cc', label: 'Canton Coin', color: '#1a8a2e' },
  { key: 'cusd', label: 'CUSD', color: '#122023' },
  { key: 'usdcx', label: 'USDCx', color: '#2aaa3e' },
  { key: 'usdc', label: 'USDC', color: '#1a8a2e' },
  { key: 'pol', label: 'POL', color: '#4a5c5f' },
  { key: 'fiat', label: 'Fiat Bank', color: '#6b7c7f' },
];

// ============ UTILITY FUNCTIONS ============
function formatNumber(value: number): string {
  if (value === 0) return '—';
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatCurrency(value: number): string {
  if (value === 0) return '—';
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

// ============ STABLECOIN CHART ============
function StablecoinChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const recentData = treasuryData.slice(0, 12).reverse();
  const width = 520;
  const height = 200;
  const padding = { top: 30, right: 20, bottom: 40, left: 55 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Add Aerodrome USDC (polStablecoins) to the latest month's USDC bar
  const polStablecoins = 782845;
  const stablecoinData = recentData.map(d => {
    const extraUsdc = d.isLatest ? polStablecoins : 0;
    return {
      date: d.date,
      cusd: d.cusd,
      usdcx: d.usdcx,
      usdc: d.usdc + extraUsdc,
      total: d.cusd + d.usdcx + d.usdc + extraUsdc,
    };
  });

  const maxValue = Math.max(...stablecoinData.map(d => d.total));
  const barWidth = (innerWidth / stablecoinData.length) - 6;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* Y-axis labels and grid */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = padding.top + innerHeight * (1 - ratio);
        const value = maxValue * ratio;
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke={ratio === 0 ? '#E0E0E0' : '#F0F0F0'}
              strokeDasharray={ratio === 0 ? '0' : '3,3'}
            />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#888" fontFamily='"DM Mono", monospace'>
              ${(value / 1000000).toFixed(1)}M
            </text>
          </g>
        );
      })}

      {/* Stacked bars */}
      {stablecoinData.map((d, i) => {
        const x = padding.left + i * (innerWidth / stablecoinData.length) + 3;
        const totalHeight = maxValue > 0 ? (d.total / maxValue) * innerHeight : 0;
        const cusdHeight = maxValue > 0 ? (d.cusd / maxValue) * innerHeight : 0;
        const usdcxHeight = maxValue > 0 ? (d.usdcx / maxValue) * innerHeight : 0;
        const usdcHeight = maxValue > 0 ? (d.usdc / maxValue) * innerHeight : 0;

        const [month] = d.date.split('/');
        const monthLabel = monthNames[parseInt(month) - 1];

        let yOffset = padding.top + innerHeight;

        return (
          <g key={d.date} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} style={{ cursor: 'pointer' }}>
            {/* Invisible hit area */}
            <rect x={x} y={padding.top} width={barWidth} height={innerHeight} fill="transparent" />
            {/* CUSD - bottom */}
            <rect
              x={x}
              y={yOffset - cusdHeight}
              width={barWidth}
              height={cusdHeight}
              fill="#122023"
              rx="3"
              opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.4 : 1}
            />
            {/* USDCx - middle */}
            <rect
              x={x}
              y={yOffset - cusdHeight - usdcxHeight}
              width={barWidth}
              height={usdcxHeight}
              fill="#2aaa3e"
              opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.4 : 1}
            />
            {/* USDC - top */}
            <rect
              x={x}
              y={yOffset - cusdHeight - usdcxHeight - usdcHeight}
              width={barWidth}
              height={usdcHeight}
              fill="#1a8a2e"
              rx="3"
              opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.4 : 1}
            />

            {/* Tooltip */}
            {hoveredIndex === i && totalHeight > 0 && (
              <g>
                <rect
                  x={Math.min(x + barWidth / 2 - 50, width - 120)}
                  y={yOffset - totalHeight - 50}
                  width="100"
                  height="32"
                  rx="6"
                  fill="#122023"
                />
                <text
                  x={Math.min(x + barWidth / 2, width - 70)}
                  y={yOffset - totalHeight - 30}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#FFF"
                  fontFamily='"DM Mono", monospace'
                >
                  {formatCurrency(d.total)}
                </text>
              </g>
            )}

            {/* Month label */}
            <text
              x={x + barWidth / 2}
              y={height - 12}
              textAnchor="middle"
              fontSize="10"
              fill={hoveredIndex === i ? '#122023' : '#666'}
              fontWeight={hoveredIndex === i ? 600 : 400}
              fontFamily='"DM Mono", monospace'
            >
              {monthLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ CANTON COIN HOLDINGS CHART ============
function CantonCoinChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const recentData = treasuryData.slice(0, 12).reverse();
  const width = 520;
  const height = 220;
  const padding = { top: 30, right: 20, bottom: 40, left: 55 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxCC = Math.max(...recentData.map(d => d.cc));
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const barWidth = (innerWidth / recentData.length) - 6;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* Y-axis labels and grid */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = padding.top + innerHeight * (1 - ratio);
        const value = maxCC * ratio;
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke={ratio === 0 ? '#E0E0E0' : '#F0F0F0'}
              strokeDasharray={ratio === 0 ? '0' : '3,3'}
            />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#888" fontFamily='"DM Mono", monospace'>
              {(value / 1000000).toFixed(0)}M
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {recentData.map((d, i) => {
        const x = padding.left + i * (innerWidth / recentData.length) + 3;
        const barHeight = maxCC > 0 ? (d.cc / maxCC) * innerHeight : 0;
        const isLatest = i === recentData.length - 1;

        const [month] = d.date.split('/');
        const monthLabel = monthNames[parseInt(month) - 1];

        return (
          <g key={d.date} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} style={{ cursor: 'pointer' }}>
            {/* Invisible hit area */}
            <rect x={x} y={padding.top} width={barWidth} height={innerHeight} fill="transparent" />
            <rect
              x={x}
              y={padding.top + innerHeight - barHeight}
              width={barWidth}
              height={barHeight}
              fill={hoveredIndex === i ? '#1a8a2e' : (isLatest ? '#1a8a2e' : '#2aaa3e')}
              rx="4"
              opacity={hoveredIndex !== null && hoveredIndex !== i ? 0.4 : 1}
            />

            {/* Tooltip */}
            {hoveredIndex === i && barHeight > 0 && (
              <g>
                <rect
                  x={Math.min(x + barWidth / 2 - 50, width - 120)}
                  y={padding.top + innerHeight - barHeight - 42}
                  width="100"
                  height="32"
                  rx="6"
                  fill="#122023"
                />
                <text
                  x={Math.min(x + barWidth / 2, width - 70)}
                  y={padding.top + innerHeight - barHeight - 22}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#FFF"
                  fontFamily='"DM Mono", monospace'
                >
                  {formatNumber(d.cc)}
                </text>
              </g>
            )}

            {/* Month label */}
            <text
              x={x + barWidth / 2}
              y={height - 12}
              textAnchor="middle"
              fontSize="10"
              fill={hoveredIndex === i ? '#122023' : '#666'}
              fontWeight={hoveredIndex === i ? 600 : 400}
              fontFamily='"DM Mono", monospace'
            >
              {monthLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ SEND HOLDINGS CHART ============
function SendHoldingsChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const recentData = treasuryData.slice(0, 12).reverse();
  const width = 520;
  const height = 200;
  const padding = { top: 30, right: 20, bottom: 40, left: 55 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxSend = Math.max(...recentData.map(d => d.send));
  const minSend = Math.min(...recentData.map(d => d.send));
  const range = maxSend - minSend;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const points = recentData.map((d, i) => {
    const x = padding.left + (i / (recentData.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((d.send - minSend) / range) * innerHeight;
    return { x, y, data: d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="sendGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#40FB50" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#40FB50" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Y-axis labels and grid */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = padding.top + innerHeight * (1 - ratio);
        const value = minSend + range * ratio;
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke={ratio === 0 ? '#E0E0E0' : '#F0F0F0'}
              strokeDasharray={ratio === 0 ? '0' : '3,3'}
            />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#888" fontFamily='"DM Mono", monospace'>
              {(value / 1000000).toFixed(0)}M
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={areaPath} fill="url(#sendGradient)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#40FB50"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hover vertical line */}
      {hoveredIndex !== null && (
        <line
          x1={points[hoveredIndex].x}
          y1={padding.top}
          x2={points[hoveredIndex].x}
          y2={padding.top + innerHeight}
          stroke="#40FB50"
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.5"
        />
      )}

      {/* Data points */}
      {points.map((p, i) => {
        const isLatest = i === points.length - 1;
        const isHovered = hoveredIndex === i;
        const [month] = p.data.date.split('/');
        const monthLabel = monthNames[parseInt(month) - 1];

        return (
          <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} style={{ cursor: 'pointer' }}>
            {/* Invisible hit area */}
            <rect
              x={p.x - (innerWidth / recentData.length) / 2}
              y={padding.top}
              width={innerWidth / recentData.length}
              height={innerHeight}
              fill="transparent"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={isHovered ? 7 : (isLatest ? 6 : 4)}
              fill={isHovered || isLatest ? '#40FB50' : '#FFF'}
              stroke="#40FB50"
              strokeWidth="2"
            />
            {(isLatest || isHovered) && (
              <circle
                cx={p.x}
                cy={p.y}
                r="12"
                fill="none"
                stroke="#40FB50"
                strokeWidth="2"
                opacity="0.3"
              />
            )}

            {/* Tooltip */}
            {isHovered && (
              <g>
                <rect
                  x={Math.max(padding.left, Math.min(p.x - 50, width - padding.right - 100))}
                  y={p.y - 42}
                  width="100"
                  height="32"
                  rx="6"
                  fill="#122023"
                />
                <text
                  x={Math.max(padding.left + 50, Math.min(p.x, width - padding.right - 50))}
                  y={p.y - 22}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#FFF"
                  fontFamily='"DM Mono", monospace'
                >
                  {formatNumber(p.data.send)}
                </text>
              </g>
            )}

            {/* Month label */}
            <text
              x={p.x}
              y={height - 12}
              textAnchor="middle"
              fontSize="10"
              fill={isHovered ? '#122023' : '#666'}
              fontWeight={isHovered ? 600 : 400}
              fontFamily='"DM Mono", monospace'
            >
              {monthLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ MAIN COMPONENT ============
export default function Treasury() {
  const [showAllData, setShowAllData] = useState(false);
  const displayData = showAllData ? treasuryData : treasuryData.slice(0, 12);

  // Stablecoins includes wallet holdings + stablecoin side of LP positions (Aerodrome USDC: 782,845)
  const polStablecoins = 782845;
  const totalStablecoins = currentHoldings.cusd + currentHoldings.usdcx + currentHoldings.usdc + currentHoldings.fiat + polStablecoins;

  // Total treasury value (tokens at market price + stablecoins + POL)
  const sendValue = currentHoldings.send * tokenPrices.send;
  const ccValue = currentHoldings.cc * tokenPrices.cc;
  const stablecoinValue = currentHoldings.cusd + currentHoldings.usdcx + currentHoldings.usdc + currentHoldings.fiat;
  const totalTreasuryValue = sendValue + ccValue + stablecoinValue + currentHoldings.pol;

  const thStyle = { textAlign: 'right' as const, padding: '10px 12px', fontSize: '10px', fontWeight: 600, color: '#999', textTransform: 'uppercase' as const, letterSpacing: '1px', borderBottom: '2px solid #E0E0E0', fontFamily: '"DM Mono", monospace' };
  const tdStyle = { padding: '12px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right' as const, color: '#122023', fontFamily: '"DM Mono", monospace', fontSize: '13px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO: Bento grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gridTemplateRows: 'auto auto', gap: '2px', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Total value — large cell */}
        <div style={{
          gridRow: '1 / 3',
          background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 60%, #1e4a4f 100%)',
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '200px',
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#40FB50', marginBottom: '6px' }}>
              Total Treasury Value
            </div>
            <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6 }}>
              As of 3/1 · SEND @ ${tokenPrices.send} · CC @ ${tokenPrices.cc}
            </div>
          </div>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '48px', fontWeight: 700, color: '#FFF', letterSpacing: '-2px', lineHeight: 1 }}>
            {formatCurrency(totalTreasuryValue)}
          </div>
        </div>

        {/* SEND value */}
        <div style={{ background: '#171f22', padding: '20px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>SEND</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#40FB50' }}>{formatCurrency(sendValue)}</div>
          </div>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '22px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.5px' }}>
            {formatNumber(currentHoldings.send)}
          </div>
        </div>

        {/* CC + Stablecoins + POL */}
        <div style={{ background: '#171f22', padding: '20px 28px', display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#4a5c5f', marginBottom: '4px' }}>CC</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '16px', fontWeight: 700, color: '#FFF' }}>{formatCurrency(ccValue)}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#4a5c5f', marginBottom: '4px' }}>Stablecoins</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '16px', fontWeight: 700, color: '#FFF' }}>{formatCurrency(totalStablecoins)}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#4a5c5f', marginBottom: '4px' }}>POL</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '16px', fontWeight: 700, color: '#FFF' }}>{formatCurrency(currentHoldings.pol - polStablecoins)}</div>
          </div>
        </div>
      </div>

      {/* ── HOLDINGS BREAKDOWN ── */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '16px' }}>
          Current Holdings
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          {assets.map((asset) => {
            const value = currentHoldings[asset.key as keyof typeof currentHoldings] as number;
            const isCurrency = ['usdcx', 'usdc', 'pol', 'fiat'].includes(asset.key);
            return (
              <div key={asset.key} style={{
                padding: '14px',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
                borderLeft: `3px solid ${asset.color}`,
              }}>
                <div style={{ fontSize: '11px', color: '#999', fontWeight: 500, marginBottom: '6px' }}>{asset.label}</div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '16px', fontWeight: 700, color: '#122023' }}>
                  {isCurrency ? formatCurrency(value) : formatNumber(value)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CHARTS: 2-column grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Stablecoin Chart */}
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '4px' }}>
            Stablecoin Position
          </div>
          <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '16px' }}>CUSD + USDCx + USDC · 12 months</div>
          <StablecoinChart />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            {[
              { label: 'CUSD', color: '#122023' },
              { label: 'USDCx', color: '#2aaa3e' },
              { label: 'USDC', color: '#1a8a2e' },
            ].map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: l.color }} />
                <span style={{ fontSize: '11px', color: '#888', fontFamily: '"DM Mono", monospace' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Canton Coin Chart */}
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '4px' }}>
            Canton Coin Holdings
          </div>
          <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '16px' }}>12-month trend</div>
          <CantonCoinChart />
        </div>
      </div>

      {/* SEND Holdings Chart — full width */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '4px' }}>
          SEND Holdings
        </div>
        <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '16px' }}>12-month trend</div>
        <SendHoldingsChart />
      </div>

      {/* ── HISTORICAL TABLE ── */}
      <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>Historical Holdings</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Monthly treasury snapshots</div>
          </div>
          <button
            onClick={() => setShowAllData(!showAllData)}
            style={{
              backgroundColor: '#fafafa',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              color: '#122023',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 500,
              fontFamily: '"DM Mono", monospace',
            }}
          >
            {showAllData ? 'Show Less' : 'Show All'}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ transform: showAllData ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: 'left' }}>Date</th>
                <th style={thStyle}>SEND</th>
                <th style={thStyle}>CC</th>
                <th style={thStyle}>CUSD</th>
                <th style={thStyle}>USDCx</th>
                <th style={thStyle}>USDC</th>
                <th style={thStyle}>POL</th>
                <th style={thStyle}>Fiat</th>
                <th style={thStyle}>ETH</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, ri) => (
                <tr key={row.date} style={{ background: row.isLatest ? '#122023' : (ri % 2 === 0 ? '#fafafa' : '#FFF') }}>
                  <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 600, color: row.isLatest ? '#40FB50' : '#122023' }}>
                    {row.date}
                    {row.isLatest && (
                      <span style={{ fontSize: '9px', fontWeight: 700, marginLeft: '8px', color: '#40FB50', letterSpacing: '1px' }}>LATEST</span>
                    )}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 600, color: row.isLatest ? '#FFF' : '#122023' }}>{formatNumber(row.send)}</td>
                  <td style={{ ...tdStyle, color: row.isLatest ? '#FFF' : '#122023' }}>{formatNumber(row.cc)}</td>
                  <td style={{ ...tdStyle, color: row.isLatest ? '#FFF' : '#122023' }}>{formatNumber(row.cusd)}</td>
                  <td style={{ ...tdStyle, color: row.isLatest ? '#FFF' : '#122023' }}>{formatCurrency(row.usdcx)}</td>
                  <td style={{ ...tdStyle, color: row.isLatest ? '#FFF' : '#122023' }}>{formatCurrency(row.usdc)}</td>
                  <td style={{ ...tdStyle, color: row.isLatest ? '#FFF' : '#122023' }}>{formatCurrency(row.pol)}</td>
                  <td style={{ ...tdStyle, color: row.isLatest ? '#FFF' : '#122023' }}>{formatCurrency(row.fiat)}</td>
                  <td style={{ ...tdStyle, color: row.isLatest ? '#6b7c7f' : '#888' }}>{row.eth > 0 ? row.eth.toFixed(2) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div style={{ fontSize: '11px', color: '#999', lineHeight: 1.6, padding: '0 4px', fontFamily: '"DM Mono", monospace' }}>
        Treasury balances are updated on the 1st of every month. All values reflect on-chain and off-chain holdings.
      </div>
    </div>
  );
}
