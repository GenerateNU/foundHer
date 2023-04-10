import {createAsyncThunk} from "@reduxjs/toolkit";
import {applicantQuestions, addApplicantQuestion, addApplicantAnswer} from "./services";



export const getApplicantQuestionsThunk = createAsyncThunk('applicantQuestions', async () => await applicantQuestions())

export const addApplicantQuestionThunk = createAsyncThunk('addApplicantQuestion', async (question: any) => await addApplicantQuestion(question))

export const addApplicantAnswerThunk = createAsyncThunk('addApplicantAnswer', async (answer: any) => await addApplicantAnswer(answer))
