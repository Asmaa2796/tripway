import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all furniture questions
export const fetchFurnitureQuestions = createAsyncThunk("furniture_questions/fetchAll", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/furniture-questions`, {
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
});

// add furniture questions
export const addFurnitureQuestions = createAsyncThunk(
  "furniture_questions/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/furniture-questions/store`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue(message);
    }
  }
);
// get furniture questions record
export const furnitureQuestionsRecord = createAsyncThunk(
  "furniture_questions/furnitureQuestionsRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/furniture-questions/show/${id}`);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update furniture questions
export const updateFurnitureQuestions = createAsyncThunk(
  "furniture_questions/updateFurnitureQuestions",
  async ({id,payload}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/furniture-questions/update/${id}`,
        payload,
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
      return rejectWithValue(message);
    }
  }
);
// delete furniture questions
export const deleteFurnitureQuestions = createAsyncThunk(
  "furniture_questions/deleteFurnitureQuestions",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/furniture-questions/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete faq";
      return rejectWithValue({ message });
    }
  }
);
const FurnitureQuestionsSlice = createSlice({
  name: "furniture_questions",
  initialState: {
    furniture_questions: [],
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
      .addCase(fetchFurnitureQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFurnitureQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.furniture_questions = action.payload;
      })
      .addCase(fetchFurnitureQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addFurnitureQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFurnitureQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addFurnitureQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add data";
      })
      .addCase(furnitureQuestionsRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(furnitureQuestionsRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(furnitureQuestionsRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateFurnitureQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFurnitureQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateFurnitureQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Failed to update record";
      })
      .addCase(deleteFurnitureQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFurnitureQuestions.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove from data array inside furniture questions
        if (state.furniture_questions?.data) {
          state.furniture_questions.data = state.furniture_questions.data.filter(
            (record) => record.id !== action.meta.arg
          );
        }

        state.success = action.payload?.message || "Deleted successfully";
      })
      .addCase(deleteFurnitureQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to delete furniture questions";
      });
  },
});

export const { clearState } = FurnitureQuestionsSlice.actions;
export default FurnitureQuestionsSlice.reducer;
