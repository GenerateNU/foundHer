import React, { useState } from 'react';

import ApplicantQuestionInput from '../../components/ApplicantQuestion/ApplicantQuestion';
import { ApplicantQuestion, ApplicantAnswer } from '../../utils/Types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ApplicantQuestionForm.css';
import { getApplicantQuestionsThunk } from '../../question/thunks';
import ProgressBarWrapper from '../../components/ProgressBarWrapper/ProgressBarWrapper';
import Input from '../../components/Input/Input';
import { Checkbox, FormControlLabel } from '@mui/material';

const PROGRESS_BAR_MARKER_TITLES = ['Autofill', 'Work Experience', 'Questions'];

const ApplicantQuestionForm = () => {
  const { applicantQuestions } = useSelector((state: any) => state.applicantQuestions);
  const dispatch = useDispatch<any>();

  const [questions, setQuestions] = useState({
    organizationName: '',
    industry: '',
    title: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    dispatch(getApplicantQuestionsThunk());
  }, []);

  const questionsView = applicantQuestions.map((q: ApplicantQuestion, index: number) => (
    <div>
      <span>{index + 1}</span>
      <span>
        <ApplicantQuestionInput key={q.id} question={q} />
      </span>
    </div>
  ));

  return (
    <section>
      <h1>FindHer</h1>
      <ProgressBarWrapper markerTitles={PROGRESS_BAR_MARKER_TITLES}>
        <div style={{ width: '80%', margin: '80px auto' }}>
          <h2>Upload Resume</h2>
          {/* TODO: Upload Resume Component Here */}
        </div>
        <div style={{ width: '80%', margin: '80px auto' }}>
          <h2>Work Experience</h2>
          <div>
            <div
              className='container'
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
              <Input
                type='text'
                inputName='Organization Name'
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
                inputName='Title'
                inputValue={questions.title}
                inputOnChange={value => setQuestions({ ...questions, title: value })}
              />
              <FormControlLabel
                value='end'
                control={
                  <Checkbox
                    sx={{
                      'color': '#3E2CC0',
                      '&.Mui-checked': {
                        color: '#3E2CC0',
                      },
                    }}
                  />
                }
                label={"I'm currently working here"}
                labelPlacement='end'
              />
            </div>
            <div className='item' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                <Input
                  type='text'
                  inputName='Start Date'
                  inputValue={questions.startDate}
                  inputOnChange={value => setQuestions({ ...questions, startDate: value })}
                />
                <Input
                  type='text'
                  inputName='End Date'
                  inputValue={questions.endDate}
                  inputOnChange={value => setQuestions({ ...questions, endDate: value })}
                />
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div style={{ width: '80%', margin: '80px auto' }}>
          <h2>Matching Questions</h2>
          {questionsView}
        </div>
      </ProgressBarWrapper>
      {questionsView}
    </section>
  );
};

export default ApplicantQuestionForm;
