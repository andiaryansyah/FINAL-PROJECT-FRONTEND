import React from "react";
import { Link } from "react-router-dom";
import heroimg from "../../images/shallow-pan.svg";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <img src={heroimg} alt="breakfast" />
      <div className="content">
        <h1>
          Life is infinitely <span>Delicious</span>
        </h1>
        <p className="description">
          Hunger is a good cook! Here are some classic recipes from all over
          the world.
        </p>
        <Link to="/features">
          <button className="btn-order">Browse Recipes</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
