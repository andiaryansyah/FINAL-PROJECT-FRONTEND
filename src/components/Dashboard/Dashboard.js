import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./Dashboard.css";
import "../Recipe/Recipe.css";

const UserRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [id, setId] = useState("");
  const token = cookies.get("accessToken");

  useEffect(() => {
    getAllRecipeById();
  }, []);

  const getAllRecipeById = async () => {
    const decoded = jwt_decode(token);
    let user_id;
    user_id = decoded.userId;
    setId(user_id);
    const response = await axios.get(
      `http://localhost:3000/api/users/${user_id}/recipes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRecipes(response.data);
  };

  const deleteRecipe = async (recipeId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/${id}/recipes/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllRecipeById();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <article className="cocktail">
        <div className="img-container">
          <img
            src={"https://images7.alphacoders.com/300/thumb-1920-300220.jpg"}
            alt=""
          />
        </div>
        <div>
          <Link to="/addrecipe">
            <button id="add-btn">Add Recipe</button>
          </Link>
        </div>

        {recipes.map((recipe) => (
          <>
            <div className="row row-cols-3">
              <div className="card" key={recipe.id}>
                <div className="img-container">
                  <img src={recipe.url} alt="" />
                </div>
                <div className="cocktail-footer container">
                  <h2>{recipe.title}</h2>
                  <Link
                    to={`/users/${id}/recipe/${recipe.id}`}
                    style={{ color: "#444" }}
                  >
                    <h4>
                      Check out the recipe <i className="fa fa-arrow-right"></i>
                    </h4>
                  </Link>
                </div>
                <div>
                  <Link to={`/updaterecipe/users/${id}/recipe/${recipe.id}`}>
                    <button id="edit-btn">Edit</button>
                  </Link>
                  <Link to="/dashboard">
                    <button id="delete-btn" onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this recipe?"
                          )
                        )
                          deleteRecipe(recipe.id);
                      }}>
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}
      </article>
    </div>
  );
};

export default UserRecipe;
