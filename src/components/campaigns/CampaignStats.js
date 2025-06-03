import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';

const CampaignStats = () => {
  const { campaigns } = useSelector(state => state.campaigns);

  const totalCampaigns = campaigns.length;
  const successfulCampaigns = campaigns.filter(c => c.status === 'sent').length;
  const deliveryRate = totalCampaigns > 0 
    ? Math.round((successfulCampaigns / totalCampaigns) * 100)
    : 0;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Campaign Statistics
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle1">Total Campaigns</Typography>
          <Typography variant="h4">{totalCampaigns}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Successful</Typography>
          <Typography variant="h4">{successfulCampaigns}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Delivery Rate</Typography>
          <Typography variant="h4">{deliveryRate}%</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CampaignStats;