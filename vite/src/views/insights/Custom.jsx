import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CircularProgress, Skeleton, Typography } from '@mui/material';
import { useFilterBusinessesMutation, useGetAllCategoriesQuery } from 'api/apiSlice';

const columns = [
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'avg_rating', headerName: 'Average Rating', width: 120 },
  { field: 'category', headerName: 'Business Category', width: 100 },
  { field: 'description', headerName: 'Business Description', width: 300 },
  { field: 'name', headerName: 'Business Name', width: 160 },
  { field: 'num_of_reviews', headerName: 'Number of Reviews', width: 120 },
  { field: 'rating', headerName: 'Rating', width: 120 },
  { field: 'state', headerName: 'State', width: 120 },
  { field: 'url', headerName: 'URL', width: 120 },
];

const Custom = () => {
  const { data: fetchedCategories, isLoading: isLoadingCategories, error: categoriesError } = useGetAllCategoriesQuery();
  const [filterBusinesses, { data: businessesData, isLoading: isLoadingBusinesses, error: businessesError }] = useFilterBusinessesMutation();

  const [categories, setCategories] = React.useState([]); // Local state for categories
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [rows, setRows] = React.useState([]);

  // Update categories state when fetchedCategories changes
  React.useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  // Update rows when businessesData changes
  React.useEffect(() => {
    if (businessesData) {
      setRows(businessesData);
    }
  }, [selectedCategory, businessesData]);

  // Handle category change and trigger data fetch
  const handleCategoryChange = async (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category) {
      try {
        await filterBusinesses({ category }).unwrap();
      } catch (err) {
        console.error('Error fetching filtered businesses:', err);
      }
    }
  };

  return (
    <Box>
      {/* Dropdown to select category */}
      <Box my={4}>
        {isLoadingCategories ? (
          <Skeleton  variant="rounded" height={50} />
        ) : categoriesError ? (
          <Typography color="error">Error loading categories.</Typography>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              fullWidth
              id="outlined-select-category"
              select
              label="Business Category"
              value={selectedCategory}
              onChange={handleCategoryChange}  // Fetch data on category selection
              helperText="Please select a category to view businesses"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
      </Box>

      {/* DataGrid */}
      <Box sx={{ width: '100%' }}>
        {rows.length === 0 && !isLoadingBusinesses ? (
          <Typography variant="h6" color="textSecondary" align="center" mt={4}>
            Please select a category to view the businesses
          </Typography>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoadingBusinesses}
            slots={{ toolbar: GridToolbar }}
            getRowId={(row) => row.name}  // Using `name` as the unique ID for each row
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
      </Box>

      {/* Error Handling */}
      {businessesError && (
        <Typography color="error" align="center" mt={2}>
          Error fetching businesses: {businessesError.message}
        </Typography>
      )}
    </Box>
  );
};

export default Custom;
