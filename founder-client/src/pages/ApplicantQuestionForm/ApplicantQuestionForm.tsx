import React, { useState } from 'react';

import ApplicantQuestionInput from '../../components/ApplicantQuestion/ApplicantQuestion';
import { ApplicantQuestion, ApplicantAnswer} from '../../util/Types';
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import './ApplicantQuestionForm.css';
import { getApplicantQuestionsThunk, getApplicantExperienceThunk, postApplicantExperienceThunk } from '../../services/question/thunks';
import './ApplicantQuestionForm.css';
import ProgressBarWrapper from '../../components/ProgressBarWrapper/ProgressBarWrapper';
import Input from '../../components/Input/Input';
import { Checkbox, FormControlLabel } from '@mui/material';
import Uploader from '../../components/FileUpload/FileUpload';
import Logo from '../../Logo.png';


const PROGRESS_BAR_MARKER_TITLES = ['Autofill', 'Work Experience', 'Questions'];

const ApplicantQuestionForm = () => {
  const { applicantQuestions } = useSelector((state: any) => state.applicantQuestions);
  const { experiences } = useSelector((state: any) => state.applicantQuestions);

  const dispatch = useDispatch<any>();

  const [questions, setQuestions] = useState({
    company: '',
    title: '',
    from_: '',
    to_: '',
    description: '',
    location: ''
  });

  function handleSubmit() {
    dispatch(postApplicantExperienceThunk(questions));
  }


  useEffect(() => {
    dispatch(getApplicantQuestionsThunk());
  }, []);

  useEffect(() => {
    dispatch(getApplicantExperienceThunk(localStorage.getItem('currentUserID')));
    console.log(experiences)
    if (experiences && experiences.length > 0) {
      setQuestions({company: experiences[0].company,  title: experiences[0].title, 
        from_: experiences[0].from_, to_: experiences[0].to_ 
      , description: experiences[0].description, location: experiences[0].location  });
    }
  }, [])

  const questionsView = applicantQuestions.map((q: ApplicantQuestion, index: number) => (
    <div style={{ width: '80%', margin: '80px auto' }}>
      <ApplicantQuestionInput key={q.id} question={q} />
    </div>
  ));

  return (
    <section>
      <h1><img src={Logo} alt="FindHer Logo" width='200' height='66'/></h1>
      <ProgressBarWrapper markerTitles={PROGRESS_BAR_MARKER_TITLES}>
        <div style={{ width: '80%', margin: '40px auto' }}>
          <h2>Upload Resume</h2>
          <Uploader/>
        </div>
        <div style={{ width: '80%', margin: '40px auto' }}>
          <h2>Work Experience</h2>
          <div>
            <div
              className='container'
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
              <Input
                type='text'
                inputName='Organization Name'
                inputValue={questions.company}
                inputOnChange={value => setQuestions({ ...questions, company: value })}
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
                  inputValue={questions.from_}
                  inputOnChange={value => setQuestions({ ...questions, from_: value })}
                />
                <Input
                  type='text'
                  inputName='End Date'
                  inputValue={questions.to_}
                  inputOnChange={value => setQuestions({ ...questions, to_: value })}
                />
              </div>
              <div className='item' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                <Input
                  type='text'
                  inputName='Location'
                  inputValue={questions.location}
                  inputOnChange={value => setQuestions({ ...questions, location: value })}
                />

              </div>
              </div>
              <div className='item' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Input
                                type='text'
                                inputName='Description'
                                inputValue={questions.description}
                                inputOnChange={value => setQuestions({ ...questions, description: value })}
                              />
              </div>
            </div>
          </div>
        </div>
        {questionsView}
      </ProgressBarWrapper>
    </section>
  );
};

export default ApplicantQuestionForm;
