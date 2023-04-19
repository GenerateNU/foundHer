import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { ApplicantQuestion, ApplicantAnswer, PropTypes } from '../../../util/Types';

import { Navigate } from 'react-router-dom';
import { addApplicantAnswerThunk } from '../../../services/question/thunks';

import './Ranking.css';


interface ProcessQuestionType {
  //what the question is asking
  question_content: string;
  //id of question
  id: number;
  //list of structs - pair of id and string for each possible answer
  possibleAnswers: any[];
}

function processQuestion(question: any, submitted_answers: any): any {
  let processQuestion: ProcessQuestionType = {
    question_content: question.question_content,
    id: question.id,
    possibleAnswers: [],
  };

  if (submitted_answers.some((answer: ApplicantAnswer) => answer.question_id === question.id)) {
    let submitted_answer: ApplicantAnswer = submitted_answers.findLast((answer: ApplicantAnswer) => answer.question_id === question.id)
    processQuestion.possibleAnswers = new Array(question.possible_answers.length);
    for (let [option, ranking] of Object.entries(submitted_answer.ranked_answer)) {
      processQuestion.possibleAnswers[ranking] = {
        option_id: String(ranking),
        option: option
      };
    }
    return processQuestion;
  } 

  for (let option of question.possible_answers) {
    processQuestion.possibleAnswers.push({
      option_id: String(question.possible_answers.indexOf(option)),
      option: option,
    });
  }
  return processQuestion;
}

interface FormattedAnswer {
  [key: string]: number
}

export function RankingScaleUtil({ question }: PropTypes) {
  const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);
  const [processQ, setProcessQ] = useState<ProcessQuestionType>(processQuestion(question, submittedAnswers));
  const [answers, updateAnswers] = useState(processQ.possibleAnswers);
  const [final_ranked_answer, updateRankedAnswer] = useState(formatRankedAnswers(answers));
  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const rankingAnswers = Array.from(answers);
    const [reorderedAnswers] = rankingAnswers.splice(result.source.index, 1);
    rankingAnswers.splice(result.destination.index, 0, reorderedAnswers);

    updateAnswers(rankingAnswers);
    let final_results = formatRankedAnswers(rankingAnswers);
    updateRankedAnswer(final_results);
  }

  useEffect(() => {
    setProcessQ(processQuestion(question, submittedAnswers))
    updateAnswers(processQ.possibleAnswers);
  }, [submittedAnswers])

  function formatRankedAnswers(ranked_answers: any[]) {
    let result: FormattedAnswer = {};
    for (let i =0;i < ranked_answers.length; i++) {
      if (ranked_answers[i]) {
        result[ranked_answers[i].option]= i;
      }
    }
    return result;
  }
  const dispatch = useDispatch<any>();

  const handleSubmit = () => {
    try {
      dispatch(
        addApplicantAnswerThunk({
          question_id: question.id,
          applicant_id: localStorage.getItem('currentUserID'),
          question_type: question.question_type,
          range_answer: {},
          multiple_choice_answer: [],
          ranked_answer: final_ranked_answer,
          open_ended_answer: ""
        })
      )
    } catch (e) {
      console.log('Error submitting' + e);
    }
  };
  
  return (
    <div>
      <header className=''>
        <h4>{processQ.question_content}</h4>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='answers'>
            {provided => (
              <ol {...provided.droppableProps} ref={provided.innerRef} className='custom-counter'>
                {answers.map(({ option_id, option }, index) => {
                  return (
                    <Draggable key={option_id} draggableId={option_id} index={index}>
                      {provided => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='answers'>
                          <div className='answerText'>{option}</div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ol>
            )}
          </Droppable>
        </DragDropContext>
        <div className="button-div">
          <button onClick={() => handleSubmit()}>Next</button>
        </div>

      </header>
    </div>
  );
}

export default RankingScaleUtil;
