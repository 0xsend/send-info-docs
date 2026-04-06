'use client';

import { useState } from 'react';

// ============ FUNDING DATA ============
const fundingRounds = [
  { round: 1, label: 'TGE', date: 'June 2023', amount: 340000, price: 0.0034, tokens: 100000000, valuation: 340000, contributors: 171 },
  { round: 2, label: 'Round 2', date: 'August 2023', amount: 100000, price: 0.01, tokens: 10000000, valuation: 1000000, contributors: 5 },
  { round: 3, label: 'Round 3', date: 'May 2024', amount: 150000, price: 0.03125, tokens: 4800000, valuation: 8800000, contributors: 1 },
  { round: 4, label: 'Round 4', date: 'January 2025', amount: 100000, price: 0.0143, tokens: 7000000, valuation: 4300000, contributors: 2 },
];

const totalRaised = fundingRounds.reduce((sum, r) => sum + r.amount, 0);
const totalTokensSold = fundingRounds.reduce((sum, r) => sum + r.tokens, 0);
const totalContributors = fundingRounds.reduce((sum, r) => sum + r.contributors, 0);
const latestValuation = fundingRounds[fundingRounds.length - 1].valuation;

// ============ FORMATTERS ============
const fmt = (n: number) => `$${n.toLocaleString()}`;
const fmtM = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : fmt(n);
const fmtNum = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toLocaleString();
const fmtPrice = (n: number) => `$${n.toFixed(4)}`;
const MONO = '"DM Mono", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

// ============ COMBINED CHART: Price + Valuation ============
function FundingChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxVal = Math.max(...fundingRounds.map(r => r.valuation));
  const maxPrice = Math.max(...fundingRounds.map(r => r.price));

  const w = 600, h = 260;
  const pad = { top: 32, right: 40, bottom: 50, left: 50 };
  const iw = w - pad.left - pad.right;
  const ih = h - pad.top - pad.bottom;

  const barW = Math.min(iw / fundingRounds.length - 24, 80);

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      {/* Y-axis: valuation */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = pad.top + ih * (1 - ratio);
        const val = maxVal * ratio;
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="#f0f0f0" />
            <text x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#bbb" fontFamily={MONO}>
              {fmtM(val)}
            </text>
          </g>
        );
      })}

      {/* Bars: valuation */}
      {fundingRounds.map((r, i) => {
        const x = pad.left + (i + 0.5) * (iw / fundingRounds.length) - barW / 2;
        const barH = (r.valuation / maxVal) * ih;
        const isHov = hovered === i;
        const dim = hovered !== null && !isHov;

        return (
          <g key={r.round} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <rect x={x} y={pad.top} width={barW} height={ih} fill="transparent" />
            <rect
              x={x} y={pad.top + ih - barH} width={barW} height={barH}
              fill="#122023" rx="4"
              opacity={dim ? 0.15 : isHov ? 1 : 0.7}
              style={{ transition: 'opacity 0.15s' }}
            />

            {/* Tooltip */}
            {isHov && (
              <g>
                <rect x={x + barW / 2 - 60} y={pad.top + ih - barH - 52} width="120" height="42" rx="6" fill="#122023" />
                <text x={x + barW / 2} y={pad.top + ih - barH - 36} textAnchor="middle" fontSize="10" fill="#6b7c7f" fontFamily={MONO}>Valuation</text>
                <text x={x + barW / 2} y={pad.top + ih - barH - 20} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF" fontFamily={MONO}>{fmtM(r.valuation)}</text>
              </g>
            )}

            {/* X labels */}
            <text x={x + barW / 2} y={h - 24} textAnchor="middle" fontSize="12" fontWeight="600" fill={isHov ? '#122023' : '#888'} fontFamily={MONO}>
              R{r.round}
            </text>
            <text x={x + barW / 2} y={h - 10} textAnchor="middle" fontSize="9" fill="#bbb" fontFamily={MONO}>
              {r.date.split(' ')[0].substring(0, 3)} '{r.date.split(' ')[1].slice(-2)}
            </text>
          </g>
        );
      })}

      {/* Price line overlay */}
      {(() => {
        const pricePoints = fundingRounds.map((r, i) => ({
          x: pad.left + (i + 0.5) * (iw / fundingRounds.length),
          y: pad.top + ih - (r.price / (maxPrice * 1.2)) * ih,
          price: r.price,
        }));
        const linePath = pricePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

        return (
          <g>
            <path d={linePath} fill="none" stroke="#40FB50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {pricePoints.map((p, i) => {
              const isPeak = p.price === maxPrice;
              const isHov = hovered === i;
              return (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={isHov ? 6 : (isPeak ? 5 : 4)} fill={isPeak || isHov ? '#40FB50' : '#FFF'} stroke="#40FB50" strokeWidth="2" />
                  {(isHov || isPeak) && (
                    <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a8a2e" fontFamily={MONO}>
                      {fmtPrice(p.price)}
                    </text>
                  )}
                </g>
              );
            })}
            {/* Right Y-axis label for price */}
            <text x={w - pad.right + 8} y={pad.top + 4} textAnchor="start" fontSize="9" fill="#1a8a2e" fontFamily={MONO}>Price</text>
          </g>
        );
      })()}
    </svg>
  );
}

// ============ MAIN COMPONENT ============
export default function FundingRounds() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gridTemplateRows: 'auto auto', gap: '2px', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Total raised */}
        <div style={{ gridRow: '1 / 3', background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 60%, #1e4a4f 100%)', padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}>
          <div>
            <div style={{ ...LABEL, color: '#40FB50', letterSpacing: '3px', marginBottom: '6px' }}>Total Raised</div>
            <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6 }}>
              Across {fundingRounds.length} funding rounds · {totalContributors} contributors
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: '48px', fontWeight: 700, color: '#FFF', letterSpacing: '-2px', lineHeight: 1 }}>
            {fmt(totalRaised)}
          </div>
        </div>

        {/* Latest valuation */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={LABEL}>Latest Valuation</div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '26px', fontWeight: 700, color: '#FFF', letterSpacing: '-1px' }}>{fmtM(latestValuation)}</div>
            <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>Round 4 · Jan 2025</div>
          </div>
        </div>

        {/* Tokens + Contributors */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <div style={LABEL}>Tokens Sold</div>
            <div style={{ fontFamily: MONO, fontSize: '22px', fontWeight: 700, color: '#FFF', marginTop: '6px' }}>{fmtNum(totalTokensSold)}</div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '2px' }}>{((totalTokensSold / 1_000_000_000) * 100).toFixed(1)}% of supply</div>
          </div>
          <div>
            <div style={LABEL}>Contributors</div>
            <div style={{ fontFamily: MONO, fontSize: '22px', fontWeight: 700, color: '#FFF', marginTop: '6px' }}>{totalContributors}</div>
          </div>
        </div>
      </div>

      {/* ── COMBINED CHART ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div style={LABEL}>Valuation & Price by Round</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontSize: '10px', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '8px', borderRadius: '2px', background: '#122023', opacity: 0.7 }} />
              Valuation
            </span>
            <span style={{ fontSize: '10px', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '2px', background: '#40FB50' }} />
              Price
            </span>
          </div>
        </div>
        <FundingChart />
        {/* Price summary strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderTop: '1px solid #f0f0f0', marginTop: '16px', paddingTop: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Starting</div>
            <div style={{ fontFamily: MONO, fontSize: '16px', fontWeight: 700, color: '#122023' }}>{fmtPrice(fundingRounds[0].price)}</div>
            <div style={{ fontSize: '10px', color: '#ccc' }}>TGE</div>
          </div>
          <div style={{ textAlign: 'center', borderLeft: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '10px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Peak</div>
            <div style={{ fontFamily: MONO, fontSize: '16px', fontWeight: 700, color: '#1a8a2e' }}>{fmtPrice(Math.max(...fundingRounds.map(r => r.price)))}</div>
            <div style={{ fontSize: '10px', color: '#ccc' }}>R3</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#999', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Latest</div>
            <div style={{ fontFamily: MONO, fontSize: '16px', fontWeight: 700, color: '#122023' }}>{fmtPrice(fundingRounds[fundingRounds.length - 1].price)}</div>
            <div style={{ fontSize: '10px', color: '#ccc' }}>R4</div>
          </div>
        </div>
      </div>

      {/* ── ROUNDS TABLE ── */}
      <div style={{ ...CARD, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>Funding Rounds</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Round', 'Date', 'Raised', 'Price', 'Tokens', 'Valuation', 'Contributors'].map((h, i) => (
                  <th key={h} style={{
                    textAlign: i < 2 ? 'left' : 'right',
                    padding: '10px 16px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    borderBottom: '2px solid #E0E0E0',
                    fontFamily: MONO,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fundingRounds.map((r, ri) => (
                <tr key={r.round} style={{ background: ri % 2 === 0 ? '#fafafa' : '#FFF' }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#122023', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#40FB50' }} />
                      {r.label === 'TGE' ? 'Round 1 (TGE)' : `Round ${r.round}`}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#888', borderBottom: '1px solid #f0f0f0' }}>{r.date}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', textAlign: 'right', fontWeight: 600, color: '#122023', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>{fmt(r.amount)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'right', color: '#888', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>{fmtPrice(r.price)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'right', color: '#888', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>{fmtNum(r.tokens)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'right', color: '#888', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>{fmtM(r.valuation)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', textAlign: 'right', color: '#888', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>{r.contributors}</td>
                </tr>
              ))}
              <tr style={{ background: '#122023' }}>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 700, color: '#40FB50', fontFamily: MONO }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#40FB50' }} />
                    Total
                  </div>
                </td>
                <td style={{ padding: '14px 16px', color: '#4a5c5f' }}>—</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700, color: '#40FB50', fontFamily: MONO }}>{fmt(totalRaised)}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', color: '#4a5c5f', fontFamily: MONO, fontSize: '12px' }}>—</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: '#FFF', fontFamily: MONO, fontSize: '12px' }}>{fmtNum(totalTokensSold)}</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', color: '#4a5c5f', fontFamily: MONO, fontSize: '12px' }}>—</td>
                <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: '#FFF', fontFamily: MONO, fontSize: '12px' }}>{totalContributors}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
