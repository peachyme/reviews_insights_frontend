// assets
import { IconMessageCircleStar } from '@tabler/icons-react';

// constant
const icons = {
  IconMessageCircleStar
};

// ==============================|| sentiments MENU ITEMS ||============================== //

const generation = {
  id: 'generation',
  title: 'Text Generation',
  type: 'group',
  children: [
    {
      id: 'generation',
      title: 'Response generation',
      type: 'item',
      url: '/generation',
      icon: icons.IconMessageCircleStar
    }
  ]
};

export default generation;
