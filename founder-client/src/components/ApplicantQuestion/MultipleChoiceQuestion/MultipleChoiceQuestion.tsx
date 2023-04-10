import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addApplicantAnswerThunk } from "../../../services/question/thunks";
import { PropTypes } from "../../../util/Types";


export const MultipleChoiceQuestion = ({ question }: PropTypes) => {
    const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);
    const [mulitple_choice_answer, setMCAnswer] = useState<string[]>([]);
    const dispatch = useDispatch<any>();
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
            <input
              type='checkbox'
              onChange={e => {
                if (e.target.checked) {
                  setMCAnswer([...mulitple_choice_answer, e.target.value]);
                } else {
                  setMCAnswer([...mulitple_choice_answer.filter(a => a !== e.target.value)]);
                }
              }}
              value={answerOption}
            />
            <span>
              {answerOption}
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
}