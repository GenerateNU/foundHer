import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import usersReducer from './services/user/reducer';
import Login from './pages/Signin/Signin';
import ApplicantRegister from './pages/ApplicantRegister/ApplicantRegister';
import EmployerRegister from './pages/EmployerRegister/EmployerRegister';
import Home from './pages/Home';
import EmployerQuestionForm from './pages/EmployerQuestionForm/EmployerQuestionBoard';
import Profile from './pages/Profile/Profile';
import PreRegister from './pages/Pre-register/PreRegister';
import ApplicantQuestionForm from './pages/ApplicantQuestionForm/ApplicantQuestionForm';
import jobPostingsReducer from "./services/jobPosting/reducers";
import { applicantQuestionsReducer, employerQuestionsReducer } from './services/question/reducer';
import ProgressBarWrapper from './components/ProgressBarWrapper/ProgressBarWrapper';

const store = configureStore({
  reducer: {
    users: usersReducer,
    jobPostings: jobPostingsReducer,
    applicantQuestions: applicantQuestionsReducer.reducer,
    employerQuestions: employerQuestionsReducer.reducer,
  },
});

export default function App() {
  return (
    <div className='container mt-4 mb-4'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/preregister' element={<PreRegister />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register-applicant' element={<ApplicantRegister />} />
            <Route path='/register-employer' element={<EmployerRegister />} />
            <Route path='/applicant-questions' element={<ApplicantQuestionForm />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/employer-questions' element={<EmployerQuestionForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
