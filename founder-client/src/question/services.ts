import axios from "axios";

const BASE_API_URL = 'http://localhost:8000'

const api = axios.create({withCredentials: true});


export const applicantQuestions = async () => {
    const response = await api.get(`${BASE_API_URL}/all-applicant-questions`)
    return response.data
}

export const addApplicantQuestion = async (question: any) => {
    const response = await api.post(`${BASE_API_URL}/applicant-questions`, question)
    return response.data
}

interface Answer {
    user_id: string,
    
}

export const addApplicantAnswer = async (answer: any) => {
    console.log("Added applicant answer with the following data:", answer)
    const response = await api.post(`${BASE_API_URL}/applicant-answers`, answer)
    return response.data
}