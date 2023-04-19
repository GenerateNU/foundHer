import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addApplicantAnswerThunk } from "../../../services/question/thunks";
import { ApplicantAnswer, PropTypes } from "../../../util/Types";
import "../ApplicantQuestion.css";
import { TextField } from "@mui/material";
export const OpenTextQuestion = ({ question }: PropTypes) => {
    const [open_ended_answer, setOpenEndedAnswer] = useState<string>("");
    const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);

    const dispatch = useDispatch<any>();

    useEffect(() => {
      if (submittedAnswers.some((answer: ApplicantAnswer) => answer.question_id === question.id)) {
        setOpenEndedAnswer(submittedAnswers.findLast((answer: ApplicantAnswer) => answer.question_id === question.id).open_ended_answer)
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
              multiple_choice_answer: [],
              ranked_answer: {},
              open_ended_answer: open_ended_answer
            })
          )
        } catch (e) {
          console.log('Error submitting' + e);
        }
      };
    return(
        <div className='question'>
        <span>{question.question_content}</span>
        < TextField
          multiline
          type='text'
          value={open_ended_answer}
          onChange={e => setOpenEndedAnswer(e.target.value)}
          placeholder='Add answer...'
        />

        <button className="button-div" onClick={() => handleSubmit()}>Submit</button>
      </div>
    );
}
