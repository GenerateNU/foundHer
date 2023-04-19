import axios from "axios";

const BASE_API_URL = 'http://localhost:8000'

const api = axios.create({withCredentials: true});

export const getPostingsForApplicant = async (applicantID: number) => {
    // const response = await api.get(`${BASE_API_URL}/postings/?applicantid=${applicantID}`);
    const response = await api.get(`${BASE_API_URL}/job-posting/applicant:${applicantID}`);
    return response.data;
}

export const applyToJobPosting = async (applicantID: number, jobPostingID: number) => {
}



