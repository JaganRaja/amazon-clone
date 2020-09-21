import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getbasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  //console.log(basket);

  // let amount = basket.reduce(
  //   (accumulator, current) => accumulator + current.price,
  //   0
  // );
  // //console.log(amount);
  // let Total = 0;
  // basket.map((obj) => {
  //   Total += obj.price;
  // });
  // console.log("Total is >>>", Total);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* part of the homework */}
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getbasketTotal(basket)} //part of the homework
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
