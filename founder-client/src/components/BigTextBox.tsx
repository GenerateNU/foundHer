import React, { useState } from 'react';

function BigTextBox() {
  const [textValue, setTextValue] = useState('');

  function handleTextChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setTextValue(event.target.value);
  }

  return (
    <textarea
      value={textValue}
      onChange={handleTextChange}
      style={{ width: '100%', height: '300px', fontSize: '18px' }}
    />
  );
}

export default BigTextBox;