import { createSlice } from '@reduxjs/toolkit';
import {
  addApplicantAnswerThunk,
  addApplicantQuestionThunk,
  getApplicantAnswerThunk,
  addEmployerAnswerThunk,
  addEmployerQuestionThunk,
  getApplicantQuestionsThunk,
  getEmployerQuestionsThunk,
} from './thunks';

const initialState: {
  loading: boolean;
  applicantQuestions: any[];
  employerQuestions: any[];
  submittedAnswers: any[];
} = {
  loading: false,
  applicantQuestions: [],
  employerQuestions: [],
  submittedAnswers: [],
};

export const applicantQuestionsReducer = createSlice({
  name: 'applicantQuestions',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(addApplicantAnswerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addApplicantAnswerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedAnswers.push(action.payload);
      })
      .addCase(addApplicantQuestionThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addApplicantQuestionThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getApplicantQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.applicantQuestions = action.payload;
      })
      .addCase(getApplicantQuestionsThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getApplicantAnswerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getApplicantAnswerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedAnswers = action.payload
      })
  },
  reducers: {},
});

export const employerQuestionsReducer = createSlice({
  name: 'employerQuestions',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(addEmployerAnswerThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addEmployerAnswerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.submittedAnswers.push(action.payload);
      })
      .addCase(addEmployerQuestionThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addEmployerQuestionThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmployerQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.applicantQuestions = action.payload;
      })
      .addCase(getEmployerQuestionsThunk.pending, (state, action) => {
        state.loading = true;
      });
  },
  reducers: {},
});
