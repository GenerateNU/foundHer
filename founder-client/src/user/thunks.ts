import {createAsyncThunk} from "@reduxjs/toolkit";
import {login, logout, profile, register, register_applicant} from "./services";



export const logoutThunk = createAsyncThunk('logout', async () => await logout())

export const profileThunk = createAsyncThunk('profile', async (accessToken: string | null) => await profile(accessToken))

export const loginThunk = createAsyncThunk('login', async (user: any) => await login(user))

export const registerThunk = createAsyncThunk('register', async (user: any) => await register(user))

export const registerApplicantThunk = createAsyncThunk('registerApplicant', async (applicant: any) => {
    await register_applicant()
})