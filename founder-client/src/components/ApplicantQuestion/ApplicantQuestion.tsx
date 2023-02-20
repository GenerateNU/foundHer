import React, { useState } from 'react';
import { ApplicantQuestion } from '../../utils/ApplicantQuestionTypes';
import './ApplicantQuestion.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionInput = ({ question }: { question: ApplicantQuestion }) => {
  const [answer, setAnswer] = useState<string>('');
  if (question.possibleAnswers) {
    const options = question.possibleAnswers.map((answerOption, index) => {
      return (
        <option key={index} value={answerOption}>
          {answerOption}
        </option>
      );
    });

    return (
      <div className='question'>
        <span>{question.questionContent}</span>
        <select onChange={e => setAnswer(e.target.value)}>
          <option value='' disabled>
            Select an option
          </option>
          {options}
        </select>
      </div>
    );
  } else {
    return (
      <div className='question'>
        <span>{question.questionContent}</span>
        <input
          type='text'
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder='Add answer...'
        />
      </div>
    );
  }
};

export default ApplicantQuestionInput;
