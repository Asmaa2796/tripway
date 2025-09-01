import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// Fetch all regions
export const fetchRegions = createAsyncThunk(
  "regions/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/regions?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return {
        data: response.data.data.data,
        pagination: response.data.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load data"
      );
    }
  }
);
export const fetchAllRegions = createAsyncThunk(
  "countries/fetchAllRegions",
  async (_, { rejectWithValue }) => {
    try {
      let allRegions = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(
          `${BASE_URL}/regions?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
              "Lang": i18n.language,
            },
          }
        );

        const { data, pagination } = response.data.data;

        // Append data to the full list
        allRegions = [...allRegions, ...data];

        // Check if there are more pages
        hasMore = pagination.current_page < pagination.last_page;
        currentPage++;
      }

      return allRegions;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load data"
      );
    }
  }
);
// Fetch a specific region
export const fetchRegion = createAsyncThunk(
  "regions/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/regions/show/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Lang": i18n.language,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load region data"
      );
    }
  }
);

// Add a new region
export const addRegion = createAsyncThunk(
  "regions/add",
  async (regionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/regions/store`, regionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred"
      );
    }
  }
);

// Update an existing region
export const updateRegion = createAsyncThunk(
  "regions/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/regions/update`, {region_id:id,...data}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// Delete a region
export const deleteRegion = createAsyncThunk(
  "regions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/regions/delete`, { region_id: id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return id; // Return ID of the deleted region
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete region"
      );
    }
  }
);

const RegionSlice = createSlice({
  name: "regions",
  initialState: {
    regions: [],
    allRegions: [],
    selectedRegion: null,
    isLoading: false,
    pagination: null,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
      state.selectedRegion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.regions = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllRegions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllRegions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRegions = action.payload;
      })
      .addCase(fetchAllRegions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchRegion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedRegion = null;
      })
      .addCase(fetchRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedRegion = action.payload;
      })
      .addCase(fetchRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addRegion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.regions.push(action.payload);
      })
      .addCase(addRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateRegion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
        const index = state.regions.findIndex(
          (region) => region.id === action.payload.data.id
        );
        if (index !== -1) {
          state.regions[index] = action.payload.data;
        }
      })
      .addCase(updateRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteRegion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.regions = state.regions.filter(
          (region) => region.id !== action.payload
        );
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = RegionSlice.actions;
export default RegionSlice.reducer;
