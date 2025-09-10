/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Welcome',
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
      label: 'Send Token',
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
      label: 'Send App',
      collapsible: true,
      collapsed: true,
      items: [
        'send-app/send-app-overview',
        {
          type: 'category',
          label: 'Features',
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
      ],
    },
    {
      type: 'category',
      label: 'Canton Wallet',
      collapsible: true,
      collapsed: true,
      items: [
        'canton-wallet/canton-wallet-overview',
      ],
    },
    {
      type: 'category',
      label: 'CUSD Stablecoin',
      collapsible: true,
      collapsed: true,
      items: [
        'cusd-stablecoin/cusd-stablecoin-overview',
      ],
    },
    {
      type: 'category',
      label: 'Finance',
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
      label: 'Miscellaneous',
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
      label: 'Legal',
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