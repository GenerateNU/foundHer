import React, { useState } from 'react';

import ApplicantQuestionInput from '../../components/ApplicantQuestion/ApplicantQuestion';
import { ApplicantQuestion, ApplicantAnswer} from '../../utils/ApplicantQuestionTypes';
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import './ApplicantQuestionForm.css';
import { getApplicantQuestionsThunk } from '../../question/thunks';

const QUESTION_LIST: ApplicantQuestion[] = [
  {
    id: 1,
    question_content: 'What is your name?',
    possible_answers: []
  },
  {
    id: 2,
    question_content: 'What is your identified gender?',
    possible_answers: ['Male', 'Female', 'Non-binary', 'Other'],
  }
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionForm = () => {
  const {applicantQuestions} = useSelector((state: any) => state.applicantQuestions);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getApplicantQuestionsThunk());
  }, [])
  const questionsView = applicantQuestions.map((q: { id: any; question_content: string; possible_answers: string[]; }) => (
  <ApplicantQuestionInput key={q.id} question={q} />
  ));

  return (
    <section>
      <h1>Applicant Questions</h1>
      {questionsView}
    </section>
  );
};

export default ApplicantQuestionForm;
