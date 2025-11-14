// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

let Cookie = "othiyil_cookie";

const INITIAL_STATE = {
  category: [],
  products: [],
  videos: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState: INITIAL_STATE,
  reducers: {
    setHomeData: (state, action) => {
      const { category, products } = action.payload;
      state.category = category;
      state.products = products;
      state.videos = action.payload.videos;
    },
  },
});

export const { setHomeData } = homeSlice.actions;
export default homeSlice.reducer;
