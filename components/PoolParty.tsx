'use client';

const tradingPairs = [
  { from: 'CC', to: 'CUSD', desc: 'Canton Coin to Send\'s stablecoin', fromColor: '#FF9800', toColor: '#2196F3' },
  { from: 'CC', to: 'USDCx', desc: 'Canton Coin to bridged USDC', fromColor: '#FF9800', toColor: '#2775CA' },
  { from: 'USDCx', to: 'CUSD', desc: 'Stablecoin-to-stablecoin', fromColor: '#2775CA', toColor: '#2196F3' },
];

const pools = [
  { name: 'CC — USDCx', color: '#FF9800' },
  { name: 'CC — CUSD', color: '#FF9800' },
  { name: 'USDCx — CUSD', color: '#2775CA' },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    color: '#999',
    marginBottom: '14px',
    paddingLeft: '2px',
  }}>
    {children}
  </div>
);

export default function PoolParty() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', padding: '8px 0' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: '16px',
        padding: '40px 32px',
        color: '#FFF',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(64,251,80,0.15) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '20%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(33,150,243,0.1) 0%, transparent 70%)',
        }} />
        <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#40FB50', marginBottom: '12px' }}>
          Pool Party
        </div>
        <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.3 }}>
          Send's Decentralized Exchange<br />on Canton Network
        </div>
        <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', lineHeight: 1.6 }}>
          Swap tokens, bridge USDC, and provide liquidity — all directly from Canton Wallet.
        </div>
      </div>

      {/* ─── Section: Core Principles + Get Started ─── */}
      <div style={{
        backgroundColor: '#F8F9FA',
        borderRadius: '16px',
        padding: '28px 24px',
        marginTop: '20px',
      }}>
        <SectionLabel>Core Principles</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { icon: '🛡️', title: 'No KYC', desc: 'No identity verification required', color: '#7C4DFF', bg: '#EDE7F6' },
            { icon: '🔐', title: 'Non-Custodial', desc: 'You control your assets, always', color: '#2196F3', bg: '#E3F2FD' },
            { icon: '🔓', title: 'Permissionless', desc: 'No approval needed, anyone can trade', color: '#40FB50', bg: '#E8FDE9' },
          ].map((p) => (
            <div key={p.title} style={{
              backgroundColor: '#FFF',
              borderRadius: '12px',
              padding: '22px 18px',
              border: '1px solid #E8E8E8',
              borderTop: `3px solid ${p.color}`,
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px', backgroundColor: p.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', marginBottom: '12px',
              }}>
                {p.icon}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '5px' }}>{p.title}</div>
              <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Get Started CTA — within same group */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
          <div style={{
            backgroundColor: '#E8FDE9',
            borderRadius: '12px',
            padding: '24px 22px',
            border: '2px solid #40FB50',
          }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>Already have Canton Wallet?</div>
            <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.6 }}>
              You're in! Pool Party is live now in Send Canton Wallet — start trading today.
            </div>
          </div>
          <div style={{
            backgroundColor: '#FFF3E0',
            borderRadius: '12px',
            padding: '24px 22px',
            border: '2px solid #FF9800',
          }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>Don't have Canton Wallet yet?</div>
            <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.6 }}>
              Join the waitlist at{' '}
              <a href="https://poolparty.fun" target="_blank" rel="noopener noreferrer" style={{ color: '#E65100', fontWeight: 600, textDecoration: 'none' }}>
                poolparty.fun
              </a>{' '}
              and we'll get you access soon.
            </div>
          </div>
        </div>
      </div>

      {/* ─── Section: Features ─── */}
      <div style={{ marginTop: '32px' }}>
        <SectionLabel>What You Can Do</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            {
              icon: '🌉', title: 'Bridge USDC', color: '#7C4DFF', bg: '#EDE7F6',
              desc: 'Move USDC from Ethereum to USDCx on Canton — no external bridges needed.',
            },
            {
              icon: '🔄', title: 'Swap Tokens', color: '#FF9800', bg: '#FFF3E0',
              desc: 'Trade between CC, CUSD, and USDCx instantly.',
            },
            {
              icon: '💧', title: 'Provide Liquidity', color: '#2196F3', bg: '#E3F2FD',
              desc: 'Earn LP fees by adding to active pools.',
            },
          ].map((item) => (
            <div key={item.title} style={{
              backgroundColor: '#FFF',
              borderRadius: '12px',
              padding: '24px 20px',
              border: '1px solid #E0E0E0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', backgroundColor: item.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px',
              }}>
                {item.icon}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div style={{ height: '1px', backgroundColor: '#E8E8E8', margin: '28px 0 4px' }} />

      {/* ─── Section: Markets ─── */}
      <div style={{
        backgroundColor: '#F8F9FA',
        borderRadius: '16px',
        padding: '28px 24px',
        marginTop: '4px',
      }}>
        <SectionLabel>Markets</SectionLabel>

        {/* Trading Pairs */}
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          padding: '22px',
          border: '1px solid #E8E8E8',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Trading Pairs
            <span style={{ backgroundColor: '#E8FDE9', color: '#122023', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '6px' }}>Live</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tradingPairs.map((pair) => (
              <div key={`${pair.from}-${pair.to}`} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '14px 18px', backgroundColor: '#FAFAFA', borderRadius: '10px',
                border: '1px solid #F0F0F0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '160px' }}>
                  <span style={{
                    backgroundColor: pair.fromColor, color: '#FFF', fontSize: '12px', fontWeight: 700,
                    padding: '4px 10px', borderRadius: '6px',
                  }}>{pair.from}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10H16M12 6L16 10L12 14" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 10H4M8 14L4 10L8 6" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                  </svg>
                  <span style={{
                    backgroundColor: pair.toColor, color: '#FFF', fontSize: '12px', fontWeight: 700,
                    padding: '4px 10px', borderRadius: '6px',
                  }}>{pair.to}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>{pair.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Liquidity Pools — within same Markets group */}
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          padding: '22px',
          border: '1px solid #E8E8E8',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          marginTop: '14px',
        }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023', marginBottom: '16px' }}>Liquidity Pools</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {pools.map((pool) => (
              <div key={pool.name} style={{
                padding: '18px 14px',
                backgroundColor: '#FAFAFA',
                borderRadius: '10px',
                borderLeft: `4px solid ${pool.color}`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#122023' }}>{pool.name}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>Earn LP fees</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CUSD Spotlight ─── */}
      <div style={{
        background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
        borderRadius: '12px',
        padding: '28px 24px',
        border: '1px solid #BBDEFB',
        marginTop: '28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#2196F3',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          }}>💵</div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#1565C0' }}>Spotlight</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#122023' }}>CUSD</div>
          </div>
        </div>
        <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023', marginBottom: '8px' }}>Send's Privacy-First Stablecoin</div>
        <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.6 }}>
          CUSD is Send's native stablecoin on Canton Network — designed with privacy at its core. Trade, hold, or LP without compromising your financial privacy.
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div style={{ height: '1px', backgroundColor: '#E8E8E8', margin: '28px 0 4px' }} />

      {/* ─── Why Use Pool Party ─── */}
      <div style={{ marginTop: '4px' }}>
        <SectionLabel>Why Pool Party?</SectionLabel>
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          padding: '22px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { num: '1', text: 'Be early to Canton DeFi' },
              { num: '2', text: 'Diversify beyond CC holdings' },
              { num: '3', text: 'Direct USDC bridging to Canton' },
              { num: '4', text: 'Earn fees as a liquidity provider' },
              { num: '5', text: 'Trade stablecoins natively on Canton' },
            ].map((item) => (
              <div key={item.num} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '13px 16px', backgroundColor: '#FAFAFA', borderRadius: '10px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: '#40FB50', color: '#122023',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, flexShrink: 0,
                }}>{item.num}</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#122023' }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
