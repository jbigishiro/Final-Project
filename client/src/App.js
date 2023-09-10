import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";

function App() {

  // const [people, setPeople] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:3001/scientists")
  //     .then((r) => r.json())
  //     .then((scientists) => setPeople(scientists));
  // }, []);

  return (
    <div className="body">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
