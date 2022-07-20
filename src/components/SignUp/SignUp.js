import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignUp.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name:'',
      email:'',
      password:'',
      rePassword:'',
      phone_number:'',
      firstName:'',
      lastName:''
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSignUp = (e, propss) => {
    e.preventDefault();
    if (this.state.password !== this.state.rePassword) {
      alert("password error");
    }
    else {
      axios
        .post("http://localhost:3000/api/users", {
          name:`${this.state.firstName} ${this.state.lastName}`,
          email:this.state.email,
          password:this.state.password,
          phone_number:this.state.phone_number
          })
        .then(function (response) {
          propss.history.push("/signin");
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSignUp (e, this.props)}>
          <div id="signUp-body">
            <div id="sign-up-container">
              <h1>CREATE YOUR ACCOUNT</h1>

              <div id="form-input-container">
                <div id="signup-fullname-contaner">
                  <div>
                    <p>First Name</p>
                    <input onChange={this.handleChange} required type="text" placeholder="" name="firstName" />
                  </div>
                  <div>
                    <p>Last Name</p>
                    <input onChange={this.handleChange} required type="text" placeholder="" name="lastName" />
                  </div>
                </div>
                <p>Email Address</p>
                <input onChange={this.handleChange} required type="email" placeholder="" name="email" />
                <p>Password</p>
                <input onChange={this.handleChange} required type="password" placeholder="" name="password" />
                <p>Repeat Password </p>
                <input onChange={this.handleChange} required type="password" placeholder="" name="rePassword" />
                <p>Phone Number </p>
                <input onChange={this.handleChange} required type="text" placeholder="" name="phone_number" />

                <p>
                  Already Have Account?{" "}
                  <Link style={{ color: "cyan" }} to="/signIn">
                    Sign In Here
                  </Link>
                </p>

                <br></br>
              </div>
              <button id="signup-btn">Sign Up</button>
              <span id="password-match-error">{this.state.password === this.state.rePassword ? null : "password does not match"}</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
