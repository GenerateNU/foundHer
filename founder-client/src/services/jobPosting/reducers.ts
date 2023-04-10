
import {createSlice} from "@reduxjs/toolkit";
import {getPostingsForApplicantThunk } from "./thunks";
import { JobPosting } from "../../util/Types";

const initialState: {loading: boolean, jobPostings: JobPosting[], submittedApplications: any[]} = {
    loading: true,
    jobPostings: [],
    submittedApplications: [],
};

const jobPostingsReducer = createSlice({
    name: 'jobPostings',
    initialState: initialState,
    extraReducers: builder => {
        builder
          .addCase(getPostingsForApplicantThunk.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getPostingsForApplicantThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobPostings = action.payload;
          })
    },
    reducers: {
    }
})

export default jobPostingsReducer.reducer;