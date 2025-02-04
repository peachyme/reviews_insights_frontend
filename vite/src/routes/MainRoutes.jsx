import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import TopRated from 'views/insights/TopRated';
import MostReviewed from 'views/insights/MostReviewed';
import HighlyRatedCategories from 'views/insights/HighlyRatedCategories';
import LowestRatedCategories from 'views/insights/LowestRatedCategories';
import Generation from 'views/classification/Generation';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// insights routing
const CommonInsights = Loadable(lazy(() => import('views/insights/Common')));
const CustomInsights = Loadable(lazy(() => import('views/insights/Custom')));

// sentiment analysis routing
const ReviewClassification = Loadable(lazy(() => import('views/classification/Classification')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'analytics',
      element: <DashboardDefault />
    },
    {
      path: 'insights',
      children: [
        {
          path: 'common',
          element: <CommonInsights />,
        },
        {
          path: 'custom',
          element: <CustomInsights />
        }
      ]
    },
    {
      path: 'sentiments',
      element: <ReviewClassification />
    },
    {
      path: 'insights/common/topRated',
      element: <TopRated />
    },
    {
      path: 'insights/common/mostReviewed',
      element: <MostReviewed />
    },
    {
      path: 'insights/common/highlyRatedCategories',
      element: <HighlyRatedCategories />
    },
    {
      path: 'insights/common/lowestRatedCategories',
      element: <LowestRatedCategories />
    },
    {
      path: 'generation',
      element: <Generation />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
