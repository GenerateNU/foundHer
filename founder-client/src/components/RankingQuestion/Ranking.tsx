import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { ApplicantQuestion, ApplicantAnswer } from '../../utils/ApplicantQuestionTypes';

import { Navigate } from 'react-router-dom';

import './Ranking.css';

export type PropTypes = {
  question: ApplicantQuestion;
};

// const possibleAnswers = [
//   {
//     id: "opt1",
//     val: "Friendly colleagues and managers"
//   },
//   {
//     id: "opt2",
//     val: "Being able to earn the most for the job I do"
//   },
//   {
//     id: "opt3",
//     val: "Maximizing skill and career advancement opportunities"
//   }
// ];


interface ProcessQuestionType {
  //what the question is asking
  content: string,
  //id of question
  id: number,
  //list of structs - pair of id and string for each possible answer
  possibleAnswers: any[]

}

function processQuestion({question} : any) : any {

  let processQuestion : ProcessQuestionType = { 
    content : question.content,
    id: question.id,
    possibleAnswers: []
  }

  for (let option of question.possible_answers) {
    processQuestion.possibleAnswers.push( {id: question.possible_answers.indexOf(option), option: option})
  }

  return processQuestion;

}

export function RankingScaleUtil( {question} : PropTypes) {
  
  let processQ : ProcessQuestionType = processQuestion(question);

  const [answers, updateAnswers] = useState(processQ.possibleAnswers);

  function handleOnDragEnd(result : any) {
    if (!result.destination) return;

    const newAnswers = Array.from(answers);
    const [reorderedAnswers] = newAnswers.splice(result.source.index, 1);
    newAnswers.splice(result.destination.index, 0, reorderedAnswers);

    updateAnswers(newAnswers);
  }

  return (
    <div className="App">
      <header className="Ranking-Question">
        <h2>{processQ.content}</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="answers">
            {(provided) => (
              <ol
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="custom-counter"
              >
                {answers.map(({ id, option }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="answers"
                        >
                          <div className="answerText">{option}</div>
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
      </header>
    </div>
  );
}

export default RankingScaleUtil;
