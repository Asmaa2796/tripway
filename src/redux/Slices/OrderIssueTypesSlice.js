import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Thunks
export const fetchOrderIssueTypes = createAsyncThunk(
  "order_issue_types/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/order-issue-types/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to load data");
    }
  }
);

export const fetchDeletedOrderIssueTypes = createAsyncThunk(
  "order_issue_types/fetchDeleted",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/order-issue-types/deleted`,
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
      throw new Error(
        error.response?.data?.message || "Failed to load deleted data"
      );
    }
  }
);

export const addOrderIssueTypes = createAsyncThunk(
  "order_issue_types/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order-issue-types/store`,
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

export const orderIssueTypesRecord = createAsyncThunk(
  "order_issue_types/orderIssueTypesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/order-issue-types/show/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Record load failed",
      });
    }
  }
);

export const updateRecord = createAsyncThunk(
  "order_issue_types/updateRecord",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order-issue-types/update`,
        { order_issue_type_id: id, ...formData },
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
export const restoreRecord = createAsyncThunk(
  "order_issue_types/restoreRecord",
  async ({ id, formData = {} }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order-issue-types/reset`,
        { order_issue_type_id: id, ...formData },
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
  "order_issue_types/deleteRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order-issue-types/delete`,
        { order_issue_type_id: id },
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

// Slice
const OrderIssueTypesSlice = createSlice({
  name: "order_issue_types",
  initialState: {
    order_issue_types: [],
    deleted: [],
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
      // Fetch All
      .addCase(fetchOrderIssueTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderIssueTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order_issue_types = action.payload;
      })
      .addCase(fetchOrderIssueTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch Deleted
      .addCase(fetchDeletedOrderIssueTypes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeletedOrderIssueTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleted = action.payload;
      })
      .addCase(fetchDeletedOrderIssueTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addOrderIssueTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrderIssueTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addOrderIssueTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Record
      .addCase(orderIssueTypesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderIssueTypesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(orderIssueTypesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Update
      .addCase(updateRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // restore
      .addCase(restoreRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(restoreRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Delete
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.order_issue_types)) {
          // If it's directly an array
          state.order_issue_types = state.order_issue_types.filter(
            (item) => item.id !== action.payload.id
          );
        } else if (Array.isArray(state.order_issue_types?.data)) {
          // If it's the object with a data array
          state.order_issue_types.data = state.order_issue_types.data.filter(
            (item) => item.id !== action.payload.id
          );
        }

        state.success = action.payload.message;
      })

      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = OrderIssueTypesSlice.actions;
export default OrderIssueTypesSlice.reducer;
