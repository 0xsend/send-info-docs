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
  section: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  sectionHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid #E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#122023',
  },
  sectionSubtitle: {
    fontSize: '12px',
    color: '#666',
    marginTop: '2px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 20px',
    borderBottom: '1px solid #F0F0F0',
    gap: '16px',
  },
  rowName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#122023',
    minWidth: '140px',
  },
  rowAddress: {
    fontFamily: 'monospace',
    fontSize: '13px',
    color: '#666',
    flex: 1,
  },
  viewLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: '#10B981',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
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
function MultisigRow({ name, address, url }: { name: string; address: string; url?: string }) {
  const displayAddress = address.startsWith('0x') ? shortenAddress(address) : address;
  const linkUrl = url || getBasescanUrl(address);

  return (
    <div style={styles.row}>
      <div style={styles.rowName}>{name}</div>
      <div style={styles.rowAddress}>{displayAddress}</div>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.viewLink}
      >
        View
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function Multisigs() {
  return (
    <div style={styles.container}>
      {/* Info Callout */}
      <div style={styles.infoCallout}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
          <circle cx="10" cy="10" r="9" stroke="#004085" strokeWidth="2"/>
          <path d="M10 9V14M10 6V7" stroke="#004085" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span>
          All multisigs require <strong>3 of 5 signatures</strong> for transaction execution.
          Revenue is consolidated to the Treasury on the <strong>1st of each month</strong>.
        </span>
      </div>

      {/* Base Network */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>Base Network</div>
          <div style={styles.sectionSubtitle}>Token allocation and operational wallets</div>
        </div>
        {baseMultisigs.map((multisig, i) => (
          <MultisigRow
            key={multisig.address}
            name={multisig.name}
            address={multisig.address}
          />
        ))}
      </div>

      {/* Revenue Collection */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>Revenue Collection</div>
          <div style={styles.sectionSubtitle}>Product-specific revenue tracking</div>
        </div>
        {revenueMultisigs.map((multisig) => (
          <MultisigRow
            key={multisig.address}
            name={multisig.name}
            address={multisig.address}
          />
        ))}
      </div>

      {/* Canton Network */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>Canton Network</div>
          <div style={styles.sectionSubtitle}>Cross-chain treasury and rewards</div>
        </div>
        {cantonMultisigs.map((multisig) => (
          <MultisigRow
            key={multisig.address}
            name={multisig.name}
            address={multisig.shortAddress || multisig.address}
            url={multisig.url}
          />
        ))}
      </div>
    </div>
  );
}
