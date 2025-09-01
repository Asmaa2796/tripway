import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch all offices
export const fetchOffices = createAsyncThunk(
  "offices/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/offices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return {
        data: response.data.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load data"
      );
    }
  }
);

// Add new position
export const addOffice = createAsyncThunk(
  "offices/add",
  async (positionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/offices/store`, positionData, {
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

// Get one position
export const getOfficeRecord = createAsyncThunk(
  "offices/record",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/offices/show/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get record"
      );
    }
  }
);

// Update position
export const updateOffice = createAsyncThunk(
  "offices/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/offices/update`, {establishment_id:id,...data}, {
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

// Delete offices
export const deleteOffice = createAsyncThunk(
  "offices/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/offices/delete`,{establishment_id:id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete position";
      return rejectWithValue({ message });
    }
  }
);

const officeSlice = createSlice({
  name: "offices",
  initialState: {
    offices: [],
    selectedOffice: null,
    pagination: null,
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
      state.selectedOffice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offices = action.payload;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchOffices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOffice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
          if (!Array.isArray(state.offices)) {
          state.offices = [];
        }
        state.offices.push(action.payload.data);
      })
      .addCase(addOffice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getOfficeRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOfficeRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOffice = action.payload;
      })
      .addCase(getOfficeRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOffice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOffice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
        state.selectedOffice = action.payload.data;

        if (Array.isArray(state.offices)) {
          const index = state.offices.findIndex(
            (office) => office.id === action.payload.data.id
          );
          if (index !== -1) {
            state.offices[index] = action.payload.data;
          }
        } else {
          state.offices = [action.payload.data];
        }
      })
      .addCase(updateOffice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteOffice.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.offices)) {
          state.offices = state.offices.filter(
            (office) => office.id !== action.meta.arg
          );
        } else {
          state.offices = [];
        }
      })
      .addCase(deleteOffice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = officeSlice.actions;
export default officeSlice.reducer;
