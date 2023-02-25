import {createAsyncThunk} from "@reduxjs/toolkit";
import {login, logout, profile, register, applicantQuestions, addApplicantQuestion, addApplicantAnswer} from "./services";



export const logoutThunk = createAsyncThunk('logout', async () => await logout())

export const profileThunk = createAsyncThunk('profile', async (accessToken: string | null) => await profile(accessToken))

export const loginThunk = createAsyncThunk('login', async (user: any) => await login(user))

export const registerThunk = createAsyncThunk('register', async (user: any) => await register(user))

export const applicantQuestionsThunk = createAsyncThunk('applicantQuestions', async () => await applicantQuestions())

export const addApplicantQuestionThunk = createAsyncThunk('addApplicantQuestion', async (question: any) => await addApplicantQuestion(question))

export const addApplicantAnswerThunk = createAsyncThunk('addApplicantAnswer', async (answer: any) => await addApplicantAnswer(answer))
