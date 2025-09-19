import './globals.css';
import SiteHeader from '../components/SiteHeader';
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
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
