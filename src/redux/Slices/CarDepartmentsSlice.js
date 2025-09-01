import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all car departments
export const fetchCarDepartments = createAsyncThunk("carDepartments/fetchAll", async () => {
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

// add car departments
export const addCarDepartment = createAsyncThunk(
  "carDepartments/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/car-department/store`, userData, {
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
// get car department record
export const carDepartmentRecord = createAsyncThunk(
  "carDepartments/faqRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/car-department/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update car department 
export const updatecarDepartment = createAsyncThunk(
  "carDepartments/updateCarDepartment",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/car-department/update/${id}`,
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
// delete car department
export const deletecarDepartment = createAsyncThunk(
  "carDepartments/deleteCardepartment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/car-department/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete car department";
      return rejectWithValue({ message });
    }
  }
);
const CarDepartmentsSlice = createSlice({
  name: "car_departments",
  initialState: {
    car_departments: [],
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
      .addCase(fetchCarDepartments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car_departments = action.payload;
      })
      .addCase(fetchCarDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addCarDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCarDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addCarDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(carDepartmentRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(carDepartmentRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(carDepartmentRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updatecarDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatecarDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updatecarDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deletecarDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletecarDepartment.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside car departments
        if (state.car_departments?.data) {
          state.car_departments.data = state.car_departments.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deletecarDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete car department";
      });
  },
});

export const { clearState } = CarDepartmentsSlice.actions;
export default CarDepartmentsSlice.reducer;
