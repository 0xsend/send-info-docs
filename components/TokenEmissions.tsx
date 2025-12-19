'use client';

import React from 'react';

// ============ TOKEN DATA ============
const tokenData = {
  totalSupply: 1_000_000_000,
  circulating: 327_985_505,
  nonCirculating: 672_014_495,
  circulationRate: 32.80,
  avgAnnualInflation: 27.5,

  allocations: [
    { name: 'Rewards', allocation: 300_000_000, remaining: 225_005_988, color: '#10B981', status: 'Active Distribution' },
    { name: 'Treasury', allocation: 200_000_000, remaining: 214_371_974, color: '#3B82F6', status: 'Net Accumulation' },
    { name: 'Exchange Listings', allocation: 200_000_000, remaining: 133_322_498, color: '#8B5CF6', status: 'Active Distribution' },
    { name: 'Team', allocation: 100_000_000, remaining: 61_476_498, color: '#F59E0B', status: 'Vesting' },
    { name: 'Contributors', allocation: 100_000_000, remaining: 60_618_502, color: '#EF4444', status: 'Vesting' },
    { name: 'Liquidity', allocation: 100_000_000, remaining: 0, color: '#06B6D4', status: 'Fully Distributed' },
  ],

  // All figures normalized to 1B supply (historical data divided by 100)
  quarterlyData: [
    { date: 'Q2 2023', circulating: 180_000_000, qoqChange: null, qoqPct: null },
    { date: 'Q3 2023', circulating: 190_591_233, qoqChange: 10_591_233, qoqPct: 5.88 },
    { date: 'Q4 2023', circulating: 203_744_539, qoqChange: 13_153_306, qoqPct: 6.90 },
    { date: 'Q1 2024', circulating: 220_063_396, qoqChange: 16_318_857, qoqPct: 8.01 },
    { date: 'Q2 2024', circulating: 241_368_496, qoqChange: 21_305_100, qoqPct: 9.68 },
    { date: 'Q3 2024', circulating: 260_413_984, qoqChange: 19_045_488, qoqPct: 7.89 },
    { date: 'Q4 2024', circulating: 270_517_390, qoqChange: 10_103_406, qoqPct: 3.88 },
    { date: 'Q1 2025', circulating: 290_266_810, qoqChange: 19_749_420, qoqPct: 7.30 },
    { date: 'Q2 2025', circulating: 301_434_244, qoqChange: 11_167_434, qoqPct: 3.85 },
    { date: 'Q3 2025', circulating: 309_636_106, qoqChange: 8_201_862, qoqPct: 2.72 },
    { date: 'Q4 2025', circulating: 327_985_505, qoqChange: 18_349_399, qoqPct: 5.92 },
  ],

  inflationData: [
    { period: 'Q3 2023', annualized: 23.5, tokens: 10_591_233 },
    { period: 'Q4 2023', annualized: 27.6, tokens: 13_153_306 },
    { period: 'Q1 2024', annualized: 32.0, tokens: 16_318_857 },
    { period: 'Q2 2024', annualized: 38.7, tokens: 21_305_100 },
    { period: 'Q3 2024', annualized: 31.6, tokens: 19_045_488 },
    { period: 'Q4 2024', annualized: 15.5, tokens: 10_103_406 },
    { period: 'Q1 2025', annualized: 29.2, tokens: 19_749_420 },
    { period: 'Q2 2025', annualized: 15.4, tokens: 11_167_434 },
    { period: 'Q3 2025', annualized: 10.9, tokens: 8_201_862 },
    { period: 'Q4 2025', annualized: 23.7, tokens: 18_349_399 },
  ],

  vestingProgress: [
    { name: 'Team', initial: 100_000_000, released: 38_523_502, pct: 38.5, color: '#F59E0B' },
    { name: 'Contributors', initial: 100_000_000, released: 39_381_498, pct: 39.4, color: '#EF4444' },
    { name: 'Rewards', initial: 300_000_000, released: 74_994_012, pct: 25.0, color: '#10B981' },
  ],

  milestones: [
    { date: 'Q2 2023', event: 'Token Launch (TGE)', circulating: '180M', description: '100M Liquidity + 80M Exchange Listings' },
    { date: 'Q1 2024', event: '220M Circulating', circulating: '220M' },
    { date: 'Q3 2024', event: '260M Circulating', circulating: '260M' },
    { date: 'Q2 2025', event: '300M Circulating', circulating: '301M' },
    { date: 'Q4 2025', event: 'Current', circulating: '328M' },
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
  const maxVal = Math.max(...data.map(d => d.circulating));
  const minVal = Math.min(...data.map(d => d.circulating));
  const range = maxVal - minVal;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.circulating - minVal) / range) * 80;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div style={{ position: 'relative', height: '180px', marginBottom: '16px' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#40FB50" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#40FB50" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <line x1="0" y1="25" x2="100" y2="25" stroke="#E0E0E0" strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#E0E0E0" strokeWidth="0.3" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#E0E0E0" strokeWidth="0.3" />
        <polygon points={areaPoints} fill="url(#areaFill)" />
        <polyline points={points} fill="none" stroke="#40FB50" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666', marginTop: '8px' }}>
        <span>Q2 '23</span>
        <span>Q2 '24</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <DonutChart />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', width: '100%' }}>
            {tokenData.allocations.map((alloc) => {
              const distributed = alloc.allocation - alloc.remaining;
              const pctDistributed = (distributed / alloc.allocation) * 100;
              const pctOfTotal = (alloc.allocation / tokenData.totalSupply) * 100;

              return (
                <div key={alloc.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px', background: '#F5F5F5', borderRadius: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: alloc.color, marginTop: '4px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#122023', marginBottom: '2px' }}>{alloc.name}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>{pctOfTotal}% ({formatNumber(alloc.allocation)})</div>
                    <div style={{ height: '3px', background: '#E0E0E0', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pctDistributed}%`, background: alloc.color, borderRadius: '2px' }} />
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>{pctDistributed.toFixed(0)}% distributed</div>
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
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Inflation Trend</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Annualized rate by half-year period</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', height: '140px', marginBottom: '12px' }}>
          {tokenData.inflationData.map((period, i) => {
            const maxInflation = Math.max(...tokenData.inflationData.map(p => p.annualized));
            const barHeight = (period.annualized / maxInflation) * 100;
            const isHigh = period.annualized > 40;
            const isMedium = period.annualized > 20 && period.annualized <= 40;
            const barColor = isHigh ? '#EF4444' : isMedium ? '#F59E0B' : '#10B981';

            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div style={{ width: '100%', maxWidth: '40px', height: `${barHeight}%`, background: barColor, borderRadius: '4px 4px 0 0' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#122023' }}>{period.annualized}%</div>
                  <div style={{ fontSize: '10px', color: '#666' }}>{period.period}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '12px', borderTop: '1px solid #E0E0E0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#666' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
            <span>&gt;40% High</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#666' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
            <span>20-40% Med</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#666' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            <span>&lt;20% Low</span>
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
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Token distribution journey</div>
        <div style={{ position: 'relative', paddingLeft: '20px' }}>
          <div style={{ position: 'absolute', left: '5px', top: '6px', bottom: '6px', width: '2px', background: 'linear-gradient(to bottom, #10B981, #3B82F6)', borderRadius: '1px' }} />
          {tokenData.milestones.map((milestone, i) => (
            <div key={i} style={{ position: 'relative', paddingBottom: '16px' }}>
              <div style={{ position: 'absolute', left: '-17px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #FFF', boxShadow: '0 0 0 2px #10B981' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>{milestone.event}</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                {milestone.date} &bull; <span style={{ color: '#10B981', fontWeight: 600 }}>{milestone.circulating}</span> circulating
              </div>
              {milestone.description && (
                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{milestone.description}</div>
              )}
            </div>
          ))}
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
