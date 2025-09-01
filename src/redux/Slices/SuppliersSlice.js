import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all suppliers
export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/suppliers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return response.data.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed load data";
      return message;
    }
  }
);

// add supplier
export const addSupplier = createAsyncThunk(
  "suppliers/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/suppliers/store`,
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
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);
// get supplier record
export const supplierRecord = createAsyncThunk(
  "suppliers/supplierRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/suppliers/show/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update supplier
export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/suppliers/update`,
        {purchase_resource_id:id,...formData},
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
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);
// delete supplier
export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/suppliers/delete`,{purchase_resource_id:id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete supplier";
      return rejectWithValue({ message });
    }
  }
);
const SuppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    suppliers: [],
    supplier: null,
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
      .addCase(fetchSuppliers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(supplierRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(supplierRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supplier = action.payload.data;
      })
      .addCase(supplierRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateSupplier.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update supplier";
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== action.meta.arg
        );
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = SuppliersSlice.actions;
export default SuppliersSlice.reducer;
