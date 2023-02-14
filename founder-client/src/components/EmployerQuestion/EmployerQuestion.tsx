import React, { useState } from 'react';

import 'EmployerQuestion.css';

type EmployerQuestion = {
  questionText: string,
  answerText: string
}

const EmployerQuestion = ({ question } : { question: EmployerQuestion }) => {
  const [answer, setAnswer] = useState<string>(question.answerText);

  return (
    <div className='question'>
      <span>{question.questionText}</span>
      <input 
        type='text'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder='Add answer...'
      />
    </div>
  )
}

export default EmployerQuestion;