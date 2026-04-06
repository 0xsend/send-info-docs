'use client';

import React from 'react';

// ============ MULTISIG DATA ============
const baseMultisigs = [
  { name: 'Send Treasury', address: '0x05CEa6C36f3a44944A4F4bA39B1820677AcB97EE' },
  { name: 'Rewards', address: '0xD3DCFf1823714a4399AD2927A3800686D4CEB53A' },
  { name: 'Team', address: '0xB6073D163cFBdE99D573891B094721eA6e319b57' },
  { name: 'Contributors', address: '0xA9127eE59d9D8eBCfeF58B22Bd6CeaaBEb584A3C' },
  { name: 'Exchange Listings', address: '0x9B0F6329f7A0e5091A9EEC1102Eaf97B53E67447' },
  { name: 'Multisig Signers', address: '0xa8b5861Eb8764b509f5D9eF0E71833ab5c9D547D' },
];

const revenueMultisigs = [
  { name: 'Earn Revenue', address: '0x65049C4B8e970F5bcCDAE8E141AA06346833CeC4' },
  { name: 'Sendtag Revenue', address: '0x71fa02bb11e4b119bEDbeeD2f119F62048245301' },
  { name: 'Trade Revenue', address: '0x17D46f667B0e4156238645536c344d010FC099d7' },
  { name: 'Transaction Revenue', address: '0xB3dCBE168cFe6ccb123b2c13F7CF9Aa95B7Ec5aE' },
];

const cantonMultisigs = [
  {
    name: 'Send Treasury',
    address: 'cantonwallet-send-treasury::1220b2d1b1bf8dfff8f298207d0286a951d989580ddce88d5b59ecc72f03af9e13d8',
    shortAddress: 'send-treasury::1220...13d8',
    url: 'https://lighthouse.fivenorth.io/party/cantonwallet-send-treasury%3A%3A1220b2d1b1bf8dfff8f298207d0286a951d989580ddce88d5b59ecc72f03af9e13d8',
  },
  {
    name: 'Send Rewards',
    address: 'cantonwallet-send-rewards::1220b2d1b1bf8dfff8f298207d0286a951d989580ddce88d5b59ecc72f03af9e13d8',
    shortAddress: 'send-rewards::1220...13d8',
    url: 'https://lighthouse.fivenorth.io/party/cantonwallet-send-rewards%3A%3A1220b2d1b1bf8dfff8f298207d0286a951d989580ddce88d5b59ecc72f03af9e13d8',
  },
  {
    name: 'Send Inc',
    address: 'cantonwallet-send-inc::122095917f4981dff943c18a63cdfae1aa036c885f026b7f6ccf44fe5da52e60f561',
    shortAddress: 'send-inc::1220...f561',
    url: 'https://lighthouse.fivenorth.io/party/cantonwallet-send-inc%3A%3A122095917f4981dff943c18a63cdfae1aa036c885f026b7f6ccf44fe5da52e60f561',
  },
  {
    name: 'Pool Party Rewards',
    address: 'cantonwallet-pool-party-rewards::1220062050fd57a71014715bd517203a464fd3eb1ee1e6c5f69ce51bbe055e5cf197',
    shortAddress: 'pool-party-rewards::1220...f197',
    url: 'https://lighthouse.fivenorth.io/party/cantonwallet-pool-party-rewards%3A%3A1220062050fd57a71014715bd517203a464fd3eb1ee1e6c5f69ce51bbe055e5cf197',
  },
];

// ============ STYLES ============
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '8px 0',
  },
  infoCallout: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: '#F7F7F7',
    border: '1px solid #E0E0E0',
    borderRadius: '12px',
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.5,
  },
  infoIcon: {
    flexShrink: 0,
    color: '#999',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: '14px 20px',
    backgroundColor: '#122023',
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#FFFFFF',
    letterSpacing: '0.01em',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color: '#999',
  },
  sectionSubtitle: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '1.5px',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.45)',
  },
  row: (isEven: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #F0F0F0',
    gap: '16px',
    backgroundColor: isEven ? '#FAFAFA' : '#FFFFFF',
  }),
  rowName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#122023',
    minWidth: '160px',
  },
  rowAddress: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#888',
    flex: 1,
    letterSpacing: '0.02em',
  },
  viewLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: '#1a8a2e',
    fontSize: '12px',
    fontWeight: 600,
    textDecoration: 'none',
    letterSpacing: '0.5px',
    flexShrink: 0,
  },
};

// ============ UTILITY FUNCTIONS ============
function shortenAddress(address: string): string {
  if (address.startsWith('0x')) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
  return address;
}

function getBasescanUrl(address: string): string {
  return `https://basescan.org/address/${address}`;
}

// ============ COMPONENTS ============
function MultisigRow({
  name,
  address,
  url,
  index,
}: {
  name: string;
  address: string;
  url?: string;
  index: number;
}) {
  const displayAddress = address.startsWith('0x') ? shortenAddress(address) : address;
  const linkUrl = url || getBasescanUrl(address);
  const isEven = index % 2 === 0;

  return (
    <div style={styles.row(isEven)}>
      <div style={styles.rowName}>{name}</div>
      <div style={styles.rowAddress}>{displayAddress}</div>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.viewLink}
      >
        View
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}

interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function Section({ title, subtitle, children }: SectionProps) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.sectionTitle}>{title}</span>
        <span style={styles.sectionSubtitle}>{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function Multisigs() {
  return (
    <div style={styles.container}>
      {/* Info Callout */}
      <div style={styles.infoCallout}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          style={styles.infoIcon}
        >
          <circle cx="10" cy="10" r="9" stroke="#AAAAAA" strokeWidth="2" />
          <path d="M10 9V14M10 6V7" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>
          All multisigs require <strong style={{ color: '#444', fontWeight: 600 }}>3 of 5 signatures</strong> for
          transaction execution. Revenue consolidates to Treasury on the{' '}
          <strong style={{ color: '#444', fontWeight: 600 }}>1st of each month</strong>.
        </span>
      </div>

      {/* Canton Network */}
      <Section title="Canton Network" subtitle="Treasury, rewards &amp; operations">
        {cantonMultisigs.map((multisig, i) => (
          <MultisigRow
            key={multisig.address}
            name={multisig.name}
            address={multisig.shortAddress || multisig.address}
            url={multisig.url}
            index={i}
          />
        ))}
      </Section>

      {/* Base Network */}
      <Section title="Base Network" subtitle="Token allocation &amp; operational wallets">
        {baseMultisigs.map((multisig, i) => (
          <MultisigRow
            key={multisig.address}
            name={multisig.name}
            address={multisig.address}
            index={i}
          />
        ))}
      </Section>

      {/* Revenue Collection */}
      <Section title="Revenue Collection (Base)" subtitle="Product revenue wallets">
        {revenueMultisigs.map((multisig, i) => (
          <MultisigRow
            key={multisig.address}
            name={multisig.name}
            address={multisig.address}
            index={i}
          />
        ))}
      </Section>
    </div>
  );
}
