import {createAsyncThunk} from "@reduxjs/toolkit";
import {login, logout, profile, register} from "./services.js";


export const logoutThunk = () => {
    createAsyncThunk(
        'logout',
        async () => await logout()
    )   
}

export const profileThunk = (accessToken: string) => {
    createAsyncThunk(
        'profile',
        async () => await profile(accessToken)
    )
}

export const loginThunk = (user: any) => {
    createAsyncThunk(
        'login',
        async () => await login(user)
    )
}

export const registerThunk = (user: any) => {
    createAsyncThunk(
        'register',
        async () => await register(user)
    )
}
