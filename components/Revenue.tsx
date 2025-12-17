'use client';

import React from 'react';

// ============ REVENUE DATA ============
const sendAppRevenue = [
  {
    date: '11/2025',
    sendtags: { amount: 2510, tx: '0x50c83276e832c7ab8eb0fd38072ccc2e36a4c972ed73d16e2508a62b9c93f0d8' },
    trades: { amount: 5018.81, tx: '0x93751e93a48b37b19b726d63a30bcb86f1e47e5fbdddd0397615bf3b5431852e' },
    transactions: { amount: 736.16, tx: '0xd7e5fb24c62636bbc4e13167a61e8ebb78c3e5fcea35335631502ff1c7b8e1c2' },
    total: 8264.97,
  },
  {
    date: '10/2025',
    sendtags: { amount: 6050.50, tx: '0x20eba99e0b13c04b4611ee23567c50f860f11f1ef11ff60c556b07eb8194f9e0' },
    trades: { amount: 10100.13, tx: '0xf743cabc6cf5b9637843761b24f941fe9c9ede98506f7d96308a53378be0861d' },
    transactions: { amount: 805.92, tx: '0x1b756fd0044a6de65e9a497ebfa9f0aeee7aa2823390939aa63583367571dc09' },
    total: 16956.55,
  },
  {
    date: '9/2025',
    sendtags: { amount: 2784.50, tx: '0x766da9341b497b80804c4ad0aec9c2fa257f17dae80b67ab70d4ee28f91fa7ff' },
    trades: { amount: 7271.79, tx: '0xa3ded58988005bbbf4b75c713b8847043e78faa674f3c52a54425d61af1f15e8' },
    transactions: { amount: 539.69, tx: '0xfd6ff8fe4865d4e2725fea32ececd828e72469966f26d8f0a143678aa388f71c' },
    total: 10595.98,
  },
  {
    date: '8/2025',
    sendtags: { amount: 103.50, tx: '0xc2a5ad6c307612faab54f94fd8a304d99fa28d113b03cce30a08e58347160cc8' },
    trades: { amount: 208.90, tx: '0xb67ca84dfdb6a4c9ad9e95418ab63e2e5aaa246f9019e44dce82c898e8c3a6fe' },
    transactions: { amount: 343.10, tx: '0x1402ef362c2943d16f3922cd8f65d69f2103e21b369b63317a1e6a281382c390' },
    total: 655.50,
  },
  {
    date: '7/2025',
    sendtags: { amount: 194.50, tx: '0x95b977030ab679edc632b50a5b8ecad4f91a708d6e40e993c77ebc9ad080bc50' },
    trades: { amount: 206.38, tx: '0x130980e6a327a16bd2a4cf9d44880a2962e27195321b14ecbff9c2bbbc6b9296' },
    transactions: { amount: 599.98, tx: '0x114ef4392651e22d251350afe081a9ba50df4a3b5f3d8cbe125e738efe27e0cf' },
    total: 1000.86,
  },
  {
    date: '6/2025',
    sendtags: { amount: 266, tx: '0x57d09b328ba419416c211baf34a664349cbe304105bfdecc9ee31917cfdb2814' },
    trades: { amount: 249.41, tx: '0x9e1159993db60dfbcf68fc725a72bb22f5431a53c242d252b5374bf2c49dcaea' },
    transactions: { amount: 816.17, tx: '0x860c88fc180f8cac364377a6389c5f86c30079b48a1d078ce87ec2efb1346d07' },
    total: 1331.58,
  },
  {
    date: '5/2025',
    sendtags: { amount: 423.50, tx: '0xf51bc75dc596e2e192e5219e021e4f04ccd8f21722c832390635f711b66ecfc5' },
    trades: { amount: 253.39, tx: '0xdaa2cfcf94716f1d540e62972d056bff0aac597ce2c8e97f7c8144796c678fcd' },
    transactions: { amount: 1148.06, tx: '0xe8f4faa489143b9737c25b1c5111f6484c2dddebf7f7393a1e3482aeb566fa3a' },
    total: 1824.95,
  },
  {
    date: '4/2025',
    sendtags: { amount: 3876.50, tx: '0x477b920524c1a42b946003620534993e827e470e79b9474f2b160fe3764a7411' },
    trades: { amount: 333.64, tx: '0x477b920524c1a42b946003620534993e827e470e79b9474f2b160fe3764a7411' },
    transactions: { amount: 1137.77, tx: '0x1d2ca7115c69805117826c3b05fbbd46c524cbe7faffac950609a5f41be07b32' },
    total: 5347.90,
  },
  {
    date: '3/2025',
    sendtags: { amount: 3731.50, tx: '0x65fae61cdc74d5c8bebf748d571c805fa53b63773f3516bb452c2a017ac5ef81' },
    trades: null,
    transactions: { amount: 278.46, tx: '0x25cab17b62de03dfc0531706a66a54988e1c65bca3a58c4948721fe4090df828' },
    total: 4009.96,
  },
];

const cusdRevenue = [
  { date: '10/2025', yield: 1523.76, total: 1523.76 },
];

// Calculate totals
const totalSendAppRevenue = sendAppRevenue.reduce((sum, r) => sum + r.total, 0);
const totalSendtags = sendAppRevenue.reduce((sum, r) => sum + (r.sendtags?.amount || 0), 0);
const totalTrades = sendAppRevenue.reduce((sum, r) => sum + (r.trades?.amount || 0), 0);
const totalTransactions = sendAppRevenue.reduce((sum, r) => sum + (r.transactions?.amount || 0), 0);
const totalCusdRevenue = cusdRevenue.reduce((sum, r) => sum + r.total, 0);
const grandTotal = totalSendAppRevenue + totalCusdRevenue;

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
  metricCardHighlight: {
    backgroundColor: '#F8FFF8',
    borderRadius: '12px',
    padding: '20px',
    border: '2px solid #40FB50',
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
  metricValueGreen: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#40FB50',
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
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 12px',
    borderBottom: '2px solid #E0E0E0',
    color: '#666',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  td: {
    padding: '14px 12px',
    borderBottom: '1px solid #F0F0F0',
    color: '#122023',
  },
  link: {
    color: '#40FB50',
    textDecoration: 'none',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  badge: {
    backgroundColor: '#E8FDE9',
    color: '#122023',
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 8px',
    borderRadius: '4px',
  },
  chartContainer: {
    marginTop: '8px',
  },
};

// ============ UTILITY FUNCTIONS ============
function formatCurrency(value: number): string {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function shortenTx(tx: string): string {
  return `${tx.slice(0, 6)}...${tx.slice(-4)}`;
}

// ============ REVENUE CHART ============
function RevenueChart() {
  const chartData = [...sendAppRevenue].reverse();
  const chartHeight = 180;
  const chartWidth = 600;
  const padding = { top: 20, right: 20, bottom: 50, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxValue = Math.max(...chartData.map(d => d.total));
  const barWidth = (innerWidth / chartData.length) - 12;

  return (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ maxWidth: '100%' }}>
      {/* Y-axis grid */}
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

      {/* Stacked bars */}
      {chartData.map((d, i) => {
        const x = padding.left + i * (innerWidth / chartData.length) + 6;
        const sendtagsHeight = (d.sendtags?.amount || 0) / maxValue * innerHeight;
        const tradesHeight = (d.trades?.amount || 0) / maxValue * innerHeight;
        const transactionsHeight = (d.transactions?.amount || 0) / maxValue * innerHeight;

        let yOffset = padding.top + innerHeight;

        return (
          <g key={d.date}>
            {/* Sendtags */}
            <rect
              x={x}
              y={yOffset - sendtagsHeight}
              width={barWidth}
              height={sendtagsHeight}
              fill="#40FB50"
              rx="2"
            />
            {/* Trades */}
            <rect
              x={x}
              y={yOffset - sendtagsHeight - tradesHeight}
              width={barWidth}
              height={tradesHeight}
              fill="#7CFC7C"
              rx="2"
            />
            {/* Transactions */}
            <rect
              x={x}
              y={yOffset - sendtagsHeight - tradesHeight - transactionsHeight}
              width={barWidth}
              height={transactionsHeight}
              fill="#B8F5B8"
              rx="2"
            />
            {/* Date label */}
            <text
              x={x + barWidth / 2}
              y={chartHeight - 20}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
              transform={`rotate(-45, ${x + barWidth / 2}, ${chartHeight - 20})`}
            >
              {d.date}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(${chartWidth - 150}, 10)`}>
        <rect x="0" y="0" width="12" height="12" fill="#40FB50" rx="2" />
        <text x="16" y="10" fontSize="10" fill="#666">Sendtags</text>
        <rect x="0" y="18" width="12" height="12" fill="#7CFC7C" rx="2" />
        <text x="16" y="28" fontSize="10" fill="#666">Trades</text>
        <rect x="0" y="36" width="12" height="12" fill="#B8F5B8" rx="2" />
        <text x="16" y="46" fontSize="10" fill="#666">Transactions</text>
      </g>
    </svg>
  );
}

// ============ BREAKDOWN DONUT ============
function RevenueBreakdown() {
  const total = totalSendtags + totalTrades + totalTransactions;
  const data = [
    { label: 'Sendtags', value: totalSendtags, color: '#40FB50' },
    { label: 'Trades', value: totalTrades, color: '#7CFC7C' },
    { label: 'Transactions', value: totalTransactions, color: '#B8F5B8' },
  ];

  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((segment, i) => {
          const percentage = segment.value / total;
          const strokeDasharray = `${percentage * circumference} ${circumference}`;
          const rotation = currentOffset * 360 - 90;
          currentOffset += percentage;

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            />
          );
        })}
        <text x={size / 2} y={size / 2 - 8} textAnchor="middle" fontSize="11" fill="#666">Total</text>
        <text x={size / 2} y={size / 2 + 12} textAnchor="middle" fontSize="16" fontWeight="700" fill="#122023">
          {formatCurrency(total)}
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((segment, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: segment.color }} />
            <span style={{ fontSize: '13px', color: '#666' }}>{segment.label}:</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>
              {formatCurrency(segment.value)} ({((segment.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function Revenue() {
  return (
    <div style={styles.container}>
      {/* Key Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCardHighlight}>
          <div style={styles.metricLabel}>Total Revenue</div>
          <div style={styles.metricValueGreen}>{formatCurrency(grandTotal)}</div>
          <div style={styles.metricSubtext}>All sources combined</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Send App Revenue</div>
          <div style={styles.metricValue}>{formatCurrency(totalSendAppRevenue)}</div>
          <div style={styles.metricSubtext}>{sendAppRevenue.length} months tracked</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>$CUSD Yield</div>
          <div style={styles.metricValue}>{formatCurrency(totalCusdRevenue)}</div>
          <div style={styles.metricSubtext}>Stablecoin yield</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Best Month</div>
          <div style={styles.metricValue}>{formatCurrency(Math.max(...sendAppRevenue.map(r => r.total)))}</div>
          <div style={styles.metricSubtext}>October 2025</div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Monthly Revenue Trend
          <span style={styles.badge}>Send App</span>
        </div>
        <div style={styles.chartContainer}>
          <RevenueChart />
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Revenue Breakdown</div>
        <RevenueBreakdown />
      </div>

      {/* Send App Revenue Table */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="16" height="16" rx="4" stroke="#40FB50" strokeWidth="2"/>
            <path d="M6 10L9 13L14 7" stroke="#40FB50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Send App Revenue
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Sendtags</th>
                <th style={styles.th}>Trades</th>
                <th style={styles.th}>Transactions</th>
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {sendAppRevenue.map((row) => (
                <tr key={row.date}>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{row.date}</td>
                  <td style={styles.td}>
                    {row.sendtags ? (
                      <a
                        href={`https://basescan.org/tx/${row.sendtags.tx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                      >
                        {formatCurrency(row.sendtags.amount)}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ) : '—'}
                  </td>
                  <td style={styles.td}>
                    {row.trades ? (
                      <a
                        href={`https://basescan.org/tx/${row.trades.tx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                      >
                        {formatCurrency(row.trades.amount)}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ) : '—'}
                  </td>
                  <td style={styles.td}>
                    {row.transactions ? (
                      <a
                        href={`https://basescan.org/tx/${row.transactions.tx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.link}
                      >
                        {formatCurrency(row.transactions.amount)}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    ) : '—'}
                  </td>
                  <td style={{ ...styles.td, fontWeight: 700, color: '#40FB50' }}>
                    {formatCurrency(row.total)}
                  </td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#FAFAFA' }}>
                <td style={{ ...styles.td, fontWeight: 700 }}>Total</td>
                <td style={{ ...styles.td, fontWeight: 600 }}>{formatCurrency(totalSendtags)}</td>
                <td style={{ ...styles.td, fontWeight: 600 }}>{formatCurrency(totalTrades)}</td>
                <td style={{ ...styles.td, fontWeight: 600 }}>{formatCurrency(totalTransactions)}</td>
                <td style={{ ...styles.td, fontWeight: 700, color: '#40FB50' }}>{formatCurrency(totalSendAppRevenue)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSD Revenue Table */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#1565C0" strokeWidth="2"/>
            <path d="M10 6V10L13 12" stroke="#1565C0" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          $CUSD Stablecoin Revenue
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Yield</th>
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cusdRevenue.map((row) => (
                <tr key={row.date}>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{row.date}</td>
                  <td style={styles.td}>{formatCurrency(row.yield)}</td>
                  <td style={{ ...styles.td, fontWeight: 700, color: '#40FB50' }}>{formatCurrency(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
