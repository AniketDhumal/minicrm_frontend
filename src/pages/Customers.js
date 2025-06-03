import React from 'react';
import { 
  Box, 
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CustomerTable from '../components/customers/CustomerTable';

const Customers = () => {
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
          Customer Management
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
          View and manage all customer records and interactions.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ 
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <CustomerTable />
      </Paper>
    </Box>
  );
};

export default Customers;