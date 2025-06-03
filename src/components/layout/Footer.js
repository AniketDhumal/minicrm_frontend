import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ p: 3, mt: 'auto', bgcolor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Mini CRM - All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;