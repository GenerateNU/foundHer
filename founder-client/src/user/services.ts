import axios from "axios";

const BASE_API_URL = 'http://localhost:8000'

const api = axios.create({withCredentials: true});

export const register = async (user: any) => {
    const response = await api.post(`${BASE_API_URL}/register`, user)
    const newUser = response.data
    return newUser
}

export const login = async (user: any) => {
    const response = await api.post(`${BASE_API_URL}/login`, user)
    return response.data
}

export const logout = async () => {
    const response = await api.post(`${BASE_API_URL}/logout`)
    return response.data
}

export const profile = async (token: any) => {
    const response = await api.get(`${BASE_API_URL}/profile`, { headers: {"Authorization" : `Bearer ${token}`} } )
    return response.data
}

export const getApplicantQuestions = async () => {
    const response = await api.get(`${BASE_API_URL}/all-applicant-questions`)
    return response.data
}

export const addApplicantQuestion = async (question: any) => {
    const response = await api.post(`${BASE_API_URL}/applicant-questions`, question)
    return response.data
}

export const addApplicantAnswer = async (answer: any) => {
    console.log("Added applicant answer with the following data:", answer)
    const response = await api.post(`${BASE_API_URL}/applicant-answers`, answer)
    return response.data
}