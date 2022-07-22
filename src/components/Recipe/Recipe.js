import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Recipe.css";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipe();
  }, []);

  const getAllRecipe = async () => {
    // const token = cookies.get("accessToken");
    // const decoded = jwt_decode(token);
    // setId(decoded.userId);
    const response = await axios.get("http://localhost:3000/api/recipes");
    setRecipes(response.data);
  };
  
  return (
    <div>
      {recipes.map((recipe) => (
        <>
        <article className="cocktail">
          <div className="column is-one-quarter" key={recipe.id}>
          <div className="img-container">
            <img src={recipe.url} alt="" />
          </div>
          <div className="cocktail-footer">
            <h2>{recipe.title}</h2>
            <Link to={`/users/${recipe.user_id}/recipe/${recipe.id}`} style={{ color: "#444" }}>
              <h4>
                Check out the recipe <i className="fa fa-arrow-right"></i>
              </h4>
            </Link>
          </div>
          </div>
          </article>
        </>
      ))}
    </div>
  );
};

export default AllRecipe;
