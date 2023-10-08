import React, { useState, useEffect } from 'react';

function Game() {
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [user_id, setUser_id] = useState(null); // State to store user ID
  const [userRank, setUserRank] = useState(null); // State to store user rank

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
    setTime(0);
    setIsRunning(true);
  };

  const endGame = async () => {
    if (user_id) {
      const response = await fetch('/end_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, time_spent: time }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserRank(data.rank);
        alert(data.message);
      } else {
        alert('Failed to end the game.');
      }
    } else {
      // Handle the case where the user is not authenticated
      alert('User not authenticated. Please log in.');
    }
  };

  const handleNumberClick = (number) => {
    if (number === selectedNumbers.length + 1) {
      setSelectedNumbers([...selectedNumbers, number]);
      if (number < 20) {
        setIsRunning(true);
      }
      if (number === 20) {
        setIsRunning(false);
        endGame();
      }
    }
  };

  const handlePauseResume = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

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
      <button onClick={generateRandomNumbers} id="newGame">
        New Game
      </button>
      <div style={{ paddingLeft: '40px' }}>
        {numbers.length > 0 && <p id="timer">{formatElapsedTime(time)}</p>}
      </div>
      {time > 0 && selectedNumbers.length !== 20 && (
        <button id="pauseResume" onClick={handlePauseResume}>
          {isRunning ? 'Pause' : 'Resume'}
        </button>
      )}
      {userRank !== null && <p>Your rank is {userRank}.</p>}
      {selectedNumbers.length === 20 && (
        <h2 style={{ color: 'red' }}>
          Game Ended, your ranking is {userRank} in 100 players
        </h2>
      )}
      {numbers.length > 0 && (
        <table id="table">
          <tbody>{arrangeNumbersInTable()}</tbody>
        </table>
      )}
      {selectedNumbers.length > 0 && selectedNumbers.length < 20 && (
        <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'blue' }}>
          Selected Numbers: {selectedNumbers.join(', ')}
        </p>
      )}
    </div>
  );
}

export default Game;
