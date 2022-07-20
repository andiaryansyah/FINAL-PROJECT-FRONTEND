import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import axios from 'axios';
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./Navbar.css";

const Navbar = () => {
  const history = useHistory();

  const Logout = () => {
    try {
      cookies.remove("accessToken");
      history.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const isLogin = cookies.get("accessToken");
  let name;
  if (isLogin) {
    const decoded = jwt_decode(isLogin);
    name = decoded.userName;
  }

  return (
    <header>
      <nav id="nav">
        <div className="container">
          <h1 className="logo">
            <i className="fa fa-cutlery"></i> YouCanDoIt
          </h1>
          {isLogin ? (
            <>
              <ul className="links">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/features">All Recipes</Link>
                </li>
              </ul>
              <div>
                <label>
                  Sign in as :<span> {name}</span>
                </label>
                <Link to="/" onClick={Logout}>
                  {" "}
                  <button className="btn">Sign Out</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <ul className="links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/features">Recipes</Link>
                </li>
                <li>
                  <Link to="/about">About Me</Link>
                </li>
              </ul>
              <button className="btn">
                <Link to="/signin">Sign In</Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
