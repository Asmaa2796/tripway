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
} = crudFactoryV2("employees", {
  withRestore: true,
  withDeleted: true,
});

// ✅ Initial state
const initialState = {
  employees: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};

// ✅ Create slice
const EmployeesSlice = createSlice({
  name: "employees",
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
      key: "employees",
      idKey: "user_id",
    });
  },
});

// ✅ Export actions and thunks
export const { clearState } = EmployeesSlice.actions;

export {
  fetchAll as fetchEmployees,
  store as addEmployees,
  getById as getEmployeeById,
  update as updateEmployees,
  remove as deleteEmployees,
  restore as restoreEmployees,
  fetchDeleted as fetchDeletedEmployees,
};

export default EmployeesSlice.reducer;
