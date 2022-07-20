import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Dashboard.css";

const Recipe = React.memo(function Recipe({ image, name, id }) {
  return (
    <article className="cocktail">
      <div>
        <Link to="/addrecipe">
          <button id="add-btn">Add Recipe</button>
        </Link>
      </div>
      <div className="img-container">
        <img src={image || "https://images7.alphacoders.com/300/thumb-1920-300220.jpg"} alt={name || "Healthy Salad"} />
      </div>
      <div className="cocktail-footer">
        <h2>{name || "Healthy Salad"}</h2>
        <Link to={`/recipe/${id}`} style={{ color: "#444" }}>
          <h4>
            Check out the recipe <i className="fa fa-arrow-right"></i>
          </h4>
        </Link>
      </div>
    </article>
  );
});

Recipe.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default Recipe;
