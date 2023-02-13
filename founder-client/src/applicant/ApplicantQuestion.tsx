import React, { useState } from 'react';

type ApplicantQuestion = {
    questionText: string,
    answerText: string
}


const ApplicantQuestion: JSX.Element = ({ question } : { question : ApplicantQuestion}) => {
    const [answer, setAnswer] = useState<string>(question.answerText);

    return (
        <>
            <div className='question'>
                <span>{question.questionText}</span>
                <input type='text' value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Add answer...'/>

            </div>
        </>
    )
}

export default ApplicantQuestion;