// src/redux/SalesReturnsAccountsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { crudFactory, addCrudExtraReducers } from "../helpers/CrudToolkit";
// Generate thunks for this resource
const {
  fetchAll,
  create,
  getById,
  update,
  remove,
  restore,
  fetchDeleted
} = crudFactory("sales_returns_accounts", {
  withRestore: true,
  withDeleted: true,
});
// Initial state
const initialState = {
  sales_returns_accounts: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};
// Create slice
const SalesReturnsAccountsSlice = createSlice({
  name: "sales_returns_accounts",
  initialState,
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    addCrudExtraReducers(builder, {
      fetchAll,
      create,
      getById,
      update,
      remove,
      restore,
      fetchDeleted,
      key: "sales_returns_accounts",
    });
  },
});
// Export
export const { clearState } = SalesReturnsAccountsSlice.actions;
export {
  fetchAll as fetchSalesReturnsAccounts,
  create as addSalesReturnsAccounts,
  getById as SalesReturnsAccountsRecord,
  update as updateRecord,
  remove as deleteRecord,
  restore as restoreRecord,
  fetchDeleted as fetchDeletedSalesReturnsAccounts,
};
export default SalesReturnsAccountsSlice.reducer;