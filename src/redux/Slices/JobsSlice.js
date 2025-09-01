import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// all job company managements
export const fetchJobs = createAsyncThunk(
  "job_company_managements/fetchAll",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/job_company_managements`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Accept-Language": i18n.language,
          },
        }
      );
      
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed load data";
      return message;
    }
  }
);

// add job
export const addJob = createAsyncThunk(
  "job_company_managements/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/job_company_managements`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Accept-Language": i18n.language,
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
// get job record
export const jobRecord = createAsyncThunk(
  "job_company_managements/jobRecord",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/job_company_managements/${id}`);
      
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      return rejectWithValue({ message });
    }
  }
);
// update job
export const updateJob = createAsyncThunk(
  "job_company_managements/updateJob",
  async ({id,formData}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/job_company_managements/${id}`,formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Accept-Language": i18n.language,
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
// delete job
export const deleteJob = createAsyncThunk(
  "job_company_managements/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/job_company_managements/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete supplier";
      return rejectWithValue({ message });
    }
  }
);
const JobsSlice = createSlice({
  name: "job_company_managements",
  initialState: {
    job_company_managements: [],
    record: null,
    isLoading: false,
    error: null,
    success: null
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job_company_managements = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to load data";
      })
      .addCase(addJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(jobRecord.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(jobRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.record = action.payload.data;
      })
      .addCase(jobRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "Failed to add data";
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job_company_managements = state.job_company_managements.filter(
          (record) => record.id !== action.meta.arg
        );
        state.success = action.payload.message;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
      
  },
});

export const { clearState } = JobsSlice.actions;
export default JobsSlice.reducer;
