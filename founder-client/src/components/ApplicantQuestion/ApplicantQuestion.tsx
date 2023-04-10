import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicantQuestion, ApplicantAnswer, PropTypes } from '../../util/Types';

import { Navigate } from 'react-router-dom';

import './ApplicantQuestion.css';
import { addApplicantAnswerThunk } from '../../services/question/thunks';
import RankingScaleUtil from './RankingQuestion/Ranking';

import MultiRangeSlider from '../SlidingScale/sliding_scale';
import RangeQuestion from './RangeQuestion/RangeQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion/MultipleChoiceQuestion';
import { OpenTextQuestion } from './OpenTextQuestion/OpenTextQuestion';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionInput = ({ question }: PropTypes) => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [mulitple_choice_answer, setMCAnswer] = useState<string[]>([]);
  const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);
  const [open_ended_answer, setOpenEndedAnswer] = useState<string>("");

  const dispatch = useDispatch<any>();
  if (!localStorage.getItem('access_token')) {
    return <Navigate to={'/login'} />;
  }

  if (question.question_type === "multiple_choice") {
    return <MultipleChoiceQuestion question={question}/>
  }

  else if (question.question_type === "open_text") {
    return <OpenTextQuestion question={question}/>

  }
  else if (question.question_type === "ranked") {
    return (
    <div className='question'>
      <RankingScaleUtil question={question}/>
    </div>
    )
  } else {
    return (
      <div className=''>
        <RangeQuestion question={question}/>
      </div>
    )
     
  }
};


export default ApplicantQuestionInput;
