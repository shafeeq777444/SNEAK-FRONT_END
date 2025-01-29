import { createSlice } from "@reduxjs/toolkit";
import {loginUser} from './../thunks/userThunk.js'

const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      token: localStorage.getItem("authToken") || null,
      loading: false,
      error: null,
      isAuthenticate:false
    },
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("authToken");
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticate=true;
          localStorage.setItem("authToken", action.payload.token);
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
export const {logout}=authSlice.actions
export default authSlice.reducer