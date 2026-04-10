'use client';

const MONO = '"DM Mono", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

// Latest CUSD outstanding (from most recent Brale report)
const cusdData = {
  outstanding: 1040189.69,
  avgDaily: 1049555.96,
  monthlyYield: 2865.29,
  asOf: 'March 2026',
};

const features = [
  { label: 'Confidential transfers', detail: 'Transaction amounts and counterparties are private by default' },
  { label: 'Selective disclosure', detail: 'Share specific information with regulators or auditors when required' },
  { label: 'Regulated issuance', detail: 'Brale handles compliance, monitoring, and mint/redeem' },
  { label: 'Canton-native', detail: 'Built for Canton Network with deep Pool Party liquidity' },
  { label: 'API access', detail: 'Programmatic integrations via Brale\'s issuance APIs' },
];

const integrations = [
  { name: 'Send Safe', desc: 'Hold, send, and manage CUSD with multi-signature security' },
  { name: 'Send Canton Wallet', desc: 'Use CUSD privately on Canton Network with biometric passkeys' },
  { name: 'Pool Party', desc: 'Trade CUSD against $CC and USDCx with low slippage' },
];

const fmt = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CUSDOverview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO ── */}
      <div style={{ borderRadius: '14px', overflow: 'hidden' }}>
        {/* Title bar */}
        <div style={{
          background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 60%, #1e4a4f 100%)',
          padding: '32px 36px',
        }}>
          <div style={{ ...LABEL, color: '#40FB50', letterSpacing: '3px', marginBottom: '6px' }}>CUSD Stablecoin</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFF', lineHeight: 1.3, marginBottom: '8px' }}>
            Privacy-first stablecoin for Canton Network
          </div>
          <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6, maxWidth: '480px' }}>
            USD-backed, regulated by Brale, with confidential transfers by default. The native stable asset of the Canton ecosystem.
          </div>
        </div>

        {/* Live metrics */}
        <div className="responsive-3col-tight">
          <div style={{ background: '#171f22', padding: '24px 28px' }}>
            <div style={LABEL}>CUSD Outstanding</div>
            <div style={{ fontFamily: MONO, fontSize: '24px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.5px', marginTop: '8px' }}>
              {fmt(cusdData.outstanding)}
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>as of {cusdData.asOf}</div>
          </div>
          <div style={{ background: '#171f22', padding: '24px 28px' }}>
            <div style={LABEL}>Avg Daily</div>
            <div style={{ fontFamily: MONO, fontSize: '24px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.5px', marginTop: '8px' }}>
              {fmt(cusdData.avgDaily)}
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>monthly average</div>
          </div>
          <div style={{ background: '#171f22', padding: '24px 28px' }}>
            <div style={LABEL}>Latest Monthly Yield</div>
            <div style={{ fontFamily: MONO, fontSize: '24px', fontWeight: 700, color: '#40FB50', letterSpacing: '-0.5px', marginTop: '8px' }}>
              {fmt(cusdData.monthlyYield)}
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>directed to ecosystem fund</div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS: 3-step strip ── */}
      <div className="responsive-3col">
        {[
          { num: '01', title: 'Mint', desc: 'CUSD is minted 1:1 against USD reserves through Brale' },
          { num: '02', title: 'Hold & Transfer', desc: 'Send, receive, and hold CUSD privately on Canton Network' },
          { num: '03', title: 'Generate Yield', desc: 'Reserve economics flow to the CUSD Ecosystem Fund' },
        ].map((step) => (
          <div key={step.num} style={{ ...CARD, padding: '24px 22px', position: 'relative' }}>
            <div style={{ fontFamily: MONO, fontSize: '28px', fontWeight: 800, color: '#e8eaeb', position: 'absolute', top: '14px', right: '18px', lineHeight: 1 }}>
              {step.num}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>{step.title}</div>
            <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5, maxWidth: '240px' }}>{step.desc}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES + PARTNERSHIP ── */}
      <div className="responsive-2col">
        {/* Features */}
        <div style={CARD}>
          <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)', padding: '24px' }}>
            <div style={{ ...LABEL, color: '#40FB50', marginBottom: '10px' }}>Core Features</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFF', lineHeight: 1.4 }}>
              Built for privacy and compliance
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

        {/* Partnership */}
        <div style={CARD}>
          <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)', padding: '24px' }}>
            <div style={{ ...LABEL, color: '#40FB50', marginBottom: '10px' }}>Partnership</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFF', lineHeight: 1.4 }}>
              Send × Brale
            </div>
          </div>
          <div style={{ padding: '16px 24px' }}>
            <div style={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Send</div>
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>
                Product owner and distributor. Integrates CUSD across the Send ecosystem and drives adoption on Canton Network.
              </div>
            </div>
            <div style={{ padding: '14px 0' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>Brale</div>
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>
                Regulated issuer. Handles compliance, monitoring, mint/redeem, and reserve management. CUSD is backed 1:1 with USD-denominated reserves.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ECOSYSTEM FUND CALLOUT ── */}
      <div style={{ ...CARD, padding: '24px 28px', borderLeft: '4px solid #1a8a2e' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ ...LABEL, marginBottom: '8px' }}>CUSD Ecosystem Fund</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '6px' }}>
              Yield from CUSD funds Canton ecosystem growth
            </div>
            <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
              Reserve economics from CUSD outstanding are directed to the CUSD Ecosystem Fund and converted to $CC for builder grants, partnerships, and Pool Party liquidity.
            </div>
          </div>
          <a href="/docs/cusd-stablecoin/buybacks" style={{
            fontSize: '12px', fontWeight: 600, color: '#1a8a2e',
            textDecoration: 'none', whiteSpace: 'nowrap',
            display: 'inline-flex', alignItems: 'center', gap: '4px',
          }}>
            View Fund →
          </a>
        </div>
      </div>

      {/* ── INTEGRATIONS ── */}
      <div style={{ ...CARD, padding: '24px' }}>
        <div style={{ ...LABEL, marginBottom: '14px' }}>Where to Use CUSD</div>
        <div className="responsive-3col" style={{ gap: '12px' }}>
          {integrations.map((item) => (
            <div key={item.name} style={{
              padding: '14px 16px', background: '#fafafa', borderRadius: '8px',
              borderLeft: '3px solid #1a8a2e',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023', marginBottom: '4px' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <div style={{
        background: '#fafafa', borderRadius: '12px', padding: '20px 24px',
        fontSize: '11px', color: '#999', lineHeight: 1.7,
      }}>
        CUSD is issued by Brale, a regulated issuer. CUSD is not legal tender and is not insured by the FDIC, SIPC, or any government agency. CUSD holders do not directly receive yield, interest, or distributions from reserve economics. CUSD availability may be restricted in certain jurisdictions. This page is for informational purposes only and does not constitute an offer to sell or the solicitation of an offer to buy any securities.
      </div>
    </div>
  );
}
