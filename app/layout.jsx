import './globals.css';
import SiteFooter from '../components/SiteFooter';

export const metadata = {
  title: 'Send Documentation',
  description: 'Your comprehensive guide to Send',
  icons: [{ rel: 'icon', url: '/img/favicon.svg' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
