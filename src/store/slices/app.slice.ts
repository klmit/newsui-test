import { createSlice } from "@reduxjs/toolkit";
import { AppInitialState } from "../types/app.types";

const initialState: AppInitialState = {
  isLoading: false,
  isDarkMode: false,
  errorMessage: "",
  infoMessage: "",
  successMessage: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setInfoMessage: (state, action) => {
      state.infoMessage = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
