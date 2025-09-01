import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all document type
export const fetchDocumentType = createAsyncThunk(
  "document_type/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/document-types`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed load data";
      return message;
    }
  }
);

// add document type
export const addDocumentType = createAsyncThunk(
  "document_type/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/document-types/store`,
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
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// get document type record
export const documentTypeRecord = createAsyncThunk(
  "document_type/documentTypeRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/document-types/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update document type
export const updateDocumentType = createAsyncThunk(
  "document_type/updateDocumentType",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/document-types/update`,
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
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// delete document type
export const deleteDocumentType = createAsyncThunk(
  "document_type/deleteDocumentType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/document-types/delete`,
        { document_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete supplier";
      return rejectWithValue({ message });
    }
  }
);
const DocumentTypeSlice = createSlice({
  name: "document_type",
  initialState: {
    document_type: [],
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
      .addCase(fetchDocumentType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocumentType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.document_type = action.payload;
      })
      .addCase(fetchDocumentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addDocumentType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDocumentType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addDocumentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(documentTypeRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(documentTypeRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(documentTypeRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateDocumentType.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDocumentType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateDocumentType.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(deleteDocumentType.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.document_type)) {
          state.document_type = state.document_type.filter(
            (record) => record.id !== action.meta.arg
          );
        } else if (state.document_type?.data) {
          // if it's the object shape { data: [...], pagination: {...} }
          state.document_type = {
            ...state.document_type,
            data: state.document_type.data.filter(
              (record) => record.id !== action.meta.arg
            ),
          };
        }

        state.success = action.payload?.message;
      });
  },
});

export const { clearState } = DocumentTypeSlice.actions;
export default DocumentTypeSlice.reducer;
