import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./login.css";
import { signupUser, loginUser } from "../../api/user";

export default function Login() {
  // navigate between login and signup
  const [login, setVisible] = useState(true);
  const [LoginOrSignup, setAdd] = useState("Signup");
  const [txt, settxt] = useState("Don't have an account ? ");

  const toggle = () => {
    setVisible(!login);
    if (login === true) {
      setAdd("Login");
      settxt("Already have an account ? ");
    } else {
      setAdd("Signup");
      settxt("Don't have an account ? ");
    }
  };

  // Signup : add user
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false); // Alert

  const signup = async (value) => {
    await signupUser(value);
    toggle();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // Hide the alert after 5 seconds
  };

  // login
  const navigate = useNavigate();

  const Login = async (value) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        value
      );
      await localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            {showAlert && <div className="alert">Sign up successful!</div>}
            <header>{login ? "Login" : "Signup"}</header>
            {login ? (
              // --------------------login--------------------
              <div>
                <div className="field input-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="bx bx-hide eye-icon"></i>
                </div>
                <div className="form-link">
                  <a href="#" className="">
                    Forgot password?
                  </a>
                </div>
                <div className="field button-field">
                  <button
                    className="login-btn"
                    onClick={() => Login({ email, password })}
                  >
                    Login
                  </button>
                </div>
              </div>
            ) : (
              // --------------------signup--------------------
              <div>
                <div className="field input-field">
                  <input
                    type="text"
                    placeholder="Username"
                    className="input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field input-field">
                  <input
                    type="password"
                    placeholder="Create password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="field button-field">
                  <button
                    className="signup-btn"
                    onClick={() => signup({ userName, email, password })}
                  >
                    Signup
                  </button>
                </div>
              </div>
            )}
            <div className="form-link">
              <span>
                {txt}
                <a href="#" onClick={() => toggle()}>
                  {LoginOrSignup}
                </a>
              </span>
            </div>
          </div>
          <div className="line"></div>
          <div className="media-options">
            <a href="https://www.facebook.com/" className="field facebook">
              <img
                src="https://www.facebook.com/images/fb_icon_325x325.png"
                alt=""
                className="facebook-img"
              />
              <span>Login with Facebook</span>
            </a>
          </div>
          <div className="media-options">
            <a href="https://www.google.com/" className="field google">
              <img
                src="https://www.salesforceben.com/wp-content/uploads/2021/03/google-logo-icon-PNG-Transparent-Background-2048x2048.png"
                alt=""
                className="google-img"
              />
              <span>Login with Google</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
