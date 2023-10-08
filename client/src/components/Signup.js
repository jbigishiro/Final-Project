import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      passwordConfirmation,
    };

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.errors.join("\n"));
          });
        }
      })
      .then(() => {
        console.log('Registration successful');
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
        setErrors([]);
      })
      .catch((error) => {
        console.log('Registration failed');
        setPassword("");
        setPasswordConfirmation("");
        setErrors([error.message]);
      });
  };

  return (
    <div className='signup'>
      <h2>Registration Form</h2>
      <div className='signupForm'>
        <form onSubmit={handleSubmit}>
          <input
            className='signupInput'
            type="text"
            placeholder="Enter username"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br /> <br />
          <input
            className='signupInput'
            type="password" 
            placeholder="Enter password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <br /> <br />
          <input
            className='signupInput'
            type="password" 
            placeholder="Confirm password"
            value={passwordConfirmation}
            autoComplete="off"
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
            required
          />
          <br /> <br />
          <button id="button" type="submit">Sign Up</button>
        </form>
        {errors.length > 0 && (
          <div className="error">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
