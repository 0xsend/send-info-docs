'use client';

const MONO = '"DM Mono", monospace';
const LABEL: React.CSSProperties = { fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#6b7c7f' };
const CARD: React.CSSProperties = { background: '#FFF', borderRadius: '12px', border: '1px solid #E0E0E0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };

const CHROME_WEB_STORE_URL = 'https://chromewebstore.google.com/detail/send-connect/ldmohiccoioolenadmogclhoklmanpgi';
const SIGILRY_SITE = 'https://sigilry.org';
const SIGILRY_GITHUB = 'https://github.com/sigilry/sigilry';
const SIGILRY_REACT_NPM = 'https://www.npmjs.com/package/@sigilry/react';
const SIGILRY_DAPP_NPM = 'https://www.npmjs.com/package/@sigilry/dapp';

const steps = [
  { num: '01', title: 'Install', desc: 'One click from the Chrome Web Store. No seed phrase, no setup wizard.' },
  { num: '02', title: 'Connect', desc: 'Visit a Canton dApp. It detects Send Connect and asks to connect.' },
  { num: '03', title: 'Sign', desc: 'Approve with a passkey — Face ID, Touch ID, or a hardware key.' },
];

const features = [
  { label: 'Passkey signing', detail: 'WebAuthn PRF replaces seed phrases. Hardware-backed liveness on every transaction.' },
  { label: 'CIP-103 standard', detail: 'Implements the Canton window.canton provider standard. Works with any compliant dApp.' },
  { label: 'EIP-6963 discovery', detail: 'Wallet announcement events let dApps detect and offer Send Connect alongside other Canton wallets.' },
  { label: 'Allowlisted RPC', detail: 'ledgerApi only proxies safe GET/POST paths. Admin endpoints are blocked by design.' },
  { label: 'Open source', detail: 'Built on @sigilry/dapp standards — neutral, reusable, and credibly non-vendor-locked.' },
];

const integrations = [
  {
    name: 'Pool Party',
    tag: 'DEX · Canton',
    url: 'https://poolparty.fun',
    host: 'poolparty.fun',
    desc: 'Swap CC, CUSD, and USDCx. Bridge USDC from Ethereum. Provide liquidity to earn fees.',
  },
  {
    name: 'Hundred Exchange',
    tag: 'Exchange · Canton',
    url: 'https://www.hundred.exchange',
    host: 'hundred.exchange',
    desc: 'Trade and manage positions on Canton through the Send Connect provider.',
  },
];

const methods = [
  { name: 'connect', desc: 'Authenticate and open a session.' },
  { name: 'status', desc: 'Get current connection, session, and network state.' },
  { name: 'listAccounts', desc: 'Return the wallets the user has authorized.' },
  { name: 'getPrimaryAccount', desc: 'Return the active wallet for signing.' },
  { name: 'prepareExecuteAndWait', desc: 'Sign and submit a Canton command; wait for finality.' },
  { name: 'signMessage', desc: 'Sign an arbitrary message with the passkey credential.' },
  { name: 'ledgerApi', desc: 'Proxy allowlisted JSON-API calls with the user’s auth.' },
];

export default function SendConnect() {
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
              Send Connect · Browser Wallet
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#FFF', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: '14px' }}>
              Canton Network, in your browser.
            </div>
            <div style={{ fontSize: '15px', color: '#9aaaad', lineHeight: 1.6, marginBottom: '24px', maxWidth: '520px' }}>
              The browser extension that connects you to Canton dApps. Install in seconds. Sign with a passkey. No seed phrases.
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href={CHROME_WEB_STORE_URL}
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
                Install on Chrome →
              </a>
              <a
                href="#developers"
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
                For developers
              </a>
            </div>
          </div>
        </div>

        {/* Three identity tiles */}
        <div className="responsive-3col-tight">
          <div style={{ background: '#171f22', padding: '22px 26px' }}>
            <div style={{ ...LABEL, color: '#4a5c5f' }}>Standard</div>
            <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.3px', marginTop: '8px' }}>
              CIP-103
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>window.canton provider</div>
          </div>
          <div style={{ background: '#171f22', padding: '22px 26px' }}>
            <div style={{ ...LABEL, color: '#4a5c5f' }}>Signing</div>
            <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 700, color: '#FFF', letterSpacing: '-0.3px', marginTop: '8px' }}>
              Passkey
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>WebAuthn PRF · no seed phrases</div>
          </div>
          <div style={{ background: '#171f22', padding: '22px 26px' }}>
            <div style={{ ...LABEL, color: '#4a5c5f' }}>Browser</div>
            <div style={{ fontFamily: MONO, fontSize: '20px', fontWeight: 700, color: '#40FB50', letterSpacing: '-0.3px', marginTop: '8px' }}>
              Chrome
            </div>
            <div style={{ fontSize: '10px', color: '#4a5c5f', marginTop: '4px' }}>Manifest V3 · Firefox in roadmap</div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="responsive-3col">
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

      {/* ── FEATURES + LIVE INTEGRATIONS ── */}
      <div className="responsive-2col">
        {/* Features */}
        <div style={CARD}>
          <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)', padding: '24px' }}>
            <div style={{ ...LABEL, color: '#40FB50', marginBottom: '10px' }}>Core Features</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFF', lineHeight: 1.4 }}>
              Built for passkeys, not seed phrases.
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

        {/* Live integrations */}
        <div style={CARD}>
          <div style={{ background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)', padding: '24px' }}>
            <div style={{ ...LABEL, color: '#40FB50', marginBottom: '10px' }}>Live Today</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFF', lineHeight: 1.4 }}>
              Canton dApps using Send Connect.
            </div>
          </div>
          <div style={{ padding: '16px 24px' }}>
            {integrations.map((item, i) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#1a8a2e', marginBottom: '6px' }}>
                  {item.tag}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#122023', marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5, marginBottom: '6px' }}>{item.desc}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#1a8a2e' }}>
                  {item.host} →
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── DEVELOPERS ── */}
      <div id="developers" style={{ ...CARD, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(145deg, #0c1416 0%, #122023 50%, #1a3a3f 100%)', padding: '26px 32px' }}>
          <div style={{ ...LABEL, color: '#40FB50', marginBottom: '8px' }}>For Developers</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#FFF', lineHeight: 1.3, marginBottom: '8px' }}>
            Integrate in an afternoon.
          </div>
          <div style={{ fontSize: '14px', color: '#9aaaad', lineHeight: 1.55, maxWidth: '560px' }}>
            <code style={{ fontFamily: MONO, background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: '4px', fontSize: '12px', color: '#FFF' }}>@sigilry/react</code> gives you wagmi-style hooks for Canton — connect, sign, submit commands, and stream ledger updates. The underlying <code style={{ fontFamily: MONO, background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: '4px', fontSize: '12px', color: '#FFF' }}>@sigilry/dapp</code> package ships the typed CIP-103 provider, transport, and Zod schemas.
          </div>
        </div>

        <div style={{ padding: '20px 24px 24px' }}>
          {/* Step 1: Provider wrap */}
          <div style={{ ...LABEL, marginBottom: '8px', color: '#1a8a2e' }}>1. Wrap your app</div>
          <pre style={{
            background: '#0c1416',
            borderRadius: '10px',
            padding: '16px 20px',
            margin: '0 0 14px 0',
            fontFamily: MONO,
            fontSize: '12.5px',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.65,
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}>
<span style={{ color: '#f0a8b1' }}>import</span>{` { QueryClient, QueryClientProvider } `}<span style={{ color: '#f0a8b1' }}>from</span>{` `}<span style={{ color: '#a8f0b1' }}>'@tanstack/react-query'</span>{`\n`}
<span style={{ color: '#f0a8b1' }}>import</span>{` { CantonReactProvider } `}<span style={{ color: '#f0a8b1' }}>from</span>{` `}<span style={{ color: '#a8f0b1' }}>'@sigilry/react'</span>{`\n\n`}
<span style={{ color: '#f0a8b1' }}>const</span>{` queryClient = `}<span style={{ color: '#f0a8b1' }}>new</span>{` QueryClient()\n\n<QueryClientProvider client={queryClient}>\n  <CantonReactProvider>\n    <App />\n  </CantonReactProvider>\n</QueryClientProvider>`}
          </pre>

          {/* Step 2: Connect + sign */}
          <div style={{ ...LABEL, marginBottom: '8px', color: '#1a8a2e' }}>2. Connect, sign, submit</div>
          <pre style={{
            background: '#0c1416',
            borderRadius: '10px',
            padding: '16px 20px',
            margin: '0 0 18px 0',
            fontFamily: MONO,
            fontSize: '12.5px',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.65,
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}>
<span style={{ color: '#f0a8b1' }}>import</span>{` { useConnect, useActiveAccount, useSubmitCommand } `}<span style={{ color: '#f0a8b1' }}>from</span>{` `}<span style={{ color: '#a8f0b1' }}>'@sigilry/react'</span>{`\n\n`}
<span style={{ color: '#f0a8b1' }}>function</span>{` `}<span style={{ color: '#a8f0b1' }}>TransferButton</span>{`() {\n  `}<span style={{ color: 'rgba(255,255,255,0.45)' }}>{`// opens the Send Connect approval flow`}</span>{`\n  `}<span style={{ color: '#f0a8b1' }}>const</span>{` { connect, isPending } = useConnect()\n  `}<span style={{ color: '#f0a8b1' }}>const</span>{` account = useActiveAccount()\n  `}<span style={{ color: '#f0a8b1' }}>const</span>{` { submitAsync } = useSubmitCommand()\n\n  `}<span style={{ color: '#f0a8b1' }}>if</span>{` (!account.data) `}<span style={{ color: '#f0a8b1' }}>return</span>{` <button onClick={connect}>Connect</button>\n\n  `}<span style={{ color: '#f0a8b1' }}>return</span>{` <button onClick={() => submitAsync({\n    commands: [{ ExerciseCommand: { `}<span style={{ color: 'rgba(255,255,255,0.45)' }}>{`/* DAML */`}</span>{` } }],\n    actAs: [account.data.partyId],\n  })}>Transfer</button>\n}`}
          </pre>

          {/* RPC method strip */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ ...LABEL, marginBottom: '12px' }}>Underlying CIP-103 Methods</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {methods.map((m) => (
                <div key={m.name} style={{
                  background: '#fafafa', borderRadius: '8px', padding: '10px 14px',
                  borderLeft: '3px solid #1a8a2e',
                }}>
                  <div style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: '#122023', marginBottom: '2px' }}>{m.name}</div>
                  <div style={{ fontSize: '11px', color: '#888', lineHeight: 1.45 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={SIGILRY_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#122023',
                color: '#FFF',
                fontWeight: 600,
                fontSize: '13px',
                padding: '11px 20px',
                borderRadius: '999px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              View on GitHub →
            </a>
            <a
              href={SIGILRY_REACT_NPM}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#FFF',
                color: '#122023',
                border: '1px solid #E0E0E0',
                fontWeight: 600,
                fontSize: '13px',
                padding: '11px 20px',
                borderRadius: '999px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              @sigilry/react
            </a>
            <a
              href={SIGILRY_DAPP_NPM}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#FFF',
                color: '#122023',
                border: '1px solid #E0E0E0',
                fontWeight: 600,
                fontSize: '13px',
                padding: '11px 20px',
                borderRadius: '999px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              @sigilry/dapp
            </a>
            <a
              href="mailto:builders@send.it"
              style={{
                color: '#1a8a2e',
                fontWeight: 600,
                fontSize: '13px',
                padding: '11px 8px',
                textDecoration: 'none',
              }}
            >
              Partner with us →
            </a>
          </div>
        </div>
      </div>

      {/* ── SIGILRY CALLOUT ── */}
      <div style={{ ...CARD, padding: '24px 28px', borderLeft: '4px solid #1a8a2e' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ ...LABEL, marginBottom: '8px' }}>Open Standards · Sigilry</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '6px' }}>
              The RPC and schemas are open source.
            </div>
            <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
              The window.canton standard, message schemas, and developer SDK live under <a href={SIGILRY_SITE} target="_blank" rel="noopener noreferrer" style={{ color: '#122023', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid #122023' }}>Sigilry</a> — neutral, open-source, and usable by any Canton wallet. Send Connect is one implementation. Sigilry is the standard.
            </div>
          </div>
          <a href={SIGILRY_SITE} target="_blank" rel="noopener noreferrer" style={{
            fontSize: '12px', fontWeight: 600, color: '#1a8a2e',
            textDecoration: 'none', whiteSpace: 'nowrap',
            display: 'inline-flex', alignItems: 'center', gap: '4px',
          }}>
            sigilry.org →
          </a>
        </div>
      </div>
    </div>
  );
}
