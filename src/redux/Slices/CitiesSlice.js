import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import i18n from "../../i18n/i18n";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch all cities
export const fetchCities = createAsyncThunk(
  "cities/fetchAll",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cities?page=${page}`, {
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
export const fetchWinchCities = createAsyncThunk(
  "cities/fetchWinchCity",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/winch-cities?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Lang": i18n.language,
          },
        }
      );
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
// Fetch a specific city
export const fetchCity = createAsyncThunk(
  "cities/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cities/show/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Lang": i18n.language,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load city data"
      );
    }
  }
);

// Add a new city
export const addCity = createAsyncThunk(
  "cities/add",
  async (cityData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/cities/store`, cityData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unknown error occurred"
      );
    }
  }
);

// Update an existing city
export const updateCity = createAsyncThunk(
  "cities/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const payload = { city_id: id, ...data };
      const response = await axios.post(`${BASE_URL}/cities/update`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Lang": i18n.language,
        },
      });
      console.log("Update Response:", response.data);
      return response.data.data; // إرجاع البيانات المطلوبة فقط
    } catch (error) {
      console.error("Update Error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// Delete a city
export const deleteCity = createAsyncThunk(
  "cities/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/cities/delete`,
        { city_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete city"
      );
    }
  }
);

const CitySlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    winchCities: [],
    selectedCity: null,
    isLoading: false,
    pagination: null,
    error: null,
    addSuccess: null,
    updateSuccess: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.updateSuccess = null;
      state.selectedCity = null;
      state.selectedCity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchWinchCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWinchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.winchCities = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchWinchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedCity = null;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCity = action.payload;
      })
      .addCase(fetchCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addSuccess = true;
        state.cities.push(action.payload);
      })
      .addCase(addCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateSuccess = true;
        const updatedCity = action.payload;
        const index = state.cities.findIndex(
          (city) => city.id === updatedCity.id
        );
        if (index !== -1) {
          state.cities[index] = updatedCity;
        }
      })

      .addCase(updateCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = state.cities.filter(
          (city) => city.id !== action.payload
        );
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = CitySlice.actions;
export default CitySlice.reducer;
