import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * ZendFi Documentation Sidebar
 * Structured to match the original Next.js docs layout
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📖 Introduction',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: '🚀 Getting Started',
    },
    {
      type: 'category',
      label: '🔌 API Reference',
      collapsed: false,
      items: [
        'api/payments',
        'api/subscriptions',
        'api/escrows',
        'api/installments',
        'api/invoices',
        'api/payment-links',
      ],
    },
    {
      type: 'category',
      label: '✨ Features',
      collapsed: false,
      items: [
        'features/payment-splits',
        'features/webhooks',
        'features/wallet-management',
      ],
    },
    {
      type: 'category',
      label: '🛠️ Developer Tools',
      collapsed: false,
      items: [
        'developer-tools/sdks',
        'developer-tools/cli',
      ],
    },
  ],
};

export default sidebars;
