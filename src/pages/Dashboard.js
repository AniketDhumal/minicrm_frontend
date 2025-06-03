import React from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CampaignStats from '../components/campaigns/CampaignStats';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      maxWidth: '1400px',
      margin: '0 auto',
      px: isMobile ? 2 : 4,
      py: 3
    }}>
      <Paper elevation={2} sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: '12px',
        backgroundColor: theme.palette.background.paper
      }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: theme.palette.primary.dark
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Key metrics and performance indicators at a glance.
        </Typography>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ 
            p: 3,
            borderRadius: '12px',
            backgroundColor: theme.palette.background.paper
          }}>
            <CampaignStats />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;