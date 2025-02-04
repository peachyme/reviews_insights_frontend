import { Avatar, Badge, Card, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box, styled } from '@mui/system';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import dayjs from 'dayjs'; // Import dayjs for formatting time

const ReviewDisplay = ({ review }) => {
  const theme = useTheme();

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 20,
    height: 20,
    background: theme.palette.background.paper
  }));

  // Generate star icons based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarRoundedIcon
          key={i}
          color={i < rating ? 'warning' : 'disabled'} // Yellow for filled stars, gray for empty stars
        />
      );
    }
    return stars;
  };

  function getInitials(name) {
    if (!name) return '';

    const parts = name.trim().split(/\s+/); // Split by spaces, accounting for multiple spaces
    if (parts.length === 1) {
      // If there's only one part of the name
      return parts[0].charAt(0).toUpperCase();
    }

    // Take the first character of each part and join them
    return parts.map((part) => part.charAt(0).toUpperCase()).join('');
  }
  return (
    <>
      <Card
        sx={{
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
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="800px"
                    height="800px"
                    viewBox="-3 0 262 262"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EB4335"
                    />
                  </svg>
                </SmallAvatar>
              }
            >
              <Avatar sx={{ bgcolor: theme.palette.grey[300] }}>{getInitials(review.username)}</Avatar>
            </Badge>
            <Typography variant="h4" sx={{ color: 'text.dark' }}>
              {review.username}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0
              }}
            >
              {renderStars(review.rating)}
            </Box>
            <Typography variant="h6" sx={{ color: 'text.dark', fontWeight: 'bold' }}>
              {review.rating}/5
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            {dayjs(review.time).format('MMM D, YYYY')}
          </Typography>
        </Box>
        <Typography sx={{ color: 'text.dark' }}>{review.text}</Typography>
      </Card>
    </>
  );
};

export default ReviewDisplay;
