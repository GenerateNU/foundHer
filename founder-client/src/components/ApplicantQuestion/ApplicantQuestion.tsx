import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicantQuestion, ApplicantAnswer } from '../../utils/ApplicantQuestionTypes';

import { Navigate } from 'react-router-dom';

import './ApplicantQuestion.css';
import { addApplicantAnswerThunk } from '../../question/thunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionInput = ({ question }: PropTypes) => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string[]>([]);
  const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);

  const dispatch = useDispatch<any>();
  if (!localStorage.getItem('access_token')) {
    return <Navigate to={'/login'} />;
  }
  console.log(submittedAnswers);
  const handleSubmit = () => {
    try {
      dispatch(
        addApplicantAnswerThunk({
          question_id: question.id,
          applicant_id: localStorage.getItem('currentUserID'),
          answers: answer,
        }),
      );
    } catch (e) {
      console.log('Error submitting' + e);
    }
  };

  if (question.possible_answers.length > 0) {
    const options = question.possible_answers.map((answerOption, index) => {
      return (
        <div>
          <input
            type='checkbox'
            onChange={e => {
              if (e.target.checked) {
                setAnswer([...answer, e.target.value]);
              } else {
                setAnswer([...answer.filter(a => a !== e.target.value)]);
              }
            }}
            value={answerOption}
          />
          <span>
            {answerOption}
            <br />
          </span>
        </div>
      );
    });

    return (
      <div className='question'>
        <span>{question.question_content}</span>
        <div>{options}</div>
        <div className='button-div'>
          <button onClick={() => handleSubmit()}>Next</button>
        </div>
        {submittedAnswers.some((answer: any) => answer.question_id === question.id) && (
          <div> success!</div>
        )}
      </div>
    );
  } else {
    return (
      <div className='question'>
        <span>{question.question_content}</span>
        <input
          type='text'
          value={answer}
          onChange={e => setAnswer([e.target.value])}
          placeholder='Add answer...'
        />
        <div className="button-div">
          <button onClick={() => handleSubmit()}>Next</button>
        </div>
        {submittedAnswers.some((answer: ApplicantAnswer) => answer.question_id === question.id) && (
          <div> success!</div>
        )}
      </div>
    );
  }
};

type PropTypes = {
  question: ApplicantQuestion;
};

export default ApplicantQuestionInput;
