import React, { useState, useEffect, Dispatch } from 'react';
import { ApplicantQuestion } from '../../utils/ApplicantQuestionTypes';
import './ApplicantQuestion.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApplicantQuestionInput = ({ question, dispatchAnswer }: PropTypes) => {
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    dispatchAnswer({questionId: question.id, answers: [answer]});
  }, [answer, dispatchAnswer, question.id])

  if (question.possibleAnswers) {
    const options = question.possibleAnswers.map((answerOption, index) => {
      
      return (
        
        <div>
        <input type="checkbox" className='box'/>
        <span>
          {answerOption}<br/>
        </span>
        </div>
      );
    });
    
    return (
      <div className='question'>
        <span>{question.questionContent}</span>
        {/*<div onChange={e => setAnswer(e.target.value)}>*/ }
          <div>
          {options}
          
        </div>
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

type PropTypes = { 
  question: ApplicantQuestion, 
  dispatchAnswer: Dispatch<{ questionId: number, answers: string[] }> 
}

export default ApplicantQuestionInput;
