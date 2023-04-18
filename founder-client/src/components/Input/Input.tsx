import React from 'react';

import './Input.css';

const Input = ({
  type,
  inputName,
  inputValue,
  inputOnChange,
}: {
  type: string;
  inputName: string;
  inputValue: string;
  inputOnChange: (newValue: string) => void;
}) => {
  return (
    <div>
      <span>{inputName}</span>
      <input type={type} value={inputValue} onChange={e => inputOnChange(e.target.value)} />
    </div>
  );
};

export default Input;
