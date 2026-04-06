import './globals.css';

export const metadata = {
  title: 'Send Documentation',
  description: 'Your comprehensive guide to Send',
  icons: [{ rel: 'icon', url: '/img/favicon.svg' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Mono:wght@300;400;500&display=swap" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
