import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import GamePage from './components/GamePage';

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch('/check_session')
      .then((r) => {
        if (r.ok) {
          console.log('Fetch User', r);
          r.json().then((userData) => {
            setUserId(userData.id);
            setUser(userData);
            setIsLoggedIn(true);
          });
        } else {
          r.json().then((errorData) => {
            setErrors([errorData.errors]);
            console.log(errors);
          });
        }
      });
  };

  const onLogin = (user) => setUser(user);

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    }).then((r) => {
      if (r.status === 204) {
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null);
      } else {
        console.error('Logout error:', r.statusText);
      }
    });
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/gamePage" element={<GamePage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
