// src/redux/PurchaseReturnsAccountsSlice.js
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
} = crudFactory("purchase_returns_accounts", {
  withRestore: true,
  withDeleted: true,
});
// Initial state
const initialState = {
  purchase_returns_accounts: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};
// Create slice
const PurchaseReturnsAccountsSlice = createSlice({
  name: "purchase_returns_accounts",
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
      key: "purchase_returns_accounts",
    });
  },
});
// Export
export const { clearState } = PurchaseReturnsAccountsSlice.actions;
export {
  fetchAll as fetchPurchaseReturnsAccounts,
  create as addPurchaseReturnsAccounts,
  getById as PurchaseReturnsAccountsRecord,
  update as updateRecord,
  remove as deleteRecord,
  restore as restoreRecord,
  fetchDeleted as fetchDeletedPurchaseReturnsAccounts,
};
export default PurchaseReturnsAccountsSlice.reducer;