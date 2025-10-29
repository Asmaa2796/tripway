import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all tripway branches
export const fetchTripwayBranches = createAsyncThunk("tripway_branches/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/winch-branches`, {
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
});
export const fetchSalesAccounts = createAsyncThunk("tripway_branches/fetchSalesAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/sales-accounts`, {
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
export const fetchSalesReturnsAccounts = createAsyncThunk("tripway_branches/fetchSalesReturnsAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/sales-returns-accounts`, {
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
export const fetchSalesDiscountAccounts = createAsyncThunk("tripway_branches/fetchSalesDiscountAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/sales-discount-accounts`, {
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
export const fetchRelatedPartiesAccounts = createAsyncThunk("tripway_branches/fetchRelatedPartiesAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/related-parties-accounts`, {
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
export const fetchInternalSalesAccounts = createAsyncThunk("tripway_branches/fetchInternalSalesAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/internal-sales-accounts`, {
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

export const fetchInternalCostSalesAccounts = createAsyncThunk("tripway_branches/fetchInternaCostSalesAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/internal-cost-sales-accounts`, {
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
export const fetchICostsalesSccounts = createAsyncThunk("tripway_branches/fetchCostsalesSccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/cost-sales-accounts`, {
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
export const fetchPurchaseReturnsAccounts = createAsyncThunk("tripway_branches/fetchPurchaseReturnsAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/purchase-returns-accounts`, {
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
export const fetchCostSalesAccounts = createAsyncThunk("tripway_branches/fetchCostSalesAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/cost-sales-accounts`, {
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
export const fetchCashAccounts = createAsyncThunk("tripway_branches/fetchCashAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/cash-accounts`, {
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
export const fetchBankAccounts = createAsyncThunk("tripway_branches/fetchBankAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/bank-accounts`, {
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
export const fetchEarnedDiscountAccounts = createAsyncThunk("tripway_branches/fetchEarnedDiscountAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/earned-discount-accounts`, {
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
export const fetchCustomerPenaltiesAccounts = createAsyncThunk("tripway_branches/fetchCustomerPenaltiesAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/customer-penalties-accounts`, {
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
export const fetchSupplierPenaltiesAccounts = createAsyncThunk("tripway_branches/fetchSupplierPenaltiesAccounts", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/supplier-penalties-accounts`, {
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
// add tripway branches
export const addTripwayBranches = createAsyncThunk(
  "tripway_branches/add",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/winch-branches/store`, payload, {
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
// get tripway branches record
export const tripwayBranchesRecord = createAsyncThunk(
  "tripway_branches/faqRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/winch-branches/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update tripway branches
export const updateTripwayBranches = createAsyncThunk(
  "tripway_branches/updateTripwayBranches",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/winch-branches/update`,
        { branch_id: id, ...payload },
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
// delete faq
export const deleteTripwayBranches = createAsyncThunk(
  "tripway_branches/deleteTripwayBranches",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/winch-branches/delete`,
        { branch_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete faq";
      return rejectWithValue({ message });
    }
  }
);
const TripwayBranchesSlice = createSlice({
  name: "tripway_branches",
  initialState: {
    tripway_branches: [],
    sales_accounts: [],
    sales_returns_accounts: [],
    related_parties_accounts: [],
    internal_sales_accounts: [],
    internal_cost_sales_accounts: [],
    purchase_returns_accounts: [],
    cash_accounts: [],
    bank_accounts: [],
    earned_discount_accounts: [],
    customer_penalties_accounts: [],
    supplier_penalties_accounts: [],
    sales_discount_accounts: [],
    cost_sales_accounts: [],
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
      .addCase(fetchTripwayBranches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTripwayBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tripway_branches = action.payload;
      })
      .addCase(fetchTripwayBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchSalesAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales_accounts = action.payload;
      })
      .addCase(fetchSalesAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchSalesReturnsAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesReturnsAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales_returns_accounts = action.payload;
      })
      .addCase(fetchSalesReturnsAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchSalesDiscountAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesDiscountAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sales_discount_accounts = action.payload;
      })
      .addCase(fetchSalesDiscountAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchRelatedPartiesAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRelatedPartiesAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.related_parties_accounts = action.payload;
      })
      .addCase(fetchRelatedPartiesAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchInternalSalesAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInternalSalesAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.internal_sales_accounts = action.payload;
      })
      .addCase(fetchInternalSalesAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchInternalCostSalesAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInternalCostSalesAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.internal_cost_sales_accounts = action.payload;
      })
      .addCase(fetchInternalCostSalesAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchPurchaseReturnsAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseReturnsAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.purchase_returns_accounts = action.payload;
      })
      .addCase(fetchPurchaseReturnsAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchCostSalesAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCostSalesAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cost_sales_accounts = action.payload;
      })
      .addCase(fetchCostSalesAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchCashAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCashAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cash_accounts = action.payload;
      })
      .addCase(fetchCashAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchBankAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBankAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bank_accounts = action.payload;
      })
      .addCase(fetchBankAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchEarnedDiscountAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEarnedDiscountAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.earned_discount_accounts = action.payload;
      })
      .addCase(fetchEarnedDiscountAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchCustomerPenaltiesAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerPenaltiesAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customer_penalties_accounts = action.payload;
      })
      .addCase(fetchCustomerPenaltiesAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(fetchSupplierPenaltiesAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSupplierPenaltiesAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supplier_penalties_accounts = action.payload;
      })
      .addCase(fetchSupplierPenaltiesAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addTripwayBranches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTripwayBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addTripwayBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(tripwayBranchesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(tripwayBranchesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(tripwayBranchesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateTripwayBranches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTripwayBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateTripwayBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteTripwayBranches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTripwayBranches.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside tripway branches
        if (state.tripway_branches?.data) {
          state.tripway_branches.data = state.tripway_branches.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteTripwayBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete tripway branches";
      });
  },
});

export const { clearState } = TripwayBranchesSlice.actions;
export default TripwayBranchesSlice.reducer;
