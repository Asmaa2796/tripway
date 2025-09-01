import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all faqs
export const fetchfaqs = createAsyncThunk("faqs/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/faqs`, {
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

// add faqs
export const addfaqs = createAsyncThunk(
  "faqs/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/faqs/store`, userData, {
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
// get faq record
export const faqRecord = createAsyncThunk(
  "faqs/faqRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/faqs/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update faq
export const updateFaq = createAsyncThunk(
  "faqs/updateFaq",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/faqs/update`,
        { faq_id: id, ...formData },
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
// delete faq
export const deleteFaq = createAsyncThunk(
  "faqs/deleteFaq",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/faqs/delete`,
        { faq_id: id },
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
const FAQsSlice = createSlice({
  name: "faqs",
  initialState: {
    faqs: [],
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
      .addCase(fetchfaqs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchfaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchfaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addfaqs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addfaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addfaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(faqRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(faqRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(faqRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateFaq.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside faqs
        if (state.faqs?.data) {
          state.faqs.data = state.faqs.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete FAQ";
      });
  },
});

export const { clearState } = FAQsSlice.actions;
export default FAQsSlice.reducer;
