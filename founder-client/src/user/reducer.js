import {createSlice} from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk, profileThunk } from "./thunks";


const usersReducer = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        loading: false,
    },
    extraReducers: {
        [logoutThunk.fulfilled]: (state, action) => {
            state.currentUser = null
        },
        [registerThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [loginThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [profileThunk.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
    },
    reducers: {

    }
})

export default usersReducer.reducer;