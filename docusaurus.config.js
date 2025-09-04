// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Send Documentation',
  tagline: 'Your comprehensive guide to the Send ecosystem',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'your-github-username',
  projectName: 'send-info-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve docs at site root
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false, // Disable blog if you don't need it
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      
      navbar: {
        title: 'Send Docs',
        logo: {
          alt: 'Send Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            label: 'Send.it',
            href: 'https://send.it',
            position: 'left',
          },
          {
            label: 'Send.app',
            href: 'https://send.app',
            position: 'left',
          },
          {
            label: 'Canton Wallet',
            href: 'https://cantonwallet.com',
            position: 'left',
          },
        ],
        hideOnScroll: false,
      },
      
      footer: {
        style: 'dark',
        links: [
          // Your footer links here if any
        ],
        copyright: `© Send, Inc.`,
      },
      
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      
      // REMOVED: docs configuration (was in wrong place)
      
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;