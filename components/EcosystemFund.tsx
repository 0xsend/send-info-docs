'use client';

import { useState } from 'react';

// ============ DATA ============
const fundData = {
  cusdYield: 21397.00,
  defiVaultYield: 58164.51,
  get total() { return this.cusdYield + this.defiVaultYield; },
  lastUpdated: 'September 2025 – March 2026',
};

const allocations = [
  { label: 'CUSD Adoption & Partnerships', pct: 40, color: '#40FB50', desc: 'Integration grants for projects adopting CUSD' },
  { label: 'Pool Party Liquidity', pct: 25, color: '#2196F3', desc: 'Deepen CUSD trading pairs on Pool Party' },
  { label: 'Builder Grants', pct: 20, color: '#FF9800', desc: 'Fund developers building on Canton' },
  { label: 'Strategic Reserve', pct: 15, color: '#8B5CF6', desc: 'Partnerships and future programs' },
];

const cusdFeatures = [
  { label: 'Confidential transfers', detail: 'Amounts and counterparties private by default' },
  { label: 'Selective disclosure', detail: 'Share only what regulators require' },
  { label: 'Regulated issuance', detail: 'Brale handles compliance and mint/redeem' },
  { label: 'Canton-native', detail: 'Built for Canton with Pool Party liquidity' },
  { label: 'API access', detail: 'Programmatic integrations via Brale' },
];

const steps = [
  { num: '01', title: 'Collect', desc: 'CUSD reserve yield and stablecoin revenue collected monthly' },
  { num: '02', title: 'Acquire', desc: '$CC acquired through Pool Party periodically' },
  { num: '03', title: 'Deploy', desc: 'Allocated across growth initiatives expanding CUSD and Canton' },
];

// ============ FORMATTERS ============
const fmt = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ============ COMPONENT ============
export default function EcosystemFund() {
  const [hoveredAlloc, setHoveredAlloc] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── HERO: Bento grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '2px',
        borderRadius: '14px',
        overflow: 'hidden',
      }}>
        {/* Total — large cell */}
        <div style={{
          gridRow: '1 / 3',
          background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 60%, #1e4a4f 100%)',
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '200px',
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#40FB50', marginBottom: '6px' }}>
              CUSD Ecosystem Fund
            </div>
            <div style={{ fontSize: '13px', color: '#6b7c7f', lineHeight: 1.6, maxWidth: '380px' }}>
              Revenue from CUSD reserve economics and DeFi vaults, deployed to grow the Canton ecosystem.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '48px', fontWeight: 700, color: '#FFF', letterSpacing: '-2px', lineHeight: 1 }}>
              {fmt(fundData.total)}
            </div>
            <div style={{ fontSize: '12px', color: '#4a5c5f', marginTop: '10px', fontWeight: 500 }}>
              Total revenue collected · {fundData.lastUpdated}
            </div>
          </div>
        </div>

        {/* CUSD Reserve Yield */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>
            CUSD Reserve Yield
          </div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '26px', fontWeight: 700, color: '#FFF', letterSpacing: '-1px' }}>
              {fmt(fundData.cusdYield)}
            </div>
            <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>via Brale · 90% revenue share</div>
          </div>
        </div>

        {/* Stablecoin Revenue */}
        <div style={{ background: '#171f22', padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a5c5f' }}>
            Stablecoin Revenue
          </div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '26px', fontWeight: 700, color: '#FFF', letterSpacing: '-1px' }}>
              {fmt(fundData.defiVaultYield)}
            </div>
            <div style={{ fontSize: '11px', color: '#4a5c5f', marginTop: '4px' }}>via DeFi vaults · monthly</div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS: 3-step strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {steps.map((step) => (
          <div key={step.num} style={{
            background: '#FFF',
            borderRadius: '12px',
            padding: '24px 22px',
            border: '1px solid #E0E0E0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative',
          }}>
            <div style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 800, color: '#e8eaeb', position: 'absolute', top: '14px', right: '18px', lineHeight: 1 }}>
              {step.num}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#122023', marginBottom: '8px' }}>
              {step.title}
            </div>
            <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5, maxWidth: '240px' }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── ALLOCATION + CUSD side by side ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Allocation */}
        <div style={{
          background: '#FFF',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '16px' }}>
            Allocation Framework
          </div>

          {/* Proportional bar */}
          <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '20px' }}>
            {allocations.map((a, i) => (
              <div
                key={a.label}
                style={{
                  width: `${a.pct}%`,
                  background: a.color,
                  opacity: hoveredAlloc !== null && hoveredAlloc !== i ? 0.25 : 1,
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredAlloc(i)}
                onMouseLeave={() => setHoveredAlloc(null)}
              />
            ))}
          </div>

          {allocations.map((a, i) => (
            <div
              key={a.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
                opacity: hoveredAlloc !== null && hoveredAlloc !== i ? 0.4 : 1,
                transition: 'opacity 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredAlloc(i)}
              onMouseLeave={() => setHoveredAlloc(null)}
            >
              <div style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 700, color: a.color, width: '44px', flexShrink: 0 }}>
                {a.pct}%
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023' }}>{a.label}</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{a.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ fontSize: '11px', color: '#aaa', marginTop: '12px' }}>
            Allocations are targets and may be adjusted based on ecosystem needs.
          </div>
        </div>

        {/* Why CUSD */}
        <div style={{
          background: '#FFF',
          borderRadius: '12px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #122023 0%, #1a3a3f 100%)',
            padding: '24px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#40FB50', marginBottom: '10px' }}>
              Why CUSD
            </div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFF', lineHeight: 1.4 }}>
              Privacy-first stablecoin for Canton Network
            </div>
            <div style={{ fontSize: '12px', color: '#6b7c7f', marginTop: '8px', lineHeight: 1.6 }}>
              Issued by Brale with KYC/AML compliance, backed 1:1 with USD-denominated reserves.
            </div>
          </div>
          <div style={{ padding: '16px 24px' }}>
            {cusdFeatures.map((f, i) => (
              <div key={f.label} style={{
                display: 'flex',
                gap: '12px',
                padding: '10px 0',
                borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
                alignItems: 'baseline',
              }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#122023', width: '140px', flexShrink: 0 }}>{f.label}</div>
                <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{f.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PARTNERS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{
          background: '#FFF',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '14px' }}>
            Integration Grants
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023', marginBottom: '8px' }}>
            Build with CUSD
          </div>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
            Projects that natively integrate CUSD — as a payment method, treasury asset, lending collateral, or settlement layer — can apply for $CC grants. The deeper the integration, the more value it creates for the ecosystem.
          </div>
        </div>
        <div style={{
          background: '#FFF',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '14px' }}>
            Early Access
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#122023', marginBottom: '8px' }}>
            Ship first on Canton
          </div>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
            Active ecosystem partners get priority access to new Send infrastructure, Pool Party pairs, APIs, and Canton tooling as it ships. Reach out through the Send app or community channels.
          </div>
        </div>
      </div>

      {/* ── TRANSPARENCY ── */}
      <div style={{
        background: '#FFF',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '20px' }}>
          Fund Transparency
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Multisig</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>CUSD Ecosystem Fund</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Network</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#122023' }}>Canton Network</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Address</div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: '#999', fontStyle: 'italic' }}>To be published</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023', marginBottom: '12px' }}>Acquisition History</div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#999',
            padding: '20px',
            background: '#fafafa',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            First acquisition pending
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px', marginTop: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023', marginBottom: '12px' }}>Revenue Sources</div>
          {[
            { source: 'CUSD Reserve Yield', detail: '90% of reserve economics from CUSD outstanding', via: 'Brale', freq: 'Monthly' },
            { source: 'Stablecoin Revenue', detail: 'Revenue from stablecoin operations', via: 'DeFi vaults', freq: 'Monthly' },
          ].map((r, i) => (
            <div key={r.source} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0',
              borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
              gap: '16px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#122023', width: '160px', flexShrink: 0 }}>{r.source}</div>
              <div style={{ fontSize: '12px', color: '#888', flex: 1 }}>{r.detail}</div>
              <div style={{ fontSize: '11px', color: '#aaa', fontFamily: 'monospace', flexShrink: 0 }}>{r.freq}</div>
            </div>
          ))}
          <div style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>
            For monthly breakdowns, see the <a href="/docs/cusd-stablecoin/reserves-report" style={{ color: '#1a8a2e', textDecoration: 'none', fontWeight: 500 }}>Reserves Report</a> and <a href="/docs/finance/revenue" style={{ color: '#1a8a2e', textDecoration: 'none', fontWeight: 500 }}>Revenue</a> pages.
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            'All fund transactions are executed on-chain and publicly verifiable',
            'Monthly revenue reports from Brale are published on the Reserves Report page',
            'Allocation breakdowns will be published alongside each acquisition cycle',
            'The CUSD Ecosystem Fund multisig address and holdings are publicly auditable',
          ].map((line) => (
            <div key={line} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ccc', flexShrink: 0, marginTop: '6px' }} />
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5 }}>{line}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <div style={{
        background: '#fafafa',
        borderRadius: '12px',
        padding: '20px 24px',
        fontSize: '11px',
        color: '#999',
        lineHeight: 1.7,
      }}>
        The CUSD Ecosystem Fund is operated at the discretion of Send Foundation and may be modified, suspended, or discontinued at any time. Fund operations do not constitute a guarantee of $CC price support or appreciation. $CC is a digital asset subject to market volatility and may lose value. Partner incentives and grants are discretionary, not guaranteed, and subject to separate eligibility criteria. This page is for informational purposes only and does not constitute investment advice.
      </div>
    </div>
  );
}
