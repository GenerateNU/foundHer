import React from 'react';

import './ProgressBar.css';

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
      <div className='marker-container'>
        <span className={markerClass} onClick={() => (i < index ? handleOnClick(i) : null)}>
          {i + 1}
        </span>
        <span style={{ marginTop: '5px' }}>{marker}</span>
      </div>
    );
  });

  const getProgressBarWidthCSS = () => {
    const width = (index / (maxLength - 1)) * 100;
    return `${width}%`;
  };

  return (
    <div className='progress-bar'>
      <div className='bar-bg'></div>
      <div
        className='bar'
        style={{
          width: getProgressBarWidthCSS(),
        }}></div>
      <div className='markers-wrapper'>{markersList}</div>
    </div>
  );
};

export default ProgressBar;
