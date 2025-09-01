import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all file archive types
export const fetchFileArchiveTypes = createAsyncThunk(
  "file_archive_types/fetchAll",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/file-archive-types`, {
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

// add file archive types
export const addFileArchiveTypes = createAsyncThunk(
  "file_archive_types/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/file-archive-types/store`,
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
// get file archive types record
export const fileArchiveTypesRecord = createAsyncThunk(
  "file_archive_types/fileArchiveTypesRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/file-archive-types/show/${id}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update file archive types
export const updateFileArchiveTypes = createAsyncThunk(
  "file_archive_types/updateFileArchiveTypes",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/file-archive-types/update`,
        { file_archive_id: id, ...formData },
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
// delete file archive
export const deleteFileArchiveTypes = createAsyncThunk(
  "file_archive_types/deleteFileArchiveTypes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/file-archive-types/delete`,
        { file_archive_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete file";
      return rejectWithValue({ message });
    }
  }
);
const FileArchiveTypeSlice = createSlice({
  name: "file_archive_types",
  initialState: {
    file_archive_types: [],
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
      .addCase(fetchFileArchiveTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFileArchiveTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.file_archive_types = action.payload;
      })
      .addCase(fetchFileArchiveTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addFileArchiveTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFileArchiveTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addFileArchiveTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(fileArchiveTypesRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fileArchiveTypesRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(fileArchiveTypesRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateFileArchiveTypes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFileArchiveTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateFileArchiveTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(deleteFileArchiveTypes.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.file_archive_types.data)) {
          state.file_archive_types.data = state.file_archive_types.data.filter(
            (record) => record.file_archive_id !== action.meta.arg
          );
        } else if (Array.isArray(state.file_archive_types)) {
          state.file_archive_types = state.file_archive_types.filter(
            (record) => record.file_archive_id !== action.meta.arg
          );
        }

        state.success = action.payload.message;
      });
  },
});

export const { clearState } = FileArchiveTypeSlice.actions;
export default FileArchiveTypeSlice.reducer;
