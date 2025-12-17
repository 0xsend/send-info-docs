'use client';

import React from 'react';

// ============ FUNDING DATA ============
const fundingRounds = [
  {
    round: 1,
    label: 'TGE',
    date: 'June 2023',
    amount: 340000,
    price: 0.0034,
    tokens: 100000000,
    valuation: 340000,
    contributors: 171,
  },
  {
    round: 2,
    label: 'Round 2',
    date: 'August 2023',
    amount: 100000,
    price: 0.01,
    tokens: 10000000,
    valuation: 1000000,
    contributors: 5,
  },
  {
    round: 3,
    label: 'Round 3',
    date: 'May 2024',
    amount: 150000,
    price: 0.03125,
    tokens: 4800000,
    valuation: 8800000,
    contributors: 1,
  },
  {
    round: 4,
    label: 'Round 4',
    date: 'January 2025',
    amount: 100000,
    price: 0.0143,
    tokens: 7000000,
    valuation: 4300000,
    contributors: 2,
  },
];

const totalRaised = fundingRounds.reduce((sum, r) => sum + r.amount, 0);
const totalTokensSold = fundingRounds.reduce((sum, r) => sum + r.tokens, 0);
const totalContributors = fundingRounds.reduce((sum, r) => sum + r.contributors, 0);
const latestValuation = fundingRounds[fundingRounds.length - 1].valuation;

// ============ STYLES ============
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    padding: '8px 0',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  metricCard: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  metricLabel: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px',
    fontWeight: 500,
  },
  metricValue: {
    fontSize: '28px',
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
  timeline: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0',
  },
  timelineItem: {
    display: 'flex',
    gap: '16px',
    position: 'relative' as const,
  },
  timelineLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: '80px',
    flexShrink: 0,
  },
  timelineDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#40FB50',
    border: '3px solid #E8FDE9',
    zIndex: 1,
  },
  timelineLine: {
    width: '2px',
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: '4px',
  },
  timelineDate: {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
    textAlign: 'center' as const,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '32px',
  },
  roundCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: '10px',
    padding: '16px 20px',
    border: '1px solid #E8E8E8',
  },
  roundHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  roundLabel: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#122023',
  },
  roundAmount: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#40FB50',
  },
  roundDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
  },
  roundDetailItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  roundDetailLabel: {
    fontSize: '11px',
    color: '#888',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  roundDetailValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#122023',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 16px',
    borderBottom: '2px solid #E0E0E0',
    color: '#666',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #F0F0F0',
    color: '#122023',
  },
  progressContainer: {
    marginTop: '24px',
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '13px',
    color: '#666',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#F0F0F0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#40FB50',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  chartContainer: {
    marginTop: '16px',
  },
};

// ============ UTILITY FUNCTIONS ============
function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
}

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toLocaleString();
}

function formatPrice(value: number): string {
  return `$${value.toFixed(4)}`;
}

// ============ BAR CHART COMPONENT ============
function ValuationChart() {
  const maxValuation = Math.max(...fundingRounds.map(r => r.valuation));
  const chartHeight = 160;
  const barWidth = 60;
  const gap = 24;
  const chartWidth = fundingRounds.length * (barWidth + gap) - gap + 40;

  return (
    <svg width="100%" height={chartHeight + 50} viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`} style={{ maxWidth: '100%' }}>
      {fundingRounds.map((round, i) => {
        const barHeight = (round.valuation / maxValuation) * chartHeight;
        const x = 20 + i * (barWidth + gap);
        const y = chartHeight - barHeight;

        return (
          <g key={round.round}>
            {/* Bar */}
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#40FB50"
              rx="4"
              opacity={0.9}
            />
            {/* Value label */}
            <text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#122023"
            >
              {formatCurrency(round.valuation)}
            </text>
            {/* Round label */}
            <text
              x={x + barWidth / 2}
              y={chartHeight + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              R{round.round}
            </text>
            {/* Date label */}
            <text
              x={x + barWidth / 2}
              y={chartHeight + 38}
              textAnchor="middle"
              fontSize="10"
              fill="#999"
            >
              {round.date.split(' ')[0].substring(0, 3)} '{round.date.split(' ')[1].slice(-2)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ PRICE TREND COMPONENT ============
function PriceTrendChart() {
  const chartHeight = 120;
  const chartWidth = 400;
  const padding = { top: 20, right: 40, bottom: 30, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxPrice = Math.max(...fundingRounds.map(r => r.price));
  const minPrice = Math.min(...fundingRounds.map(r => r.price));

  const points = fundingRounds.map((round, i) => {
    const x = padding.left + (i / (fundingRounds.length - 1)) * innerWidth;
    const y = padding.top + innerHeight - ((round.price - minPrice) / (maxPrice - minPrice)) * innerHeight;
    return { x, y, round };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ maxWidth: '100%' }}>
      {/* Grid lines */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = padding.top + innerHeight * (1 - ratio);
        const price = minPrice + (maxPrice - minPrice) * ratio;
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
              {formatPrice(price)}
            </text>
          </g>
        );
      })}

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#40FB50"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r="6"
            fill="#FFF"
            stroke="#40FB50"
            strokeWidth="3"
          />
          <text
            x={p.x}
            y={chartHeight - 8}
            textAnchor="middle"
            fontSize="10"
            fill="#666"
          >
            R{p.round.round}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ============ MAIN COMPONENT ============
export default function FundingRounds() {
  const tokensSoldPercent = (totalTokensSold / 1_000_000_000) * 100;

  return (
    <div style={styles.container}>
      {/* Key Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Total Raised</div>
          <div style={styles.metricValue}>{formatCurrency(totalRaised)}</div>
          <div style={styles.metricSubtext}>Across {fundingRounds.length} rounds</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Tokens Sold</div>
          <div style={styles.metricValue}>{formatNumber(totalTokensSold)}</div>
          <div style={styles.metricSubtext}>{tokensSoldPercent.toFixed(1)}% of total supply</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Contributors</div>
          <div style={styles.metricValue}>{totalContributors}</div>
          <div style={styles.metricSubtext}>Total participants</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Latest Valuation</div>
          <div style={styles.metricValue}>{formatCurrency(latestValuation)}</div>
          <div style={styles.metricSubtext}>Round 4 (Jan 2025)</div>
        </div>
      </div>

      {/* Valuation History Chart */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Valuation History</div>
        <div style={styles.chartContainer}>
          <ValuationChart />
        </div>
      </div>

      {/* Timeline */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Funding Timeline</div>
        <div style={styles.timeline}>
          {fundingRounds.map((round, index) => (
            <div key={round.round} style={styles.timelineItem}>
              <div style={styles.timelineLeft}>
                <div style={styles.timelineDot} />
                {index < fundingRounds.length - 1 && <div style={styles.timelineLine} />}
                <div style={styles.timelineDate}>{round.date}</div>
              </div>
              <div style={styles.timelineContent}>
                <div style={styles.roundCard}>
                  <div style={styles.roundHeader}>
                    <span style={styles.roundLabel}>
                      Round {round.round} {round.label === 'TGE' ? '(TGE)' : ''}
                    </span>
                    <span style={styles.roundAmount}>{formatCurrency(round.amount)}</span>
                  </div>
                  <div style={styles.roundDetails}>
                    <div style={styles.roundDetailItem}>
                      <span style={styles.roundDetailLabel}>Price</span>
                      <span style={styles.roundDetailValue}>{formatPrice(round.price)}</span>
                    </div>
                    <div style={styles.roundDetailItem}>
                      <span style={styles.roundDetailLabel}>Tokens</span>
                      <span style={styles.roundDetailValue}>{formatNumber(round.tokens)}</span>
                    </div>
                    <div style={styles.roundDetailItem}>
                      <span style={styles.roundDetailLabel}>Valuation</span>
                      <span style={styles.roundDetailValue}>{formatCurrency(round.valuation)}</span>
                    </div>
                    <div style={styles.roundDetailItem}>
                      <span style={styles.roundDetailLabel}>Contributors</span>
                      <span style={styles.roundDetailValue}>{round.contributors}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Trend */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Token Price Trend</div>
        <PriceTrendChart />
      </div>

      {/* Summary Table */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Round Details</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Round</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Tokens</th>
                <th style={styles.th}>Valuation</th>
                <th style={styles.th}>Contributors</th>
              </tr>
            </thead>
            <tbody>
              {fundingRounds.map((round) => (
                <tr key={round.round}>
                  <td style={styles.td}>{round.date}</td>
                  <td style={styles.td}>
                    <span style={{ fontWeight: 600 }}>
                      {round.label === 'TGE' ? 'Round 1 (TGE)' : `Round ${round.round}`}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: 600, color: '#40FB50' }}>
                    {formatCurrency(round.amount)}
                  </td>
                  <td style={styles.td}>{formatPrice(round.price)}</td>
                  <td style={styles.td}>{formatNumber(round.tokens)}</td>
                  <td style={styles.td}>{formatCurrency(round.valuation)}</td>
                  <td style={styles.td}>{round.contributors}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#FAFAFA', fontWeight: 600 }}>
                <td style={styles.td}>—</td>
                <td style={styles.td}>Total</td>
                <td style={{ ...styles.td, color: '#40FB50' }}>{formatCurrency(totalRaised)}</td>
                <td style={styles.td}>—</td>
                <td style={styles.td}>{formatNumber(totalTokensSold)}</td>
                <td style={styles.td}>—</td>
                <td style={styles.td}>{totalContributors}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Progress bar showing tokens sold */}
        <div style={styles.progressContainer}>
          <div style={styles.progressLabel}>
            <span>Tokens Sold in Funding Rounds</span>
            <span>{tokensSoldPercent.toFixed(1)}% of Total Supply</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${tokensSoldPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
