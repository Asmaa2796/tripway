import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchMaintenance = createAsyncThunk(
  "fleet_request_types/maintenance",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/fleet_request_types/maintenance`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "lang": i18n.language,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed load data";
      return message;
    }
  }
);

export const fetchFuel = createAsyncThunk(
  "fleet_request_types/fuel",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/fleet_request_types/fuel`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "lang": i18n.language,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed load data";
      return message;
    }
  }
);

const FleetRequestTypeSlice = createSlice({
  name: "fleet_request_types",
  initialState: {
    maintenance: [],
    fuel: [],
    isLoading: false,
    error: null,
    success: null
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMaintenance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.maintenance = action.payload;
      })
      .addCase(fetchMaintenance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchFuel.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFuel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fuel = action.payload;
      })
      .addCase(fetchFuel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
  },
});

export const { clearState } = FleetRequestTypeSlice.actions;
export default FleetRequestTypeSlice.reducer;
