
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ApplicantAnswer, ApplicantQuestion, PropTypes } from '../../../utils/Types';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addApplicantAnswerThunk } from '../../../question/thunks';
import "./RangeQuestion.css"


const minDistance = 0;


export default function RangeQuestion({ question }: PropTypes) {
  const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);
  const [value1, setValue1] = React.useState<number[]>([question.min_value, question.max_value]);

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
        onChange={handleChange1}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        disableSwap
      />
    <div className="button-div">
          <button onClick={() => handleSubmit()}>Next</button>
        </div>
        {submittedAnswers.some((answer: ApplicantAnswer) => answer.question_id === question.id) && (
          <div> success!</div>
        )}
    </Box>
  );
}