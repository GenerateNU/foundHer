import React from 'react';

import styles from './Input.module.css';

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
      <span className={styles.span}>{inputName}</span>
      <input
        className={styles.input}
        type={type}
        value={inputValue}
        onChange={e => inputOnChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
