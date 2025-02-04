import React, { useState } from 'react';
import { useGetOverallRatingDestributionQuery } from 'api/apiSlice';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { PieChart } from '@mui/x-charts/PieChart';

const RatingPieChart = () => {
  const theme = useTheme();

  const { data: data, isLoading: isLoading, error: error } = useGetOverallRatingDestributionQuery();

  const [ratingData, setRatingData] = useState([]);

  React.useEffect(() => {
    if (data) {
      const chartData = data.map((d) => ({
        id: d.rating,
        value: d.num_reviews,
        label: `Rating ${d.rating}`,
      }));
      setRatingData(chartData);
    }
  }, [data]);

  const secondaryMain = theme.palette.secondary.main;
  const secondaryDark = theme.palette.secondary[800];
  const errorMain = theme.palette.error.main;
  const primaryMain = theme.palette.primary.main;
  const primaryDark = theme.palette.primary[800];
  const orangeMain = theme.palette.primary[200];
  const pieChartColors = [secondaryDark, secondaryMain, primaryMain, primaryDark, orangeMain];


  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between"  sx={{my: 2}}>
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h4">Reviews distribution by rating</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{mb: 3}} item xs={12} container justifyContent="center" alignItems="center">
          <PieChart
            colors={pieChartColors}
            series={[
              {
                data: ratingData
              }
            ]}
            width={400}
            height={200}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default RatingPieChart;
