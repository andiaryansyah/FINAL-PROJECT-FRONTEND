import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./Dashboard.css";
import "../Recipe/Recipe.css"

const UserRecipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipe();
  }, []);
  
  const getAllRecipe = async () => {
    const token = cookies.get("accessToken");
    let id;
    const decoded = jwt_decode(token);
    id = decoded.userId;
    const response = await axios.get(`http://localhost:3000/api/users/${id}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRecipes(response.data);
  };
  
  return (
    <div>
    <article className="cocktail">
      <div className="img-container">
        <img src={"https://images7.alphacoders.com/300/thumb-1920-300220.jpg"} alt="" />
      </div>
    
     <div>
     <Link to="/addrecipe">
       <button id="add-btn">Add Recipe</button>
     </Link>
   </div>
   {recipes.map((recipe) => (
        <>
          <div className="column is-one-quarter" key={recipe.id}>
          <div className="img-container">
            <img src={recipe.url} alt="" />
          </div>
          <div className="cocktail-footer">
            <h2>{recipe.title}</h2>
            <Link to={`/recipe/${recipe.id}`} style={{ color: "#444" }}>
              <h4>
                Check out the recipe <i className="fa fa-arrow-right"></i>
              </h4>
            </Link>
          </div>
          </div>
        </>
      ))}
   </article>

   </div>
  );
};

export default UserRecipe;
