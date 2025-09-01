// src/redux/PurchasesAccountsSlice.js
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
} = crudFactory("purchases_accounts", {
  withRestore: true,
  withDeleted: true,
});
// Initial state
const initialState = {
  purchases_accounts: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};
// Create slice
const PurchasesAccountsSlice = createSlice({
  name: "purchases_accounts",
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
      key: "purchases_accounts",
    });
  },
});
// Export
export const { clearState } = PurchasesAccountsSlice.actions;
export {
  fetchAll as fetchPurchasesAccounts,
  create as addPurchasesAccounts,
  getById as PurchasesAccountsRecord,
  update as updateRecord,
  remove as deleteRecord,
  restore as restoreRecord,
  fetchDeleted as fetchDeletedPurchasesAccounts,
};
export default PurchasesAccountsSlice.reducer;