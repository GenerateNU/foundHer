import React from 'react';

import './ProgressBar.css';

const PADDING_VALUE = 50;

const ProgressBar = ({
  index,
  maxLength,
  markers,
  handleOnClick,
}: {
  index: number;
  maxLength: number;
  markers: string[];
  handleOnClick: (index: number) => void;
}) => {
  const markersList = markers.map((marker, i) => {
    let markerClass = 'marker';
    if (i < index) {
      markerClass = markerClass + ' completed';
    }
    if (i === index) {
      markerClass = markerClass + ' selected';
    }
    return (
      <div className='marker-container' id={`${i}`}>
        <span className={markerClass} onClick={() => (i < index ? handleOnClick(i) : null)}>
          {i + 1}
        </span>
        <span style={{ marginTop: '5px' }}>{marker}</span>
      </div>
    );
  });

  const getFilledProgressBarWidthCSS = () => {
    const width = document.getElementById(`${index}`)?.offsetLeft;
    const barWidth = document.getElementById('markers-wrapper')?.offsetWidth;
    return width && barWidth
      ? `${((width + PADDING_VALUE - getLeftPosition()) / barWidth) * 100}%`
      : `${(index / (maxLength - 1)) * 100}%`;
  };

  const getLeftPosition = () => {
    const left = document.getElementById(`0`)?.clientWidth;
    return left ? left / 2 : 0;
  };

  const getWidth = () => {
    const barWidth = document.getElementById('markers-wrapper')?.offsetWidth;
    return barWidth ? barWidth - getLeftPosition() - PADDING_VALUE : '100%';
  };

  return (
    <div className='progress-bar'>
      <div
        className='bar-bg'
        style={{
          left: getLeftPosition(),
          width: getWidth(),
        }}></div>
      <div
        className='bar'
        style={{
          left: getLeftPosition(),
          width: getFilledProgressBarWidthCSS(),
        }}></div>
      <div id='markers-wrapper'>{markersList}</div>
    </div>
  );
};

export default ProgressBar;
