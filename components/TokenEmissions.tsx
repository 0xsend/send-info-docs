'use client';

import { useState } from 'react';

// ============ TOKEN DATA ============
const tokenData = {
  totalSupply: 1_000_000_000,
  circulating: 346_292_487,
  nonCirculating: 653_707_513,
  circulationRate: 34.63,

  allocations: [
    { name: 'Rewards', allocation: 300_000_000, remaining: 221_019_521, color: '#40FB50' },
    { name: 'Treasury', allocation: 200_000_000, remaining: 206_991_992, color: '#2dd444' },
    { name: 'Exchange Listings', allocation: 200_000_000, remaining: 110_000_000, color: '#1a8a2e' },
    { name: 'Team', allocation: 100_000_000, remaining: 57_535_000, color: '#6b7c7f' },
    { name: 'Contributors', allocation: 100_000_000, remaining: 58_161_000, color: '#4a5c5f' },
    { name: 'Liquidity', allocation: 100_000_000, remaining: 0, color: '#2a3c3f' },
  ],

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
    { date: 'Q1 2026', circulating: 346_292_487, qoqChange: 18_306_982, qoqPct: 5.58 },
  ],

  inflationData: [
    { period: 'Q3 \'23', annualized: 16.3, tokens: 7_430_439 },
    { period: 'Q4 \'23', annualized: 73.5, tokens: 34_878_902 },
    { period: 'Q1 \'24', annualized: 21.3, tokens: 11_954_538 },
    { period: 'Q2 \'24', annualized: 38.3, tokens: 22_649_488 },
    { period: 'Q3 \'24', annualized: 12.3, tokens: 7_964_056 },
    { period: 'Q4 \'24', annualized: 8.8, tokens: 5_862_565 },
    { period: 'Q1 \'25', annualized: 29.3, tokens: 20_016_968 },
    { period: 'Q2 \'25', annualized: 6.1, tokens: 4_463_167 },
    { period: 'Q3 \'25', annualized: 24.0, tokens: 17_874_980 },
    { period: 'Q4 \'25', annualized: 15.8, tokens: 12_440_608 },
    { period: 'Q1 \'26', annualized: 22.3, tokens: 18_306_982 },
  ],

  vestingProgress: [
    { name: 'Team', initial: 100_000_000, released: 42_465_000, pct: 42.5 },
    { name: 'Contributors', initial: 100_000_000, released: 41_839_000, pct: 41.8 },
    { name: 'Rewards', initial: 300_000_000, released: 78_980_479, pct: 26.3 },
  ],

  milestones: [
    { date: 'Q2 2023', event: 'Token Launch (TGE)', circulating: '182M', description: '100M Liquidity + 80M Exchange Listings' },
    { date: 'Q4 2023', event: '225M Circulating', circulating: '225M' },
    { date: 'Q2 2024', event: '259M Circulating', circulating: '259M' },
    { date: 'Q1 2025', event: '293M Circulating', circulating: '293M' },
    { date: 'Q4 2025', event: '328M Circulating', circulating: '328M' },
    { date: 'Q1 2026', event: 'Current — 346M Circulating', circulating: '346M' },
  ],
};

// ============ FORMATTERS ============
const fmt = (num: number) => num.toLocaleString();
const fmtM = (num: number) => `${(num / 1_000_000).toFixed(1)}M`;
const fmtPct = (num: number) => `${num.toFixed(1)}%`;
const MONO = '"SF Mono", "Fira Code", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

// ============ CIRCULATING SUPPLY CHART ============
function SupplyChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = tokenData.quarterlyData;
  const maxVal = 400_000_000;
  const minVal = 150_000_000;
  const range = maxVal - minVal;

  const w = 600, h = 180;
  const pad = { top: 16, right: 12, bottom: 28, left: 44 };
  const iw = w - pad.left - pad.right;
  const ih = h - pad.top - pad.bottom;

  const points = data.map((d, i) => ({
    x: pad.left + (i / (data.length - 1)) * iw,
    y: pad.top + ((maxVal - d.circulating) / range) * ih,
    data: d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${pad.top + ih} L${points[0].x},${pad.top + ih} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="supplyFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#40FB50" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#40FB50" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {[0, 0.5, 1].map((ratio, i) => {
        const y = pad.top + ih * (1 - ratio);
        const val = minVal + range * ratio;
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="#f0f0f0" />
            <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#bbb" fontFamily={MONO}>{fmtM(val)}</text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#supplyFill)" />
      <path d={linePath} fill="none" stroke="#40FB50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((p, i) => {
        const isHov = hovered === i;
        const isLast = i === points.length - 1;
        return (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <rect x={p.x - iw / data.length / 2} y={pad.top} width={iw / data.length} height={ih} fill="transparent" />
            <circle cx={p.x} cy={p.y} r={isHov || isLast ? 5 : 3} fill={isHov || isLast ? '#40FB50' : '#FFF'} stroke="#40FB50" strokeWidth="2" />
            {isHov && (
              <g>
                <line x1={p.x} y1={pad.top} x2={p.x} y2={pad.top + ih} stroke="#40FB50" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                <rect x={Math.max(pad.left, Math.min(p.x - 50, w - pad.right - 100))} y={p.y - 38} width="100" height="28" rx="6" fill="#122023" />
                <text x={Math.max(pad.left + 50, Math.min(p.x, w - pad.right - 50))} y={p.y - 20} textAnchor="middle" fontSize="11" fontWeight="700" fill="#40FB50" fontFamily={MONO}>{fmtM(p.data.circulating)}</text>
              </g>
            )}
            <text x={p.x} y={h - 4} textAnchor="middle" fontSize="8" fill={isHov ? '#122023' : '#ccc'} fontWeight={isHov ? 700 : 400} fontFamily={MONO}>
              {p.data.date.replace(' 20', " '").replace(' ', '')}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ INFLATION CHART ============
function InflationChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = tokenData.inflationData;
  const maxVal = 80;

  const w = 600, h = 160;
  const pad = { top: 24, right: 12, bottom: 28, left: 36 };
  const iw = w - pad.left - pad.right;
  const ih = h - pad.top - pad.bottom;
  const barW = (iw / data.length) - 4;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      {[0, 0.5, 1].map((ratio, i) => {
        const y = pad.top + ih * (1 - ratio);
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="#f0f0f0" />
            <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize="8" fill="#ccc" fontFamily={MONO}>{(maxVal * ratio).toFixed(0)}%</text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const x = pad.left + i * (iw / data.length) + 2;
        const barH = Math.min((d.annualized / maxVal) * ih, ih);
        const isHov = hovered === i;
        const dim = hovered !== null && !isHov;
        // Color based on severity — dark green base, red for high
        const color = d.annualized > 40 ? '#ff6b6b' : d.annualized > 20 ? '#1a8a2e' : '#2aaa3e';

        return (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <rect x={x} y={pad.top} width={barW} height={ih} fill="transparent" />
            <rect x={x} y={pad.top + ih - barH} width={barW} height={barH} fill={color} rx="2" opacity={dim ? 0.2 : 1} style={{ transition: 'opacity 0.15s' }} />
            {isHov && (
              <text x={x + barW / 2} y={pad.top + ih - barH - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill="#122023" fontFamily={MONO}>
                {d.annualized}%
              </text>
            )}
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" fontSize="7" fill={isHov ? '#122023' : '#ccc'} fontWeight={isHov ? 600 : 400} fontFamily={MONO}>
              {d.period}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ MAIN COMPONENT ============
export default function TokenEmissions() {
  const [showTable, setShowTable] = useState(false);
  const [hoveredAlloc, setHoveredAlloc] = useState<number | null>(null);

  const circPct = tokenData.circulationRate;
  const nonCircPct = 100 - circPct;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gridTemplateRows: 'auto auto', gap: '2px', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Total supply */}
        <div style={{ gridRow: '1 / 3', background: '#122023', padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px' }}>
          <div>
            <div style={{ ...LABEL, color: '#40FB50', letterSpacing: '3px', marginBottom: '6px' }}>Total Supply</div>
            <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6 }}>Fixed cap · no inflation beyond allocation</div>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '48px', fontWeight: 700, color: '#FFF', letterSpacing: '-2px', lineHeight: 1 }}>
              1,000,000,000
            </div>
            <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '8px' }}>$SEND tokens</div>
          </div>
        </div>

        {/* Circulating */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={LABEL}>Circulating</div>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: '#40FB50' }}>{fmtPct(circPct)}</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: '26px', fontWeight: 700, color: '#FFF', letterSpacing: '-1px' }}>
            {fmt(tokenData.circulating)}
          </div>
        </div>

        {/* Non-circulating */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={LABEL}>Non-Circulating</div>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: '#6b7c7f' }}>{fmtPct(nonCircPct)}</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: '26px', fontWeight: 700, color: '#FFF', letterSpacing: '-1px' }}>
            {fmt(tokenData.nonCirculating)}
          </div>
        </div>
      </div>

      {/* ── SUPPLY RATIO BAR ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ ...LABEL, marginBottom: '14px' }}>Supply Distribution</div>
        {/* Full-width proportional bar */}
        <div style={{ display: 'flex', height: '32px', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
          <div
            style={{ width: `${circPct}%`, background: '#40FB50', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'width 0.3s' }}
          >
            <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: '#122023' }}>{fmtPct(circPct)}</span>
          </div>
          <div style={{ flex: 1, background: '#122023', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 600, color: '#6b7c7f' }}>{fmtPct(nonCircPct)} locked</span>
          </div>
        </div>
      </div>

      {/* ── ALLOCATION GRID ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ ...LABEL, marginBottom: '16px' }}>Token Allocation</div>

        {/* Stacked horizontal bar — Flourish-style */}
        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '20px' }}>
          {tokenData.allocations.map((a, i) => {
            const pct = (a.allocation / tokenData.totalSupply) * 100;
            return (
              <div
                key={a.name}
                style={{
                  width: `${pct}%`,
                  background: a.color,
                  opacity: hoveredAlloc !== null && hoveredAlloc !== i ? 0.2 : 1,
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredAlloc(i)}
                onMouseLeave={() => setHoveredAlloc(null)}
              />
            );
          })}
        </div>

        {/* Allocation detail rows */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
          {tokenData.allocations.map((a, i) => {
            const pct = (a.allocation / tokenData.totalSupply) * 100;
            const distributed = a.allocation - a.remaining;
            const distPct = (distributed / a.allocation) * 100;
            const dim = hoveredAlloc !== null && hoveredAlloc !== i;

            return (
              <div
                key={a.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 0',
                  borderTop: i < 2 ? 'none' : '1px solid #f0f0f0',
                  opacity: dim ? 0.3 : 1,
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredAlloc(i)}
                onMouseLeave={() => setHoveredAlloc(null)}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: a.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{a.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: '11px', color: '#999' }}>{pct}%</span>
                  </div>
                  {/* Mini progress bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ flex: 1, height: '3px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${distPct}%`, height: '100%', background: a.color, borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontFamily: MONO, fontSize: '10px', color: '#999', flexShrink: 0 }}>{distPct.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CIRCULATING SUPPLY CHART ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div style={LABEL}>Circulating Supply</div>
          <div style={{ fontFamily: MONO, fontSize: '11px', color: '#999' }}>Q2 '23 – Q1 '26</div>
        </div>
        <SupplyChart />
      </div>

      {/* ── INFLATION CHART ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div style={LABEL}>Annualized Inflation</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ fontSize: '10px', color: '#bbb' }}><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '1px', background: '#122023', marginRight: '4px' }} />Normal</span>
            <span style={{ fontSize: '10px', color: '#bbb' }}><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '1px', background: '#ff6b6b', marginRight: '4px' }} />&gt;40%</span>
          </div>
        </div>
        <InflationChart />
      </div>

      {/* ── VESTING ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ ...LABEL, marginBottom: '16px' }}>Vesting Progress</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tokenData.vestingProgress.map((v) => (
            <div key={v.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{v.name}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: MONO, fontSize: '12px', color: '#122023' }}>{fmtM(v.released)}</span>
                  <span style={{ fontFamily: MONO, fontSize: '11px', color: '#ccc' }}>/ {fmtM(v.initial)}</span>
                  <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 600, color: '#122023' }}>{fmtPct(v.pct)}</span>
                </div>
              </div>
              <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${v.pct}%`, height: '100%', background: '#40FB50', borderRadius: '3px', transition: 'width 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MILESTONES — horizontal timeline ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ ...LABEL, marginBottom: '20px' }}>Milestones</div>
        <div style={{ position: 'relative' }}>
          {/* Line */}
          <div style={{ position: 'absolute', top: '7px', left: '0', right: '0', height: '2px', background: '#f0f0f0' }} />
          <div style={{ position: 'absolute', top: '7px', left: '0', width: '100%', height: '2px', background: 'linear-gradient(to right, #40FB50, #40FB50 100%, #f0f0f0 100%)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {tokenData.milestones.map((m, i) => {
              const isLast = i === tokenData.milestones.length - 1;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${100 / tokenData.milestones.length}%` }}>
                  <div style={{
                    width: isLast ? '14px' : '10px',
                    height: isLast ? '14px' : '10px',
                    borderRadius: '50%',
                    background: isLast ? '#40FB50' : '#FFF',
                    border: '2px solid #40FB50',
                    boxShadow: isLast ? '0 0 0 4px rgba(64,251,80,0.15)' : 'none',
                    flexShrink: 0,
                  }} />
                  <div style={{ fontFamily: MONO, fontSize: '10px', color: '#999', marginTop: '8px', textAlign: 'center' }}>
                    {m.date}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: isLast ? '#122023' : '#888', marginTop: '2px', textAlign: 'center' }}>
                    {m.circulating}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── QUARTERLY DATA TABLE ── */}
      <div style={{ ...CARD, overflow: 'hidden' }}>
        <button
          onClick={() => setShowTable(!showTable)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderBottom: showTable ? '1px solid #E0E0E0' : 'none',
          }}
        >
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023', textAlign: 'left' }}>Quarterly Supply Data</div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', textAlign: 'left' }}>Complete historical data</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: showTable ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <path d="M4 6L8 10L12 6" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {showTable && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Quarter', 'Circulating', 'QoQ Change', 'QoQ %'].map((h, i) => (
                    <th key={h} style={{
                      textAlign: i === 0 ? 'left' : 'right',
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
                {[...tokenData.quarterlyData].reverse().map((row, ri) => {
                  const isLatest = ri === 0;
                  return (
                    <tr key={row.date} style={{ background: isLatest ? '#122023' : (ri % 2 === 0 ? '#fafafa' : '#FFF') }}>
                      <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: isLatest ? '#40FB50' : '#122023', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>
                        {row.date}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', textAlign: 'right', color: isLatest ? '#FFF' : '#122023', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>
                        {fmt(row.circulating)}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', textAlign: 'right', color: isLatest ? '#40FB50' : (row.qoqChange ? '#1a8a2e' : '#ccc'), fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>
                        {row.qoqChange ? `+${fmt(row.qoqChange)}` : '—'}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', textAlign: 'right', color: isLatest ? '#6b7c7f' : '#888', fontFamily: MONO, borderBottom: '1px solid #f0f0f0' }}>
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
