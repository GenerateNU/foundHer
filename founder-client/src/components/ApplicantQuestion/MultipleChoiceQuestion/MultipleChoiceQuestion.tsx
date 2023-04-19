import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addApplicantAnswerThunk } from "../../../services/question/thunks";
import { ApplicantAnswer, PropTypes } from "../../../util/Types";
import { Checkbox } from "@mui/material";
import "../ApplicantQuestion.css";
import { stat } from "fs";
export const MultipleChoiceQuestion = ({ question }: PropTypes) => {
    const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);
    const [mulitple_choice_answer, setMCAnswer] = useState<string[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<any>({});
    const dispatch = useDispatch<any>();


    useEffect(() => {
      if (submittedAnswers.some((answer: ApplicantAnswer) => answer.question_id === question.id)) {
        let submitted_answer: ApplicantAnswer = submittedAnswers.findLast((answer: ApplicantAnswer) => answer.question_id === question.id)
        let mc_selection = submitted_answer.multiple_choice_answer;
        let state: any = {}
        for (let option of question.possible_answers) {
          if (mc_selection.includes(option)) {
            state[option] = true;
          } else {
            state[option] = false;
          }
        }
        setSelectedOptions(state);
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

      const Option = ({answerOption}: any) => {
        const [state, changeState] = useState<boolean>(false);
        return (
          <div>
            <Checkbox
            onChange={e => {
              selectedOptions[answerOption] = !selectedOptions[answerOption]
              changeState(!state);
              if (e.target.checked) {
                setMCAnswer([...mulitple_choice_answer, e.target.value]);
              } else {
                setMCAnswer([...mulitple_choice_answer.filter(a => a !== e.target.value)]);
              }
              
            }}
            checked={selectedOptions[answerOption]}
            value={answerOption}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>
              {answerOption}
            </span>
          </div>
            )
      }
    
  
      return (
        <div className='question'>
          <span>{question.question_content}</span>
          <div>
            {question.possible_answers.map((answerOption, index) => {
              return (<Option key={index} answerOption={answerOption}/>)
            })}
          </div>
          <div className='button-div'>
            <button onClick={() => handleSubmit()}>Submit</button>
          </div>
        </div>
        );
}