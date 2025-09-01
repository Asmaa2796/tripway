import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "i18next";

const baseURL = process.env.REACT_APP_BASE_URL;
const user = JSON.parse(localStorage.getItem("userElwnsh"));
const token = user?.token;

axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
axios.defaults.headers.common["Lang"] = i18n.language;

i18n.on("languageChanged", (lng) => {
  axios.defaults.headers.common["Lang"] = lng;
});

// Fetch Deleted Compensation Categories
export const fetchDeletedCompensations = createAsyncThunk(
  "compensationCategories/fetchDeleted",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseURL}/compensation-categories/delete`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch All Compensation Categories
export const fetchCompensations = createAsyncThunk(
  "compensationCategories/fetchAll",
  async (page = 1, thunkAPI) => {
    try {
      const [active, inactive, deleted] = await Promise.all([
        axios.get(`${baseURL}/compensation-categories/approved?page=${page}`),
        axios.get(`${baseURL}/compensation-categories/waiting?page=${page}`),
        axios.get(`${baseURL}/compensation-categories/delete?page=${page}`),
      ]);

      const pagination = active.data.data.pagination;

      return {
        active: active.data.data.data,
        inactive: inactive.data.data.data,
        deleted: deleted.data.data.data,
        pagination,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add New Compensation Category
export const addCompensation = createAsyncThunk(
  "compensationCategories/add",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/compensation-categories/store`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Compensation Status
export const updateCompensation = createAsyncThunk(
  "compensationCategories/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/compensation-categories/update`,
        { compensation_category_id: id, ...formData }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete Compensation
export const deleteCompensation = createAsyncThunk(
  "compensationCategories/delete",
  async (id, thunkAPI) => {
    try {
      await axios.post(`${baseURL}/compensation-categories/delete`, {
        compensation_category_id: id,
      });
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const changeCompensationStatus = createAsyncThunk(
  "compensationCategories/changeStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${baseURL}/compensation-categories/change-status`,
        { compensation_category_id: id }
      );
      return res.data.data; // backend should return the updated category
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const restoreCompensation = createAsyncThunk(
  "compensationCategories/restore",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${baseURL}/compensation-categories/reapprove`,
        { compensation_category_id: id }
      );
      return res.data.data; // backend should return the restored category
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// get load types record
export const fetchRecord = createAsyncThunk(
  "compensationCategories/fetchRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/compensation-categories/show/${id}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
const compensationCategoriesSlice = createSlice({
  name: "compensationCategories",
  initialState: {
    approved: [],
    waiting: [],
    deleted: [],
    loading: false,
    record: null,
    error: null
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
      .addCase(fetchCompensations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompensations.fulfilled, (state, action) => {
        state.loading = false;
        state.approved = action.payload.active;
        state.waiting = action.payload.inactive;
        state.deleted = action.payload.deleted;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCompensations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Add
      .addCase(addCompensation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCompensation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addCompensation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      })
      // Update Compensation
      .addCase(updateCompensation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCompensation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (Array.isArray(state.approved)) {
          const idx = state.approved.findIndex(
            (item) => item.id === action.payload.id
          );
          if (idx !== -1) {
            state.approved[idx] = action.payload;
          }
        }
      })
      .addCase(updateCompensation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update compensation";
        state.success = false;
      })
      .addCase(fetchRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload.data;
      })
      .addCase(fetchRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      // 🗑 Delete Compensation
      .addCase(deleteCompensation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCompensation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedItem = action.payload;

        // remove from approved if exists
        state.approved = state.approved?.filter(
          (item) => item.id !== deletedItem.id
        );

        // remove from waiting if exists
        state.waiting = state.waiting?.filter(
          (item) => item.id !== deletedItem.id
        );

        // push into deleted list
        if (Array.isArray(state.deleted)) {
          state.deleted.push(deletedItem);
        } else {
          state.deleted = [deletedItem];
        }
      })
      .addCase(deleteCompensation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete compensation";
        state.success = false;
      })
      .addCase(changeCompensationStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        // remove from waiting if exists
        state.waiting = state.waiting?.filter((i) => i.id !== updated.id);

        // remove from approved if exists
        state.approved = state.approved?.filter((i) => i.id !== updated.id);

        // push to correct array depending on new status
        if (updated.status === "approved") {
          state.approved?.push(updated);
        } else {
          state.waiting?.push(updated);
        }
      })

      .addCase(restoreCompensation.fulfilled, (state, action) => {
        const restored = action.payload;
        // remove from deleted
        state.deleted = state.deleted?.filter((i) => i.id !== restored.id);

        // API might return it as waiting or approved
        if (restored.status === "approved") {
          state.approved?.push(restored);
        } else {
          state.waiting?.push(restored);
        }
      });
  },
});
export const { clearState } = compensationCategoriesSlice.actions;
export default compensationCategoriesSlice.reducer;
