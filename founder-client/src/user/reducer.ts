import {createSlice} from "@reduxjs/toolkit";
import { access, stat } from "fs";
import { loginThunk, logoutThunk, registerThunk, profileThunk } from "./thunks";


const usersReducer = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        loading: false,
    },
    extraReducers: builder => {
        builder
          .addCase(logoutThunk.pending, (state, action) => {
            state.currentUser = null;
            state.loading = true;
          })
          .addCase(logoutThunk.fulfilled, (state, action) => {
            state.currentUser = null;
            state.loading = false;
          })
          .addCase(registerThunk.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
          })
          .addCase(registerThunk.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(profileThunk.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
          })
          .addCase(profileThunk.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(loginThunk.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
          })
          .addCase(loginThunk.pending, (state, action) => {
            state.loading = true;
          })
    },
    reducers: {

    }
})

export default usersReducer.reducer;