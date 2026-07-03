'use client';

import { useEffect, useState, ReactNode } from 'react';

// ============ TOKEN DATA ============
const tokenData = {
  totalSupply: 1_000_000_000,
  circulating: 353_651_363,
  nonCirculating: 646_348_637,
  circulationRate: 35.37,
  asOf: 'June 2026',
  lastUpdated: 'July 2, 2026',

  allocations: [
    { name: 'Rewards', allocation: 300_000_000, remaining: 219_269_521, color: '#B85C1F' },
    { name: 'Treasury', allocation: 200_000_000, remaining: 204_484_116, color: '#4A6E82' },
    { name: 'Exchange Listings', allocation: 200_000_000, remaining: 110_000_000, color: '#C99429' },
    { name: 'Team', allocation: 100_000_000, remaining: 54_575_000, color: '#6B4E71' },
    { name: 'Contributors', allocation: 100_000_000, remaining: 58_020_000, color: '#7C8A3A' },
    { name: 'Liquidity', allocation: 100_000_000, remaining: 0, color: '#A88A5C' },
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
    { date: 'Q2 2026', circulating: 353_651_363, qoqChange: 7_358_876, qoqPct: 2.12 },
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
    { period: 'Q2 \'26', annualized: 8.5, tokens: 7_358_876 },
  ],

  vestingProgress: [
    { name: 'Team', initial: 100_000_000, released: 45_425_000, pct: 45.4 },
    { name: 'Contributors', initial: 100_000_000, released: 41_980_000, pct: 42.0 },
    { name: 'Rewards', initial: 300_000_000, released: 80_730_479, pct: 26.9 },
  ],
};

// ============ THEME (wiki light-cream) ============
const theme = {
  bg: '#faf6ee',
  bgTint: '#f3eee2',
  cardBg: 'rgba(255,252,244,0.78)',
  cardBorder: 'rgba(28,24,20,0.07)',
  cardShadow: '0 1px 3px rgba(28,24,20,0.04), 0 4px 16px rgba(28,24,20,0.05)',

  text: '#1c1814',
  textSecondary: 'rgba(28,24,20,0.6)',
  textDim: 'rgba(28,24,20,0.45)',
  textFaint: 'rgba(28,24,20,0.28)',
  hairline: 'rgba(28,24,20,0.08)',
  hairlineStrong: 'rgba(28,24,20,0.12)',

  brand: '#15803D',
  brandSoft: 'rgba(21,128,61,0.18)',
  brandBg: 'rgba(21,128,61,0.08)',
  danger: '#c73e3e',

  sans: '"DM Sans", system-ui, sans-serif',
  mono: '"DM Mono", ui-monospace, monospace',
};

// ============ FORMATTERS ============
const fmt = (num: number) => num.toLocaleString();
const fmtM = (num: number) => `${(num / 1_000_000).toFixed(1)}M`;
const fmtPct = (num: number) => `${num.toFixed(1)}%`;

// ============ SCOPED CSS ============
function WikiStyles() {
  return (
    <style>{`
      /* ── Break out of info-docs 734px article-container so the wiki
         design can breathe. Modern :has() lets the outer container
         detect our emissions component and drop its max-width. */
      .article-layout:has(.wiki-emissions),
      .article-container:has(.wiki-emissions),
      .article-layout.has-toc:has(.wiki-emissions) .article-container {
        max-width: none !important;
        width: 100% !important;
      }
      /* Hide the TOC when the emissions page shows this component —
         the chapter rails already serve as the page's navigation. */
      .article-layout:has(.wiki-emissions) .article-toc { display: none !important; }

      .wiki-emissions * { box-sizing: border-box; }
      .wiki-emissions {
        font-family: ${theme.sans};
        color: ${theme.text};
        letter-spacing: -0.005em;
      }
      .we-inner {
        max-width: 1080px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      /* ── Eyebrow / display / tagline ────────────────────────────── */
      .we-eyebrow {
        font-family: ${theme.mono};
        font-size: 11px;
        font-weight: 400;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: ${theme.textDim};
      }
      .we-display {
        font-family: ${theme.sans};
        font-size: clamp(40px, 7vw, 72px);
        font-weight: 800;
        letter-spacing: -0.035em;
        line-height: 1.05;
        color: ${theme.text};
        margin: 0;
      }
      .we-tagline {
        font-family: ${theme.sans};
        font-size: clamp(18px, 1.4vw, 21px);
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: -0.01em;
        color: ${theme.textSecondary};
        max-width: 38ch;
        margin: 0;
      }
      .we-lead {
        font-family: ${theme.sans};
        font-size: clamp(19px, 1.6vw, 22px);
        font-weight: 400;
        line-height: 1.42;
        letter-spacing: -0.012em;
        color: ${theme.text};
        margin: 0;
      }
      .we-body {
        font-family: ${theme.sans};
        font-size: 16px;
        line-height: 1.65;
        letter-spacing: -0.005em;
        color: ${theme.textSecondary};
        margin: 0;
      }

      /* ── Editorial chapter — label above, card below ───────────── */
      .we-chapter {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding-top: clamp(28px, 3.4vw, 44px);
      }
      .we-chapter__rail {
        padding: 0;
      }
      .we-chapter__heading {
        font-family: ${theme.sans};
        font-size: clamp(22px, 2vw, 28px);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: ${theme.text};
        margin: 0;
        line-height: 1.15;
      }
      .we-chapter__body {
        padding: clamp(22px, 2.8vw, 32px);
        background: ${theme.cardBg};
        border: 1px solid ${theme.cardBorder};
        border-radius: 20px;
        box-shadow: ${theme.cardShadow};
        backdrop-filter: blur(20px) saturate(1.2);
        -webkit-backdrop-filter: blur(20px) saturate(1.2);
        display: flex;
        flex-direction: column;
        gap: 18px;
        min-width: 0;
      }

      /* ── Numbers ────────────────────────────────────────────────── */
      .we-num {
        font-family: ${theme.mono};
        letter-spacing: -0.015em;
        color: ${theme.text};
        font-variant-numeric: tabular-nums;
      }
      .we-stat-n {
        font-family: ${theme.sans};
        font-size: clamp(40px, 5vw, 64px);
        font-weight: 600;
        letter-spacing: -0.04em;
        line-height: 0.95;
        color: ${theme.text};
        font-variant-numeric: tabular-nums;
      }
      .we-stat-label {
        font-family: ${theme.sans};
        font-size: clamp(13px, 1.1vw, 15px);
        font-weight: 500;
        color: ${theme.textSecondary};
      }

      /* ── Scroll reveal ──────────────────────────────────────────── */
      .we-reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
      }
      .we-reveal.in { opacity: 1; transform: translateY(0); }

      /* ── Alloc rows ─────────────────────────────────────────────── */
      .we-alloc-list {
        list-style: none;
        padding: 0;
        margin: 8px 0 0;
        display: flex;
        flex-direction: column;
        border-top: 1px solid ${theme.hairline};
      }
      .we-alloc-item {
        display: grid;
        grid-template-columns: 60px minmax(0, 1fr) auto;
        column-gap: 21px;
        align-items: baseline;
        padding: 21px 0;
        border-bottom: 1px solid ${theme.hairline};
        transition: background 0.15s;
        cursor: pointer;
      }
      .we-alloc-item.dim { opacity: 0.4; }
      .we-alloc-item__idx {
        font-family: ${theme.mono};
        font-size: 12px;
        letter-spacing: 0.18em;
        color: ${theme.textDim};
        font-variant-numeric: tabular-nums;
      }

      /* ── Ambient wash ───────────────────────────────────────────── */
      .we-ambient {
        position: absolute; inset: 0; z-index: 0;
        pointer-events: none; overflow: hidden;
        border-radius: 24px;
      }
      .we-ambient__blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(140px);
      }
    `}</style>
  );
}

// ============ CHAPTER PRIMITIVE ============
function Chapter({ label, children, reveal = true }: { label: string; children: ReactNode; reveal?: boolean }) {
  return (
    <section className={`we-chapter${reveal ? ' we-reveal' : ''}`}>
      <div className="we-chapter__rail">
        <h2 className="we-chapter__heading">{label}</h2>
      </div>
      <div className="we-chapter__body">{children}</div>
    </section>
  );
}

// ============ CIRCULATING SUPPLY CHART ============
function SupplyChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = tokenData.quarterlyData;
  const maxVal = 400_000_000;
  const minVal = 150_000_000;
  const range = maxVal - minVal;

  const w = 600, h = 200;
  const pad = { top: 16, right: 12, bottom: 30, left: 50 };
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
        <linearGradient id="supplyFillWiki" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={theme.brand} stopOpacity="0.18" />
          <stop offset="100%" stopColor={theme.brand} stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {[0, 0.5, 1].map((ratio, i) => {
        const y = pad.top + ih * (1 - ratio);
        const val = minVal + range * ratio;
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke={theme.hairline} />
            <text x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="10" fill={theme.textDim} fontFamily={theme.mono}>{fmtM(val)}</text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#supplyFillWiki)" />
      <path d={linePath} fill="none" stroke={theme.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((p, i) => {
        const isHov = hovered === i;
        const isLast = i === points.length - 1;
        return (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <rect x={p.x - iw / data.length / 2} y={pad.top} width={iw / data.length} height={ih} fill="transparent" />
            <circle cx={p.x} cy={p.y} r={isHov || isLast ? 5 : 3} fill={isHov || isLast ? theme.brand : theme.bg} stroke={theme.brand} strokeWidth="2" />
            {isHov && (
              <g>
                <line x1={p.x} y1={pad.top} x2={p.x} y2={pad.top + ih} stroke={theme.brand} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                <rect x={Math.max(pad.left, Math.min(p.x - 50, w - pad.right - 100))} y={p.y - 40} width="100" height="28" rx="6" fill={theme.text} />
                <text x={Math.max(pad.left + 50, Math.min(p.x, w - pad.right - 50))} y={p.y - 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={theme.bg} fontFamily={theme.mono}>{fmtM(p.data.circulating)}</text>
              </g>
            )}
            <text x={p.x} y={h - 4} textAnchor="middle" fontSize="9" fill={isHov ? theme.text : theme.textDim} fontWeight={isHov ? 700 : 400} fontFamily={theme.mono}>
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

  const w = 600, h = 170;
  const pad = { top: 24, right: 12, bottom: 30, left: 40 };
  const iw = w - pad.left - pad.right;
  const ih = h - pad.top - pad.bottom;
  const barW = (iw / data.length) - 4;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      {[0, 0.5, 1].map((ratio, i) => {
        const y = pad.top + ih * (1 - ratio);
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke={theme.hairline} />
            <text x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="9" fill={theme.textDim} fontFamily={theme.mono}>{(maxVal * ratio).toFixed(0)}%</text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const x = pad.left + i * (iw / data.length) + 2;
        const barH = Math.min((d.annualized / maxVal) * ih, ih);
        const isHov = hovered === i;
        const dim = hovered !== null && !isHov;
        const color = d.annualized > 40 ? theme.danger : d.annualized > 20 ? theme.brand : '#2a9d45';

        return (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <rect x={x} y={pad.top} width={barW} height={ih} fill="transparent" />
            <rect x={x} y={pad.top + ih - barH} width={barW} height={barH} fill={color} rx="2" opacity={dim ? 0.2 : 1} style={{ transition: 'opacity 0.15s' }} />
            {isHov && (
              <text x={x + barW / 2} y={pad.top + ih - barH - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill={theme.text} fontFamily={theme.mono}>
                {d.annualized}%
              </text>
            )}
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" fontSize="8" fill={isHov ? theme.text : theme.textDim} fontWeight={isHov ? 600 : 400} fontFamily={theme.mono}>
              {d.period}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ SCROLL REVEAL HOOK ============
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.wiki-emissions .we-reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ============ MAIN COMPONENT ============
export default function TokenEmissions() {
  const [showTable, setShowTable] = useState(false);
  const [hoveredAlloc, setHoveredAlloc] = useState<number | null>(null);
  useReveal();

  const circPct = tokenData.circulationRate;
  const latestQ = tokenData.quarterlyData[tokenData.quarterlyData.length - 1];

  const heroStats = [
    { n: fmtM(tokenData.circulating), label: 'Circulating' },
    { n: '1B', label: 'Fixed cap' },
    { n: fmtPct(circPct), label: 'Rate' },
    { n: latestQ.date.replace(' 20', " '"), label: 'Latest snapshot' },
  ];

  return (
    <div
      className="wiki-emissions"
      style={{
        background: theme.bg,
        borderRadius: 24,
        padding: 'clamp(34px, 5vw, 72px) clamp(20px, 3vw, 44px) clamp(55px, 7vw, 128px)',
        position: 'relative',
      }}
    >
      <WikiStyles />

      {/* Ambient washes — sized for full-width container */}
      <div className="we-ambient" aria-hidden>
        <div className="we-ambient__blob" style={{
          top: '-8%', left: '-8%', width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(21,128,61,0.10) 0%, transparent 65%)',
        }} />
        <div className="we-ambient__blob" style={{
          bottom: '-14%', right: '-10%', width: 900, height: 900,
          background: 'radial-gradient(circle, rgba(190,170,130,0.16) 0%, transparent 65%)',
        }} />
      </div>

      <div className="we-inner">

        {/* ── LAST UPDATED ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginBottom: 34 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: theme.brand }} />
          <span style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textSecondary, letterSpacing: '0.02em' }}>
            Last updated {tokenData.lastUpdated}
          </span>
        </div>

        {/* ── EDITORIAL HERO ── */}
        <header
          className="we-reveal"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 21,
            marginBottom: 'clamp(28px, 3.6vw, 48px)',
          }}
        >
          <div className="we-eyebrow">Token · Supply &amp; Emissions</div>
          <h1 className="we-display">Every $SEND, mapped.</h1>
          <p className="we-tagline">
            Fixed 1B cap. {fmtM(tokenData.circulating)} in circulation as of {tokenData.asOf}. No inflation beyond original allocation — every token has a home.
          </p>

          {/* Stat lockup */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(34px, 5vw, 72px)',
              rowGap: 'clamp(28px, 3.4vw, 48px)',
              marginTop: 13,
              paddingTop: 34,
              borderTop: `1px solid ${theme.hairline}`,
            }}
          >
            {heroStats.map((s) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="we-stat-n">{s.n}</span>
                <span className="we-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ── CHAPTER: SUPPLY MAP ── */}
        <Chapter label="Supply map">
          <p className="we-lead">
            Every $SEND token, mapped by where it lives today.
          </p>

          {/* Circulating / Locked labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <div>
              <div className="we-eyebrow" style={{ color: theme.brand, marginBottom: 4 }}>Circulating</div>
              <div className="we-num" style={{ fontSize: 15, fontWeight: 700 }}>
                {fmt(tokenData.circulating)} <span style={{ color: theme.brand, fontSize: 11, fontWeight: 500 }}>{fmtPct(circPct)}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="we-eyebrow" style={{ marginBottom: 4 }}>Locked</div>
              <div className="we-num" style={{ fontSize: 15, fontWeight: 700 }}>
                {fmt(tokenData.nonCirculating)} <span style={{ color: theme.textDim, fontSize: 11, fontWeight: 500 }}>{fmtPct(100 - circPct)}</span>
              </div>
            </div>
          </div>

          {/* Supply map bar */}
          <div style={{ display: 'flex', height: 44, borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(28,24,20,0.08)' }}>
            <div style={{
              width: `${circPct}%`,
              background: theme.brand,
              opacity: hoveredAlloc !== null ? 0.28 : 1,
              transition: 'opacity 0.2s',
            }} />
            {tokenData.allocations.filter((a) => a.remaining > 0).map((a) => {
              const allocIdx = tokenData.allocations.indexOf(a);
              const pct = (a.remaining / tokenData.totalSupply) * 100;
              const dim = hoveredAlloc !== null && hoveredAlloc !== allocIdx;
              return (
                <div
                  key={a.name}
                  style={{
                    width: `${pct}%`,
                    background: a.color,
                    opacity: dim ? 0.28 : 1,
                    transition: 'opacity 0.2s',
                    cursor: 'pointer',
                    borderLeft: '1px solid rgba(255,255,255,0.35)',
                  }}
                  onMouseEnter={() => setHoveredAlloc(allocIdx)}
                  onMouseLeave={() => setHoveredAlloc(null)}
                  title={`${a.name}: ${fmt(a.remaining)} (${pct.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {tokenData.allocations.filter((a) => a.remaining > 0).map((a) => {
              const pct = (a.remaining / tokenData.totalSupply) * 100;
              const allocIdx = tokenData.allocations.indexOf(a);
              const dim = hoveredAlloc !== null && hoveredAlloc !== allocIdx;
              return (
                <div
                  key={a.name}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: dim ? 0.35 : 1, transition: 'opacity 0.2s', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredAlloc(allocIdx)}
                  onMouseLeave={() => setHoveredAlloc(null)}
                >
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: a.color }} />
                  <span style={{ fontSize: 12, color: theme.text, fontWeight: 500 }}>{a.name}</span>
                  <span style={{ fontFamily: theme.mono, fontSize: 10, color: theme.textDim }}>{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </Chapter>

        {/* ── CHAPTER: ALLOCATIONS ── */}
        <Chapter label="Allocations">
          <p className="we-body">
            Six buckets. {tokenData.allocations.length} allocation categories accounting for the full 1B supply.
          </p>
          <ol className="we-alloc-list">
            {tokenData.allocations.map((a, i) => {
              const pct = (a.allocation / tokenData.totalSupply) * 100;
              const distributed = a.allocation - a.remaining;
              const distPct = a.allocation > 0 ? (distributed / a.allocation) * 100 : 0;
              const isFullyDistributed = a.remaining === 0;
              const dim = hoveredAlloc !== null && hoveredAlloc !== i;

              let status: { label: string; color: string };
              if (isFullyDistributed) status = { label: 'Fully Distributed', color: theme.textSecondary };
              else if (a.remaining > a.allocation) status = { label: 'Accumulating', color: '#7B4FA2' };
              else if (a.name === 'Team' || a.name === 'Contributors') status = { label: 'Vesting', color: '#B85C1F' };
              else status = { label: 'Active', color: theme.brand };

              return (
                <li
                  key={a.name}
                  className={`we-alloc-item${dim ? ' dim' : ''}`}
                  onMouseEnter={() => setHoveredAlloc(i)}
                  onMouseLeave={() => setHoveredAlloc(null)}
                >
                  <span className="we-alloc-item__idx">{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: theme.sans, fontSize: 21, fontWeight: 600, letterSpacing: '-0.015em', color: theme.text }}>
                        {a.name}
                      </span>
                      <span style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textDim }}>{pct}% of supply</span>
                      <span style={{
                        fontFamily: theme.mono,
                        fontSize: 9, fontWeight: 500, color: status.color,
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                      }}>
                        · {status.label}
                      </span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 480 }}>
                      <span style={{ flex: 1, height: 4, background: theme.hairline, borderRadius: 2, overflow: 'hidden' }}>
                        <span style={{ display: 'block', width: `${Math.min(distPct, 100)}%`, height: '100%', background: a.color, borderRadius: 2 }} />
                      </span>
                      <span style={{ fontFamily: theme.mono, fontSize: 10, color: theme.textDim, flexShrink: 0 }}>
                        {distPct < 0 ? `+${Math.abs(distPct).toFixed(0)}%` : `${distPct.toFixed(0)}%`} distributed
                      </span>
                    </span>
                  </span>
                  <span style={{ textAlign: 'right' }}>
                    <span className="we-num" style={{ fontSize: 24, fontWeight: 700 }}>
                      {fmtM(a.remaining)}
                    </span>
                    <span style={{ display: 'block', fontFamily: theme.mono, fontSize: 10, color: theme.textFaint, marginTop: 4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                      remaining
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </Chapter>

        {/* ── CHAPTER: CIRCULATING ── */}
        <Chapter label="Circulating supply">
          <p className="we-body">
            Quarterly circulating supply from launch to today. Q2 &rsquo;23 &ndash; Q2 &rsquo;26.
          </p>
          <SupplyChart />
        </Chapter>

        {/* ── CHAPTER: INFLATION ── */}
        <Chapter label="Annualized inflation">
          <p className="we-body">
            Each bar is a quarter&rsquo;s net token issuance annualized against the prior quarter&rsquo;s circulating supply. Deep-green bars are the norm; red bars mark quarters above 40%.
          </p>
          <InflationChart />
        </Chapter>

        {/* ── CHAPTER: VESTING ── */}
        <Chapter label="Vesting progress">
          <p className="we-body">
            Team, Contributor, and Rewards allocations vest over multi-year schedules. Progress shown against initial pool.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {tokenData.vestingProgress.map((v) => (
              <div key={v.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: theme.text }}>{v.name}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="we-num" style={{ fontSize: 13, fontWeight: 600 }}>{fmtM(v.released)}</span>
                    <span style={{ fontFamily: theme.mono, fontSize: 11, color: theme.textFaint }}>/ {fmtM(v.initial)}</span>
                    <span style={{ fontFamily: theme.mono, fontSize: 12, fontWeight: 700, color: theme.brand }}>{fmtPct(v.pct)}</span>
                  </div>
                </div>
                <div style={{ height: 6, background: theme.hairline, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${v.pct}%`, height: '100%', background: theme.brand, borderRadius: 3, transition: 'width 0.3s' }} />
                </div>
              </div>
            ))}
          </div>
        </Chapter>

        {/* ── CHAPTER: HISTORICAL DATA ── */}
        <Chapter label="Historical data">
          <p className="we-body">
            Full quarterly supply history since token launch. Click to expand.
          </p>
          <button
            onClick={() => setShowTable(!showTable)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 0',
              background: 'none',
              border: 'none',
              borderTop: `1px solid ${theme.hairline}`,
              borderBottom: showTable ? `1px solid ${theme.hairline}` : `1px solid ${theme.hairline}`,
              cursor: 'pointer',
              color: theme.text,
              fontFamily: theme.sans,
              textAlign: 'left',
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, letterSpacing: '-0.01em' }}>Quarterly Supply Data</div>
              <div style={{ fontSize: 12, color: theme.textDim, marginTop: 4 }}>Complete historical breakdown</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: showTable ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
              <path d="M4 6L8 10L12 6" stroke={theme.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {showTable && (
            <div style={{ overflowX: 'auto', marginTop: -8 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Quarter', 'Circulating', 'QoQ Change', 'QoQ %'].map((h, i) => (
                      <th key={h} style={{
                        textAlign: i === 0 ? 'left' : 'right',
                        padding: '12px 16px',
                        fontSize: 10,
                        fontWeight: 500,
                        color: theme.textDim,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        borderBottom: `1px solid ${theme.hairline}`,
                        fontFamily: theme.mono,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...tokenData.quarterlyData].reverse().map((row, ri) => {
                    const isLatest = ri === 0;
                    return (
                      <tr key={row.date} style={{ background: isLatest ? theme.text : 'transparent' }}>
                        <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: isLatest ? theme.brand : theme.text, fontFamily: theme.mono, borderBottom: `1px solid ${theme.hairline}` }}>
                          {row.date}
                        </td>
                        <td style={{ padding: '13px 16px', fontSize: 13, textAlign: 'right', color: isLatest ? theme.bg : theme.text, fontFamily: theme.mono, borderBottom: `1px solid ${theme.hairline}` }}>
                          {fmt(row.circulating)}
                        </td>
                        <td style={{ padding: '13px 16px', fontSize: 13, textAlign: 'right', color: isLatest ? theme.brand : (row.qoqChange ? theme.brand : theme.textFaint), fontFamily: theme.mono, borderBottom: `1px solid ${theme.hairline}` }}>
                          {row.qoqChange ? `+${fmt(row.qoqChange)}` : '—'}
                        </td>
                        <td style={{ padding: '13px 16px', fontSize: 13, textAlign: 'right', color: isLatest ? 'rgba(255,252,244,0.6)' : theme.textSecondary, fontFamily: theme.mono, borderBottom: `1px solid ${theme.hairline}` }}>
                          {row.qoqPct ? `+${row.qoqPct.toFixed(2)}%` : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Chapter>

        <div style={{ height: 55 }} />
      </div>
    </div>
  );
}
