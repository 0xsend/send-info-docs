'use client';

const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

export default function PoolParty() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 60%, #1e4a4f 100%)', borderRadius: '14px', padding: '44px 36px' }}>
        <div style={{ ...LABEL, color: '#40FB50', letterSpacing: '3px', marginBottom: '10px' }}>Pool Party</div>
        <div style={{ fontSize: '26px', fontWeight: 700, color: '#FFF', lineHeight: 1.3, marginBottom: '12px' }}>
          Send's Decentralized Exchange<br />on Canton Network
        </div>
        <div style={{ fontSize: '14px', color: '#6b7c7f', maxWidth: '480px', lineHeight: 1.6 }}>
          Swap tokens, bridge USDC, and provide liquidity — all directly from Canton Wallet.
        </div>
      </div>

      {/* ── CORE PRINCIPLES ── */}
      <div>
        <div style={{ ...LABEL, marginBottom: '12px', paddingLeft: '2px' }}>Core Principles</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { title: 'No KYC', desc: 'No identity verification required', color: '#122023' },
            { title: 'Non-Custodial', desc: 'You control your assets, always', color: '#1a8a2e' },
            { title: 'Permissionless', desc: 'No approval needed, anyone can trade', color: '#2aaa3e' },
          ].map((p) => (
            <div key={p.title} style={{ ...CARD, borderLeft: `3px solid ${p.color}`, padding: '20px 18px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '5px' }}>{p.title}</div>
              <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ ...CARD, borderTop: '3px solid #1a8a2e', padding: '24px 22px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>Already have Canton Wallet?</div>
          <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>
            Pool Party is live now in Send Canton Wallet — start trading today.
          </div>
        </div>
        <div style={{ ...CARD, borderTop: '3px solid #6b7c7f', padding: '24px 22px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>Don't have Canton Wallet yet?</div>
          <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>
            Join the waitlist at{' '}
            <a href="https://poolparty.fun" target="_blank" rel="noopener noreferrer" style={{ color: '#1a8a2e', fontWeight: 600, textDecoration: 'none' }}>
              poolparty.fun
            </a>{' '}
            and we'll get you access soon.
          </div>
        </div>
      </div>
    </div>
  );
}
