import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * ZendFi Documentation Sidebar
 * Restructured for separate nav tabs
 */
const sidebars: SidebarsConfig = {
  // Payments sidebar - API Reference and Features
  paymentsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '📖 Introduction',
    },
    {
      type: 'category',
      label: '🔌 API Reference',
      collapsed: false,
      items: [
        'api/payments',
        'api/subscriptions',
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
  ],

  // Agentic Payments sidebar - separate from Payments
  agenticSidebar: [
    {
      type: 'doc',
      id: 'agentic/index',
      label: '🤖 Overview',
    },
    {
      type: 'doc',
      id: 'agentic/sdk-examples',
      label: '📝 SDK Examples',
    },
  ],

  // Developer Resources sidebar - SDKs, CLI, etc.
  developerResourcesSidebar: [
    {
      type: 'category',
      label: '🛠️ SDKs & Libraries',
      collapsed: false,
      items: [
        'developer-tools/sdks',
      ],
    },
    {
      type: 'category',
      label: '💻 CLI',
      collapsed: false,
      items: [
        'developer-tools/cli',
      ],
    },
  ],
};

export default sidebars;
