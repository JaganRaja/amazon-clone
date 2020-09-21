import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  // const [state, dispatch] = useStateValue();
  // console.log(state);
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthetication = () => {
    //when user clicks on SignIn/SignOut link, If there is a user already logged in,
    //then, it will fetch the 'auth' from firebase and do "auth.signOut"  ...
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          alt="amazon-logo"
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
        {/* logo */}
      </div>

      <div className="header_nav">
        {/* if there is no USER then it will redirect to Login Page.. If there is a USER, it will just signout
          Text will change form "SignOut to SignIn" */}
        {/* <Link to={!user ? "/login" : null}> */}
        <Link to={!user && "/login"}>
          <div onClick={handleAuthetication} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {/* {state.basket.length} */}
              {basket?.length}
              {/* "?" is optional training, for any reason is NOT having correct value OR basket becomes undefined
              due to an error it wont freakout, it will just gracefully handle the error */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
