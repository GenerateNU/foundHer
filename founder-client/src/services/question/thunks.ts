import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  applicantQuestions,
  addApplicantQuestion,
  addApplicantAnswer,
  employerQuestions,
  addEmployerQuestion,
  addEmployerAnswer,
  getApplicantAnswers,
  getApplicantExperience,
  postApplicantExperience
} from './services';

export const getApplicantQuestionsThunk = createAsyncThunk(
  'applicantQuestions',
  async () => await applicantQuestions(),
);

export const addApplicantQuestionThunk = createAsyncThunk(
  'addApplicantQuestion',
  async (question: any) => await addApplicantQuestion(question),
);

export const addApplicantAnswerThunk = createAsyncThunk(
  'addApplicantAnswer',
  async (answer: any) => await addApplicantAnswer(answer),
);

export const getEmployerQuestionsThunk = createAsyncThunk(
  'employerQuestions',
  async () => await employerQuestions(),
);

export const addEmployerQuestionThunk = createAsyncThunk(
  'addEmployerQuestion',
  async (question: any) => await addEmployerQuestion(question),
);

export const addEmployerAnswerThunk = createAsyncThunk(
  'addEmployerAnswer',
  async (answer: any) => await addEmployerAnswer(answer),
);

export const getApplicantAnswerThunk = createAsyncThunk(
  'getApplicantAnswers',
  async (applicantID: string | null) => await getApplicantAnswers(applicantID),
)

export const getApplicantExperienceThunk = createAsyncThunk(
  'getApplicantExperience',
  async (applicantID: string | null) => await getApplicantExperience(applicantID),
)

export const postApplicantExperienceThunk = createAsyncThunk(
  'postApplicantExperience',
  async (experience: any) => await postApplicantExperience(experience),
)