import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    //firebase login

    auth //
      .signInWithEmailAndPassword(email, password) //
      .then((auth) => {
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  const register = (e) => {
    e.preventDefault();
    //firebase register

    auth
      .createUserWithEmailAndPassword(email, password) //it will create user in firebase
      .then((auth) => {
        //it successfully created a new user with email and password,so we are getting the user object as 'auth'
        console.log(auth);
        //if user sucessfully loggedIn(ex: auth is not empty), redirect to 'HomePage'
        if (auth) {
          history.push("/"); //once user sucessfully SIGNEDUP, redirecting to 'homepage'
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
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
          By continuing, you agree to Amazon's FAKE CLONE Conditions of Use and
          Privacy Notice. Please send our privacy notice and cookies notice and
          our interest based ad notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
