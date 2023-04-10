import axios from "axios";

const BASE_API_URL = 'http://localhost:8000'

const api = axios.create({withCredentials: true});

export const getPostingsForApplicant = async (applicantID: number) => {
    // const response = await api.get(`${BASE_API_URL}/postings/?applicantid=${applicantID}`);
    const response = await api.get(`${BASE_API_URL}/all-job-postings`);
    return response.data;
}

export const applyToJobPosting = async (applicantID: number, jobPostingID: number) => {
}



