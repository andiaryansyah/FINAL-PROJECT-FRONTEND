import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");

  React.useEffect(() => {
    auth().onAuthStateChanged(function (user) {
      if (user) {
        setFirstName(user.displayName);

        history.push("/recipe");
      } else console.log("No user is logged in.");
    });
  }, [history, firstName]);

  return (
    <header>
      <nav id="nav">
        <div className="container">
          <h1 className="logo">
            <i className="fa fa-cutlery"></i> YouCanDoIt
          </h1>

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

          {firstName ? (
            <Link
              to="/"
              onClick={() => {
                auth().signOut();
                setFirstName("");
              }}
            >
              {" "}
              <button className="btn">Sign Out</button>
            </Link>
          ) : (
            <button className="btn">
              <Link to="/signin">Sign In</Link>
            </button>
          )}
          
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
