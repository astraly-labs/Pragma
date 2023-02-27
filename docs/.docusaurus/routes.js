
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
    component: ComponentCreator('/docs','c03'),
    routes: [
      {
        path: '/docs/Consensys Zk-EVM/data-feeds/extract-information',
        component: ComponentCreator('/docs/Consensys Zk-EVM/data-feeds/extract-information','7b6'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/data-feeds/how-to-get-there',
        component: ComponentCreator('/docs/Consensys Zk-EVM/data-feeds/how-to-get-there','864'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/data-feeds/our-vision',
        component: ComponentCreator('/docs/Consensys Zk-EVM/data-feeds/our-vision','720'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/data-feeds/web3-change',
        component: ComponentCreator('/docs/Consensys Zk-EVM/data-feeds/web3-change','ea6'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/randomness/extract-information',
        component: ComponentCreator('/docs/Consensys Zk-EVM/randomness/extract-information','e4f'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/randomness/how-to-get-there',
        component: ComponentCreator('/docs/Consensys Zk-EVM/randomness/how-to-get-there','fe7'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/randomness/our-vision',
        component: ComponentCreator('/docs/Consensys Zk-EVM/randomness/our-vision','4af'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/Consensys Zk-EVM/randomness/web3-change',
        component: ComponentCreator('/docs/Consensys Zk-EVM/randomness/web3-change','fe7'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/howItWorks/architecture',
        component: ComponentCreator('/docs/howItWorks/architecture','e85'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/howItWorks/data-aggregation',
        component: ComponentCreator('/docs/howItWorks/data-aggregation','9d6'),
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
        path: '/docs/starknet/data-feeds/extract-information',
        component: ComponentCreator('/docs/starknet/data-feeds/extract-information','eb1'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/data-feeds/how-to-get-there',
        component: ComponentCreator('/docs/starknet/data-feeds/how-to-get-there','c05'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/data-feeds/our-vision',
        component: ComponentCreator('/docs/starknet/data-feeds/our-vision','9ce'),
        exact: true,
        'sidebar': "version-V3/mySidebar"
      },
      {
        path: '/docs/starknet/data-feeds/web3-change',
        component: ComponentCreator('/docs/starknet/data-feeds/web3-change','f52'),
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
