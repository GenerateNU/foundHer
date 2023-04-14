import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployerQuestionInput from '../../components/EmployerQuestionInput/EmployerQuestionInput';
import { getEmployerQuestionsThunk } from '../../question/thunks';
import { EmployerQuestion } from '../../utils/EmployerQuestionTypes';

import './EmployerQuestionBoard.css';

const QUESTION_LIST: EmployerQuestion[] = [
  {
    id: 1,
    questionContent: 'What is your name?',
  },
  {
    id: 2,
    questionContent: 'What is your identified gender?',
    possibleAnswers: ['Male', 'Female', 'Non-binary'],
  },
  {
    id: 3,
    questionContent: 'What are your preferred pronouns?',
    possibleAnswers: ['he/him/his', 'she/her/hers', 'they/them/theirs', 'other'],
  },
  {
    id: 4,
    questionContent: 'What position are you applying for?',
  },
  {
    id: 5,
    questionContent: 'Do you have a reference?',
  },
];

const EmployerQuestionForm = () => {
  const { employerQuestions } = useSelector((state: any) => state.employerQuestions);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getEmployerQuestionsThunk());
  }, []);
  const questionsView = employerQuestions.map((q: any, index: number) => (
    <EmployerQuestionInput key={index} question={q} />
  ));

  return (
    <section>
      <h1>Employer Questions</h1>
      {questionsView}
    </section>
  );
};

export default EmployerQuestionForm;