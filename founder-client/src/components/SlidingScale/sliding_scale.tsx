import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";
import classnames from "classnames";
import "./sliding_scale.css";
import { ApplicantAnswer, ApplicantQuestion } from "../../util/Types";
import { addApplicantAnswerThunk } from '../../services/question/thunks';
import { useDispatch, useSelector } from 'react-redux';

interface MultiRangeSliderProps {
  question: ApplicantQuestion
  onChange: Function;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  question,
  onChange
}) => {
  const [minVal, setMinVal] = useState(question.min_value);
  const [maxVal, setMaxVal] = useState(question.max_value);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const { submittedAnswers } = useSelector((state: any) => state.applicantQuestions);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - question.min_value) / (question.max_value - question.min_value)) * 100),
    [question.min_value, question.max_value]
  );
  const dispatch = useDispatch<any>();
  const handleSubmit = () => {
    try {
      dispatch(
        addApplicantAnswerThunk({
          question_id: question.id,
          applicant_id: localStorage.getItem('currentUserID'),
          question_type: question.question_type,
          range_answer: {"min": minVal, "max": maxVal},
          multiple_choice_answer: [],
          ranked_answer: {},
          open_ended_answer: ""
        })
      )
    } catch (e) {
      console.log('Error submitting' + e);
    }
  };
  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number
      let left_value = document.getElementsByClassName('slider__left-value')[0].setAttribute("style", "left:" + (minPercent).toString() + "%");

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
         
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
    
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      document.getElementsByClassName('slider__right-value')[0].setAttribute("style", "left:" + (maxPercent - 5).toString() + "%");

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
        
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={question.min_value}
        max={question.max_value}
        value={minVal}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > question.max_value - 100
        })}
      />
      <input
        type="range"
        min={question.min_value}
        max={question.max_value}
        value={maxVal}
        ref={maxValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>

      <div className="button-div">
          <button onClick={() => handleSubmit()}>Submit</button>
      </div>
        {submittedAnswers.some((answer: ApplicantAnswer) => answer.question_id === question.id) && (
          <div> success!</div>
        )}
    </div>
  );
};

export default MultiRangeSlider;
