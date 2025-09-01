import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all main settings
export const fetchSettings = createAsyncThunk("settings/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Lang: i18n.language,
      },
    });
    return response.data.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed load data";
    return message;
  }
});


// update settings
export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/settings/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Lang: i18n.language,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);

const MainSettingsSlice = createSlice({
  name: "main_settings",
  initialState: {
    main_settings: [],
    record: null,
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.main_settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      });
  },
});

export const { clearState } = MainSettingsSlice.actions;
export default MainSettingsSlice.reducer;
