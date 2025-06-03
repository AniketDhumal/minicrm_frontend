import React from 'react';
import { 
  Box, 
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';

const Settings = () => {
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
          Application Settings
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          Configure your application preferences and system settings.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ 
        p: 4,
        borderRadius: '12px',
        backgroundColor: theme.palette.background.paper,
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: theme.palette.text.secondary,
            textAlign: 'center'
          }}
        >
          Settings configuration options will be available here soon.
          <br />
          We're working on implementing this feature.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;