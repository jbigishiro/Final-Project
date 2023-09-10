import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
  display: "inline-block",

  padding: "6px",
  margin: "0 6px 6px",
  background: "blue",
  textDecoration: "none",
  color: "white",
};

function NavBar() {
  return (
    <div>
      <NavLink
        to="/"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Home
      </NavLink>

      <NavLink
        to="/login"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Login
      </NavLink>

      <NavLink
        to="/signup"
        exact
        style={linkStyles}
        activeStyle={{
          background: "darkblue",
        }}
      >
        Signup
      </NavLink>

    </div>
  );
}

export default NavBar;