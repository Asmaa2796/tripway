// src/redux/RelatedPartyAccountsSlice.js
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
} = crudFactory("related_party_accounts", {
  withRestore: true,
  withDeleted: true,
});
// Initial state
const initialState = {
  related_party_accounts: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};
// Create slice
const RelatedPartyAccountsSlice = createSlice({
  name: "related_party_accounts",
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
      key: "related_party_accounts",
    });
  },
});
// Export
export const { clearState } = RelatedPartyAccountsSlice.actions;
export {
  fetchAll as fetchRelatedPartyAccounts,
  create as addRelatedPartyAccounts,
  getById as RelatedPartyAccountsRecord,
  update as updateRecord,
  remove as deleteRecord,
  restore as restoreRecord,
  fetchDeleted as fetchDeletedRelatedPartyAccounts,
};
export default RelatedPartyAccountsSlice.reducer;