'use client';

import { useState } from 'react';

const MONO = '"DM Mono", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

const pairs = [
  {
    base: 'CC',
    quote: 'CUSD',
    baseLabel: 'Canton Coin',
    quoteLabel: 'CUSD Stablecoin',
    type: 'Volatile / Stable',
    desc: 'The primary trading pair for Canton Coin. Swap between $CC and Send\'s native privacy-first stablecoin.',
    useCase: 'Buy or sell $CC using CUSD',
    lp: 'Earn fees from $CC trading volume',
    baseColor: '#1a8a2e',
    quoteColor: '#122023',
  },
  {
    base: 'CC',
    quote: 'USDCx',
    baseLabel: 'Canton Coin',
    quoteLabel: 'Bridged USDC',
    type: 'Volatile / Stable',
    desc: 'An alternative route for $CC trading using bridged USDC from Ethereum via Pool Party\'s built-in bridge.',
    useCase: 'Trade $CC without converting to CUSD first',
    lp: 'Earn fees from traders bridging and swapping in one flow',
    baseColor: '#1a8a2e',
    quoteColor: '#2aaa3e',
  },
  {
    base: 'USDCx',
    quote: 'CUSD',
    baseLabel: 'Bridged USDC',
    quoteLabel: 'CUSD Stablecoin',
    type: 'Stable / Stable',
    desc: 'Stablecoin-to-stablecoin pair. Both assets target a $1 peg, so this pair typically has low slippage.',
    useCase: 'Convert between USDC (bridged) and CUSD',
    lp: 'Lower risk LP position with stable assets on both sides',
    baseColor: '#2aaa3e',
    quoteColor: '#122023',
  },
];

export default function LiquidityPairs() {
  const [hoveredPair, setHoveredPair] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── PAIR CARDS ── */}
      {pairs.map((pair, i) => {
        const isHov = hoveredPair === i;
        return (
          <div
            key={`${pair.base}-${pair.quote}`}
            style={{
              ...CARD,
              overflow: 'hidden',
              transition: 'box-shadow 0.2s',
              boxShadow: isHov ? '0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={() => setHoveredPair(i)}
            onMouseLeave={() => setHoveredPair(null)}
          >
            {/* Header bar */}
            <div style={{
              background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Pair tokens */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontFamily: MONO, fontSize: '14px', fontWeight: 700,
                    color: '#FFF', background: pair.baseColor,
                    padding: '4px 10px', borderRadius: '6px',
                  }}>{pair.base}</span>
                  <span style={{ color: '#4a5c5f', fontSize: '14px' }}>/</span>
                  <span style={{
                    fontFamily: MONO, fontSize: '14px', fontWeight: 700,
                    color: '#FFF', background: pair.quoteColor,
                    padding: '4px 10px', borderRadius: '6px',
                  }}>{pair.quote}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: '#4a5c5f', letterSpacing: '1px' }}>{pair.type}</span>
                <span style={{
                  fontFamily: MONO, fontSize: '10px', fontWeight: 600,
                  color: '#40FB50', background: 'rgba(64,251,80,0.1)',
                  padding: '3px 8px', borderRadius: '4px', letterSpacing: '1px',
                }}>LIVE</span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                {pair.desc}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Assets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ ...LABEL, marginBottom: '0' }}>Assets</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pair.baseColor }} />
                    <span style={{ fontSize: '13px', color: '#122023', fontWeight: 500 }}>{pair.baseLabel}</span>
                    <span style={{ fontFamily: MONO, fontSize: '11px', color: '#999' }}>${pair.base}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pair.quoteColor }} />
                    <span style={{ fontSize: '13px', color: '#122023', fontWeight: 500 }}>{pair.quoteLabel}</span>
                    <span style={{ fontFamily: MONO, fontSize: '11px', color: '#999' }}>${pair.quote}</span>
                  </div>
                </div>

                {/* Use case + LP */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <div style={{ ...LABEL, marginBottom: '4px' }}>Use Case</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{pair.useCase}</div>
                  </div>
                  <div>
                    <div style={{ ...LABEL, marginBottom: '4px' }}>LP Opportunity</div>
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{pair.lp}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── RISKS ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ ...LABEL, marginBottom: '14px' }}>Risks</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { title: 'Impermanent Loss', desc: 'If the relative price of paired assets changes significantly, your LP position may be worth less than simply holding the assets.' },
            { title: 'Smart Contract Risk', desc: 'LP funds are held in smart contracts that may contain undiscovered vulnerabilities.' },
            { title: 'Low Liquidity Risk', desc: 'Thinly traded pairs may experience higher slippage for larger trades.' },
          ].map((risk) => (
            <div key={risk.title} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#999', flexShrink: 0, marginTop: '6px' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{risk.title}</span>
                <span style={{ fontSize: '13px', color: '#888' }}> — {risk.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: '#999', marginTop: '14px' }}>
          Evaluate these risks before providing liquidity. See the <a href="/docs/pool-party/overview" style={{ color: '#1a8a2e', textDecoration: 'none', fontWeight: 500 }}>Pool Party Overview</a> for more information.
        </div>
      </div>

      {/* ── NOTE ── */}
      <div style={{ fontSize: '11px', color: '#999', lineHeight: 1.6, padding: '0 4px' }}>
        Pool Party is an AMM on Canton Network. New pairs will be added as the ecosystem grows. This page will be updated as new pairs go live.
      </div>
    </div>
  );
}
