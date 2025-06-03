import React, { useState } from 'react';
import { 
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { createCampaign, previewAudience } from '../../services/api';

const CampaignForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    segmentRules: { combinator: 'and', rules: [] }
  });
  const [audienceSize, setAudienceSize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await createCampaign(formData);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to create campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { size } = await previewAudience(formData.segmentRules);
      setAudienceSize(size);
    } catch (err) {
      setError(err.message || 'Failed to preview audience');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Create New Campaign
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <TextField
        fullWidth
        label="Campaign Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Message Template"
        multiline
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ mr: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Create Campaign'}
      </Button>

      <Button
        variant="outlined"
        onClick={handlePreview}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Preview Audience'}
      </Button>

      {audienceSize !== null && (
        <Typography sx={{ mt: 2 }}>
          Estimated Audience Size: {audienceSize}
        </Typography>
      )}
    </Box>
  );
};

export default CampaignForm;