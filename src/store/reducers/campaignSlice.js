import { createSlice } from '@reduxjs/toolkit';
import { fetchCampaigns, createNewCampaign, estimateAudienceSize } from '../actions/campaignActions';

const initialState = {
  campaigns: [],
  audienceEstimate: null,
  loading: false,
  error: null
};

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    resetAudienceEstimate: (state) => {
      state.audienceEstimate = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCampaigns
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle createNewCampaign
      .addCase(createNewCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.unshift(action.payload);
      })
      .addCase(createNewCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle estimateAudienceSize
      .addCase(estimateAudienceSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(estimateAudienceSize.fulfilled, (state, action) => {
        state.loading = false;
        state.audienceEstimate = action.payload.size;
      })
      .addCase(estimateAudienceSize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetAudienceEstimate, clearError } = campaignSlice.actions;
export default campaignSlice.reducer;