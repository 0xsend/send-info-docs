import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link className="navbar__brand navbar__link" href="/">Send Docs</Link>
        <nav className="nav-links">
          <a className="navbar__link" href="https://send.it">Send.it</a>
          <a className="navbar__link" href="https://send.app">Send.app</a>
          <a className="navbar__link" href="https://cantonwallet.com">Canton Wallet by Send</a>
        </nav>
      </div>
    </header>
  );
}
