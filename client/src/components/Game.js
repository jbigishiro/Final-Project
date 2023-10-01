import React, { useState, useEffect } from 'react';

function Game() {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const generateRandomNumbers = () => {
    const randomNumbers = [];
    while (randomNumbers.length < 20) {
      const randomNumber = Math.floor(Math.random() * 20) + 1;
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    setNumbers(randomNumbers);
    setSelectedNumbers([]);
    setTime(0)   // Reset timer when a new game is selected
    setIsRunning(true); // Stop the timer when a new game is selected
  };

  const handleNumberClick = (number) => {

    if (number === selectedNumbers.length + 1) {
      setSelectedNumbers([...selectedNumbers, number]);
      if (number < 20) {
        setIsRunning(true); // Resume the time when a number is clicked
      }
      if (number === 20) {
        setIsRunning(false); // Stop the timer when 20 is selected
      }
    }
  };

  const handlePauseResume =()=>{
    setIsRunning(isRunning=>!isRunning)
  }
    // convert time in minutes and seconds
  const formatElapsedTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };

  const arrangeNumbersInTable = () => {
    const table = [];
    for (let row = 0; row < 4; row++) {
      const rowData = [];
      for (let col = 0; col < 5; col++) {
        const index = row * 5 + col;
        const number = numbers.length > index ? numbers[index] : '';
        rowData.push(
          <td key={index}>
            <button
              className={`square ${selectedNumbers.includes(number) ? 'selected' : ''}`}
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </button>
          </td>
        );
      }
      table.push(<tr key={row}>{rowData}</tr>);
    }
    return table;
  };

  return (
    <div className="App">
      <h1>Random Number Generator</h1>
      <button onClick={generateRandomNumbers}>New Game</button>
      {numbers.length > 0 && (
        <table>
          <tbody>{arrangeNumbersInTable()}</tbody>
        </table>
      )}
      <p>Elapsed Time: {formatElapsedTime(time)}</p>
      
      {time > 0 && (
       <button onClick={handlePauseResume}>{isRunning? "Pause" : "Resume"}</button> 
      )}
      <p>Selected Random Numbers: {selectedNumbers.join(', ')}</p>
    </div>
  );
}

export default Game;
