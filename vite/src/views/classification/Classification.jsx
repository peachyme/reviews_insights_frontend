import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Autocomplete, TextField, IconButton, Skeleton, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

// project imports
import { gridSpacing } from 'store/constant';
import ReviewsDisplay from './ReviewsDisplay';
import { useGetAllBusinessesQuery, useFilterReviewsMutation } from 'api/apiSlice';

const Classification = () => {
  const { data: fetchedBusinesses, isLoading: isLoadingBusinesses, error: businessesError } = useGetAllBusinessesQuery();

  const [filterReviews, { isLoading: isLoadingReviews, error: reviewsError }] = useFilterReviewsMutation();

  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [goodReviews, setGoodReviews] = useState([]);
  const [badReviews, setBadReviews] = useState([]);

  useEffect(() => {
    if (fetchedBusinesses) {
      setBusinesses(fetchedBusinesses);
    }
  }, [fetchedBusinesses]);

  const handleSearch = async () => {
    const filters = {
      business: selectedBusiness,
      start: start ? dayjs(start).unix() * 1000 : null, // Convert to Unix timestamp
      end: end ? dayjs(end).unix() * 1000 : null, // Convert to Unix timestamp
    };

    try {
      const { goodReviews, badReviews } = await filterReviews(filters).unwrap();
      setGoodReviews(goodReviews);
      setBadReviews(badReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  return (
    <Box>
      {/* Filters Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3
        }}
      >
        {/* Businesses Dropdown */}
        {isLoadingBusinesses ? (
          <CircularProgress/>
        ) : businessesError ? (
          <Typography color="error">Error loading businesses.</Typography>
        ) : (
          <Autocomplete
            disablePortal
            options={businesses}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option.gmap_id === value.gmap_id}
            sx={{ width: '49%', mt: 1 }}
            renderInput={(params) => <TextField {...params} label="Business" />}
            onChange={(event, newValue) => setSelectedBusiness(newValue ? newValue.gmap_id : '')}
          />
        )}

        {/* Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={start}
            onChange={(newValue) => setStart(newValue)}
            slotProps={{ textField: { placeholder: 'Start Date' } }}
          />
          <DatePicker
            value={end}
            onChange={(newValue) => setEnd(newValue)}
            slotProps={{ textField: { placeholder: 'End Date' } }}
          />
        </LocalizationProvider>

        {/* Search Button */}
        <IconButton sx={{ mt: 1 }} aria-label="filter" size="large" onClick={handleSearch}>
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Reviews Section */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={6}>
          {isLoadingReviews ? (
            <Skeleton variant="rectangular" height={200} />
          ) : reviewsError ? (
            <Typography color="error">Error fetching reviews.</Typography>
          ) : (
            <ReviewsDisplay sentiment="good" reviews={goodReviews} />
          )}
        </Grid>
        <Grid item xs={6}>
          {isLoadingReviews ? (
            <Skeleton variant="rectangular" height={200} />
          ) : reviewsError ? (
            <Typography color="error">Error fetching reviews.</Typography>
          ) : (
            <ReviewsDisplay sentiment="bad" reviews={badReviews} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Classification;
