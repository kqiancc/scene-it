import React, { useState } from 'react';

const InputDisplay = () => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <h1>User Input Display</h1>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <p>You typed: {userInput}</p>
    </div>
  );
};

export default InputDisplay;
