// src/redux/helpers/crudToolkit.js
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

export const crudFactoryV2 = (resourceName, options = {}) => {
  const { withRestore = false, withDeleted = false } = options;

  const fetchAll = createAsyncThunk(
    `${resourceName}/fetchAll`,
    async (_, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${BASE_URL}/${resourceName}`, {
          headers: getHeaders(),
        });
        return res.data.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch");
      }
    }
  );

  const store = createAsyncThunk(
    `${resourceName}/store`,
    async (formData, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${BASE_URL}/${resourceName}/store`, formData, {
          headers: getHeaders(formData),
        });
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to store");
      }
    }
  );

  const update = createAsyncThunk(
    `${resourceName}/update`,
    async ({id,data}, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${BASE_URL}/${resourceName}/update`, data, {
          headers: getHeaders(data),
        });
        return { ...res.data, user_id: id };
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to update");
      }
    }
  );

  const remove = createAsyncThunk(
    `${resourceName}/delete`,
    async (formData, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${BASE_URL}/${resourceName}/delete`, formData, {
          headers: getHeaders(formData),
        });
        return { ...res.data, user_id: formData.user_id };
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to delete");
      }
    }
  );

  const getById = createAsyncThunk(
    `${resourceName}/getById`,
    async (id, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${BASE_URL}/${resourceName}/show/${id}`, {
          headers: getHeaders(),
        });
        return res.data.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || "Failed to fetch record");
      }
    }
  );

  const restore = withRestore
    ? createAsyncThunk(
        `${resourceName}/restore`,
        async (id, { rejectWithValue }) => {
          try {
            const res = await axios.post(`${BASE_URL}/${resourceName}/${id}/restore`, {}, {
              headers: getHeaders(),
            });
            return { ...res.data, id };
          } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to restore");
          }
        }
      )
    : undefined;

  const fetchDeleted = withDeleted
    ? createAsyncThunk(
        `${resourceName}/fetchDeleted`,
        async (_, { rejectWithValue }) => {
          try {
            const res = await axios.get(`${BASE_URL}/${resourceName}/delete`, {
              headers: getHeaders(),
            });
            return res.data.data;
          } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch deleted");
          }
        }
      )
    : undefined;

  return {
    fetchAll,
    store,
    update,
    remove,
    getById,
    ...(withRestore && { restore }),
    ...(withDeleted && { fetchDeleted }),
  };
};


export const addCrudExtraReducersV2 = (
  builder,
  {
    fetchAll,
    store,
    update,
    remove,
    getById,
    restore,
    fetchDeleted,
    key,
    idKey = "id",
  }
) => {
  builder
    .addCase(fetchAll.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchAll.fulfilled, (state, action) => {
      state.isLoading = false;
      state[key] = action.payload;
    })
    .addCase(fetchAll.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase(store.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(store.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.message;
    })
    .addCase(store.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase(update.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(update.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.message;
    })
    .addCase(update.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase(remove.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(remove.fulfilled, (state, action) => {
      state.isLoading = false;
      if (Array.isArray(state[key])) {
        state[key] = state[key].filter(
          (item) => item[idKey] !== action.payload[idKey]
        );
      }
      state.success = action.payload.message;
    })
    .addCase(remove.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase(getById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.record = action.payload;
    })
    .addCase(getById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

  // ✅ Add restore handler if enabled
  if (restore) {
    builder
      .addCase(restore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
        state.deleted = state.deleted.filter((item) => item[idKey] !== action.payload[idKey]);
      })
      .addCase(restore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }

  // ✅ Add fetchDeleted handler if enabled
  if (fetchDeleted) {
    builder
      .addCase(fetchDeleted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleted = action.payload;
      })
      .addCase(fetchDeleted.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
};
