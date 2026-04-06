'use client';

import React from 'react';

// ============ TOKEN DATA ============
const tokenData = {
  totalSupply: 1_000_000_000,
  circulating: 341_041_000,
  nonCirculating: 658_959_000,
  circulationRate: 34.10,
  avgAnnualInflation: 24.6,

  allocations: [
    { name: 'Rewards', allocation: 300_000_000, remaining: 222_019_521, color: '#10B981', status: 'Active Distribution' },
    { name: 'Treasury', allocation: 200_000_000, remaining: 208_879_479, color: '#3B82F6', status: 'Net Accumulation' },
    { name: 'Exchange Listings', allocation: 200_000_000, remaining: 110_000_000, color: '#8B5CF6', status: 'Active Distribution' },
    { name: 'Team', allocation: 100_000_000, remaining: 58_400_000, color: '#F59E0B', status: 'Vesting' },
    { name: 'Contributors', allocation: 100_000_000, remaining: 58_660_000, color: '#EF4444', status: 'Vesting' },
    { name: 'Liquidity', allocation: 100_000_000, remaining: 0, color: '#06B6D4', status: 'Fully Distributed' },
  ],

  // Quarterly data from end-of-quarter monthly figures
  quarterlyData: [
    { date: 'Q2 2023', circulating: 182_449_794, qoqChange: null, qoqPct: null },
    { date: 'Q3 2023', circulating: 189_880_233, qoqChange: 7_430_439, qoqPct: 4.07 },
    { date: 'Q4 2023', circulating: 224_759_135, qoqChange: 34_878_902, qoqPct: 18.37 },
    { date: 'Q1 2024', circulating: 236_713_673, qoqChange: 11_954_538, qoqPct: 5.32 },
    { date: 'Q2 2024', circulating: 259_363_161, qoqChange: 22_649_488, qoqPct: 9.57 },
    { date: 'Q3 2024', circulating: 267_327_217, qoqChange: 7_964_056, qoqPct: 3.07 },
    { date: 'Q4 2024', circulating: 273_189_782, qoqChange: 5_862_565, qoqPct: 2.19 },
    { date: 'Q1 2025', circulating: 293_206_750, qoqChange: 20_016_968, qoqPct: 7.33 },
    { date: 'Q2 2025', circulating: 297_669_917, qoqChange: 4_463_167, qoqPct: 1.52 },
    { date: 'Q3 2025', circulating: 315_544_897, qoqChange: 17_874_980, qoqPct: 6.00 },
    { date: 'Q4 2025', circulating: 327_985_505, qoqChange: 12_440_608, qoqPct: 3.94 },
    { date: 'Q1 2026', circulating: 341_041_000, qoqChange: 13_055_495, qoqPct: 3.98 },
  ],

  inflationData: [
    { period: 'Q3 2023', annualized: 16.3, tokens: 7_430_439 },
    { period: 'Q4 2023', annualized: 73.5, tokens: 34_878_902 },
    { period: 'Q1 2024', annualized: 21.3, tokens: 11_954_538 },
    { period: 'Q2 2024', annualized: 38.3, tokens: 22_649_488 },
    { period: 'Q3 2024', annualized: 12.3, tokens: 7_964_056 },
    { period: 'Q4 2024', annualized: 8.8, tokens: 5_862_565 },
    { period: 'Q1 2025', annualized: 29.3, tokens: 20_016_968 },
    { period: 'Q2 2025', annualized: 6.1, tokens: 4_463_167 },
    { period: 'Q3 2025', annualized: 24.0, tokens: 17_874_980 },
    { period: 'Q4 2025', annualized: 15.8, tokens: 12_440_608 },
    { period: 'Q1 2026', annualized: 15.9, tokens: 13_055_495 },
  ],

  vestingProgress: [
    { name: 'Team', initial: 100_000_000, released: 41_600_000, pct: 41.6, color: '#F59E0B' },
    { name: 'Contributors', initial: 100_000_000, released: 41_340_000, pct: 41.3, color: '#EF4444' },
    { name: 'Rewards', initial: 300_000_000, released: 77_980_479, pct: 26.0, color: '#10B981' },
  ],

  milestones: [
    { date: 'Q2 2023', event: 'Token Launch (TGE)', circulating: '182M', description: '100M Liquidity + 80M Exchange Listings' },
    { date: 'Q4 2023', event: '225M Circulating', circulating: '225M' },
    { date: 'Q2 2024', event: '259M Circulating', circulating: '259M' },
    { date: 'Q1 2025', event: '293M Circulating', circulating: '293M' },
    { date: 'Q4 2025', event: '328M Circulating', circulating: '328M' },
    { date: 'Q1 2026', event: 'Current — 341M Circulating', circulating: '341M' },
  ],
};

// ============ UTILITY FUNCTIONS ============
const formatNumber = (num: number) => {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

const formatFullNumber = (num: number) => num.toLocaleString();

// ============ DONUT CHART ============
function DonutChart({ hoveredIndex, onHover }: { hoveredIndex: number | null; onHover: (i: number | null) => void }) {
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {tokenData.allocations.map((alloc, i) => {
          const percent = (alloc.allocation / tokenData.totalSupply) * 100;
          const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -((cumulativePercent / 100) * circumference);
          cumulativePercent += percent;
          const dimmed = hoveredIndex !== null && hoveredIndex !== i;

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={alloc.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{ opacity: dimmed ? 0.2 : 1, transition: 'opacity 0.2s', cursor: 'pointer' }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
            />
          );
        })}
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '22px', fontWeight: 700, color: '#122023', lineHeight: 1 }}>1B</div>
        <div style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>Total</div>
      </div>
    </div>
  );
}

// ============ AREA CHART ============
function AreaChart() {
  const data = tokenData.quarterlyData;
  const maxVal = 350_000_000;
  const minVal = 150_000_000;
  const range = maxVal - minVal;

  const yLabels = ['350M', '300M', '250M', '200M', '150M'];
  const yValues = [350_000_000, 300_000_000, 250_000_000, 200_000_000, 150_000_000];

  const chartLeft = 12;
  const chartWidth = 100 - chartLeft;

  const points = data.map((d, i) => {
    const x = chartLeft + (i / (data.length - 1)) * chartWidth;
    const y = 8 + ((maxVal - d.circulating) / range) * 84;
    return `${x},${y}`;
  }).join(' ');

  const lastPoint = points.split(' ').pop();
  const areaPoints = `${chartLeft},92 ${points} ${lastPoint?.split(',')[0]},92`;

  const dataPoints = data.map((d, i) => ({
    x: chartLeft + (i / (data.length - 1)) * chartWidth,
    y: 8 + ((maxVal - d.circulating) / range) * 84,
    value: d.circulating,
    date: d.date,
  }));

  return (
    <div style={{ position: 'relative', height: '220px', marginBottom: '16px' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#40FB50" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#40FB50" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#40FB50" stopOpacity="0.02" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {yValues.map((val, i) => {
          const y = 8 + ((maxVal - val) / range) * 84;
          return (
            <line
              key={i}
              x1={chartLeft}
              y1={y}
              x2="100"
              y2={y}
              stroke="#EBEBEB"
              strokeWidth="0.2"
              strokeDasharray="1,1"
            />
          );
        })}

        <polygon points={areaPoints} fill="url(#areaFill)" />

        <polyline
          points={points}
          fill="none"
          stroke="#40FB50"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {dataPoints.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="0.8"
              fill="#FFF"
              stroke="#40FB50"
              strokeWidth="0.4"
            />
          </g>
        ))}
      </svg>

      {/* Y-axis labels */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '8px',
        paddingBottom: '28px',
      }}>
        {yLabels.map((label, i) => (
          <span key={i} style={{ fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '10px', color: '#999', fontWeight: 500 }}>{label}</span>
        ))}
      </div>

      {/* X-axis labels */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '12%',
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: '"SF Mono", "Fira Code", monospace',
        fontSize: '10px',
        color: '#999',
        fontWeight: 500,
      }}>
        <span>Q2 '23</span>
        <span>Q4 '23</span>
        <span>Q2 '24</span>
        <span>Q4 '24</span>
        <span>Q2 '25</span>
        <span>Q1 '26</span>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function TokenEmissions() {
  const [expandedTable, setExpandedTable] = React.useState(false);
  const [hoveredAlloc, setHoveredAlloc] = React.useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null);

  const cardStyle: React.CSSProperties = {
    background: '#FFF',
    borderRadius: '12px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#999',
  };

  const monoStyle: React.CSSProperties = {
    fontFamily: '"SF Mono", "Fira Code", monospace',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>

      {/* ── HERO: Bento grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '2px',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        {/* Total Supply — large left cell */}
        <div style={{
          gridRow: '1 / 3',
          background: '#122023',
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '200px',
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#40FB50', marginBottom: '6px' }}>
              $CC Token Supply
            </div>
            <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6, maxWidth: '380px' }}>
              Fixed supply of 1 billion tokens. {tokenData.circulationRate}% currently circulating across the Canton Network ecosystem.
            </div>
          </div>
          <div>
            <div style={{ ...monoStyle, fontSize: '52px', fontWeight: 700, color: '#FFF', letterSpacing: '-2px', lineHeight: 1 }}>
              1,000,000,000
            </div>
            <div style={{ fontSize: '12px', color: '#4a5c5f', marginTop: '10px', fontWeight: 500 }}>
              Total supply · fixed cap · no additional issuance
            </div>
          </div>
        </div>

        {/* Circulating top-right */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>
            Circulating
          </div>
          <div>
            <div style={{ ...monoStyle, fontSize: '26px', fontWeight: 700, color: '#40FB50', letterSpacing: '-1px' }}>
              {formatNumber(tokenData.circulating)}
            </div>
            <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>{tokenData.circulationRate}% of total supply</div>
          </div>
        </div>

        {/* Non-Circulating + Avg Inflation bottom-right */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>
              Non-Circulating
            </div>
            <div>
              <div style={{ ...monoStyle, fontSize: '20px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.5px' }}>
                {formatNumber(tokenData.nonCirculating)}
              </div>
              <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>in wallets</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid #263a3e', paddingLeft: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>
              Avg Inflation
            </div>
            <div>
              <div style={{ ...monoStyle, fontSize: '20px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.5px' }}>
                {tokenData.avgAnnualInflation}%
              </div>
              <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>annualized</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOKEN ALLOCATION ── */}
      <div style={{ ...cardStyle, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ ...labelStyle, marginBottom: '6px' }}>Token Allocation</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>Distribution across 6 categories</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <DonutChart hoveredIndex={hoveredAlloc} onHover={setHoveredAlloc} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' }}>
            {tokenData.allocations.map((alloc, i) => {
              const distributed = alloc.allocation - alloc.remaining;
              const pctDistributed = (distributed / alloc.allocation) * 100;
              const pctOfTotal = (alloc.allocation / tokenData.totalSupply) * 100;
              const dimmed = hoveredAlloc !== null && hoveredAlloc !== i;

              return (
                <div
                  key={alloc.name}
                  onMouseEnter={() => setHoveredAlloc(i)}
                  onMouseLeave={() => setHoveredAlloc(null)}
                  style={{
                    padding: '14px',
                    background: '#FAFAFA',
                    borderRadius: '10px',
                    border: '1px solid #EBEBEB',
                    opacity: dimmed ? 0.35 : 1,
                    transition: 'opacity 0.2s',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: alloc.color, flexShrink: 0 }} />
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{alloc.name}</div>
                  </div>
                  <div style={{ ...monoStyle, fontSize: '11px', color: '#666', marginBottom: '10px' }}>
                    {pctOfTotal}% · {formatNumber(alloc.allocation)}
                  </div>
                  <div style={{ height: '4px', background: '#E8E8E8', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ height: '100%', width: `${pctDistributed}%`, background: alloc.color, borderRadius: '2px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#999' }}>{pctDistributed.toFixed(0)}% distributed</span>
                    <span style={{ ...monoStyle, fontSize: '10px', fontWeight: 600, color: alloc.color }}>{formatNumber(distributed)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CIRCULATING SUPPLY CHART ── */}
      <div style={{ ...cardStyle, padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ ...labelStyle, marginBottom: '6px' }}>Circulating Supply</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>Q2 2023 — Q1 2026</div>
        </div>

        <AreaChart />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '16px', borderTop: '1px solid #EBEBEB' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...monoStyle, fontSize: '18px', fontWeight: 700, color: '#122023' }}>{formatNumber(tokenData.quarterlyData[0].circulating)}</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Starting (TGE)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...monoStyle, fontSize: '18px', fontWeight: 700, color: '#10B981' }}>+{formatNumber(tokenData.circulating - tokenData.quarterlyData[0].circulating)}</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Added</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...monoStyle, fontSize: '18px', fontWeight: 700, color: '#122023' }}>{formatNumber(tokenData.circulating)}</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Current</div>
          </div>
        </div>
      </div>

      {/* ── INFLATION TREND ── */}
      <div style={{ ...cardStyle, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ ...labelStyle, marginBottom: '6px' }}>Inflation Trend</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>Annualized rate by quarter</div>
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#EF4444' }} />
              <span>&gt;40%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#F59E0B' }} />
              <span>20–40%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10B981' }} />
              <span>&lt;20%</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Y-axis */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px', paddingBottom: '24px' }}>
            {['80%', '60%', '40%', '20%', '0%'].map((label) => (
              <span key={label} style={{ ...monoStyle, fontSize: '10px', color: '#999', fontWeight: 500 }}>{label}</span>
            ))}
          </div>

          {/* Bars */}
          <div style={{ flex: 1, position: 'relative' }}>
            {/* Grid lines */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '156px' }}>
              {[0, 25, 50, 75, 100].map((pct, i) => (
                <div key={i} style={{ position: 'absolute', top: `${pct}%`, left: 0, right: 0, borderTop: '1px dashed #E8E8E8' }} />
              ))}
            </div>

            {/* Bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '4px', height: '156px', position: 'relative' }}>
              {tokenData.inflationData.map((period, i) => {
                const maxScale = 80;
                const barHeight = Math.min((period.annualized / maxScale) * 100, 100);
                const isHigh = period.annualized > 40;
                const isMedium = period.annualized > 20 && period.annualized <= 40;
                const barColor = isHigh ? '#EF4444' : isMedium ? '#F59E0B' : '#10B981';
                const dimmed = hoveredBar !== null && hoveredBar !== i;

                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '32px',
                        height: `${barHeight}%`,
                        background: barColor,
                        borderRadius: '4px 4px 0 0',
                        position: 'relative',
                        minHeight: '4px',
                        opacity: dimmed ? 0.2 : 1,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontFamily: '"SF Mono", "Fira Code", monospace',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: barColor,
                        whiteSpace: 'nowrap',
                        opacity: dimmed ? 0.2 : 1,
                        transition: 'opacity 0.2s',
                      }}>
                        {period.annualized}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              {tokenData.inflationData.map((period, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '9px', color: '#999', fontWeight: 500 }}>
                    {period.period.replace(' 20', "'")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #EBEBEB' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...monoStyle, fontSize: '18px', fontWeight: 700, color: '#EF4444' }}>73.5%</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Peak (Q4 '23)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...monoStyle, fontSize: '18px', fontWeight: 700, color: '#10B981' }}>6.1%</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Low (Q2 '25)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...monoStyle, fontSize: '18px', fontWeight: 700, color: '#122023' }}>{tokenData.avgAnnualInflation}%</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Average</div>
          </div>
        </div>
      </div>

      {/* ── VESTING PROGRESS ── */}
      <div style={{ ...cardStyle, padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ ...labelStyle, marginBottom: '6px' }}>Vesting Progress</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>Token release status by allocation</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {tokenData.vestingProgress.map((item) => (
            <div key={item.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{item.name}</span>
                </div>
                <div style={{ ...monoStyle, fontSize: '12px', color: '#666' }}>
                  {formatNumber(item.released)} / {formatNumber(item.initial)}
                  <span style={{ marginLeft: '8px', fontWeight: 700, color: item.color }}>({item.pct}%)</span>
                </div>
              </div>
              <div style={{ height: '6px', background: '#E8E8E8', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '3px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DISTRIBUTION STATUS TABLE ── */}
      <div style={{ ...cardStyle, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ ...labelStyle, marginBottom: '6px' }}>Distribution Status</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>Detailed breakdown by allocation</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                {['Allocation', 'Initial', 'Remaining', 'Distributed', 'Status'].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      textAlign: i === 0 || i === 4 ? 'left' : 'right',
                      padding: '12px 16px',
                      background: '#F7F7F7',
                      fontWeight: 600,
                      fontSize: '11px',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#999',
                      borderBottom: '1px solid #E0E0E0',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tokenData.allocations.map((alloc, rowIdx) => {
                const inCirculation = alloc.allocation - alloc.remaining;
                const statusColors: Record<string, { bg: string; color: string }> = {
                  'Active Distribution': { bg: '#E8F5E9', color: '#2E7D32' },
                  'Vesting': { bg: '#FFF3E0', color: '#E65100' },
                  'Fully Distributed': { bg: '#E3F2FD', color: '#1565C0' },
                  'Net Accumulation': { bg: '#F3E5F5', color: '#7B1FA2' },
                };
                const statusStyle = statusColors[alloc.status] || { bg: '#F5F5F5', color: '#666' };
                const isLast = rowIdx === tokenData.allocations.length - 1;

                return (
                  <tr key={alloc.name}>
                    <td style={{ padding: '12px 16px', borderBottom: isLast ? 'none' : '1px solid #F0F0F0', color: '#122023' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: alloc.color, flexShrink: 0 }} />
                        <span style={{ fontWeight: 600 }}>{alloc.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: isLast ? 'none' : '1px solid #F0F0F0', textAlign: 'right', fontFamily: '"SF Mono", "Fira Code", monospace', color: '#666', fontSize: '12px' }}>{formatFullNumber(alloc.allocation)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: isLast ? 'none' : '1px solid #F0F0F0', textAlign: 'right', fontFamily: '"SF Mono", "Fira Code", monospace', color: '#666', fontSize: '12px' }}>{formatFullNumber(alloc.remaining)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: isLast ? 'none' : '1px solid #F0F0F0', textAlign: 'right', fontFamily: '"SF Mono", "Fira Code", monospace', fontWeight: 600, color: '#122023', fontSize: '12px' }}>{formatFullNumber(inCirculation)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: isLast ? 'none' : '1px solid #F0F0F0' }}>
                      <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: statusStyle.bg, color: statusStyle.color }}>
                        {alloc.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {/* Dark total row */}
              <tr style={{ background: '#122023' }}>
                <td style={{ padding: '14px 16px', color: '#40FB50', fontWeight: 700, fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#40FB50' }} />
                    Total
                  </div>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: '"SF Mono", "Fira Code", monospace', color: '#FFF', fontWeight: 700, fontSize: '12px' }}>{formatFullNumber(tokenData.totalSupply)}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: '"SF Mono", "Fira Code", monospace', color: '#FFF', fontWeight: 700, fontSize: '12px' }}>{formatFullNumber(tokenData.nonCirculating)}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontFamily: '"SF Mono", "Fira Code", monospace', color: '#40FB50', fontWeight: 700, fontSize: '12px' }}>{formatFullNumber(tokenData.circulating)}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: 'rgba(64, 251, 80, 0.12)', color: '#40FB50' }}>
                    {tokenData.circulationRate}% Circulating
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── KEY MILESTONES ── */}
      <div style={{ ...cardStyle, padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ ...labelStyle, marginBottom: '6px' }}>Key Milestones</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>Token distribution journey</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {tokenData.milestones.map((milestone, i) => {
            const isLast = i === tokenData.milestones.length - 1;
            const isFirst = i === 0;
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 24px 1fr',
                  alignItems: 'center',
                  gap: '0',
                  minHeight: '52px',
                }}
              >
                {/* Date */}
                <div style={{
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#999',
                  textAlign: 'right',
                  paddingRight: '16px',
                }}>
                  {milestone.date}
                </div>

                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                  <div style={{ width: '2px', flex: 1, background: isFirst ? 'transparent' : '#10B981' }} />
                  <div style={{
                    width: isLast ? '14px' : '10px',
                    height: isLast ? '14px' : '10px',
                    borderRadius: '50%',
                    background: isLast ? '#10B981' : '#FFF',
                    border: '2px solid #10B981',
                    flexShrink: 0,
                    boxShadow: isLast ? '0 0 0 4px rgba(16, 185, 129, 0.15)' : 'none',
                  }} />
                  <div style={{ width: '2px', flex: 1, background: isLast ? 'transparent' : '#10B981' }} />
                </div>

                {/* Event */}
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: isLast ? '#10B981' : '#122023' }}>
                    {milestone.event}
                  </div>
                  {milestone.description && (
                    <div style={{ fontSize: '11px', color: '#999' }}>
                      {milestone.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── QUARTERLY SUPPLY DATA (EXPANDABLE) ── */}
      <div>
        <div
          onClick={() => setExpandedTable(!expandedTable)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '18px 24px',
            background: '#FFF',
            borderRadius: expandedTable ? '12px 12px 0 0' : '12px',
            border: '1px solid #E0E0E0',
            borderBottom: expandedTable ? '1px solid transparent' : '1px solid #E0E0E0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            <div style={{ ...labelStyle, marginBottom: '4px' }}>Quarterly Supply Data</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023' }}>Complete historical data</div>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#999',
            transform: expandedTable ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            display: 'inline-block',
          }}>&#9660;</span>
        </div>

        {expandedTable && (
          <div style={{
            background: '#FFF',
            borderRadius: '0 0 12px 12px',
            border: '1px solid #E0E0E0',
            borderTop: '1px solid #EBEBEB',
            maxHeight: '420px',
            overflowY: 'auto',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  {['Quarter', 'Circulating', 'QoQ Change', 'QoQ %'].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        textAlign: i === 0 ? 'left' : 'right',
                        padding: '11px 16px',
                        background: '#F7F7F7',
                        fontWeight: 600,
                        fontSize: '11px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: '#999',
                        borderBottom: '1px solid #E0E0E0',
                        position: 'sticky',
                        top: 0,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...tokenData.quarterlyData].reverse().map((row, i) => {
                  const isTotal = i === tokenData.quarterlyData.length - 1;
                  return (
                    <tr key={i} style={{ background: isTotal ? '#122023' : undefined }}>
                      <td style={{
                        padding: '10px 16px',
                        borderBottom: '1px solid #F0F0F0',
                        fontFamily: '"SF Mono", "Fira Code", monospace',
                        fontWeight: 600,
                        color: isTotal ? '#40FB50' : '#122023',
                        fontSize: '12px',
                      }}>{row.date}</td>
                      <td style={{
                        padding: '10px 16px',
                        borderBottom: '1px solid #F0F0F0',
                        textAlign: 'right',
                        fontFamily: '"SF Mono", "Fira Code", monospace',
                        color: isTotal ? '#FFF' : '#666',
                        fontWeight: isTotal ? 700 : 400,
                      }}>{formatFullNumber(row.circulating)}</td>
                      <td style={{
                        padding: '10px 16px',
                        borderBottom: '1px solid #F0F0F0',
                        textAlign: 'right',
                        fontFamily: '"SF Mono", "Fira Code", monospace',
                        color: row.qoqChange ? '#10B981' : '#999',
                      }}>
                        {row.qoqChange ? `+${formatFullNumber(row.qoqChange)}` : '—'}
                      </td>
                      <td style={{
                        padding: '10px 16px',
                        borderBottom: '1px solid #F0F0F0',
                        textAlign: 'right',
                        fontFamily: '"SF Mono", "Fira Code", monospace',
                        color: row.qoqPct ? '#10B981' : '#999',
                      }}>
                        {row.qoqPct ? `+${row.qoqPct.toFixed(2)}%` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
