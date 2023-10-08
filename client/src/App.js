import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import GamePage from './components/GamePage';

  function App() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      fetch("/check_session").then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
        }
      });
    }, []);
  
    function handleLogin(user) {
      setUser(user);
    }
  
    function handleLogout() {
      setUser(null);
    }
    
    return (
      <div className="app">
        {user ? (         
            <Routes>
              <Route path="/gamePage" element={<GamePage onLogout={handleLogout} />} />
            </Routes>      
        ) : (
          <>
           <NavBar />
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
          </>
        )}
      </div>
    );
   }    

export default App;
