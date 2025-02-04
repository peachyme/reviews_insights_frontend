import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Autocomplete, TextField, IconButton, Skeleton, CircularProgress, Card, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import Carousel from 'react-material-ui-carousel';
import robot from 'assets/images/robot.png';
import { IconMessageCircleStar } from '@tabler/icons-react';
import Typewriter from 'typewriter-effect';

// project imports
import { gridSpacing } from 'store/constant';
import ReviewsDisplay from './ReviewsDisplay';
import { useGetAllBusinessesQuery, useFilterReviewsMutation, useGenerateResponseMutation } from 'api/apiSlice';
import ReviewDisplay from './ReviewDisplay';
import { useTheme } from '@mui/material/styles';

const Generation = () => {
  const theme = useTheme();

  const { data: fetchedBusinesses, isLoading: isLoadingBusinesses, error: businessesError } = useGetAllBusinessesQuery();

  const [filterReviews, { isLoading: isLoadingReviews, error: reviewsError }] = useFilterReviewsMutation();
  const [generateResponse, { isLoading: isLoadingResponse, error: responseError }] = useGenerateResponseMutation();

  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [generatedReply, setGeneratedReply] = useState('');

  useEffect(() => {
    if (fetchedBusinesses) {
      setBusinesses(fetchedBusinesses);
    }
  }, [fetchedBusinesses]);

  const handleSearch = async () => {
    console.log(selectedBusiness);

    const filters = {
      business: selectedBusiness,
      start: start ? dayjs(start).unix() * 1000 : null, // Convert to Unix timestamp
      end: end ? dayjs(end).unix() * 1000 : null // Convert to Unix timestamp
    };

    try {
      const { allReviews } = await filterReviews(filters).unwrap();
      setReviews(allReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleGenerateReply = async () => {
    if (reviews.length > 0) {
      const currentReview = reviews[currentReviewIndex];
      console.log('currentReview:', currentReview);

      const data = {
        username: currentReview.username,
        rating: currentReview.rating,
        text: currentReview.text
      };
      console.log('data=', data);

      try {
        const response = await generateResponse(data).unwrap();
        console.log('response=', response);
        const cleanedReply = response.startsWith("Response: ")
        ? response.replace("Response: ", "")
        : response;

        setGeneratedReply(cleanedReply);

      } catch (err) {
        console.error('Error generating response:', err);
      }
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
          <CircularProgress />
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
          <DatePicker value={start} onChange={(newValue) => setStart(newValue)} slotProps={{ textField: { placeholder: 'Start Date' } }} />
          <DatePicker value={end} onChange={(newValue) => setEnd(newValue)} slotProps={{ textField: { placeholder: 'End Date' } }} />
        </LocalizationProvider>

        {/* Search Button */}
        <IconButton sx={{ mt: 1 }} aria-label="filter" size="large" onClick={handleSearch}>
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Reviews Section */}
      <Grid container spacing={gridSpacing} sx={{ mb: 3 }}>
        <Grid item xs={10}>
          {isLoadingReviews ? (
            <Skeleton variant="rectangular" height={200} />
          ) : reviewsError ? (
            <Typography color="error">Error fetching reviews.</Typography>
          ) : (
            <Carousel indicators={false} navButtonsAlwaysVisible={true} autoPlay={false} onChange={(index) => setCurrentReviewIndex(index)}>
              {reviews.map((review, index) => {
                return <ReviewDisplay key={index} review={review} />;
              })}
            </Carousel>
          )}
        </Grid>
      </Grid>

      {/* Replies Section */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end', // Align contents to the right
              width: '100%' // Parent container spans the full column width
            }}
          >
            <Card
              sx={{
                width: '90%', // Card width is large but not full width to align visually to the right
                maxWidth: '90%', // Ensure it doesn't exceed 90% of the grid width
                border: 1,
                borderColor: theme.palette.grey[300],
                borderRadius: '16px',
                p: 3,
                mb: 3
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  mb: 4
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box
                    component="img"
                    src={robot} // Robot image
                    alt="Robot Avatar"
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="h4" sx={{ color: 'text.dark' }}>
                    Your reply generator robot
                  </Typography>
                </Box>
              </Box>
              {isLoadingResponse ? (
                <Typography sx={{ color: 'text.secondary' }}>Generating reply...</Typography>
              ) : generatedReply ? (
                <Typography sx={{ color: 'text.dark' }}>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString(generatedReply).start()
                    }}
                    options={{
                      delay: 40
                    }}
                  />
                </Typography>
              ) : (
                <Typography sx={{ color: 'text.secondary' }}>Use the "Generate Reply" button for an AI-generated reply.</Typography>
              )}
            </Card>
          </Box>
          {/* Generate Reply Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end' // Align the button to the right
            }}
          >
            <Button variant="contained" color="secondary" startIcon={<IconMessageCircleStar />} onClick={handleGenerateReply}>
              Generate Reply
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Generation;
