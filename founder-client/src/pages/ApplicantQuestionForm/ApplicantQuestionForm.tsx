import React, { useState } from 'react';

import ApplicantQuestionInput from '../../components/ApplicantQuestion/ApplicantQuestion';
import { ApplicantQuestion, ApplicantAnswer} from '../../utils/ApplicantQuestionTypes';
import {useDispatch, useSelector} from "react-redux";
import { applicantQuestionsThunk, addApplicantAnswerThunk } from '../../user/thunks';

import './ApplicantQuestionForm.css';

const QUESTION_LIST: ApplicantQuestion[] = [
  {
    id: 1,
    questionContent: 'What is your name?',
  },
  {
    id: 2,
    questionContent: 'What is your identified gender?',
    possibleAnswers: ['Male', 'Female', 'Non-binary', 'Other'],
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
  {
    id: 6,
    questionContent: 'What kind of a business are you looking to work at?',
    possibleAnswers: ['Micro-sized enterprise (1-15 employees)', 'Small-sized enterprise (15-5 employees)',
      'Medium-sized enterprise (50-250 employees)', 'Large-sized enterprise (250+ employees)',
      'No preference'],
  },
];

const handleSubmitBtn = () => {}
// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionForm = () => {

  const [submit, setSubmit] = useState<boolean>(false);

  const questionsView = QUESTION_LIST.map((q, index) => (
  <ApplicantQuestionInput key={index} question={q} submit={submit} />
  ));

  return (
    <section>
      <h1>Applicant Questions</h1>
      {questionsView}
      <button
        className="btn btn-primary w-100"
        onClick={() => setSubmit(true)}>Submit</button>
    </section>
  );
};

export default ApplicantQuestionForm;
