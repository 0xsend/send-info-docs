'use client';

import { useState } from 'react';

// ============ TREASURY DATA ============
const treasuryData = [
  { date: '1/2026', send: 212705811, cc: 64819991, cusd: 0, usdc: 2837000, pol: 949000, fiat: 183409, eth: 0, isLatest: true },
  { date: '12/2025', send: 214371974, cc: 55312796, cusd: 2752008, usdc: 36049.98, pol: 790976, fiat: 20783.78, eth: 0 },
  { date: '11/2025', send: 215761675, cc: 31402896, cusd: 2225640, usdc: 506813.95, pol: 1199746, fiat: 62488.28, eth: 0 },
  { date: '10/2025', send: 208017123, cc: 5900000, cusd: 5000, usdc: 28432, pol: 1132537, fiat: 142835.65, eth: 0 },
  { date: '9/2025', send: 204768175, cc: 300000, cusd: 100000, usdc: 124962, pol: 283000, fiat: 120203.75, eth: 0 },
  { date: '8/2025', send: 207586872, cc: 300000, cusd: 0, usdc: 3317, pol: 187000, fiat: 1008.14, eth: 0 },
  { date: '7/2025', send: 208047690, cc: 250000, cusd: 0, usdc: 3177, pol: 187000, fiat: 3006.96, eth: 0 },
  { date: '6/2025', send: 208612155, cc: 1062920, cusd: 0, usdc: 32405, pol: 176000, fiat: 9953.74, eth: 0 },
  { date: '5/2025', send: 209215508, cc: 0, cusd: 0, usdc: 36127, pol: 192000, fiat: 445.13, eth: 0 },
  { date: '4/2025', send: 197633733, cc: 0, cusd: 0, usdc: 15059, pol: 325000, fiat: 2742.66, eth: 0 },
  { date: '3/2025', send: 198183422, cc: 0, cusd: 0, usdc: 25364, pol: 340000, fiat: 4117.16, eth: 0 },
  { date: '2/2025', send: 199278650, cc: 0, cusd: 0, usdc: 76454, pol: 400000, fiat: 6743.21, eth: 0 },
  { date: '1/2025', send: 200000000, cc: 0, cusd: 0, usdc: 84452, pol: 0, fiat: 2306.94, eth: 1.21 },
  { date: '12/2024', send: 200735941, cc: 0, cusd: 0, usdc: 4496, pol: 0, fiat: 4457.07, eth: 3.53 },
  { date: '11/2024', send: 198370253, cc: 0, cusd: 0, usdc: 31927, pol: 0, fiat: 2447.68, eth: 0 },
  { date: '10/2024', send: 194993853, cc: 0, cusd: 0, usdc: 22122, pol: 0, fiat: 10743.50, eth: 0 },
  { date: '9/2024', send: 188158506, cc: 0, cusd: 0, usdc: 5237, pol: 0, fiat: 3090.93, eth: 1.18 },
  { date: '8/2024', send: 188264852, cc: 0, cusd: 0, usdc: 19833, pol: 0, fiat: 3594.71, eth: 11.24 },
  { date: '7/2024', send: 188291500, cc: 0, cusd: 0, usdc: 63955, pol: 0, fiat: 10712.49, eth: 10.75 },
  { date: '6/2024', send: 188637562, cc: 0, cusd: 0, usdc: 133444, pol: 0, fiat: 2854.24, eth: 12.14 },
  { date: '5/2024', send: 192435807, cc: 0, cusd: 0, usdc: 8271, pol: 0, fiat: 13209.79, eth: 4.49 },
  { date: '4/2024', send: 193601786, cc: 0, cusd: 0, usdc: 56056, pol: 0, fiat: 19898.67, eth: 11.94 },
  { date: '3/2024', send: 193133959, cc: 0, cusd: 0, usdc: 108831, pol: 0, fiat: 2760.79, eth: 3.05 },
  { date: '2/2024', send: 186850340, cc: 0, cusd: 0, usdc: 4729, pol: 0, fiat: 846.19, eth: 6.38 },
  { date: '1/2024', send: 186369603, cc: 0, cusd: 0, usdc: 170, pol: 0, fiat: 7838.94, eth: 1.25 },
  { date: '12/2023', send: 186255465, cc: 0, cusd: 0, usdc: 24794, pol: 0, fiat: 11161.41, eth: 1.48 },
  { date: '11/2023', send: 188071891, cc: 0, cusd: 0, usdc: 4616, pol: 0, fiat: 9338.04, eth: 25.95 },
  { date: '10/2023', send: 199279218, cc: 0, cusd: 0, usdc: 5921, pol: 0, fiat: 13204.87, eth: 32.94 },
  { date: '9/2023', send: 199059767, cc: 0, cusd: 0, usdc: 14600, pol: 0, fiat: 15041.81, eth: 42.32 },
  { date: '8/2023', send: 200686621, cc: 0, cusd: 0, usdc: 14568, pol: 0, fiat: 0, eth: 7.08 },
];

const currentHoldings = treasuryData[0];

// Asset definitions with colors and icons
const assets = [
  { key: 'send', label: 'SEND', icon: '💎', color: '#40FB50', bgColor: '#E8FDE9' },
  { key: 'cc', label: 'Canton Coin', icon: '🪙', color: '#FF9800', bgColor: '#FFF3E0' },
  { key: 'cusd', label: 'CUSD', icon: '💵', color: '#2196F3', bgColor: '#E3F2FD' },
  { key: 'usdc', label: 'USDC', icon: '💲', color: '#2775CA', bgColor: '#E8F4FD' },
  { key: 'pol', label: 'POL', icon: '🔷', color: '#7C4DFF', bgColor: '#EDE7F6' },
  { key: 'fiat', label: 'Fiat Bank', icon: '🏦', color: '#607D8B', bgColor: '#ECEFF1' },
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
  const recentData = treasuryData.slice(0, 12).reverse();
  const width = 520;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 40, left: 55 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const stablecoinData = recentData.map(d => ({
    date: d.date,
    cusd: d.cusd,
    usdc: d.usdc,
    pol: d.pol,
    total: d.cusd + d.usdc + d.pol,
  }));

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
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#888">
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
        const usdcHeight = maxValue > 0 ? (d.usdc / maxValue) * innerHeight : 0;
        const polHeight = maxValue > 0 ? (d.pol / maxValue) * innerHeight : 0;
        const isLatest = i === stablecoinData.length - 1;

        const [month] = d.date.split('/');
        const monthLabel = monthNames[parseInt(month) - 1];

        let yOffset = padding.top + innerHeight;

        return (
          <g key={d.date}>
            {/* CUSD - bottom */}
            <rect
              x={x}
              y={yOffset - cusdHeight}
              width={barWidth}
              height={cusdHeight}
              fill="#2196F3"
              rx="3"
            />
            {/* USDC - middle */}
            <rect
              x={x}
              y={yOffset - cusdHeight - usdcHeight}
              width={barWidth}
              height={usdcHeight}
              fill="#2775CA"
            />
            {/* POL - top */}
            <rect
              x={x}
              y={yOffset - cusdHeight - usdcHeight - polHeight}
              width={barWidth}
              height={polHeight}
              fill="#7C4DFF"
              rx="3"
            />

            {/* Latest indicator */}
            {isLatest && totalHeight > 0 && (
              <circle
                cx={x + barWidth / 2}
                cy={yOffset - totalHeight - 10}
                r="6"
                fill="#10B981"
              />
            )}

            {/* Month label */}
            <text
              x={x + barWidth / 2}
              y={height - 12}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
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
  const recentData = treasuryData.slice(0, 12).reverse();
  const width = 520;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 55 };
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
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#888">
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
          <g key={d.date}>
            <rect
              x={x}
              y={padding.top + innerHeight - barHeight}
              width={barWidth}
              height={barHeight}
              fill={isLatest ? '#FF9800' : '#FFB74D'}
              rx="4"
            />
            {/* Latest indicator */}
            {isLatest && barHeight > 0 && (
              <circle
                cx={x + barWidth / 2}
                cy={padding.top + innerHeight - barHeight - 12}
                r="8"
                fill="#FF9800"
                stroke="#FFF"
                strokeWidth="2"
              />
            )}
            {/* Month label */}
            <text
              x={x + barWidth / 2}
              y={height - 12}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
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
  const recentData = treasuryData.slice(0, 12).reverse();
  const width = 520;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 40, left: 55 };
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
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#888">
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

      {/* Data points */}
      {points.map((p, i) => {
        const isLatest = i === points.length - 1;
        const [month] = p.data.date.split('/');
        const monthLabel = monthNames[parseInt(month) - 1];

        return (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isLatest ? 6 : 4}
              fill={isLatest ? '#40FB50' : '#FFF'}
              stroke="#40FB50"
              strokeWidth="2"
            />
            {isLatest && (
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
            {/* Month label */}
            <text
              x={p.x}
              y={height - 12}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
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

  const totalStablecoins = currentHoldings.cusd + currentHoldings.usdc + currentHoldings.pol + currentHoldings.fiat;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '8px 0' }}>
      {/* Info Callout */}
      <div style={{
        backgroundColor: '#E8F4FD',
        border: '1px solid #B8DAFF',
        borderRadius: '8px',
        padding: '14px 18px',
        fontSize: '14px',
        color: '#004085',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        lineHeight: 1.5,
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
          <circle cx="10" cy="10" r="9" stroke="#004085" strokeWidth="2"/>
          <path d="M10 9V14M10 6V7" stroke="#004085" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>Treasury balances are updated on the <strong>1st of every month</strong>. All values reflect on-chain and off-chain holdings.</span>
      </div>

      {/* Main Holdings Cards - All on same row, equal size */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {/* Stablecoin Holdings */}
        <div style={{
          backgroundColor: '#E3F2FD',
          borderRadius: '12px',
          padding: '20px',
          border: '2px solid #2196F3',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#2196F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💵</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>Stablecoins</div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>{formatCurrency(totalStablecoins)}</div>
          <div style={{ fontSize: '10px', color: '#666' }}>CUSD + USDC + POL + Fiat</div>
        </div>

        {/* Canton Coin */}
        <div style={{
          backgroundColor: '#FFF3E0',
          borderRadius: '12px',
          padding: '20px',
          border: '2px solid #FF9800',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FF9800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🪙</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>Canton Coin</div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>{formatNumber(currentHoldings.cc)}</div>
          <div style={{ fontSize: '10px', color: '#666' }}>Partner token holdings</div>
        </div>

        {/* SEND Holdings */}
        <div style={{
          backgroundColor: '#E8FDE9',
          borderRadius: '12px',
          padding: '20px',
          border: '2px solid #40FB50',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#40FB50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>💎</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>SEND Token</div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>{formatNumber(currentHoldings.send)}</div>
          <div style={{ fontSize: '10px', color: '#666' }}>21.3% of total supply</div>
        </div>
      </div>

      {/* Asset Breakdown */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '20px' }}>Current Holdings Breakdown</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          {assets.map((asset) => {
            const value = currentHoldings[asset.key as keyof typeof currentHoldings] as number;
            const isCurrency = ['usdc', 'pol', 'fiat'].includes(asset.key);
            return (
              <div key={asset.key} style={{
                padding: '16px',
                backgroundColor: '#FAFAFA',
                borderRadius: '10px',
                borderLeft: `4px solid ${asset.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px' }}>{asset.icon}</span>
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>{asset.label}</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#122023' }}>
                  {isCurrency ? formatCurrency(value) : formatNumber(value)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stablecoin Chart */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💵</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#122023' }}>Stablecoin Position</div>
        </div>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>CUSD + USDC + POL over 12 months</div>
        <StablecoinChart />
        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#2196F3' }} />
            <span style={{ fontSize: '13px', color: '#666' }}>CUSD</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#2775CA' }} />
            <span style={{ fontSize: '13px', color: '#666' }}>USDC</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#7C4DFF' }} />
            <span style={{ fontSize: '13px', color: '#666' }}>POL</span>
          </div>
        </div>
      </div>

      {/* Canton Coin Chart */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🪙</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#122023' }}>Canton Coin Holdings</div>
        </div>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>12-month trend</div>
        <CantonCoinChart />
      </div>

      {/* SEND Holdings Chart */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#E8FDE9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💎</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#122023' }}>SEND Holdings</div>
        </div>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>12-month trend</div>
        <SendHoldingsChart />
      </div>

      {/* Historical Data Table */}
      <div style={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023' }}>Historical Holdings</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Monthly treasury snapshots</div>
          </div>
          <button
            onClick={() => setShowAllData(!showAllData)}
            style={{
              backgroundColor: '#F5F5F5',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '13px',
              color: '#122023',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500,
            }}
          >
            {showAllData ? 'Show Less' : 'Show All'}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              style={{ transform: showAllData ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            >
              <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>$SEND</th>
                <th style={{ textAlign: 'right', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>$CC</th>
                <th style={{ textAlign: 'right', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>$CUSD</th>
                <th style={{ textAlign: 'right', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>$USDC</th>
                <th style={{ textAlign: 'right', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>POL</th>
                <th style={{ textAlign: 'right', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fiat</th>
                <th style={{ textAlign: 'right', padding: '12px 12px', borderBottom: '2px solid #E0E0E0', color: '#666', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ETH</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row) => (
                <tr key={row.date} style={row.isLatest ? { backgroundColor: '#F8FFF8' } : {}}>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', fontWeight: row.isLatest ? 700 : 500, color: '#122023' }}>
                    {row.date}
                    {row.isLatest && (
                      <span style={{
                        backgroundColor: '#40FB50',
                        color: '#122023',
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        marginLeft: '8px',
                      }}>
                        LATEST
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', fontWeight: 600, color: '#122023' }}>{formatNumber(row.send)}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#122023' }}>{formatNumber(row.cc)}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#122023' }}>{formatNumber(row.cusd)}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#122023' }}>{formatCurrency(row.usdc)}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#122023' }}>{formatCurrency(row.pol)}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#122023' }}>{formatCurrency(row.fiat)}</td>
                  <td style={{ padding: '14px 12px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#888' }}>{row.eth > 0 ? row.eth.toFixed(2) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
