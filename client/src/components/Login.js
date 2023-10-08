import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((user) => {
            console.log('Signin successful');
            setPassword("");
            setError(null)
            navigate("/gamePage");
          });
        } else {
          return response.json().then((errorData) => {
            console.log('Signin failed');
            setPassword("");
            const errorMessage = errorData.error || "An unexpected error occurred.";
            setError(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .catch((error) => {
        console.error('signin failed');
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter username"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br /> <br />
          <input
            className="loginInput"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /> <br />
          <button id="button" type="submit">
            Login
          </button>
        </form>
        <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        {error && (
          <div className="error">
            <p style={{color:"red"}}>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
