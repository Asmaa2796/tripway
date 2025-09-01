import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "i18next";

const baseURL = process.env.REACT_APP_BASE_URL;
const user = JSON.parse(localStorage.getItem("userElwnsh"));
const token = user?.token;

axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
axios.defaults.headers.common["Lang"] = i18n.language;

i18n.on("languageChanged", (lng) => {
  axios.defaults.headers.common["Lang"] = lng;
});

// Fetch all attachment types with pagination
export const fetchAllAttachments = createAsyncThunk(
  "attachmentTypes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/attachment-types/all`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Add a new attachment type
export const addAttachment = createAsyncThunk(
  "attachmentTypes/add",
  async ({ name_ar, name_en, type }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/attachment-types/store`, {
        name_ar,
        name_en,
        type,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update an existing attachment type
export const updateAttachment = createAsyncThunk(
  "attachmentTypes/update",
  async ({ id, name_ar, name_en, type }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/attachment-types/update`, {
        attachement_id: id,
        name_ar,
        name_en,
        type,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete an attachment type
export const deleteAttachment = createAsyncThunk(
  "attachmentTypes/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${baseURL}/attachment-types/delete`, {
        attachement_id: id,
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Fetch a specific attachment record by ID
export const getAttachmentRecord = createAsyncThunk(
  "attachmentTypes/getRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/attachment-types/show/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const attachmentTypesSlice = createSlice({
  name: "attachmentTypes",
  initialState: {
    attachments: [],
    pagination: null,
    isLoading: false,
    error: null,
    success: null,
    selectedAttachment: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAttachments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllAttachments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attachments = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllAttachments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getAttachmentRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAttachmentRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedAttachment = action.payload;
      })
      .addCase(getAttachmentRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addAttachment.fulfilled, (state, action) => {
        state.isLoading = false;

        if (!Array.isArray(state.attachments)) {
          state.attachments = [];
        }
        state.attachments.push(action.payload);
        state.success = "Attachment added successfully";
      })
      .addCase(addAttachment.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateAttachment.fulfilled, (state, action) => {
        const index = state.attachments.findIndex(
          (attachment) => attachment.id === action.payload.id
        );
        if (Array.isArray(state.attachments)) {
          const index = state.attachments.findIndex(
            (attachment) => attachment.id === action.payload.data.id
          );
          if (index !== -1) {
            state.attachments[index] = action.payload.data;
          }
        } else {
          state.attachments = [action.payload.data];
        }
        state.success = "Attachment updated successfully";
      })
      .addCase(updateAttachment.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteAttachment.fulfilled, (state, action) => {
        if (Array.isArray(state.attachments)) {
          state.attachments = state.attachments.filter(
            (attachment) => attachment.id !== action.payload
          );
        }
        state.success = "Attachment deleted successfully";
      })

      .addCase(deleteAttachment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearState } = attachmentTypesSlice.actions;
export default attachmentTypesSlice.reducer;
