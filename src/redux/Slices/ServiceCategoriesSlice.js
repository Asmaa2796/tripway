import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// fetch by type
export const fetchServiceCategoriesByType = createAsyncThunk(
  "service_categories/fetchByType",
  async (typeSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/services-categories/${typeSlug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Lang: i18n.language,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Fetch by type failed",
      });
    }
  }
);

export const fetchDeletedServiceCategories = createAsyncThunk(
  "service_categories/fetchDeletedServiceCategories",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/services-categories/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );
      return response.data.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to load deleted data"
      );
    }
  }
);

export const addServiceCategories = createAsyncThunk(
  "service_categories/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services-categories/store`,
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
      return rejectWithValue({
        message: error.response?.data?.message || "Add failed",
      });
    }
  }
);

export const serviceCategoriesRecord = createAsyncThunk(
  "service_categories/serviceCategoriesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/services-categories/show/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Record load failed",
      });
    }
  }
);

export const updateServiceCategories = createAsyncThunk(
  "service_categories/updateServiceCategories",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services-categories/update`,
        { service_category_id: id, ...formData },
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
      return rejectWithValue({
        message: error.response?.data?.message || "Update failed",
      });
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "service_categories/deleteRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services-categories/delete`,
        { service_category_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Delete failed",
      });
    }
  }
);
export const changeStatus = createAsyncThunk(
  "service_categories/changeStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services-categories/change-status`,
        { service_category_id: id },
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
      return rejectWithValue({
        message: error.response?.data?.message || "Update failed",
      });
    }
  }
);
// Slice
const ServiceCategoriesSlice = createSlice({
  name: "servicesCategories",
  initialState: {
    byType: {},
    deleted: { data: [], pagination: null },
    record: null,
    pagination: null,
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
      .addCase(fetchServiceCategoriesByType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceCategoriesByType.fulfilled, (state, action) => {
        state.isLoading = false;
        const type = action.meta.arg;
        state.byType[type] = action.payload;
      })
      .addCase(fetchServiceCategoriesByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Fetch by type failed";
      })

      .addCase(fetchDeletedServiceCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeletedServiceCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleted = { data: action.payload };
      })
      .addCase(fetchDeletedServiceCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Fetch deleted failed";
      })

      .addCase(addServiceCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addServiceCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addServiceCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Add failed";
      })

      // 🔹 Record
      .addCase(serviceCategoriesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(serviceCategoriesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(serviceCategoriesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Record load failed";
      })

      // Update
      .addCase(updateServiceCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateServiceCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(updateServiceCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Update failed";
      })

      // Delete
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta.arg;

        if (state.byType.waiting?.data) {
          state.byType.waiting.data = state.byType.waiting.data.filter(
            (item) => item.id !== deletedId
          );
        }
        if (state.byType.approved?.data) {
          state.byType.approved.data = state.byType.approved.data.filter(
            (item) => item.id !== deletedId
          );
        }

        if (action.payload?.data) {
          state.deleted = action.payload.data;
        }

        state.success = action.payload.message;
      })

      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Delete failed";
      })

      .addCase(changeStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isLoading = false;

        const updated = action.payload?.data ?? action.payload;
        const updatedId = updated.id;

        if (state.byType.waiting?.data) {
          state.byType.waiting.data = state.byType.waiting.data.filter(
            (item) => item.id !== updatedId
          );
        }

        // push into approved only
        if (updated.status === "approved") {
          if (state.byType.approved?.data) {
            state.byType.approved.data.unshift(updated);
          } else {
            state.byType.approved = { data: [updated] };
          }
        }

        state.success = action.payload.message || "Status changed";
      })

      .addCase(changeStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Restore failed";
      });
  },
});

export const { clearState } = ServiceCategoriesSlice.actions;
export default ServiceCategoriesSlice.reducer;
