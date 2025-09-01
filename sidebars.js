/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'WELCOME',
      collapsible: true,
      collapsed: false,
      items: [
        'welcome/what-is-send',
        'welcome/why-send',
        'welcome/the-problem',
        'welcome/mission-vision-values',
        'welcome/team',
        'welcome/contact',
      ],
    },
    {
      type: 'category',
      label: 'SEND TOKEN',
      collapsible: true,
      collapsed: true,
      items: [
        'send-token/what-is-send-token',
        'send-token/tokenomics',
        'send-token/bridge',
        'send-token/upgrade',
      ],
    },
    {
      type: 'category',
      label: 'FEATURES',
      collapsible: true,
      collapsed: true,
      items: [
        'features/invest',
        'features/passkeys',
        'features/referrals',
        'features/rewards',
        'features/sendtags',
        'features/savings',
      ],
    },
    {
      type: 'category',
      label: 'FINANCE',
      collapsible: true,
      collapsed: true,
      items: [
        'finance/multisigs',
        'finance/funding-rounds',
        'finance/business-models',
        'finance/token-emissions',
        'finance/treasury',
        'finance/revenue',
      ],
    },
    {
      type: 'category',
      label: 'MISCELLANEOUS',
      collapsible: true,
      collapsed: true,
      items: [
        'miscellaneous/roadmap',
        'miscellaneous/send-metrics',
        'miscellaneous/intellectual-property',
        'miscellaneous/send-contract-addresses',
        'miscellaneous/brand-links-assets',
      ],
    },
    {
      type: 'category',
      label: 'LINKS',
      collapsible: true,
      collapsed: true,
      items: [
        'links/github',
        'links/x-profile',
        'links/telegram',
        'links/buy-send',
        'links/support',
      ],
    },
    {
      type: 'category',
      label: 'LEGAL',
      collapsible: true,
      collapsed: true,
      items: [
        'legal/affiliate-marketing-disclaimer',
        'legal/disclaimer',
        'legal/privacy-policy',
        'legal/terms-of-service',
        'legal/licenses',
      ],
    },
  ],
};

module.exports = sidebars;