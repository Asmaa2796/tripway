import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Thunks
export const fetchOfficeDocumentTypes = createAsyncThunk(
  "office_document_types/fetchAll",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/office-document-types/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );

      return response.data.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to load data");
    }
  }
);
// fetch by type
export const fetchDocumentsByType = createAsyncThunk(
  "office_document_types/fetchByType",
  async (typeSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/office-document-types/${typeSlug}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Lang: i18n.language,
          },
        }
      );
      return response.data.data.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Fetch by type failed",
      });
    }
  }
);

export const fetchDeletedDoc = createAsyncThunk(
  "office_document_types/fetchDeleted",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/office-document-types/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );
      return response.data.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to load deleted data"
      );
    }
  }
);

export const addOfficeDoc = createAsyncThunk(
  "office_document_types/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/office-document-types/store`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Add failed",
      });
    }
  }
);

export const officeDocTypesRecord = createAsyncThunk(
  "office_document_types/officeDocTypesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/office-document-types/show/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Record load failed",
      });
    }
  }
);

export const updateOfficeDoc = createAsyncThunk(
  "office_document_types/updateOfficeDoc",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/office-document-types/update`,
        { document_id: id, ...formData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Update failed",
      });
    }
  }
);
export const restoreRecord = createAsyncThunk(
  "office_document_types/restoreRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/office-document-types/restore`,
        { document_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Lang: i18n.language,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Update failed",
      });
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "office_document_types/deleteRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/office-document-types/delete`,
        { document_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { ...response.data, id };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Delete failed",
      });
    }
  }
);

// Slice
const OfficeDocumentTypeSlice = createSlice({
  name: "office_document_types",
  initialState: {
    all: [],
    byType: {},
    deleted: [],
    record: null,
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchOfficeDocumentTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfficeDocumentTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all = action.payload; // store full list here
      })
      .addCase(fetchOfficeDocumentTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //   get by type
      .addCase(fetchDocumentsByType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocumentsByType.fulfilled, (state, action) => {
        state.isLoading = false;
        const type = action.meta.arg; // the slug you passed
        state.byType[type] = action.payload; // store each type separately
      })
      .addCase(fetchDocumentsByType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Fetch Deleted
      .addCase(fetchDeletedDoc.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeletedDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deleted = action.payload;
      })
      .addCase(fetchDeletedDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addOfficeDoc.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOfficeDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addOfficeDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Record
      .addCase(officeDocTypesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(officeDocTypesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(officeDocTypesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Update
      .addCase(updateOfficeDoc.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOfficeDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateOfficeDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // restore
      .addCase(restoreRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(restoreRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Delete
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
  state.isLoading = false;

  // Remove from "all"
  state.all = state.all.filter((item) => item.id !== action.payload.id);

  // Also remove from every byType bucket
  Object.keys(state.byType).forEach((type) => {
    state.byType[type] = state.byType[type].filter(
      (item) => item.id !== action.payload.id
    );
  });

  state.success = action.payload.message;
})

      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = OfficeDocumentTypeSlice.actions;
export default OfficeDocumentTypeSlice.reducer;
