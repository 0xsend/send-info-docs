'use client';

// ============ BUSINESS MODEL DATA ============
const businessModels = [
  {
    type: 'Earn',
    description: 'Yield generation from staking and liquidity provision',
    fee: '6–8%',
    feeType: 'Rake',
    multisig: { name: 'Earn Revenue', address: '0x65049C4B8e970F5bcCDAE8E141AA06346833CeC4' },
    color: '#122023',
  },
  {
    type: 'Sendtags',
    description: 'Human-readable usernames for easy crypto transfers',
    fee: '4–32',
    feeType: 'USDC flat fee',
    multisig: { name: 'Sendtag Revenue', address: '0x71fa02bb11e4b119bEDbeeD2f119F62048245301' },
    color: '#2aaa3e',
  },
  {
    type: 'Trades',
    description: 'Token swaps and trading within the Send App',
    fee: '0.75%',
    feeType: 'Per trade',
    multisig: { name: 'Trade Revenue', address: '0x17D46f667B0e4156238645536c344d010FC099d7' },
    color: '#1a8a2e',
  },
  {
    type: 'Transactions',
    description: 'Transfer fees for sending crypto to other users',
    fee: '0.01',
    feeType: 'USDC per tx',
    multisig: { name: 'Transaction Revenue', address: '0xB3dCBE168cFe6ccb123b2c13F7CF9Aa95B7Ec5aE' },
    color: '#6b7c7f',
  },
];

const MONO = '"SF Mono", "Fira Code", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// ============ MAIN COMPONENT ============
export default function BusinessModels() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HEADER ── */}
      <div style={{ ...CARD, overflow: 'hidden' }}>
        <div style={{ background: '#122023', padding: '28px 32px' }}>
          <div style={{ ...LABEL, color: '#40FB50', letterSpacing: '3px', marginBottom: '6px' }}>Revenue Streams</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFF', lineHeight: 1.3 }}>Business Models</div>
          <div style={{ fontSize: '13px', color: '#6b7c7f', marginTop: '8px', lineHeight: 1.6 }}>
            Revenue is transferred to the Treasury Multisig on the 1st of each month. Separate multisigs for each product provide clear metrics.
          </div>
        </div>

        {/* Revenue flow strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #E0E0E0' }}>
          {[
            { step: '01', label: 'User Activity', sub: 'Send App' },
            { step: '02', label: 'Product Multisigs', sub: 'Track by source' },
            { step: '03', label: 'Treasury', sub: '1st of month' },
          ].map((s, i) => (
            <div key={s.step} style={{ padding: '16px 20px', borderRight: i < 2 ? '1px solid #f0f0f0' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 800, color: '#e8eaeb', lineHeight: 1 }}>{s.step}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{s.label}</div>
                <div style={{ fontSize: '11px', color: '#999' }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODEL CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {businessModels.map((model) => (
          <div key={model.type} style={{ ...CARD, overflow: 'hidden' }}>
            <div style={{ borderLeft: `4px solid ${model.color}`, padding: '20px 20px 20px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Name + description */}
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#122023', marginBottom: '4px' }}>{model.type}</div>
                <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.5 }}>{model.description}</div>
              </div>

              {/* Fee */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 14px', background: '#fafafa', borderRadius: '8px' }}>
                <div>
                  <div style={{ ...LABEL, marginBottom: '4px' }}>Fee</div>
                  <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 700, color: '#122023', lineHeight: 1 }}>{model.fee}</div>
                </div>
                <div style={{ fontFamily: MONO, fontSize: '11px', color: '#999', textAlign: 'right' }}>{model.feeType}</div>
              </div>

              {/* Multisig */}
              <a
                href={`https://basescan.org/address/${model.multisig.address}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '12px' }}
              >
                <span style={{ fontWeight: 500, color: '#122023' }}>{model.multisig.name}</span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: '#bbb' }}>{shortenAddress(model.multisig.address)}</span>
                <span style={{ marginLeft: 'auto', color: '#1a8a2e', fontWeight: 600, fontSize: '11px', flexShrink: 0 }}>View ↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── FEE TABLE ── */}
      <div style={{ ...CARD, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E0E0E0' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023' }}>Fee Structure</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Product', 'Fee', 'Type', 'Multisig'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 16px', fontSize: '10px', fontWeight: 600,
                    color: '#999', textTransform: 'uppercase', letterSpacing: '1px',
                    borderBottom: '2px solid #E0E0E0', fontFamily: MONO,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {businessModels.map((m, i) => (
                <tr key={m.type} style={{ background: i % 2 === 0 ? '#fafafa' : '#FFF' }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#122023', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.color }} />
                      {m.type}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: MONO, fontWeight: 700, fontSize: '13px', color: '#122023', borderBottom: '1px solid #f0f0f0' }}>{m.fee}</td>
                  <td style={{ padding: '12px 16px', fontFamily: MONO, fontSize: '12px', color: '#888', borderBottom: '1px solid #f0f0f0' }}>{m.feeType}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                    <a href={`https://basescan.org/address/${m.multisig.address}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                      <span style={{ fontFamily: MONO, fontSize: '11px', color: '#999' }}>{shortenAddress(m.multisig.address)}</span>
                      <span style={{ color: '#1a8a2e', fontWeight: 600, fontSize: '11px' }}>View ↗</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
