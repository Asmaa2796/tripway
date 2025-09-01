import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all chart accounts
export const fetchChartAccounts = createAsyncThunk(
  "chart_accounts/fetchAll",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/chart-accounts/chart_account`,
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
      const message = error.response?.data?.message || "Failed load data";
      return message;
    }
  }
);

// add chart accounts
export const addChartAccounts = createAsyncThunk(
  "chart_accounts/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chart-accounts/store`,
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
      return rejectWithValue(message);
    }
  }
);
// get chart accounts record
export const chartAccountsRecord = createAsyncThunk(
  "chart_accounts/chartAccountsRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/chart-accounts/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update chart accounts
export const updateChartAccounts = createAsyncThunk(
  "chart_accounts/updateChartAccounts",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chart-accounts/update`,
        { account_id: id, ...formData },
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
// delete chart accounts
export const deleteChartAccounts = createAsyncThunk(
  "chart_accounts/deleteChartAccounts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/chart-accounts/delete`,
        { account_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete chart accounts";
      return rejectWithValue({ message });
    }
  }
);
const ChartAccountsSlice = createSlice({
  name: "chart_accounts",
  initialState: {
    chart_accounts: [],
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
      .addCase(fetchChartAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChartAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chart_accounts = action.payload;
      })
      .addCase(fetchChartAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addChartAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addChartAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addChartAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(chartAccountsRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(chartAccountsRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(chartAccountsRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateChartAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateChartAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateChartAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteChartAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteChartAccounts.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove directly from array
        state.chart_accounts = state.chart_accounts.filter(
          (record) => record.id !== action.meta.arg
        );

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteChartAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete chart accounts";
      });
  },
});

export const { clearState } = ChartAccountsSlice.actions;
export default ChartAccountsSlice.reducer;