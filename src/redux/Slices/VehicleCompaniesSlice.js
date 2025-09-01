import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all vehicle companies
export const fetchVehicleCompanies = createAsyncThunk(
  "vehicle_companies/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/vehicle-companies`, {
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
  }
);

// add vehicle companies
export const addVehicleCompanies = createAsyncThunk(
  "vehicle_companies/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/vehicle-companies/store`,
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
      return rejectWithValue({ message });
    }
  }
);
// get file archive types record
export const vehicleCompaniesRecord = createAsyncThunk(
  "vehicle_companies/vehicleCompaniesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/vehicle-companies/show/${id}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update vehicle companies
export const updateVehicleCompanies = createAsyncThunk(
  "vehicle_companies/updateVehicleCompanies",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/vehicle-companies/update`,
        { vehicle_id: id, ...formData },
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
      return rejectWithValue({ message });
    }
  }
);
// delete vehicle companies
export const deleteVehicleCompanies = createAsyncThunk(
  "vehicle_companies/deleteVehicleCompanies",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/vehicle-companies/delete`,
        { vehicle_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete supplier";
      return rejectWithValue({ message });
    }
  }
);
const VehicleCompaniesSlice = createSlice({
  name: "vehicle_companies",
  initialState: {
    vehicle_companies: [],
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
      .addCase(fetchVehicleCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicleCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vehicle_companies = action.payload;
      })
      .addCase(fetchVehicleCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addVehicleCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addVehicleCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addVehicleCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(vehicleCompaniesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(vehicleCompaniesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(vehicleCompaniesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateVehicleCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVehicleCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateVehicleCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(deleteVehicleCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicleCompanies.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.vehicle_companies)) {
          state.vehicle_companies = state.vehicle_companies.filter(
            (record) => record.id !== action.meta.arg
          );
        } else {
          state.vehicle_companies = [];
        }

        state.success = action.payload?.message ?? null;
      })

      .addCase(deleteVehicleCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = VehicleCompaniesSlice.actions;
export default VehicleCompaniesSlice.reducer;
