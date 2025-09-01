import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all good types
export const fetchGoodTypes = createAsyncThunk("goodTypes/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/good-types`, {
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

// add good types
export const addGoodTypes = createAsyncThunk(
  "goodTypes/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/good-types/store`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);
// get good types record
export const goodTypesRecord = createAsyncThunk(
  "goodTypes/goodTypesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/good-types/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update good types
export const updateGoodTypes = createAsyncThunk(
  "goodTypes/updateGoodtypes",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/good-types/update`,
        { good_type_id: id, ...formData },
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
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);
// delete good types
export const deleteGoodTypes = createAsyncThunk(
  "goodTypes/deleteGoodTypes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/good-types/delete`,
        { good_type_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete good types";
      return rejectWithValue({ message });
    }
  }
);
const GoodTypesSlice = createSlice({
  name: "goodTypes",
  initialState: {
    goodTypes: [],
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
      .addCase(fetchGoodTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGoodTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goodTypes = action.payload;
      })
      .addCase(fetchGoodTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addGoodTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addGoodTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addGoodTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(goodTypesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(goodTypesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(goodTypesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateGoodTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGoodTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateGoodTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteGoodTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoodTypes.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside good types
        if (state.goodTypes?.data) {
          state.goodTypes.data = state.goodTypes.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteGoodTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete good types";
      });
  },
});

export const { clearState } = GoodTypesSlice.actions;
export default GoodTypesSlice.reducer;
