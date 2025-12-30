'use client';

import React from 'react';

// ============ BUSINESS MODEL DATA ============
const businessModels = [
  {
    type: 'Earn',
    description: 'Yield generation from staking and liquidity provision',
    fee: '6-8%',
    feeType: 'Rake',
    multisig: {
      name: 'Earn Revenue',
      address: '0x65049C4B8e970F5bcCDAE8E141AA06346833CeC4',
    },
    icon: '📈',
    color: '#40FB50',
    bgColor: '#E8FDE9',
  },
  {
    type: 'Sendtags',
    description: 'Human-readable usernames for easy crypto transfers',
    fee: '1.5-16',
    feeType: 'USDC flat fee',
    multisig: {
      name: 'Sendtag Revenue',
      address: '0x71fa02bb11e4b119bEDbeeD2f119F62048245301',
    },
    icon: '🏷️',
    color: '#7C4DFF',
    bgColor: '#EDE7F6',
  },
  {
    type: 'Trades',
    description: 'Token swaps and trading within the Send App',
    fee: '0.75%',
    feeType: 'Per trade',
    multisig: {
      name: 'Trade Revenue',
      address: '0x17D46f667B0e4156238645536c344d010FC099d7',
    },
    icon: '🔄',
    color: '#FF9800',
    bgColor: '#FFF3E0',
  },
  {
    type: 'Transactions',
    description: 'Transfer fees for sending crypto to other users',
    fee: '0.01',
    feeType: 'USDC per tx',
    multisig: {
      name: 'Transaction Revenue',
      address: '0xB3dCBE168cFe6ccb123b2c13F7CF9Aa95B7Ec5aE',
    },
    icon: '💸',
    color: '#2196F3',
    bgColor: '#E3F2FD',
  },
];

// ============ STYLES ============
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
    padding: '8px 0',
  },
  infoCallout: {
    backgroundColor: '#E8F4FD',
    border: '1px solid #B8DAFF',
    borderRadius: '8px',
    padding: '14px 18px',
    fontSize: '14px',
    color: '#004085',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    lineHeight: 1.5,
  },
  modelsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  modelCard: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    transition: 'box-shadow 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#122023',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.5,
  },
  feeContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  feeValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#122023',
  },
  feeType: {
    fontSize: '12px',
    color: '#666',
    marginTop: '2px',
  },
  multisigLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: '#F5F5F5',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#122023',
    fontSize: '13px',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#122023',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 16px',
    borderBottom: '2px solid #E0E0E0',
    color: '#666',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid #F0F0F0',
    color: '#122023',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
  },
  flowDiagram: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '24px',
    flexWrap: 'wrap' as const,
  },
  flowBox: {
    padding: '16px 24px',
    borderRadius: '10px',
    textAlign: 'center' as const,
    minWidth: '140px',
  },
  flowArrow: {
    color: '#CCC',
    fontSize: '24px',
  },
};

// ============ UTILITY FUNCTIONS ============
function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// ============ MAIN COMPONENT ============
export default function BusinessModels() {
  return (
    <div style={styles.container}>
      {/* Info Callout */}
      <div style={styles.infoCallout}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
          <circle cx="10" cy="10" r="9" stroke="#004085" strokeWidth="2"/>
          <path d="M10 9V14M10 6V7" stroke="#004085" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>
          Revenue is transferred to the Treasury Multisig on the <strong>1st of each month</strong>.
          By maintaining separate multisigs for each revenue-generating product, we gain clearer insights into our metrics.
        </span>
      </div>

      {/* Revenue Flow */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Revenue Flow</div>
        <div style={styles.flowDiagram}>
          <div style={{ ...styles.flowBox, backgroundColor: '#E8FDE9', border: '2px solid #40FB50' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>Send App</div>
            <div style={{ fontSize: '12px', color: '#666' }}>User Activity</div>
          </div>
          <div style={styles.flowArrow}>→</div>
          <div style={{ ...styles.flowBox, backgroundColor: '#FFF3E0', border: '2px solid #FF9800' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>Product Multisigs</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Track by source</div>
          </div>
          <div style={styles.flowArrow}>→</div>
          <div style={{ ...styles.flowBox, backgroundColor: '#E3F2FD', border: '2px solid #2196F3' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏦</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>Treasury</div>
            <div style={{ fontSize: '12px', color: '#666' }}>1st of month</div>
          </div>
        </div>
      </div>

      {/* Business Model Cards */}
      <div style={styles.modelsGrid}>
        {businessModels.map((model) => (
          <div key={model.type} style={styles.modelCard}>
            <div style={styles.cardHeader}>
              <div style={{ ...styles.iconContainer, backgroundColor: model.bgColor }}>
                {model.icon}
              </div>
              <div style={styles.cardTitle}>{model.type}</div>
            </div>

            <div style={styles.cardDescription}>{model.description}</div>

            <div style={styles.feeContainer}>
              <div>
                <div style={styles.feeLabel}>Fee</div>
                <div style={styles.feeValue}>{model.fee}</div>
                <div style={styles.feeType}>{model.feeType}</div>
              </div>
              <div style={{ ...styles.badge, backgroundColor: model.bgColor, color: model.color }}>
                {model.feeType.includes('%') || model.feeType.includes('Rake') ? 'Percentage' : 'Flat Fee'}
              </div>
            </div>

            <a
              href={`https://basescan.org/address/${model.multisig.address}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.multisigLink}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="3" stroke="#666" strokeWidth="1.5"/>
                <path d="M6 8H10M8 6V10" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {model.multisig.name}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 'auto' }}>
                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        ))}
      </div>

      {/* Summary Table */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Fee Structure Summary</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Fee</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Multisig Wallet</th>
              </tr>
            </thead>
            <tbody>
              {businessModels.map((model) => (
                <tr key={model.type}>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>{model.icon}</span>
                      <span style={{ fontWeight: 600 }}>{model.type}</span>
                    </div>
                  </td>
                  <td style={{ ...styles.td, fontWeight: 700, color: model.color }}>
                    {model.fee}
                  </td>
                  <td style={styles.td}>{model.feeType}</td>
                  <td style={styles.td}>
                    <a
                      href={`https://basescan.org/address/${model.multisig.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#40FB50', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {model.multisig.name}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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
