// src/redux/BanksSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { crudFactoryV2, addCrudExtraReducersV2 } from "../helpers/CrudToolkitV2";

// ✅ Create thunks using the updated CRUD factory
const {
  fetchAll,
  store,
  getById,
  update,
  remove,
  restore,
  fetchDeleted,
} = crudFactoryV2("banks", {
  withRestore: true,
  withDeleted: true,
});

// ✅ Initial state
const initialState = {
  banks: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};

// ✅ Create slice
const BanksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    addCrudExtraReducersV2(builder, {
      fetchAll,
      store,
      getById,
      update,
      remove,
      restore,
      fetchDeleted,
      key: "banks",
      idKey: "bank_id"
    });
  },
});

// ✅ Export actions and thunks
export const { clearState } = BanksSlice.actions;

export {
  fetchAll as fetchBanks,
  store as addBank,
  getById as getBank,
  update as updateBank,
  remove as deleteBank,
  restore as restoreBank,
  fetchDeleted as fetchDeletedBank,
};

export default BanksSlice.reducer;
