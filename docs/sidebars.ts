import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * ZendFi Documentation Sidebar
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
