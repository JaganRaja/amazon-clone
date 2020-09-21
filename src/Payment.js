import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getbasketTotal } from "./reducer";
import axios from "./axios"; //pulling from local file axios, NOT from axios module
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const history = useHistory();

  //payment hooks
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null); //to display error in cardElement
  const [disabled, setDisabled] = useState(true); //button disabled functionality in cardElement

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [clientSecret, setClientSecret] = useState(true); //getting client secret from stripe, the only we can make a payment

  //getting client secret from stripe, the only we can make a payment
  //Important code snippet for Stripe Payment %%%%%%%%%%%%%%
  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      //axios --> Use to make request (GET,POST..etc)
      const response = await axios({
        method: "post",
        //Stripe expects  the total  in a currencies subunits...(NOT rupees, SHould be in Paisa)
        url: `/payments/create?total=${getbasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("The secret is >>>", clientSecret);
  console.log("the user is", user);

  const handleSubmit = async (event) => {
    //do all the fancy stripe here...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        //find the card element with this code
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //we will get response... but we destructured it as "paymentIndent"
        //paymentIndent = payment confirmation
        //console.log("paymentIntent is >>>>>", paymentIntent);
        //console.log("User UID is", user?.uid);
        //pushing the orders into db(CloudFirestore)
        db.collection("users") //
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
        //User dont need to comeback to the page(ex: Payment page, after did the payment) after
      });
  };

  const handleChange = (event) => {
    //Listen for any changes in the card element
    //and display any errors as the customer types their card details
    setDisabled(event.empty); //If the event is empty, then go ahed and disabled the button
    setError(event.error ? event.error.message : ""); //If there is a error, show the error, else show nothing
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Jakkamal Kovil street</p>
            <p>Keelachokkanathapuram</p>
            <p>Bodinayakanur, Theni</p>
          </div>
        </div>
        {/* payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getbasketTotal(basket)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Errors */}
              {error && <div>{error}</div>}
              {/* If there is an error ONLY THEN show the error */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
