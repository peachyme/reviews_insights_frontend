// assets
import { IconChartBar } from '@tabler/icons-react';

// constant
const icons = {
  IconChartBar
};

// ==============================|| EXTRA analytics MENU ITEMS ||============================== //

const analytics = {
  id: 'analytics',
  title: 'Analytics',
  type: 'group',
  children: [
    {
      id: 'analytics',
      title: 'Dashboard',
      type: 'item',
      url: '/analytics',
      icon: icons.IconChartBar
    }
  ]
};

export default analytics;
