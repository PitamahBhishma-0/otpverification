import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import axios library
import './App.css';

const App = () => {
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    // Move focus to next input if current input is filled
    if (value !== '' && value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && inputs[index] === '' && index > 0) {
      const newInputs = [...inputs];
      newInputs[index - 1] = '';
      setInputs(newInputs);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain');

    if (/^\d{1,6}$/.test(pasteData)) {
      const newInputs = pasteData.split('').slice(0, 6);
      setInputs(newInputs);
    }
  };

  const handleSubmit = async () => {
    const code = inputs.join('');

    try {
      const response = await axios.post('https://otpverification-axd9.onrender.com/verify', {
        code
      });

      if (response.status === 200) {
        window.location.href = '/success';
      } else {
        setError('Verification Error');
      }
    } catch (error) {
      setError('Network Error');
    }
  };

  return (
      <div className="App">
        <h1>Enter Verification Code:</h1>
        <div className="inputs-container">
          {inputs.map((input, index) => (
              <input
                  key={index}
                  id={`input${index}`}
                  type="text"
                  maxLength="1"
                  value={input}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  onPaste={handlePaste}
              />
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        {error && <p className="error">{error}</p>}
      </div>
  );
};

export default App;
