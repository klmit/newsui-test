import { createSlice } from "@reduxjs/toolkit";
import { NewsInitiatlState } from "types/news.types";

const initialState: NewsInitiatlState = {
  items: [],
  itemIds: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setItemIds: (state, action) => {
      state.itemIds = action.payload;
    },
  },
});

export const newsReducer = newsSlice.reducer;
export const newsActions = newsSlice.actions;
