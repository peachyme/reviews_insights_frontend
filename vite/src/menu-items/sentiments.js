// assets
import { IconMoodHeart } from '@tabler/icons-react';

// constant
const icons = {
  IconMoodHeart
};

// ==============================|| sentiments MENU ITEMS ||============================== //

const sentiments = {
  id: 'sentiments',
  title: 'Sentiment Analysis',
  type: 'group',
  children: [
    {
      id: 'classification',
      title: 'Reviews classification',
      type: 'item',
      url: '/sentiments',
      icon: icons.IconMoodHeart
    }
  ]
};

export default sentiments;
