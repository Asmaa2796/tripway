// src/redux/ExampleSlice.js
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
} = crudFactoryV2("example_state", {
  withRestore: true,
  withDeleted: true,
});

// ✅ Initial state
const initialState = {
  example_state: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};

// ✅ Create slice
const ExampleSlice = createSlice({
  name: "example_state",
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
      key: "example_state",
    });
  },
});

// ✅ Export actions and thunks
export const { clearState } = ExampleSlice.actions;

export {
  fetchAll as fetchExample,
  store as addExample,
  getById as getExample,
  update as updateExample,
  remove as deleteExample,
  restore as restoreExample,
  fetchDeleted as fetchDeletedExample,
};

export default ExampleSlice.reducer;
