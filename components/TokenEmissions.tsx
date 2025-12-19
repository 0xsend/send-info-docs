'use client';

import React from 'react';

// ============ TOKEN DATA ============
const tokenData = {
  totalSupply: 1_000_000_000,
  circulating: 327_985_505,
  nonCirculating: 672_014_495,
  circulationRate: 32.80,
  avgAnnualInflation: 26.4,

  allocations: [
    { name: 'Rewards', allocation: 300_000_000, remaining: 225_005_988, color: '#10B981', status: 'Active Distribution' },
    { name: 'Treasury', allocation: 200_000_000, remaining: 214_371_974, color: '#3B82F6', status: 'Net Accumulation' },
    { name: 'Exchange Listings', allocation: 200_000_000, remaining: 133_322_498, color: '#8B5CF6', status: 'Active Distribution' },
    { name: 'Team', allocation: 100_000_000, remaining: 61_476_498, color: '#F59E0B', status: 'Vesting' },
    { name: 'Contributors', allocation: 100_000_000, remaining: 60_618_502, color: '#EF4444', status: 'Vesting' },
    { name: 'Liquidity', allocation: 100_000_000, remaining: 0, color: '#06B6D4', status: 'Fully Distributed' },
  ],

  monthlyData: [
    { date: 'Jul 2023', circulating: 39_627_648, momChange: null, momPct: null },
    { date: 'Aug 2023', circulating: 45_874_932, momChange: 6_247_284, momPct: 15.77 },
    { date: 'Sep 2023', circulating: 53_041_898, momChange: 7_166_966, momPct: 15.62 },
    { date: 'Oct 2023', circulating: 68_088_716, momChange: 15_046_818, momPct: 28.37 },
    { date: 'Nov 2023', circulating: 76_672_538, momChange: 8_583_822, momPct: 12.61 },
    { date: 'Dec 2023', circulating: 85_553_806, momChange: 8_881_268, momPct: 11.58 },
    { date: 'Jan 2024', circulating: 103_786_498, momChange: 18_232_692, momPct: 21.31 },
    { date: 'Feb 2024', circulating: 111_303_204, momChange: 7_516_706, momPct: 7.24 },
    { date: 'Mar 2024', circulating: 120_361_688, momChange: 9_058_484, momPct: 8.14 },
    { date: 'Apr 2024', circulating: 138_849_740, momChange: 18_488_052, momPct: 15.36 },
    { date: 'May 2024', circulating: 152_649_346, momChange: 13_799_606, momPct: 9.94 },
    { date: 'Jun 2024', circulating: 164_668_960, momChange: 12_019_614, momPct: 7.87 },
    { date: 'Jul 2024', circulating: 179_520_588, momChange: 14_851_628, momPct: 9.02 },
    { date: 'Aug 2024', circulating: 195_597_426, momChange: 16_076_838, momPct: 8.96 },
    { date: 'Sep 2024', circulating: 213_823_146, momChange: 18_225_720, momPct: 9.32 },
    { date: 'Oct 2024', circulating: 241_858_282, momChange: 28_035_136, momPct: 13.11 },
    { date: 'Nov 2024', circulating: 260_413_984, momChange: 18_555_702, momPct: 7.67 },
    { date: 'Dec 2024', circulating: 270_517_390, momChange: 10_103_406, momPct: 3.88 },
    { date: 'Jan 2025', circulating: 281_698_742, momChange: 11_181_352, momPct: 4.13 },
    { date: 'Feb 2025', circulating: 286_498_154, momChange: 4_799_412, momPct: 1.70 },
    { date: 'Mar 2025', circulating: 290_266_810, momChange: 3_768_656, momPct: 1.32 },
    { date: 'Apr 2025', circulating: 296_832_454, momChange: 6_565_644, momPct: 2.26 },
    { date: 'May 2025', circulating: 299_966_202, momChange: 3_133_748, momPct: 1.06 },
    { date: 'Jun 2025', circulating: 301_434_244, momChange: 1_468_042, momPct: 0.49 },
    { date: 'Jul 2025', circulating: 303_402_746, momChange: 1_968_502, momPct: 0.65 },
    { date: 'Aug 2025', circulating: 306_367_994, momChange: 2_965_248, momPct: 0.98 },
    { date: 'Sep 2025', circulating: 309_636_106, momChange: 3_268_112, momPct: 1.07 },
    { date: 'Oct 2025', circulating: 314_995_038, momChange: 5_358_932, momPct: 1.73 },
    { date: 'Nov 2025', circulating: 322_765_804, momChange: 7_770_766, momPct: 2.47 },
    { date: 'Dec 2025', circulating: 327_985_505, momChange: 5_219_701, momPct: 1.62 },
  ],

  inflationData: [
    { period: 'H2 2023', annualized: 66.2, tokens: 45_926_158 },
    { period: 'H1 2024', annualized: 46.0, tokens: 79_115_154 },
    { period: 'H2 2024', annualized: 32.1, tokens: 105_848_430 },
    { period: 'H1 2025', annualized: 11.6, tokens: 30_916_854 },
    { period: 'H2 2025', annualized: 16.0, tokens: 26_551_261 },
  ],

  vestingProgress: [
    { name: 'Team', initial: 100_000_000, released: 38_523_502, pct: 38.5, color: '#F59E0B' },
    { name: 'Contributors', initial: 100_000_000, released: 39_381_498, pct: 39.4, color: '#EF4444' },
    { name: 'Rewards', initial: 300_000_000, released: 74_994_012, pct: 25.0, color: '#10B981' },
  ],

  milestones: [
    { date: 'Jun 2023', event: 'Token Launch (TGE)', circulating: '180M', description: '100M Liquidity + 80M Exchange Listings' },
    { date: 'Jan 2024', event: '200M Circulating', circulating: '200M' },
    { date: 'Oct 2024', event: '250M Circulating', circulating: '250M' },
    { date: 'Feb 2025', event: 'Token Upgrade', circulating: '286.5M', description: '100:1 token migration' },
    { date: 'Dec 2025', event: 'Current', circulating: '328.0M' },
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
  const data = tokenData.monthlyData;
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
        <span>Jul 23</span>
        <span>Jan 24</span>
        <span>Jul 24</span>
        <span>Jan 25</span>
        <span>Dec 25</span>
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
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>July 2023 - December 2025</div>
        <AreaChart />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingTop: '16px', borderTop: '1px solid #E0E0E0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#122023' }}>{formatNumber(tokenData.monthlyData[0].circulating)}</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>Starting</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#10B981' }}>+{formatNumber(tokenData.circulating - tokenData.monthlyData[0].circulating)}</div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>Added</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#40FB50' }}>{formatNumber(tokenData.circulating)}</div>
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
          <div style={{ position: 'absolute', left: '5px', top: '6px', bottom: '6px', width: '2px', background: 'linear-gradient(to bottom, #40FB50, #3B82F6)', borderRadius: '1px' }} />
          {tokenData.milestones.map((milestone, i) => (
            <div key={i} style={{ position: 'relative', paddingBottom: '16px' }}>
              <div style={{ position: 'absolute', left: '-17px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#40FB50', border: '2px solid #FFF', boxShadow: '0 0 0 2px #40FB50' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>{milestone.event}</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                {milestone.date} &bull; <span style={{ color: '#40FB50', fontWeight: 600 }}>{milestone.circulating}</span> circulating
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
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023' }}>Monthly Supply Data</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Complete historical data</div>
          </div>
          <span style={{ fontSize: '14px', color: '#666', transform: expandedTable ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>&#9660;</span>
        </div>
        {expandedTable && (
          <div style={{ background: '#FFF', borderRadius: '0 0 12px 12px', marginTop: '-12px', paddingTop: '12px', border: '1px solid #E0E0E0', borderTop: 'none', maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>Date</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>Circulating</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>MoM Change</th>
                  <th style={{ textAlign: 'right', padding: '10px 16px', background: '#F5F5F5', fontWeight: 600, color: '#122023', borderBottom: '1px solid #E0E0E0', position: 'sticky', top: 0 }}>MoM %</th>
                </tr>
              </thead>
              <tbody>
                {[...tokenData.monthlyData].reverse().map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', fontWeight: 500, color: '#122023' }}>{row.date}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', fontFamily: 'monospace', color: '#666' }}>{formatFullNumber(row.circulating)}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', fontFamily: 'monospace', color: row.momChange ? '#10B981' : '#666' }}>
                      {row.momChange ? `+${formatFullNumber(row.momChange)}` : '-'}
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #E0E0E0', textAlign: 'right', color: '#666' }}>
                      {row.momPct ? `+${row.momPct.toFixed(2)}%` : '-'}
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
