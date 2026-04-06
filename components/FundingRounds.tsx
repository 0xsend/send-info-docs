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

function formatCurrencyFull(value: number): string {
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

// ============ SHARED STYLES ============
const LABEL_STYLE: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#999',
  marginBottom: '6px',
};

const CARD_STYLE: React.CSSProperties = {
  background: '#FFF',
  borderRadius: '12px',
  border: '1px solid #E0E0E0',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
};

const MONO: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", "Fira Mono", "Menlo", "Courier New", monospace',
};

// ============ BENTO HERO ============
function BentoHero() {
  const tokensSoldPercent = (totalTokensSold / 1_000_000_000) * 100;

  return (
    <div
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#0e191b',
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '2px',
      }}
    >
      {/* Main cell — Total Raised */}
      <div
        style={{
          gridColumn: '1 / 2',
          gridRow: '1 / 3',
          background: '#122023',
          padding: '36px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px',
        }}
      >
        <div>
          <div style={{ ...LABEL_STYLE, color: '#40FB50', letterSpacing: '2px' }}>
            Total Raised
          </div>
          <div
            style={{
              ...MONO,
              fontSize: '60px',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1,
              marginTop: '12px',
              letterSpacing: '-1px',
            }}
          >
            {formatCurrencyFull(totalRaised)}
          </div>
          <div style={{ fontSize: '14px', color: '#4a6b6f', marginTop: '10px', fontWeight: 500 }}>
            Across {fundingRounds.length} funding rounds
          </div>
        </div>

        {/* Token supply bar */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#4a6b6f', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Tokens Sold
            </span>
            <span style={{ ...MONO, fontSize: '11px', color: '#40FB50', fontWeight: 600 }}>
              {tokensSoldPercent.toFixed(2)}% of supply
            </span>
          </div>
          <div style={{ height: '6px', background: '#1e3336', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${tokensSoldPercent}%`,
                background: 'linear-gradient(90deg, #40FB50 0%, #32d946 100%)',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Secondary cell — Latest Valuation */}
      <div
        style={{
          background: '#171f22',
          padding: '28px 28px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ ...LABEL_STYLE, color: '#4a6b6f' }}>Latest Valuation</div>
        <div style={{ ...MONO, fontSize: '32px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1, marginTop: '8px' }}>
          {formatCurrency(latestValuation)}
        </div>
        <div style={{ fontSize: '12px', color: '#4a6b6f', marginTop: '8px' }}>Round 4 · Jan 2025</div>
      </div>

      {/* Secondary cell — Total Tokens Sold */}
      <div
        style={{
          background: '#171f22',
          padding: '20px 28px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderTop: '2px solid #0e191b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...LABEL_STYLE, color: '#4a6b6f' }}>Tokens Sold</div>
            <div style={{ ...MONO, fontSize: '28px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1, marginTop: '6px' }}>
              {formatNumber(totalTokensSold)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...LABEL_STYLE, color: '#4a6b6f' }}>Contributors</div>
            <div style={{ ...MONO, fontSize: '28px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1, marginTop: '6px' }}>
              {totalContributors}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ VALUATION CHART ============
function ValuationChart() {
  const maxValuation = Math.max(...fundingRounds.map(r => r.valuation));

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', height: '180px', padding: '20px 0 0' }}>
      {fundingRounds.map((round) => {
        const barHeight = Math.max((round.valuation / maxValuation) * 130, 20);

        return (
          <div key={round.round} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...MONO, fontSize: '12px', fontWeight: 600, color: '#122023' }}>
              {formatCurrency(round.valuation)}
            </div>
            <div
              style={{
                width: '100%',
                maxWidth: '60px',
                height: `${barHeight}px`,
                background: 'linear-gradient(180deg, #40FB50 0%, #2ECC71 100%)',
                borderRadius: '6px 6px 0 0',
              }}
            />
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

  const width = 500;
  const height = 200;
  const padding = { top: 40, right: 30, bottom: 50, left: 20 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const yMax = 0.035;

  const points = fundingRounds.map((round, i) => {
    const x = padding.left + (i / (fundingRounds.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - (round.price / yMax) * chartHeight;
    return { x, y, round };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
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

        <path d={areaPath} fill="url(#priceGradient)" />
        <path
          d={linePath}
          fill="none"
          stroke="#40FB50"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => {
          const isPeak = p.round.price === maxPrice;
          return (
            <g key={i}>
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
              <text
                x={p.x}
                y={p.y - 16}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={isPeak ? '#10B981' : '#666'}
                fontFamily='"JetBrains Mono", "Fira Mono", monospace'
              >
                {formatPrice(p.round.price)}
              </text>
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
        gap: '0',
        background: '#FAFAFA',
        borderRadius: '10px',
        border: '1px solid #EBEBEB',
        overflow: 'hidden',
      }}>
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ ...LABEL_STYLE, marginBottom: '6px' }}>Starting</div>
          <div style={{ ...MONO, fontSize: '20px', fontWeight: 700, color: '#122023' }}>{formatPrice(fundingRounds[0].price)}</div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>TGE</div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', borderLeft: '1px solid #E0E0E0', borderRight: '1px solid #E0E0E0' }}>
          <div style={{ ...LABEL_STYLE, marginBottom: '6px' }}>Peak</div>
          <div style={{ ...MONO, fontSize: '20px', fontWeight: 700, color: '#10B981' }}>{formatPrice(maxPrice)}</div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>R{peakRound?.round}</div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ ...LABEL_STYLE, marginBottom: '6px' }}>Latest</div>
          <div style={{ ...MONO, fontSize: '20px', fontWeight: 700, color: '#122023' }}>{formatPrice(fundingRounds[fundingRounds.length - 1].price)}</div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>R4</div>
        </div>
      </div>
    </div>
  );
}

// ============ FUNDING ROUNDS TABLE ============
function FundingRoundsTable() {
  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '13px 18px',
    background: '#F8F8F8',
    fontWeight: 600,
    color: '#999',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    borderBottom: '1px solid #E0E0E0',
    whiteSpace: 'nowrap',
  };

  const thRight: React.CSSProperties = { ...thStyle, textAlign: 'right' };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Round</th>
            <th style={thStyle}>Date</th>
            <th style={thRight}>Amount Raised</th>
            <th style={thRight}>Price</th>
            <th style={thRight}>Tokens</th>
            <th style={thRight}>Valuation</th>
            <th style={thRight}>Contributors</th>
          </tr>
        </thead>
        <tbody>
          {fundingRounds.map((round, i) => {
            const isEven = i % 2 === 0;
            const rowBg = isEven ? '#FAFAFA' : '#FFFFFF';

            return (
              <tr key={round.round} style={{ background: rowBg }}>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', fontWeight: 600, color: '#122023' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#40FB50',
                        flexShrink: 0,
                      }}
                    />
                    {round.label === 'TGE' ? 'Round 1 (TGE)' : `Round ${round.round}`}
                  </div>
                </td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', color: '#666' }}>
                  {round.date}
                </td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', fontWeight: 600, color: '#122023', ...MONO }}>
                  {formatCurrencyFull(round.amount)}
                </td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#555', ...MONO, fontSize: '12px' }}>
                  {formatPrice(round.price)}
                </td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#555', ...MONO, fontSize: '12px' }}>
                  {formatNumber(round.tokens)}
                </td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#555', ...MONO, fontSize: '12px' }}>
                  {formatCurrency(round.valuation)}
                </td>
                <td style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', textAlign: 'right', color: '#555', ...MONO, fontSize: '12px' }}>
                  {round.contributors}
                </td>
              </tr>
            );
          })}

          {/* Dark total row */}
          <tr style={{ background: '#122023' }}>
            <td style={{ padding: '14px 18px', fontWeight: 700, color: '#40FB50' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#40FB50', flexShrink: 0 }} />
                Total
              </div>
            </td>
            <td style={{ padding: '14px 18px', color: '#4a6b6f' }}>—</td>
            <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 700, color: '#40FB50', ...MONO }}>
              {formatCurrencyFull(totalRaised)}
            </td>
            <td style={{ padding: '14px 18px', textAlign: 'right', color: '#4a6b6f', ...MONO, fontSize: '12px' }}>—</td>
            <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 600, color: '#40FB50', ...MONO, fontSize: '12px' }}>
              {formatNumber(totalTokensSold)}
            </td>
            <td style={{ padding: '14px 18px', textAlign: 'right', color: '#4a6b6f', ...MONO, fontSize: '12px' }}>—</td>
            <td style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 600, color: '#40FB50', ...MONO, fontSize: '12px' }}>
              {totalContributors}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function FundingRounds() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>

      {/* Bento Hero */}
      <BentoHero />

      {/* Funding Rounds Table */}
      <div style={{ ...CARD_STYLE, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ ...LABEL_STYLE }}>Funding Rounds</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '16px' }}>
            Complete round breakdown
          </div>
        </div>
        <FundingRoundsTable />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Market Cap History */}
        <div style={{ ...CARD_STYLE, padding: '24px' }}>
          <div style={{ ...LABEL_STYLE }}>Valuation by Round</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>
            Market Cap History
          </div>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
            Circulating supply market cap per round
          </div>
          <ValuationChart />
        </div>

        {/* Token Price Trend */}
        <div style={{ ...CARD_STYLE, padding: '24px' }}>
          <div style={{ ...LABEL_STYLE }}>Price per Token</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>
            Token Price Trend
          </div>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
            Price across funding rounds
          </div>
          <PriceTrendChart />
        </div>
      </div>

    </div>
  );
}
