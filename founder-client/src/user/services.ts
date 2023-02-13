// import axios from "axios";

// const BASE_API_URL = 'http://localhost:8000'

// const api = axios.create({withCredentials: true});

// export const register = async (user) => {
//     const response = await api.post(`${BASE_API_URL}/register`, user)
//     const newUser = response.data
//     return newUser
// }

// export const login = async (user) => {
//     const response = await api.post(`${BASE_API_URL}/login`, user)
//     return response.data
// }

// export const logout = async () => {
//     const response = await api.post(`${BASE_API_URL}/logout`)
//     return response.data
// }

// export const profile = async (token) => {
//     const response = await api.get(`${BASE_API_URL}/profile`, { headers: {"Authorization" : `Bearer ${token}`} } )
//     return response.data
// }
