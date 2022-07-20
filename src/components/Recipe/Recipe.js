import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import "./Recipe.css";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllRecipe();
  }, []);

  const getAllRecipe = async () => {
    const token = cookies.get("accessToken");
    const response = await axios.get("http://localhost:3000/api/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRecipes(response.data);
  };
  return (
    <article className="cocktail">
      {recipes.map((recipe) => (
        <>
        {console.log(recipe)}
          <div className="column is-one-quarter" key={recipe.id}>
          <div className="img-container">
            <img src={recipe.url} alt="" />
          </div>
          <div className="cocktail-footer">
            <h2>{recipe.title}</h2>
            <Link to={`/recipe/${id}`} style={{ color: "#444" }}>
              <h4>
                Check out the recipe <i className="fa fa-arrow-right"></i>
              </h4>
            </Link>
          </div>
          </div>
        </>
      ))}
    </article>
  );
};

export default Recipe;