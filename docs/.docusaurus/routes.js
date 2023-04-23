
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search','79a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','038'),
    routes: [
      {
        path: '/docs/era/computational-feeds/realized-volatility',
        component: ComponentCreator('/docs/era/computational-feeds/realized-volatility','1e0'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/era/computational-feeds/yield-curve',
        component: ComponentCreator('/docs/era/computational-feeds/yield-curve','293'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/era/data-feeds/consumming-data',
        component: ComponentCreator('/docs/era/data-feeds/consumming-data','d68'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/era/data-feeds/publishing-data',
        component: ComponentCreator('/docs/era/data-feeds/publishing-data','66b'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/era/data-feeds/supported-assets',
        component: ComponentCreator('/docs/era/data-feeds/supported-assets','b18'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/era/randomness',
        component: ComponentCreator('/docs/era/randomness','beb'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/howItWorks/architecture',
        component: ComponentCreator('/docs/howItWorks/architecture','c3a'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/howItWorks/overview',
        component: ComponentCreator('/docs/howItWorks/overview','880'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/howItWorks/roadmap',
        component: ComponentCreator('/docs/howItWorks/roadmap','229'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/introduction',
        component: ComponentCreator('/docs/introduction','d95'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/linea/computational-feeds/realized-volatility',
        component: ComponentCreator('/docs/linea/computational-feeds/realized-volatility','083'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/linea/computational-feeds/yield-curve',
        component: ComponentCreator('/docs/linea/computational-feeds/yield-curve','c75'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/linea/data-feeds/consumming-data',
        component: ComponentCreator('/docs/linea/data-feeds/consumming-data','6c9'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/linea/data-feeds/publishing-data',
        component: ComponentCreator('/docs/linea/data-feeds/publishing-data','32e'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/linea/data-feeds/supported-assets',
        component: ComponentCreator('/docs/linea/data-feeds/supported-assets','1a1'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/linea/randomness',
        component: ComponentCreator('/docs/linea/randomness','0c6'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/scroll/computational-feeds/realized-volatility',
        component: ComponentCreator('/docs/scroll/computational-feeds/realized-volatility','b0d'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/scroll/computational-feeds/yield-curve',
        component: ComponentCreator('/docs/scroll/computational-feeds/yield-curve','9ba'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/scroll/data-feeds/consumming-data',
        component: ComponentCreator('/docs/scroll/data-feeds/consumming-data','6f6'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/scroll/data-feeds/publishing-data',
        component: ComponentCreator('/docs/scroll/data-feeds/publishing-data','e64'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/scroll/data-feeds/supported-assets',
        component: ComponentCreator('/docs/scroll/data-feeds/supported-assets','383'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/scroll/randomness',
        component: ComponentCreator('/docs/scroll/randomness','236'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/computational-feeds/realized-volatility',
        component: ComponentCreator('/docs/starknet/computational-feeds/realized-volatility','725'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/computational-feeds/what-are-computational-feeds',
        component: ComponentCreator('/docs/starknet/computational-feeds/what-are-computational-feeds','027'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/computational-feeds/yield-curve',
        component: ComponentCreator('/docs/starknet/computational-feeds/yield-curve','055'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/data-feeds/consuming-data',
        component: ComponentCreator('/docs/starknet/data-feeds/consuming-data','a92'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/data-feeds/open-oracle',
        component: ComponentCreator('/docs/starknet/data-feeds/open-oracle','574'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/data-feeds/publishing-data',
        component: ComponentCreator('/docs/starknet/data-feeds/publishing-data','767'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/data-feeds/supported-assets',
        component: ComponentCreator('/docs/starknet/data-feeds/supported-assets','359'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/randomness/randomness',
        component: ComponentCreator('/docs/starknet/randomness/randomness','72c'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
