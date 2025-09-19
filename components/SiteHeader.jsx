import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem' }}>
        <Link className="navbar__brand navbar__link" href="/">Send Docs</Link>
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          <a className="navbar__link" href="https://send.it">Send.it</a>
          <a className="navbar__link" href="https://send.app">Send.app</a>
          <a className="navbar__link" href="https://cantonwallet.com">Canton Wallet by Send</a>
        </nav>
      </div>
    </header>
  );
}
