'use client';

export default function PoolParty() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>

      {/* Bento Hero */}
      <div style={{
        backgroundColor: '#122023',
        borderRadius: '14px',
        padding: '40px 32px',
        color: '#FFF',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#40FB50', marginBottom: '14px' }}>
          Pool Party
        </div>
        <div style={{ fontSize: '26px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.3, color: '#FFFFFF' }}>
          Send's Decentralized Exchange<br />on Canton Network
        </div>
        <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.6 }}>
          Swap tokens, bridge USDC, and provide liquidity — all directly from Canton Wallet.
        </div>
      </div>

      {/* Core Principles */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#999', marginBottom: '12px', paddingLeft: '2px' }}>
          Core Principles
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { title: 'No KYC', desc: 'No identity verification required', color: '#7C4DFF' },
            { title: 'Non-Custodial', desc: 'You control your assets, always', color: '#2196F3' },
            { title: 'Permissionless', desc: 'No approval needed, anyone can trade', color: '#40FB50' },
          ].map((p) => (
            <div key={p.title} style={{
              backgroundColor: '#FFF',
              borderRadius: '12px',
              padding: '20px 18px',
              border: '1px solid #E0E0E0',
              borderLeft: `4px solid ${p.color}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '5px' }}>{p.title}</div>
              <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          padding: '24px 22px',
          border: '1px solid #E0E0E0',
          borderTop: '3px solid #40FB50',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'inline-block',
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: '#40FB50', marginBottom: '12px',
          }} />
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>Already have Canton Wallet?</div>
          <div style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>
            You're in! Pool Party is live now in Send Canton Wallet — start trading today.
          </div>
        </div>
        <div style={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          padding: '24px 22px',
          border: '1px solid #E0E0E0',
          borderTop: '3px solid #FF9800',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'inline-block',
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: '#FF9800', marginBottom: '12px',
          }} />
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>Don't have Canton Wallet yet?</div>
          <div style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>
            Join the waitlist at{' '}
            <a href="https://poolparty.fun" target="_blank" rel="noopener noreferrer" style={{ color: '#E65100', fontWeight: 600, textDecoration: 'none' }}>
              poolparty.fun
            </a>{' '}
            and we'll get you access soon.
          </div>
        </div>
      </div>

    </div>
  );
}
