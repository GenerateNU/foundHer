import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployerQuestionInput from '../../components/EmployerQuestionInput/EmployerQuestionInput';
import { getEmployerQuestionsThunk } from '../../services/question/thunks';
import Logo from '../../Logo.png';

import './EmployerQuestionBoard.css';
import ProgressBarWrapper from '../../components/ProgressBarWrapper/ProgressBarWrapper';
import Input from '../../components/Input/Input';

const PROGRESS_BAR_MARKER_TITLES = ['Company Information', 'Questions'];

const EmployerQuestionForm = () => {
  const { employerQuestions } = useSelector((state: any) => state.employerQuestions);
  const dispatch = useDispatch<any>();

  const [questions, setQuestions] = useState({
    organizationName: '',
    industry: '',
    size: '',
    location: '',
  });

  useEffect(() => {
    dispatch(getEmployerQuestionsThunk());
  }, []);
  const questionsView = employerQuestions.map((q: any, index: number) => (
    <EmployerQuestionInput key={index} question={q} />
  ));

  return (
    <section>
      <h1><img src={Logo} alt="FindHer Logo" width='200' height='66' /></h1>
      <ProgressBarWrapper markerTitles={PROGRESS_BAR_MARKER_TITLES}>
        <div style={{ width: '80%', margin: '80px auto' }}>
          <h2>Company Information</h2>
          <div>
            <div
              className='container'
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
              <Input
                type='text'
                inputName='Name'
                inputValue={questions.organizationName}
                inputOnChange={value => setQuestions({ ...questions, organizationName: value })}
              />
              <Input
                type='text'
                inputName='Industry'
                inputValue={questions.industry}
                inputOnChange={value => setQuestions({ ...questions, industry: value })}
              />
            </div>
            <div
              className='item'
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
              <Input
                type='text'
                inputName='Size'
                inputValue={questions.size}
                inputOnChange={value => setQuestions({ ...questions, size: value })}
              />
              <Input
                type='text'
                inputName='Location'
                inputValue={questions.location}
                inputOnChange={value => setQuestions({ ...questions, location: value })}
              />
            </div>
          </div>
        </div>
        <div style={{ width: '80%', margin: '80px auto' }}>
          <h2>Questions</h2>
          {questionsView}
        </div>
      </ProgressBarWrapper>
      {questionsView}
    </section>
  );
};

export default EmployerQuestionForm;
