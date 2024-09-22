import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/bfhl', JSON.parse(inputJson));
      setResponseData(res.data);
    } catch (error) {
      alert('Invalid JSON or error processing request');
    }
  };

  const handleDropdownChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(selectedValues);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const filteredData = {};
    if (selectedOptions.includes('Numbers')) filteredData.numbers = responseData.numbers.join(',');
    if (selectedOptions.includes('Alphabets')) filteredData.alphabets = responseData.alphabets.join(',');
    if (selectedOptions.includes('Highest lowercase alphabet')) filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet.join(',');

    return (
      <div className="filtered-response">
        <h3>Filtered Response</h3>
        {Object.entries(filteredData).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <fieldset className="json-fieldset">
        <legend>API Input</legend>
        <input
          className="json-input"
          placeholder='{"data":["M","1","334","4","B"]}'
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
        />
      </fieldset>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>

      <div className="multi-filter">
        <fieldset className="json-fieldset">
          <legend>Multi Filter</legend>
          <div className="dropdown-container">
            <select
              value={selectedOptions}
              onChange={handleDropdownChange}
              className="multi-select-dropdown"
            >
              <option value="Numbers">Numbers</option>
              <option value="Alphabets">Alphabets</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </div>
        </fieldset>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
