import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch all countries
export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/countries?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return {
        data: response.data.data.data,
        pagination: response.data.data.pagination, 
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load data"
      );
    }
  }
);

export const fetchAllCountries = createAsyncThunk(
  "countries/fetchAllCountries",
  async (_, { rejectWithValue }) => {
    try {
      let allCountries = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(`${BASE_URL}/countries?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Lang": i18n.language,
          },
        });

        const { data, pagination } = response.data.data;

        // Append data to the full list
        allCountries = [...allCountries, ...data];

        // Check if there are more pages
        hasMore = pagination.current_page < pagination.last_page;
        currentPage++;
      }

      return allCountries;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load data"
      );
    }
  }
);

// Fetch a specific country
export const fetchCountry = createAsyncThunk(
  "countries/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/countries/show/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Lang": i18n.language,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load country data"
      );
    }
  }
);

// Add a new country
export const addCountry = createAsyncThunk(
  "countries/add",
  async (countryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/countries/store`, countryData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
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

// Update an existing country
export const updateCountry = createAsyncThunk(
  "countries/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const payload = { country_id: id, ...data };
      const response = await axios.post(`${BASE_URL}/countries/update`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// Delete a country
export const deleteCountry = createAsyncThunk(
  "countries/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/countries/delete`,
        { country_id: id }, // this is the body (2nd argument)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return id; // Return ID of the deleted country
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete country";
      return rejectWithValue({ message });
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    allCountries : [],
    selectedCountry: null,
    isLoading: false,
    pagination: null,
    error: null,
    success: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = null;
      state.selectedCountry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
       .addCase(fetchAllCountries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCountries = action.payload;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addCountry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.countries.push(action.payload.data);
      })
      .addCase(addCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchCountry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedCountry = null;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCountry = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCountry.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;
        const index = state.countries.findIndex(
          (country) => country.id === action.payload.data.id
        );
        if (index !== -1) {
          state.countries[index] = action.payload.data;
        }
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countries = state.countries.filter(
          (country) => country.id !== action.payload
        );
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearState } = countriesSlice.actions;
export default countriesSlice.reducer;
