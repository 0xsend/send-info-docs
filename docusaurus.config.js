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
            label: 'Send Info Docs',
            href: 'https://send.it',
            position: 'left',
          },
          {
            label: 'Send.app',
            href: 'https://send.app',
            position: 'left',
          },
        ],
        hideOnScroll: false,
      },
      
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/0xsend/sendapp',
              },
              {
                label: 'X Profile',
                href: 'https://x.com/send',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/send_app',
              },
              {
                label: 'Buy $SEND',
                href: 'https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0xeab49138ba2ea6dd776220fe26b7b8e446638956&chain0=8453&chain1=8453',
              },
              {
                label: 'Support',
                href: 'https://support.send.app/en/',
              },
            ],
          },
        ],
        copyright: `© Send, Inc.`,
      },
      
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;