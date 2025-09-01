import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchGoogleMapLinks = createAsyncThunk(
  "GoogleMapLinks/fetchAll",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/settings/google-map-links`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
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
export const addGoogleMapLinks = createAsyncThunk(
  "GoogleMapLinks/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/settings/update-google-map-links`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred"
      );
    }
  }
);

const googleMapLinksSlice = createSlice({
  name: "GoogleMapLinks",
  initialState: {
    isLoading: false,
    error: null,
    success: false,
    record: null,
  },
  reducers: {
    clearState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoogleMapLinks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGoogleMapLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload;
      })
      .addCase(fetchGoogleMapLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addGoogleMapLinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoogleMapLinks.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(addGoogleMapLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = googleMapLinksSlice.actions;
export default googleMapLinksSlice.reducer;
