import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, profile, register } from './services.js';

export const logoutThunk = () => {
  return createAsyncThunk('logout', async () => await logout());
};

export const profileThunk = (accessToken: string) => {
  return createAsyncThunk('profile', async () => await profile(accessToken));
};

export const loginThunk = (user: any) => {
  return createAsyncThunk('login', async () => await login(user));
};

export const registerThunk = (user: any) => {
  return createAsyncThunk('register', async () => await register(user));
};
