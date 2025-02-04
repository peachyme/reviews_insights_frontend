import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useGetTopRatedBusinessesQuery } from 'api/apiSlice';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';

const columns = [
  { field: 'name', headerName: 'Business Name', width: 250 },
  { field: 'avg_rating', headerName: 'Average Rating', width: 120 },
  { field: 'num_of_reviews', headerName: 'Number of Reviews', width: 120 }
];

const TopRated = () => {
  const { data: fetchedBusinesses, isLoading: isLoadingBusinesses, error: businessesError } = useGetTopRatedBusinessesQuery();

  const [rows, setRows] = useState([]);
  const [chartData, setChartData] = useState({ names: [], reviews: [] });

  useEffect(() => {
    if (fetchedBusinesses) {
      // Set rows for the DataGrid
      setRows(fetchedBusinesses);

      // Extract the top 5 businesses
      const topBusinesses = fetchedBusinesses.slice(0, 10);

      // Prepare chart data
      const names = topBusinesses.map((business) => business.name);
      const reviews = topBusinesses.map((business) => business.num_of_reviews);

      setChartData({ names, reviews });
    }
  }, [fetchedBusinesses]);

  return (
    <Box>
      <Grid container spacing={2}>
        {/* DataGrid Section */}
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <DataGrid
                rows={rows}
                columns={columns}
                loading={isLoadingBusinesses}
                slots={{ toolbar: GridToolbar }}
                getRowId={(row) => row.name}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 6
                    }
                  }
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart Section */}
        <Grid item xs={6}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <BarChart
                yAxis={[{ 
                  scaleType: 'band', 
                  data: chartData.names,
                  colorMap: {
                    type: 'ordinal',
                    colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']
                  }
                }]} // Use yAxis for horizontal layout
                series={[{ data: chartData.reviews }]} // Set the number of reviews as bar lengths
                height={500}
                layout="horizontal" // Horizontal layout for the bar chart
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopRated;
