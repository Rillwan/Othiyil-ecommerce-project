// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

let Cookie = "othiyil_cookie";

const INITIAL_STATE = {
  auth: {
    token: localStorage.getItem(Cookie) || '',
    loading: true,
    admin: {
      _id: '',
      name: '',
      email: '',
      role: '',
    }
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE.auth,
  reducers: {
    setCredentials: (state, action) => {
      const { admin, token } = action.payload;
      state.admin = admin;
      state.token = token;
      state.loading = false;
      if (token) localStorage.setItem(Cookie, token);
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem(Cookie);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;