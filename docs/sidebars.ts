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
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'API Reference',
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
      label: 'Features',
      collapsed: false,
      items: [
        'features/embedded-checkout',
        'features/payment-splits',
        'features/webhooks',
        'features/wallet-management',
      ],
    },
  ],

  agenticSidebar: [
    {
      type: 'doc',
      id: 'agentic/index',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'agentic/agent-keys',
      label: 'Agent Keys',
    },
    {
      type: 'doc',
      id: 'agentic/sessions',
      label: 'Sessions',
    },
    {
      type: 'doc',
      id: 'agentic/session-keys',
      label: 'Session Keys',
    },
    {
      type: 'doc',
      id: 'agentic/payment-intents',
      label: 'Payment Intents',
    },
    {
      type: 'doc',
      id: 'agentic/ppp-pricing',
      label: 'PPP Pricing',
    },
    {
      type: 'doc',
      id: 'agentic/autonomous-delegation',
      label: 'Autonomous Delegation',
    },
    {
      type: 'doc',
      id: 'agentic/smart-payments',
      label: 'Smart Payments',
    },
    {
      type: 'doc',
      id: 'agentic/device-bound-keys',
      label: 'Device-Bound Keys',
    },
    {
      type: 'doc',
      id: 'agentic/security',
      label: 'Security',
    },
  ],

  developerResourcesSidebar: [
    {
      type: 'category',
      label: 'Use Cases',
      collapsed: false,
      items: [
        'use-cases/index',
        'use-cases/ecommerce-store',
        'use-cases/saas-subscriptions',
        'use-cases/creator-tips',
        'use-cases/ai-shopping-bot',
      ],
    },
    {
      type: 'category',
      label: 'Framework Guides',
      collapsed: false,
      items: [
        'developer-tools/nextjs-integration',
        'developer-tools/express-integration',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: false,
      items: [
        'developer-tools/cli',
        'developer-tools/testing-and-debugging',
        'developer-tools/typescript-guide',
        'developer-tools/helper-utilities',
        'developer-tools/best-practices',
      ],
    },
  ],
};

export default sidebars;
