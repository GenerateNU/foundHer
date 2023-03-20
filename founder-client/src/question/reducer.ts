
import {createSlice} from "@reduxjs/toolkit";
import { access, stat } from "fs";
import {addApplicantAnswerThunk, addApplicantQuestionThunk, getApplicantQuestionsThunk } from "./thunks";

const initialState: {loading: boolean, applicantQuestions: any[], submittedAnswers: any[]} = {
    loading: false,
    applicantQuestions: [],
    submittedAnswers: [],
};

const applicantQuestionsReducer = createSlice({
    name: 'applicantQuestions',
    initialState: initialState,
    extraReducers: builder => {
        builder
          .addCase(addApplicantAnswerThunk.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(addApplicantAnswerThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.submittedAnswers.push(action.payload)
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

    },
    reducers: {

    }
})

export default applicantQuestionsReducer.reducer;