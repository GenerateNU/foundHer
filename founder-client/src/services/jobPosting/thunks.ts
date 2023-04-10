import {createAsyncThunk} from "@reduxjs/toolkit";
import {getPostingsForApplicant, applyToJobPosting} from "./services";

export const getPostingsForApplicantThunk = createAsyncThunk('getPostingsForApplicant', async (applicantID: number) => await getPostingsForApplicant(applicantID));
