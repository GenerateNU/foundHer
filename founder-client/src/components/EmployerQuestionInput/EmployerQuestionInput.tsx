import React, { useState } from 'react';
import { EmployerQuestion } from '../../utils/EmployerQuestionTypes';
import './EmployerQuestionInput.css';

const EmployerQuestionInput = ({ question }: { question: EmployerQuestion }) => {
  const [answer, setAnswer] = useState<string>('');

  if (question.possibleAnswers) {
    const options = question.possibleAnswers.map((answer, index) => {
      return (
        <option key={index} value={answer}>
          {answer}
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

export default EmployerQuestionInput;
