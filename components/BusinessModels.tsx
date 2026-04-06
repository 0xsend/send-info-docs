'use client';


// ============ BUSINESS MODEL DATA ============
const businessModels = [
  {
    type: 'Earn',
    description: 'Yield generation from staking and liquidity provision',
    fee: '6–8%',
    feeType: 'Rake',
    multisig: {
      name: 'Earn Revenue',
      address: '0x65049C4B8e970F5bcCDAE8E141AA06346833CeC4',
    },
    color: '#40FB50',
  },
  {
    type: 'Sendtags',
    description: 'Human-readable usernames for easy crypto transfers',
    fee: '4–32',
    feeType: 'USDC flat fee',
    multisig: {
      name: 'Sendtag Revenue',
      address: '0x71fa02bb11e4b119bEDbeeD2f119F62048245301',
    },
    color: '#7C4DFF',
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
    color: '#FF9800',
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
    color: '#2196F3',
  },
];

// ============ UTILITY FUNCTIONS ============
function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// ============ MAIN COMPONENT ============
export default function BusinessModels() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '8px 0',
      }}
    >
      {/* Section Header */}
      <div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '6px',
          }}
        >
          Revenue Streams
        </div>
        <div
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#122023',
            lineHeight: 1.2,
          }}
        >
          Business Models
        </div>
      </div>

      {/* Info Callout */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #E0E0E0',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '14px 18px',
          fontSize: '14px',
          color: '#444',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          lineHeight: 1.6,
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#40FB50',
            flexShrink: 0,
            marginTop: '5px',
          }}
        />
        <span>
          Revenue is transferred to the Treasury Multisig on the{' '}
          <strong style={{ color: '#122023' }}>1st of each month</strong>.
          By maintaining separate multisigs for each revenue-generating product,
          we gain clearer insights into our metrics.
        </span>
      </div>

      {/* Revenue Flow */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '24px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '20px',
          }}
        >
          Revenue Flow
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E0E0E0',
              borderRadius: '12px',
              padding: '16px 24px',
              textAlign: 'center',
              minWidth: '140px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#40FB50',
                margin: '0 auto 10px',
              }}
            />
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>Send App</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>User Activity</div>
          </div>

          <div style={{ color: '#CCC', fontSize: '18px', fontWeight: 300 }}>→</div>

          {/* Step 2 */}
          <div
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E0E0E0',
              borderRadius: '12px',
              padding: '16px 24px',
              textAlign: 'center',
              minWidth: '140px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#FF9800',
                margin: '0 auto 10px',
              }}
            />
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>Product Multisigs</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Track by source</div>
          </div>

          <div style={{ color: '#CCC', fontSize: '18px', fontWeight: 300 }}>→</div>

          {/* Step 3 */}
          <div
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E0E0E0',
              borderRadius: '12px',
              padding: '16px 24px',
              textAlign: 'center',
              minWidth: '140px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#2196F3',
                margin: '0 auto 10px',
              }}
            />
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>Treasury</div>
            <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>1st of month</div>
          </div>
        </div>
      </div>

      {/* Business Model Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
        }}
      >
        {businessModels.map((model) => (
          <div
            key={model.type}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #E0E0E0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              overflow: 'hidden',
            }}
          >
            {/* Left color border accent via top bar */}
            <div
              style={{
                height: '3px',
                backgroundColor: model.color,
                width: '100%',
              }}
            />

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: model.color,
                    flexShrink: 0,
                  }}
                />
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#122023' }}>
                  {model.type}
                </div>
              </div>

              {/* Description */}
              <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.55 }}>
                {model.description}
              </div>

              {/* Fee */}
              <div
                style={{
                  backgroundColor: '#FAFAFA',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#999',
                      marginBottom: '4px',
                    }}
                  >
                    Fee
                  </div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#122023',
                      lineHeight: 1,
                    }}
                  >
                    {model.fee}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: '#888',
                    textAlign: 'right',
                    maxWidth: '90px',
                    lineHeight: 1.4,
                  }}
                >
                  {model.feeType}
                </div>
              </div>

              {/* Multisig Link */}
              <a
                href={`https://basescan.org/address/${model.multisig.address}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  backgroundColor: '#FAFAFA',
                  borderRadius: '8px',
                  border: '1px solid #EBEBEB',
                  textDecoration: 'none',
                  color: '#122023',
                  fontSize: '12px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: model.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontWeight: 500, flexShrink: 0 }}>{model.multisig.name}</span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: '#999',
                    marginLeft: '2px',
                  }}
                >
                  {shortenAddress(model.multisig.address)}
                </span>
                <span
                  style={{
                    marginLeft: 'auto',
                    color: '#40FB50',
                    fontWeight: 600,
                    fontSize: '11px',
                    letterSpacing: '0.5px',
                    flexShrink: 0,
                  }}
                >
                  View ↗
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Fee Structure Summary Table */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          padding: '24px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '20px',
          }}
        >
          Fee Structure Summary
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr>
                {['Product', 'Fee', 'Type', 'Multisig Wallet'].map((col) => (
                  <th
                    key={col}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderBottom: '2px solid #E0E0E0',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#999',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {businessModels.map((model) => (
                <tr key={model.type}>
                  <td
                    style={{
                      padding: '14px',
                      borderBottom: '1px solid #F0F0F0',
                      color: '#122023',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: model.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontWeight: 600 }}>{model.type}</span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: '14px',
                      borderBottom: '1px solid #F0F0F0',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: '#122023',
                    }}
                  >
                    {model.fee}
                  </td>
                  <td
                    style={{
                      padding: '14px',
                      borderBottom: '1px solid #F0F0F0',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      color: '#666',
                    }}
                  >
                    {model.feeType}
                  </td>
                  <td
                    style={{
                      padding: '14px',
                      borderBottom: '1px solid #F0F0F0',
                    }}
                  >
                    <a
                      href={`https://basescan.org/address/${model.multisig.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '12px',
                          color: '#555',
                        }}
                      >
                        {shortenAddress(model.multisig.address)}
                      </span>
                      <span
                        style={{
                          color: '#40FB50',
                          fontWeight: 600,
                          fontSize: '12px',
                        }}
                      >
                        View ↗
                      </span>
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
