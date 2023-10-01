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
    return `${minutes}:${remainingSeconds}`;
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
      <h1>Number Search Game</h1>
      
      <button onClick={generateRandomNumbers} id= "newGame">New Game</button>
      <div style={{paddingLeft:"40px"}}> {numbers.length > 0 &&<p id='timer'>{formatElapsedTime(time)}</p>} </div>
      {time > 0 && selectedNumbers.length != 20 &&(
       <button id='pauseResume' onClick={handlePauseResume}>{isRunning? "Pause" : "Resume"}</button> 
      )}

      {selectedNumbers.length == 20 && (
        <h2 style={{color:"red"}}> Game Ended, your ranking is 20 in 100 players </h2>
       ) }

      {numbers.length > 0 && (
        <table id='table'>
          <tbody>{arrangeNumbersInTable()}</tbody>
        </table>
      )}

      { selectedNumbers.length > 0 && selectedNumbers.length < 20 && ( 
      <p style={{fontWeight:'bold', fontSize:'20px', color:'blue'}}>Selected Numbers: {selectedNumbers.join(', ')}</p>)}
    
    </div>
  );
}
export default Game;
