import {createAsyncThunk} from "@reduxjs/toolkit";
import {login, logout, profile, register, register_applicant, applicant_profile} from "./services";



export const logoutThunk = createAsyncThunk('logout', async () => await logout())

export const profileThunk = createAsyncThunk('profile', async (accessToken: string | null) => await profile(accessToken))

export const loginThunk = createAsyncThunk('login', async (user: any) => await login(user))

export const registerThunk = createAsyncThunk('register', async (user: any) => await register(user))

export const registerApplicantThunk = createAsyncThunk('register_applicant', async (applicant: any) => { 
    return await register_applicant(applicant);
});
export const applicantProfileThunk = createAsyncThunk('applicant_profile',async (accessToken: string | null) => {
    return await applicant_profile(accessToken);
});