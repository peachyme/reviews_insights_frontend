import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useGetReviewsOverTimeQuery } from 'api/apiSlice';

import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
  const { data: data, isLoading: isLoading, error: error } = useGetReviewsOverTimeQuery();

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);

  React.useEffect(() => {
    if (data) {
      const revs = data.map((d) => d.num_reviews);
      setReviews(revs);
      const total = data.reduce((acc, d) => acc + (d.num_reviews || 0), 0);
      setTotalReviews(total);
    }
  }, [data]);

  const chartData = {
    type: 'area',
    height: 95,
    options: {
      chart: {
        id: 'support-chart',
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: () => 'Reviews'
          }
        },
        marker: {
          show: false
        }
      }
    },
    series: [
      {
        data: reviews
      }
    ]
  };

  const theme = useTheme();
  const orangeDark = theme.palette.secondary[800];

  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  React.useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: { theme: 'light' }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <Card sx={{ bgcolor: 'secondary.light' }}>
          <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="subtitle1" sx={{ color: 'secondary.dark' }}>
                    Total Reviews overtime
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" sx={{ color: 'grey.800' }}>
                    {totalReviews}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                From 2012 to 2021
              </Typography>
            </Grid>
          </Grid>
          <Chart {...chartData} />
        </Card>
      )}
    </>
  );
};

export default BajajAreaChartCard;
