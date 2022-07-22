import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import "./SingleRecipe.css";

const SingleRecipe = () => {
 
  const { id, user_id } = useParams();

  const [loading, setLoading] = useState(false);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllByUserId();
    setLoading(false);
  }, []);

  const getAllByUserId = async () => {

    const response = await axios.get(`http://localhost:3000/api/users/${user_id}/recipes/${id}`);
    setRecipes(response.data);
  }; 

  if (loading) {
    return <Spinner />;
  }
  if (!recipes) {
    return <h2 className="section-title">No recipe to display.</h2>;
  } else {
    const { title, url, category, ingredients , instructions } = recipes;
    const arrIngredients = ingredients?.split(",")

    return (
      <div className="recipe_container">
        <div className="recipe_pic">
          <img src={url} alt="" />
        </div>

        <div className="single_recipe">
          <div className="heading">
            <h1>{title}</h1>
          </div>
          <div className="text">
            <h4>
              <span className="drink-data">Category :</span>
            </h4>
            <p>{category}</p>
            <br></br>
            <h4>Ingredients :</h4>
            <div>
            {arrIngredients &&
                arrIngredients.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>{item}</p>
                    </div>
                  );
                })}
            </div>
            <br></br>
            <h4>
              <span className="drink-data">Instructions :</span>
            </h4>
            <div style={{ width:"550px" }}>
              <p>{instructions}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleRecipe;