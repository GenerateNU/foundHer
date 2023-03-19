import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000';

const api = axios.create({ withCredentials: true });

export const applicantQuestions = async () => {
  const response = await api.get(`${BASE_API_URL}/all-applicant-questions`);
  return response.data;
};

export const addApplicantQuestion = async (question: any) => {
  const response = await api.post(`${BASE_API_URL}/applicant-questions`, question);
  return response.data;
};

interface Answer {
  user_id: string;
}

export const addApplicantAnswer = async (answer: any) => {
  const response = await api.post(`${BASE_API_URL}/applicant-answers`, answer);
  console.log(response.data);
  return response.data;
};

export const employerQuestions = async () => {
  const response = await api.get(`${BASE_API_URL}/all-employer-questions`);
  return response.data;
};

export const addEmployerQuestion = async (question: any) => {
  const response = await api.post(`${BASE_API_URL}/employer-questions`, question);
  return response.data;
};

export const addEmployerAnswer = async (answer: any) => {
  const response = await api.post(`${BASE_API_URL}/employer-answers`, answer);
  console.log(response.data);
  return response.data;
};
