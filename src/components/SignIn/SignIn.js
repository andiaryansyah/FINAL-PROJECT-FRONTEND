import React, { Component } from "react";
import axios from "axios";
import cookies from 'js-cookie';
import { Link, withRouter } from "react-router-dom";
import "./SignIn.css";


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSignIn = (e, propss) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then(function (response) {
        cookies.set('accessToken',response.data.accessToken);
        propss.history.push("/dashboard");
        window.location.reload();

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  render() { 
    return (
      <div>
        <form onSubmit={(e) => this.handleSignIn(e, this.props)}>
          <div id="signIn-body">
            <div id="sign-in-container">
              <h1>SIGN IN HERE</h1>

              <div id="form-input-container">
                <p>Email Address</p>
                <input
                  onChange={this.handleChange}
                  required
                  type="email"
                  placeholder=""
                  name="email"
                />
                <p>Password</p>{" "}
                <input
                  onChange={this.handleChange}
                  required
                  type="password"
                  placeholder=""
                  name="password"
                />
                <div id="signup-fullname-contaner" style={{display:'flex', justifyContent:'space-between'}} >
                  {/* <div>
                    <p>
                      {" "}
                      <Link style={{ color: "cyan" }} to="/resetpass">
                        Forget Password ?
                      </Link>
                    </p>
                  </div> */}
                  <div >
                    <p> Do not have account ?
                      {" "}
                      <Link style={{ color: "cyan" }} to="/signup">
                        Sign Up 
                      </Link>
                    </p>
                  </div>
                </div>
                {/* <p>
                  Demo Dashboard{" "}
                  <Link style={{ color: "cyan" }} to="/dashboard">
                    Here
                  </Link>
                </p> */}
                <br></br>
              </div>
              <button id="signin-btn">Sign In</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default withRouter(SignIn);
