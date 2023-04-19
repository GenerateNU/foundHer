
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ApplicantAnswer, ApplicantQuestion, PropTypes } from '../../../util/Types';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addApplicantAnswerThunk } from '../../../services/question/thunks';
import { useEffect } from 'react';
import "../ApplicantQuestion.css";
const minDistance = 0;


export default function RangeQuestion({ question }: PropTypes) {
  const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);
  const [value1, setValue1] = React.useState<number[]>([+question.min_value, +question.max_value]);
  const [value2, setValue2] = React.useState<number[]>([+question.min_value, +question.max_value]);
  useEffect(() => {
    if (submittedAnswers.some((answer: ApplicantAnswer) => answer.question_id === question.id)) {
      let submitted_answer = submittedAnswers.findLast((answer: ApplicantAnswer) => answer.question_id === question.id)
      let formatted_submitted_answer = [+submitted_answer.range_answer.min_value, +submitted_answer.range_answer.max_value];
      setValue1(formatted_submitted_answer);
    }
  }, [submittedAnswers])

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  function valuetext(value: number) {
    return `${value} ${question.unit}`;
  }
  const dispatch = useDispatch<any>();
  const handleSubmit = () => {
    try {
      dispatch(
        addApplicantAnswerThunk({
          question_id: question.id,
          applicant_id: localStorage.getItem('currentUserID'),
          question_type: question.question_type,
          range_answer: {"min_value": value1[0], "max_value": value1[1]},
          multiple_choice_answer: [],
          ranked_answer: {},
          open_ended_answer: ""
        })
      )
    } catch (e) {
      console.log('Error submitting' + e);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography>
        {question.question_content}
      </Typography>
      <Slider
        aria-label="Always visible"
        value={value1} 
        min={value2[0]}
        max={value2[1]} 
        onChange={handleChange1}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        disableSwap
      />
    
      <button className="button-div" onClick={() => handleSubmit()}>Submit</button>
    
    </Box>
  );
}