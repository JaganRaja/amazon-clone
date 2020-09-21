import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HSDxVIT8Pbjek6ZXVUFUsrUtdSj7TElqdrUSVn7XFSmvOJ8wqGNtDk2QPo7a2HHL3a8fBIwWmrXf255Gdjmkb3e00lwkw7vLA"
);

function App() {
  const [{}, dispatch] = useStateValue();
  //creating listener to track the user who logged In (using 'useEffect' hook and 'onAuthSatateChanged' listener of firebase)
  useEffect(() => {
    // will only run ONCE when the app componeents loads
    //onAuthStateChanged --> when app component loads, listener will be attached
    //if Login, it refires the code
    //if logout, it refires the code... for signin signout as well
    //whenever authentication changes, it will give us the authenticated user, it might be NULL as well
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>", authUser);

      if (authUser) {
        //the user just loggedIn / the user was loggedIn (alread logged, now refreshing)
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM name convention - CSS className
    <Router>
      <div className="app">
        {/* <h1>JK</h1> */}

        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
