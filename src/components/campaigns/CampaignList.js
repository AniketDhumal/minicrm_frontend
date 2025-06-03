import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampaigns } from '../../store/actions/campaignActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Alert } from '@mui/material';

const CampaignList = () => {
  const dispatch = useDispatch();
  const { campaigns, status, error } = useSelector(state => state.campaigns);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  if (status === 'loading') return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2 }}>
        Campaign History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Sent</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign._id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>
                <Typography 
                  color={
                    campaign.status === 'sent' ? 'success.main' : 
                    campaign.status === 'failed' ? 'error.main' : 'text.primary'
                  }
                >
                  {campaign.status}
                </Typography>
              </TableCell>
              <TableCell>{campaign.stats?.sent || 0}</TableCell>
              <TableCell>{campaign.stats?.delivered || 0}</TableCell>
              <TableCell>
                {new Date(campaign.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampaignList;