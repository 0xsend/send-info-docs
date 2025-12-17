'use client';

import React from 'react';

// ============ TREASURY DATA ============
const treasuryData = [
  { date: '12/2025', send: 214371974, cc: 55312796, cusd: 2752008, usdc: 36049.98, pol: 790976, fiat: 20783.78, eth: 0, isLatest: true },
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

// ============ STYLES ============
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    padding: '8px 0',
  },
  infoCallout: {
    backgroundColor: '#E8F4FD',
    border: '1px solid #B8DAFF',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#004085',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  metricCard: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  metricIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
  },
  metricLabel: {
    fontSize: '13px',
    color: '#666',
    fontWeight: 500,
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#122023',
  },
  metricSubtext: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#122023',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '13px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 10px',
    borderBottom: '2px solid #E0E0E0',
    color: '#666',
    fontWeight: 600,
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap' as const,
  },
  td: {
    padding: '12px 10px',
    borderBottom: '1px solid #F0F0F0',
    color: '#122023',
    whiteSpace: 'nowrap' as const,
  },
  latestRow: {
    backgroundColor: '#F8FFF8',
  },
  tipCallout: {
    backgroundColor: '#E8FDE9',
    border: '1px solid #40FB50',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#122023',
    marginTop: '16px',
  },
  chartContainer: {
    height: '200px',
    marginTop: '8px',
  },
  toggleButton: {
    backgroundColor: '#F5F5F5',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    color: '#122023',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 500,
  },
  badge: {
    backgroundColor: '#40FB50',
    color: '#122023',
    fontSize: '10px',
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: '4px',
    marginLeft: '8px',
  },
};

// ============ UTILITY FUNCTIONS ============
function formatNumber(value: number): string {
  if (value === 0) return '—';
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatCurrency(value: number): string {
  if (value === 0) return '—';
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

// ============ STABLECOIN CHART ============
function StablecoinChart() {
  const recentData = treasuryData.slice(0, 12).reverse();
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate total stablecoins for each month
  const stablecoinData = recentData.map(d => ({
    date: d.date,
    total: d.cusd + d.usdc + d.pol,
  }));

  const maxValue = Math.max(...stablecoinData.map(d => d.total));
  const barWidth = innerWidth / stablecoinData.length - 8;

  return (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ maxWidth: '100%' }}>
      {/* Y-axis labels */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = padding.top + innerHeight * (1 - ratio);
        const value = maxValue * ratio;
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={chartWidth - padding.right}
              y2={y}
              stroke="#F0F0F0"
              strokeDasharray="4,4"
            />
            <text
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#999"
            >
              {formatCurrency(value)}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {stablecoinData.map((d, i) => {
        const barHeight = maxValue > 0 ? (d.total / maxValue) * innerHeight : 0;
        const x = padding.left + i * (innerWidth / stablecoinData.length) + 4;
        const y = padding.top + innerHeight - barHeight;

        return (
          <g key={d.date}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#40FB50"
              rx="3"
              opacity={i === stablecoinData.length - 1 ? 1 : 0.7}
            />
            <text
              x={x + barWidth / 2}
              y={chartHeight - 8}
              textAnchor="middle"
              fontSize="9"
              fill="#666"
              transform={`rotate(-45, ${x + barWidth / 2}, ${chartHeight - 8})`}
            >
              {d.date.replace('/20', '/')}
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
  const chartHeight = 140;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 30, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxSend = Math.max(...recentData.map(d => d.send));
  const minSend = Math.min(...recentData.map(d => d.send));

  const points = recentData.map((d, i) => {
    const x = padding.left + (i / (recentData.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((d.send - minSend) / (maxSend - minSend)) * innerHeight;
    return { x, y, data: d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  return (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ maxWidth: '100%' }}>
      {/* Grid */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = padding.top + innerHeight * (1 - ratio);
        const value = minSend + (maxSend - minSend) * ratio;
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={chartWidth - padding.right}
              y2={y}
              stroke="#F0F0F0"
              strokeDasharray="4,4"
            />
            <text
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#999"
            >
              {formatNumber(value)}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={areaPath} fill="#40FB50" opacity="0.15" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#40FB50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Points */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === points.length - 1 ? 5 : 3}
          fill={i === points.length - 1 ? '#40FB50' : '#FFF'}
          stroke="#40FB50"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

// ============ MAIN COMPONENT ============
export default function Treasury() {
  const [showAllData, setShowAllData] = React.useState(false);
  const displayData = showAllData ? treasuryData : treasuryData.slice(0, 12);

  const totalStablecoins = currentHoldings.cusd + currentHoldings.usdc + currentHoldings.pol + currentHoldings.fiat;

  return (
    <div style={styles.container}>
      {/* Info Callout */}
      <div style={styles.infoCallout}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#004085" strokeWidth="2"/>
          <path d="M10 9V14M10 6V7" stroke="#004085" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>Treasury balances are updated on the 1st of every month.</span>
      </div>

      {/* Current Holdings */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{ ...styles.metricIcon, backgroundColor: '#E8FDE9', color: '#122023', fontSize: '11px' }}>$SEND</div>
            <span style={styles.metricLabel}>$SEND Token</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(currentHoldings.send)}</div>
          <div style={styles.metricSubtext}>Treasury allocation</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{ ...styles.metricIcon, backgroundColor: '#FFF3E0', color: '#E65100', fontSize: '12px' }}>$CC</div>
            <span style={styles.metricLabel}>$CC Canton Coin</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(currentHoldings.cc)}</div>
          <div style={styles.metricSubtext}>$CC holdings</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{ ...styles.metricIcon, backgroundColor: '#E3F2FD', color: '#1565C0', fontSize: '10px' }}>$CUSD</div>
            <span style={styles.metricLabel}>$CUSD</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(currentHoldings.cusd)}</div>
          <div style={styles.metricSubtext}>Stablecoin</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{ ...styles.metricIcon, backgroundColor: '#E8F5E9', color: '#2E7D32', fontSize: '10px' }}>$USDC</div>
            <span style={styles.metricLabel}>$USDC</span>
          </div>
          <div style={styles.metricValue}>{formatCurrency(currentHoldings.usdc)}</div>
          <div style={styles.metricSubtext}>Circle stablecoin</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{ ...styles.metricIcon, backgroundColor: '#F3E5F5', color: '#7B1FA2' }}>POL</div>
            <span style={styles.metricLabel}>Protocol Liquidity</span>
          </div>
          <div style={styles.metricValue}>{formatCurrency(currentHoldings.pol)}</div>
          <div style={styles.metricSubtext}>POL (USDC)</div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <div style={{ ...styles.metricIcon, backgroundColor: '#ECEFF1', color: '#455A64' }}>🏦</div>
            <span style={styles.metricLabel}>Fiat Bank</span>
          </div>
          <div style={styles.metricValue}>{formatCurrency(currentHoldings.fiat)}</div>
          <div style={styles.metricSubtext}>USD in bank</div>
        </div>
      </div>

      {/* Summary Card */}
      <div style={{ ...styles.section, backgroundColor: '#FAFAFA' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Total Stablecoin Position</div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#122023' }}>
              {formatCurrency(totalStablecoins)}
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>CUSD + USDC + POL + Fiat</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>As of</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#122023' }}>December 2025</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div style={styles.section}>
          <div style={styles.sectionTitle}>SEND Holdings (12 months)</div>
          <SendHoldingsChart />
        </div>
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Stablecoin Position (12 months)</div>
          <StablecoinChart />
        </div>
      </div>

      {/* Historical Data Table */}
      <div style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={styles.sectionTitle}>Historical Holdings</div>
          <button
            onClick={() => setShowAllData(!showAllData)}
            style={styles.toggleButton}
          >
            {showAllData ? 'Show Less' : 'Show All Data'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ transform: showAllData ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            >
              <path d="M4 6L8 10L12 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>$SEND</th>
                <th style={styles.th}>$CC</th>
                <th style={styles.th}>$CUSD</th>
                <th style={styles.th}>$USDC</th>
                <th style={styles.th}>POL</th>
                <th style={styles.th}>Fiat</th>
                <th style={styles.th}>ETH</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => (
                <tr key={row.date} style={row.isLatest ? styles.latestRow : {}}>
                  <td style={styles.td}>
                    <span style={{ fontWeight: row.isLatest ? 700 : 400 }}>
                      {row.date}
                    </span>
                    {row.isLatest && <span style={styles.badge}>LATEST</span>}
                  </td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{formatNumber(row.send)}</td>
                  <td style={styles.td}>{formatNumber(row.cc)}</td>
                  <td style={styles.td}>{formatNumber(row.cusd)}</td>
                  <td style={styles.td}>{formatCurrency(row.usdc)}</td>
                  <td style={styles.td}>{formatCurrency(row.pol)}</td>
                  <td style={styles.td}>{formatCurrency(row.fiat)}</td>
                  <td style={styles.td}>{row.eth > 0 ? row.eth.toFixed(2) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tip */}
        <div style={styles.tipCallout}>
          <strong>Recent Changes:</strong> Notice the significant changes in SEND token holdings starting February 2025, reflecting the token upgrade. POL (Protocol Owned Liquidity) represents USDC in liquidity pools.
        </div>
      </div>
    </div>
  );
}
