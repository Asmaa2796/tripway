// src/redux/clientsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  crudFactoryV2,
  addCrudExtraReducersV2,
} from "../helpers/CrudToolkitV2";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const getHeaders = (body) => {
  const isFormData = body instanceof FormData;

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Lang: i18n.language,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

// ✅ Custom update thunk for clients
export const updateClients = createAsyncThunk(
  "clients/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      if (data instanceof FormData) {
        data.append("client_id", id);
      }

      const res = await axios.post(
        `${BASE_URL}/clients/update`,
        data, // pass raw FormData directly
        {
          headers: getHeaders(data),
        }
      );

      return { ...res.data, client_id: id };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

// ✅ Create thunks using the updated CRUD factory
const { fetchAll, store, getById, remove, restore, fetchDeleted } =
  crudFactoryV2("clients", {
    withRestore: true,
    withDeleted: true,
  });

// ✅ Initial state
const initialState = {
  clients: [],
  deleted: [],
  record: null,
  isLoading: false,
  error: null,
  success: null,
};

// ✅ Create slice
const clientsSlice = createSlice({
  name: "clients",
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
      update: updateClients,
      remove,
      restore,
      fetchDeleted,
      key: "clients",
      idKey: "client_id",
    });
  },
});

// ✅ Export actions and thunks
export const { clearState } = clientsSlice.actions;

export {
  fetchAll as fetchClients,
  store as addClients,
  getById as getClients,
  remove as deleteClients,
  restore as restoreClients,
  fetchDeleted as fetchDeletedClients,
};

export default clientsSlice.reducer;
