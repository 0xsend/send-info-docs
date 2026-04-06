'use client';

const MONO = '"DM Mono", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

export default function SendVerified() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 60%, #1e4a4f 100%)', borderRadius: '14px', padding: '44px 36px' }}>
        <div style={{ ...LABEL, color: '#40FB50', letterSpacing: '3px', marginBottom: '10px' }}>Send Verified</div>
        <div style={{ fontSize: '26px', fontWeight: 700, color: '#FFF', lineHeight: 1.3, marginBottom: '12px' }}>
          Get Verified. Get Access.
        </div>
        <div style={{ fontSize: '14px', color: '#6b7c7f', maxWidth: '460px', lineHeight: 1.6 }}>
          Complete three steps to unlock access to Send products, rewards programs, and earn your trust badge in the community.
        </div>
      </div>

      {/* ── STATUS STRIP ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: '#171f22', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 600, color: '#FFF' }}>Base Network</span>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#4a5c5f', marginLeft: 'auto' }}>Canton soon</span>
        </div>
        <div style={{ background: '#171f22', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#40FB50' }} />
          <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 600, color: '#FFF' }}>Live</span>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#4a5c5f', marginLeft: 'auto' }}>Since Feb 10, 2026</span>
        </div>
      </div>

      {/* ── 3 STEPS ── */}
      <div>
        <div style={{ ...LABEL, marginBottom: '14px', paddingLeft: '2px' }}>3 Steps to Verification</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { step: '01', title: 'Purchase a Sendtag', desc: 'Claim a unique Sendtag through the in-app marketplace so other members can find you easily.' },
            { step: '02', title: 'Hold 3,000 $SEND', desc: 'Maintain a minimum balance of 3,000 SEND tokens in your primary wallet. Keep the tokens in place to retain verification.', note: 'Trading is currently disabled in the iOS and Android apps — use send.app to swap USDC to $SEND.' },
            { step: '03', title: 'Deposit 25 USDC to Savings', desc: 'Move at least 25 USDC into your Send savings vault to confirm you have an active balance.' },
          ].map((item) => (
            <div key={item.step} style={{ ...CARD, padding: '20px', display: 'flex', gap: '16px' }}>
              <div style={{ fontFamily: MONO, fontSize: '24px', fontWeight: 800, color: '#e8eaeb', lineHeight: 1, flexShrink: 0, width: '36px' }}>
                {item.step}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>{item.desc}</div>
                {item.note && (
                  <div style={{ marginTop: '10px', padding: '10px 14px', background: '#fafafa', borderRadius: '8px', borderLeft: '3px solid #1a8a2e', fontSize: '12px', color: '#888', lineHeight: 1.5 }}>
                    {item.note}{' '}
                    <a href="https://send.app" target="_blank" rel="noopener noreferrer" style={{ color: '#1a8a2e', fontWeight: 600, textDecoration: 'none' }}>send.app →</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BADGE INFO ── */}
      <div style={{ background: 'linear-gradient(135deg, #122023 0%, #1a3a3f 100%)', borderRadius: '12px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 800, color: '#40FB50', flexShrink: 0 }}>↻</div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>Your Badge is Dynamic</div>
          <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6 }}>
            Meet all three requirements and the verified badge activates at the top of the next hour. Drop below any threshold — withdraw from savings, sell SEND — and it turns off until you qualify again.
          </div>
        </div>
      </div>

      {/* ── WHAT YOU UNLOCK ── */}
      <div style={CARD}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ ...LABEL }}>What You Unlock</div>
        </div>
        <a href="https://send.app/canton-wallet" target="_blank" rel="noopener noreferrer" style={{
          padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none',
        }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#122023', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, color: '#40FB50', fontWeight: 800 }}>PP</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#122023', marginBottom: '4px' }}>Pool Party on Send Canton Wallet</div>
            <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.5 }}>
              Once verified, access Pool Party via <strong style={{ color: '#122023' }}>Explore → Canton Wallet</strong>.
            </div>
          </div>
          <span style={{ color: '#1a8a2e', fontWeight: 600, fontSize: '13px', flexShrink: 0 }}>Open →</span>
        </a>
      </div>

      {/* ── DOWNLOAD ── */}
      <div>
        <div style={{ ...LABEL, marginBottom: '12px', paddingLeft: '2px' }}>Get Started</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <a href="https://apps.apple.com/pl/app/send/id6748525971" target="_blank" rel="noopener noreferrer" style={{
            background: '#122023', borderRadius: '12px', padding: '18px 20px', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div style={{ fontFamily: MONO, fontSize: '18px', color: '#FFF' }}>iOS</div>
            <div style={{ fontSize: '11px', color: '#6b7c7f', marginLeft: 'auto' }}>App Store →</div>
          </a>
          <a href="https://play.google.com/store/apps/details?id=app.send" target="_blank" rel="noopener noreferrer" style={{
            background: '#122023', borderRadius: '12px', padding: '18px 20px', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <div style={{ fontFamily: MONO, fontSize: '18px', color: '#FFF' }}>Android</div>
            <div style={{ fontSize: '11px', color: '#6b7c7f', marginLeft: 'auto' }}>Google Play →</div>
          </a>
        </div>
      </div>
    </div>
  );
}
