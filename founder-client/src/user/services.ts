import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000';

const api = axios.create({ withCredentials: true });

export const register = async (user: any) => {
  const response = await api.post(`${BASE_API_URL}/register`, user);
  
  const newUser = response.data;
  return newUser;
};

export const login = async (user: any) => {
  const response = await api.post(`${BASE_API_URL}/applicant-login`, user);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(`${BASE_API_URL}/logout`);
  return response.data;
};

export const profile = async (token: any) => {
    const response = await api.get(`${BASE_API_URL}/applicant-profile`, { headers: {"Authorization" : `Bearer ${token}`} } )
    return response.data
}

export const register_applicant = async (applicant: any) => {
  const response = await api.post(`${BASE_API_URL}/applicant-register`, applicant);
  return response.data;
}

export const applicant_profile = async (token: any) => {
  const response = await api.get(`${BASE_API_URL}/applicant-profile`, {headers: {"Authorization": `Bearer ${token}`}})
  return response.data;
}

export const upload_resume = async (file: any) => {
  const response = await api.post(`${BASE_API_URL}/resume`, file, {headers: {'content-type': 'multipart/form-data',}})
  return response.data;
}