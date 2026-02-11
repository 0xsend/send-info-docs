'use client';

// Brand palette
const b = {
  blackGreen: '#122023',
  neonGreen: '#40FB50',
  darkGrey: '#666666',
  grey: '#B3B3B3',
  lightGrey: '#E6E6E6',
  white: '#FFFFFF',
  lunarGreen: '#3E4A3C',
  bayLeaf: '#86AE80',
  mint: '#DCF9D7',
};

export default function SendVerified() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>

      {/* ── Hero ── */}
      <div style={{
        background: `linear-gradient(145deg, ${b.blackGreen} 0%, ${b.lunarGreen} 60%, ${b.bayLeaf} 100%)`,
        borderRadius: '20px',
        padding: '44px 36px',
        color: b.white,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative orbs */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-20px',
          width: '220px', height: '220px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(64,251,80,0.2) 0%, transparent 65%)`,
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '10%',
          width: '300px', height: '300px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(134,174,128,0.15) 0%, transparent 60%)`,
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '15%',
          width: '100px', height: '100px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(64,251,80,0.08) 0%, transparent 70%)`,
        }} />

        <div style={{ position: 'relative' }}>
          {/* Badge icon */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: `linear-gradient(135deg, ${b.neonGreen}, ${b.bayLeaf})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '20px', boxShadow: '0 4px 20px rgba(64,251,80,0.3)',
          }}>
            <span style={{ fontSize: '24px', color: b.blackGreen, fontWeight: 800 }}>✓</span>
          </div>

          <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: b.neonGreen, marginBottom: '10px' }}>
            Send Verified
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '14px', lineHeight: 1.25 }}>
            Get Verified. Get Access.
          </div>
          <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '460px', lineHeight: 1.7 }}>
            Complete four steps to unlock access to Send products, rewards programs, and earn your trust badge in the community.
          </div>
        </div>
      </div>

      {/* ── Status pills ── */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: b.blackGreen,
          borderRadius: '10px', padding: '10px 16px',
          flex: 1,
        }}>
          <span style={{ fontSize: '14px' }}>⛓️</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: b.white }}>Base Network</span>
          <span style={{ fontSize: '11px', color: b.grey, marginLeft: 'auto' }}>Canton soon</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          backgroundColor: b.blackGreen,
          borderRadius: '10px', padding: '10px 16px',
          flex: 1,
        }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: b.neonGreen,
            boxShadow: `0 0 6px ${b.neonGreen}`,
            flexShrink: 0,
          }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: b.white }}>Live</span>
          <span style={{ fontSize: '11px', color: b.grey, marginLeft: 'auto' }}>Since Feb 10, 2026</span>
        </div>
      </div>

      {/* ── Trust Steps ── */}
      <div style={{ marginTop: '28px' }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', color: b.bayLeaf,
          marginBottom: '16px', paddingLeft: '2px',
        }}>
          4 Steps to Verification
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {[
            {
              step: '1',
              icon: '🏷️',
              title: 'Purchase a Sendtag',
              desc: 'Claim a unique Sendtag through the in-app marketplace so other members can find you easily.',
            },
            {
              step: '2',
              icon: '💎',
              title: 'Hold 3,000 $SEND',
              desc: 'Maintain a minimum balance of 3,000 SEND tokens in your primary wallet. Keep the tokens in place to retain verification.',
              note: 'Trading is currently disabled in the iOS and Android apps — use send.app to swap USDC to $SEND.',
            },
            {
              step: '3',
              icon: '🏦',
              title: 'Deposit 25 USDC to Savings',
              desc: 'Move at least 25 USDC into your Send savings vault to confirm you have an active balance.',
            },
            {
              step: '4',
              icon: '📤',
              title: 'Send to a Verified User',
              desc: 'Send to one verified /send user to complete the trust chain.',
            },
          ].map((item, idx) => (
            <div key={item.step} style={{ display: 'flex', gap: '0px' }}>
              {/* Timeline column */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: '48px', flexShrink: 0,
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: b.neonGreen, color: b.blackGreen,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 800, flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(64,251,80,0.25)',
                }}>{item.step}</div>
                {idx < 3 && (
                  <div style={{
                    width: '2px', flex: 1, minHeight: '20px',
                    background: `linear-gradient(to bottom, ${b.neonGreen}, ${b.lightGrey})`,
                  }} />
                )}
              </div>

              {/* Content card */}
              <div style={{
                flex: 1,
                backgroundColor: b.white,
                borderRadius: '14px',
                padding: '20px',
                border: `1px solid ${b.lightGrey}`,
                marginBottom: idx < 3 ? '12px' : '0px',
                marginLeft: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: b.blackGreen }}>{item.title}</span>
                </div>
                <div style={{ fontSize: '13px', color: b.darkGrey, lineHeight: 1.65 }}>{item.desc}</div>
                {item.note && (
                  <div style={{
                    marginTop: '12px', padding: '12px 14px',
                    background: `linear-gradient(135deg, ${b.mint} 0%, #eef7ec 100%)`,
                    borderRadius: '10px',
                    border: `1px solid ${b.bayLeaf}40`,
                    fontSize: '12px', color: b.lunarGreen, lineHeight: 1.55,
                    display: 'flex', gap: '8px', alignItems: 'flex-start',
                  }}>
                    <span style={{ flexShrink: 0 }}>💡</span>
                    <span>
                      {item.note}{' '}
                      <a href="https://send.app" target="_blank" rel="noopener noreferrer" style={{
                        color: b.blackGreen, fontWeight: 700, textDecoration: 'none',
                        borderBottom: `2px solid ${b.neonGreen}`,
                      }}>send.app →</a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Badge Dynamic callout ── */}
      <div style={{
        background: `linear-gradient(135deg, ${b.blackGreen} 0%, ${b.lunarGreen} 100%)`,
        borderRadius: '14px',
        padding: '24px',
        marginTop: '28px',
        display: 'flex', alignItems: 'flex-start', gap: '16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20px', right: '-20px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(64,251,80,0.1) 0%, transparent 70%)`,
        }} />
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          backgroundColor: b.neonGreen, color: b.blackGreen,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', fontWeight: 800, flexShrink: 0,
        }}>↻</div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: b.white, marginBottom: '6px' }}>Your Badge is Dynamic</div>
          <div style={{ fontSize: '13px', color: b.grey, lineHeight: 1.65 }}>
            Meet all four requirements and the badge turns on instantly. Drop below any threshold — withdraw from savings, sell SEND — and it turns off until you qualify again.
          </div>
        </div>
      </div>

      {/* ── Download CTA ── */}
      <div style={{
        marginTop: '28px',
        backgroundColor: b.mint,
        borderRadius: '16px',
        padding: '24px',
        border: `1px solid ${b.bayLeaf}30`,
      }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', color: b.bayLeaf,
          marginBottom: '14px',
        }}>
          Get Started
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <a href="https://apps.apple.com/pl/app/send/id6748525971" target="_blank" rel="noopener noreferrer" style={{
            backgroundColor: b.blackGreen,
            borderRadius: '12px',
            padding: '18px 20px',
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <span style={{ fontSize: '24px' }}>🍎</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: b.white }}>iOS</div>
              <div style={{ fontSize: '11px', color: b.grey }}>App Store</div>
            </div>
            <span style={{ marginLeft: 'auto', color: b.neonGreen, fontSize: '18px' }}>→</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=app.send" target="_blank" rel="noopener noreferrer" style={{
            backgroundColor: b.blackGreen,
            borderRadius: '12px',
            padding: '18px 20px',
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '14px',
          }}>
            <span style={{ fontSize: '24px' }}>🤖</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: b.white }}>Android</div>
              <div style={{ fontSize: '11px', color: b.grey }}>Google Play</div>
            </div>
            <span style={{ marginLeft: 'auto', color: b.neonGreen, fontSize: '18px' }}>→</span>
          </a>
        </div>
      </div>

    </div>
  );
}
