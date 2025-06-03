import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Button, 
  CircularProgress,
  Grid,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampaigns } from '../store/actions/campaignActions';
import CampaignForm from '../components/campaigns/CampaignForm';
import CampaignList from '../components/campaigns/CampaignList';
import CampaignStats from '../components/campaigns/CampaignStats';
import { Add } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`campaign-tabpanel-${index}`}
      aria-labelledby={`campaign-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ 
          p: 3,
          backgroundColor: theme.palette.background.default,
          borderRadius: '0 0 8px 8px',
          boxShadow: theme.shadows[1]
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `campaign-tab-${index}`,
    'aria-controls': `campaign-tabpanel-${index}`,
  };
}

const Campaigns = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { campaigns, status, error } = useSelector(state => state.campaigns);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setTabValue(1);
    dispatch(fetchCampaigns());
  };

  if (status === 'loading' && campaigns.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography color="error" variant="h6">
          Error loading campaigns: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      px: isMobile ? 2 : 4,
      py: 3
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 600,
          color: theme.palette.primary.dark
        }}>
          Campaign Management
        </Typography>
        {!showCreateForm && tabValue === 1 && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowCreateForm(true)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              py: 1,
              fontSize: '1rem'
            }}
          >
            New Campaign
          </Button>
        )}
      </Box>

      {showCreateForm ? (
        <Paper elevation={3} sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: '12px',
          backgroundColor: theme.palette.background.paper
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4 
          }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Create New Campaign
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setShowCreateForm(false)}
              sx={{
                borderRadius: '8px',
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
          </Box>
          <CampaignForm onSubmit={handleCreateSuccess} />
        </Paper>
      ) : (
        <>
          <Paper elevation={2} sx={{ 
            borderRadius: '12px 12px 0 0',
            overflow: 'hidden'
          }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              aria-label="campaign tabs"
              variant={isMobile ? 'fullWidth' : 'standard'}
              sx={{
                '& .MuiTabs-indicator': {
                  height: 4,
                  backgroundColor: theme.palette.secondary.main
                }
              }}
            >
              <Tab 
                label="Overview" 
                {...a11yProps(0)} 
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  minHeight: 64
                }}
              />
              <Tab 
                label="Campaign History" 
                {...a11yProps(1)} 
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  minHeight: 64
                }}
              />
            </Tabs>
          </Paper>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <CampaignStats />
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper elevation={3} sx={{ 
                  p: 3, 
                  height: '100%',
                  borderRadius: '12px',
                  backgroundColor: theme.palette.background.paper
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => {
                        setShowCreateForm(true);
                        setTabValue(1);
                      }}
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        py: 1.5,
                        fontSize: '1rem'
                      }}
                    >
                      Create Campaign
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/customers')}
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none',
                        py: 1.5,
                        fontSize: '1rem'
                      }}
                    >
                      View Customers
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <CampaignList />
          </TabPanel>
        </>
      )}
    </Box>
  );
};

export default Campaigns;