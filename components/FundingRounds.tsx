'use client';

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

// ============ VALUATION CHART ============
function ValuationChart() {
  const maxValuation = Math.max(...fundingRounds.map(r => r.valuation));

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', height: '180px', padding: '20px 0' }}>
      {fundingRounds.map((round) => {
        const barHeight = Math.max((round.valuation / maxValuation) * 140, 20);

        return (
          <div key={round.round} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {/* Value label */}
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#122023' }}>
              {formatCurrency(round.valuation)}
            </div>
            {/* Bar */}
            <div
              style={{
                width: '100%',
                maxWidth: '60px',
                height: `${barHeight}px`,
                background: 'linear-gradient(180deg, #40FB50 0%, #2ECC71 100%)',
                borderRadius: '6px 6px 0 0',
              }}
            />
            {/* Labels */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>R{round.round}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>
                {round.date.split(' ')[0].substring(0, 3)} '{round.date.split(' ')[1].slice(-2)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ PRICE TREND CHART ============
function PriceTrendChart() {
  const maxPrice = Math.max(...fundingRounds.map(r => r.price));
  const peakRound = fundingRounds.find(r => r.price === maxPrice);

  // SVG dimensions
  const width = 500;
  const height = 200;
  const padding = { top: 40, right: 30, bottom: 50, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scale
  const yMax = 0.035;

  // Calculate points
  const points = fundingRounds.map((round, i) => {
    const x = padding.left + (i / (fundingRounds.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (round.price / yMax) * chartHeight;
    return { x, y, round };
  });

  // Create line path
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Create area path
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="priceGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#40FB50" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#40FB50" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaPath} fill="url(#priceGradient)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#40FB50"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points and labels */}
        {points.map((p, i) => {
          const isPeak = p.round.price === maxPrice;
          return (
            <g key={i}>
              {/* Point */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isPeak ? 8 : 6}
                fill={isPeak ? '#40FB50' : '#FFF'}
                stroke="#40FB50"
                strokeWidth="3"
              />
              {isPeak && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="14"
                  fill="none"
                  stroke="#40FB50"
                  strokeWidth="2"
                  opacity="0.3"
                />
              )}

              {/* Price label above */}
              <text
                x={p.x}
                y={p.y - 16}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={isPeak ? '#10B981' : '#666'}
              >
                {formatPrice(p.round.price)}
              </text>

              {/* X-axis label */}
              <text
                x={p.x}
                y={height - 20}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="#122023"
              >
                R{p.round.round}
              </text>
              <text
                x={p.x}
                y={height - 6}
                textAnchor="middle"
                fontSize="10"
                fill="#888"
              >
                {p.round.date.split(' ')[0].substring(0, 3)} '{p.round.date.split(' ')[1].slice(-2)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Summary stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        padding: '16px',
        background: '#FAFAFA',
        borderRadius: '10px',
        border: '1px solid #EBEBEB',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Starting</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>{formatPrice(fundingRounds[0].price)}</div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>TGE</div>
        </div>
        <div style={{ textAlign: 'center', borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Peak</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#10B981' }}>{formatPrice(maxPrice)}</div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>R{peakRound?.round}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Latest</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#122023' }}>{formatPrice(fundingRounds[fundingRounds.length - 1].price)}</div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>R4</div>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function FundingRounds() {
  const tokensSoldPercent = (totalTokensSold / 1_000_000_000) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '8px 0' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        <div style={{ background: 'linear-gradient(135deg, #40FB50 0%, #32d946 100%)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#122023', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', opacity: 0.8 }}>Total Raised</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#122023' }}>{formatCurrency(totalRaised)}</div>
          <div style={{ fontSize: '12px', color: '#122023', marginTop: '4px', opacity: 0.7 }}>Across {fundingRounds.length} rounds</div>
        </div>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Tokens Sold</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#122023' }}>{formatNumber(totalTokensSold)}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{tokensSoldPercent.toFixed(1)}% of supply</div>
        </div>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Contributors</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#122023' }}>{totalContributors}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Total participants</div>
        </div>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '20px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Latest Market Cap</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#122023' }}>{formatCurrency(latestValuation)}</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Round 4 (Jan 2025)</div>
        </div>
      </div>

      {/* Market Cap History */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Market Cap History</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Circulating supply market cap by round</div>
        <ValuationChart />
      </div>

      {/* Funding Rounds Grid */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Funding Rounds</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>Detailed breakdown of each round</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {fundingRounds.map((round) => (
            <div
              key={round.round}
              style={{
                background: '#FAFAFA',
                borderRadius: '10px',
                padding: '20px',
                border: '1px solid #EBEBEB',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    {round.date}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#122023' }}>
                    {round.label === 'TGE' ? 'Round 1 (TGE)' : `Round ${round.round}`}
                  </div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #40FB50 0%, #32d946 100%)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#122023' }}>{formatCurrency(round.amount)}</div>
                </div>
              </div>

              {/* Details grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Price</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>{formatPrice(round.price)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Tokens</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>{formatNumber(round.tokens)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Market Cap</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>{formatCurrency(round.valuation)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Contributors</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>{round.contributors}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Trend */}
      <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Token Price Trend</div>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>Price per token across funding rounds</div>
        <PriceTrendChart />
      </div>

      {/* Summary Table */}
      <div style={{ background: '#FFF', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Round Summary</div>
          <div style={{ fontSize: '13px', color: '#666' }}>Complete funding history</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '14px 20px', background: '#F8F8F8', fontWeight: 600, color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E0E0E0' }}>Round</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', background: '#F8F8F8', fontWeight: 600, color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E0E0E0' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '14px 20px', background: '#F8F8F8', fontWeight: 600, color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E0E0E0' }}>Amount</th>
                <th style={{ textAlign: 'right', padding: '14px 20px', background: '#F8F8F8', fontWeight: 600, color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E0E0E0' }}>Price</th>
                <th style={{ textAlign: 'right', padding: '14px 20px', background: '#F8F8F8', fontWeight: 600, color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E0E0E0' }}>Tokens</th>
                <th style={{ textAlign: 'right', padding: '14px 20px', background: '#F8F8F8', fontWeight: 600, color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #E0E0E0' }}>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {fundingRounds.map((round) => (
                <tr key={round.round}>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', fontWeight: 600, color: '#122023' }}>
                    {round.label === 'TGE' ? 'Round 1 (TGE)' : `Round ${round.round}`}
                  </td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', color: '#666' }}>{round.date}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', fontWeight: 600, color: '#122023' }}>
                    {formatCurrency(round.amount)}
                  </td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', fontFamily: 'monospace', fontSize: '12px', color: '#666' }}>{formatPrice(round.price)}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#666' }}>{formatNumber(round.tokens)}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#666' }}>{formatCurrency(round.valuation)}</td>
                </tr>
              ))}
              <tr style={{ background: '#FAFAFA' }}>
                <td style={{ padding: '14px 20px', fontWeight: 700, color: '#122023' }}>Total</td>
                <td style={{ padding: '14px 20px', color: '#666' }}>—</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: '#122023' }}>{formatCurrency(totalRaised)}</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', color: '#666' }}>—</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 600, color: '#122023' }}>{formatNumber(totalTokensSold)}</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', color: '#666' }}>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Progress bar */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #E0E0E0', background: '#FAFAFA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
            <span style={{ color: '#666', fontWeight: 500 }}>Tokens Sold in Funding Rounds</span>
            <span style={{ color: '#122023', fontWeight: 600 }}>{tokensSoldPercent.toFixed(1)}% of Total Supply</span>
          </div>
          <div style={{ height: '8px', background: '#E8E8E8', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${tokensSoldPercent}%`,
              background: 'linear-gradient(90deg, #40FB50 0%, #32d946 100%)',
              borderRadius: '4px',
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
