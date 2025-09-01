import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch all positions
export const fetchPositions = createAsyncThunk(
  "positions/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/positions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return {
        data: response.data.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load data"
      );
    }
  }
);

// Add new position
export const addPosition = createAsyncThunk(
  "positions/add",
  async (positionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/positions/store`, positionData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Lang: i18n.language,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred"
      );
    }
  }
);

// Get one position
export const getPositionRecord = createAsyncThunk(
  "positions/record",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/positions/show/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get record"
      );
    }
  }
);

// Update position
export const updatePosition = createAsyncThunk(
  "positions/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/positions/update`,
        { position_id: id, ...data },
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
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// Delete position
export const deletePosition = createAsyncThunk(
  "positions/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/positions/delete`,
        { position_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete position";
      return rejectWithValue({ message });
    }
  }
);

const positionsSlice = createSlice({
  name: "positions",
  initialState: {
    positions: [],
    selectedPosition: null,
    pagination: null,
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
      state.selectedPosition = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = action.payload;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addPosition.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;

        if (!Array.isArray(state.positions)) {
          state.positions = [];
        }
        state.positions.push(action.payload.data);
      })

      .addCase(addPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getPositionRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPositionRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedPosition = action.payload;
      })
      .addCase(getPositionRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updatePosition.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
        state.selectedPosition = action.payload.data;

        if (Array.isArray(state.positions)) {
          const index = state.positions.findIndex(
            (pos) => pos.id === action.payload.data.id
          );
          if (index !== -1) {
            state.positions[index] = action.payload.data;
          }
        } else {
          state.positions = [action.payload.data];
        }
      })

      .addCase(updatePosition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deletePosition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.isLoading = false;

        if (Array.isArray(state.positions)) {
          state.positions = state.positions.filter(
            (position) => position.id !== action.meta.arg
          );
        } else {
          state.positions = [];
        }
      })

      .addCase(deletePosition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = positionsSlice.actions;
export default positionsSlice.reducer;