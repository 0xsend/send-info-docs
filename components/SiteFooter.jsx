export default function SiteFooter() {
  return (
    <footer className="footer footer--dark">
      <div className="container footer-container">
        <div className="footer__links">
          <ul className="footer-links-list">
            <li><a className="footer__link-item" href="https://github.com/0xsend/sendapp" target="_blank" rel="noreferrer">Github</a></li>
            <li><a className="footer__link-item" href="https://x.com/send" target="_blank" rel="noreferrer">X Profile</a></li>
            <li><a className="footer__link-item" href="https://t.me/send_app" target="_blank" rel="noreferrer">Telegram</a></li>
            <li><a className="footer__link-item" href="https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0xeab49138ba2ea6dd776220fe26b7b8e446638956&chain0=8453&chain1=8453" target="_blank" rel="noreferrer">Buy $SEND</a></li>
            <li><a className="footer__link-item" href="https://support.send.app/en/" target="_blank" rel="noreferrer">Support</a></li>
          </ul>
        </div>
        <div className="footer-copy">© Send, Inc.</div>
      </div>
    </footer>
  );
}
