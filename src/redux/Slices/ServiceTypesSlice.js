import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all service types
export const fetchServiceTypes = createAsyncThunk("serviceTypes/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/service-types`, {
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
export const fetchCarDepartment = createAsyncThunk("carDepartment/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/car-department`, {
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

// add service types
export const addServiceTypes = createAsyncThunk(
  "serviceTypes/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/service-types/store`, userData, {
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
// get service types record
export const serviceTypesRecord = createAsyncThunk(
  "serviceTypes/serviceTypesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/service-types/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update service types
export const updateServiceTypes = createAsyncThunk(
  "serviceTypes/updateServiceTypes",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/service-types/update/${id}`,
        formData,
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
// delete service types
export const deleteServiceTypes = createAsyncThunk(
  "serviceTypes/deleteServiceTypes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/service-types/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete service types";
      return rejectWithValue({ message });
    }
  }
);
const ServiceTypesSlice = createSlice({
  name: "serviceTypes",
  initialState: {
    serviceTypes: [],
    carDepartment: [],
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
      .addCase(fetchServiceTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceTypes = action.payload;
      })
      .addCase(fetchServiceTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchCarDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carDepartment = action.payload;
      })
      .addCase(fetchCarDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addServiceTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addServiceTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addServiceTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(serviceTypesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(serviceTypesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(serviceTypesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateServiceTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateServiceTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateServiceTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteServiceTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteServiceTypes.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside service types
        if (state.serviceTypes?.data) {
          state.serviceTypes.data = state.serviceTypes.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteServiceTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete service types";
      });
  },
});

export const { clearState } = ServiceTypesSlice.actions;
export default ServiceTypesSlice.reducer;
