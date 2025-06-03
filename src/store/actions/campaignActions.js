import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCampaigns, createCampaign, previewAudience } from '../../services/api';

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCampaigns();
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createNewCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (campaignData, { rejectWithValue }) => {
    try {
      const response = await createCampaign(campaignData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const estimateAudienceSize = createAsyncThunk(
  'campaigns/estimateAudience',
  async (rules, { rejectWithValue }) => {
    try {
      const response = await previewAudience(rules);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);