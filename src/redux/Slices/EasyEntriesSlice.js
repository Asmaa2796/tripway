import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all easy entries
export const fetchEasyEntries = createAsyncThunk(
  "easy_entries/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/easy-entries/easy`, {
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
// all deleted easy entries
export const fetchDeletedEasyEntries = createAsyncThunk(
  "easy_entries/fetchDeletedEasyEntries",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/easy-entries/deleted`, {
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
// all deleted easy entries
export const fetchAccountsTree = createAsyncThunk(
  "easy_entries/fetchAccountsTree",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/settings/account-tree`, {
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

// add easy entries
export const addEasyEntries = createAsyncThunk(
  "easy_entries/add",
  async (userData, { rejectWithValue }) => {
    try {
      const isFormData = userData instanceof FormData;

      const response = await axios.post(
        `${BASE_URL}/easy-entries/store`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
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

// get easy entries record
export const easyEntriesRecord = createAsyncThunk(
  "easy_entries/easyEntriesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/easy-entries/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update easy entries
export const updateEasyEntries = createAsyncThunk(
  "easy_entries/updateEasyEntries",
  async ({ data }, { rejectWithValue }) => {
    try {
      const isFormData = data instanceof FormData;
      const response = await axios.post(
        `${BASE_URL}/easy-entries/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
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
// delete easy entries
export const deleteEasyEntries = createAsyncThunk(
  "easy_entries/deleteEasyEntries",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/easy-entries/delete`,
        { entry_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete easy entries";
      return rejectWithValue({ message });
    }
  }
);

export const restoreRecord = createAsyncThunk(
  "easy_entries/restoreRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/easy-entries/restore`,
        { entry_id: id },
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
const EasyEntriesSlice = createSlice({
  name: "easy_entries",
  initialState: {
    easy_entries: [],
    deleted: [],
    tree: [],
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
      .addCase(fetchEasyEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEasyEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.easy_entries = action.payload;
      })
      .addCase(fetchEasyEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchDeletedEasyEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeletedEasyEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleted = action.payload;
      })
      .addCase(fetchDeletedEasyEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchAccountsTree.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountsTree.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tree = action.payload;
      })
      .addCase(fetchAccountsTree.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addEasyEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addEasyEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addEasyEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(easyEntriesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(easyEntriesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(easyEntriesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateEasyEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEasyEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateEasyEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteEasyEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEasyEntries.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from nested data array inside easy_entries
        if (state.easy_entries?.data?.data) {
          state.easy_entries.data.data = state.easy_entries.data.data.filter(
            (record) => record.id !== action.meta.arg
          );
          // Also update pagination count
          if (state.easy_entries.data.pagination) {
            state.easy_entries.data.pagination.total -= 1;
          }
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteEasyEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete easy entries";
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
      });
  },
});

export const { clearState } = EasyEntriesSlice.actions;
export default EasyEntriesSlice.reducer;
