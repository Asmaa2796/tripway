// src/redux/SalesAccountsSlice.js
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
} = crudFactory("sales_accounts", {
  withRestore: true,
  withDeleted: true,
});
// Initial state
const initialState = {
  sales_accounts: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};
// Create slice
const SalesAccountsSlice = createSlice({
  name: "sales_accounts",
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
      key: "sales_accounts",
    });
  },
});
// Export
export const { clearState } = SalesAccountsSlice.actions;
export {
  fetchAll as fetchSalesAccount,
  create as addSalesAccount,
  getById as SalesAccountRecord,
  update as updateRecord,
  remove as deleteRecord,
  restore as restoreRecord,
  fetchDeleted as fetchDeletedSalesAccount,
};
export default SalesAccountsSlice.reducer;