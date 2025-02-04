import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import QueryCard from './QueryCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Common = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <QueryCard
              isLoading={isLoading}
              title={'Top Rated Businesses'}
              description={'Show the top 10 businesses with the highest average ratings.'}
              color={'secondary'}
              url={'topRated'}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <QueryCard
              isLoading={isLoading}
              title={'Most Reviewed Businesses'}
              description={'List the 10 businesses with the most reviews.'}
              color={'error'}
              url={'mostReviewed'}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <QueryCard
              isLoading={isLoading}
              title={'Highly Rated Categories'}
              description={'What are the most highly rated categories  based on user reviews?'}
              color={'secondary'}
              url={'highlyRatedCategories'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <QueryCard
              isLoading={isLoading}
              title={'Lowest Rated Categories'}
              description={'What are the lowest rated categories  based on user reviews?'}
              color={'primary'}
              url={'lowestRatedCategories'}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <QueryCard
              isLoading={isLoading}
              title={'Top 5 Businesses for Each Category'}
              description={'Find the top 5 businesses for each category by rating'}
              color={'secondary'}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <QueryCard
              isLoading={isLoading}
              title={'Review Distribution by Rating'}
              description={'Show the distribution of ratings (e.g., how many 1-star, 2-star, etc., reviews)'}
              color={'primary'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Common;
