import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch all company managements
export const fetchCompanyManagements = createAsyncThunk(
  "company_managements/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/company-managements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load data"
      );
    }
  }
);

// Add new management
export const addManagement = createAsyncThunk(
  "company_managements/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/company-managements/store`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Lang": i18n.language,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred"
      );
    }
  }
);

// Get one management
export const getManagementRecord = createAsyncThunk(
  "company_managements/management_record",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/company-managements/show/${id}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get record"
      );
    }
  }
);

// Update management
export const updateManagement = createAsyncThunk(
  "company_managements/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/company-managements/update`,
        {department_id:id,...data},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Lang": i18n.language,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);
// Async Thunk for delete
export const deleteManagement = createAsyncThunk(
  "company_managements/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/company-managements/delete`,{department_id:id},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete role";
      return rejectWithValue({ message });
    }
  }
);

const companyManagementsSlice = createSlice({
  name: "company_managements",
  initialState: {
    companyManagements: [],
    selectedManagement: null,
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
      state.selectedManagement = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyManagements.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanyManagements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.companyManagements = action.payload;
      })
      .addCase(fetchCompanyManagements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addManagement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addManagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.companyManagements.push(action.payload.data);
      })
      .addCase(addManagement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getManagementRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getManagementRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedManagement = action.payload;
      })
      .addCase(getManagementRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateManagement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateManagement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
        state.selectedManagement = action.payload.data;
        // Optional: also update the item in the list
        const index = state.companyManagements.findIndex(
          (m) => m.id === action.payload.data.id
        );
        if (index !== -1) {
          state.companyManagements[index] = action.payload.data;
        }
      })
      .addCase(updateManagement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteManagement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteManagement.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.companyManagements)) {
          state.companyManagements = state.companyManagements.filter(
            (management) => management.id !== action.meta.arg
          );
        } else {
          state.companyManagements = [];
        }
      })
      .addCase(deleteManagement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = companyManagementsSlice.actions;
export default companyManagementsSlice.reducer;
