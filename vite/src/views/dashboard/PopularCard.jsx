import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useGetMostReviewedBusinessesQuery } from 'api/apiSlice';
import { Box } from '@mui/system';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popularBusinesses, setPopularBusinesses] = useState([]);

  const { data: data, isLoading: isLoading, error: error } = useGetMostReviewedBusinessesQuery();

  React.useEffect(() => {
    if (data) {
      setPopularBusinesses(data.slice(0, 14));
    }
  }, [data]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Reviews Over Time</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: 'primary.200',
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item>
                <Typography variant="h4">Popular Businesses</Typography>
              </Grid>
              <Grid item xs={12}>
                {popularBusinesses && popularBusinesses.length > 0 ? (
                  <Box>
                    {popularBusinesses.map((popularBusiness, index) => (
                      <Box index={index}>
                        <Grid container direction="column">
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  {popularBusiness.name}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                  <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                      {popularBusiness.num_reviews} ratings
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Avatar
                                      variant="rounded"
                                      sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '5px',
                                        bgcolor: 'success.light',
                                        color: 'success.dark',
                                        ml: 2
                                      }}
                                    >
                                      <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider sx={{ my: 1.5 }} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No reviews available.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
