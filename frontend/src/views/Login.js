import React, { useState } from "react";
import "../styles/Login.css";
import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        if (userCredentials) {
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        if (userCredentials) {
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://static.vecteezy.com/system/resources/previews/019/766/240/original/amazon-logo-amazon-icon-transparent-free-png.png"
          alt="amazon logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to the AMAZONE CLONE conditions of use and
          sale. Please see our Privacy Notice, our Cookies Notice and your
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login__registerButtom">
          create your amazon account
        </button>
      </div>
    </div>
  );
};

export default Login;
