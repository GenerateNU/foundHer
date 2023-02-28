import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import usersReducer from './user/reducer';
import Login from './pages/Signin/Signin';
import ApplicantRegister from './pages/ApplicantRegister/ApplicantRegister';
import EmployerRegister from './pages/EmployerRegister/EmployerRegister';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PreRegister from './pages/Pre-register/PreRegister';
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default function App() {
  return (
    <div className='container mt-4 mb-4'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/preregister' element={<PreRegister/>} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register-applicant' element={<ApplicantRegister />} />
            <Route path='/register-employer' element={<EmployerRegister />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
