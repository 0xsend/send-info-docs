// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Send Info Docs',
  tagline: 'Send, Save, Invest. Your global wallet app, built for real life.',
  url: 'https://github.com/0xsend',
  baseUrl: '/send-info-docs/',
  organizationName: '0xSend', // Replace with your GitHub username
  projectName: 'send-info-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Send Info Docs',
      logo: {
        alt: 'Send Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/', label: 'Docs', position: 'left' },
        { href: 'https://https://github.com/0xsend/send-info-docs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            { label: 'X', href: 'https://x.com/send' },
            { label: 'Telegram', href: 'https://t.me/send_app' },
          ],
        },
      ],
      copyright: `© 2025 Send, Inc.`,
    },
  },
};