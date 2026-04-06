'use client';

import { useState } from 'react';

// ============ REVENUE DATA ============
const sendAppRevenue = [
  {
    date: '3/2026',
    sendtags: { amount: 872, tx: '0xfde6bd33c1c9a5ce376536e0093b04bb89c1aa309c2cc8de7273d06f24da3eb9' },
    trades: { amount: 690.69, tx: '0x054ea0135e7554ebc4f09d0f4ea07dbcfefb149b9c493ad90e9243adceaf23da' },
    transactions: { amount: 641.48, tx: '0x75afc4ddffc40dc1ca72162d9e648a6d49237adde0b23b109725b52b290f31f7' },
    total: 2204.17,
  },
  {
    date: '2/2026',
    sendtags: { amount: 1935, tx: '0x890613d5ca57fd8ada76a8d14c4c42801c808a774eb8c6fc99a1fc7c7c6a43d7' },
    trades: { amount: 987.63, tx: '0x434cb0328e114fed0d74430822e4552fd2d21f4e13caca5a195b3ffbc5aa7353' },
    transactions: { amount: 507.23, tx: '0x979ea140321b370a2058fbaa5c5d62d383464b5fbf9dce83ed01c15f0f29c8a6' },
    total: 3429.86,
  },
  {
    date: '1/2026',
    sendtags: { amount: 519, tx: '0x48c4c1bb06e1d77be740e9dae6498de0d61d5d6785d15cb68642554dba189f2b' },
    trades: { amount: 780.38, tx: '0x734ff71ddafbea76db4c351414b07b5e03a5909b5c389e5a6e04827aaa1fa165' },
    transactions: { amount: 436.30, tx: '0xceef226bafd76675730e4b3e53bab806e1210475005271df9ed761da8972c4e4' },
    total: 1735.68,
  },
  {
    date: '12/2025',
    sendtags: { amount: 462, tx: '0x5045542ec9de6d918d868872117def5a772d28d990c27dd71dd575b3c33162fe' },
    trades: { amount: 832.79, tx: '0x59bc0e2f1b84123b64f00028fae6837cc4674000170b207f8950b9aa66f08075' },
    transactions: { amount: 433.97, tx: '0x536625d144d17f443a5c1abaf5846643f4a70a954a3c5d47feb880fffb6dd545' },
    total: 1728.76,
  },
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
  { date: '3/2026', yield: 9584.59, total: 9584.59 },
  { date: '2/2026', yield: 10798.35, total: 10798.35 },
  { date: '1/2026', yield: 14900.96, total: 14900.96 },
  { date: '12/2025', yield: 12499.02, total: 12499.02 },
  { date: '11/2025', yield: 8640.14, total: 8640.14 },
  { date: '10/2025', yield: 1523.76, total: 1523.76 },
  { date: '9/2025', yield: 217.69, total: 217.69 },
];

// Calculate totals
const totalSendAppRevenue = sendAppRevenue.reduce((sum, r) => sum + r.total, 0);
const totalSendtags = sendAppRevenue.reduce((sum, r) => sum + (r.sendtags?.amount || 0), 0);
const totalTrades = sendAppRevenue.reduce((sum, r) => sum + (r.trades?.amount || 0), 0);
const totalTransactions = sendAppRevenue.reduce((sum, r) => sum + (r.transactions?.amount || 0), 0);
const totalCusdRevenue = cusdRevenue.reduce((sum, r) => sum + r.total, 0);
const grandTotal = totalSendAppRevenue + totalCusdRevenue;

// ============ FORMATTERS ============
const fmt = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtK = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : fmt(n);
const pct = (n: number, total: number) => `${((n / total) * 100).toFixed(1)}%`;

// ============ LINK ICON ============
const ExtLink = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
    <path d="M3 9L9 3M9 3H5M9 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ============ REVENUE CHART ============
function RevenueChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const chartData = [...sendAppRevenue].reverse();
  const maxTotal = Math.max(...chartData.map(d => d.total));
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const w = 580, h = 200;
  const pad = { top: 24, right: 16, bottom: 32, left: 48 };
  const iw = w - pad.left - pad.right;
  const ih = h - pad.top - pad.bottom;
  const barW = (iw / chartData.length) - 6;

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
        const y = pad.top + ih * (1 - ratio);
        return (
          <g key={i}>
            <line x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke={ratio === 0 ? '#ddd' : '#f0f0f0'} />
            {ratio > 0 && (
              <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#999" fontFamily='"DM Mono", monospace'>
                {fmtK(maxTotal * ratio)}
              </text>
            )}
          </g>
        );
      })}

      {chartData.map((d, i) => {
        const x = pad.left + i * (iw / chartData.length) + 3;
        const totalH = (d.total / maxTotal) * ih;
        const stH = ((d.sendtags?.amount || 0) / maxTotal) * ih;
        const trH = ((d.trades?.amount || 0) / maxTotal) * ih;
        const txH = ((d.transactions?.amount || 0) / maxTotal) * ih;
        const isHov = hovered === i;
        const dim = hovered !== null && !isHov;
        const [month] = d.date.split('/');

        return (
          <g key={d.date} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
            <rect x={x} y={pad.top} width={barW} height={ih} fill="transparent" />
            <rect x={x} y={pad.top + ih - stH} width={barW} height={stH} fill="#122023" rx="0" opacity={dim ? 0.2 : 1} />
            <rect x={x} y={pad.top + ih - stH - trH} width={barW} height={trH} fill="#1a8a2e" opacity={dim ? 0.2 : 1} />
            <rect x={x} y={pad.top + ih - stH - trH - txH} width={barW} height={txH} fill="#2aaa3e" rx="2" opacity={dim ? 0.2 : 1} />

            {isHov && (
              <g>
                <rect x={Math.min(x + barW / 2 - 40, w - 100)} y={pad.top + ih - totalH - 36} width="80" height="26" rx="6" fill="#122023" />
                <text x={Math.min(x + barW / 2, w - 60)} y={pad.top + ih - totalH - 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF" fontFamily='"DM Mono", monospace'>
                  {fmt(d.total)}
                </text>
              </g>
            )}

            <text x={x + barW / 2} y={h - 8} textAnchor="middle" fontSize="9" fill={isHov ? '#122023' : '#999'} fontWeight={isHov ? 700 : 400} fontFamily='"DM Mono", monospace'>
              {monthNames[parseInt(month) - 1]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ MAIN COMPONENT ============
export default function Revenue() {
  const sources = [
    { label: 'Sendtags', value: totalSendtags, color: '#122023' },
    { label: 'Trades', value: totalTrades, color: '#1a8a2e' },
    { label: 'Transactions', value: totalTransactions, color: '#2aaa3e' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO: Bento ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gridTemplateRows: 'auto auto', gap: '2px', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Grand total */}
        <div style={{
          gridRow: '1 / 3',
          background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 60%, #1e4a4f 100%)',
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '190px',
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#40FB50', marginBottom: '6px' }}>
              Total Revenue
            </div>
            <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6 }}>
              All sources · {sendAppRevenue.length} months tracked
            </div>
          </div>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '48px', fontWeight: 700, color: '#FFF', letterSpacing: '-2px', lineHeight: 1 }}>
            {fmt(grandTotal)}
          </div>
        </div>

        {/* Send App */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>Send App</div>
          <div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '26px', fontWeight: 700, color: '#FFF', letterSpacing: '-1px' }}>{fmt(totalSendAppRevenue)}</div>
            <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>Sendtags · Trades · Transactions</div>
          </div>
        </div>

        {/* Stablecoin */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>Stablecoin Revenue</div>
          <div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '26px', fontWeight: 700, color: '#FFF', letterSpacing: '-1px' }}>{fmt(totalCusdRevenue)}</div>
            <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>via DeFi vaults · monthly</div>
          </div>
        </div>
      </div>

      {/* ── CHART + BREAKDOWN ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px' }}>
        {/* Chart */}
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px 28px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '16px' }}>
            Monthly Trend
          </div>
          <RevenueChart />
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
            {sources.map((s) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: s.color }} />
                <span style={{ fontSize: '11px', color: '#888' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Source breakdown */}
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '20px' }}>
            By Source
          </div>
          {/* Proportional bar */}
          <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '20px' }}>
            {sources.map((s) => (
              <div key={s.label} style={{ width: pct(s.value, totalSendAppRevenue), background: s.color }} />
            ))}
          </div>
          {sources.map((s, i) => (
            <div key={s.label} style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: s.color }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{s.label}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#aaa' }}>{pct(s.value, totalSendAppRevenue)}</span>
              </div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '16px', fontWeight: 600, color: '#122023', paddingLeft: '16px' }}>
                {fmt(s.value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEND APP TABLE ── */}
      <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>Send App Revenue History</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date', 'Sendtags', 'Trades', 'Transactions', 'Total'].map((h, i) => (
                  <th key={h} style={{
                    textAlign: i === 4 ? 'right' : 'left',
                    padding: '10px 16px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    borderBottom: '2px solid #E0E0E0',
                    fontFamily: '"DM Mono", monospace',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#122023' }}>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 700, color: '#40FB50', fontFamily: '"DM Mono", monospace' }}>TOTAL</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 600, color: '#FFF', fontFamily: '"DM Mono", monospace' }}>{fmt(totalSendtags)}</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 600, color: '#FFF', fontFamily: '"DM Mono", monospace' }}>{fmt(totalTrades)}</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 600, color: '#FFF', fontFamily: '"DM Mono", monospace' }}>{fmt(totalTransactions)}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#40FB50', textAlign: 'right', fontFamily: '"DM Mono", monospace' }}>{fmt(totalSendAppRevenue)}</td>
              </tr>
              {sendAppRevenue.map((row) => (
                <tr key={row.date}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#122023', fontFamily: '"DM Mono", monospace', borderBottom: '1px solid #F0F0F0' }}>
                    {row.date}
                  </td>
                  {[row.sendtags, row.trades, row.transactions].map((item, ci) => (
                    <td key={ci} style={{ padding: '12px 16px', fontSize: '13px', borderBottom: '1px solid #F0F0F0' }}>
                      {item ? (
                        <a
                          href={`https://basescan.org/tx/${item.tx}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#122023', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: '"DM Mono", monospace' }}
                        >
                          {fmt(item.amount)}
                          <ExtLink />
                        </a>
                      ) : (
                        <span style={{ color: '#ddd' }}>—</span>
                      )}
                    </td>
                  ))}
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, color: '#122023', textAlign: 'right', fontFamily: '"DM Mono", monospace', borderBottom: '1px solid #F0F0F0' }}>
                    {fmt(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── STABLECOIN TABLE ── */}
      <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>Stablecoin Revenue History</div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>via DeFi vaults</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date', 'Yield', 'Running Total'].map((h, i) => (
                  <th key={h} style={{
                    textAlign: i === 2 ? 'right' : 'left',
                    padding: '10px 16px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    borderBottom: '2px solid #E0E0E0',
                    fontFamily: '"DM Mono", monospace',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#122023' }}>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 700, color: '#40FB50', fontFamily: '"DM Mono", monospace' }}>TOTAL</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', fontWeight: 600, color: '#FFF', fontFamily: '"DM Mono", monospace' }}>{fmt(totalCusdRevenue)}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 700, color: '#40FB50', textAlign: 'right', fontFamily: '"DM Mono", monospace' }}>{fmt(totalCusdRevenue)}</td>
              </tr>
              {cusdRevenue.map((row, i) => {
                const runningTotal = totalCusdRevenue - cusdRevenue.slice(0, i).reduce((sum, r) => sum + r.total, 0);
                return (
                  <tr key={row.date}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#122023', fontFamily: '"DM Mono", monospace', borderBottom: '1px solid #F0F0F0' }}>{row.date}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#122023', fontFamily: '"DM Mono", monospace', borderBottom: '1px solid #F0F0F0' }}>{fmt(row.yield)}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#888', textAlign: 'right', fontFamily: '"DM Mono", monospace', borderBottom: '1px solid #F0F0F0' }}>{fmt(runningTotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
