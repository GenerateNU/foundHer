import React, { useState } from 'react';

import ApplicantQuestionInput from '../../components/ApplicantQuestion/ApplicantQuestion';
import { ApplicantQuestion, ApplicantAnswer} from '../../utils/Types';
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import './ApplicantQuestionForm.css';
import { getApplicantQuestionsThunk } from '../../question/thunks';


// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionForm = () => {
  const {applicantQuestions} = useSelector((state: any) => state.applicantQuestions);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getApplicantQuestionsThunk());
  }, [])
  const questionsView = applicantQuestions.map((q: ApplicantQuestion, index: number) => (
    <div>
      <span>
      {index + 1}
      </span>
      <span>
        <ApplicantQuestionInput key={q.id} question={q} />
      </span>
      
    </div>

  
  ));

  return (
    <div>
      <h1>Applicant Questions</h1>
      {questionsView}
    </div>
  );
};

export default ApplicantQuestionForm;
