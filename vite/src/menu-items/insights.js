// assets
import { IconBrandGoogleMaps } from '@tabler/icons-react';

// constant
const icons = { IconBrandGoogleMaps };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const insights = {
  id: 'insights',
  title: 'Review Insights',
  type: 'group',
  children: [
    {
      id: 'common',
      title: 'Common insights',
      type: 'item',
      url: '/insights/common',
      icon: icons.IconBrandGoogleMaps,
      breadcrumbs: false
    },
    {
      id: 'custom',
      title: 'Custom insights',
      type: 'item',
      url: '/insights/custom',
      icon: icons.IconBrandGoogleMaps,
    }
  ]
};

export default insights;
