import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Thunks
export const fetchFleetManagementTypes = createAsyncThunk(
  "fleet_request_types/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fleet-request-types/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return response.data.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to load data");
    }
  }
);

export const fetchFuelFleetTypes = createAsyncThunk(
  "fleet_request_types/fetchFuel",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fleet-request-types/fuel`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return response.data.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to load fuel data"
      );
    }
  }
);

export const fetchMaintenanceFleetTypes = createAsyncThunk(
  "fleet_request_types/fetchMaintenance",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/fleet-request-types/maintenance`,
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
        error.response?.data?.message || "Failed to load maintenance data"
      );
    }
  }
);
export const fetchEntryFleetTypes = createAsyncThunk(
  "fleet_request_types/fetchEntry",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/fleet-request-types/journal_entries`,
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
        error.response?.data?.message || "Failed to load entry data"
      );
    }
  }
);

export const fetchDeletedFleetTypes = createAsyncThunk(
  "fleet_request_types/fetchDeleted",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/fleet-request-types/delete`,
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

export const addFleetRequestTypes = createAsyncThunk(
  "fleet_request_types/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fleet-request-types/store`,
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

export const fleetRecord = createAsyncThunk(
  "fleet_request_types/fleetRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/fleet-request-types/show/${id}`
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
  "fleet_request_types/updateRecord",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fleet-request-types/update`,
        { fleet_reuqest_id: id, ...formData },
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
  "fleet_request_types/deleteRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fleet-request-types/delete`,
        { fleet_reuqest_id: id },
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
export const restoreRecord = createAsyncThunk(
  "fleet_request_types/restoreRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/fleet-request-types/restore`,
        { fleet_reuqest_id: id },
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
const FleetManagementTypesSlice = createSlice({
  name: "fleet_request_types",
  initialState: {
    fleet_request_types: [],
    fuel: [],
    maintenance: [],
    entry: [],
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
      .addCase(fetchFleetManagementTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFleetManagementTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fleet_request_types = action.payload;
      })
      .addCase(fetchFleetManagementTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch Fuel
      .addCase(fetchFuelFleetTypes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFuelFleetTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fuel = action.payload;
      })
      .addCase(fetchFuelFleetTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch Maintenance
      .addCase(fetchMaintenanceFleetTypes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMaintenanceFleetTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.maintenance = action.payload;
      })
      .addCase(fetchMaintenanceFleetTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Entry
      .addCase(fetchEntryFleetTypes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEntryFleetTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entry = action.payload;
      })
      .addCase(fetchEntryFleetTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Fetch Deleted
      .addCase(fetchDeletedFleetTypes.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeletedFleetTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleted = action.payload;
      })
      .addCase(fetchDeletedFleetTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addFleetRequestTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFleetRequestTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addFleetRequestTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Record
      .addCase(fleetRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fleetRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(fleetRecord.rejected, (state, action) => {
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
        state.fleet_request_types = state.fleet_request_types.filter(
          (item) => item.id !== action.payload.id
        );
        state.success = action.payload.message;
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = FleetManagementTypesSlice.actions;
export default FleetManagementTypesSlice.reducer;
