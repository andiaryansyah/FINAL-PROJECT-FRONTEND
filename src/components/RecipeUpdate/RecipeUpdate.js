import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';
import './AddRecipe.css';

class RecipeUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      instructions: "",
      ingredients: [''],
      img: '',
      id: this.props.match.params.id
    };
    
  }

  decodeJWT = () => {
    const token = cookies.get('accessToken')
    const decoded = jwtDecode(token);
    return {decoded,token};
  }  


  handleChange = (e) => {
    if (e.target.name === "img"){
      this.setState({[e.target.name]: e.target.files[0]});
    }else{
    this.setState({[e.target.name]: e.target.value});
  }
  }
  
  handleNewIngredient = (e) => {
    const {ingredients} = this.state;
    this.setState({ingredients: [...ingredients, '']});
  }

  onDeleteIngredient = (ingredient) => {
    const deleteIng = [...this.state.ingredients];
    deleteIng.splice(ingredient, 1);
    this.setState({ingredients: deleteIng})
}
  
  handleChangeIng = (e) => {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ingredients});
  }
  
  getRecipeById = () => {
    axios
    .get(`http://localhost:3000/api/users/${this.decodeJWT().decoded.userId}/recipes/10`, {
      headers:{
        "authorization":`Bearer ${this.decodeJWT().token}`
    }
    })
    .then(function (response) {
      this.setState({
        title: response.data.title,
        category: '',
        instructions: '',
        ingredients: [''],
        img: ''
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.decodeJWT();
    const user_id = this.decodeJWT().decoded.userId
    const formData = new FormData();
        formData.append("file", this.state.img)
        formData.append("title", this.state.title)
        formData.append("category", this.state.category)
        formData.append("instructions", this.state.instructions)
        formData.append("ingredients", this.state.ingredients)
        try {
            axios.post(`http://localhost:3000/api/users/${user_id}/recipes/3`, formData, {
                headers:{
                    "authorization":`Bearer ${this.decodeJWT().token}`,
                    "content-type":"multipart/form-data"
                }
            });
            // navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
        this.setState({
          title: '',
          category: '',
          instructions: '',
          ingredients: [''],
          img: ''
        })
        window.location.reload();
  }
  
  render() {
    const {title, category, instructions, ingredients, url} = this.state;
    const {onClose} = this.props;
    let inputs = ingredients.map((ing, i) => (
      <div
        className="recipe-form-line"
        key={`ingredient-${i}`}
      >
        <label>{i+1}.
          <input
            type="text"
            name={`ingredient-${i}`}
            value={ing}
            size={45}
            autoComplete="off"
            placeholder=" Ingredient"
            onChange={this.handleChangeIng} />
        </label>
      </div>
    ));
    
    return (
      <div className="recipe-form-container">
        <form className="recipe-form" onSubmit={this.handleUpdate}>
          <Link to="/dashboard">
            <button type="button" className="close-button" onClick={onClose}>
              X
            </button>
          </Link>
          <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">Title</label>
            <input id="recipe-title-input" key="title" name="title" type="text" value={title} size={42} autoComplete="off" onChange={this.handleChange} />
          </div>
          <label htmlFor="recipe-title-input">Category</label>
          <input id="recipe-title-input" key="category" name="category" type="text" value={category} autoComplete="off" onChange={this.handleChange} />
          <label htmlFor="recipe-instructions-input" style={{ marginTop: "5px" }}>
            Instructions
          </label>
          <textarea key="instructions" id="recipe-instructions-input" type="Instructions" name="instructions" rows="8" cols="50" autoComplete="off" value={instructions} onChange={this.handleChange} />
          {inputs}
          <div>
          <button type="button" style={{marginLeft:"300px"}} onClick={this.handleNewIngredient} className="buttons">
            +
          </button>
          <button type="button" style={{marginLeft:"3px"}} onClick={this.onDeleteIngredient} className="buttons">
            -
          </button>
          </div>
          <div className="recipe-form-line">
            <label htmlFor="recipe-img-input">Image Url</label>
            <input type="file" id="img" name="img" placeholder="Enter Picture.." src={url} onChange={this.handleChange} />
          </div>
          <button type="submit" className="buttons" style={{ alignSelf: "flex-end", marginRight: 0 }}>
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default RecipeUpdate;