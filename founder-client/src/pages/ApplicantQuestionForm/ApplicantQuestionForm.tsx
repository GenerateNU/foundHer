import React from 'react';
import ApplicantQuestionInput from '../../components/ApplicantQuestion/ApplicantQuestion';
import { ApplicantQuestion } from '../../utils/ApplicantQuestionTypes';

import './ApplicantQuestionForm.css';

const QUESTION_LIST: ApplicantQuestion[] = [
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

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionForm = () => {
  console.log('rendered!');
  const questionsView = QUESTION_LIST.map((q, index) => (
    <ApplicantQuestionInput key={index} question={q} />
  ));

  return (
    <section>
      <h1>Applicant Questions</h1>
      {questionsView}
    </section>
  );
};

export default ApplicantQuestionForm;
