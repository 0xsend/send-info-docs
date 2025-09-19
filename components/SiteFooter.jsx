export default function SiteFooter() {
  return (
    <footer className="footer footer--dark">
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="footer__links">
          <div className="footer__link-item" style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Links</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a className="footer__link-item" href="https://github.com/0xsend/sendapp">Github</a></li>
            <li><a className="footer__link-item" href="https://x.com/send">X Profile</a></li>
            <li><a className="footer__link-item" href="https://t.me/send_app">Telegram</a></li>
            <li><a className="footer__link-item" href="https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0xeab49138ba2ea6dd776220fe26b7b8e446638956&chain0=8453&chain1=8453">Buy $SEND</a></li>
            <li><a className="footer__link-item" href="https://support.send.app/en/">Support</a></li>
          </ul>
        </div>
        <div style={{ marginTop: '1rem' }}>© Send, Inc.</div>
      </div>
    </footer>
  );
}
