import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all load types
export const fetchLoadTypes = createAsyncThunk("loadTypes/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/load-types`, {
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

// add load types
export const addLoadTypes = createAsyncThunk(
  "loadTypes/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/load-types/store`, userData, {
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
// get load types record
export const loadTypesRecord = createAsyncThunk(
  "loadTypes/loadTypesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/load-types/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update load types
export const updateLoadTypes = createAsyncThunk(
  "loadTypes/updateLoadtypes",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/load-types/update`,
        { load_type_id: id, ...formData },
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
// delete load types
export const deleteLoadTypes = createAsyncThunk(
  "loadTypes/deleteLoadTypes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/load-types/delete`,
        { load_type_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete load types";
      return rejectWithValue({ message });
    }
  }
);
const LoadTypesSlice = createSlice({
  name: "loadTypes",
  initialState: {
    loadTypes: [],
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
      .addCase(fetchLoadTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoadTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loadTypes = action.payload;
      })
      .addCase(fetchLoadTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addLoadTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addLoadTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addLoadTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(loadTypesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadTypesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(loadTypesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateLoadTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLoadTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateLoadTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteLoadTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLoadTypes.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside load types
        if (state.loadTypes?.data) {
          state.loadTypes.data = state.loadTypes.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteLoadTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete load types";
      });
  },
});

export const { clearState } = LoadTypesSlice.actions;
export default LoadTypesSlice.reducer;
