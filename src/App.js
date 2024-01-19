import React, { useState, useEffect } from 'react';
import { FaCalculator } from 'react-icons/fa';
import './App.css';

function App() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(60);
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]); // New state to store fetched data

  useEffect(() => {
    fetch('http://192.168.100.38:3001/data') // Adjust this URL as needed
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData); // Store the data in state
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const calculateBMI = () => {
    const bmiValue = (weight / (height / 100) ** 2).toFixed(2);
    setBmi(bmiValue);
    setStatus(getBMIStatus(bmiValue));
  };

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return {label: 'Underweight', color: '#FF8C00'};
    if (bmi >= 18.5 && bmi < 24.9) return {label: 'Normal weight', color: '#006400'};
    if (bmi >= 24.9 && bmi < 29.9) return {label: 'Overweight', color: '#FF8C00'};
    return {label: 'Obesity', color: '#8B0000'};
  };

  const handleHeightChange = (event) => {
    setHeight(Number(event.target.value));
  };

  const handleWeightChange = (event) => {
    setWeight(Number(event.target.value));
  };

  return (
    
    <div className="App">
      <div className="App">
        {/* ... (rest of your JSX) */}
        <div>
          <h2>Data from Database</h2>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li> // Display each item
            ))}
          </ul>
        </div>
      </div>
      <div className="bmi-container">
        <h1>BMI Calculator</h1>
        <div className="inputs">
          <div className="input-box">
            <label>Height (cm)</label>
            <div className="input-buttons">
              <button onClick={() => setHeight(height - 1)}>-</button>
              <input type="number" value={height} onChange={handleHeightChange} />
              <button onClick={() => setHeight(height + 1)}>+</button>
            </div>
          </div>
          <div className="input-box">
            <label>Weight (kg)</label>
            <div className="input-buttons">
              <button onClick={() => setWeight(weight - 1)}>-</button>
              <input type="number" value={weight} onChange={handleWeightChange} />
              <button onClick={() => setWeight(weight + 1)}>+</button>
            </div>
          </div>
        </div>
        <div className="calculate-box">
          <button className="calculate-button" onClick={calculateBMI}>
            <FaCalculator />
          </button>
        </div>
        {bmi && (
          <div className="result">
            <p>Your BMI is: {bmi}</p>
            <p style={{ color: status.color }}>Status: {status.label}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
