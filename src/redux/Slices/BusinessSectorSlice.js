import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all Business Sector
export const fetchBusinessSectors = createAsyncThunk("businessSector/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/business-sectors`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Lang: i18n.language,
      },
    });
    return response.data.data.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed load data";
    return message;
  }
});

// add businessSector
export const addBusinessSector = createAsyncThunk(
  "businessSector/add",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/business-sectors/store`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
// get businessSector record
export const businessSectorRecord = createAsyncThunk(
  "businessSector/businessSectorRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/business-sectors/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update businessSector
export const updateBusinessSector = createAsyncThunk(
  "businessSector/updateBusinessSector",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/business-sectors/update`,
        { business_sector_id: id, ...formData },
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
// delete businessSector
export const deleteBusinessSector = createAsyncThunk(
  "businessSector/deleteBusinessSector",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/business-sectors/delete`,
        { business_sector_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete faq";
      return rejectWithValue({ message });
    }
  }
);
const BusinessSectorSlice = createSlice({
  name: "businessSector",
  initialState: {
    businessSector: [],
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
      .addCase(fetchBusinessSectors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBusinessSectors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.businessSector = action.payload;
      })
      .addCase(fetchBusinessSectors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addBusinessSector.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBusinessSector.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addBusinessSector.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(businessSectorRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(businessSectorRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(businessSectorRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateBusinessSector.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBusinessSector.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateBusinessSector.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteBusinessSector.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBusinessSector.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside businessSector
        if (state.businessSector?.data) {
          state.businessSector.data = state.businessSector.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteBusinessSector.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete business sector";
      });
  },
});

export const { clearState } = BusinessSectorSlice.actions;
export default BusinessSectorSlice.reducer;
