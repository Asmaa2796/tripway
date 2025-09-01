import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all category rush hours
export const fetchCategoryRushHours = createAsyncThunk(
  "category_rush_hours/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/category-rush-hours`, {
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
  }
);
// fetch days
export const fetchDays = createAsyncThunk(
  "category_rush_hours/fetchDays",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/settings/days`, {
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
  }
);

// get category rush hours record
export const categoryRushHoursRecord = createAsyncThunk(
  "category_rush_hours/categoryRushHoursRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/category-rush-hours/show/${id}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
export const updateRushHour = createAsyncThunk(
  "category_rush_hours/updateRushHour",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/category-rush-hours/store`,
        {
          category_rush_hour_id: String(id),
          days: formData.days,
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
const CategoryRushHoursSlice = createSlice({
  name: "category_rush_hours",
  initialState: {
    category_rush_hours: [],
    days: [],
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
      .addCase(fetchCategoryRushHours.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryRushHours.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category_rush_hours = action.payload;
      })
      .addCase(fetchCategoryRushHours.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchDays.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.days = action.payload;
      })
      .addCase(fetchDays.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(categoryRushHoursRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(categoryRushHoursRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(categoryRushHoursRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateRushHour.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRushHour.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(updateRushHour.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      });
  },
});

export const { clearState } = CategoryRushHoursSlice.actions;
export default CategoryRushHoursSlice.reducer;
