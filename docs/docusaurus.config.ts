import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ZendFi Documentation',
  tagline: 'Accept crypto payments on Solana with ease',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.zendfi.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zendfi', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/zendfi/docs/tree/main/docs/',
          routeBasePath: '/', // Serve docs at root
        },
        blog: false, // Disable blog for docs site
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/zendfi-social-card.jpg',
    navbar: {
      title: 'DOCS',
      logo: {
        alt: 'ZendFi Logo',
        src: 'img/logo.png',
      },
      items: [
        // Left side - main navigation tabs
        {
          type: 'doc',
          docId: 'getting-started',
          position: 'left',
          label: 'Get started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'paymentsSidebar',
          position: 'left',
          label: 'Payments',
        },
        {
          type: 'docSidebar',
          sidebarId: 'developerResourcesSidebar',
          position: 'left',
          label: 'Developer resources',
        },
        {
          type: 'doc',
          docId: 'agentic-payments',
          position: 'left',
          label: 'Agentic Payments',
        },
        // Right side
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://zendfi.tech',
          label: 'zendfi.tech',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Get Started',
              to: '/',
            },
            {
              label: 'API Reference',
              to: '/api/payments',
            },
            {
              label: 'Webhooks',
              to: '/features/webhooks',
            },
          ],
        },
        {
          title: 'Developer Tools',
          items: [
            {
              label: 'TypeScript SDK',
              to: '/developer-tools/sdks',
            },
            {
              label: 'CLI',
              to: '/developer-tools/cli',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/zendfi',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/zendfi',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zendfi',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Website',
              href: 'https://zendfi.tech',
            },
            {
              label: 'Support',
              href: 'mailto:support@zendfi.tech',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ZendFi.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
