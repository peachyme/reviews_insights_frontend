import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { useGetLowestRatedCategoriesQuery } from 'api/apiSlice';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { BarChart } from '@mui/x-charts/BarChart';

const columns = [
  { field: 'category', headerName: 'Category', width: 170 },
  { field: 'avg_rating', headerName: 'Average Rating', width: 150 },
  { field: 'num_of_reviews', headerName: 'Number of Reviews', width: 150 }
];

const LowestRatedCategories = () => {
  const { data: fetchedCategories, isLoading: isLoadingCategories, error: categoriesError } = useGetLowestRatedCategoriesQuery();

  const [rows, setRows] = useState([]);
  const [chartData, setChartData] = useState({ names: [], reviews: [] });

  useEffect(() => {
    if (fetchedCategories) {
      // Set rows for the DataGrid
      setRows(fetchedCategories);

      // Extract the top 5 businesses
      const topCategories = fetchedCategories.slice(0, 10);

      // Prepare chart data
      const names = topCategories.map((cat) => cat.category);
      const reviews = topCategories.map((cat) => cat.num_of_reviews);

      setChartData({ names, reviews });
    }
  }, [fetchedCategories]);

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
                loading={isLoadingCategories}
                slots={{ toolbar: GridToolbar }}
                getRowId={(row) => row.category}
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

export default LowestRatedCategories;
