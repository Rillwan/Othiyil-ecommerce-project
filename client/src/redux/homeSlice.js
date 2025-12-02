// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

let Cookie = "othiyil_cookie";

const INITIAL_STATE = {
  category: [],
  products: [],
  videos: [],
  activeCategory:[],
};

const homeSlice = createSlice({
  name: "home",
  initialState: INITIAL_STATE,
  reducers: {
    setHomeData: (state, action) => {
      const { category, products, activeCategory } = action.payload;
      state.category = category;
      state.products = products;
      state.videos = action.payload.videos;
      state.activeCategory = activeCategory;
    },
  },
});

export const { setHomeData } = homeSlice.actions;
export default homeSlice.reducer;
