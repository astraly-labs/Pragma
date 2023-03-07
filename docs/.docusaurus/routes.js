
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','3d6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','914'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c28'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','0da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','244'),
    exact: true
  },
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
    path: '/docs/V1',
    component: ComponentCreator('/docs/V1','1d3'),
    routes: [
      {
        path: '/docs/V1/404',
        component: ComponentCreator('/docs/V1/404','c97'),
        exact: true,
        'sidebar': "version-V1/mySidebar"
      }
    ]
  },
  {
    path: '/docs/V2',
    component: ComponentCreator('/docs/V2','fe7'),
    routes: [
      {
        path: '/docs/V2/404',
        component: ComponentCreator('/docs/V2/404','b96'),
        exact: true,
        'sidebar': "version-V2/mySidebar"
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','3bb'),
    routes: [
      {
        path: '/docs/Consensys Zk-EVM/computational-feeds/realized-volatility',
        component: ComponentCreator('/docs/Consensys Zk-EVM/computational-feeds/realized-volatility','eba'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/computational-feeds/yield-curve',
        component: ComponentCreator('/docs/Consensys Zk-EVM/computational-feeds/yield-curve','b2c'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/data-feeds/consumming-data',
        component: ComponentCreator('/docs/Consensys Zk-EVM/data-feeds/consumming-data','316'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/data-feeds/publishing-data',
        component: ComponentCreator('/docs/Consensys Zk-EVM/data-feeds/publishing-data','147'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/data-feeds/supported-assets',
        component: ComponentCreator('/docs/Consensys Zk-EVM/data-feeds/supported-assets','974'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/randomness',
        component: ComponentCreator('/docs/Consensys Zk-EVM/randomness','4b2'),
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
        component: ComponentCreator('/docs/introduction','4b1'),
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
