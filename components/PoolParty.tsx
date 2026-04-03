'use client';

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

      {/* Core Principles + Get Started */}
      <div style={{
        backgroundColor: '#F8F9FA',
        borderRadius: '16px',
        padding: '28px 24px',
        marginTop: '20px',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: '#999', marginBottom: '14px', paddingLeft: '2px' }}>
          Core Principles
        </div>
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

    </div>
  );
}
