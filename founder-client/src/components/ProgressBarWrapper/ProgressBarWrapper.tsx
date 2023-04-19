import React, { Children, useState } from 'react';
import ProgressBar from './ProgressBar/ProgressBar';
import './ProgressBarWrapper.css';
import { Navigate, useNavigate } from 'react-router-dom';
const ProgressBarWrapper = (props: { children: React.ReactNode; markerTitles: string[] }) => {
  const [index, setIndex] = useState(0);
  const elements = Children.toArray(props.children);
  const maxLength = elements.length;

  const buttonText = index !== maxLength - 1 ? 'Next' : 'Finish';
  const navigate = useNavigate();
  const handleOnNext = () => {
    if (index === maxLength - 1) {
      navigate("/home");
    } else {
      setIndex(index + 1);
    }
  };
  const switchIndex = (newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <section>
      <ProgressBar
        index={index}
        maxLength={maxLength}
        markers={props.markerTitles}
        handleOnClick={switchIndex}
      />

      {elements[index]}
      <button onClick={() => handleOnNext()}>{buttonText}</button>
      {index > 0 ? <button onClick={() => setIndex(index - 1)}>Back</button> : <></>}
    </section>
  );
};

export default ProgressBarWrapper;
