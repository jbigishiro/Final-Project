import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return(
    <div className="navbar">
       <ul className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>      
       </ul>
    </div>
);
}

export default NavBar;