import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addApplicantAnswerThunk } from "../../../question/thunks";
import { ApplicantAnswer, PropTypes } from "../../../utils/Types";
import React from "react";
import { Checkbox } from "@mui/material";


export const MultipleChoiceQuestion = ({ question }: PropTypes) => {
    const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);
    const [mulitple_choice_answer, setMCAnswer] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const dispatch = useDispatch<any>();


    useEffect(() => {
      if (submittedAnswers.some((answer: ApplicantAnswer) => answer.question_id === question.id)) {
        let submitted_answer: ApplicantAnswer = submittedAnswers.findLast((answer: ApplicantAnswer) => answer.question_id === question.id)
        let mc_selection = submitted_answer.multiple_choice_answer;
        setSelectedOptions(mc_selection);
      }
    }, [submittedAnswers])

    const handleSubmit = () => {
        try {
          dispatch(
            addApplicantAnswerThunk({
              question_id: question.id,
              applicant_id: localStorage.getItem('currentUserID'),
              question_type: question.question_type,
              range_answer: {},
              multiple_choice_answer: mulitple_choice_answer,
              ranked_answer: {},
              open_ended_answer: ""
            })
          )
        } catch (e) {
          console.log('Error submitting' + e);
        }
      };
    
    const options = question.possible_answers.map((answerOption, index) => {
        return (
        <div>
          <Checkbox
          onChange={e => {
            if (e.target.checked) {
              setMCAnswer([...mulitple_choice_answer, e.target.value]);
            } else {
              setMCAnswer([...mulitple_choice_answer.filter(a => a !== e.target.value)]);
            }
          }}
          value={answerOption}
          inputProps={{ 'aria-label': 'controlled' }}
          />
          <span>
            {answerOption}
          </span>
        </div>
          )
        });
  
      return (
        <div className='question'>
          <span>{question.question_content}</span>
          <div>{options}</div>
          <div className='button-div'>
            <button onClick={() => handleSubmit()}>Next</button>
          </div>
          {submittedAnswers.some((answer: any) => answer.question_id === question.id) && (
            <div> submitted!</div>
          )}
        </div>
        );
}