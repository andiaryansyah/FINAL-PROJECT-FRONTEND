import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgetPass.css";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSignIn(e) {
    e.preventDefault();
    if (this.state.password !== this.state.rePassword) {
      alert("password error");
    } else {
      axios
        .post("http://localhost:4000/signin", { SignInData: this.state })
        .then(function (response) {
          console.log(response.data);
          if (!response.data.succes) alert(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSignIn}>
          <div id="signIn-body">
            <div id="sign-in-container">
              <h1>RESET PASSWORD</h1>
              <p>Enter your email address and we will send you a new password</p>
              <br></br>
              <div id="form-input-container">
                <p>Email Address</p>
                <input onChange={this.handleChange} required type="email" placeholder="" name="email" />
              </div>
              <button id="signin-btn">Submit</button>
              <br></br>
              <p>
                First time?{" "}
                <Link style={{ color: "cyan" }} to="/signup">
                  Create an account
                </Link>
              </p>
              <p>
                <Link style={{ color: "cyan" }} to="/">
                  Back to Homepage
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
