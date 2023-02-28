import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ApplicantQuestion,
  ApplicantAnswer,
} from "../../utils/ApplicantQuestionTypes";
import { addApplicantAnswerThunk } from "../../user/thunks";
import { Navigate } from "react-router";

import "./ApplicantQuestion.css";

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionInput = ({ question }: PropTypes) => {
  const [submit, setSubmit] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string[]>([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch<any>();

  const handleSubmit = () => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    try {
      dispatch(
        addApplicantAnswerThunk({
          questionId: question.id,
          applicantId: currentUser,
          answers: answer,
        })
      );
      setSubmit(true);
      console.log("Submit worked properly I think");
    } catch (e) {
      console.log("Error submitting");
    }
  };

  if (question.possibleAnswers) {
    const options = question.possibleAnswers.map((answerOption, index) => {
      return (
        <div>
          <input
            type="checkbox"
            className="box"
            onChange={(e) => {
              if (e.target.checked) {
                setAnswer([...answer, e.target.value]);
                console.log(answer);
              } else {
                setAnswer([...answer.filter((a) => a !== e.target.value)]);
                console.log(answer);
              }
            }}
            value={answerOption}
          />
          <span>
            {answerOption}
            <br />
          </span>
        </div>
      );
    });

    return (
      <div className="question">
        <span>{question.questionContent}</span>
        <div>{options}</div>
        <div className="button-div">
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="question">
        <span>{question.questionContent}</span>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer([e.target.value])}
          placeholder="Add answer..."
        />
        <div className="button-div">
          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
    );
  }
};

type PropTypes = {
  question: ApplicantQuestion;
};

export default ApplicantQuestionInput;
