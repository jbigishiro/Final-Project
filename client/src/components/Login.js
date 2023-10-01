import React, { useState, useEffect } from "react";
import Game from "./Game";



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
  }
  return (
    <div className="login">
      <h2 >Login</h2>

      <div className="loginForm " >
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input className="loginInput"
          type="text"
          placeholder="Enter username"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />  <br />

        <input className="loginInput"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />  <br />

        <button id="button"  type="submit">Login</button>

      </form>
      </div>
     
      <Game />

    </div>
  );
}