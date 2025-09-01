import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all quotation features
export const fetchQuotationFeatures = createAsyncThunk(
  "quotationFeatures/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/quotation-features`, {
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

// add quotation features
export const addQuotationFeatures = createAsyncThunk(
  "quotationFeatures/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/quotation-features/store`,
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
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);
// get quotation features record
export const quotationFeaturesRecord = createAsyncThunk(
  "quotationFeatures/quotationFeaturesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/quotation-features/show/${id}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update quotation features
export const updateQuotationFeatures = createAsyncThunk(
  "quotationFeatures/updateQuotationFeatures",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/quotation-features/update`,
        { quotation_feature_id: id, ...formData },
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
// delete quotation features
export const deleteQuotationFeatures = createAsyncThunk(
  "quotationFeatures/deleteQuotationFeatures",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/quotation-features/delete`,
        { quotation_feature_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete quotation features";
      return rejectWithValue({ message });
    }
  }
);
export const setDefaultQuotationFeature = createAsyncThunk(
  "quotationFeatures/setDefault",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/quotation-features/set-default`,
        { quotation_feature_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );
      return { id, ...response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to set default feature";
      return rejectWithValue(message);
    }
  }
);
const QuotationFeaturesSlice = createSlice({
  name: "quotationFeatures",
  initialState: {
    quotationFeatures: [],
    record: null,
    isLoading: false,
    error: null,
    success: null,
    defaultSuccess: null,
    defaultError: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotationFeatures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuotationFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quotationFeatures = action.payload;
      })
      .addCase(fetchQuotationFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addQuotationFeatures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addQuotationFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addQuotationFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(quotationFeaturesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(quotationFeaturesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(quotationFeaturesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateQuotationFeatures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateQuotationFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateQuotationFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteQuotationFeatures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuotationFeatures.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside quotation features
        if (state.quotationFeatures?.data) {
          state.quotationFeatures.data = state.quotationFeatures.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteQuotationFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete quotation features";
      })
      .addCase(setDefaultQuotationFeature.pending, (state) => {
        state.isLoading = true;
        state.defaultError = null;
      })
      .addCase(setDefaultQuotationFeature.fulfilled, (state, action) => {
        state.isLoading = false;
        state.defaultSuccess = action.payload.message || "Set as default successfully";

        // Update local state: only one is_default = true
        if (state.quotationFeatures?.data) {
          state.quotationFeatures.data = state.quotationFeatures.data.map(
            (item) => ({
              ...item,
              is_default: item.id === action.payload.id,
            })
          );
        }
      })
      .addCase(setDefaultQuotationFeature.rejected, (state, action) => {
        state.isLoading = false;
        state.defaultError = action.payload || "Failed to set default feature";
      });
  },
});

export const { clearState } = QuotationFeaturesSlice.actions;
export default QuotationFeaturesSlice.reducer;
