import { createSlice } from "@reduxjs/toolkit";
import { AppInitialState } from "../types/app.types";

const initialState: AppInitialState = {
  isLoading: false,
  isDarkTheme: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
