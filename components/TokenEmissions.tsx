'use client';

import React from 'react';

// ============ TOKEN DATA ============
const tokenData = {
  totalSupply: 1_000_000_000,
  circulating: 327_985_505,
  nonCirculating: 672_014_495,
  circulationRate: 32.80,
  avgAnnualInflation: 24.6,

  allocations: [
    { name: 'Rewards', allocation: 300_000_000, remaining: 225_019_521, color: '#10B981', status: 'Active Distribution' },
    { name: 'Treasury', allocation: 200_000_000, remaining: 214_371_974, color: '#3B82F6', status: 'Net Accumulation' },
    { name: 'Exchange Listings', allocation: 200_000_000, remaining: 110_000_000, color: '#8B5CF6', status: 'Active Distribution' },
    { name: 'Team', allocation: 100_000_000, remaining: 61_500_000, color: '#F59E0B', status: 'Vesting' },
    { name: 'Contributors', allocation: 100_000_000, remaining: 60_633_000, color: '#EF4444', status: 'Vesting' },
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
  ],

  vestingProgress: [
    { name: 'Team', initial: 100_000_000, released: 38_500_000, pct: 38.5, color: '#F59E0B' },
    { name: 'Contributors', initial: 100_000_000, released: 39_367_000, pct: 39.4, color: '#EF4444' },
    { name: 'Rewards', initial: 300_000_000, released: 74_980_479, pct: 25.0, color: '#10B981' },
  ],

  milestones: [
    { date: 'Q2 2023', event: 'Token Launch (TGE)', circulating: '182M', description: '100M Liquidity + 80M Exchange Listings' },
    { date: 'Q4 2023', event: '225M Circulating', circulating: '225M' },
    { date: 'Q2 2024', event: '259M Circulating', circulating: '259M' },
    { date: 'Q1 2025', event: '293M Circulating', circulating: '293M' },
    { date: 'Q4 2025', event: 'Current — 328M Circulating', circulating: '328M' },
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
function DonutChart() {
  const size = 160;
  const strokeWidth = 24;
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
            />
          );
        })}
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#122023' }}>1B</div>
        <div style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</div>
      </div>
    </div>
  );
}

// ============ AREA CHART ============
function AreaChart() {
  const data = tokenData.quarterlyData;
  const maxVal = 350_000_000; // Fixed scale for better context
  const minVal = 150_000_000;
  const range = maxVal - minVal;

  // Y-axis labels
  const yLabels = ['350M', '300M', '250M', '200M', '150M'];
  const yValues = [350_000_000, 300_000_000, 250_000_000, 200_000_000, 150_000_000];

  // Calculate chart points (offset for y-axis space)
  const chartLeft = 12; // percentage for y-axis
  const chartWidth = 100 - chartLeft;

  const points = data.map((d, i) => {
    const x = chartLeft + (i / (data.length - 1)) * chartWidth;
    const y = 8 + ((maxVal - d.circulating) / range) * 84;
    return `${x},${y}`;
  }).join(' ');

  // Create area polygon
  const lastPoint = points.split(' ').pop();
  const areaPoints = `${chartLeft},92 ${points} ${lastPoint?.split(',')[0]},92`;

  // Data points for circles
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
            <stop offset="0%" stopColor="#40FB50" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#40FB50" stopOpacity="0.15" />
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

        {/* Horizontal grid lines */}
        {yValues.map((val, i) => {
          const y = 8 + ((maxVal - val) / range) * 84;
          return (
            <line
              key={i}
              x1={chartLeft}
              y1={y}
              x2="100"
              y2={y}
              stroke="#E8E8E8"
              strokeWidth="0.2"
              strokeDasharray="1,1"
            />
          );
        })}

        {/* Area fill */}
        <polygon points={areaPoints} fill="url(#areaFill)" />

        {/* Main line */}
        <polyline
          points={points}
          fill="none"
          stroke="#40FB50"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Data points */}
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
          <span key={i} style={{ fontSize: '10px', color: '#999', fontWeight: 500 }}>{label}</span>
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
        fontSize: '10px',
        color: '#666',
        fontWeight: 500,
      }}>
        <span>Q2 '23</span>
        <span>Q4 '23</span>
        <span>Q2 '24</span>
        <span>Q4 '24</span>
        <span>Q2 '25</span>
        <span>Q4 '25</span>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function TokenEmissions() {
  const [expandedTable, setExpandedTable] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '8px 0' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', marginBottom: '4px' }}>Total Supply</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#122023', lineHeight: 1.2 }}>{formatNumber(tokenData.totalSupply)}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>Fixed cap</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #40FB50 0%, #32d946 100%)', borderRadius: '12px', padding: '16px', color: '#122023' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#122023', marginBottom: '4px' }}>Circulating</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#122023', lineHeight: 1.2 }}>{formatNumber(tokenData.circulating)}</div>
          <div style={{ fontSize: '12px', color: '#122023', marginTop: '2px' }}>{tokenData.circulationRate}% of supply</div>
        </div>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', marginBottom: '4px' }}>Non-Circulating</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#122023', lineHeight: 1.2 }}>{formatNumber(tokenData.nonCirculating)}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>In wallets</div>
        </div>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', marginBottom: '4px' }}>Avg Inflation</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#122023', lineHeight: 1.2 }}>{tokenData.avgAnnualInflation}%</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>Annualized</div>
        </div>
      </div>

      {/* Token Allocation */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Token Allocation</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>Distribution across 6 categories</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <DonutChart />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%' }}>
            {tokenData.allocations.map((alloc) => {
              const distributed = alloc.allocation - alloc.remaining;
              const pctDistributed = (distributed / alloc.allocation) * 100;
              const pctOfTotal = (alloc.allocation / tokenData.totalSupply) * 100;

              return (
                <div
                  key={alloc.name}
                  style={{
                    padding: '14px',
                    background: '#FAFAFA',
                    borderRadius: '10px',
                    border: '1px solid #EBEBEB',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: alloc.color, flexShrink: 0 }} />
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{alloc.name}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', marginBottom: '10px' }}>
                    {pctOfTotal}% of supply ({formatNumber(alloc.allocation)})
                  </div>
                  <div style={{ height: '4px', background: '#E0E0E0', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ height: '100%', width: `${pctDistributed}%`, background: alloc.color, borderRadius: '2px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#999' }}>{pctDistributed.toFixed(0)}% distributed</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: alloc.color }}>{formatNumber(distributed)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Circulating Supply */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Circulating Supply</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Q2 2023 - Q4 2025</div>
        <AreaChart />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E0E0E0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#122023' }}>{formatNumber(tokenData.quarterlyData[0].circulating)}</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>Starting (TGE)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#10B981' }}>+{formatNumber(tokenData.circulating - tokenData.quarterlyData[0].circulating)}</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>Added</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#10B981' }}>{formatNumber(tokenData.circulating)}</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>Current</div>
          </div>
        </div>
      </div>

      {/* Inflation Trend */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Inflation Trend</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Annualized rate by quarter</div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#666' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#EF4444' }} />
              <span>&gt;40%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#666' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#F59E0B' }} />
              <span>20-40%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#666' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10B981' }} />
              <span>&lt;20%</span>
            </div>
          </div>
        </div>

        {/* Chart with Y-axis */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Y-axis labels */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px', paddingBottom: '24px' }}>
            <span style={{ fontSize: '10px', color: '#999', fontWeight: 500 }}>80%</span>
            <span style={{ fontSize: '10px', color: '#999', fontWeight: 500 }}>60%</span>
            <span style={{ fontSize: '10px', color: '#999', fontWeight: 500 }}>40%</span>
            <span style={{ fontSize: '10px', color: '#999', fontWeight: 500 }}>20%</span>
            <span style={{ fontSize: '10px', color: '#999', fontWeight: 500 }}>0%</span>
          </div>

          {/* Bars */}
          <div style={{ flex: 1, position: 'relative' }}>
            {/* Grid lines */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '156px' }}>
              {[0, 25, 50, 75, 100].map((pct, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${pct}%`,
                    left: 0,
                    right: 0,
                    borderTop: '1px dashed #E8E8E8',
                  }}
                />
              ))}
            </div>

            {/* Bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '4px', height: '156px', position: 'relative' }}>
              {tokenData.inflationData.map((period, i) => {
                const maxScale = 80; // Fixed scale to 80%
                const barHeight = Math.min((period.annualized / maxScale) * 100, 100);
                const isHigh = period.annualized > 40;
                const isMedium = period.annualized > 20 && period.annualized <= 40;
                const barColor = isHigh ? '#EF4444' : isMedium ? '#F59E0B' : '#10B981';

                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '32px',
                        height: `${barHeight}%`,
                        background: barColor,
                        borderRadius: '4px 4px 0 0',
                        position: 'relative',
                        minHeight: '4px',
                      }}
                    >
                      {/* Value label on top of bar */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '10px',
                          fontWeight: 700,
                          color: barColor,
                          whiteSpace: 'nowrap',
                        }}
                      >
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
                  <div style={{ fontSize: '9px', color: '#666', fontWeight: 500 }}>
                    {period.period.replace('Q', 'Q').replace(' 20', "'")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E0E0E0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#EF4444' }}>73.5%</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>Peak (Q4 '23)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#10B981' }}>6.1%</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>Low (Q2 '25)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#122023' }}>{tokenData.avgAnnualInflation}%</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>Average</div>
          </div>
        </div>
      </div>

      {/* Vesting Progress */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Vesting Progress</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Token release status by allocation</div>
        {tokenData.vestingProgress.map((item) => (
          <div key={item.name} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#122023' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                {item.name}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {formatNumber(item.released)} / {formatNumber(item.initial)} ({item.pct}%)
              </div>
            </div>
            <div style={{ height: '6px', background: '#E0E0E0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '3px' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Distribution Status Table */}
      <div style={{ background: '#FFF', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Distribution Status</div>
          <div style={{ fontSize: '13px', color: '#666' }}>Detailed breakdown by allocation</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0' }}>Allocation</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0' }}>Initial</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0' }}>Remaining</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0' }}>Distributed</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tokenData.allocations.map((alloc) => {
                const inCirculation = alloc.allocation - alloc.remaining;
                const statusColors: Record<string, { bg: string; color: string }> = {
                  'Active Distribution': { bg: '#E8F5E9', color: '#2E7D32' },
                  'Vesting': { bg: '#FFF3E0', color: '#E65100' },
                  'Fully Distributed': { bg: '#E3F2FD', color: '#1565C0' },
                  'Net Accumulation': { bg: '#F3E5F5', color: '#7B1FA2' },
                };
                const statusStyle = statusColors[alloc.status] || { bg: '#F5F5F5', color: '#666' };

                return (
                  <tr key={alloc.name}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #E0E0E0', color: '#122023' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: alloc.color }} />
                        <span style={{ fontWeight: 600 }}>{alloc.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', fontFamily: 'monospace', color: '#666', fontSize: '12px' }}>{formatFullNumber(alloc.allocation)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', fontFamily: 'monospace', color: '#666', fontSize: '12px' }}>{formatFullNumber(alloc.remaining)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600, color: '#122023', fontSize: '12px' }}>{formatFullNumber(inCirculation)}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #E0E0E0' }}>
                      <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: statusStyle.bg, color: statusStyle.color }}>
                        {alloc.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Milestones */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Key Milestones</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>Token distribution journey</div>

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
                  minHeight: '48px',
                }}
              >
                {/* Date column */}
                <div style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#999',
                  textAlign: 'right',
                  paddingRight: '16px',
                }}>
                  {milestone.date}
                </div>

                {/* Timeline column */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                }}>
                  {/* Top line segment */}
                  <div style={{
                    width: '2px',
                    flex: 1,
                    background: isFirst ? 'transparent' : '#10B981',
                  }} />
                  {/* Dot */}
                  <div style={{
                    width: isLast ? '14px' : '10px',
                    height: isLast ? '14px' : '10px',
                    borderRadius: '50%',
                    background: isLast ? '#10B981' : '#FFF',
                    border: `2px solid #10B981`,
                    flexShrink: 0,
                    boxShadow: isLast ? '0 0 0 4px rgba(16, 185, 129, 0.15)' : 'none',
                  }} />
                  {/* Bottom line segment */}
                  <div style={{
                    width: '2px',
                    flex: 1,
                    background: isLast ? 'transparent' : '#10B981',
                  }} />
                </div>

                {/* Event name column */}
                <div style={{
                  paddingLeft: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#122023',
                  }}>
                    {milestone.event}
                  </div>
                  {milestone.description && (
                    <div style={{
                      fontSize: '11px',
                      color: '#888',
                    }}>
                      {milestone.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Data (Expandable) */}
      <div>
        <div
          onClick={() => setExpandedTable(!expandedTable)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '16px 20px', background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023' }}>Quarterly Supply Data</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Complete historical data</div>
          </div>
          <span style={{ fontSize: '14px', color: '#666', transform: expandedTable ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>&#9660;</span>
        </div>
        {expandedTable && (
          <div style={{ background: '#FFF', borderRadius: '0 0 12px 12px', marginTop: '-12px', paddingTop: '12px', border: '1px solid #E0E0E0', borderTop: 'none', maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>Quarter</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>Circulating</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>QoQ Change</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>QoQ %</th>
                </tr>
              </thead>
              <tbody>
                {[...tokenData.quarterlyData].reverse().map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', fontWeight: 500, color: '#122023' }}>{row.date}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', fontFamily: 'monospace', color: '#666' }}>{formatFullNumber(row.circulating)}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', fontFamily: 'monospace', color: row.qoqChange ? '#10B981' : '#666' }}>
                      {row.qoqChange ? `+${formatFullNumber(row.qoqChange)}` : '-'}
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', color: '#666' }}>
                      {row.qoqPct ? `+${row.qoqPct.toFixed(2)}%` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
