'use client';

const MONO = '"DM Mono", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

const SEND_APP_URL = 'https://send.cantonwallet.com';

const steps = [
  { num: '01', title: 'Lock', desc: 'Your Base asset is locked in Asset Relayer\'s reserve contracts, built on Circle\'s xReserve framework.' },
  { num: '02', title: 'Mint', desc: 'A wrapped .B token is minted to your Canton wallet through the Digital Assets Utility Registry.' },
  { num: '03', title: 'Use', desc: 'Hold, transfer, or use the .B token across Canton apps. Transfers are bidirectional.' },
];

const features = [
  { label: 'Bidirectional', detail: 'Transfers move both directions between Base (ERC-20) and Canton (CIP-56). No one-way wrapping.' },
  { label: 'Sub-3-minute', detail: 'Bridge confirmations land in under three minutes from lock to mint.' },
  { label: 'xReserve framework', detail: 'Reserve contracts on Base are built on Circle\'s battle-tested xReserve infrastructure.' },
  { label: 'Send Safe multisig', detail: 'Canton DAML signature primitives. Majority quorum, three or more independent signers from Canton Foundation or supervalidators.' },
  { label: 'Composable framework', detail: 'Asset issuers maintain control through a composable framework, not a hard-coded asset list.' },
];

const assets = [
  {
    name: 'SEND',
    wrapped: 'SEND.B',
    tag: 'Send Token',
    desc: 'The Send ecosystem token, bridgeable from Base into Canton.',
  },
  {
    name: 'USDC',
    wrapped: 'USDC.B',
    tag: 'Stablecoin',
    desc: 'Base USDC bridged onto Canton. The dollar most Base users already hold.',
  },
  {
    name: 'cbBTC',
    wrapped: 'cbBTC.B',
    tag: 'Bitcoin',
    desc: 'Coinbase Wrapped BTC — 1:1 backed by BTC in Coinbase custody.',
  },
  {
    name: 'frxUSD',
    wrapped: 'frxUSD.B',
    tag: 'Stablecoin',
    desc: 'Frax\'s DeFi-native dollar, in the launch set alongside USDC.',
  },
];

export default function AssetRelayer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(145deg, #0c1416 0%, #122023 35%, #1a3a3f 75%, #1e4a4f 100%)',
          padding: '44px 36px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: '-180px', right: '-120px',
            width: '480px', height: '480px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(64,251,80,0.12) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', maxWidth: '640px' }}>
            <div style={{ ...LABEL, color: '#40FB50', letterSpacing: '3px', marginBottom: '14px' }}>
              Asset Relayer · Base ↔ Canton Bridge
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFF', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '14px' }}>
              Move assets between Base and Canton.
            </div>
            <div style={{ fontSize: '15px', color: '#9aaaad', lineHeight: 1.6, marginBottom: '24px', maxWidth: '520px' }}>
              Bidirectional bridge for SEND, USDC, cbBTC, and frxUSD. Sub-three-minute confirmations. Built on Circle's xReserve framework and Send Safe.
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={SEND_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#40FB50',
                  color: '#0c1416',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Open Send App on Canton →
              </a>
              <a
                href="#how-it-works"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: '#FFF',
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '12px 22px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                How it works
              </a>
            </div>
          </div>
        </div>

        {/* Three identity tiles */}
        <div className="responsive-3col-tight">
          <div style={{ background: '#171f22', padding: '22px 26px' }}>
            <div style={{ ...LABEL, color: '#4a5c5f' }}>Networks</div>
            <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.3px', marginTop: '8px' }}>
              Base ↔ Canton
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>Bidirectional · ERC-20 to CIP-56</div>
          </div>
          <div style={{ background: '#171f22', padding: '22px 26px' }}>
            <div style={{ ...LABEL, color: '#4a5c5f' }}>Bridge Time</div>
            <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.3px', marginTop: '8px' }}>
              &lt; 3 min
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>Lock to mint confirmation</div>
          </div>
          <div style={{ background: '#171f22', padding: '22px 26px' }}>
            <div style={{ ...LABEL, color: '#4a5c5f' }}>Assets</div>
            <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 700, color: '#40FB50', letterSpacing: '-0.3px', marginTop: '8px' }}>
              4 supported
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>SEND · USDC · cbBTC · frxUSD</div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div id="how-it-works" className="responsive-3col">
        {steps.map((step) => (
          <div key={step.num} style={{ ...CARD, padding: '24px 22px', position: 'relative' }}>
            <div style={{ fontFamily: MONO, fontSize: '28px', fontWeight: 800, color: '#e8eaeb', position: 'absolute', top: '14px', right: '18px', lineHeight: 1 }}>
              {step.num}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>{step.title}</div>
            <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.55, maxWidth: '240px' }}>{step.desc}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES + SUPPORTED ASSETS ── */}
      <div className="responsive-2col">
        {/* Features */}
        <div style={CARD}>
          <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)', padding: '24px' }}>
            <div style={{ ...LABEL, color: '#40FB50', marginBottom: '10px' }}>Core Features</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFF', lineHeight: 1.4 }}>
              Built for retail. Hardened for institutions.
            </div>
          </div>
          <div style={{ padding: '16px 24px' }}>
            {features.map((f, i) => (
              <div key={f.label} style={{
                display: 'flex', gap: '12px', padding: '10px 0',
                borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
                alignItems: 'baseline',
              }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#122023', width: '140px', flexShrink: 0 }}>{f.label}</div>
                <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{f.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Supported assets */}
        <div style={CARD}>
          <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)', padding: '24px' }}>
            <div style={{ ...LABEL, color: '#40FB50', marginBottom: '10px' }}>Supported Assets</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFF', lineHeight: 1.4 }}>
              Four assets at launch. More coming.
            </div>
          </div>
          <div style={{ padding: '16px 24px' }}>
            {assets.map((a, i) => (
              <div key={a.name} style={{
                padding: '14px 0',
                borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#1a8a2e', marginBottom: '6px' }}>
                  {a.tag}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: MONO, fontSize: '14px', fontWeight: 700, color: '#122023' }}>{a.name}</span>
                  <span style={{ color: '#bbb', fontSize: '12px' }}>→</span>
                  <span style={{ fontFamily: MONO, fontSize: '14px', fontWeight: 700, color: '#1a8a2e' }}>{a.wrapped}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECURITY ── */}
      <div style={{ ...CARD, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(145deg, #0c1416 0%, #122023 50%, #1a3a3f 100%)', padding: '26px 32px' }}>
          <div style={{ ...LABEL, color: '#40FB50', marginBottom: '8px' }}>Security Model</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#FFF', lineHeight: 1.3, marginBottom: '8px' }}>
            Multisig quorum. No single point of failure.
          </div>
          <div style={{ fontSize: '14px', color: '#9aaaad', lineHeight: 1.55, maxWidth: '600px' }}>
            Reserve contracts on Base are built on Circle's xReserve framework. Canton-side authorization uses Send Safe with native DAML signature primitives.
          </div>
        </div>
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            {[
              { label: 'Reserve contracts', value: 'Circle xReserve framework' },
              { label: 'Signature model', value: 'Canton DAML primitives via Send Safe' },
              { label: 'Multisig quorum', value: 'Majority n of m, 3+ independent signers' },
              { label: 'Signer eligibility', value: 'Canton Foundation or supervalidator' },
              { label: 'Onboarding', value: 'Opsec checklist + attestation required' },
              { label: 'Issuance registry', value: 'Digital Assets Utility Registry' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#fafafa', borderRadius: '8px', padding: '12px 14px', borderLeft: '3px solid #1a8a2e' }}>
                <div style={{ ...LABEL, fontSize: '9px', color: '#999', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#122023', lineHeight: 1.4 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHERE TO USE ── */}
      <div className="responsive-2col">
        <div style={{ ...CARD, padding: '24px' }}>
          <div style={{ ...LABEL, color: '#1a8a2e', marginBottom: '10px' }}>Send App</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>
            Dedicated bridge page
          </div>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '14px' }}>
            Available on web and mobile within Send App on Canton. Bridge from Base, hold, transfer, and trade in one place.
          </div>
          <a href={SEND_APP_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', fontWeight: 600, color: '#1a8a2e', textDecoration: 'none' }}>
            send.cantonwallet.com →
          </a>
        </div>
        <div style={{ ...CARD, padding: '24px' }}>
          <div style={{ ...LABEL, color: '#1a8a2e', marginBottom: '10px' }}>Standalone Bridge</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>
            No Send App required
          </div>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
            Connect your wallet directly and bridge between Base and Canton. Same security model, lighter footprint.
          </div>
        </div>
      </div>

    </div>
  );
}
