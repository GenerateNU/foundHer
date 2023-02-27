import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  ApplicantQuestion,
  ApplicantAnswer,
} from "../../utils/ApplicantQuestionTypes";
import { addApplicantAnswerThunk } from "../../user/thunks";

import "./ApplicantQuestion.css";

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionInput = ({ question, submit }: PropTypes) => {
  const [answer, setAnswer] = useState<string>("");
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (submit) {
      try {
        dispatch(
          addApplicantAnswerThunk({
            questionId: question.id,
            applicantId: 1,
            answers: [answer],
          })
        );
      } catch (e) {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  if (question.possibleAnswers) {
    const options = question.possibleAnswers.map((answerOption, index) => {
      return (
        <div>
          <input type="checkbox" className="box" />
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
        {/*<div onChange={e => setAnswer(e.target.value)}>*/}
        <div>{options}</div>
      </div>
    );
  } else {
    return (
      <div className="question">
        <span>{question.questionContent}</span>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Add answer..."
        />
      </div>
    );
  }
};

type PropTypes = {
  question: ApplicantQuestion;
  submit: boolean;
};

export default ApplicantQuestionInput;
