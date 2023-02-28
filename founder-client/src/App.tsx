import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import usersReducer from './user/reducer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EmployerQuestionForm from './pages/EmployerQuestionBoard/EmployerQuestionBoard';
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
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/employer_questions' element={<EmployerQuestionForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
