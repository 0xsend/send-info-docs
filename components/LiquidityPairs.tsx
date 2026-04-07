'use client';

const MONO = '"DM Mono", monospace';

const pairs = [
  { base: 'CC', quote: 'CUSD', baseLabel: 'Canton Coin', quoteLabel: 'CUSD Stablecoin', type: 'Volatile / Stable', baseColor: '#1a8a2e', quoteColor: '#122023' },
  { base: 'CC', quote: 'USDCx', baseLabel: 'Canton Coin', quoteLabel: 'Bridged USDC', type: 'Volatile / Stable', baseColor: '#1a8a2e', quoteColor: '#2aaa3e' },
  { base: 'USDCx', quote: 'CUSD', baseLabel: 'Bridged USDC', quoteLabel: 'CUSD Stablecoin', type: 'Stable / Stable', baseColor: '#2aaa3e', quoteColor: '#122023' },
];

export default function LiquidityPairs() {
  return (
    <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
      {pairs.map((pair, i) => (
        <div key={`${pair.base}-${pair.quote}`} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 700, color: '#FFF', background: pair.baseColor, padding: '3px 8px', borderRadius: '5px' }}>{pair.base}</span>
            <span style={{ color: '#ccc', fontSize: '13px' }}>/</span>
            <span style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 700, color: '#FFF', background: pair.quoteColor, padding: '3px 8px', borderRadius: '5px' }}>{pair.quote}</span>
            <span style={{ fontSize: '12px', color: '#999', marginLeft: '8px' }}>{pair.baseLabel} — {pair.quoteLabel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#999' }}>{pair.type}</span>
            <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 600, color: '#1a8a2e', background: '#e8f5e9', padding: '2px 7px', borderRadius: '4px' }}>Live</span>
          </div>
        </div>
      ))}
    </div>
  );
}
