import { useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltRoundedIcon from '@mui/icons-material/ThumbDownOffAltRounded';

// project imports
import ReviewDisplay from './ReviewDisplay';

const ReviewsDisplay = ({ sentiment, reviews }) => {
  const theme = useTheme();

  return (
    <Card sx={{ minWidth: 275 }}>
      {/* Card Header */}
      <CardHeader
        sx={{ bgcolor: sentiment === 'good' ? 'primary.main' : 'error.main', height: 60 }}
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.background.paper }}>
            {sentiment === 'good' ? <ThumbUpOffAltOutlinedIcon color="primary" /> : <ThumbDownOffAltRoundedIcon color="error" />}
          </Avatar>
        }
        title={
          <Typography variant="h4" sx={{ color: 'background.paper' }}>
            {reviews.length} {sentiment === 'good' ? 'Positive' : 'Negative'} Reviews
          </Typography>
        }
      />

      {/* Card Content */}
      <CardContent>
        {reviews && reviews.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {reviews.map((review, index) => (
              <ReviewDisplay key={index} review={review} />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No reviews available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewsDisplay;
